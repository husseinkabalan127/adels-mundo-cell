"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "FUNCIONARIO";
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  const [saindo, setSaindo] =
    useState(false);

  // =====================================================
  // BUSCAR USUÁRIO LOGADO
  // =====================================================

  useEffect(() => {
    async function carregarUsuario() {
      try {
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
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar usuário:",
          error
        );

        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuario();
  }, []);

  // =====================================================
  // SERVICE WORKER
  // =====================================================

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registrado:",
              registration.scope
            );
          })
          .catch((error) => {
            console.error(
              "Erro ao registrar Service Worker:",
              error
            );
          });
      });
    }
  }, []);

  // =====================================================
  // ADMIN
  // =====================================================

  const isAdmin =
    usuario?.role === "ADMIN";

  // =====================================================
  // SAIR
  // =====================================================

  async function sair() {
    if (saindo) return;

    setSaindo(true);

    try {
      const response = await fetch(
        "/api/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        alert(
          "Não foi possível sair."
        );

        setSaindo(false);
        return;
      }

      setUsuario(null);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Erro ao encerrar sessão:",
        error
      );

      alert(
        "Erro ao encerrar sessão."
      );

      setSaindo(false);
    }
  }

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="manifest"
          href="/manifest.json"
        />

        <meta
          name="theme-color"
          content="#111827"
        />

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="Adel's Cell"
        />
      </head>

      <body className="min-h-full bg-gradient-to-br from-gray-100 via-white to-gray-200">

        {/* =================================================
            SIDEBAR
        ================================================== */}

        <aside className="fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r bg-white shadow-lg">

          {/* =================================================
              LOGO
          ================================================== */}

          <div className="flex h-16 items-center border-b px-4">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900"
            >
              📱 Adel's Mundo Cell
            </Link>
          </div>

          {/* =================================================
              USUÁRIO
          ================================================== */}

          {!carregando && usuario && (
            <div className="border-b px-4 py-2.5">
              <div className="font-semibold text-sm text-gray-800">
                {usuario.nome}
              </div>

              <div className="mt-0.5 text-[11px] text-gray-500">
                {isAdmin
                  ? "👑 Administrador"
                  : "👷 Funcionário"}
              </div>
            </div>
          )}

          {/* =================================================
              MENU
          ================================================== */}

          <nav className="p-3">
            <div className="space-y-1">

              {/* =================================================
                  CALENDÁRIO
              ================================================== */}

              <Link
                href="/calendario"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>📅</span>
                <span>Calendário</span>
              </Link>

              {/* =================================================
                  CLIENTES
              ================================================== */}

              <Link
                href="/clientes"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>👤</span>
                <span>Clientes</span>
              </Link>

              {/* =================================================
                  ASSISTÊNCIA
              ================================================== */}

              <Link
                href="/assistencias"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>🔧</span>
                <span>Assistência</span>
              </Link>

              {/* =================================================
                  VENDAS
              ================================================== */}

              <Link
                href="/vendas"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>💰</span>
                <span>Vendas</span>
              </Link>

              {/* =================================================
                  ESTOQUE
              ================================================== */}

              <Link
                href="/estoque"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>📦</span>
                <span>Estoque</span>
              </Link>

              {/* =================================================
                  CONTAS A RECEBER
              ================================================== */}

              {isAdmin && (
                <Link
                  href="/contas-a-receber"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  <span>💳</span>
                  <span>Contas a Receber</span>
                </Link>
              )}

              {/* =================================================
                  COMPRAS
              ================================================== */}

              <Link
                href="/compras"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>🛒</span>
                <span>Compras</span>
              </Link>

              {/* =================================================
                  CONSULTA IMEI
              ================================================== */}

              <Link
                href="/consulta-imei"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>🔍</span>
                <span>Consulta IMEI</span>
              </Link>

              {/* =================================================
                  RESTANTE - ADMIN
              ================================================== */}

              {isAdmin && (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>📊</span>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/telefones-sem-preco"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>🏷️</span>
                    <span>
                      Telefones sem preço
                    </span>
                  </Link>

                  <Link
                    href="/relatorio"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>📋</span>
                    <span>Relatório</span>
                  </Link>

                  <Link
                    href="/configuracoes"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>⚙️</span>
                    <span>Configurações</span>
                  </Link>

                  <Link
                    href="/usuarios"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>👥</span>
                    <span>Usuários</span>
                  </Link>
                </>
              )}

            </div>
          </nav>

        </aside>

        {/* =================================================
            ÁREA PRINCIPAL
        ================================================== */}

        <div className="ml-64 min-h-screen">

          {/* =================================================
              HEADER
          ================================================== */}

          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-5 shadow-sm">

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Adel's Mundo Cell
              </h1>

              <p className="text-xs text-gray-500">
                Sistema de gerenciamento da loja
              </p>
            </div>

            {/* =================================================
                USUÁRIO / SAIR
            ================================================== */}

            {!carregando && usuario && (
              <div className="flex items-center gap-3">

                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {usuario.nome}
                  </p>

                  <p className="text-[11px] text-gray-500">
                    {isAdmin
                      ? "👑 Administrador"
                      : "👷 Funcionário"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={sair}
                  disabled={saindo}
                  className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saindo
                    ? "Saindo..."
                    : "🚪 Sair"}
                </button>

              </div>
            )}

          </header>

          {/* =================================================
              CONTEÚDO
          ================================================== */}

          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}