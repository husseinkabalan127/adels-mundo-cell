import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// =====================================================
// CALCULAR TOTAL DA VENDA
// =====================================================

function calcularTotalVenda(venda: any) {
  if (!Array.isArray(venda.itens)) {
    return 0;
  }

  return venda.itens.reduce(
    (total: number, item: any) => {
      return (
        total +
        (Number(item.quantidade) || 0) *
          (Number(item.valorUnitario) || 0)
      );
    },
    0
  );
}

// =====================================================
// TOTAL PAGO
// =====================================================

function calcularPagamentos(venda: any) {
  if (!Array.isArray(venda.pagamentos)) {
    return 0;
  }

  return venda.pagamentos.reduce(
    (total: number, pagamento: any) => {
      return (
        total +
        (Number(pagamento.valor) || 0)
      );
    },
    0
  );
}

// =====================================================
// TOTAL DESCONTOS
// =====================================================

function calcularDescontos(venda: any) {
  const descontoDaVenda =
    Number(venda.desconto) || 0;

  const descontosDosPagamentos =
    Array.isArray(venda.pagamentos)
      ? venda.pagamentos.reduce(
          (
            total: number,
            pagamento: any
          ) => {
            return (
              total +
              (Number(
                pagamento.desconto
              ) || 0)
            );
          },
          0
        )
      : 0;

  return (
    descontoDaVenda +
    descontosDosPagamentos
  );
}

// =====================================================
// CALCULAR RESUMO
// =====================================================

function calcularResumo(venda: any) {
  const total =
    calcularTotalVenda(venda);

  const pago =
    calcularPagamentos(venda);

  const desconto =
    calcularDescontos(venda);

  const restante = Math.max(
    0,
    total -
      pago -
      desconto
  );

  let estado = "Em aberto";

  if (restante <= 0.009) {
    estado = "Quitado";
  } else if (pago > 0) {
    estado = "Parcial";
  }

  return {
    total,
    pago,
    desconto,
    restante,
    estado,
  };
}

// =====================================================
// GET
// BUSCAR TODAS AS CONTAS
// PENDENTES + QUITADAS
// =====================================================

export async function GET() {
  try {
    const vendas =
      await prisma.venda.findMany({
        orderBy: {
          dataVenda: "desc",
        },

        include: {
          itens: {
            include: {
              produto: true,
              aparelhos: true,
            },
          },

          pagamentos: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    const contas = vendas.map(
      (venda: (typeof vendas)[number]) => {
        const resumo =
          calcularResumo(venda);

        return {
          id: venda.id,

          cliente: venda.cliente,

          dataVenda:
            venda.dataVenda,

          createdAt:
            venda.createdAt,

          formaPagamento:
            venda.formaPagamento,

          estadoFatura:
            resumo.estado,

          total:
            resumo.total,

          pago:
            resumo.pago,

          desconto:
            resumo.desconto,

          restante:
            resumo.restante,

          pagamentos:
            venda.pagamentos,

          itens:
            venda.itens,
        };
      }
    );

    return NextResponse.json(
      contas
    );
  } catch (error) {
    console.error(
      "ERRO AO BUSCAR CONTAS:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro ao buscar contas a receber.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST
// REGISTRAR PAGAMENTO
// =====================================================

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const vendaId =
      Number(body.vendaId);

    const valor =
      Number(
        String(
          body.valor ?? ""
        ).replace(",", ".")
      );

    const desconto =
      body.desconto ===
        undefined ||
      body.desconto ===
        null ||
      body.desconto === ""
        ? 0
        : Number(
            String(
              body.desconto
            ).replace(",", ".")
          );

    const forma =
      body.forma
        ? String(
            body.forma
          ).trim()
        : null;

    const observacao =
      body.observacao
        ? String(
            body.observacao
          ).trim()
        : null;

    // =================================================
    // VALIDAÇÕES
    // =================================================

    if (
      !Number.isInteger(
        vendaId
      ) ||
      vendaId <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "ID da venda inválido.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(
        valor
      ) ||
      valor < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Valor do pagamento inválido.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(
        desconto
      ) ||
      desconto < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Valor do desconto inválido.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      valor === 0 &&
      desconto === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Informe o valor pago ou o desconto.",
        },
        {
          status: 400
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
          // -------------------------------------------
          // BUSCAR VENDA
          // -------------------------------------------

          const venda =
            await tx.venda.findUnique({
              where: {
                id: vendaId,
              },

              include: {
                itens: true,

                pagamentos: {
                  orderBy: {
                    createdAt:
                      "asc",
                  },
                },
              },
            });

          if (!venda) {
            throw new Error(
              "Venda não encontrada."
            );
          }

          // -------------------------------------------
          // TOTAL DA VENDA
          // -------------------------------------------

          const total =
            venda.itens.reduce(
              (
                soma: number,
                item: any
              ) => {
                return (
                  soma +
                  (Number(
                    item.quantidade
                  ) || 0) *
                    (Number(
                      item.valorUnitario
                    ) || 0)
                );
              },
              0
            );

          // -------------------------------------------
          // TOTAL PAGO ANTERIOR
          // -------------------------------------------

          const pagoAnterior =
            venda.pagamentos.reduce(
              (
                soma: number,
                pagamento: any
              ) => {
                return (
                  soma +
                  (Number(
                    pagamento.valor
                  ) || 0)
                );
              },
              0
            );

          // -------------------------------------------
          // DESCONTOS ANTERIORES
          // -------------------------------------------

          const descontoAnterior =
            (Number(
              venda.desconto
            ) || 0) +
            venda.pagamentos.reduce(
              (
                soma: number,
                pagamento: any
              ) => {
                return (
                  soma +
                  (Number(
                    pagamento.desconto
                  ) || 0)
                );
              },
              0
            );

          // -------------------------------------------
          // RESTANTE ATUAL
          // -------------------------------------------

          const restanteAntes =
            Math.max(
              0,
              total -
                pagoAnterior -
                descontoAnterior
            );

          // -------------------------------------------
          // NÃO PERMITIR PAGAR MAIS
          // -------------------------------------------

          if (
            valor +
              desconto >
            restanteAntes +
              0.009
          ) {
            throw new Error(
              `O valor informado é maior que o restante da dívida. Restante: R$ ${restanteAntes
                .toFixed(2)
                .replace(
                  ".",
                  ","
                )}`
            );
          }

          // -------------------------------------------
          // CRIAR PAGAMENTO
          // -------------------------------------------

          await tx.pagamento.create({
            data: {
              valor,

              desconto,

              forma,

              observacao,

              vendaId,
            },
          });

          // -------------------------------------------
          // NOVOS VALORES
          // -------------------------------------------

          const novoPago =
            pagoAnterior +
            valor;

          const novoDesconto =
            descontoAnterior +
            desconto;

          const novoRestante =
            Math.max(
              0,
              total -
                novoPago -
                novoDesconto
            );

          // -------------------------------------------
          // STATUS
          // -------------------------------------------

          let novoEstado =
            "Em aberto";

          if (
            novoRestante <=
            0.009
          ) {
            novoEstado =
              "Quitado";
          } else if (
            novoPago > 0
          ) {
            novoEstado =
              "Parcial";
          }

          // -------------------------------------------
          // ATUALIZAR VENDA
          // -------------------------------------------

          await tx.venda.update({
            where: {
              id: vendaId,
            },

            data: {
              formaPagamento:
                forma ||
                venda.formaPagamento ||
                "Não informado",

              estadoFatura:
                novoEstado,
            },
          });

          return {
            total,

            pago:
              novoPago,

            desconto:
              novoDesconto,

            restante:
              novoRestante,

            estadoFatura:
              novoEstado,
          };
        }
      );

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      success: true,

      message:
        resultado.estadoFatura ===
        "Quitado"
          ? "Conta quitada com sucesso!"
          : "Pagamento registrado com sucesso!",

      ...resultado,
    });
  } catch (error) {
    console.error(
      "ERRO AO REGISTRAR PAGAMENTO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao registrar pagamento.",
      },
      {
        status: 400,
      }
    );
  }
}