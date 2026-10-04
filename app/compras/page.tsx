"use client";

import { useEffect, useState } from "react";

type Fornecedor = {
  id: string;
  nome: string;
  telefone: string;
  documento: string;
};

type ItemCompra = {
  modelo: string;
  cor: string;
  quantidade: number;
  precoCompraUsd: string;
  imeis: string[];
};

const CORES = [
  "Preto",
  "Branco",
  "Azul",
  "Verde",
  "Rosa",
  "Roxo",
  "Dourado",
  "Prata",
  "Cinza",
  "Natural",
  "Outro",
];

const FORNECEDORES_STORAGE_KEY =
  "adels_mundo_cell_fornecedores";

export default function ComprasPage() {
  // =====================================================
  // FORNECEDORES
  // =====================================================

  const [fornecedores, setFornecedores] =
    useState<Fornecedor[]>([]);

  const [fornecedorId, setFornecedorId] =
    useState("");

  const [mostrarCadastroFornecedor, setMostrarCadastroFornecedor] =
    useState(false);

  const [novoFornecedorNome, setNovoFornecedorNome] =
    useState("");

  const [novoFornecedorTelefone, setNovoFornecedorTelefone] =
    useState("");

  const [novoFornecedorDocumento, setNovoFornecedorDocumento] =
    useState("");

  const [erroFornecedor, setErroFornecedor] =
    useState("");

  // =====================================================
  // COMPRA
  // =====================================================

  const [dataCompra, setDataCompra] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [itens, setItens] = useState<ItemCompra[]>([
    {
      modelo: "",
      cor: "",
      quantidade: 1,
      precoCompraUsd: "",
      imeis: [""],
    },
  ]);

  const [salvando, setSalvando] = useState(false);

  const [mensagem, setMensagem] =
    useState("");

  const [erro, setErro] =
    useState("");

  // =====================================================
  // CARREGAR FORNECEDORES
  // =====================================================

  useEffect(() => {
    try {
      const salvos =
        localStorage.getItem(
          FORNECEDORES_STORAGE_KEY
        );

      if (!salvos) return;

      const lista = JSON.parse(salvos);

      if (Array.isArray(lista)) {
        setFornecedores(lista);
      }
    } catch (error) {
      console.error(
        "Erro ao carregar fornecedores:",
        error
      );
    }
  }, []);

  // =====================================================
  // SALVAR FORNECEDORES
  // =====================================================

  function salvarFornecedores(
    lista: Fornecedor[]
  ) {
    setFornecedores(lista);

    localStorage.setItem(
      FORNECEDORES_STORAGE_KEY,
      JSON.stringify(lista)
    );
  }

  // =====================================================
  // CADASTRAR FORNECEDOR
  // =====================================================

  function cadastrarFornecedor() {
    setErroFornecedor("");

    const nome =
      novoFornecedorNome.trim();

    const telefone =
      novoFornecedorTelefone.trim();

    const documento =
      novoFornecedorDocumento.trim();

    // SOMENTE NOME É OBRIGATÓRIO
    if (!nome) {
      setErroFornecedor(
        "Informe o nome do fornecedor."
      );

      return;
    }

    // Evitar fornecedor com mesmo nome
    const fornecedorExistente =
      fornecedores.find(
        (fornecedor) =>
          fornecedor.nome.toLowerCase() ===
          nome.toLowerCase()
      );

    if (fornecedorExistente) {
      setErroFornecedor(
        "Este fornecedor já está cadastrado."
      );

      setFornecedorId(
        fornecedorExistente.id
      );

      return;
    }

    const novo: Fornecedor = {
      id: crypto.randomUUID(),
      nome,
      telefone,
      documento,
    };

    const novaLista = [
      ...fornecedores,
      novo,
    ];

    salvarFornecedores(novaLista);

    // Selecionar automaticamente o novo fornecedor
    setFornecedorId(novo.id);

    // Limpar formulário
    setNovoFornecedorNome("");
    setNovoFornecedorTelefone("");
    setNovoFornecedorDocumento("");

    setMostrarCadastroFornecedor(false);
  }

  // =====================================================
  // FORNECEDOR SELECIONADO
  // =====================================================

  const fornecedorSelecionado =
    fornecedores.find(
      (fornecedor) =>
        fornecedor.id === fornecedorId
    );

  // =====================================================
  // ADICIONAR ITEM
  // =====================================================

  function adicionarItem() {
    setItens([
      ...itens,
      {
        modelo: "",
        cor: "",
        quantidade: 1,
        precoCompraUsd: "",
        imeis: [""],
      },
    ]);
  }

  // =====================================================
  // REMOVER ITEM
  // =====================================================

  function removerItem(index: number) {
    if (itens.length === 1) return;

    setItens(
      itens.filter(
        (_, i) => i !== index
      )
    );
  }

  // =====================================================
  // ALTERAR ITEM
  // =====================================================

  function alterarItem(
    index: number,
    campo: keyof ItemCompra,
    valor:
      | string
      | number
      | string[]
  ) {
    setItens((atual) =>
      atual.map((item, i) =>
        i === index
          ? {
              ...item,
              [campo]: valor,
            }
          : item
      )
    );
  }

  // =====================================================
  // ALTERAR QUANTIDADE
  // =====================================================

  function alterarQuantidade(
    index: number,
    quantidade: number
  ) {
    const qtd = Math.max(
      1,
      quantidade || 1
    );

    setItens((atual) =>
      atual.map((item, i) => {
        if (i !== index) {
          return item;
        }

        const imeis = [
          ...item.imeis,
        ];

        while (imeis.length < qtd) {
          imeis.push("");
        }

        while (imeis.length > qtd) {
          imeis.pop();
        }

        return {
          ...item,
          quantidade: qtd,
          imeis,
        };
      })
    );
  }

  // =====================================================
  // ALTERAR IMEI
  // =====================================================

  function alterarImei(
    itemIndex: number,
    imeiIndex: number,
    valor: string
  ) {
    setItens((atual) =>
      atual.map((item, i) => {
        if (i !== itemIndex) {
          return item;
        }

        const imeis = [
          ...item.imeis,
        ];

        imeis[imeiIndex] = valor;

        return {
          ...item,
          imeis,
        };
      })
    );
  }

  // =====================================================
  // TOTAL APARELHOS
  // =====================================================

  function totalAparelhos() {
    return itens.reduce(
      (total, item) =>
        total + item.quantidade,
      0
    );
  }

  // =====================================================
  // TOTAL COMPRA USD
  // =====================================================

  function totalCompraUsd() {
    return itens.reduce(
      (total, item) => {
        const preco =
          Number(
            item.precoCompraUsd
          ) || 0;

        return (
          total +
          preco * item.quantidade
        );
      },
      0
    );
  }

  // =====================================================
  // SALVAR COMPRA
  // =====================================================

  async function salvarCompra() {
    setMensagem("");
    setErro("");

    if (!fornecedorId) {
      setErro(
        "Selecione ou cadastre um fornecedor."
      );

      return;
    }

    if (!fornecedorSelecionado) {
      setErro(
        "Fornecedor inválido."
      );

      return;
    }

    if (!dataCompra) {
      setErro(
        "Informe a data da compra."
      );

      return;
    }

    if (itens.length === 0) {
      setErro(
        "Adicione pelo menos um modelo."
      );

      return;
    }

    // =================================================
    // VALIDAR ITENS
    // =================================================

    for (
      let i = 0;
      i < itens.length;
      i++
    ) {
      const item = itens[i];

      if (!item.modelo.trim()) {
        setErro(
          `Informe o modelo do item ${
            i + 1
          }.`
        );

        return;
      }

      if (!item.cor) {
        setErro(
          `Informe a cor do item ${
            i + 1
          }.`
        );

        return;
      }

      if (
        item.quantidade < 1
      ) {
        setErro(
          `A quantidade do item ${
            i + 1
          } deve ser maior que zero.`
        );

        return;
      }

      if (
        !item.precoCompraUsd ||
        Number(
          item.precoCompraUsd
        ) <= 0
      ) {
        setErro(
          `Informe o preço de compra USD do item ${
            i + 1
          }.`
        );

        return;
      }

      if (
        item.imeis.length !==
        item.quantidade
      ) {
        setErro(
          `A quantidade de IMEIs do item ${
            i + 1
          } está incorreta.`
        );

        return;
      }

      for (
        let j = 0;
        j < item.imeis.length;
        j++
      ) {
        if (
          !item.imeis[j].trim()
        ) {
          setErro(
            `Informe o IMEI ${
              j + 1
            } do modelo ${
              item.modelo
            }.`
          );

          return;
        }
      }
    }

    // =================================================
    // VERIFICAR IMEIS REPETIDOS
    // =================================================

    const todosImeis =
      itens.flatMap((item) =>
        item.imeis.map((imei) =>
          imei.trim()
        )
      );

    const imeisUnicos =
      new Set(todosImeis);

    if (
      imeisUnicos.size !==
      todosImeis.length
    ) {
      setErro(
        "Existem IMEIs repetidos nesta compra."
      );

      return;
    }

    // =================================================
    // ENVIAR PARA API
    // =================================================

    try {
      setSalvando(true);

      const resposta =
        await fetch(
          "/api/compras",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fornecedor:
                fornecedorSelecionado.nome,

              dataCompra,

              itens,
            }),
          }
        );

      const dados =
        await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados?.error ||
            "Erro ao salvar a compra."
        );
      }

      setMensagem(
        "Compra cadastrada com sucesso!"
      );

      // =================================================
      // LIMPAR COMPRA
      // =================================================

      setDataCompra(
        new Date()
          .toISOString()
          .split("T")[0]
      );

      setItens([
        {
          modelo: "",
          cor: "",
          quantidade: 1,
          precoCompraUsd: "",
          imeis: [""],
        },
      ]);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao salvar a compra."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            CABEÇALHO
        ================================================== */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Compras
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Cadastre compras, aparelhos,
            cores, preços e IMEIs.
          </p>
        </div>

        {/* =================================================
            DADOS DA COMPRA
        ================================================== */}

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Dados da compra
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* =================================================
                FORNECEDOR
            ================================================== */}

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Fornecedor
              </label>

              <div className="flex gap-2">

                <select
                  value={fornecedorId}
                  onChange={(e) =>
                    setFornecedorId(
                      e.target.value
                    )
                  }
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                >
                  <option value="">
                    Selecionar fornecedor
                  </option>

                  {fornecedores.map(
                    (fornecedor) => (
                      <option
                        key={
                          fornecedor.id
                        }
                        value={
                          fornecedor.id
                        }
                      >
                        {fornecedor.nome}
                      </option>
                    )
                  )}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setErroFornecedor("");
                    setMostrarCadastroFornecedor(
                      true
                    );
                  }}
                  className="shrink-0 rounded-xl bg-blue-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-blue-700"
                  title="Cadastrar fornecedor"
                >
                  +
                </button>

              </div>

              {fornecedorSelecionado && (
                <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                  <span className="font-semibold">
                    {fornecedorSelecionado.nome}
                  </span>

                  {fornecedorSelecionado.telefone && (
                    <>
                      {" "}
                      •{" "}
                      {fornecedorSelecionado.telefone}
                    </>
                  )}

                  {fornecedorSelecionado.documento && (
                    <>
                      {" "}
                      •{" "}
                      {
                        fornecedorSelecionado.documento
                      }
                    </>
                  )}
                </div>
              )}

            </div>

            {/* =================================================
                DATA
            ================================================== */}

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Data da compra
              </label>

              <input
                type="date"
                value={dataCompra}
                onChange={(e) =>
                  setDataCompra(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        {/* =================================================
            MODAL CADASTRO FORNECEDOR
        ================================================== */}

        {mostrarCadastroFornecedor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

              {/* CABEÇALHO MODAL */}

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Cadastrar fornecedor
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Nome é obrigatório.
                    Os outros dados são
                    opcionais.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMostrarCadastroFornecedor(
                      false
                    )
                  }
                  className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  ✕
                </button>

              </div>

              {/* NOME */}

              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Nome do fornecedor *
                </label>

                <input
                  autoFocus
                  type="text"
                  value={
                    novoFornecedorNome
                  }
                  onChange={(e) =>
                    setNovoFornecedorNome(
                      e.target.value
                    )
                  }
                  placeholder="Ex: ABC Imports"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* TELEFONE */}

              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Telefone
                </label>

                <input
                  type="text"
                  value={
                    novoFornecedorTelefone
                  }
                  onChange={(e) =>
                    setNovoFornecedorTelefone(
                      e.target.value
                    )
                  }
                  placeholder="Ex: (11) 99999-9999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* CPF / CNPJ */}

              <div className="mb-4">
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  CPF ou CNPJ
                </label>

                <input
                  type="text"
                  value={
                    novoFornecedorDocumento
                  }
                  onChange={(e) =>
                    setNovoFornecedorDocumento(
                      e.target.value
                    )
                  }
                  placeholder="CPF ou CNPJ"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* ERRO */}

              {erroFornecedor && (
                <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
                  {erroFornecedor}
                </div>
              )}

              {/* BOTÕES */}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setErroFornecedor("");
                    setMostrarCadastroFornecedor(
                      false
                    );
                  }}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={
                    cadastrarFornecedor
                  }
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Cadastrar
                </button>

              </div>

            </div>
          </div>
        )}

        {/* =================================================
            ITENS DA COMPRA
        ================================================== */}

        <div className="space-y-5">

          {itens.map(
            (item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >

                <div className="mb-5 flex items-center justify-between">

                  <h2 className="text-lg font-bold text-gray-800">
                    Modelo {index + 1}
                  </h2>

                  {itens.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removerItem(index)
                      }
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200"
                    >
                      Remover
                    </button>
                  )}

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                  {/* MODELO */}

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Modelo
                    </label>

                    <input
                      type="text"
                      value={item.modelo}
                      onChange={(e) =>
                        alterarItem(
                          index,
                          "modelo",
                          e.target.value
                        )
                      }
                      placeholder="Ex: iPhone 15 Pro Max"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                  {/* COR */}

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Cor
                    </label>

                    <select
                      value={item.cor}
                      onChange={(e) =>
                        alterarItem(
                          index,
                          "cor",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                    >
                      <option value="">
                        Selecionar cor
                      </option>

                      {CORES.map(
                        (cor) => (
                          <option
                            key={cor}
                            value={cor}
                          >
                            {cor}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* QUANTIDADE */}

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Quantidade
                    </label>

                    <input
                      type="number"
                      min={1}
                      value={
                        item.quantidade
                      }
                      onChange={(e) =>
                        alterarQuantidade(
                          index,
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                  {/* PREÇO */}

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Compra USD por aparelho
                    </label>

                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={
                        item.precoCompraUsd
                      }
                      onChange={(e) =>
                        alterarItem(
                          index,
                          "precoCompraUsd",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 650"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                </div>

                {/* IMEIS */}

                <div className="mt-5">

                  <div className="mb-3 flex items-center justify-between">

                    <h3 className="font-bold text-gray-800">
                      IMEIs (
                      {
                        item.quantidade
                      }
                      )
                    </h3>

                    <span className="text-sm text-gray-500">
                      1 IMEI por aparelho
                    </span>

                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">

                    {item.imeis.map(
                      (
                        imei,
                        imeiIndex
                      ) => (
                        <div
                          key={
                            imeiIndex
                          }
                        >

                          <label className="mb-1 block text-xs font-semibold text-gray-600">
                            IMEI{" "}
                            {imeiIndex +
                              1}
                          </label>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={imei}
                            onChange={(
                              e
                            ) =>
                              alterarImei(
                                index,
                                imeiIndex,
                                e.target
                                  .value
                              )
                            }
                            placeholder="Digite ou escaneie o IMEI"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono outline-none transition focus:border-blue-500"
                          />

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>
            )
          )}

        </div>

        {/* =================================================
            ADICIONAR OUTRO MODELO
        ================================================== */}

        <button
          type="button"
          onClick={adicionarItem}
          className="mt-5 rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          + Adicionar outro modelo
        </button>

        {/* =================================================
            RESUMO
        ================================================== */}

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Resumo da compra
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* MODELOS */}

            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Modelos
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {itens.length}
              </p>
            </div>

            {/* APARELHOS */}

            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Total de aparelhos
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {totalAparelhos()}
              </p>
            </div>

            {/* TOTAL */}

            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Total da compra
              </p>

              <p className="text-2xl font-bold text-gray-900">
                US${" "}
                {totalCompraUsd().toFixed(
                  2
                )}
              </p>
            </div>

          </div>

          {/* ERRO */}

          {erro && (
            <div className="mt-5 rounded-xl bg-red-100 px-4 py-3 font-semibold text-red-700">
              {erro}
            </div>
          )}

          {/* SUCESSO */}

          {mensagem && (
            <div className="mt-5 rounded-xl bg-green-100 px-4 py-3 font-semibold text-green-700">
              {mensagem}
            </div>
          )}

          {/* SALVAR */}

          <button
            type="button"
            onClick={salvarCompra}
            disabled={salvando}
            className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando
              ? "Salvando..."
              : "Salvar compra"}
          </button>

        </div>

      </div>
    </main>
  );
}