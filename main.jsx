import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
  { id:1, title:'Assistência Técnica de Celular', category:'Negócios e Profissões', tag:'Mais lucrativo', img:'/assistencia-celular.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/PjRqOei', desc:'Guia completo para montar e lucrar com assistência técnica.' },
  { id:2, title:'Barbearia de Destaque', category:'Negócios e Profissões', tag:'Mais vendido', img:'/barbearia.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/ynz7UXJ', desc:'Do planejamento à gestão da sua barbearia de sucesso.' },
  { id:3, title:'Vendas Digitais', category:'Negócios e Profissões', tag:'Digital', img:'/vendas-digitais.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/tAqlMeI', desc:'Estratégias práticas para vender todos os dias na internet.' },
  { id:4, title:'Reeducação Alimentar', category:'Saúde e Bem-estar', tag:'Saúde', img:'/reeducacao-alimentar.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/0SAithY', desc:'Mude seus hábitos e transforme sua saúde de verdade.' },
  { id:5, title:'Passe no Vestibular', category:'Educação', tag:'Educação', img:'/vestibular.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/sOYzBc2', desc:'Prepare-se com estratégia e conquiste sua aprovação.' },
  { id:6, title:'Império da Estética', category:'Negócios e Profissões', tag:'Beleza', img:'/estetica.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/FptQKV2', desc:'Tudo sobre estética profissional e gestão do seu negócio.' },
  { id:7, title:'Costura Lucrativa', category:'Negócios e Profissões', tag:'Criativo', img:'/corte-costura.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/uxqfR0Z', desc:'Aprenda, crie e lucre com moda em casa.' },
  { id:8, title:'Império dos Doces', category:'Negócios e Profissões', tag:'Doce renda', img:'/confeitaria.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/sjoOT4z', desc:'Transforme doces em um negócio lucrativo do zero.' },
  { id:9, title:'Pedras Preciosas', category:'Negócios e Profissões', tag:'Premium', img:'/pedras-preciosas.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/DZxpL4y', desc:'Comece no mundo das gemas, joias e oportunidades.' },
  { id:10, title:'Império da Sucata', category:'Negócios e Profissões', tag:'Sustentável', img:'/ferro-velho.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/CFNOj2I', desc:'Monte um ferro velho lucrativo e atenda empresas.' },
  { id:11, title:'Negócio Organizado', category:'Organização e Produtividade', tag:'Organização', img:'/negocio-organizado.png', price:'R$ 29,00', link:'https://pay.kiwify.com.br/fIg2Fdd', desc:'Organize sua semana, prioridades e rotina com clareza.' },
  { id:12, title:'Tarefas Diárias', category:'Organização e Produtividade', tag:'Foco', img:'/tarefas-diarias.png', price:'R$ 29,00', link:'https://pay.kiwify.com.br/nmHBzko', desc:'Pare de apagar incêndios e organize seu dia.' },
  { id:13, title:'Guia da Sobriedade', category:'Transformação Pessoal', tag:'Transformação', img:'/alcoolismo.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/hlaRkGV', desc:'10 passos práticos para buscar uma vida sóbria.' },
  { id:14, title:'Cultivo Saudável', category:'Nicho Específico', tag:'Especial', img:'/cannabis.png', price:'R$ 47,00', link:'https://pay.kiwify.com.br/riPNbK0', desc:'Guia visual sobre cultivo saudável e responsável.' }
];

const cats = ['Todos','Negócios e Profissões','Educação','Saúde e Bem-estar','Organização e Produtividade','Transformação Pessoal','Nicho Específico'];

function wa(product){
  const txt = product ? `Olá! Tenho interesse no ebook ${product.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}

function App(){
  const [cat,setCat]=useState('Todos');
  const [q,setQ]=useState('');
  const filtered=useMemo(()=>products.filter(p=>(cat==='Todos'||p.category===cat)&&`${p.title} ${p.category} ${p.tag}`.toLowerCase().includes(q.toLowerCase())),[cat,q]);
  const top=products.slice(0,6);

  return <div className='site'>
    <Header q={q} setQ={setQ}/>
    <Hero top={top}/>
    <Categories cat={cat} setCat={setCat}/>
    <Products title='EBOOKS EM DESTAQUE' subtitle='Os favoritos de quem quer aprender e mudar de vida' list={filtered}/>
    <Benefits/>
    <Testimonials/>
    <FinalCTA/>
    <Footer/>
    <MobileBar/>
  </div>
}

function Header({q,setQ}){return <header className='header'>
  <a href='#top' className='logo'><span>♛</span><b>IMPÉRIO</b><small>DIGITAL</small></a>
  <nav><a href='#top'>Início</a><a href='#categorias'>Categorias</a><a href='#catalogo'>Todos os Ebooks</a><a href='#perguntas'>Perguntas</a><a href={wa()} target='_blank'>Contato</a></nav>
  <div className='search'><input value={q} onChange={e=>setQ(e.target.value)} placeholder='Buscar ebooks...'/></div>
  <a className='btn head' href='#catalogo'>Meus Ebooks</a>
</header>}

function Hero({top}){return <section id='top' className='hero'>
  <div className='heroText'>
    <p className='eyebrow'>CONHECIMENTO QUE TRANSFORMA ♛</p>
    <h1>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h1>
    <p className='lead'>Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida com mais conhecimento e autonomia.</p>
    <div className='trust'><span>🛡️ Compra 100% Segura</span><span>☁️ Download Imediato</span><span>🏅 Conteúdo de Qualidade</span><span>🎧 Suporte Dedicado</span></div>
    <a className='btn big' href='#catalogo'>🛒 VER TODOS OS EBOOKS</a>
  </div>
  <div className='heroVisual'>
    <div className='tablet'><div className='tabletTop'>☰ <b>Império Digital</b> 🔍</div><div className='tabletGrid'>{top.concat(products.slice(6,9)).map(p=><img key={p.id} src={p.img}/>)}</div></div>
    <div className='mug'>♛<br/><b>IMPÉRIO</b><small>DIGITAL</small></div>
  </div>
  <Phone top={top}/>
</section>}

function Phone({top}){return <aside className='phoneMock'>
  <div className='phoneScreen'>
    <div className='phoneHead'><span>☰</span><b>♛ IMPÉRIO <small>DIGITAL</small></b><span>🛒</span></div>
    <p className='eyebrow'>CONHECIMENTO QUE TRANSFORMA</p>
    <h2>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h2>
    <p>Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida.</p>
    <ul><li>🛡️ Compra 100% Segura</li><li>☁️ Download Imediato</li><li>🏅 Conteúdo de Qualidade</li><li>🎧 Suporte Dedicado</li></ul>
    <a href='#catalogo' className='btn phoneBtn'>VER TODOS OS EBOOKS</a>
    <h3>CATEGORIAS <a href='#categorias'>Ver todas</a></h3>
    <div className='phoneCats'><span>💼<br/>Negócios</span><span>🎓<br/>Educação</span><span>💚<br/>Saúde</span></div>
    <h3>MAIS VENDIDOS</h3>
    <div className='miniCard'><img src={top[0].img}/><div><b>{top[0].title}</b><p>{top[0].price}</p><a href={top[0].link}>QUERO ESTE</a></div></div>
  </div>
</aside>}

function Categories({cat,setCat}){const icons=['💼','🎓','💚','📋','👤','🌿'];return <section id='categorias' className='catSec'><h2>NAVEGUE POR <span>CATEGORIAS</span></h2><div className='catGrid'>{cats.slice(1).map((c,i)=><button key={c} onClick={()=>setCat(c)} className={cat===c?'active':''}><b>{icons[i]}</b><span>{c}</span></button>)}</div><button onClick={()=>setCat('Todos')} className='allBtn'>Ver tudo</button></section>}

function Products({title,subtitle,list}){return <section id='catalogo' className='products'><p className='red'>MAIS VENDIDOS</p><h2>{title}</h2><p className='sub'>{subtitle}</p><div className='productGrid'>{list.map(p=><article className='card' key={p.id}><div className='pic'><img src={p.img}/><span>{p.tag}</span></div><div className='cardBody'><h3>{p.title}</h3><p>{p.desc}</p><strong>{p.price}</strong><a className='buy' href={p.link} target='_blank' rel='noreferrer'>QUERO ESTE</a><a className='zap' href={wa(p)} target='_blank' rel='noreferrer'>Tirar dúvida no WhatsApp</a></div></article>)}</div></section>}

function Benefits(){return <section className='benefits'><div><b>🛡️ Compra 100% Segura</b><p>Seus dados protegidos em plataformas confiáveis.</p></div><div><b>☁️ Acesso Imediato</b><p>Após a confirmação, você recebe o acesso na hora.</p></div><div><b>🏅 Conteúdo Atualizado</b><p>Ebooks completos, práticos e sempre atuais.</p></div><div><b>🎧 Suporte Dedicado</b><p>Estamos prontos para te ajudar sempre que precisar.</p></div></section>}

function Testimonials(){return <section className='testimonials'><h2>O QUE NOSSOS <span>CLIENTES</span> DIZEM</h2><div><blockquote>⭐⭐⭐⭐⭐<br/><b>Carlos M.</b><p>O ebook de Barbearia mudou meu negócio! Conteúdo prático e direto ao ponto.</p></blockquote><blockquote>⭐⭐⭐⭐⭐<br/><b>Juliana S.</b><p>O de Reeducação Alimentar me ajudou a transformar minha vida.</p></blockquote><blockquote>⭐⭐⭐⭐⭐<br/><b>Rafael T.</b><p>Vendas Digitais abriu minha mente para novas oportunidades.</p></blockquote></div></section>}

function FinalCTA(){return <section className='final'><div className='crown'>♛</div><div><h2>INVISTA EM VOCÊ. COLHA RESULTADOS!</h2><p>Conhecimento é o único investimento que sempre gera retorno.</p></div><a className='btn big' href='#catalogo'>COMECE AGORA →</a></section>}
function Footer(){return <footer id='perguntas'><b>♛ IMPÉRIO DIGITAL</b><p>Pagamento Seguro • Satisfação Garantida • Conteúdo Original • Acesso Imediato</p></footer>}
function MobileBar(){return <div className='mobileBar'><a href={wa()} target='_blank'>WhatsApp</a><a href='#catalogo'>Ver Ebooks</a></div>}

createRoot(document.getElementById('root')).render(<App />);
