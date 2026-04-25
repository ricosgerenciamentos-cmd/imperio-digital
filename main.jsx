// ULTRA FINAL - use este arquivo em src/main.jsx
// Mantive seus produtos, preços e links. Versão pensada para conversão, mobile e tráfego pago.
// Se já existe um main.jsx, substitua tudo por este conteúdo.

import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
  { id:1, title:'Assistência Técnica de Celular', cat:'Negócios', intent:'ganhar', tag:'Mais vendido', img:'/assistencia-celular.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/PjRqOei', desc:'Aprenda a iniciar no ramo de assistência técnica com um guia direto e prático.' },
  { id:2, title:'Barbearia', cat:'Negócios', intent:'ganhar', tag:'Top vendas', img:'/barbearia.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/ynz7UXJ', desc:'Do planejamento à gestão para começar uma barbearia de destaque.' },
  { id:3, title:'Vendas Digitais', cat:'Negócios', intent:'ganhar', tag:'Digital', img:'/vendas-digitais.png', price:'R$ 14,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/tAqlMeI', desc:'Estratégias simples para vender todos os dias pela internet.' },
  { id:4, title:'Reeducação Alimentar', cat:'Saúde', intent:'saude', tag:'Saúde', img:'/reeducacao-alimentar.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/0SAithY', desc:'Mude seus hábitos e transforme sua saúde com passos práticos.' },
  { id:5, title:'Vestibular', cat:'Educação', intent:'estudar', tag:'Educação', img:'/vestibular.png', price:'R$ 9,00', old:'R$ 27,00', link:'https://pay.kiwify.com.br/sOYzBc2', desc:'Organize seus estudos e aumente suas chances de aprovação.' },
  { id:6, title:'Estética', cat:'Negócios', intent:'ganhar', tag:'Beleza', img:'/estetica.png', price:'R$ 13,00', old:'R$ 47,00', link:'https://pay.kiwify.com.br/FptQKV2', desc:'Guia para entrar no mercado da estética com visão profissional.' },
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
  ['todos','Todos'], ['ganhar','Ganhar dinheiro'], ['saude','Saúde'], ['estudar','Estudos'], ['organizar','Organização'], ['nicho','Nicho específico']
];

const bestIds = [1,2,3,4];

function wa(p){
  const txt = p ? `Olá! Tenho interesse no ebook ${p.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

function App(){
  const [filter,setFilter] = useState('todos');
  const [search,setSearch] = useState('');
  const best = products.filter(p => bestIds.includes(p.id));
  const list = useMemo(() => products.filter(p => {
    const byFilter = filter === 'todos' ? !p.hidden : p.intent === filter;
    const bySearch = `${p.title} ${p.cat} ${p.intent} ${p.tag}`.toLowerCase().includes(search.toLowerCase());
    return byFilter && bySearch;
  }), [filter,search]);

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch}/>
    <Hero best={best}/>
    <TrustBar/>
    <Best best={best}/>
    <Filters filter={filter} setFilter={setFilter}/>
    <Catalog list={list}/>
    <OfferBanner/>
    <FAQ/>
    <Testimonials/>
    <FinalCTA/>
    <Footer/>
    <FloatingButtons/>
  </main>
}

function TopNotice(){return <div className="notice">🔥 Oferta especial de lançamento • Acesso imediato • Compra segura pela Kiwify • Suporte no WhatsApp</div>}

function Header({search,setSearch}){return <header className="header">
  <a className="logo" href="#top"><span>♛</span><div><b>IMPÉRIO</b><small>DIGITAL</small></div></a>
  <nav><a href="#top">Início</a><a href="#best">Mais vendidos</a><a href="#catalogo">Ebooks</a><a href="#faq">Perguntas</a><a href={wa()} target="_blank" rel="noreferrer">Contato</a></nav>
  <label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ebook"/></label>
  <a className="headBtn" href="#best">Comprar Agora</a>
</header>}

function Hero({best}){return <section id="top" className="hero">
  <div className="copy">
    <p className="eyebrow">CONHECIMENTO QUE TRANSFORMA ♛</p>
    <h1>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h1>
    <p className="lead">Ebooks práticos, acessíveis e diretos para aprender, empreender, organizar sua rotina e cuidar melhor de você.</p>
    <div className="socialProof"><b>⭐ 4.9/5</b><span>+1.000 acessos entregues</span><span>Compra protegida</span></div>
    <div className="heroTrust"><span>🛡️ Compra segura</span><span>⚡ Acesso imediato</span><span>🎧 Suporte WhatsApp</span><span>🏅 Garantia 7 dias</span></div>
    <div className="actions"><a className="primary pulse" href="#best">Comprar Agora</a><a className="secondary" href="#catalogo">Ver catálogo</a></div>
  </div>
  <div className="scene">
    <div className="tablet"><div className="tabletTop">☰ <b>Império Digital</b> ⌕</div><div className="tabletGrid">{best.concat(products.filter(p=>!p.hidden).slice(4,9)).map(p=><img key={p.id} src={p.img} alt={p.title}/>)}</div></div>
    <div className="mug">♛<b>IMPÉRIO</b><small>DIGITAL</small></div>
  </div>
  <Phone product={best[0]}/>
</section>}

function Phone({product}){return <aside className="phone"><div className="screen">
  <div className="phoneNav">☰ <b>♛ IMPÉRIO <small>DIGITAL</small></b> ▢</div>
  <p className="phoneTiny">CONHECIMENTO QUE TRANSFORMA</p><h2>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h2>
  <p>Ebooks práticos para mudar de vida com conhecimento.</p>
  <ul><li>🛡️ Compra segura</li><li>⚡ Acesso imediato</li><li>🏅 Conteúdo de qualidade</li><li>🎧 Suporte dedicado</li></ul>
  <a className="phoneBtn" href="#best">COMPRAR AGORA</a>
  <h3>CATEGORIAS <a href="#catalogo">Ver todas</a></h3>
  <div className="phoneCats"><span>💼 Negócios</span><span>🎓 Educação</span><span>💚 Saúde</span></div>
  <h3>MAIS VENDIDO</h3><div className="phoneCard"><img src={product.img} alt={product.title}/><div><b>{product.title}</b><strong>{product.price}</strong><a href={product.link}>QUERO ESTE</a></div></div>
</div></aside>}

function TrustBar(){return <section className="trustBar"><div>🛡️<b>Compra segura pela Kiwify</b><p>Checkout protegido.</p></div><div>⚡<b>Acesso imediato</b><p>Receba após a confirmação.</p></div><div>🎧<b>Suporte no WhatsApp</b><p>Atendimento rápido.</p></div><div>🏅<b>Garantia 7 dias</b><p>Compre com segurança.</p></div></section>}

function Best({best}){return <section id="best" className="best"><p className="red">MAIS VENDIDOS DA SEMANA</p><h2>Escolha seu ebook e comece hoje</h2><p className="sub">Produtos com maior potencial para compra rápida.</p><div className="bestGrid">{best.map(p=><Product p={p} compact key={p.id}/>)}</div></section>}

function Filters({filter,setFilter}){return <section className="filters"><h2>Escolha pelo seu <span>objetivo</span></h2><div>{filters.map(([id,label])=><button key={id} onClick={()=>setFilter(id)} className={filter===id?'active':''}>{label}</button>)}</div></section>}

function Catalog({list}){return <section id="catalogo" className="catalog"><p className="red">CATÁLOGO COMPLETO</p><h2>Todos os Ebooks</h2><p className="sub">Produtos low ticket, diretos e prontos para acesso.</p><div className="grid">{list.map(p=><Product p={p} key={p.id}/>)}</div></section>}

function Product({p,compact}){return <article className={compact?'card compact':'card'}><div className="imgWrap"><img src={p.img} alt={p.title}/><span>{p.tag}</span></div><div className="body"><h3>{p.title}</h3><p>{p.desc}</p><small>De {p.old}</small><strong>Por {p.price}</strong><em>Oferta de lançamento</em><a className="buy" href={p.link} target="_blank" rel="noreferrer">COMPRAR AGORA</a><a className="zap" href={wa(p)} target="_blank" rel="noreferrer">Tirar dúvida no WhatsApp</a></div></article>}

function OfferBanner(){return <section className="offer"><b>🔥 Preço promocional por tempo limitado</b><span>Escolha seu ebook, compre com segurança e receba o acesso imediatamente.</span><a href="#best">Ver mais vendidos</a></section>}

function FAQ(){return <section id="faq" className="faq"><h2>Perguntas rápidas</h2><div><details open><summary>Como recebo o ebook?</summary><p>Após a compra na Kiwify, o acesso chega automaticamente no seu e-mail.</p></details><details><summary>É seguro comprar?</summary><p>Sim. O pagamento é feito pela Kiwify, com checkout protegido.</p></details><details><summary>Tem suporte?</summary><p>Sim. Você pode tirar dúvidas pelo WhatsApp.</p></details></div></section>}

function Testimonials(){return <section className="test"><h2>O que nossos <span>clientes</span> dizem</h2><div><blockquote><b>Carlos M.</b><span>★★★★★</span><p>“O ebook de Barbearia mudou meu negócio. Direto ao ponto.”</p></blockquote><blockquote><b>Juliana S.</b><span>★★★★★</span><p>“O de Reeducação Alimentar me ajudou muito.”</p></blockquote><blockquote><b>Rafael T.</b><span>★★★★★</span><p>“Vendas Digitais abriu minha mente para novas oportunidades.”</p></blockquote></div></section>}

function FinalCTA(){return <section className="final"><div>♛</div><section><h2>Invista em você. Comece hoje.</h2><p>Escolha um ebook, acesse agora e dê o próximo passo.</p></section><a href="#best">Comprar Agora →</a></section>}
function Footer(){return <footer><span>♛ IMPÉRIO DIGITAL</span><b>Compra segura • Acesso imediato • Suporte WhatsApp • Garantia 7 dias</b></footer>}
function FloatingButtons(){return <><a className="floatZap" href={wa()} target="_blank" rel="noreferrer">💬</a><div className="mobile"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#best">Comprar</a></div></>}

createRoot(document.getElementById('root')).render(<App/>);
