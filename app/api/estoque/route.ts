import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// =====================================================
// GET — جلب المخزون
// =====================================================

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        lotes: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            aparelhos: true,
          },
        },
        aparelhos: true,
      },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("GET /api/estoque:", error);

    return NextResponse.json(
      {
        error: "Erro ao carregar estoque.",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST — إضافة أجهزة للمخزون
// =====================================================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nome = String(body.nome || "").trim();

    const fornecedor = String(
      body.fornecedor || ""
    ).trim();

    const quantidade = Number(
      body.quantidade || 1
    );

    // PREÇO USD OPCIONAL
    const precoCompraUsd =
      body.precoCompraUsd === null ||
      body.precoCompraUsd === undefined ||
      body.precoCompraUsd === ""
        ? null
        : Number(body.precoCompraUsd);

    const imeis = Array.isArray(body.imeis)
      ? body.imeis
          .map((item: unknown) =>
            String(item).trim()
          )
          .filter(Boolean)
      : [];

    if (!nome) {
      return NextResponse.json(
        {
          error:
            "Informe o modelo do aparelho.",
        },
        { status: 400 }
      );
    }

    if (!fornecedor) {
      return NextResponse.json(
        {
          error:
            "Informe de onde veio o aparelho / fornecedor.",
        },
        { status: 400 }
      );
    }

    if (!imeis.length) {
      return NextResponse.json(
        {
          error:
            "Informe pelo menos um IMEI.",
        },
        { status: 400 }
      );
    }

    // PREÇO USD NÃO É OBRIGATÓRIO
    if (
      precoCompraUsd !== null &&
      (!Number.isFinite(precoCompraUsd) ||
        precoCompraUsd < 0)
    ) {
      return NextResponse.json(
        {
          error:
            "Preço de compra USD inválido.",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(quantidade) ||
      quantidade <= 0
    ) {
      return NextResponse.json(
        {
          error: "Quantidade inválida.",
        },
        { status: 400 }
      );
    }

    // =================================================
    // IMEI DUPLICADO NA MESMA ENTRADA
    // =================================================

    const imeisUnicos = new Set(imeis);

    if (
      imeisUnicos.size !== imeis.length
    ) {
      return NextResponse.json(
        {
          error:
            "Não pode haver IMEI repetido.",
        },
        { status: 400 }
      );
    }

    // =================================================
    // QUANTIDADE = NÚMERO DE IMEIS
    // =================================================

    if (imeis.length !== quantidade) {
      return NextResponse.json(
        {
          error:
            "A quantidade de IMEI não corresponde à quantidade informada.",
        },
        { status: 400 }
      );
    }

    // =================================================
    // VERIFICAR IMEI JÁ EXISTENTE
    // =================================================

    const existentes =
      await prisma.aparelho.findMany({
        where: {
          imei: {
            in: imeis,
          },
        },
        select: {
          imei: true,
        },
      });

    if (existentes.length > 0) {
      const repetidos =
        existentes.map(
          (item) => item.imei
        );

      return NextResponse.json(
        {
          error: `IMEI já cadastrado: ${repetidos.join(
            ", "
          )}`,
        },
        { status: 409 }
      );
    }

    // =================================================
    // SALVAR
    // =================================================

    const resultado =
      await prisma.$transaction(
        async (tx) => {
          let produto =
            await tx.produto.findFirst({
              where: {
                nome: {
                  equals: nome,
                  mode: "insensitive",
                },
              },
            });

          if (!produto) {
            produto =
              await tx.produto.create({
                data: {
                  nome,
                  quantidade: 0,
                },
              });
          }

          const lote =
            await tx.lote.create({
              data: {
                fornecedor,

                // Pode ser NULL
                precoCompraUsd,

                quantidade: imeis.length,
                produtoId: produto.id,
              },
            });

          await tx.aparelho.createMany({
            data: imeis.map(
              (imei: string) => ({
                imei,
                vendido: false,
                loteId: lote.id,
                produtoId: produto.id,
              })
            ),
          });

          await tx.produto.update({
            where: {
              id: produto.id,
            },
            data: {
              quantidade: {
                increment: imeis.length,
              },
            },
          });

          return {
            produtoId: produto.id,
            loteId: lote.id,
            quantidadeAdicionada:
              imeis.length,
          };
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Aparelho(s) cadastrado(s) com sucesso!",
        ...resultado,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "POST /api/estoque:",
      error
    );

    if (error?.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Esse IMEI já está cadastrado no sistema.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Erro ao cadastrar aparelho no estoque.",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH — تعديل IMEI أو إضافة سعر USD لاحقًا
// =====================================================

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    // =================================================
    // ADICIONAR / ALTERAR PREÇO USD DE UM LOTE
    // =================================================

    if (
      body.action === "atualizarPreco"
    ) {
      const loteId = Number(
        body.loteId
      );

      const precoCompraUsd =
        body.precoCompraUsd === null ||
        body.precoCompraUsd === undefined ||
        body.precoCompraUsd === ""
          ? null
          : Number(body.precoCompraUsd);

      if (
        !Number.isInteger(loteId) ||
        loteId <= 0
      ) {
        return NextResponse.json(
          {
            error:
              "Lote inválido.",
          },
          { status: 400 }
        );
      }

      if (
        precoCompraUsd !== null &&
        (!Number.isFinite(
          precoCompraUsd
        ) ||
          precoCompraUsd < 0)
      ) {
        return NextResponse.json(
          {
            error:
              "Preço de compra USD inválido.",
          },
          { status: 400 }
        );
      }

      const lote =
        await prisma.lote.findUnique({
          where: {
            id: loteId,
          },
        });

      if (!lote) {
        return NextResponse.json(
          {
            error:
              "Lote não encontrado.",
          },
          { status: 404 }
        );
      }

      const loteAtualizado =
        await prisma.lote.update({
          where: {
            id: loteId,
          },
          data: {
            precoCompraUsd,
          },
        });

      return NextResponse.json({
        success: true,
        message:
          "Preço de compra atualizado com sucesso!",
        lote: loteAtualizado,
      });
    }

    // =================================================
    // TROCAR IMEI
    // =================================================

    const imeiAntigo = String(
      body.imeiAntigo || ""
    ).trim();

    const imeiNovo = String(
      body.imeiNovo || ""
    ).trim();

    if (!imeiAntigo) {
      return NextResponse.json(
        {
          error:
            "Informe o IMEI antigo.",
        },
        { status: 400 }
      );
    }

    if (!imeiNovo) {
      return NextResponse.json(
        {
          error:
            "Informe o IMEI novo.",
        },
        { status: 400 }
      );
    }

    if (imeiAntigo === imeiNovo) {
      return NextResponse.json(
        {
          error:
            "O IMEI novo não pode ser igual ao antigo.",
        },
        { status: 400 }
      );
    }

    const aparelhoAntigo =
      await prisma.aparelho.findUnique({
        where: {
          imei: imeiAntigo,
        },
        include: {
          produto: true,
          lote: true,
        },
      });

    if (!aparelhoAntigo) {
      return NextResponse.json(
        {
          error:
            "IMEI antigo não encontrado.",
        },
        { status: 404 }
      );
    }

    if (aparelhoAntigo.vendido) {
      return NextResponse.json(
        {
          error:
            "Esse aparelho já foi vendido.",
        },
        { status: 400 }
      );
    }

    const aparelhoNovoExistente =
      await prisma.aparelho.findUnique({
        where: {
          imei: imeiNovo,
        },
      });

    if (aparelhoNovoExistente) {
      return NextResponse.json(
        {
          error:
            "O IMEI novo já está cadastrado no sistema.",
        },
        { status: 409 }
      );
    }

    const resultado =
      await prisma.$transaction(
        async (tx) => {
          await tx.aparelho.delete({
            where: {
              id: aparelhoAntigo.id,
            },
          });

          const aparelhoNovo =
            await tx.aparelho.create({
              data: {
                imei: imeiNovo,
                vendido: false,
                loteId:
                  aparelhoAntigo.loteId,
                produtoId:
                  aparelhoAntigo.produtoId,
              },
            });

          return aparelhoNovo;
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Aparelho trocado com sucesso!",
      aparelho: {
        id: resultado.id,
        imei: resultado.imei,
        produtoId:
          resultado.produtoId,
        loteId:
          resultado.loteId,
      },
    });
  } catch (error: any) {
    console.error(
      "PATCH /api/estoque:",
      error
    );

    if (error?.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "O IMEI novo já está cadastrado.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Erro ao alterar estoque.",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE — حذف المنتج مع باسوورد
// PASSWORD = 11111
// =====================================================

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const produtoId = Number(
      body.produtoId
    );

    const senha = String(
      body.senha || ""
    );

    const senhaCorreta = "11111";

    if (!senha) {
      return NextResponse.json(
        {
          error:
            "Informe a senha.",
        },
        { status: 400 }
      );
    }

    if (senha !== senhaCorreta) {
      return NextResponse.json(
        {
          error:
            "Senha incorreta.",
        },
        { status: 401 }
      );
    }

    if (!Number.isInteger(produtoId)) {
      return NextResponse.json(
        {
          error:
            "Produto inválido.",
        },
        { status: 400 }
      );
    }

    const produto =
      await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
        include: {
          aparelhos: true,
          lotes: true,
        },
      });

    if (!produto) {
      return NextResponse.json(
        {
          error:
            "Produto não encontrado.",
        },
        { status: 404 }
      );
    }

    // لا نحذف إذا في جهاز مباع
    const aparelhoVendido =
      produto.aparelhos.some(
        (aparelho) =>
          aparelho.vendido
      );

    if (aparelhoVendido) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir este produto porque existe aparelho vendido.",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      async (tx) => {
        await tx.aparelho.deleteMany({
          where: {
            produtoId: produtoId,
          },
        });

        await tx.lote.deleteMany({
          where: {
            produtoId: produtoId,
          },
        });

        await tx.produto.delete({
          where: {
            id: produtoId,
          },
        });
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Produto excluído do estoque.",
    });
  } catch (error: any) {
    console.error(
      "DELETE /api/estoque:",
      error
    );

    if (error?.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não foi possível excluir porque existem registros relacionados.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Erro ao excluir produto do estoque.",
      },
      { status: 500 }
    );
  }
}