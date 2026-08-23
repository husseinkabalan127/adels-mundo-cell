import { cookies } from "next/headers";

const SESSION_COOKIE = "adel_session";

export type UsuarioSessao = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "FUNCIONARIO";
};

export async function criarSessao(usuario: UsuarioSessao) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, JSON.stringify(usuario), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function obterSessao(): Promise<UsuarioSessao | null> {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(SESSION_COOKIE);

  if (!cookie?.value) {
    return null;
  }

  try {
    const usuario = JSON.parse(cookie.value);

    if (
      !usuario ||
      typeof usuario.id !== "number" ||
      typeof usuario.nome !== "string" ||
      typeof usuario.email !== "string" ||
      (usuario.role !== "ADMIN" &&
        usuario.role !== "FUNCIONARIO")
    ) {
      return null;
    }

    return usuario as UsuarioSessao;
  } catch {
    return null;
  }
}

export async function exigirLogin(): Promise<UsuarioSessao> {
  const usuario = await obterSessao();

  if (!usuario) {
    throw new Error("Não autorizado.");
  }

  return usuario;
}

export async function exigirAdmin(): Promise<UsuarioSessao> {
  const usuario = await obterSessao();

  if (!usuario) {
    throw new Error("Não autorizado.");
  }

  if (usuario.role !== "ADMIN") {
    throw new Error(
      "Acesso permitido somente ao administrador."
    );
  }

  return usuario;
}

export async function encerrarSessao() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}