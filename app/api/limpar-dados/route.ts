import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

// =====================================================
// POST — LIMPAR TODOS OS DADOS DO SISTEMA
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const senha = String(body.senha || "");

    // =====================================================
    // VERIFICAR SENHA
    // =====================================================

    if (!senha) {
      return NextResponse.json(
        {
          error: "Informe a senha.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // SENHA CONFIGURADA NO .ENV
    // =====================================================

    const senhaSistema =
      process.env.RESET_SYSTEM_PASSWORD;

    if (!senhaSistema) {
      return NextResponse.json(
        {
          error:
            "Senha de limpeza não configurada.",
        },
        {
          status: 500,
        }
      );
    }

    // =====================================================
    // CONFERIR SENHA
    // =====================================================

    if (senha !== senhaSistema) {
      return NextResponse.json(
        {
          error: "Senha incorreta.",
        },
        {
          status: 401,
        }
      );
    }

    // =====================================================
    // APAGAR TODOS OS DADOS
    // =====================================================

    await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // Apagar somente os DADOS do sistema.
        // A estrutura do banco continua intacta.

        await tx.assistencia.deleteMany();

        await tx.garantia.deleteMany();

        await tx.aparelho.deleteMany();

        await tx.vendaItem.deleteMany();

        await tx.venda.deleteMany();

        await tx.lote.deleteMany();

        await tx.produto.deleteMany();
      }
    );

    // =====================================================
    // RESPOSTA
    // =====================================================

    return NextResponse.json({
      success: true,

      message:
        "Todos os dados do sistema foram apagados.",
    });
  } catch (error) {
    console.error(
      "Erro ao limpar dados:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro ao limpar os dados do sistema.",
      },
      {
        status: 500,
      }
    );
  }
}