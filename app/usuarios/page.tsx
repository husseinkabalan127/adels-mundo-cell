"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "FUNCIONARIO";
  ativo: boolean;
};

export default function UsuariosPage() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] =
    useState<"ADMIN" | "FUNCIONARIO">("FUNCIONARIO");

  const [salvando, setSalvando] = useState(false);

  // =====================================================
  // CARREGAR USUÁRIOS
  // =====================================================

  async function carregarUsuarios() {
    try {
      setErro("");

      const resposta = await fetch("/api/usuarios", {
        method: "GET",
        cache: "no-store",
      });

      const dados = await resposta.json();

      // FUNCIONÁRIO NÃO PODE ENTRAR AQUI
      if (
        resposta.status === 401 ||
        resposta.status === 403
      ) {
        router.replace("/dashboard");
        return;
      }

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível carregar os usuários."
        );
        return;
      }

      setUsuarios(dados.usuarios || []);
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // =====================================================
  // CRIAR USUÁRIO
  // =====================================================

  async function criarUsuario(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErro("");
    setMensagem("");
    setSalvando(true);

    try {
      const resposta = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          role,
        }),
      });

      const dados = await resposta.json();

      if (
        resposta.status === 401 ||
        resposta.status === 403
      ) {
        router.replace("/dashboard");
        return;
      }

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível criar o usuário."
        );
        return;
      }

      setMensagem("Usuário criado com sucesso.");

      setNome("");
      setEmail("");
      setSenha("");
      setRole("FUNCIONARIO");

      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // ALTERAR STATUS
  // =====================================================

  async function alterarStatus(usuario: Usuario) {
    setErro("");
    setMensagem("");

    try {
      const resposta = await fetch("/api/usuarios", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usuario.id,
          ativo: !usuario.ativo,
        }),
      });

      const dados = await resposta.json();

      if (
        resposta.status === 401 ||
        resposta.status === 403
      ) {
        router.replace("/dashboard");
        return;
      }

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível alterar o status."
        );
        return;
      }

      setMensagem("Status alterado com sucesso.");

      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    }
  }

  // =====================================================
  // EXCLUIR USUÁRIO
  // =====================================================

  async function excluirUsuario(usuario: Usuario) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o usuário "${usuario.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    setErro("");
    setMensagem("");

    try {
      const resposta = await fetch("/api/usuarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usuario.id,
        }),
      });

      const dados = await resposta.json();

      if (
        resposta.status === 401 ||
        resposta.status === 403
      ) {
        router.replace("/dashboard");
        return;
      }

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível excluir o usuário."
        );
        return;
      }

      setMensagem("Usuário excluído com sucesso.");

      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    }
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* CABEÇALHO */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            👥 Usuários
          </h1>

          <p className="mt-2 text-gray-500">
            Gerenciamento de administradores e funcionários
          </p>
        </div>

        {/* MENSAGEM DE ERRO */}
        {erro && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-100 px-5 py-4 text-red-700">
            {erro}
          </div>
        )}

        {/* MENSAGEM DE SUCESSO */}
        {mensagem && (
          <div className="mb-6 rounded-xl border border-green-300 bg-green-100 px-5 py-4 text-green-700">
            {mensagem}
          </div>
        )}

        {/* FORMULÁRIO */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            ➕ Criar novo usuário
          </h2>

          <form
            onSubmit={criarUsuario}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >

            {/* NOME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
                placeholder="Nome do funcionário"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="email@exemplo.com"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* SENHA */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* TIPO */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tipo de usuário
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value as
                      | "ADMIN"
                      | "FUNCIONARIO"
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="FUNCIONARIO">
                  Funcionário
                </option>

                <option value="ADMIN">
                  Administrador
                </option>
              </select>
            </div>

            {/* BOTÃO */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={salvando}
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
              >
                {salvando
                  ? "Criando usuário..."
                  : "Criar usuário"}
              </button>
            </div>

          </form>
        </div>

        {/* LISTA */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Usuários cadastrados
            </h2>

            <button
              type="button"
              onClick={carregarUsuarios}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              🔄 Atualizar
            </button>
          </div>

          {/* CARREGANDO */}
          {carregando ? (
            <div className="py-10 text-center text-gray-500">
              Carregando usuários...
            </div>

          ) : usuarios.length === 0 ? (

            <div className="rounded-xl bg-gray-50 py-10 text-center text-gray-500">
              Nenhum usuário cadastrado.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead>
                  <tr className="border-b border-gray-200 text-left">

                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Nome
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      E-mail
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Tipo
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Ações
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {usuarios.map((usuario) => (

                    <tr
                      key={usuario.id}
                      className="border-b border-gray-100"
                    >

                      {/* NOME */}
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {usuario.nome}
                      </td>

                      {/* EMAIL */}
                      <td className="px-4 py-4 text-gray-600">
                        {usuario.email}
                      </td>

                      {/* TIPO */}
                      <td className="px-4 py-4">

                        {usuario.role === "ADMIN" ? (

                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                            👑 ADMIN
                          </span>

                        ) : (

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            👷 FUNCIONÁRIO
                          </span>

                        )}

                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-4">

                        {usuario.ativo ? (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            🟢 Ativo
                          </span>

                        ) : (

                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            🔴 Desativado
                          </span>

                        )}

                      </td>

                      {/* AÇÕES */}
                      <td className="px-4 py-4">

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              alterarStatus(usuario)
                            }
                            className="rounded-lg bg-yellow-100 px-3 py-2 text-xs font-semibold text-yellow-700 hover:bg-yellow-200"
                          >
                            {usuario.ativo
                              ? "Desativar"
                              : "Ativar"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluirUsuario(usuario)
                            }
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                          >
                            Excluir
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* RODAPÉ */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Sistema interno • Adel's Mundo Cell
          </p>
        </div>

      </div>
    </main>
  );
}