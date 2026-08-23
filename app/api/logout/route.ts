import { NextResponse } from "next/server";
import { encerrarSessao } from "@/lib/auth";

export async function POST() {
  try {
    await encerrarSessao();

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Erro ao sair:", error);

    return NextResponse.json(
      {
        error: "Erro ao encerrar sessão.",
      },
      { status: 500 }
    );
  }
}