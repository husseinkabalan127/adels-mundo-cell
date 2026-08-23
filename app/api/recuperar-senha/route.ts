import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Informe o e-mail." },
        { status: 400 }
      );
    }

    // Procurar usuário
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Não encontramos uma conta com esse e-mail.",
        },
        { status: 404 }
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

    // Gerar código de 6 números
    const codigo = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Código válido por 15 minutos
    const expiracao = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Salvar código no banco
    await prisma.usuario.update({
      where: {
        id: user.id,
      },
      data: {
        resetCode: codigo,
        resetCodeExpiresAt: expiracao,
      },
    });

    // Configuração do e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar SOMENTE o código para o seu e-mail
    await transporter.sendMail({
      from: `"Adel's Mundo Cell" <${process.env.EMAIL_USER}>`,

      to: "Hussein_kabalan@icloud.com",

      subject:
        "Código para recuperar sua senha - Adel's Mundo Cell",

      text: `Olá!

Você solicitou a recuperação da senha do sistema Adel's Mundo Cell.

Seu código de recuperação é:

${codigo}

Este código é válido por 15 minutos.

Se você não solicitou a recuperação da senha, ignore este e-mail.

Adel's Mundo Cell`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background: #f5f5f5;
          "
        >

          <div
            style="
              background: white;
              padding: 30px;
              border-radius: 15px;
              text-align: center;
            "
          >

            <h2 style="color: #222;">
              🔐 Adel's Mundo Cell
            </h2>

            <p style="font-size: 16px;">
              Você solicitou a recuperação da sua senha.
            </p>

            <p style="font-size: 16px;">
              Seu código de recuperação é:
            </p>

            <div
              style="
                margin: 25px 0;
                padding: 20px;
                background: #eff6ff;
                border: 2px solid #2563eb;
                border-radius: 12px;
              "
            >
              <span
                style="
                  font-size: 40px;
                  font-weight: bold;
                  letter-spacing: 10px;
                  color: #2563eb;
                "
              >
                ${codigo}
              </span>
            </div>

            <p style="font-size: 14px; color: #666;">
              Este código é válido por
              <strong>15 minutos</strong>.
            </p>

            <p style="font-size: 14px; color: #888;">
              Se você não solicitou a recuperação da senha,
              ignore este e-mail.
            </p>

            <hr style="margin: 25px 0;" />

            <p style="font-size: 13px; color: #999;">
              Sistema interno • Adel's Mundo Cell
            </p>

          </div>

        </div>
      `,
    });

    // Não mostramos o código na tela.
    // Ele será enviado somente para o e-mail definido acima.
    return NextResponse.json({
      ok: true,
      message:
        "Código de recuperação enviado para o e-mail de recuperação.",
    });
  } catch (error) {
    console.error(
      "Erro ao recuperar senha:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível enviar o código de recuperação.",
      },
      {
        status: 500,
      }
    );
  }
}