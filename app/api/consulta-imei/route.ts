import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const imei = searchParams
      .get("imei")
      ?.trim();

    if (!imei) {
      return NextResponse.json(
        {
          error: "IMEI não informado.",
        },
        {
          status: 400,
        }
      );
    }

    const aparelho =
      await prisma.aparelho.findFirst({
        where: {
          imei: imei,
        },
        include: {
          produto: true,
          lote: true,
        },
      });

    if (!aparelho) {
      return NextResponse.json({
        encontrado: false,
        mensagem:
          "Este IMEI não foi encontrado no sistema da Adel's Mundo Cell.",
      });
    }

    return NextResponse.json({
      encontrado: true,

      aparelho: {
        id: aparelho.id,

        imei: aparelho.imei,

        vendido: aparelho.vendido,

        produto: aparelho.produto
          ? {
              id: aparelho.produto.id,
              nome: aparelho.produto.nome,
            }
          : null,

        lote: aparelho.lote
          ? {
              id: aparelho.lote.id,

              fornecedor:
                aparelho.lote
                  .fornecedor,

              precoCompraUsd:
                aparelho.lote
                  .precoCompraUsd,
            }
          : null,
      },
    });
  } catch (error) {
    console.error(
      "Erro ao consultar IMEI:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro ao consultar IMEI.",
      },
      {
        status: 500,
      }
    );
  }
}