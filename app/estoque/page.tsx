 "use client";

import { useEffect, useMemo, useState } from "react";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "FUNCIONARIO";
};

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
  cor: string | null;
  memoria: string | null;
  produtoId: number;
  loteId: number;
};

type Lote = {
  id: number;
  fornecedor: string | null;
  precoCompraUsd: number | null;
  quantidade: number;
  createdAt: string;
  aparelhos?: Aparelho[];
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  createdAt: string;
  lotes?: Lote[];
  aparelhos?: Aparelho[];
};

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [buscaProduto, setBuscaProduto] = useState("");
  const [produtoAberto, setProdutoAberto] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);

  // Trocar IMEI - ADMIN somente
  const [imeiAntigo, setImeiAntigo] = useState("");
  const [imeiNovo, setImeiNovo] = useState("");
  const [trocandoImei, setTrocandoImei] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const isAdmin = usuario?.role === "ADMIN";

  async function carregarUsuario() {
    try {
      setCarregandoUsuario(true);

      const response = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (!response.ok) {
        setUsuario(null);
        return;
      }

      const data = await response.json();

      if (data?.user) {
        setUsuario(data.user);
      } else if (data?.usuario) {
        setUsuario(data.usuario);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUsuario(null);
    } finally {
      setCarregandoUsuario(false);
    }
  }

  async function carregarEstoque() {
    try {
      setLoading(true);
      setErro("");

      const response = await fetch("/api/estoque", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao carregar estoque."
        );
      }

      setProdutos(Array.isArray(data) ? data : []);
    } catch (error: any) {
      setErro(
        error?.message || "Erro ao carregar estoque."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuario();
    carregarEstoque();
  }, []);

  async function trocarImei() {
    if (!isAdmin) {
      setErro("Apenas o administrador pode trocar IMEI.");
      return;
    }

    setMensagem("");
    setErro("");

    const antigo = imeiAntigo.trim();
    const novo = imeiNovo.trim();

    if (!antigo) {
      setErro("Informe o IMEI antigo.");
      return;
    }

    if (!novo) {
      setErro("Informe o IMEI novo.");
      return;
    }

    if (antigo === novo) {
      setErro("O IMEI novo deve ser diferente do antigo.");
      return;
    }

    setTrocandoImei(true);

    try {
      const response = await fetch("/api/estoque", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imeiAntigo: antigo,
          imeiNovo: novo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao trocar IMEI."
        );
      }

      setMensagem(
        data?.message || "IMEI trocado com sucesso!"
      );

      setImeiAntigo("");
      setImeiNovo("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message || "Erro ao trocar IMEI."
      );
    } finally {
      setTrocandoImei(false);
    }
  }

  const produtosDisponiveis = useMemo(() => {
    const busca = buscaProduto.toLowerCase().trim();

    return produtos
      .map((produto) => {
        const aparelhosDisponiveis = (
          produto.aparelhos || []
        ).filter((aparelho) => !aparelho.vendido);

        const variantesMap = new Map<string, number>();

        aparelhosDisponiveis.forEach((aparelho) => {
          const cor = aparelho.cor?.trim() || "Cor não informada";
          const memoria = aparelho.memoria?.trim() || "GB não informado";
          const chave = `${cor} • ${memoria}`;
          variantesMap.set(
            chave,
            (variantesMap.get(chave) || 0) + 1
          );
        });

        const variantes = Array.from(variantesMap.entries()).map(
          ([descricao, quantidade]) => ({
            descricao,
            quantidade,
          })
        );

        return {
          ...produto,
          aparelhosDisponiveis,
          variantes,
        };
      })
      .filter((produto) => {
        const correspondeBusca = produto.nome
          .toLowerCase()
          .includes(busca);

        return (
          produto.aparelhosDisponiveis.length > 0 &&
          correspondeBusca
        );
      });
  }, [produtos, buscaProduto]);

  const totalEstoque = useMemo(() => {
    return produtos.reduce((total, produto) => {
      return (
        total +
        (produto.aparelhos || []).filter(
          (aparelho) => !aparelho.vendido
        ).length
      );
    }, 0);
  }, [produtos]);

  function limparMensagens() {
    setMensagem("");
    setErro("");
  }

  if (carregandoUsuario) {
    return (
      <main style={pageStyle}>
        <div style={containerStyle}>
          <div style={cardStyle}>Carregando...</div>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        {/* CABEÇALHO */}
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Estoque</h1>
            <p style={subtitleStyle}>
              Adel&apos;s Mundo Cell
            </p>
          </div>

          <div style={headerRightStyle}>
            <div style={totalCardStyle}>
              <strong>Total em estoque:</strong>{" "}
              {totalEstoque}
            </div>

            <div
              style={{
                ...roleCardStyle,
                background: isAdmin ? "#dcfce7" : "#dbeafe",
                color: isAdmin ? "#166534" : "#1e40af",
              }}
            >
              {isAdmin ? "👑 ADMIN" : "👷 FUNCIONÁRIO"}
            </div>
          </div>
        </div>

        {/* MENSAGENS */}
        {mensagem && (
          <div style={successMessageStyle}>
            {mensagem}
          </div>
        )}

        {erro && (
          <div style={errorMessageStyle}>
            {erro}
          </div>
        )}

        {/* TROCAR IMEI - ADMIN SOMENTE */}
        {isAdmin && (
          <section style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <div>
                <h2 style={sectionTitleStyle}>
                  🔄 Trocar IMEI
                </h2>
                <p style={sectionDescriptionStyle}>
                  Esta função está disponível somente para o administrador.
                </p>
              </div>
            </div>

            <div style={imeiGridStyle}>
              <div>
                <label style={labelStyle}>
                  IMEI antigo
                </label>
                <input
                  value={imeiAntigo}
                  onChange={(e) =>
                    setImeiAntigo(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      trocarImei();
                    }
                  }}
                  placeholder="Digite o IMEI antigo"
                  inputMode="numeric"
                  autoComplete="off"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  IMEI novo
                </label>
                <input
                  value={imeiNovo}
                  onChange={(e) =>
                    setImeiNovo(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      trocarImei();
                    }
                  }}
                  placeholder="Digite o IMEI novo"
                  inputMode="numeric"
                  autoComplete="off"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", alignItems: "end" }}>
                <button
                  type="button"
                  onClick={trocarImei}
                  disabled={trocandoImei}
                  style={{
                    ...primaryButton,
                    width: "100%",
                    opacity: trocandoImei ? 0.6 : 1,
                  }}
                >
                  {trocandoImei
                    ? "Trocando..."
                    : "Trocar IMEI"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ESTOQUE */}
        <section style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>
                Produtos em estoque
              </h2>
              <p style={sectionDescriptionStyle}>
                Aqui você somente consulta a mercadoria disponível.
                As compras são cadastradas em Compras.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              value={buscaProduto}
              onChange={(e) =>
                setBuscaProduto(e.target.value)
              }
              placeholder="🔍 Buscar aparelho..."
              style={searchStyle}
            />
          </div>

          {loading ? (
            <p style={mutedTextStyle}>
              Carregando estoque...
            </p>
          ) : produtosDisponiveis.length === 0 ? (
            <div style={emptyStyle}>
              <div style={{ fontSize: "38px" }}>📦</div>
              <strong>
                Nenhum aparelho disponível no estoque.
              </strong>
              <span>
                Os aparelhos vendidos não aparecem aqui.
              </span>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {produtosDisponiveis.map((produto) => {
                const aparelhosDisponiveis =
                  produto.aparelhosDisponiveis;

                const lotes = produto.lotes || [];
                const aberto =
                  produtoAberto === produto.id;

                return (
                  <div
                    key={produto.id}
                    style={productCardStyle}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        limparMensagens();
                        setProdutoAberto(
                          aberto ? null : produto.id
                        );
                      }}
                      style={productButtonStyle}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={productNameStyle}>
                          📱 {produto.nome}
                        </div>

                        <div style={productQuantityStyle}>
                          <strong>
                            {aparelhosDisponiveis.length}
                          </strong>{" "}
                          aparelho(s) disponível(is)
                        </div>

                        <div style={variantListStyle}>
                          {produto.variantes.map((variante) => (
                            <span
                              key={variante.descricao}
                              style={variantBadgeStyle}
                            >
                              {variante.descricao} — {variante.quantidade}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={arrowStyle}>
                        {aberto ? "⌃" : "⌄"}
                      </div>
                    </button>

                    {aberto && (
                      <div style={detailsStyle}>
                        {/* IMEIS DISPONÍVEIS */}
                        <div style={innerCardStyle}>
                          <div style={innerTitleStyle}>
                            📱 IMEIs disponíveis (
                            {aparelhosDisponiveis.length})
                          </div>

                          <div style={imeiListStyle}>
                            {aparelhosDisponiveis.map(
                              (aparelho) => (
                                <span
                                  key={aparelho.id}
                                  style={{
                                    ...imeiBadgeStyle,
                                    display: "inline-flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "3px",
                                  }}
                                >
                                  <strong>{aparelho.imei}</strong>
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      color: "#475569",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {aparelho.cor || "Cor não informada"}
                                    {aparelho.memoria
                                      ? ` • ${aparelho.memoria}`
                                      : ""}
                                  </span>
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* COMPRAS */}
                        {lotes.length > 0 && (
                          <div style={{ marginTop: "18px" }}>
                            <h3
                              style={{
                                margin: "0 0 12px",
                                fontSize: "17px",
                              }}
                            >
                              📦 Compras
                            </h3>

                            <div style={{ display: "grid", gap: "10px" }}>
                              {lotes.map((lote, index) => {
                                const aparelhosDoLote =
                                  lote.aparelhos || [];

                                const disponiveisDoLote =
                                  aparelhosDoLote.filter(
                                    (aparelho) =>
                                      !aparelho.vendido
                                  );

                                // Compras antigas que não têm nenhum aparelho
                                // disponível não são mostradas no Estoque.
                                if (
                                  disponiveisDoLote.length === 0
                                ) {
                                  return null;
                                }

                                return (
                                  <div
                                    key={lote.id}
                                    style={loteStyle}
                                  >
                                    <div style={loteHeaderStyle}>
                                      <strong>
                                        📦 Compra #{lotes.length - index}
                                      </strong>

                                      <span style={availableBadgeStyle}>
                                        {disponiveisDoLote.length} disponível(is)
                                      </span>
                                    </div>

                                    <div style={detailLineStyle}>
                                      <strong>Fornecedor:</strong>{" "}
                                      {lote.fornecedor || "-"}
                                    </div>

                                    <div style={detailLineStyle}>
                                      <strong>Preço de compra:</strong>{" "}
                                      {lote.precoCompraUsd !== null
                                        ? `$ ${Number(
                                            lote.precoCompraUsd
                                          ).toFixed(2)}`
                                        : "Não informado"}
                                    </div>

                                    <div style={detailLineStyle}>
                                      <strong>Quantidade comprada:</strong>{" "}
                                      {lote.quantidade}
                                    </div>

                                    <div style={dateStyle}>
                                      Data da compra:{" "}
                                      {new Date(
                                        lote.createdAt
                                      ).toLocaleDateString(
                                        "pt-BR"
                                      )}
                                    </div>

                                    <div style={loteImeiBoxStyle}>
                                      <div style={innerSmallTitleStyle}>
                                        IMEIs disponíveis desta compra:
                                      </div>

                                      <div style={imeiListStyle}>
                                        {disponiveisDoLote.map(
                                          (aparelho) => (
                                            <span
                                              key={aparelho.id}
                                              style={{
                                                ...imeiSmallStyle,
                                                display: "inline-flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                gap: "2px",
                                              }}
                                            >
                                              <strong>{aparelho.imei}</strong>
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  color: "#64748b",
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {aparelho.cor || "Cor não informada"}
                                                {aparelho.memoria
                                                  ? ` • ${aparelho.memoria}`
                                                  : ""}
                                              </span>
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f5f6f8",
  padding: "30px",
  fontFamily: "Arial, Helvetica, sans-serif",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  marginBottom: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  gap: "15px",
  flexWrap: "wrap",
};

const headerRightStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexWrap: "wrap",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "32px",
  fontWeight: 800,
};

const subtitleStyle: React.CSSProperties = {
  marginTop: "7px",
  color: "#666",
};

const totalCardStyle: React.CSSProperties = {
  background: "#fff",
  padding: "15px 22px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const roleCardStyle: React.CSSProperties = {
  padding: "15px 22px",
  borderRadius: "12px",
  fontWeight: 700,
};

const successMessageStyle: React.CSSProperties = {
  background: "#dcfce7",
  color: "#166534",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "15px",
  fontWeight: 600,
};

const errorMessageStyle: React.CSSProperties = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "15px",
  fontWeight: 600,
};

const sectionHeaderStyle: React.CSSProperties = {
  marginBottom: "18px",
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "21px",
  fontWeight: 800,
};

const sectionDescriptionStyle: React.CSSProperties = {
  margin: "6px 0 0",
  color: "#666",
  fontSize: "14px",
};

const imeiGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginTop: "7px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
};

const primaryButton: React.CSSProperties = {
  border: "none",
  background: "#111827",
  color: "#fff",
  padding: "13px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "15px",
};

const searchStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "12px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  background: "#f9fafb",
};

const productCardStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  background: "#fff",
  overflow: "hidden",
};

const productButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "#fff",
  cursor: "pointer",
  padding: "20px",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "15px",
};

const productNameStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 800,
  color: "#111827",
  wordBreak: "break-word",
};

const productQuantityStyle: React.CSSProperties = {
  marginTop: "7px",
  color: "#555",
  fontSize: "15px",
};

const variantListStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "7px",
  marginTop: "10px",
};

const variantBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "#f1f5f9",
  border: "1px solid #cbd5e1",
  color: "#334155",
  padding: "6px 9px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: 700,
};

const arrowStyle: React.CSSProperties = {
  fontSize: "25px",
  color: "#64748b",
  flexShrink: 0,
};

const detailsStyle: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  padding: "20px",
  background: "#fafafa",
};

const innerCardStyle: React.CSSProperties = {
  padding: "15px",
  background: "#f8fafc",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const innerTitleStyle: React.CSSProperties = {
  fontWeight: 800,
  marginBottom: "10px",
};

const innerSmallTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: "9px",
};

const imeiListStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const imeiBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "9px 12px",
  borderRadius: "7px",
  fontSize: "13px",
  fontWeight: 600,
  wordBreak: "break-all",
};

const imeiSmallStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 10px",
  borderRadius: "7px",
  fontSize: "12px",
  fontWeight: 600,
  wordBreak: "break-all",
};

const loteStyle: React.CSSProperties = {
  background: "#f8fafc",
  padding: "17px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
};

const loteHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const availableBadgeStyle: React.CSSProperties = {
  background: "#dbeafe",
  color: "#1e40af",
  padding: "5px 9px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: 700,
};

const detailLineStyle: React.CSSProperties = {
  marginTop: "7px",
};

const dateStyle: React.CSSProperties = {
  marginTop: "7px",
  color: "#777",
  fontSize: "13px",
};

const loteImeiBoxStyle: React.CSSProperties = {
  marginTop: "15px",
  padding: "12px",
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const mutedTextStyle: React.CSSProperties = {
  color: "#666",
};

const emptyStyle: React.CSSProperties = {
  minHeight: "180px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  color: "#64748b",
  textAlign: "center",
};
