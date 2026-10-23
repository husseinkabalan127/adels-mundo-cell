
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET - Buscar produtos
// =====================================================

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        lotes: {
          orderBy: {
            createdAt: "desc",
          },
        },
        aparelhos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("ERRO AO BUSCAR PRODUTOS:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }
}

// =====================================================
// POST - Cadastrar aparelhos no estoque
// Aceita aparelhos com ou sem IMEI
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nome = String(body.nome || "").trim();
    const fornecedor = String(body.fornecedor || "").trim();
    const quantidade = Number(body.quantidade);

    const cor =
      body.cor === null || body.cor === undefined
        ? null
        : String(body.cor).trim() || null;

    const memoria =
      body.memoria === null || body.memoria === undefined
        ? null
        : String(body.memoria).trim() || null;

    const precoCompraUsd =
      body.precoCompraUsd === "" ||
      body.precoCompraUsd === null ||
      body.precoCompraUsd === undefined
        ? null
        : Number(String(body.precoCompraUsd).replace(",", "."));

    const imeis: string[] = Array.isArray(body.imeis)
      ? body.imeis
          .map((imei: unknown) => String(imei ?? "").trim())
          .filter(Boolean)
      : [];

    // =================================================
    // VALIDAÇÕES
    // =================================================

    if (!nome) {
      return NextResponse.json(
        { error: "Digite o nome do aparelho." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return NextResponse.json(
        { error: "Digite uma quantidade válida." },
        { status: 400 }
      );
    }

    // Permite nenhum IMEI ou um IMEI para cada aparelho.
    // Se informar IMEIs, a quantidade deve ser exata.
    if (imeis.length !== 0 && imeis.length !== quantidade) {
      return NextResponse.json(
        {
          error:
            "Informe todos os IMEIs ou deixe a lista vazia para cadastrar somente pela quantidade.",
        },
        { status: 400 }
      );
    }

    if (new Set(imeis).size !== imeis.length) {
      return NextResponse.json(
        { error: "Não pode haver IMEI repetido." },
        { status: 400 }
      );
    }

    if (
      precoCompraUsd !== null &&
      (!Number.isFinite(precoCompraUsd) || precoCompraUsd < 0)
    ) {
      return NextResponse.json(
        { error: "Preço de compra USD inválido." },
        { status: 400 }
      );
    }

    // =================================================
    // VERIFICAR IMEIs EXISTENTES
    // =================================================

    if (imeis.length > 0) {
      const aparelhosExistentes = await prisma.aparelho.findMany({
        where: {
          imei: {
            in: imeis,
          },
        },
        select: {
          imei: true,
        },
      });

      if (aparelhosExistentes.length > 0) {
        const repetidos = aparelhosExistentes
          .map((item) => item.imei)
          .filter((imei): imei is string => imei !== null)
          .join(", ");

        return NextResponse.json(
          {
            error: `Este(s) IMEI(s) já está(ão) cadastrado(s): ${repetidos}`,
          },
          { status: 400 }
        );
      }
    }

    // =================================================
    // CRIAR / ENCONTRAR PRODUTO E CADASTRAR ESTOQUE
    // =================================================

    const resultado = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        let produto = await tx.produto.findFirst({
          where: {
            nome,
          },
        });

        if (!produto) {
          const produtosExistentes = await tx.produto.findMany();

          produto =
            produtosExistentes.find(
              (item) =>
                item.nome.trim().toLowerCase() === nome.toLowerCase()
            ) ?? null;
        }

        if (!produto) {
          produto = await tx.produto.create({
            data: {
              nome,
              quantidade: 0,
            },
          });
        }

        const lote = await tx.lote.create({
          data: {
            quantidade,
            precoCompraUsd,
            fornecedor: fornecedor || null,
            produtoId: produto.id,
          },
        });

        // Cria uma linha por aparelho.
        // Para cadastro por quantidade, o IMEI fica null.
        await tx.aparelho.createMany({
          data: Array.from({ length: quantidade }, (_, index) => ({
            imei: imeis.length > 0 ? imeis[index] : null,
            cor,
            memoria,
            vendido: false,
            loteId: lote.id,
            produtoId: produto.id,
          })),
        });

        const produtoAtualizado = await tx.produto.update({
          where: {
            id: produto.id,
          },
          data: {
            quantidade: {
              increment: quantidade,
            },
          },
          include: {
            lotes: true,
            aparelhos: true,
          },
        });

        return {
          produto: produtoAtualizado,
          lote,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Aparelhos cadastrados com sucesso!",
        produto: resultado.produto,
        lote: resultado.lote,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERRO AO CADASTRAR APARELHOS:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar aparelhos.",
      },
      { status: 500 }
    );
  }
}
