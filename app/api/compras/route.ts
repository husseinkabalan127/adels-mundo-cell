import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

// =====================================================
// HELPERS
// =====================================================

function numeroOuNull(valor: unknown): number | null {
  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {
    return null;
  }

  const numero = Number(
    String(valor).replace(",", ".")
  );

  if (!Number.isFinite(numero)) {
    return null;
  }

  return numero;
}

function dataValida(
  valor: unknown
): Date | null {
  const texto =
    String(valor || "").trim();

  if (!texto) {
    return null;
  }

  const data = new Date(
    `${texto}T12:00:00`
  );

  if (Number.isNaN(data.getTime())) {
    return null;
  }

  return data;
}

function moedaValida(
  valor: unknown
): "USD" | "BRL" {
  const moeda =
    String(valor || "USD")
      .trim()
      .toUpperCase();

  return moeda === "BRL"
    ? "BRL"
    : "USD";
}

// =====================================================
// GET - BUSCAR COMPRAS
// =====================================================

export async function GET() {
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

    const lotes =
      await prisma.lote.findMany({
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

    // =================================================
    // ORGANIZAR COMPRAS
    // =================================================

    const compras =
      lotes.map((lote) => {
        const primeiroAparelho =
          lote.aparelhos?.[0] ||
          null;

        return {
          ...lote,

          // MODELO
          produtoNome:
            lote.produto?.nome ||
            "",

          // COR
          // OPCIONAL
          cor:
            primeiroAparelho?.cor ||
            "",

          // MEMÓRIA
          // OPCIONAL
          memoria:
            primeiroAparelho?.memoria ||
            "",

          // PREÇO
          precoCompra:
            lote.precoCompra ??
            null,

          // MOEDA
          moedaCompra:
            lote.moedaCompra ??
            null,

          // COMPATIBILIDADE
          precoCompraUsd:
            lote.precoCompraUsd ??
            null,

          precoCompraBrl:
            lote.precoCompraBrl ??
            null,

          // DATA
          dataCompra:
            lote.dataCompra ??
            lote.createdAt,

          // APARELHOS
          aparelhos:
            lote.aparelhos ||
            [],
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
//
// COR É OPCIONAL
// MEMÓRIA É OPCIONAL
// =====================================================

export async function POST(
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

    // =================================================
    // ITENS
    // =================================================

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

      // COR OPCIONAL
      const cor =
        String(
          body.cor || ""
        ).trim();

      // MEMÓRIA OPCIONAL
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

      const precoCompraRaw =
        body.precoCompra ??
        body.precoCompraUsd ??
        "";

      const precoCompra =
        numeroOuNull(
          precoCompraRaw
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

    // =================================================
    // DATA
    // =================================================

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

      // =================================================
      // MODELO
      // =================================================

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

      // =================================================
      // COR
      // OPCIONAL
      // =================================================

      const cor =
        String(
          item?.cor || ""
        ).trim();

      // =================================================
      // MEMÓRIA
      // OPCIONAL
      // =================================================

      const memoria =
        String(
          item?.memoria || ""
        ).trim();

      // =================================================
      // QUANTIDADE
      // =================================================

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

      // =================================================
      // MOEDA
      // =================================================

      const moedaCompra =
        moedaValida(
          item?.moedaCompra ||
            item?.moeda ||
            "USD"
        );

      // =================================================
      // PREÇO
      // =================================================

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

      // =================================================
      // IMEIS
      // =================================================

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

        // COR PODE SER ""
        cor,

        // MEMÓRIA PODE SER ""
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
    // IMEI DUPLICADO NA MESMA COMPRA
    // =================================================

    const imeisUnicos =
      new Set(
        todosImeis
      );

    if (
      imeisUnicos.size !==
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
            // -----------------------------------------
            // PRODUTO
            // -----------------------------------------

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

            // -----------------------------------------
            // LOTE
            // -----------------------------------------

            const lote =
              await tx.lote.create(
                {
                  data: {
                    fornecedor,

                    quantidade:
                      item.quantidade,

                    createdAt:
                      dataCompra,

                    dataCompra:
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

            // -----------------------------------------
            // APARELHOS
            // -----------------------------------------

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

                      // COR OPCIONAL
                      cor:
                        item.cor ||
                        null,

                      // MEMÓRIA OPCIONAL
                      memoria:
                        item.memoria ||
                        null,
                    })
                  ),
              }
            );

            // -----------------------------------------
            // ESTOQUE
            // -----------------------------------------

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
//
// PODE EDITAR MESMO SE APARELHOS JÁ FORAM VENDIDOS.
//
// COR = OPCIONAL
// MEMÓRIA = OPCIONAL
//
// MUDAR MODELO:
// - aparelhos vendidos acompanham o novo modelo
// - aparelhos disponíveis acompanham o novo modelo
// - estoque muda somente pelos não vendidos
//
// IMEI:
// - vendido não pode ter IMEI alterado
// - não vendido pode ter IMEI alterado
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
            "Somente o administrador pode editar compras.",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await req.json();

    // =================================================
    // ID DO LOTE
    // =================================================

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

    // =================================================
    // BUSCAR LOTE
    // =================================================

    const lote =
      await prisma.lote.findUnique(
        {
          where: {
            id: loteId,
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
    //
    // OPCIONAL
    //
    // Se não vier no PATCH:
    // mantém a cor atual.
    //
    // Se vier "":
    // remove a cor.
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
    //
    // OPCIONAL
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
      // IMPORTANTE:
      // usamos uma variável local que é SEMPRE string[]
      // depois do Array.isArray. Isso evita o erro do
      // TypeScript/Vercel dizendo que novosImeis pode ser null.

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

      const imeisSet =
        new Set(
          imeisRecebidos
        );

      if (
        imeisSet.size !==
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

      // Só atribuímos depois que todas
      // as validações passaram.
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

          let produtoDestino =
            lote.produto;

          if (
            mudouModelo
          ) {
            produtoDestino =
              await tx.produto.findFirst(
                {
                  where: {
                    nome:
                      novoModelo,
                  },
                }
              );

            if (
              !produtoDestino
            ) {
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
            // SOMENTE NÃO VENDIDOS
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
            }

            // =======================================
            // ADICIONAR AO NOVO
            // =======================================

            if (
              quantidadeDisponivel >
              0
            ) {
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
            // MOVER TODOS OS APARELHOS
            //
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
          //
          // AMBOS OPCIONAIS
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

            // ---------------------------------------
            // COR
            // ---------------------------------------

            if (
              novaCor !==
              undefined
            ) {
              dadosAparelho.cor =
                novaCor ||
                null;
            }

            // ---------------------------------------
            // MEMÓRIA
            // ---------------------------------------

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
          //
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

              // NÃO MEXER NO IMEI VENDIDO
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

          const loteFinal =
            await tx.lote.findUnique(
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

          return loteFinal;
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