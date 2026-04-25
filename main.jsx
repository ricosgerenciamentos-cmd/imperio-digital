import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
  { id:1, title:'Assistência Técnica de Celular', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Mais lucrativo', img:'/assistencia-celular.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/PjRqOei', desc:'Guia completo para montar e lucrar com assistência técnica.' },
  { id:2, title:'Barbearia de Destaque', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Mais vendido', img:'/barbearia.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/ynz7UXJ', desc:'Do planejamento à gestão da sua barbearia de sucesso.' },
  { id:3, title:'Vendas Digitais', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Digital', img:'/vendas-digitais.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/tAqlMeI', desc:'Estratégias práticas para vender todos os dias na internet.' },
  { id:4, title:'Reeducação Alimentar', intent:'Quero cuidar da saúde', category:'Saúde e Bem-estar', tag:'Saúde', img:'/reeducacao-alimentar.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/0SAithY', desc:'Mude seus hábitos e transforme sua saúde de verdade.' },
  { id:5, title:'Passe no Vestibular', intent:'Quero estudar melhor', category:'Educação', tag:'Educação', img:'/vestibular.png', price:'R$ 9,00', oldPrice:'R$ 27,00', link:'https://pay.kiwify.com.br/sOYzBc2', desc:'Prepare-se com estratégia e conquiste sua aprovação.' },
  { id:6, title:'Império da Estética', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Beleza', img:'/estetica.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/FptQKV2', desc:'Tudo sobre estética profissional e gestão do seu negócio.' },
  { id:7, title:'Costura Lucrativa', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Criativo', img:'/corte-costura.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/uxqfR0Z', desc:'Aprenda, crie e lucre com moda em casa.' },
  { id:8, title:'Império dos Doces', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Doce renda', img:'/confeitaria.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/sjoOT4z', desc:'Transforme doces em um negócio lucrativo do zero.' },
  { id:9, title:'Pedras Preciosas', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Premium', img:'/pedras-preciosas.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/DZxpL4y', desc:'Comece no mundo das gemas, joias e oportunidades.' },
  { id:10, title:'Império da Sucata', intent:'Quero ganhar dinheiro', category:'Negócios e Profissões', tag:'Sustentável', img:'/ferro-velho.png', price:'R$ 14,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/CFNOj2I', desc:'Monte um ferro velho lucrativo e atenda empresas.' },
  { id:11, title:'Negócio Organizado', intent:'Quero organizar minha rotina', category:'Organização e Produtividade', tag:'Organização', img:'/negocio-organizado.png', price:'R$ 9,00', oldPrice:'R$ 29,00', link:'https://pay.kiwify.com.br/fIg2Fdd', desc:'Organize sua semana, prioridades e rotina com clareza.' },
  { id:12, title:'Tarefas Diárias', intent:'Quero organizar minha rotina', category:'Organização e Produtividade', tag:'Foco', img:'/tarefas-diarias.png', price:'R$ 13,00', oldPrice:'R$ 29,00', link:'https://pay.kiwify.com.br/nmHBzko', desc:'Pare de apagar incêndios e organize seu dia.' },
  { id:13, title:'Guia da Sobriedade', intent:'Quero cuidar da saúde', category:'Transformação Pessoal', tag:'Transformação', img:'/alcoolismo.png', price:'R$ 9,00', oldPrice:'R$ 27,00', link:'https://pay.kiwify.com.br/hlaRkGV', desc:'10 passos práticos para buscar uma vida sóbria.' },
  { id:14, title:'Cultivo Saudável', intent:'Nicho específico', category:'Nicho Específico', tag:'Especial', img:'/cannabis.png', price:'R$ 13,00', oldPrice:'R$ 47,00', link:'https://pay.kiwify.com.br/riPNbK0', desc:'Guia visual sobre cultivo saudável e responsável.', hiddenHome:true }
];

const intents = ['Todos','Quero ganhar dinheiro','Quero cuidar da saúde','Quero estudar melhor','Quero organizar minha rotina','Nicho específico'];
const bestSellerIds = [1,2,3,4];

function wa(product){
  const txt = product ? `Olá! Tenho interesse no ebook ${product.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

function App(){
  const [intent,setIntent]=useState('Todos');
  const [q,setQ]=useState('');
  const filtered=useMemo(()=>products.filter(p=>{
    const intentMatch = intent==='Todos' ? !p.hiddenHome : p.intent===intent;
    const searchMatch = `${p.title} ${p.category} ${p.tag} ${p.intent}`.toLowerCase().includes(q.toLowerCase());
    return intentMatch && searchMatch;
  }),[intent,q]);
  const top=products.filter(p=>bestSellerIds.includes(p.id));

  return <div className='site'>
    <Header q={q} setQ={setQ}/>
    <Hero top={top}/>
    <TrustProof/>
    <BestSellers list={top}/>
    <IntentFilters intent={intent} setIntent={setIntent}/>
    <Products title='CATÁLOGO COMPLETO' subtitle='Escolha pelo objetivo que mais combina com você' list={filtered}/>
    <Benefits/>
    <Testimonials/>
    <FinalCTA/>
    <Footer/>
    <MobileBar/>
  </div>
}

function Header({q,setQ}){return <header className='header'>
  <a href='#top' className='logo'><span>♛</span><b>IMPÉRIO</b><small>DIGITAL</small></a>
  <nav><a href='#top'>Início</a><a href='#mais-vendidos'>Mais vendidos</a><a href='#intencoes'>Objetivos</a><a href='#catalogo'>Todos os Ebooks</a><a href={wa()} target='_blank' rel='noreferrer'>Contato</a></nav>
  <div className='search'><input value={q} onChange={e=>setQ(e.target.value)} placeholder='Buscar ebooks...'/></div>
  <a className='btn head' href='#catalogo'>Ver Ebooks</a>
</header>}

function Hero({top}){return <section id='top' className='hero'>
  <div className='heroText'>
    <p className='eyebrow'>OFERTA DE LANÇAMENTO ♛</p>
    <h1>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h1>
    <p className='lead'>Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida com mais conhecimento e autonomia.</p>
    <div className='trust'><span>🛡️ Compra segura pela Kiwify</span><span>☁️ Acesso imediato</span><span>🎧 Suporte no WhatsApp</span><span>🏅 Garantia 7 dias</span></div>
    <a className='btn big' href='#mais-vendidos'>🛒 VER OFERTAS MAIS VENDIDAS</a>
  </div>
  <div className='heroVisual'>
    <div className='tablet'><div className='tabletTop'>☰ <b>Império Digital</b> 🔍</div><div className='tabletGrid'>{top.concat(products.filter(p=>!p.hiddenHome).slice(4,9)).map(p=><img key={p.id} src={p.img} alt={p.title}/>)}</div></div>
    <div className='mug'>♛<br/><b>IMPÉRIO</b><small>DIGITAL</small></div>
  </div>
  <Phone top={top}/>
</section>}

function Phone({top}){return <aside className='phoneMock'>
  <div className='phoneScreen'>
    <div className='phoneHead'><span>☰</span><b>♛ IMPÉRIO <small>DIGITAL</small></b><span>🛒</span></div>
    <p className='eyebrow'>OFERTA DE LANÇAMENTO</p>
    <h2>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h2>
    <p>Ebooks práticos para aprender, empreender e mudar de vida.</p>
    <ul><li>🛡️ Compra segura pela Kiwify</li><li>☁️ Acesso imediato</li><li>🎧 Suporte no WhatsApp</li><li>🏅 Garantia 7 dias</li></ul>
    <a href='#mais-vendidos' className='btn phoneBtn'>VER MAIS VENDIDOS</a>
    <h3>OBJETIVOS <a href='#intencoes'>Ver todos</a></h3>
    <div className='phoneCats'><span>💼<br/>Ganhar dinheiro</span><span>💚<br/>Saúde</span><span>📋<br/>Organização</span></div>
    <h3>MAIS VENDIDO</h3>
    <div className='miniCard'><img src={top[0].img} alt={top[0].title}/><div><b>{top[0].title}</b><small>De {top[0].oldPrice}</small><p>Por {top[0].price}</p><a href={top[0].link} target='_blank' rel='noreferrer'>QUERO ESTE</a></div></div>
  </div>
</aside>}

function TrustProof(){return <section className='proofBar'>
  <div><b>🛡️ Compra segura pela Kiwify</b><p>Pagamento protegido e checkout profissional.</p></div>
  <div><b>☁️ Acesso imediato</b><p>Receba seu ebook logo após a confirmação.</p></div>
  <div><b>🎧 Suporte no WhatsApp</b><p>Atendimento rápido para dúvidas da compra.</p></div>
  <div><b>🏅 Garantia 7 dias</b><p>Mais confiança para comprar sem medo.</p></div>
</section>}

function BestSellers({list}){return <section id='mais-vendidos' className='bestSellers'>
  <p className='red'>SELEÇÃO PRINCIPAL</p><h2>MAIS VENDIDOS</h2><p className='sub'>Os 4 produtos mais fortes para começar agora</p>
  <div className='productGrid bestGrid'>{list.map(p=><ProductCard key={p.id} p={p} featured />)}</div>
</section>}

function IntentFilters({intent,setIntent}){const icons=['✨','💼','💚','🎓','📋','🌿'];return <section id='intencoes' className='catSec'><h2>ESCOLHA PELO SEU <span>OBJETIVO</span></h2><div className='catGrid intentGrid'>{intents.map((c,i)=><button key={c} onClick={()=>setIntent(c)} className={intent===c?'active':''}><b>{icons[i]}</b><span>{c}</span></button>)}</div></section>}

function ProductCard({p}){return <article className='card'><div className='pic'><img src={p.img} alt={p.title}/><span>{p.tag}</span></div><div className='cardBody'><h3>{p.title}</h3><p>{p.desc}</p><div className='priceBox'><small>De {p.oldPrice}</small><strong>Por {p.price}</strong><em>Oferta de lançamento</em></div><a className='buy' href={p.link} target='_blank' rel='noreferrer'>COMPRAR AGORA</a><a className='zap' href={wa(p)} target='_blank' rel='noreferrer'>Tirar dúvida no WhatsApp</a></div></article>}

function Products({title,subtitle,list}){return <section id='catalogo' className='products'><p className='red'>TODOS OS PRODUTOS</p><h2>{title}</h2><p className='sub'>{subtitle}</p><div className='productGrid'>{list.map(p=><ProductCard key={p.id} p={p}/>)}</div></section>}

function Benefits(){return <section className='benefits'><div><b>🛡️ Compra 100% Segura</b><p>Seus dados protegidos pela Kiwify.</p></div><div><b>☁️ Acesso Imediato</b><p>Após a confirmação, você recebe o acesso na hora.</p></div><div><b>🏅 Garantia 7 Dias</b><p>Mais segurança para comprar com tranquilidade.</p></div><div><b>🎧 Suporte Dedicado</b><p>Atendimento rápido pelo WhatsApp.</p></div></section>}

function Testimonials(){return <section className='testimonials'><h2>O QUE NOSSOS <span>CLIENTES</span> DIZEM</h2><div><blockquote>⭐⭐⭐⭐⭐<br/><b>Carlos M.</b><p>O ebook de Barbearia mudou meu negócio! Conteúdo prático e direto ao ponto.</p></blockquote><blockquote>⭐⭐⭐⭐⭐<br/><b>Juliana S.</b><p>O de Reeducação Alimentar me ajudou a transformar minha vida.</p></blockquote><blockquote>⭐⭐⭐⭐⭐<br/><b>Rafael T.</b><p>Vendas Digitais abriu minha mente para novas oportunidades.</p></blockquote></div></section>}

function FinalCTA(){return <section className='final'><div className='crown'>♛</div><div><h2>INVISTA EM VOCÊ. COLHA RESULTADOS!</h2><p>Conhecimento é o único investimento que sempre gera retorno.</p></div><a className='btn big' href='#mais-vendidos'>COMECE AGORA →</a></section>}
function Footer(){return <footer><b>♛ IMPÉRIO DIGITAL</b><p>Compra segura pela Kiwify • Acesso imediato • Suporte no WhatsApp • Garantia 7 dias</p></footer>}
function MobileBar(){return <div className='mobileBar'><a href={wa()} target='_blank' rel='noreferrer'>WhatsApp</a><a href='#mais-vendidos'>Comprar</a></div>}

createRoot(document.getElementById('root')).render(<App />);
