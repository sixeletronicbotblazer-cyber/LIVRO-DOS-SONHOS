import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 letras).")
    .max(80, "Nome muito longo."),
  email: z.string().trim().email("Informe um e-mail válido."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Requisição inválida." },
        { status: 400 }
      );
    }

    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? "Dados inválidos.";
      return NextResponse.json(
        { ok: false, error: `Dados inválidos: ${firstIssue}` },
        { status: 400 }
      );
    }

    const { name, email } = parsed.data;

    await db.lead.upsert({
      where: { email },
      create: { name, email },
      update: { name },
    });

    return NextResponse.json(
      { ok: true, message: "Capítulo 1 enviado para o seu e-mail!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/leads] Erro ao salvar lead:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível enviar o capítulo agora. Tente novamente em instantes.",
      },
      { status: 500 }
    );
  }
}
