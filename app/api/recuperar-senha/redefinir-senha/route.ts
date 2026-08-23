import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const codigo = String(body.codigo ?? "").trim();

    const novaSenha = String(body.novaSenha ?? "");

    if (!email || !codigo || !novaSenha) {
      return NextResponse.json(
        { error: "Informe o e-mail, o código e a nova senha." },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(codigo)) {
      return NextResponse.json(
        { error: "O código deve ter 6 números." },
        { status: 400 }
      );
    }

    if (novaSenha.length < 6) {
      return NextResponse.json(
        { error: "A nova senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    if (!usuario.resetCode || !usuario.resetCodeExpiresAt) {
      return NextResponse.json(
        { error: "Nenhum código de recuperação foi solicitado." },
        { status: 400 }
      );
    }

    if (usuario.resetCode !== codigo) {
      return NextResponse.json(
        { error: "Código de recuperação inválido." },
        { status: 400 }
      );
    }

    if (new Date() > usuario.resetCodeExpiresAt) {
      return NextResponse.json(
        {
          error:
            "O código de recuperação expirou. Solicite um novo código.",
        },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        senha: senhaHash,
        resetCode: null,
        resetCodeExpiresAt: null,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Senha alterada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);

    return NextResponse.json(
      { error: "Erro interno ao redefinir a senha." },
      { status: 500 }
    );
  }
}