"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
  produtoId: number;
  loteId: number;
  produto?: {
    id: number;
    nome: string;
    quantidade: number;
  };
  lote?: {
    id: number;
    fornecedor?: string | null;
    precoCompraUsd?: number | null;
  };
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  aparelhos?: Aparelho[];
};

type VendaItemForm = {
  produtoId: number | "";
  quantidade: number;
  valorUnitario: string;
  imeis: string[];
};

type Venda = {
  id: number;
  createdAt?: string;
  data?: string;
  cliente?: string | null;
  formaPagamento?: string | null;
  estadoFatura?: string | null;
  taxa?: number | null;
  total?: number | null;
  valorTotal?: number | null;
  itens?: any[];
};

export default function VendasPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [cliente, setCliente] = useState("");
  const [formaPagamento, setFormaPagamento] =
    useState("Não informado");

  const [estadoFatura, setEstadoFatura] =
    useState("Não informado");

  const [taxa, setTaxa] = useState("");

  const [itens, setItens] = useState<VendaItemForm[]>([
    {
      produtoId: "",
      quantidade: 1,
      valorUnitario: "",
      imeis: [],
    },
  ]);

  const [imeiBusca, setImeiBusca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregandoVendas, setCarregandoVendas] =
    useState(false);

  const [excluindoVendaId, setExcluindoVendaId] =
    useState<number | null>(null);

  const imeiInputRef =
    useRef<HTMLInputElement>(null);

  async function carregarEstoque() {
    try {
      const res = await fetch("/api/estoque", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Erro ao carregar estoque."
        );
      }

      setProdutos(data);
    } catch (e: any) {
      setErro(
        e.message || "Erro ao carregar estoque."
      );
    }
  }

  async function carregarVendas() {
    try {
      setCarregandoVendas(true);

      const res = await fetch("/api/vendas", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Erro ao carregar vendas."
        );
      }

      if (Array.isArray(data)) {
        setVendas(data);
      } else if (Array.isArray(data.vendas)) {
        setVendas(data.vendas);
      } else {
        setVendas([]);
      }
    } catch (e: any) {
      console.error(e);

      setErro(
        e.message || "Erro ao carregar vendas."
      );
    } finally {
      setCarregandoVendas(false);
    }
  }

  useEffect(() => {
    carregarEstoque();
    carregarVendas();
  }, []);

  const aparelhosDisponiveis = useMemo(() => {
    return produtos.flatMap((produto) =>
      (produto.aparelhos || [])
        .filter((a) => !a.vendido)
        .map((a) => ({
          ...a,
          produto: {
            id: produto.id,
            nome: produto.nome,
            quantidade: produto.quantidade,
          },
        }))
    );
  }, [produtos]);

  const aparelhoEncontrado = useMemo(() => {
    const busca = imeiBusca.trim();

    if (!busca) return null;

    return (
      aparelhosDisponiveis.find(
        (a) => a.imei === busca
      ) || null
    );
  }, [imeiBusca, aparelhosDisponiveis]);

  const resultadosBusca = useMemo(() => {
    const busca = imeiBusca.trim();

    if (!busca) return [];

    return aparelhosDisponiveis
      .filter((a) =>
        a.imei.includes(busca)
      )
      .slice(0, 50);
  }, [imeiBusca, aparelhosDisponiveis]);

  const total = itens.reduce(
    (soma, item) => {
      const quantidade =
        Number(item.quantidade) || 0;

      const valor =
        Number(
          String(item.valorUnitario).replace(
            ",",
            "."
          )
        ) || 0;

      return soma + quantidade * valor;
    },
    0
  );

  function atualizarItem(
    index: number,
    changes: Partial<VendaItemForm>
  ) {
    setItens((atual) =>
      atual.map((item, i) =>
        i === index
          ? { ...item, ...changes }
          : item
      )
    );
  }

  function adicionarModelo() {
    setItens((atual) => [
      ...atual,
      {
        produtoId: "",
        quantidade: 1,
        valorUnitario: "",
        imeis: [],
      },
    ]);
  }

  function adicionarImeiAoItem(
    itemIndex: number,
    imei: string
  ) {
    const valor = imei.trim();

    if (!valor) return;

    setItens((atual) =>
      atual.map((item, i) => {
        if (i !== itemIndex) return item;

        if (item.imeis.includes(valor)) {
          return item;
        }

        return {
          ...item,
          imeis: [...item.imeis, valor],
          quantidade: item.imeis.length + 1,
        };
      })
    );
  }

  function removerImei(
    itemIndex: number,
    imei: string
  ) {
    setItens((atual) =>
      atual.map((item, i) => {
        if (i !== itemIndex) return item;

        const novos = item.imeis.filter(
          (x) => x !== imei
        );

        return {
          ...item,
          imeis: novos,
          quantidade: Math.max(
            1,
            novos.length
          ),
        };
      })
    );
  }

  function adicionarImeiEncontrado() {
    setErro("");
    setMensagem("");

    const imei = imeiBusca.trim();

    if (!imei) {
      setErro("Digite o IMEI para buscar.");
      return;
    }

    if (!aparelhoEncontrado) {
      setErro(
        "IMEI não encontrado ou já vendido."
      );
      return;
    }

    let index = itens.findIndex(
      (item) =>
        item.produtoId ===
        aparelhoEncontrado.produtoId
    );

    if (index === -1) {
      index = itens.findIndex(
        (item) => item.produtoId === ""
      );
    }

    if (index === -1) {
      setItens((atual) => [
        ...atual,
        {
          produtoId:
            aparelhoEncontrado.produtoId,
          quantidade: 1,
          valorUnitario: "",
          imeis: [aparelhoEncontrado.imei],
        },
      ]);
    } else {
      adicionarImeiAoItem(
        index,
        aparelhoEncontrado.imei
      );

      if (itens[index].produtoId === "") {
        atualizarItem(index, {
          produtoId:
            aparelhoEncontrado.produtoId,
        });
      }
    }

    setImeiBusca("");

    setTimeout(() => {
      imeiInputRef.current?.focus();
    }, 50);
  }

  function onImeiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      adicionarImeiEncontrado();
    }
  }

  // =====================================================
  // FORMATAR VALORES
  // =====================================================

  function dinheiro(valor: number) {
    return `R$ ${valor
      .toFixed(2)
      .replace(".", ",")}`;
  }

  function formatarData(data?: string) {
    if (!data) return "-";

    try {
      return new Date(data).toLocaleString(
        "pt-BR"
      );
    } catch {
      return data;
    }
  }

  function nomeProdutoDoItem(item: any) {
    return (
      item?.produto?.nome ||
      item?.produtoNome ||
      item?.nome ||
      "-"
    );
  }

  function imeisDoItem(item: any) {
    if (Array.isArray(item?.aparelhos)) {
      const imeis = item.aparelhos
        .map((a: any) => a?.imei)
        .filter(Boolean);

      if (imeis.length) {
        return imeis.join(", ");
      }
    }

    if (Array.isArray(item?.imeis)) {
      return item.imeis.join(", ");
    }

    if (typeof item?.imei === "string") {
      return item.imei;
    }

    return "-";
  }

  function totalDaVenda(venda: Venda) {
    if (
      typeof venda.total === "number"
    ) {
      return venda.total;
    }

    if (
      typeof venda.valorTotal === "number"
    ) {
      return venda.valorTotal;
    }

    if (Array.isArray(venda.itens)) {
      return venda.itens.reduce(
        (soma: number, item: any) => {
          if (
            typeof item.total === "number"
          ) {
            return soma + item.total;
          }

          const quantidade =
            Number(item.quantidade) || 0;

          const valor =
            Number(
              item.valorUnitario ??
                item.preco ??
                item.valor ??
                0
            ) || 0;

          return (
            soma +
            quantidade * valor
          );
        },
        0
      );
    }

    return 0;
  }

  // =====================================================
  // REGISTRAR VENDA
  // =====================================================

  async function registrarVenda() {
    setErro("");
    setMensagem("");

    for (const item of itens) {
      if (!item.produtoId) {
        setErro(
          "Selecione o modelo de cada produto."
        );
        return;
      }

      if (
        !item.imeis.length ||
        item.imeis.length !==
          Number(item.quantidade)
      ) {
        setErro(
          "A quantidade de IMEI precisa ser igual à quantidade do aparelho."
        );
        return;
      }

      if (Number(item.quantidade) <= 0) {
        setErro("Quantidade inválida.");
        return;
      }

      if (
        !item.valorUnitario ||
        Number(
          String(
            item.valorUnitario
          ).replace(",", ".")
        ) < 0
      ) {
        setErro(
          "Informe o preço de venda."
        );
        return;
      }
    }

    setSalvando(true);

    try {
      const res = await fetch(
        "/api/vendas",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cliente,

            taxa:
              taxa === ""
                ? null
                : Number(
                    String(taxa).replace(
                      ",",
                      "."
                    )
                  ),

            itens: itens.map((item) => ({
              produtoId:
                Number(item.produtoId),

              quantidade:
                Number(item.quantidade),

              valorUnitario:
                Number(
                  String(
                    item.valorUnitario
                  ).replace(",", ".")
                ) || 0,

              imeis: item.imeis,
            })),

            formaPagamento,
            estadoFatura,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao registrar venda."
        );
      }

      setMensagem(
        data.message ||
          "Venda registrada com sucesso!"
      );

      setCliente("");
      setTaxa("");

      setFormaPagamento(
        "Não informado"
      );

      setEstadoFatura(
        "Não informado"
      );

      setItens([
        {
          produtoId: "",
          quantidade: 1,
          valorUnitario: "",
          imeis: [],
        },
      ]);

      setImeiBusca("");

      await carregarEstoque();
      await carregarVendas();

      /*
       * Se a API devolver o ID da venda,
       * abre a fatura automaticamente.
       */
      if (data.venda?.id) {
        setTimeout(() => {
          abrirFatura(data.venda);
        }, 300);
      }

      setTimeout(() => {
        imeiInputRef.current?.focus();
      }, 100);
    } catch (e: any) {
      setErro(
        e.message ||
          "Erro ao registrar venda."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // EXCLUIR VENDA
  // =====================================================

  async function excluirVenda(vendaId: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta venda?\n\nOs aparelhos e os IMEIs desta venda serão devolvidos ao estoque."
    );

    if (!confirmar) return;

    setErro("");
    setMensagem("");
    setExcluindoVendaId(vendaId);

    try {
      const res = await fetch(
        "/api/vendas",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            vendaId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao excluir venda."
        );
      }

      setMensagem(
        data.message ||
          "Venda excluída com sucesso e estoque restaurado."
      );

      await carregarEstoque();
      await carregarVendas();
    } catch (e: any) {
      setErro(
        e.message ||
          "Erro ao excluir venda."
      );
    } finally {
      setExcluindoVendaId(null);
    }
  }

  // =====================================================
  // ABRIR FATURA
  // =====================================================

  function abrirFatura(venda: Venda) {
    const itensVenda =
      Array.isArray(venda.itens)
        ? venda.itens
        : [];

    const totalVenda =
      totalDaVenda(venda);

    const numeroFatura =
      String(venda.id).padStart(
        6,
        "0"
      );

    const dataVenda =
      formatarData(
        venda.createdAt ||
          venda.data
      );

    let produtosHtml = "";

    itensVenda.forEach(
      (item: any) => {
        const quantidade =
          Number(
            item.quantidade
          ) || 0;

        const valor =
          Number(
            item.valorUnitario ??
              item.preco ??
              item.valor ??
              0
          ) || 0;

        const subtotal =
          typeof item.total ===
          "number"
            ? item.total
            : quantidade * valor;

        const nome =
          nomeProdutoDoItem(item);

        const imeis =
          imeisDoItem(item);

        produtosHtml += `
          <tr>
            <td>
              <strong>${nome}</strong>
              <br>
              <small>IMEI: ${imeis}</small>
            </td>

            <td style="text-align:center">
              ${quantidade}
            </td>

            <td style="text-align:right">
              ${dinheiro(valor)}
            </td>

            <td style="text-align:right">
              <strong>
                ${dinheiro(subtotal)}
              </strong>
            </td>
          </tr>
        `;
      }
    );

    if (!produtosHtml) {
      produtosHtml = `
        <tr>
          <td colspan="4">
            Nenhum produto encontrado.
          </td>
        </tr>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">

        <title>
          Fatura #${numeroFatura} - Adel's Mundo Cell
        </title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 30px;
            font-family: Arial, sans-serif;
            color: #111;
            background: #fff;
          }

          .invoice {
            max-width: 800px;
            margin: 0 auto;
          }

          .top {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 2px solid #111;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }

          h1 {
            margin: 0;
            font-size: 30px;
          }

          .store {
            font-size: 14px;
            color: #555;
            margin-top: 6px;
          }

          .invoice-number {
            text-align: right;
          }

          .invoice-number strong {
            font-size: 20px;
          }

          .customer {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
          }

          .customer div {
            margin: 5px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            background: #f2f2f2;
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }

          td {
            padding: 10px;
            border: 1px solid #ddd;
            vertical-align: top;
          }

          small {
            color: #555;
            word-break: break-all;
          }

          .total {
            margin-top: 20px;
            margin-left: auto;
            max-width: 300px;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }

          .grand-total {
            border-top: 2px solid #111;
            margin-top: 8px;
            padding-top: 10px;
            font-size: 20px;
            font-weight: bold;
          }

          .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 13px;
          }

          .buttons {
            max-width: 800px;
            margin: 20px auto;
            display: flex;
            gap: 10px;
            justify-content: center;
          }

          button {
            border: 0;
            border-radius: 8px;
            padding: 12px 20px;
            cursor: pointer;
            font-weight: bold;
          }

          .print {
            background: #1769e0;
            color: white;
          }

          .close {
            background: #eee;
          }

          @media print {
            body {
              padding: 0;
            }

            .buttons {
              display: none;
            }
          }
        </style>
      </head>

      <body>

        <div class="buttons">
          <button
            class="print"
            onclick="window.print()"
          >
            🖨️ Imprimir / Salvar PDF
          </button>

          <button
            class="close"
            onclick="window.close()"
          >
            Fechar
          </button>
        </div>

        <div class="invoice">

          <div class="top">

            <div>
              <h1>Adel's Mundo Cell</h1>

              <div class="store">
                Venda de aparelhos e acessórios
              </div>
            </div>

            <div class="invoice-number">
              <div>FATURA</div>

              <strong>
                #${numeroFatura}
              </strong>

              <div>
                ${dataVenda}
              </div>
            </div>

          </div>

          <div class="customer">

            <div>
              <strong>Cliente:</strong>
              ${
                venda.cliente ||
                "Não informado"
              }
            </div>

            <div>
              <strong>Pagamento:</strong>
              ${
                venda.formaPagamento ||
                "Não informado"
              }
            </div>

            <div>
              <strong>Estado:</strong>
              ${
                venda.estadoFatura ||
                "Não informado"
              }
            </div>

            ${
              venda.taxa != null
                ? `
                  <div>
                    <strong>Taxa:</strong>
                    ${venda.taxa}
                  </div>
                `
                : ""
            }

          </div>

          <table>

            <thead>
              <tr>
                <th>Produto / IMEI</th>
                <th style="text-align:center">
                  Qtd.
                </th>
                <th style="text-align:right">
                  Preço
                </th>
                <th style="text-align:right">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              ${produtosHtml}
            </tbody>

          </table>

          <div class="total">

            <div class="total-row">
              <span>Subtotal</span>

              <span>
                ${dinheiro(totalVenda)}
              </span>
            </div>

            <div class="total-row grand-total">
              <span>Total</span>

              <span>
                ${dinheiro(totalVenda)}
              </span>
            </div>

          </div>

          <div class="footer">
            Obrigado pela preferência!
            <br>
            Adel's Mundo Cell
          </div>

        </div>

      </body>
      </html>
    `;

    const janela =
      window.open(
        "",
        "_blank",
        "width=900,height=800"
      );

    if (!janela) {
      setErro(
        "O navegador bloqueou a abertura da fatura. Permita pop-ups para este site."
      );
      return;
    }

    janela.document.open();
    janela.document.write(html);
    janela.document.close();
  }

  // =====================================================
  // ENVIAR WHATSAPP
  // =====================================================

  function enviarWhatsApp(venda: Venda) {
    const itensVenda =
      Array.isArray(venda.itens)
        ? venda.itens
        : [];

    const numeroFatura =
      String(venda.id).padStart(
        6,
        "0"
      );

    const dataVenda =
      formatarData(
        venda.createdAt ||
          venda.data
      );

    let texto =
      `*Adel's Mundo Cell*\n` +
      `🧾 *Fatura #${numeroFatura}*\n\n`;

    texto +=
      `👤 Cliente: ${
        venda.cliente ||
        "Não informado"
      }\n`;

    texto +=
      `📅 Data: ${dataVenda}\n`;

    texto +=
      `💳 Pagamento: ${
        venda.formaPagamento ||
        "Não informado"
      }\n`;

    texto +=
      `📄 Estado: ${
        venda.estadoFatura ||
        "Não informado"
      }\n\n`;

    texto +=
      `*Produtos:*\n`;

    itensVenda.forEach(
      (item: any, index: number) => {
        const quantidade =
          Number(
            item.quantidade
          ) || 0;

        const valor =
          Number(
            item.valorUnitario ??
              item.preco ??
              item.valor ??
              0
          ) || 0;

        const subtotal =
          typeof item.total ===
          "number"
            ? item.total
            : quantidade * valor;

        const nome =
          nomeProdutoDoItem(item);

        const imeis =
          imeisDoItem(item);

        texto +=
          `\n${index + 1}. *${nome}*\n`;

        texto +=
          `Quantidade: ${quantidade}\n`;

        texto +=
          `Preço: ${dinheiro(valor)}\n`;

        texto +=
          `IMEI: ${imeis}\n`;

        texto +=
          `Subtotal: ${dinheiro(subtotal)}\n`;
      }
    );

    texto +=
      `\n💰 *TOTAL: ${dinheiro(
        totalDaVenda(venda)
      )}*\n\n`;

    texto +=
      `Obrigado pela preferência! 🙏\n`;

    texto +=
      `*Adel's Mundo Cell*`;

    const url =
      `https://wa.me/?text=${encodeURIComponent(
        texto
      )}`;

    window.open(
      url,
      "_blank"
    );
  }

  // =====================================================
  // TOTAL
  // =====================================================

  const totalVendas = vendas.reduce(
    (soma, venda) =>
      soma + totalDaVenda(venda),
    0
  );

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      {/* ================================================= */}
      {/* CABEÇALHO */}
      {/* ================================================= */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          marginBottom: 24,
          gap: 20,
          flexWrap: "wrap",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: 32,
              margin: 0,
            }}
          >
            Vendas
          </h1>

          <p
            style={{
              color: "#555",
            }}
          >
            Adel&apos;s Mundo Cell
          </p>

        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius: 10,
            padding: 14,
            minWidth: 180,
          }}
        >

          <input
            value={taxa}
            onChange={(e) =>
              setTaxa(
                e.target.value
              )
            }
            placeholder="Ex: 5,45"
            style={{
              width: "100%",
              padding: 10,
              boxSizing:
                "border-box",
            }}
          />

          <small>
            Taxa temporária
          </small>

        </div>

      </div>

      {/* ================================================= */}
      {/* NOVA VENDA */}
      {/* ================================================= */}

      <section
        style={{
          border:
            "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 20,
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >

          <h2
            style={{
              fontSize: 18,
            }}
          >
            Nova venda
          </h2>

          <strong>
            Total:{" "}
            {dinheiro(total)}
          </strong>

        </div>

        {/* CLIENTE */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >

          <label>
            Cliente (opcional)

            <input
              value={cliente}
              onChange={(e) =>
                setCliente(
                  e.target.value
                )
              }
              placeholder="Nome do cliente"
              style={inputStyle}
            />

          </label>

          <label>
            Forma de pagamento

            <select
              value={
                formaPagamento
              }
              onChange={(e) =>
                setFormaPagamento(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option>
                Não informado
              </option>

              <option>
                Dinheiro
              </option>

              <option>
                Pix
              </option>

              <option>
                Cartão
              </option>

              <option>
                Transferência
              </option>

            </select>

          </label>

          <label>
            Estado da fatura

            <select
              value={
                estadoFatura
              }
              onChange={(e) =>
                setEstadoFatura(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option>
                Não informado
              </option>

              <option>
                Pago
              </option>

              <option>
                Pendente
              </option>

            </select>

          </label>

        </div>

        {/* PRODUTOS */}

        {itens.map(
          (item, index) => {

            const produto =
              produtos.find(
                (p) =>
                  p.id ===
                  item.produtoId
              );

            const disponiveis =
              (
                produto?.aparelhos ||
                []
              ).filter(
                (a) =>
                  !a.vendido
              );

            return (
              <div
                key={index}
                style={{
                  marginTop: 22,
                  borderTop:
                    "1px solid #eee",
                  paddingTop: 18,
                }}
              >

                <h3
                  style={{
                    fontSize: 16,
                  }}
                >
                  Produto{" "}
                  {index + 1}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "2fr .8fr 1fr 1fr",
                    gap: 14,
                  }}
                >

                  <label>
                    Modelo

                    <select
                      value={
                        item.produtoId
                      }
                      onChange={(e) =>
                        atualizarItem(
                          index,
                          {
                            produtoId:
                              e.target
                                .value
                                ? Number(
                                    e.target
                                      .value
                                  )
                                : "",

                            imeis: [],

                            quantidade: 1,
                          }
                        )
                      }
                      style={
                        inputStyle
                      }
                    >

                      <option value="">
                        Selecione o modelo
                      </option>

                      {produtos
                        .filter(
                          (p) =>
                            p.quantidade >
                            0
                        )
                        .map(
                          (p) => (
                            <option
                              key={
                                p.id
                              }
                              value={
                                p.id
                              }
                            >
                              {p.nome} —
                              estoque:{" "}
                              {
                                p.quantidade
                              }
                            </option>
                          )
                        )}

                    </select>

                  </label>

                  <label>
                    Quantidade

                    <input
                      type="number"
                      min={1}
                      max={
                        disponiveis.length ||
                        1
                      }
                      value={
                        item.quantidade
                      }
                      onChange={(e) =>
                        atualizarItem(
                          index,
                          {
                            quantidade:
                              Number(
                                e.target
                                  .value
                              ) || 1,
                          }
                        )
                      }
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  <label>
                    Preço por aparelho

                    <input
                      value={
                        item.valorUnitario
                      }
                      onChange={(e) =>
                        atualizarItem(
                          index,
                          {
                            valorUnitario:
                              e.target
                                .value,
                          }
                        )
                      }
                      placeholder="R$ 0,00"
                      inputMode="decimal"
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  <div>

                    <span>
                      Total
                    </span>

                    <div
                      style={{
                        ...inputStyle,
                        background:
                          "#eef1f4",
                        fontWeight: 700,
                      }}
                    >
                      {dinheiro(
                        (Number(
                          item.quantidade
                        ) || 0) *
                          (Number(
                            String(
                              item.valorUnitario
                            ).replace(
                              ",",
                              "."
                            )
                          ) || 0)
                      )}
                    </div>

                  </div>

                </div>

                {/* IMEI */}

                <div
                  style={{
                    marginTop: 14,
                  }}
                >

                  <label>

                    <b>
                      Pesquisar IMEI
                    </b>

                    <input
                      ref={
                        index === 0
                          ? imeiInputRef
                          : undefined
                      }
                      value={
                        imeiBusca
                      }
                      onChange={(e) =>
                        setImeiBusca(
                          e.target.value.replace(
                            /\s/g,
                            ""
                          )
                        )
                      }
                      onKeyDown={
                        onImeiKeyDown
                      }
                      placeholder="Digite ou faça Scan do IMEI"
                      inputMode="numeric"
                      autoComplete="off"
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  {imeiBusca && (
                    <div
                      style={{
                        marginTop: 10,
                        border:
                          "1px solid #b9d8ff",
                        borderRadius: 10,
                        padding: 14,
                      }}
                    >

                      {resultadosBusca.length >
                      0 ? (

                        <div
                          style={{
                            overflowX:
                              "auto",
                          }}
                        >

                          <table
                            style={{
                              width:
                                "100%",
                              borderCollapse:
                                "collapse",
                            }}
                          >

                            <thead>
                              <tr>

                                <th style={th}>
                                  IMEI
                                </th>

                                <th style={th}>
                                  Modelo
                                </th>

                                <th style={th}>
                                  Status
                                </th>

                                <th style={th}>
                                  Ação
                                </th>

                              </tr>
                            </thead>

                            <tbody>

                              {resultadosBusca.map(
                                (a) => (
                                  <tr
                                    key={
                                      a.id
                                    }
                                  >

                                    <td style={td}>
                                      {
                                        a.imei
                                      }
                                    </td>

                                    <td style={td}>
                                      {
                                        a
                                          .produto
                                          ?.nome
                                      }
                                    </td>

                                    <td style={td}>
                                      <span
                                        style={{
                                          color:
                                            "#16823b",
                                          fontWeight:
                                            600,
                                        }}
                                      >
                                        Disponível
                                      </span>
                                    </td>

                                    <td style={td}>

                                      <button
                                        type="button"
                                        onClick={() => {

                                          const idx =
                                            itens.findIndex(
                                              (
                                                x
                                              ) =>
                                                x.produtoId ===
                                                a.produtoId
                                            );

                                          if (
                                            idx >=
                                            0
                                          ) {

                                            adicionarImeiAoItem(
                                              idx,
                                              a.imei
                                            );

                                          } else {

                                            const vazio =
                                              itens.findIndex(
                                                (
                                                  x
                                                ) =>
                                                  x.produtoId ===
                                                  ""
                                              );

                                            if (
                                              vazio >=
                                              0
                                            ) {

                                              atualizarItem(
                                                vazio,
                                                {
                                                  produtoId:
                                                    a.produtoId,
                                                  quantidade: 1,
                                                  imeis: [
                                                    a.imei,
                                                  ],
                                                }
                                              );

                                            }

                                          }

                                          setImeiBusca(
                                            ""
                                          );

                                        }}
                                        style={
                                          smallBlueButton
                                        }
                                      >
                                        Adicionar
                                      </button>

                                    </td>

                                  </tr>
                                )
                              )}

                            </tbody>

                          </table>

                        </div>

                      ) : (

                        <div
                          style={{
                            color:
                              "#b42318",
                          }}
                        >
                          IMEI não encontrado
                          ou já vendido.
                        </div>

                      )}

                      <button
                        type="button"
                        onClick={
                          adicionarImeiEncontrado
                        }
                        style={{
                          ...blueButton,
                          marginTop: 10,
                        }}
                      >
                        Buscar / Adicionar
                      </button>

                    </div>
                  )}

                </div>

                {/* IMEIS */}

                <div
                  style={{
                    marginTop: 14,
                  }}
                >

                  <strong>
                    IMEIs adicionados (
                    {
                      item.imeis
                        .length
                    }
                    )
                  </strong>

                  {item.imeis
                    .length === 0 ? (

                    <p
                      style={{
                        color: "#777",
                      }}
                    >
                      Nenhum IMEI adicionado ainda.
                    </p>

                  ) : (

                    <div
                      style={{
                        display:
                          "flex",
                        flexWrap:
                          "wrap",
                        gap: 8,
                        marginTop: 8,
                      }}
                    >

                      {item.imeis.map(
                        (imei) => (

                          <span
                            key={imei}
                            style={{
                              border:
                                "1px solid #ddd",
                              borderRadius:
                                8,
                              padding:
                                "7px 10px",
                            }}
                          >

                            {imei}

                            <button
                              type="button"
                              onClick={() =>
                                removerImei(
                                  index,
                                  imei
                                )
                              }
                              style={{
                                marginLeft: 8,
                                border: 0,
                                background:
                                  "transparent",
                                cursor:
                                  "pointer",
                                color:
                                  "#c62828",
                              }}
                            >
                              ×
                            </button>

                          </span>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>
            );
          }
        )}

        {/* ERRO */}

        {erro && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background:
                "#fff1f0",
              color: "#b42318",
              borderRadius: 8,
            }}
          >
            {erro}
          </div>
        )}

        {/* SUCESSO */}

        {mensagem && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background:
                "#eefaf1",
              color: "#16823b",
              borderRadius: 8,
            }}
          >
            {mensagem}
          </div>
        )}

        {/* BOTÕES */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >

          <button
            type="button"
            onClick={
              adicionarModelo
            }
            style={blueButton}
          >
            + Adicionar outro modelo
          </button>

          <button
            type="button"
            onClick={
              registrarVenda
            }
            disabled={salvando}
            style={blackButton}
          >
            {salvando
              ? "Salvando..."
              : "Registrar venda"}
          </button>

        </div>

      </section>

      {/* ================================================= */}
      {/* HISTÓRICO */}
      {/* ================================================= */}

      <section
        style={{
          marginTop: 30,
          border:
            "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: 22,
              }}
            >
              Vendas registradas
            </h2>

            <p
              style={{
                margin:
                  "6px 0 0",
                color: "#666",
              }}
            >
              Aqui aparecem as vendas que você registrou.
            </p>

          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              background:
                "#eef1f4",
            }}
          >

            <strong>
              Total:{" "}
              {dinheiro(totalVendas)}
            </strong>

          </div>

        </div>

        {carregandoVendas ? (

          <p
            style={{
              marginTop: 20,
              color: "#666",
            }}
          >
            Carregando vendas...
          </p>

        ) : vendas.length === 0 ? (

          <div
            style={{
              marginTop: 20,
              padding: 20,
              border:
                "1px dashed #ccc",
              borderRadius: 10,
              color: "#777",
              textAlign: "center",
            }}
          >
            Nenhuma venda registrada ainda.
          </div>

        ) : (

          <div
            style={{
              marginTop: 20,
              overflowX: "auto",
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: 1200,
              }}
            >

              <thead>

                <tr>

                  <th style={th}>
                    Data
                  </th>

                  <th style={th}>
                    Cliente
                  </th>

                  <th style={th}>
                    Produto
                  </th>

                  <th style={th}>
                    IMEI
                  </th>

                  <th style={th}>
                    Qtd.
                  </th>

                  <th style={th}>
                    Total
                  </th>

                  <th style={th}>
                    Pagamento
                  </th>

                  <th style={th}>
                    Fatura
                  </th>

                  <th style={th}>
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody>

                {vendas.map(
                  (venda) => {

                    const itensVenda =
                      Array.isArray(
                        venda.itens
                      )
                        ? venda.itens
                        : [];

                    if (
                      itensVenda.length ===
                      0
                    ) {

                      return (
                        <tr
                          key={
                            venda.id
                          }
                        >

                          <td style={td}>
                            {formatarData(
                              venda.createdAt ||
                                venda.data
                            )}
                          </td>

                          <td style={td}>
                            {venda.cliente ||
                              "-"}
                          </td>

                          <td style={td}>
                            -
                          </td>

                          <td style={td}>
                            -
                          </td>

                          <td style={td}>
                            -
                          </td>

                          <td
                            style={{
                              ...td,
                              fontWeight:
                                700,
                            }}
                          >
                            {dinheiro(
                              totalDaVenda(
                                venda
                              )
                            )}
                          </td>

                          <td style={td}>
                            {venda.formaPagamento ||
                              "-"}
                          </td>

                          <td style={td}>

                            <button
                              type="button"
                              onClick={() =>
                                abrirFatura(
                                  venda
                                )
                              }
                              style={
                                invoiceButton
                              }
                            >
                              🧾 Fatura
                            </button>

                          </td>

                          <td style={td}>

                            <div
                              style={{
                                display:
                                  "flex",
                                gap: 6,
                                flexWrap:
                                  "wrap",
                              }}
                            >

                              <button
                                type="button"
                                onClick={() =>
                                  enviarWhatsApp(
                                    venda
                                  )
                                }
                                style={
                                  whatsappButton
                                }
                              >
                                📲 WhatsApp
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  excluirVenda(
                                    venda.id
                                  )
                                }
                                disabled={
                                  excluindoVendaId ===
                                  venda.id
                                }
                                style={
                                  deleteButton
                                }
                              >
                                {excluindoVendaId ===
                                venda.id
                                  ? "Excluindo..."
                                  : "Excluir"}
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }

                    return itensVenda.map(
                      (
                        item: any,
                        itemIndex: number
                      ) => {

                        const quantidade =
                          Number(
                            item.quantidade
                          ) || 0;

                        const valor =
                          Number(
                            item.valorUnitario ??
                              item.preco ??
                              item.valor ??
                              0
                          ) || 0;

                        const subtotal =
                          typeof item.total ===
                          "number"
                            ? item.total
                            : quantidade *
                              valor;

                        return (
                          <tr
                            key={`${venda.id}-${itemIndex}`}
                          >

                            <td style={td}>
                              {formatarData(
                                venda.createdAt ||
                                  venda.data
                              )}
                            </td>

                            <td style={td}>
                              {venda.cliente ||
                                "-"}
                            </td>

                            <td
                              style={{
                                ...td,
                                fontWeight:
                                  600,
                              }}
                            >
                              {nomeProdutoDoItem(
                                item
                              )}
                            </td>

                            <td
                              style={{
                                ...td,
                                fontSize:
                                  12,
                              }}
                            >
                              {imeisDoItem(
                                item
                              )}
                            </td>

                            <td style={td}>
                              {
                                quantidade
                              }
                            </td>

                            <td
                              style={{
                                ...td,
                                fontWeight:
                                  700,
                              }}
                            >
                              {dinheiro(
                                subtotal
                              )}
                            </td>

                            <td style={td}>
                              {venda.formaPagamento ||
                                "-"}
                            </td>

                            {itemIndex ===
                            0 ? (

                              <td
                                rowSpan={
                                  itensVenda.length
                                }
                                style={{
                                  ...td,
                                  verticalAlign:
                                    "middle",
                                  textAlign:
                                    "center",
                                }}
                              >

                                <button
                                  type="button"
                                  onClick={() =>
                                    abrirFatura(
                                      venda
                                    )
                                  }
                                  style={
                                    invoiceButton
                                  }
                                >
                                  🧾 Fatura
                                </button>

                              </td>

                            ) : null}

                            {itemIndex ===
                            0 ? (

                              <td
                                rowSpan={
                                  itensVenda.length
                                }
                                style={{
                                  ...td,
                                  verticalAlign:
                                    "middle",
                                }}
                              >

                                <div
                                  style={{
                                    display:
                                      "flex",
                                    gap: 6,
                                    flexDirection:
                                      "column",
                                  }}
                                >

                                  <button
                                    type="button"
                                    onClick={() =>
                                      enviarWhatsApp(
                                        venda
                                      )
                                    }
                                    style={
                                      whatsappButton
                                    }
                                  >
                                    📲 WhatsApp
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      excluirVenda(
                                        venda.id
                                      )
                                    }
                                    disabled={
                                      excluindoVendaId ===
                                      venda.id
                                    }
                                    style={
                                      deleteButton
                                    }
                                  >
                                    {excluindoVendaId ===
                                    venda.id
                                      ? "Excluindo..."
                                      : "Excluir"}
                                  </button>

                                </div>

                              </td>

                            ) : null}

                          </tr>
                        );
                      }
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </main>
  );
}

/* ================================================= */
/* ESTILOS */
/* ================================================= */

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  marginTop: 6,
  padding: "11px 12px",
  border:
    "1px solid #d8d8d8",
  borderRadius: 8,
  background: "#fff",
  fontSize: 14,
};

const blueButton: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "10px 14px",
  background: "#1769e0",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const smallBlueButton: React.CSSProperties = {
  ...blueButton,
  padding: "7px 11px",
  fontSize: 13,
};

const blackButton: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "10px 16px",
  background: "#202124",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const invoiceButton: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "8px 12px",
  background: "#1769e0",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const whatsappButton: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "8px 12px",
  background: "#16823b",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const deleteButton: React.CSSProperties = {
  border: 0,
  borderRadius: 8,
  padding: "8px 12px",
  background: "#c62828",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: 9,
  borderBottom:
    "1px solid #ddd",
  fontSize: 13,
  background: "#f7f7f7",
};

const td: React.CSSProperties = {
  padding: 9,
  borderBottom:
    "1px solid #eee",
  fontSize: 13,
};