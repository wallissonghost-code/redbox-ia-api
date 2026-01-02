import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { error: "Use POST" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = String(body?.prompt ?? "").trim();
    if (!prompt) return json(res, 400, { error: "Prompt vazio." });

    const system = `
Responda SOMENTE com JSON válido:
{ "files": { "/App.tsx": "...", "/index.tsx": "...", "/index.html": "...", "/package.json": "..." } }
Sem markdown.
    `.trim();

    const resp = await client.responses.create({
      model: "gpt-5.2",
      input: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ]
    });

    const text = resp.output_text?.trim();
    if (!text) return json(res, 500, { error: "IA não retornou texto." });

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      parsed = JSON.parse(text.slice(start, end + 1));
    }

    if (!parsed?.files) return json(res, 400, { error: "Sem files." });

    return json(res, 200, { files: parsed.files });
  } catch (e) {
    return json(res, 500, { error: e?.message || "Erro interno." });
  }
}
