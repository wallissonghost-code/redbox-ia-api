import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt vazio" });
  }

  return res.status(200).json({
    ok: true,
    promptRecebido: prompt,
    message: "API Redbox IA funcionando 🚀"
  });
}