import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
  { id:1, title:'Assistência Técnica de Celular', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Mais vendido', img:'/assistencia-celular.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/PjRqOei', desc:'Guia completo para montar e lucrar com assistência técnica.' },
  { id:2, title:'Barbearia', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Top vendas', img:'/barbearia.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/ynz7UXJ', desc:'Do planejamento à gestão da sua barbearia de sucesso.' },
  { id:3, title:'Vendas Digitais', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Digital', img:'/vendas-digitais.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/tAqlMeI', desc:'Estratégias práticas para vender todos os dias na internet.' },
  { id:4, title:'Reeducação Alimentar', category:'Saúde e Bem-estar', intent:'Quero cuidar da saúde', tag:'Saúde', img:'/reeducacao-alimentar.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/0SAithY', desc:'Mude seus hábitos e transforme sua saúde de verdade.' },
  { id:5, title:'Vestibular', category:'Educação', intent:'Quero estudar melhor', tag:'Educação', img:'/vestibular.png', price:'R$ 9,00', oldPrice:'R$ 27,00', link:'https://pay.kiwify.com.br/sOYzBc2', desc:'Prepare-se com estratégia e conquiste sua aprovação.' },
  { id:6, title:'Estética', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Beleza', img:'/estetica.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/FptQKV2', desc:'Tudo sobre estética profissional e gestão do seu negócio.' },
  { id:7, title:'Corte e Costura', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Criativo', img:'/corte-costura.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/uxqfR0Z', desc:'Aprenda, crie e lucre com moda em casa.' },
  { id:8, title:'Confeitaria', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Doce renda', img:'/confeitaria.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/sjoOT4z', desc:'Transforme doces em um negócio lucrativo do zero.' },
  { id:9, title:'Pedras Preciosas', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Premium', img:'/pedras-preciosas.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/DZxpL4y', desc:'Comece no mundo das gemas, joias e oportunidades.' },
  { id:10, title:'Ferro Velho', category:'Negócios e Profissões', intent:'Quero ganhar dinheiro', tag:'Sustentável', img:'/ferro-velho.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/CFNOj2I', desc:'Monte um ferro velho lucrativo e atenda empresas.' },
  { id:11, title:'Negócio Organizado', category:'Organização e Produtividade', intent:'Quero organizar minha rotina', tag:'Organização', img:'/negocio-organizado.png', price:'R$ 9,00', oldPrice:'R$ 29,00', link:'https://pay.kiwify.com.br/fIg2Fdd', desc:'Organize sua semana, prioridades e rotina com clareza.' },
  { id:12, title:'Tarefas Diárias', category:'Organização e Produtividade', intent:'Quero organizar minha rotina', tag:'Foco', img:'/tarefas-diarias.png', price:'R$ 13,00', oldPrice:'R$ 29,00', link:'https://pay.kiwify.com.br/nmHBzko', desc:'Pare de apagar incêndios e organize seu dia.' },
  { id:13, title:'Guia da Sobriedade', category:'Transformação Pessoal', intent:'Quero cuidar da saúde', tag:'Transformação', img:'/alcoolismo.png', price:'R$ 9,00', oldPrice:'R$ 27,00', link:'https://pay.kiwify.com.br/hlaRkGV', desc:'10 passos práticos para buscar uma vida sóbria.' },
  { id:14, title:'Cultivo Saudável', category:'Nicho Específico', intent:'Nicho específico', tag:'Especial', img:'/cannabis.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/riPNbK0', desc:'Guia visual sobre cultivo saudável e responsável.', hiddenHome:true }
];

const categories = [
  { name:'Negócios e Profissões', icon:'💼' },
  { name:'Educação', icon:'🎓' },
  { name:'Saúde e Bem-estar', icon:'💚' },
  { name:'Organização e Produtividade', icon:'📋' },
  { name:'Transformação Pessoal', icon:'👤' },
  { name:'Nicho Específico', icon:'🌿' }
];

const intents = ['Todos','Quero ganhar dinheiro','Quero cuidar da saúde','Quero estudar melhor','Quero organizar minha rotina','Nicho específico'];
const bestSellerIds = [1,2,3,4];

function wa(product){
  const txt = product ? `Olá! Tenho interesse no ebook ${product.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

function App(){
  const [intent, setIntent] = useState('Todos');
  const [search, setSearch] = useState('');
  const bestSellers = products.filter(p => bestSellerIds.includes(p.id));

  const filtered = useMemo(() => products.filter(p => {
    const intentMatch = intent === 'Todos' ? !p.hiddenHome : p.intent === intent;
    const searchMatch = `${p.title} ${p.category} ${p.intent} ${p.tag}`.toLowerCase().includes(search.toLowerCase());
    return intentMatch && searchMatch;
  }), [intent, search]);

  return (
    <main className="site">
      <Header search={search} setSearch={setSearch} />
      <Hero bestSellers={bestSellers} />
      <Categories />
      <Featured bestSellers={bestSellers} />
      <IntentFilters intent={intent} setIntent={setIntent} />
      <Catalog products={filtered} />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <MobileBar />
    </main>
  );
}

function Header({ search, setSearch }){
  return (
    <header className="topbar">
      <a className="brand" href="#top"><span className="brandIcon">♛</span><span><b>IMPÉRIO</b><small>DIGITAL</small></span></a>
      <nav className="nav">
        <a className="active" href="#top">Início</a><a href="#categorias">Categorias</a><a href="#catalogo">Todos os Ebooks</a><a href="#sobre">Sobre Nós</a><a href="#faq">Perguntas</a><a href={wa()} target="_blank" rel="noreferrer">Contato</a>
      </nav>
      <div className="topActions">
        <label className="searchBox"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ebooks" /></label>
        <span className="cart">▢<i>0</i></span>
        <a className="accountBtn" href="#catalogo">👤 Meus Ebooks</a>
      </div>
    </header>
  );
}

function Hero({ bestSellers }){
  return (
    <section id="top" className="heroExact">
      <div className="heroCopy">
        <p className="kicker">CONHECIMENTO QUE TRANSFORMA ♛</p>
        <h1>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h1>
        <p className="heroLead">Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida com mais conhecimento e autonomia.</p>
        <div className="heroTrust"><span>🛡️<b>Compra 100%<br/>Segura</b></span><span>☁️<b>Download<br/>Imediato</b></span><span>🏅<b>Conteúdo de<br/>Qualidade</b></span><span>🎧<b>Suporte<br/>Dedicado</b></span></div>
        <a href="#catalogo" className="primaryBtn">🛒 VER TODOS OS EBOOKS</a>
      </div>
      <div className="heroArt">
        <div className="tabletExact">
          <div className="tabletHeader"><span>☰</span><b>Império Digital</b><span>⌕</span></div>
          <div className="tabletProducts">{bestSellers.concat(products.filter(p => !p.hiddenHome).slice(4,9)).map(p => <img key={p.id} src={p.img} alt={p.title} />)}</div>
        </div>
        <div className="books"></div>
        <div className="mugExact"><span>♛</span><b>IMPÉRIO</b><small>DIGITAL</small></div>
      </div>
      <PhoneMock product={bestSellers[0]} />
    </section>
  );
}

function Categories(){
  return <section id="categorias" className="categoriesExact"><h2>NAVEGUE POR <span>CATEGORIAS</span></h2><div className="categoryRow">{categories.map(c => <a key={c.name} href="#catalogo" className="catCard"><b>{c.icon}</b><span>{c.name}</span></a>)}</div></section>;
}

function Featured({ bestSellers }){
  const featured = bestSellers.concat(products.filter(p => [5,6].includes(p.id)));
  return (
    <section id="mais-vendidos" className="shelfWrap">
      <button className="circleArrow left">‹</button>
      <div className="shelfMain">
        <p className="redLabel">MAIS VENDIDOS</p><h2>EBOOKS EM DESTAQUE</h2><p className="sectionSub">Os favoritos de quem quer aprender e mudar de vida</p>
        <div className="featuredCards">{featured.map(p => <SmallProduct key={p.id} product={p} />)}</div>
        <a className="outlineBtn" href="#catalogo">📦 VER TODOS OS EBOOKS</a>
      </div>
      <TrustSide />
      <button className="circleArrow right">›</button>
    </section>
  );
}

function SmallProduct({ product }){
  return <article className="smallCard"><img src={product.img} alt={product.title} /><div><h3>{product.title}</h3><p>{product.desc}</p><small>De {product.oldPrice}</small><strong>{product.price}</strong><a href={product.link} target="_blank" rel="noreferrer">QUERO ESTE</a></div></article>;
}

function TrustSide(){
  return <aside className="trustSide"><TrustItem icon="🛡️" title="Compra 100% Segura" text="Seus dados protegidos pela Kiwify." /><TrustItem icon="☁️" title="Acesso Imediato" text="Após a confirmação, você recebe o acesso." /><TrustItem icon="🏅" title="Conteúdo Atualizado" text="Ebooks completos, práticos e diretos." /><TrustItem icon="🎧" title="Suporte Dedicado" text="Atendimento rápido pelo WhatsApp." /></aside>;
}

function TrustItem({ icon, title, text }){
  return <div className="trustItem"><span>{icon}</span><div><b>{title}</b><p>{text}</p></div></div>;
}

function PhoneMock({ product }) {
  return <aside className="phoneExact"><div className="phoneInner"><div className="phoneNav"><span>☰</span><b>♛ IMPÉRIO <small>DIGITAL</small></b><span>▢</span></div><p className="phoneKicker">CONHECIMENTO QUE TRANSFORMA</p><h2>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h2><p>Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida.</p><ul><li>🛡️ Compra 100% Segura</li><li>☁️ Download Imediato</li><li>🏅 Conteúdo de Qualidade</li><li>🎧 Suporte Dedicado</li></ul><a className="phoneButton" href="#catalogo">🛒 VER TODOS OS EBOOKS</a><div className="phoneTitle"><b>CATEGORIAS</b><a href="#categorias">Ver todas</a></div><div className="phoneCats"><span>💼<br/>Negócios</span><span>🎓<br/>Educação</span><span>💚<br/>Saúde</span></div><div className="phoneTitle"><b>MAIS VENDIDOS</b></div><div className="phoneProduct"><img src={product.img} alt={product.title}/><div><b>{product.title}</b><small>{product.price}</small><a href={product.link} target="_blank" rel="noreferrer">QUERO ESTE</a></div></div><div className="dots"><i></i><i></i><i></i><i></i></div></div></aside>;
}

function IntentFilters({ intent, setIntent }){
  const icons = ['✨','💼','💚','🎓','📋','🌿'];
  return <section id="intencoes" className="intentWrap"><h2>ESCOLHA PELO SEU <span>OBJETIVO</span></h2><div className="intentRow">{intents.map((item, i) => <button key={item} onClick={() => setIntent(item)} className={intent === item ? 'selected' : ''}><b>{icons[i]}</b>{item}</button>)}</div></section>;
}

function Catalog({ products }){
  return <section id="catalogo" className="catalogExact"><p className="redLabel">CATÁLOGO COMPLETO</p><h2>Todos os Ebooks</h2><p className="sectionSub">Escolha o produto ideal para seu momento</p><div className="catalogGrid">{products.map(p => <BigProduct key={p.id} product={p} />)}</div></section>;
}

function BigProduct({ product }){
  return <article className="bigCard"><div className="bigImage"><img src={product.img} alt={product.title}/><span>{product.tag}</span></div><div className="bigBody"><h3>{product.title}</h3><p>{product.desc}</p><div className="priceBox"><small>De {product.oldPrice}</small><strong>Por {product.price}</strong><em>Oferta de lançamento</em></div><a className="buyNow" href={product.link} target="_blank" rel="noreferrer">COMPRAR AGORA</a><a className="whats" href={wa(product)} target="_blank" rel="noreferrer">Tirar dúvida no WhatsApp</a></div></article>;
}

function Testimonials(){
  return <section className="testExact"><h2>O QUE NOSSOS <span>CLIENTES</span> DIZEM</h2><div className="testRow"><blockquote><b>Carlos M.</b><span>★★★★★</span><p>“O ebook de Barbearia mudou meu negócio! Conteúdo prático e direto ao ponto.”</p></blockquote><blockquote><b>Juliana S.</b><span>★★★★★</span><p>“O de Reeducação Alimentar me ajudou a transformar minha vida.”</p></blockquote><blockquote><b>Rafael T.</b><span>★★★★★</span><p>“Vendas Digitais abriu minha mente para novas oportunidades.”</p></blockquote></div></section>;
}

function FinalCTA(){
  return <section className="finalExact" id="sobre"><div className="finalIcon">♛</div><div><h2>INVISTA EM VOCÊ. COLHA RESULTADOS!</h2><p>Conhecimento é o único investimento que sempre gera retorno.</p></div><a href="#catalogo">COMECE AGORA →</a></section>;
}

function Footer(){
  return <footer id="faq" className="footerExact"><span>🛒 Pagamento Seguro</span><span>🛡️ Satisfação Garantida</span><span>✅ Conteúdo Original</span><span>🎧 Acesso Vitalício</span></footer>;
}

function MobileBar(){
  return <div className="mobileSticky"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#catalogo">Ver Ebooks</a></div>;
}

createRoot(document.getElementById('root')).render(<App />);
