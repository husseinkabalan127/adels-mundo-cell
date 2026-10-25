"use client";



import { useEffect, useMemo, useState } from "react";

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



type RegistroLivre = Record<string, unknown>;

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
  const [ultimasVendas, setUltimasVendas] = useState<RegistroLivre[]>([]);
  const [ultimasAssistencias, setUltimasAssistencias] = useState<RegistroLivre[]>([]);



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



      const [produtosRes, contasRes, relatorioRes, vendasRes, assistenciasRes] =
        await Promise.all([
          fetch("/api/produtos", { cache: "no-store" }),
          fetch("/api/contas-a-receber", { cache: "no-store" }),
          fetch(`/api/relatorio?${parametros.toString()}`, { cache: "no-store" }),
          fetch("/api/vendas", { cache: "no-store" }).catch(() => null),
          fetch("/api/assistencias", { cache: "no-store" }).catch(() => null),
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

      if (vendasRes?.ok) {
        const vendasData = await vendasRes.json().catch(() => []);
        const listaVendas = Array.isArray(vendasData) ? vendasData :
          Array.isArray(vendasData?.vendas) ? vendasData.vendas :
          Array.isArray(vendasData?.data) ? vendasData.data : [];
        setUltimasVendas(listaVendas as RegistroLivre[]);
      } else setUltimasVendas([]);

      if (assistenciasRes?.ok) {
        const assistenciasData = await assistenciasRes.json().catch(() => []);
        const listaAssistencias = Array.isArray(assistenciasData) ? assistenciasData :
          Array.isArray(assistenciasData?.assistencias) ? assistenciasData.assistencias :
          Array.isArray(assistenciasData?.data) ? assistenciasData.data : [];
        setUltimasAssistencias(listaAssistencias as RegistroLivre[]);
      } else setUltimasAssistencias([]);


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



  function campoTexto(item: RegistroLivre, chaves: string[], padrao = ""): string {
    for (const chave of chaves) {
      const valor = item[chave];
      if (valor !== undefined && valor !== null && String(valor).trim() !== "") return String(valor);
    }
    return padrao;
  }

  function campoNumero(item: RegistroLivre, chaves: string[]): number {
    for (const chave of chaves) {
      const valor = item[chave];
      if (valor !== undefined && valor !== null && valor !== "") return numero(valor);
    }
    return 0;
  }

  function dataRegistro(item: RegistroLivre): Date | null {
    const valor = campoTexto(item, ["createdAt", "data", "dataVenda", "dataCriacao", "created_at", "date"]);
    if (!valor) return null;
    const data = new Date(valor);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  const vendasDoMes = useMemo(() => {
    const agora = new Date();
    return ultimasVendas.filter((venda) => {
      const data = dataRegistro(venda);
      return data !== null && data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
    });
  }, [ultimasVendas]);

  const graficoVendas = useMemo(() => {
    const agora = new Date();
    const dias = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).getDate();
    return Array.from({ length: dias }, (_, indice) => {
      const dia = indice + 1;
      const vendasDia = vendasDoMes.filter((venda) => dataRegistro(venda)?.getDate() === dia);
      const valor = vendasDia.reduce((soma, venda) => soma + campoNumero(venda, ["total", "valorTotal", "valor", "totalVenda", "precoTotal"]), 0);
      return { dia, valor };
    });
  }, [vendasDoMes]);

  const estoquePorMarca = useMemo(() => {
    const marcas: Record<string, number> = {};
    for (const produto of produtos) {
      const qtd = (produto.aparelhos || []).filter((aparelho) => aparelho.vendido === false).length;
      if (!qtd) continue;
      const nome = (produto.nome || "").toLowerCase();
      const marca = nome.includes("iphone") ? "iPhone" :
        nome.includes("xiaomi") || nome.includes("redmi") || nome.includes("poco") ? "Xiaomi" :
        nome.includes("realme") ? "Realme" :
        nome.includes("samsung") || nome.includes("galaxy") ? "Samsung" :
        nome.includes("motorola") || nome.includes("moto ") ? "Motorola" : "Outros";
      marcas[marca] = (marcas[marca] || 0) + qtd;
    }
    return Object.entries(marcas).sort((a, b) => b[1] - a[1]);
  }, [produtos]);

  const maxVendaDia = Math.max(1, ...graficoVendas.map((dia) => dia.valor));
  const totalEstoqueMarca = estoquePorMarca.reduce((soma, [, qtd]) => soma + qtd, 0);

  // =====================================================
  // CARREGANDO
  // =====================================================



  if (carregando) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="font-medium text-slate-600">Carregando Adel’s Mundo Cell...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <section className="mx-auto min-w-0 max-w-[1600px] p-4 sm:p-6">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Painel de controle</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Visão geral do desempenho da Adel’s Mundo Cell</p>
          </div>
          <button type="button" onClick={atualizarDados} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold shadow-sm transition hover:bg-slate-50">
            ↻ Atualizar dados
          </button>
        </header>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-5 text-white shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-semibold text-blue-50">Vendas no período</p><p className="mt-3 text-3xl font-extrabold">{moedaBRL(totalVendas)}</p><p className="mt-2 text-sm text-blue-100">{quantidadeVendasPeriodo} venda(s) registradas</p></div>
              <span className="text-3xl opacity-80">🛒</span>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-semibold text-blue-50">Lucro confirmado</p><p className="mt-3 text-3xl font-extrabold">{moedaBRL(lucroTotal)}</p><p className="mt-2 text-sm text-blue-100">Somente vendas com Taxa fechada</p></div>
              <span className="text-3xl opacity-80">📈</span>
            </div>
          </div>
          <button type="button" onClick={() => router.push("/contas-a-receber")} className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-5 text-left text-white shadow-md transition hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-semibold text-blue-50">Contas a receber</p><p className="mt-3 text-3xl font-extrabold">{moedaBRL(totalAReceber)}</p><p className="mt-2 text-sm text-blue-100">{contasPendentes.length} conta(s) pendente(s) · Ver detalhes →</p></div>
              <span className="text-3xl opacity-80">💳</span>
            </div>
          </button>
          <button type="button" onClick={() => router.push("/estoque")} className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-700 p-5 text-left text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-semibold text-blue-50">Estoque disponível</p><p className="mt-3 text-3xl font-extrabold">{quantidadeEstoque} <span className="text-base font-semibold">aparelhos</span></p><p className="mt-2 text-sm text-blue-100">Custo conhecido: {moedaUSD(valorEstoqueUSD)}</p></div>
              <span className="text-3xl opacity-90">📦</span>
            </div>
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <button type="button" onClick={() => router.push("/vendas")} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-emerald-50 p-3 text-xl">🛒</span><span><strong className="block">Nova venda</strong><span className="text-xs text-slate-500">Registrar venda</span></span></span><span className="text-xl text-slate-400">›</span></button>
          <button type="button" onClick={() => router.push("/compras")} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-violet-50 p-3 text-xl">📦</span><span><strong className="block">Nova compra</strong><span className="text-xs text-slate-500">Adicionar estoque</span></span></span><span className="text-xl text-slate-400">›</span></button>
          <button type="button" onClick={() => router.push("/clientes")} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-sky-50 p-3 text-xl">👥</span><span><strong className="block">Cadastrar cliente</strong><span className="text-xs text-slate-500">Novo cliente</span></span></span><span className="text-xl text-slate-400">›</span></button>
          <button type="button" onClick={() => router.push("/assistencias")} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-orange-50 p-3 text-xl">🔧</span><span><strong className="block">Nova assistência</strong><span className="text-xs text-slate-500">Abrir serviço</span></span></span><span className="text-xl text-slate-400">›</span></button>
          <button type="button" onClick={() => router.push("/estoque")} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="flex items-center gap-3"><span className="rounded-xl bg-slate-100 p-3 text-xl">◈</span><span><strong className="block">Produtos</strong><span className="text-xs text-slate-500">Ver estoque</span></span></span><span className="text-xl text-slate-400">›</span></button>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div><h2 className="font-bold text-slate-900">Filtrar por data e hora</h2><p className="text-sm text-slate-500">Os indicadores de vendas respeitam o período selecionado.</p></div>
            <button type="button" onClick={filtrarHoje} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold hover:bg-slate-200">Hoje</button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="text-sm font-semibold text-slate-600">Data inicial<input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500" /></label>
            <label className="text-sm font-semibold text-slate-600">Hora inicial<input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500" /></label>
            <label className="text-sm font-semibold text-slate-600">Data final<input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500" /></label>
            <label className="text-sm font-semibold text-slate-600">Hora final<input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500" /></label>
          </div>
          {erroFiltro && <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{erroFiltro}</div>}
          <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={aplicarFiltro} className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-white shadow-sm hover:bg-blue-700">Aplicar filtro</button><button type="button" onClick={atualizarDados} className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">Atualizar</button></div>
          <p className="mt-3 text-xs text-slate-400">Período aplicado: {filtroAplicado.dataInicio} {filtroAplicado.horaInicio} até {filtroAplicado.dataFim} {filtroAplicado.horaFim}</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div><h2 className="text-lg font-extrabold text-slate-900">▥ Vendas do mês</h2><p className="text-sm text-slate-500">Registros reais do mês atual</p></div>
              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">{moedaBRL(vendasDoMes.reduce((soma, venda) => soma + campoNumero(venda, ["total", "valorTotal", "valor", "totalVenda", "precoTotal"]), 0))}</span>
            </div>
            {vendasDoMes.length === 0 ? <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center"><span className="text-3xl">📊</span><p className="mt-3 font-semibold text-slate-700">Sem registros de vendas do mês para o gráfico</p><p className="mt-1 text-sm text-slate-500">A rota /api/vendas precisa retornar os registros reais. Nenhum dado fictício será exibido.</p></div> : <div className="overflow-x-auto"><div className="flex h-64 min-w-[680px] items-end gap-1 border-b border-l border-slate-200 px-2 pt-5">{graficoVendas.map((item) => <div key={item.dia} className="group flex h-full min-w-0 flex-1 flex-col justify-end"><div className="flex h-full items-end justify-center"><div title={`${item.dia}: ${moedaBRL(item.valor)}`} className="w-[72%] min-w-[5px] rounded-t-md bg-blue-400/80 transition hover:bg-blue-600" style={{ height: `${Math.max(item.valor > 0 ? 3 : 0, item.valor / maxVendaDia * 82)}%` }} /></div>{(item.dia === 1 || item.dia % 3 === 0 || item.dia === graficoVendas.length) && <span className="mt-2 text-center text-[10px] text-slate-500">{item.dia}</span>}</div>)}</div><div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500" /> Vendas (R$) · dia do mês</div></div>}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-4"><h2 className="text-lg font-extrabold text-slate-900">◔ Estoque por marca</h2><p className="text-sm text-slate-500">Aparelhos disponíveis no estoque atual</p></div>
            {totalEstoqueMarca === 0 ? <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Não há aparelhos disponíveis para agrupar por marca.</p> : <>
              <div className="mx-auto mb-5 flex h-44 w-44 items-center justify-center rounded-full" style={{ background: `conic-gradient(${estoquePorMarca.map(([, qtd], i) => { const colors = ["#f97316", "#9ca3af", "#facc15", "#3b82f6", "#8b5cf6", "#d1d5db"]; const antes = estoquePorMarca.slice(0, i).reduce((s, [, n]) => s + n, 0); return `${colors[i % colors.length]} ${antes / totalEstoqueMarca * 100}% ${(antes + qtd) / totalEstoqueMarca * 100}%`; }).join(", ")})` }}><div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white shadow-inner"><strong className="text-2xl text-slate-900">{totalEstoqueMarca}</strong><span className="text-xs text-slate-500">Aparelhos</span></div></div>
              <div className="space-y-3">{estoquePorMarca.map(([marca, qtd], i) => { const colors = ["bg-orange-500", "bg-slate-400", "bg-yellow-400", "bg-blue-500", "bg-violet-500", "bg-slate-300"]; return <div key={marca} className="flex items-center gap-2 text-sm"><span className={`h-3 w-3 shrink-0 rounded-full ${colors[i % colors.length]}`} /><span className="min-w-0 flex-1 truncate text-slate-600">{marca}</span><span className="w-10 text-right text-slate-500">{Math.round(qtd / totalEstoqueMarca * 100)}%</span><strong className="w-8 text-right text-slate-800">{qtd}</strong></div>; })}</div>
            </>}
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-extrabold text-slate-900">▤ Últimas vendas</h2><p className="text-xs text-slate-500">Registros reais do sistema</p></div><button type="button" onClick={() => router.push("/vendas")} className="text-sm font-bold text-blue-600 hover:text-blue-800">Ver todas →</button></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-xs"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-3 py-3">#</th><th className="px-3 py-3">Data</th><th className="px-3 py-3">Cliente</th><th className="px-3 py-3">Modelo</th><th className="px-3 py-3 text-right">Total</th></tr></thead><tbody className="divide-y divide-slate-100">
              {ultimasVendas.slice().sort((a,b) => (dataRegistro(b)?.getTime() || 0) - (dataRegistro(a)?.getTime() || 0)).slice(0,6).map((venda, i) => <tr key={campoTexto(venda, ["id", "numero", "codigo"], String(i))} className="hover:bg-slate-50"><td className="px-3 py-3 font-semibold text-slate-500">{campoTexto(venda, ["numero", "codigo", "id"], "—")}</td><td className="whitespace-nowrap px-3 py-3">{dataRegistro(venda)?.toLocaleDateString("pt-BR") || campoTexto(venda, ["data"], "—")}</td><td className="max-w-[130px] truncate px-3 py-3">{campoTexto(venda, ["clienteNome", "cliente", "nomeCliente"], "—")}</td><td className="max-w-[150px] truncate px-3 py-3">{campoTexto(venda, ["modelo", "produtoNome", "produto", "descricao"], "—")}</td><td className="whitespace-nowrap px-3 py-3 text-right font-bold">{moedaBRL(campoNumero(venda, ["total", "valorTotal", "valor", "totalVenda", "precoTotal"]))}</td></tr>)}
              {ultimasVendas.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">Nenhuma venda retornada pela rota /api/vendas.</td></tr>}
            </tbody></table></div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-extrabold text-slate-900">🔧 Últimas assistências</h2><p className="text-xs text-slate-500">Ordens de serviço registradas</p></div><button type="button" onClick={() => router.push("/assistencias")} className="text-sm font-bold text-blue-600 hover:text-blue-800">Ver todas →</button></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-xs"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-3 py-3">OS</th><th className="px-3 py-3">Data</th><th className="px-3 py-3">Cliente</th><th className="px-3 py-3">Serviço</th><th className="px-3 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">
              {ultimasAssistencias.slice().sort((a,b) => (dataRegistro(b)?.getTime() || 0) - (dataRegistro(a)?.getTime() || 0)).slice(0,6).map((os, i) => <tr key={campoTexto(os, ["id", "numeroOS", "codigo"], String(i))} className="hover:bg-slate-50"><td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-500">{campoTexto(os, ["numeroOS", "codigo", "id"], "—")}</td><td className="whitespace-nowrap px-3 py-3">{dataRegistro(os)?.toLocaleDateString("pt-BR") || campoTexto(os, ["data"], "—")}</td><td className="max-w-[130px] truncate px-3 py-3">{campoTexto(os, ["clienteNome", "cliente", "nomeCliente"], "—")}</td><td className="max-w-[150px] truncate px-3 py-3">{campoTexto(os, ["servico", "defeito", "descricao", "tipoServico"], "—")}</td><td className="px-3 py-3"><span className="rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-700">{campoTexto(os, ["status", "estado", "situacao"], "—")}</span></td></tr>)}
              {ultimasAssistencias.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">Nenhuma assistência retornada pela rota /api/assistencias.</td></tr>}
            </tbody></table></div>
          </section>
        </div>
        <footer className="mt-8 pb-3 text-center text-xs text-slate-400">Adel’s Mundo Cell · Painel de controle</footer>
      </section>
    </main>
  );
}
