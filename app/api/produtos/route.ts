import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET - Buscar produtos
// =====================================================

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        lotes: {
          orderBy: {
            createdAt: "desc",
          },
        },

        aparelhos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("ERRO AO BUSCAR PRODUTOS:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar produtos",
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

    const nome = String(body.nome || "").trim();

    const fornecedor = String(
      body.fornecedor || ""
    ).trim();

    const quantidade = Number(body.quantidade);

    // =================================================
    // PREÇO DE COMPRA USD - OPCIONAL
    // =================================================

    const precoCompraUsd =
      body.precoCompraUsd === "" ||
      body.precoCompraUsd === null ||
      body.precoCompraUsd === undefined
        ? null
        : Number(
            String(body.precoCompraUsd).replace(
              ",",
              "."
            )
          );

    // =================================================
    // IMEIS
    // =================================================

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

    if (
      !Number.isInteger(quantidade) ||
      quantidade <= 0
    ) {
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

    // =================================================
    // IMEI É OBRIGATÓRIO
    // =================================================

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

    // =================================================
    // NENHUM IMEI VAZIO
    // =================================================

    if (
      imeis.some(
        (imei: string) => !imei
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
    // IMEI REPETIDO NA MESMA ENTRADA
    // =================================================

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

    // =================================================
    // VALIDAR PREÇO USD
    // =================================================

    if (
      precoCompraUsd !== null &&
      (!Number.isFinite(
        precoCompraUsd
      ) ||
        precoCompraUsd < 0)
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
            (item: {
              imei: string;
            }) => item.imei
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
    // CRIAR / ENCONTRAR PRODUTO
    // =================================================

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {

          // =================================================
          // PROCURAR MODELO
          // =================================================

          let produto =
            await tx.produto.findFirst({
              where: {
                nome: nome,
              },
            });

          // =================================================
          // PROCURAR IGNORANDO MAIÚSCULAS/MINÚSCULAS
          // =================================================

          if (!produto) {
            const produtos =
              await tx.produto.findMany();

            produto =
              produtos.find(
                (item) =>
                  item.nome.trim().toLowerCase() ===
                  nome.trim().toLowerCase()
              ) || null;
          }

          // =================================================
          // SE O MODELO AINDA NÃO EXISTE,
          // CRIAR NOVO PRODUTO
          // =================================================

          if (!produto) {
            produto =
              await tx.produto.create({
                data: {
                  nome,
                  quantidade: 0,
                },
              });
          }

          // =================================================
          // CRIAR LOTE
          // =================================================

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

          // =================================================
          // CRIAR APARELHOS / IMEIS
          // =================================================

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

          // =================================================
          // ATUALIZAR ESTOQUE
          // =================================================

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
                lotes: true,

                aparelhos: true,
              },
            });

          return {
            produto:
              produtoAtualizado,

            lote,
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