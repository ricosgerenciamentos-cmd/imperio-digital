export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Senha admin não configurada.' });
  }

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Supabase não configurado.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    if (String(body.password || '') !== String(adminPassword)) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/suggestions?select=*&order=created_at.desc&limit=200`, {
      method: 'GET',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.message || 'Erro ao carregar sugestões.' });
    }

    return res.status(200).json({ suggestions: Array.isArray(data) ? data : [] });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erro inesperado.' });
  }
}
