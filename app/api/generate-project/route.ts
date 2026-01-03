import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const body = await req.json();

          return NextResponse.json({
                ok: true,
                      received: body,
                          });
                            } catch (error: any) {
                                return NextResponse.json(
                                      { ok: false, error: error?.message || "unknown error" },
                                            { status: 500 }
                                                );
                                                  }
                                                  }