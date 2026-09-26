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

type PagamentoForm = { forma: string; valor: string; desconto: string; observacao: string };

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

  const [formaPagamento, setFormaPagamento] =
    useState("Não informado");

  const [descontoVenda, setDescontoVenda] = useState("");
  const [pagamentos, setPagamentos] = useState<PagamentoForm[]>([
    { forma: "Dinheiro", valor: "", desconto: "", observacao: "" },
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
  // CARREGAR AO ABRIR
  // =====================================================

  useEffect(() => {
    carregarEstoque();
    carregarVendas();
  }, []);

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
    atualizarItem(
      index,
      {
        produtoId: produto.id,
        imeis: [],
        quantidade: 1,
      }
    );

    // O modelo foi escolhido: limpar a busca para fechar a lista de sugestões.
    setBuscaModelo((atual) => ({
      ...atual,
      [index]: "",
    }));
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
    itemIndexPreferido?: number
  ) {
    setErro("");
    setMensagem("");

    const imei =
      imeiBusca.trim();

    if (!imei) {
      setErro(
        "Digite o IMEI para buscar."
      );

      return;
    }

    if (!aparelhoEncontrado) {
      setErro(
        "IMEI não encontrado ou já vendido."
      );

      return;
    }

    // Primeiro tentamos usar o Produto onde o usuário
    // está digitando/scaneando o IMEI.
    let index =
      typeof itemIndexPreferido === "number"
        ? itemIndexPreferido
        : imeiInputAtivo;

    const itemPreferido =
      itens[index];

    // Se o campo ativo já tem um modelo diferente,
    // procuramos o item do mesmo modelo do IMEI.
    if (
      !itemPreferido ||
      (
        itemPreferido.produtoId !== "" &&
        itemPreferido.produtoId !==
          aparelhoEncontrado.produtoId
      )
    ) {
      index =
        itens.findIndex(
          (item) =>
            item.produtoId ===
            aparelhoEncontrado.produtoId
        );
    }

    // Se ainda não encontrou, usa o primeiro item vazio.
    if (index === -1) {
      index =
        itens.findIndex(
          (item) =>
            item.produtoId === ""
        );
    }

    // Se não existe nenhum item disponível,
    // cria um novo Produto no final.
    if (index === -1) {
      const novoIndex =
        itens.length;

      setItens((atual) => [
        ...atual,

        {
          produtoId:
            aparelhoEncontrado.produtoId,

          quantidade: 1,

          valorUnitario: "",

          imeis: [
            aparelhoEncontrado.imei,
          ],
        },
      ]);

      setImeiInputAtivo(novoIndex);
      setImeiBusca("");

      // Espera o novo Produto aparecer na tela
      // antes de colocar o foco nele.
      setTimeout(() => {
        const input =
          imeiInputRefs.current[novoIndex];

        input?.focus({
          preventScroll: true,
        });
      }, 100);

      return;
    }

    adicionarImeiAoItem(
      index,
      aparelhoEncontrado.imei
    );

    if (
      itens[index]
        .produtoId === ""
    ) {
      atualizarItem(
        index,
        {
          produtoId:
            aparelhoEncontrado.produtoId,
        }
      );
    }

    setImeiInputAtivo(index);
    setImeiBusca("");

    // Mantém o foco exatamente no Produto
    // onde o IMEI foi escaneado.
    focarCampoImei(index);
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
    setPagamentos((atuais) => [...atuais, { forma: "Pix", valor: "", desconto: "", observacao: "" }]);
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
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
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
              estadoFatura,
              descontoVenda: Number(String(descontoVenda || 0).replace(",", ".")) || 0,
              pagamentos: pagamentos.filter((p) => p.valor !== "" || p.desconto !== "").map((p) => ({
                ...p,
                valor: Number(String(p.valor || 0).replace(",", ".")) || 0,
                desconto: Number(String(p.desconto || 0).replace(",", ".")) || 0,
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
          "Venda registrada com sucesso!"
      );

      setCliente("");

      setTaxa("");

      setFormaPagamento("Não informado");
      setDescontoVenda("");
      setPagamentos([{ forma: "Dinheiro", valor: "", desconto: "", observacao: "" }]);

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

  function enviarWhatsApp(
    venda: Venda
  ) {
    const itensVenda =
      Array.isArray(
        venda.itens
      )
        ? venda.itens
        : [];

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

    let texto =
      `*Adel's Mundo Cell*\n` +
      `🧾 *Fatura #${numeroFatura}*\n\n`;

    texto +=
      `👤 Cliente: ${
        venda.cliente ||
        "Não informado"
      }\n`;

    texto +=
      `📅 Data: ${dataVendaTexto}\n`;

    texto +=
      `💳 Pagamento: ${
        venda.formaPagamento ||
        "Não informado"
      }\n`;

    texto +=
      `📄 Estado: ${
        venda.estadoFatura ||
        "Não informado"
      }\n\n`;

    texto +=
      `*Produtos:*\n`;

    itensVenda.forEach(
      (
        item: any,
        index: number
      ) => {
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

        texto +=
          `\n${index + 1}. *${nome}*\n`;

        texto +=
          `Quantidade: ${quantidade}\n`;

        texto +=
          `Preço: ${dinheiro(valor)}\n`;

        texto +=
          `IMEI: ${imeis}\n`;

        texto +=
          `Subtotal: ${dinheiro(subtotal)}\n`;
      }
    );

    texto +=
      `\n💰 *TOTAL: ${dinheiro(
        totalDaVenda(venda)
      )}*\n\n`;

    texto +=
      `Obrigado pela preferência! 🙏\n`;

    texto +=
      `*Adel's Mundo Cell*`;

    const url =
      `https://wa.me/?text=${encodeURIComponent(
        texto
      )}`;

    window.open(
      url,
      "_blank"
    );
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
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily:
          "Arial, sans-serif",
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
          border:
            "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 20,
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

        {/* ================================================= */}
        {/* DATA + CLIENTE + PAGAMENTO + ESTADO */}
        {/* ================================================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: 14,
          }}
        >

          {/* DATA */}

          <label>

            Data da venda

            <input
              type="date"
              value={
                dataVenda
              }
              onChange={(e) =>
                setDataVenda(
                  e.target.value
                )
              }
              style={
                inputStyle
              }
            />

            <small
              style={{
                color: "#666",
                display:
                  "block",
                marginTop: 5,
              }}
            >
              Você pode colocar uma data anterior.
            </small>

          </label>

          {/* CLIENTE */}

          <label>

            Cliente (opcional)

            <input
              value={cliente}
              onChange={(e) =>
                setCliente(
                  e.target.value
                )
              }
              placeholder="Nome do cliente"
              style={
                inputStyle
              }
            />

          </label>

          {/* PAGAMENTOS MÚLTIPLOS E DESCONTOS */}
          <div style={{ gridColumn: "1 / -1", border: "1px solid #ddd", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
            <h3 style={{ margin: 0 }}>Pagamentos da venda</h3>
            <label style={{ display: "grid", gap: 6 }}>
              Desconto na venda inteira (R$)
              <input type="number" min="0" step="0.01" value={descontoVenda} onChange={(e) => setDescontoVenda(e.target.value)} placeholder="0,00" style={inputStyle} />
            </label>
            {pagamentos.map((pagamento, index) => (
              <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, alignItems: "end", padding: 12, background: "#f8f8f8", borderRadius: 8 }}>
                <label style={{ display: "grid", gap: 6 }}>Forma de pagamento
                  <select value={pagamento.forma} onChange={(e) => atualizarPagamento(index, "forma", e.target.value)} style={inputStyle}>
                    <option>Dinheiro</option><option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option><option>Transferência</option><option>Outro</option>
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6 }}>Valor pago (R$)
                  <input type="number" min="0" step="0.01" value={pagamento.valor} onChange={(e) => atualizarPagamento(index, "valor", e.target.value)} placeholder="0,00" style={inputStyle} />
                </label>
                <label style={{ display: "grid", gap: 6 }}>Desconto nesta parcela (R$)
                  <input type="number" min="0" step="0.01" value={pagamento.desconto} onChange={(e) => atualizarPagamento(index, "desconto", e.target.value)} placeholder="0,00" style={inputStyle} />
                </label>
                <label style={{ display: "grid", gap: 6 }}>Observação (opcional)
                  <input value={pagamento.observacao} onChange={(e) => atualizarPagamento(index, "observacao", e.target.value)} placeholder="Ex.: 2x no cartão" style={inputStyle} />
                </label>
                {pagamentos.length > 1 && <button type="button" onClick={() => removerPagamento(index)} style={{ padding: 10, borderRadius: 8, border: "1px solid #d33", color: "#b00", background: "white", cursor: "pointer" }}>Remover</button>}
              </div>
            ))}
            <button type="button" onClick={adicionarPagamento} style={{ padding: 10, borderRadius: 8, border: "1px solid #888", background: "white", cursor: "pointer" }}>+ Adicionar outra forma de pagamento</button>
          </div>

          {/* ESTADO */}

          <label>

            Estado da fatura

            <select
              value={
                estadoFatura
              }
              onChange={(e) =>
                setEstadoFatura(
                  e.target.value
                )
              }
              style={
                inputStyle
              }
            >

              <option>
                Não informado
              </option>

              <option>
                Pago
              </option>

              <option>
                Pendente
              </option>

            </select>

          </label>

        </div>

        {/* ================================================= */}
        {/* PRODUTOS */}
        {/* ================================================= */}

        {itens.map(
          (
            item,
            index
          ) => {

            const produto =
              produtos.find(
                (p) =>
                  p.id ===
                  item.produtoId
              );

            const disponiveis =
              (
                produto?.aparelhos ||
                []
              ).filter(
                (a) =>
                  !a.vendido
              );

            return (
              <div
                key={index}
                style={{
                  marginTop: 22,
                  borderTop:
                    "1px solid #eee",
                  paddingTop: 18,
                }}
              >

                <h3
                  style={{
                    fontSize: 16,
                  }}
                >
                  Produto{" "}
                  {index + 1}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "2fr .8fr 1fr 1fr",
                    gap: 14,
                  }}
                >

                  {/* MODELO */}

                  <label style={{ position: "relative" }}>

                    Modelo

                    <input
                      value={
                        buscaModelo[index] ||
                        (item.produtoId
                          ? produtos.find(
                              (p) =>
                                p.id === item.produtoId
                            )?.nome || ""
                          : "")
                      }
                      onChange={(e) => {
                        const valor = e.target.value;

                        setBuscaModelo((atual) => ({
                          ...atual,
                          [index]: valor,
                        }));

                        if (item.produtoId) {
                          atualizarItem(index, {
                            produtoId: "",
                            imeis: [],
                            quantidade: 1,
                          });
                        }
                      }}
                      placeholder="Digite o modelo..."
                      autoComplete="off"
                      style={inputStyle}
                    />

                    {buscaModelo[index] && (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: 50,
                          left: 0,
                          right: 0,
                          top: "100%",
                          marginTop: 4,
                          background: "#fff",
                          border: "1px solid #d8d8d8",
                          borderRadius: 8,
                          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                          maxHeight: 260,
                          overflowY: "auto",
                        }}
                      >
                        {resultadosModelo(index).length > 0 ? (
                          resultadosModelo(index).map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                selecionarModelo(index, p)
                              }
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                border: 0,
                                borderBottom: "1px solid #eee",
                                background: "#fff",
                                padding: "11px 12px",
                                cursor: "pointer",
                              }}
                            >
                              <strong>{p.nome}</strong>
                              <div
                                style={{
                                  marginTop: 3,
                                  color: "#666",
                                  fontSize: 12,
                                }}
                              >
                                Estoque: {p.quantidade}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div
                            style={{
                              padding: 12,
                              color: "#777",
                            }}
                          >
                            Nenhum modelo encontrado.
                          </div>
                        )}
                      </div>
                    )}

                  </label>

                  {/* QUANTIDADE */}

                  <label>

                    Quantidade

                    <input
                      type="number"
                      min={1}
                      max={
                        disponiveis.length ||
                        1
                      }
                      value={
                        item.quantidade
                      }
                      onChange={(
                        e
                      ) =>
                        atualizarItem(
                          index,
                          {
                            quantidade:
                              Number(
                                e
                                  .target
                                  .value
                              ) || 1,
                          }
                        )
                      }
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  {/* PREÇO */}

                  <label>

                    Preço por aparelho

                    <input
                      value={
                        item.valorUnitario
                      }
                      onChange={(
                        e
                      ) =>
                        atualizarItem(
                          index,
                          {
                            valorUnitario:
                              e
                                .target
                                .value,
                          }
                        )
                      }
                      placeholder="R$ 0,00"
                      inputMode="decimal"
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  {/* TOTAL */}

                  <div>

                    <span>
                      Total
                    </span>

                    <div
                      style={{
                        ...inputStyle,
                        background:
                          "#eef1f4",
                        fontWeight: 700,
                      }}
                    >
                      {dinheiro(
                        (Number(
                          item.quantidade
                        ) || 0) *
                          (Number(
                            String(
                              item.valorUnitario
                            ).replace(
                              ",",
                              "."
                            )
                          ) || 0)
                      )}
                    </div>

                  </div>

                </div>

                {/* ================================================= */}
                {/* IMEI */}
                {/* ================================================= */}

                <div
                  style={{
                    marginTop: 14,
                  }}
                >

                  <label>

                    <b>
                      Pesquisar IMEI
                    </b>

                    <input
                      ref={(element) => {
                        imeiInputRefs.current[index] =
                          element;
                      }}
                      onFocus={() =>
                        setImeiInputAtivo(index)
                      }
                      value={
                        imeiBusca
                      }
                      onChange={(
                        e
                      ) =>
                        setImeiBusca(
                          e.target.value.replace(
                            /\s/g,
                            ""
                          )
                        )
                      }
                      onKeyDown={
                        onImeiKeyDown
                      }
                      placeholder="Digite ou faça Scan do IMEI"
                      inputMode="numeric"
                      autoComplete="off"
                      style={
                        inputStyle
                      }
                    />

                  </label>

                  {imeiBusca && (
                    <div
                      style={{
                        marginTop: 10,
                        border:
                          "1px solid #b9d8ff",
                        borderRadius: 10,
                        padding: 14,
                      }}
                    >

                      {resultadosBusca.length >
                      0 ? (

                        <div
                          style={{
                            overflowX:
                              "auto",
                          }}
                        >

                          <table
                            style={{
                              width:
                                "100%",
                              borderCollapse:
                                "collapse",
                            }}
                          >

                            <thead>

                              <tr>

                                <th
                                  style={
                                    th
                                  }
                                >
                                  IMEI
                                </th>

                                <th
                                  style={
                                    th
                                  }
                                >
                                  Modelo
                                </th>

                                <th
                                  style={
                                    th
                                  }
                                >
                                  Status
                                </th>

                                <th
                                  style={
                                    th
                                  }
                                >
                                  Ação
                                </th>

                              </tr>

                            </thead>

                            <tbody>

                              {resultadosBusca.map(
                                (
                                  a
                                ) => (
                                  <tr
                                    key={
                                      a.id
                                    }
                                  >

                                    <td
                                      style={
                                        td
                                      }
                                    >
                                      {
                                        a.imei
                                      }
                                    </td>

                                    <td
                                      style={
                                        td
                                      }
                                    >
                                      {
                                        a
                                          .produto
                                          ?.nome
                                      }
                                    </td>

                                    <td
                                      style={
                                        td
                                      }
                                    >

                                      <span
                                        style={{
                                          color:
                                            "#16823b",
                                          fontWeight:
                                            600,
                                        }}
                                      >
                                        Disponível
                                      </span>

                                    </td>

                                    <td
                                      style={
                                        td
                                      }
                                    >

                                      <button
                                        type="button"
                                        onClick={() => {

                                          const idx =
                                            itens.findIndex(
                                              (
                                                x
                                              ) =>
                                                x.produtoId ===
                                                a.produtoId
                                            );

                                          let destino =
                                            idx;

                                          if (
                                            destino < 0
                                          ) {
                                            destino =
                                              itens.findIndex(
                                                (
                                                  x
                                                ) =>
                                                  x.produtoId ===
                                                  ""
                                              );
                                          }

                                          if (
                                            destino >=
                                            0
                                          ) {

                                            if (
                                              itens[destino]
                                                .produtoId ===
                                              ""
                                            ) {
                                              atualizarItem(
                                                destino,
                                                {
                                                  produtoId:
                                                    a.produtoId,

                                                  quantidade: 1,

                                                  imeis: [
                                                    a.imei,
                                                  ],
                                                }
                                              );
                                            } else {
                                              adicionarImeiAoItem(
                                                destino,
                                                a.imei
                                              );
                                            }

                                            setImeiInputAtivo(
                                              destino
                                            );

                                            setImeiBusca(
                                              ""
                                            );

                                            focarCampoImei(
                                              destino
                                            );
                                          }

                                        }}
                                        style={
                                          smallBlueButton
                                        }
                                      >
                                        Adicionar
                                      </button>

                                    </td>

                                  </tr>
                                )
                              )}

                            </tbody>

                          </table>

                        </div>

                      ) : (

                        <div
                          style={{
                            color:
                              "#b42318",
                          }}
                        >
                          IMEI não encontrado
                          ou já vendido.
                        </div>

                      )}

                      <button
                        type="button"
                        onClick={() =>
                          adicionarImeiEncontrado(
                            index
                          )
                        }
                        style={{
                          ...blueButton,
                          marginTop: 10,
                        }}
                      >
                        Buscar / Adicionar
                      </button>

                    </div>
                  )}

                </div>

                {/* ================================================= */}
                {/* IMEIS ADICIONADOS */}
                {/* ================================================= */}

                <div
                  style={{
                    marginTop: 14,
                  }}
                >

                  <strong>
                    IMEIs adicionados (
                    {
                      item.imeis
                        .length
                    }
                    )
                  </strong>

                  {item.imeis
                    .length === 0 ? (

                    <p
                      style={{
                        color:
                          "#777",
                      }}
                    >
                      Nenhum IMEI adicionado ainda.
                    </p>

                  ) : (

                    <div
                      style={{
                        display:
                          "flex",
                        flexWrap:
                          "wrap",
                        gap: 8,
                        marginTop: 8,
                      }}
                    >

                      {item.imeis.map(
                        (
                          imei
                        ) => (

                          <span
                            key={
                              imei
                            }
                            style={{
                              border:
                                "1px solid #ddd",
                              borderRadius:
                                8,
                              padding:
                                "7px 10px",
                            }}
                          >

                            {imei}

                            <button
                              type="button"
                              onClick={() =>
                                removerImei(
                                  index,
                                  imei
                                )
                              }
                              style={{
                                marginLeft: 8,
                                border: 0,
                                background:
                                  "transparent",
                                cursor:
                                  "pointer",
                                color:
                                  "#c62828",
                              }}
                            >
                              ×
                            </button>

                          </span>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>
            );
          }
        )}

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

        {/* ================================================= */}
        {/* BOTÕES */}
        {/* ================================================= */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
            flexWrap:
              "wrap",
          }}
        >

          <button
            type="button"
            onClick={
              adicionarModelo
            }
            style={
              blueButton
            }
          >
            + Adicionar outro modelo
          </button>

          <button
            type="button"
            onClick={
              registrarVenda
            }
            disabled={
              salvando
            }
            style={
              blackButton
            }
          >
            {salvando
              ? "Salvando..."
              : "Registrar venda"}
          </button>

        </div>

      </section>

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
                                        margin:
                                          "0 0 12px",
                                        fontSize: 17,
                                      }}
                                    >
                                      📱 Produtos da venda
                                    </h3>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                      }}
                                    >

                                      {itensVenda.length ===
                                      0 ? (
                                        <p
                                          style={{
                                            color: "#777",
                                            margin: 0,
                                          }}
                                        >
                                          Nenhum produto encontrado.
                                        </p>
                                      ) : (
                                        itensVenda.map(
                                          (
                                            item: any,
                                            index: number
                                          ) => {
                                            const aparelhos =
                                              Array.isArray(
                                                item.aparelhos
                                              )
                                                ? item.aparelhos
                                                : [];

                                            const subtotal =
                                              typeof item.total ===
                                              "number"
                                                ? item.total
                                                : (
                                                    Number(
                                                      item.quantidade
                                                    ) || 0
                                                  ) *
                                                  (
                                                    Number(
                                                      item.valorUnitario ??
                                                        item.preco ??
                                                        item.valor ??
                                                        0
                                                    ) || 0
                                                  );

                                            return (
                                              <div
                                                key={index}
                                                style={{
                                                  border:
                                                    "1px solid #eee",
                                                  borderRadius: 10,
                                                  padding: 14,
                                                  background:
                                                    "#fafafa",
                                                }}
                                              >

                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                    alignItems:
                                                      "flex-start",
                                                    gap: 12,
                                                    flexWrap:
                                                      "wrap",
                                                  }}
                                                >

                                                  <div>
                                                    <strong
                                                      style={{
                                                        fontSize:
                                                          16,
                                                      }}
                                                    >
                                                      📱{" "}
                                                      {nomeProdutoDoItem(
                                                        item
                                                      )}
                                                    </strong>

                                                    <div
                                                      style={{
                                                        marginTop:
                                                          5,
                                                        color:
                                                          "#555",
                                                      }}
                                                    >
                                                      Quantidade:{" "}
                                                      <strong>
                                                        {
                                                          item.quantidade
                                                        }
                                                      </strong>
                                                    </div>

                                                    <div
                                                      style={{
                                                        marginTop:
                                                          4,
                                                        color:
                                                          "#555",
                                                      }}
                                                    >
                                                      Valor unitário:{" "}
                                                      <strong>
                                                        {dinheiro(
                                                          Number(
                                                            item.valorUnitario ??
                                                              item.preco ??
                                                              item.valor ??
                                                              0
                                                          )
                                                        )}
                                                      </strong>
                                                    </div>
                                                  </div>

                                                  <strong
                                                    style={{
                                                      fontSize:
                                                        17,
                                                    }}
                                                  >
                                                    {dinheiro(
                                                      subtotal
                                                    )}
                                                  </strong>

                                                </div>

                                                {aparelhos.length >
                                                  0 && (
                                                  <div
                                                    style={{
                                                      marginTop:
                                                        12,
                                                      paddingTop:
                                                        10,
                                                      borderTop:
                                                        "1px solid #eee",
                                                    }}
                                                  >
                                                    <strong
                                                      style={{
                                                        fontSize:
                                                          13,
                                                      }}
                                                    >
                                                      IMEI:
                                                    </strong>

                                                    <div
                                                      style={{
                                                        marginTop:
                                                          5,
                                                        fontSize:
                                                          13,
                                                        color:
                                                          "#555",
                                                        wordBreak:
                                                          "break-all",
                                                      }}
                                                    >
                                                      {aparelhos
                                                        .map(
                                                          (
                                                            aparelho: any
                                                          ) =>
                                                            aparelho?.imei
                                                        )
                                                        .filter(
                                                          Boolean
                                                        )
                                                        .join(
                                                          ", "
                                                        )}
                                                    </div>
                                                  </div>
                                                )}

                                              </div>
                                            );
                                          }
                                        )
                                      )}

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

const inputStyle: React.CSSProperties =
  {
    display: "block",

    width: "100%",

    boxSizing:
      "border-box",

    marginTop: 6,

    padding:
      "11px 12px",

    border:
      "1px solid #d8d8d8",

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

    background:
      "#f7f7f7",
  };

const td: React.CSSProperties =
  {
    padding: 9,

    borderBottom:
      "1px solid #eee",

    fontSize: 13,
  };