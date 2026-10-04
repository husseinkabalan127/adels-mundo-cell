import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getDateRange(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);

  if (
    !year ||
    !monthNumber ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    return null;
  }

  const inicio = new Date(
    Date.UTC(year, monthNumber - 1, 1, 0, 0, 0)
  );

  const fim = new Date(
    Date.UTC(year, monthNumber, 1, 0, 0, 0)
  );

  return { inicio, fim };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const month =
      searchParams.get("month") ||
      new Date().toISOString().slice(0, 7);

    const range = getDateRange(month);

    if (!range) {
      return NextResponse.json(
        {
          error:
            "Mês inválido. Use o formato YYYY-MM.",
        },
        { status: 400 }
      );
    }

    const { inicio, fim } = range;

    // =====================================================
    // COMPRAS
    // =====================================================

    const compras = await prisma.lote.findMany({
      where: {
        dataCompra: {
          gte: inicio,
          lt: fim,
        },
      },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
          },
        },
        aparelhos: {
          select: {
            id: true,
            imei: true,
            cor: true,
            memoria: true,
          },
        },
      },
      orderBy: {
        dataCompra: "asc",
      },
    });

    // =====================================================
    // VENDAS
    // =====================================================

    const vendas = await prisma.venda.findMany({
      where: {
        dataVenda: {
          gte: inicio,
          lt: fim,
        },
      },
      include: {
        itens: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
              },
            },
            aparelhos: {
              select: {
                imei: true,
                cor: true,
                memoria: true,
              },
            },
          },
        },
      },
      orderBy: {
        dataVenda: "asc",
      },
    });

    // =====================================================
    // ASSISTÊNCIAS
    // =====================================================

    const assistencias =
      await prisma.assistencia.findMany({
        where: {
          OR: [
            {
              dataEntrada: {
                gte: inicio,
                lt: fim,
              },
            },
            {
              dataSaida: {
                gte: inicio,
                lt: fim,
              },
            },
          ],
        },
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
          aparelho: {
            select: {
              imei: true,
              cor: true,
              memoria: true,
            },
          },
        },
        orderBy: {
          dataEntrada: "asc",
        },
      });

    // =====================================================
    // TRANSFORMAR EVENTOS
    // =====================================================

    const eventos = [
      ...compras.map((compra) => ({
        id: `compra-${compra.id}`,
        tipo: "COMPRA",
        titulo: compra.produto.nome,
        data: compra.dataCompra,
        descricao: `Compra de ${compra.quantidade} aparelho(s)`,
        fornecedor: compra.fornecedor,
        quantidade: compra.quantidade,
        moeda: compra.moedaCompra,
        preco: compra.precoCompra,
        loteId: compra.id,
        aparelhos: compra.aparelhos,
      })),

      ...vendas.map((venda) => ({
        id: `venda-${venda.id}`,
        tipo: "VENDA",
        titulo: venda.cliente || "Venda",
        data: venda.dataVenda,
        descricao: `Venda #${venda.id}`,
        cliente: venda.cliente,
        quantidade: venda.itens.reduce(
          (total, item) =>
            total + item.quantidade,
          0
        ),
        valor: venda.valorVenda,
        vendaId: venda.id,
        itens: venda.itens,
      })),

      ...assistencias.flatMap((assistencia) => {
        const eventosAssistencia = [];

        if (
          assistencia.dataEntrada >= inicio &&
          assistencia.dataEntrada < fim
        ) {
          eventosAssistencia.push({
            id: `assistencia-entrada-${assistencia.id}`,
            tipo: "ASSISTENCIA",
            titulo:
              assistencia.cliente ||
              "Assistência",
            data: assistencia.dataEntrada,
            descricao:
              assistencia.problema,
            status: assistencia.status,
            custo: assistencia.custo,
            produto:
              assistencia.produto.nome,
            imei:
              assistencia.aparelho?.imei ||
              null,
            assistenciaId: assistencia.id,
            movimento: "ENTRADA",
          });
        }

        if (
          assistencia.dataSaida &&
          assistencia.dataSaida >= inicio &&
          assistencia.dataSaida < fim
        ) {
          eventosAssistencia.push({
            id: `assistencia-saida-${assistencia.id}`,
            tipo: "ASSISTENCIA",
            titulo:
              assistencia.cliente ||
              "Assistência",
            data: assistencia.dataSaida,
            descricao:
              assistencia.problema,
            status: assistencia.status,
            custo: assistencia.custo,
            produto:
              assistencia.produto.nome,
            imei:
              assistencia.aparelho?.imei ||
              null,
            assistenciaId: assistencia.id,
            movimento: "SAIDA",
          });
        }

        return eventosAssistencia;
      }),
    ].sort(
      (a, b) =>
        new Date(a.data).getTime() -
        new Date(b.data).getTime()
    );

    return NextResponse.json({
      month,
      eventos,
      resumo: {
        compras: compras.length,
        vendas: vendas.length,
        assistencias: assistencias.length,
      },
    });
  } catch (error) {
    console.error(
      "Erro ao carregar calendário:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro ao carregar dados do calendário.",
      },
      { status: 500 }
    );
  }
}