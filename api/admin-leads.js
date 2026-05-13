export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Método não permitido" });
  }

  try {
    const password =
      typeof req.query?.password === "string"
        ? req.query.password
        : Array.isArray(req.query?.password)
          ? req.query.password[0]
          : "";

    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ ok: false, error: "ADMIN_PASSWORD não configurado na Vercel." });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: "Senha incorreta." });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ ok: false, error: "Variáveis do Supabase não configuradas" });
    }

    const url = `${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=200`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: "Erro ao listar leads",
        details: data
      });
    }

    return res.status(200).json({
      ok: true,
      leads: Array.isArray(data) ? data : []
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Erro interno ao listar leads",
      details: error.message
    });
  }
}
