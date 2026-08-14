import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type UserRole = "ADMIN" | "FUNCIONARIO";

export type SessionUser = {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
};

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error(
    "AUTH_SECRET não foi configurado no arquivo .env.local"
  );
}

const secretKey = new TextEncoder().encode(secret);

const COOKIE_NAME = "adel_session";

export async function criarSessao(user: SessionUser) {
  const token = await new SignJWT({
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function pegarSessao(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    if (
      typeof payload.id !== "number" ||
      typeof payload.nome !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "ADMIN" &&
        payload.role !== "FUNCIONARIO")
    ) {
      return null;
    }

    return {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function exigirLogin() {
  const user = await pegarSessao();

  if (!user) {
    throw new Error("Não autorizado.");
  }

  return user;
}

export async function exigirAdmin() {
  const user = await exigirLogin();

  if (user.role !== "ADMIN") {
    throw new Error(
      "Acesso permitido somente ao administrador."
    );
  }

  return user;
}

export async function sairDaSessao() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}