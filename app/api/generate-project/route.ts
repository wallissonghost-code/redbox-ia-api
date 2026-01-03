import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const body = await req.json();

          return NextResponse.json({
                ok: true,
                      received: body,
                            message: "API generate-project funcionando 🎉"
                                });
                                  } catch (err) {
                                      return NextResponse.json(
                                            { error: "Erro interno", details: String(err) },
                                                  { status: 500 }
                                                      );
                                                        }
                                                        }