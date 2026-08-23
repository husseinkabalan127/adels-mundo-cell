"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.error || "E-mail ou senha incorretos.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📱</div>

            <h1 className="text-3xl font-bold text-gray-800">
              Adel's Mundo Cell
            </h1>

            <p className="text-gray-500 mt-2">
              Acesso ao sistema
            </p>
          </div>

          {/* Erro */}
          {erro && (
            <div className="mb-5 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
              {erro}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={entrar} className="space-y-5">

            {/* E-mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Entrar */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 transition"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>

          </form>

          {/* Esqueci a senha */}
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={() => router.push("/recuperar-senha")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Rodapé */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Sistema interno • Adel's Mundo Cell
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}