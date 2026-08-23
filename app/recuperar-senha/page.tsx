"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarSenhaPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function recuperar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem("");
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("/api/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(
          dados.error || "Não foi possível enviar o código."
        );
        return;
      }

      setMensagem(
        "Código enviado para o seu e-mail de recuperação."
      );

      setCodigo("");
      setNovaSenha("");
      setConfirmarSenha("");

    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o sistema.");
    } finally {
      setCarregando(false);
    }
  }

  async function redefinirSenha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    if (!/^\d{6}$/.test(codigo)) {
      setErro("O código deve ter 6 números.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro(
        "A nova senha deve ter pelo menos 6 caracteres."
      );
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "/api/recuperar-senha/redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            codigo,
            novaSenha,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível redefinir a senha."
        );
        return;
      }

      setMensagem(
        "Senha alterada com sucesso! Voltando para o login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);

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

          <div className="text-center mb-8">
            <div className="text-5xl mb-4">
              🔐
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Recuperar senha
            </h1>

            <p className="text-gray-500 mt-2">
              Adel's Mundo Cell
            </p>
          </div>

          {erro && (
            <div className="mb-5 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="mb-5 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">
              {mensagem}
            </div>
          )}

          {!mensagem ? (
            <form
              onSubmit={recuperar}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 transition"
              >
                {carregando
                  ? "Enviando..."
                  : "Recuperar senha"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={redefinirSenha}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de recuperação
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={codigo}
                  onChange={(e) =>
                    setCodigo(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Digite o código de 6 números"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova senha
                </label>

                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) =>
                    setNovaSenha(e.target.value)
                  }
                  placeholder="Digite a nova senha"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nova senha
                </label>

                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) =>
                    setConfirmarSenha(e.target.value)
                  }
                  placeholder="Digite novamente a senha"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 transition"
              >
                {carregando
                  ? "Alterando senha..."
                  : "Criar nova senha"}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              ← Voltar para o login
            </button>
          </div>

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