import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET — TODOS OS PRODUTOS
// =====================================================

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        nome: "asc",
      },

      include: {
        aparelhos: {
          where: {
            vendido: false,
          },

          select: {
            id: true,
            imei: true,
            vendido: true,
          },
        },
      },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR TELEFONES:",
      error
    );

    return NextResponse.json(
      {
        error: "Erro ao buscar telefones.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PUT — SALVAR / ALTERAR PREÇO
// =====================================================

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const produtoId = Number(body.produtoId);

    const tipoPreco = String(
      body.tipoPreco || ""
    ).toUpperCase();

    const preco = Number(
      String(body.preco ?? "").replace(",", ".")
    );

    if (
      !Number.isInteger(produtoId) ||
      produtoId <= 0
    ) {
      return NextResponse.json(
        {
          error: "Produto inválido.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      tipoPreco !== "USD" &&
      tipoPreco !== "BRL"
    ) {
      return NextResponse.json(
        {
          error: "Escolha USD ou BRL.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(preco) ||
      preco <= 0
    ) {
      return NextResponse.json(
        {
          error: "Informe um preço válido.",
        },
        {
          status: 400,
        }
      );
    }

    const produto =
      await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
      });

    if (!produto) {
      return NextResponse.json(
        {
          error: "Produto não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const produtoAtualizado =
      await prisma.produto.update({
        where: {
          id: produtoId,
        },

        data:
          tipoPreco === "USD"
            ? {
                precoVendaUsd: preco,
                precoVendaBrl: null,
                tipoPreco: "USD",
              }
            : {
                precoVendaUsd: null,
                precoVendaBrl: preco,
                tipoPreco: "BRL",
              },
      });

    return NextResponse.json({
      success: true,
      message: "Preço salvo com sucesso.",
      produto: produtoAtualizado,
    });
  } catch (error) {
    console.error(
      "ERRO AO SALVAR PREÇO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar preço.",
      },
      {
        status: 500,
      }
    );
  }
}