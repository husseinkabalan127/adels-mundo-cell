
export const runtime = "nodejs";

import { NextResponse } from "next/server";

function erro(mensagem: string, status = 400) {
  return NextResponse.json({ error: mensagem }, { status });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return erro(
        "OPENAI_API_KEY não está configurada no servidor. Adicione a chave ao .env.local.",
        500
      );
    }

    const body = await request.json();

    const texto =
      typeof body.texto === "string"
        ? body.texto.slice(0, 30000)
        : "";

    const imagemDataUrl =
      typeof body.imagemDataUrl === "string"
        ? body.imagemDataUrl
        : "";

    if (!texto.trim() && !imagemDataUrl) {
      return erro("Envie texto ou uma imagem.");
    }

    if (
      imagemDataUrl &&
      !/^data:image\/(png|jpeg|webp);base64,/.test(imagemDataUrl)
    ) {
      return erro("Use uma imagem PNG, JPG ou WebP.");
    }

    if (imagemDataUrl.length > 12_000_000) {
      return erro("A imagem é muito grande. Envie uma imagem menor.");
    }

    const instrucoes = `
Você organiza listas de preços de fornecedores de celulares.

Extraia somente os itens realmente presentes no texto ou imagem.
Não invente nomes, modelos, memórias, cores ou preços.
Preserve a grafia original dos nomes.
Não adivinhe preços ilegíveis: deixe o campo vazio e marque revisar=true.
Ignore cabeçalhos, totais e formas de pagamento.
Não crie produtos que não estejam na fonte.

Retorne somente JSON válido neste formato:
{
  "itens": [
    {
      "nome": "nome exatamente como aparece",
      "memoria": "",
      "cor": "",
      "preco": "",
      "observacao": "",
      "revisar": false
    }
  ]
}
`;

    const content: Array<Record<string, unknown>> = [
      {
        type: "input_text",
        text: `${instrucoes}\n\nLista recebida:\n${
          texto || "(Leia a imagem enviada.)"
        }`,
      },
    ];

    if (imagemDataUrl) {
      content.push({
        type: "input_image",
        image_url: imagemDataUrl,
        detail: "high",
      });
    }

    const resposta = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          input: [{ role: "user", content }],
          max_output_tokens: 6000,
        }),
      }
    );

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
      console.error("Erro da OpenAI:", dados?.error);

      return erro(
        dados?.error?.message ||
          "Erro ao processar a lista com IA.",
        502
      );
    }

    const partes: string[] = [];

    for (const bloco of dados?.output ?? []) {
      for (const parte of bloco.content ?? []) {
        if (
          parte.type === "output_text" &&
          typeof parte.text === "string"
        ) {
          partes.push(parte.text);
        }
      }
    }

    let saida = partes.join("\n").trim();

    saida = saida
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");

    const inicio = saida.indexOf("{");
    const fim = saida.lastIndexOf("}");

    if (inicio >= 0 && fim > inicio) {
      saida = saida.slice(inicio, fim + 1);
    }

    let resultado: {
      itens?: Array<Record<string, unknown>>;
    };

    try {
      resultado = JSON.parse(saida);
    } catch {
      return erro(
        "A IA retornou um formato inválido. Tente novamente.",
        502
      );
    }

    const itens = Array.isArray(resultado.itens)
      ? resultado.itens.slice(0, 500).map((item) => {
          const nome =
            typeof item.nome === "string"
              ? item.nome.slice(0, 180)
              : "";

          const preco =
            typeof item.preco === "string" ||
            typeof item.preco === "number"
              ? String(item.preco).slice(0, 50)
              : "";

          return {
            nome,
            memoria:
              typeof item.memoria === "string"
                ? item.memoria
                : "",
            cor:
              typeof item.cor === "string"
                ? item.cor
                : "",
            preco,
            observacao:
              typeof item.observacao === "string"
                ? item.observacao.slice(0, 250)
                : "",
            incluir: true,
            revisar:
              Boolean(item.revisar) ||
              !nome.trim() ||
              !preco.trim(),
          };
        })
      : [];

    return NextResponse.json({ itens });
  } catch (error) {
    console.error("Erro ao organizar lista:", error);

    return erro(
      "Erro interno ao organizar a lista.",
      500
    );
  }
}
