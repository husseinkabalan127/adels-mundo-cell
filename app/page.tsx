"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* العنوان */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h1 className="text-4xl font-bold">
            📱 Adel's Mundo Cell
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Sistema de gerenciamento da loja
          </p>
        </div>

        {/* القائمة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Dashboard */}
          <Link href="/dashboard">
            <div className="bg-white rounded-2xl shadow p-8 hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">
              <div className="text-5xl mb-4">📊</div>

              <h2 className="text-2xl font-bold">
                Dashboard
              </h2>

              <p className="text-gray-500 mt-2">
                Veja vendas, estoque e lucro da loja.
              </p>
            </div>
          </Link>

          {/* Estoque */}
          <Link href="/estoque">
            <div className="bg-white rounded-2xl shadow p-8 hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">
              <div className="text-5xl mb-4">📦</div>

              <h2 className="text-2xl font-bold">
                Estoque
              </h2>

              <p className="text-gray-500 mt-2">
                Cadastre aparelhos e controle o estoque.
              </p>
            </div>
          </Link>

          {/* Vendas */}
          <Link href="/vendas">
            <div className="bg-white rounded-2xl shadow p-8 hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">
              <div className="text-5xl mb-4">💰</div>

              <h2 className="text-2xl font-bold">
                Registrar Venda
              </h2>

              <p className="text-gray-500 mt-2">
                Registre uma nova venda e baixe o estoque.
              </p>
            </div>
          </Link>

          {/* Relatório */}
          <Link href="/relatorio">
            <div className="bg-white rounded-2xl shadow p-8 hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">
              <div className="text-5xl mb-4">📋</div>

              <h2 className="text-2xl font-bold">
                Relatório
              </h2>

              <p className="text-gray-500 mt-2">
                Veja o histórico completo das vendas.
              </p>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}