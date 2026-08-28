"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  aparelhos?: Aparelho[];
};

type Venda = {
  id: number;
  valorVenda?: number;
  lucro?: number;
  quantidade?: number;
};

type ContaReceber = {
  id: number;
  cliente: string;
  total: number;
  pago: number;
  desconto: number;
  restante: number;
  estadoFatura?: string | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [contas, setContas] = useState<ContaReceber[]>([]);

  const [carregando, setCarregando] = useState(true);

  const [mostrarDisponiveis, setMostrarDisponiveis] =
    useState(false);

  const [mostrarVendidos, setMostrarVendidos] =
    useState(false);

  // =====================================================
  // MOEDA
  // =====================================================

  function moeda(valor: number) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // =====================================================
  // CARREGAR DADOS
  // =====================================================

  async function carregarDados() {
    try {
      setCarregando(true);

      const [
        produtosRes,
        vendasRes,
        contasRes,
      ] = await Promise.all([
        fetch("/api/produtos", {
          cache: "no-store",
        }),

        fetch("/api/vendas", {
          cache: "no-store",
        }),

        fetch("/api/contas-a-receber", {
          cache: "no-store",
        }),
      ]);

      const produtosData =
        await produtosRes.json();

      const vendasData =
        await vendasRes.json();

      const contasData =
        await contasRes.json();

      // PRODUTOS
      if (Array.isArray(produtosData)) {
        setProdutos(produtosData);
      } else {
        setProdutos(
          Array.isArray(produtosData?.produtos)
            ? produtosData.produtos
            : []
        );
      }

      // VENDAS
      if (Array.isArray(vendasData)) {
        setVendas(vendasData);
      } else {
        setVendas(
          Array.isArray(vendasData?.vendas)
            ? vendasData.vendas
            : []
        );
      }

      // CONTAS A RECEBER
      if (Array.isArray(contasData)) {
        setContas(contasData);
      } else {
        setContas(
          Array.isArray(contasData?.contas)
            ? contasData.contas
            : []
        );
      }
    } catch (error) {
      console.error(
        "Erro ao carregar dashboard:",
        error
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // =====================================================
  // APARELHOS DISPONÍVEIS
  // SOMENTE OS QUE REALMENTE EXISTEM
  // =====================================================

  const produtosDisponiveis =
    useMemo(() => {
      return produtos
        .map((produto) => {
          const aparelhos =
            (produto.aparelhos || []).filter(
              (aparelho) =>
                aparelho.vendido === false
            );

          return {
            ...produto,
            aparelhosDisponiveis:
              aparelhos,
          };
        })
        .filter(
          (produto) =>
            produto.aparelhosDisponiveis
              .length > 0
        );
    }, [produtos]);

  // =====================================================
  // APARELHOS VENDIDOS
  // SOMENTE VISUALIZAÇÃO
  // =====================================================

  const aparelhosVendidosLista =
    useMemo(() => {
      const lista: {
        id: number;
        imei: string;
        modelo: string;
      }[] = [];

      produtos.forEach((produto) => {
        (produto.aparelhos || [])
          .filter(
            (aparelho) =>
              aparelho.vendido === true
          )
          .forEach((aparelho) => {
            lista.push({
              id: aparelho.id,
              imei: aparelho.imei,
              modelo: produto.nome,
            });
          });
      });

      return lista;
    }, [produtos]);

  // =====================================================
  // CÁLCULOS
  // =====================================================

  const totalVendas = vendas.reduce(
    (total, venda) =>
      total +
      Number(venda.valorVenda || 0),
    0
  );

  const lucroTotal = vendas.reduce(
    (total, venda) =>
      total +
      Number(venda.lucro || 0),
    0
  );

  // Quantidade real de aparelhos vendidos
  const aparelhosVendidos =
    aparelhosVendidosLista.length;

  // Quantidade real disponível pelos aparelhos
  const aparelhosEstoque =
    produtosDisponiveis.reduce(
      (total, produto) =>
        total +
        produto.aparelhosDisponiveis.length,
      0
    );

  // Valor do estoque pelo preço de venda
  const valorEstoque = produtos.reduce(
    (total, produto) => {
      const disponiveis =
        (produto.aparelhos || []).filter(
          (aparelho) =>
            aparelho.vendido === false
        ).length;

      const precoVenda = Number(
        (produto as any).precoVenda || 0
      );

      return (
        total +
        precoVenda * disponiveis
      );
    },
    0
  );

  // =====================================================
  // CONTAS A RECEBER
  // =====================================================

  const contasPendentes =
    contas.filter(
      (conta) =>
        Number(conta.restante || 0) >
        0.009
    );

  const totalAReceber =
    contasPendentes.reduce(
      (total, conta) =>
        total +
        Number(conta.restante || 0),
      0
    );

  const contasQuitadas =
    contas.filter(
      (conta) =>
        Number(conta.restante || 0) <=
        0.009
    );

  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-600">
              Carregando dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📊 Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Adel's Mundo Cell
            </p>
          </div>

        </div>

        {/* ================================================= */}
        {/* CARDS PRINCIPAIS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL VENDAS */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              💰 Total de vendas
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {moeda(totalVendas)}
            </p>
          </div>

          {/* LUCRO */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              📈 Lucro total
            </p>

            <p className="mt-3 text-3xl font-bold text-green-600">
              {moeda(lucroTotal)}
            </p>
          </div>

          {/* ESTOQUE */}

          <button
            type="button"
            onClick={() =>
              setMostrarDisponiveis(
                !mostrarDisponiveis
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-medium text-gray-500">
              📦 Aparelhos disponíveis
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {aparelhosEstoque}
            </p>

            <p className="mt-2 text-sm font-semibold text-blue-600">
              {mostrarDisponiveis
                ? "Fechar aparelhos ↑"
                : "Ver aparelhos →"}
            </p>
          </button>

          {/* VENDIDOS */}

          <button
            type="button"
            onClick={() =>
              setMostrarVendidos(
                !mostrarVendidos
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-medium text-gray-500">
              📱 Aparelhos vendidos
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {aparelhosVendidos}
            </p>

            <p className="mt-2 text-sm font-semibold text-blue-600">
              {mostrarVendidos
                ? "Fechar vendidos ↑"
                : "Ver aparelhos →"}
            </p>
          </button>

        </div>

        {/* ================================================= */}
        {/* CONTAS A RECEBER */}
        {/* ================================================= */}

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* PENDENTES */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/contas-a-receber"
              )
            }
            className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-medium text-gray-500">
              💳 Contas pendentes
            </p>

            <p className="mt-3 text-3xl font-bold text-red-600">
              {contasPendentes.length}
            </p>

            <p className="mt-2 font-semibold text-red-600">
              {moeda(totalAReceber)}
            </p>

            <p className="mt-2 text-sm text-blue-600">
              Ver contas →
            </p>
          </button>

          {/* QUITADAS */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              ✅ Contas quitadas
            </p>

            <p className="mt-3 text-3xl font-bold text-green-600">
              {contasQuitadas.length}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Pagamentos concluídos
            </p>
          </div>

          {/* TOTAL DE CONTAS */}

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              📋 Total de contas
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {contas.length}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Pendentes + quitadas
            </p>
          </div>

        </div>

        {/* ================================================= */}
        {/* APARELHOS DISPONÍVEIS */}
        {/* ================================================= */}

        {mostrarDisponiveis && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  📦 Aparelhos disponíveis
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Somente modelos que possuem
                  aparelhos disponíveis.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMostrarDisponiveis(false)
                }
                className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
              >
                Fechar
              </button>

            </div>

            {produtosDisponiveis.length ===
            0 ? (
              <div className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
                Nenhum aparelho disponível
                no estoque.
              </div>
            ) : (
              <div className="space-y-4">

                {produtosDisponiveis.map(
                  (produto) => (
                    <div
                      key={produto.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                    >

                      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            📱 {produto.nome}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {produto.aparelhosDisponiveis.length}{" "}
                            aparelho(s) disponível(is)
                          </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                          🟢 Disponível
                        </span>

                      </div>

                      <div className="space-y-2">

                        {produto.aparelhosDisponiveis.map(
                          (aparelho) => (
                            <div
                              key={aparelho.id}
                              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
                            >

                              <div>
                                <p className="text-xs font-medium text-gray-400">
                                  IMEI
                                </p>

                                <p className="font-mono font-semibold text-gray-800">
                                  {aparelho.imei}
                                </p>
                              </div>

                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Disponível
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        )}

        {/* ================================================= */}
        {/* APARELHOS VENDIDOS */}
        {/* ================================================= */}

        {mostrarVendidos && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  📱 Aparelhos vendidos
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Consulta somente. Nenhuma alteração
                  pode ser feita aqui.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMostrarVendidos(false)
                }
                className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
              >
                Fechar
              </button>

            </div>

            {aparelhosVendidosLista.length ===
            0 ? (
              <div className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
                Nenhum aparelho vendido.
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[650px]">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                        Modelo
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                        IMEI
                      </th>

                      <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {aparelhosVendidosLista.map(
                      (aparelho) => (
                        <tr
                          key={aparelho.id}
                          className="hover:bg-gray-50"
                        >

                          <td className="px-5 py-4 font-semibold text-gray-900">
                            📱 {aparelho.modelo}
                          </td>

                          <td className="px-5 py-4 font-mono text-gray-700">
                            {aparelho.imei}
                          </td>

                          <td className="px-5 py-4 text-center">

                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                              Vendido
                            </span>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </div>
        )}

        {/* ================================================= */}
        {/* VALOR DO ESTOQUE */}
        {/* ================================================= */}

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">

          <p className="text-sm font-medium text-gray-500">
            💵 Valor do estoque pelo preço de venda
          </p>

          <p className="mt-3 text-4xl font-bold text-gray-900">
            {moeda(valorEstoque)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Considerando somente aparelhos
            disponíveis.
          </p>

        </div>

        {/* ================================================= */}
        {/* RESUMO DA LOJA */}
        {/* ================================================= */}

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            📋 Resumo da loja
          </h2>

          <div className="space-y-1">

            {/* PRODUTOS */}

            <div className="flex justify-between border-b p-4">
              <span>
                📦 Modelos cadastrados
              </span>

              <strong>
                {produtos.length}
              </strong>
            </div>

            {/* VENDAS */}

            <div className="flex justify-between border-b p-4">
              <span>
                💰 Quantidade de vendas
              </span>

              <strong>
                {vendas.length}
              </strong>
            </div>

            {/* APARELHOS VENDIDOS */}

            <div className="flex justify-between border-b p-4">
              <span>
                📱 Aparelhos vendidos
              </span>

              <strong>
                {aparelhosVendidos}
              </strong>
            </div>

            {/* DISPONÍVEIS */}

            <button
              type="button"
              onClick={() =>
                setMostrarDisponiveis(
                  !mostrarDisponiveis
                )
              }
              className="flex w-full items-center justify-between border-b p-4 text-left hover:bg-gray-50"
            >

              <span>
                📦 Aparelhos disponíveis
              </span>

              <strong className="text-blue-600">
                {aparelhosEstoque}{" "}
                {mostrarDisponiveis
                  ? "↑"
                  : "→"}
              </strong>

            </button>

            {/* LUCRO */}

            <div className="flex justify-between border-b p-4">
              <span>
                📈 Lucro total
              </span>

              <strong className="text-green-600">
                {moeda(lucroTotal)}
              </strong>
            </div>

            {/* CONTAS */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/contas-a-receber"
                )
              }
              className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
            >

              <span>
                💳 Total a receber
              </span>

              <strong className="text-red-600">
                {moeda(totalAReceber)}
              </strong>

            </button>

          </div>

        </div>

      </div>
    </main>
  );
}