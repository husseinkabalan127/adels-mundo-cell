import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// PATCH - ATUALIZAR ASSISTÊNCIA
// =====================================================

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const assistenciaId = Number(id);

    if (!assistenciaId) {
      return NextResponse.json(
        {
          error: "ID da assistência inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    const status =
      body.status !== undefined
        ? String(body.status)
        : undefined;

    const custo =
      body.custo !== undefined
        ? Number(body.custo)
        : undefined;

    // =====================================================
    // VALIDAR CUSTO
    // =====================================================

    if (
      custo !== undefined &&
      (!Number.isFinite(custo) || custo < 0)
    ) {
      return NextResponse.json(
        {
          error: "Valor da assistência inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // VERIFICAR SE EXISTE
    // =====================================================

    const existente =
      await prisma.assistencia.findUnique({
        where: {
          id: assistenciaId,
        },
      });

    if (!existente) {
      return NextResponse.json(
        {
          error: "Assistência não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================================
    // MONTAR DADOS
    // =====================================================

    const dados: {
      status?: string;
      custo?: number;
      dataSaida?: Date | null;
    } = {};

    if (status !== undefined) {
      dados.status = status;

      // Quando entregar, registra data de saída.
      if (status === "Entregue") {
        dados.dataSaida = new Date();
      }

      // Se voltar para outro status,
      // remove a data de saída.
      if (status !== "Entregue") {
        dados.dataSaida = null;
      }
    }

    if (custo !== undefined) {
      dados.custo = custo;
    }

    // =====================================================
    // ATUALIZAR
    // =====================================================

    const assistencia =
      await prisma.assistencia.update({
        where: {
          id: assistenciaId,
        },

        data: dados,

        include: {
          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });

    return NextResponse.json(
      assistencia
    );
  } catch (error) {
    console.error(
      "ERRO AO ATUALIZAR ASSISTÊNCIA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar assistência.",
      },
      {
        status: 500,
      }
    );
  }
}