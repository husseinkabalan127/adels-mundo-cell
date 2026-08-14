"use client";

import { useState } from "react";

export default function ConfiguracoesPage() {
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function limparDados() {
    setMensagem("");
    setErro("");

    if (!senha.trim()) {
      setErro("Informe a senha.");
      return;
    }

    if (!confirmacao) {
      setErro(
        "Confirme que deseja apagar os dados."
      );
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(
        "/api/limpar-dados",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Erro ao limpar os dados."
        );
      }

      setMensagem(
        "✅ Dados do sistema apagados com sucesso!"
      );

      setSenha("");
      setConfirmacao(false);
    } catch (error: any) {
      setErro(
        error.message ||
          "Erro ao limpar os dados."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f6f8",
        padding: "30px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              fontSize: "30px",
            }}
          >
            Configurações
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Adel&apos;s Mundo Cell
          </p>

          {mensagem && (
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              {mensagem}
            </div>
          )}

          {erro && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              {erro}
            </div>
          )}

          <div
            style={{
              border:
                "1px solid #fecaca",
              background: "#fff7f7",
              borderRadius: "14px",
              padding: "25px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#b91c1c",
              }}
            >
              🔴 Limpar dados do sistema
            </h2>

            <p
              style={{
                color: "#555",
                lineHeight: 1.6,
              }}
            >
              Esta opção apaga somente os
              dados cadastrados no sistema.
            </p>

            <p
              style={{
                color: "#555",
                lineHeight: 1.6,
              }}
            >
              O projeto, as páginas, o
              código e os usuários continuarão
              funcionando normalmente.
            </p>

            <div
              style={{
                background: "#fee2e2",
                borderRadius: "10px",
                padding: "15px",
                marginTop: "20px",
                marginBottom: "20px",
                color: "#991b1b",
                fontWeight: 600,
              }}
            >
              ⚠️ Serão apagados:
              <br />
              • Estoque
              <br />
              • IMEI
              <br />
              • Vendas
              <br />
              • Assistências
              <br />
              • Garantias
              <br />
              • Compras / Lotes
              <br />
              • Dados usados nos relatórios
            </div>

            <label
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: "7px",
              }}
            >
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              placeholder="Digite a senha"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "18px",
                cursor: "pointer",
                color: "#444",
              }}
            >
              <input
                type="checkbox"
                checked={confirmacao}
                onChange={(e) =>
                  setConfirmacao(
                    e.target.checked
                  )
                }
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />

              <span>
                Eu entendo que esta ação
                apagará os dados cadastrados.
              </span>
            </label>

            <button
              type="button"
              onClick={limparDados}
              disabled={carregando}
              style={{
                width: "100%",
                marginTop: "22px",
                padding: "14px",
                border: "none",
                borderRadius: "9px",
                background: "#dc2626",
                color: "#fff",
                fontWeight: 800,
                fontSize: "16px",
                cursor: carregando
                  ? "not-allowed"
                  : "pointer",
                opacity: carregando
                  ? 0.6
                  : 1,
              }}
            >
              {carregando
                ? "Apagando dados..."
                : "🗑️ Limpar dados do sistema"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}