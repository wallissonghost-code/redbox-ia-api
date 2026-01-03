import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const body = await req.json();
          const { prompt } = body;

              if (!prompt) {
                    return NextResponse.json(
                            { error: "Prompt é obrigatório" },
                                    { status: 400 }
                                          );
                                              }

                                                  return NextResponse.json({
                                                        success: true,
                                                              message: "API funcionando",
                                                                    promptRecebido: prompt
                                                                        });
                                                                          } catch (error) {
                                                                              return NextResponse.json(
                                                                                    { error: "Erro interno", details: String(error) },
                                                                                          { status: 500 }
                                                                                              );
                                                                                                }
                                                                                                }