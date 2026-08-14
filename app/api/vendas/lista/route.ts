import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        produto: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(vendas);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Erro ao buscar vendas" },
      { status: 500 }
    );
  }
}