export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Supabase não configurado.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    const name = String(body.name || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();
    const email = String(body.email || '').trim();
    const theme = String(body.theme || '').trim();
    const category = String(body.category || '').trim();
    const description = String(body.description || '').trim();

    if (!name || !whatsapp || !theme || !category || !description) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }

    const payload = {
      name: name.slice(0, 120),
      whatsapp: whatsapp.slice(0, 40),
      email: email ? email.slice(0, 160) : null,
      theme: theme.slice(0, 180),
      category: category.slice(0, 80),
      description: description.slice(0, 1600),
      status: 'nova'
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/suggestions`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || 'Erro ao salvar sugestão.' });
    }

    return res.status(200).json({ ok: true, suggestion: Array.isArray(data) ? data[0] : data });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erro inesperado.' });
  }
}
