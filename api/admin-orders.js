async function supabaseRequest(path, options = {}) {
  const url = `${process.env.SUPABASE_URL}/rest/v1${path}`;

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    console.error("Erro Supabase:", data);
    throw new Error(typeof data === "string" ? data : data?.message || "Erro no Supabase");
  }

  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { password } = req.body || {};

    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ error: "ADMIN_PASSWORD não configurado na Vercel." });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Supabase não configurado." });
    }

    const orders = await supabaseRequest(
      "/orders?select=id,email,status,created_at,updated_at,customer_name,whatsapp,amount,mp_preference_id,mp_payment_id,items&order=created_at.desc&limit=100",
      { method: "GET" }
    );

    const tokens = await supabaseRequest(
      "/download_tokens?select=id,order_id,token,expires_at,used_at&order=expires_at.desc&limit=200",
      { method: "GET" }
    );

    const tokenByOrder = {};
    (tokens || []).forEach((token) => {
      tokenByOrder[token.order_id] = token;
    });

    const enrichedOrders = (orders || []).map((order) => ({
      ...order,
      token: tokenByOrder[order.id] || null
    }));

    return res.status(200).json({
      ok: true,
      orders: enrichedOrders
    });

  } catch (error) {
    console.error("Erro admin-orders:", error);

    return res.status(500).json({
      error: error.message || "Erro ao carregar painel admin."
    });
  }
}
