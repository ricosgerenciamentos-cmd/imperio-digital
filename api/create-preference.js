import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, price } = req.body;

    const preference = {
      items: [
        {
          title: title || "Acesso Império Digital",
          quantity: 1,
          currency_id: "BRL",
          unit_price: Number(price) || 1.99
        }
      ],
      back_urls: {
        success: "https://imperio-digital-gray.vercel.app/obrigado",
        failure: "https://imperio-digital-gray.vercel.app/",
        pending: "https://imperio-digital-gray.vercel.app/"
      },
      auto_return: "approved",
      payment_methods: {
        installments: 12
      }
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      id: response.body.id,
      init_point: response.body.init_point
    });

  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return res.status(500).json({
      error: "Erro ao criar pagamento"
    });
  }
}
