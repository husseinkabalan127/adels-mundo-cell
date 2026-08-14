import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adel's Mundo Cell",
  description: "Sistema de gerenciamento da loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-100">

        {/* SIDEBAR */}

        <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r shadow-lg">

          {/* LOGO */}

          <div className="flex h-20 items-center border-b px-5">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900"
            >
              📱 Adel's Mundo Cell
            </Link>
          </div>

          {/* MENU */}

          <nav className="p-4">

            <div className="space-y-2">

              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>📊</span>
                <span>Dashboard</span>
              </Link>

              <Link
                href="/estoque"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>📦</span>
                <span>Estoque</span>
              </Link>

              <Link
                href="/vendas"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>💰</span>
                <span>Vendas</span>
              </Link>

              <Link
                href="/consulta-imei"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>🔍</span>
                <span>Consulta IMEI</span>
              </Link>

              <Link
                href="/assistencias"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>🔧</span>
                <span>Assistência</span>
              </Link>

              <Link
                href="/relatorio"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>📋</span>
                <span>Relatório</span>
              </Link>

              {/* CONFIGURAÇÕES */}

              <Link
                href="/configuracoes"
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>⚙️</span>
                <span>Configurações</span>
              </Link>

            </div>

          </nav>

        </aside>

        {/* CONTEÚDO */}

        <main className="ml-64 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}