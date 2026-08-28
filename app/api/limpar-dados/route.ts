import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// =====================================================
// LIMPAR TODOS OS DADOS
// =====================================================

async function limparDados(req: Request) {
  try {
    const body = await req.json();

    const senha = String(
      body.senha || ""
    ).trim();

    // =================================================
    // VERIFICAR SENHA
    // =================================================

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

    // =================================================
    // SENHA DO SISTEMA
    // =================================================

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

    // =================================================
    // CONFERIR SENHA
    // =================================================

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

    // =================================================
    // APAGAR TODOS OS DADOS
    // =================================================

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {

        // =============================================
        // 1. ASSISTÊNCIAS
        // =============================================

        await tx.assistencia.deleteMany();

        // =============================================
        // 2. GARANTIAS
        // =============================================

        await tx.garantia.deleteMany();

        // =============================================
        // 3. APARELHOS
        // =============================================
        //
        // Aparelho pode estar ligado a:
        // - VendaItem
        // - Lote
        //
        // Por isso apagamos antes.
        // =============================================

        await tx.aparelho.deleteMany();

        // =============================================
        // 4. PAGAMENTOS
        // =============================================
        //
        // IMPORTANTE:
        //
        // Pagamento pertence à Venda.
        //
        // Primeiro apagamos os pagamentos,
        // depois podemos apagar as vendas.
        // =============================================

        await tx.pagamento.deleteMany();

        // =============================================
        // 5. ITENS DAS VENDAS
        // =============================================

        await tx.vendaItem.deleteMany();

        // =============================================
        // 6. VENDAS
        // =============================================

        await tx.venda.deleteMany();

        // =============================================
        // 7. LOTES / COMPRAS
        // =============================================

        await tx.lote.deleteMany();

        // =============================================
        // 8. PRODUTOS
        // =============================================

        await tx.produto.deleteMany();
      }
    );

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      success: true,

      message:
        "Todos os dados do sistema foram apagados.",
    });

  } catch (error) {

    console.error(
      "ERRO AO LIMPAR DADOS:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao limpar os dados do sistema.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST
// =====================================================

export async function POST(
  req: Request
) {
  return limparDados(req);
}

// =====================================================
// PATCH
// =====================================================

export async function PATCH(
  req: Request
) {
  return limparDados(req);
}