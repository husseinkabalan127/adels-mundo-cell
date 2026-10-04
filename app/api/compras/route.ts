import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

function numeroOuNull(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  const numero = Number(
    String(valor).replace(",", ".")
  );

  return Number.isFinite(numero) ? numero : null;
}

function dataValida(valor: unknown): Date | null {
  const texto = String(valor || "").trim();

  if (!texto) return null;

  const data = new Date(`${texto}T12:00:00`);

  return Number.isNaN(data.getTime()) ? null : data;
}

function moedaValida(valor: unknown): "USD" | "BRL" {
  return String(valor || "USD").trim().toUpperCase() === "BRL"
    ? "BRL"
    : "USD";
}

// =====================================================
// GET - BUSCAR COMPRAS
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

    const lotes = await prisma.lote.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        produto: true,

        aparelhos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const compras = lotes.map((lote) => {
      const primeiroAparelho =
        lote.aparelhos?.[0] || null;

      return {
        ...lote,

        produtoNome:
          lote.produto?.nome || "",

        cor:
          primeiroAparelho?.cor || "",

        memoria:
          primeiroAparelho?.memoria || "",

        precoCompra:
          lote.precoCompra ?? null,

        moedaCompra:
          lote.moedaCompra ?? null,

        precoCompraUsd:
          lote.precoCompraUsd ?? null,

        precoCompraBrl:
          lote.precoCompraBrl ?? null,

        dataCompra:
          lote.dataCompra ??
          lote.createdAt,

        aparelhos:
          lote.aparelhos || [],
      };
    });

    return NextResponse.json(
      compras
    );
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR COMPRAS:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar compras.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST - CADASTRAR COMPRA
// SOMENTE ADMIN
// =====================================================

export async function POST(
  req: Request
) {
  try {
    const usuario =
      await obterSessao();

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

    if (
      usuario.role !==
      "ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode cadastrar compras.",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    const fornecedor =
      String(
        body.fornecedor || ""
      ).trim();

    const dataCompraRaw =
      String(
        body.dataCompra || ""
      ).trim();

    let itens =
      Array.isArray(
        body.itens
      )
        ? body.itens
        : [];

    // =================================================
    // FORMATO SIMPLES
    // =================================================

    if (
      itens.length === 0 &&
      body.modelo
    ) {
      const modelo =
        String(
          body.modelo || ""
        ).trim();

      const cor =
        String(
          body.cor || ""
        ).trim();

      const memoria =
        String(
          body.memoria || ""
        ).trim();

      const moeda =
        String(
          body.moeda ||
            body.moedaCompra ||
            "USD"
        )
          .trim()
          .toUpperCase();

      const precoCompra =
        numeroOuNull(
          body.precoCompra ??
            body.precoCompraUsd ??
            ""
        );

      const imeis =
        Array.isArray(
          body.imeis
        )
          ? body.imeis
              .map(
                (imei: unknown) =>
                  String(
                    imei
                  ).trim()
              )
              .filter(Boolean)
          : [];

      itens = [
        {
          modelo,
          cor,
          memoria,
          quantidade:
            imeis.length,
          precoCompra,
          moeda,
          precoCompraUsd:
            moeda === "USD"
              ? precoCompra
              : null,
          precoCompraBrl:
            moeda === "BRL"
              ? precoCompra
              : null,
          imeis,
        },
      ];
    }

    // =================================================
    // VALIDAÇÕES
    // =================================================

    if (!fornecedor) {
      return NextResponse.json(
        {
          error:
            "Informe o fornecedor.",
        },
        {
          status: 400,
        }
      );
    }

    if (!dataCompraRaw) {
      return NextResponse.json(
        {
          error:
            "Informe a data da compra.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      itens.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Adicione pelo menos um modelo.",
        },
        {
          status: 400,
        }
      );
    }

    const dataCompra =
      dataValida(
        dataCompraRaw
      );

    if (!dataCompra) {
      return NextResponse.json(
        {
          error:
            "Data da compra inválida.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // PREPARAR ITENS
    // =================================================

    const itensPreparados: {
      modelo: string;
      cor: string;
      memoria: string;
      quantidade: number;
      precoCompra:
        | number
        | null;
      moedaCompra:
        | "USD"
        | "BRL";
      precoCompraUsd:
        | number
        | null;
      precoCompraBrl:
        | number
        | null;
      imeis: string[];
    }[] = [];

    const todosImeis: string[] =
      [];

    for (
      let i = 0;
      i < itens.length;
      i++
    ) {
      const item =
        itens[i];

      const modelo =
        String(
          item?.modelo || ""
        ).trim();

      if (!modelo) {
        return NextResponse.json(
          {
            error:
              `Informe o modelo do item ${
                i + 1
              }.`,
          },
          {
            status: 400,
          }
        );
      }

      const cor =
        String(
          item?.cor || ""
        ).trim();

      const memoria =
        String(
          item?.memoria || ""
        ).trim();

      const quantidade =
        Number(
          item?.quantidade
        );

      if (
        !Number.isInteger(
          quantidade
        ) ||
        quantidade <= 0
      ) {
        return NextResponse.json(
          {
            error:
              `Quantidade inválida no item ${
                i + 1
              }.`,
          },
          {
            status: 400,
          }
        );
      }

      const moedaCompra =
        moedaValida(
          item?.moedaCompra ||
            item?.moeda ||
            "USD"
        );

      const precoRaw =
        item?.precoCompra ??
        (
          moedaCompra ===
          "USD"
            ? item?.precoCompraUsd
            : item?.precoCompraBrl
        );

      const precoCompra =
        numeroOuNull(
          precoRaw
        );

      if (
        precoCompra !==
          null &&
        (
          !Number.isFinite(
            precoCompra
          ) ||
          precoCompra < 0
        )
      ) {
        return NextResponse.json(
          {
            error:
              `Preço de compra inválido no item ${
                i + 1
              }.`,
          },
          {
            status: 400,
          }
        );
      }

      const imeis =
        Array.isArray(
          item?.imeis
        )
          ? item.imeis
              .map(
                (imei: unknown) =>
                  String(
                    imei
                  ).trim()
              )
              .filter(Boolean)
          : [];

      if (
        imeis.length !==
        quantidade
      ) {
        return NextResponse.json(
          {
            error:
              `O item ${modelo} precisa ter ${quantidade} IMEI(s).`,
          },
          {
            status: 400,
          }
        );
      }

      itensPreparados.push({
        modelo,
        cor,
        memoria,
        quantidade,
        precoCompra,
        moedaCompra,

        precoCompraUsd:
          moedaCompra ===
          "USD"
            ? precoCompra
            : null,

        precoCompraBrl:
          moedaCompra ===
          "BRL"
            ? precoCompra
            : null,

        imeis,
      });

      todosImeis.push(
        ...imeis
      );
    }

    // =================================================
    // IMEI DUPLICADO
    // =================================================

    if (
      new Set(
        todosImeis
      ).size !==
      todosImeis.length
    ) {
      return NextResponse.json(
        {
          error:
            "Não pode haver IMEI repetido na mesma compra.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // IMEI JÁ EXISTENTE
    // =================================================

    const aparelhosExistentes =
      await prisma.aparelho.findMany(
        {
          where: {
            imei: {
              in:
                todosImeis,
            },
          },

          select: {
            imei: true,
          },
        }
      );

    if (
      aparelhosExistentes.length >
      0
    ) {
      const repetidos =
        aparelhosExistentes
          .map(
            (item) =>
              item.imei
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
          const produtosCriados =
            [];

          for (
            const item of
              itensPreparados
          ) {
            let produto =
              await tx.produto.findFirst(
                {
                  where: {
                    nome:
                      item.modelo,
                  },
                }
              );

            if (!produto) {
              produto =
                await tx.produto.create(
                  {
                    data: {
                      nome:
                        item.modelo,

                      quantidade:
                        0,
                    },
                  }
                );
            }

            const lote =
              await tx.lote.create(
                {
                  data: {
                    fornecedor,

                    quantidade:
                      item.quantidade,

                    createdAt:
                      dataCompra,

                    dataCompra,

                    produtoId:
                      produto.id,

                    precoCompra:
                      item.precoCompra,

                    moedaCompra:
                      item.moedaCompra,

                    precoCompraUsd:
                      item.precoCompraUsd,

                    precoCompraBrl:
                      item.precoCompraBrl,
                  },
                }
              );

            await tx.aparelho.createMany(
              {
                data:
                  item.imeis.map(
                    (imei) => ({
                      imei,

                      vendido:
                        false,

                      loteId:
                        lote.id,

                      produtoId:
                        produto.id,

                      cor:
                        item.cor ||
                        null,

                      memoria:
                        item.memoria ||
                        null,
                    })
                  ),
              }
            );

            const produtoAtualizado =
              await tx.produto.update(
                {
                  where: {
                    id:
                      produto.id,
                  },

                  data: {
                    quantidade: {
                      increment:
                        item.quantidade,
                    },
                  },
                }
              );

            produtosCriados.push({
              produto:
                produtoAtualizado,

              lote,

              modelo:
                item.modelo,

              cor:
                item.cor ||
                null,

              memoria:
                item.memoria ||
                null,

              quantidade:
                item.quantidade,

              precoCompra:
                item.precoCompra,

              moedaCompra:
                item.moedaCompra,

              imeis:
                item.imeis,
            });
          }

          return produtosCriados;
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Compra cadastrada com sucesso.",

        itens:
          resultado,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "ERRO AO CADASTRAR COMPRA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar compra.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH - EDITAR COMPRA
// =====================================================

export async function PATCH(
  req: Request
) {
  try {
    const usuario =
      await obterSessao();

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

    if (
      usuario.role !==
      "ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode editar compras.",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    const loteId =
      Number(
        body.loteId ??
          body.id
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
            "ID da compra inválido.",
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
            id:
              loteId,
          },

          include: {
            produto: true,

            aparelhos: {
              orderBy: {
                createdAt:
                  "asc",
              },
            },
          },
        }
      );

    if (!lote) {
      return NextResponse.json(
        {
          error:
            "Compra não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    // =================================================
    // FORNECEDOR
    // =================================================

    const fornecedor =
      body.fornecedor !==
      undefined
        ? String(
            body.fornecedor || ""
          ).trim()
        : lote.fornecedor;

    if (!fornecedor) {
      return NextResponse.json(
        {
          error:
            "Informe o fornecedor.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // DATA
    // =================================================

    let novaData =
      lote.dataCompra ??
      lote.createdAt;

    if (
      body.dataCompra !==
        undefined &&
      body.dataCompra !==
        null &&
      body.dataCompra !==
        ""
    ) {
      const data =
        dataValida(
          body.dataCompra
        );

      if (!data) {
        return NextResponse.json(
          {
            error:
              "Data da compra inválida.",
          },
          {
            status: 400,
          }
        );
      }

      novaData = data;
    }

    // =================================================
    // MODELO
    // =================================================

    const modeloAtual =
      lote.produto?.nome ||
      "";

    const novoModelo =
      body.modelo !==
      undefined
        ? String(
            body.modelo || ""
          ).trim()
        : modeloAtual;

    if (!novoModelo) {
      return NextResponse.json(
        {
          error:
            "Informe o modelo.",
        },
        {
          status: 400,
        }
      );
    }

    const mudouModelo =
      novoModelo !==
      modeloAtual;

    // =================================================
    // COR
    // =================================================

    let novaCor:
      | string
      | undefined;

    if (
      body.cor !==
      undefined
    ) {
      novaCor =
        String(
          body.cor || ""
        ).trim();
    }

    // =================================================
    // MEMÓRIA
    // =================================================

    let novaMemoria:
      | string
      | undefined;

    if (
      body.memoria !==
      undefined
    ) {
      novaMemoria =
        String(
          body.memoria || ""
        ).trim();
    }

    // =================================================
    // MOEDA
    // =================================================

    const moedaCompra =
      body.moedaCompra !==
        undefined ||
      body.moeda !==
        undefined
        ? moedaValida(
            body.moedaCompra ??
              body.moeda
          )
        : lote.moedaCompra ??
          (
            lote.precoCompraBrl !==
            null
              ? "BRL"
              : "USD"
          );

    // =================================================
    // PREÇO
    // =================================================

    let precoCompra =
      lote.precoCompra ??
      (
        moedaCompra ===
        "USD"
          ? lote.precoCompraUsd
          : lote.precoCompraBrl
      );

    if (
      body.precoCompra !==
        undefined ||
      body.precoCompraUsd !==
        undefined ||
      body.precoCompraBrl !==
        undefined
    ) {
      let valorRaw =
        body.precoCompra;

      if (
        valorRaw ===
        undefined
      ) {
        valorRaw =
          moedaCompra ===
          "USD"
            ? body.precoCompraUsd
            : body.precoCompraBrl;
      }

      precoCompra =
        numeroOuNull(
          valorRaw
        );

      if (
        precoCompra !==
          null &&
        (
          !Number.isFinite(
            precoCompra
          ) ||
          precoCompra < 0
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Preço de compra inválido.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // =================================================
    // IMEIS
    // =================================================

    let novosImeis:
      | string[]
      | null = null;

    if (
      Array.isArray(
        body.imeis
      )
    ) {
      const imeisRecebidos:
        string[] =
        body.imeis
          .map(
            (imei: unknown) =>
              String(
                imei
              ).trim()
          )
          .filter(Boolean);

      // -----------------------------------------------
      // QUANTIDADE
      // -----------------------------------------------

      if (
        imeisRecebidos.length !==
        lote.aparelhos.length
      ) {
        return NextResponse.json(
          {
            error:
              `Esta compra possui ${lote.aparelhos.length} aparelho(s). É necessário informar exatamente ${lote.aparelhos.length} IMEI(s).`,
          },
          {
            status: 400,
          }
        );
      }

      // -----------------------------------------------
      // DUPLICADOS
      // -----------------------------------------------

      if (
        new Set(
          imeisRecebidos
        ).size !==
        imeisRecebidos.length
      ) {
        return NextResponse.json(
          {
            error:
              "Não pode haver IMEI repetido nesta compra.",
          },
          {
            status: 400,
          }
        );
      }

      // -----------------------------------------------
      // IMEI EM OUTRA COMPRA
      // -----------------------------------------------

      const aparelhosComMesmoImei =
        await prisma.aparelho.findMany(
          {
            where: {
              imei: {
                in:
                  imeisRecebidos,
              },

              NOT: {
                loteId:
                  loteId,
              },
            },

            select: {
              imei: true,
            },
          }
        );

      if (
        aparelhosComMesmoImei.length >
        0
      ) {
        const repetidos =
          aparelhosComMesmoImei
            .map(
              (
                aparelho
              ) =>
                aparelho.imei
            )
            .join(", ");

        return NextResponse.json(
          {
            error:
              `Este(s) IMEI(s) já está(ão) cadastrado(s) em outra compra: ${repetidos}`,
          },
          {
            status: 400,
          }
        );
      }

      // -----------------------------------------------
      // NÃO ALTERAR IMEI VENDIDO
      // -----------------------------------------------

      for (
        let i = 0;
        i <
          lote.aparelhos
            .length;
        i++
      ) {
        const aparelho =
          lote.aparelhos[i];

        if (
          aparelho.vendido &&
          aparelho.imei !==
            imeisRecebidos[i]
        ) {
          return NextResponse.json(
            {
              error:
                `O IMEI ${aparelho.imei} já foi vendido e não pode ser alterado.`,
            },
            {
              status: 400,
            }
          );
        }
      }

      novosImeis =
        imeisRecebidos;
    }

    // =================================================
    // TRANSACTION
    // =================================================

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {

          // =========================================
          // PRODUTO DESTINO
          // =========================================

          /*
           * IMPORTANTE:
           * produtoDestino nunca recebe null.
           */

          let produtoDestino =
            lote.produto;

          if (
            mudouModelo
          ) {
            const produtoExistente =
              await tx.produto.findFirst(
                {
                  where: {
                    nome:
                      novoModelo,
                  },
                }
              );

            if (
              produtoExistente
            ) {
              produtoDestino =
                produtoExistente;
            } else {
              produtoDestino =
                await tx.produto.create(
                  {
                    data: {
                      nome:
                        novoModelo,

                      quantidade:
                        0,
                    },
                  }
                );
            }

            // =======================================
            // QUANTIDADE DISPONÍVEL
            // =======================================

            const quantidadeDisponivel =
              lote.aparelhos.filter(
                (
                  aparelho
                ) =>
                  !aparelho.vendido
              ).length;

            // =======================================
            // RETIRAR DO ESTOQUE ANTIGO
            // =======================================

            if (
              quantidadeDisponivel >
              0
            ) {
              await tx.produto.update(
                {
                  where: {
                    id:
                      lote.produtoId,
                  },

                  data: {
                    quantidade: {
                      decrement:
                        quantidadeDisponivel,
                    },
                  },
                }
              );

              // =====================================
              // ADICIONAR AO NOVO ESTOQUE
              // =====================================

              await tx.produto.update(
                {
                  where: {
                    id:
                      produtoDestino.id,
                  },

                  data: {
                    quantidade: {
                      increment:
                        quantidadeDisponivel,
                    },
                  },
                }
              );
            }

            // =======================================
            // MOVER APARELHOS
            // INCLUSIVE VENDIDOS
            // =======================================

            await tx.aparelho.updateMany(
              {
                where: {
                  loteId:
                    loteId,
                },

                data: {
                  produtoId:
                    produtoDestino.id,
                },
              }
            );
          }

          // =========================================
          // ATUALIZAR LOTE
          // =========================================

          await tx.lote.update(
            {
              where: {
                id:
                  loteId,
              },

              data: {
                fornecedor,

                createdAt:
                  novaData,

                dataCompra:
                  novaData,

                produtoId:
                  produtoDestino.id,

                precoCompra,

                moedaCompra,

                precoCompraUsd:
                  moedaCompra ===
                  "USD"
                    ? precoCompra
                    : null,

                precoCompraBrl:
                  moedaCompra ===
                  "BRL"
                    ? precoCompra
                    : null,
              },
            }
          );

          // =========================================
          // COR / MEMÓRIA
          // =========================================

          if (
            novaCor !==
              undefined ||
            novaMemoria !==
              undefined
          ) {
            const dadosAparelho: {
              cor?:
                | string
                | null;

              memoria?:
                | string
                | null;
            } = {};

            if (
              novaCor !==
              undefined
            ) {
              dadosAparelho.cor =
                novaCor ||
                null;
            }

            if (
              novaMemoria !==
              undefined
            ) {
              dadosAparelho.memoria =
                novaMemoria ||
                null;
            }

            await tx.aparelho.updateMany(
              {
                where: {
                  loteId:
                    loteId,
                },

                data:
                  dadosAparelho,
              }
            );
          }

          // =========================================
          // ATUALIZAR IMEIS
          // SOMENTE NÃO VENDIDOS
          // =========================================

          if (
            novosImeis !==
            null
          ) {
            for (
              let i = 0;
              i <
                lote.aparelhos
                  .length;
              i++
            ) {
              const aparelho =
                lote.aparelhos[i];

              if (
                aparelho.vendido
              ) {
                continue;
              }

              await tx.aparelho.update(
                {
                  where: {
                    id:
                      aparelho.id,
                  },

                  data: {
                    imei:
                      novosImeis[
                        i
                      ],
                  },
                }
              );
            }
          }

          // =========================================
          // RESULTADO FINAL
          // =========================================

          return tx.lote.findUnique(
            {
              where: {
                id:
                  loteId,
              },

              include: {
                produto:
                  true,

                aparelhos: {
                  orderBy: {
                    createdAt:
                      "desc",
                  },
                },
              },
            }
          );
        }
      );

    // =================================================
    // SUCESSO
    // =================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Compra editada com sucesso.",

        compra:
          resultado,
      }
    );
  } catch (error) {
    console.error(
      "ERRO AO EDITAR COMPRA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao editar compra.",
      },
      {
        status: 500,
      }
    );
  }
}