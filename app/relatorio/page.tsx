"use client";

import { useEffect, useState } from "react";

type Venda = {
  id: number;
  cliente: string;
  quantidade: number;
  valorVenda: number;
  custo: number;
  lucro: number;
  taxa: number | null;
  precoCompraUsd: number | null;
  createdAt: string;
  produto: string | null;
  imeis: string[];
};

type Relatorio = {
  produtos: number;
  quantidadeEstoque: number;
  vendas: number;
  valorVendas: number;
  custoTotal: number;
  lucroTotal: number;
  listaVendas: Venda[];
};

export default function RelatorioPage() {
  const [dados, setDados] = useState<Relatorio>({
    produtos: 0,
    quantidadeEstoque: 0,
    vendas: 0,
    valorVendas: 0,
    custoTotal: 0,
    lucroTotal: 0,
    listaVendas: [],
  });

  const [carregando, setCarregando] = useState(true);

  // =====================================================
  // FILTROS
  // =====================================================

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [taxa, setTaxa] = useState("");

  // =====================================================
  // CARREGAR RELATÓRIO
  // =====================================================

  async function carregarRelatorio(
    inicio = dataInicio,
    fim = dataFim
  ) {
    try {
      setCarregando(true);

      const params = new URLSearchParams();

      if (inicio) {
        params.set("dataInicio", inicio);
      }

      if (fim) {
        params.set("dataFim", fim);
      }

      const url =
        params.toString().length > 0
          ? `/api/relatorio?${params.toString()}`
          : "/api/relatorio";

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          "Erro ao carregar relatório"
        );
      }

      const data = await res.json();

      const lista: Venda[] =
        Array.isArray(data.listaVendas)
          ? data.listaVendas.map(
              (venda: any) => ({
                id: venda.id ?? 0,

                cliente:
                  venda.cliente ?? "-",

                quantidade: Number(
                  venda.quantidade ?? 0
                ),

                valorVenda: Number(
                  venda.valorVenda ?? 0
                ),

                custo: Number(
                  venda.custo ??
                    venda.custoTotal ??
                    0
                ),

                lucro: Number(
                  venda.lucro ?? 0
                ),

                taxa:
                  venda.taxa !== null &&
                  venda.taxa !== undefined
                    ? Number(venda.taxa)
                    : null,

                precoCompraUsd:
                  venda.precoCompraUsd !==
                    null &&
                  venda.precoCompraUsd !==
                    undefined
                    ? Number(
                        venda.precoCompraUsd
                      )
                    : null,

                createdAt:
                  venda.createdAt,

                produto:
                  typeof venda.produto ===
                  "string"
                    ? venda.produto
                    : venda.produto?.nome ??
                      null,

                imeis: Array.isArray(
                  venda.imeis
                )
                  ? venda.imeis
                  : venda.imei
                  ? [venda.imei]
                  : [],
              })
            )
          : [];

      setDados({
        produtos: Number(
          data.produtos ?? 0
        ),

        quantidadeEstoque: Number(
          data.quantidadeEstoque ?? 0
        ),

        vendas: Number(
          data.vendas ?? lista.length
        ),

        valorVendas: Number(
          data.valorVendas ?? 0
        ),

        custoTotal: Number(
          data.custoTotal ?? 0
        ),

        lucroTotal: Number(
          data.lucroTotal ?? 0
        ),

        listaVendas: lista,
      });
    } catch (error) {
      console.error(
        "ERRO AO CARREGAR RELATÓRIO:",
        error
      );

      alert(
        "Erro ao carregar relatório"
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // PRIMEIRO CARREGAMENTO
  // =====================================================

  useEffect(() => {
    carregarRelatorio("", "");
  }, []);

  // =====================================================
  // SALVAR TAXA
  // =====================================================

  async function salvarTaxa() {
    if (!dataInicio || !dataFim) {
      alert(
        "Informe a data inicial e a data final."
      );

      return;
    }

    if (dataInicio > dataFim) {
      alert(
        "A data inicial não pode ser maior que a data final."
      );

      return;
    }

    if (taxa === "") {
      alert(
        "Informe a Taxa."
      );

      return;
    }

    const taxaNumero = Number(
      taxa.replace(",", ".")
    );

    if (
      !Number.isFinite(taxaNumero) ||
      taxaNumero < 0
    ) {
      alert(
        "Digite uma Taxa válida."
      );

      return;
    }

    try {
      setCarregando(true);

      const res = await fetch(
        "/api/relatorio",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            dataInicio,
            dataFim,
            taxa: taxaNumero,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao salvar taxa."
        );
      }

      alert(
        `✅ Taxa ${taxaNumero.toFixed(
          2
        )} salva em ${data.quantidade} venda(s)!`
      );

      // Recarregar o período
      await carregarRelatorio(
        dataInicio,
        dataFim
      );
    } catch (error: any) {
      console.error(
        "ERRO AO SALVAR TAXA:",
        error
      );

      alert(
        error?.message ||
          "Erro ao salvar taxa."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // LIMPAR FILTRO
  // =====================================================

  function limparFiltro() {
    setDataInicio("");
    setDataFim("");
    setTaxa("");

    carregarRelatorio("", "");
  }

  // =====================================================
  // ATUALIZAR
  // =====================================================

  function atualizar() {
    carregarRelatorio(
      dataInicio,
      dataFim
    );
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(data: string) {
    if (!data) return "-";

    return new Date(
      data
    ).toLocaleString("pt-BR");
  }

  // =====================================================
  // FORMATAR BRL
  // =====================================================

  function formatarMoeda(
    valor: number
  ) {
    return Number(
      valor ?? 0
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // =====================================================
  // FORMATAR USD
  // =====================================================

  function formatarUsd(
    valor: number | null
  ) {
    if (
      valor === null ||
      valor === undefined
    ) {
      return "-";
    }

    return Number(
      valor
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xl">
            Carregando relatório...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              📊 Relatório de Vendas
            </h1>

            <p className="text-gray-500 mt-1">
              Adel&apos;s Mundo Cell
            </p>
          </div>

          <button
            onClick={atualizar}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            🔄 Atualizar
          </button>

        </div>

        {/* ================================================= */}
        {/* FILTRO DE PERÍODO E TAXA */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-5">
            🔎 Filtrar vendas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* DATA INÍCIO */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                De
              </label>

              <input
                type="date"
                value={dataInicio}
                onChange={(e) =>
                  setDataInicio(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* DATA FIM */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Até
              </label>

              <input
                type="date"
                value={dataFim}
                onChange={(e) =>
                  setDataFim(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* TAXA */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Taxa
              </label>

              <input
                type="text"
                inputMode="decimal"
                placeholder="Ex: 5,25"
                value={taxa}
                onChange={(e) =>
                  setTaxa(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* BOTÕES */}

            <div className="flex items-end gap-2">

              <button
                onClick={salvarTaxa}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700"
              >
                💾 Salvar Taxa
              </button>

              <button
                onClick={limparFiltro}
                className="bg-gray-200 px-4 py-3 rounded-lg hover:bg-gray-300"
              >
                Limpar
              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* FILTRO ATUAL */}
          {/* ================================================= */}

          {(dataInicio ||
            dataFim ||
            taxa) && (
            <div className="mt-5 p-4 bg-gray-50 rounded-lg">

              <p className="text-sm text-gray-600">

                <strong>
                  Filtro atual:
                </strong>{" "}

                {dataInicio
                  ? dataInicio
                  : "Início"}

                {" → "}

                {dataFim
                  ? dataFim
                  : "Hoje"}

                {taxa && (
                  <>
                    {" | "}
                    <strong>
                      Taxa:
                    </strong>{" "}
                    {taxa}
                  </>
                )}

              </p>

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* RESUMO */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

          {/* VENDAS */}

          <div className="bg-white rounded-xl shadow p-5">

            <p className="text-gray-500">
              Vendas realizadas
            </p>

            <p className="text-3xl font-bold mt-2">
              {dados.vendas}
            </p>

          </div>

          {/* TOTAL VENDAS */}

          <div className="bg-white rounded-xl shadow p-5">

            <p className="text-gray-500">
              Total de vendas
            </p>

            <p className="text-2xl font-bold mt-2">
              {formatarMoeda(
                dados.valorVendas
              )}
            </p>

          </div>

          {/* CUSTO */}

          <div className="bg-white rounded-xl shadow p-5">

            <p className="text-gray-500">
              Custo total
            </p>

            <p className="text-2xl font-bold mt-2">
              {formatarMoeda(
                dados.custoTotal
              )}
            </p>

          </div>

          {/* LUCRO */}

          <div className="bg-white rounded-xl shadow p-5">

            <p className="text-gray-500">
              Lucro total
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatarMoeda(
                dados.lucroTotal
              )}
            </p>

          </div>

          {/* ESTOQUE */}

          <div className="bg-white rounded-xl shadow p-5">

            <p className="text-gray-500">
              Produtos em estoque
            </p>

            <p className="text-3xl font-bold mt-2">
              {dados.quantidadeEstoque}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* MODELOS */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow p-5 mb-8">

          <p className="text-gray-500">
            Modelos cadastrados
          </p>

          <p className="text-3xl font-bold mt-2">
            {dados.produtos}
          </p>

        </div>

        {/* ================================================= */}
        {/* HISTÓRICO */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold">
              Histórico de vendas
            </h2>

          </div>

          {dados.listaVendas.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              Nenhuma venda registrada.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3 text-left">
                      Data
                    </th>

                    <th className="p-3 text-left">
                      Cliente
                    </th>

                    <th className="p-3 text-left">
                      Aparelho
                    </th>

                    <th className="p-3 text-left">
                      IMEI
                    </th>

                    <th className="p-3 text-left">
                      Qtd
                    </th>

                    <th className="p-3 text-left">
                      Venda
                    </th>

                    <th className="p-3 text-left">
                      Custo
                    </th>

                    <th className="p-3 text-left">
                      USD
                    </th>

                    <th className="p-3 text-left">
                      Taxa
                    </th>

                    <th className="p-3 text-left">
                      Lucro
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dados.listaVendas.map(
                    (venda) => (

                      <tr
                        key={venda.id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* DATA */}

                        <td className="p-3 whitespace-nowrap">
                          {formatarData(
                            venda.createdAt
                          )}
                        </td>

                        {/* CLIENTE */}

                        <td className="p-3">
                          {venda.cliente ||
                            "-"}
                        </td>

                        {/* APARELHO */}

                        <td className="p-3 font-medium">
                          {venda.produto ||
                            "-"}
                        </td>

                        {/* IMEI */}

                        <td className="p-3">

                          {venda.imeis.length >
                          0 ? (

                            <div className="space-y-1">

                              {venda.imeis.map(
                                (
                                  imei,
                                  index
                                ) => (

                                  <div
                                    key={`${imei}-${index}`}
                                  >
                                    {imei}
                                  </div>

                                )
                              )}

                            </div>

                          ) : (
                            "-"
                          )}

                        </td>

                        {/* QTD */}

                        <td className="p-3">
                          {venda.quantidade}
                        </td>

                        {/* VENDA */}

                        <td className="p-3 font-medium">
                          {formatarMoeda(
                            venda.valorVenda
                          )}
                        </td>

                        {/* CUSTO */}

                        <td className="p-3">
                          {formatarMoeda(
                            venda.custo
                          )}
                        </td>

                        {/* USD */}

                        <td className="p-3">
                          {formatarUsd(
                            venda.precoCompraUsd
                          )}
                        </td>

                        {/* TAXA */}

                        <td className="p-3">

                          {venda.taxa !==
                          null
                            ? venda.taxa.toFixed(
                                2
                              )
                            : "-"}

                        </td>

                        {/* LUCRO */}

                        <td
                          className={`p-3 font-bold ${
                            venda.lucro >=
                            0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatarMoeda(
                            venda.lucro
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </main>
  );
}