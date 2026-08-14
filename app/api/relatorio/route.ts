import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// تحويل تاريخ البرازيل إلى بداية اليوم
// =====================================================

function inicioDoDia(data: string) {
  return new Date(`${data}T00:00:00-03:00`);
}

// =====================================================
// تحويل تاريخ البرازيل إلى نهاية اليوم
// =====================================================

function fimDoDia(data: string) {
  return new Date(`${data}T23:59:59.999-03:00`);
}

// =====================================================
// GET — RELATÓRIO
// =====================================================

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const dataInicio =
      searchParams.get("dataInicio");

    const dataFim =
      searchParams.get("dataFim");

    // =================================================
    // FILTRO DE DATA
    // =================================================

    const whereVenda: any = {};

    if (dataInicio || dataFim) {
      whereVenda.createdAt = {};

      if (dataInicio) {
        whereVenda.createdAt.gte =
          inicioDoDia(dataInicio);
      }

      if (dataFim) {
        whereVenda.createdAt.lte =
          fimDoDia(dataFim);
      }
    }

    // =================================================
    // PRODUTOS
    // =================================================

    const produtos =
      await prisma.produto.count();

    // =================================================
    // ESTOQUE
    // =================================================

    const estoque =
      await prisma.produto.aggregate({
        _sum: {
          quantidade: true,
        },
      });

    // =================================================
    // VENDAS
    // =================================================

    const vendas =
      await prisma.venda.findMany({
        where: whereVenda,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          itens: {
            include: {
              produto: true,

              aparelhos: {
                select: {
                  imei: true,
                },
              },
            },
          },
        },
      });

    // =================================================
    // PREPARAR LISTA
    // =================================================

    const listaVendas = vendas.map(
      (venda) => {
        const quantidade =
          venda.itens.reduce(
            (total, item) =>
              total + item.quantidade,
            0
          );

        const valorVenda =
          venda.itens.reduce(
            (total, item) =>
              total + Number(item.total ?? 0),
            0
          );

        const custoTotal =
          venda.itens.reduce(
            (total, item) =>
              total +
              Number(item.custoTotal ?? 0),
            0
          );

        const taxa =
          venda.taxa !== null &&
          venda.taxa !== undefined
            ? Number(venda.taxa)
            : null;

        // =============================================
        // LUCRO
        // =============================================

        let custoCalculado =
          custoTotal;

        if (
          custoCalculado === 0 &&
          taxa !== null
        ) {
          custoCalculado = 0;

          for (const item of venda.itens) {
            const precoUsd =
              Number(
                item.precoCompraUsd ?? 0
              );

            custoCalculado +=
              precoUsd *
              taxa *
              item.quantidade;
          }
        }

        const lucro =
          valorVenda -
          custoCalculado;

        // =============================================
        // USD MÉDIO
        // =============================================

        let precoCompraUsd:
          number | null = null;

        if (quantidade > 0) {
          const somaUsd =
            venda.itens.reduce(
              (total, item) =>
                total +
                Number(
                  item.precoCompraUsd ?? 0
                ) *
                item.quantidade,
              0
            );

          if (somaUsd > 0) {
            precoCompraUsd =
              somaUsd / quantidade;
          }
        }

        // =============================================
        // IMEIs
        // =============================================

        const imeis =
          venda.itens
            .flatMap(
              (item) =>
                item.aparelhos
            )
            .map(
              (aparelho) =>
                aparelho.imei
            )
            .filter(Boolean);

        // =============================================
        // PRODUTOS
        // =============================================

        const produtosVenda =
          venda.itens
            .map(
              (item) =>
                item.produto?.nome
            )
            .filter(Boolean);

        const produto =
          produtosVenda.length > 0
            ? produtosVenda.join(", ")
            : null;

        // =============================================
        // RETORNO
        // =============================================

        return {
          id: venda.id,

          cliente:
            venda.cliente ?? "",

          quantidade,

          valorVenda:
            Number(valorVenda),

          custo:
            Number(custoCalculado),

          custoTotal:
            Number(custoCalculado),

          lucro:
            Number(lucro),

          taxa,

          taxaFechada:
            venda.taxaFechada ?? false,

          precoCompraUsd,

          createdAt:
            venda.createdAt,

          produto,

          imeis,
        };
      }
    );

    // =================================================
    // TOTAIS
    // =================================================

    const valorVendas =
      listaVendas.reduce(
        (total, venda) =>
          total +
          Number(venda.valorVenda),
        0
      );

    const custoTotal =
      listaVendas.reduce(
        (total, venda) =>
          total +
          Number(venda.custo),
        0
      );

    const lucroTotal =
      listaVendas.reduce(
        (total, venda) =>
          total +
          Number(venda.lucro),
        0
      );

    return NextResponse.json({
      produtos,

      quantidadeEstoque:
        estoque._sum.quantidade ?? 0,

      vendas:
        listaVendas.length,

      valorVendas,

      custoTotal,

      lucroTotal,

      listaVendas,
    });
  } catch (error) {
    console.error(
      "ERRO AO CARREGAR RELATÓRIO:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro ao carregar relatório.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH — SALVAR TAXA NAS VENDAS DO PERÍODO
// =====================================================

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const dataInicio =
      String(
        body.dataInicio ?? ""
      ).trim();

    const dataFim =
      String(
        body.dataFim ?? ""
      ).trim();

    const taxaTexto =
      String(
        body.taxa ?? ""
      )
        .trim()
        .replace(",", ".");

    // =================================================
    // VALIDAR DATAS
    // =================================================

    if (!dataInicio || !dataFim) {
      return NextResponse.json(
        {
          error:
            "Informe a data inicial e a data final.",
        },
        {
          status: 400,
        }
      );
    }

    if (dataInicio > dataFim) {
      return NextResponse.json(
        {
          error:
            "A data inicial não pode ser maior que a data final.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VALIDAR TAXA
    // =================================================

    const taxa =
      Number(taxaTexto);

    if (
      !Number.isFinite(taxa) ||
      taxa < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Digite uma Taxa válida.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // PERÍODO
    // =================================================

    const inicio =
      inicioDoDia(dataInicio);

    const fim =
      fimDoDia(dataFim);

    // =================================================
    // BUSCAR VENDAS
    // =================================================

    const vendas =
      await prisma.venda.findMany({
        where: {
          createdAt: {
            gte: inicio,
            lte: fim,
          },
        },

        select: {
          id: true,
        },
      });

    if (vendas.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Nenhuma venda encontrada nesse período.",
          quantidade: 0,
        },
        {
          status: 404,
        }
      );
    }

    // =================================================
    // SALVAR TAXA
    // =================================================

    const resultado =
      await prisma.venda.updateMany({
        where: {
          id: {
            in: vendas.map(
              (venda) =>
                venda.id
            ),
          },
        },

        data: {
          taxa,
          taxaFechada: true,
        },
      });

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      success: true,

      message:
        `Taxa ${taxa.toFixed(
          2
        )} salva em ${resultado.count} venda(s).`,

      quantidade:
        resultado.count,

      taxa,
    });
  } catch (error: any) {
    console.error(
      "ERRO AO SALVAR TAXA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erro ao salvar taxa.",
      },
      {
        status: 500,
      }
    );
  }
}