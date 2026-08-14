"use client";

import { useEffect, useState } from "react";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
  produtoId: number;
  loteId: number;
};

type Lote = {
  id: number;
  fornecedor: string;
  precoCompraUsd: number | null;
  quantidade: number;
  createdAt: string;
  aparelhos: Aparelho[];
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  createdAt: string;
  lotes: Lote[];
  aparelhos: Aparelho[];
};

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FORMULÁRIO
  // =====================================================

  const [nome, setNome] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [precoCompraUsd, setPrecoCompraUsd] = useState("");

  const [imeis, setImeis] = useState<string[]>([""]);

  const [salvando, setSalvando] = useState(false);

  // =====================================================
  // PREÇO USD POSTERIORMENTE
  // =====================================================

  const [lotePrecoAberto, setLotePrecoAberto] =
    useState<number | null>(null);

  const [precoLote, setPrecoLote] = useState("");

  const [salvandoPreco, setSalvandoPreco] =
    useState(false);

  // =====================================================
  // DELETE
  // =====================================================

  const [produtoParaExcluir, setProdutoParaExcluir] =
    useState<Produto | null>(null);

  const [senha, setSenha] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  // =====================================================
  // TROCAR IMEI
  // =====================================================

  const [imeiAntigo, setImeiAntigo] = useState("");
  const [imeiNovo, setImeiNovo] = useState("");
  const [trocandoImei, setTrocandoImei] =
    useState(false);

  // =====================================================
  // MENSAGENS
  // =====================================================

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // =====================================================
  // CARREGAR ESTOQUE
  // =====================================================

  async function carregarEstoque() {
    try {
      setLoading(true);

      const response = await fetch("/api/estoque", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao carregar estoque."
        );
      }

      setProdutos(data);
    } catch (error: any) {
      setErro(
        error.message ||
          "Erro ao carregar estoque."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarEstoque();
  }, []);

  // =====================================================
  // ALTERAR QUANTIDADE
  // =====================================================

  function alterarQuantidade(valor: string) {
    const qtd = Math.max(
      1,
      Number(valor) || 1
    );

    setQuantidade(String(qtd));

    setImeis((lista) => {
      const novaLista = [...lista];

      while (novaLista.length < qtd) {
        novaLista.push("");
      }

      while (novaLista.length > qtd) {
        novaLista.pop();
      }

      return novaLista;
    });
  }

  // =====================================================
  // ALTERAR IMEI
  // =====================================================

  function alterarImei(
    index: number,
    valor: string
  ) {
    setImeis((lista) => {
      const novaLista = [...lista];

      novaLista[index] = valor;

      return novaLista;
    });
  }

  // =====================================================
  // ENTER NO IMEI
  // ADICIONA NOVA LINHA AUTOMATICAMENTE
  // =====================================================

  function handleImeiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    setImeis((lista) => {
      const novaLista = [...lista];

      const imeiAtual = novaLista[index].trim();

      if (!imeiAtual) {
        return novaLista;
      }

      if (index === novaLista.length - 1) {
        novaLista.push("");

        setQuantidade(
          String(novaLista.length)
        );
      }

      return novaLista;
    });

    setTimeout(() => {
      const proximoIndex = index + 1;

      const elemento =
        document.getElementById(
          `imei-${proximoIndex}`
        ) as HTMLInputElement | null;

      elemento?.focus();
    }, 50);
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

    const qtd = Number(quantidade);

    const imeisLimpos = imeis
      .map((item) => item.trim())
      .filter(Boolean);

    if (!nome.trim()) {
      setErro(
        "Informe o modelo do aparelho."
      );
      return;
    }

    if (!fornecedor.trim()) {
      setErro(
        "Informe o fornecedor."
      );
      return;
    }

    if (
      !Number.isInteger(qtd) ||
      qtd <= 0
    ) {
      setErro(
        "Quantidade inválida."
      );
      return;
    }

    if (imeisLimpos.length !== qtd) {
      setErro(
        "Informe um IMEI para cada aparelho."
      );
      return;
    }

    const imeisUnicos = new Set(
      imeisLimpos
    );

    if (
      imeisUnicos.size !==
      imeisLimpos.length
    ) {
      setErro(
        "Não pode haver IMEI repetido."
      );
      return;
    }

    setSalvando(true);

    try {
      const response = await fetch(
        "/api/estoque",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            fornecedor:
              fornecedor.trim(),
            quantidade: qtd,
            precoCompraUsd:
              precoCompraUsd === ""
                ? null
                : Number(
                    precoCompraUsd
                  ),
            imeis: imeisLimpos,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Erro ao cadastrar aparelho."
        );
      }

      setMensagem(
        "Aparelho(s) cadastrado(s) com sucesso!"
      );

      setNome("");
      setFornecedor("");
      setQuantidade("1");
      setPrecoCompraUsd("");
      setImeis([""]);

      await carregarEstoque();
    } catch (error: any) {
      setErro(
        error.message ||
          "Erro ao cadastrar aparelho."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // ADICIONAR / ALTERAR PREÇO USD DEPOIS
  // =====================================================

  function abrirPrecoLote(lote: Lote) {
    setLotePrecoAberto(lote.id);

    setPrecoLote(
      lote.precoCompraUsd !== null
        ? String(lote.precoCompraUsd)
        : ""
    );

    setMensagem("");
    setErro("");
  }

  async function salvarPrecoLote() {
    if (lotePrecoAberto === null) {
      return;
    }

    setMensagem("");
    setErro("");

    if (precoLote.trim() === "") {
      setErro(
        "Informe o preço de compra em USD."
      );
      return;
    }

    const valor = Number(precoLote);

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
      const response = await fetch(
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
            precoCompraUsd: valor,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
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
        error.message ||
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

    if (!senha.trim()) {
      setErro("Informe a senha.");
      return;
    }

    setExcluindo(true);
    setErro("");
    setMensagem("");

    try {
      const response = await fetch(
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
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
        error.message ||
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

    setTrocandoImei(true);

    try {
      const response = await fetch(
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
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
        error.message ||
          "Erro ao trocar IMEI."
      );
    } finally {
      setTrocandoImei(false);
    }
  }

  // =====================================================
  // LIMPAR MENSAGENS
  // =====================================================

  function limparMensagens() {
    setMensagem("");
    setErro("");
  }

  // =====================================================
  // PRODUTOS QUE AINDA POSSUEM APARELHOS
  // =====================================================

  const produtosDisponiveis = produtos.filter(
    (produto) =>
      produto.aparelhos.some(
        (aparelho) => !aparelho.vendido
      )
  );

  // =====================================================
  // TOTAL ESTOQUE
  // CONTA SOMENTE APARELHOS NÃO VENDIDOS
  // =====================================================

  const totalEstoque = produtos.reduce(
    (total, produto) =>
      total +
      produto.aparelhos.filter(
        (aparelho) => !aparelho.vendido
      ).length,
    0
  );

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
        {/* =================================================
            CABEÇALHO
        ================================================== */}

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
              background: "#fff",
              padding:
                "15px 22px",
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
        </div>

        {/* =================================================
            MENSAGENS
        ================================================== */}

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

        {/* =================================================
            ADICIONAR ESTOQUE
        ================================================== */}

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
            onSubmit={adicionarEstoque}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {/* MODELO */}

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

              {/* FORNECEDOR */}

              <div>
                <label>
                  Fornecedor
                </label>

                <input
                  value={fornecedor}
                  onChange={(e) =>
                    setFornecedor(
                      e.target.value
                    )
                  }
                  placeholder="Fornecedor"
                  style={inputStyle}
                />
              </div>

              {/* QUANTIDADE */}

              <div>
                <label>
                  Quantidade
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) =>
                    alterarQuantidade(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              {/* PREÇO USD */}

              <div>
                <label>
                  Preço compra USD
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={
                    precoCompraUsd
                  }
                  onChange={(e) =>
                    setPrecoCompraUsd(
                      e.target.value
                    )
                  }
                  placeholder="Opcional — pode colocar depois"
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
            ================================================== */}

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <h3>
                IMEI dos aparelhos
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Digite o IMEI e aperte
                Enter para adicionar
                outro.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "10px",
                }}
              >
                {imeis.map(
                  (imei, index) => (
                    <input
                      id={`imei-${index}`}
                      key={index}
                      value={imei}
                      onChange={(e) =>
                        alterarImei(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleImeiKeyDown(
                          e,
                          index
                        )
                      }
                      placeholder={`IMEI ${index + 1}`}
                      style={inputStyle}
                    />
                  )
                )}
              </div>
            </div>

            {/* BOTÃO */}

            <button
              type="submit"
              disabled={salvando}
              style={{
                ...primaryButton,
                marginTop: "20px",
                opacity: salvando
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

        {/* =================================================
            TROCAR IMEI
        ================================================== */}

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
              onClick={trocarImei}
              disabled={trocandoImei}
              style={{
                ...secondaryButton,
                opacity: trocandoImei
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

        {/* =================================================
            LISTA ESTOQUE
        ================================================== */}

        <section
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
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
            Produtos em estoque
          </h2>

          {loading ? (
            <p>
              Carregando estoque...
            </p>
          ) : produtosDisponiveis.length === 0 ? (
            <p
              style={{
                color: "#666",
              }}
            >
              Nenhum produto cadastrado.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {produtosDisponiveis.map(
                (produto) => {
                  const aparelhosDisponiveis =
                    produto.aparelhos.filter(
                      (aparelho) =>
                        !aparelho.vendido
                    );

                  return (
                    <div
                      key={produto.id}
                      style={{
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "20px",
                      }}
                    >
                      {/* PRODUTO HEADER */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: "15px",
                          flexWrap:
                            "wrap",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin:
                                "0 0 8px",
                              fontSize:
                                "21px",
                            }}
                          >
                            {produto.nome}
                          </h3>

                          <div
                            style={{
                              color:
                                "#555",
                            }}
                          >
                            Quantidade:{" "}
                            <strong>
                              {
                                aparelhosDisponiveis.length
                              }
                            </strong>
                          </div>
                        </div>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => {
                            limparMensagens();

                            setProdutoParaExcluir(
                              produto
                            );

                            setSenha("");
                          }}
                          style={
                            deleteButton
                          }
                        >
                          🗑️ Excluir
                        </button>
                      </div>

                      {/* =================================================
                          IMEIS DISPONÍVEIS
                      ================================================== */}

                      <div
                        style={{
                          marginTop:
                            "18px",
                        }}
                      >
                        <strong>
                          IMEI:
                        </strong>

                        <div
                          style={{
                            display:
                              "flex",
                            flexWrap:
                              "wrap",
                            gap: "8px",
                            marginTop:
                              "10px",
                          }}
                        >
                          {aparelhosDisponiveis.map(
                            (
                              aparelho
                            ) => (
                              <span
                                key={
                                  aparelho.id
                                }
                                style={{
                                  background:
                                    "#f1f5f9",
                                  padding:
                                    "7px 10px",
                                  borderRadius:
                                    "7px",
                                  fontSize:
                                    "13px",
                                }}
                              >
                                {
                                  aparelho.imei
                                }
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* =================================================
                          LOTES
                      ================================================== */}

                      {produto.lotes &&
                        produto.lotes
                          .length >
                          0 && (
                          <details
                            style={{
                              marginTop:
                                "18px",
                            }}
                          >
                            <summary
                              style={{
                                cursor:
                                  "pointer",
                                fontWeight:
                                  700,
                              }}
                            >
                              Ver compras /
                              fornecedores
                            </summary>

                            <div
                              style={{
                                marginTop:
                                  "12px",
                                display:
                                  "grid",
                                gap: "10px",
                              }}
                            >
                              {produto.lotes.map(
                                (lote) => (
                                  <div
                                    key={
                                      lote.id
                                    }
                                    style={{
                                      background:
                                        "#f8fafc",
                                      padding:
                                        "15px",
                                      borderRadius:
                                        "8px",
                                      border:
                                        "1px solid #e5e7eb",
                                    }}
                                  >
                                    {/* FORNECEDOR */}

                                    <div>
                                      <strong>
                                        Fornecedor:
                                      </strong>{" "}
                                      {
                                        lote.fornecedor
                                      }
                                    </div>

                                    {/* QUANTIDADE */}

                                    <div
                                      style={{
                                        marginTop:
                                          "5px",
                                      }}
                                    >
                                      <strong>
                                        Quantidade:
                                      </strong>{" "}
                                      {
                                        lote.aparelhos.filter(
                                          (
                                            aparelho
                                          ) =>
                                            !aparelho.vendido
                                        ).length
                                      }
                                    </div>

                                    {/* PREÇO */}

                                    <div
                                      style={{
                                        marginTop:
                                          "8px",
                                      }}
                                    >
                                      <strong>
                                        Compra USD:
                                      </strong>{" "}

                                      {lote.precoCompraUsd !==
                                      null
                                        ? `$ ${Number(
                                            lote.precoCompraUsd
                                          ).toFixed(
                                            2
                                          )}`
                                        : (
                                          <span
                                            style={{
                                              color:
                                                "#dc2626",
                                              fontWeight:
                                                600,
                                            }}
                                          >
                                            Não informado
                                          </span>
                                        )}
                                    </div>

                                    {/* BOTÃO PREÇO */}

                                    {lotePrecoAberto !==
                                    lote.id ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          abrirPrecoLote(
                                            lote
                                          )
                                        }
                                        style={{
                                          ...secondaryButton,
                                          marginTop:
                                            "12px",
                                          padding:
                                            "9px 14px",
                                          fontSize:
                                            "14px",
                                        }}
                                      >
                                        {lote.precoCompraUsd !==
                                        null
                                          ? "✏️ Alterar preço USD"
                                          : "💵 Adicionar preço USD"}
                                      </button>
                                    ) : (
                                      <div
                                        style={{
                                          marginTop:
                                            "12px",
                                          background:
                                            "#fff",
                                          border:
                                            "1px solid #d1d5db",
                                          padding:
                                            "12px",
                                          borderRadius:
                                            "8px",
                                        }}
                                      >
                                        <label
                                          style={{
                                            fontWeight:
                                              700,
                                          }}
                                        >
                                          Preço de compra USD
                                        </label>

                                        <input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          autoFocus
                                          value={
                                            precoLote
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            setPrecoLote(
                                              e
                                                .target
                                                .value
                                            )
                                          }
                                          onKeyDown={(
                                            e
                                          ) => {
                                            if (
                                              e.key ===
                                              "Enter"
                                            ) {
                                              e.preventDefault();
                                              salvarPrecoLote();
                                            }
                                          }}
                                          placeholder="Ex: 850"
                                          style={{
                                            ...inputStyle,
                                            marginTop:
                                              "7px",
                                          }}
                                        />

                                        <div
                                          style={{
                                            display:
                                              "flex",
                                            gap: "8px",
                                            marginTop:
                                              "10px",
                                            flexWrap:
                                              "wrap",
                                          }}
                                        >
                                          <button
                                            type="button"
                                            onClick={
                                              salvarPrecoLote
                                            }
                                            disabled={
                                              salvandoPreco
                                            }
                                            style={{
                                              ...primaryButton,
                                              opacity:
                                                salvandoPreco
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
                                              setLotePrecoAberto(
                                                null
                                              );
                                              setPrecoLote(
                                                ""
                                              );
                                            }}
                                            style={
                                              cancelButton
                                            }
                                          >
                                            Cancelar
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </details>
                        )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>

      {/* =====================================================
          MODAL SENHA
      ===================================================== */}

      {produtoParaExcluir && (
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
                borderRadius:
                  "8px",
                fontWeight: 700,
                marginBottom:
                  "18px",
              }}
            >
              {produtoParaExcluir.nome}
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
                  e.key === "Enter"
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
                disabled={excluindo}
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
    border: "1px solid #d1d5db",
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
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#333",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  };