export default async function handler(req, res) {
    try {
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
  
      if (req.method !== 'POST') {
        return res.status(405).json({
          ok: false,
          error: 'Método não permitido'
        });
      }
  
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({
          ok: false,
          error: 'Variáveis do Supabase não configuradas'
        });
      }
  
      const body = typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body || {};
  
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();
      const whatsapp = String(body.whatsapp || '').trim();
      const source = String(body.source || 'site').trim();
      const interest = String(body.interest || 'geral').trim();
      const notes = String(body.notes || '').trim();
  
      if (!name && !email && !whatsapp) {
        return res.status(400).json({
          ok: false,
          error: 'Informe pelo menos nome, email ou WhatsApp'
        });
      }
  
      const leadPayload = {
        name,
        email,
        whatsapp,
        source,
        interest,
        status: 'novo',
        notes
      };
  
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify(leadPayload)
      });
  
      const data = await response.json().catch(() => null);
  
      if (!response.ok) {
        return res.status(response.status).json({
          ok: false,
          error: 'Erro ao salvar lead',
          details: data
        });
      }
  
      return res.status(200).json({
        ok: true,
        lead: Array.isArray(data) ? data[0] : data
      });
  
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: 'Erro interno ao salvar lead',
        details: error.message
      });
    }
  }