import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const WHATSAPP = '5511919411086';

const products = [
{ id:15, title:"Primeiros R$10 Online: Guia simples para começar pelo celular", cat:"Renda Extra", intent:"ganhar", tag:"🔥 Entrada", img:"/vendas-digitais.png", price:"R$ 1,99", old:"R$ 19,90", file:"/GANHE-SEUS-PRIMEIROS-Rdollar10-ONLINE-HOJE.pdf", desc:"Aprenda formas simples e realistas de iniciar na renda extra online usando apenas o celular, mesmo começando do zero" },
{ id:16, title:"Como Abrir um Negócio do Zero: Primeiros passos para começar com clareza", cat:"Negócios", intent:"abrir-negocio", tag:"🔥 Oferta R$9", img:"/negocio-lucrativo.png", price:"R$ 9,00", old:"R$ 47,00", file:"/ebooks/como-abrir-negocio.pdf", desc:"Um guia direto para entender o que vender, organizar sua ideia e dar os primeiros passos com pouco investimento" },
{ id:17, title:"Pack Completo de Negócios: Guias práticos para escolher e começar melhor", cat:"Negócios", intent:"pack", tag:"💎 Pack completo", img:"/pack-negocios.png", price:"R$ 37,00", old:"R$ 97,00", file:"/ebooks/pack-negocios.pdf", desc:"Conteúdos práticos sobre diferentes oportunidades de negócio para comparar caminhos e começar com mais segurança" },
{ id:1, title:"Pack Assistência Técnica Completo: do zero aos primeiros clientes", cat:"Assistência Técnica", intent:"assistencia", tag:"💎 Pack completo", img:"/assistencia-celular.png", price:"R$ 37,00", old:"R$ 97,00", file:"/ebooks/assistencia-tecnica.pdf", desc:"Pacote completo com vários guias sobre bancada, defeitos, serviços rápidos, clientes, cobrança, atendimento e crescimento na assistência técnica" },
{ id:2, title:"Pack Barbearia Completo: do básico aos primeiros clientes", cat:"Barbearia", intent:"barbearia", tag:"💎 Pack completo", img:"/barbearia.png", price:"R$ 37,00", old:"R$ 97,00", file:"/ebooks/barbearia.pdf", desc:"Pacote completo com guias sobre degradê, tesoura, barba, atendimento, fotos, Instagram, cobrança e captação de clientes" },
{ id:3, title:"Vendas Digitais para Iniciantes: Aprenda a vender online passo a passo", cat:"Negócios", intent:"ganhar", tag:"🔥 Mais vendido", img:"/vendas-digitais.png", price:"R$ 14,00", old:"R$ 47,00", file:"/ebooks/vendas-digitais.pdf", desc:"Aprenda como começar a vender pela internet, entender o básico do digital e dar seus primeiros passos com mais segurança" },
{ id:4, title:"Reeducação Alimentar: Comece com hábitos simples para melhorar sua saúde", cat:"Saúde", intent:"saude", tag:"🥗 Saúde", img:"/reeducacao-alimentar.png", price:"R$ 13,00", old:"R$ 47,00", file:"/ebooks/reeducacao-alimentar.pdf", desc:"Aprenda a melhorar sua alimentação com mudanças simples, práticas e possíveis de aplicar no dia a dia" },
{ id:5, title:"Plano de Estudos para Vestibular: Organize sua rotina e melhore seu desempenho", cat:"Educação", intent:"estudar", tag:"📚 Educação", img:"/vestibular.png", price:"R$ 9,00", old:"R$ 27,00", file:"/ebooks/vestibular.pdf", desc:"Guia para estudar com mais organização, foco e constância, criando uma rotina mais clara para provas e vestibulares" },
{ id:6, title:"Estética do Zero: Guia prático para começar na área e atender melhor", cat:"Negócios", intent:"ganhar", tag:"💅 Beleza", img:"/devocional.png", price:"R$ 13,00", old:"R$ 47,00", file:"/ebooks/estetica.pdf", desc:"Conheça os primeiros passos para entrar no mercado da estética com mais clareza e começar com segurança" },
{ id:7, title:"Corte e Costura para Iniciantes: Aprenda do zero e crie suas primeiras peças", cat:"Negócios", intent:"ganhar", tag:"🧵 Criativo", img:"/corte-costura.png", price:"R$ 13,00", old:"R$ 47,00", file:"/ebooks/corte-costura.pdf", desc:"Um conteúdo simples para aprender fundamentos da costura, entender materiais, técnicas básicas e começar a praticar com mais confiança" },
{ id:8, title:"Confeitaria do Zero: Aprenda a começar e vender seus primeiros doces", cat:"Negócios", intent:"ganhar", tag:"🍰 Doce renda", img:"/confeitaria.png", price:"R$ 13,00", old:"R$ 47,00", file:"/ebooks/confeitaria.pdf", desc:"Guia prático para iniciar na confeitaria, aprender o básico da produção e transformar doces em oportunidade de renda" },
{ id:9, title:"Pedras Preciosas: Guia inicial para entender valor, tipos e oportunidades", cat:"Negócios", intent:"ganhar", tag:"💎 Premium", img:"/pedras-preciosas.png", price:"R$ 14,00", old:"R$ 47,00", file:"/ebooks/pedras-preciosas.pdf", desc:"Aprenda os fundamentos sobre pedras preciosas, suas características e possibilidades de mercado em linguagem simples para iniciantes" },
{ id:10, title:"Ferro Velho: Guia prático para enxergar oportunidades nesse mercado", cat:"Negócios", intent:"ganhar", tag:"♻️ Sustentável", img:"/ferro-velho.png", price:"R$ 14,00", old:"R$ 47,00", file:"/ebooks/ferro-velho.pdf", desc:"Entenda como funciona o mercado de ferro velho, materiais reaproveitáveis e primeiros passos para identificar oportunidades na prática" },
{ id:11, title:"Organize seu Negócio: Guia simples para ter mais controle e clareza", cat:"Organização", intent:"organizar", tag:"📊 Organização", img:"/negocio-organizado.png", price:"R$ 9,00", old:"R$ 29,00", file:"/ebooks/negocio-organizado.pdf", desc:"Aprenda a organizar tarefas, processos e decisões do seu negócio com mais clareza e menos bagunça na rotina" },
{ id:12, title:"Organize sua Rotina: Método simples para ter mais foco no dia a dia", cat:"Organização", intent:"organizar", tag:"📅 Foco", img:"/tarefas-diarias.png", price:"R$ 13,00", old:"R$ 29,00", file:"/ebooks/tarefas-diarias.pdf", desc:"Um guia prático para organizar melhor as tarefas, reduzir a bagunça e ter mais clareza no dia a dia" },
{ id:13, title:"Redução do Álcool: Guia prático para retomar o controle da rotina", cat:"Saúde", intent:"saude", tag:"🧠 Apoio", img:"/alcoolismo.png", price:"R$ 9,00", old:"R$ 27,00", file:"/ebooks/reducao-alcool.pdf", desc:"Conteúdo de apoio para refletir sobre hábitos, organizar melhor a rotina e buscar um caminho mais equilibrado com responsabilidade" },
{ id:14, title:"Cannabis: Guia informativo para entender o tema com mais clareza", cat:"Nicho específico", intent:"nicho", tag:"🌿 Informativo", img:"/cannabis.png", price:"R$ 13,00", old:"R$ 47,00", file:"/ebooks/cannabis.pdf", desc:"Material educativo para compreender melhor o assunto, seus contextos, cuidados e informações gerais de forma simples e organizada", hidden:true },
{ id:101, title:"Como cobrar mais pelos serviços de assistência técnica", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Cobrar-Mais-Pelos-Servicos-de-Assistencia-Tecnica.pdf", desc:"Aprenda formas simples de valorizar seus serviços, cobrar com mais segurança e aumentar o lucro em cada atendimento" },
{ id:102, title:"Como conseguir clientes na sua cidade para assistência técnica", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Conseguir-Clientes-na-Sua-Cidade-para-Assistencia-Tecnica-de-Celular.pdf", desc:"Estratégias práticas para atrair clientes locais, divulgar seus serviços e começar a formar uma base de atendimento" },
{ id:103, title:"Como criar promoções que vendem na assistência técnica", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Criar-Promocoes-que-Vendem-na-Assistencia-Tecnica.pdf", desc:"Monte ofertas simples, combos e promoções para aumentar movimento sem desvalorizar seu serviço" },
{ id:104, title:"Como fidelizar clientes e receber indicações", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Fidelizar-Clientes-e-Receber-Indicacoes-na-Assistencia-Tecnica.pdf", desc:"Aprenda a atender melhor, gerar confiança e transformar clientes em indicações recorrentes" },
{ id:105, title:"Como identificar defeitos em celulares", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Identificar-Defeitos-em-Celulares.pdf", desc:"Guia rápido para entender sintomas comuns, fazer diagnóstico inicial e evitar erros antes do reparo" },
{ id:106, title:"Como montar uma bancada barata para assistência técnica", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Montar-Sua-Bancada-Barata-para-Assistencia-Tecnica.pdf", desc:"Veja como organizar ferramentas, espaço e materiais básicos para começar gastando menos" },
{ id:107, title:"Serviços rápidos: corrija erros, melhore desempenho e lucre mais", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Corrija-Erros-Melhore-Desempenho-e-Lucre-com-Servicos-Rapidos.pdf", desc:"Ideias de serviços simples e rápidos para gerar caixa com manutenção, ajustes e otimizações" },
{ id:108, title:"Como trabalhar com celulares molhados e oxidados", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Trabalhar-com-Celulares-Molhados-e-Oxidados.pdf", desc:"Cuidados, riscos e primeiros procedimentos para lidar com aparelhos molhados ou com oxidação" },
{ id:109, title:"Desmontagem e montagem sem danificar celulares", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Desmontagem-e-Montagem-Sem-Danificar-Celulares.pdf", desc:"Passos e cuidados essenciais para abrir, desmontar e remontar aparelhos com mais segurança" },
{ id:110, title:"Como resolver lentidão, reinicializações e falhas de sistema", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Guia-Pratico-para-Resolver-Lentidao-Reinicializacoes-e-Falhas-de-Sistema.pdf", desc:"Aprenda causas comuns de lentidão e falhas, além de procedimentos para melhorar o desempenho" },
{ id:111, title:"Limpeza e manutenção preventiva de celulares", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Limpeza-e-Manutencao-Preventiva-de-Celulares.pdf", desc:"Aprenda a fazer limpeza preventiva, orientar clientes e criar serviços simples de manutenção" },
{ id:112, title:"Curso rápido de iPhone básico", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Curso-Rapido-de-iPhone-Basico.pdf", desc:"Introdução prática para entender cuidados, peças, diagnóstico inicial e atendimento com iPhones" },
{ id:113, title:"Diagnóstico, substituição segura e melhor desempenho", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Guia-Pratico-para-Diagnostico-Substituicao-Segura-e-Melhor-Desempenho.pdf", desc:"Guia para diagnosticar, substituir componentes com cuidado e entregar melhor resultado ao cliente" },
{ id:114, title:"Como trabalhar em casa com assistência técnica de celular", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Trabalhar-em-Casa-com-Assistencia-Tecnica-de-Celular.pdf", desc:"Organize atendimento, espaço, rotina e divulgação para começar prestando serviço em casa" },
{ id:115, title:"Transferência de informações com segurança e agilidade", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Guia-Pratico-para-Transferir-Informacoes-com-Seguranca-Agilidade-e-Resultado-Profissional.pdf", desc:"Aprenda a oferecer transferência de dados como serviço, com cuidado, organização e valor percebido" },
{ id:116, title:"Solda básica para iniciantes na assistência técnica", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Solda-Basica-para-Iniciantes-na-Assistencia-Tecnica.pdf", desc:"Introdução aos cuidados, ferramentas e primeiros conceitos para iniciar em solda básica" },
{ id:117, title:"Troca de tela passo a passo", cat:"Assistência Técnica", intent:"assistencia", tag:"📘 Avulso", img:"/assistencia-celular.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Troca-de-Tela-Passo-a-Passo.pdf", desc:"Guia prático com cuidados importantes para entender e executar troca de tela com mais segurança" },
{ id:201, title:"Como fazer degradê profissional na barbearia", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/COMO-FAZER-DEGRADE-PROFISSIONAL-NA-BARBEIRIA.pdf", desc:"Aprenda fundamentos para melhorar o degradê, trabalhar transições limpas e entregar cortes mais profissionais" },
{ id:202, title:"Como atender clientes na barbearia e fazer voltar sempre", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Atender-Cliente-na-Barbearia-e-Fazer-Voltar-Sempre.pdf", desc:"Melhore atendimento, experiência e relacionamento para aumentar retorno e indicações" },
{ id:203, title:"Como fazer barba profissional na barbearia", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Fazer-Barba-Profissional-na-Barbearia.pdf", desc:"Guia prático para trabalhar barba com mais cuidado, acabamento e percepção de valor" },
{ id:204, title:"Como cobrar mais na barbearia", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/COMO-COBRAR-MAIS-NA-BARBEIRIA.pdf", desc:"Aprenda a posicionar melhor seus serviços e aumentar preço sem afastar bons clientes" },
{ id:205, title:"Como montar sua barbearia do zero", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Montar-Sua-Barbearia-do-Zero.pdf", desc:"Entenda estrutura, primeiros passos, organização e visão prática para começar uma barbearia" },
{ id:206, title:"Como atrair clientes para barbearia", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Como-Atrair-Clientes-para-Barbearia.pdf", desc:"Estratégias simples para divulgar, aparecer mais e trazer novos clientes para sua barbearia" },
{ id:207, title:"Como usar a tesoura na barbearia", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/COMO-USAR-A-TESOURA-NA-BARBEIRIA.pdf", desc:"Fundamentos para ganhar mais segurança no uso da tesoura e melhorar acabamento dos cortes" },
{ id:208, title:"Fotos e Instagram para barbeiros", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/FOTOS-E-INSTAGRAM-PARA-BARBEIROS.pdf", desc:"Aprenda a apresentar melhor seus cortes, tirar fotos melhores e usar o Instagram para atrair clientes" },
{ id:209, title:"Cortes precisos, degradês limpos e atendimento profissional", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Guia-Pratico-para-Cortes-Precisos-Degrades-Limpos-e-Atendimento-Profissional.pdf", desc:"Guia prático para elevar a qualidade dos cortes, acabamento e experiência do cliente" }
];

const filters = [
  ['todos','Todos'],
  ['ganhar','Ganhar dinheiro'],
  ['assistencia','Assistência Técnica'],
  ['barbearia','Barbearia'],
  ['abrir-negocio','Abrir negócio'],
  ['pack','Pack completo'],
  ['organizar','Organização'],
  ['saude','Saúde'],
  ['estudar','Estudos']
];

const bestIds = [15,1,2,101];

function wa(p){
  const txt = p ? `Olá! Tenho interesse no ebook ${p.title}` : 'Olá! Quero conhecer os ebooks do Império Digital';
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;
}


function priceNumber(price){
  return Number(String(price).replace(/[^\d,]/g,'').replace(',','.')) || 0;
}

function productFile(product){
  const current = products.find(item => item.id === product?.id);
  return product?.file || current?.file || '';
}

function isDownloadReady(product){
  return Boolean(productFile(product));
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
  const [logoClicks,setLogoClicks] = useState(0);
  const [footerAdminClicks,setFooterAdminClicks] = useState(0);
  const [testMode,setTestMode] = useState(() => localStorage.getItem('imperio_test_mode') === 'true');

  function handleLogoSecretClick(e){
    e.preventDefault();
    const next = logoClicks + 1;
    setLogoClicks(next);

    if(next >= 7){
      localStorage.setItem('imperio_test_mode', 'true');
      setTestMode(true);
      setLogoClicks(0);
    }
  }

  function handleFooterSecretAdminClick(){
    const next = footerAdminClicks + 1;
    setFooterAdminClicks(next);

    if(next >= 7){
      setFooterAdminClicks(0);
      window.location.href = '/admin';
    }
  }

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
  if(path === '/descobrir-negocio') return <QuizProPage />;
  if(path === '/admin') return <AdminPage />;

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={handleLogoSecretClick}/>
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
    <Footer onSecretAdminClick={handleFooterSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    <FloatingButtons/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>}
  </main>
}

function TopNotice(){return <div className="notice">🔥 Oferta especial de lançamento • Acesso imediato • Compra segura pelo Mercado Pago • Suporte no WhatsApp</div>}

function Header({search,setSearch,cartCount,setCartOpen,onLogoSecretClick}){return <header className="header">
  <a className="logo" href="#top" onClick={onLogoSecretClick} title="Império Digital"><span>♛</span><div><b>IMPÉRIO</b><small>DIGITAL</small></div></a>
  <nav><a href="#top">Início</a><a href="#best">Mais vendidos</a><a href="#catalogo">Ebooks</a><a href="#afiliados">Afiliados</a><a href="#faq">Perguntas</a><a href={wa()} target="_blank" rel="noreferrer">Contato</a></nav>
  <label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ebook"/></label>
  <button className="cartBtn" onClick={()=>setCartOpen(true)}>🛒 <span>{cartCount}</span></button>
  <a className="headBtn" href="#ebook050">Quero começar agora</a>
</header>}

function Hero({best}){return <section id="top" className="hero heroPremium">
  <div className="copy">
    <p className="eyebrow">🔥 OFERTA DE ENTRADA • ACESSO IMEDIATO</p>
    <h1>Ganhe dinheiro <br/><span>começando do zero</span><br/>com produtos a partir de R$1,99</h1>
    <p className="lead">Um guia rápido, direto e acessível para descobrir caminhos reais de renda extra usando apenas o celular</p>

    <div className="heroTrust premiumTrust">
      <span>💰 <b>Preço de entrada</b><small>Apenas R$1,99</small></span>
      <span>⚡ <b>Acesso imediato</b><small>Baixe na hora</small></span>
      <span>📱 <b>Comece pelo celular</b><small>Mesmo do zero</small></span>
      <span>🛡️ <b>Compra segura</b><small>Ambiente protegido</small></span>
    </div>

    <div className="socialProof premiumProof">
      <b>⭐ Produto de entrada</b>
      <span>Ideal para conhecer o Império Digital</span>
    </div>

    <div className="actions">
      <a className="primary pulse" href="#ebook050">Começar agora por R$1,99</a>
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
    {products.filter(p=>!p.hidden).slice(0,6).map(p=><img key={p.id} src={p.img} alt={p.title} loading="lazy" decoding="async"/>)}
  </div>
  <a className="phoneBtn" href="#catalogo">VER TODOS OS EBOOKS</a>
</div></aside>}



function FeaturedMicroEbook({addToCart}){
  const ebook = products.find(p=>p.id === 15);
  return <section id="ebook050" className="featured050">
    <div className="featured050Card">
      <div className="featured050Copy">
        <p>🔥 OFERTA DE ENTRADA • RENDA EXTRA</p>
        <h2>Ganhe seus primeiros R$10 online hoje</h2>
        <span>Um guia rápido para iniciantes descobrirem formas simples e reais de começar a fazer renda extra pela internet usando apenas o celular</span>
        <div className="featured050Bullets">
          <b>✅ Ideal para iniciantes</b>
          <b>⚡ Acesso imediato</b>
          <b>📱 Comece pelo celular</b>
          <b>💰 Apenas R$1,99</b>
        </div>
        <div className="featured050Actions">
          <button onClick={()=>addToCart(ebook)}>Comprar por R$1,99</button>
          <a href="/descobrir-negocio">Descobrir meu melhor negócio</a>
        </div>
      </div>
      <div className="featured050Price">
        <small>De R$19,90 por</small>
        <strong>R$1,99</strong>
        <span>Oferta de lançamento por tempo limitado</span>
      </div>
    </div>
  </section>
}


function ValueLadder({addToCart}){
  const entrada = products.find(p => p.id === 15);
  const principal = products.find(p => p.id === 16);
  const premium = products.find(p => p.id === 17);

  const steps = [
    { label:'ENTRADA', price:'R$1,99', title:entrada?.title, text:'Produto de entrada para começar hoje e conhecer o método', product:entrada },
    { label:'PRODUTO PRINCIPAL', price:'R$9', title:principal?.title, text:'Guia central para quem quer abrir um negócio com clareza', product:principal },
    { label:'PACK PREMIUM', price:'R$37', title:premium?.title, text:'Pacote completo com vários caminhos de negócio do básico ao avançado', product:premium }
  ];

  return <section id="escada" className="ladder">
    <p className="red">ESCADA DE VALOR</p>
    <h2>Comece pequeno e evolua para o pacote completo</h2>
    <p className="sub">Uma jornada simples para começar com pouco, entender como abrir um negócio e evoluir para o pack completo</p>
    <div className="ladderGrid">
      {steps.map((step, index) => <article className="ladderCard" key={step.label}>
        <span>{step.label}</span>
        <strong>{step.price}</strong>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <button onClick={() => step.product && addToCart(step.product)}>{index === 0 ? 'Começar por R$1,99' : 'Acessar agora'}</button>
      </article>)}
    </div>
  </section>
}

function TrustBar(){return <section className="trustBar"><div>🛡️<b>Compra segura pelo Mercado Pago</b><p>Checkout protegido</p></div><div>⚡<b>Acesso imediato</b><p>Receba após a confirmação</p></div><div>🎧<b>Suporte no WhatsApp</b><p>Atendimento rápido</p></div><div>🏅<b>Garantia 7 dias</b><p>Compre com segurança</p></div></section>}

function Best({best,addToCart}){return <section id="best" className="best"><p className="red">MAIS VENDIDOS DA SEMANA</p><h2>Escolha seu ebook e comece hoje</h2><p className="sub">Comece pelo produto de entrada ou escolha uma oferta principal do funil</p><div className="bestGrid">{best.map(p=><Product p={p} compact addToCart={addToCart} key={p.id}/>)}</div></section>}

function Filters({filter,setFilter}){return <section className="filters"><h2>Escolha pelo seu <span>objetivo</span></h2><div>{filters.map(([id,label])=><button key={id} onClick={()=>setFilter(id)} className={filter===id?'active':''}>{label}</button>)}</div></section>}

function Catalog({list,addToCart}){return <section id="catalogo" className="catalog"><p className="red">CATÁLOGO COMPLETO</p><h2>Todos os Ebooks</h2><p className="sub">Produtos acessíveis, diretos e prontos para você começar</p><div className="grid">{list.map(p=><Product p={p} addToCart={addToCart} key={p.id}/>)}</div></section>}

function Product({p,compact,addToCart}){return <article className={compact?'card compact':'card'}><div className="imgWrap"><img src={p.img} alt={p.title} loading="lazy" decoding="async"/><span>{p.tag}</span></div><div className="body"><h3>{p.title}</h3><p>{p.desc}</p><small>De {p.old}</small><strong>Por {p.price}</strong><em>Oferta de lançamento</em><button className="cartAdd" onClick={()=>addToCart(p)}>Adicionar ao carrinho</button><a className="buy" href="#" onClick={(e)=>{e.preventDefault();addToCart(p);}}>Acessar agora</a><a className="zap" href={wa(p)} target="_blank" rel="noreferrer">Tirar dúvida no WhatsApp</a></div></article>}

function OfferBanner(){return <section className="offer"><b>🔥 Preço promocional por tempo limitado</b><span>Escolha seu ebook, compre com segurança e receba o acesso imediatamente</span><a href="#escada">Ver escada de valor</a></section>}


function AffiliateSystem(){return <section id="afiliados" className="affiliate">
  <div className="affiliateCopy">
    <p className="red">SISTEMA DE AFILIADOS INTERNO</p>
    <h2>Venda produtos do Império Digital e ganhe comissão</h2>
    <span>Estrutura pensada para transformar o site em um marketplace com criadores, afiliados e produtos digitais em uma única plataforma</span>
  </div>
  <div className="affiliateGrid">
    <div><b>1</b><h3>Afiliado se cadastra</h3><p>Recebe um link único para divulgar produtos selecionados</p></div>
    <div><b>2</b><h3>Cliente compra</h3><p>A venda acontece pelo checkout do produto com rastreamento do afiliado</p></div>
    <div><b>3</b><h3>Comissão é registrada</h3><p>O painel mostra vendas, cliques, conversão e saldo acumulado</p></div>
  </div>
  <div className="affiliateCTA">
    <strong>Próxima fase:</strong>
    <span>Área de login, links únicos, painel de comissões e ranking de afiliados</span>
    <a href={wa()} target="_blank" rel="noreferrer">Quero vender como afiliado</a>
  </div>
</section>}

function FAQ(){return <section id="faq" className="faq"><h2>Perguntas rápidas</h2><div><details open><summary>Como recebo o ebook?</summary><p>Após a compra aprovada, você é direcionado para a página de obrigado e baixa os ebooks comprados na hora</p></details><details><summary>É seguro comprar?</summary><p>Sim, o pagamento é feito pelo Mercado Pago com checkout protegido</p></details><details><summary>Tem suporte?</summary><p>Sim, você pode tirar dúvidas pelo WhatsApp</p></details></div></section>}

function Testimonials(){return <section className="test"><h2>O que nossos <span>clientes</span> dizem</h2><div><blockquote><b>Carlos M.</b><span>★★★★★</span><p>“O ebook de Barbearia foi direto ao ponto e me ajudou a enxergar melhor o caminho”</p></blockquote><blockquote><b>Juliana S.</b><span>★★★★★</span><p>“O de Reeducação Alimentar trouxe orientações simples e fáceis de aplicar”</p></blockquote><blockquote><b>Rafael T.</b><span>★★★★★</span><p>“Vendas Digitais me ajudou a entender novas oportunidades com mais clareza”</p></blockquote></div></section>}

function FinalCTA(){return <section className="final"><div>♛</div><section><h2>Comece hoje e dê o próximo passo</h2><p>Escolha um ebook, acesse agora e dê o próximo passo</p></section><a href="#best">Escolher meu ebook →</a></section>}
function Footer({onSecretAdminClick}){return <footer><button type="button" className="footerSecretAdmin" onClick={onSecretAdminClick}>♛ IMPÉRIO DIGITAL</button><b>Compra segura • Acesso imediato • Suporte WhatsApp • Garantia 7 dias</b></footer>}


function CheckoutPage(){
  const [cart,setCart] = useState([]);
  const [customer,setCustomer] = useState({name:'',email:'',whatsapp:''});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const isTestCheckout = new URLSearchParams(window.location.search).get('teste') === '1';

  React.useEffect(()=>{setCart(JSON.parse(localStorage.getItem('imperio_cart') || '[]'))},[]);
  const total = cart.reduce((sum,p)=>sum + priceNumber(p.price),0);
  const displayTotal = isTestCheckout ? 0 : total;

  async function finishCheckout(e){
    e.preventDefault();
    setError('');
    if(cart.length === 0) return setError('Seu carrinho está vazio.');

    if(isTestCheckout){
      localStorage.setItem('imperio_last_order', JSON.stringify({
        cart,
        customer: {
          name: customer.name || 'Cliente Teste',
          email: customer.email || 'teste@imperiodigital.com',
          whatsapp: customer.whatsapp || '11999999999'
        },
        total: 0,
        test:true
      }));
      window.location.href = '/obrigado?teste=1';
      return;
    }

    if(total < 1.99) return setError('Compra mínima de R$1,99 para finalizar no checkout.');
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
        <span className="checkoutLead">Preencha seus dados e pague com Pix ou cartão pelo Mercado Pago</span>
        {isTestCheckout && <div className="checkoutError">🧪 Modo teste ativo: esta compra será simulada por R$0, sem abrir o Mercado Pago.</div>}
        <label>Nome completo<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Seu nome"/></label>
        <label>Email<input type="email" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})} placeholder="seuemail@exemplo.com"/></label>
        <label>WhatsApp<input value={customer.whatsapp} onChange={e=>setCustomer({...customer,whatsapp:e.target.value})} placeholder="(11) 99999-9999"/></label>
        {error && <div className="checkoutError">{error}</div>}
        <button disabled={loading}>{isTestCheckout ? 'Simular pagamento R$0' : (loading ? 'Gerando pagamento...' : 'Pagar com Mercado Pago')}</button>
        <small>🔒 Pagamento protegido no ambiente seguro do Mercado Pago</small>
      </form>
      <aside className="checkoutSummary">
        <h2>Resumo do pedido</h2>
        {cart.length === 0 ? <p>Seu carrinho está vazio</p> : cart.map(item=><div className="summaryItem" key={item.id}><img src={item.img} alt={item.title} loading="lazy" decoding="async"/><div><b>{item.title}</b><span>{item.price}</span></div></div>)}
        <div className="summaryTotal"><span>{isTestCheckout ? 'Total no modo teste' : 'Total'}</span><strong>R$ {displayTotal.toFixed(2).replace('.',',')}</strong></div>
        <em>{isTestCheckout ? 'Teste interno: nenhum valor será cobrado' : 'Compra mínima: R$1,99'}</em>
        <a href="/">Continuar comprando</a>
      </aside>
    </section>
  </main>
}

function ThankYouPage(){
  const [order,setOrder] = useState(null);
  const [token,setToken] = useState(null);
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState('Verificando pagamento...');
  const [error,setError] = useState('');

  React.useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');
    const isTest = params.get('teste') === '1';

    if(isTest || !orderId){
      const localOrder = JSON.parse(localStorage.getItem('imperio_last_order') || 'null');

      if(localOrder){
        setOrder({
          status: localOrder.test ? 'approved' : 'local',
          items: localOrder.cart || [],
          amount: localOrder.total || 0,
          customer_name: localOrder.customer?.name || 'Cliente'
        });
        setToken(localOrder.test ? 'TESTE_R0' : null);
        setMessage(isTest ? 'Modo teste aprovado. Seus downloads estão liberados.' : 'Seus ebooks estão liberados.');
      }

      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 20;
    let intervalId = null;

    async function checkOrder(){
      try{
        attempts += 1;

        const res = await fetch(`/api/order-status?order_id=${encodeURIComponent(orderId)}`);
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.error || 'Não foi possível consultar o pedido.');
        }

        setOrder(data.order || null);
        setToken(data.token?.token || null);

        if(data.order?.status === 'approved' && data.token?.token){
          setMessage('Pagamento aprovado. Seus ebooks estão liberados.');
          setLoading(false);
          return true;
        }

        if(data.order?.status === 'approved' && !data.token?.token){
          setMessage('Pagamento aprovado. Preparando seus links de download...');
        }else if(data.order?.status === 'pending'){
          setMessage('Pagamento em processamento. Aguarde alguns segundos...');
        }else if(data.order?.status === 'payment_error'){
          setMessage('Houve um problema ao criar o pagamento.');
          setLoading(false);
          return true;
        }else{
          setMessage('Verificando pagamento...');
        }

        if(attempts >= maxAttempts){
          setLoading(false);
          setMessage('Ainda não conseguimos confirmar o pagamento automaticamente.');
          return true;
        }

        return false;
      }catch(err){
        setError(err.message || 'Erro ao consultar pedido.');
        setLoading(false);
        return true;
      }
    }

    checkOrder().then((done)=>{
      if(done) return;

      intervalId = setInterval(async ()=>{
        const doneNow = await checkOrder();

        if(doneNow && intervalId){
          clearInterval(intervalId);
        }
      }, 4000);
    });

    return () => {
      if(intervalId) clearInterval(intervalId);
    };
  },[]);

  const purchased = order?.items || [];

  function getProductInfo(item){
    const product = products.find(p => String(p.id) === String(item.id));
    return {
      ...item,
      title: product?.title || item.title,
      img: product?.img || '/vendas-digitais.png',
      price: product?.price || (item.price ? `R$ ${Number(item.price).toFixed(2).replace('.',',')}` : ''),
      file: product?.file || item.file
    };
  }

  function downloadLink(item){
    if(token === 'TESTE_R0'){
      const product = products.find(p => String(p.id) === String(item.id));
      return product?.file || item.file || '#';
    }

    return `/api/download?token=${encodeURIComponent(token)}&product_id=${encodeURIComponent(item.id)}`;
  }

  const canDownload = token && purchased.length > 0;

  return <main className="thanksPage">
    <section>
      <div>{canDownload ? '✅' : '⏳'}</div>
      <p className="red">{canDownload ? 'COMPRA APROVADA' : 'AGUARDANDO CONFIRMAÇÃO'}</p>
      <h1>{canDownload ? 'Seus ebooks estão liberados' : 'Estamos verificando seu pagamento'}</h1>
      <span>{message}</span>

      {loading && <div className="checkoutError" style={{marginTop:'18px'}}>
        Aguarde, isso pode levar alguns segundos após o pagamento.
      </div>}

      {error && <div className="checkoutError" style={{marginTop:'18px'}}>
        {error}
      </div>}

      <div className="thanksProducts">
        {purchased.length === 0 ? (
          <article>
            <b>Não encontramos produtos neste pedido.</b>
            <p>Se você já pagou, fale com o suporte para receber seu acesso.</p>
            <a href={wa()} target="_blank" rel="noreferrer">Falar com suporte</a>
          </article>
        ) : purchased.map(item => {
          const p = getProductInfo(item);

          return <article key={p.id}>
            <img src={p.img} alt={p.title} loading="lazy" decoding="async"/>
            <b>{p.title}</b>

            {canDownload ? (
              <a href={downloadLink(p)} target="_blank" rel="noreferrer">
                Baixar Ebook Agora
              </a>
            ) : (
              <button disabled style={{opacity:.55,cursor:'not-allowed'}}>
                Aguardando aprovação
              </button>
            )}
          </article>
        })}
      </div>

      {!canDownload && <a className="thanksBtn" href={wa()} target="_blank" rel="noreferrer">
        💬 Falar com suporte
      </a>}

      <a className="thanksBtn quizThanksBtn" href="/descobrir-negocio">🤖 Descobrir meu melhor negócio</a>
      <a className="thanksBtn" href="/">Voltar para o site</a>
    </section>
  </main>
}

function QuizProPage(){
  const [step,setStep] = useState(0);
  const [answers,setAnswers] = useState([]);

  const questions = [
    {
      title:"Você prefere começar trabalhando com o quê?",
      options:[
        ["💻","Internet, celular e vendas online","digital"],
        ["🛠️","Ferramentas, consertos e prática manual","tecnico"],
        ["✂️","Beleza, estética ou atendimento","beleza"],
        ["🧁","Comida, doces ou produção artesanal","producao"],
        ["🗓️","Organização, rotina e produtividade","organizacao"]
      ]
    },
    {
      title:"Quanto você tem para começar?",
      options:[
        ["🪙","Quase nada, quero começar do zero","digital"],
        ["💼","Até R$300","organizacao"],
        ["💵","Até R$1.000","tecnico"],
        ["💰","Mais de R$1.000","beleza"]
      ]
    },
    {
      title:"Qual resultado você busca primeiro?",
      options:[
        ["⚡","Fazer renda extra rápido","digital"],
        ["💼","Aprender uma profissão prática","tecnico"],
        ["👥","Atender clientes e crescer aos poucos","beleza"],
        ["🛒","Produzir e vender algo meu","producao"],
        ["🎯","Me organizar para empreender melhor","organizacao"]
      ]
    },
    {
      title:"Você prefere trabalhar mais...",
      options:[
        ["🌐","Online","digital"],
        ["🏪","Presencialmente","beleza"],
        ["⚙️","Com serviços técnicos","tecnico"],
        ["🏠","Em casa produzindo","producao"],
        ["📊","Planejando e estruturando","organizacao"]
      ]
    }
  ];

  const data = {
    digital:{
      title:"VENDAS DIGITAIS",
      text:"Você tem perfil para negócios online, produtos digitais e renda extra usando celular e internet",
      products:[3,16,17]
    },
    tecnico:{
      title:"ASSISTÊNCIA TÉCNICA",
      text:"Você combina com serviços práticos, consertos e negócios com demanda local",
      products:[1,101,102]
    },
    beleza:{
      title:"BELEZA E ATENDIMENTO",
      text:"Você combina com negócios presenciais, estética e atendimento ao cliente",
      products:[2,201,202]
    },
    producao:{
      title:"PRODUÇÃO E VENDA",
      text:"Você combina com produção caseira, doces, alimentos e venda recorrente",
      products:[8,7,16]
    },
    organizacao:{
      title:"NEGÓCIO ORGANIZADO",
      text:"Você combina com planejamento, produtividade e estruturação antes de crescer",
      products:[11,12,16]
    }
  };

  function choose(type){
    const updated = [...answers,type];
    setAnswers(updated);
    if(step < questions.length - 1) setStep(step + 1);
    else setStep("result");
  }

  function resultKey(){
    const count = {};
    answers.forEach(a => count[a] = (count[a] || 0) + 1);
    return Object.keys(count).reduce((a,b)=>count[a] > count[b] ? a : b,"digital");
  }

  function goCheckout(productId){
    const product = products.find(p => p.id === productId);
    if(!product) return;

    localStorage.setItem('imperio_cart', JSON.stringify([product]));
    localStorage.setItem('imperio_last_order', JSON.stringify({cart:[product], total: priceNumber(product.price)}));
    window.location.href = '/checkout';
  }

  if(step === "result"){
    const result = data[resultKey()];
    return <main className="quizPro quizDark">
      <section className="quizResultPro">
        <div className="quizResultTop">
          <a href="/" className="quizResultLogo">♛ IMPÉRIO <span>DIGITAL</span></a>
          <small>🛡️ Ambiente Seguro</small>
        </div>

        <div className="quizResultHero">
          <span>♕</span>
          <p>SEU PERFIL COMBINA COM</p>
          <h1>{result.title}</h1>
          <small>{result.text}</small>
        </div>

        <div className="quizResultList">
          <b>Recomendamos que você comece por:</b>
          {result.products.map((id)=>{
            const p = products.find(item => item.id === id);
            if(!p) return null;

            return <article key={p.id}>
              <img src={p.img} alt={p.title} loading="lazy" decoding="async"/>
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <strong>{p.price}</strong>
              <button onClick={()=>goCheckout(p.id)}>Ver produto</button>
            </article>
          })}
        </div>

        <a className="quizAllBtn" href="/#catalogo">Ver todos os produtos</a>
        <button className="quizRedo" onClick={()=>{setStep(0);setAnswers([])}}>↻ Refazer teste</button>
      </section>
    </main>
  }

  const q = questions[step];

  return <main className="quizPro">
    <section className="quizCardPro">
      <div className="quizTop">
        <a href="/" className="quizBrand">♛ <b>IMPÉRIO</b><span>DIGITAL</span></a>
        <small>🛡️ Ambiente Seguro</small>
      </div>

      <p className="quizBadge">CONSULTOR DIGITAL</p>
      <h1>Descubra qual negócio combina <span>com você</span></h1>
      <p className="quizSub">Responda algumas perguntas rápidas e receba uma recomendação personalizada para começar</p>

      <div className="quizProgressLine">
        <small>{step+1} de {questions.length}</small>
        <div><span style={{width:`${((step+1)/questions.length)*100}%`}}></span></div>
      </div>

      <div className="quizQuestion">
        <b>{step+1}</b>
        <h2>{q.title}</h2>
      </div>

      <div className="quizOptionsPro">
        {q.options.map((opt,i)=>(
          <button key={i} onClick={()=>choose(opt[2])}>
            <em>{opt[0]}</em>
            <span>{opt[1]}</span>
            <strong>›</strong>
          </button>
        ))}
      </div>

      <div className="quizFooterProof">
        <span>☆ <b>Mais de 1.284</b><small>alunos satisfeitos</small></span>
        <span>⏱️ <b>Acesso imediato</b><small>após a compra</small></span>
        <span>🛡️ <b>Compra 100%</b><small>segura</small></span>
      </div>
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
        <span>Escolha um ebook e adicione ao carrinho</span>
        <a href="#catalogo" onClick={()=>setOpen(false)}>Ver produtos</a>
      </div> : <div className="cartItems">
        {cart.map(item=><div className="cartItem" key={item.id}>
          <img src={item.img} alt={item.title} loading="lazy" decoding="async"/>
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
        <small>Pagamento único pelo Mercado Pago com Pix e cartão no checkout seguro</small>
      </div>
    </aside>
  </div>
}


function TestModePanel({setTestMode}){
  const testProducts = [
    products.find(p => p.id === 101),
    products.find(p => p.id === 201),
    products.find(p => p.id === 1),
    products.find(p => p.id === 2)
  ].filter(Boolean);

  const total = 0;

  function simulateApprovedPurchase(){
    localStorage.setItem('imperio_last_order', JSON.stringify({
      cart: testProducts,
      customer: { name:'Cliente Teste', email:'teste@imperiodigital.com', whatsapp:'11999999999' },
      total,
      test:true
    }));
    window.location.href = '/obrigado?teste=1';
  }

  function prepareTestCheckout(){
    localStorage.setItem('imperio_cart', JSON.stringify(testProducts));
    window.location.href = '/checkout?teste=1';
  }

  function closeTestMode(){
    localStorage.removeItem('imperio_test_mode');
    setTestMode(false);
  }

  return <aside className="testModePanel">
    <div>
      <b>🧪 Modo teste ativo</b>
      <button onClick={closeTestMode}>×</button>
    </div>
    <p>Use para testar o funil por R$0, sem abrir cobrança real</p>
    <button onClick={simulateApprovedPurchase}>Simular compra R$0 com avulsos</button>
    <button onClick={()=>{window.location.href='/descobrir-negocio'}}>Abrir quiz</button>
    <button onClick={prepareTestCheckout}>Testar checkout R$0 com avulsos</button>
    <small>Para liberar, clique 7 vezes no logo Império Digital</small>
  </aside>
}


function AdminPage(){
  const [password,setPassword] = useState('');
  const [logged,setLogged] = useState(false);
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  async function loadOrders(pass = password){
    setLoading(true);
    setError('');

    try{
      const res = await fetch('/api/admin-orders',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({password:pass})
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || 'Erro ao carregar pedidos.');
      }

      setOrders(data.orders || []);
      setLogged(true);
      sessionStorage.setItem('imperio_admin_logged', 'true');
      sessionStorage.setItem('imperio_admin_password', pass);

    }catch(err){
      setError(err.message || 'Erro inesperado.');
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(()=>{
    const savedLogged = sessionStorage.getItem('imperio_admin_logged') === 'true';
    const savedPass = sessionStorage.getItem('imperio_admin_password') || '';

    if(savedLogged && savedPass){
      setPassword(savedPass);
      loadOrders(savedPass);
    }
  },[]);

  function logout(){
    sessionStorage.removeItem('imperio_admin_logged');
    sessionStorage.removeItem('imperio_admin_password');
    setLogged(false);
    setPassword('');
    setOrders([]);
  }

  function formatDate(value){
    if(!value) return '-';

    try{
      return new Date(value).toLocaleString('pt-BR');
    }catch{
      return value;
    }
  }

  function statusLabel(status){
    if(status === 'approved') return '✅ Aprovado';
    if(status === 'pending') return '⏳ Pendente';
    if(status === 'payment_error') return '❌ Erro no pagamento';
    return status || '-';
  }

  const totalApproved = orders
    .filter(order => order.status === 'approved')
    .reduce((sum,order)=>sum + Number(order.amount || 0),0);

  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const approvedCount = orders.filter(order => order.status === 'approved').length;

  if(!logged){
    return <main className="adminPage">
      <section className="adminLogin">
        <a className="checkoutLogo" href="/">♛ IMPÉRIO <span>DIGITAL</span></a>
        <p className="red">PAINEL ADMIN</p>
        <h1>Acesso restrito</h1>
        <span>Digite a senha administrativa para visualizar pedidos, status, produtos e tokens.</span>

        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Digite sua senha"
            onKeyDown={e=>{if(e.key === 'Enter') loadOrders();}}
          />
        </label>

        {error && <div className="checkoutError">{error}</div>}

        <button onClick={()=>loadOrders()} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar no painel'}
        </button>

        <a href="/">Voltar para o site</a>
      </section>
    </main>
  }

  return <main className="adminPage">
    <section className="adminShell">
      <div className="adminTop">
        <div>
          <p className="red">PAINEL ADMIN</p>
          <h1>Pedidos do Império Digital</h1>
          <span>Controle rápido de vendas, pagamentos, produtos comprados e tokens de download.</span>
        </div>

        <div className="adminActions">
          <button onClick={()=>loadOrders()} disabled={loading}>
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
          <button onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="adminStats">
        <article>
          <span>Total aprovado</span>
          <strong>R$ {totalApproved.toFixed(2).replace('.',',')}</strong>
        </article>
        <article>
          <span>Pedidos aprovados</span>
          <strong>{approvedCount}</strong>
        </article>
        <article>
          <span>Pedidos pendentes</span>
          <strong>{pendingCount}</strong>
        </article>
        <article>
          <span>Total de pedidos</span>
          <strong>{orders.length}</strong>
        </article>
      </div>

      {error && <div className="checkoutError">{error}</div>}

      <div className="adminOrders">
        {orders.length === 0 ? (
          <div className="adminEmpty">Nenhum pedido encontrado ainda.</div>
        ) : orders.map(order => (
          <article className="adminOrderCard" key={order.id}>
            <div className="adminOrderHead">
              <div>
                <b>{order.customer_name || 'Cliente sem nome'}</b>
                <span>{order.email || 'Sem email'} • {order.whatsapp || 'Sem WhatsApp'}</span>
              </div>

              <strong className={`adminStatus ${order.status}`}>
                {statusLabel(order.status)}
              </strong>
            </div>

            <div className="adminOrderMeta">
              <span><b>Pedido:</b> {order.id}</span>
              <span><b>Valor:</b> R$ {Number(order.amount || 0).toFixed(2).replace('.',',')}</span>
              <span><b>Criado:</b> {formatDate(order.created_at)}</span>
              <span><b>Atualizado:</b> {formatDate(order.updated_at)}</span>
              <span><b>MP Preference:</b> {order.mp_preference_id || '-'}</span>
              <span><b>MP Payment:</b> {order.mp_payment_id || '-'}</span>
            </div>

            <div className="adminProducts">
              <b>Produtos comprados</b>
              {(order.items || []).length === 0 ? (
                <p>Nenhum produto salvo neste pedido.</p>
              ) : (
                (order.items || []).map((item,index)=>(
                  <div key={`${order.id}-${item.id}-${index}`}>
                    <span>{item.title || `Produto ${item.id}`}</span>
                    <strong>R$ {Number(item.price || 0).toFixed(2).replace('.',',')}</strong>
                  </div>
                ))
              )}
            </div>

            <div className="adminTokenBox">
              <b>Token de download</b>
              {order.token ? (
                <>
                  <code>{order.token.token}</code>
                  <span>Expira em: {formatDate(order.token.expires_at)}</span>
                  <span>Usado em: {order.token.used_at ? formatDate(order.token.used_at) : 'Ainda não usado'}</span>
                  <a
                    href={`/obrigado?order_id=${order.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir página de obrigado
                  </a>
                </>
              ) : (
                <span>Token ainda não criado.</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
}

function FloatingButtons(){return <><a className="floatZap" href={wa()} target="_blank" rel="noreferrer">💬</a><div className="mobile"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#ebook050">Comprar</a></div></>}

createRoot(document.getElementById('root')).render(<App/>);
