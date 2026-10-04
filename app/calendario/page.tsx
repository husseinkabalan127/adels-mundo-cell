"use client";

import { useEffect, useMemo, useState } from "react";

type Evento = {
  id: string;
  tipo: "COMPRA" | "VENDA" | "ASSISTENCIA";
  titulo: string;
  data: string;
  descricao?: string;
  fornecedor?: string | null;
  cliente?: string | null;
  quantidade?: number;
  moeda?: string | null;
  preco?: number | null;
  valor?: number | null;
  status?: string;
  custo?: number;
  produto?: string;
  imei?: string | null;
  movimento?: "ENTRADA" | "SAIDA";
  vendaId?: number;
  loteId?: number;
  assistenciaId?: number;
  aparelhos?: Array<{
    id?: number;
    imei: string;
    cor?: string | null;
    memoria?: string | null;
  }>;
  itens?: Array<{
    id: number;
    quantidade: number;
    valorUnitario: number;
    total: number;
    produto: {
      id: number;
      nome: string;
    };
    aparelhos?: Array<{
      imei: string;
      cor?: string | null;
      memoria?: string | null;
    }>;
  }>;
};

type CalendarioResponse = {
  month: string;
  eventos: Evento[];
  resumo: {
    compras: number;
    vendas: number;
    assistencias: number;
  };
};

function formatarMoeda(
  valor: number | null | undefined,
  moeda?: string | null
) {
  if (valor === null || valor === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: moeda === "USD" ? "USD" : "BRL",
  }).format(valor);
}

function formatarData(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(data));
}

function obterMesAtual() {
  const agora = new Date();

  return `${agora.getFullYear()}-${String(
    agora.getMonth() + 1
  ).padStart(2, "0")}`;
}

function alterarMes(mes: string, quantidade: number) {
  const [ano, mesNumero] = mes
    .split("-")
    .map(Number);

  const data = new Date(
    ano,
    mesNumero - 1 + quantidade,
    1
  );

  return `${data.getFullYear()}-${String(
    data.getMonth() + 1
  ).padStart(2, "0")}`;
}

function nomeMes(mes: string) {
  const [ano, mesNumero] = mes
    .split("-")
    .map(Number);

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(ano, mesNumero - 1, 1));
}

function obterDiasDoMes(mes: string) {
  const [ano, mesNumero] = mes
    .split("-")
    .map(Number);

  const primeiroDia = new Date(
    ano,
    mesNumero - 1,
    1
  );

  const ultimoDia = new Date(
    ano,
    mesNumero,
    0
  );

  // Domingo = 0
  const primeiroDiaSemana =
    primeiroDia.getDay();

  const totalDias =
    ultimoDia.getDate();

  const dias: Array<number | null> = [];

  for (
    let i = 0;
    i < primeiroDiaSemana;
    i++
  ) {
    dias.push(null);
  }

  for (
    let dia = 1;
    dia <= totalDias;
    dia++
  ) {
    dias.push(dia);
  }

  while (dias.length % 7 !== 0) {
    dias.push(null);
  }

  return dias;
}

function dataEventoLocal(data: string) {
  const d = new Date(data);

  return {
    ano: d.getFullYear(),
    mes: d.getMonth() + 1,
    dia: d.getDate(),
  };
}

function obterDataHoje() {
  const agora = new Date();

  return `${agora.getFullYear()}-${String(
    agora.getMonth() + 1
  ).padStart(2, "0")}-${String(
    agora.getDate()
  ).padStart(2, "0")}`;
}

function obterChaveDia(
  mes: string,
  dia: number
) {
  return `${mes}-${String(dia).padStart(2, "0")}`;
}

export default function CalendarioPage() {
  const [mes, setMes] =
    useState(obterMesAtual());

  const [dados, setDados] =
    useState<CalendarioResponse | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  const [diaSelecionado, setDiaSelecionado] =
    useState<string | null>(null);

  const [eventoSelecionado, setEventoSelecionado] =
    useState<Evento | null>(null);

  async function carregarCalendario() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch(
        `/api/calendario?month=${mes}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao carregar calendário."
        );
      }

      setDados(data);
    } catch (error) {
      console.error(error);

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar calendário."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCalendario();
  }, [mes]);

  const dias = useMemo(
    () => obterDiasDoMes(mes),
    [mes]
  );

  const eventos = dados?.eventos || [];

  const eventosPorDia = useMemo(() => {
    const mapa: Record<string, Evento[]> = {};

    for (const evento of eventos) {
      const data = dataEventoLocal(
        evento.data
      );

      const chave = `${data.ano}-${String(
        data.mes
      ).padStart(2, "0")}-${String(
        data.dia
      ).padStart(2, "0")}`;

      if (!mapa[chave]) {
        mapa[chave] = [];
      }

      mapa[chave].push(evento);
    }

    return mapa;
  }, [eventos]);

  const eventosDoDia = diaSelecionado
    ? eventosPorDia[diaSelecionado] || []
    : [];

  const hoje = obterDataHoje();

  function selecionarDia(dia: number) {
    const chave = obterChaveDia(
      mes,
      dia
    );

    setDiaSelecionado(chave);
    setEventoSelecionado(null);
  }

  function voltarParaHoje() {
    const hojeMes = obterMesAtual();

    setMes(hojeMes);
    setDiaSelecionado(obterDataHoje());
    setEventoSelecionado(null);
  }

  return (
    <div className="p-6">
      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            📅 Calendário
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Visualize compras, vendas e
            assistências por data
          </p>
        </div>

        <button
          type="button"
          onClick={voltarParaHoje}
          className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          📍 Hoje
        </button>
      </div>

      {/* =====================================================
          RESUMO
      ====================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-2xl">
              🛒
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Compras
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {dados?.resumo.compras ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-2xl">
              💰
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Vendas
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {dados?.resumo.vendas ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 p-3 text-2xl">
              🔧
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Assistências
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {dados?.resumo.assistencias ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CALENDÁRIO
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* CABEÇALHO DO MÊS */}

        <div className="flex items-center justify-between border-b bg-gray-50 px-5 py-4">
          <button
            type="button"
            onClick={() =>
              setMes(alterarMes(mes, -1))
            }
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100"
          >
            ←
          </button>

          <h3 className="text-xl font-bold capitalize text-gray-900">
            {nomeMes(mes)}
          </h3>

          <button
            type="button"
            onClick={() =>
              setMes(alterarMes(mes, 1))
            }
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-100"
          >
            →
          </button>
        </div>

        {/* DIAS DA SEMANA */}

        <div className="grid grid-cols-7 border-b bg-gray-100">
          {[
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
          ].map((dia) => (
            <div
              key={dia}
              className="border-r px-2 py-3 text-center text-xs font-bold text-gray-600 last:border-r-0 sm:text-sm"
            >
              {dia}
            </div>
          ))}
        </div>

        {/* GRID */}

        {carregando ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <div className="text-4xl">
                📅
              </div>

              <p className="mt-3 font-semibold text-gray-700">
                Carregando calendário...
              </p>
            </div>
          </div>
        ) : erro ? (
          <div className="flex min-h-[500px] items-center justify-center p-6">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <div className="text-4xl">
                ⚠️
              </div>

              <p className="mt-3 font-semibold text-red-700">
                {erro}
              </p>

              <button
                type="button"
                onClick={carregarCalendario}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {dias.map((dia, index) => {
              if (dia === null) {
                return (
                  <div
                    key={`vazio-${index}`}
                    className="min-h-[120px] border-b border-r bg-gray-50"
                  />
                );
              }

              const chave = obterChaveDia(
                mes,
                dia
              );

              const eventosDia =
                eventosPorDia[chave] || [];

              const selecionado =
                diaSelecionado === chave;

              const ehHoje =
                hoje === chave;

              const compras = eventosDia.filter(
                (e) => e.tipo === "COMPRA"
              );

              const vendas = eventosDia.filter(
                (e) => e.tipo === "VENDA"
              );

              const assistencias =
                eventosDia.filter(
                  (e) => e.tipo === "ASSISTENCIA"
                );

              return (
                <button
                  key={chave}
                  type="button"
                  onClick={() =>
                    selecionarDia(dia)
                  }
                  className={`min-h-[120px] border-b border-r p-2 text-left align-top transition hover:bg-gray-50 ${
                    selecionado
                      ? "bg-gray-100 ring-2 ring-inset ring-gray-500"
                      : ""
                  }`}
                >
                  {/* NÚMERO */}

                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        ehHoje
                          ? "bg-gray-900 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {dia}
                    </span>

                    {eventosDia.length > 0 && (
                      <span className="text-xs font-semibold text-gray-500">
                        {eventosDia.length}
                      </span>
                    )}
                  </div>

                  {/* EVENTOS */}

                  <div className="space-y-1">
                    {compras.length > 0 && (
                      <div className="truncate rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                        🛒 {compras.length}{" "}
                        {compras.length === 1
                          ? "compra"
                          : "compras"}
                      </div>
                    )}

                    {vendas.length > 0 && (
                      <div className="truncate rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                        💰 {vendas.length}{" "}
                        {vendas.length === 1
                          ? "venda"
                          : "vendas"}
                      </div>
                    )}

                    {assistencias.length > 0 && (
                      <div className="truncate rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
                        🔧{" "}
                        {assistencias.length}{" "}
                        {assistencias.length === 1
                          ? "assistência"
                          : "assistências"}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          DETALHES DO DIA
      ====================================================== */}

      {diaSelecionado && (
        <div className="mt-6 rounded-2xl border bg-white shadow-sm">
          <div className="border-b bg-gray-50 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  📅 Detalhes do dia
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {new Intl.DateTimeFormat(
                    "pt-BR",
                    {
                      dateStyle: "full",
                    }
                  ).format(
                    new Date(
                      `${diaSelecionado}T12:00:00`
                    )
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDiaSelecionado(null)
                }
                className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            {eventosDoDia.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-4xl">
                  📭
                </div>

                <p className="mt-3 font-semibold text-gray-700">
                  Nenhum evento neste dia
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Não há compras, vendas ou
                  assistências registradas.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {eventosDoDia.map((evento) => (
                  <button
                    key={evento.id}
                    type="button"
                    onClick={() =>
                      setEventoSelecionado(
                        evento
                      )
                    }
                    className="w-full rounded-xl border bg-white p-4 text-left shadow-sm transition hover:bg-gray-50"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-xl p-3 text-xl ${
                            evento.tipo ===
                            "COMPRA"
                              ? "bg-blue-50"
                              : evento.tipo ===
                                  "VENDA"
                                ? "bg-green-50"
                                : "bg-orange-50"
                          }`}
                        >
                          {evento.tipo ===
                          "COMPRA"
                            ? "🛒"
                            : evento.tipo ===
                                "VENDA"
                              ? "💰"
                              : "🔧"}
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">
                            {evento.titulo}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {evento.descricao}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatarData(
                              evento.data
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="text-left md:text-right">
                        {evento.tipo ===
                          "COMPRA" && (
                          <>
                            <p className="text-sm font-semibold text-blue-700">
                              Compra
                            </p>

                            {evento.preco !==
                              null &&
                              evento.preco !==
                                undefined && (
                                <p className="mt-1 font-bold text-gray-900">
                                  {formatarMoeda(
                                    evento.preco,
                                    evento.moeda
                                  )}
                                </p>
                              )}
                          </>
                        )}

                        {evento.tipo ===
                          "VENDA" && (
                          <>
                            <p className="text-sm font-semibold text-green-700">
                              Venda
                            </p>

                            {evento.valor !==
                              null &&
                              evento.valor !==
                                undefined && (
                                <p className="mt-1 font-bold text-gray-900">
                                  {formatarMoeda(
                                    evento.valor,
                                    "BRL"
                                  )}
                                </p>
                              )}
                          </>
                        )}

                        {evento.tipo ===
                          "ASSISTENCIA" && (
                          <>
                            <p className="text-sm font-semibold text-orange-700">
                              {evento.movimento ===
                              "SAIDA"
                                ? "Saída"
                                : "Entrada"}
                            </p>

                            <p className="mt-1 font-bold text-gray-900">
                              {formatarMoeda(
                                evento.custo,
                                "BRL"
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL DETALHE
      ====================================================== */}

      {eventoSelecionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {eventoSelecionado.tipo ===
                    "COMPRA"
                    ? "🛒 Detalhes da Compra"
                    : eventoSelecionado.tipo ===
                        "VENDA"
                      ? "💰 Detalhes da Venda"
                      : "🔧 Detalhes da Assistência"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {formatarData(
                    eventoSelecionado.data
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEventoSelecionado(null)
                }
                className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 p-6">
              {/* COMPRA */}

              {eventoSelecionado.tipo ===
                "COMPRA" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Produto
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {eventoSelecionado.titulo}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Fornecedor
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {eventoSelecionado.fornecedor ||
                          "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Quantidade
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {eventoSelecionado.quantidade ??
                          0}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Preço de compra
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {formatarMoeda(
                          eventoSelecionado.preco,
                          eventoSelecionado.moeda
                        )}
                      </p>
                    </div>
                  </div>

                  {eventoSelecionado.aparelhos &&
                    eventoSelecionado.aparelhos
                      .length > 0 && (
                      <div>
                        <h4 className="mb-3 font-bold text-gray-900">
                          📱 Aparelhos
                        </h4>

                        <div className="overflow-x-auto rounded-xl border">
                          <table className="w-full min-w-[600px]">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm">
                                  IMEI
                                </th>

                                <th className="px-4 py-3 text-left text-sm">
                                  Cor
                                </th>

                                <th className="px-4 py-3 text-left text-sm">
                                  Memória
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {eventoSelecionado.aparelhos.map(
                                (aparelho) => (
                                  <tr
                                    key={
                                      aparelho.imei
                                    }
                                    className="border-t"
                                  >
                                    <td className="px-4 py-3 font-mono text-sm">
                                      {
                                        aparelho.imei
                                      }
                                    </td>

                                    <td className="px-4 py-3 text-sm">
                                      {aparelho.cor ||
                                        "—"}
                                    </td>

                                    <td className="px-4 py-3 text-sm">
                                      {aparelho.memoria ||
                                        "—"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                </>
              )}

              {/* VENDA */}

              {eventoSelecionado.tipo ===
                "VENDA" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Cliente
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {eventoSelecionado.cliente ||
                          "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Quantidade
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {eventoSelecionado.quantidade ??
                          0}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                      <p className="text-xs text-gray-500">
                        Valor da venda
                      </p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        {formatarMoeda(
                          eventoSelecionado.valor,
                          "BRL"
                        )}
                      </p>
                    </div>
                  </div>

                  {eventoSelecionado.itens &&
                    eventoSelecionado.itens
                      .length > 0 && (
                      <div>
                        <h4 className="mb-3 font-bold text-gray-900">
                          📱 Produtos vendidos
                        </h4>

                        <div className="space-y-3">
                          {eventoSelecionado.itens.map(
                            (item) => (
                              <div
                                key={item.id}
                                className="rounded-xl border p-4"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <p className="font-bold text-gray-900">
                                      {
                                        item.produto
                                          .nome
                                      }
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      Quantidade:{" "}
                                      {
                                        item.quantidade
                                      }
                                    </p>
                                  </div>

                                  <p className="font-bold text-gray-900">
                                    {formatarMoeda(
                                      item.total,
                                      "BRL"
                                    )}
                                  </p>
                                </div>

                                {item.aparelhos &&
                                  item.aparelhos
                                    .length >
                                    0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {item.aparelhos.map(
                                        (
                                          aparelho
                                        ) => (
                                          <span
                                            key={
                                              aparelho.imei
                                            }
                                            className="rounded-lg bg-gray-100 px-3 py-2 font-mono text-xs text-gray-700"
                                          >
                                            {
                                              aparelho.imei
                                            }
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </>
              )}

              {/* ASSISTÊNCIA */}

              {eventoSelecionado.tipo ===
                "ASSISTENCIA" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Cliente
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {eventoSelecionado.titulo}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Status
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {eventoSelecionado.status ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      Produto
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {eventoSelecionado.produto ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">
                      IMEI
                    </p>

                    <p className="mt-1 font-mono text-sm font-bold text-gray-900">
                      {eventoSelecionado.imei ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                    <p className="text-xs text-gray-500">
                      Problema
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {eventoSelecionado.descricao ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                    <p className="text-xs text-gray-500">
                      Custo
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {formatarMoeda(
                        eventoSelecionado.custo,
                        "BRL"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setEventoSelecionado(null)
                }
                className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}