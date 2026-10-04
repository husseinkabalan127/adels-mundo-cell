import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

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

    return NextResponse.json(lotes);
  } catch (error) {
    console.error("ERRO AO BUSCAR COMPRAS:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar compras.",
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
            "Somente o administrador pode cadastrar compras.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const fornecedor = String(
      body.fornecedor || ""
    ).trim();

    const dataCompraRaw = String(
      body.dataCompra || ""
    ).trim();

    const itens = Array.isArray(body.itens)
      ? body.itens
      : [];

    // =================================================
    // VALIDAÇÕES GERAIS
    // =================================================

    if (!fornecedor) {
      return NextResponse.json(
        {
          error: "Informe o fornecedor.",
        },
        {
          status: 400,
        }
      );
    }

    if (!dataCompraRaw) {
      return NextResponse.json(
        {
          error: "Informe a data da compra.",
        },
        {
          status: 400,
        }
      );
    }

    if (itens.length === 0) {
      return NextResponse.json(
        {
          error: "Adicione pelo menos um modelo.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // DATA DA COMPRA
    // =================================================

    const dataCompra = new Date(
      `${dataCompraRaw}T12:00:00`
    );

    if (Number.isNaN(dataCompra.getTime())) {
      return NextResponse.json(
        {
          error: "Data da compra inválida.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // PREPARAR E VALIDAR ITENS
    // =================================================

    const itensPreparados: {
      modelo: string;
      cor: string;
      quantidade: number;
      precoCompraUsd: number;
      imeis: string[];
    }[] = [];

    const todosImeis: string[] = [];

    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];

      const modelo = String(
        item?.modelo || ""
      ).trim();

      const cor = String(
        item?.cor || ""
      ).trim();

      const quantidade = Number(
        item?.quantidade
      );

      const precoCompraUsd =
        item?.precoCompraUsd === "" ||
        item?.precoCompraUsd === null ||
        item?.precoCompraUsd === undefined
          ? NaN
          : Number(
              String(
                item.precoCompraUsd
              ).replace(",", ".")
            );

      const imeis = Array.isArray(item?.imeis)
        ? item.imeis
            .map((imei: unknown) =>
              String(imei).trim()
            )
            .filter(Boolean)
        : [];

      // Modelo
      if (!modelo) {
        return NextResponse.json(
          {
            error:
              `Informe o modelo do item ${i + 1}.`,
          },
          {
            status: 400,
          }
        );
      }

      // Cor
      if (!cor) {
        return NextResponse.json(
          {
            error:
              `Informe a cor do item ${i + 1}.`,
          },
          {
            status: 400,
          }
        );
      }

      // Quantidade
      if (
        !Number.isInteger(quantidade) ||
        quantidade <= 0
      ) {
        return NextResponse.json(
          {
            error:
              `Quantidade inválida no item ${i + 1}.`,
          },
          {
            status: 400,
          }
        );
      }

      // Preço USD
      if (
        !Number.isFinite(precoCompraUsd) ||
        precoCompraUsd <= 0
      ) {
        return NextResponse.json(
          {
            error:
              `Preço de compra USD inválido no item ${i + 1}.`,
          },
          {
            status: 400,
          }
        );
      }

      // Quantidade de IMEIs
      if (imeis.length !== quantidade) {
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
        quantidade,
        precoCompraUsd,
        imeis,
      });

      todosImeis.push(...imeis);
    }

    // =================================================
    // VERIFICAR IMEI REPETIDO NA PRÓPRIA COMPRA
    // =================================================

    const imeisUnicos = new Set(todosImeis);

    if (
      imeisUnicos.size !== todosImeis.length
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
    // VERIFICAR IMEI JÁ EXISTENTE NO ESTOQUE
    // =================================================

    const aparelhosExistentes =
      await prisma.aparelho.findMany({
        where: {
          imei: {
            in: todosImeis,
          },
        },

        select: {
          imei: true,
        },
      });

    if (aparelhosExistentes.length > 0) {
      const repetidos =
        aparelhosExistentes
          .map((item) => item.imei)
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
          const produtosCriados = [];

          for (const item of itensPreparados) {
            // -----------------------------------------
            // PROCURAR PRODUTO
            // -----------------------------------------

            let produto =
              await tx.produto.findFirst({
                where: {
                  nome: item.modelo,
                },
              });

            // -----------------------------------------
            // CRIAR PRODUTO SE NÃO EXISTIR
            // -----------------------------------------

            if (!produto) {
              produto =
                await tx.produto.create({
                  data: {
                    nome: item.modelo,
                    quantidade: 0,
                  },
                });
            }

            // -----------------------------------------
            // CRIAR LOTE
            // -----------------------------------------

            const lote =
              await tx.lote.create({
                data: {
                  fornecedor,
                  precoCompraUsd:
                    item.precoCompraUsd,

                  quantidade:
                    item.quantidade,

                  createdAt: dataCompra,

                  produtoId: produto.id,
                },
              });

            // -----------------------------------------
            // CRIAR APARELHOS / IMEIS
            // -----------------------------------------

            await tx.aparelho.createMany({
              data: item.imeis.map(
                (imei) => ({
                  imei,

                  vendido: false,

                  loteId: lote.id,

                  produtoId: produto.id,

                  cor: item.cor,
                })
              ),
            });

            // -----------------------------------------
            // AUMENTAR ESTOQUE
            // -----------------------------------------

            const produtoAtualizado =
              await tx.produto.update({
                where: {
                  id: produto.id,
                },

                data: {
                  quantidade: {
                    increment:
                      item.quantidade,
                  },
                },
              });

            produtosCriados.push({
              produto: produtoAtualizado,
              lote,
              modelo: item.modelo,
              cor: item.cor,
              quantidade: item.quantidade,
              precoCompraUsd:
                item.precoCompraUsd,
              imeis: item.imeis,
            });
          }

          return produtosCriados;
        }
      );

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Compra cadastrada com sucesso.",

        itens: resultado,
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
          "Erro ao cadastrar compra.",
      },
      {
        status: 500,
      }
    );
  }
}