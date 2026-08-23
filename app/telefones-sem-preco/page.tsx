"use client";

import { useEffect, useState } from "react";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  precoVendaUsd: number | null;
  precoVendaBrl: number | null;
  tipoPreco: string | null;
  aparelhos: Aparelho[];
};

export default function TelefonesSemPrecoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [editando, setEditando] =
    useState<number | null>(null);

  const [salvando, setSalvando] =
    useState<number | null>(null);

  const [tipoPreco, setTipoPreco] =
    useState<
      Record<number, "USD" | "BRL">
    >({});

  const [precos, setPrecos] =
    useState<Record<number, string>>({});

  // =====================================================
  // CARREGAR
  // =====================================================

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro("");

      const response = await fetch(
        "/api/telefones-sem-preco",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao carregar telefones."
        );
      }

      const lista: Produto[] =
        Array.isArray(data) ? data : [];

      setProdutos(lista);

      // Preencher os campos com os preços atuais
      const novosTipos: Record<
        number,
        "USD" | "BRL"
      > = {};

      const novosPrecos: Record<
        number,
        string
      > = {};

      lista.forEach((produto) => {
        if (produto.tipoPreco === "USD") {
          novosTipos[produto.id] = "USD";

          novosPrecos[produto.id] =
            String(
              produto.precoVendaUsd ?? ""
            );
        }

        if (produto.tipoPreco === "BRL") {
          novosTipos[produto.id] = "BRL";

          novosPrecos[produto.id] =
            String(
              produto.precoVendaBrl ?? ""
            );
        }
      });

      setTipoPreco(novosTipos);
      setPrecos(novosPrecos);
    } catch (error) {
      console.error(error);

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar telefones."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  // =====================================================
  // SALVAR PREÇO
  // =====================================================

  async function salvarPreco(
    produtoId: number
  ) {
    const tipo =
      tipoPreco[produtoId] || "BRL";

    const preco =
      precos[produtoId] || "";

    const numero = Number(
      String(preco).replace(",", ".")
    );

    if (
      !Number.isFinite(numero) ||
      numero <= 0
    ) {
      alert(
        "Informe um preço válido."
      );
      return;
    }

    try {
      setSalvando(produtoId);

      const response = await fetch(
        "/api/telefones-sem-preco",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            produtoId,
            tipoPreco: tipo,
            preco: numero,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao salvar preço."
        );
      }

      alert(
        "Preço salvo com sucesso!"
      );

      setEditando(null);

      await carregarProdutos();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao salvar preço."
      );
    } finally {
      setSalvando(null);
    }
  }

  // =====================================================
  // FORMATAR
  // =====================================================

  function moeda(
    valor: number,
    moeda: "BRL" | "USD"
  ) {
    return Number(
      valor || 0
    ).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: moeda,
      }
    );
  }

  // =====================================================
  // SEPARAR
  // =====================================================

  const semPreco = produtos.filter(
    (produto) =>
      produto.precoVendaUsd === null &&
      produto.precoVendaBrl === null
  );

  const comPreco = produtos.filter(
    (produto) =>
      produto.precoVendaUsd !== null ||
      produto.precoVendaBrl !== null
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-gray-600">
              Carregando telefones...
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
      <div className="mx-auto max-w-6xl">

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📱 Preços dos telefones
              </h1>

              <p className="mt-2 text-gray-500">
                Cadastre e altere os preços
                dos aparelhos.
              </p>
            </div>

            <button
              type="button"
              onClick={carregarProdutos}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              🔄 Atualizar
            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* ERRO */}
        {/* ================================================= */}

        {erro && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {erro}
          </div>
        )}

        {/* ================================================= */}
        {/* SEM PREÇO */}
        {/* ================================================= */}

        <div className="mb-8">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                ⚠️ Telefones sem preço
              </h2>

              <p className="text-sm text-gray-500">
                Produtos que ainda não possuem
                preço de venda.
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800">
              {semPreco.length}
            </span>

          </div>

          {semPreco.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <div className="text-4xl">
                ✅
              </div>

              <p className="mt-3 font-semibold text-gray-800">
                Todos os telefones estão
                precificados.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {semPreco.map(
                (produto) => (
                  <div
                    key={produto.id}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                  >

                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          📱 {produto.nome}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {produto.aparelhos.filter(
                            (a) =>
                              !a.vendido
                          ).length}{" "}
                          aparelho(s)
                          disponível(is)
                        </p>
                      </div>

                      <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800">
                        Sem preço
                      </span>

                    </div>

                    <EditarPreco
                      produto={produto}
                      tipo={
                        tipoPreco[
                          produto.id
                        ] || "BRL"
                      }
                      preco={
                        precos[
                          produto.id
                        ] || ""
                      }
                      setTipo={(tipo) =>
                        setTipoPreco(
                          (anterior) => ({
                            ...anterior,
                            [produto.id]:
                              tipo,
                          })
                        )
                      }
                      setPreco={(preco) =>
                        setPrecos(
                          (anterior) => ({
                            ...anterior,
                            [produto.id]:
                              preco,
                          })
                        )
                      }
                      salvar={() =>
                        salvarPreco(
                          produto.id
                        )
                      }
                      salvando={
                        salvando ===
                        produto.id
                      }
                    />

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* COM PREÇO */}
        {/* ================================================= */}

        <div>

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                ✅ Telefones com preço
              </h2>

              <p className="text-sm text-gray-500">
                Aqui você pode consultar ou
                alterar o preço.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {comPreco.length}
            </span>

          </div>

          {comPreco.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <p className="text-gray-500">
                Nenhum telefone com preço
                cadastrado.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {comPreco.map(
                (produto) => {

                  const estaEditando =
                    editando ===
                    produto.id;

                  const tipoAtual =
                    produto.tipoPreco ===
                    "USD"
                      ? "USD"
                      : "BRL";

                  const precoAtual =
                    tipoAtual === "USD"
                      ? Number(
                          produto.precoVendaUsd ||
                            0
                        )
                      : Number(
                          produto.precoVendaBrl ||
                            0
                        );

                  const quantidade =
                    produto.aparelhos.filter(
                      (a) =>
                        !a.vendido
                    ).length;

                  return (
                    <div
                      key={produto.id}
                      className="rounded-2xl bg-white p-6 shadow"
                    >

                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            📱 {produto.nome}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Estoque disponível:{" "}
                            <strong>
                              {quantidade}
                            </strong>
                          </p>

                          {!estaEditando && (
                            <div className="mt-3">

                              <span className="rounded-lg bg-gray-100 px-4 py-2 font-bold text-gray-800">
                                {tipoAtual ===
                                "USD"
                                  ? moeda(
                                      precoAtual,
                                      "USD"
                                    )
                                  : moeda(
                                      precoAtual,
                                      "BRL"
                                    )}
                              </span>

                              <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                {tipoAtual}
                              </span>

                            </div>
                          )}

                        </div>

                        {!estaEditando && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditando(
                                produto.id
                              );

                              setTipoPreco(
                                (
                                  anterior
                                ) => ({
                                  ...anterior,
                                  [produto.id]:
                                    tipoAtual,
                                })
                              );

                              setPrecos(
                                (
                                  anterior
                                ) => ({
                                  ...anterior,
                                  [produto.id]:
                                    String(
                                      precoAtual
                                    ),
                                })
                              );
                            }}
                            className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                          >
                            ✏️ Editar preço
                          </button>
                        )}

                      </div>

                      {estaEditando && (
                        <div className="mt-6 border-t pt-6">

                          <EditarPreco
                            produto={produto}
                            tipo={
                              tipoPreco[
                                produto.id
                              ] || tipoAtual
                            }
                            preco={
                              precos[
                                produto.id
                              ] || ""
                            }
                            setTipo={(tipo) =>
                              setTipoPreco(
                                (
                                  anterior
                                ) => ({
                                  ...anterior,
                                  [produto.id]:
                                    tipo,
                                })
                              )
                            }
                            setPreco={(preco) =>
                              setPrecos(
                                (
                                  anterior
                                ) => ({
                                  ...anterior,
                                  [produto.id]:
                                    preco,
                                })
                              )
                            }
                            salvar={() =>
                              salvarPreco(
                                produto.id
                              )
                            }
                            salvando={
                              salvando ===
                              produto.id
                            }
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setEditando(
                                null
                              )
                            }
                            className="mt-3 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                          >
                            Cancelar
                          </button>

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}

// =====================================================
// COMPONENTE DE EDIÇÃO
// =====================================================

function EditarPreco({
  produto,
  tipo,
  preco,
  setTipo,
  setPreco,
  salvar,
  salvando,
}: {
  produto: Produto;
  tipo: "USD" | "BRL";
  preco: string;
  setTipo: (
    tipo: "USD" | "BRL"
  ) => void;
  setPreco: (
    preco: string
  ) => void;
  salvar: () => void;
  salvando: boolean;
}) {
  return (
    <div>

      {/* TIPO */}

      <label className="mb-3 block text-sm font-bold text-gray-700">
        Tipo de preço
      </label>

      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          onClick={() =>
            setTipo("USD")
          }
          className={`rounded-xl border-2 px-4 py-4 font-bold ${
            tipo === "USD"
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-gray-200 text-gray-600"
          }`}
        >
          🇺🇸 USD
        </button>

        <button
          type="button"
          onClick={() =>
            setTipo("BRL")
          }
          className={`rounded-xl border-2 px-4 py-4 font-bold ${
            tipo === "BRL"
              ? "border-green-600 bg-green-50 text-green-700"
              : "border-gray-200 text-gray-600"
          }`}
        >
          🇧🇷 BRL
        </button>

      </div>

      {/* PREÇO */}

      <div className="mt-4">

        <label className="mb-2 block text-sm font-bold text-gray-700">
          {tipo === "USD"
            ? "Preço em dólar"
            : "Preço em real"}
        </label>

        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
              {tipo === "USD"
                ? "$"
                : "R$"}
            </span>

            <input
              type="text"
              inputMode="decimal"
              value={preco}
              onChange={(e) =>
                setPreco(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-4 text-lg font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="rounded-xl bg-green-600 px-7 py-4 font-bold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {salvando
              ? "Salvando..."
              : "💾 Salvar preço"}
          </button>

        </div>

        <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          {tipo === "USD"
            ? "USD: a taxa da venda será usada para converter o valor para BRL."
            : "BRL: o valor já está em reais e não usa taxa."}
        </p>

      </div>

    </div>
  );
}