import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("adel_session")?.value;

  const pathname = request.nextUrl.pathname;

  // =====================================================
  // PÁGINAS PÚBLICAS
  // =====================================================

  const paginasPublicas = ["/login"];

  if (paginasPublicas.includes(pathname)) {
    return NextResponse.next();
  }

  // =====================================================
  // SEM LOGIN
  // =====================================================

  if (!session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // =====================================================
  // LER SESSÃO
  // =====================================================

  let usuario: {
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "FUNCIONARIO";
  };

  try {
    usuario = JSON.parse(session);
  } catch {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // =====================================================
  // FUNCIONÁRIO
  // =====================================================

  if (usuario.role === "FUNCIONARIO") {

    // Se funcionário entrar na página inicial,
    // manda direto para Vendas
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL("/vendas", request.url)
      );
    }

    // Páginas proibidas para funcionário
    const paginasBloqueadas = [
      "/dashboard",
      "/contas-a-receber",
      "/relatorio",
      "/configuracoes",
      "/usuarios",
    ];

    const bloqueada = paginasBloqueadas.some(
      (pagina) =>
        pathname === pagina ||
        pathname.startsWith(`${pagina}/`)
    );

    if (bloqueada) {
      return NextResponse.redirect(
        new URL("/vendas", request.url)
      );
    }
  }

  // =====================================================
  // ADMIN
  // =====================================================

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};