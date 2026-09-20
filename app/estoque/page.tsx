"use client";

import { useEffect, useState } from "react";

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
  const [produtos, setProdutos] =
    useState<Produto[]>([]);

  // Busca de aparelhos
  const [buscaProduto, setBuscaProduto] =
    useState("");

  // Produto aberto para ver os detalhes
  const [produtoAberto, setProdutoAberto] =
    useState<number | null>(null);

  // Editar nome do produto
  const [produtoEditandoNome, setProdutoEditandoNome] =
    useState<number | null>(null);
  const [novoNomeProduto, setNovoNomeProduto] =
    useState("");
  const [salvandoNomeProduto, setSalvandoNomeProduto] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [carregandoUsuario, setCarregandoUsuario] =
    useState(true);

  // =====================================================
  // FORMULÁRIO ADMIN
  // =====================================================

  const [nome, setNome] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [precoCompraUsd, setPrecoCompraUsd] =
    useState("");

  // IMEIs adicionados
  const [imeis, setImeis] =
    useState<string[]>([]);

  // Campo onde digita/escaneia o próximo IMEI
  const [imeiBusca, setImeiBusca] =
    useState("");

  const [salvando, setSalvando] =
    useState(false);

  // =====================================================
  // PREÇO USD
  // =====================================================

  const [lotePrecoAberto, setLotePrecoAberto] =
    useState<number | null>(null);

  const [precoLote, setPrecoLote] =
    useState("");

  const [salvandoPreco, setSalvandoPreco] =
    useState(false);

  // =====================================================
  // DELETE
  // =====================================================

  const [produtoParaExcluir, setProdutoParaExcluir] =
    useState<Produto | null>(null);

  const [senha, setSenha] =
    useState("");

  const [excluindo, setExcluindo] =
    useState(false);

  // =====================================================
  // TROCAR IMEI
  // =====================================================

  const [imeiAntigo, setImeiAntigo] =
    useState("");

  const [imeiNovo, setImeiNovo] =
    useState("");

  const [trocandoImei, setTrocandoImei] =
    useState(false);

  // =====================================================
  // MENSAGENS
  // =====================================================

  const [mensagem, setMensagem] =
    useState("");

  const [erro, setErro] =
    useState("");

  // =====================================================
  // BUSCAR USUÁRIO
  // =====================================================

  async function carregarUsuario() {
    try {
      setCarregandoUsuario(true);

      const response = await fetch(
        "/api/auth/me",
        {
          cache: "no-store",
        }
      );

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
      console.error(
        "Erro ao buscar usuário:",
        error
      );

      setUsuario(null);
    } finally {
      setCarregandoUsuario(false);
    }
  }

  // =====================================================
  // ADMIN?
  // =====================================================

  const isAdmin =
    usuario?.role === "ADMIN";

  // =====================================================
  // CARREGAR ESTOQUE
  // =====================================================

  async function carregarEstoque() {
    try {
      setLoading(true);
      setErro("");

      const response = await fetch(
        "/api/estoque",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao carregar estoque."
        );
      }

      setProdutos(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao carregar estoque."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INICIAR
  // =====================================================

  useEffect(() => {
    carregarUsuario();
    carregarEstoque();
  }, []);

  // =====================================================
  // ADICIONAR IMEI
  // =====================================================

  function adicionarImei() {
    const imei = imeiBusca.trim();

    if (!imei) {
      return;
    }

    setMensagem("");
    setErro("");

    // Não permite IMEI repetido dentro desta compra
    if (imeis.includes(imei)) {
      setErro(
        "Este IMEI já foi adicionado."
      );
      return;
    }

    // Adiciona o IMEI na lista
    setImeis((lista) => [
      ...lista,
      imei,
    ]);

    // Limpa a caixa para o próximo IMEI
    setImeiBusca("");
  }

  // =====================================================
  // ENTER NO CAMPO DE IMEI
  // =====================================================

  function handleImeiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    adicionarImei();
  }

  // =====================================================
  // REMOVER IMEI
  // =====================================================

  function removerImei(index: number) {
    setImeis((lista) =>
      lista.filter(
        (_, i) => i !== index
      )
    );

    setMensagem("");
    setErro("");
  }

  // =====================================================
  // ADICIONAR ESTOQUE
  // =====================================================

  async function adicionarEstoque(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    if (!isAdmin) {
      setErro(
        "Apenas o administrador pode adicionar aparelhos ao estoque."
      );
      return;
    }

    const nomeLimpo =
      nome.trim();

    const fornecedorLimpo =
      fornecedor.trim();

    /*
     * A quantidade agora é automática.
     *
     * Quantidade = quantidade de IMEIs
     * adicionados na lista.
     */
    const imeisLimpos =
      imeis
        .map((item) => item.trim())
        .filter(Boolean);

    const quantidadeReal =
      imeisLimpos.length;

    if (!nomeLimpo) {
      setErro(
        "Informe o modelo do aparelho."
      );
      return;
    }

    if (!fornecedorLimpo) {
      setErro(
        "Informe o fornecedor."
      );
      return;
    }

    /*
     * Precisa ter pelo menos um IMEI.
     */
    if (quantidadeReal <= 0) {
      setErro(
        "Adicione pelo menos um IMEI."
      );
      return;
    }

    /*
     * Não pode haver IMEI repetido.
     */
    const imeisUnicos =
      new Set(imeisLimpos);

    if (
      imeisUnicos.size !==
      imeisLimpos.length
    ) {
      setErro(
        "Não pode haver IMEI repetido."
      );
      return;
    }

    let precoUsd: number | null = null;

    if (
      precoCompraUsd.trim() !== ""
    ) {
      precoUsd = Number(
        precoCompraUsd.replace(
          ",",
          "."
        )
      );

      if (
        !Number.isFinite(
          precoUsd
        ) ||
        precoUsd < 0
      ) {
        setErro(
          "Preço de compra USD inválido."
        );
        return;
      }
    }

    setSalvando(true);

    try {
      const response =
        await fetch(
          "/api/estoque",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              nome: nomeLimpo,

              fornecedor:
                fornecedorLimpo,

              /*
               * Quantidade automática:
               * igual ao número de IMEIs.
               */
              quantidade:
                quantidadeReal,

              precoCompraUsd:
                precoUsd,

              imeis:
                imeisLimpos,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao cadastrar aparelho."
        );
      }

      setMensagem(
        "Aparelho(s) cadastrado(s) com sucesso!"
      );

      // Limpar formulário
      setNome("");
      setFornecedor("");
      setPrecoCompraUsd("");
      setImeis([]);
      setImeiBusca("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao cadastrar aparelho."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // ABRIR PREÇO
  // =====================================================

  function abrirPrecoLote(
    lote: Lote
  ) {
    if (!isAdmin) {
      return;
    }

    setLotePrecoAberto(lote.id);

    setPrecoLote(
      lote.precoCompraUsd !== null
        ? String(
            lote.precoCompraUsd
          )
        : ""
    );

    setMensagem("");
    setErro("");
  }

  // =====================================================
  // SALVAR PREÇO
  // =====================================================

  async function salvarPrecoLote() {
    if (
      lotePrecoAberto === null
    ) {
      return;
    }

    if (!isAdmin) {
      setErro(
        "Apenas o administrador pode alterar o preço de compra."
      );
      return;
    }

    setMensagem("");
    setErro("");

    if (!precoLote.trim()) {
      setErro(
        "Informe o preço de compra em USD."
      );
      return;
    }

    const valor = Number(
      precoLote.replace(",", ".")
    );

    if (
      !Number.isFinite(valor) ||
      valor < 0
    ) {
      setErro(
        "Preço de compra USD inválido."
      );
      return;
    }

    setSalvandoPreco(true);

    try {
      const response =
        await fetch(
          "/api/estoque",
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              action:
                "atualizarPreco",

              loteId:
                lotePrecoAberto,

              precoCompraUsd:
                valor,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao atualizar preço."
        );
      }

      setMensagem(
        "Preço de compra USD atualizado com sucesso!"
      );

      setLotePrecoAberto(null);
      setPrecoLote("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao atualizar preço."
      );
    } finally {
      setSalvandoPreco(false);
    }
  }

  // =====================================================
  // EXCLUIR PRODUTO
  // =====================================================

  async function excluirProduto() {
    if (!produtoParaExcluir) {
      return;
    }

    if (!isAdmin) {
      setErro(
        "Apenas o administrador pode excluir produtos."
      );
      return;
    }

    if (!senha.trim()) {
      setErro(
        "Informe a senha."
      );
      return;
    }

    setExcluindo(true);
    setErro("");
    setMensagem("");

    try {
      const response =
        await fetch(
          "/api/estoque",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              produtoId:
                produtoParaExcluir.id,

              senha,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao excluir produto."
        );
      }

      setMensagem(
        "Produto excluído do estoque."
      );

      setProdutoParaExcluir(null);
      setSenha("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao excluir produto."
      );
    } finally {
      setExcluindo(false);
    }
  }

  // =====================================================
  // TROCAR IMEI
  // =====================================================

  async function trocarImei() {
    if (!isAdmin) {
      setErro(
        "Apenas o administrador pode trocar IMEI."
      );
      return;
    }

    setMensagem("");
    setErro("");

    if (!imeiAntigo.trim()) {
      setErro(
        "Informe o IMEI antigo."
      );
      return;
    }

    if (!imeiNovo.trim()) {
      setErro(
        "Informe o IMEI novo."
      );
      return;
    }

    if (
      imeiAntigo.trim() ===
      imeiNovo.trim()
    ) {
      setErro(
        "O IMEI novo deve ser diferente do antigo."
      );
      return;
    }

    setTrocandoImei(true);

    try {
      const response =
        await fetch(
          "/api/estoque",
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              imeiAntigo:
                imeiAntigo.trim(),

              imeiNovo:
                imeiNovo.trim(),
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao trocar IMEI."
        );
      }

      setMensagem(
        "IMEI trocado com sucesso!"
      );

      setImeiAntigo("");
      setImeiNovo("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao trocar IMEI."
      );
    } finally {
      setTrocandoImei(false);
    }
  }

  // =====================================================
  // ALTERAR NOME DO PRODUTO
  // =====================================================

  async function salvarNomeProduto() {
    if (!isAdmin) {
      setErro("Apenas o administrador pode alterar o nome do produto.");
      return;
    }

    if (produtoEditandoNome === null) {
      return;
    }

    const nomeLimpo = novoNomeProduto.trim();

    if (!nomeLimpo) {
      setErro("Informe o novo nome do aparelho.");
      return;
    }

    setSalvandoNomeProduto(true);
    setMensagem("");
    setErro("");

    try {
      const response = await fetch("/api/estoque", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "atualizarNome",
          produtoId: produtoEditandoNome,
          nome: nomeLimpo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao atualizar nome do produto."
        );
      }

      setMensagem(
        data?.message ||
          "Nome do aparelho atualizado com sucesso!"
      );

      setProdutoEditandoNome(null);
      setNovoNomeProduto("");

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao atualizar nome do produto."
      );
    } finally {
      setSalvandoNomeProduto(false);
    }
  }

  function abrirEdicaoNome(produto: Produto) {
    if (!isAdmin) {
      return;
    }

    limparMensagens();
    setProdutoEditandoNome(produto.id);
    setNovoNomeProduto(produto.nome);
  }

  // =====================================================
  // LIMPAR
  // =====================================================

  function limparMensagens() {
    setMensagem("");
    setErro("");
  }

  // =====================================================
  // PRODUTOS DISPONÍVEIS
  // =====================================================

  const produtosDisponiveis =
    produtos.filter((produto) => {
      const temEstoque = (
        produto.aparelhos || []
      ).some(
        (aparelho) => !aparelho.vendido
      );

      const correspondeBusca = produto.nome
        .toLowerCase()
        .includes(
          buscaProduto.toLowerCase().trim()
        );

      return temEstoque && correspondeBusca;
    });

  // =====================================================
  // TOTAL ESTOQUE
  // =====================================================

  const totalEstoque =
    produtos.reduce(
      (total, produto) =>
        total +
        (
          produto.aparelhos ||
          []
        ).filter(
          (aparelho) =>
            !aparelho.vendido
        ).length,
      0
    );

  // =====================================================
  // LOADING USUÁRIO
  // =====================================================

  if (carregandoUsuario) {
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
            maxWidth: "1400px",
            margin: "0 auto",
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          Carregando...
        </div>
      </main>
    );
  }

  // =====================================================
  // TELA
  // =====================================================

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
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* CABEÇALHO */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "25px",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              Estoque
            </h1>

            <p
              style={{
                marginTop: "7px",
                color: "#666",
              }}
            >
              Adel&apos;s Mundo Cell
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "15px 22px",
                borderRadius: "12px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <strong>
                Total em estoque:
              </strong>{" "}
              {totalEstoque}
            </div>

            <div
              style={{
                background: isAdmin
                  ? "#dcfce7"
                  : "#dbeafe",
                color: isAdmin
                  ? "#166534"
                  : "#1e40af",
                padding: "15px 22px",
                borderRadius: "12px",
                fontWeight: 700,
              }}
            >
              {isAdmin
                ? "👑 ADMIN"
                : "👷 FUNCIONÁRIO"}
            </div>
          </div>
        </div>

        {/* MENSAGENS */}

        {mensagem && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "15px",
              fontWeight: 600,
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
              marginBottom: "15px",
              fontWeight: 600,
            }}
          >
            {erro}
          </div>
        )}

        {/* ÁREA ADMIN */}

        {isAdmin && (
          <>
            {/* ADICIONAR ESTOQUE */}

            <section
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "25px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                Adicionar aparelho
              </h2>

              <form
                onSubmit={
                  adicionarEstoque
                }
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "15px",
                  }}
                >
                  <div>
                    <label>
                      Modelo
                    </label>

                    <input
                      value={nome}
                      onChange={(e) =>
                        setNome(
                          e.target.value
                        )
                      }
                      placeholder="Ex: iPhone 17 Pro Max"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label>
                      Fornecedor
                    </label>

                    <input
                      value={
                        fornecedor
                      }
                      onChange={(e) =>
                        setFornecedor(
                          e.target.value
                        )
                      }
                      placeholder="Fornecedor"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label>
                      Quantidade
                    </label>

                    <div
                      style={{
                        ...inputStyle,
                        background:
                          "#f1f5f9",
                        color: "#111827",
                        fontWeight: 700,
                      }}
                    >
                      {imeis.length}
                    </div>

                    <small
                      style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#777",
                      }}
                    >
                      Calculada automaticamente
                      pelos IMEIs adicionados.
                    </small>
                  </div>

                  <div>
                    <label>
                      Preço compra USD
                    </label>

                    <input
                      type="text"
                      inputMode="decimal"
                      value={
                        precoCompraUsd
                      }
                      onChange={(e) =>
                        setPrecoCompraUsd(
                          e.target.value
                        )
                      }
                      placeholder="Ex: 250"
                      style={inputStyle}
                    />

                    <small
                      style={{
                        display: "block",
                        marginTop: "5px",
                        color: "#777",
                      }}
                    >
                      Você pode deixar vazio
                      e colocar depois.
                    </small>
                  </div>
                </div>

                {/* =================================================
                    IMEIS
                ================================================= */}

                <div
                  style={{
                    marginTop: "25px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      marginBottom: "8px",
                    }}
                  >
                    IMEIs adicionados ({imeis.length})
                  </h3>

                  <p
                    style={{
                      color: "#666",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    Digite ou faça Scan do IMEI
                    e aperte Enter.
                  </p>

                  {/* CAMPO DE ENTRADA */}

                  <input
                    value={imeiBusca}
                    onChange={(e) =>
                      setImeiBusca(
                        e.target.value
                      )
                    }
                    onKeyDown={
                      handleImeiKeyDown
                    }
                    placeholder="Digite ou faça Scan do IMEI"
                    autoComplete="off"
                    inputMode="numeric"
                    style={{
                      ...inputStyle,
                      marginTop: "10px",
                      fontSize: "16px",
                    }}
                  />

                  {/* IMEIS ADICIONADOS */}

                  {imeis.length > 0 && (
                    <div
                      style={{
                        marginTop: "15px",
                        display: "grid",
                        gap: "8px",
                      }}
                    >
                      {imeis.map(
                        (
                          imei,
                          index
                        ) => (
                          <div
                            key={`${imei}-${index}`}
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "space-between",
                              gap: "10px",
                              background:
                                "#f8fafc",
                              border:
                                "1px solid #e2e8f0",
                              borderRadius:
                                "9px",
                              padding:
                                "11px 13px",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "14px",
                                fontWeight:
                                  600,
                                wordBreak:
                                  "break-all",
                              }}
                            >
                              IMEI:{" "}
                              {imei}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removerImei(
                                  index
                                )
                              }
                              title="Remover IMEI"
                              style={{
                                border:
                                  "none",
                                background:
                                  "#fee2e2",
                                color:
                                  "#dc2626",
                                width:
                                  "32px",
                                height:
                                  "32px",
                                minWidth:
                                  "32px",
                                borderRadius:
                                  "50%",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  800,
                                fontSize:
                                  "17px",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={salvando}
                  style={{
                    ...primaryButton,
                    marginTop: "20px",
                    opacity:
                      salvando
                        ? 0.6
                        : 1,
                  }}
                >
                  {salvando
                    ? "Salvando..."
                    : "Adicionar ao estoque"}
                </button>
              </form>
            </section>

            {/* TROCAR IMEI */}

            <section
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                marginBottom: "25px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                }}
              >
                Trocar IMEI
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "15px",
                }}
              >
                <input
                  value={imeiAntigo}
                  onChange={(e) =>
                    setImeiAntigo(
                      e.target.value
                    )
                  }
                  placeholder="IMEI antigo"
                  style={inputStyle}
                />

                <input
                  value={imeiNovo}
                  onChange={(e) =>
                    setImeiNovo(
                      e.target.value
                    )
                  }
                  placeholder="IMEI novo"
                  style={inputStyle}
                />

                <button
                  type="button"
                  onClick={
                    trocarImei
                  }
                  disabled={
                    trocandoImei
                  }
                  style={{
                    ...secondaryButton,
                    opacity:
                      trocandoImei
                        ? 0.6
                        : 1,
                  }}
                >
                  {trocandoImei
                    ? "Trocando..."
                    : "Trocar IMEI"}
                </button>
              </div>
            </section>
          </>
        )}

        {/* LISTA ESTOQUE */}

        <section
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            {isAdmin
              ? "Produtos em estoque"
              : "Aparelhos disponíveis"}
          </h2>

          {/* BUSCAR APARELHO */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              value={buscaProduto}
              onChange={(e) =>
                setBuscaProduto(e.target.value)
              }
              placeholder="🔍 Buscar aparelho..."
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
                background: "#f9fafb",
              }}
            />
          </div>

          {loading ? (
            <p>Carregando estoque...</p>
          ) : produtosDisponiveis.length === 0 ? (
            <p style={{ color: "#666" }}>
              Nenhum produto cadastrado.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {produtosDisponiveis.map((produto) => {
                const aparelhosDisponiveis = (
                  produto.aparelhos || []
                ).filter((aparelho) => !aparelho.vendido);

                const lotes = produto.lotes || [];
                const aberto = produtoAberto === produto.id;
                const editandoNome =
                  produtoEditandoNome === produto.id;

                return (
                  <div
                    key={produto.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      background: "#ffffff",
                      overflow: "hidden",
                    }}
                  >
                    {/*
                      PARTE DE FORA:
                      SOMENTE NOME + QUANTIDADE
                    */}
                    <button
                      type="button"
                      onClick={() => {
                        setProdutoAberto(
                          aberto ? null : produto.id
                        );
                        if (produtoEditandoNome !== null) {
                          setProdutoEditandoNome(null);
                          setNovoNomeProduto("");
                        }
                      }}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "#fff",
                        cursor: "pointer",
                        padding: "20px",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "15px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              fontSize: "22px",
                              fontWeight: 800,
                              color: "#111827",
                              wordBreak: "break-word",
                            }}
                          >
                            📱 {produto.nome}
                          </div>

                          <div
                            style={{
                              marginTop: "7px",
                              color: "#555",
                              fontSize: "15px",
                            }}
                          >
                            <strong>
                              {aparelhosDisponiveis.length}
                            </strong>{" "}
                            aparelho(s) disponível(is)
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: "25px",
                            color: "#64748b",
                            flexShrink: 0,
                          }}
                        >
                          {aberto ? "⌃" : "⌄"}
                        </div>
                      </div>
                    </button>

                    {/*
                      DETALHES:
                      SÓ APARECEM QUANDO CLICAR NO TELEFONE
                    */}
                    {aberto && (
                      <div
                        style={{
                          borderTop: "1px solid #e5e7eb",
                          padding: "20px",
                          background: "#fafafa",
                        }}
                      >
                        {/* ALTERAR NOME */}
                        {isAdmin && (
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "10px",
                              padding: "15px",
                              marginBottom: "18px",
                            }}
                          >
                            {!editandoNome ? (
                              <button
                                type="button"
                                onClick={() =>
                                  abrirEdicaoNome(produto)
                                }
                                style={{
                                  ...secondaryButton,
                                  padding: "10px 15px",
                                }}
                              >
                                ✏️ Alterar nome do aparelho
                              </button>
                            ) : (
                              <div>
                                <label
                                  style={{
                                    fontWeight: 700,
                                    display: "block",
                                  }}
                                >
                                  Novo nome do aparelho
                                </label>

                                <input
                                  type="text"
                                  value={novoNomeProduto}
                                  onChange={(e) =>
                                    setNovoNomeProduto(
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      salvarNomeProduto();
                                    }
                                  }}
                                  autoFocus
                                  style={{
                                    ...inputStyle,
                                    marginTop: "8px",
                                  }}
                                />

                                <p
                                  style={{
                                    margin: "8px 0 0",
                                    color: "#666",
                                    fontSize: "13px",
                                  }}
                                >
                                  Se já existir outro aparelho com este
                                  nome, os dois serão unidos.
                                </p>

                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    marginTop: "10px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={salvarNomeProduto}
                                    disabled={salvandoNomeProduto}
                                    style={{
                                      ...primaryButton,
                                      opacity: salvandoNomeProduto
                                        ? 0.6
                                        : 1,
                                    }}
                                  >
                                    {salvandoNomeProduto
                                      ? "Salvando..."
                                      : "💾 Salvar nome"}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProdutoEditandoNome(null);
                                      setNovoNomeProduto("");
                                    }}
                                    style={cancelButton}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* EXCLUIR PRODUTO */}
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => {
                              limparMensagens();
                              setProdutoParaExcluir(produto);
                              setSenha("");
                            }}
                            style={{
                              ...deleteButton,
                              marginBottom: "18px",
                            }}
                          >
                            🗑️ Excluir produto
                          </button>
                        )}

                        {/* IMEIS DISPONÍVEIS - NUNCA MOSTRAR VENDIDOS */}
                        <div
                          style={{
                            padding: "15px",
                            background: "#f8fafc",
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 800,
                              marginBottom: "10px",
                            }}
                          >
                            📱 IMEIs disponíveis ({
                              aparelhosDisponiveis.length
                            })
                          </div>

                          {aparelhosDisponiveis.length === 0 ? (
                            <span
                              style={{
                                color: "#777",
                                fontSize: "13px",
                              }}
                            >
                              Nenhum IMEI disponível.
                            </span>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              {aparelhosDisponiveis.map((aparelho) => (
                                <span
                                  key={aparelho.id}
                                  style={{
                                    background: "#dcfce7",
                                    color: "#166534",
                                    padding: "8px 11px",
                                    borderRadius: "7px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {aparelho.imei}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* COMPRAS / LOTES */}
                        {lotes.length > 0 && (
                          <div style={{ marginTop: "20px" }}>
                            <h4
                              style={{
                                margin: "0 0 12px",
                                fontSize: "17px",
                              }}
                            >
                              📦 Compras por fornecedor
                            </h4>

                            <div
                              style={{
                                display: "grid",
                                gap: "12px",
                              }}
                            >
                              {lotes.map((lote, index) => {
                                const aparelhosDoLote =
                                  lote.aparelhos || [];

                                const aparelhosDisponiveisDoLote =
                                  aparelhosDoLote.filter(
                                    (aparelho) => !aparelho.vendido
                                  );

                                return (
                                  <div
                                    key={lote.id}
                                    style={{
                                      background: "#f8fafc",
                                      padding: "17px",
                                      borderRadius: "10px",
                                      border: "1px solid #e2e8f0",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "10px",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <strong style={{ fontSize: "16px" }}>
                                        📦 Compra #{lotes.length - index}
                                      </strong>

                                      <span
                                        style={{
                                          background: "#dbeafe",
                                          color: "#1e40af",
                                          padding: "5px 9px",
                                          borderRadius: "20px",
                                          fontSize: "12px",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {aparelhosDisponiveisDoLote.length}
                                        {" "}
                                        disponível(is)
                                      </span>
                                    </div>

                                    <div style={{ marginTop: "12px" }}>
                                      <strong>Fornecedor:</strong>{" "}
                                      {lote.fornecedor || "-"}
                                    </div>

                                    <div style={{ marginTop: "7px" }}>
                                      <strong>Preço de compra:</strong>{" "}
                                      {lote.precoCompraUsd !== null ? (
                                        `$ ${Number(
                                          lote.precoCompraUsd
                                        ).toFixed(2)}`
                                      ) : (
                                        <span
                                          style={{
                                            color: "#dc2626",
                                            fontWeight: 700,
                                          }}
                                        >
                                          Não informado
                                        </span>
                                      )}
                                    </div>

                                    <div style={{ marginTop: "7px" }}>
                                      <strong>Quantidade comprada:</strong>{" "}
                                      {lote.quantidade}
                                    </div>

                                    <div
                                      style={{
                                        marginTop: "7px",
                                        color: "#777",
                                        fontSize: "13px",
                                      }}
                                    >
                                      Data da compra:{" "}
                                      {new Date(
                                        lote.createdAt
                                      ).toLocaleDateString("pt-BR")}
                                    </div>

                                    {/*
                                      AQUI TAMBÉM SÓ MOSTRAMOS IMEIs
                                      QUE AINDA NÃO FORAM VENDIDOS.
                                    */}
                                    <div
                                      style={{
                                        marginTop: "15px",
                                        padding: "12px",
                                        background: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #e5e7eb",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontWeight: 700,
                                          marginBottom: "9px",
                                        }}
                                      >
                                        IMEIs disponíveis desta compra:
                                      </div>

                                      {aparelhosDisponiveisDoLote.length ===
                                      0 ? (
                                        <span
                                          style={{
                                            color: "#777",
                                            fontSize: "13px",
                                          }}
                                        >
                                          Nenhum IMEI disponível.
                                        </span>
                                      ) : (
                                        <div
                                          style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "7px",
                                          }}
                                        >
                                          {aparelhosDisponiveisDoLote.map(
                                            (aparelho) => (
                                              <span
                                                key={aparelho.id}
                                                style={{
                                                  background: "#dcfce7",
                                                  color: "#166534",
                                                  padding: "7px 9px",
                                                  borderRadius: "7px",
                                                  fontSize: "12px",
                                                  fontWeight: 600,
                                                  wordBreak: "break-all",
                                                }}
                                              >
                                                {aparelho.imei}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    {/* PREÇO USD */}
                                    {isAdmin && (
                                      <>
                                        {lotePrecoAberto !== lote.id ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              abrirPrecoLote(lote)
                                            }
                                            style={{
                                              ...secondaryButton,
                                              marginTop: "12px",
                                              padding: "9px 14px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {lote.precoCompraUsd !== null
                                              ? "✏️ Alterar preço USD"
                                              : "💵 Adicionar preço USD"}
                                          </button>
                                        ) : (
                                          <div
                                            style={{
                                              marginTop: "12px",
                                              background: "#fff",
                                              border: "1px solid #d1d5db",
                                              padding: "12px",
                                              borderRadius: "8px",
                                            }}
                                          >
                                            <label
                                              style={{
                                                fontWeight: 700,
                                              }}
                                            >
                                              Preço de compra USD
                                            </label>

                                            <input
                                              type="text"
                                              inputMode="decimal"
                                              autoFocus
                                              value={precoLote}
                                              onChange={(e) =>
                                                setPrecoLote(e.target.value)
                                              }
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  e.preventDefault();
                                                  salvarPrecoLote();
                                                }
                                              }}
                                              placeholder="Ex: 250"
                                              style={{
                                                ...inputStyle,
                                                marginTop: "7px",
                                              }}
                                            />

                                            <div
                                              style={{
                                                display: "flex",
                                                gap: "8px",
                                                marginTop: "10px",
                                                flexWrap: "wrap",
                                              }}
                                            >
                                              <button
                                                type="button"
                                                onClick={salvarPrecoLote}
                                                disabled={salvandoPreco}
                                                style={{
                                                  ...primaryButton,
                                                  opacity: salvandoPreco
                                                    ? 0.6
                                                    : 1,
                                                }}
                                              >
                                                {salvandoPreco
                                                  ? "Salvando..."
                                                  : "💾 Salvar preço"}
                                              </button>

                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setLotePrecoAberto(null);
                                                  setPrecoLote("");
                                                }}
                                                style={cancelButton}
                                              >
                                                Cancelar
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
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

      {/* MODAL SENHA ADMIN */}

      {isAdmin &&
        produtoParaExcluir && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              padding: "20px",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: "#fff",
                width: "100%",
                maxWidth: "420px",
                borderRadius: "16px",
                padding: "25px",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.25)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                }}
              >
                🔐 Confirmar exclusão
              </h2>

              <p
                style={{
                  color: "#555",
                }}
              >
                Você está tentando excluir:
              </p>

              <div
                style={{
                  background:
                    "#f1f5f9",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                {
                  produtoParaExcluir.nome
                }
              </div>

              <label>
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                placeholder="Digite a senha"
                autoFocus
                style={{
                  ...inputStyle,
                  marginTop: "8px",
                  marginBottom:
                    "18px",
                }}
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    excluirProduto();
                  }
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setProdutoParaExcluir(
                      null
                    );

                    setSenha("");
                  }}
                  style={{
                    ...cancelButton,
                    flex: 1,
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={
                    excluirProduto
                  }
                  disabled={
                    excluindo
                  }
                  style={{
                    ...deleteButton,
                    flex: 1,
                    opacity:
                      excluindo
                        ? 0.6
                        : 1,
                  }}
                >
                  {excluindo
                    ? "Excluindo..."
                    : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}

// =====================================================
// STYLES
// =====================================================

const inputStyle: React.CSSProperties =
  {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginTop: "7px",
    border:
      "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  };

const primaryButton: React.CSSProperties =
  {
    border: "none",
    background: "#111827",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
  };

const secondaryButton: React.CSSProperties =
  {
    border: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
  };

const deleteButton: React.CSSProperties =
  {
    border: "none",
    background: "#dc2626",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  };

const cancelButton: React.CSSProperties =
  {
    border:
      "1px solid #d1d5db",
    background: "#fff",
    color: "#333",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  };