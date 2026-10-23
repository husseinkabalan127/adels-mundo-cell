"use client";

import { useEffect, useMemo, useState } from "react";

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

type ModeloResumo = {
  nome: string;
  quantidade: number;
  totalVendido: number;
  vendas: Venda[];
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
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [taxa, setTaxa] = useState("");
  // Valores digitados aqui são apenas uma simulação local até a API
  // ter um endpoint seguro para salvar o custo confirmado por modelo.
  const [custosManuais, setCustosManuais] = useState<Record<string, string>>({});

  async function carregarRelatorio(inicio = dataInicio, fim = dataFim) {
    try {
      setCarregando(true);
      setErro("");
      const params = new URLSearchParams();
      if (inicio) params.set("dataInicio", inicio);
      if (fim) params.set("dataFim", fim);
      const url = params.toString() ? `/api/relatorio?${params}` : "/api/relatorio";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Não foi possível carregar o relatório.");
      const data = await res.json();
      const lista: Venda[] = Array.isArray(data.listaVendas)
        ? data.listaVendas.map((v: any) => ({
            id: Number(v.id ?? 0),
            cliente: String(v.cliente ?? "-"),
            quantidade: Number(v.quantidade ?? 0),
            valorVenda: Number(v.valorVenda ?? 0),
            custo: Number(v.custo ?? v.custoTotal ?? 0),
            lucro: Number(v.lucro ?? 0),
            taxa: v.taxa === null || v.taxa === undefined ? null : Number(v.taxa),
            precoCompraUsd: v.precoCompraUsd === null || v.precoCompraUsd === undefined ? null : Number(v.precoCompraUsd),
            createdAt: String(v.createdAt ?? ""),
            produto: typeof v.produto === "string" ? v.produto : v.produto?.nome ?? null,
            imeis: Array.isArray(v.imeis) ? v.imeis : v.imei ? [v.imei] : [],
          }))
        : [];
      setDados({
        produtos: Number(data.produtos ?? 0),
        quantidadeEstoque: Number(data.quantidadeEstoque ?? 0),
        vendas: Number(data.vendas ?? lista.length),
        valorVendas: Number(data.valorVendas ?? 0),
        custoTotal: Number(data.custoTotal ?? 0),
        lucroTotal: Number(data.lucroTotal ?? 0),
        listaVendas: lista,
      });
    } catch (e) {
      console.error("ERRO AO CARREGAR RELATÓRIO:", e);
      setErro(e instanceof Error ? e.message : "Erro ao carregar relatório.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { void carregarRelatorio("", ""); }, []);

  async function salvarTaxa() {
    if (!dataInicio || !dataFim) return alert("Informe a data inicial e a data final.");
    if (dataInicio > dataFim) return alert("A data inicial não pode ser maior que a data final.");
    if (taxa.trim() === "") return alert("Informe a Taxa.");
    const taxaNumero = Number(taxa.replace(",", "."));
    if (!Number.isFinite(taxaNumero) || taxaNumero < 0) return alert("Digite uma Taxa válida.");
    try {
      setCarregando(true);
      const res = await fetch("/api/relatorio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataInicio, dataFim, taxa: taxaNumero }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar taxa.");
      alert(`Taxa ${taxaNumero.toFixed(2)} salva em ${data.quantidade} venda(s).`);
      await carregarRelatorio(dataInicio, dataFim);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao salvar taxa.");
    } finally {
      setCarregando(false);
    }
  }

  function limparFiltro() {
    setDataInicio(""); setDataFim(""); setTaxa(""); setBusca("");
    void carregarRelatorio("", "");
  }

  const modelos = useMemo<ModeloResumo[]>(() => {
    const mapa = new Map<string, ModeloResumo>();
    for (const venda of dados.listaVendas) {
      const nome = (venda.produto || "Modelo não identificado").trim();
      const atual = mapa.get(nome) || { nome, quantidade: 0, totalVendido: 0, vendas: [] };
      atual.quantidade += Math.max(0, venda.quantidade || 0);
      atual.totalVendido += Math.max(0, venda.valorVenda || 0);
      atual.vendas.push(venda);
      mapa.set(nome, atual);
    }
    return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [dados.listaVendas]);

  const modelosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    if (!termo) return [];
    return modelos.filter((m) => m.nome.toLocaleLowerCase("pt-BR").includes(termo));
  }, [modelos, busca]);

  function moeda(valor: number) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function parseDinheiro(valor: string): number | null {
    const limpo = valor.trim().replace(/R\$\s?/gi, "").replace(/\./g, "").replace(",", ".");
    if (!limpo) return null;
    const n = Number(limpo);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  if (carregando) return <main className="min-h-screen bg-slate-50 p-6 md:p-10"><div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-sm">Carregando relatório...</div></main>;

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Adel's Mundo Cell</p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Lucro por modelo</h1>
            <p className="mt-1 text-sm text-slate-500">Pesquise um aparelho para ver o resumo. A lista de vendas e os IMEIs ficam ocultos.</p>
          </div>
          <button onClick={() => void carregarRelatorio()} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Atualizar relatório</button>
        </header>

        {erro && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{erro}</div>}

        <section className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <label htmlFor="busca-modelo" className="mb-2 block text-sm font-semibold text-slate-700">Buscar modelo</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="busca-modelo" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex.: iPhone 15 Pro Max, Redmi 15..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
            <button onClick={() => setBusca("")} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium hover:bg-slate-50">Limpar busca</button>
          </div>
          {!busca.trim() && <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Digite o nome de um modelo para mostrar os resultados. Nenhum nome de aparelho aparece antes da pesquisa.</p>}
          {busca.trim() && modelosFiltrados.length === 0 && <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Nenhum modelo encontrado com esse nome no período carregado.</p>}
          {modelosFiltrados.map((modelo) => {
            const custoTexto = custosManuais[modelo.nome] ?? "";
            const custoUnitario = parseDinheiro(custoTexto);
            const custoConfirmado = custoTexto.trim() !== "" && custoUnitario !== null && custoUnitario > 0;
            const custoTotalManual = custoConfirmado ? custoUnitario! * modelo.quantidade : null;
            const lucroManual = custoTotalManual === null ? null : modelo.totalVendido - custoTotalManual;
            const temTaxaPendente = modelo.vendas.some((v) => v.taxa === null);
            return (
              <article key={modelo.nome} className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Modelo encontrado</p><h2 className="mt-1 text-xl font-bold">{modelo.nome}</h2></div>
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-sm text-slate-600">{modelo.quantidade} unidade(s)</span>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Total vendido</p><p className="mt-2 text-lg font-bold">{moeda(modelo.totalVendido)}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Custo total confirmado</p><p className="mt-2 text-lg font-bold">{custoTotalManual === null ? "Pendente" : moeda(custoTotalManual)}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Lucro estimado</p><p className="mt-2 text-lg font-bold">{lucroManual === null || temTaxaPendente ? "Não calculado" : moeda(lucroManual)}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Vendas registradas</p><p className="mt-2 text-lg font-bold">{modelo.vendas.length}</p></div>
                </div>
                <div className="px-5 pb-5">
                  <label className="mb-2 block text-sm font-semibold">Custo médio confirmado por aparelho (R$)</label>
                  <input value={custoTexto} onChange={(e) => setCustosManuais((prev) => ({ ...prev, [modelo.nome]: e.target.value }))} inputMode="decimal" placeholder="Digite o custo correto, ex.: 1.850,00" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:max-w-md" />
                  <p className="mt-2 text-xs leading-5 text-slate-500">Este custo é usado somente nesta tela para uma simulação e ainda não é salvo no banco de dados. O lucro fica oculto se o custo não estiver preenchido ou se houver Taxa pendente.</p>
                  {temTaxaPendente && <p className="mt-2 text-sm font-medium text-amber-700">Há venda(s) sem Taxa. O lucro final do modelo não será exibido até a conferência/fechamento da Taxa.</p>}
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-lg font-bold">Fechar Taxa por período</h2>
          <p className="mt-1 text-sm text-slate-500">A função existente de salvar Taxa foi mantida.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-medium">De<input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
            <label className="text-sm font-medium">Até<input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
            <label className="text-sm font-medium">Taxa<input value={taxa} onChange={(e) => setTaxa(e.target.value)} inputMode="decimal" placeholder="Ex.: 5,25" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
            <div className="flex items-end gap-2"><button onClick={() => void salvarTaxa()} className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Salvar Taxa</button><button onClick={limparFiltro} className="rounded-xl border border-slate-200 px-4 py-3 text-sm hover:bg-slate-50">Limpar</button></div>
          </div>
        </section>
      </div>
    </main>
  );
}
