import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { criarSessao } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const senha = String(body.senha ?? "");

    if (!email || !senha) {
      return NextResponse.json(
        {
          error: "Informe o e-mail e a senha.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "E-mail ou senha incorretos.",
        },
        { status: 401 }
      );
    }

    if (!user.ativo) {
      return NextResponse.json(
        {
          error: "Usuário desativado.",
        },
        { status: 403 }
      );
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      user.senha
    );

    if (!senhaCorreta) {
      return NextResponse.json(
        {
          error: "E-mail ou senha incorretos.",
        },
        { status: 401 }
      );
    }

    await criarSessao({
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao fazer login.",
      },
      { status: 500 }
    );
  }
}