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
    // ADMIN
    // =================================================

    if (usuario.role === "ADMIN") {
      return NextResponse.json(produtos);
    }

    // =================================================
    // FUNCIONARIO
    //
    // Pode ver:
    // - Modelo
    // - Quantidade
    // - IMEI
    //
    // Não pode receber:
    // - Fornecedor
    // - Preço de compra USD
    // =================================================

    const produtosFuncionario = produtos.map(
      (
        produto: Prisma.ProdutoGetPayload<{
          include: {
            lotes: {
              include: {
                aparelhos: true;
              };
            };
            aparelhos: true;
          };
        }>
      ) => ({
        id: produto.id,

        nome: produto.nome,

        quantidade: produto.quantidade,

        createdAt: produto.createdAt,

        aparelhos: produto.aparelhos.map(
          (aparelho) => ({
            id: aparelho.id,

            imei: aparelho.imei,

            vendido: aparelho.vendido,

            produtoId: aparelho.produtoId,

            loteId: aparelho.loteId,
          })
        ),

        lotes: produto.lotes.map(
          (lote) => ({
            id: lote.id,

            quantidade: lote.quantidade,

            createdAt: lote.createdAt,

            // IMPORTANTE:
            // NÃO enviar fornecedor
            // NÃO enviar preço de compra

            aparelhos: lote.aparelhos.map(
              (aparelho) => ({
                id: aparelho.id,

                imei: aparelho.imei,

                vendido: aparelho.vendido,

                produtoId: aparelho.produtoId,

                loteId: aparelho.loteId,
              })
            ),
          })
        ),
      })
    );

    return NextResponse.json(
      produtosFuncionario
    );
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR ESTOQUE:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar estoque.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST - CADASTRAR APARELHOS
// SOMENTE ADMIN
// =====================================================

export async function POST(req: Request) {
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

    if (usuario.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode adicionar aparelhos ao estoque.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

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

    const imeis = Array.isArray(body.imeis)
      ? body.imeis
          .map((imei: unknown) =>
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
      !Number.isInteger(quantidade) ||
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

    if (imeis.length !== quantidade) {
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

    const imeisUnicos = new Set(imeis);

    if (
      imeisUnicos.size !== imeis.length
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

    if (
      precoCompraUsd !== null &&
      (
        !Number.isFinite(precoCompraUsd) ||
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
    // VERIFICAR IMEI EXISTENTE
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
      aparelhosExistentes.length > 0
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
          let produto =
            await tx.produto.findFirst({
              where: {
                nome,
              },
            });

          if (!produto) {
            produto =
              await tx.produto.create({
                data: {
                  nome,

                  quantidade: 0,
                },
              });
          }

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

          await tx.aparelho.createMany({
            data: imeis.map(
              (imei: string) => ({
                imei,

                vendido: false,

                loteId: lote.id,

                produtoId:
                  produto.id,
              })
            ),
          });

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
                    aparelhos: true,
                  },
                },

                aparelhos: true,
              },
            });

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
// SOMENTE ADMIN
// =====================================================

export async function PATCH(req: Request) {
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

    if (usuario.role !== "ADMIN") {
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

    const body = await req.json();

    // =================================================
    // ATUALIZAR PREÇO
    // =================================================

    if (
      body.action ===
      "atualizarPreco"
    ) {
      const loteId = Number(
        body.loteId
      );

      const precoCompraUsd =
        body.precoCompraUsd === null ||
        body.precoCompraUsd === undefined ||
        body.precoCompraUsd === ""
          ? null
          : Number(
              String(
                body.precoCompraUsd
              ).replace(",", ".")
            );

      if (
        !Number.isInteger(loteId) ||
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

      if (
        precoCompraUsd === null ||
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
    // TROCAR IMEI
    // =================================================

    const imeiAntigo = String(
      body.imeiAntigo || ""
    ).trim();

    const imeiNovo = String(
      body.imeiNovo || ""
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

    if (imeiAntigo === imeiNovo) {
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

    const aparelho =
      await prisma.aparelho.findUnique({
        where: {
          imei: imeiAntigo,
        },
      });

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

    if (aparelho.vendido) {
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

    const imeiNovoExistente =
      await prisma.aparelho.findUnique({
        where: {
          imei: imeiNovo,
        },
      });

    if (imeiNovoExistente) {
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
// DELETE
// SOMENTE ADMIN
// =====================================================

export async function DELETE(req: Request) {
  try {
    const usuario = await obterSessao();

    // =================================================
    // VERIFICAR LOGIN
    // =================================================

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

    // =================================================
    // SOMENTE ADMIN PODE EXCLUIR
    // =================================================

    if (usuario.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode excluir produtos.",
        },
        {
          status: 403,
        }
      );
    }

    // =================================================
    // LER DADOS
    // =================================================

    const body = await req.json();

    const produtoId = Number(
      body.produtoId ?? body.id
    );

    // =================================================
    // VALIDAR ID
    // =================================================

    if (
      !Number.isInteger(produtoId) ||
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
    // BUSCAR PRODUTO
    // =================================================

    const produto =
      await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },

        include: {
          aparelhos: true,

          lotes: true,
        },
      });

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
    // NÃO PERMITIR EXCLUIR PRODUTO
    // SE EXISTIR APARELHO VENDIDO
    // =================================================

    const aparelhoVendido =
      produto.aparelhos.some(
        (aparelho) =>
          aparelho.vendido
      );

    if (aparelhoVendido) {
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
    // EXCLUIR TUDO
    //
    // 1. Aparelhos
    // 2. Lotes
    // 3. Produto
    // =================================================

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {
        await tx.aparelho.deleteMany({
          where: {
            produtoId:
              produtoId,
          },
        });

        await tx.lote.deleteMany({
          where: {
            produtoId:
              produtoId,
          },
        });

        await tx.produto.delete({
          where: {
            id: produtoId,
          },
        });
      }
    );

    // =================================================
    // SUCESSO
    // =================================================

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