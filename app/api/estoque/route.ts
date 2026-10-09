import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

// =====================================================
// GET - BUSCAR ESTOQUE
// =====================================================

export async function GET() {
  try {
    const usuario = await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      );
    }

    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        lotes: {
          orderBy: {
            createdAt: "desc",
          },

          include: {
            aparelhos: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },

        aparelhos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // =================================================
    // PREPARAR ESTOQUE
    //
    // IMPORTANTE:
    // Somente aparelhos NÃO vendidos aparecem.
    //
    // Cor e memória vêm diretamente do Aparelho.
    // =================================================

    const produtosPreparados = produtos
      .map((produto) => {
        const aparelhosDisponiveis =
          produto.aparelhos.filter(
            (aparelho) => !aparelho.vendido
          );

        const lotesPreparados = produto.lotes
          .map((lote) => {
            const aparelhosDisponiveisLote =
              lote.aparelhos.filter(
                (aparelho) => !aparelho.vendido
              );

            return {
              id: lote.id,

              quantidade:
                aparelhosDisponiveisLote.length,

              quantidadeComprada:
                lote.quantidade,

              fornecedor:
                lote.fornecedor,

              createdAt:
                lote.createdAt,

              dataCompra:
                lote.dataCompra,

              precoCompra:
                lote.precoCompra,

              moedaCompra:
                lote.moedaCompra,

              precoCompraUsd:
                lote.precoCompraUsd,

              precoCompraBrl:
                lote.precoCompraBrl,

              aparelhos:
                aparelhosDisponiveisLote.map(
                  (aparelho) => ({
                    id: aparelho.id,

                    imei:
                      aparelho.imei,

                    vendido:
                      aparelho.vendido,

                    produtoId:
                      aparelho.produtoId,

                    loteId:
                      aparelho.loteId,

                    // =================================
                    // COR
                    // =================================

                    cor:
                      aparelho.cor ?? null,

                    // =================================
                    // MEMÓRIA / GB
                    // =================================

                    memoria:
                      aparelho.memoria ?? null,

                    createdAt:
                      aparelho.createdAt,
                  })
                ),
            };
          })
          .filter(
            (lote) =>
              lote.aparelhos.length > 0
          );

        return {
          id: produto.id,

          nome:
            produto.nome,

          // Quantidade REAL disponível
          quantidade:
            aparelhosDisponiveis.length,

          quantidadeCadastrada:
            produto.quantidade,

          createdAt:
            produto.createdAt,

          // =========================================
          // APARELHOS DISPONÍVEIS
          // =========================================

          aparelhos:
            aparelhosDisponiveis.map(
              (aparelho) => ({
                id:
                  aparelho.id,

                imei:
                  aparelho.imei,

                vendido:
                  aparelho.vendido,

                produtoId:
                  aparelho.produtoId,

                loteId:
                  aparelho.loteId,

                // COR
                cor:
                  aparelho.cor ?? null,

                // MEMÓRIA / GB
                memoria:
                  aparelho.memoria ?? null,

                createdAt:
                  aparelho.createdAt,
              })
            ),

          // =========================================
          // LOTES
          // =========================================

          lotes:
            lotesPreparados,
        };
      })
      .filter(
        (produto) =>
          produto.aparelhos.length > 0
      );

    // =================================================
    // RETORNO
    // =================================================

    return NextResponse.json(
      produtosPreparados
    );
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR ESTOQUE:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar estoque.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH
//
// SOMENTE ADMIN
//
// Principal função:
// TROCAR IMEI
//
// Também mantém atualização de preço para
// compatibilidade com partes antigas do sistema.
// =====================================================

export async function PATCH(
  req: Request
) {
  try {
    const usuario =
      await obterSessao();

    // =================================================
    // LOGIN
    // =================================================

    if (!usuario) {
      return NextResponse.json(
        {
          error:
            "Não autorizado.",
        },
        {
          status: 401,
        }
      );
    }

    // =================================================
    // ADMIN
    // =================================================

    if (
      usuario.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode alterar o estoque.",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    // =================================================
    // ATUALIZAR PREÇO
    // Compatibilidade
    // =================================================

    if (
      body.action ===
      "atualizarPreco"
    ) {
      const loteId =
        Number(
          body.loteId
        );

      if (
        !Number.isInteger(
          loteId
        ) ||
        loteId <= 0
      ) {
        return NextResponse.json(
          {
            error:
              "ID do lote inválido.",
          },
          {
            status: 400,
          }
        );
      }

      const precoCompraUsd =
        body.precoCompraUsd ===
          null ||
        body.precoCompraUsd ===
          undefined ||
        body.precoCompraUsd ===
          ""
          ? null
          : Number(
              String(
                body.precoCompraUsd
              ).replace(
                ",",
                "."
              )
            );

      if (
        precoCompraUsd ===
          null ||
        !Number.isFinite(
          precoCompraUsd
        ) ||
        precoCompraUsd < 0
      ) {
        return NextResponse.json(
          {
            error:
              "Preço de compra USD inválido.",
          },
          {
            status: 400,
          }
        );
      }

      const lote =
        await prisma.lote.findUnique(
          {
            where: {
              id: loteId,
            },
          }
        );

      if (!lote) {
        return NextResponse.json(
          {
            error:
              "Lote não encontrado.",
          },
          {
            status: 404,
          }
        );
      }

      const loteAtualizado =
        await prisma.lote.update(
          {
            where: {
              id: loteId,
            },

            data: {
              precoCompraUsd,
            },

            include: {
              aparelhos: true,
            },
          }
        );

      return NextResponse.json(
        {
          success: true,

          message:
            "Preço de compra USD atualizado com sucesso.",

          lote:
            loteAtualizado,
        }
      );
    }

    // =================================================
    // TROCAR IMEI
    // =================================================

    const imeiAntigo =
      String(
        body.imeiAntigo ||
          ""
      ).trim();

    const imeiNovo =
      String(
        body.imeiNovo ||
          ""
      ).trim();

    if (!imeiAntigo) {
      return NextResponse.json(
        {
          error:
            "Informe o IMEI antigo.",
        },
        {
          status: 400,
        }
      );
    }

    if (!imeiNovo) {
      return NextResponse.json(
        {
          error:
            "Informe o IMEI novo.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      imeiAntigo ===
      imeiNovo
    ) {
      return NextResponse.json(
        {
          error:
            "O IMEI novo deve ser diferente do IMEI antigo.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // BUSCAR IMEI ANTIGO
    // =================================================

    const aparelho =
      await prisma.aparelho.findUnique(
        {
          where: {
            imei:
              imeiAntigo,
          },
        }
      );

    if (!aparelho) {
      return NextResponse.json(
        {
          error:
            "IMEI antigo não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    // =================================================
    // NÃO PERMITIR TROCAR IMEI VENDIDO
    // =================================================

    if (
      aparelho.vendido
    ) {
      return NextResponse.json(
        {
          error:
            "Não é possível trocar o IMEI de um aparelho que já foi vendido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VERIFICAR IMEI NOVO
    // =================================================

    const imeiNovoExistente =
      await prisma.aparelho.findUnique(
        {
          where: {
            imei:
              imeiNovo,
          },
        }
      );

    if (
      imeiNovoExistente
    ) {
      return NextResponse.json(
        {
          error:
            "O IMEI novo já está cadastrado no estoque.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // TROCAR
    // =================================================

    const aparelhoAtualizado =
      await prisma.aparelho.update(
        {
          where: {
            id:
              aparelho.id,
          },

          data: {
            imei:
              imeiNovo,
          },
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "IMEI trocado com sucesso.",

        aparelho:
          aparelhoAtualizado,
      }
    );
  } catch (error) {
    console.error(
      "ERRO NO PATCH DO ESTOQUE:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar estoque.",
      },
      {
        status: 500,
      }
    );
  }
}