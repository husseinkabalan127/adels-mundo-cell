"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [vendas, setVendas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    try {
      const [produtosRes, vendasRes] = await Promise.all([
        fetch("/api/produtos"),
        fetch("/api/vendas"),
      ]);

      const produtosData = await produtosRes.json();
      const vendasData = await vendasRes.json();

      setProdutos(produtosData);
      setVendas(vendasData);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const totalVendas = vendas.reduce(
    (total, venda) =>
      total + Number(venda.valorVenda || 0),
    0
  );

  const lucroTotal = vendas.reduce(
    (total, venda) =>
      total + Number(venda.lucro || 0),
    0
  );

  const aparelhosVendidos = vendas.reduce(
    (total, venda) =>
      total + Number(venda.quantidade || 0),
    0
  );

  const aparelhosEstoque = produtos.reduce(
    (total, produto) =>
      total + Number(produto.quantidade || 0),
    0
  );

  const valorEstoque = produtos.reduce(
    (total, produto) =>
      total +
      Number(produto.precoVenda || 0) *
        Number(produto.quantidade || 0),
    0
  );

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <p>Carregando dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-3xl font-bold">
            📊 Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Adel's Mundo Cell
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total vendas */}
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              💰 Total de vendas
            </p>

            <p className="text-3xl font-bold mt-3">
              R$ {totalVendas.toFixed(2)}
            </p>

          </div>

          {/* Lucro */}
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              📈 Lucro total
            </p>

            <p className="text-3xl font-bold text-green-600 mt-3">
              R$ {lucroTotal.toFixed(2)}
            </p>

          </div>

          {/* Vendidos */}
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              📱 Aparelhos vendidos
            </p>

            <p className="text-3xl font-bold mt-3">
              {aparelhosVendidos}
            </p>

          </div>

          {/* Estoque */}
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">
              📦 Aparelhos em estoque
            </p>

            <p className="text-3xl font-bold mt-3">
              {aparelhosEstoque}
            </p>

          </div>

        </div>

        {/* Valor do estoque */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

          <p className="text-gray-500">
            💵 Valor do estoque pelo preço de venda
          </p>

          <p className="text-4xl font-bold mt-3">
            R$ {valorEstoque.toFixed(2)}
          </p>

        </div>

        {/* Resumo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            📋 Resumo da loja
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>
                Quantidade de produtos cadastrados
              </span>

              <strong>
                {produtos.length}
              </strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>
                Quantidade de vendas
              </span>

              <strong>
                {vendas.length}
              </strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>
                Aparelhos vendidos
              </span>

              <strong>
                {aparelhosVendidos}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>
                Aparelhos disponíveis
              </span>

              <strong>
                {aparelhosEstoque}
              </strong>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}