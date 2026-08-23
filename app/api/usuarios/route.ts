import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { exigirAdmin } from "@/lib/auth";

// ===============================
// GET - LISTAR USUÁRIOS
// ===============================
export async function GET() {
  try {
    const totalUsuarios = await prisma.usuario.count();

    if (totalUsuarios > 0) {
      try {
        await exigirAdmin();
      } catch {
        return NextResponse.json(
          { error: "Não autorizado." },
          { status: 401 }
        );
      }
    }

    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    if (
      error instanceof Error &&
      error.message === "Não autorizado."
    ) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "Acesso permitido somente ao administrador."
    ) {
      return NextResponse.json(
        {
          error:
            "Acesso permitido somente ao administrador.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao buscar usuários." },
      { status: 500 }
    );
  }
}

// ===============================
// POST - CRIAR USUÁRIO
// ===============================
export async function POST(req: Request) {
  try {
    const totalUsuarios = await prisma.usuario.count();

    if (totalUsuarios > 0) {
      try {
        await exigirAdmin();
      } catch {
        return NextResponse.json(
          { error: "Não autorizado." },
          { status: 401 }
        );
      }
    }

    const body = await req.json();

    const nome = String(body.nome ?? "").trim();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const senha = String(body.senha ?? "");

    const role =
      body.role === "ADMIN"
        ? "ADMIN"
        : "FUNCIONARIO";

    if (!nome || !email || !senha) {
      return NextResponse.json(
        {
          error:
            "Informe o nome, e-mail e senha do usuário.",
        },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        {
          error:
            "A senha deve ter pelo menos 6 caracteres.",
        },
        { status: 400 }
      );
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      return NextResponse.json(
        {
          error: "Informe um e-mail válido.",
        },
        { status: 400 }
      );
    }

    const usuarioExistente =
      await prisma.usuario.findUnique({
        where: {
          email,
        },
      });

    if (usuarioExistente) {
      return NextResponse.json(
        {
          error:
            "Já existe um usuário com este e-mail.",
        },
        { status: 409 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        role,
        ativo: true,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        ativo: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Usuário criado com sucesso.",
        usuario,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    if (
      error instanceof Error &&
      error.message === "Não autorizado."
    ) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "Acesso permitido somente ao administrador."
    ) {
      return NextResponse.json(
        {
          error:
            "Acesso permitido somente ao administrador.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno ao criar usuário.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// PATCH - EDITAR USUÁRIO
// ===============================
export async function PATCH(req: Request) {
  try {
    const admin = await exigirAdmin();

    const body = await req.json();

    const id = Number(body.id);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        {
          error: "ID do usuário inválido.",
        },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado.",
        },
        { status: 404 }
      );
    }

    const data: {
      nome?: string;
      email?: string;
      senha?: string;
      role?: "ADMIN" | "FUNCIONARIO";
      ativo?: boolean;
    } = {};

    // NOME
    if (body.nome !== undefined) {
      const nome = String(body.nome).trim();

      if (!nome) {
        return NextResponse.json(
          {
            error: "O nome não pode ficar vazio.",
          },
          { status: 400 }
        );
      }

      data.nome = nome;
    }

    // E-MAIL
    if (body.email !== undefined) {
      const email = String(body.email)
        .trim()
        .toLowerCase();

      if (!email) {
        return NextResponse.json(
          {
            error: "O e-mail não pode ficar vazio.",
          },
          { status: 400 }
        );
      }

      const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!emailValido) {
        return NextResponse.json(
          {
            error: "Informe um e-mail válido.",
          },
          { status: 400 }
        );
      }

      const outroUsuario =
        await prisma.usuario.findFirst({
          where: {
            email,
            NOT: {
              id,
            },
          },
        });

      if (outroUsuario) {
        return NextResponse.json(
          {
            error:
              "Este e-mail já está sendo usado por outro usuário.",
          },
          { status: 409 }
        );
      }

      data.email = email;
    }

    // SENHA
    if (body.senha !== undefined) {
      const senha = String(body.senha);

      if (senha.length < 6) {
        return NextResponse.json(
          {
            error:
              "A senha deve ter pelo menos 6 caracteres.",
          },
          { status: 400 }
        );
      }

      data.senha = await bcrypt.hash(senha, 10);
    }

    // TIPO DE USUÁRIO
    if (body.role !== undefined) {
      if (
        body.role !== "ADMIN" &&
        body.role !== "FUNCIONARIO"
      ) {
        return NextResponse.json(
          {
            error: "Tipo de usuário inválido.",
          },
          { status: 400 }
        );
      }

      // Não deixar o admin tirar o próprio acesso
      if (
        id === admin.id &&
        body.role !== "ADMIN"
      ) {
        return NextResponse.json(
          {
            error:
              "Você não pode remover seu próprio acesso de administrador.",
          },
          { status: 400 }
        );
      }

      data.role = body.role;
    }

    // ATIVO / DESATIVADO
    if (body.ativo !== undefined) {
      const ativo =
        body.ativo === true ||
        body.ativo === "true";

      // Não deixar o admin desativar a própria conta
      if (id === admin.id && !ativo) {
        return NextResponse.json(
          {
            error:
              "Você não pode desativar sua própria conta.",
          },
          { status: 400 }
        );
      }

      data.ativo = ativo;
    }

    const usuarioAtualizado =
      await prisma.usuario.update({
        where: {
          id,
        },
        data,
        select: {
          id: true,
          nome: true,
          email: true,
          role: true,
          ativo: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    return NextResponse.json({
      ok: true,
      message: "Usuário atualizado com sucesso.",
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    console.error(
      "Erro ao atualizar usuário:",
      error
    );

    if (
      error instanceof Error &&
      error.message === "Não autorizado."
    ) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "Acesso permitido somente ao administrador."
    ) {
      return NextResponse.json(
        {
          error:
            "Acesso permitido somente ao administrador.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno ao atualizar usuário.",
      },
      { status: 500 }
    );
  }
}

// ===============================
// DELETE - EXCLUIR USUÁRIO
// ===============================
export async function DELETE(req: Request) {
  try {
    const admin = await exigirAdmin();

    const body = await req.json();

    const id = Number(body.id);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        {
          error: "ID do usuário inválido.",
        },
        { status: 400 }
      );
    }

    // Não deixar excluir a própria conta
    if (id === admin.id) {
      return NextResponse.json(
        {
          error:
            "Você não pode excluir sua própria conta.",
        },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado.",
        },
        { status: 404 }
      );
    }

    await prisma.usuario.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Usuário excluído com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao excluir usuário:",
      error
    );

    if (
      error instanceof Error &&
      error.message === "Não autorizado."
    ) {
      return NextResponse.json(
        { error: "Não autorizado." },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "Acesso permitido somente ao administrador."
    ) {
      return NextResponse.json(
        {
          error:
            "Acesso permitido somente ao administrador.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno ao excluir usuário.",
      },
      { status: 500 }
    );
  }
}