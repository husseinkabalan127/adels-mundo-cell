"use client";

import { useEffect, useMemo, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  telefone: string | null;
  cpfCnpj: string;
  email: string | null;
  observacao: string | null;
  createdAt: string;
  updatedAt: string;
};

type Formulario = {
  nome: string;
  telefone: string;
  cpfCnpj: string;
  email: string;
  observacao: string;
};

const FORM_INICIAL: Formulario = {
  nome: "",
  telefone: "",
  cpfCnpj: "",
  email: "",
  observacao: "",
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] =
    useState<Cliente | null>(null);

  const [form, setForm] = useState<Formulario>(FORM_INICIAL);

  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);

  async function carregarClientes() {
    try {
      setCarregando(true);

      const response = await fetch("/api/clientes", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao carregar clientes."
        );
      }

      setClientes(data);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao carregar clientes."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  function abrirNovoCliente() {
    setClienteEditando(null);
    setForm(FORM_INICIAL);
    setModalAberto(true);
  }

  function abrirEditarCliente(cliente: Cliente) {
    setClienteEditando(cliente);

    setForm({
      nome: cliente.nome,
      telefone: cliente.telefone || "",
      cpfCnpj: cliente.cpfCnpj,
      email: cliente.email || "",
      observacao: cliente.observacao || "",
    });

    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
    setClienteEditando(null);
    setForm(FORM_INICIAL);
  }

  function alterarCampo(
    campo: keyof Formulario,
    valor: string
  ) {
    setForm((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function salvarCliente() {
    if (!form.nome.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }

    if (!form.cpfCnpj.trim()) {
      alert("Informe o CPF ou CNPJ.");
      return;
    }

    try {
      setSalvando(true);

      const response = await fetch("/api/clientes", {
        method: clienteEditando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(clienteEditando
            ? { id: clienteEditando.id }
            : {}),
          nome: form.nome,
          telefone: form.telefone,
          cpfCnpj: form.cpfCnpj,
          email: form.email,
          observacao: form.observacao,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao salvar cliente."
        );
      }

      setModalAberto(false);
      setClienteEditando(null);
      setForm(FORM_INICIAL);

      await carregarClientes();

      alert(
        clienteEditando
          ? "Cliente atualizado com sucesso!"
          : "Cliente cadastrado com sucesso!"
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao salvar cliente."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirCliente(cliente: Cliente) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o cliente "${cliente.nome}"?`
    );

    if (!confirmar) return;

    try {
      setExcluindoId(cliente.id);

      const response = await fetch(
        `/api/clientes?id=${cliente.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao excluir cliente."
        );
      }

      await carregarClientes();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao excluir cliente."
      );
    } finally {
      setExcluindoId(null);
    }
  }

  const clientesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return clientes;

    return clientes.filter((cliente) => {
      return (
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.cpfCnpj.toLowerCase().includes(termo) ||
        (cliente.telefone || "")
          .toLowerCase()
          .includes(termo) ||
        (cliente.email || "")
          .toLowerCase()
          .includes(termo)
      );
    });
  }, [clientes, busca]);

  return (
    <div className="p-6">
      {/* CABEÇALHO */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            👤 Clientes
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Gerencie os clientes da Adel's Mundo Cell
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNovoCliente}
          className="rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-gray-800"
        >
          ➕ Novo Cliente
        </button>
      </div>

      {/* PESQUISA */}

      <div className="mb-5 rounded-2xl border bg-white p-4 shadow-sm">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔎 Pesquisar por nome, CPF/CNPJ, telefone ou email..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500"
        />
      </div>

      {/* RESUMO */}

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total de clientes
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            {clientes.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Clientes encontrados
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            {clientesFiltrados.length}
          </p>
        </div>
      </div>

      {/* TABELA */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Nome
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Telefone
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  CPF / CNPJ
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Observação
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    Carregando clientes...
                  </td>
                </tr>
              ) : clientesFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <div className="text-4xl">👤</div>

                    <p className="mt-3 font-semibold text-gray-700">
                      Nenhum cliente encontrado
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Cadastre o primeiro cliente usando
                      o botão acima.
                    </p>
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900">
                        {cliente.nome}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {cliente.telefone || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {cliente.cpfCnpj}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {cliente.email || "—"}
                    </td>

                    <td className="max-w-[220px] px-5 py-4 text-sm text-gray-600">
                      <div className="truncate">
                        {cliente.observacao || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            abrirEditarCliente(cliente)
                          }
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          ✏️ Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            excluirCliente(cliente)
                          }
                          disabled={
                            excluindoId === cliente.id
                          }
                          className="rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {excluindoId === cliente.id
                            ? "Excluindo..."
                            : "🗑️ Excluir"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}

      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {clienteEditando
                    ? "✏️ Editar Cliente"
                    : "➕ Novo Cliente"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Preencha os dados do cliente
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nome *
                </label>

                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) =>
                    alterarCampo("nome", e.target.value)
                  }
                  placeholder="Nome completo"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Telefone
                </label>

                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) =>
                    alterarCampo(
                      "telefone",
                      e.target.value
                    )
                  }
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  CPF / CNPJ *
                </label>

                <input
                  type="text"
                  value={form.cpfCnpj}
                  onChange={(e) =>
                    alterarCampo(
                      "cpfCnpj",
                      e.target.value
                    )
                  }
                  placeholder="CPF ou CNPJ"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    alterarCampo("email", e.target.value)
                  }
                  placeholder="cliente@email.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Observação
                </label>

                <textarea
                  value={form.observacao}
                  onChange={(e) =>
                    alterarCampo(
                      "observacao",
                      e.target.value
                    )
                  }
                  placeholder="Observações sobre o cliente..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={salvarCliente}
                disabled={salvando}
                className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {salvando
                  ? "Salvando..."
                  : clienteEditando
                    ? "Salvar alterações"
                    : "Cadastrar Cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}