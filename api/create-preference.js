const PRODUCTS = {
  15: { title: "Primeiros R$10 Online: Guia simples para começar pelo celular", price: 1.99 },
  16: { title: "Como Abrir um Negócio do Zero: Primeiros passos para começar com clareza", price: 9.0 },
  17: { title: "Pack Completo de Negócios: Guias práticos para escolher e começar melhor", price: 37.0 },

  1: { title: "Pack Assistência Técnica Completo: do zero aos primeiros clientes", price: 37.0 },
  2: { title: "Pack Barbearia Completo: do básico aos primeiros clientes", price: 37.0 },

  3: { title: "Vendas Digitais para Iniciantes: Aprenda a vender online passo a passo", price: 14.0 },
  4: { title: "Reeducação Alimentar: Comece com hábitos simples para melhorar sua saúde", price: 13.0 },
  5: { title: "Plano de Estudos para Vestibular: Organize sua rotina e melhore seu desempenho", price: 9.0 },
  6: { title: "Estética do Zero: Guia prático para começar na área e atender melhor", price: 13.0 },
  7: { title: "Corte e Costura para Iniciantes: Aprenda do zero e crie suas primeiras peças", price: 13.0 },
  8: { title: "Confeitaria do Zero: Aprenda a começar e vender seus primeiros doces", price: 13.0 },
  9: { title: "Pedras Preciosas: Guia inicial para entender valor, tipos e oportunidades", price: 14.0 },
  10: { title: "Ferro Velho: Guia prático para enxergar oportunidades nesse mercado", price: 14.0 },
  11: { title: "Organize seu Negócio: Guia simples para ter mais controle e clareza", price: 9.0 },
  12: { title: "Organize sua Rotina: Método simples para ter mais foco no dia a dia", price: 13.0 },
  13: { title: "Redução do Álcool: Guia prático para retomar o controle da rotina", price: 9.0 },
  14: { title: "Cannabis: Guia informativo para entender o tema com mais clareza", price: 13.0 },

  101: { title: "Como cobrar mais pelos serviços de assistência técnica", price: 4.99 },
  102: { title: "Como conseguir clientes na sua cidade para assistência técnica", price: 4.99 },
  103: { title: "Como criar promoções que vendem na assistência técnica", price: 4.99 },
  104: { title: "Como fidelizar clientes e receber indicações", price: 4.99 },
  105: { title: "Como identificar defeitos em celulares", price: 4.99 },
  106: { title: "Como montar uma bancada barata para assistência técnica", price: 4.99 },
  107: { title: "Serviços rápidos: corrija erros, melhore desempenho e lucre mais", price: 4.99 },
  108: { title: "Como trabalhar com celulares molhados e oxidados", price: 4.99 },
  109: { title: "Desmontagem e montagem sem danificar celulares", price: 4.99 },
  110: { title: "Como resolver lentidão, reinicializações e falhas de sistema", price: 4.99 },
  111: { title: "Limpeza e manutenção preventiva de celulares", price: 4.99 },
  112: { title: "Curso rápido de iPhone básico", price: 4.99 },
  113: { title: "Diagnóstico, substituição segura e melhor desempenho", price: 4.99 },
  114: { title: "Como trabalhar em casa com assistência técnica de celular", price: 4.99 },
  115: { title: "Transferência de informações com segurança e agilidade", price: 4.99 },
  116: { title: "Solda básica para iniciantes na assistência técnica", price: 4.99 },
  117: { title: "Troca de tela passo a passo", price: 4.99 },

  201: { title: "Como fazer degradê profissional na barbearia", price: 4.99 },
  202: { title: "Como atender clientes na barbearia e fazer voltar sempre", price: 4.99 },
  203: { title: "Como fazer barba profissional na barbearia", price: 4.99 },
  204: { title: "Como cobrar mais na barbearia", price: 4.99 },
  205: { title: "Como montar sua barbearia do zero", price: 4.99 },
  206: { title: "Como atrair clientes para barbearia", price: 4.99 },
  207: { title: "Como usar a tesoura na barbearia", price: 4.99 },
  208: { title: "Fotos e Instagram para barbeiros", price: 4.99 },
  209: { title: "Cortes precisos, degradês limpos e atendimento profissional", price: 4.99 }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { items = [], customer = {} } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio." });
    }

    const mpItems = items
      .map((item) => {
        const product = PRODUCTS[String(item.id)];

        if (!product) return null;

        const qty = Math.max(1, Number(item.qty || 1));

        return {
          id: String(item.id),
          title: product.title,
          quantity: qty,
          currency_id: "BRL",
          unit_price: Number(product.price)
        };
      })
      .filter(Boolean);

    if (mpItems.length === 0) {
      return res.status(400).json({ error: "Nenhum produto válido encontrado." });
    }

    const total = mpItems.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );

    if (total < 1.99) {
      return res.status(400).json({ error: "Compra mínima de R$1,99." });
    }

    const siteUrl = process.env.SITE_URL || "https://imperio-digital-gray.vercel.app";

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: mpItems,

        payer: {
          name: customer.name || undefined,
          email: customer.email || undefined
        },

        back_urls: {
          success: `${siteUrl}/obrigado`,
          failure: `${siteUrl}/`,
          pending: `${siteUrl}/checkout`
        },

        auto_return: "approved",

        notification_url: `${siteUrl}/api/webhook`,

        metadata: {
          customer,
          items
        },

        payment_methods: {
          installments: 12
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Mercado Pago:", data);

      return res.status(500).json({
        error: data.message || "Erro ao criar pagamento."
      });
    }

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    });

  } catch (error) {
    console.error("Erro create-preference:", error);

    return res.status(500).json({
      error: "Erro ao criar pagamento."
    });
  }
}
