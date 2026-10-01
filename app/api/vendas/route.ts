import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET — BUSCAR TODAS AS VENDAS
// =====================================================

export async function GET() {
  try {
    const vendas = await prisma.venda.findMany({
      orderBy: { dataVenda: "desc" },
      include: {
        pagamentos: true,
        itens: {
          include: {
            produto: true,
            aparelhos: true,
          },
        },
      },
    });

    const vendasPreparadas = vendas.map((venda) => {
      const valorVenda = venda.itens.reduce(
        (total, item) => total + Number(item.total || 0),
        0
      );

      const quantidade = venda.itens.reduce(
        (total, item) => total + Number(item.quantidade || 0),
        0
      );

      const custoTotalUsd = venda.itens.reduce(
        (total, item) => total + Number(item.custoTotal || 0),
        0
      );

      const taxa =
        venda.taxa !== null && venda.taxa !== undefined
          ? Number(venda.taxa)
          : null;

      const custoTotalReais =
        taxa !== null && Number.isFinite(taxa)
          ? custoTotalUsd * taxa
          : 0;

      const descontoVenda = Number(venda.desconto || 0);
      const pagamentos = (venda as any).pagamentos || [];

      const descontosPagamentos = pagamentos.reduce(
        (s: number, p: any) => s + Number(p.desconto || 0),
        0
      );

      const lucro =
        venda.taxaFechada === true
          ? valorVenda -
            descontoVenda -
            descontosPagamentos -
            custoTotalReais
          : 0;

      const valorFinal = Math.max(
        0,
        valorVenda - descontoVenda - descontosPagamentos
      );

      const totalPago = pagamentos.reduce(
        (s: number, p: any) => s + Number(p.valor || 0),
        0
      );

      return {
        ...venda,
        valorVenda,
        descontoVenda,
        descontosPagamentos,
        valorFinal,
        totalPago,
        saldo: Math.max(0, valorFinal - totalPago),
        quantidade,
        custoTotalUsd,
        custoTotalReais,
        lucro,
      };
    });

    return NextResponse.json(vendasPreparadas);
  } catch (error) {
    console.error("ERRO AO BUSCAR VENDAS:", error);

    return NextResponse.json(
      { error: "Erro ao buscar vendas." },
      { status: 500 }
    );
  }
}

// =====================================================
// POST — CRIAR VENDA
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cliente = String(body.cliente || "").trim();

    // DATA DA VENDA
    let dataVenda = new Date();

    if (body.dataVenda) {
      const dataTexto = String(body.dataVenda).trim();

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dataTexto)) {
        return NextResponse.json(
          { error: "Data da venda inválida." },
          { status: 400 }
        );
      }

      const [ano, mes, dia] = dataTexto.split("-").map(Number);

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

    // TAXA
    const taxa =
      body.taxa === null ||
      body.taxa === undefined ||
      body.taxa === ""
        ? null
        : Number(String(body.taxa).replace(",", "."));

    const itens = Array.isArray(body.itens) ? body.itens : [];

    const descontoVenda = Number(
      String(body.descontoVenda ?? 0).replace(",", ".")
    );

    const pagamentos = (
      Array.isArray(body.pagamentos) ? body.pagamentos : []
    ).map((p: any) => ({
      valor: Number(String(p.valor ?? 0).replace(",", ".")),
      desconto: Number(String(p.desconto ?? 0).replace(",", ".")),
      forma: String(p.forma || "Não informado").trim(),
      observacao: p.observacao
        ? String(p.observacao).trim()
        : null,
    }));

    // VALIDAÇÕES
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
        { error: "Adicione pelo menos um produto à venda." },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(descontoVenda) ||
      descontoVenda < 0 ||
      pagamentos.some(
        (p: any) =>
          !Number.isFinite(p.valor) ||
          p.valor < 0 ||
          !Number.isFinite(p.desconto) ||
          p.desconto < 0 ||
          !p.forma
      )
    ) {
      return NextResponse.json(
        { error: "Confira os valores e descontos informados." },
        { status: 400 }
      );
    }

    // PREPARAR ITENS
    const itensPreparados = itens.map(
      (item: any, index: number) => {
        const produtoId = Number(item.produtoId);
        const quantidade = Number(item.quantidade);

        const valorUnitario = Number(
          String(item.valorUnitario).replace(",", ".")
        );

        const imeis = Array.isArray(item.imeis)
          ? item.imeis
              .map((imei: unknown) => String(imei).trim())
              .filter(Boolean)
          : [];

        if (!Number.isInteger(produtoId) || produtoId <= 0) {
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

        if (new Set(imeis).size !== imeis.length) {
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

    // NÃO PERMITIR IMEI REPETIDO NA VENDA
    const todosImeis = itensPreparados.flatMap(
      (item: { imeis: string[] }) => item.imeis
    );

    if (new Set(todosImeis).size !== todosImeis.length) {
      return NextResponse.json(
        {
          error:
            "O mesmo IMEI não pode aparecer duas vezes na mesma venda.",
        },
        { status: 400 }
      );
    }

    // TRANSACTION
    const resultado = await prisma.$transaction(
      async (tx: any) => {
        const venda = await tx.venda.create({
          data: {
            cliente,
            taxa,
            taxaFechada: false,
            dataVenda,
            desconto: descontoVenda,
            formaPagamento:
              pagamentos.length === 1
                ? pagamentos[0].forma
                : pagamentos.length > 1
                  ? "Múltiplos pagamentos"
                  : body.formaPagamento || "Não informado",
            estadoFatura:
              body.estadoFatura || "Não informado",
          },
        });

        let totalVenda = 0;

        // PROCESSAR ITENS
        for (const item of itensPreparados) {
          const produto = await tx.produto.findUnique({
            where: { id: item.produtoId },
            include: {
              aparelhos: {
                where: { vendido: false },
                include: { lote: true },
              },
            },
          });

          if (!produto) {
            throw new Error("Produto não encontrado.");
          }

          if (produto.quantidade < item.quantidade) {
            throw new Error(
              `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.quantidade}.`
            );
          }

          const aparelhos = await tx.aparelho.findMany({
            where: {
              imei: { in: item.imeis },
              produtoId: item.produtoId,
              vendido: false,
            },
            include: { lote: true },
          });

          if (aparelhos.length !== item.quantidade) {
            throw new Error(
              `Um ou mais IMEIs não estão disponíveis no estoque para ${produto.nome}.`
            );
          }

          // CUSTO DE COMPRA EM USD
          let custoTotal = 0;

          for (const aparelho of aparelhos) {
            if (
              aparelho.lote?.precoCompraUsd !== null &&
              aparelho.lote?.precoCompraUsd !== undefined
            ) {
              custoTotal += Number(
                aparelho.lote.precoCompraUsd
              );
            }
          }

          const total = item.quantidade * item.valorUnitario;
          totalVenda += total;

          // CRIAR ITEM DA VENDA
          const vendaItem = await tx.vendaItem.create({
            data: {
              quantidade: item.quantidade,
              valorUnitario: item.valorUnitario,
              total,
              precoCompraUsd:
                item.quantidade > 0
                  ? custoTotal / item.quantidade
                  : null,
              custoTotal,
              vendaId: venda.id,
              produtoId: item.produtoId,
            },
          });

          // MARCAR APARELHOS COMO VENDIDOS
          await tx.aparelho.updateMany({
            where: {
              id: {
                in: aparelhos.map(
                  (aparelho: { id: number }) => aparelho.id
                ),
              },
            },
            data: {
              vendido: true,
              vendaItemId: vendaItem.id,
            },
          });

          // DIMINUIR ESTOQUE
          await tx.produto.update({
            where: { id: produto.id },
            data: {
              quantidade: {
                decrement: item.quantidade,
              },
            },
          });
        }

        // VALIDAR DESCONTOS E PAGAMENTOS
        const descontoTotalParcelas = pagamentos.reduce(
          (s: number, p: any) => s + p.desconto,
          0
        );

        if (descontoVenda + descontoTotalParcelas > totalVenda) {
          throw new Error(
            "A soma dos descontos não pode ser maior que o total da venda."
          );
        }

        if (pagamentos.length) {
          const totalPago = pagamentos.reduce(
            (s: number, p: any) => s + p.valor,
            0
          );

          if (
            totalPago + descontoVenda + descontoTotalParcelas >
            totalVenda + 0.005
          ) {
            throw new Error(
              "O valor pago mais os descontos não pode ultrapassar o total da venda."
            );
          }

          await tx.pagamento.createMany({
            data: pagamentos.map((p: any) => ({
              ...p,
              vendaId: venda.id,
            })),
          });
        }

        // BUSCAR VENDA COMPLETA
        const vendaCompleta = await tx.venda.findUnique({
          where: { id: venda.id },
          include: {
            pagamentos: true,
            itens: {
              include: {
                produto: true,
                aparelhos: true,
              },
            },
          },
        });

        return {
          venda: vendaCompleta,
          totalVenda,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Venda registrada com sucesso!",
        ...resultado,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERRO AO CRIAR VENDA:", error);

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
// PATCH — DEVOLVER UM APARELHO AO ESTOQUE
// =====================================================

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const vendaId = Number(body.vendaId);
    const aparelhoId = Number(body.aparelhoId);

    if (
      !Number.isInteger(vendaId) ||
      vendaId <= 0 ||
      !Number.isInteger(aparelhoId) ||
      aparelhoId <= 0
    ) {
      return NextResponse.json(
        { error: "Venda ou aparelho inválido." },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx: any) => {
      const aparelho = await tx.aparelho.findUnique({
        where: { id: aparelhoId },
        include: { vendaItem: true },
      });

      if (!aparelho) {
        throw new Error("Aparelho não encontrado.");
      }

      if (
        !aparelho.vendido ||
        !aparelho.vendaItemId ||
        !aparelho.vendaItem ||
        aparelho.vendaItem.vendaId !== vendaId
      ) {
        throw new Error(
          "Este aparelho não está vinculado a esta venda ou já foi devolvido."
        );
      }

      // DEVOLVER APARELHO
      await tx.aparelho.update({
        where: { id: aparelhoId },
        data: {
          vendido: false,
          vendaItemId: null,
        },
      });

      // AUMENTAR ESTOQUE
      await tx.produto.update({
        where: { id: aparelho.produtoId },
        data: {
          quantidade: { increment: 1 },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Aparelho devolvido ao estoque com sucesso.",
    });
  } catch (error) {
    console.error("ERRO AO DEVOLVER APARELHO:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao devolver o aparelho.",
      },
      { status: 400 }
    );
  }
}

// =====================================================
// DELETE — CANCELAR VENDA
// =====================================================

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const vendaId = Number(body.vendaId ?? body.id);

    if (!Number.isInteger(vendaId) || vendaId <= 0) {
      return NextResponse.json(
        { error: "ID da venda inválido." },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx: any) => {
      const venda = await tx.venda.findUnique({
        where: { id: vendaId },
        include: {
          itens: {
            include: {
              aparelhos: true,
            },
          },
        },
      });

      if (!venda) {
        throw new Error("Venda não encontrada.");
      }

      // DEVOLVER APARELHOS AO ESTOQUE
      for (const item of venda.itens) {
        const quantidade = item.aparelhos.length;

        if (quantidade > 0) {
          await tx.aparelho.updateMany({
            where: {
              id: {
                in: item.aparelhos.map(
                  (aparelho: { id: number }) => aparelho.id
                ),
              },
            },
            data: {
              vendido: false,
              vendaItemId: null,
            },
          });

          await tx.produto.update({
            where: { id: item.produtoId },
            data: {
              quantidade: { increment: quantidade },
            },
          });
        }
      }

      // EXCLUIR PAGAMENTOS ANTES DA VENDA
      await tx.pagamento.deleteMany({
        where: { vendaId },
      });

      // EXCLUIR ITENS DA VENDA
      await tx.vendaItem.deleteMany({
        where: { vendaId },
      });

      // EXCLUIR A VENDA
      await tx.venda.delete({
        where: { id: vendaId },
      });
    });

    return NextResponse.json({
      success: true,
      message:
        "Venda cancelada e aparelhos devolvidos ao estoque.",
    });
  } catch (error) {
    console.error("ERRO AO CANCELAR VENDA:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao cancelar venda.",
      },
      { status: 400 }
    );
  }
}