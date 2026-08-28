import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

// =====================================================
// GET — JUNTAR TODAS AS VENDAS
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

    const vendas = await prisma.venda.findMany({
      orderBy: {
        dataVenda: "desc",
      },

      include: {
        itens: {
          include: {
            produto: true,
            aparelhos: true,
          },
        },

        pagamentos: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const vendasPreparadas = vendas.map((venda) => {
      const valorVenda = venda.itens.reduce(
        (total, item) => {
          return total + Number(item.total || 0);
        },
        0
      );

      const quantidade = venda.itens.reduce(
        (total, item) => {
          return total + Number(item.quantidade || 0);
        },
        0
      );

      const custoTotalUsd = venda.itens.reduce(
        (total, item) => {
          return total + Number(item.custoTotal || 0);
        },
        0
      );

      const taxa =
        venda.taxa !== null &&
        venda.taxa !== undefined
          ? Number(venda.taxa)
          : null;

      const custoTotalReais =
        taxa !== null && Number.isFinite(taxa)
          ? custoTotalUsd * taxa
          : 0;

      const lucro =
        taxa !== null && Number.isFinite(taxa)
          ? valorVenda - custoTotalReais
          : 0;

      return {
        ...venda,

        valorVenda,
        quantidade,
        custoTotalUsd,
        custoTotalReais,
        lucro,
      };
    });

    return NextResponse.json(vendasPreparadas);
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR VENDAS:",
      error
    );

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

    const body = await req.json();

    // =================================================
    // CLIENTE
    // =================================================

    const cliente = String(
      body.cliente || ""
    ).trim();

    // =================================================
    // DATA DA VENDA
    // =================================================

    let dataVenda = new Date();

    if (body.dataVenda) {
      const dataTexto = String(
        body.dataVenda
      ).trim();

      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
          dataTexto
        )
      ) {
        return NextResponse.json(
          {
            error: "Data da venda inválida.",
          },
          {
            status: 400,
          }
        );
      }

      const [ano, mes, dia] =
        dataTexto.split("-").map(Number);

      dataVenda = new Date(
        ano,
        mes - 1,
        dia,
        12,
        0,
        0,
        0
      );

      if (
        dataVenda.getFullYear() !== ano ||
        dataVenda.getMonth() !== mes - 1 ||
        dataVenda.getDate() !== dia
      ) {
        return NextResponse.json(
          {
            error: "Data da venda inválida.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // =================================================
    // TAXA
    // =================================================

    const taxa =
      body.taxa === null ||
      body.taxa === undefined ||
      body.taxa === ""
        ? null
        : Number(
            String(body.taxa).replace(
              ",",
              "."
            )
          );

    // =================================================
    // ESTADO DA FATURA
    // =================================================

    const estadoFatura = String(
      body.estadoFatura ??
        body.estadoDaFatura ??
        "Em aberto"
    ).trim();

    // =================================================
    // FORMA DE PAGAMENTO
    // =================================================

    const formaPagamento = String(
      body.formaPagamento ??
        body.formaDePagamento ??
        "Não informado"
    ).trim();

    // =================================================
    // ITENS
    // =================================================

    const itens = Array.isArray(body.itens)
      ? body.itens
      : [];

    // =================================================
    // VALIDAÇÕES
    // =================================================

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
    // PREPARAR ITENS
    // =================================================

    let itensPreparados;

    try {
      itensPreparados = itens.map(
        (
          item: any,
          index: number
        ) => {
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
                .map(
                  (imei: unknown) =>
                    String(imei).trim()
                )
                .filter(Boolean)
            : [];

          if (
            !Number.isInteger(
              produtoId
            ) ||
            produtoId <= 0
          ) {
            throw new Error(
              `Produto inválido no item ${
                index + 1
              }.`
            );
          }

          if (
            !Number.isInteger(
              quantidade
            ) ||
            quantidade <= 0
          ) {
            throw new Error(
              `Quantidade inválida no item ${
                index + 1
              }.`
            );
          }

          if (
            !Number.isFinite(
              valorUnitario
            ) ||
            valorUnitario < 0
          ) {
            throw new Error(
              `Preço de venda inválido no item ${
                index + 1
              }.`
            );
          }

          if (
            imeis.length !==
            quantidade
          ) {
            throw new Error(
              `A quantidade de IMEI do item ${
                index + 1
              } não corresponde à quantidade.`
            );
          }

          const imeisUnicos =
            new Set(imeis);

          if (
            imeisUnicos.size !==
            imeis.length
          ) {
            throw new Error(
              `Não pode haver IMEI repetido no item ${
                index + 1
              }.`
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
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Dados da venda inválidos.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // NÃO PERMITIR MESMO IMEI EM DOIS ITENS
    // =================================================

    const todosImeis =
      itensPreparados.flatMap(
        (
          item: {
            imeis: string[];
          }
        ) => item.imeis
      );

    const imeisUnicos =
      new Set(todosImeis);

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
        async (
          tx: Prisma.TransactionClient
        ) => {
          const venda =
            await tx.venda.create({
              data: {
                cliente,

                taxa,

                taxaFechada:
                  false,

                dataVenda,

                formaPagamento,

                estadoFatura,

                desconto: 0,
              },
            });

          let totalVenda = 0;

          for (
            const item of itensPreparados
          ) {
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

            if (
              produto.quantidade <
              item.quantidade
            ) {
              throw new Error(
                `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}.`
              );
            }

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

            let custoTotal = 0;

            for (
              const aparelho of aparelhos
            ) {
              if (
                aparelho.lote
                  ?.precoCompraUsd !==
                  null &&
                aparelho.lote
                  ?.precoCompraUsd !==
                  undefined
              ) {
                custoTotal += Number(
                  aparelho.lote
                    .precoCompraUsd
                );
              }
            }

            const total =
              item.quantidade *
              item.valorUnitario;

            totalVenda += total;

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

                  custoTotal,

                  vendaId:
                    venda.id,

                  produtoId:
                    item.produtoId,
                },
              });

            await tx.aparelho.updateMany({
              where: {
                id: {
                  in: aparelhos.map(
                    (
                      aparelho: {
                        id: number;
                      }
                    ) => aparelho.id
                  ),
                },
              },

              data: {
                vendido: true,

                vendaItemId:
                  vendaItem.id,
              },
            });

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

          // =================================================
          // PAGAMENTO AUTOMÁTICO
          // =================================================

          const estadoNormalizado =
            estadoFatura
              .toLowerCase()
              .normalize("NFD")
              .replace(
                /[\u0300-\u036f]/g,
                ""
              );

          if (
            estadoNormalizado ===
              "pago" ||
            estadoNormalizado ===
              "quitado"
          ) {
            await tx.pagamento.create({
              data: {
                valor:
                  totalVenda,

                desconto: 0,

                forma:
                  formaPagamento,

                observacao:
                  "Pagamento registrado automaticamente na venda.",

                vendaId:
                  venda.id,
              },
            });

            await tx.venda.update({
              where: {
                id: venda.id,
              },

              data: {
                estadoFatura:
                  "Quitado",

                formaPagamento:
                  formaPagamento,
              },
            });
          }

          // =================================================
          // VENDA COMPLETA
          // =================================================

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

                pagamentos: {
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
            });

          return {
            venda:
              vendaCompleta,

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
  } catch (error) {
    console.error(
      "ERRO AO CRIAR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao registrar venda.",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================================
// PATCH — DEVOLVER UM APARELHO
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
            "Somente o administrador pode devolver aparelhos.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const vendaId = Number(
      body.vendaId ??
        body.id
    );

    const aparelhoId =
      body.aparelhoId !== undefined &&
      body.aparelhoId !== null &&
      body.aparelhoId !== ""
        ? Number(body.aparelhoId)
        : null;

    const imei =
      body.imei !== undefined &&
      body.imei !== null
        ? String(body.imei).trim()
        : "";

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

    if (
      aparelhoId !== null &&
      (!Number.isInteger(aparelhoId) ||
        aparelhoId <= 0)
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

    if (!aparelhoId && !imei) {
      return NextResponse.json(
        {
          error:
            "Informe o aparelho ou o IMEI que será devolvido.",
        },
        {
          status: 400,
        }
      );
    }

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {
          // =================================================
          // BUSCAR VENDA
          // =================================================

          const venda =
            await tx.venda.findUnique({
              where: {
                id: vendaId,
              },

              include: {
                itens: {
                  include: {
                    aparelhos: {
                      include: {
                        lote: true,
                      },
                    },

                    produto: true,
                  },
                },

                pagamentos: {
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
            });

          if (!venda) {
            throw new Error(
              "Venda não encontrada."
            );
          }

          // =================================================
          // ENCONTRAR APARELHO
          // =================================================

          let aparelhoEncontrado:
            | (typeof venda.itens[number]["aparelhos"][number])
            | null = null;

          let itemEncontrado:
            | (typeof venda.itens[number])
            | null = null;

          for (
            const item of venda.itens
          ) {
            const aparelho =
              item.aparelhos.find(
                (a) => {
                  if (
                    aparelhoId !== null
                  ) {
                    return (
                      a.id ===
                      aparelhoId
                    );
                  }

                  return (
                    a.imei === imei
                  );
                }
              );

            if (aparelho) {
              aparelhoEncontrado =
                aparelho;

              itemEncontrado =
                item;

              break;
            }
          }

          if (
            !aparelhoEncontrado ||
            !itemEncontrado
          ) {
            throw new Error(
              "Este aparelho/IMEI não está vinculado a esta venda."
            );
          }

          // =================================================
          // CONFIRMAR QUE ESTÁ VENDIDO
          // =================================================

          if (
            aparelhoEncontrado.vendido !==
            true
          ) {
            throw new Error(
              "Este aparelho já foi devolvido."
            );
          }

          // =================================================
          // CUSTO DO APARELHO
          // =================================================

          let custoAparelho = 0;

          if (
            aparelhoEncontrado.lote
              ?.precoCompraUsd !==
              null &&
            aparelhoEncontrado.lote
              ?.precoCompraUsd !==
              undefined
          ) {
            custoAparelho = Number(
              aparelhoEncontrado.lote
                .precoCompraUsd
            );
          }

          // =================================================
          // VALOR DE VENDA
          // =================================================

          const valorUnitario =
            Number(
              itemEncontrado.valorUnitario ||
                0
            );

          // =================================================
          // DEVOLVER APARELHO AO ESTOQUE
          // =================================================

          await tx.aparelho.update({
            where: {
              id:
                aparelhoEncontrado.id,
            },

            data: {
              vendido: false,

              vendaItemId:
                null,
            },
          });

          await tx.produto.update({
            where: {
              id:
                itemEncontrado.produtoId,
            },

            data: {
              quantidade: {
                increment: 1,
              },
            },
          });

          // =================================================
          // ATUALIZAR ITEM DA VENDA
          // =================================================

          const novaQuantidade =
            Number(
              itemEncontrado.quantidade ||
                0
            ) - 1;

          if (
            novaQuantidade <= 0
          ) {
            await tx.vendaItem.delete({
              where: {
                id:
                  itemEncontrado.id,
              },
            });
          } else {
            const novoTotal =
              novaQuantidade *
              valorUnitario;

            const custoAtual =
              Number(
                itemEncontrado.custoTotal ||
                  0
              );

            const novoCustoTotal =
              Math.max(
                0,
                custoAtual -
                  custoAparelho
              );

            const novoPrecoCompra =
              novaQuantidade > 0
                ? novoCustoTotal /
                  novaQuantidade
                : null;

            await tx.vendaItem.update({
              where: {
                id:
                  itemEncontrado.id,
              },

              data: {
                quantidade:
                  novaQuantidade,

                total:
                  novoTotal,

                custoTotal:
                  novoCustoTotal,

                precoCompraUsd:
                  novoPrecoCompra,
              },
            });
          }

          // =================================================
          // NOVO TOTAL DA VENDA
          // =================================================

          const itensAtualizados =
            await tx.vendaItem.findMany({
              where: {
                vendaId,
              },
            });

          const novoTotalVenda =
            itensAtualizados.reduce(
              (
                total,
                item
              ) =>
                total +
                Number(
                  item.total || 0
                ),
              0
            );

          const novoCustoTotalUsd =
            itensAtualizados.reduce(
              (
                total,
                item
              ) =>
                total +
                Number(
                  item.custoTotal || 0
                ),
              0
            );

          // =================================================
          // PAGAMENTO AUTOMÁTICO
          // =================================================

          const pagamentoAutomatico =
            venda.pagamentos.find(
              (pagamento) =>
                pagamento.observacao ===
                "Pagamento registrado automaticamente na venda."
            );

          if (
            pagamentoAutomatico
          ) {
            if (
              novoTotalVenda <=
              0.009
            ) {
              await tx.pagamento.delete({
                where: {
                  id:
                    pagamentoAutomatico.id,
                },
              });
            } else {
              await tx.pagamento.update({
                where: {
                  id:
                    pagamentoAutomatico.id,
                },

                data: {
                  valor:
                    novoTotalVenda,
                },
              });
            }
          }

          // =================================================
          // NOVO ESTADO DA FATURA
          // =================================================

          let novoEstadoFatura =
            venda.estadoFatura;

          if (
            novoTotalVenda <=
            0.009
          ) {
            novoEstadoFatura =
              "Cancelada";
          } else if (
            pagamentoAutomatico
          ) {
            novoEstadoFatura =
              "Quitado";
          }

          // =================================================
          // ATUALIZAR VENDA
          // =================================================

          const vendaAtualizada =
            await tx.venda.update({
              where: {
                id: vendaId,
              },

              data: {
                estadoFatura:
                  novoEstadoFatura,
              },

              include: {
                itens: {
                  include: {
                    produto: true,
                    aparelhos: true,
                  },
                },

                pagamentos: {
                  orderBy: {
                    createdAt:
                      "asc",
                  },
                },
              },
            });

          return {
            venda:
              vendaAtualizada,

            aparelhoDevolvido: {
              id:
                aparelhoEncontrado.id,

              imei:
                aparelhoEncontrado.imei,

              modelo:
                itemEncontrado.produto
                  .nome,
            },

            novoTotalVenda,

            novoCustoTotalUsd,
          };
        }
      );

    return NextResponse.json({
      success: true,

      message:
        "Aparelho devolvido com sucesso e retornado ao estoque.",

      ...resultado,
    });
  } catch (error) {
    console.error(
      "ERRO AO DEVOLVER APARELHO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao devolver aparelho.",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================================
// DELETE — EXCLUIR VENDA INTEIRA
// SOMENTE ADMIN
// =====================================================

export async function DELETE(req: Request) {
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
            "Somente o administrador pode cancelar uma venda.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const vendaId = Number(
      body.vendaId ??
        body.id
    );

    if (
      !Number.isInteger(
        vendaId
      ) ||
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

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {
        // =================================================
        // BUSCAR VENDA
        // =================================================

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

        // =================================================
        // DEVOLVER TODOS OS APARELHOS
        // =================================================

        for (
          const item of venda.itens
        ) {
          const aparelhos =
            item.aparelhos;

          if (
            aparelhos.length >
            0
          ) {
            await tx.aparelho.updateMany({
              where: {
                id: {
                  in:
                    aparelhos.map(
                      (
                        aparelho: {
                          id: number;
                        }
                      ) =>
                        aparelho.id
                    ),
                },
              },

              data: {
                vendido:
                  false,

                vendaItemId:
                  null,
              },
            });

            await tx.produto.update({
              where: {
                id:
                  item.produtoId,
              },

              data: {
                quantidade: {
                  increment:
                    aparelhos.length,
                },
              },
            });
          }
        }

        // =================================================
        // DELETAR PAGAMENTOS
        // =================================================

        await tx.pagamento.deleteMany({
          where: {
            vendaId,
          },
        });

        // =================================================
        // DELETAR ITENS
        // =================================================

        await tx.vendaItem.deleteMany({
          where: {
            vendaId,
          },
        });

        // =================================================
        // DELETAR VENDA
        // =================================================

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
        "Venda excluída e todos os aparelhos foram devolvidos ao estoque.",
    });
  } catch (error) {
    console.error(
      "ERRO AO EXCLUIR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao excluir venda.",
      },
      {
        status: 400,
      }
    );
  }
}