import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const imei =
      searchParams
        .get("imei")
        ?.trim();

    if (!imei) {
      return NextResponse.json(
        {
          error:
            "IMEI não informado.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // BUSCAR IMEI
    // =====================================================

    const aparelho =
      await prisma.aparelho.findFirst({
        where: {
          imei,
        },

        include: {
          produto: true,

          lote: true,

          // =================================================
          // VENDA DO APARELHO
          // =================================================

          vendaItem: {
            include: {
              venda: {
                select: {
                  id: true,
                  cliente: true,
                  dataVenda: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });

    // =====================================================
    // NÃO ENCONTRADO
    // =====================================================

    if (!aparelho) {
      return NextResponse.json({
        encontrado: false,

        mensagem:
          "Este IMEI não foi encontrado no sistema da Adel's Mundo Cell.",
      });
    }

    // =====================================================
    // VENDA
    // =====================================================

    const venda =
      aparelho.vendaItem?.venda ??
      null;

    // =====================================================
    // RESPOSTA
    // =====================================================

    return NextResponse.json({
      encontrado: true,

      aparelho: {
        id: aparelho.id,

        imei: aparelho.imei,

        vendido:
          aparelho.vendido,

        produto:
          aparelho.produto
            ? {
                id:
                  aparelho.produto.id,

                nome:
                  aparelho.produto.nome,
              }
            : null,

        lote:
          aparelho.lote
            ? {
                id:
                  aparelho.lote.id,

                fornecedor:
                  aparelho.lote
                    .fornecedor,

                precoCompraUsd:
                  aparelho.lote
                    .precoCompraUsd,
              }
            : null,

        // =================================================
        // INFORMAÇÕES DA VENDA
        // =================================================

        venda: venda
          ? {
              id: venda.id,

              cliente:
                venda.cliente,

              dataVenda:
                venda.dataVenda,

              createdAt:
                venda.createdAt,
            }
          : null,
      },
    });

  } catch (error) {

    console.error(
      "ERRO AO CONSULTAR IMEI:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao consultar IMEI.",
      },
      {
        status: 500,
      }
    );
  }
}