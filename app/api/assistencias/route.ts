import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET - LISTAR ASSISTÊNCIAS
// =====================================================

export async function GET() {
  try {
    const assistencias =
      await prisma.assistencia.findMany({
        include: {
          produto: {
            select: {
              id: true,
              nome: true,
            },
          },

          aparelho: {
            select: {
              id: true,
              imei: true,
              vendido: true,
            },
          },
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json(assistencias);
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR ASSISTÊNCIAS:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar assistências.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST - RECEBER UM OU VÁRIOS APARELHOS
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const produtoId = Number(body.produtoId);

    const cliente = String(
      body.cliente || ""
    ).trim();

    const telefone = String(
      body.telefone || ""
    ).trim();

    const problema = String(
      body.problema || ""
    ).trim();

    const observacao = String(
      body.observacao || ""
    ).trim();

    // =====================================================
    // ACEITAR VÁRIOS APARELHOS
    // =====================================================

    let aparelhoIds: number[] = [];

    if (Array.isArray(body.aparelhoIds)) {
      aparelhoIds = body.aparelhoIds
        .map((id: unknown) => Number(id))
        .filter((id: number) => Number.isFinite(id));
    }

    // Compatibilidade com versão antiga:
    // se vier apenas aparelhoId, também funciona.
    if (
      aparelhoIds.length === 0 &&
      body.aparelhoId
    ) {
      const id = Number(body.aparelhoId);

      if (Number.isFinite(id)) {
        aparelhoIds = [id];
      }
    }

    // =====================================================
    // PREÇO COMEÇA EM ZERO
    // =====================================================

    const custo = 0;

    // =====================================================
    // VALIDAÇÕES
    // =====================================================

    if (!produtoId) {
      return NextResponse.json(
        {
          error: "Escolha o aparelho.",
        },
        {
          status: 400,
        }
      );
    }

    if (aparelhoIds.length === 0) {
      return NextResponse.json(
        {
          error:
            "Escolha pelo menos um IMEI.",
        },
        {
          status: 400,
        }
      );
    }

    if (!cliente) {
      return NextResponse.json(
        {
          error:
            "Digite o nome do cliente.",
        },
        {
          status: 400,
        }
      );
    }

    if (!problema) {
      return NextResponse.json(
        {
          error:
            "Digite o problema do aparelho.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // NÃO PERMITIR ID REPETIDO
    // =====================================================

    const idsUnicos = new Set(
      aparelhoIds
    );

    if (
      idsUnicos.size !==
      aparelhoIds.length
    ) {
      return NextResponse.json(
        {
          error:
            "Não pode haver aparelho repetido.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // VERIFICAR PRODUTO
    // =====================================================

    const produto =
      await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
      });

    if (!produto) {
      return NextResponse.json(
        {
          error:
            "Produto não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================================
    // BUSCAR TODOS OS APARELHOS
    // =====================================================

    const aparelhos =
      await prisma.aparelho.findMany({
        where: {
          id: {
            in: aparelhoIds,
          },
        },

        include: {
          produto: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });

    // =====================================================
    // CONFERIR SE TODOS FORAM ENCONTRADOS
    // =====================================================

    if (
      aparelhos.length !==
      aparelhoIds.length
    ) {
      return NextResponse.json(
        {
          error:
            "Um ou mais aparelhos não foram encontrados.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================================
    // CONFERIR SE TODOS PERTENCEM AO PRODUTO
    // =====================================================

    const aparelhoErrado =
      aparelhos.find(
        (aparelho) =>
          aparelho.produtoId !==
          produtoId
      );

    if (aparelhoErrado) {
      return NextResponse.json(
        {
          error:
            `O IMEI ${aparelhoErrado.imei} não pertence ao modelo selecionado.`,
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // VERIFICAR SE ALGUM JÁ ESTÁ EM ASSISTÊNCIA
    // =====================================================

    const assistenciasExistentes =
      await prisma.assistencia.findMany({
        where: {
          aparelhoId: {
            in: aparelhoIds,
          },
          status: {
            not: "Entregue",
          },
        },

        include: {
          aparelho: {
            select: {
              imei: true,
            },
          },
        },
      });

    if (
      assistenciasExistentes.length > 0
    ) {
      const imeis =
        assistenciasExistentes
          .map(
            (item) =>
              item.aparelho?.imei
          )
          .filter(Boolean)
          .join(", ");

      return NextResponse.json(
        {
          error:
            `Este(s) aparelho(s) já está(ão) em assistência: ${imeis}`,
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // CRIAR TODAS AS ASSISTÊNCIAS
    // =====================================================

    const assistencias =
      await prisma.$transaction(
        async (tx) => {
          const criadas = [];

          for (const aparelho of aparelhos) {
            const assistencia =
              await tx.assistencia.create({
                data: {
                  produtoId:
                    produtoId,

                  aparelhoId:
                    aparelho.id,

                  cliente,

                  telefone:
                    telefone ||
                    null,

                  problema,

                  observacao:
                    observacao ||
                    null,

                  custo,

                  status:
                    "Pendente",
                },

                include: {
                  produto: {
                    select: {
                      id: true,
                      nome: true,
                    },
                  },

                  aparelho: {
                    select: {
                      id: true,
                      imei: true,
                      vendido: true,
                    },
                  },
                },
              });

            criadas.push(
              assistencia
            );
          }

          return criadas;
        }
      );

    // =====================================================
    // RESPOSTA
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          `${assistencias.length} aparelho(s) recebido(s) para assistência.`,

        quantidade:
          assistencias.length,

        assistencias,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "ERRO AO REGISTRAR ASSISTÊNCIA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao registrar assistência.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// DELETE - REMOVER ASSISTÊNCIA
// =====================================================

export async function DELETE(
  req: Request
) {
  try {
    const body = await req.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        {
          error:
            "ID da assistência é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.assistencia.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Assistência removida com sucesso.",
    });
  } catch (error) {
    console.error(
      "ERRO AO REMOVER ASSISTÊNCIA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao remover assistência.",
      },
      {
        status: 500,
      }
    );
  }
}