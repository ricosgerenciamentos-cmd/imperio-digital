export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!ACCESS_TOKEN) {
      return res.status(500).json({ error: 'MERCADO_PAGO_ACCESS_TOKEN não configurado' });
    }

    const PRODUCTS = [
      { id: 15, title: 'Ganhe Seus Primeiros R$10 Online Hoje', price: 0.5 },
      { id: 1, title: 'Assistência Técnica de Celular', price: 14 },
      { id: 2, title: 'Barbearia', price: 13 },
      { id: 3, title: 'Vendas Digitais', price: 14 },
      { id: 4, title: 'Reeducação Alimentar', price: 13 },
      { id: 5, title: 'Vestibular', price: 17 }
    ];

    const { items, customer } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const cart = items.map((item) => {
      const found = PRODUCTS.find((p) => p.id === item.id);
      if (!found) throw new Error('Produto inválido');

      return {
        title: found.title,
        quantity: Number(item.qty || 1),
        unit_price: Number(found.price),
        currency_id: 'BRL'
      };
    });

    const total = cart.reduce((sum, item) => {
      return sum + item.unit_price * item.quantity;
    }, 0);

    if (total < 0.5) {
      return res.status(400).json({ error: 'Compra mínima de R$0,50' });
    }

    const baseUrl = process.env.SITE_URL || 'https://imperio-digital-gray.vercel.app';

    const body = {
      items: cart,
      payer: {
        name: customer?.name || '',
        email: customer?.email || ''
      },
      back_urls: {
        success: baseUrl,
        failure: baseUrl,
        pending: baseUrl
      },
      auto_return: 'approved'
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Erro ao criar pagamento' });
    }

    return res.status(200).json({
      init_point: data.init_point
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Erro interno'
    });
  }
}
