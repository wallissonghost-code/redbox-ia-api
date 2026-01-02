import { NextResponse } from "next/server";

export const runtime = "nodejs"; // evita Edge dar ruim

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = body?.prompt;

    return NextResponse.json({
      ok: true,
      message: "API funcionando ✅ (modo teste)",
      received: prompt ?? null,
      hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
      hasHFToken: Boolean(process.env.HF_TOKEN),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 });
}