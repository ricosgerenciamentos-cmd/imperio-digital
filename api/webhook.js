import crypto from "crypto";

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

function getPaymentId(req) {
  const body = req.body || {};
  const query = req.query || {};

  return (
    body?.data?.id ||
    body?.id ||
    query?.["data.id"] ||
    query?.id ||
    query?.payment_id ||
    null
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      return res.status(500).json({ error: "MERCADO_PAGO_ACCESS_TOKEN não configurado." });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Supabase não configurado." });
    }

    const paymentId = getPaymentId(req);

    if (!paymentId) {
      console.log("Webhook recebido sem paymentId:", {
        body: req.body,
        query: req.query
      });

      return res.status(200).json({
        ok: true,
        ignored: true,
        reason: "Sem paymentId"
      });
    }

    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    });

    const payment = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("Erro ao consultar pagamento Mercado Pago:", payment);

      return res.status(500).json({
        error: "Erro ao consultar pagamento no Mercado Pago"
      });
    }

    const orderId =
      payment.external_reference ||
      payment.metadata?.order_id ||
      payment.metadata?.orderId ||
      null;

    if (!orderId) {
      console.log("Pagamento sem orderId:", payment);

      return res.status(200).json({
        ok: true,
        ignored: true,
        reason: "Pagamento sem orderId"
      });
    }

    const status = payment.status === "approved" ? "approved" : payment.status || "pending";

    await supabaseRequest(`/orders?id=eq.${orderId}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: {
        status,
        mp_payment_id: String(payment.id),
        amount: payment.transaction_amount || null,
        email: payment.payer?.email || null,
        updated_at: new Date().toISOString()
      }
    });

    if (status !== "approved") {
      return res.status(200).json({
        ok: true,
        order_id: orderId,
        status
      });
    }

    const existingTokens = await supabaseRequest(
      `/download_tokens?order_id=eq.${orderId}&select=id,token&limit=1`,
      {
        method: "GET"
      }
    );

    let token = existingTokens?.[0]?.token;

    if (!token) {
      token = crypto.randomBytes(32).toString("hex");

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      await supabaseRequest("/download_tokens", {
        method: "POST",
        body: {
          order_id: orderId,
          token,
          expires_at: expiresAt.toISOString()
        }
      });
    }

    return res.status(200).json({
      ok: true,
      order_id: orderId,
      status: "approved",
      token_created: true
    });

  } catch (error) {
    console.error("Erro webhook:", error);

    return res.status(500).json({
      error: error.message || "Erro no webhook"
    });
  }
}
