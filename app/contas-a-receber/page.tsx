"use client";

import { useEffect, useState } from "react";

type Pagamento = {
  id: number;
  valor: number;
  desconto: number;
  forma: string | null;
  observacao: string | null;
  createdAt: string;
};

type Conta = {
  id: number;
  cliente: string;
  dataVenda: string;
  createdAt?: string;

  total: number;
  pago: number;
  desconto: number;
  restante: number;

  estadoFatura: string | null;
  formaPagamento: string | null;

  pagamentos: Pagamento[];

  itens?: any[];
};

type Filtro = "pendentes" | "quitadas" | "todas";

export default function ContasAReceberPage() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [filtro, setFiltro] =
    useState<Filtro>("pendentes");

  const [contaSelecionada, setContaSelecionada] =
    useState<Conta | null>(null);

  const [contaDetalhes, setContaDetalhes] =
    useState<Conta | null>(null);

  const [valorPago, setValorPago] =
    useState("");

  const [desconto, setDesconto] =
    useState("");

  const [formaPagamento, setFormaPagamento] =
    useState("Dinheiro");

  const [observacao, setObservacao] =
    useState("");

  const [salvando, setSalvando] =
    useState(false);

  // =====================================================
  // MOEDA
  // =====================================================

  function moeda(valor: number) {
    return Number(valor || 0).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  function dataFormatada(data: string) {
    if (!data) return "-";

    return new Date(data).toLocaleDateString(
      "pt-BR"
    );
  }

  function dataHoraFormatada(data: string) {
    if (!data) return "-";

    return new Date(data).toLocaleString(
      "pt-BR"
    );
  }

  // =====================================================
  // BUSCAR CONTAS
  // =====================================================

  async function carregarContas() {
    try {
      setLoading(true);
      setErro("");

      const response = await fetch(
        "/api/contas-a-receber",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao carregar contas."
        );
      }

      setContas(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(error);

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar contas."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // CARREGAR
  // =====================================================

  useEffect(() => {
    carregarContas();
  }, []);

  // =====================================================
  // CLASSIFICAR CONTA
  // =====================================================

  function isQuitada(conta: Conta) {
    return (
      Number(conta.restante || 0) <=
      0.009
    );
  }

  function isPendente(conta: Conta) {
    return (
      Number(conta.restante || 0) >
      0.009
    );
  }

  // =====================================================
  // FILTRO
  // =====================================================

  const contasFiltradas =
    contas.filter((conta) => {
      if (filtro === "quitadas") {
        return isQuitada(conta);
      }

      if (filtro === "pendentes") {
        return isPendente(conta);
      }

      return true;
    });

  // =====================================================
  // CONTADORES
  // =====================================================

  const contasPendentes =
    contas.filter(isPendente);

  const contasQuitadas =
    contas.filter(isQuitada);

  const totalEmAberto =
    contasPendentes.reduce(
      (soma, conta) =>
        soma +
        Number(
          conta.restante || 0
        ),
      0
    );

  const totalRecebido =
    contas.reduce(
      (soma, conta) =>
        soma +
        Number(
          conta.pago || 0
        ),
      0
    );

  const totalDescontos =
    contas.reduce(
      (soma, conta) =>
        soma +
        Number(
          conta.desconto || 0
        ),
      0
    );

  // =====================================================
  // ABRIR PAGAMENTO
  // =====================================================

  function abrirPagamento(conta: Conta) {
    setContaSelecionada(conta);

    setValorPago("");
    setDesconto("");
    setFormaPagamento(
      "Dinheiro"
    );
    setObservacao("");
  }

  // =====================================================
  // FECHAR PAGAMENTO
  // =====================================================

  function fecharPagamento() {
    if (salvando) return;

    setContaSelecionada(null);

    setValorPago("");
    setDesconto("");
    setObservacao("");
  }

  // =====================================================
  // ABRIR DETALHES
  // =====================================================

  function abrirDetalhes(conta: Conta) {
    setContaDetalhes(conta);
  }

  // =====================================================
  // FECHAR DETALHES
  // =====================================================

  function fecharDetalhes() {
    setContaDetalhes(null);
  }

  // =====================================================
  // REGISTRAR PAGAMENTO
  // =====================================================

  async function registrarPagamento() {
    if (!contaSelecionada) return;

    const valor =
      Number(
        String(
          valorPago
        ).replace(",", ".")
      ) || 0;

    const desc =
      Number(
        String(
          desconto
        ).replace(",", ".")
      ) || 0;

    if (
      valor <= 0 &&
      desc <= 0
    ) {
      alert(
        "Informe o valor pago ou o desconto."
      );
      return;
    }

    const restante =
      Number(
        contaSelecionada.restante
      ) || 0;

    if (
      valor + desc >
      restante + 0.009
    ) {
      alert(
        `O valor informado é maior que o restante da dívida.\n\nRestante: ${moeda(
          restante
        )}`
      );

      return;
    }

    try {
      setSalvando(true);

      const response =
        await fetch(
          "/api/contas-a-receber",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              vendaId:
                contaSelecionada.id,

              valor,

              desconto: desc,

              forma:
                formaPagamento,

              observacao:
                observacao.trim() ||
                null,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao registrar pagamento."
        );
      }

      alert(
        data?.message ||
          "Pagamento registrado com sucesso!"
      );

      fecharPagamento();

      await carregarContas();

      // Se estava olhando Quitadas,
      // continua mostrando Quitadas.
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao registrar pagamento."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // NOVO RESTANTE
  // =====================================================

  const valorPagoPreview =
    Number(
      String(
        valorPago
      ).replace(",", ".")
    ) || 0;

  const descontoPreview =
    Number(
      String(
        desconto
      ).replace(",", ".")
    ) || 0;

  const novoRestante =
    contaSelecionada
      ? Math.max(
          0,
          Number(
            contaSelecionada.restante
          ) -
            valorPagoPreview -
            descontoPreview
        )
      : 0;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contas a Receber
            </h1>

            <p className="mt-1 text-gray-600">
              Controle de pagamentos,
              valores pendentes e contas
              quitadas.
            </p>
          </div>

          <button
            onClick={carregarContas}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Atualizando..."
              : "Atualizar"}
          </button>

        </div>

        {/* ================================================= */}
        {/* RESUMO */}
        {/* ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">

          {/* PENDENTES */}

          <button
            onClick={() =>
              setFiltro("pendentes")
            }
            className={`rounded-xl p-5 text-left shadow-sm transition ${
              filtro === "pendentes"
                ? "bg-red-50 ring-2 ring-red-500"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Contas pendentes
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {contasPendentes.length}
            </p>

            <p className="mt-1 text-sm text-red-500">
              {moeda(totalEmAberto)}
            </p>
          </button>

          {/* QUITADAS */}

          <button
            onClick={() =>
              setFiltro("quitadas")
            }
            className={`rounded-xl p-5 text-left shadow-sm transition ${
              filtro === "quitadas"
                ? "bg-green-50 ring-2 ring-green-500"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Contas quitadas
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {contasQuitadas.length}
            </p>

            <p className="mt-1 text-sm text-green-600">
              Pagamentos concluídos
            </p>
          </button>

          {/* TODAS */}

          <button
            onClick={() =>
              setFiltro("todas")
            }
            className={`rounded-xl p-5 text-left shadow-sm transition ${
              filtro === "todas"
                ? "bg-blue-50 ring-2 ring-blue-500"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Todas as contas
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {contas.length}
            </p>

            <p className="mt-1 text-sm text-blue-500">
              Pendentes + Quitadas
            </p>
          </button>

          {/* TOTAL RECEBIDO */}

          <div className="rounded-xl bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Total recebido
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {moeda(totalRecebido)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Descontos:{" "}
              {moeda(totalDescontos)}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* FILTROS */}
        {/* ================================================= */}

        <div className="mb-5 flex flex-wrap gap-2">

          <button
            onClick={() =>
              setFiltro("pendentes")
            }
            className={`rounded-lg px-5 py-2.5 font-semibold ${
              filtro === "pendentes"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            }`}
          >
            Pendentes ({contasPendentes.length})
          </button>

          <button
            onClick={() =>
              setFiltro("quitadas")
            }
            className={`rounded-lg px-5 py-2.5 font-semibold ${
              filtro === "quitadas"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            }`}
          >
            Quitadas ({contasQuitadas.length})
          </button>

          <button
            onClick={() =>
              setFiltro("todas")
            }
            className={`rounded-lg px-5 py-2.5 font-semibold ${
              filtro === "todas"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            }`}
          >
            Todas ({contas.length})
          </button>

        </div>

        {/* ================================================= */}
        {/* ERRO */}
        {/* ================================================= */}

        {erro && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {erro}
          </div>
        )}

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">
              Carregando contas a receber...
            </p>
          </div>
        )}

        {/* ================================================= */}
        {/* NENHUMA */}
        {/* ================================================= */}

        {!loading &&
          contasFiltradas.length ===
            0 && (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">

              <div className="mb-3 text-5xl">
                {filtro ===
                "quitadas"
                  ? "💰"
                  : "✅"}
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {filtro ===
                "quitadas"
                  ? "Nenhuma conta quitada"
                  : filtro ===
                    "pendentes"
                  ? "Nenhuma conta pendente"
                  : "Nenhuma conta encontrada"}
              </h2>

              <p className="mt-2 text-gray-500">
                {filtro ===
                "quitadas"
                  ? "Ainda não existem contas quitadas."
                  : "Não existem contas para mostrar."}
              </p>

            </div>
          )}

        {/* ================================================= */}
        {/* TABELA */}
        {/* ================================================= */}

        {!loading &&
          contasFiltradas.length >
            0 && (
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                        Cliente
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                        Fatura
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                        Data
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                        Total
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                        Pago
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                        Desconto
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                        Restante
                      </th>

                      <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                        Status
                      </th>

                      <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                        Ação
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {contasFiltradas.map(
                      (conta) => {
                        const quitada =
                          isQuitada(
                            conta
                          );

                        return (
                          <tr
                            key={
                              conta.id
                            }
                            className="hover:bg-gray-50"
                          >

                            {/* CLIENTE */}

                            <td className="px-5 py-4">

                              <div className="font-semibold text-gray-900">
                                {conta.cliente ||
                                  "Cliente não informado"}
                              </div>

                            </td>

                            {/* FATURA */}

                            <td className="px-5 py-4">

                              <span className="font-medium text-gray-700">
                                #{conta.id}
                              </span>

                            </td>

                            {/* DATA */}

                            <td className="px-5 py-4 text-gray-600">
                              {dataFormatada(
                                conta.dataVenda
                              )}
                            </td>

                            {/* TOTAL */}

                            <td className="px-5 py-4 text-right font-medium text-gray-900">
                              {moeda(
                                conta.total
                              )}
                            </td>

                            {/* PAGO */}

                            <td className="px-5 py-4 text-right font-semibold text-green-600">
                              {moeda(
                                conta.pago
                              )}
                            </td>

                            {/* DESCONTO */}

                            <td className="px-5 py-4 text-right font-medium text-purple-600">
                              {moeda(
                                conta.desconto
                              )}
                            </td>

                            {/* RESTANTE */}

                            <td className="px-5 py-4 text-right">

                              <span
                                className={`font-bold ${
                                  quitada
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {moeda(
                                  conta.restante
                                )}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-4 text-center">

                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                  quitada
                                    ? "bg-green-100 text-green-800"
                                    : Number(
                                          conta.pago ||
                                            0
                                        ) >
                                        0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {quitada
                                  ? "Quitado"
                                  : Number(
                                        conta.pago ||
                                          0
                                      ) >
                                      0
                                  ? "Parcial"
                                  : "Em aberto"}
                              </span>

                            </td>

                            {/* AÇÃO */}

                            <td className="px-5 py-4 text-center">

                              <div className="flex justify-center gap-2">

                                {!quitada && (
                                  <button
                                    onClick={() =>
                                      abrirPagamento(
                                        conta
                                      )
                                    }
                                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                                  >
                                    Registrar pagamento
                                  </button>
                                )}

                                <button
                                  onClick={() =>
                                    abrirDetalhes(
                                      conta
                                    )
                                  }
                                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                                >
                                  Ver detalhes
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </div>

      {/* ================================================= */}
      {/* MODAL REGISTRAR PAGAMENTO */}
      {/* ================================================= */}

      {contaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="shrink-0 border-b px-6 py-5">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Registrar pagamento
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Fatura #
                    {contaSelecionada.id}
                    {" — "}
                    {
                      contaSelecionada.cliente
                    }
                  </p>

                </div>

                <button
                  onClick={
                    fecharPagamento
                  }
                  disabled={salvando}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>

            </div>

            {/* CONTEÚDO */}

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">

              {/* RESUMO */}

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-lg bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    {moeda(
                      contaSelecionada.total
                    )}
                  </p>

                </div>

                <div className="rounded-lg bg-green-50 p-4">

                  <p className="text-xs text-green-600">
                    Pago
                  </p>

                  <p className="mt-1 font-bold text-green-600">
                    {moeda(
                      contaSelecionada.pago
                    )}
                  </p>

                </div>

                <div className="rounded-lg bg-red-50 p-4">

                  <p className="text-xs text-red-600">
                    Restante
                  </p>

                  <p className="mt-1 font-bold text-red-600">
                    {moeda(
                      contaSelecionada.restante
                    )}
                  </p>

                </div>

              </div>

              {/* VALOR PAGO */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Valor pago
                </label>

                <input
                  type="text"
                  inputMode="decimal"
                  value={valorPago}
                  onChange={(e) =>
                    setValorPago(
                      e.target.value
                    )
                  }
                  placeholder="R$ 0,00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* DESCONTO */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Desconto
                </label>

                <input
                  type="text"
                  inputMode="decimal"
                  value={desconto}
                  onChange={(e) =>
                    setDesconto(
                      e.target.value
                    )
                  }
                  placeholder="R$ 0,00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Use quando o cliente
                  fechar a conta por um
                  valor menor.
                </p>

              </div>

              {/* FORMA */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Forma de pagamento
                </label>

                <select
                  value={
                    formaPagamento
                  }
                  onChange={(e) =>
                    setFormaPagamento(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >

                  <option value="Dinheiro">
                    Dinheiro
                  </option>

                  <option value="Pix">
                    Pix
                  </option>

                  <option value="Cartão">
                    Cartão
                  </option>

                  <option value="Transferência">
                    Transferência
                  </option>

                  <option value="Outro">
                    Outro
                  </option>

                </select>

              </div>

              {/* OBSERVAÇÃO */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Observação
                </label>

                <textarea
                  value={observacao}
                  onChange={(e) =>
                    setObservacao(
                      e.target.value
                    )
                  }
                  placeholder="Opcional"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* PREVIEW */}

              <div className="rounded-xl bg-gray-900 p-4 text-white">

                <div className="flex justify-between text-sm">

                  <span>
                    Restante atual
                  </span>

                  <span>
                    {moeda(
                      contaSelecionada.restante
                    )}
                  </span>

                </div>

                <div className="mt-2 flex justify-between text-sm">

                  <span>
                    Pagamento
                  </span>

                  <span>
                    {moeda(
                      valorPagoPreview
                    )}
                  </span>

                </div>

                <div className="mt-2 flex justify-between text-sm">

                  <span>
                    Desconto
                  </span>

                  <span>
                    {moeda(
                      descontoPreview
                    )}
                  </span>

                </div>

                <div className="mt-3 border-t border-gray-700 pt-3">

                  <div className="flex justify-between text-lg font-bold">

                    <span>
                      Novo restante
                    </span>

                    <span
                      className={
                        novoRestante <=
                        0.009
                          ? "text-green-400"
                          : "text-white"
                      }
                    >
                      {moeda(
                        novoRestante
                      )}
                    </span>

                  </div>

                  {novoRestante <=
                    0.009 && (
                    <p className="mt-2 text-center text-sm font-semibold text-green-400">
                      ✓ Conta será quitada
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* BOTÕES */}

            <div className="flex shrink-0 gap-3 border-t bg-white px-6 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.08)]">

              <button
                onClick={
                  fecharPagamento
                }
                disabled={salvando}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={
                  registrarPagamento
                }
                disabled={salvando}
                className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {salvando
                  ? "Salvando..."
                  : "Confirmar pagamento"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* MODAL DETALHES */}
      {/* ================================================= */}

      {contaDetalhes && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">

          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="shrink-0 border-b px-6 py-5">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Detalhes da conta
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Fatura #
                    {contaDetalhes.id}
                    {" — "}
                    {
                      contaDetalhes.cliente
                    }
                  </p>

                </div>

                <button
                  onClick={
                    fecharDetalhes
                  }
                  className="text-3xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>

            </div>

            {/* CONTEÚDO */}

            <div className="min-h-0 flex-1 overflow-y-auto p-6">

              {/* RESUMO */}

              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-500">
                    Total
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {moeda(
                      contaDetalhes.total
                    )}
                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                  <p className="text-xs text-green-600">
                    Total pago
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-600">
                    {moeda(
                      contaDetalhes.pago
                    )}
                  </p>

                </div>

                <div className="rounded-xl bg-purple-50 p-4">

                  <p className="text-xs text-purple-600">
                    Desconto
                  </p>

                  <p className="mt-1 text-lg font-bold text-purple-600">
                    {moeda(
                      contaDetalhes.desconto
                    )}
                  </p>

                </div>

                <div className="rounded-xl bg-green-100 p-4">

                  <p className="text-xs text-green-700">
                    Restante
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-700">
                    {moeda(
                      contaDetalhes.restante
                    )}
                  </p>

                </div>

              </div>

              {/* STATUS */}

              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-green-700">
                      Status da conta
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-800">
                      {isQuitada(
                        contaDetalhes
                      )
                        ? "Quitado ✓"
                        : "Parcial"}
                    </p>

                  </div>

                  {contaDetalhes.formaPagamento && (
                    <div className="text-right">

                      <p className="text-xs text-green-600">
                        Forma de pagamento
                      </p>

                      <p className="font-bold text-green-800">
                        {
                          contaDetalhes.formaPagamento
                        }
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* HISTÓRICO */}

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-gray-900">
                      Histórico de pagamentos
                    </h3>

                    <p className="text-sm text-gray-500">
                      Todas as movimentações
                      desta conta.
                    </p>

                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                    {
                      contaDetalhes
                        .pagamentos
                        ?.length || 0
                    }{" "}
                    pagamento(s)
                  </span>

                </div>

                {(!contaDetalhes
                  .pagamentos ||
                  contaDetalhes
                    .pagamentos
                    .length ===
                    0) && (
                  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">

                    <div className="text-4xl">
                      💳
                    </div>

                    <p className="mt-2 font-semibold text-gray-700">
                      Nenhum pagamento registrado
                    </p>

                  </div>
                )}

                {contaDetalhes
                  .pagamentos &&
                  contaDetalhes
                    .pagamentos
                    .length >
                    0 && (
                    <div className="overflow-hidden rounded-xl border border-gray-200">

                      <div className="overflow-x-auto">

                        <table className="w-full min-w-[750px]">

                          <thead className="bg-gray-50">

                            <tr>

                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Data
                              </th>

                              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                Pagamento
                              </th>

                              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                Desconto
                              </th>

                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Forma
                              </th>

                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Observação
                              </th>

                            </tr>

                          </thead>

                          <tbody className="divide-y divide-gray-100">

                            {contaDetalhes.pagamentos.map(
                              (
                                pagamento
                              ) => (
                                <tr
                                  key={
                                    pagamento.id
                                  }
                                  className="hover:bg-gray-50"
                                >

                                  <td className="px-4 py-4 text-sm text-gray-600">
                                    {dataHoraFormatada(
                                      pagamento.createdAt
                                    )}
                                  </td>

                                  <td className="px-4 py-4 text-right font-bold text-green-600">
                                    {moeda(
                                      pagamento.valor
                                    )}
                                  </td>

                                  <td className="px-4 py-4 text-right font-semibold text-purple-600">
                                    {moeda(
                                      pagamento.desconto
                                    )}
                                  </td>

                                  <td className="px-4 py-4">

                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                                      {pagamento.forma ||
                                        "Não informado"}
                                    </span>

                                  </td>

                                  <td className="max-w-[220px] px-4 py-4 text-sm text-gray-600">
                                    {pagamento.observacao ||
                                      "-"}
                                  </td>

                                </tr>
                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>
                  )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex shrink-0 justify-end gap-3 border-t bg-white px-6 py-4">

              {!isQuitada(
                contaDetalhes
              ) && (
                <button
                  onClick={() => {
                    const conta =
                      contaDetalhes;

                    fecharDetalhes();

                    abrirPagamento(
                      conta
                    );
                  }}
                  className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Registrar pagamento
                </button>
              )}

              <button
                onClick={
                  fecharDetalhes
                }
                className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Fechar
              </button>

            </div>

          </div>

        </div>
      )}
    </main>
  );
}