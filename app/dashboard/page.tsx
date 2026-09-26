"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
  loteId?: number | string | null;
};

type Lote = {
  id: number;
  quantidade: number;
  precoCompraUsd?: number | string | null;
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  precoVenda?: number | string | null;
  aparelhos?: Aparelho[];
  lotes?: Lote[];
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

type ResumoRelatorio = {
  valorVendas: number;
  custoTotal: number;
  lucroTotal: number;
  quantidadeAparelhos: number;
  quantidadeVendas: number;
  vendasTaxaPendente: number;
};

type Filtro = {
  dataInicio: string;
  dataFim: string;
  horaInicio: string;
  horaFim: string;
};

// =====================================================
// DATA DE HOJE - SÃO PAULO
// =====================================================

function dataHojeBrasil() {
  const agora = new Date();

  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(agora);

  const ano = partes.find((p) => p.type === "year")?.value;
  const mes = partes.find((p) => p.type === "month")?.value;
  const dia = partes.find((p) => p.type === "day")?.value;

  return `${ano}-${mes}-${dia}`;
}

// =====================================================
// CONVERTER VALOR PARA NÚMERO
// Aceita número, "100.50" ou "100,50"
// =====================================================

function numero(valor: unknown): number {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : 0;
  }

  if (valor === null || valor === undefined || valor === "") {
    return 0;
  }

  let texto = String(valor).trim();

  // Formato brasileiro: 1.234,56
  if (texto.includes(",")) {
    texto = texto.replace(/\./g, "").replace(",", ".");
  }

  const resultado = Number(texto);

  return Number.isFinite(resultado) ? resultado : 0;
}

// =====================================================
// DASHBOARD
// =====================================================

export default function DashboardPage() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [contas, setContas] = useState<ContaReceber[]>([]);

  const [resumoRelatorio, setResumoRelatorio] =
    useState<ResumoRelatorio>({
      valorVendas: 0,
      custoTotal: 0,
      lucroTotal: 0,
      quantidadeAparelhos: 0,
      quantidadeVendas: 0,
      vendasTaxaPendente: 0,
    });

  const [carregando, setCarregando] = useState(true);
  const [erroFiltro, setErroFiltro] = useState("");

  // =====================================================
  // FILTRO DE DATA E HORA
  // =====================================================

  const [dataInicio, setDataInicio] = useState(dataHojeBrasil);
  const [dataFim, setDataFim] = useState(dataHojeBrasil);

  const [horaInicio, setHoraInicio] = useState("00:00");
  const [horaFim, setHoraFim] = useState("23:59");

  const [filtroAplicado, setFiltroAplicado] = useState<Filtro>({
    dataInicio: dataHojeBrasil(),
    dataFim: dataHojeBrasil(),
    horaInicio: "00:00",
    horaFim: "23:59",
  });

  // =====================================================
  // MOEDAS
  // =====================================================

  function moedaBRL(valor: number) {
    return numero(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function moedaUSD(valor: number) {
    return numero(valor).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  // =====================================================
  // CARREGAR DADOS
  // =====================================================

  async function carregarDados(filtro: Filtro = filtroAplicado) {
    try {
      setCarregando(true);
      setErroFiltro("");

      const parametros = new URLSearchParams({
        dataInicio: filtro.dataInicio,
        dataFim: filtro.dataFim,
        horaInicio: filtro.horaInicio,
        horaFim: filtro.horaFim,
      });

      const [produtosRes, contasRes, relatorioRes] =
        await Promise.all([
          fetch("/api/produtos", {
            cache: "no-store",
          }),

          fetch("/api/contas-a-receber", {
            cache: "no-store",
          }),

          fetch(`/api/relatorio?${parametros.toString()}`, {
            cache: "no-store",
          }),
        ]);

      const produtosData = await produtosRes.json();
      const contasData = await contasRes.json();
      const relatorioData = await relatorioRes.json();

      if (!produtosRes.ok) {
        throw new Error(
          produtosData?.error || "Erro ao carregar os produtos."
        );
      }

      if (!contasRes.ok) {
        throw new Error(
          contasData?.error || "Erro ao carregar as contas."
        );
      }

      if (!relatorioRes.ok) {
        throw new Error(
          relatorioData?.error || "Erro ao carregar relatório."
        );
      }

      // -------------------------------------------------
      // RELATÓRIO - PERÍODO SELECIONADO
      // -------------------------------------------------

      setResumoRelatorio({
        valorVendas: numero(relatorioData?.valorVendas),
        custoTotal: numero(relatorioData?.custoTotal),
        lucroTotal: numero(relatorioData?.lucroTotal),
        quantidadeAparelhos: numero(
          relatorioData?.quantidadeAparelhos
        ),
        quantidadeVendas: numero(
          relatorioData?.quantidadeVendas
        ),
        vendasTaxaPendente: numero(
          relatorioData?.vendasTaxaPendente
        ),
      });

      // -------------------------------------------------
      // PRODUTOS - ESTOQUE ATUAL
      // -------------------------------------------------

      if (Array.isArray(produtosData)) {
        setProdutos(produtosData);
      } else if (Array.isArray(produtosData?.produtos)) {
        setProdutos(produtosData.produtos);
      } else {
        setProdutos([]);
      }

      // -------------------------------------------------
      // CONTAS A RECEBER - SITUAÇÃO ATUAL
      // -------------------------------------------------

      if (Array.isArray(contasData)) {
        setContas(contasData);
      } else if (Array.isArray(contasData?.contas)) {
        setContas(contasData.contas);
      } else {
        setContas([]);
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);

      setErroFiltro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar os dados."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // CARREGAR AUTOMATICAMENTE AO ABRIR
  // =====================================================

  useEffect(() => {
    const filtroInicial: Filtro = {
      dataInicio: dataHojeBrasil(),
      dataFim: dataHojeBrasil(),
      horaInicio: "00:00",
      horaFim: "23:59",
    };

    setDataInicio(filtroInicial.dataInicio);
    setDataFim(filtroInicial.dataFim);
    setFiltroAplicado(filtroInicial);

    carregarDados(filtroInicial);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // APLICAR FILTRO
  // =====================================================

  function aplicarFiltro() {
    setErroFiltro("");

    if (!dataInicio || !dataFim) {
      setErroFiltro("Informe a data inicial e a data final.");
      return;
    }

    if (dataInicio > dataFim) {
      setErroFiltro(
        "A data inicial não pode ser maior que a data final."
      );
      return;
    }

    if (
      dataInicio === dataFim &&
      horaInicio > horaFim
    ) {
      setErroFiltro(
        "A hora inicial não pode ser maior que a hora final."
      );
      return;
    }

    const novoFiltro: Filtro = {
      dataInicio,
      dataFim,
      horaInicio,
      horaFim,
    };

    setFiltroAplicado(novoFiltro);
    carregarDados(novoFiltro);
  }

  // =====================================================
  // FILTRAR HOJE
  // =====================================================

  function filtrarHoje() {
    const hoje = dataHojeBrasil();

    const novoFiltro: Filtro = {
      dataInicio: hoje,
      dataFim: hoje,
      horaInicio: "00:00",
      horaFim: "23:59",
    };

    setDataInicio(hoje);
    setDataFim(hoje);
    setHoraInicio("00:00");
    setHoraFim("23:59");

    setFiltroAplicado(novoFiltro);
    carregarDados(novoFiltro);
  }

  // =====================================================
  // ATUALIZAR DADOS COM FILTRO ATUAL
  // =====================================================

  function atualizarDados() {
    carregarDados(filtroAplicado);
  }

  // =====================================================
  // VALORES DO RELATÓRIO - PERÍODO SELECIONADO
  // =====================================================

  const totalVendas = numero(resumoRelatorio.valorVendas);
  const custoTotal = numero(resumoRelatorio.custoTotal);
  const lucroTotal = numero(resumoRelatorio.lucroTotal);

  const quantidadeAparelhosPeriodo = numero(
    resumoRelatorio.quantidadeAparelhos
  );

  const quantidadeVendasPeriodo = numero(
    resumoRelatorio.quantidadeVendas
  );

  const vendasTaxaPendente = numero(
    resumoRelatorio.vendasTaxaPendente
  );

  // =====================================================
  // VALOR DO ESTOQUE EM USD
  // CUSTO DE COMPRA DOS APARELHOS DISPONÍVEIS
  // =====================================================

  const valorEstoqueUSD = produtos.reduce(
    (totalProduto, produto) => {
      const aparelhos = produto.aparelhos || [];
      const lotes = produto.lotes || [];

      // Mapa dos lotes para localizar o preço de compra
      const lotesPorId = new Map<number, Lote>(
        lotes.map((lote) => [Number(lote.id), lote])
      );

      const aparelhosDisponiveis = aparelhos.filter(
        (aparelho) => aparelho.vendido === false
      );

      const valorProdutoUSD = aparelhosDisponiveis.reduce(
        (totalAparelhos, aparelho) => {
          const loteId =
            aparelho.loteId === null ||
            aparelho.loteId === undefined
              ? null
              : Number(aparelho.loteId);

          let lote =
            loteId !== null
              ? lotesPorId.get(loteId)
              : undefined;

          /*
           * Compatibilidade com aparelhos antigos:
           * se não houver loteId e o produto tiver somente
           * um lote, podemos usar o preço desse lote.
           *
           * Se houver vários lotes, não inventamos o custo.
           */
          if (!lote && lotes.length === 1) {
            lote = lotes[0];
          }

          const precoCompraUsd = numero(
            lote?.precoCompraUsd
          );

          return totalAparelhos + precoCompraUsd;
        },
        0
      );

      return totalProduto + valorProdutoUSD;
    },
    0
  );

  // =====================================================
  // VALOR DO ESTOQUE EM BRL
  // PREÇO DE VENDA DOS APARELHOS DISPONÍVEIS
  // =====================================================

  const valorEstoqueBRL = produtos.reduce(
    (totalProduto, produto) => {
      const aparelhosDisponiveis = (
        produto.aparelhos || []
      ).filter((aparelho) => aparelho.vendido === false).length;

      const precoVenda = numero(produto.precoVenda);

      return totalProduto + precoVenda * aparelhosDisponiveis;
    },
    0
  );

  // =====================================================
  // QUANTIDADE DE APARELHOS DISPONÍVEIS
  // =====================================================

  const quantidadeEstoque = produtos.reduce(
    (total, produto) =>
      total +
      (produto.aparelhos || []).filter(
        (aparelho) => aparelho.vendido === false
      ).length,
    0
  );

  // =====================================================
  // CONTAS A RECEBER - SITUAÇÃO ATUAL
  // =====================================================

  const contasPendentes = contas.filter(
    (conta) => numero(conta.restante) > 0.009
  );

  const totalAReceber = contasPendentes.reduce(
    (total, conta) => total + numero(conta.restante),
    0
  );

  const contasQuitadas = contas.filter(
    (conta) => numero(conta.restante) <= 0.009
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

        {/* CABEÇALHO */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">
            📊 Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Adel's Mundo Cell
          </p>
        </div>

        {/* FILTRO DE DATA E HORA */}

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                📅 Filtrar vendas por período
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Escolha as datas e os horários para consultar
                as vendas, os custos e o lucro.
              </p>
            </div>

            <button
              type="button"
              onClick={filtrarHoje}
              className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
            >
              Hoje
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="dataInicio"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Data inicial
              </label>

              <input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="horaInicio"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Hora inicial
              </label>

              <input
                id="horaInicio"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="dataFim"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Data final
              </label>

              <input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="horaFim"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Hora final
              </label>

              <input
                id="horaFim"
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {erroFiltro && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {erroFiltro}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={aplicarFiltro}
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              🔎 Aplicar filtro
            </button>

            <button
              type="button"
              onClick={atualizarDados}
              className="rounded-lg bg-gray-100 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
            >
              🔄 Atualizar
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Período aplicado: {filtroAplicado.dataInicio}{" "}
            {filtroAplicado.horaInicio} até{" "}
            {filtroAplicado.dataFim}{" "}
            {filtroAplicado.horaFim}
          </p>
        </div>

        {/* CARDS PRINCIPAIS */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              💰 Total de vendas
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {moedaBRL(totalVendas)}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Período selecionado
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              💵 Custo total
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {moedaUSD(custoTotal)}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Período selecionado
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              📈 Lucro confirmado
            </p>

            <p className="mt-3 text-3xl font-bold text-green-600">
              {moedaBRL(lucroTotal)}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Somente vendas com Taxa fechada
            </p>
          </div>
        </div>

        {/* RESUMO DE VENDAS DO PERÍODO */}

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              📱 Aparelhos vendidos no período
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {quantidadeAparelhosPeriodo}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              ⏳ Vendas com Taxa pendente no período
            </p>

            <p className="mt-3 text-3xl font-bold text-orange-600">
              {vendasTaxaPendente}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Não entram no lucro confirmado
            </p>
          </div>
        </div>

        {/* CONTAS A RECEBER */}

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <button
            type="button"
            onClick={() => router.push("/contas-a-receber")}
            className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-medium text-gray-500">
              💳 Contas pendentes
            </p>

            <p className="mt-3 text-3xl font-bold text-red-600">
              {contasPendentes.length}
            </p>

            <p className="mt-2 font-semibold text-red-600">
              {moedaBRL(totalAReceber)}
            </p>

            <p className="mt-2 text-sm text-blue-600">
              Ver contas →
            </p>
          </button>

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

        {/* VALOR DO ESTOQUE - USD */}

        <div className="mt-6 rounded-2xl border border-green-100 bg-white p-8 shadow-lg">
          <p className="text-sm font-medium text-gray-500">
            🇺🇸 Valor do estoque pelo preço de compra
          </p>

          <p className="mt-3 text-4xl font-bold text-green-700">
            {moedaUSD(valorEstoqueUSD)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Custo de compra em dólar dos aparelhos disponíveis.
          </p>
        </div>

        {/* VALOR DO ESTOQUE - BRL */}

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">
          <p className="text-sm font-medium text-gray-500">
            🇧🇷 Valor do estoque pelo preço de venda
          </p>

          <p className="mt-3 text-4xl font-bold text-gray-900">
            {moedaBRL(valorEstoqueBRL)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Considerando somente aparelhos disponíveis.
          </p>

          <p className="mt-4 text-sm font-semibold text-blue-700">
            📦 Aparelhos disponíveis no estoque:{" "}
            {quantidadeEstoque}
          </p>
        </div>

        {/* RESUMO DA LOJA */}

        <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            📋 Resumo da loja
          </h2>

          <div className="space-y-1">
            <div className="flex justify-between border-b p-4">
              <span>💰 Quantidade de vendas no período</span>
              <strong>{quantidadeVendasPeriodo}</strong>
            </div>

            <div className="flex justify-between border-b p-4">
              <span>📱 Aparelhos vendidos no período</span>
              <strong>{quantidadeAparelhosPeriodo}</strong>
            </div>

            <div className="flex justify-between border-b p-4">
              <span>💵 Total de vendas no período</span>
              <strong>{moedaBRL(totalVendas)}</strong>
            </div>

            <div className="flex justify-between border-b p-4">
              <span>📈 Lucro confirmado no período</span>
              <strong className="text-green-600">
                {moedaBRL(lucroTotal)}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => router.push("/contas-a-receber")}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span>💳 Total a receber</span>

              <strong className="text-red-600">
                {moedaBRL(totalAReceber)}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}