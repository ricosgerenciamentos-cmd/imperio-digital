const PRODUCTS=[
{id:1,title:'Assistência Técnica de Celular',price:14},{id:2,title:'Barbearia',price:13},{id:3,title:'Vendas Digitais',price:14},{id:4,title:'Reeducação Alimentar',price:13},{id:5,title:'Vestibular',price:9},{id:6,title:'Estética',price:13},{id:7,title:'Corte e Costura',price:13},{id:8,title:'Confeitaria',price:13},{id:9,title:'Pedras Preciosas',price:14},{id:10,title:'Ferro Velho',price:14},{id:11,title:'Negócio Organizado',price:9},{id:12,title:'Tarefas Diárias',price:13},{id:13,title:'Guia da Sobriedade',price:9}
];
module.exports=async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Método não permitido'});
 try{
  const accessToken=process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if(!accessToken) return res.status(500).json({error:'MERCADO_PAGO_ACCESS_TOKEN não configurado na Vercel'});
  const {cart,customer}=req.body||{};
  if(!Array.isArray(cart)||cart.length===0) return res.status(400).json({error:'Carrinho vazio'});
  if(!customer?.name||!customer?.email||!customer?.whatsapp) return res.status(400).json({error:'Dados do cliente incompletos'});
  const items=cart.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id); if(!p) throw new Error('Produto inválido'); return {id:String(p.id),title:p.title,quantity:1,unit_price:Number(p.price),currency_id:'BRL'}});
  const total=items.reduce((s,i)=>s+i.unit_price*i.quantity,0);
  if(total<3) return res.status(400).json({error:'Compra mínima de R$3,00'});
  const origin=req.headers.origin||process.env.SITE_URL||'https://imperio-digital-gray.vercel.app';
  const orderId=`IMP-${Date.now()}`;
  const preference={items,payer:{name:customer.name,email:customer.email},external_reference:orderId,back_urls:{success:`${origin}/obrigado?status=success&order=${orderId}`,failure:`${origin}/checkout?status=failure`,pending:`${origin}/obrigado?status=pending&order=${orderId}`},auto_return:'approved',notification_url:process.env.MERCADO_PAGO_WEBHOOK_URL||`${origin}/api/webhook`,statement_descriptor:'IMPERIO DIGITAL',metadata:{whatsapp:customer.whatsapp,customer_name:customer.name}};
  const mpRes=await fetch('https://api.mercadopago.com/checkout/preferences',{method:'POST',headers:{Authorization:`Bearer ${accessToken}`,'Content-Type':'application/json'},body:JSON.stringify(preference)});
  const data=await mpRes.json();
  if(!mpRes.ok) return res.status(400).json({error:data.message||'Erro Mercado Pago',details:data});
  return res.status(200).json({id:data.id,init_point:data.init_point,sandbox_init_point:data.sandbox_init_point,orderId});
 }catch(error){return res.status(500).json({error:error.message||'Erro interno'});}
}
