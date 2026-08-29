"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Etapa = "email" | "codigo";

export default function RecuperarSenhaPage() {
  const router = useRouter();

  const [etapa, setEtapa] = useState<Etapa>("email");

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // =====================================================
  // ENVIAR CÓDIGO
  // =====================================================

  async function recuperar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      setErro("Digite seu e-mail.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailLimpo,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível enviar o código."
        );
        return;
      }

      setEmail(emailLimpo);

      setMensagem(
        "Código enviado para o seu e-mail. Verifique sua caixa de entrada."
      );

      setCodigo("");
      setNovaSenha("");
      setConfirmarSenha("");

      setEtapa("codigo");
    } catch (error) {
      console.error(
        "ERRO AO ENVIAR CÓDIGO:",
        error
      );

      setErro(
        "Erro ao conectar com o sistema."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // REENVIAR CÓDIGO
  // =====================================================

  async function reenviarCodigo() {
    setMensagem("");
    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      setErro("Digite seu e-mail.");
      setEtapa("email");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "/api/recuperar-senha",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email: emailLimpo,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(
          dados.error ||
            "Não foi possível reenviar o código."
        );
        return;
      }

      setMensagem(
        "Um novo código foi enviado para o seu e-mail."
      );

      setCodigo("");
    } catch (error) {
      console.error(
        "ERRO AO REENVIAR CÓDIGO:",
        error
      );

      setErro(
        "Erro ao conectar com o sistema."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // REDEFINIR SENHA
  // =====================================================

  async function redefinirSenha(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const codigoLimpo =
      codigo.replace(/\D/g, "");

    if (!/^\d{6}$/.test(codigoLimpo)) {
      setErro(
        "O código deve ter exatamente 6 números."
      );
      return;
    }

    if (novaSenha.length < 6) {
      setErro(
        "A nova senha deve ter pelo menos 6 caracteres."
      );
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro(
        "As senhas não são iguais."
      );
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        "/api/recuperar-senha/redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              email.trim().toLowerCase(),

            codigo: codigoLimpo,

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
      console.error(
        "ERRO AO REDEFINIR SENHA:",
        error
      );

      setErro(
        "Erro ao conectar com o sistema."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // VOLTAR PARA ETAPA DO E-MAIL
  // =====================================================

  function voltarEmail() {
    setErro("");
    setMensagem("");
    setCodigo("");
    setNovaSenha("");
    setConfirmarSenha("");

    setEtapa("email");
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* CABEÇALHO */}

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

          {/* INDICADOR */}

          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`h-2 w-16 rounded-full ${
                etapa === "email"
                  ? "bg-blue-600"
                  : "bg-green-500"
              }`}
            />

            <div
              className={`h-2 w-16 rounded-full ${
                etapa === "codigo"
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }`}
            />
          </div>

          {/* ERRO */}

          {erro && (
            <div className="mb-5 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3 text-sm">
              {erro}
            </div>
          )}

          {/* MENSAGEM */}

          {mensagem && (
            <div className="mb-5 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3 text-sm">
              {mensagem}
            </div>
          )}

          {/* =================================================
              ETAPA 1 - E-MAIL
          ================================================= */}

          {etapa === "email" && (
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
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  required
                  disabled={carregando}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 transition"
              >
                {carregando
                  ? "Enviando código..."
                  : "Enviar código"}
              </button>
            </form>
          )}

          {/* =================================================
              ETAPA 2 - CÓDIGO + NOVA SENHA
          ================================================= */}

          {etapa === "codigo" && (
            <form
              onSubmit={redefinirSenha}
              className="space-y-5"
            >

              {/* E-MAIL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600"
                />

                <button
                  type="button"
                  onClick={voltarEmail}
                  disabled={carregando}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Alterar e-mail
                </button>
              </div>

              {/* CÓDIGO */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de recuperação
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={codigo}
                  onChange={(e) =>
                    setCodigo(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="000000"
                  required
                  disabled={carregando}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />

                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={reenviarCodigo}
                    disabled={carregando}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400"
                  >
                    {carregando
                      ? "Aguarde..."
                      : "Reenviar código"}
                  </button>
                </div>
              </div>

              {/* NOVA SENHA */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova senha
                </label>

                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) =>
                    setNovaSenha(
                      e.target.value
                    )
                  }
                  placeholder="Digite a nova senha"
                  autoComplete="new-password"
                  required
                  disabled={carregando}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Mínimo de 6 caracteres.
                </p>
              </div>

              {/* CONFIRMAR SENHA */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nova senha
                </label>

                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) =>
                    setConfirmarSenha(
                      e.target.value
                    )
                  }
                  placeholder="Digite novamente a senha"
                  autoComplete="new-password"
                  required
                  disabled={carregando}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />
              </div>

              {/* BOTÃO */}

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

          {/* VOLTAR LOGIN */}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() =>
                router.push("/login")
              }
              disabled={carregando}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              ← Voltar para o login
            </button>
          </div>

          {/* RODAPÉ */}

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