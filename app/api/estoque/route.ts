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
    // =================================================

    const produtosFuncionario = produtos.map(
      (produto: any) => ({
        id: produto.id,

        nome: produto.nome,

        quantidade: produto.quantidade,

        createdAt: produto.createdAt,

        aparelhos: produto.aparelhos.map(
          (aparelho: any) => ({
            id: aparelho.id,

            imei: aparelho.imei,

            vendido: aparelho.vendido,

            produtoId: aparelho.produtoId,

            loteId: aparelho.loteId,
          })
        ),

        lotes: produto.lotes.map(
          (lote: any) => ({
            id: lote.id,

            quantidade: lote.quantidade,

            createdAt: lote.createdAt,

            fornecedor:
              lote.fornecedor,

            precoCompraUsd:
              lote.precoCompraUsd,

            aparelhos:
              lote.aparelhos.map(
                (aparelho: any) => ({
                  id: aparelho.id,

                  imei: aparelho.imei,

                  vendido: aparelho.vendido,

                  produtoId:
                    aparelho.produtoId,

                  loteId:
                    aparelho.loteId,
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
        error:
          "Erro ao buscar estoque.",
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

                loteId:
                  lote.id,

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
    // ALTERAR NOME DO PRODUTO
    //
    // Se já existir outro produto com o mesmo nome:
    // os dois produtos serão unidos.
    // =================================================

    if (
      body.action ===
      "atualizarNome"
    ) {
      const produtoId = Number(
        body.produtoId
      );

      const novoNome = String(
        body.nome || ""
      ).trim();

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

      if (!novoNome) {
        return NextResponse.json(
          {
            error:
              "Digite o novo nome do aparelho.",
          },
          {
            status: 400,
          }
        );
      }

      // =================================================
      // BUSCAR PRODUTO ORIGINAL
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
      // SE O NOME NÃO MUDOU
      // =================================================

      if (
        produto.nome ===
        novoNome
      ) {
        return NextResponse.json({
          success: true,

          message:
            "O nome já está igual.",

          produto,
        });
      }

      // =================================================
      // PROCURAR OUTRO PRODUTO COM O MESMO NOME
      // =================================================

      const produtoExistente =
        await prisma.produto.findFirst({
          where: {
            nome: novoNome,

            NOT: {
              id: produtoId,
            },
          },

          include: {
            aparelhos: true,

            lotes: true,
          },
        });

      // =================================================
      // CASO NÃO EXISTA
      // APENAS ALTERAR O NOME
      // =================================================

      if (!produtoExistente) {
        const produtoAtualizado =
          await prisma.produto.update({
            where: {
              id: produtoId,
            },

            data: {
              nome: novoNome,
            },

            include: {
              aparelhos: true,

              lotes: {
                include: {
                  aparelhos: true,
                },
              },
            },
          });

        return NextResponse.json({
          success: true,

          message:
            "Nome do aparelho atualizado com sucesso.",

          produto:
            produtoAtualizado,
        });
      }

      // =================================================
      // EXISTE OUTRO PRODUTO COM O MESMO NOME
      // JUNTAR OS DOIS
      // =================================================

      const resultado =
        await prisma.$transaction(
          async (
            tx: Prisma.TransactionClient
          ) => {

            // =================================================
            // IMPORTANTE:
            // PRIMEIRO TRANSFERIR AS VENDAS ANTIGAS
            //
            // Isso resolve o erro:
            // P2003
            // VendaItem_produtoId_fkey
            //
            // As vendas antigas passam a apontar para
            // o produto que continuará existindo.
            // =================================================

            await tx.vendaItem.updateMany({
              where: {
                produtoId:
                  produtoId,
              },

              data: {
                produtoId:
                  produtoExistente.id,
              },
            });

            // =================================================
            // TRANSFERIR APARELHOS / IMEIS
            // =================================================

            await tx.aparelho.updateMany({
              where: {
                produtoId:
                  produtoId,
              },

              data: {
                produtoId:
                  produtoExistente.id,
              },
            });

            // =================================================
            // TRANSFERIR LOTES
            // =================================================

            await tx.lote.updateMany({
              where: {
                produtoId:
                  produtoId,
              },

              data: {
                produtoId:
                  produtoExistente.id,
              },
            });

            // =================================================
            // TRANSFERIR ASSISTÊNCIAS
            // =================================================

            await tx.assistencia.updateMany({
              where: {
                produtoId:
                  produtoId,
              },

              data: {
                produtoId:
                  produtoExistente.id,
              },
            });

            // =================================================
            // SOMAR QUANTIDADE DO PRODUTO
            // =================================================

            await tx.produto.update({
              where: {
                id:
                  produtoExistente.id,
              },

              data: {
                quantidade: {
                  increment:
                    produto.quantidade,
                },
              },
            });

            // =================================================
            // EXCLUIR PRODUTO ANTIGO
            //
            // Agora pode excluir porque:
            // - VendaItem foi transferido
            // - Aparelhos foram transferidos
            // - Lotes foram transferidos
            // - Assistências foram transferidas
            // =================================================

            await tx.produto.delete({
              where: {
                id:
                  produtoId,
              },
            });

            // =================================================
            // BUSCAR PRODUTO FINAL
            // =================================================

            return await tx.produto.findUnique({
              where: {
                id:
                  produtoExistente.id,
              },

              include: {
                aparelhos: true,

                lotes: {
                  include: {
                    aparelhos: true,
                  },
                },
              },
            });
          }
        );

      return NextResponse.json({
        success: true,

        message:
          "Os aparelhos foram unidos ao modelo existente com sucesso.",

        produto:
          resultado,
      });
    }

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
//
// Suporta:
// 1. Excluir um aparelho pelo aparelhoId
// 2. Excluir um aparelho pelo IMEI
// 3. Excluir um produto inteiro pelo produtoId
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

    // =================================================
    // OPÇÃO 1 - EXCLUIR APARELHO INDIVIDUAL
    // =================================================

    if (
      body.aparelhoId !== undefined ||
      body.imei !== undefined
    ) {
      const aparelhoId =
        body.aparelhoId !== undefined
          ? Number(body.aparelhoId)
          : null;

      const imei =
        body.imei !== undefined
          ? String(body.imei).trim()
          : "";

      if (
        aparelhoId !== null &&
        (
          !Number.isInteger(
            aparelhoId
          ) ||
          aparelhoId <= 0
        )
      ) {
        return NextResponse.json(
          {
            error:
              "ID do aparelho inválido.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        aparelhoId === null &&
        !imei
      ) {
        return NextResponse.json(
          {
            error:
              "Informe o aparelhoId ou o IMEI.",
          },
          {
            status: 400,
          }
        );
      }

      const aparelho =
        aparelhoId !== null
          ? await prisma.aparelho.findUnique(
              {
                where: {
                  id: aparelhoId,
                },
              }
            )
          : await prisma.aparelho.findUnique(
              {
                where: {
                  imei,
                },
              }
            );

      if (!aparelho) {
        return NextResponse.json(
          {
            error:
              "Aparelho não encontrado.",
          },
          {
            status: 404,
          }
        );
      }

      // NÃO DEIXAR APAGAR APARELHO VENDIDO

      if (aparelho.vendido) {
        return NextResponse.json(
          {
            error:
              "Não é possível excluir um aparelho que já foi vendido.",
          },
          {
            status: 400,
          }
        );
      }

      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {
          // Excluir o aparelho

          await tx.aparelho.delete({
            where: {
              id: aparelho.id,
            },
          });

          // Diminuir quantidade do produto

          await tx.produto.update({
            where: {
              id: aparelho.produtoId,
            },

            data: {
              quantidade: {
                decrement: 1,
              },
            },
          });

          // Atualizar quantidade do lote

          if (aparelho.loteId) {
            await tx.lote.update({
              where: {
                id: aparelho.loteId,
              },

              data: {
                quantidade: {
                  decrement: 1,
                },
              },
            });
          }
        }
      );

      return NextResponse.json({
        success: true,

        message:
          "Aparelho removido do estoque com sucesso.",
      });
    }

    // =================================================
    // OPÇÃO 2 - EXCLUIR PRODUTO INTEIRO
    // =================================================

    const produtoId = Number(
      body.produtoId ??
        body.id
    );

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
        (
          aparelho: {
            vendido: boolean;
          }
        ) => aparelho.vendido
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
    // =================================================

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {
        // -------------------------------------------------
        // 1. EXCLUIR ASSISTÊNCIAS DO PRODUTO
        // -------------------------------------------------

        await tx.assistencia.deleteMany({
          where: {
            produtoId,
          },
        });

        // -------------------------------------------------
        // 2. EXCLUIR APARELHOS
        // -------------------------------------------------

        await tx.aparelho.deleteMany({
          where: {
            produtoId,
          },
        });

        // -------------------------------------------------
        // 3. EXCLUIR LOTES
        // -------------------------------------------------

        await tx.lote.deleteMany({
          where: {
            produtoId,
          },
        });

        // -------------------------------------------------
        // 4. EXCLUIR PRODUTO
        // -------------------------------------------------

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