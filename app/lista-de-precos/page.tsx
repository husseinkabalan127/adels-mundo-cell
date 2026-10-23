"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; nome: string; memoria: string; cor: string; preco: string; observacao: string; incluir: boolean; revisar: boolean };
const STORAGE_KEY = "adels_lista_precos_ia_v1";
const idNovo = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
function normalizar(raw: Partial<Item> & { modelo?: string }): Item {
  const nome = String(raw.nome ?? raw.modelo ?? "").trim();
  const preco = raw.preco == null ? "" : String(raw.preco).trim();
  return { id: idNovo(), nome, memoria: String(raw.memoria ?? ""), cor: String(raw.cor ?? ""), preco, observacao: String(raw.observacao ?? ""), incluir: raw.incluir !== false, revisar: Boolean(raw.revisar) || !nome || !preco };
}
export default function ListaDePrecosPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [entrada, setEntrada] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [textoFinal, setTextoFinal] = useState("");

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setItens(JSON.parse(s)); } catch { setErro("Não consegui ler a lista salva neste navegador."); } }, []);
  const textoGerado = useMemo(() => {
    const selecionados = itens.filter(x => x.incluir);
    let out = "*ADEL'S MUNDO CELL*\n*LISTA DE PREÇOS*\n";
    for (const item of selecionados) {
      const detalhes = [item.memoria, item.cor].filter(Boolean).join(" | ");
      out += `\n${item.nome}${detalhes ? ` (${detalhes})` : ""}${item.preco ? ` — R$ ${item.preco}` : ""}${item.observacao ? ` | ${item.observacao}` : ""}`;
    }
    return out.trim();
  }, [itens]);

  async function organizar() {
    setErro(""); setMensagem("");
    if (!entrada.trim() && !imagem) { setErro("Cole o texto da lista ou envie uma imagem."); return; }
    setCarregando(true);
    try {
      const res = await fetch("/api/lista-precos/organizar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ texto: entrada, imagemDataUrl: imagem }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao organizar lista.");
      if (!Array.isArray(data.itens) || !data.itens.length) throw new Error("Não encontrei itens com segurança. Tente uma imagem mais nítida ou cole o texto.");
      const novos = data.itens.map((x: Partial<Item> & { modelo?: string }) => normalizar(x));
      setItens(prev => [...prev, ...novos]); setEntrada(""); setImagem(null); setNomeArquivo("");
      setMensagem(`${novos.length} item(ns) extraído(s). Revise nomes e preços antes de salvar.`);
    } catch (e) { setErro(e instanceof Error ? e.message : "Erro ao organizar lista."); }
    finally { setCarregando(false); }
  }
  async function escolherArquivo(file?: File) {
    setErro(""); setMensagem(""); if (!file) return; setNomeArquivo(file.name);
    if (file.type.startsWith("image/")) {
      const r = new FileReader(); r.onload = () => setImagem(typeof r.result === "string" ? r.result : null); r.onerror = () => setErro("Não consegui ler a imagem."); r.readAsDataURL(file); return;
    }
    if (file.type === "text/plain" || /\.(txt|csv)$/i.test(file.name)) { setEntrada(await file.text()); setImagem(null); return; }
    setErro("Envie PNG/JPG/WebP ou cole o texto extraído do PDF/Excel no campo. Leitura direta de PDF/Excel ainda não está incluída.");
  }
  function salvar() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(itens)); setMensagem("Lista salva neste navegador."); setErro(""); } catch { setErro("Não consegui salvar a lista."); } }
  function editar(id: string, campo: keyof Item, valor: string | boolean) { setItens(prev => prev.map(x => x.id === id ? { ...x, [campo]: valor, revisar: campo === "nome" || campo === "preco" ? false : x.revisar } : x)); }
  function adicionar() { setItens(prev => [...prev, normalizar({ nome: "", preco: "", revisar: true })]); }
  async function copiar() { try { await navigator.clipboard.writeText(textoFinal.trim() || textoGerado); setMensagem("Lista copiada. Agora é só colar no WhatsApp."); setErro(""); } catch { setErro("Não consegui copiar automaticamente; copie a prévia manualmente."); } }
  function whatsapp() { window.open(`https://wa.me/?text=${encodeURIComponent(textoFinal.trim() || textoGerado)}`, "_blank", "noopener,noreferrer"); }

  return <main className="min-h-screen bg-slate-100 p-4 text-slate-800 md:p-8"><div className="mx-auto max-w-6xl space-y-6">
    <header className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700">Adel's Mundo Cell</p><h1 className="mt-2 text-2xl font-bold md:text-3xl">Lista de Preços com IA</h1><p className="mt-1 text-sm text-slate-500">Independente do estoque. Cole texto ou envie uma imagem, revise e prepare para WhatsApp.</p></div><div className="flex flex-wrap gap-2"><button onClick={adicionar} className="rounded-xl border px-4 py-3 text-sm font-semibold">+ Adicionar item</button><button onClick={salvar} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Salvar lista</button></div></header>
    {erro && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{erro}</div>}{mensagem && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{mensagem}</div>}
    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-lg font-bold">1. Envie a lista do fornecedor</h2><p className="mt-1 text-sm text-slate-500">A IA deve preservar nomes e preços da fonte. Não deve inventar dados; confira tudo antes de usar.</p><textarea value={entrada} onChange={e => setEntrada(e.target.value)} rows={7} placeholder="Cole aqui o texto como chegou do fornecedor..." className="mt-4 w-full rounded-xl border p-4 font-mono text-sm leading-6"/><div className="mt-3 flex flex-wrap items-center gap-3"><input type="file" accept="image/png,image/jpeg,image/webp,text/plain,.txt,.csv" onChange={e => void escolherArquivo(e.target.files?.[0])} className="block max-w-full text-sm"/>{nomeArquivo && <span className="text-xs text-slate-500">{nomeArquivo}</span>}<button disabled={carregando} onClick={() => void organizar()} className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{carregando ? "Organizando com IA..." : "Organizar com IA"}</button></div>{imagem && <img src={imagem} alt="Prévia da imagem enviada" className="mt-4 max-h-72 rounded-xl border object-contain"/>}<p className="mt-3 text-xs text-slate-500">PDF/Excel direto ainda não está incluído; copie o texto desses arquivos e cole acima.</p></section>
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-5"><div><h2 className="font-bold">2. Revise os itens</h2><p className="mt-1 text-sm text-slate-500">{itens.length} item(ns). Nenhum dado de estoque ou produto é consultado ou alterado.</p></div><button onClick={() => setItens(prev => prev.map(x => ({ ...x, incluir: true })))} className="rounded-lg border px-3 py-2 text-sm">Selecionar todos</button></div>{!itens.length ? <p className="p-8 text-center text-slate-500">Cole uma lista e clique em “Organizar com IA”.</p> : <div className="divide-y">{itens.map(item => <div key={item.id} className="grid gap-3 p-4 md:grid-cols-[auto_minmax(0,1.2fr)_minmax(90px,.6fr)_minmax(90px,.6fr)_minmax(110px,.6fr)_auto] md:items-end"><label className="flex items-center gap-2 pb-2 text-sm"><input type="checkbox" checked={item.incluir} onChange={e => editar(item.id,"incluir",e.target.checked)}/>Enviar</label><label className="text-xs font-semibold text-slate-500">Nome/modelo<input value={item.nome} onChange={e => editar(item.id,"nome",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="Nome original"/></label><label className="text-xs font-semibold text-slate-500">Memória<input value={item.memoria} onChange={e => editar(item.id,"memoria",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="128 GB"/></label><label className="text-xs font-semibold text-slate-500">Cor<input value={item.cor} onChange={e => editar(item.id,"cor",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="Cor"/></label><label className="text-xs font-semibold text-slate-500">Preço (R$)<input value={item.preco} onChange={e => editar(item.id,"preco",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="1.299,90"/></label><button onClick={() => setItens(prev => prev.filter(x => x.id !== item.id))} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600">Excluir</button>{item.revisar && <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-800 md:col-span-6">Revisar: nome ou preço ausente/incerto. Confirme antes de enviar.</p>}<label className="text-xs font-semibold text-slate-500 md:col-span-6">Observação<input value={item.observacao} onChange={e => editar(item.id,"observacao",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm" placeholder="Observação opcional"/></label></div>)}</div>}</section>
    <section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">3. Prévia para WhatsApp</h2><p className="mt-1 text-sm text-slate-500">Você pode editar o texto final antes de copiar.</p></div><div className="flex gap-2"><button onClick={() => void copiar()} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Copiar lista</button><button onClick={whatsapp} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white">Abrir WhatsApp</button></div></div><textarea value={textoFinal} onChange={e => setTextoFinal(e.target.value)} placeholder={textoGerado} rows={12} className="mt-4 w-full rounded-xl border bg-slate-50 p-4 font-mono text-sm leading-6"/><p className="mt-2 text-xs text-slate-500">Se deixar vazio, será usada a prévia gerada automaticamente. A lista fica salva neste navegador, não sincroniza automaticamente entre computadores.</p></section>
  </div></main>;
}
