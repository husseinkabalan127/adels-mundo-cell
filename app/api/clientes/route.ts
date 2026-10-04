import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);

    return NextResponse.json(
      { error: "Erro ao buscar clientes." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const nome = String(body.nome || "").trim();
    const telefone = String(body.telefone || "").trim();
    const cpfCnpj = String(body.cpfCnpj || "").trim();
    const email = String(body.email || "").trim();
    const observacao = String(body.observacao || "").trim();

    if (!nome) {
      return NextResponse.json(
        { error: "Informe o nome do cliente." },
        { status: 400 }
      );
    }

    if (!cpfCnpj) {
      return NextResponse.json(
        { error: "Informe o CPF ou CNPJ." },
        { status: 400 }
      );
    }

    const existente = await prisma.cliente.findUnique({
      where: {
        cpfCnpj,
      },
    });

    if (existente) {
      return NextResponse.json(
        { error: "Já existe um cliente com este CPF/CNPJ." },
        { status: 409 }
      );
    }

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        telefone: telefone || null,
        cpfCnpj,
        email: email || null,
        observacao: observacao || null,
      },
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);

    return NextResponse.json(
      { error: "Erro ao cadastrar cliente." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const id = Number(body.id);
    const nome = String(body.nome || "").trim();
    const telefone = String(body.telefone || "").trim();
    const cpfCnpj = String(body.cpfCnpj || "").trim();
    const email = String(body.email || "").trim();
    const observacao = String(body.observacao || "").trim();

    if (!id) {
      return NextResponse.json(
        { error: "Cliente inválido." },
        { status: 400 }
      );
    }

    if (!nome || !cpfCnpj) {
      return NextResponse.json(
        { error: "Nome e CPF/CNPJ são obrigatórios." },
        { status: 400 }
      );
    }

    const duplicado = await prisma.cliente.findFirst({
      where: {
        cpfCnpj,
        NOT: {
          id,
        },
      },
    });

    if (duplicado) {
      return NextResponse.json(
        { error: "Este CPF/CNPJ já está cadastrado em outro cliente." },
        { status: 409 }
      );
    }

    const cliente = await prisma.cliente.update({
      where: {
        id,
      },
      data: {
        nome,
        telefone: telefone || null,
        cpfCnpj,
        email: email || null,
        observacao: observacao || null,
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar cliente." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Cliente inválido." },
        { status: 400 }
      );
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        vendas: { select: { id: true } },
        garantias: { select: { id: true } },
        assistencias: { select: { id: true } },
      },
    });

    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado." },
        { status: 404 }
      );
    }

    if (
      cliente.vendas.length > 0 ||
      cliente.garantias.length > 0 ||
      cliente.assistencias.length > 0
    ) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir este cliente porque ele possui registros vinculados.",
        },
        { status: 409 }
      );
    }

    await prisma.cliente.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);

    return NextResponse.json(
      { error: "Erro ao excluir cliente." },
      { status: 500 }
    );
  }
}