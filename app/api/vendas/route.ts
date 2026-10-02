import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

// =====================================================
// TIPOS
// =====================================================

type ItemPreparado = {
  produtoId: number;
  quantidade: number;
  valorUnitario: number;
  imeis: string[];
};

// =====================================================
// HELPERS — DIA DE VENDAS
// =====================================================

function validarChaveData(valor: unknown): string {
  const texto = String(valor ?? "").trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    throw new Error("Data inválida. Use o formato AAAA-MM-DD.");
  }

  const [ano, mes, dia] = texto.split("-").map(Number);
  const data = new Date(
    Date.UTC(ano, mes - 1, dia, 12, 0, 0, 0)
  );

  if (
    data.getUTCFullYear() !== ano ||
    data.getUTCMonth() !== mes - 1 ||
    data.getUTCDate() !== dia
  ) {
    throw new Error("Data inválida.");
  }

  return texto;
}

function dataDoDia(chave: string): Date {
  const [ano, mes, dia] = chave.split("-").map(Number);

  return new Date(
    Date.UTC(ano, mes - 1, dia, 12, 0, 0, 0)
  );
}

function chaveDaData(data: Date): string {
  return data.toISOString().slice(0, 10);
}

async function verificarDiaFechado(
  tx: Prisma.TransactionClient,
  chave: string
) {
  const dia = await tx.diaVenda.findUnique({
    where: {
      data: dataDoDia(chave),
    },
  });

  return dia;
}

// =====================================================
// GET — VENDAS + STATUS DOS DIAS
// =====================================================

export async function GET() {
  try {
    const usuario = await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    const [vendas, dias] = await Promise.all([
      prisma.venda.findMany({
        orderBy: {
          dataVenda: "desc",
        },

        include: {
          itens: {
            include: {
              produto: true,
              aparelhos: {
                include: {
                  lote: true,
                },
              },
            },
          },

          pagamentos: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      }),

      prisma.diaVenda.findMany({
        orderBy: {
          data: "desc",
        },
      }),
    ]);

    const vendasPreparadas = vendas.map(
      (venda: (typeof vendas)[number]) => {
        const valorVenda = venda.itens.reduce(
          (total, item) =>
            total + Number(item.total || 0),
          0
        );

        const quantidade = venda.itens.reduce(
          (total, item) =>
            total + Number(item.quantidade || 0),
          0
        );

        const custoTotalUsd = venda.itens.reduce(
          (total, item) =>
            total + Number(item.custoTotal || 0),
          0
        );

        const taxa =
          venda.taxa !== null &&
          venda.taxa !== undefined
            ? Number(venda.taxa)
            : null;

        const custoTotalReais =
          taxa !== null && Number.isFinite(taxa)
            ? custoTotalUsd * taxa
            : 0;

        const lucro =
          taxa !== null && Number.isFinite(taxa)
            ? valorVenda - custoTotalReais
            : 0;

        return {
          ...venda,
          valorVenda,
          quantidade,
          custoTotalUsd,
          custoTotalReais,
          lucro,
        };
      }
    );

    return NextResponse.json({
      vendas: vendasPreparadas,
      dias: dias.map((dia) => ({
        id: dia.id,
        data: chaveDaData(dia.data),
        fechado: dia.fechado,
        createdAt: dia.createdAt,
        updatedAt: dia.updatedAt,
      })),
    });
  } catch (error) {
    console.error("ERRO AO BUSCAR VENDAS:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar vendas.",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST — CRIAR VENDA
// =====================================================

export async function POST(req: Request) {
  try {
    const usuario = await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const cliente = String(body.cliente || "").trim();

    let dataVenda = new Date();

    if (body.dataVenda) {
      const dataTexto = String(body.dataVenda).trim();

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dataTexto)) {
        return NextResponse.json(
          { error: "Data da venda inválida." },
          { status: 400 }
        );
      }

      const [ano, mes, dia] =
        dataTexto.split("-").map(Number);

      dataVenda = new Date(
        ano,
        mes - 1,
        dia,
        12,
        0,
        0,
        0
      );

      if (
        dataVenda.getFullYear() !== ano ||
        dataVenda.getMonth() !== mes - 1 ||
        dataVenda.getDate() !== dia
      ) {
        return NextResponse.json(
          { error: "Data da venda inválida." },
          { status: 400 }
        );
      }
    }

    const chaveDia = validarChaveData(
      body.dataVenda ||
        chaveDaData(dataVenda)
    );

    const taxa =
      body.taxa === null ||
      body.taxa === undefined ||
      body.taxa === ""
        ? null
        : Number(
            String(body.taxa).replace(",", ".")
          );

    const estadoFatura = String(
      body.estadoFatura ??
        body.estadoDaFatura ??
        "Em aberto"
    ).trim();

    const formaPagamento = String(
      body.formaPagamento ??
        body.formaDePagamento ??
        "Não informado"
    ).trim();

    const descontoVenda = Math.max(0, Number(String(body.descontoVenda ?? 0).replace(",", ".")) || 0);
    const pagamentosInformados = Array.isArray(body.pagamentos) ? body.pagamentos : [];

    const itens = Array.isArray(body.itens)
      ? body.itens
      : [];

    if (
      taxa !== null &&
      (!Number.isFinite(taxa) || taxa < 0)
    ) {
      return NextResponse.json(
        { error: "Taxa inválida." },
        { status: 400 }
      );
    }

    if (!itens.length) {
      return NextResponse.json(
        {
          error:
            "Adicione pelo menos um produto à venda.",
        },
        { status: 400 }
      );
    }

    let itensPreparados: ItemPreparado[];

    try {
      itensPreparados = itens.map(
        (
          item: unknown,
          index: number
        ): ItemPreparado => {
          const itemObj =
            item as Record<string, unknown>;

          const produtoId = Number(
            itemObj.produtoId
          );

          const quantidade = Number(
            itemObj.quantidade
          );

          const valorUnitario = Number(
            String(
              itemObj.valorUnitario ?? ""
            ).replace(",", ".")
          );

          const imeis = Array.isArray(
            itemObj.imeis
          )
            ? itemObj.imeis
                .map((imei: unknown) =>
                  String(imei).trim()
                )
                .filter(Boolean)
            : [];

          if (
            !Number.isInteger(produtoId) ||
            produtoId <= 0
          ) {
            throw new Error(
              `Produto inválido no item ${index + 1}.`
            );
          }

          if (
            !Number.isInteger(quantidade) ||
            quantidade <= 0
          ) {
            throw new Error(
              `Quantidade inválida no item ${index + 1}.`
            );
          }

          if (
            !Number.isFinite(valorUnitario) ||
            valorUnitario < 0
          ) {
            throw new Error(
              `Preço de venda inválido no item ${index + 1}.`
            );
          }

          if (imeis.length !== quantidade) {
            throw new Error(
              `A quantidade de IMEI do item ${index + 1} não corresponde à quantidade.`
            );
          }

          const imeisUnicos = new Set(imeis);

          if (
            imeisUnicos.size !== imeis.length
          ) {
            throw new Error(
              `Não pode haver IMEI repetido no item ${index + 1}.`
            );
          }

          return {
            produtoId,
            quantidade,
            valorUnitario,
            imeis,
          };
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Dados da venda inválidos.",
        },
        { status: 400 }
      );
    }

    const todosImeis =
      itensPreparados.flatMap(
        (item) => item.imeis
      );

    const imeisUnicos = new Set(todosImeis);

    if (
      imeisUnicos.size !== todosImeis.length
    ) {
      return NextResponse.json(
        {
          error:
            "O mesmo IMEI não pode aparecer duas vezes na mesma venda.",
        },
        { status: 400 }
      );
    }

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {
          // ===============================================
          // GARANTIR QUE O DIA EXISTE E ESTÁ ABERTO
          // ===============================================

          const diaVenda =
            await tx.diaVenda.upsert({
              where: {
                data: dataDoDia(chaveDia),
              },
              update: {},
              create: {
                data: dataDoDia(chaveDia),
                fechado: false,
              },
            });

          if (diaVenda.fechado) {
            throw new Error(
              `O dia ${chaveDia} está fechado. Reabra o dia antes de registrar uma nova venda.`
            );
          }

          // ===============================================
          // CRIAR VENDA
          // ===============================================

          const venda =
            await tx.venda.create({
              data: {
                cliente,
                taxa,
                taxaFechada: false,
                dataVenda,
                formaPagamento,
                estadoFatura,
                desconto: descontoVenda,
              },
            });

          let totalVenda = 0;

          for (
            const item of itensPreparados
          ) {
            const produto =
              await tx.produto.findUnique({
                where: {
                  id: item.produtoId,
                },

                include: {
                  aparelhos: {
                    where: {
                      vendido: false,
                    },

                    include: {
                      lote: true,
                    },
                  },
                },
              });

            if (!produto) {
              throw new Error(
                "Produto não encontrado."
              );
            }

            if (
              produto.quantidade <
              item.quantidade
            ) {
              throw new Error(
                `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}.`
              );
            }

            const aparelhos =
              await tx.aparelho.findMany({
                where: {
                  imei: {
                    in: item.imeis,
                  },

                  produtoId:
                    item.produtoId,

                  vendido: false,
                },

                include: {
                  lote: true,
                },
              });

            if (
              aparelhos.length !==
              item.quantidade
            ) {
              throw new Error(
                `Um ou mais IMEIs não estão disponíveis no estoque para ${produto.nome}.`
              );
            }

            let custoTotal = 0;

            for (
              const aparelho of aparelhos
            ) {
              if (
                aparelho.lote
                  ?.precoCompraUsd !==
                  null &&
                aparelho.lote
                  ?.precoCompraUsd !==
                  undefined
              ) {
                custoTotal += Number(
                  aparelho.lote.precoCompraUsd
                );
              }
            }

            const total =
              item.quantidade *
              item.valorUnitario;

            totalVenda += total;

            const vendaItem =
              await tx.vendaItem.create({
                data: {
                  quantidade:
                    item.quantidade,
                  valorUnitario:
                    item.valorUnitario,
                  total,
                  precoCompraUsd:
                    item.quantidade > 0
                      ? custoTotal /
                        item.quantidade
                      : null,
                  custoTotal,
                  vendaId:
                    venda.id,
                  produtoId:
                    item.produtoId,
                },
              });

            await tx.aparelho.updateMany({
              where: {
                id: {
                  in: aparelhos.map(
                    (aparelho) =>
                      aparelho.id
                  ),
                },
              },

              data: {
                vendido: true,
                vendaItemId:
                  vendaItem.id,
              },
            });

            await tx.produto.update({
              where: {
                id: produto.id,
              },

              data: {
                quantidade: {
                  decrement:
                    item.quantidade,
                },
              },
            });
          }

          const estadoNormalizado =
            estadoFatura
              .toLowerCase()
              .normalize("NFD")
              .replace(
                /[\u0300-\u036f]/g,
                ""
              );

          if (
            pagamentosInformados.length === 0 &&
            (estadoNormalizado === "pago" ||
            estadoNormalizado === "quitado")
          ) {
            await tx.pagamento.create({
              data: {
                valor: totalVenda,
                desconto: 0,
                forma: formaPagamento,
                observacao:
                  "Pagamento registrado automaticamente na venda.",
                vendaId: venda.id,
              },
            });

            await tx.venda.update({
              where: {
                id: venda.id,
              },

              data: {
                estadoFatura: "Quitado",
                formaPagamento:
                  formaPagamento,
              },
            });
          }

          for (const pagamento of pagamentosInformados) {
            const valorPagamento = Math.max(0, Number(String(pagamento.valor || 0).replace(",", ".")) || 0);
            const observacaoPagamento = String(pagamento.observacao || "").trim();
            if (valorPagamento > 0 || observacaoPagamento) {
              await tx.pagamento.create({
                data: {
                  valor: valorPagamento,
                  desconto: 0,
                  forma: String(pagamento.forma || "Não informado"),
                  observacao: observacaoPagamento,
                  vendaId: venda.id,
                },
              });
            }
          }

          const vendaCompleta =
            await tx.venda.findUnique({
              where: {
                id: venda.id,
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

          return {
            venda: vendaCompleta,
            totalVenda,
          };
        },
        {
          maxWait: 10000,
          timeout: 15000,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Venda registrada com sucesso!",
        ...resultado,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "ERRO AO CRIAR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao registrar venda.",
      },
      { status: 400 }
    );
  }
}

// =====================================================
// PUT — EDITAR VENDA COMPLETA, RECONCILIANDO O ESTOQUE
// =====================================================

export async function PUT(req: Request) {
  try {
    const usuario = await obterSessao();
    if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    if (usuario.role !== "ADMIN") return NextResponse.json({ error: "Somente o administrador pode editar vendas." }, { status: 403 });

    const body = await req.json();
    const vendaId = Number(body.vendaId ?? body.id);
    if (!Number.isInteger(vendaId) || vendaId <= 0) {
      return NextResponse.json({ error: "ID da venda inválido." }, { status: 400 });
    }

    const cliente = String(body.cliente || "").trim();
    const dataTexto = String(body.dataVenda || "").trim();
    const chaveDia = validarChaveData(dataTexto);
    const [ano, mes, dia] = dataTexto.split("-").map(Number);
    const dataVenda = new Date(ano, mes - 1, dia, 12, 0, 0, 0);
    const taxa = body.taxa === null || body.taxa === undefined || body.taxa === ""
      ? null : Number(String(body.taxa).replace(",", "."));
    if (taxa !== null && (!Number.isFinite(taxa) || taxa < 0)) {
      return NextResponse.json({ error: "Taxa inválida." }, { status: 400 });
    }

    const rawItems = Array.isArray(body.itens) ? body.itens : [];
    if (!rawItems.length) return NextResponse.json({ error: "Adicione pelo menos um produto à venda." }, { status: 400 });
    const itensPreparados: ItemPreparado[] = rawItems.map((raw: any, index: number) => {
      const produtoId = Number(raw.produtoId);
      const quantidade = Number(raw.quantidade);
      const valorUnitario = Number(String(raw.valorUnitario ?? "").replace(",", "."));
      const imeis = Array.isArray(raw.imeis) ? raw.imeis.map((x: unknown) => String(x).trim()).filter(Boolean) : [];
      if (!Number.isInteger(produtoId) || produtoId <= 0) throw new Error(`Produto inválido no item ${index + 1}.`);
      if (!Number.isInteger(quantidade) || quantidade <= 0) throw new Error(`Quantidade inválida no item ${index + 1}.`);
      if (!Number.isFinite(valorUnitario) || valorUnitario < 0) throw new Error(`Preço inválido no item ${index + 1}.`);
      if (imeis.length !== quantidade) throw new Error(`A quantidade de IMEI do item ${index + 1} não corresponde à quantidade.`);
      if (new Set(imeis).size !== imeis.length) throw new Error(`Há IMEI repetido no item ${index + 1}.`);
      return { produtoId, quantidade, valorUnitario, imeis };
    });
    const todosImeis = itensPreparados.flatMap((i) => i.imeis);
    if (new Set(todosImeis).size !== todosImeis.length) {
      return NextResponse.json({ error: "O mesmo IMEI não pode aparecer duas vezes na mesma venda." }, { status: 400 });
    }

    const descontoVenda = Number(String(body.descontoVenda ?? 0).replace(",", ".")) || 0;
    if (!Number.isFinite(descontoVenda) || descontoVenda < 0) {
      return NextResponse.json({ error: "Desconto inválido." }, { status: 400 });
    }
    const pagamentos = Array.isArray(body.pagamentos) ? body.pagamentos : [];
    const totalPago = pagamentos.reduce((sum: number, p: any) => sum + Math.max(0, Number(String(p.valor || 0).replace(",", ".")) || 0), 0);
    const totalBruto = itensPreparados.reduce((sum, item) => sum + item.quantidade * item.valorUnitario, 0);
    const totalLiquido = Math.max(0, totalBruto - descontoVenda);
    const estadoFatura = totalPago <= 0 ? "Não pago" : totalPago + 0.005 >= totalLiquido ? "Pago" : "Parcial";
    const formaPagamento = pagamentos.length === 1 ? String(pagamentos[0].forma || "Não informado") : pagamentos.length > 1 ? "Múltiplos pagamentos" : "Não informado";

    const vendaAtualizada = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const vendaAnterior = await tx.venda.findUnique({
        where: { id: vendaId },
        include: { itens: { include: { aparelhos: true } }, pagamentos: true },
      });
      if (!vendaAnterior) throw new Error("Venda não encontrada.");

      const chaveAntiga = chaveDaData(vendaAnterior.dataVenda);
      const diaAntigo = await verificarDiaFechado(tx, chaveAntiga);
      if (diaAntigo?.fechado) throw new Error(`O dia ${chaveAntiga} está fechado. Reabra o dia antes de editar esta venda.`);
      const diaNovo = await tx.diaVenda.upsert({
        where: { data: dataDoDia(chaveDia) }, update: {}, create: { data: dataDoDia(chaveDia), fechado: false },
      });
      if (diaNovo.fechado) throw new Error(`O dia ${chaveDia} está fechado. Reabra o dia antes de editar esta venda.`);

      // Libera os aparelhos desta própria venda e devolve suas quantidades.
      for (const oldItem of vendaAnterior.itens) {
        const aparelhosVendidos = oldItem.aparelhos.filter((a) => a.vendido && a.vendaItemId === oldItem.id);
        if (aparelhosVendidos.length) {
          await tx.aparelho.updateMany({
            where: { id: { in: aparelhosVendidos.map((a) => a.id) } },
            data: { vendido: false, vendaItemId: null },
          });
          await tx.produto.update({
            where: { id: oldItem.produtoId },
            data: { quantidade: { increment: aparelhosVendidos.length } },
          });
        }
      }

      await tx.pagamento.deleteMany({ where: { vendaId } });
      await tx.vendaItem.deleteMany({ where: { vendaId } });
      await tx.venda.update({
        where: { id: vendaId },
        data: { cliente, dataVenda, taxa, formaPagamento, estadoFatura, desconto: descontoVenda },
      });

      for (const item of itensPreparados) {
        const produto = await tx.produto.findUnique({ where: { id: item.produtoId } });
        if (!produto) throw new Error("Produto não encontrado.");
        const aparelhos = await tx.aparelho.findMany({
          where: { imei: { in: item.imeis }, produtoId: item.produtoId, vendido: false },
          include: { lote: true },
        });
        if (aparelhos.length !== item.quantidade) {
          throw new Error(`Um ou mais IMEIs não estão disponíveis no estoque para ${produto.nome}. Confira o modelo e os IMEIs.`);
        }
        if (Number(produto.quantidade) < item.quantidade) {
          throw new Error(`Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}.`);
        }
        const custoTotal = aparelhos.reduce((sum, a) => sum + (a.lote?.precoCompraUsd == null ? 0 : Number(a.lote.precoCompraUsd)), 0);
        const total = item.quantidade * item.valorUnitario;
        const vendaItem = await tx.vendaItem.create({
          data: {
            quantidade: item.quantidade, valorUnitario: item.valorUnitario, total,
            precoCompraUsd: item.quantidade ? custoTotal / item.quantidade : null,
            custoTotal, vendaId, produtoId: item.produtoId,
          },
        });
        await tx.aparelho.updateMany({
          where: { id: { in: aparelhos.map((a) => a.id) } },
          data: { vendido: true, vendaItemId: vendaItem.id },
        });
        await tx.produto.update({ where: { id: item.produtoId }, data: { quantidade: { decrement: item.quantidade } } });
      }

      for (const p of pagamentos) {
        const valor = Math.max(0, Number(String(p.valor || 0).replace(",", ".")) || 0);
        const observacao = String(p.observacao || "").trim();
        if (valor > 0 || observacao) {
          await tx.pagamento.create({
            data: { forma: String(p.forma || "Não informado"), valor, desconto: 0, observacao, vendaId },
          });
        }
      }

      return await tx.venda.findUnique({
        where: { id: vendaId },
        include: {
          itens: { include: { produto: true, aparelhos: { include: { lote: true } } } },
          pagamentos: { orderBy: { createdAt: "asc" } },
        },
      });
    }, {
      maxWait: 10000,
      timeout: 15000,
    });

    return NextResponse.json({ success: true, message: "Venda atualizada e estoque reconciliado com sucesso.", venda: vendaAtualizada });
  } catch (error) {
    console.error("ERRO AO EDITAR VENDA:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao editar venda." }, { status: 400 });
  }
}

// =====================================================
// PATCH — FECHAR/REABRIR DIA OU DEVOLVER APARELHO
// SOMENTE ADMIN PARA FECHAR/REABRIR E DEVOLVER
// =====================================================

export async function PATCH(req: Request) {
  try {
    const usuario = await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const action = String(body.action || "").trim();

    // =================================================
    // FECHAR / REABRIR DIA
    // =================================================

    if (
      action === "fecharDia" ||
      action === "reabrirDia"
    ) {
      if (usuario.role !== "ADMIN") {
        return NextResponse.json(
          {
            error:
              "Somente o administrador pode fechar ou reabrir um dia.",
          },
          { status: 403 }
        );
      }

      let chaveDia: string;

      try {
        chaveDia =
          validarChaveData(body.data);
      } catch (error) {
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Data inválida.",
          },
          { status: 400 }
        );
      }

      const fechado =
        action === "fecharDia";

      const dia =
        await prisma.diaVenda.upsert({
          where: {
            data: dataDoDia(chaveDia),
          },

          update: {
            fechado,
          },

          create: {
            data: dataDoDia(chaveDia),
            fechado,
          },
        });

      return NextResponse.json({
        success: true,
        message: fechado
          ? `Dia ${chaveDia} fechado com sucesso.`
          : `Dia ${chaveDia} reaberto com sucesso.`,
        dia: {
          id: dia.id,
          data: chaveDaData(dia.data),
          fechado: dia.fechado,
          createdAt: dia.createdAt,
          updatedAt: dia.updatedAt,
        },
      });
    }

    // =================================================
    // DEVOLVER APARELHO
    // =================================================

    if (usuario.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode devolver aparelhos.",
        },
        { status: 403 }
      );
    }

    const vendaId = Number(
      body.vendaId ?? body.id
    );

    const aparelhoId =
      body.aparelhoId !== undefined &&
      body.aparelhoId !== null &&
      body.aparelhoId !== ""
        ? Number(body.aparelhoId)
        : null;

    const imei =
      body.imei !== undefined &&
      body.imei !== null
        ? String(body.imei).trim()
        : "";

    if (
      !Number.isInteger(vendaId) ||
      vendaId <= 0
    ) {
      return NextResponse.json(
        { error: "ID da venda inválido." },
        { status: 400 }
      );
    }

    if (
      aparelhoId !== null &&
      (!Number.isInteger(aparelhoId) ||
        aparelhoId <= 0)
    ) {
      return NextResponse.json(
        { error: "ID do aparelho inválido." },
        { status: 400 }
      );
    }

    if (!aparelhoId && !imei) {
      return NextResponse.json(
        {
          error:
            "Informe o aparelho ou o IMEI que será devolvido.",
        },
        { status: 400 }
      );
    }

    const resultado =
      await prisma.$transaction(
        async (
          tx: Prisma.TransactionClient
        ) => {
          const venda =
            await tx.venda.findUnique({
              where: {
                id: vendaId,
              },

              include: {
                itens: {
                  include: {
                    aparelhos: {
                      include: {
                        lote: true,
                      },
                    },

                    produto: true,
                  },
                },

                pagamentos: {
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
            });

          if (!venda) {
            throw new Error(
              "Venda não encontrada."
            );
          }

          const chaveDia =
            chaveDaData(venda.dataVenda);

          const diaVenda =
            await verificarDiaFechado(
              tx,
              chaveDia
            );

          if (diaVenda?.fechado) {
            throw new Error(
              `O dia ${chaveDia} está fechado. Reabra o dia antes de alterar esta venda.`
            );
          }

          let aparelhoEncontrado:
            | (typeof venda.itens[number]["aparelhos"][number])
            | null = null;

          let itemEncontrado:
            | (typeof venda.itens[number])
            | null = null;

          for (
            const item of venda.itens
          ) {
            const aparelho =
              item.aparelhos.find(
                (a) => {
                  if (
                    aparelhoId !== null
                  ) {
                    return (
                      a.id === aparelhoId
                    );
                  }

                  return (
                    a.imei === imei
                  );
                }
              );

            if (aparelho) {
              aparelhoEncontrado =
                aparelho;
              itemEncontrado =
                item;
              break;
            }
          }

          if (
            !aparelhoEncontrado ||
            !itemEncontrado
          ) {
            throw new Error(
              "Este aparelho/IMEI não está vinculado a esta venda."
            );
          }

          if (
            aparelhoEncontrado.vendido !==
            true
          ) {
            throw new Error(
              "Este aparelho já foi devolvido."
            );
          }

          let custoAparelho = 0;

          if (
            aparelhoEncontrado.lote
              ?.precoCompraUsd !==
              null &&
            aparelhoEncontrado.lote
              ?.precoCompraUsd !==
              undefined
          ) {
            custoAparelho =
              Number(
                aparelhoEncontrado.lote
                  .precoCompraUsd
              );
          }

          const valorUnitario =
            Number(
              itemEncontrado
                .valorUnitario || 0
            );

          await tx.aparelho.update({
            where: {
              id:
                aparelhoEncontrado.id,
            },

            data: {
              vendido: false,
              vendaItemId: null,
            },
          });

          await tx.produto.update({
            where: {
              id:
                itemEncontrado.produtoId,
            },

            data: {
              quantidade: {
                increment: 1,
              },
            },
          });

          const novaQuantidade =
            Number(
              itemEncontrado
                .quantidade || 0
            ) - 1;

          if (
            novaQuantidade <= 0
          ) {
            await tx.vendaItem.delete({
              where: {
                id:
                  itemEncontrado.id,
              },
            });
          } else {
            const novoTotal =
              novaQuantidade *
              valorUnitario;

            const custoAtual =
              Number(
                itemEncontrado
                  .custoTotal || 0
              );

            const novoCustoTotal =
              Math.max(
                0,
                custoAtual -
                  custoAparelho
              );

            const novoPrecoCompra =
              novaQuantidade > 0
                ? novoCustoTotal /
                  novaQuantidade
                : null;

            await tx.vendaItem.update({
              where: {
                id:
                  itemEncontrado.id,
              },

              data: {
                quantidade:
                  novaQuantidade,
                total: novoTotal,
                custoTotal:
                  novoCustoTotal,
                precoCompraUsd:
                  novoPrecoCompra,
              },
            });
          }

          const itensAtualizados =
            await tx.vendaItem.findMany({
              where: {
                vendaId,
              },
            });

          const novoTotalVenda =
            itensAtualizados.reduce(
              (total, item) =>
                total +
                Number(
                  item.total || 0
                ),
              0
            );

          const pagamentoAutomatico =
            venda.pagamentos.find(
              (pagamento) =>
                pagamento.observacao ===
                "Pagamento registrado automaticamente na venda."
            );

          if (
            pagamentoAutomatico
          ) {
            if (
              novoTotalVenda <=
              0.009
            ) {
              await tx.pagamento.delete({
                where: {
                  id:
                    pagamentoAutomatico.id,
                },
              });
            } else {
              await tx.pagamento.update({
                where: {
                  id:
                    pagamentoAutomatico.id,
                },

                data: {
                  valor:
                    novoTotalVenda,
                },
              });
            }
          }

          let novoEstadoFatura =
            venda.estadoFatura;

          if (
            novoTotalVenda <=
            0.009
          ) {
            novoEstadoFatura =
              "Cancelada";
          } else if (
            pagamentoAutomatico
          ) {
            novoEstadoFatura =
              "Quitado";
          }

          const vendaAtualizada =
            await tx.venda.update({
              where: {
                id: vendaId,
              },

              data: {
                estadoFatura:
                  novoEstadoFatura,
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

          return {
            venda:
              vendaAtualizada,

            aparelhoDevolvido: {
              id:
                aparelhoEncontrado.id,

              imei:
                aparelhoEncontrado.imei,

              modelo:
                itemEncontrado
                  .produto.nome,
            },

            novoTotalVenda,
          };
        },
        {
          maxWait: 10000,
          timeout: 15000,
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Aparelho devolvido com sucesso e retornado ao estoque.",
      ...resultado,
    });
  } catch (error) {
    console.error(
      "ERRO AO DEVOLVER APARELHO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao devolver aparelho.",
      },
      { status: 400 }
    );
  }
}

// =====================================================
// DELETE — EXCLUIR VENDA INTEIRA
// SOMENTE ADMIN
// =====================================================

export async function DELETE(req: Request) {
  try {
    const usuario =
      await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    if (
      usuario.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Somente o administrador pode cancelar uma venda.",
        },
        { status: 403 }
      );
    }

    const body =
      await req.json();

    const vendaId =
      Number(
        body.vendaId ??
          body.id
      );

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
        { status: 400 }
      );
    }

    await prisma.$transaction(
      async (
        tx: Prisma.TransactionClient
      ) => {
        const venda =
          await tx.venda.findUnique({
            where: {
              id:
                vendaId,
            },

            include: {
              itens: {
                include: {
                  aparelhos: true,
                },
              },
            },
          });

        if (!venda) {
          throw new Error(
            "Venda não encontrada."
          );
        }

        const chaveDia =
          chaveDaData(venda.dataVenda);

        const diaVenda =
          await verificarDiaFechado(
            tx,
            chaveDia
          );

        if (diaVenda?.fechado) {
          throw new Error(
            `O dia ${chaveDia} está fechado. Reabra o dia antes de alterar esta venda.`
          );
        }

        for (
          const item of venda.itens
        ) {
          const aparelhos =
            item.aparelhos;

          if (
            aparelhos.length >
            0
          ) {
            await tx.aparelho.updateMany({
              where: {
                id: {
                  in: aparelhos.map(
                    (aparelho) =>
                      aparelho.id
                  ),
                },
              },

              data: {
                vendido: false,
                vendaItemId: null,
              },
            });

            await tx.produto.update({
              where: {
                id:
                  item.produtoId,
              },

              data: {
                quantidade: {
                  increment:
                    aparelhos.length,
                },
              },
            });
          }
        }

        await tx.pagamento.deleteMany({
          where: {
            vendaId,
          },
        });

        await tx.vendaItem.deleteMany({
          where: {
            vendaId,
          },
        });

        await tx.venda.delete({
          where: {
            id:
              vendaId,
          },
        });
      },
      {
        maxWait: 10000,
        timeout: 15000,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Venda excluída e todos os aparelhos foram devolvidos ao estoque.",
    });
  } catch (error) {
    console.error(
      "ERRO AO EXCLUIR VENDA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao excluir venda.",
      },
      { status: 400 }
    );
  }
}
