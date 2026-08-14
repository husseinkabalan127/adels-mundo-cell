"use client";

import { useEffect, useMemo, useState } from "react";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
};

type Produto = {
  id: number;
  nome: string;
  aparelhos: Aparelho[];
};

type Assistencia = {
  id: number;
  cliente: string;
  telefone: string | null;
  problema: string;
  observacao: string | null;
  status: string;
  custo: number;
  dataEntrada: string;
  dataSaida: string | null;

  produto: {
    id: number;
    nome: string;
  } | null;

  aparelho: Aparelho | null;
};

export default function AssistenciasPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [assistencias, setAssistencias] = useState<Assistencia[]>([]);

  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [problema, setProblema] = useState("");
  const [observacao, setObservacao] = useState("");

  // Busca geral
  const [busca, setBusca] = useState("");

  // Busca por IMEI
  const [buscaImei, setBuscaImei] = useState("");

  // Vários aparelhos selecionados
  const [aparelhosSelecionados, setAparelhosSelecionados] =
    useState<number[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] =
    useState(true);

  const [entregandoTodos, setEntregandoTodos] =
    useState(false);

  const [excluindoId, setExcluindoId] =
    useState<number | null>(null);

  // =====================================================
  // CARREGAR DADOS
  // =====================================================

  async function carregarDados() {
    try {
      setCarregandoDados(true);

      const [produtosRes, assistenciasRes] =
        await Promise.all([
          fetch("/api/produtos", {
            cache: "no-store",
          }),

          fetch("/api/assistencias", {
            cache: "no-store",
          }),
        ]);

      if (!produtosRes.ok) {
        throw new Error(
          `Erro produtos: ${produtosRes.status}`
        );
      }

      if (!assistenciasRes.ok) {
        throw new Error(
          `Erro assistências: ${assistenciasRes.status}`
        );
      }

      const produtosData =
        await produtosRes.json();

      const assistenciasData =
        await assistenciasRes.json();

      if (!Array.isArray(produtosData)) {
        throw new Error(
          "Produtos não retornaram uma lista."
        );
      }

      if (!Array.isArray(assistenciasData)) {
        throw new Error(
          "Assistências não retornaram uma lista."
        );
      }

      setProdutos(produtosData);
      setAssistencias(assistenciasData);
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao carregar dados. Veja o Terminal."
      );
    } finally {
      setCarregandoDados(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // =====================================================
  // APARELHOS QUE JÁ ESTÃO EM ASSISTÊNCIA
  // =====================================================

  const aparelhosEmAssistencia =
    useMemo(() => {
      const ids = new Set<number>();

      assistencias.forEach((item) => {
        if (
          item.aparelho?.id &&
          item.status !== "Entregue"
        ) {
          ids.add(item.aparelho.id);
        }
      });

      return ids;
    }, [assistencias]);

  // =====================================================
  // TODOS OS APARELHOS
  // =====================================================

  const todosAparelhos = useMemo(() => {
    const lista: {
      aparelho: Aparelho;
      produto: Produto;
    }[] = [];

    produtos.forEach((produto) => {
      (produto.aparelhos || []).forEach(
        (aparelho) => {
          // Não mostrar aparelho vendido
          if (aparelho.vendido) {
            return;
          }

          // Não mostrar aparelho que já está em assistência
          if (
            aparelhosEmAssistencia.has(
              aparelho.id
            )
          ) {
            return;
          }

          lista.push({
            aparelho,
            produto,
          });
        }
      );
    });

    return lista;
  }, [
    produtos,
    aparelhosEmAssistencia,
  ]);

  // =====================================================
  // BUSCAR POR IMEI
  // =====================================================

  const aparelhosFiltrados = useMemo(() => {
    const termo = buscaImei
      .trim()
      .toLowerCase();

    if (!termo) {
      return todosAparelhos;
    }

    return todosAparelhos.filter(
      ({ aparelho, produto }) => {
        return (
          aparelho.imei
            .toLowerCase()
            .includes(termo) ||
          produto.nome
            .toLowerCase()
            .includes(termo)
        );
      }
    );
  }, [
    buscaImei,
    todosAparelhos,
  ]);

  // =====================================================
  // SELECIONAR / DESMARCAR APARELHO
  // =====================================================

  function alternarAparelho(
    aparelhoId: number
  ) {
    setAparelhosSelecionados(
      (atual) => {
        if (
          atual.includes(aparelhoId)
        ) {
          return atual.filter(
            (id) =>
              id !== aparelhoId
          );
        }

        return [
          ...atual,
          aparelhoId,
        ];
      }
    );
  }

  // =====================================================
  // SELECIONAR TODOS OS RESULTADOS
  // =====================================================

  function selecionarTodos() {
    const ids =
      aparelhosFiltrados.map(
        ({ aparelho }) =>
          aparelho.id
      );

    setAparelhosSelecionados(
      (atual) => {
        const novos = [
          ...atual,
        ];

        ids.forEach((id) => {
          if (!novos.includes(id)) {
            novos.push(id);
          }
        });

        return novos;
      }
    );
  }

  // =====================================================
  // LIMPAR SELEÇÃO
  // =====================================================

  function limparSelecao() {
    setAparelhosSelecionados([]);
  }

  // =====================================================
  // BUSCAR ASSISTÊNCIAS
  // =====================================================

  const assistenciasFiltradas =
    useMemo(() => {
      const termo = busca
        .trim()
        .toLowerCase();

      if (!termo) {
        return assistencias;
      }

      return assistencias.filter(
        (item) => {
          return (
            item.cliente
              .toLowerCase()
              .includes(termo) ||

            (item.telefone || "")
              .toLowerCase()
              .includes(termo) ||

            item.problema
              .toLowerCase()
              .includes(termo) ||

            (item.produto?.nome || "")
              .toLowerCase()
              .includes(termo) ||

            (item.aparelho?.imei || "")
              .toLowerCase()
              .includes(termo)
          );
        }
      );
    }, [
      assistencias,
      busca,
    ]);

  // =====================================================
  // RECEBER VÁRIOS APARELHOS
  // =====================================================

  async function registrarAssistencia() {
    if (
      aparelhosSelecionados.length ===
      0
    ) {
      alert(
        "Escolha pelo menos um aparelho."
      );
      return;
    }

    if (!cliente.trim()) {
      alert(
        "Digite o nome do cliente."
      );
      return;
    }

    if (!problema.trim()) {
      alert(
        "Digite o problema do aparelho."
      );
      return;
    }

    const confirmou =
      window.confirm(
        `Registrar ${aparelhosSelecionados.length} aparelho(s) para assistência?`
      );

    if (!confirmou) {
      return;
    }

    setCarregando(true);

    try {
      const resultados =
        await Promise.all(
          aparelhosSelecionados.map(
            async (aparelhoId) => {
              const encontrado =
                todosAparelhos.find(
                  ({ aparelho }) =>
                    aparelho.id ===
                    aparelhoId
                );

              if (!encontrado) {
                throw new Error(
                  "Aparelho não encontrado."
                );
              }

              const res =
                await fetch(
                  "/api/assistencias",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      produtoId:
                        encontrado.produto
                          .id,

                      aparelhoId,

                      cliente:
                        cliente.trim(),

                      telefone:
                        telefone.trim() ||
                        null,

                      problema:
                        problema.trim(),

                      observacao:
                        observacao.trim() ||
                        null,
                    }),
                  }
                );

              const data =
                await res.json();

              if (!res.ok) {
                throw new Error(
                  data.error ||
                    "Erro ao registrar aparelho."
                );
              }

              return data;
            }
          )
        );

      alert(
        `${resultados.length} aparelho(s) recebido(s) com sucesso!`
      );

      setAparelhosSelecionados([]);
      setCliente("");
      setTelefone("");
      setProblema("");
      setObservacao("");
      setBuscaImei("");

      await carregarDados();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao registrar assistência."
      );

      await carregarDados();
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // ATUALIZAR ASSISTÊNCIA
  // =====================================================

  async function atualizarAssistencia(
    id: number,
    dados: {
      status?: string;
      custo?: number;
    }
  ) {
    try {
      const res = await fetch(
        `/api/assistencias/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(dados),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Erro ao atualizar assistência."
        );

        return false;
      }

      await carregarDados();

      return true;
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao atualizar assistência."
      );

      return false;
    }
  }

  // =====================================================
  // ALTERAR STATUS
  // =====================================================

  async function atualizarStatus(
    id: number,
    status: string
  ) {
    await atualizarAssistencia(
      id,
      {
        status,
      }
    );
  }

  // =====================================================
  // ENTREGAR TODOS OS PRONTOS
  // =====================================================

  async function entregarTodosProntos() {
    const prontos =
      assistenciasFiltradas.filter(
        (item) =>
          item.status ===
          "Pronto"
      );

    if (prontos.length === 0) {
      alert(
        "Não há aparelhos prontos para entregar."
      );

      return;
    }

    const confirmou =
      window.confirm(
        `Você quer marcar ${prontos.length} aparelho(s) como Entregue?`
      );

    if (!confirmou) {
      return;
    }

    setEntregandoTodos(true);

    try {
      await Promise.all(
        prontos.map((item) =>
          fetch(
            `/api/assistencias/${item.id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                status: "Entregue",
              }),
            }
          )
        )
      );

      alert(
        `${prontos.length} aparelho(s) entregue(s) com sucesso!`
      );

      await carregarDados();
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao entregar os aparelhos."
      );

      await carregarDados();
    } finally {
      setEntregandoTodos(false);
    }
  }

  // =====================================================
  // ALTERAR PREÇO
  // =====================================================

  async function alterarCusto(
    item: Assistencia
  ) {
    const valorAtual =
      Number(item.custo || 0);

    const novoValor =
      window.prompt(
        "Digite o valor da assistência em R$:",

        valorAtual > 0
          ? valorAtual.toFixed(2)
          : ""
      );

    if (novoValor === null) {
      return;
    }

    const valor = Number(
      novoValor.replace(",", ".")
    );

    if (!Number.isFinite(valor)) {
      alert(
        "Digite um valor válido."
      );

      return;
    }

    if (valor < 0) {
      alert(
        "O valor não pode ser negativo."
      );

      return;
    }

    await atualizarAssistencia(
      item.id,
      {
        custo: valor,
      }
    );
  }

  // =====================================================
  // EXCLUIR ASSISTÊNCIA
  // =====================================================

  async function excluirAssistencia(
    item: Assistencia
  ) {
    const confirmou =
      window.confirm(
        `Tem certeza que deseja remover este aparelho da assistência?\n\n` +
          `Aparelho: ${
            item.produto?.nome ||
            "Aparelho"
          }\n` +
          `IMEI: ${
            item.aparelho?.imei ||
            "-"
          }\n` +
          `Cliente: ${item.cliente}\n\n` +
          `O aparelho/IMEI NÃO será apagado do estoque.`
      );

    if (!confirmou) {
      return;
    }

    setExcluindoId(item.id);

    try {
      const res = await fetch(
        "/api/assistencias",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: item.id,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Erro ao excluir assistência."
        );

        return;
      }

      alert(
        "Aparelho removido da assistência com sucesso!"
      );

      await carregarDados();
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao excluir aparelho da assistência."
      );
    } finally {
      setExcluindoId(null);
    }
  }

  // =====================================================
  // STATUS
  // =====================================================

  function statusClass(
    status: string
  ) {
    if (status === "Pendente") {
      return "bg-yellow-100 text-yellow-800";
    }

    if (
      status ===
      "Em manutenção"
    ) {
      return "bg-blue-100 text-blue-800";
    }

    if (status === "Pronto") {
      return "bg-green-100 text-green-800";
    }

    if (status === "Entregue") {
      return "bg-gray-200 text-gray-800";
    }

    return "bg-gray-100 text-gray-700";
  }

  // =====================================================
  // DATA
  // =====================================================

  function formatarData(
    data: string | null
  ) {
    if (!data) {
      return "-";
    }

    return new Date(
      data
    ).toLocaleString("pt-BR");
  }

  // =====================================================
  // VALOR
  // =====================================================

  function formatarValor(
    valor: number
  ) {
    return Number(
      valor || 0
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // =====================================================
  // IMPRIMIR RECIBO
  // =====================================================

  function imprimirRecibo(
    item: Assistencia
  ) {
    const janela =
      window.open(
        "",
        "_blank",
        "width=800,height=900"
      );

    if (!janela) {
      alert(
        "O navegador bloqueou a impressão. Permita pop-ups."
      );

      return;
    }

    const nomeProduto =
      item.produto?.nome ||
      "Aparelho";

    const imei =
      item.aparelho?.imei ||
      "-";

    janela.document.write(`
      <!DOCTYPE html>

      <html lang="pt-BR">

      <head>

        <meta charset="UTF-8" />

        <title>
          Recibo de Assistência
        </title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 30px;
            color: #111;
          }

          .recibo {
            max-width: 700px;
            margin: auto;
            border: 1px solid #222;
            padding: 30px;
          }

          .cabecalho {
            text-align: center;
            border-bottom: 2px solid #111;
            padding-bottom: 20px;
          }

          .cabecalho h1 {
            margin: 0;
            font-size: 28px;
          }

          .cabecalho p {
            color: #555;
          }

          .titulo {
            text-align: center;
            font-weight: bold;
            font-size: 20px;
            margin: 25px 0;
          }

          .linha {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
            gap: 20px;
          }

          .label {
            font-weight: bold;
          }

          .valor {
            text-align: right;
          }

          .caixa {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ddd;
          }

          .status {
            margin-top: 20px;
            padding: 15px;
            text-align: center;
            border: 2px solid #111;
            font-size: 18px;
            font-weight: bold;
          }

          .assinaturas {
            display: flex;
            justify-content: space-between;
            margin-top: 80px;
            gap: 40px;
          }

          .assinatura {
            width: 50%;
            text-align: center;
            border-top: 1px solid #111;
            padding-top: 8px;
          }

          .rodape {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
          }

          @media print {
            body {
              padding: 0;
            }

            .recibo {
              border: none;
            }
          }

        </style>

      </head>

      <body>

        <div class="recibo">

          <div class="cabecalho">

            <h1>
              📱 Adel's Mundo Cell
            </h1>

            <p>
              Assistência Técnica
            </p>

          </div>

          <div class="titulo">
            RECIBO DE ASSISTÊNCIA
          </div>

          <div class="linha">
            <div class="label">
              Nº:
            </div>

            <div class="valor">
              ${item.id}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              Entrada:
            </div>

            <div class="valor">
              ${formatarData(
                item.dataEntrada
              )}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              Cliente:
            </div>

            <div class="valor">
              ${item.cliente}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              Telefone:
            </div>

            <div class="valor">
              ${item.telefone || "-"}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              Aparelho:
            </div>

            <div class="valor">
              ${nomeProduto}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              IMEI:
            </div>

            <div class="valor">
              ${imei}
            </div>
          </div>

          <div class="linha">
            <div class="label">
              Valor:
            </div>

            <div class="valor">
              ${formatarValor(
                item.custo
              )}
            </div>
          </div>

          <div class="caixa">
            <strong>
              Problema:
            </strong>

            <br />

            ${item.problema}
          </div>

          <div class="caixa">
            <strong>
              Observação:
            </strong>

            <br />

            ${item.observacao || "-"}
          </div>

          <div class="status">
            Status:
            ${item.status}
          </div>

          <div class="assinaturas">

            <div class="assinatura">
              Assinatura do cliente
            </div>

            <div class="assinatura">
              Adel's Mundo Cell
            </div>

          </div>

          <div class="rodape">
            Guarde este recibo para retirar o aparelho.
          </div>

        </div>

        <script>
          window.onload = function () {
            window.print();
          };
        </script>

      </body>

      </html>
    `);

    janela.document.close();
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* CABEÇALHO */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              🔧 Assistência Técnica
            </h1>

            <p className="text-gray-500 mt-2">
              Controle de aparelhos recebidos para manutenção
            </p>

          </div>

          <button
            onClick={carregarDados}
            disabled={carregandoDados}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            🔄 Atualizar
          </button>

        </div>

        {/* BUSCA GERAL */}

        <div className="bg-white rounded-xl shadow p-5 md:p-6 mb-8">

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🔎 Buscar assistência
          </h2>

          <input
            type="text"
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            placeholder="Digite IMEI, cliente, telefone ou aparelho..."
            className="w-full border border-gray-300 rounded-lg p-3 text-lg"
          />

          {busca && (
            <p className="text-sm text-gray-500 mt-2">
              Encontrados:{" "}
              {assistenciasFiltradas.length}{" "}
              assistência(s)
            </p>
          )}

        </div>

        {/* RECEBER APARELHOS */}

        <div className="bg-white rounded-xl shadow p-5 md:p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            📥 Receber aparelho(s)
          </h2>

          {/* BUSCA IMEI */}

          <div className="mb-5">

            <label className="block font-medium mb-2 text-gray-700">
              🔎 Procurar pelo IMEI
            </label>

            <input
              type="text"
              value={buscaImei}
              onChange={(e) =>
                setBuscaImei(
                  e.target.value
                )
              }
              placeholder="Digite alguns números do IMEI, por exemplo: 3589"
              className="w-full border border-blue-400 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />

            <p className="text-sm text-gray-500 mt-2">
              Pode digitar apenas 1 número ou vários números do IMEI.
            </p>

          </div>

          {/* CONTROLES */}

          <div className="flex flex-wrap gap-3 mb-4">

            <button
              type="button"
              onClick={selecionarTodos}
              disabled={
                aparelhosFiltrados.length === 0
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              ☑️ Selecionar todos
            </button>

            <button
              type="button"
              onClick={limparSelecao}
              disabled={
                aparelhosSelecionados.length ===
                0
              }
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              ❌ Limpar seleção
            </button>

            <span className="flex items-center font-bold text-blue-700">
              Selecionados:{" "}
              {aparelhosSelecionados.length}
            </span>

          </div>

          {/* LISTA DE APARELHOS */}

          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">

            <div className="bg-gray-100 p-3 font-bold">
              📱 Aparelhos encontrados
            </div>

            {carregandoDados ? (

              <div className="p-5 text-gray-500">
                Carregando aparelhos...
              </div>

            ) : aparelhosFiltrados.length ===
              0 ? (

              <div className="p-5 text-gray-500">
                Nenhum aparelho encontrado.
              </div>

            ) : (

              <div className="max-h-[350px] overflow-y-auto">

                {aparelhosFiltrados.map(
                  ({
                    aparelho,
                    produto,
                  }) => {

                    const selecionado =
                      aparelhosSelecionados.includes(
                        aparelho.id
                      );

                    return (

                      <label
                        key={aparelho.id}
                        className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-blue-50 ${
                          selecionado
                            ? "bg-blue-100"
                            : "bg-white"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={
                            selecionado
                          }
                          onChange={() =>
                            alternarAparelho(
                              aparelho.id
                            )
                          }
                          className="w-5 h-5"
                        />

                        <div className="flex-1">

                          <div className="font-bold text-gray-900">
                            {produto.nome}
                          </div>

                          <div className="font-mono text-blue-700 text-lg">
                            IMEI:{" "}
                            {aparelho.imei}
                          </div>

                        </div>

                        {selecionado && (
                          <span className="text-blue-700 font-bold">
                            ✓ Selecionado
                          </span>
                        )}

                      </label>

                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* DADOS DO CLIENTE */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block font-medium mb-2 text-gray-700">
                Cliente
              </label>

              <input
                type="text"
                placeholder="Nome do cliente"
                value={cliente}
                onChange={(e) =>
                  setCliente(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-medium mb-2 text-gray-700">
                Telefone
              </label>

              <input
                type="text"
                placeholder="Telefone / WhatsApp"
                value={telefone}
                onChange={(e) =>
                  setTelefone(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block font-medium mb-2 text-gray-700">
                Problema
              </label>

              <textarea
                placeholder="Ex: aparelho não liga, tela quebrada..."
                value={problema}
                onChange={(e) =>
                  setProblema(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[110px]"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block font-medium mb-2 text-gray-700">
                Observação
              </label>

              <textarea
                placeholder="Alguma observação sobre os aparelhos..."
                value={observacao}
                onChange={(e) =>
                  setObservacao(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[90px]"
              />

            </div>

          </div>

          {/* BOTÃO RECEBER */}

          <button
            onClick={
              registrarAssistencia
            }
            disabled={
              carregando ||
              aparelhosSelecionados.length ===
                0
            }
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold"
          >

            {carregando
              ? "Salvando..."
              : `📥 Receber ${
                  aparelhosSelecionados.length ||
                  ""
                } aparelho(s)`}

          </button>

        </div>

        {/* LISTA DE ASSISTÊNCIAS */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-5 md:p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                📋 Aparelhos na assistência
              </h2>

              <p className="text-gray-500 mt-1">
                Cada aparelho aparece com seu próprio IMEI e status.
              </p>

            </div>

            {/* ENTREGAR TODOS */}

            <button
              onClick={
                entregarTodosProntos
              }
              disabled={
                entregandoTodos ||
                !assistenciasFiltradas.some(
                  (item) =>
                    item.status ===
                    "Pronto"
                )
              }
              className="bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 font-bold"
            >

              {entregandoTodos
                ? "Entregando..."
                : "📦 Entregar todos os prontos"}

            </button>

          </div>

          {carregandoDados ? (

            <div className="p-8 text-center text-gray-500">
              Carregando...
            </div>

          ) : assistenciasFiltradas.length ===
            0 ? (

            <div className="p-8 text-center text-gray-500">

              {busca
                ? "Nenhum resultado encontrado."
                : "Nenhum aparelho na assistência."}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1800px]">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3 text-left">
                      Nº
                    </th>

                    <th className="p-3 text-left">
                      Entrada
                    </th>

                    <th className="p-3 text-left">
                      Cliente
                    </th>

                    <th className="p-3 text-left">
                      Aparelho
                    </th>

                    <th className="p-3 text-left">
                      IMEI
                    </th>

                    <th className="p-3 text-left">
                      Problema
                    </th>

                    <th className="p-3 text-left">
                      Valor
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Saída
                    </th>

                    <th className="p-3 text-left">
                      Ação
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {assistenciasFiltradas.map(
                    (item) => {

                      const imei =
                        item.aparelho
                          ?.imei || "-";

                      return (

                        <tr
                          key={item.id}
                          className="border-t hover:bg-gray-50"
                        >

                          <td className="p-3 font-bold">
                            #{item.id}
                          </td>

                          <td className="p-3 whitespace-nowrap">
                            {formatarData(
                              item.dataEntrada
                            )}
                          </td>

                          <td className="p-3">

                            <div className="font-medium">
                              {item.cliente}
                            </div>

                            {item.telefone && (
                              <div className="text-sm text-gray-500">
                                {item.telefone}
                              </div>
                            )}

                          </td>

                          <td className="p-3 font-medium">
                            {item.produto?.nome ||
                              "Aparelho"}
                          </td>

                          <td className="p-3">

                            <span className="font-mono font-bold text-blue-700 text-lg">
                              {imei}
                            </span>

                          </td>

                          <td className="p-3 max-w-[300px]">
                            {item.problema}
                          </td>

                          <td className="p-3">

                            <div className="font-bold">
                              {formatarValor(
                                item.custo
                              )}
                            </div>

                          </td>

                          <td className="p-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${statusClass(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>

                          </td>

                          <td className="p-3 whitespace-nowrap">

                            {item.dataSaida
                              ? formatarData(
                                  item.dataSaida
                                )
                              : "Ainda não entregue"}

                          </td>

                          <td className="p-3">

                            <div className="flex gap-2 flex-wrap">

                              {/* IMPRIMIR */}

                              <button
                                onClick={() =>
                                  imprimirRecibo(
                                    item
                                  )
                                }
                                className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700"
                              >
                                🧾 Imprimir
                              </button>

                              {/* PREÇO */}

                              <button
                                onClick={() =>
                                  alterarCusto(
                                    item
                                  )
                                }
                                className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600"
                              >
                                💰{" "}
                                {item.custo >
                                0
                                  ? "Alterar preço"
                                  : "Adicionar preço"}
                              </button>

                              {/* INICIAR */}

                              {item.status ===
                                "Pendente" && (

                                <button
                                  onClick={() =>
                                    atualizarStatus(
                                      item.id,
                                      "Em manutenção"
                                    )
                                  }
                                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                                >
                                  🔧 Iniciar
                                </button>

                              )}

                              {/* PRONTO */}

                              {item.status ===
                                "Em manutenção" && (

                                <button
                                  onClick={() =>
                                    atualizarStatus(
                                      item.id,
                                      "Pronto"
                                    )
                                  }
                                  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"
                                >
                                  ✅ Pronto
                                </button>

                              )}

                              {/* ENTREGAR INDIVIDUAL */}

                              {item.status ===
                                "Pronto" && (

                                <button
                                  onClick={() =>
                                    atualizarStatus(
                                      item.id,
                                      "Entregue"
                                    )
                                  }
                                  className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800"
                                >
                                  📦 Entregar
                                </button>

                              )}

                              {/* FINALIZADO */}

                              {item.status ===
                                "Entregue" && (

                                <span className="text-gray-500 text-sm py-2 font-bold">
                                  ✅ Finalizado
                                </span>

                              )}

                              {/* EXCLUIR */}

                              <button
                                onClick={() =>
                                  excluirAssistencia(
                                    item
                                  )
                                }
                                disabled={
                                  excluindoId ===
                                  item.id
                                }
                                className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
                              >
                                {excluindoId ===
                                item.id
                                  ? "Excluindo..."
                                  : "🗑️ Excluir"}
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}