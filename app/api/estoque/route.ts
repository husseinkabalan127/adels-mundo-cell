import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET - Buscar estoque completo
// =====================================================

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        // =================================================
        // LOTES
        // IMPORTANTE:
        // trazer aparelhos dentro de cada lote
        // para a página poder usar lote.aparelhos.filter()
        // =================================================
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

        // =================================================
        // TODOS OS APARELHOS DO PRODUTO
        // =================================================
        aparelhos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(produtos);
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
// POST - Cadastrar aparelhos no estoque
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // =================================================
    // DADOS
    // =================================================

    const nome = String(
      body.nome || ""
    ).trim();

    const fornecedor = String(
      body.fornecedor || ""
    ).trim();

    const quantidade = Number(
      body.quantidade
    );

    const precoCompraUsd =
      body.precoCompraUsd === "" ||
      body.precoCompraUsd === null ||
      body.precoCompraUsd === undefined
        ? null
        : Number(
            String(
              body.precoCompraUsd
            ).replace(",", ".")
          );

    const imeis = Array.isArray(
      body.imeis
    )
      ? body.imeis
          .map(
            (imei: unknown) =>
              String(imei).trim()
          )
          .filter(Boolean)
      : [];

    // =================================================
    // VALIDAÇÕES
    // =================================================

    if (!nome) {
      return NextResponse.json(
        {
          error:
            "Digite o nome do aparelho.",
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isFinite(quantidade)) {
      return NextResponse.json(
        {
          error:
            "Digite uma quantidade válida.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(
        quantidade
      ) ||
      quantidade <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "A quantidade deve ser um número inteiro maior que zero.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // IMEI
    // =================================================

    if (
      imeis.length !== quantidade
    ) {
      return NextResponse.json(
        {
          error:
            "A quantidade de IMEI deve ser igual à quantidade de aparelhos.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      imeis.some(
        (imei: string) =>
          !imei
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Digite o IMEI de todos os aparelhos.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // IMEI REPETIDO DENTRO DA MESMA ENTRADA
    // =================================================

    const imeisUnicos =
      new Set(imeis);

    if (
      imeisUnicos.size !==
      imeis.length
    ) {
      return NextResponse.json(
        {
          error:
            "Não pode haver IMEI repetido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // PREÇO USD
    // =================================================

    if (
      precoCompraUsd !== null &&
      (
        !Number.isFinite(
          precoCompraUsd
        ) ||
        precoCompraUsd < 0
      )
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

    // =================================================
    // VERIFICAR IMEI JÁ CADASTRADO
    // =================================================

    const aparelhosExistentes =
      await prisma.aparelho.findMany({
        where: {
          imei: {
            in: imeis,
          },
        },

        select: {
          imei: true,
        },
      });

    if (
      aparelhosExistentes.length >
      0
    ) {
      const repetidos =
        aparelhosExistentes
          .map(
            (
              item: {
                imei: string;
              }
            ) => item.imei
          )
          .join(", ");

      return NextResponse.json(
        {
          error:
            `Este(s) IMEI(s) já está(ão) cadastrado(s): ${repetidos}`,
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // TRANSACTION
    // =================================================

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {
          // =============================================
          // PROCURAR PRODUTO
          // =============================================

          let produto =
            await tx.produto.findFirst({
              where: {
                nome: nome,
              },
            });

          // =============================================
          // CRIAR PRODUTO SE NÃO EXISTIR
          // =============================================

          if (!produto) {
            produto =
              await tx.produto.create({
                data: {
                  nome,
                  quantidade: 0,
                },
              });
          }

          // =============================================
          // CRIAR LOTE
          // =============================================

          const lote =
            await tx.lote.create({
              data: {
                quantidade,
                precoCompraUsd,
                fornecedor:
                  fornecedor || null,
                produtoId:
                  produto.id,
              },
            });

          // =============================================
          // CRIAR APARELHOS / IMEIS
          // =============================================

          await tx.aparelho.createMany({
            data: imeis.map(
              (
                imei: string
              ) => ({
                imei,
                vendido: false,
                loteId: lote.id,
                produtoId:
                  produto.id,
              })
            ),
          });

          // =============================================
          // ATUALIZAR ESTOQUE DO PRODUTO
          // =============================================

          const produtoAtualizado =
            await tx.produto.update({
              where: {
                id: produto.id,
              },

              data: {
                quantidade: {
                  increment:
                    quantidade,
                },
              },

              include: {
                lotes: {
                  include: {
                    aparelhos:
                      true,
                  },
                },

                aparelhos: true,
              },
            });

          // =============================================
          // BUSCAR LOTE COMPLETO
          // =============================================

          const loteCompleto =
            await tx.lote.findUnique({
              where: {
                id: lote.id,
              },

              include: {
                aparelhos: true,
              },
            });

          return {
            produto:
              produtoAtualizado,

            lote:
              loteCompleto,
          };
        }
      );

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Aparelhos cadastrados com sucesso!",

        produto:
          resultado.produto,

        lote:
          resultado.lote,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "ERRO AO CADASTRAR APARELHOS:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar aparelhos.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH
// =====================================================
// 1. Atualizar preço de compra USD do lote
//
// body:
// {
//   action: "atualizarPreco",
//   loteId: 1,
//   precoCompraUsd: 850
// }
//
// 2. Trocar IMEI
//
// body:
// {
//   imeiAntigo: "123456789",
//   imeiNovo: "987654321"
// }
// =====================================================

export async function PATCH(
  req: Request
) {
  try {
    const body =
      await req.json();

    // =================================================
    // AÇÃO 1 — ATUALIZAR PREÇO USD
    // =================================================

    if (
      body.action ===
      "atualizarPreco"
    ) {
      const loteId =
        Number(
          body.loteId
        );

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

      // ===============================================
      // VALIDAR LOTE
      // ===============================================

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

      // ===============================================
      // VALIDAR PREÇO
      // ===============================================

      if (
        precoCompraUsd ===
        null
      ) {
        return NextResponse.json(
          {
            error:
              "Informe o preço de compra USD.",
          },
          {
            status: 400,
          }
        );
      }

      if (
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

      // ===============================================
      // VERIFICAR LOTE
      // ===============================================

      const lote =
        await prisma.lote.findUnique({
          where: {
            id: loteId,
          },
        });

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

      // ===============================================
      // ATUALIZAR PREÇO
      // ===============================================

      const loteAtualizado =
        await prisma.lote.update({
          where: {
            id: loteId,
          },

          data: {
            precoCompraUsd,
          },

          include: {
            aparelhos: true,
          },
        });

      return NextResponse.json({
        success: true,

        message:
          "Preço de compra USD atualizado com sucesso.",

        lote:
          loteAtualizado,
      });
    }

    // =================================================
    // AÇÃO 2 — TROCAR IMEI
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

    // ===============================================
    // VALIDAR IMEIS
    // ===============================================

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
      imeiAntigo === imeiNovo
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

    // ===============================================
    // PROCURAR IMEI ANTIGO
    // ===============================================

    const aparelho =
      await prisma.aparelho.findUnique(
        {
          where: {
            imei: imeiAntigo,
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

    // ===============================================
    // NÃO PERMITIR TROCAR IMEI DE APARELHO VENDIDO
    // ===============================================

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

    // ===============================================
    // VERIFICAR IMEI NOVO
    // ===============================================

    const imeiNovoExistente =
      await prisma.aparelho.findUnique(
        {
          where: {
            imei: imeiNovo,
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

    // ===============================================
    // TROCAR IMEI
    // ===============================================

    const aparelhoAtualizado =
      await prisma.aparelho.update({
        where: {
          id: aparelho.id,
        },

        data: {
          imei: imeiNovo,
        },
      });

    return NextResponse.json({
      success: true,

      message:
        "IMEI trocado com sucesso.",

      aparelho:
        aparelhoAtualizado,
    });
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

// =====================================================
// DELETE - Excluir produto
// =====================================================

export async function DELETE(
  req: Request
) {
  try {
    const body =
      await req.json();

    const produtoId =
      Number(
        body.produtoId ??
          body.id
      );

    const senha =
      String(
        body.senha ||
          ""
      ).trim();

    // =================================================
    // VALIDAR ID
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
            "ID do produto inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // SENHA
    // =================================================
    // IMPORTANTE:
    // mantenha aqui a mesma senha que você já
    // estava usando no sistema.
    // =================================================

    const SENHA_EXCLUSAO =
      process.env.ESTOQUE_DELETE_PASSWORD ||
      "1234";

    if (
      senha !==
      SENHA_EXCLUSAO
    ) {
      return NextResponse.json(
        {
          error:
            "Senha incorreta.",
        },
        {
          status: 403,
        }
      );
    }

    // =================================================
    // PROCURAR PRODUTO
    // =================================================

    const produto =
      await prisma.produto.findUnique(
        {
          where: {
            id: produtoId,
          },

          include: {
            aparelhos: true,

            lotes: true,
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
    // NÃO EXCLUIR PRODUTO COM APARELHO VENDIDO
    // =================================================

    const aparelhoVendido =
      produto.aparelhos.some(
        (
          aparelho
        ) =>
          aparelho.vendido
      );

    if (
      aparelhoVendido
    ) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir este produto porque existem aparelhos vendidos vinculados a ele.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // EXCLUIR TUDO EM TRANSACTION
    // =================================================

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {
        // =============================================
        // APARELHOS
        // =============================================

        await tx.aparelho.deleteMany(
          {
            where: {
              produtoId:
                produtoId,
            },
          }
        );

        // =============================================
        // LOTES
        // =============================================

        await tx.lote.deleteMany(
          {
            where: {
              produtoId:
                produtoId,
            },
          }
        );

        // =============================================
        // PRODUTO
        // =============================================

        await tx.produto.delete(
          {
            where: {
              id: produtoId,
            },
          }
        );
      }
    );

    return NextResponse.json({
      success: true,

      message:
        "Produto excluído do estoque.",
    });
  } catch (error) {
    console.error(
      "ERRO AO EXCLUIR PRODUTO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao excluir produto.",
      },
      {
        status: 500,
      }
    );
  }
}