const PRODUCT_FILES = {
  15: "/GANHE-SEUS-PRIMEIROS-Rdollar10-ONLINE-HOJE.pdf",
  16: "/ebooks/como-abrir-negocio.pdf",
  17: "/ebooks/pack-negocios.pdf",

  1: "/ebooks/assistencia-tecnica.pdf",
  2: "/ebooks/barbearia.pdf",

  3: "/ebooks/vendas-digitais.pdf",
  4: "/ebooks/reeducacao-alimentar.pdf",
  5: "/ebooks/vestibular.pdf",
  6: "/ebooks/estetica.pdf",
  7: "/ebooks/corte-costura.pdf",
  8: "/ebooks/confeitaria.pdf",
  9: "/ebooks/pedras-preciosas.pdf",
  10: "/ebooks/ferro-velho.pdf",
  11: "/ebooks/negocio-organizado.pdf",
  12: "/ebooks/tarefas-diarias.pdf",
  13: "/ebooks/reducao-alcool.pdf",
  14: "/ebooks/cannabis.pdf",

  101: "/ebooks/Como-Cobrar-Mais-Pelos-Servicos-de-Assistencia-Tecnica.pdf",
  102: "/ebooks/Como-Conseguir-Clientes-na-Sua-Cidade-para-Assistencia-Tecnica-de-Celular.pdf",
  103: "/ebooks/Como-Criar-Promocoes-que-Vendem-na-Assistencia-Tecnica.pdf",
  104: "/ebooks/Como-Fidelizar-Clientes-e-Receber-Indicacoes-na-Assistencia-Tecnica.pdf",
  105: "/ebooks/Como-Identificar-Defeitos-em-Celulares.pdf",
  106: "/ebooks/Como-Montar-Sua-Bancada-Barata-para-Assistencia-Tecnica.pdf",
  107: "/ebooks/Corrija-Erros-Melhore-Desempenho-e-Lucre-com-Servicos-Rapidos.pdf",
  108: "/ebooks/Como-Trabalhar-com-Celulares-Molhados-e-Oxidados.pdf",
  109: "/ebooks/Desmontagem-e-Montagem-Sem-Danificar-Celulares.pdf",
  110: "/ebooks/Guia-Pratico-para-Resolver-Lentidao-Reinicializacoes-e-Falhas-de-Sistema.pdf",
  111: "/ebooks/Limpeza-e-Manutencao-Preventiva-de-Celulares.pdf",
  112: "/ebooks/Curso-Rapido-de-iPhone-Basico.pdf",
  113: "/ebooks/Guia-Pratico-para-Diagnostico-Substituicao-Segura-e-Melhor-Desempenho.pdf",
  114: "/ebooks/Como-Trabalhar-em-Casa-com-Assistencia-Tecnica-de-Celular.pdf",
  115: "/ebooks/Guia-Pratico-para-Transferir-Informacoes-com-Seguranca-Agilidade-e-Resultado-Profissional.pdf",
  116: "/ebooks/Solda-Basica-para-Iniciantes-na-Assistencia-Tecnica.pdf",
  117: "/ebooks/Troca-de-Tela-Passo-a-Passo.pdf",

  201: "/ebooks/COMO-FAZER-DEGRADE-PROFISSIONAL-NA-BARBEIRIA.pdf",
  202: "/ebooks/Como-Atender-Cliente-na-Barbearia-e-Fazer-Voltar-Sempre.pdf",
  203: "/ebooks/Como-Fazer-Barba-Profissional-na-Barbearia.pdf",
  204: "/ebooks/COMO-COBRAR-MAIS-NA-BARBEIRIA.pdf",
  205: "/ebooks/Como-Montar-Sua-Barbearia-do-Zero.pdf",
  206: "/ebooks/Como-Atrair-Clientes-para-Barbearia.pdf",
  207: "/ebooks/COMO-USAR-A-TESOURA-NA-BARBEIRIA.pdf",
  208: "/ebooks/FOTOS-E-INSTAGRAM-PARA-BARBEIROS.pdf",
  209: "/ebooks/Guia-Pratico-para-Cortes-Precisos-Degrades-Limpos-e-Atendimento-Profissional.pdf"
};

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
    const token = req.query.token;
    const productId = String(req.query.product_id || req.query.id || "");

    if (!token) {
      return res.status(400).json({ error: "Token obrigatório." });
    }

    if (!productId) {
      return res.status(400).json({ error: "Produto obrigatório." });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Supabase não configurado." });
    }

    const file = PRODUCT_FILES[productId];

    if (!file) {
      return res.status(404).json({ error: "Arquivo do produto não encontrado." });
    }

    const tokens = await supabaseRequest(
      `/download_tokens?token=eq.${token}&select=id,order_id,expires_at,used_at&limit=1`,
      { method: "GET" }
    );

    const tokenData = tokens?.[0];

    if (!tokenData) {
      return res.status(403).json({ error: "Token inválido." });
    }

    if (tokenData.expires_at && new Date(tokenData.expires_at) < new Date()) {
      return res.status(403).json({ error: "Token expirado." });
    }

    const orders = await supabaseRequest(
      `/orders?id=eq.${tokenData.order_id}&select=id,status,items&limit=1`,
      { method: "GET" }
    );

    const order = orders?.[0];

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    if (order.status !== "approved") {
      return res.status(403).json({ error: "Pedido ainda não aprovado." });
    }

    const items = Array.isArray(order.items) ? order.items : [];
    const hasProduct = items.some((item) => String(item.id) === productId);

    if (!hasProduct) {
      return res.status(403).json({ error: "Produto não pertence a este pedido." });
    }

    await supabaseRequest(`/download_tokens?id=eq.${tokenData.id}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: {
        used_at: new Date().toISOString()
      }
    });

    return res.redirect(302, file);

  } catch (error) {
    console.error("Erro download:", error);

    return res.status(500).json({
      error: error.message || "Erro ao liberar download."
    });
  }
}
