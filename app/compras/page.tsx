"use client";

import {
  FormEvent,
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

type Moeda = "USD" | "BRL";

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
  precoCompra: number | null;
  moedaCompra: Moeda | null;
  precoCompraUsd: number | null;
  precoCompraBrl: number | null;
  quantidade: number;
  dataCompra: string | null;
  createdAt: string;
  produtoId: number;
  aparelhos?: Aparelho[];
};

type Compra = Lote & {
  produtoNome: string;
};

function hoje() {
  const agora = new Date();

  return `${agora.getFullYear()}-${String(
    agora.getMonth() + 1
  ).padStart(2, "0")}-${String(
    agora.getDate()
  ).padStart(2, "0")}`;
}

function numero(valor: string) {
  if (!valor.trim()) return null;

  const n = Number(valor.replace(",", "."));

  return Number.isFinite(n) ? n : null;
}

function dinheiro(
  valor: number | null | undefined,
  moeda: Moeda
) {
  if (valor === null || valor === undefined) {
    return "-";
  }

  return Number(valor).toLocaleString(
    moeda === "USD" ? "en-US" : "pt-BR",
    {
      style: "currency",
      currency: moeda,
    }
  );
}

function dataBr(valor: string | null | undefined) {
  if (!valor) return "-";

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) {
    return "-";
  }

  return data.toLocaleDateString("pt-BR");
}

function dataInput(valor: string | null | undefined) {
  if (!valor) return hoje();

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) {
    return hoje();
  }

  return `${data.getFullYear()}-${String(
    data.getMonth() + 1
  ).padStart(2, "0")}-${String(
    data.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Lê uma resposta da API sem quebrar quando o servidor
 * retorna resposta vazia ou texto que não seja JSON.
 */
async function lerResposta(response: Response) {
  const texto = await response.text();

  if (!texto) {
    return {};
  }

  try {
    return JSON.parse(texto);
  } catch {
    return {
      error:
        texto ||
        "O servidor retornou uma resposta inválida.",
    };
  }
}

export default function ComprasPage() {
  const [compras, setCompras] = useState<Compra[]>([]);

  const [dataCompra, setDataCompra] = useState(hoje());
  const [modelo, setModelo] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  const [cor, setCor] = useState("");
  const [memoria, setMemoria] = useState("");

  const [moeda, setMoeda] = useState<Moeda>("USD");
  const [precoCompra, setPrecoCompra] = useState("");

  const [imeiAtual, setImeiAtual] = useState("");
  const [imeis, setImeis] = useState<string[]>([]);

  const [modelos, setModelos] = useState<string[]>([]);

  const [
    fornecedoresCadastrados,
    setFornecedoresCadastrados,
  ] = useState<
    {
      nome: string;
      telefone: string;
      cpfCnpj: string;
    }[]
  >([]);

  const [cores, setCores] = useState<string[]>([
    "Preto",
    "Branco",
    "Azul",
    "Verde",
    "Roxo",
    "Dourado",
    "Prata",
    "Rosa",
    "Cinza",
    "Amarelo",
  ]);

  const [memorias, setMemorias] = useState<string[]>([
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
  ]);

  const [mostrarFornecedor, setMostrarFornecedor] =
    useState(false);

  const [novoFornecedorNome, setNovoFornecedorNome] =
    useState("");

  const [novoFornecedorTelefone, setNovoFornecedorTelefone] =
    useState("");

  const [novoFornecedorCpfCnpj, setNovoFornecedorCpfCnpj] =
    useState("");

  const [busca, setBusca] = useState("");
  const [fornecedorFiltro, setFornecedorFiltro] =
    useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  const [compraAberta, setCompraAberta] =
    useState<number | null>(null);

  const [editando, setEditando] =
    useState<Compra | null>(null);

  const [editData, setEditData] = useState("");
  const [editModelo, setEditModelo] = useState("");
  const [editFornecedor, setEditFornecedor] =
    useState("");
  const [editCor, setEditCor] = useState("");
  const [editMemoria, setEditMemoria] =
    useState("");
  const [editMoeda, setEditMoeda] =
    useState<Moeda>("USD");
  const [editPreco, setEditPreco] =
    useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function carregarCompras() {
    setCarregando(true);
    setErro("");

    try {
      const response = await fetch("/api/compras", {
        cache: "no-store",
      });

      const data = await lerResposta(response);

      if (!response.ok) {
        throw new Error(
          data?.error || "Erro ao carregar compras."
        );
      }

      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data?.compras)
        ? data.compras
        : [];

      setCompras(lista);

      const nomes: string[] = lista
        .map(
          (item: Compra) =>
            String(item.produtoNome || "").trim()
        )
        .filter(
          (nome): nome is string =>
            Boolean(nome)
        );

      setModelos(
        Array.from(new Set<string>(nomes)).sort(
          (a, b) => a.localeCompare(b)
        )
      );
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao carregar compras."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCompras();

    try {
      const fornecedoresSalvos =
        JSON.parse(
          localStorage.getItem(
            "adels_fornecedores"
          ) || "[]"
        );

      if (Array.isArray(fornecedoresSalvos)) {
        setFornecedoresCadastrados(
          fornecedoresSalvos.filter(
            (x) =>
              x &&
              typeof x.nome === "string"
          )
        );
      }

      const coresSalvas =
        JSON.parse(
          localStorage.getItem(
            "adels_compras_cores"
          ) || "[]"
        );

      const memoriasSalvas =
        JSON.parse(
          localStorage.getItem(
            "adels_compras_memorias"
          ) || "[]"
        );

      if (Array.isArray(coresSalvas)) {
        setCores((lista) =>
          Array.from(
            new Set([
              ...lista,
              ...coresSalvas.filter(
                (x) =>
                  typeof x === "string"
              ),
            ])
          )
        );
      }

      if (Array.isArray(memoriasSalvas)) {
        setMemorias((lista) =>
          Array.from(
            new Set([
              ...lista,
              ...memoriasSalvas.filter(
                (x) =>
                  typeof x === "string"
              ),
            ])
          )
        );
      }
    } catch {
      // Ignora localStorage inválido
    }
  }, []);

  function cadastrarFornecedor() {
    const nome =
      novoFornecedorNome.trim();

    if (!nome) {
      setErro(
        "Informe o nome do fornecedor."
      );
      return;
    }

    const existe =
      fornecedoresCadastrados.some(
        (item) =>
          item.nome.toLowerCase() ===
          nome.toLowerCase()
      );

    if (existe) {
      setErro(
        "Esse fornecedor já está cadastrado."
      );
      return;
    }

    const novo = {
      nome,
      telefone:
        novoFornecedorTelefone.trim(),
      cpfCnpj:
        novoFornecedorCpfCnpj.trim(),
    };

    const novaLista = [
      ...fornecedoresCadastrados,
      novo,
    ];

    setFornecedoresCadastrados(
      novaLista
    );

    localStorage.setItem(
      "adels_fornecedores",
      JSON.stringify(novaLista)
    );

    setFornecedor(nome);

    setNovoFornecedorNome("");
    setNovoFornecedorTelefone("");
    setNovoFornecedorCpfCnpj("");

    setMostrarFornecedor(false);

    setMensagem(
      "Fornecedor cadastrado com sucesso."
    );

    setErro("");
  }

  function removerFornecedor(nome: string) {
    const confirmar =
      window.confirm(
        `Deseja excluir o fornecedor "${nome}" do cadastro?`
      );

    if (!confirmar) return;

    const novaLista =
      fornecedoresCadastrados.filter(
        (item) =>
          item.nome.toLowerCase() !==
          nome.toLowerCase()
      );

    setFornecedoresCadastrados(
      novaLista
    );

    localStorage.setItem(
      "adels_fornecedores",
      JSON.stringify(novaLista)
    );

    if (
      fornecedor.toLowerCase() ===
      nome.toLowerCase()
    ) {
      setFornecedor("");
    }

    setMensagem(
      "Fornecedor removido do cadastro."
    );

    setErro("");
  }

  function adicionarCor() {
    const nova =
      window.prompt(
        "Digite a nova cor:"
      );

    if (!nova?.trim()) return;

    const valor = nova.trim();

    setCores((lista) => {
      const novaLista =
        Array.from(
          new Set([
            ...lista,
            valor,
          ])
        );

      localStorage.setItem(
        "adels_compras_cores",
        JSON.stringify(novaLista)
      );

      return novaLista;
    });

    setCor(valor);
  }

  function adicionarMemoria() {
    const nova =
      window.prompt(
        "Digite a memória. Ex.: 2TB"
      );

    if (!nova?.trim()) return;

    const valor = nova.trim();

    setMemorias((lista) => {
      const novaLista =
        Array.from(
          new Set([
            ...lista,
            valor,
          ])
        );

      localStorage.setItem(
        "adels_compras_memorias",
        JSON.stringify(novaLista)
      );

      return novaLista;
    });

    setMemoria(valor);
  }

  function adicionarImei() {
    const imei =
      imeiAtual.trim();

    if (!imei) return;

    setMensagem("");
    setErro("");

    if (imeis.includes(imei)) {
      setErro(
        "Esse IMEI já foi adicionado nesta compra."
      );
      return;
    }

    setImeis((lista) => [
      ...lista,
      imei,
    ]);

    setImeiAtual("");
  }

  function removerImei(index: number) {
    setImeis((lista) =>
      lista.filter(
        (_, i) => i !== index
      )
    );
  }

  /**
   * EXCLUIR IMEI DE UMA COMPRA
   *
   * Só permite excluir aparelhos ainda não vendidos.
   * O endpoint /api/estoque já diminui:
   * - quantidade do produto
   * - quantidade do lote
   */
  async function excluirImeiDaCompra(
    aparelho: Aparelho
  ) {
    if (aparelho.vendido) {
      setErro(
        "Não é possível excluir um IMEI que já foi vendido."
      );
      return;
    }

    const confirmar =
      window.confirm(
        `Deseja realmente excluir o IMEI ${aparelho.imei} desta compra?`
      );

    if (!confirmar) return;

    setMensagem("");
    setErro("");
    setSalvando(true);

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
              aparelhoId:
                aparelho.id,
            }),
          }
        );

      const data =
        await lerResposta(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao excluir o IMEI."
        );
      }

      setMensagem(
        `IMEI ${aparelho.imei} excluído com sucesso.`
      );

      /*
       * Fecha a edição para não deixar
       * dados antigos na tela.
       */
      setEditando(null);

      await carregarCompras();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao excluir o IMEI."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function registrarCompra(
    e: FormEvent
  ) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const nomeLimpo =
      modelo.trim();

    const fornecedorLimpo =
      fornecedor.trim();

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

    if (!dataCompra) {
      setErro(
        "Informe a data da compra."
      );
      return;
    }

    if (imeis.length === 0) {
      setErro(
        "Adicione pelo menos um IMEI."
      );
      return;
    }

    const preco =
      numero(precoCompra);

    if (
      preco === null ||
      preco < 0
    ) {
      setErro(
        "Informe um preço de compra válido."
      );
      return;
    }

    setSalvando(true);

    try {
      const response =
        await fetch(
          "/api/compras",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              dataCompra,
              modelo: nomeLimpo,
              fornecedor:
                fornecedorLimpo,
              cor:
                cor.trim() || null,
              memoria:
                memoria.trim() || null,
              moeda,
              precoCompra: preco,
              imeis,
            }),
          }
        );

      const data =
        await lerResposta(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao registrar compra."
        );
      }

      setMensagem(
        "Compra registrada com sucesso e estoque atualizado."
      );

      setDataCompra(hoje());
      setModelo("");
      setFornecedor("");
      setCor("");
      setMemoria("");
      setMoeda("USD");
      setPrecoCompra("");
      setImeis([]);
      setImeiAtual("");

      await carregarCompras();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao registrar compra."
      );
    } finally {
      setSalvando(false);
    }
  }

  function abrirEdicao(compra: Compra) {
    setEditando(compra);

    setEditData(
      dataInput(compra.dataCompra)
    );

    setEditModelo(
      compra.produtoNome
    );

    setEditFornecedor(
      compra.fornecedor || ""
    );

    setEditCor(
      compra.aparelhos?.[0]?.cor ||
        ""
    );

    setEditMemoria(
      compra.aparelhos?.[0]?.memoria ||
        ""
    );

    setEditMoeda(
      compra.moedaCompra === "BRL"
        ? "BRL"
        : "USD"
    );

    const preco =
      compra.precoCompra ??
      (compra.moedaCompra === "BRL"
        ? compra.precoCompraBrl
        : compra.precoCompraUsd);

    setEditPreco(
      preco === null ||
        preco === undefined
        ? ""
        : String(preco)
    );

    setMensagem("");
    setErro("");
  }

  async function salvarEdicao() {
    if (!editando) return;

    const preco =
      numero(editPreco);

    if (!editModelo.trim()) {
      setErro(
        "Informe o modelo."
      );
      return;
    }

    if (!editFornecedor.trim()) {
      setErro(
        "Informe o fornecedor."
      );
      return;
    }

    if (!editData) {
      setErro(
        "Informe a data."
      );
      return;
    }

    if (
      preco === null ||
      preco < 0
    ) {
      setErro(
        "Informe um preço válido."
      );
      return;
    }

    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      const response =
        await fetch(
          "/api/compras",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              loteId: editando.id,
              dataCompra:
                editData,
              modelo:
                editModelo.trim(),
              fornecedor:
                editFornecedor.trim(),
              cor:
                editCor.trim() ||
                null,
              memoria:
                editMemoria.trim() ||
                null,
              moeda:
                editMoeda,
              precoCompra:
                preco,
            }),
          }
        );

      const data =
        await lerResposta(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Erro ao editar compra."
        );
      }

      setMensagem(
        "Compra atualizada com sucesso."
      );

      setEditando(null);

      await carregarCompras();
    } catch (error: any) {
      setErro(
        error?.message ||
          "Erro ao editar compra."
      );
    } finally {
      setSalvando(false);
    }
  }

  const fornecedores = useMemo(
    () => {
      const nomes = compras
        .map(
          (compra) =>
            compra.fornecedor || ""
        )
        .filter(Boolean);

      return Array.from(
        new Set(nomes)
      ).sort((a, b) =>
        a.localeCompare(b)
      );
    },
    [compras]
  );

  const fornecedoresDisponiveis =
    useMemo(() => {
      const nomes = [
        ...fornecedores,
        ...fornecedoresCadastrados.map(
          (item) => item.nome
        ),
      ];

      return Array.from(
        new Set(
          nomes.filter(Boolean)
        )
      ).sort((a, b) =>
        a.localeCompare(b)
      );
    }, [
      fornecedores,
      fornecedoresCadastrados,
    ]);

  const comprasFiltradas =
    useMemo(() => {
      const termo =
        busca
          .trim()
          .toLowerCase();

      return compras.filter(
        (compra) => {
          const correspondeBusca =
            !termo ||
            compra.produtoNome
              .toLowerCase()
              .includes(termo) ||
            String(
              compra.fornecedor || ""
            )
              .toLowerCase()
              .includes(termo) ||
            (compra.aparelhos || []).some(
              (a) =>
                a.imei
                  .toLowerCase()
                  .includes(termo)
            );

          const correspondeFornecedor =
            !fornecedorFiltro ||
            String(
              compra.fornecedor || ""
            ) === fornecedorFiltro;

          const correspondeData =
            !dataFiltro ||
            dataInput(
              compra.dataCompra
            ) === dataFiltro;

          return (
            correspondeBusca &&
            correspondeFornecedor &&
            correspondeData
          );
        }
      );
    }, [
      compras,
      busca,
      fornecedorFiltro,
      dataFiltro,
    ]);

  const resumo = useMemo(
    () => {
      let quantidade = 0;
      let totalUsd = 0;
      let totalBrl = 0;

      for (
        const compra of comprasFiltradas
      ) {
        quantidade += Number(
          compra.quantidade || 0
        );

        const total =
          Number(
            compra.precoCompra || 0
          ) *
          Number(
            compra.quantidade || 0
          );

        if (
          compra.moedaCompra ===
          "BRL"
        ) {
          totalBrl += total;
        } else {
          totalUsd += total;
        }
      }

      return {
        quantidade,
        totalUsd,
        totalBrl,
      };
    },
    [comprasFiltradas]
  );

  return (
    <main style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.title}>
            Compras
          </h1>

          <p style={styles.subtitle}>
            Registre compras, fornecedores,
            preços, moeda e IMEIs.
          </p>
        </div>

        <div style={styles.topActions}>
          <Link
            href="/estoque"
            style={styles.secondaryButton}
          >
            📦 Estoque
          </Link>

          <Link
            href="/vendas"
            style={styles.secondaryButton}
          >
            💰 Vendas
          </Link>
        </div>
      </div>

      {mensagem && (
        <div style={styles.success}>
          {mensagem}
        </div>
      )}

      {erro && (
        <div style={styles.error}>
          {erro}
        </div>
      )}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              ➕ Registrar nova compra
            </h2>

            <p style={styles.muted}>
              Cada compra cria um lote e
              coloca os aparelhos no estoque.
            </p>
          </div>

          <span style={styles.adminBadge}>
            ADMIN
          </span>
        </div>

        <form
          onSubmit={registrarCompra}
        >
          <div style={styles.grid4}>
            <label style={styles.label}>
              Data da compra

              <input
                type="date"
                value={dataCompra}
                onChange={(e) =>
                  setDataCompra(
                    e.target.value
                  )
                }
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Modelo

              <input
                list="modelos-compras"
                value={modelo}
                onChange={(e) =>
                  setModelo(
                    e.target.value
                  )
                }
                placeholder="Ex.: iPhone 17 Pro Max"
                style={styles.input}
              />

              <datalist id="modelos-compras">
                {modelos.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    />
                  )
                )}
              </datalist>
            </label>

            <div style={styles.label}>
              <div
                style={
                  styles.fieldTitleRow
                }
              >
                <span>
                  Fornecedor
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setMostrarFornecedor(
                      true
                    );
                    setMensagem("");
                    setErro("");
                  }}
                  style={
                    styles.smallAddButton
                  }
                >
                  +
                </button>
              </div>

              <select
                value={fornecedor}
                onChange={(e) =>
                  setFornecedor(
                    e.target.value
                  )
                }
                style={styles.input}
              >
                <option value="">
                  Selecionar fornecedor
                </option>

                {fornecedoresDisponiveis.map(
                  (nome) => (
                    <option
                      key={nome}
                      value={nome}
                    >
                      {nome}
                    </option>
                  )
                )}
              </select>
            </div>

            <label style={styles.label}>
              Preço de compra

              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <select
                  value={moeda}
                  onChange={(e) =>
                    setMoeda(
                      e.target.value as Moeda
                    )
                  }
                  style={{
                    ...styles.input,
                    width: 105,
                  }}
                >
                  <option value="USD">
                    USD $
                  </option>

                  <option value="BRL">
                    BRL R$
                  </option>
                </select>

                <input
                  inputMode="decimal"
                  value={precoCompra}
                  onChange={(e) =>
                    setPrecoCompra(
                      e.target.value
                    )
                  }
                  placeholder={
                    moeda === "USD"
                      ? "Ex.: 500"
                      : "Ex.: 2800"
                  }
                  style={{
                    ...styles.input,
                    flex: 1,
                  }}
                />
              </div>
            </label>
          </div>

          <div
            style={{
              ...styles.grid2,
              marginTop: 16,
            }}
          >
            <div style={styles.label}>
              <div
                style={
                  styles.fieldTitleRow
                }
              >
                <span>Cor</span>

                <button
                  type="button"
                  onClick={adicionarCor}
                  style={
                    styles.smallAddButton
                  }
                >
                  +
                </button>
              </div>

              <select
                value={cor}
                onChange={(e) =>
                  setCor(
                    e.target.value
                  )
                }
                style={styles.input}
              >
                <option value="">
                  Selecionar cor
                </option>

                {cores.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <div style={styles.label}>
              <div
                style={
                  styles.fieldTitleRow
                }
              >
                <span>
                  Memória / GB
                </span>

                <button
                  type="button"
                  onClick={
                    adicionarMemoria
                  }
                  style={
                    styles.smallAddButton
                  }
                >
                  +
                </button>
              </div>

              <select
                value={memoria}
                onChange={(e) =>
                  setMemoria(
                    e.target.value
                  )
                }
                style={styles.input}
              >
                <option value="">
                  Selecionar memória
                </option>

                {memorias.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div style={styles.imeiBox}>
            <div style={styles.imeiHeader}>
              <div>
                <h3
                  style={
                    styles.sectionTitle
                  }
                >
                  IMEIs da compra
                </h3>

                <p style={styles.muted}>
                  Quantidade automática:{" "}
                  {imeis.length}
                </p>
              </div>
            </div>

            <div
              style={styles.imeiInputRow}
            >
              <input
                value={imeiAtual}
                onChange={(e) =>
                  setImeiAtual(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    e.preventDefault();
                    adicionarImei();
                  }
                }}
                placeholder="Digite ou escaneie o IMEI e pressione Enter"
                style={{
                  ...styles.input,
                  flex: 1,
                }}
              />

              <button
                type="button"
                onClick={
                  adicionarImei
                }
                style={
                  styles.addButton
                }
              >
                Adicionar IMEI
              </button>
            </div>

            <div style={styles.imeiList}>
              {imeis.length === 0 ? (
                <span
                  style={styles.empty}
                >
                  Nenhum IMEI adicionado.
                </span>
              ) : (
                imeis.map(
                  (imei, index) => (
                    <span
                      key={`${imei}-${index}`}
                      style={
                        styles.imeiChip
                      }
                    >
                      {imei}

                      <button
                        type="button"
                        onClick={() =>
                          removerImei(
                            index
                          )
                        }
                        style={
                          styles.chipButton
                        }
                      >
                        ×
                      </button>
                    </span>
                  )
                )
              )}
            </div>
          </div>

          <div
            style={styles.formFooter}
          >
            <div
              style={
                styles.totalPreview
              }
            >
              <span>
                Quantidade
              </span>

              <strong>
                {imeis.length}
              </strong>

              <span>
                Total
              </span>

              <strong>
                {dinheiro(
                  (numero(
                    precoCompra
                  ) || 0) *
                    imeis.length,
                  moeda
                )}
              </strong>
            </div>

            <button
              type="submit"
              disabled={salvando}
              style={
                styles.primaryButton
              }
            >
              {salvando
                ? "Salvando..."
                : "Registrar compra"}
            </button>
          </div>
        </form>
      </section>

      {mostrarFornecedor && (
        <div
          style={
            styles.modalOverlay
          }
        >
          <div style={styles.modal}>
            <div
              style={
                styles.modalHeader
              }
            >
              <div>
                <h2
                  style={
                    styles.cardTitle
                  }
                >
                  👤 Cadastrar fornecedor
                </h2>

                <p
                  style={
                    styles.muted
                  }
                >
                  Cadastre uma vez e
                  depois selecione nas
                  compras.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMostrarFornecedor(
                    false
                  )
                }
                style={
                  styles.closeButton
                }
              >
                ×
              </button>
            </div>

            <div style={styles.grid3}>
              <label style={styles.label}>
                Nome *

                <input
                  value={
                    novoFornecedorNome
                  }
                  onChange={(e) =>
                    setNovoFornecedorNome(
                      e.target.value
                    )
                  }
                  style={styles.input}
                  autoFocus
                />
              </label>

              <label style={styles.label}>
                Telefone

                <input
                  value={
                    novoFornecedorTelefone
                  }
                  onChange={(e) =>
                    setNovoFornecedorTelefone(
                      e.target.value
                    )
                  }
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                CPF / CNPJ

                <input
                  value={
                    novoFornecedorCpfCnpj
                  }
                  onChange={(e) =>
                    setNovoFornecedorCpfCnpj(
                      e.target.value
                    )
                  }
                  style={styles.input}
                />
              </label>
            </div>

            {fornecedoresCadastrados.length >
              0 && (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <strong>
                  Fornecedores cadastrados
                </strong>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  {fornecedoresCadastrados.map(
                    (item) => (
                      <div
                        key={`${item.nome}-${item.cpfCnpj}`}
                        style={
                          styles.fornecedorItem
                        }
                      >
                        <div>
                          <strong>
                            {item.nome}
                          </strong>

                          {(item.telefone ||
                            item.cpfCnpj) && (
                            <div
                              style={
                                styles.helper
                              }
                            >
                              {[
                                item.telefone,
                                item.cpfCnpj,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  " • "
                                )}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removerFornecedor(
                              item.nome
                            )
                          }
                          style={
                            styles.deleteButton
                          }
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div
              style={
                styles.modalActions
              }
            >
              <button
                type="button"
                onClick={() =>
                  setMostrarFornecedor(
                    false
                  )
                }
                style={
                  styles.clearButton
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={
                  cadastrarFornecedor
                }
                style={
                  styles.primaryButton
                }
              >
                Cadastrar fornecedor
              </button>
            </div>
          </div>
        </div>
      )}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2
              style={styles.cardTitle}
            >
              📋 Histórico de compras
            </h2>

            <p style={styles.muted}>
              Você pode abrir e editar
              qualquer compra.
            </p>
          </div>

          <div style={styles.summary}>
            <span>
              {resumo.quantidade} aparelhos
            </span>

            {resumo.totalUsd > 0 && (
              <strong>
                {dinheiro(
                  resumo.totalUsd,
                  "USD"
                )}
              </strong>
            )}

            {resumo.totalBrl > 0 && (
              <strong>
                {dinheiro(
                  resumo.totalBrl,
                  "BRL"
                )}
              </strong>
            )}
          </div>
        </div>

        <div style={styles.filters}>
          <input
            value={busca}
            onChange={(e) =>
              setBusca(
                e.target.value
              )
            }
            placeholder="Buscar modelo, fornecedor ou IMEI"
            style={styles.input}
          />

          <select
            value={fornecedorFiltro}
            onChange={(e) =>
              setFornecedorFiltro(
                e.target.value
              )
            }
            style={styles.input}
          >
            <option value="">
              Todos os fornecedores
            </option>

            {fornecedores.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <input
            type="date"
            value={dataFiltro}
            onChange={(e) =>
              setDataFiltro(
                e.target.value
              )
            }
            style={styles.input}
          />

          <button
            type="button"
            onClick={() => {
              setBusca("");
              setFornecedorFiltro("");
              setDataFiltro("");
            }}
            style={
              styles.clearButton
            }
          >
            Limpar
          </button>
        </div>

        {carregando ? (
          <div style={styles.loading}>
            Carregando compras...
          </div>
        ) : comprasFiltradas.length ===
          0 ? (
          <div
            style={
              styles.emptyLarge
            }
          >
            Nenhuma compra encontrada.
          </div>
        ) : (
          <div
            style={
              styles.tableWrap
            }
          >
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    Data
                  </th>

                  <th style={styles.th}>
                    Fornecedor
                  </th>

                  <th style={styles.th}>
                    Modelo
                  </th>

                  <th style={styles.th}>
                    Cor
                  </th>

                  <th style={styles.th}>
                    Memória
                  </th>

                  <th style={styles.th}>
                    Qtd.
                  </th>

                  <th style={styles.th}>
                    Compra
                  </th>

                  <th style={styles.th}>
                    Total
                  </th>

                  <th style={styles.th}>
                    IMEIs
                  </th>

                  <th style={styles.th}>
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {comprasFiltradas.map(
                  (compra) => {
                    const aberto =
                      compraAberta ===
                      compra.id;

                    const moedaCompra =
                      compra.moedaCompra ===
                      "BRL"
                        ? "BRL"
                        : "USD";

                    const preco =
                      compra.precoCompra ??
                      (moedaCompra ===
                      "BRL"
                        ? compra.precoCompraBrl
                        : compra.precoCompraUsd);

                    const total =
                      Number(
                        preco || 0
                      ) *
                      Number(
                        compra.quantidade ||
                          0
                      );

                    return (
                      <tr
                        key={
                          compra.id
                        }
                      >
                        <td
                          style={
                            styles.td
                          }
                        >
                          {dataBr(
                            compra.dataCompra ||
                              compra.createdAt
                          )}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          {compra.fornecedor ||
                            "-"}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          <strong>
                            {
                              compra.produtoNome
                            }
                          </strong>
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          {compra
                            .aparelhos?.[0]
                            ?.cor || "-"}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          {compra
                            .aparelhos?.[0]
                            ?.memoria || "-"}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          {
                            compra.quantidade
                          }
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          <strong>
                            {dinheiro(
                              preco,
                              moedaCompra
                            )}
                          </strong>

                          <div
                            style={
                              styles.moedaBadge
                            }
                          >
                            {moedaCompra}
                          </div>
                        </td>

                        <td
                          style={{
                            ...styles.td,
                            fontWeight: 800,
                          }}
                        >
                          {dinheiro(
                            total,
                            moedaCompra
                          )}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setCompraAberta(
                                aberto
                                  ? null
                                  : compra.id
                              )
                            }
                            style={
                              styles.viewButton
                            }
                          >
                            {aberto
                              ? "Ocultar"
                              : `Ver ${
                                  compra
                                    .aparelhos
                                    ?.length ||
                                  0
                                } IMEI(s)`}
                          </button>

                          {aberto && (
                            <div
                              style={
                                styles.expandedImeis
                              }
                            >
                              {(
                                compra.aparelhos ||
                                []
                              ).map(
                                (
                                  aparelho
                                ) => (
                                  <span
                                    key={
                                      aparelho.id
                                    }
                                    style={
                                      aparelho.vendido
                                        ? styles.imeiSmall
                                        : styles.imeiSmallAvailable
                                    }
                                  >
                                    {
                                      aparelho.imei
                                    }

                                    {aparelho.vendido
                                      ? " • Vendido"
                                      : ""}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </td>

                        <td
                          style={
                            styles.td
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              abrirEdicao(
                                compra
                              )
                            }
                            style={
                              styles.editButton
                            }
                          >
                            ✏️ Editar
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editando && (
        <div
          style={
            styles.modalOverlay
          }
        >
          <div
            style={{
              ...styles.modal,
              maxWidth: 850,
            }}
          >
            <div
              style={
                styles.modalHeader
              }
            >
              <div>
                <h2
                  style={
                    styles.cardTitle
                  }
                >
                  ✏️ Editar compra
                </h2>

                <p
                  style={
                    styles.muted
                  }
                >
                  Altere os dados da compra.
                  Os IMEIs vendidos não
                  podem ser apagados.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditando(null)
                }
                style={
                  styles.closeButton
                }
              >
                ×
              </button>
            </div>

            <div style={styles.grid4}>
              <label style={styles.label}>
                Data

                <input
                  type="date"
                  value={editData}
                  onChange={(e) =>
                    setEditData(
                      e.target.value
                    )
                  }
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Modelo

                <input
                  list="modelos-edicao"
                  value={editModelo}
                  onChange={(e) =>
                    setEditModelo(
                      e.target.value
                    )
                  }
                  style={styles.input}
                />

                <datalist id="modelos-edicao">
                  {modelos.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      />
                    )
                  )}
                </datalist>
              </label>

              <label style={styles.label}>
                Fornecedor

                <select
                  value={editFornecedor}
                  onChange={(e) =>
                    setEditFornecedor(
                      e.target.value
                    )
                  }
                  style={styles.input}
                >
                  <option value="">
                    Selecionar
                  </option>

                  {fornecedoresDisponiveis.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label style={styles.label}>
                Preço

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <select
                    value={editMoeda}
                    onChange={(e) =>
                      setEditMoeda(
                        e.target.value as Moeda
                      )
                    }
                    style={{
                      ...styles.input,
                      width: 105,
                    }}
                  >
                    <option value="USD">
                      USD $
                    </option>

                    <option value="BRL">
                      BRL R$
                    </option>
                  </select>

                  <input
                    inputMode="decimal"
                    value={editPreco}
                    onChange={(e) =>
                      setEditPreco(
                        e.target.value
                      )
                    }
                    style={{
                      ...styles.input,
                      flex: 1,
                    }}
                  />
                </div>
              </label>

              <label style={styles.label}>
                Cor

                <select
                  value={editCor}
                  onChange={(e) =>
                    setEditCor(
                      e.target.value
                    )
                  }
                  style={styles.input}
                >
                  <option value="">
                    Sem cor
                  </option>

                  {cores.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label style={styles.label}>
                Memória

                <select
                  value={editMemoria}
                  onChange={(e) =>
                    setEditMemoria(
                      e.target.value
                    )
                  }
                  style={styles.input}
                >
                  <option value="">
                    Sem memória
                  </option>

                  {memorias.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <div
              style={
                styles.editImeiBox
              }
            >
              <div
                style={
                  styles.editImeiHeader
                }
              >
                <strong>
                  IMEIs desta compra
                </strong>

                <span
                  style={
                    styles.imeiCountBadge
                  }
                >
                  {
                    editando.aparelhos
                      ?.length || 0
                  }{" "}
                  IMEI(s)
                </span>
              </div>

              <div
                style={
                  styles.imeiList
                }
              >
                {(
                  editando.aparelhos ||
                  []
                ).length === 0 ? (
                  <span
                    style={
                      styles.empty
                    }
                  >
                    Nenhum IMEI nesta
                    compra.
                  </span>
                ) : (
                  (
                    editando.aparelhos ||
                    []
                  ).map(
                    (aparelho) => (
                      <span
                        key={
                          aparelho.id
                        }
                        style={
                          aparelho.vendido
                            ? styles.imeiSmallSold
                            : styles.imeiSmallAvailable
                        }
                      >
                        <span>
                          {
                            aparelho.imei
                          }

                          {aparelho.vendido &&
                            " • Vendido"}
                        </span>

                        {!aparelho.vendido && (
                          <button
                            type="button"
                            disabled={
                              salvando
                            }
                            onClick={() =>
                              excluirImeiDaCompra(
                                aparelho
                              )
                            }
                            title="Excluir IMEI"
                            aria-label={`Excluir IMEI ${aparelho.imei}`}
                            style={
                              styles.imeiDeleteButton
                            }
                          >
                            ×
                          </button>
                        )}
                      </span>
                    )
                  )
                )}
              </div>
            </div>

            <div
              style={
                styles.modalActions
              }
            >
              <button
                type="button"
                onClick={() =>
                  setEditando(null)
                }
                style={
                  styles.clearButton
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={salvando}
                onClick={
                  salvarEdicao
                }
                style={
                  styles.primaryButton
                }
              >
                {salvando
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: 32,
    color: "#172033",
    fontFamily:
      "Arial, sans-serif",
  },

  topBar: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    margin: 0,
    fontSize: 32,
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#64748b",
  },

  topActions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  secondaryButton: {
    textDecoration: "none",
    background: "#fff",
    border: "1px solid #d8dee9",
    color: "#334155",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 700,
  },

  card: {
    background: "#fff",
    border:
      "1px solid #e4e8ef",
    borderRadius: 16,
    padding: 22,
    marginBottom: 22,
    boxShadow:
      "0 6px 20px rgba(15,23,42,.05)",
  },

  cardHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 20,
  },

  cardTitle: {
    margin: 0,
    fontSize: 21,
  },

  muted: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 14,
  },

  adminBadge: {
    background: "#fff7ed",
    color: "#c2410c",
    border:
      "1px solid #fed7aa",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 800,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 16,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",
    gap: 14,
  },

  grid4: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,minmax(0,1fr))",
    gap: 16,
  },

  fieldTitleRow: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 8,
  },

  label: {
    display: "flex",
    flexDirection:
      "column",
    gap: 7,
    fontSize: 13,
    fontWeight: 700,
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    border:
      "1px solid #cbd5e1",
    borderRadius: 9,
    padding: "11px 12px",
    background: "#fff",
    fontSize: 14,
    outline: "none",
  },

  smallAddButton: {
    border:
      "1px solid #bfdbfe",
    borderRadius: 8,
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: "7px 11px",
    fontWeight: 800,
    cursor: "pointer",
  },

  imeiBox: {
    marginTop: 18,
    padding: 16,
    background: "#f8fafc",
    border:
      "1px solid #e2e8f0",
    borderRadius: 12,
  },

  imeiHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    margin: 0,
    fontSize: 16,
  },

  imeiInputRow: {
    display: "flex",
    gap: 10,
    marginTop: 14,
    alignItems: "center",
  },

  addButton: {
    border: 0,
    borderRadius: 9,
    padding: "11px 15px",
    background: "#334155",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  imeiList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  imeiChip: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    background: "#dcfce7",
    color: "#166534",
    border:
      "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "9px 30px 9px 12px",
    fontSize: 13,
    fontWeight: 700,
    wordBreak: "break-all",
  },

  chipButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 18,
    height: 18,
    padding: 0,
    border:
      "2px solid #fff",
    borderRadius: "50%",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    lineHeight: "14px",
    fontWeight: 800,
  },

  empty: {
    color: "#94a3b8",
    fontSize: 13,
  },

  formFooter: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 20,
    alignItems: "center",
    marginTop: 18,
    flexWrap: "wrap",
  },

  totalPreview: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#64748b",
    fontSize: 14,
  },

  primaryButton: {
    border: 0,
    borderRadius: 10,
    padding: "12px 20px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },

  success: {
    marginBottom: 16,
    padding: "12px 14px",
    borderRadius: 10,
    background: "#dcfce7",
    color: "#166534",
    border:
      "1px solid #bbf7d0",
    fontWeight: 700,
  },

  error: {
    marginBottom: 16,
    padding: "12px 14px",
    borderRadius: 10,
    background: "#fee2e2",
    color: "#991b1b",
    border:
      "1px solid #fecaca",
    fontWeight: 700,
  },

  summary: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    color: "#64748b",
    flexWrap: "wrap",
  },

  filters: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr auto",
    gap: 10,
    marginBottom: 16,
  },

  clearButton: {
    border:
      "1px solid #cbd5e1",
    borderRadius: 9,
    background: "#fff",
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    minWidth: 1250,
  },

  th: {
    textAlign: "left",
    padding: "12px 10px",
    borderBottom:
      "1px solid #e2e8f0",
    color: "#475569",
    fontSize: 12,
    textTransform:
      "uppercase",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "13px 10px",
    borderBottom:
      "1px solid #eef2f7",
    verticalAlign:
      "top",
    fontSize: 14,
  },

  moedaBadge: {
    display: "inline-block",
    marginTop: 4,
    background: "#f1f5f9",
    color: "#475569",
    borderRadius: 5,
    padding: "2px 5px",
    fontSize: 10,
    fontWeight: 800,
  },

  viewButton: {
    border:
      "1px solid #bfdbfe",
    background: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: 8,
    padding: "7px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },

  editButton: {
    border:
      "1px solid #fde68a",
    background: "#fffbeb",
    color: "#92400e",
    borderRadius: 8,
    padding: "8px 11px",
    cursor: "pointer",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },

  expandedImeis: {
    display: "flex",
    flexDirection:
      "column",
    gap: 5,
    marginTop: 9,
  },

  imeiSmall: {
    display: "inline-block",
    background: "#f1f5f9",
    borderRadius: 6,
    padding: "5px 7px",
    fontSize: 12,
    color: "#334155",
  },

  /*
   * IMEI disponível في الجدول
   */
  imeiSmallAvailable: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    background: "#ecfdf5",
    border:
      "1px solid #bbf7d0",
    borderRadius: 6,
    padding: "5px 8px",
    fontSize: 12,
    color: "#166534",
    fontWeight: 700,
  },

  /*
   * IMEI vendido
   */
  imeiSmallSold: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    background: "#f1f5f9",
    border:
      "1px solid #e2e8f0",
    borderRadius: 6,
    padding: "7px 9px",
    fontSize: 12,
    color: "#64748b",
  },

  /*
   * IMEI disponível داخل نافذة التعديل.
   * الـ × موجود فوق على اليمين وصغير جدًا.
   */
  imeiDeleteButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 17,
    height: 17,
    minWidth: 17,
    padding: 0,
    border:
      "2px solid #fff",
    borderRadius: "50%",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontSize: 10,
    lineHeight: "12px",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    boxShadow:
      "0 1px 3px rgba(0,0,0,.18)",
  },

  editImeiHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 10,
  },

  imeiCountBadge: {
    background: "#e2e8f0",
    color: "#475569",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 800,
  },

  loading: {
    padding: 30,
    textAlign: "center",
    color: "#64748b",
  },

  emptyLarge: {
    padding: 35,
    textAlign: "center",
    color: "#94a3b8",
    border:
      "1px dashed #cbd5e1",
    borderRadius: 10,
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background:
      "rgba(15,23,42,.45)",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    padding: 20,
    overflowY: "auto",
  },

  modal: {
    width: "100%",
    maxWidth: 620,
    background: "#fff",
    borderRadius: 16,
    padding: 22,
    boxShadow:
      "0 20px 50px rgba(15,23,42,.25)",
  },

  modalHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 16,
    alignItems:
      "flex-start",
    marginBottom: 20,
  },

  closeButton: {
    border: 0,
    background: "#f1f5f9",
    color: "#475569",
    width: 34,
    height: 34,
    borderRadius: "50%",
    fontSize: 24,
    cursor: "pointer",
    lineHeight: 1,
  },

  modalActions: {
    display: "flex",
    justifyContent:
      "flex-end",
    gap: 10,
    marginTop: 22,
  },

  fornecedorItem: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    gap: 12,
    border:
      "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "9px 10px",
    background: "#f9fafb",
  },

  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    border:
      "1px solid #fecaca",
    background: "#fff",
    color: "#dc2626",
    fontWeight: 800,
    fontSize: 18,
    cursor: "pointer",
  },

  helper: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 3,
  },

  editImeiBox: {
    marginTop: 20,
    padding: 14,
    border:
      "1px solid #e2e8f0",
    borderRadius: 10,
    background: "#f8fafc",
  },
};