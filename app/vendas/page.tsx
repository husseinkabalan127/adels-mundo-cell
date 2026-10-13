"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Aparelho = {
  id: number;
  imei: string;
  vendido: boolean;
  produtoId: number;
  loteId: number;
  cor?: string | null;
  memoria?: string | null;

  produto?: {
    id: number;
    nome: string;
    quantidade: number;
  };

  lote?: {
    id: number;
    fornecedor?: string | null;
    precoCompraUsd?: number | null;
  };
};

type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  aparelhos?: Aparelho[];
};

type VendaItemForm = {
  produtoId: number | "";
  quantidade: number;
  valorUnitario: string;
  imeis: string[];
};

type PagamentoForm = { forma: string; valor: string; observacao: string };

type ClienteOpcao = { id?: number | string; nome: string; telefone?: string | null; cpfCnpj?: string | null };

type Venda = {
  id: number;

  createdAt?: string;

  data?: string;

  dataVenda?: string;

  cliente?: string | null;

  formaPagamento?: string | null;

  estadoFatura?: string | null;

  taxa?: number | null;

  total?: number | null;

  valorTotal?: number | null;

  itens?: any[];
  pagamentos?: { id?: number; forma?: string | null; valor?: number; desconto?: number; observacao?: string | null }[];
  descontoVenda?: number;
  desconto?: number;
  descontosPagamentos?: number;
  valorFinal?: number;
  totalPago?: number;
  saldo?: number;
};

export default function VendasPage() {
  // =====================================================
  // ESTOQUE
  // =====================================================

  const [produtos, setProdutos] = useState<
    Produto[]
  >([]);

  // =====================================================
  // DADOS DA VENDA
  // =====================================================

  const [cliente, setCliente] =
    useState("");
  const [clientesCadastrados, setClientesCadastrados] = useState<ClienteOpcao[]>([]);
  const [mostrarListaClientes, setMostrarListaClientes] = useState(false);
  const [carregandoClientes, setCarregandoClientes] = useState(false);

  // Campos visuais do formulário conforme o layout solicitado.
  const [responsavel, setResponsavel] = useState("Hassan");
  const [responsavelCarregado, setResponsavelCarregado] = useState(false);
  const [garantia, setGarantia] = useState("Sem garantia");
  const [observacoes, setObservacoes] = useState("");
  const [frete, setFrete] = useState("0");
  const [editarFrete, setEditarFrete] = useState(false);
  const [precoEditandoIndex, setPrecoEditandoIndex] = useState<number | null>(null);
  const [menuItemAberto, setMenuItemAberto] = useState<number | null>(null);

  const [formaPagamento, setFormaPagamento] =
    useState("Não informado");

  const [descontoVenda, setDescontoVenda] = useState("");
  const [pagamentos, setPagamentos] = useState<PagamentoForm[]>([
    { forma: "Dinheiro", valor: "", observacao: "" },
  ]);

  const [estadoFatura, setEstadoFatura] =
    useState("Não informado");

  const [taxa, setTaxa] =
    useState("");

  // =====================================================
  // DATA DA VENDA
  // =====================================================

  function dataHoje() {
    const agora = new Date();

    const ano =
      agora.getFullYear();

    const mes = String(
      agora.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
      agora.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  const [dataVenda, setDataVenda] =
    useState(dataHoje());

  // =====================================================
  // ITENS
  // =====================================================

  const [itens, setItens] =
    useState<VendaItemForm[]>([
      {
        produtoId: "",
        quantidade: 1,
        valorUnitario: "",
        imeis: [],
      },
    ]);

  // =====================================================
  // BUSCA DE MODELO — INDEPENDENTE PARA CADA PRODUTO
  // =====================================================

  const [buscaModelo, setBuscaModelo] =
    useState<Record<number, string>>({});
  const [buscaProdutoTabela, setBuscaProdutoTabela] = useState("");
  const [telaPagamento, setTelaPagamento] = useState(false);
  const [editarDesconto, setEditarDesconto] = useState(false);

  // =====================================================
  // IMEI
  // =====================================================

  const [imeiBusca, setImeiBusca] =
    useState("");

  // =====================================================
  // MENSAGENS
  // =====================================================

  const [mensagem, setMensagem] =
    useState("");

  const [erro, setErro] =
    useState("");

  const [salvando, setSalvando] =
    useState(false);

  // =====================================================
  // VENDAS
  // =====================================================

  const [vendas, setVendas] =
    useState<Venda[]>([]);

  const [carregandoVendas, setCarregandoVendas] =
    useState(false);

  const [excluindoVendaId, setExcluindoVendaId] =
    useState<number | null>(null);

  const [editandoVendaId, setEditandoVendaId] =
    useState<number | null>(null);

  const [devolvendoAparelhoId, setDevolvendoAparelhoId] =
    useState<number | null>(null);

  // Dias ficam fechados por padrão.
  const [diasAbertos, setDiasAbertos] =
    useState<Record<string, boolean>>({});

  // Cada venda também fica fechada por padrão.
  // Ao clicar no nome do cliente, mostramos todos os detalhes da venda.
  const [vendasAbertas, setVendasAbertas] =
    useState<Record<number, boolean>>({});

  // Referência separada para cada campo de IMEI.
  // Assim, ao escanear um IMEI no Produto 2, por exemplo,
  // o foco continua no Produto 2 e a página não volta para o Produto 1.
  const imeiInputRefs =
    useRef<Record<number, HTMLInputElement | null>>({});

  const [imeiInputAtivo, setImeiInputAtivo] =
    useState(0);

  // =====================================================
  // CARREGAR ESTOQUE
  // =====================================================

  async function carregarEstoque() {
    try {
      const res =
        await fetch(
          "/api/estoque",
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao carregar estoque."
        );
      }

      setProdutos(data);
    } catch (e: any) {
      setErro(
        e.message ||
          "Erro ao carregar estoque."
      );
    }
  }

  // =====================================================
  // CARREGAR VENDAS
  // =====================================================

  async function carregarVendas() {
    try {
      setCarregandoVendas(true);

      const res =
        await fetch(
          "/api/vendas",
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao carregar vendas."
        );
      }

      if (Array.isArray(data)) {
        setVendas(data);
      } else if (
        Array.isArray(data.vendas)
      ) {
        setVendas(
          data.vendas
        );
      } else {
        setVendas([]);
      }
    } catch (e: any) {
      console.error(e);

      setErro(
        e.message ||
          "Erro ao carregar vendas."
      );
    } finally {
      setCarregandoVendas(false);
    }
  }

  // =====================================================
  // CARREGAR CLIENTES CADASTRADOS (para selecionar na venda)
  // =====================================================

  async function carregarClientes() {
    setCarregandoClientes(true);
    try {
      const res = await fetch("/api/clientes", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data?.clientes)
          ? data.clientes
          : Array.isArray(data?.data)
            ? data.data
            : [];
      const normalizados = lista
        .map((c: any) => ({
          id: c.id,
          nome: String(c.nome ?? c.name ?? c.nomeCompleto ?? c.razaoSocial ?? "").trim(),
          telefone: c.telefone ?? c.celular ?? c.phone ?? null,
          cpfCnpj: c.cpfCnpj ?? c.cpf ?? c.cnpj ?? null,
        }))
        .filter((c: ClienteOpcao) => c.nome);
      setClientesCadastrados(normalizados);
    } catch (error) {
      // A venda continua funcionando com o campo de cliente digitado manualmente.
      console.warn("Não foi possível carregar a lista de clientes:", error);
    } finally {
      setCarregandoClientes(false);
    }
  }

  // =====================================================
  // CARREGAR AO ABRIR
  // =====================================================

  useEffect(() => {
    carregarEstoque();
    carregarVendas();
    carregarClientes();

    // Recupera o último responsável usado neste navegador.
    try {
      const salvo = window.localStorage.getItem("adels_vendas_responsavel");
      if (salvo !== null) setResponsavel(salvo);
    } catch (error) {
      console.error("Não foi possível carregar o responsável salvo:", error);
    } finally {
      setResponsavelCarregado(true);
    }
  }, []);

  useEffect(() => {
    if (!responsavelCarregado) return;
    try {
      window.localStorage.setItem("adels_vendas_responsavel", responsavel);
    } catch (error) {
      console.error("Não foi possível salvar o responsável:", error);
    }
  }, [responsavel, responsavelCarregado]);

  // =====================================================
  // APARELHOS DISPONÍVEIS
  // =====================================================

  const aparelhosDisponiveis =
    useMemo(() => {
      return produtos.flatMap(
        (produto) =>
          (produto.aparelhos || [])
            .filter(
              (a) => !a.vendido
            )
            .map((a) => ({
              ...a,

              produto: {
                id: produto.id,
                nome: produto.nome,
                quantidade:
                  produto.quantidade,
              },
            }))
      );
    }, [produtos]);

  // Busca os dados reais de cada aparelho pelo IMEI.
  // Cor e memória vêm do aparelho cadastrado em Compras/Estoque.
  function dadosAparelhoPorImei(imei: string) {
    return aparelhosDisponiveis.find((aparelho) => aparelho.imei === imei) || null;
  }

  function detalhesAparelho(aparelho: Aparelho) {
    const cor = aparelho.cor?.trim();
    const memoria = aparelho.memoria?.trim();
    return [cor ? `Cor: ${cor}` : null, memoria ? `Memória: ${memoria}` : null]
      .filter(Boolean)
      .join(" • ");
  }

  // =====================================================
  // IMEI ENCONTRADO
  // =====================================================

  const aparelhoEncontrado =
    useMemo(() => {
      const busca =
        imeiBusca.trim();

      if (!busca) {
        return null;
      }

      return (
        aparelhosDisponiveis.find(
          (a) =>
            a.imei === busca
        ) || null
      );
    }, [
      imeiBusca,
      aparelhosDisponiveis,
    ]);

  // =====================================================
  // RESULTADOS DE BUSCA IMEI
  // =====================================================

  const resultadosBusca =
    useMemo(() => {
      const busca =
        imeiBusca.trim();

      if (!busca) {
        return [];
      }

      return aparelhosDisponiveis
        .filter((a) =>
          a.imei.includes(
            busca
          )
        )
        .slice(0, 50);
    }, [
      imeiBusca,
      aparelhosDisponiveis,
    ]);

  // =====================================================
  // TOTAL DA NOVA VENDA
  // =====================================================

  const total =
    itens.reduce(
      (soma, item) => {
        const quantidade =
          Number(
            item.quantidade
          ) || 0;

        const valor =
          Number(
            String(
              item.valorUnitario
            ).replace(",", ".")
          ) || 0;

        return (
          soma +
          quantidade * valor
        );
      },
      0
    );

  const descontoVendaNumero = Number(String(descontoVenda || 0).replace(",", ".")) || 0;
  const totalDescontos = descontoVendaNumero;
  const totalLiquido = Math.max(0, total - totalDescontos);
  const totalPagamentos = pagamentos.reduce(
    (soma, p) => soma + (Number(String(p.valor || 0).replace(",", ".")) || 0),
    0
  );
  const saldoPendente = Math.max(0, totalLiquido - totalPagamentos);

  // =====================================================
  // ATUALIZAR ITEM
  // =====================================================

  function atualizarItem(
    index: number,
    changes: Partial<VendaItemForm>
  ) {
    setItens((atual) =>
      atual.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                ...changes,
              }
            : item
      )
    );
  }

  // =====================================================
  // ADICIONAR MODELO
  // =====================================================

  function adicionarModelo() {
    setItens((atual) => [
      ...atual,

      {
        produtoId: "",
        quantidade: 1,
        valorUnitario: "",
        imeis: [],
      },
    ]);
  }

  // =====================================================
  // SELECIONAR MODELO PELA BUSCA
  // =====================================================

  function selecionarModelo(
    index: number,
    produto: Produto
  ) {
    const precoExistente = itens.find(
      (item, i) => i !== index && item.produtoId === produto.id && item.valorUnitario !== ""
    )?.valorUnitario || "";

    atualizarItem(
      index,
      {
        produtoId: produto.id,
        imeis: [],
        quantidade: 1,
        valorUnitario: precoExistente,
      }
    );

    // O modelo foi escolhido: limpar a busca para fechar a lista de sugestões.
    setBuscaModelo((atual) => ({
      ...atual,
      [index]: "",
    }));
  }

  function selecionarProdutoTabela(produto: Produto) {
    const precoExistente = itens.find(
      (item) => item.produtoId === produto.id && item.valorUnitario !== ""
    )?.valorUnitario || "";
    const itemVazio = itens.findIndex((item) => item.produtoId === "");
    const novoItem: VendaItemForm = {
      produtoId: produto.id,
      quantidade: 1,
      valorUnitario: precoExistente,
      imeis: [],
    };
    if (itemVazio >= 0) {
      atualizarItem(itemVazio, novoItem);
    } else {
      setItens((atuais) => [...atuais, novoItem]);
    }
    setBuscaProdutoTabela("");
    setErro("");
  }

  // =====================================================
  // RESULTADOS DA BUSCA DE MODELO
  // =====================================================

  function resultadosModelo(index: number) {
    const busca =
      (buscaModelo[index] || "")
        .trim()
        .toLowerCase();

    if (!busca) {
      return [];
    }

    return produtos
      .filter(
        (produto) =>
          produto.quantidade > 0 &&
          produto.nome
            .toLowerCase()
            .includes(busca)
      )
      .slice(0, 20);
  }

  // =====================================================
  // ADICIONAR IMEI AO ITEM
  // =====================================================

  function adicionarImeiAoItem(
    itemIndex: number,
    imei: string
  ) {
    const valor =
      imei.trim();

    if (!valor) {
      return;
    }

    setItens((atual) =>
      atual.map(
        (item, i) => {
          if (
            i !== itemIndex
          ) {
            return item;
          }

          if (
            item.imeis.includes(
              valor
            )
          ) {
            return item;
          }

          return {
            ...item,

            imeis: [
              ...item.imeis,
              valor,
            ],

            quantidade:
              item.imeis.length +
              1,
          };
        }
      )
    );
  }

  // =====================================================
  // REMOVER IMEI
  // =====================================================

  function removerImei(
    itemIndex: number,
    imei: string
  ) {
    setItens((atual) =>
      atual.map(
        (item, i) => {
          if (
            i !== itemIndex
          ) {
            return item;
          }

          const novos =
            item.imeis.filter(
              (x) =>
                x !== imei
            );

          return {
            ...item,

            imeis: novos,

            quantidade:
              novos.length > 0
                ? novos.length
                : 1,
          };
        }
      )
    );
  }

  // =====================================================
  // ADICIONAR IMEI ENCONTRADO
  // =====================================================

  function focarCampoImei(index: number) {
    setTimeout(() => {
      const input =
        imeiInputRefs.current[index];

      if (input) {
        // Evita que o navegador faça o scroll automático
        // para outro campo ao devolver o foco.
        input.focus({
          preventScroll: true,
        });
      }
    }, 50);
  }

  function adicionarImeiEncontrado(
    _itemIndexPreferido?: number,
    aparelhoSelecionado?: Aparelho
  ) {
    setErro("");
    setMensagem("");

    const imei = aparelhoSelecionado?.imei?.trim() || imeiBusca.trim();
    if (!imei) {
      setErro("Digite o IMEI para buscar.");
      return;
    }

    // Cada aparelho fica em uma linha própria. Assim, o mesmo modelo
    // pode ter preço diferente conforme cor, memória ou condição.
    const aparelho = aparelhoSelecionado || aparelhoEncontrado;
    if (!aparelho) {
      setErro("IMEI não encontrado ou já vendido.");
      return;
    }

    const imeiJaAdicionado = itens.some((item) => item.imeis.includes(aparelho.imei));
    if (imeiJaAdicionado) {
      setErro("Este IMEI já foi adicionado a esta venda.");
      setImeiBusca("");
      return;
    }

    const produto = produtos.find((p) => p.id === aparelho.produtoId);
    const novoItem: VendaItemForm = {
      produtoId: aparelho.produtoId,
      quantidade: 1,
      // Preço individual: não copiar o preço de outro aparelho do mesmo modelo.
      valorUnitario: "",
      imeis: [aparelho.imei],
    };

    setItens((atuais) => [
      ...atuais.filter((item) => item.produtoId !== ""),
      novoItem,
    ]);
    setImeiBusca("");
    setBuscaModelo({});
    setImeiInputAtivo(0);
    setMensagem(`${produto?.nome || "Aparelho"}${detalhesAparelho(aparelho) ? ` - ${detalhesAparelho(aparelho)}` : ""} adicionado à venda. Informe o preço deste aparelho.`);

    // Mantém o foco no leitor/campo de IMEI para o próximo aparelho.
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input[placeholder="Digite ou faça Scan do IMEI"]');
      input?.focus({ preventScroll: true });
    }, 50);
  }

  // =====================================================
  // ENTER NO IMEI
  // =====================================================

  function onImeiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      e.key === "Enter"
    ) {
      e.preventDefault();

      adicionarImeiEncontrado(
        imeiInputAtivo
      );
    }
  }

  // =====================================================
  // DINHEIRO
  // =====================================================

  function dinheiro(
    valor: number
  ) {
    return `R$ ${valor
      .toFixed(2)
      .replace(".", ",")}`;
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(
    data?: string
  ) {
    if (!data) {
      return "-";
    }

    try {
      const d =
        new Date(data);

      return d.toLocaleDateString(
        "pt-BR"
      );
    } catch {
      return data;
    }
  }

  // =====================================================
  // CHAVE DA DATA
  // =====================================================

  function chaveDataVenda(
    venda: Venda
  ) {
    const data =
      venda.dataVenda ||
      venda.createdAt ||
      venda.data;

    if (!data) {
      return "sem-data";
    }

    const d =
      new Date(data);

    if (
      Number.isNaN(
        d.getTime()
      )
    ) {
      return "sem-data";
    }

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(
      2,
      "0"
    )}-${String(
      d.getDate()
    ).padStart(
      2,
      "0"
    )}`;
  }

  // =====================================================
  // FORMATAR GRUPO DO DIA
  // =====================================================

  function formatarDataGrupo(
    chave: string
  ) {
    if (
      chave ===
      "sem-data"
    ) {
      return "Sem data";
    }

    const partes =
      chave.split(
        "-"
      );

    const ano =
      Number(partes[0]);

    const mes =
      Number(partes[1]);

    const dia =
      Number(partes[2]);

    return new Date(
      ano,
      mes - 1,
      dia
    ).toLocaleDateString(
      "pt-BR"
    );
  }

  // =====================================================
  // NOME DO PRODUTO
  // =====================================================

  function nomeProdutoDoItem(
    item: any
  ) {
    return (
      item?.produto?.nome ||
      item?.produtoNome ||
      item?.nome ||
      "-"
    );
  }

  // =====================================================
  // IMEIS DO ITEM
  // =====================================================

  function imeisDoItem(
    item: any
  ) {
    if (
      Array.isArray(
        item?.aparelhos
      )
    ) {
      const imeis =
        item.aparelhos
          .map(
            (a: any) =>
              a?.imei
          )
          .filter(Boolean);

      if (
        imeis.length
      ) {
        return imeis.join(
          ", "
        );
      }
    }

    if (
      Array.isArray(
        item?.imeis
      )
    ) {
      return item.imeis.join(
        ", "
      );
    }

    if (
      typeof item?.imei ===
      "string"
    ) {
      return item.imei;
    }

    return "-";
  }

  // Cor e memória por aparelho vendido, quando a API devolve esses campos.
  function detalhesAparelhosDoItem(item: any) {
    const aparelhos = Array.isArray(item?.aparelhos) ? item.aparelhos : [];
    const detalhes = aparelhos.map((a: any) => {
      const cor = String(a?.cor ?? "").trim();
      const memoriaRaw = String(a?.memoria ?? a?.gb ?? "").trim();
      const memoria = memoriaRaw && !/gb/i.test(memoriaRaw) ? `${memoriaRaw} GB` : memoriaRaw;
      return [cor ? `Cor: ${cor}` : "", memoria ? `Memória: ${memoria}` : ""].filter(Boolean).join(" • ");
    }).filter(Boolean);
    if (detalhes.length) return [...new Set(detalhes)].join(" / ");
    const cor = String(item?.cor ?? "").trim();
    const memoriaRaw = String(item?.memoria ?? item?.gb ?? "").trim();
    const memoria = memoriaRaw && !/gb/i.test(memoriaRaw) ? `${memoriaRaw} GB` : memoriaRaw;
    return [cor ? `Cor: ${cor}` : "", memoria ? `Memória: ${memoria}` : ""].filter(Boolean).join(" • ");
  }

  // =====================================================
  // TOTAL DA VENDA
  // =====================================================

  function totalDaVenda(
    venda: Venda
  ) {
    if (
      typeof venda.total ===
      "number"
    ) {
      return venda.total;
    }

    if (
      typeof venda.valorTotal ===
      "number"
    ) {
      return venda.valorTotal;
    }

    if (
      Array.isArray(
        venda.itens
      )
    ) {
      return venda.itens.reduce(
        (
          soma: number,
          item: any
        ) => {
          if (
            typeof item.total ===
            "number"
          ) {
            return (
              soma +
              item.total
            );
          }

          const quantidade =
            Number(
              item.quantidade
            ) || 0;

          const valor =
            Number(
              item.valorUnitario ??
                item.preco ??
                item.valor ??
                0
            ) || 0;

          return (
            soma +
            quantidade *
              valor
          );
        },
        0
      );
    }

    return 0;
  }

  // =====================================================
  // REGISTRAR VENDA
  // =====================================================

  function adicionarPagamento() {
    setPagamentos((atuais) => [...atuais, { forma: "Pix", valor: "", observacao: "" }]);
  }

  function atualizarPagamento(index: number, campo: keyof PagamentoForm, valor: string) {
    setPagamentos((atuais) => atuais.map((p, i) => i === index ? { ...p, [campo]: valor } : p));
  }

  function removerPagamento(index: number) {
    setPagamentos((atuais) => atuais.filter((_, i) => i !== index));
  }

  async function registrarVenda() {
    setErro("");
    setMensagem("");

    if (!dataVenda) {
      setErro(
        "Selecione a data da venda."
      );

      return;
    }

    for (
      const item of itens
    ) {
      if (
        !item.produtoId
      ) {
        setErro(
          "Selecione o modelo de cada produto."
        );

        return;
      }

      if (
        !item.imeis.length ||
        item.imeis.length !==
          Number(
            item.quantidade
          )
      ) {
        setErro(
          "A quantidade de IMEI precisa ser igual à quantidade do aparelho."
        );

        return;
      }

      if (
        Number(
          item.quantidade
        ) <= 0
      ) {
        setErro(
          "Quantidade inválida."
        );

        return;
      }

      if (
        !item.valorUnitario ||
        Number(
          String(
            item.valorUnitario
          ).replace(
            ",",
            "."
          )
        ) < 0
      ) {
        setErro(
          "Informe o preço de venda."
        );

        return;
      }
    }

    setSalvando(true);

    try {
      const res =
        await fetch(
          "/api/vendas",
          {
            method: editandoVendaId ? "PUT" : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...(editandoVendaId ? { vendaId: editandoVendaId } : {}),
              cliente,

              dataVenda,

              taxa:
                taxa === ""
                  ? null
                  : Number(
                      String(
                        taxa
                      ).replace(
                        ",",
                        "."
                      )
                    ),

              itens:
                itens.map(
                  (
                    item
                  ) => ({
                    produtoId:
                      Number(
                        item.produtoId
                      ),

                    quantidade:
                      Number(
                        item.quantidade
                      ),

                    valorUnitario:
                      Number(
                        String(
                          item.valorUnitario
                        ).replace(
                          ",",
                          "."
                        )
                      ) || 0,

                    imeis:
                      item.imeis,
                  })
                ),

              formaPagamento: pagamentos.length === 1 ? pagamentos[0].forma : "Múltiplos pagamentos",
              estadoFatura: totalPagamentos <= 0 ? "Não pago" : totalPagamentos + 0.005 >= totalLiquido ? "Pago" : "Parcial",
              descontoVenda: Number(String(descontoVenda || 0).replace(",", ".")) || 0,
              pagamentos: pagamentos.filter((p) => p.valor !== "" || p.observacao !== "").map((p) => ({
                ...p,
                valor: Number(String(p.valor || 0).replace(",", ".")) || 0,
                desconto: 0,
              })),
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao registrar venda."
        );
      }

      setMensagem(
        data.message ||
          (editandoVendaId ? "Venda atualizada com sucesso!" : "Venda registrada com sucesso!")
      );
      setEditandoVendaId(null);
      setTelaPagamento(false);

      setCliente("");
      setGarantia("Sem garantia");
      setObservacoes("");
      setFrete("0");
      setTaxa("");

      setFormaPagamento("Não informado");
      setDescontoVenda("");
      setPagamentos([{ forma: "Dinheiro", valor: "", observacao: "" }]);

      setEstadoFatura(
        "Não informado"
      );

      setDataVenda(
        dataHoje()
      );

      setItens([
        {
          produtoId: "",
          quantidade: 1,
          valorUnitario: "",
          imeis: [],
        },
      ]);

      setImeiBusca("");

      setBuscaModelo({});

      await carregarEstoque();

      await carregarVendas();

      setImeiInputAtivo(0);

      setTimeout(() => {
        imeiInputRefs.current[0]?.focus({
          preventScroll: true,
        });
      }, 100);
    } catch (e: any) {
      setErro(
        e.message ||
          "Erro ao registrar venda."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // EDITAR VENDA EXISTENTE
  // =====================================================

  function iniciarEdicaoVenda(venda: Venda) {
    const itensVenda = Array.isArray(venda.itens) ? venda.itens : [];
    if (!itensVenda.length) {
      setErro("Esta venda não possui itens para editar.");
      return;
    }

    setErro("");
    setMensagem("");
    setEditandoVendaId(venda.id);
    setCliente(venda.cliente || "");
    setDataVenda(String(venda.dataVenda || venda.createdAt || "").slice(0, 10) || dataHoje());
    setTaxa(venda.taxa == null ? "" : String(venda.taxa));
    setDescontoVenda(String(Number(venda.descontoVenda ?? (venda as any).desconto ?? 0)));
    setFormaPagamento(venda.formaPagamento || "Não informado");
    setEstadoFatura(venda.estadoFatura || "Não informado");
    setItens(itensVenda.map((item: any) => {
      const aparelhos = Array.isArray(item.aparelhos) ? item.aparelhos : [];
      return {
        produtoId: Number(item.produtoId ?? item.produto?.id) || "",
        quantidade: Number(item.quantidade) || aparelhos.length || 1,
        valorUnitario: String(Number(item.valorUnitario ?? item.preco ?? item.valor ?? 0)),
        imeis: aparelhos.map((a: any) => String(a.imei || "")).filter(Boolean),
      };
    }));
    const pagamentosVenda = Array.isArray(venda.pagamentos) ? venda.pagamentos : [];
    setPagamentos(pagamentosVenda.length ? pagamentosVenda.map((p: any) => ({
      forma: p.forma || "Dinheiro",
      valor: String(Number(p.valor || 0)),
      observacao: p.observacao || "",
    })) : [{ forma: venda.formaPagamento || "Dinheiro", valor: "", observacao: "" }]);
    setBuscaModelo({});
    setImeiBusca("");
    setTelaPagamento(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicaoVenda() {
    setEditandoVendaId(null);
    setCliente("");
    setGarantia("Sem garantia");
    setObservacoes("");
    setFrete("0");
    setTaxa("");
    setDescontoVenda("");
    setPagamentos([{ forma: "Dinheiro", valor: "", observacao: "" }]);
    setEstadoFatura("Não informado");
    setDataVenda(dataHoje());
    setItens([{ produtoId: "", quantidade: 1, valorUnitario: "", imeis: [] }]);
    setBuscaModelo({});
    setImeiBusca("");
    setTelaPagamento(false);
  }

  // =====================================================
  // DEVOLVER UM APARELHO DA VENDA
  // NÃO EXCLUI A FATURA
  // =====================================================

  async function devolverAparelho(
    vendaId: number,
    aparelhoId: number,
    imei: string
  ) {
    const confirmar = window.confirm(
      `Tem certeza que deseja devolver este aparelho?\n\nIMEI: ${imei}\n\nA venda/fatura continuará registrada e somente este aparelho será devolvido ao estoque.`
    );

    if (!confirmar) return;

    setErro("");
    setMensagem("");
    setDevolvendoAparelhoId(aparelhoId);

    try {
      const res = await fetch("/api/vendas", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendaId, aparelhoId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao devolver o aparelho.");
      setMensagem(data.message || `Aparelho ${imei} devolvido com sucesso.`);
      await carregarEstoque();
      await carregarVendas();
    } catch (e: any) {
      setErro(e.message || "Erro ao devolver o aparelho.");
    } finally {
      setDevolvendoAparelhoId(null);
    }
  }

  // =====================================================
  // EXCLUIR VENDA
  // =====================================================

  async function excluirVenda(
    vendaId: number
  ) {
    const confirmar =
      window.confirm(
        "Tem certeza que deseja excluir esta venda?\n\nOs aparelhos e os IMEIs desta venda serão devolvidos ao estoque."
      );

    if (!confirmar) {
      return;
    }

    setErro("");
    setMensagem("");

    setExcluindoVendaId(
      vendaId
    );

    try {
      const res =
        await fetch(
          "/api/vendas",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              vendaId,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Erro ao excluir venda."
        );
      }

      setMensagem(
        data.message ||
          "Venda excluída com sucesso e estoque restaurado."
      );

      await carregarEstoque();

      await carregarVendas();
    } catch (e: any) {
      setErro(
        e.message ||
          "Erro ao excluir venda."
      );
    } finally {
      setExcluindoVendaId(
        null
      );
    }
  }

  // =====================================================
  // ABRIR FATURA
  // =====================================================

  function abrirFatura(
    venda: Venda
  ) {
    const itensVenda =
      Array.isArray(
        venda.itens
      )
        ? venda.itens
        : [];

    const totalVenda =
      totalDaVenda(venda);

    const numeroFatura =
      String(
        venda.id
      ).padStart(
        6,
        "0"
      );

    const dataVendaTexto =
      formatarData(
        venda.dataVenda ||
          venda.createdAt ||
          venda.data
      );

    let produtosHtml =
      "";

    itensVenda.forEach(
      (item: any) => {
        const quantidade =
          Number(
            item.quantidade
          ) || 0;

        const valor =
          Number(
            item.valorUnitario ??
              item.preco ??
              item.valor ??
              0
          ) || 0;

        const subtotal =
          typeof item.total ===
          "number"
            ? item.total
            : quantidade *
              valor;

        const nome =
          nomeProdutoDoItem(
            item
          );

        const imeis =
          imeisDoItem(
            item
          );

        produtosHtml += `
          <tr>
            <td>
              <strong>${nome}</strong>
              <br>
              <small>IMEI: ${imeis}</small>
              ${detalhesAparelhosDoItem(item) ? `<br><small>${detalhesAparelhosDoItem(item)}</small>` : ""}
            </td>

            <td style="text-align:center">
              ${quantidade}
            </td>

            <td style="text-align:right">
              ${dinheiro(valor)}
            </td>

            <td style="text-align:right">
              <strong>
                ${dinheiro(subtotal)}
              </strong>
            </td>
          </tr>
        `;
      }
    );

    if (
      !produtosHtml
    ) {
      produtosHtml = `
        <tr>
          <td colspan="4">
            Nenhum produto encontrado.
          </td>
        </tr>
      `;
    }

    const html = `
      <!DOCTYPE html>

      <html lang="pt-BR">

      <head>

        <meta charset="UTF-8">

        <title>
          Fatura #${numeroFatura} - Adel's Mundo Cell
        </title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 30px;
            font-family: Arial, sans-serif;
            color: #111;
            background: #fff;
          }

          .invoice {
            max-width: 800px;
            margin: 0 auto;
          }

          .top {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 2px solid #111;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }

          h1 {
            margin: 0;
            font-size: 30px;
          }

          .store {
            font-size: 14px;
            color: #555;
            margin-top: 6px;
          }

          .invoice-number {
            text-align: right;
          }

          .invoice-number strong {
            font-size: 20px;
          }

          .customer {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
          }

          .customer div {
            margin: 5px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            background: #f2f2f2;
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }

          td {
            padding: 10px;
            border: 1px solid #ddd;
            vertical-align: top;
          }

          small {
            color: #555;
            word-break: break-all;
          }

          .total {
            margin-top: 20px;
            margin-left: auto;
            max-width: 300px;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }

          .grand-total {
            border-top: 2px solid #111;
            margin-top: 8px;
            padding-top: 10px;
            font-size: 20px;
            font-weight: bold;
          }

          .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 13px;
          }

          .buttons {
            max-width: 800px;
            margin: 20px auto;
            display: flex;
            gap: 10px;
            justify-content: center;
          }

          button {
            border: 0;
            border-radius: 8px;
            padding: 12px 20px;
            cursor: pointer;
            font-weight: bold;
          }

          .print {
            background: #1769e0;
            color: white;
          }

          .close {
            background: #eee;
          }

          @media print {

            body {
              padding: 0;
            }

            .buttons {
              display: none;
            }

          }

        </style>

      </head>

      <body>

        <div class="buttons">

          <button
            class="print"
            onclick="window.print()"
          >
            🖨️ Imprimir / Salvar PDF
          </button>

          <button
            class="close"
            onclick="window.close()"
          >
            Fechar
          </button>

        </div>

        <div class="invoice">

          <div class="top">

            <div>

              <h1>
                Adel's Mundo Cell
              </h1>

              <div class="store">
                Venda de aparelhos e acessórios
              </div>

            </div>

            <div class="invoice-number">

              <div>
                FATURA
              </div>

              <strong>
                #${numeroFatura}
              </strong>

              <div>
                ${dataVendaTexto}
              </div>

            </div>

          </div>

          <div class="customer">

            <div>
              <strong>Cliente:</strong>
              ${
                venda.cliente ||
                "Não informado"
              }
            </div>

            <div>
              <strong>Pagamento:</strong>
              ${
                venda.formaPagamento ||
                "Não informado"
              }
            </div>

            <div>
              <strong>Estado:</strong>
              ${
                venda.estadoFatura ||
                "Não informado"
              }
            </div>

            ${
              venda.taxa != null
                ? `
                  <div>
                    <strong>Taxa:</strong>
                    ${venda.taxa}
                  </div>
                `
                : ""
            }

          </div>

          <table>

            <thead>

              <tr>

                <th>
                  Produto / IMEI
                </th>

                <th style="text-align:center">
                  Qtd.
                </th>

                <th style="text-align:right">
                  Preço
                </th>

                <th style="text-align:right">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>
              ${produtosHtml}
            </tbody>

          </table>

          <div class="total">

            <div class="total-row">

              <span>
                Subtotal
              </span>

              <span>
                ${dinheiro(
                  totalVenda
                )}
              </span>

            </div>

            <div class="total-row grand-total">

              <span>
                Total
              </span>

              <span>
                ${dinheiro(
                  totalVenda
                )}
              </span>

            </div>

          </div>

          <div class="footer">

            Obrigado pela preferência!

            <br>

            Adel's Mundo Cell

          </div>

        </div>

      </body>

      </html>
    `;

    const janela =
      window.open(
        "",
        "_blank",
        "width=900,height=800"
      );

    if (!janela) {
      setErro(
        "O navegador bloqueou a abertura da fatura. Permita pop-ups para este site."
      );

      return;
    }

    janela.document.open();

    janela.document.write(
      html
    );

    janela.document.close();
  }

  // =====================================================
  // WHATSAPP
  // =====================================================

  async function enviarWhatsApp(venda: Venda) {
    const itensVenda = Array.isArray(venda.itens) ? venda.itens : [];
    const numeroFatura = String(venda.id).padStart(6, "0");
    const dataVendaTexto = formatarData(venda.dataVenda || venda.createdAt || venda.data);
    const totalBruto = totalDaVenda(venda);
    const desconto = Number(venda.descontoVenda ?? (venda as any).desconto ?? 0) || 0;
    const totalFinal = Math.max(0, totalBruto - desconto);

    const canvas = document.createElement("canvas");
    const width = 1000;
    const padding = 64;
    const lineHeight = 38;
    const itemLines: string[] = [];
    itensVenda.forEach((item: any, index: number) => {
      const quantidade = Number(item.quantidade) || 0;
      const valor = Number(item.valorUnitario ?? item.preco ?? item.valor ?? 0) || 0;
      const subtotal = typeof item.total === "number" ? item.total : quantidade * valor;
      itemLines.push(`${index + 1}. ${nomeProdutoDoItem(item)}  |  Qtde: ${quantidade}`);
      itemLines.push(`   IMEI: ${imeisDoItem(item) || "—"}`);
      const detalhes = detalhesAparelhosDoItem(item);
      if (detalhes) itemLines.push(`   ${detalhes}`);
      itemLines.push(`   Unitário: ${dinheiro(valor)}  |  Subtotal: ${dinheiro(subtotal)}`);
      itemLines.push("");
    });
    const lines = [
      "ADEL'S MUNDO CELL",
      `FATURA #${numeroFatura}`,
      `Cliente: ${venda.cliente || "Não informado"}`,
      `Data: ${dataVendaTexto}`,
      "",
      "PRODUTOS",
      ...itemLines,
      "────────────────────────────────────────",
      `Total: ${dinheiro(totalBruto)}`,
      `Desconto: ${dinheiro(desconto)}`,
      `VALOR FINAL: ${dinheiro(totalFinal)}`,
      `Pagamento: ${venda.formaPagamento || "Não informado"}`,
      `Estado: ${venda.estadoFatura || "Não informado"}`,
      "",
      "Obrigado pela preferência!",
    ];
    canvas.width = width;
    canvas.height = padding * 2 + lines.length * lineHeight + 50;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setErro("Não foi possível gerar a imagem da fatura neste navegador.");
      return;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111827";
    ctx.textBaseline = "top";
    lines.forEach((line, i) => {
      if (i === 0) {
        ctx.font = "bold 34px Arial";
        ctx.fillStyle = "#0f172a";
      } else if (i === 1) {
        ctx.font = "bold 27px Arial";
        ctx.fillStyle = "#2563eb";
      } else if (line === "PRODUTOS") {
        ctx.font = "bold 23px Arial";
        ctx.fillStyle = "#111827";
      } else if (line.startsWith("VALOR FINAL:")) {
        ctx.font = "bold 25px Arial";
        ctx.fillStyle = "#15803d";
      } else {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#374151";
      }
      ctx.fillText(line, padding, padding + i * lineHeight, width - padding * 2);
    });

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setErro("Não foi possível criar a imagem da fatura.");
      return;
    }
    const file = new File([blob], `Fatura-${numeroFatura}.png`, { type: "image/png" });
    try {
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `Fatura #${numeroFatura}` });
        return;
      }
    } catch (error: any) {
      if (error?.name === "AbortError") return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Fatura-${numeroFatura}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    window.open("https://wa.me/", "_blank");
    window.alert("A imagem da fatura foi baixada. No WhatsApp, anexe a imagem baixada para enviar como foto.");
  }

  // =====================================================
  // AGRUPAR VENDAS POR DIA
  // =====================================================

  const vendasPorDia =
    vendas.reduce(
      (
        grupos: Record<
          string,
          Venda[]
        >,
        venda
      ) => {
        const chave =
          chaveDataVenda(
            venda
          );

        if (
          !grupos[chave]
        ) {
          grupos[chave] =
            [];
        }

        grupos[chave].push(
          venda
        );

        return grupos;
      },
      {}
    );

  const diasOrdenados =
    Object.keys(
      vendasPorDia
    ).sort((a, b) =>
      b.localeCompare(a)
    );

  // =====================================================
  // ABRIR / FECHAR DIA
  // =====================================================

  function alternarDia(dia: string) {
    setDiasAbertos((atual) => ({
      ...atual,
      [dia]: !atual[dia],
    }));
  }

  function alternarVenda(vendaId: number) {
    setVendasAbertas((atual) => ({
      ...atual,
      [vendaId]: !atual[vendaId],
    }));
  }

  // =====================================================
  // TOTAL DO DIA
  // =====================================================

  function totalDoDia(
    vendasDoDia: Venda[]
  ) {
    return vendasDoDia.reduce(
      (total, venda) =>
        total +
        totalDaVenda(
          venda
        ),
      0
    );
  }
// =====================================================
  // TELA
  // =====================================================

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1550,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >

      {/* ================================================= */}
      {/* CABEÇALHO */}
      {/* ================================================= */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          marginBottom: 24,
          gap: 20,
          flexWrap:
            "wrap",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: 32,
              margin: 0,
            }}
          >
            Vendas
          </h1>

          <p
            style={{
              color: "#555",
            }}
          >
            Adel&apos;s Mundo Cell
          </p>

        </div>

        {/* TAXA */}

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius: 10,
            padding: 14,
            minWidth: 180,
          }}
        >

          <input
            value={taxa}
            onChange={(e) =>
              setTaxa(
                e.target.value
              )
            }
            placeholder="Ex: 5,45"
            style={{
              width: "100%",
              padding: 10,
              boxSizing:
                "border-box",
            }}
          />

          <small>
            Taxa temporária
          </small>

        </div>

      </div>

      {/* ================================================= */}
      {/* NOVA VENDA */}
      {/* ================================================= */}

      <section
        style={{
          border: "1px solid #e1e5ec",
          borderRadius: 16,
          padding: 22,
          background: "#fff",
          boxShadow: "0 8px 28px rgba(15, 23, 42, .04)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(280px, .8fr)", gap: 22, alignItems: "start" }}>
          <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap: 15,
            flexWrap:
              "wrap",
          }}
        >

          <h2
            style={{
              fontSize: 18,
            }}
          >
            Nova venda
          </h2>

          <strong>
            Total:{" "}
            {dinheiro(total)}
          </strong>

        </div>

        {/* Dados principais da venda, no layout de referência */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginBottom: 16 }}>
          <label style={{ display: "grid", gap: 7, fontWeight: 500 }}>
            Responsável
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 8 }}>
              <input
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="Digite o nome do responsável"
                style={{ ...inputStyle, marginTop: 0 }}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setResponsavel("")}
                title="Apagar nome do responsável"
                aria-label="Apagar nome do responsável"
                style={{ ...blueButton, padding: "0 14px", background: "#fff", color: "#b91c1c", border: "1px solid #d1d5db" }}
              >
                ×
              </button>
            </div>
          </label>
          <label style={{ display: "grid", gap: 7, fontWeight: 500 }}>
            Garantia
            <select value={garantia} onChange={(e) => setGarantia(e.target.value)} style={inputStyle}>
              <option>Sem garantia</option>
              <option>1 mês</option>
              <option>3 meses</option>
              <option>6 meses</option>
              <option>1 ano</option>
              <option>Garantia do fabricante</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 500, marginBottom: 7 }}>Cliente</label>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12 }}>
            <input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nome do cliente" style={{ ...inputStyle, marginTop: 0 }} />
            <button type="button" onClick={() => { const abrir = !mostrarListaClientes; setMostrarListaClientes(abrir); if (abrir) carregarClientes(); }} style={{ ...blueButton, background: "#fff", color: "#1f2937", border: "1px solid #d1d5db" }}>♟ Selecionar Cliente</button>
          </div>
          {mostrarListaClientes && (
            <div style={{ marginTop: 10, padding: 12, border: "1px solid #d1d5db", borderRadius: 10, background: "#f8fafc" }}>
              <label style={{ display: "grid", gap: 6, fontWeight: 500 }}>
                {carregandoClientes ? "Carregando clientes..." : `Clientes cadastrados (${clientesCadastrados.length})`}
                <select value={clientesCadastrados.some((c) => c.nome === cliente) ? cliente : ""} onChange={(e) => { if (e.target.value) setCliente(e.target.value); }} style={inputStyle}>
                  <option value="">Selecione um cliente...</option>
                  {clientesCadastrados.map((c, i) => <option key={String(c.id ?? `${c.nome}-${i}`)} value={c.nome}>{c.nome}{c.telefone ? ` — ${c.telefone}` : ""}</option>)}
                </select>
              </label>
              {!carregandoClientes && clientesCadastrados.length === 0 && <small style={{ display: "block", marginTop: 6, color: "#92400e" }}>Não foi possível encontrar clientes cadastrados pela rota /api/clientes. Você ainda pode digitar o nome acima.</small>}
              <button type="button" onClick={() => setMostrarListaClientes(false)} style={{ ...blueButton, marginTop: 10, background: "#e5e7eb", color: "#111827" }}>Fechar lista</button>
            </div>
          )}
        </div>
        <label style={{ display: "grid", gap: 7, fontWeight: 500, marginBottom: 18 }}>
          Observações
          <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Observações sobre esta venda" rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 84 }} />
        </label>

        {/* ================================================= */}
        {/* BUSCA DE PRODUTO E ITENS DA VENDA */}
        <div style={{ marginTop: 18, position: "relative" }}>
          <label style={{ display: "grid", gap: 7, fontWeight: 500 }}>
            Buscar produto por nome ou código
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 0 }}>
              <input
                value={buscaProdutoTabela}
                onChange={(e) => setBuscaProdutoTabela(e.target.value)}
                placeholder="Clique ou digite para buscar um produto"
                autoComplete="off"
                style={{ ...inputStyle, marginTop: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <button type="button" onClick={() => { if (!buscaProdutoTabela.trim()) setErro("Digite o nome do produto para buscar."); }} style={{ ...blueButton, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, display: "flex", alignItems: "center", gap: 8 }}>⌕ Buscar</button>
            </div>
          </label>
          <small style={{ display: "block", marginTop: 7, color: "#475569" }}>Atalhos: F4 busca produto | F6 resumo da venda</small>
          {buscaProdutoTabela.trim() && (
            <div style={{ position: "absolute", zIndex: 30, left: 0, right: 0, top: "100%", background: "#fff", border: "1px solid #d8d8d8", borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,.12)", maxHeight: 260, overflowY: "auto" }}>
              {produtos.filter((p) => p.quantidade > 0 && p.nome.toLowerCase().includes(buscaProdutoTabela.trim().toLowerCase())).slice(0, 20).map((p) => (
                <button key={p.id} type="button" onClick={() => selecionarProdutoTabela(p)} style={{ display: "block", width: "100%", textAlign: "left", border: 0, borderBottom: "1px solid #eee", background: "white", padding: "12px 14px", cursor: "pointer" }}>
                  <strong>{p.nome}</strong><span style={{ color: "#666", marginLeft: 12, fontSize: 12 }}>Estoque: {p.quantidade}</span>
                </button>
              ))}
              {!produtos.some((p) => p.quantidade > 0 && p.nome.toLowerCase().includes(buscaProdutoTabela.trim().toLowerCase())) && <div style={{ padding: 12, color: "#777" }}>Nenhum produto encontrado.</div>}
            </div>
          )}
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={{ display: "grid", gap: 7, fontWeight: 600 }}>
            Pesquisar IMEI
            <input
              ref={(element) => { imeiInputRefs.current[imeiInputAtivo] = element; }}
              onFocus={() => setImeiInputAtivo(Math.max(0, imeiInputAtivo))}
              value={imeiBusca}
              onChange={(e) => setImeiBusca(e.target.value.replace(/\s/g, ""))}
              onKeyDown={onImeiKeyDown}
              placeholder="Digite ou faça Scan do IMEI"
              inputMode="numeric"
              autoComplete="off"
              style={inputStyle}
            />
          </label>
          {imeiBusca && (
            <div style={{ marginTop: 8, border: "1px solid #b9d8ff", borderRadius: 8, padding: 12 }}>
              {resultadosBusca.length > 0 ? resultadosBusca.map((a) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: 8, borderBottom: "1px solid #eee" }}>
                  <div style={{ minWidth: 0, display: "grid", gap: 4 }}>
                    <strong>{a.produto?.nome || produtos.find((p) => p.id === a.produtoId)?.nome || "Produto"}</strong>
                    <span style={{ fontSize: 12, color: "#475569" }}>IMEI: {a.imei}</span>
                    <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>
                      {detalhesAparelho(a) || "Cor/GB não cadastrados para este aparelho"}
                    </span>
                  </div>
                  <button type="button" onClick={() => adicionarImeiEncontrado(undefined, a)} style={smallBlueButton}>Adicionar</button>
                </div>
              )) : <span style={{ color: "#b42318" }}>IMEI não encontrado ou já vendido.</span>}
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* ERRO */}
        {/* ================================================= */}

        {erro && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background:
                "#fff1f0",
              color:
                "#b42318",
              borderRadius: 8,
            }}
          >
            {erro}
          </div>
        )}

        {/* ================================================= */}
        {/* SUCESSO */}
        {/* ================================================= */}

        {mensagem && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background:
                "#eefaf1",
              color:
                "#16823b",
              borderRadius: 8,
            }}
          >
            {mensagem}
          </div>
        )}

          </div>

          <aside style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, background: "#fafafa", position: "sticky", top: 18 }}>
            <h3 style={{ margin: "0 0 18px", fontSize: 18 }}>Pagamentos</h3>
            <div style={{ display: "grid", gap: 0 }}>
              <div style={summaryRowStyle}><span>Total</span><strong>{dinheiro(total)}</strong></div>
              <div style={summaryRowStyle}><span>Descontos</span><span style={{ display: "flex", alignItems: "center", gap: 8 }}><strong>{dinheiro(totalDescontos)}</strong><button type="button" onClick={() => setEditarDesconto((v) => !v)} aria-label="Editar desconto" title="Editar desconto" style={{ border: 0, background: "transparent", color: "#1684ef", cursor: "pointer", fontSize: 19 }}>✎</button></span></div>
              {editarDesconto && <div style={{ padding: "8px 0 12px" }}><label style={{ display: "grid", gap: 6, fontSize: 13 }}>Desconto na venda inteira (R$)<input autoFocus type="number" min="0" step="0.01" value={descontoVenda} onChange={(e) => setDescontoVenda(e.target.value)} placeholder="0,00" style={inputStyle} /></label><button type="button" onClick={() => setEditarDesconto(false)} style={{ ...smallBlueButton, marginTop: 8 }}>Concluir</button></div>}
              <div style={summaryRowStyle}><span>Valor frete</span><span style={{ display: "flex", alignItems: "center", gap: 8 }}><strong>{dinheiro(Number(String(frete || 0).replace(",", ".")) || 0)}</strong><button type="button" onClick={() => setEditarFrete((v) => !v)} title="Editar frete" style={{ border: 0, background: "transparent", color: "#1684ef", cursor: "pointer", fontSize: 19 }}>✎</button></span></div>
              {editarFrete && <div style={{ padding: "8px 0 12px" }}><label style={{ display: "grid", gap: 6, fontSize: 13 }}>Valor do frete (R$)<input autoFocus type="number" min="0" step="0.01" value={frete} onChange={(e) => setFrete(e.target.value)} placeholder="0,00" style={inputStyle} /></label><button type="button" onClick={() => setEditarFrete(false)} style={{ ...smallBlueButton, marginTop: 8 }}>Concluir</button></div>}
              <div style={summaryRowStyle}><span>Valor final</span><strong>{dinheiro(totalLiquido + (Number(String(frete || 0).replace(",", ".")) || 0))}</strong></div>
              <div style={summaryRowStyle}><span>Pagamentos</span><strong>{dinheiro(totalPagamentos)}</strong></div>
              <div style={{ ...summaryRowStyle, borderBottom: 0, paddingTop: 16, fontSize: 16 }}><span>Total em aberto</span><strong style={{ color: saldoPendente > 0 ? "#b45309" : "#15803d" }}>{dinheiro(saldoPendente)}</strong></div>
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              <button type="button" onClick={() => setTelaPagamento(true)} style={{ ...blueButton, padding: "13px 14px", fontSize: 14 }}>＄ Informar pagamento</button>
              <button type="button" onClick={() => setTelaPagamento(true)} style={{ ...blueButton, padding: "13px 14px", fontSize: 14, background: "#24965b" }}>✓ Finalizar venda</button>
              {editandoVendaId && <button type="button" onClick={cancelarEdicaoVenda} style={{ ...blueButton, background: "#b91c1c", marginTop: 8 }}>Cancelar edição</button>}
            </div>
          </aside>
        </div>

        {/* TABELA DA VENDA: largura total, abaixo dos dois painéis */}
        <div style={{ marginTop: 22, overflowX: "auto", border: "1px solid #e1e5ec", borderRadius: 12, background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead><tr>
              <th style={{ ...th, textAlign: "center", padding: 15 }}>Qtde</th><th style={{ ...th, padding: 15 }}>Nome</th><th style={{ ...th, padding: 15 }}>Código</th><th style={{ ...th, padding: 15 }}>Preço Unitário (por aparelho)</th><th style={{ ...th, padding: 15 }}>Valor Total</th><th style={{ ...th, padding: 15 }}>Ações</th>
            </tr></thead>
            <tbody>
              {itens.map((item, index) => {
                if (item.produtoId === "") return null;
                const produto = produtos.find((p) => p.id === item.produtoId);
                const subtotal = (Number(item.quantidade) || 0) * (Number(String(item.valorUnitario || 0).replace(",", ".")) || 0);
                const aparelhosDaLinha = item.imeis.map((imei) => dadosAparelhoPorImei(imei)).filter(Boolean) as Aparelho[];
                const detalhes = [...new Set(aparelhosDaLinha.map((a) => detalhesAparelho(a)).filter(Boolean))].join(" • ");
                return <tr key={`${item.produtoId}-${index}`} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ ...td, textAlign: "center", padding: 16 }}>
                    <strong>{item.quantidade}x</strong>
                  </td>
                  <td style={{ ...td, padding: 16, minWidth: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 42, height: 48, flex: "0 0 42px", borderRadius: 7, background: "linear-gradient(145deg,#e5e7eb,#f8fafc)", border: "1px solid #d1d5db", display: "grid", placeItems: "center", fontSize: 25 }}>📱</div>
                      <div style={{ minWidth: 0 }}>
                        <strong>{produto?.nome || "Produto"}{detalhes ? ` - ${detalhes}` : ""}</strong>
                        <div style={{ fontSize: 12, color: "#64748b", marginTop: 5 }}>Aparelho individual</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...td, padding: 16, minWidth: 180 }}>
                    {item.imeis.length ? item.imeis.map((imei) => (
                      <div key={imei} style={{ padding: "4px 0", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap", fontSize: 13 }}>
                        <span>IMEI&gt;{imei}</span>
                        <button type="button" onClick={() => removerImei(index, imei)} title="Remover IMEI" style={{ border: 0, background: "transparent", color: "#b42318", cursor: "pointer", fontSize: 16, marginLeft: 5 }}>×</button>
                      </div>
                    )) : <span style={{ color: "#777" }}>IMEI pendente</span>}
                  </td>
                  <td style={{ ...td, padding: 16, whiteSpace: "nowrap" }}>
                    {precoEditandoIndex === index ? <input autoFocus value={item.valorUnitario} onChange={(e) => atualizarItem(index, { valorUnitario: e.target.value })} placeholder="R$ 0,00" inputMode="decimal" style={{ ...inputStyle, width: 130, padding: 8, marginTop: 0 }} /> : <strong>{dinheiro(Number(String(item.valorUnitario || 0).replace(",", ".")) || 0)}</strong>}
                  </td>
                  <td style={{ ...td, padding: 16, whiteSpace: "nowrap" }}><strong>{dinheiro(subtotal)}</strong></td>
                  <td style={{ ...td, padding: 16, whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button type="button" onClick={() => setPrecoEditandoIndex(precoEditandoIndex === index ? null : index)} title={precoEditandoIndex === index ? "Concluir edição" : "Editar preço"} style={{ width: 40, height: 40, border: 0, borderRadius: 999, background: "#1684ef", color: "white", fontSize: 18, fontWeight: 700, cursor: "pointer" }}>{precoEditandoIndex === index ? "✓" : "✎"}</button>
                      <button type="button" onClick={() => setItens((atuais) => atuais.filter((_, i) => i !== index))} title="Excluir item" style={{ width: 40, height: 40, border: 0, borderRadius: 999, background: "#111827", color: "white", fontSize: 17, cursor: "pointer" }}>▣</button>
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => setMenuItemAberto(menuItemAberto === index ? null : index)} title="Mais opções" style={{ border: 0, background: "transparent", color: "#111827", fontSize: 22, cursor: "pointer", padding: "4px 2px" }}>⋮</button>
                        {menuItemAberto === index && <div style={{ position: "absolute", right: 0, top: "100%", zIndex: 20, minWidth: 145, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.12)", padding: 5 }}><button type="button" onClick={() => { setPrecoEditandoIndex(index); setMenuItemAberto(null); }} style={{ display: "block", width: "100%", textAlign: "left", padding: 9, border: 0, background: "white", cursor: "pointer" }}>Editar preço</button><button type="button" onClick={() => { setItens((atuais) => atuais.filter((_, i) => i !== index)); setMenuItemAberto(null); }} style={{ display: "block", width: "100%", textAlign: "left", padding: 9, border: 0, background: "white", color: "#b91c1c", cursor: "pointer" }}>Excluir item</button></div>}
                      </div>
                    </div>
                  </td>
                </tr>;
              })}
              {!itens.some((item) => item.produtoId !== "") && <tr><td style={td} colSpan={6}><span style={{ color: "#777" }}>Nenhum produto adicionado ainda.</span></td></tr>}
              <tr style={{ background: "#eef0f4", fontWeight: 700 }}><td style={{ ...td, padding: 16 }} colSpan={4} align="right">Total</td><td style={{ ...td, padding: 16, whiteSpace: "nowrap" }}>{dinheiro(total)}</td><td style={td}></td></tr>
            </tbody>
          </table>
        </div>

      </section>

      {telaPagamento && (
        <div role="dialog" aria-modal="true" aria-label="Informar pagamento" style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,.55)", display: "grid", placeItems: "center", padding: 18 }}>
          <div style={{ width: "min(760px, 100%)", maxHeight: "90vh", overflowY: "auto", background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 }}><h2 style={{ margin: 0 }}>Informar pagamento</h2><button type="button" onClick={() => setTelaPagamento(false)} style={{ border: 0, background: "transparent", fontSize: 26, cursor: "pointer" }} aria-label="Fechar">×</button></div>
            <div style={{ display: "grid", gap: 0, marginBottom: 18 }}>
              <div style={summaryRowStyle}><span>Total</span><strong>{dinheiro(total)}</strong></div>
              <div style={summaryRowStyle}><span>Descontos</span><strong>{dinheiro(totalDescontos)}</strong></div>
              <div style={summaryRowStyle}><span>Valor final</span><strong>{dinheiro(totalLiquido)}</strong></div>
              <div style={summaryRowStyle}><span>Pagamentos</span><strong>{dinheiro(totalPagamentos)}</strong></div>
              <div style={{ ...summaryRowStyle, borderBottom: 0 }}><span>Total em aberto</span><strong>{dinheiro(saldoPendente)}</strong></div>
            </div>
            {pagamentos.map((pagamento, index) => (
              <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, alignItems: "end", padding: 12, background: "#f8f8f8", borderRadius: 8, marginBottom: 10 }}>
                <label style={{ display: "grid", gap: 6 }}>Forma de pagamento<select value={pagamento.forma} onChange={(e) => atualizarPagamento(index, "forma", e.target.value)} style={inputStyle}><option>Dinheiro</option><option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option><option>Transferência</option><option>Outro</option></select></label>
                <label style={{ display: "grid", gap: 6 }}>Valor pago (R$)<input type="number" min="0" step="0.01" value={pagamento.valor} onChange={(e) => atualizarPagamento(index, "valor", e.target.value)} placeholder="0,00" style={inputStyle} /></label>
                <label style={{ display: "grid", gap: 6 }}>Observação (opcional)<input value={pagamento.observacao} onChange={(e) => atualizarPagamento(index, "observacao", e.target.value)} placeholder="Ex.: 2x no cartão" style={inputStyle} /></label>
                {pagamentos.length > 1 && <button type="button" onClick={() => removerPagamento(index)} style={{ padding: 10, borderRadius: 8, border: "1px solid #d33", color: "#b00", background: "white", cursor: "pointer" }}>Remover</button>}
              </div>
            ))}
            <button type="button" onClick={adicionarPagamento} style={{ padding: 10, borderRadius: 8, border: "1px solid #888", background: "white", cursor: "pointer", marginBottom: 20 }}>+ Adicionar outra forma de pagamento</button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}><button type="button" onClick={() => setTelaPagamento(false)} style={{ ...blueButton, background: "#64748b" }}>← Voltar</button>{editandoVendaId && <button type="button" onClick={cancelarEdicaoVenda} style={{ ...blueButton, background: "#b91c1c" }}>Cancelar edição</button>}<div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 13, color: "#555" }}>Estado: <strong>{totalPagamentos <= 0 ? "Não pago" : totalPagamentos + 0.005 >= totalLiquido ? "Pago" : "Parcial"}</strong></span><button type="button" onClick={registrarVenda} disabled={salvando} style={{ ...blueButton, background: "#15803d", opacity: salvando ? .6 : 1 }}>{salvando ? "Salvando..." : editandoVendaId ? "Salvar alterações" : "Finalizar venda"}</button></div></div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* HISTÓRICO POR DIA */}
      {/* ================================================= */}

      <section
        style={{
          marginTop: 30,
          border:
            "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 20,
          background:
            "#fff",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap: 15,
            flexWrap:
              "wrap",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: 22,
              }}
            >
              📅 Vendas por dia
            </h2>

            <p
              style={{
                margin:
                  "6px 0 0",
                color:
                  "#666",
              }}
            >
              As vendas aparecem agrupadas pela data real da venda.
            </p>

          </div>



        </div>

        {carregandoVendas ? (

          <p
            style={{
              marginTop: 20,
              color:
                "#666",
            }}
          >
            Carregando vendas...
          </p>

        ) : vendas.length ===
          0 ? (

          <div
            style={{
              marginTop: 20,
              padding: 20,
              border:
                "1px dashed #ccc",
              borderRadius: 10,
              color:
                "#777",
              textAlign:
                "center",
            }}
          >
            Nenhuma venda registrada ainda.
          </div>

        ) : (

          <div
            style={{
              marginTop: 20,
              display:
                "flex",
              flexDirection:
                "column",
              gap: 25,
            }}
          >

            {diasOrdenados.map(
              (dia) => {

                const vendasDoDia =
                  vendasPorDia[
                    dia
                  ];

                const totalDia =
                  totalDoDia(
                    vendasDoDia
                  );

                const quantidadeAparelhosDia =
                  vendasDoDia.reduce(
                    (soma, venda) =>
                      soma +
                      (Array.isArray(venda.itens)
                        ? venda.itens.reduce(
                            (totalItens: number, item: any) =>
                              totalItens + (Number(item?.quantidade) || 0),
                            0
                          )
                        : 0),
                    0
                  );

                const diaAberto =
                  !!diasAbertos[dia];

                // =====================================
                // MODELOS DO DIA
                // =====================================

                const modelosDoDia: Record<
                  string,
                  {
                    nome: string;
                    quantidade: number;
                    total: number;
                    imeis: string[];
                  }
                > = {};

                vendasDoDia.forEach(
                  (
                    venda
                  ) => {

                    const itensVenda =
                      Array.isArray(
                        venda.itens
                      )
                        ? venda.itens
                        : [];

                    itensVenda.forEach(
                      (
                        item: any
                      ) => {

                        const nome =
                          nomeProdutoDoItem(
                            item
                          );

                        const quantidade =
                          Number(
                            item.quantidade
                          ) || 0;

                        const subtotal =
                          typeof item.total ===
                          "number"
                            ? item.total
                            : quantidade *
                              (
                                Number(
                                  item.valorUnitario ??
                                    item.preco ??
                                    item.valor ??
                                    0
                                ) || 0
                              );

                        if (
                          !modelosDoDia[
                            nome
                          ]
                        ) {

                          modelosDoDia[
                            nome
                          ] = {
                            nome,
                            quantidade:
                              0,
                            total:
                              0,
                            imeis:
                              [],
                          };

                        }

                        modelosDoDia[
                          nome
                        ].quantidade +=
                          quantidade;

                        modelosDoDia[
                          nome
                        ].total +=
                          subtotal;

                        if (
                          Array.isArray(
                            item.aparelhos
                          )
                        ) {

                          item.aparelhos.forEach(
                            (
                              aparelho: any
                            ) => {

                              if (
                                aparelho?.imei
                              ) {

                                modelosDoDia[
                                  nome
                                ].imeis.push(
                                  aparelho.imei
                                );

                              }

                            }
                          );

                        }

                      }
                    );

                  }
                );

                return (
                  <div
                    key={
                      dia
                    }
                    style={{
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        14,
                      overflow:
                        "hidden",
                    }}
                  >

                    {/* CABEÇALHO DO DIA — FECHADO POR PADRÃO */}

                    <button
                      type="button"
                      onClick={() =>
                        alternarDia(dia)
                      }
                      aria-expanded={diaAberto}
                      style={{
                        width: "100%",
                        border: 0,
                        borderBottom: diaAberto
                          ? "1px solid #ddd"
                          : "0",
                        background: "#f5f7fa",
                        padding: 18,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 15,
                        flexWrap: "wrap",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >

                      <div>

                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          📅 {formatarDataGrupo(dia)}
                        </div>

                        <div
                          style={{
                            marginTop: 6,
                            color: "#666",
                            fontSize: 14,
                          }}
                        >
                          {vendasDoDia.length} venda{
                            vendasDoDia.length !== 1
                              ? "s"
                              : ""
                          }
                        </div>

                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 18,
                          marginLeft: "auto",
                        }}
                      >

                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#16823b",
                          }}
                        >
                          {dinheiro(totalDia)}
                        </div>

                        <span
                          style={{
                            fontSize: 24,
                            color: "#555",
                            lineHeight: 1,
                            transform: diaAberto
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.15s ease",
                          }}
                        >
                          ▼
                        </span>

                      </div>

                    </button>

                    {diaAberto && (
                      <div
                        style={{
                          padding: 14,
                          background: "#fff",
                        }}
                      >

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          }}
                        >

                          {vendasDoDia.map((venda) => {
                            const vendaAberta =
                              !!vendasAbertas[venda.id];

                            const itensVenda =
                              Array.isArray(venda.itens)
                                ? venda.itens
                                : [];

                            return (
                              <div
                                key={venda.id}
                                style={{
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 12,
                                  overflow: "hidden",
                                  background: "#fff",
                                }}
                              >

                                {/* RESUMO DA VENDA — CLIENTE + VALOR */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    alternarVenda(venda.id)
                                  }
                                  aria-expanded={vendaAberta}
                                  style={{
                                    width: "100%",
                                    border: 0,
                                    background: "#f8fafc",
                                    padding: "15px 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    cursor: "pointer",
                                    textAlign: "left",
                                  }}
                                >

                                  <div
                                    style={{
                                      minWidth: 0,
                                      flex: 1,
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "#111827",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      👤 {venda.cliente || "Cliente não informado"}
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 12,
                                      flexShrink: 0,
                                    }}
                                  >
                                    <strong
                                      style={{
                                        color: "#16823b",
                                        fontSize: 17,
                                      }}
                                    >
                                      {dinheiro(
                                        totalDaVenda(venda)
                                      )}
                                    </strong>

                                    <span
                                      style={{
                                        fontSize: 20,
                                        color: "#555",
                                        lineHeight: 1,
                                        transform: vendaAberta
                                          ? "rotate(180deg)"
                                          : "rotate(0deg)",
                                        transition:
                                          "transform 0.15s ease",
                                      }}
                                    >
                                      ▼
                                    </span>
                                  </div>

                                </button>

                                {/* DETALHES DA VENDA */}
                                {vendaAberta && (
                                  <div
                                    style={{
                                      padding: 16,
                                      borderTop:
                                        "1px solid #e5e7eb",
                                    }}
                                  >

                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                          "repeat(auto-fit, minmax(180px, 1fr))",
                                        gap: 10,
                                        marginBottom: 16,
                                      }}
                                    >

                                      <div
                                        style={{
                                          padding: 12,
                                          borderRadius: 10,
                                          background: "#f5f7fa",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#666",
                                            fontSize: 13,
                                          }}
                                        >
                                          Fatura
                                        </div>
                                        <strong>
                                          #
                                          {String(
                                            venda.id
                                          ).padStart(
                                            6,
                                            "0"
                                          )}
                                        </strong>
                                      </div>

                                      <div
                                        style={{
                                          padding: 12,
                                          borderRadius: 10,
                                          background: "#f5f7fa",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#666",
                                            fontSize: 13,
                                          }}
                                        >
                                          Pagamento
                                        </div>
                                        <strong>
                                          {venda.formaPagamento || "-"}
                                        </strong>
                                        {Array.isArray(venda.pagamentos) && venda.pagamentos.length > 0 && (
                                          <div style={{ marginTop: 8, fontSize: 13, display: "grid", gap: 4 }}>
                                            {venda.pagamentos.map((p, i) => (
                                              <div key={p.id ?? i}>
                                                {p.forma || "Pagamento"}: R$ {Number(p.valor || 0).toFixed(2).replace(".", ",")}
                                                {Number(p.desconto || 0) > 0 ? ` (desconto R$ ${Number(p.desconto).toFixed(2).replace(".", ",")})` : ""}
                                              </div>
                                            ))}
                                            <strong>Final: R$ {Number(venda.valorFinal ?? totalDaVenda(venda)).toFixed(2).replace(".", ",")}</strong>
                                            <span>Pago: R$ {Number(venda.totalPago || 0).toFixed(2).replace(".", ",")} · Em aberto: R$ {Number(venda.saldo || 0).toFixed(2).replace(".", ",")}</span>
                                          </div>
                                        )}
                                      </div>

                                      <div
                                        style={{
                                          padding: 12,
                                          borderRadius: 10,
                                          background: "#f5f7fa",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#666",
                                            fontSize: 13,
                                          }}
                                        >
                                          Estado da fatura
                                        </div>
                                        <strong>
                                          {venda.estadoFatura ||
                                            "-"}
                                        </strong>
                                      </div>

                                      <div
                                        style={{
                                          padding: 12,
                                          borderRadius: 10,
                                          background: "#eefaf1",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#666",
                                            fontSize: 13,
                                          }}
                                        >
                                          Total
                                        </div>
                                        <strong
                                          style={{
                                            color: "#16823b",
                                            fontSize: 18,
                                          }}
                                        >
                                          {dinheiro(
                                            totalDaVenda(
                                              venda
                                            )
                                          )}
                                        </strong>
                                      </div>

                                    </div>

                                    <h3
                                      style={{
                                        margin: "0 0 12px",
                                        fontSize: 17,
                                      }}
                                    >
                                      📱 Produtos da venda
                                    </h3>

                                    <div
                                      style={{
                                        overflowX: "auto",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 10,
                                        background: "#fff",
                                      }}
                                    >
                                      <table
                                        style={{
                                          width: "100%",
                                          borderCollapse: "collapse",
                                          minWidth: 760,
                                        }}
                                      >
                                        <thead>
                                          <tr>
                                            <th style={th}>Qtde</th>
                                            <th style={th}>Nome</th>
                                            <th style={th}>Código / IMEI</th>
                                            <th style={th}>Preço Unitário</th>
                                            <th style={th}>Valor Total</th>
                                            <th style={th}>Ações</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {itensVenda.length === 0 ? (
                                            <tr>
                                              <td style={td} colSpan={6}>
                                                <span style={{ color: "#777" }}>
                                                  Nenhum produto encontrado.
                                                </span>
                                              </td>
                                            </tr>
                                          ) : (
                                            itensVenda.flatMap((item: any, index: number) => {
                                              const aparelhos = Array.isArray(item.aparelhos)
                                                ? item.aparelhos
                                                : [];
                                              const quantidade = Math.max(
                                                1,
                                                Number(item.quantidade) || aparelhos.length || 1
                                              );
                                              const precoUnitario = Number(
                                                item.valorUnitario ?? item.preco ?? item.valor ?? 0
                                              ) || 0;
                                              const nome = nomeProdutoDoItem(item);
                                              const aparelhosComLinha = aparelhos.length
                                                ? aparelhos
                                                : [null];

                                              return aparelhosComLinha.map((aparelho: any, aparelhoIndex: number) => {
                                                const imei = String(aparelho?.imei || "");
                                                const nomeComDetalhes = [
                                                  nome,
                                                  aparelho?.cor,
                                                  aparelho?.memoria,
                                                ]
                                                  .filter((valor) => Boolean(String(valor || "").trim()))
                                                  .join(" - ");
                                                const quantidadeLinha = aparelhos.length > 0 ? 1 : quantidade;
                                                const totalLinha = precoUnitario * quantidadeLinha;
                                                const chave = `${venda.id}-${index}-${aparelho?.id ?? aparelhoIndex}`;

                                                return (
                                                  <tr key={chave}>
                                                    <td style={td}>{quantidadeLinha}x</td>
                                                    <td style={td}>
                                                      <strong>{nomeComDetalhes || nome || "Produto"}</strong>
                                                    </td>
                                                    <td style={{ ...td, wordBreak: "break-all" }}>
                                                      {imei || "—"}
                                                    </td>
                                                    <td style={td}>{dinheiro(precoUnitario)}</td>
                                                    <td style={td}>
                                                      <strong>{dinheiro(totalLinha)}</strong>
                                                    </td>
                                                    <td style={td}>
                                                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                        <button
                                                          type="button"
                                                          title="Editar venda"
                                                          aria-label="Editar venda"
                                                          onClick={() => iniciarEdicaoVenda(venda)}
                                                          style={{
                                                            width: 34,
                                                            height: 34,
                                                            border: 0,
                                                            borderRadius: "50%",
                                                            background: "#1685f8",
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            fontSize: 16,
                                                            fontWeight: 700,
                                                          }}
                                                        >
                                                          ✎
                                                        </button>
                                                        <button
                                                          type="button"
                                                          title={aparelho?.id ? "Devolver aparelho ao estoque" : "Excluir venda inteira"}
                                                          aria-label={aparelho?.id ? "Devolver aparelho ao estoque" : "Excluir venda inteira"}
                                                          onClick={() => {
                                                            if (aparelho?.id && imei) {
                                                              void devolverAparelho(venda.id, Number(aparelho.id), imei);
                                                            } else {
                                                              void excluirVenda(venda.id);
                                                            }
                                                          }}
                                                          style={{
                                                            width: 34,
                                                            height: 34,
                                                            border: 0,
                                                            borderRadius: "50%",
                                                            background: "#202124",
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            fontSize: 15,
                                                          }}
                                                        >
                                                          ▣
                                                        </button>
                                                        <button
                                                          type="button"
                                                          title="Mais ações da venda"
                                                          aria-label="Mais ações da venda"
                                                          onClick={() => abrirFatura(venda)}
                                                          style={{
                                                            border: 0,
                                                            background: "transparent",
                                                            color: "#111827",
                                                            cursor: "pointer",
                                                            fontSize: 22,
                                                            lineHeight: 1,
                                                            padding: "0 3px",
                                                          }}
                                                        >
                                                          ⋮
                                                        </button>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                );
                                              });
                                            })
                                          )}
                                          <tr style={{ background: "#f3f4f6", fontWeight: 700 }}>
                                            <td style={td} colSpan={4} align="right">Total</td>
                                            <td style={td}>{dinheiro(totalDaVenda(venda))}</td>
                                            <td style={td}></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* AÇÕES DA VENDA */}
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: 8,
                                        flexWrap: "wrap",
                                        marginTop: 18,
                                      }}
                                    >

                                      <button
                                        type="button"
                                        onClick={() =>
                                          abrirFatura(
                                            venda
                                          )
                                        }
                                        style={
                                          invoiceButton
                                        }
                                      >
                                        🧾 Fatura
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => iniciarEdicaoVenda(venda)}
                                        style={{ ...invoiceButton, background: "#475569" }}
                                      >
                                        ✏️ Editar venda
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          enviarWhatsApp(
                                            venda
                                          )
                                        }
                                        style={
                                          whatsappButton
                                        }
                                      >
                                        📲 WhatsApp
                                      </button>

                                      {itensVenda.some(
                                        (item: any) =>
                                          Array.isArray(
                                            item.aparelhos
                                          ) &&
                                          item.aparelhos.some(
                                            (a: any) =>
                                              a?.vendido ===
                                              true
                                          )
                                      ) && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const aparelhosVendidos =
                                              itensVenda.flatMap(
                                                (
                                                  item: any
                                                ) =>
                                                  Array.isArray(
                                                    item.aparelhos
                                                  )
                                                    ? item.aparelhos
                                                        .filter(
                                                          (
                                                            a: any
                                                          ) =>
                                                            a?.vendido ===
                                                            true
                                                        )
                                                        .map(
                                                          (
                                                            a: any
                                                          ) => ({
                                                            ...a,
                                                            modelo:
                                                              nomeProdutoDoItem(
                                                                item
                                                              ),
                                                          })
                                                        )
                                                    : []
                                              );

                                            const lista =
                                              aparelhosVendidos
                                                .map(
                                                  (
                                                    a: any,
                                                    i: number
                                                  ) =>
                                                    `${i + 1}. ${a.modelo} — IMEI ${a.imei}`
                                                )
                                                .join(
                                                  "\n"
                                                );

                                            const escolha =
                                              window.prompt(
                                                `Qual aparelho deseja devolver?\n\n${lista}\n\nDigite o número do aparelho:`
                                              );

                                            if (
                                              escolha ===
                                              null
                                            )
                                              return;

                                            const indice =
                                              Number(
                                                escolha
                                              ) - 1;

                                            if (
                                              !Number.isInteger(
                                                indice
                                              ) ||
                                              indice <
                                                0 ||
                                              indice >=
                                                aparelhosVendidos.length
                                            ) {
                                              alert(
                                                "Número inválido."
                                              );
                                              return;
                                            }

                                            const aparelho =
                                              aparelhosVendidos[
                                                indice
                                              ];

                                            devolverAparelho(
                                              venda.id,
                                              aparelho.id,
                                              aparelho.imei
                                            );
                                          }}
                                          disabled={
                                            devolvendoAparelhoId !==
                                            null
                                          }
                                          style={
                                            returnButton
                                          }
                                        >
                                          {devolvendoAparelhoId !==
                                          null
                                            ? "Devolvendo..."
                                            : "↩️ Devolver aparelho"}
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          excluirVenda(
                                            venda.id
                                          )
                                        }
                                        disabled={
                                          excluindoVendaId ===
                                          venda.id
                                        }
                                        style={
                                          deleteButton
                                        }
                                      >
                                        {excluindoVendaId ===
                                        venda.id
                                          ? "Excluindo..."
                                          : "Excluir venda"}
                                      </button>

                                    </div>

                                  </div>
                                )}

                              </div>
                            );
                          })}

                        </div>

                      </div>
                    )}

                    {diaAberto && (
                      <div
                        style={{
                          padding: 18,
                          borderTop: "1px solid #ddd",
                          background: "#fafafa",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >

                        <div
                          style={{
                            fontSize: 18,
                          }}
                        >

                          <span
                            style={{
                              color: "#555",
                              marginRight: 10,
                            }}
                          >
                            Total do dia:
                          </span>

                          <strong
                            style={{
                              color: "#16823b",
                              fontSize: 22,
                            }}
                          >
                            {dinheiro(totalDia)}
                          </strong>

                        </div>

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>
        )}

      </section>

    </main>
  );
}

/* ================================================= */
/* ESTILOS */
/* ================================================= */

const summaryRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "13px 0",
  borderBottom: "1px solid #e5e7eb",
  color: "#374151",
};

const inputStyle: React.CSSProperties =
  {
    display: "block",

    width: "100%",

    boxSizing:
      "border-box",

    marginTop: 6,

    padding:
      "11px 12px",

    border: "1px solid #d1d5db",

    borderRadius: 8,

    background: "#fff",

    fontSize: 14,
  };

const blueButton: React.CSSProperties =
  {
    border: 0,

    borderRadius: 8,

    padding:
      "10px 14px",

    background:
      "#1769e0",

    color: "#fff",

    fontWeight: 700,

    cursor: "pointer",

    whiteSpace:
      "nowrap",
  };

const smallBlueButton: React.CSSProperties =
  {
    ...blueButton,

    padding:
      "7px 11px",

    fontSize: 13,
  };

const blackButton: React.CSSProperties =
  {
    border: 0,

    borderRadius: 8,

    padding:
      "10px 16px",

    background:
      "#202124",

    color: "#fff",

    fontWeight: 700,

    cursor: "pointer",
  };

const invoiceButton: React.CSSProperties =
  {
    border: 0,

    borderRadius: 8,

    padding:
      "8px 12px",

    background:
      "#1769e0",

    color: "#fff",

    fontWeight: 700,

    cursor: "pointer",

    whiteSpace:
      "nowrap",
  };

const whatsappButton: React.CSSProperties =
  {
    border: 0,

    borderRadius: 8,

    padding:
      "8px 12px",

    background:
      "#16823b",

    color: "#fff",

    fontWeight: 700,

    cursor: "pointer",

    whiteSpace:
      "nowrap",
  };

const deleteButton: React.CSSProperties =
  {
    border: 0,

    borderRadius: 8,

    padding:
      "8px 12px",

    background:
      "#c62828",

    color: "#fff",

    fontWeight: 700,

    cursor: "pointer",

    whiteSpace:
      "nowrap",
  };

const returnButton: React.CSSProperties =
  {
    border: 0,
    borderRadius: 8,
    padding: "8px 12px",
    background: "#f59e0b",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

const th: React.CSSProperties =
  {
    textAlign: "left",

    padding: 9,

    borderBottom:
      "1px solid #ddd",

    fontSize: 13,

    background: "#f1f3f7",
    color: "#1f2937",
  };

const td: React.CSSProperties =
  {
    padding: 9,

    borderBottom:
      "1px solid #eee",

    fontSize: 13,
  };