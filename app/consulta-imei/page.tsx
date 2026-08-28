"use client";

import { useState } from "react";

type Resultado = {
  encontrado: boolean;
  mensagem?: string;

  aparelho?: {
    id: number;
    imei: string;
    vendido: boolean;

    produto?: {
      id: number;
      nome: string;
    } | null;

    lote?: {
      id: number;
      fornecedor?: string | null;
      precoCompraUsd?: number | null;
    } | null;

    venda?: {
      id: number;
      cliente: string | null;
      dataVenda: string | null;
      createdAt: string;
    } | null;
  };
};

export default function ConsultaImeiPage() {

  const [imei, setImei] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);

  const [resultado, setResultado] =
    useState<Resultado | null>(
      null
    );

  const [erro, setErro] =
    useState("");

  // =====================================================
  // CONSULTAR
  // =====================================================

  async function consultarImei() {

    setErro("");
    setResultado(null);

    const valor =
      imei.trim();

    if (!valor) {
      setErro(
        "Digite o IMEI."
      );
      return;
    }

    setCarregando(true);

    try {

      const res =
        await fetch(
          `/api/consulta-imei?imei=${encodeURIComponent(
            valor
          )}`,
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Erro ao consultar IMEI."
        );
      }

      setResultado(data);

    } catch (e) {

      setErro(
        e instanceof Error
          ? e.message
          : "Erro ao consultar IMEI."
      );

    } finally {

      setCarregando(false);
    }
  }

  // =====================================================
  // LIMPAR
  // =====================================================

  function limpar() {
    setImei("");
    setResultado(null);
    setErro("");
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(
    data: string | null | undefined
  ) {

    if (!data) {
      return "-";
    }

    const d =
      new Date(data);

    if (
      Number.isNaN(
        d.getTime()
      )
    ) {
      return "-";
    }

    return d.toLocaleString(
      "pt-BR",
      {
        dateStyle:
          "short",
        timeStyle:
          "short",
      }
    );
  }

  // =====================================================
  // STATUS
  // =====================================================

  function statusAparelho() {

    if (
      !resultado?.aparelho
    ) {
      return "";
    }

    return resultado.aparelho.vendido
      ? "Vendido"
      : "Disponível em estoque";
  }

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#f5f6f8",

        padding: 24,

        fontFamily:
          "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth:
            850,

          margin:
            "0 auto",
        }}
      >

        {/* ================================================= */}
        {/* CABEÇALHO */}
        {/* ================================================= */}

        <div
          style={{
            background:
              "#fff",

            borderRadius:
              16,

            padding:
              24,

            marginBottom:
              20,

            border:
              "1px solid #e5e5e5",
          }}
        >

          <h1
            style={{
              margin: 0,
              fontSize: 32,
            }}
          >
            🔍 Consulta IMEI
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: 0,
            }}
          >
            Adel&apos;s Mundo Cell
          </p>

        </div>

        {/* ================================================= */}
        {/* CONSULTA */}
        {/* ================================================= */}

        <section
          style={{
            background:
              "#fff",

            borderRadius:
              16,

            padding:
              24,

            border:
              "1px solid #e5e5e5",
          }}
        >

          <h2
            style={{
              marginTop: 0,
              fontSize: 21,
            }}
          >
            Consultar aparelho
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            Digite ou escaneie o IMEI para
            verificar o aparelho.
          </p>

          {/* IMEI */}

          <label
            style={{
              display:
                "block",

              fontWeight:
                700,

              marginTop:
                20,
            }}
          >
            IMEI

            <input
              value={imei}

              onChange={(e) =>
                setImei(
                  e.target.value.replace(
                    /\s/g,
                    ""
                  )
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key ===
                  "Enter"
                ) {

                  e.preventDefault();

                  consultarImei();
                }
              }}

              placeholder="Digite ou escaneie o IMEI"

              inputMode="numeric"

              autoComplete="off"

              style={{
                display:
                  "block",

                width:
                  "100%",

                boxSizing:
                  "border-box",

                marginTop:
                  8,

                padding:
                  "15px 14px",

                border:
                  "1px solid #ccc",

                borderRadius:
                  10,

                fontSize:
                  17,

                outline:
                  "none",
              }}
            />

          </label>

          {/* BOTÕES */}

          <div
            style={{
              display:
                "flex",

              gap:
                10,

              marginTop:
                16,

              flexWrap:
                "wrap",
            }}
          >

            <button
              type="button"
              onClick={
                consultarImei
              }
              disabled={
                carregando
              }

              style={{
                border: 0,

                borderRadius:
                  10,

                padding:
                  "13px 20px",

                background:
                  "#1769e0",

                color:
                  "#fff",

                fontWeight:
                  700,

                fontSize:
                  15,

                cursor:
                  carregando
                    ? "default"
                    : "pointer",

                opacity:
                  carregando
                    ? 0.7
                    : 1,
              }}
            >
              {carregando
                ? "Consultando..."
                : "🔍 Consultar IMEI"}
            </button>

            <button
              type="button"
              onClick={
                limpar
              }

              style={{
                border:
                  "1px solid #ccc",

                borderRadius:
                  10,

                padding:
                  "13px 20px",

                background:
                  "#fff",

                color:
                  "#333",

                fontWeight:
                  700,

                fontSize:
                  15,

                cursor:
                  "pointer",
              }}
            >
              Limpar
            </button>

          </div>

          {/* ================================================= */}
          {/* ERRO */}
          {/* ================================================= */}

          {erro && (
            <div
              style={{
                marginTop:
                  20,

                padding:
                  16,

                borderRadius:
                  10,

                background:
                  "#fff1f0",

                color:
                  "#b42318",

                fontWeight:
                  600,

                lineHeight:
                  1.5,
              }}
            >
              ❌ {erro}
            </div>
          )}

          {/* ================================================= */}
          {/* RESULTADO */}
          {/* ================================================= */}

          {resultado && (

            <div
              style={{
                marginTop:
                  22,
              }}
            >

              {resultado.encontrado &&
              resultado.aparelho ? (

                <>

                  {/* APARELHO */}

                  <div
                    style={{
                      padding:
                        18,

                      borderRadius:
                        12,

                      background:
                        "#eefaf1",

                      border:
                        "1px solid #b7e1c0",
                    }}
                  >

                    <h2
                      style={{
                        marginTop:
                          0,

                        color:
                          "#16823b",
                      }}
                    >
                      ✅ Aparelho encontrado
                    </h2>

                    <p
                      style={{
                        marginBottom:
                          0,

                        color:
                          "#146c2e",

                        fontWeight:
                          600,
                      }}
                    >
                      Este IMEI está
                      cadastrado no
                      sistema da
                      Adel&apos;s Mundo Cell.
                    </p>

                  </div>

                  {/* INFORMAÇÕES */}

                  <div
                    style={{
                      marginTop:
                        18,

                      display:
                        "grid",

                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",

                      gap:
                        12,
                    }}
                  >

                    <Info
                      titulo="IMEI"
                      valor={
                        resultado
                          .aparelho
                          .imei
                      }
                    />

                    <Info
                      titulo="Modelo"
                      valor={
                        resultado
                          .aparelho
                          .produto
                          ?.nome ||
                        "-"
                      }
                    />

                    <Info
                      titulo="Status"
                      valor={
                        statusAparelho()
                      }
                    />

                    <Info
                      titulo="Fornecedor"
                      valor={
                        resultado
                          .aparelho
                          .lote
                          ?.fornecedor ||
                        "-"
                      }
                    />

                    <Info
                      titulo="Preço de compra USD"
                      valor={
                        resultado
                          .aparelho
                          .lote
                          ?.precoCompraUsd !=
                        null
                          ? `US$ ${Number(
                              resultado
                                .aparelho
                                .lote
                                .precoCompraUsd
                            )
                              .toFixed(
                                2
                              )
                              .replace(
                                ".",
                                ","
                              )}`
                          : "-"
                      }
                    />

                    <Info
                      titulo="ID do aparelho"
                      valor={String(
                        resultado
                          .aparelho
                          .id
                      )}
                    />

                  </div>

                  {/* ================================================= */}
                  {/* INFORMAÇÕES DA VENDA */}
                  {/* ================================================= */}

                  {resultado.aparelho.vendido && (
                    <div
                      style={{
                        marginTop:
                          18,

                        padding:
                          20,

                        borderRadius:
                          12,

                        background:
                          "#fff8e6",

                        border:
                          "1px solid #f0d58a",
                      }}
                    >

                      <h2
                        style={{
                          marginTop:
                            0,

                          color:
                            "#795500",
                        }}
                      >
                        🧾 Informações da venda
                      </h2>

                      <div
                        style={{
                          display:
                            "grid",

                          gridTemplateColumns:
                            "repeat(2, minmax(0, 1fr))",

                          gap:
                            12,
                        }}
                      >

                        <Info
                          titulo="Vendido para"
                          valor={
                            resultado
                              .aparelho
                              .venda
                              ?.cliente ||
                            "-"
                          }
                        />

                        <Info
                          titulo="Data da venda"
                          valor={
                            formatarData(
                              resultado
                                .aparelho
                                .venda
                                ?.dataVenda ||
                              resultado
                                .aparelho
                                .venda
                                ?.createdAt
                            )
                          }
                        />

                        <Info
                          titulo="ID da venda"
                          valor={String(
                            resultado
                              .aparelho
                              .venda
                              ?.id ??
                            "-"
                          )}
                        />

                      </div>

                    </div>
                  )}

                  {/* STATUS */}

                  {!resultado.aparelho.vendido ? (

                    <div
                      style={{
                        marginTop:
                          18,

                        padding:
                          16,

                        borderRadius:
                          10,

                        background:
                          "#eef6ff",

                        border:
                          "1px solid #b9d8ff",

                        color:
                          "#1559a6",

                        fontWeight:
                          700,
                      }}
                    >
                      📦 Este aparelho
                      ainda está
                      disponível no
                      estoque.
                    </div>

                  ) : (

                    <div
                      style={{
                        marginTop:
                          18,

                        padding:
                          16,

                        borderRadius:
                          10,

                        background:
                          "#fff1f0",

                        border:
                          "1px solid #f1b8b5",

                        color:
                          "#b42318",

                        fontWeight:
                          700,
                      }}
                    >
                      🔴 Este aparelho
                      foi vendido.

                      {resultado
                        .aparelho
                        .venda
                        ?.cliente && (
                        <>
                          {" "}
                          Para:{" "}
                          {
                            resultado
                              .aparelho
                              .venda
                              .cliente
                          }
                        </>
                      )}
                    </div>

                  )}

                  {/* GARANTIA */}

                  <div
                    style={{
                      marginTop:
                        20,

                      padding:
                        18,

                      borderRadius:
                        12,

                      background:
                        "#f7f7f7",

                      border:
                        "1px solid #ddd",
                    }}
                  >

                    <h3
                      style={{
                        marginTop:
                          0,
                      }}
                    >
                      🛡️ Garantia
                    </h3>

                    <p
                      style={{
                        color:
                          "#666",

                        marginBottom:
                          0,
                      }}
                    >
                      Depois vamos ligar
                      esta consulta
                      diretamente à
                      garantia.
                    </p>

                  </div>

                </>

              ) : (

                <div
                  style={{
                    padding:
                      20,

                    borderRadius:
                      12,

                    background:
                      "#fff1f0",

                    border:
                      "1px solid #f1b8b5",
                  }}
                >

                  <h2
                    style={{
                      marginTop:
                        0,

                      color:
                        "#b42318",
                    }}
                  >
                    ❌ IMEI não encontrado
                  </h2>

                  <p
                    style={{
                      marginBottom:
                        0,

                      color:
                        "#7a271a",

                      lineHeight:
                        1.5,
                    }}
                  >
                    Este IMEI não foi
                    encontrado no
                    sistema da
                    Adel&apos;s Mundo Cell.
                  </p>

                </div>

              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

// =====================================================
// COMPONENTE INFO
// =====================================================

function Info({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {

  return (
    <div
      style={{
        border:
          "1px solid #e5e5e5",

        borderRadius:
          10,

        padding:
          14,

        background:
          "#fafafa",
      }}
    >

      <div
        style={{
          color:
            "#777",

          fontSize:
            12,

          marginBottom:
            6,
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          fontWeight:
            700,

          fontSize:
            14,

          wordBreak:
            "break-word",
        }}
      >
        {valor || "-"}
      </div>

    </div>
  );
}