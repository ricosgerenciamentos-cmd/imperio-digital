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
      <MainShelf bestSellers={bestSellers} />
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
      <a className="brand" href="#top">
        <span className="brandIcon">♛</span>
        <span><b>IMPÉRIO</b><small>DIGITAL</small></span>
      </a>

      <nav className="nav">
        <a className="active" href="#top">Início</a>
        <a href="#categorias">Categorias</a>
        <a href="#catalogo">Todos os Ebooks</a>
        <a href="#sobre">Sobre Nós</a>
        <a href="#faq">Perguntas</a>
        <a href={wa()} target="_blank" rel="noreferrer">Contato</a>
      </nav>

      <div className="topActions">
        <label className="searchBox">
          <span>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ebooks" />
        </label>
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

        <div className="heroTrust">
          <span>🛡️<b>Compra 100%<br/>Segura</b></span>
          <span>☁️<b>Download<br/>Imediato</b></span>
          <span>🏅<b>Conteúdo de<br/>Qualidade</b></span>
          <span>🎧<b>Suporte<br/>Dedicado</b></span>
        </div>

        <a href="#catalogo" className="primaryBtn">🛒 VER TODOS OS EBOOKS</a>
      </div>

      <div className="heroArt">
        <div className="tabletExact">
          <div className="tabletHeader"><span>☰</span><b>Império Digital</b><span>⌕</span></div>
          <div className="tabletProducts">
            {bestSellers.concat(products.filter(p => !p.hiddenHome).slice(4,9)).map(p => <img key={p.id} src={p.img} alt={p.title} />)}
          </div>
        </div>
        <div className="books"></div>
        <div className="mugExact"><span>♛</span><b>IMPÉRIO</b><small>DIGITAL</small></div>
      </div>

      <PhoneMock product={bestSellers[0]} />
    </section>
  );
}

function Categories(){
  return (
    <section id="categorias" className="categoriesExact">
      <h2>NAVEGUE POR <span>CATEGORIAS</span></h2>
      <div className="categoryRow">
        {categories.map(c => <a key={c.name} href="#catalogo" className="catCard"><b>{c.icon}</b><span>{c.name}</span></a>)}
      </div>
    </section>
  );
}

function MainShelf({ bestSellers }){
  return (
    <section id="mais-vendidos" className="shelfWrap">
      <button className="circleArrow left">‹</button>

      <div className="shelfMain">
        <p className="redLabel">MAIS VENDIDOS</p>
        <h2>EBOOKS EM DESTAQUE</h2>
        <p className="sectionSub">Os favoritos de quem quer aprender e mudar de vida</p>
        <div className="featuredCards">
          {bestSellers.concat(products.filter(p => [5,6].includes(p.id))).map(p => <SmallProduct key={p.id} product={p} />)}
        </div>
        <a className="outlineBtn" href="#catalogo">📦 VER TODOS OS EBOOKS</a>
      </div>

      <TrustSide />
      <PhoneMock product={bestSellers[0]} lower />
      <button className="circleArrow right">›</button>
    </section>
  );
}

function SmallProduct({ product }){
  return (
    <article className="smallCard">
      <img src={product.img} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
        <small>De {product.oldPrice}</small>
        <strong>{product.price}</strong>
        <a href={product.link} target="_blank" rel="noreferrer">QUERO ESTE</a>
      </div>
    </article>
  );
}

function TrustSide(){
  return (
    <aside className="trustSide">
      <TrustItem icon="🛡️" title="Compra 100% Segura" text="Seus dados protegidos com criptografia e plataformas confiáveis." />
      <TrustItem icon="☁️" title="Acesso Imediato" text="Após a confirmação, você recebe o acesso na hora." />
      <TrustItem icon="🏅" title="Conteúdo Atualizado" text="Ebooks completos, práticos e sempre atualizados." />
      <TrustItem icon="🎧" title="Suporte Dedicado" text="Estamos prontos para te ajudar sempre que precisar." />
    </aside>
  );
}

function TrustItem({ icon, title, text }){
  return <div className="trustItem"><span>{icon}</span><div><b>{title}</b><p>{text}</p></div></div>;
}

function PhoneMock({ product, lower }) {
  return (
    <aside className={lower ? 'phoneExact phoneLower' : 'phoneExact'}>
      <div className="phoneInner">
        <div className="phoneNav"><span>☰</span><b>♛ IMPÉRIO <small>DIGITAL</small></b><span>▢</span></div>
        <p className="phoneKicker">CONHECIMENTO QUE TRANSFORMA</p>
        <h2>Aprenda hoje.<br/><span>Transforme</span> sua vida.</h2>
        <p>Ebooks práticos, diretos e completos para você aprender, empreender e mudar de vida.</p>
        <ul>
          <li>🛡️ Compra 100% Segura</li>
          <li>☁️ Download Imediato</li>
          <li>🏅 Conteúdo de Qualidade</li>
          <li>🎧 Suporte Dedicado</li>
        </ul>
        <a className="phoneButton" href="#catalogo">🛒 VER TODOS OS EBOOKS</a>
        <div className="phoneTitle"><b>CATEGORIAS</b><a href="#categorias">Ver todas</a></div>
        <div className="phoneCats"><span>💼<br/>Negócios</span><span>🎓<br/>Educação</span><span>💚<br/>Saúde</span></div>
        <div className="phoneTitle"><b>MAIS VENDIDOS</b></div>
        <div className="phoneProduct"><img src={product.img} alt={product.title}/><div><b>{product.title}</b><small>{product.price}</small><a href={product.link} target="_blank" rel="noreferrer">QUERO ESTE</a></div></div>
        <div className="dots"><i></i><i></i><i></i><i></i></div>
      </div>
    </aside>
  );
}

function IntentFilters({ intent, setIntent }){
  const icons = ['✨','💼','💚','🎓','📋','🌿'];
  return (
    <section id="intencoes" className="intentWrap">
      <h2>ESCOLHA PELO SEU <span>OBJETIVO</span></h2>
      <div className="intentRow">
        {intents.map((item, i) => <button key={item} onClick={() => setIntent(item)} className={intent === item ? 'selected' : ''}><b>{icons[i]}</b>{item}</button>)}
      </div>
    </section>
  );
}

function Catalog({ products }){
  return (
    <section id="catalogo" className="catalogExact">
      <p className="redLabel">CATÁLOGO COMPLETO</p>
      <h2>Todos os Ebooks</h2>
      <p className="sectionSub">Escolha o produto ideal para seu momento</p>
      <div className="catalogGrid">
        {products.map(p => <BigProduct key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function BigProduct({ product }){
  return (
    <article className="bigCard">
      <div className="bigImage"><img src={product.img} alt={product.title}/><span>{product.tag}</span></div>
      <div className="bigBody">
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
        <div className="priceBox"><small>De {product.oldPrice}</small><strong>Por {product.price}</strong><em>Oferta de lançamento</em></div>
        <a className="buyNow" href={product.link} target="_blank" rel="noreferrer">COMPRAR AGORA</a>
        <a className="whats" href={wa(product)} target="_blank" rel="noreferrer">Tirar dúvida no WhatsApp</a>
      </div>
    </article>
  );
}

function Testimonials(){
  return (
    <section className="testExact">
      <button className="circleArrow left">‹</button>
      <h2>O QUE NOSSOS <span>CLIENTES</span> DIZEM</h2>
      <div className="testRow">
        <blockquote><b>Carlos M.</b><span>★★★★★</span><p>“O ebook de Barbearia mudou meu negócio! Conteúdo prático e direto ao ponto.”</p></blockquote>
        <blockquote><b>Juliana S.</b><span>★★★★★</span><p>“O de Reeducação Alimentar me ajudou a transformar minha vida.”</p></blockquote>
        <blockquote><b>Rafael T.</b><span>★★★★★</span><p>“Vendas Digitais abriu minha mente para novas oportunidades.”</p></blockquote>
      </div>
      <button className="circleArrow right">›</button>
    </section>
  );
}

function FinalCTA(){
  return (
    <section className="finalExact" id="sobre">
      <div className="finalIcon">♛</div>
      <div><h2>INVISTA EM VOCÊ. COLHA RESULTADOS!</h2><p>Conhecimento é o único investimento que sempre gera retorno.</p></div>
      <a href="#catalogo">COMECE AGORA →</a>
    </section>
  );
}

function Footer(){
  return <footer id="faq" className="footerExact"><span>🛒 Pagamento Seguro</span><span>🛡️ Satisfação Garantida</span><span>✅ Conteúdo Original</span><span>🎧 Acesso Vitalício</span></footer>;
}

function MobileBar(){
  return <div className="mobileSticky"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#catalogo">Ver Ebooks</a></div>;
}

createRoot(document.getElementById('root')).render(<App />);
```

# style.css

```css
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,Arial,sans-serif;background:#fff;color:#101010}a{text-decoration:none;color:inherit}button,input{font:inherit}.site{min-height:100vh;background:#fff;overflow-x:hidden}.topbar{height:84px;display:flex;align-items:center;padding:0 84px;background:rgba(255,255,255,.96);border-bottom:1px solid #e8e8e8;position:sticky;top:0;z-index:80;box-shadow:0 8px 32px rgba(0,0,0,.04);gap:28px}.brand{display:flex;align-items:center;gap:8px;min-width:210px}.brandIcon{font-size:44px;line-height:1;color:#e50909}.brand b{display:block;font-size:25px;font-weight:1000;letter-spacing:-1px}.brand small{display:block;color:#e50909;font-size:13px;font-weight:1000;letter-spacing:4px;margin-top:-4px}.nav{display:flex;align-items:center;justify-content:center;gap:36px;flex:1}.nav a{font-size:15px;font-weight:850;color:#111;position:relative}.nav a.active,.nav a:hover{color:#e50909}.nav a.active:after{content:"";position:absolute;left:0;right:0;bottom:-18px;height:3px;background:#e50909;border-radius:10px}.topActions{display:flex;align-items:center;gap:18px}.searchBox{width:44px;height:44px;display:grid;place-items:center;cursor:pointer}.searchBox input{display:none}.searchBox span{font-size:28px;font-weight:900}.cart{font-size:29px;position:relative;line-height:1}.cart i{position:absolute;right:-8px;top:-8px;width:17px;height:17px;background:#e50909;color:#fff;border-radius:999px;font-size:10px;font-style:normal;font-weight:1000;display:grid;place-items:center}.accountBtn{background:#e50909;color:#fff;border-radius:10px;padding:15px 24px;font-weight:950;box-shadow:0 10px 24px rgba(229,9,9,.18)}.heroExact{position:relative;display:grid;grid-template-columns:43% 39% 18%;min-height:500px;background:linear-gradient(90deg,#fff 0%,#fff 46%,#f6f3f1 100%);padding:58px 84px 42px;border-bottom:1px solid #ededed;overflow:hidden}.heroExact:after{content:"";position:absolute;right:330px;top:0;bottom:0;width:420px;background:radial-gradient(circle at 60% 35%,rgba(255,255,255,.4),transparent 50%),linear-gradient(90deg,transparent,rgba(255,255,255,.75));pointer-events:none}.kicker,.phoneKicker{color:#e50909;font-weight:1000;font-size:14px;letter-spacing:.5px;margin:0 0 20px}.heroCopy{z-index:3;position:relative}.heroCopy h1{font-size:clamp(56px,5.7vw,92px);line-height:.96;letter-spacing:-4px;margin:0;font-weight:1000}.heroCopy h1 span,.phoneInner h2 span,.categoriesExact h2 span,.intentWrap h2 span,.testExact h2 span{color:#e50909}.heroLead{margin:22px 0 28px;font-size:20px;line-height:1.48;color:#333;max-width:570px;font-weight:600}.heroTrust{display:grid;grid-template-columns:repeat(4,max-content);gap:28px;margin-bottom:30px}.heroTrust span{display:flex;align-items:center;gap:10px;color:#e50909;font-size:30px}.heroTrust b{font-size:13px;line-height:1.15;color:#111;font-weight:950}.primaryBtn{display:inline-flex;align-items:center;justify-content:center;background:#e50909;color:#fff;border-radius:8px;padding:18px 30px;font-size:15px;font-weight:1000;box-shadow:0 13px 28px rgba(229,9,9,.22);transition:.25s}.primaryBtn:hover,.buyNow:hover,.smallCard a:hover,.finalExact a:hover,.accountBtn:hover{transform:translateY(-2px);filter:brightness(.96)}.heroArt{position:relative;z-index:2;min-height:390px}.tabletExact{position:absolute;left:0;top:-28px;width:355px;background:#111;border:14px solid #111;border-radius:29px;box-shadow:0 30px 65px rgba(0,0,0,.22);transform:rotate(3deg);overflow:hidden}.tabletHeader{height:30px;background:#fff;display:flex;align-items:center;justify-content:space-between;color:#111;font-size:12px;padding:0 12px}.tabletProducts{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;background:#f4f4f5;padding:10px}.tabletProducts img{width:100%;height:92px;object-fit:cover;border-radius:8px;box-shadow:0 5px 12px rgba(0,0,0,.14)}.books{position:absolute;left:60px;top:332px;width:335px;height:54px;background:linear-gradient(#191919 0 30%,#e50909 30% 55%,#111 55% 100%);border-radius:8px;box-shadow:0 18px 40px rgba(0,0,0,.2);transform:skewX(-8deg)}.mugExact{position:absolute;right:18px;top:215px;width:150px;height:145px;background:#fff;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#e50909;box-shadow:0 22px 50px rgba(0,0,0,.16)}.mugExact span{font-size:40px}.mugExact b{color:#111;font-size:18px;letter-spacing:-1px}.mugExact small{font-size:10px;font-weight:1000;letter-spacing:2px}.phoneExact{z-index:5;width:292px;height:600px;background:#111;border-radius:48px;padding:10px;box-shadow:0 28px 70px rgba(0,0,0,.26);border:4px solid #222}.heroExact>.phoneExact{position:absolute;right:68px;top:260px}.phoneLower{display:none}.phoneInner{height:100%;overflow:hidden;background:#fff;border-radius:38px;padding:22px 17px;color:#111}.phoneNav{display:flex;align-items:center;justify-content:space-between;margin-bottom:25px}.phoneNav b{font-size:15px}.phoneNav small{color:#e50909;letter-spacing:2px}.phoneKicker{font-size:9px;margin-bottom:10px}.phoneInner h2{font-size:30px;line-height:.94;letter-spacing:-1.5px;margin:0 0 12px;font-weight:1000}.phoneInner p{font-size:12px;line-height:1.42;color:#333}.phoneInner ul{list-style:none;padding:0;margin:18px 0;display:grid;gap:9px}.phoneInner li{font-size:12px;font-weight:850;color:#111}.phoneButton{display:flex;background:#e50909;color:#fff;border-radius:7px;padding:12px;justify-content:center;font-size:12px;font-weight:1000;box-shadow:0 10px 20px rgba(229,9,9,.22)}.phoneTitle{display:flex;justify-content:space-between;align-items:center;margin:22px 0 12px;font-size:12px}.phoneTitle a{color:#e50909}.phoneCats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.phoneCats span{border:1px solid #eee;border-radius:10px;text-align:center;padding:11px 3px;font-size:10px;font-weight:850;background:#fff}.phoneProduct{display:grid;grid-template-columns:70px 1fr;gap:12px;align-items:center}.phoneProduct img{width:70px;height:86px;object-fit:cover;border-radius:6px}.phoneProduct b{font-size:12px;line-height:1.12}.phoneProduct small{display:block;font-size:13px;font-weight:1000;margin:6px 0}.phoneProduct a{display:inline-flex;color:#e50909;border:1px solid #e50909;border-radius:5px;padding:6px 10px;font-size:10px;font-weight:1000}.dots{display:flex;gap:7px;justify-content:center;margin-top:13px}.dots i{width:9px;height:9px;border-radius:50%;background:#cfcfcf}.dots i:first-child{background:#e50909}.categoriesExact{background:#fff;padding:28px 84px 18px;text-align:center}.categoriesExact h2,.intentWrap h2{font-size:24px;margin:0 0 18px;font-weight:1000;letter-spacing:-.6px}.categoryRow{display:grid;grid-template-columns:repeat(6,1fr);gap:18px;max-width:1080px;margin:0 auto}.catCard{height:92px;border:1px solid #e8e8e8;border-radius:10px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 10px 26px rgba(0,0,0,.05);transition:.25s}.catCard:hover{transform:translateY(-3px);border-color:#e50909}.catCard b{font-size:30px}.catCard span{font-size:14px;font-weight:950;line-height:1.15}.shelfWrap{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 250px 320px;gap:24px;padding:16px 84px 44px;background:#fff;align-items:start}.shelfMain{text-align:center}.redLabel{color:#e50909;font-size:13px;font-weight:1000;letter-spacing:.5px;margin:0 0 5px}.shelfMain h2,.catalogExact h2,.testExact h2{font-size:32px;line-height:1;margin:0;font-weight:1000;letter-spacing:-1px}.sectionSub{margin:8px 0 19px;color:#333;font-size:15px}.featuredCards{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.smallCard{background:#fff;border:1px solid #e7e7e7;border-radius:8px;overflow:hidden;box-shadow:0 11px 24px rgba(0,0,0,.05);text-align:center}.smallCard img{width:100%;height:146px;object-fit:cover;display:block}.smallCard div{padding:11px 10px}.smallCard h3{font-size:14px;line-height:1.15;margin:0 0 8px;font-weight:1000;min-height:32px}.smallCard p{font-size:12px;color:#333;line-height:1.28;min-height:46px;margin:0 0 8px}.smallCard small{display:block;text-decoration:line-through;color:#8a8a8a;font-size:11px;font-weight:850}.smallCard strong{display:block;font-size:17px;font-weight:1000;margin:2px 0 8px}.smallCard a{display:flex;align-items:center;justify-content:center;background:#e50909;color:#fff;border-radius:4px;font-size:11px;font-weight:1000;padding:8px}.outlineBtn{display:inline-flex;margin-top:20px;border:1px solid #e50909;color:#e50909;border-radius:6px;padding:12px 58px;font-weight:1000}.trustSide{background:#fff;border-radius:12px;box-shadow:0 16px 40px rgba(0,0,0,.08);border:1px solid #eee;padding:26px 22px;margin-top:40px}.trustItem{display:grid;grid-template-columns:42px 1fr;gap:13px;text-align:left;margin-bottom:30px}.trustItem:last-child{margin-bottom:0}.trustItem span{font-size:28px;color:#e50909}.trustItem b{font-size:15px;font-weight:1000}.trustItem p{font-size:12px;line-height:1.35;color:#333;margin:6px 0 0}.circleArrow{position:absolute;width:39px;height:39px;border:0;border-radius:50%;background:#fff;box-shadow:0 7px 22px rgba(0,0,0,.12);font-size:30px;z-index:7;color:#555}.circleArrow.left{left:24px;top:245px}.circleArrow.right{right:384px;top:245px}.intentWrap{background:#fff;padding:30px 84px;text-align:center}.intentRow{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;max-width:1120px;margin:18px auto 0}.intentRow button{border:1px solid #eee;background:#fff;border-radius:12px;padding:18px 10px;font-weight:950;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.04)}.intentRow button b{display:block;font-size:25px}.intentRow button.selected,.intentRow button:hover{background:#e50909;color:#fff}.catalogExact{background:#f7f7f8;text-align:center;padding:58px 84px}.catalogGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;max-width:1280px;margin:26px auto 0;text-align:left}.bigCard{background:#fff;border:1px solid #e8e8e8;border-radius:20px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.06);transition:.25s}.bigCard:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,.1)}.bigImage{position:relative}.bigImage img{width:100%;height:290px;display:block;object-fit:cover}.bigImage span{position:absolute;left:14px;top:14px;background:#e50909;color:#fff;border-radius:999px;padding:8px 12px;font-size:11px;font-weight:1000}.bigBody{padding:18px}.bigBody h3{font-size:22px;line-height:1.05;margin:0 0 8px;font-weight:1000}.bigBody p{font-size:14px;line-height:1.45;color:#555;min-height:60px}.priceBox small{display:block;color:#999;text-decoration:line-through;font-size:14px;font-weight:850}.priceBox strong{display:block;color:#e50909;font-size:30px;font-weight:1000}.priceBox em{display:inline-block;margin-top:6px;background:#fff1f0;color:#e50909;border-radius:999px;padding:6px 10px;font-size:12px;font-style:normal;font-weight:1000}.buyNow,.whats{display:flex;width:100%;align-items:center;justify-content:center;border-radius:8px;font-weight:1000;margin-top:12px;padding:13px}.buyNow{background:#e50909;color:#fff}.whats{background:#f1f1f1;color:#111;font-size:13px}.testExact{position:relative;background:#fff;text-align:center;padding:40px 84px}.testRow{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;max-width:1060px;margin:22px auto 0}.testRow blockquote{margin:0;background:#fff;border:1px solid #eee;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.05);padding:22px;text-align:left}.testRow b{font-size:16px}.testRow span{display:block;color:#ffbd00;margin:6px 0}.testRow p{font-size:13px;color:#333;line-height:1.4}.finalExact{display:grid;grid-template-columns:90px 1fr 260px;gap:25px;align-items:center;margin:0 84px 20px;padding:28px 34px;background:#fff;border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.07)}.finalIcon{width:72px;height:72px;border:2px solid #e50909;border-radius:50%;display:grid;place-items:center;color:#e50909;font-size:43px}.finalExact h2{margin:0;font-size:24px;font-weight:1000}.finalExact p{margin:6px 0 0;color:#333}.finalExact a{background:#e50909;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:7px;font-weight:1000;padding:18px}.footerExact{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:20px 84px 30px;background:#fff;border-top:1px solid #eee;color:#333;font-size:14px;font-weight:850}.mobileSticky{display:none}@media(max-width:1200px){.topbar{padding:0 28px}.nav{display:none}.heroExact{grid-template-columns:1fr;min-height:auto;padding:42px 28px 560px}.heroArt{position:absolute;right:330px;bottom:120px;width:360px}.heroExact>.phoneExact{right:30px;top:auto;bottom:25px}.shelfWrap{grid-template-columns:1fr;padding:44px 28px}.trustSide{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}.trustItem{margin-bottom:0}.phoneLower{display:none}.featuredCards{grid-template-columns:repeat(3,1fr)}.circleArrow{display:none}.catalogGrid{grid-template-columns:repeat(3,1fr)}.categoryRow,.intentRow{grid-template-columns:repeat(3,1fr)}.finalExact{margin:0 28px 20px}.footerExact{padding:20px 28px 30px}}@media(max-width:760px){.topbar{height:66px;padding:0 16px}.brand{min-width:auto}.brandIcon{font-size:34px}.brand b{font-size:17px}.brand small{font-size:9px}.topActions{margin-left:auto}.searchBox,.cart,.accountBtn{display:none}.heroExact{padding:34px 18px 555px}.heroCopy h1{font-size:47px;letter-spacing:-2px}.heroLead{font-size:16px}.heroTrust{grid-template-columns:repeat(2,1fr);gap:12px}.heroTrust span{font-size:24px}.heroTrust b{font-size:11px}.heroArt{display:none}.heroExact>.phoneExact{left:50%;right:auto;transform:translateX(-50%);bottom:18px;width:292px}.categoriesExact,.intentWrap,.catalogExact,.testExact{padding-left:18px;padding-right:18px}.categoryRow,.intentRow,.featuredCards,.catalogGrid,.testRow,.footerExact{grid-template-columns:1fr}.shelfWrap{padding:38px 18px}.trustSide{grid-template-columns:1fr}.smallCard img{height:220px}.bigImage img{height:360px}.finalExact{grid-template-columns:1fr;text-align:center;margin:0 18px 86px}.finalIcon{margin:0 auto}.mobileSticky{position:fixed;left:0;right:0;bottom:0;z-index:100;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(255,255,255,.96);padding:10px;border-top:1px solid #eee}.mobileSticky a{background:#e50909;color:#fff;border-radius:10px;padding:13px;text-align:center;font-weight:1000}.mobileSticky a:first-child{background:#16a34a}}
```
