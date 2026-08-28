import { NextResponse } from "next/server";
import { obterSessao } from "@/lib/auth";

export async function GET() {
  try {
    const usuario = await obterSessao();

    if (!usuario) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: usuario,
    });
  } catch (error) {
    console.error("Erro /api/auth/me:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar usuário logado",
      },
      { status: 500 }
    );
  }
}