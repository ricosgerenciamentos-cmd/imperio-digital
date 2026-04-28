import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
  { id:15, title:'Ganhe Seus Primeiros R$10 Online Hoje', cat:'Renda Extra', intent:'ganhar', tag:'🔥 R$0,50', img:'/vendas-digitais.png', price:'R$ 0,50', old:'R$ 19,90', link:'/GANHE-SEUS-PRIMEIROS-Rdollar10-ONLINE-HOJE.pdf', desc:'Aprenda formas simples e reais de fazer renda extra online usando apenas o celular, mesmo começando do zero.' },
  { id:16, title:'Como Abrir um Negócio Lucrativo do Zero', cat:'Negócios', intent:'abrir-negocio', tag:'🔥 R$9', img:'/negocio-lucrativo.png', price:'R$ 9,00', old:'R$ 47,00', link:'COLE_AQUI_O_LINK_DO_CHECKOUT_R9', desc:'Um guia direto para entender o que vender, como começar, como organizar seu primeiro negócio e dar os primeiros passos mesmo com pouco dinheiro.' },
  { id:17, title:'Pack Completo de Negócios Lucrativos', cat:'Negócios', intent:'pack', tag:'💎 Pack R$37', img:'/pack-negocios.png', price:'R$ 37,00', old:'R$ 97,00', link:'COLE_AQUI_O_LINK_DO_CHECKOUT_R37', desc:'Pacote completo com guias práticos sobre diferentes negócios, do básico ao avançado, para quem quer escolher uma oportunidade e começar com mais clareza.' },
  { id:1, title:'Assistência Técnica de Celular', cat:'Negócios', intent:'ganhar', tag:'Mais vendido', img:'/assistencia-celular.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/PjRqOei', desc:'Aprenda a iniciar no ramo de assistência técnica com um guia direto e prático.' },
  { id:2, title:'Barbearia', cat:'Negócios', intent:'ganhar', tag:'Top vendas', img:'/barbearia.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/ynz7UXJ', desc:'Do planejamento à gestão para começar uma barbearia de destaque.' },
  { id:3, title:'Vendas Digitais', cat:'Negócios', intent:'ganhar', tag:'Digital', img:'/vendas-digitais.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/tAqlMeI', desc:'Estratégias simples para vender todos os dias pela internet.' },
  { id:4, title:'Reeducação Alimentar', cat:'Saúde', intent:'saude', tag:'Saúde', img:'/reeducacao-alimentar.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/0SAithY', desc:'Mude seus hábitos e transforme sua saúde com passos práticos.' },
  { id:5, title:'Vestibular', cat:'Educação', intent:'estudar', tag:'Educação', img:'/vestibular.png', price:'R$ 9,00', old:'R$ 27,00', link:'https://pay.kiwify.com.br/sOYzBc2', desc:'Organize seus estudos e aumente suas chances de aprovação.' },
  { id:6, title:'Estética', cat:'Negócios', intent:'ganhar', tag:'Beleza', img:'/devocional.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/FptQKV2', desc:'Guia para entrar no mercado da estética com visão profissional.' },
  { id:7, title:'Corte e Costura', cat:'Negócios', intent:'ganhar', tag:'Criativo', img:'/corte-costura.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/uxqfR0Z', desc:'Aprenda, crie e lucre com corte e costura do zero.' },
  { id:8, title:'Confeitaria', cat:'Negócios', intent:'ganhar', tag:'Doce renda', img:'/confeitaria.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/sjoOT4z', desc:'Transforme doces em oportunidade de renda com um guia prático.' },
  { id:9, title:'Pedras Preciosas', cat:'Negócios', intent:'ganhar', tag:'Premium', img:'/pedras-preciosas.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/DZxpL4y', desc:'Comece no mundo das gemas, joias e oportunidades.' },
  { id:10, title:'Ferro Velho', cat:'Negócios', intent:'ganhar', tag:'Sustentável', img:'/ferro-velho.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/CFNOj2I', desc:'Monte um ferro velho lucrativo e organizado.' },
  { id:11, title:'Negócio Organizado', cat:'Organização', intent:'organizar', tag:'Organização', img:'/negocio-organizado.png', price:'R$ 9,00', old:'R$ 29,00', link:'https://pay.kiwify.com.br/fIg2Fdd', desc:'Organize sua semana, prioridades e rotina com clareza.' },
  { id:12, title:'Tarefas Diárias', cat:'Organização', intent:'organizar', tag:'Foco', img:'/tarefas-diarias.png', price:'R$ 13,00', old:'R$ 29,00', link:'https://pay.kiwify.com.br/nmHBzko', desc:'Pare de apagar incêndios e organize melhor seu dia.' },
  { id:13, title:'Guia da Sobriedade', cat:'Saúde', intent:'saude', tag:'Transformação', img:'/alcoolismo.png', price:'R$ 9,00', old:'R$ 27,00', link:'https://pay.kiwify.com.br/hlaRkGV', desc:'10 passos práticos para buscar uma vida sóbria.' },
  { id:14, title:'Cultivo Saudável', cat:'Nicho específico', intent:'nicho', tag:'Especial', img:'/cannabis.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/riPNbK0', desc:'Guia visual sobre cultivo saudável e responsável.', hidden:true }
];

const filters = [
  ['todos','Todos'],
  ['ganhar','Ganhar dinheiro'],
  ['abrir-negocio','Abrir negócio'],
  ['pack','Pack completo'],
  ['organizar','Organização'],
  ['saude','Saúde'],
  ['estudar','Estudos']
];

const bestIds = [15,16,17,1];

function wa(p){
  const txt = p ? `Olá! Tenho interesse no ebook ${p.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}


function priceNumber(price){
  return Number(String(price).replace(/[^\d,]/g,'').replace(',','.')) || 0;
}

function waCart(cart){
  const total = cart.reduce((sum,p)=>sum + priceNumber(p.price),0);
  const itens = cart.map((p,i)=>`${i+1}. ${p.title} - ${p.price}`).join('\n');
  const txt = `Olá! Quero finalizar meu pedido no Império Digital:\n\n${itens}\n\nTotal aproximado: R$ ${total.toFixed(2).replace('.',',')}`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

function App(){
  const path = window.location.pathname;
  const [filter,setFilter] = useState('todos');
  const [search,setSearch] = useState('');
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);

  function addToCart(product){
    setCart(current => current.some(item => item.id === product.id) ? current : [...current, product]);
    setCartOpen(true);
  }

  function removeFromCart(id){
    setCart(current => current.filter(item => item.id !== id));
  }
  const best = products.filter(p => bestIds.includes(p.id));
  const list = useMemo(() => products.filter(p => {
    const byFilter = filter === 'todos' ? !p.hidden : p.intent === filter;
    const bySearch = `${p.title} ${p.cat} ${p.intent} ${p.tag}`.toLowerCase().includes(search.toLowerCase());
    return byFilter && bySearch;
  }), [filter,search]);

  if(path === '/checkout') return <CheckoutPage />;
  if(path === '/obrigado') return <ThankYouPage />;

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} cartCount={cart.length} setCartOpen={setCartOpen}/>
    <Hero best={best}/>
    <FeaturedMicroEbook addToCart={addToCart}/>
    <ValueLadder addToCart={addToCart}/>
    <TrustBar/>
    <Best best={best} addToCart={addToCart}/>
    <Filters filter={filter} setFilter={setFilter}/>
    <Catalog list={list} addToCart={addToCart}/>
    <OfferBanner/>
    <AffiliateSystem/>
    <FAQ/>
    <Testimonials/>
    <FinalCTA/>
    <Footer/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    <FloatingButtons/>
  </main>
}

function TopNotice(){return <div className="notice">🔥 Oferta especial de lançamento • Acesso imediato • Compra segura pelo Mercado Pago • Suporte no WhatsApp</div>}

function Header({search,setSearch,cartCount,setCartOpen}){return <header className="header">
  <a className="logo" href="#top"><span>♛</span><div><b>IMPÉRIO</b><small>DIGITAL</small></div></a>
  <nav><a href="#top">Início</a><a href="#best">Mais vendidos</a><a href="#catalogo">Ebooks</a><a href="#afiliados">Afiliados</a><a href="#faq">Perguntas</a><a href={wa()} target="_blank" rel="noreferrer">Contato</a></nav>
  <label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ebook"/></label>
  <button className="cartBtn" onClick={()=>setCartOpen(true)}>🛒 <span>{cartCount}</span></button>
  <a className="headBtn" href="#ebook050">Comprar Agora</a>
</header>}

function Hero({best}){return <section id="top" className="hero heroPremium">
  <div className="copy">
    <p className="eyebrow">🔥 OFERTA DE ENTRADA • ACESSO IMEDIATO</p>
    <h1>Ganhe dinheiro <br/><span>começando do zero</span><br/>por apenas R$0,50.</h1>
    <p className="lead">Um guia rápido para descobrir formas simples e reais de fazer seus primeiros R$10 online usando apenas o celular.</p>

    <div className="heroTrust premiumTrust">
      <span>💰 <b>Preço simbólico</b><small>Apenas R$0,50</small></span>
      <span>⚡ <b>Acesso imediato</b><small>Baixe na hora</small></span>
      <span>📱 <b>Comece pelo celular</b><small>Mesmo do zero</small></span>
      <span>🛡️ <b>Compra segura</b><small>Ambiente protegido</small></span>
    </div>

    <div className="socialProof premiumProof">
      <b>⭐ Produto de entrada</b>
      <span>Ideal para conhecer o Império Digital</span>
    </div>

    <div className="actions">
      <a className="primary pulse" href="#ebook050">Comprar agora por R$0,50</a>
      <a className="secondary" href="#escada">Ver ofertas completas</a>
    </div>
    <p className="secureLine">🔒 Compra segura • Acesso imediato • Suporte no WhatsApp</p>
  </div>

  <div className="phoneStage">
    <div className="orbit"></div>
    <Phone product={best[0]}/>
  </div>
</section>}

function Phone({product}){return <aside className="phone premiumPhone"><div className="screen">
  <div className="phoneNav">☰ <b>♛ IMPÉRIO <small>DIGITAL</small></b> 🛒</div>
  <h3 className="phoneSectionTitle">MAIS VENDIDOS <a href="#best">Ver todos</a></h3>
  <div className="phoneProductGrid">
    {products.filter(p=>!p.hidden).slice(0,6).map(p=><img key={p.id} src={p.img} alt={p.title}/>)}
  </div>
  <a className="phoneBtn" href="#catalogo">VER TODOS OS EBOOKS</a>
</div></aside>}



function FeaturedMicroEbook({addToCart}){
  const ebook = products.find(p=>p.id === 15);
  return <section id="ebook050" className="featured050">
    <div className="featured050Card">
      <div className="featured050Copy">
        <p>🔥 TESTE DE OFERTA • RENDA EXTRA</p>
        <h2>Ganhe seus primeiros R$10 online hoje</h2>
        <span>Um guia rápido para iniciantes descobrirem formas simples e reais de começar a fazer renda extra pela internet usando apenas o celular.</span>
        <div className="featured050Bullets">
          <b>✅ Ideal para iniciantes</b>
          <b>⚡ Acesso imediato</b>
          <b>📱 Comece pelo celular</b>
          <b>💰 Apenas R$0,50</b>
        </div>
        <div className="featured050Actions">
          <button onClick={()=>addToCart(ebook)}>Comprar por R$0,50</button>
          <a href="#catalogo">Ver outros ebooks</a>
        </div>
      </div>
      <div className="featured050Price">
        <small>De R$19,90 por</small>
        <strong>R$0,50</strong>
        <span>Oferta teste por tempo limitado</span>
      </div>
    </div>
  </section>
}


function ValueLadder({addToCart}){
  const entrada = products.find(p => p.id === 15);
  const principal = products.find(p => p.id === 16);
  const premium = products.find(p => p.id === 17);

  const steps = [
    { label:'ENTRADA', price:'R$0,50', title:entrada?.title, text:'Produto barato para começar hoje e conhecer o método.', product:entrada },
    { label:'PRODUTO PRINCIPAL', price:'R$9', title:principal?.title, text:'Guia central para quem quer abrir um negócio com clareza.', product:principal },
    { label:'PACK PREMIUM', price:'R$37', title:premium?.title, text:'Pacote completo com vários caminhos de negócio do básico ao avançado.', product:premium }
  ];

  return <section id="escada" className="ladder">
    <p className="red">ESCADA DE VALOR</p>
    <h2>Comece pequeno. Evolua para o pacote completo.</h2>
    <p className="sub">Uma jornada simples: primeiro você aprende a ganhar dinheiro, depois entende como abrir um negócio, e por fim acessa o pack completo.</p>
    <div className="ladderGrid">
      {steps.map((step, index) => <article className="ladderCard" key={step.label}>
        <span>{step.label}</span>
        <strong>{step.price}</strong>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <button onClick={() => step.product && addToCart(step.product)}>{index === 0 ? 'Começar por R$0,50' : 'Comprar agora'}</button>
      </article>)}
    </div>
  </section>
}

function MicroR1(){return <section id="r1" className="microR1">
  <div className="microR1Badge">🔥 OFERTA POR TEMPO LIMITADO • NOVOS PRODUTOS TODA SEMANA</div>
  <div className="microR1Wrap">
    <div className="microR1Copy">
      <p>COMECE COM POUCO</p>
      <h2>Produtos digitais <span>a partir de R$0,50</span></h2>
      <b>Escolha, compre e receba na hora.</b>
      <small>Uma vitrine criada para ofertas rápidas, produtos baratos e entrada em massa de novos clientes no Império Digital.</small>

      <div className="microR1Proof">
        <span>📥 +1.000 downloads</span>
        <span>⭐ Clientes satisfeitos</span>
        <span>⚡ Acesso imediato</span>
      </div>

      <div className="microR1Actions">
        <a href="#catalogo">Comprar agora por R$0,50</a>
        <a href="#best">Ver mais vendidos</a>
      </div>
    </div>
    <div className="microR1Card">
      <div className="microR1Top">OFERTA DE ENTRADA</div>
      <strong>R$0,50+</strong>
      <p>Produtos rápidos, práticos e acessíveis</p>
      <ul>
        <li>⏳ Oferta por tempo limitado</li>
        <li>🆕 Novos produtos toda semana</li>
        <li>🛡️ Compra segura</li>
        <li>📚 Conteúdo direto ao ponto</li>
      </ul>
    </div>
  </div>
</section>}

function TrustBar(){return <section className="trustBar"><div>🛡️<b>Compra segura pelo Mercado Pago</b><p>Checkout protegido.</p></div><div>⚡<b>Acesso imediato</b><p>Receba após a confirmação.</p></div><div>🎧<b>Suporte no WhatsApp</b><p>Atendimento rápido.</p></div><div>🏅<b>Garantia 7 dias</b><p>Compre com segurança.</p></div></section>}

function Best({best,addToCart}){return <section id="best" className="best"><p className="red">MAIS VENDIDOS DA SEMANA</p><h2>Escolha seu ebook e comece hoje</h2><p className="sub">Comece pelo produto de entrada ou escolha uma oferta principal do funil.</p><div className="bestGrid">{best.map(p=><Product p={p} compact addToCart={addToCart} key={p.id}/>)}</div></section>}

function Filters({filter,setFilter}){return <section className="filters"><h2>Escolha pelo seu <span>objetivo</span></h2><div>{filters.map(([id,label])=><button key={id} onClick={()=>setFilter(id)} className={filter===id?'active':''}>{label}</button>)}</div></section>}

function Catalog({list,addToCart}){return <section id="catalogo" className="catalog"><p className="red">CATÁLOGO COMPLETO</p><h2>Todos os Ebooks</h2><p className="sub">Produtos low ticket, diretos e prontos para acesso.</p><div className="grid">{list.map(p=><Product p={p} addToCart={addToCart} key={p.id}/>)}</div></section>}

function Product({p,compact,addToCart}){return <article className={compact?'card compact':'card'}><div className="imgWrap"><img src={p.img} alt={p.title}/><span>{p.tag}</span></div><div className="body"><h3>{p.title}</h3><p>{p.desc}</p><small>De {p.old}</small><strong>Por {p.price}</strong><em>Oferta de lançamento</em><button className="cartAdd" onClick={()=>addToCart(p)}>Adicionar ao carrinho</button><a className="buy" href="#" onClick={(e)=>{e.preventDefault();addToCart(p);}}>COMPRAR AGORA</a><a className="zap" href={wa(p)} target="_blank" rel="noreferrer">Tirar dúvida no WhatsApp</a></div></article>}

function OfferBanner(){return <section className="offer"><b>🔥 Preço promocional por tempo limitado</b><span>Escolha seu ebook, compre com segurança e receba o acesso imediatamente.</span><a href="#escada">Ver escada de valor</a></section>}


function AffiliateSystem(){return <section id="afiliados" className="affiliate">
  <div className="affiliateCopy">
    <p className="red">SISTEMA DE AFILIADOS INTERNO</p>
    <h2>Venda produtos do Império Digital e ganhe comissão</h2>
    <span>Estrutura pensada para transformar o site em um marketplace: criadores, afiliados e produtos digitais em uma única plataforma.</span>
  </div>
  <div className="affiliateGrid">
    <div><b>1</b><h3>Afiliado se cadastra</h3><p>Recebe um link único para divulgar produtos selecionados.</p></div>
    <div><b>2</b><h3>Cliente compra</h3><p>A venda acontece pelo checkout do produto com rastreamento do afiliado.</p></div>
    <div><b>3</b><h3>Comissão é registrada</h3><p>O painel mostra vendas, cliques, conversão e saldo acumulado.</p></div>
  </div>
  <div className="affiliateCTA">
    <strong>Próxima fase:</strong>
    <span>Área de login, links únicos, painel de comissões e ranking de afiliados.</span>
    <a href={wa()} target="_blank" rel="noreferrer">Quero vender como afiliado</a>
  </div>
</section>}

function FAQ(){return <section id="faq" className="faq"><h2>Perguntas rápidas</h2><div><details open><summary>Como recebo o ebook?</summary><p>Após a compra aprovada, o acesso chega automaticamente no seu e-mail.</p></details><details><summary>É seguro comprar?</summary><p>Sim. O pagamento é feito pelo Mercado Pago, com checkout protegido.</p></details><details><summary>Tem suporte?</summary><p>Sim. Você pode tirar dúvidas pelo WhatsApp.</p></details></div></section>}

function Testimonials(){return <section className="test"><h2>O que nossos <span>clientes</span> dizem</h2><div><blockquote><b>Carlos M.</b><span>★★★★★</span><p>“O ebook de Barbearia mudou meu negócio. Direto ao ponto.”</p></blockquote><blockquote><b>Juliana S.</b><span>★★★★★</span><p>“O de Reeducação Alimentar me ajudou muito.”</p></blockquote><blockquote><b>Rafael T.</b><span>★★★★★</span><p>“Vendas Digitais abriu minha mente para novas oportunidades.”</p></blockquote></div></section>}

function FinalCTA(){return <section className="final"><div>♛</div><section><h2>Invista em você. Comece hoje.</h2><p>Escolha um ebook, acesse agora e dê o próximo passo.</p></section><a href="#best">Comprar Agora →</a></section>}
function Footer(){return <footer><span>♛ IMPÉRIO DIGITAL</span><b>Compra segura • Acesso imediato • Suporte WhatsApp • Garantia 7 dias</b></footer>}


function CheckoutPage(){
  const [cart,setCart] = useState([]);
  const [customer,setCustomer] = useState({name:'',email:'',whatsapp:''});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  React.useEffect(()=>{setCart(JSON.parse(localStorage.getItem('imperio_cart') || '[]'))},[]);
  const total = cart.reduce((sum,p)=>sum + priceNumber(p.price),0);

  async function finishCheckout(e){
    e.preventDefault();
    setError('');
    if(cart.length === 0) return setError('Seu carrinho está vazio.');
    if(total < 0.5) return setError('Compra mínima de R$0,50 para finalizar no checkout.');
    if(!customer.name || !customer.email || !customer.whatsapp) return setError('Preencha nome, email e WhatsApp.');

    try{
      setLoading(true);
      const res = await fetch('/api/create-preference',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items: cart.map(item => ({id: item.id, qty: 1})), customer})});
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Erro ao criar pagamento.');
      localStorage.setItem('imperio_last_order', JSON.stringify({cart,customer,total}));
      window.location.href = data.init_point;
    }catch(err){
      setError(err.message || 'Erro inesperado.');
    }finally{
      setLoading(false);
    }
  }

  return <main className="checkoutPage">
    <a className="checkoutLogo" href="/">♛ IMPÉRIO <span>DIGITAL</span></a>
    <section className="checkoutShell">
      <form className="checkoutForm" onSubmit={finishCheckout}>
        <p className="red">CHECKOUT SEGURO</p>
        <h1>Finalize sua compra</h1>
        <span className="checkoutLead">Preencha seus dados e pague com Pix ou cartão pelo Mercado Pago.</span>
        <label>Nome completo<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Seu nome"/></label>
        <label>Email<input type="email" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})} placeholder="seuemail@exemplo.com"/></label>
        <label>WhatsApp<input value={customer.whatsapp} onChange={e=>setCustomer({...customer,whatsapp:e.target.value})} placeholder="(11) 99999-9999"/></label>
        {error && <div className="checkoutError">{error}</div>}
        <button disabled={loading}>{loading ? 'Gerando pagamento...' : 'Pagar com Mercado Pago'}</button>
        <small>🔒 Pagamento protegido. Você será redirecionado ao ambiente seguro do Mercado Pago.</small>
      </form>
      <aside className="checkoutSummary">
        <h2>Resumo do pedido</h2>
        {cart.length === 0 ? <p>Seu carrinho está vazio.</p> : cart.map(item=><div className="summaryItem" key={item.id}><img src={item.img} alt={item.title}/><div><b>{item.title}</b><span>{item.price}</span></div></div>)}
        <div className="summaryTotal"><span>Total</span><strong>R$ {total.toFixed(2).replace('.',',')}</strong></div>
        <em>Compra mínima: R$0,50</em>
        <a href="/">Continuar comprando</a>
      </aside>
    </section>
  </main>
}

function ThankYouPage(){
  const [order,setOrder] = useState(null);
  React.useEffect(()=>{setOrder(JSON.parse(localStorage.getItem('imperio_last_order') || 'null'))},[]);

  const ebookLink = '/GANHE-SEUS-PRIMEIROS-Rdollar10-ONLINE-HOJE.pdf';

  return <main className="thanksPage">
    <section>
      <div>✅</div>
      <p className="red">COMPRA APROVADA</p>
      <h1>Seu ebook está liberado!</h1>
      <span>Obrigado pela compra. Clique no botão abaixo para baixar seu ebook agora.</span>

      <div className="thanksProducts">
        <article>
          <img src="/vendas-digitais.png" alt="Ganhe Seus Primeiros R$10 Online Hoje"/>
          <b>Ganhe Seus Primeiros R$10 Online Hoje</b>
          <a href={ebookLink} download>Baixar Ebook Agora</a>
        </article>
      </div>

      <a className="thanksBtn" href={ebookLink} download>📥 Baixar meu ebook</a>
      <a className="thanksBtn" href={wa()} target="_blank" rel="noreferrer">💬 Falar com suporte</a>
      <a className="thanksBtn" href="/">Voltar para o site</a>
    </section>
  </main>
}


function CartDrawer({cart,open,setOpen,removeFromCart}){
  const total = cart.reduce((sum,p)=>sum + priceNumber(p.price),0);
  return <div className={open ? "cartOverlay open" : "cartOverlay"}>
    <div className="cartBackdrop" onClick={()=>setOpen(false)}></div>
    <aside className="cartDrawer">
      <div className="cartHeader">
        <div>
          <p>Seu carrinho</p>
          <h2>{cart.length} produto{cart.length === 1 ? '' : 's'}</h2>
        </div>
        <button onClick={()=>setOpen(false)}>×</button>
      </div>

      {cart.length === 0 ? <div className="cartEmpty">
        <b>Seu carrinho está vazio.</b>
        <span>Escolha um ebook e adicione ao carrinho.</span>
        <a href="#catalogo" onClick={()=>setOpen(false)}>Ver produtos</a>
      </div> : <div className="cartItems">
        {cart.map(item=><div className="cartItem" key={item.id}>
          <img src={item.img} alt={item.title}/>
          <div>
            <b>{item.title}</b>
            <span>{item.price}</span>
          </div>
          <button onClick={()=>removeFromCart(item.id)}>Remover</button>
        </div>)}
      </div>}

      <div className="cartFooter">
        <div><span>Total aproximado</span><strong>R$ {total.toFixed(2).replace('.',',')}</strong></div>
        {cart.length > 0 && <button className="checkoutNow" onClick={()=>{localStorage.setItem('imperio_cart', JSON.stringify(cart)); window.location.href='/checkout';}}>Finalizar compra</button>}
        <small>Pagamento único pelo Mercado Pago. Pix e cartão no checkout seguro.</small>
      </div>
    </aside>
  </div>
}

function FloatingButtons(){return <><a className="floatZap" href={wa()} target="_blank" rel="noreferrer">💬</a><div className="mobile"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#ebook050">Comprar</a></div></>}

createRoot(document.getElementById('root')).render(<App/>);
