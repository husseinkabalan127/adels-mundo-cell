import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// TYPES
// =====================================================

type ItemRelatorio = {
  quantidade: number;
  total: unknown;
  custoTotal: unknown;
  precoCompraUsd: unknown;

  produto: {
    nome: string;
  } | null;

  aparelhos: {
    imei: string;

    lote: {
      precoCompraUsd: number | null;
      precoCompraBrl: number | null;
      tipoCusto: string | null;
    } | null;
  }[];
};

type VendaRelatorio = {
  id: number;
  cliente: string | null;
  taxa: unknown;
  taxaFechada: boolean | null;
  createdAt: Date;
  itens: ItemRelatorio[];
};

// =====================================================
// DATA BRASIL — INÍCIO
// =====================================================

function inicioDoDia(data: string): Date {
  return new Date(`${data}T00:00:00-03:00`);
}

// =====================================================
// DATA BRASIL — FIM
// =====================================================

function fimDoDia(data: string): Date {
  return new Date(`${data}T23:59:59.999-03:00`);
}

// =====================================================
// GET — RELATÓRIO
// =====================================================

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const dataInicio =
      searchParams.get("dataInicio");

    const dataFim =
      searchParams.get("dataFim");

    // =================================================
    // FILTRO DE DATA
    // =================================================

    const whereVenda: {
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};

    if (dataInicio || dataFim) {
      whereVenda.createdAt = {};

      if (dataInicio) {
        whereVenda.createdAt.gte =
          inicioDoDia(dataInicio);
      }

      if (dataFim) {
        whereVenda.createdAt.lte =
          fimDoDia(dataFim);
      }
    }

    // =================================================
    // PRODUTOS
    // =================================================

    const produtos =
      await prisma.produto.count();

    // =================================================
    // ESTOQUE
    // =================================================

    const estoque =
      await prisma.produto.aggregate({
        _sum: {
          quantidade: true,
        },
      });

    // =================================================
    // VENDAS
    // =================================================

    const vendasRaw =
      await prisma.venda.findMany({
        where: whereVenda,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          itens: {
            include: {
              produto: {
                select: {
                  nome: true,
                },
              },

              aparelhos: {
                select: {
                  imei: true,

                  // =====================================
                  // IMPORTANTE
                  // CUSTO VEM DO LOTE
                  // =====================================

                  lote: {
                    select: {
                      precoCompraUsd: true,
                      precoCompraBrl: true,
                      tipoCusto: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    const vendas =
      vendasRaw as unknown as VendaRelatorio[];

    // =================================================
    // PREPARAR VENDAS
    // =================================================

    const listaVendas =
      vendas.map(
        (venda: VendaRelatorio) => {

          // ===========================================
          // QUANTIDADE
          // ===========================================

          const quantidade =
            venda.itens.reduce(
              (
                total: number,
                item: ItemRelatorio
              ) => {
                return (
                  total +
                  Number(
                    item.quantidade ?? 0
                  )
                );
              },
              0
            );

          // ===========================================
          // TOTAL DA VENDA
          // ===========================================
          //
          // IMPORTANTE:
          // O Relatório mantém o preço real da venda.
          //
          // Não usamos Telefones sem preço aqui.
          //
          // O preço cadastrado em Telefones sem preço
          // é CUSTO, não preço de venda.
          // ===========================================

          const valorVenda =
            venda.itens.reduce(
              (
                total: number,
                item: ItemRelatorio
              ) => {
                return (
                  total +
                  Number(
                    item.total ?? 0
                  )
                );
              },
              0
            );

          // ===========================================
          // TAXA
          // ===========================================

          const taxa =
            venda.taxa !== null &&
            venda.taxa !== undefined
              ? Number(venda.taxa)
              : null;

          // ===========================================
          // CUSTOS DOS APARELHOS
          // ===========================================

          let custoUsd = 0;
          let custoBrl = 0;

          let quantidadeUsd = 0;
          let quantidadeBrl = 0;

          // ===========================================
          // LER CUSTO DIRETAMENTE DO LOTE DE CADA IMEI
          // ===========================================

          venda.itens.forEach(
            (
              item: ItemRelatorio
            ) => {

              item.aparelhos.forEach(
                (aparelho) => {

                  const lote =
                    aparelho.lote;

                  if (!lote) {
                    return;
                  }

                  // -------------------------------------
                  // CUSTO USD
                  // -------------------------------------

                  if (
                    lote.tipoCusto === "USD" &&
                    lote.precoCompraUsd !== null &&
                    lote.precoCompraUsd !== undefined
                  ) {
                    custoUsd += Number(
                      lote.precoCompraUsd
                    );

                    quantidadeUsd++;
                  }

                  // -------------------------------------
                  // CUSTO BRL
                  // -------------------------------------

                  if (
                    lote.tipoCusto === "BRL" &&
                    lote.precoCompraBrl !== null &&
                    lote.precoCompraBrl !== undefined
                  ) {
                    custoBrl += Number(
                      lote.precoCompraBrl
                    );

                    quantidadeBrl++;
                  }
                }
              );
            }
          );

          // ===========================================
          // CUSTO ANTIGO SALVO NA VENDA
          // ===========================================

          const custoTotalSalvo =
            venda.itens.reduce(
              (
                total: number,
                item: ItemRelatorio
              ) => {
                return (
                  total +
                  Number(
                    item.custoTotal ?? 0
                  )
                );
              },
              0
            );

          // ===========================================
          // CUSTO FINAL
          // ===========================================

          let custoCalculado = 0;

          // -------------------------------------------
          // USD × TAXA
          // -------------------------------------------

          if (
            quantidadeUsd > 0 &&
            taxa !== null &&
            Number.isFinite(taxa)
          ) {
            custoCalculado +=
              custoUsd * taxa;
          }

          // -------------------------------------------
          // BRL DIRETO
          // -------------------------------------------

          if (
            quantidadeBrl > 0
          ) {
            custoCalculado +=
              custoBrl;
          }

          // ===========================================
          // FALLBACK
          // ===========================================
          //
          // Só usa o custo antigo se o lote não tiver
          // custo cadastrado.
          // ===========================================

          if (
            custoCalculado === 0 &&
            custoTotalSalvo > 0
          ) {

            if (
              taxa !== null &&
              Number.isFinite(taxa)
            ) {
              custoCalculado =
                custoTotalSalvo * taxa;
            } else {
              custoCalculado =
                custoTotalSalvo;
            }
          }

          // ===========================================
          // PREÇO MÉDIO DE COMPRA USD
          // ===========================================

          let precoCompraUsd:
            number | null = null;

          if (
            quantidadeUsd > 0
          ) {
            precoCompraUsd =
              custoUsd /
              quantidadeUsd;
          }

          // ===========================================
          // FALLBACK PREÇO USD
          // ===========================================

          if (
            precoCompraUsd === null
          ) {

            const somaUsd =
              venda.itens.reduce(
                (
                  total: number,
                  item: ItemRelatorio
                ) => {

                  const preco =
                    Number(
                      item.precoCompraUsd ??
                        0
                    );

                  const qtd =
                    Number(
                      item.quantidade ??
                        0
                    );

                  return (
                    total +
                    preco * qtd
                  );
                },
                0
              );

            if (
              somaUsd > 0
            ) {
              precoCompraUsd =
                quantidade > 0
                  ? somaUsd /
                    quantidade
                  : null;
            }
          }

          // ===========================================
          // LUCRO
          // ===========================================

          const lucro =
            valorVenda -
            custoCalculado;

          // ===========================================
          // IMEIs
          // ===========================================

          const imeis =
            venda.itens
              .flatMap(
                (
                  item: ItemRelatorio
                ) =>
                  item.aparelhos
              )
              .map(
                (
                  aparelho
                ) =>
                  aparelho.imei
              )
              .filter(Boolean);

          // ===========================================
          // PRODUTOS
          // ===========================================

          const produtosVenda =
            venda.itens
              .map(
                (
                  item: ItemRelatorio
                ) =>
                  item.produto?.nome
              )
              .filter(
                (
                  nome
                ): nome is string =>
                  Boolean(nome)
              );

          const produto =
            produtosVenda.length > 0
              ? produtosVenda.join(", ")
              : null;

          // ===========================================
          // RETORNO
          // ===========================================

          return {
            id: venda.id,

            cliente:
              venda.cliente ?? "",

            quantidade,

            valorVenda:
              Number(valorVenda),

            custo:
              Number(custoCalculado),

            custoTotal:
              Number(custoCalculado),

            lucro:
              Number(lucro),

            taxa,

            taxaFechada:
              venda.taxaFechada ??
              false,

            precoCompraUsd,

            createdAt:
              venda.createdAt,

            produto,

            imeis,
          };
        }
      );

    // =================================================
    // TOTAL VENDAS
    // =================================================

    const valorVendas =
      listaVendas.reduce(
        (
          total: number,
          venda
        ) => {
          return (
            total +
            Number(
              venda.valorVenda
            )
          );
        },
        0
      );

    // =================================================
    // TOTAL CUSTO
    // =================================================

    const custoTotal =
      listaVendas.reduce(
        (
          total: number,
          venda
        ) => {
          return (
            total +
            Number(
              venda.custo
            )
          );
        },
        0
      );

    // =================================================
    // TOTAL LUCRO
    // =================================================

    const lucroTotal =
      listaVendas.reduce(
        (
          total: number,
          venda
        ) => {
          return (
            total +
            Number(
              venda.lucro
            )
          );
        },
        0
      );

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      produtos,

      quantidadeEstoque:
        estoque._sum.quantidade ??
        0,

      vendas:
        listaVendas.length,

      valorVendas,

      custoTotal,

      lucroTotal,

      listaVendas,
    });

  } catch (error) {

    console.error(
      "ERRO AO CARREGAR RELATÓRIO:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao carregar relatório.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH — SALVAR TAXA NAS VENDAS DO PERÍODO
// =====================================================

export async function PATCH(req: Request) {
  try {

    const body =
      await req.json();

    const dataInicio =
      String(
        body.dataInicio ?? ""
      ).trim();

    const dataFim =
      String(
        body.dataFim ?? ""
      ).trim();

    const taxaTexto =
      String(
        body.taxa ?? ""
      )
        .trim()
        .replace(",", ".");

    // =================================================
    // VALIDAR DATAS
    // =================================================

    if (
      !dataInicio ||
      !dataFim
    ) {

      return NextResponse.json(
        {
          error:
            "Informe a data inicial e a data final.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      dataInicio >
      dataFim
    ) {

      return NextResponse.json(
        {
          error:
            "A data inicial não pode ser maior que a data final.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // VALIDAR TAXA
    // =================================================

    const taxa =
      Number(taxaTexto);

    if (
      !Number.isFinite(taxa) ||
      taxa < 0
    ) {

      return NextResponse.json(
        {
          error:
            "Digite uma Taxa válida.",
        },
        {
          status: 400,
        }
      );
    }

    // =================================================
    // PERÍODO
    // =================================================

    const inicio =
      inicioDoDia(dataInicio);

    const fim =
      fimDoDia(dataFim);

    // =================================================
    // BUSCAR VENDAS
    // =================================================

    const vendas =
      await prisma.venda.findMany({
        where: {
          createdAt: {
            gte: inicio,
            lte: fim,
          },
        },

        select: {
          id: true,
        },
      });

    // =================================================
    // NENHUMA VENDA
    // =================================================

    if (
      vendas.length === 0
    ) {

      return NextResponse.json(
        {
          success: false,

          message:
            "Nenhuma venda encontrada nesse período.",

          quantidade: 0,
        },
        {
          status: 404,
        }
      );
    }

    // =================================================
    // IDS
    // =================================================

    const vendaIds =
      vendas.map(
        (
          venda: {
            id: number;
          }
        ) =>
          venda.id
      );

    // =================================================
    // SALVAR TAXA
    // =================================================

    const resultado =
      await prisma.venda.updateMany({
        where: {
          id: {
            in: vendaIds,
          },
        },

        data: {
          taxa,

          taxaFechada:
            true,
        },
      });

    // =================================================
    // RESPOSTA
    // =================================================

    return NextResponse.json({
      success: true,

      message:
        `Taxa ${taxa.toFixed(
          2
        )} salva em ${
          resultado.count
        } venda(s).`,

      quantidade:
        resultado.count,

      taxa,
    });

  } catch (error) {

    console.error(
      "ERRO AO SALVAR TAXA:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar taxa.",
      },
      {
        status: 500,
      }
    );
  }
}