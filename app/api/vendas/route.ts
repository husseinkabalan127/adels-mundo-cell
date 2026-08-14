import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET — جلب كل المبيعات
// =====================================================

export async function GET() {
  try {
    const vendas = await prisma.venda.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        itens: {
          include: {
            produto: true,
            aparelhos: true,
          },
        },
      },
    });

    return NextResponse.json(vendas);
  } catch (error) {
    console.error("ERRO AO BUSCAR VENDAS:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar vendas.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST — CRIAR VENDA
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cliente =
      String(body.cliente || "").trim();

    const taxa =
      body.taxa === null ||
      body.taxa === undefined ||
      body.taxa === ""
        ? null
        : Number(
            String(body.taxa).replace(",", ".")
          );

    const itens = Array.isArray(body.itens)
      ? body.itens
      : [];

    // =================================================
    // VALIDAÇÕES
    // =================================================

    // Cliente é opcional
    if (
      taxa !== null &&
      (!Number.isFinite(taxa) || taxa < 0)
    ) {
      return NextResponse.json(
        {
          error: "Taxa inválida.",
        },
        {
          status: 400,
        }
      );
    }

    if (!itens.length) {
      return NextResponse.json(
        {
          error:
            "Adicione pelo menos um produto à venda.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VALIDAR ITENS
    // =================================================

    const itensPreparados = itens.map(
      (item: any, index: number) => {
        const produtoId = Number(
          item.produtoId
        );

        const quantidade = Number(
          item.quantidade
        );

        const valorUnitario = Number(
          String(
            item.valorUnitario
          ).replace(",", ".")
        );

        const imeis = Array.isArray(
          item.imeis
        )
          ? item.imeis
              .map((imei: unknown) =>
                String(imei).trim()
              )
              .filter(Boolean)
          : [];

        if (
          !Number.isInteger(produtoId) ||
          produtoId <= 0
        ) {
          throw new Error(
            `Produto inválido no item ${index + 1}.`
          );
        }

        if (
          !Number.isInteger(quantidade) ||
          quantidade <= 0
        ) {
          throw new Error(
            `Quantidade inválida no item ${index + 1}.`
          );
        }

        if (
          !Number.isFinite(
            valorUnitario
          ) ||
          valorUnitario < 0
        ) {
          throw new Error(
            `Preço de venda inválido no item ${index + 1}.`
          );
        }

        // Cada aparelho vendido precisa ter IMEI
        if (imeis.length !== quantidade) {
          throw new Error(
            `A quantidade de IMEI do item ${index + 1} não corresponde à quantidade.`
          );
        }

        // Não repetir IMEI dentro do mesmo item
        const imeisUnicos = new Set(
          imeis
        );

        if (
          imeisUnicos.size !==
          imeis.length
        ) {
          throw new Error(
            `Não pode haver IMEI repetido no item ${index + 1}.`
          );
        }

        return {
          produtoId,
          quantidade,
          valorUnitario,
          imeis,
        };
      }
    );

    // =================================================
    // NÃO PERMITIR O MESMO IMEI EM DOIS ITENS
    // =================================================

    const todosImeis =
      itensPreparados.flatMap(
        (item: any) => item.imeis
      );

    const imeisUnicos = new Set(
      todosImeis
    );

    if (
      imeisUnicos.size !==
      todosImeis.length
    ) {
      return NextResponse.json(
        {
          error:
            "O mesmo IMEI não pode aparecer duas vezes na mesma venda.",
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
        async (tx) => {
          // ---------------------------------------------
          // Criar venda
          // ---------------------------------------------

          const venda =
            await tx.venda.create({
              data: {
                cliente,
                taxa,
                taxaFechada: false,
              },
            });

          let totalVenda = 0;

          // ---------------------------------------------
          // Processar cada produto
          // ---------------------------------------------

          for (const item of itensPreparados) {
            const produto =
              await tx.produto.findUnique({
                where: {
                  id: item.produtoId,
                },
                include: {
                  aparelhos: {
                    where: {
                      vendido: false,
                    },
                    include: {
                      lote: true,
                    },
                  },
                },
              });

            if (!produto) {
              throw new Error(
                "Produto não encontrado."
              );
            }

            // -------------------------------------------
            // Conferir estoque
            // -------------------------------------------

            if (
              produto.quantidade <
              item.quantidade
            ) {
              throw new Error(
                `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}.`
              );
            }

            // -------------------------------------------
            // Procurar IMEIs
            // -------------------------------------------

            const aparelhos =
              await tx.aparelho.findMany({
                where: {
                  imei: {
                    in: item.imeis,
                  },
                  produtoId:
                    item.produtoId,
                  vendido: false,
                },
                include: {
                  lote: true,
                },
              });

            if (
              aparelhos.length !==
              item.quantidade
            ) {
              throw new Error(
                `Um ou mais IMEIs não estão disponíveis no estoque para ${produto.nome}.`
              );
            }

            // -------------------------------------------
            // Calcular custo USD
            // -------------------------------------------

            let custoTotal = 0;

            for (const aparelho of aparelhos) {
              if (
                aparelho.lote
                  .precoCompraUsd !==
                null &&
                aparelho.lote
                  .precoCompraUsd !==
                undefined
              ) {
                custoTotal +=
                  aparelho.lote
                    .precoCompraUsd;
              }
            }

            const total =
              item.quantidade *
              item.valorUnitario;

            totalVenda += total;

            // -------------------------------------------
            // Criar item da venda
            // -------------------------------------------

            const vendaItem =
              await tx.vendaItem.create({
                data: {
                  quantidade:
                    item.quantidade,

                  valorUnitario:
                    item.valorUnitario,

                  total,

                  precoCompraUsd:
                    item.quantidade > 0
                      ? custoTotal /
                        item.quantidade
                      : null,

                  custoTotal:
                    custoTotal,

                  vendaId: venda.id,

                  produtoId:
                    item.produtoId,
                },
              });

            // -------------------------------------------
            // Marcar aparelhos como vendidos
            // -------------------------------------------

            await tx.aparelho.updateMany({
              where: {
                id: {
                  in: aparelhos.map(
                    (aparelho) =>
                      aparelho.id
                  ),
                },
              },
              data: {
                vendido: true,
                vendaItemId:
                  vendaItem.id,
              },
            });

            // -------------------------------------------
            // Diminuir estoque
            // -------------------------------------------

            await tx.produto.update({
              where: {
                id: produto.id,
              },
              data: {
                quantidade: {
                  decrement:
                    item.quantidade,
                },
              },
            });
          }

          // ---------------------------------------------
          // Retornar venda completa
          // ---------------------------------------------

          const vendaCompleta =
            await tx.venda.findUnique({
              where: {
                id: venda.id,
              },
              include: {
                itens: {
                  include: {
                    produto: true,
                    aparelhos: true,
                  },
                },
              },
            });

          return {
            venda: vendaCompleta,
            totalVenda,
          };
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Venda registrada com sucesso!",
        ...resultado,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      "ERRO AO CRIAR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erro ao registrar venda.",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================================
// DELETE — CANCELAR VENDA E DEVOLVER AO ESTOQUE
// =====================================================

export async function DELETE(
  req: Request
) {
  try {
    const body = await req.json();

    const vendaId = Number(
      body.vendaId ?? body.id
    );

    if (
      !Number.isInteger(vendaId) ||
      vendaId <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "ID da venda inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // TRANSACTION
    // =================================================

    await prisma.$transaction(
      async (tx) => {
        const venda =
          await tx.venda.findUnique({
            where: {
              id: vendaId,
            },
            include: {
              itens: {
                include: {
                  aparelhos: true,
                },
              },
            },
          });

        if (!venda) {
          throw new Error(
            "Venda não encontrada."
          );
        }

        // ---------------------------------------------
        // Devolver aparelhos ao estoque
        // ---------------------------------------------

        for (const item of venda.itens) {
          const quantidade =
            item.aparelhos.length;

          if (quantidade > 0) {
            await tx.aparelho.updateMany({
              where: {
                id: {
                  in: item.aparelhos.map(
                    (aparelho) =>
                      aparelho.id
                  ),
                },
              },
              data: {
                vendido: false,
                vendaItemId: null,
              },
            });

            await tx.produto.update({
              where: {
                id: item.produtoId,
              },
              data: {
                quantidade: {
                  increment: quantidade,
                },
              },
            });
          }
        }

        // ---------------------------------------------
        // Apagar itens
        // ---------------------------------------------

        await tx.vendaItem.deleteMany({
          where: {
            vendaId: vendaId,
          },
        });

        // ---------------------------------------------
        // Apagar venda
        // ---------------------------------------------

        await tx.venda.delete({
          where: {
            id: vendaId,
          },
        });
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Venda cancelada e aparelhos devolvidos ao estoque.",
    });
  } catch (error: any) {
    console.error(
      "ERRO AO CANCELAR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erro ao cancelar venda.",
      },
      {
        status: 400,
      }
    );
  }
}