import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET — TELEFONES E CUSTOS
// =====================================================

export async function GET() {
  try {
    const produtos =
      await prisma.produto.findMany({
        orderBy: {
          nome: "asc",
        },

        select: {
          id: true,
          nome: true,
          quantidade: true,

          aparelhos: {
            select: {
              id: true,
              imei: true,
              vendido: true,

              lote: {
                select: {
                  id: true,
                  precoCompraUsd: true,
                  precoCompraBrl: true,
                  tipoCusto: true,
                },
              },
            },
          },
        },
      });

    // =================================================
    // PREPARAR PRODUTOS
    // =================================================

    const produtosPreparados =
      produtos.map((produto) => {
        // -------------------------------------------------
        // PEGAR APARELHOS QUE POSSUEM CUSTO
        // -------------------------------------------------

        const aparelhosComCusto =
          produto.aparelhos.filter(
            (aparelho) =>
              aparelho.lote &&
              (
                aparelho.lote.precoCompraUsd !== null ||
                aparelho.lote.precoCompraBrl !== null
              )
          );

        // -------------------------------------------------
        // PEGAR O PRIMEIRO CUSTO CADASTRADO
        // -------------------------------------------------

        const aparelhoComCusto =
          aparelhosComCusto[0];

        const lote =
          aparelhoComCusto?.lote ?? null;

        return {
          id: produto.id,

          nome: produto.nome,

          quantidade: produto.quantidade,

          // =================================================
          // CUSTO
          // =================================================

          precoCompraUsd:
            lote?.precoCompraUsd ?? null,

          precoCompraBrl:
            lote?.precoCompraBrl ?? null,

          tipoCusto:
            lote?.tipoCusto ?? null,

          // =================================================
          // APARELHOS
          // =================================================

          aparelhos:
            produto.aparelhos.map(
              (aparelho) => ({
                id: aparelho.id,

                imei: aparelho.imei,

                vendido: aparelho.vendido,
              })
            ),
        };
      });

    return NextResponse.json(
      produtosPreparados
    );
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR CUSTOS:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar custos.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PUT — SALVAR / ALTERAR CUSTO
// =====================================================

export async function PUT(
  req: Request
) {
  try {
    const body =
      await req.json();

    const produtoId =
      Number(
        body.produtoId
      );

    const tipoCusto =
      String(
        body.tipoCusto || ""
      ).toUpperCase();

    const preco =
      Number(
        String(
          body.preco ?? ""
        ).replace(
          ",",
          "."
        )
      );

    // =================================================
    // VALIDAR PRODUTO
    // =================================================

    if (
      !Number.isInteger(
        produtoId
      ) ||
      produtoId <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Produto inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VALIDAR TIPO
    // =================================================

    if (
      tipoCusto !== "USD" &&
      tipoCusto !== "BRL"
    ) {
      return NextResponse.json(
        {
          error:
            "Escolha USD ou BRL.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VALIDAR PREÇO
    // =================================================

    if (
      !Number.isFinite(
        preco
      ) ||
      preco <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Informe um custo válido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // BUSCAR PRODUTO
    // =================================================

    const produto =
      await prisma.produto.findUnique(
        {
          where: {
            id: produtoId,
          },

          select: {
            id: true,
            nome: true,

            aparelhos: {
              select: {
                id: true,

                lote: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        }
      );

    if (!produto) {
      return NextResponse.json(
        {
          error:
            "Produto não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    // =================================================
    // PEGAR IDS DOS LOTES
    // =================================================

    const loteIds =
      produto.aparelhos
        .map(
          (aparelho) =>
            aparelho.lote?.id
        )
        .filter(
          (
            id
          ): id is number =>
            Number.isInteger(id)
        );

    // =================================================
    // VERIFICAR LOTES
    // =================================================

    if (
      loteIds.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Nenhum lote encontrado para os aparelhos deste produto.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // REMOVER DUPLICADOS
    // =================================================

    const loteIdsUnicos =
      Array.from(
        new Set(
          loteIds
        )
      );

    // =================================================
    // SALVAR CUSTO NOS LOTES
    // =================================================

    const resultado =
      await prisma.lote.updateMany({
        where: {
          id: {
            in: loteIdsUnicos,
          },
        },

        data:
          tipoCusto === "USD"
            ? {
                precoCompraUsd:
                  preco,

                precoCompraBrl:
                  null,

                tipoCusto:
                  "USD",
              }
            : {
                precoCompraUsd:
                  null,

                precoCompraBrl:
                  preco,

                tipoCusto:
                  "BRL",
              },
      });

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      success: true,

      message:
        "Custo salvo com sucesso.",

      produtoId,

      produto:
        produto.nome,

      tipoCusto,

      preco,

      lotesAtualizados:
        resultado.count,
    });
  } catch (error) {
    console.error(
      "ERRO AO SALVAR CUSTO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar custo.",
      },
      {
        status: 500,
      }
    );
  }
}