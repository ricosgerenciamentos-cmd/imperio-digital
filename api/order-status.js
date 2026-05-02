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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { order_id } = req.query;

    if (!order_id) {
      return res.status(400).json({ error: "order_id obrigatório." });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Supabase não configurado." });
    }

    const orders = await supabaseRequest(
      `/orders?id=eq.${order_id}&select=id,status,email,customer_name,whatsapp,amount,items,created_at&limit=1`,
      { method: "GET" }
    );

    const order = orders?.[0];

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    let token = null;

    if (order.status === "approved") {
      const tokens = await supabaseRequest(
        `/download_tokens?order_id=eq.${order_id}&select=token,expires_at,used_at&limit=1`,
        { method: "GET" }
      );

      token = tokens?.[0] || null;
    }

    return res.status(200).json({
      ok: true,
      order: {
        id: order.id,
        status: order.status,
        email: order.email,
        customer_name: order.customer_name,
        whatsapp: order.whatsapp,
        amount: order.amount,
        items: order.items || [],
        created_at: order.created_at
      },
      token
    });

  } catch (error) {
    console.error("Erro order-status:", error);

    return res.status(500).json({
      error: error.message || "Erro ao consultar pedido."
    });
  }
}
