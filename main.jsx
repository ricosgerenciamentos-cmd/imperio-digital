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
{ id:209, title:"Cortes precisos, degradês limpos e atendimento profissional", cat:"Barbearia", intent:"barbearia", tag:"📘 Avulso", img:"/barbearia.png", price:"R$ 4,99", old:"R$ 19,90", file:"/ebooks/Guia-Pratico-para-Cortes-Precisos-Degrades-Limpos-e-Atendimento-Profissional.pdf", desc:"Guia prático para elevar a qualidade dos cortes, acabamento e experiência do cliente" },
{ id:301, title:"Diagnóstico OrganizaPro: Plano de Crescimento para seu Negócio", cat:"Consultoria", intent:"consultoria", tag:"📊 Diagnóstico", img:"/negocio-organizado.png", price:"R$ 497,00", old:"R$ 997,00", file:"", desc:"Análise personalizada do seu negócio com mapa de gargalos, prioridades, funil, processos e plano de ação para vender com mais previsibilidade." },
{ id:302, title:"Projeto de Performance OrganizaPro", cat:"Consultoria", intent:"consultoria", tag:"📈 Performance", img:"/pack-negocios.png", price:"R$ 1.997,00", old:"R$ 3.997,00", file:"", desc:"Implementação comercial com organização de processos, funil de vendas, rotina comercial, captação e indicadores de performance." },
{ id:401, title:"Mini OS IA: Crie um Mini Sistema Operacional com IA no Navegador", cat:"Programação", intent:"programacao", tag:"🚀 Turma Beta", img:"/vendas-digitais.png", price:"R$ 97,00", old:"R$ 297,00", file:"", desc:"Aprenda a criar um desktop no navegador com terminal, janelas, editor de código, sistema de arquivos simulado e agentes de IA." },
{ id:402, title:"Workshop Mini OS IA com Mentoria", cat:"Programação", intent:"programacao", tag:"💻 Workshop", img:"/pack-negocios.png", price:"R$ 497,00", old:"R$ 997,00", file:"", desc:"Workshop prático para criar, personalizar e publicar seu Mini Sistema Operacional com IA como projeto de portfólio." }
];

const filters = [
  ['todos','Todos'],
  ['ganhar','Ganhar dinheiro'],
  ['assistencia','Assistência Técnica'],
  ['barbearia','Barbearia'],
  ['abrir-negocio','Abrir negócio'],
  ['pack','Pack completo'],
  ['organizar','Organização'],
  ['programacao','Programação e IA'],
  ['consultoria','OrganizaPro'],
  ['saude','Saúde'],
  ['estudar','Estudos']
];

const bestIds = [15,401,301,1];

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

function categoryHref(id){
  return id === 'todos' ? '/catalogo' : `/categoria/${id}`;
}

function categoryLabel(id){
  return filters.find(([key]) => key === id)?.[1] || 'Todos';
}

function categoryText(id){
  const texts = {
    todos:'Veja todos os materiais disponíveis no Império Digital e escolha o ebook ideal para o seu momento.',
    ganhar:'Materiais para quem busca renda extra, vendas digitais e ideias práticas para começar.',
    assistencia:'Guias focados em assistência técnica de celular, bancada, clientes e serviços práticos.',
    barbearia:'Conteúdos focados em barbearia, atendimento, cortes, barba, fotos e captação de clientes.',
    'abrir-negocio':'Materiais para clarear ideias, escolher um caminho e começar um negócio com mais segurança.',
    pack:'Pacotes completos para quem quer mais conteúdo em uma única compra.',
    organizar:'Guias para organizar rotina, tarefas e negócios com mais controle.',
    programacao:'Produtos para aprender programação, IA e criar projetos visuais de portfólio.',
    consultoria:'Diagnósticos e serviços OrganizaPro para organizar processos, vendas e crescimento.',
    saude:'Conteúdos práticos para melhorar hábitos e rotina com mais consciência.',
    estudar:'Materiais para organizar melhor os estudos e evoluir com mais foco.'
  };
  return texts[id] || texts.todos;
}

function routeFilterFromPath(path){
  if(path === '/catalogo') return 'todos';
  if(path.startsWith('/categoria/')) return decodeURIComponent(path.replace('/categoria/','')).replace(/\/$/,'');
  return null;
}

function App(){
  const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
  const routeFilter = routeFilterFromPath(rawPath);
  const params = new URLSearchParams(window.location.search);
  const initialSearch = params.get('busca') || '';
  const [search,setSearch] = useState(initialSearch);
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [logoClicks,setLogoClicks] = useState(0);
  const [footerAdminClicks,setFooterAdminClicks] = useState(0);
  const [testMode,setTestMode] = useState(() => localStorage.getItem('imperio_test_mode') === 'true');

  function handleLogoSecretClick(e){
    const next = logoClicks + 1;
    setLogoClicks(next);

    if(next >= 7){
      e.preventDefault();
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

  function submitSearch(value){
    const next = String(value || '').trim();
    if(next) window.location.href = `/catalogo?busca=${encodeURIComponent(next)}`;
  }

  const best = products.filter(p => bestIds.includes(p.id));
  const currentFilter = routeFilter || 'todos';
  const list = useMemo(() => products.filter(p => {
    const byFilter = currentFilter === 'todos' ? !p.hidden : p.intent === currentFilter;
    const bySearch = `${p.title} ${p.cat} ${p.intent} ${p.tag}`.toLowerCase().includes(search.toLowerCase());
    return byFilter && bySearch;
  }), [currentFilter,search]);

  if(rawPath === '/checkout') return <CheckoutPage />;
  if(rawPath === '/obrigado') return <ThankYouPage />;
  if(rawPath === '/descobrir-negocio') return <QuizProPage />;
  if(rawPath === '/admin') return <AdminPage />;
  if(rawPath === '/mini-os') return <MiniOSPage
    search={search}
    setSearch={setSearch}
    submitSearch={submitSearch}
    cart={cart}
    cartOpen={cartOpen}
    setCartOpen={setCartOpen}
    removeFromCart={removeFromCart}
    addToCart={addToCart}
    onLogoSecretClick={handleLogoSecretClick}
    onSecretAdminClick={handleFooterSecretAdminClick}
    testMode={testMode}
    setTestMode={setTestMode}
  />;
  if(rawPath === '/organiza-pro') return <OrganizaProPage
    search={search}
    setSearch={setSearch}
    submitSearch={submitSearch}
    cart={cart}
    cartOpen={cartOpen}
    setCartOpen={setCartOpen}
    removeFromCart={removeFromCart}
    addToCart={addToCart}
    onLogoSecretClick={handleLogoSecretClick}
    onSecretAdminClick={handleFooterSecretAdminClick}
    testMode={testMode}
    setTestMode={setTestMode}
  />;
  if(rawPath === '/sugestoes') return <SuggestionPage
    search={search}
    setSearch={setSearch}
    submitSearch={submitSearch}
    cart={cart}
    cartOpen={cartOpen}
    setCartOpen={setCartOpen}
    removeFromCart={removeFromCart}
    onLogoSecretClick={handleLogoSecretClick}
    onSecretAdminClick={handleFooterSecretAdminClick}
    testMode={testMode}
    setTestMode={setTestMode}
  />;

  if(routeFilter){
    return <StorePage
      filter={currentFilter}
      list={list}
      search={search}
      setSearch={setSearch}
      submitSearch={submitSearch}
      cart={cart}
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
      removeFromCart={removeFromCart}
      addToCart={addToCart}
      onLogoSecretClick={handleLogoSecretClick}
      onSecretAdminClick={handleFooterSecretAdminClick}
      testMode={testMode}
      setTestMode={setTestMode}
    />;
  }

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} submitSearch={submitSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={handleLogoSecretClick}/>
    <Hero best={best}/>
    <PathChooser />
    <TrustBar/>
    <Best best={best} addToCart={addToCart}/>
    <FeaturedMicroEbook addToCart={addToCart}/>
    <MiniOSAndOrganizaCTA />
    <LeadCaptureSection />
    <GoalLinks/>
    <FinalCTA/>
    <Footer onSecretAdminClick={handleFooterSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>} 
  </main>
}

function StorePage({filter,list,search,setSearch,submitSearch,cart,cartOpen,setCartOpen,removeFromCart,addToCart,onLogoSecretClick,onSecretAdminClick,testMode,setTestMode}){
  const label = categoryLabel(filter);
  const title = search ? `Resultado para: ${search}` : filter === 'todos' ? 'Todos os ebooks' : `Ebooks de ${label}`;

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} submitSearch={submitSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={onLogoSecretClick}/>

    <section className="pageHero catalogHero">
      <a className="backLink" href="/">← Voltar para o início</a>
      <p className="red">CATÁLOGO</p>
      <h1>{title}</h1>
      <p>{search ? 'Mostrando apenas os produtos que combinam com sua busca.' : categoryText(filter)}</p>

      <div className="categoryTabs">
        {filters.map(([id,label]) => <a key={id} className={filter === id ? 'active' : ''} href={categoryHref(id)}>{id === 'todos' ? 'Tudo' : label}</a>)}
      </div>
    </section>

    <Catalog list={list} addToCart={addToCart} filter={filter} search={search}/>
    <Footer onSecretAdminClick={onSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>} 
  </main>
}

function TopNotice(){return <div className="notice">🔥 Oferta especial de lançamento • Acesso imediato • Compra segura pelo Mercado Pago • Garantia 7 dias</div>}

function Header({search,setSearch,submitSearch,cartCount,setCartOpen,onLogoSecretClick}){return <header className="header">
  <a className="logo" href="/" onClick={onLogoSecretClick} title="Império Digital"><span>♛</span><div><b>IMPÉRIO</b><small>DIGITAL</small></div></a>
  <nav>
    <a href="/">Início</a>
    <a href="/#best">Mais vendidos</a>
    <a href="/#escolha">Escolher material</a>
    <a href="/catalogo">Tudo</a>
    <a href="/mini-os">Mini OS IA</a>
    <a href="/organiza-pro">OrganizaPro</a>
    <a href="/descobrir-negocio">Quiz</a>
  </nav>
  <form className="search" onSubmit={(e)=>{e.preventDefault(); submitSearch?.(search)}}>
    <span>⌕</span>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ebook"/>
  </form>
  <button className="cartBtn" onClick={()=>setCartOpen(true)}>🛒 <span>{cartCount}</span></button>
  <a className="headBtn" href="/#ebook050">Começar por R$1,99</a>
</header>}

function Hero({best}){return <section id="top" className="hero heroPremium">
  <div className="copy">
    <p className="eyebrow">🔥 IMPÉRIO DIGITAL • PRODUTOS DIGITAIS + IA + CRESCIMENTO</p>
    <h1>Escolha seu próximo passo: <span>aprender, criar ou organizar seu negócio</span></h1>
    <p className="lead">Uma central com ebooks práticos, projetos de programação com IA e diagnóstico para quem quer começar, vender melhor ou estruturar uma operação com mais clareza.</p>

    <div className="heroTrust premiumTrust">
      <span>📚 <b>Ebooks acessíveis</b><small>A partir de R$1,99</small></span>
      <span>🚀 <b>Mini OS IA</b><small>Projeto tech de portfólio</small></span>
      <span>📊 <b>OrganizaPro</b><small>Diagnóstico e performance</small></span>
      <span>🛡️ <b>Compra segura</b><small>Mercado Pago</small></span>
    </div>

    <div className="socialProof premiumProof">
      <b>⭐ Comece pequeno e evolua</b>
      <span>Do ebook de entrada ao produto premium ou consultoria.</span>
    </div>

    <div className="actions">
      <a className="primary pulse" href="#caminhos">Escolher meu caminho</a>
      <a className="secondary" href="/descobrir-negocio">Fazer o quiz</a>
    </div>
    <p className="secureLine">🔒 Compra segura • Acesso imediato quando houver arquivo • Suporte no WhatsApp</p>
  </div>

  <div className="phoneStage">
    <div className="orbit"></div>
    <Phone product={best[0]}/>
  </div>
</section>}

function PathChooser(){
  return <section id="caminhos" className="pathChooser">
    <p className="red">ESCOLHA SEU PRÓXIMO PASSO</p>
    <h2>Três caminhos claros dentro do Império Digital</h2>
    <p className="sub">Você não precisa entender tudo agora. Escolha o caminho que combina com seu momento.</p>

    <div className="pathGrid">
      <article>
        <span>📚</span>
        <b>Quero começar com ebooks</b>
        <p>Materiais baratos e diretos para aprender, testar ideias e dar os primeiros passos.</p>
        <a href="/catalogo">Ver catálogo</a>
      </article>
      <article>
        <span>🚀</span>
        <b>Quero aprender programação com IA</b>
        <p>Crie um mini sistema operacional no navegador com terminal, janelas, editor e agentes de IA.</p>
        <a href="/mini-os">Conhecer Mini OS IA</a>
      </article>
      <article>
        <span>📊</span>
        <b>Quero organizar meu negócio</b>
        <p>Receba um diagnóstico para estruturar vendas, processos, captação e crescimento.</p>
        <a href="/organiza-pro">Conhecer OrganizaPro</a>
      </article>
    </div>
  </section>
}

function Phone({product}){const phoneProducts = products.filter(p=>[1,2,3,4,15,16].includes(p.id)); return <aside className="phone premiumPhone"><div className="screen">
  <div className="phoneNav">☰ <b>♛ IMPÉRIO <small>DIGITAL</small></b> 🛒</div>
  <h3 className="phoneSectionTitle">CATEGORIAS <a href="/#escolha">Ver</a></h3>
  <div className="phoneProductGrid">
    {phoneProducts.map(p=><img key={p.id} src={p.img} alt={p.title} loading="lazy" decoding="async"/>)}
  </div>
  <a className="phoneBtn" href="/#escolha">ESCOLHER MATERIAL</a>
</div></aside>}

function FeaturedMicroEbook({addToCart}){
  const ebook = products.find(p=>p.id === 15);
  return <section id="ebook050" className="featured050">
    <div className="featured050Card">
      <div className="featured050Copy">
        <p>🔥 OFERTA DE ENTRADA • R$1,99</p>
        <h2>Comece com um ebook simples, barato e direto</h2>
        <span>Um material acessível para quem quer começar hoje com um conteúdo prático, direto e fácil de aplicar.</span>
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
        <span>Oferta de entrada por tempo limitado</span>
      </div>
    </div>
  </section>
}



function leadInterestLabel(value){
  if(value && String(value).includes(' ')) return String(value);
  const labels = {
    home:'Império Digital',
    geral:'Geral',
    mini_os:'Mini OS IA',
    mini_os_workshop:'Workshop Mini OS IA',
    organizapro:'OrganizaPro',
    diagnostico:'Diagnóstico OrganizaPro',
    performance:'Projeto de Performance',
    quiz:'Quiz / Diagnóstico gratuito',
    obrigado:'Pós-compra',
    catalogo:'Catálogo'
  };
  return labels[value] || value || 'Geral';
}

/** WhatsApp wa.me: só dígitos, com DDI 55 (remove espaços, parênteses e traços). */
function waLeadMeUrl(whatsapp){
  const cleaned = String(whatsapp || '').replace(/[\s().-]/g, '');
  const digits = cleaned.replace(/\D/g, '');
  if(!digits) return '';
  const full = digits.startsWith('55') ? digits : `55${digits}`;
  return `https://wa.me/${full}`;
}

function LeadForm({
  source = 'site',
  interest = 'geral',
  title = 'Quer receber mais informações?',
  description,
  subtitle,
  button = 'Enviar',
  compact = false,
  notes: notesProp,
  defaultNotes
}){
  const descText = description ?? subtitle ?? 'Preencha seus dados e vamos te chamar no WhatsApp com o próximo passo.';
  const notesExtra = notesProp ?? defaultNotes ?? '';

  const [form,setForm] = useState({name:'', email:'', whatsapp:''});
  const [status,setStatus] = useState({type:'', message:''});
  const [loading,setLoading] = useState(false);

  function update(field,value){
    setForm(current => ({...current,[field]:value}));
  }

  async function submitLead(e){
    e.preventDefault();
    setStatus({type:'', message:''});

    const name = form.name.trim();
    const email = form.email.trim();
    const whatsapp = form.whatsapp.trim();

    if(!name){
      setStatus({type:'error', message:'Informe seu nome.'});
      return;
    }
    if(!whatsapp){
      setStatus({type:'error', message:'Informe seu WhatsApp para recebermos você.'});
      return;
    }

    try{
      setLoading(true);
      const notes =
        notesExtra.trim() ||
        `Lead capturado em ${source} com interesse em ${leadInterestLabel(interest)}`;

      const response = await fetch('/api/save-lead', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          name,
          email,
          whatsapp,
          source,
          interest,
          notes
        })
      });

      const data = await response.json().catch(() => ({}));

      if(!response.ok || !data.ok){
        throw new Error(data.error || 'Não foi possível salvar seus dados agora. Tente de novo em instantes.');
      }

      setForm({name:'', email:'', whatsapp:''});
      setStatus({type:'success', message:'Recebido! Vamos te chamar no WhatsApp.'});
    }catch(error){
      setStatus({type:'error', message:error.message || 'Algo deu errado ao enviar. Verifique sua internet e tente de novo.'});
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="leadFormBox">
      <form className={compact ? 'leadForm leadFormCompact' : 'leadForm'} onSubmit={submitLead}>
        <div className="leadFormHead">
          <p className="red">CAPTURA DE INTERESSE</p>
          <h2>{title}</h2>
          <span>{descText}</span>
        </div>

        <div className="leadFormGrid">
          <label>Nome<input value={form.name} onChange={e=>update('name', e.target.value)} placeholder="Seu nome" autoComplete="name"/></label>
          <label>WhatsApp<input value={form.whatsapp} onChange={e=>update('whatsapp', e.target.value)} placeholder="(00) 00000-0000" inputMode="tel" autoComplete="tel"/></label>
          <label>Email <small className="leadOptionalHint">(opcional)</small><input type="email" value={form.email} onChange={e=>update('email', e.target.value)} placeholder="seuemail@exemplo.com" autoComplete="email"/></label>
        </div>

        {status.message && <div className={`leadStatus ${status.type}`}>{status.message}</div>}

        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : button}</button>
        <small>Ao enviar, você autoriza contato sobre {leadInterestLabel(interest)}. Seus dados não aparecem publicamente.</small>
      </form>
    </div>
  );
}

function LeadCaptureSection(){
  return <section className="leadCaptureHome">
    <div>
      <p className="red">NÃO SABE POR ONDE COMEÇAR?</p>
      <h2>Receba o próximo passo ideal para você</h2>
      <p>Escolha se quer começar por ebooks, criar um projeto com IA ou organizar seu negócio. Nós te chamamos com o caminho recomendado.</p>
    </div>
    <LeadForm
      source="home"
      interest="geral"
      title="Quero orientação rápida"
      description="Deixe seu contato e diga pelo WhatsApp qual caminho quer seguir."
      button="Quero meu próximo passo"
      compact
    />
  </section>
}

function MiniOSAndOrganizaCTA(){
  return <section className="doubleCTA upgradedDoubleCTA">
    <article>
      <p>🚀 PRODUTO TECH PREMIUM</p>
      <h2>Mini OS IA: um projeto de portfólio que chama atenção</h2>
      <span>Aprenda criando um desktop no navegador com terminal, janelas, editor de código e agentes de IA. Ideal para iniciantes, devs júnior e criadores tech.</span>
      <a href="/mini-os">Entrar na turma beta</a>
    </article>

    <article>
      <p>📊 CONSULTORIA E PERFORMANCE</p>
      <h2>OrganizaPro: diagnóstico para vender com previsibilidade</h2>
      <span>Mapeamos gargalos de vendas, atendimento, captação e processos para entregar um plano de ação claro.</span>
      <a href="/organiza-pro">Fazer diagnóstico</a>
    </article>
  </section>
}

function buyProduct(product, addToCart){
  if(!product) return;
  addToCart(product);
  localStorage.setItem('imperio_cart', JSON.stringify([product]));
  window.location.href = '/checkout';
}

function MiniOSPage({search,setSearch,submitSearch,cart,cartOpen,setCartOpen,removeFromCart,addToCart,onLogoSecretClick,onSecretAdminClick,testMode,setTestMode}){
  const miniOS = products.find(p => p.id === 401);
  const workshop = products.find(p => p.id === 402);

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} submitSearch={submitSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={onLogoSecretClick}/>

    <section className="miniOsHero miniOsHeroV2">
      <div>
        <p className="red">🚀 TURMA BETA • PROGRAMAÇÃO + IA</p>
        <h1>Crie um projeto de portfólio que parece coisa de hacker de filme</h1>
        <p>Em 7 dias, você constrói um mini sistema operacional no navegador com terminal, janelas, editor de código, sistema de arquivos simulado e agentes de IA. Não é teoria solta: é um projeto visual para mostrar.</p>

        <div className="miniOsActions">
          <button onClick={()=>buyProduct(miniOS, addToCart)}>Entrar na turma beta por R$97</button>
          <a href="#programa">Ver o que vou construir</a>
        </div>

        <div className="miniProofLine">
          <span>✅ Template base</span>
          <span>✅ 7 aulas curtas</span>
          <span>✅ Código-fonte</span>
          <span>✅ Desafio final</span>
        </div>
      </div>

      <div className="miniOsScreen">
        <div className="miniOsTop"><span></span><span></span><span></span></div>
        <div className="miniOsDesktop">
          <div className="miniWindow terminal">
            <b>Terminal</b>
            <code>$ boot imperio-os<br/>sistema iniciado ✅<br/>$ create robot<br/>agente online 🤖<br/>$ run world</code>
          </div>
          <div className="miniWindow editor">
            <b>Editor</b>
            <code>agent Robo {'{'}<br/>&nbsp;&nbsp;memory: true<br/>&nbsp;&nbsp;task: explore<br/>&nbsp;&nbsp;talk: smart<br/>{'}'}</code>
          </div>
          <div className="miniOsDock"><span>Terminal</span><span>Editor</span><span>Files</span><span>AI</span></div>
        </div>
      </div>
    </section>

    <section className="leadBlock leadBlockMini">
      <LeadForm
        source="mini-os"
        interest="Mini OS IA"
        title="Quer entrar na turma beta ou tirar dúvidas?"
        description="Deixe seu contato e vamos te chamar com detalhes do Mini OS IA, acesso, aulas e próximos passos."
        button="Quero saber sobre o Mini OS IA"
      />
    </section>

    <section id="programa" className="miniOsProgram">
      <p className="red">O QUE VOCÊ VAI CONSTRUIR</p>
      <h2>Um mini computador dentro do navegador</h2>

      <div className="miniOsGrid">
        <article><b>🖥️ Desktop no navegador</b><p>Interface visual com janelas, área de trabalho e aparência de sistema próprio.</p></article>
        <article><b>⌨️ Terminal funcional</b><p>Comandos simulados para criar arquivos, abrir apps e controlar agentes.</p></article>
        <article><b>🧠 IA fake convincente</b><p>Agentes com respostas, memória simples e comportamento programável.</p></article>
        <article><b>📁 Sistema de arquivos</b><p>Arquivos e pastas simulados para dar sensação real de sistema operacional.</p></article>
        <article><b>🧩 Linguagem simples</b><p>Sintaxe própria para controlar robôs, tarefas e ações dentro do ambiente.</p></article>
        <article><b>🚀 Publicação online</b><p>Você finaliza com um projeto compartilhável para portfólio, currículo e redes.</p></article>
      </div>
    </section>

    <section className="miniLessonPlan">
      <p className="red">PLANO EM 7 AULAS</p>
      <h2>Roteiro simples para sair do zero ao projeto publicado</h2>
      <div>
        <article><span>1</span><b>Desktop</b><p>Criar a base visual do sistema.</p></article>
        <article><span>2</span><b>Terminal</b><p>Comandos e respostas simuladas.</p></article>
        <article><span>3</span><b>Linguagem fake</b><p>Sintaxe simples para controlar ações.</p></article>
        <article><span>4</span><b>Arquivos</b><p>Sistema de arquivos virtual.</p></article>
        <article><span>5</span><b>Agentes IA</b><p>NPCs e robôs com comportamento.</p></article>
        <article><span>6</span><b>Publicação</b><p>Colocar o projeto online.</p></article>
        <article><span>7</span><b>Portfólio</b><p>Personalizar e apresentar o projeto.</p></article>
      </div>
    </section>

    <section className="miniOsOffer">
      <div>
        <p className="red">OFERTA DE LANÇAMENTO</p>
        <h2>Turma beta Mini OS IA</h2>
        <p>Receba template base, 7 aulas curtas, código-fonte, desafio final e acesso ao projeto para criar sua própria versão.</p>
      </div>
      <div>
        <small>De R$297 por</small>
        <strong>R$97</strong>
        <button onClick={()=>buyProduct(miniOS, addToCart)}>Garantir acesso</button>
      </div>
    </section>

    <section className="leadBlock leadBlockMiniWorkshop">
      <LeadForm
        source="mini-os"
        interest="Workshop Mini OS IA com mentoria"
        title="Quer mentoria para personalizar seu projeto?"
        description="Deixe seu contato para receber informações do workshop com mentoria."
        button="Quero informações da mentoria"
      />
    </section>

    <section className="miniOsOffer miniOsOfferLight">
      <div>
        <p className="red">VERSÃO COM MENTORIA</p>
        <h2>Workshop Mini OS IA</h2>
        <p>Para quem quer acompanhamento para personalizar, publicar e apresentar o projeto como portfólio.</p>
      </div>
      <div>
        <small>De R$997 por</small>
        <strong>R$497</strong>
        <button onClick={()=>buyProduct(workshop, addToCart)}>Comprar workshop</button>
      </div>
    </section>

    <Footer onSecretAdminClick={onSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>} 
  </main>
}

function OrganizaProPage({search,setSearch,submitSearch,cart,cartOpen,setCartOpen,removeFromCart,addToCart,onLogoSecretClick,onSecretAdminClick,testMode,setTestMode}){
  const diagnostico = products.find(p => p.id === 301);
  const performance = products.find(p => p.id === 302);

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} submitSearch={submitSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={onLogoSecretClick}/>

    <section className="organizaHero organizaHeroV2">
      <p className="red">ORGANIZAPRO • PERFORMANCE E EXPANSÃO</p>
      <h1>Seu negócio vende pouco ou vende sem previsibilidade?</h1>
      <p>A OrganizaPro organiza sua operação comercial com diagnóstico, processos, captação e plano de crescimento para você parar de depender de sorte e começar a decidir com método.</p>

      <div className="organizaActions">
        <a href="/descobrir-negocio">Fazer diagnóstico gratuito</a>
        <button onClick={()=>buyProduct(diagnostico, addToCart)}>Contratar diagnóstico completo</button>
      </div>

      <div className="miniProofLine organizaProofLine">
        <span>📌 Gargalos</span>
        <span>📊 Funil</span>
        <span>📞 Atendimento</span>
        <span>🚀 Plano de ação</span>
      </div>
    </section>

    <section className="leadBlock leadBlockOrganiza">
      <LeadForm
        source="organiza-pro"
        interest="Diagnóstico OrganizaPro"
        title="Quer que a gente analise seu negócio?"
        description="Deixe seu contato e vamos te chamar para entender sua operação, vendas e próximos passos."
        button="Quero meu diagnóstico"
      />
    </section>

    <section className="organizaProblems">
      <p className="red">O QUE RESOLVEMOS</p>
      <h2>Mais vendas não começam com mais bagunça. Começam com processo.</h2>

      <div>
        <article><b>Falta de previsibilidade</b><p>Você não sabe quantos clientes vai conseguir no mês e vive apagando incêndio.</p></article>
        <article><b>Processos desorganizados</b><p>Atendimento, vendas e marketing não seguem uma rotina clara.</p></article>
        <article><b>Conversão inconsistente</b><p>Entram oportunidades, mas muitas se perdem por falta de follow-up.</p></article>
        <article><b>Marketing desconectado</b><p>Conteúdo e anúncios não conversam com o processo comercial.</p></article>
      </div>
    </section>

    <section className="organizaMethod">
      <p className="red">METODOLOGIA ORGANIZAPRO</p>
      <h2>Diagnóstico → Estruturação → Captação → Escala</h2>

      <div>
        <article><span>1</span><b>Diagnóstico</b><p>Mapeamos gargalos, oportunidades e prioridades reais.</p></article>
        <article><span>2</span><b>Estruturação</b><p>Organizamos oferta, processo, atendimento e rotina comercial.</p></article>
        <article><span>3</span><b>Captação</b><p>Criamos caminhos para gerar oportunidades com consistência.</p></article>
        <article><span>4</span><b>Escala</b><p>Acompanhamos indicadores e otimizamos o crescimento.</p></article>
      </div>
    </section>

    <section className="organizaDeliverables">
      <p className="red">O QUE VOCÊ RECEBE NO DIAGNÓSTICO</p>
      <h2>Uma visão clara do que corrigir primeiro</h2>
      <div>
        <article><b>Mapa de gargalos</b><p>O que está travando vendas, atendimento e captação.</p></article>
        <article><b>Plano de 7 dias</b><p>Prioridades imediatas para organizar a operação.</p></article>
        <article><b>Funil recomendado</b><p>Como transformar interesse em oportunidade e venda.</p></article>
        <article><b>Próximos passos</b><p>O que fazer sozinho e o que pode ser implementado com acompanhamento.</p></article>
      </div>
    </section>

    <section className="organizaOffer">
      <div>
        <p className="red">PRÓXIMO PASSO</p>
        <h2>Diagnóstico OrganizaPro</h2>
        <p>Receba uma análise personalizada do seu negócio com mapa de gargalos, prioridades e plano de ação.</p>
      </div>
      <div>
        <small>Oferta inicial</small>
        <strong>R$497</strong>
        <button onClick={()=>buyProduct(diagnostico, addToCart)}>Contratar diagnóstico</button>
      </div>
    </section>

    <section className="leadBlock leadBlockPerformance">
      <LeadForm
        source="organiza-pro"
        interest="Projeto de Performance OrganizaPro"
        title="Quer um projeto de performance para sua empresa?"
        description="Deixe seu contato e vamos te chamar para entender tamanho do negócio, gargalos e objetivo de crescimento."
        button="Quero falar sobre performance"
      />
    </section>

    <section className="organizaOffer miniOsOfferLight">
      <div>
        <p className="red">IMPLEMENTAÇÃO</p>
        <h2>Projeto de Performance OrganizaPro</h2>
        <p>Para negócios que querem implementação de processos, funil comercial, captação e rotina de vendas.</p>
      </div>
      <div>
        <small>Projeto inicial</small>
        <strong>R$1.997</strong>
        <button onClick={()=>buyProduct(performance, addToCart)}>Solicitar projeto</button>
      </div>
    </section>

    <Footer onSecretAdminClick={onSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>} 
  </main>
}

function TrustBar(){return <section className="trustBar"><div>🛡️<b>Compra segura pelo Mercado Pago</b><p>Checkout protegido</p></div><div>⚡<b>Acesso imediato</b><p>Receba após a confirmação</p></div><div>🎯<b>Escolha por interesse</b><p>Encontre materiais alinhados ao que você procura</p></div><div>🏅<b>Garantia 7 dias</b><p>Compre com segurança</p></div></section>}

function Best({best,addToCart}){return <section id="best" className="best"><p className="red">MAIS PROCURADOS AGORA</p><h2>Produtos em destaque para começar</h2><p className="sub">Uma seleção inicial dos materiais mais procurados para você começar com segurança.</p><div className="bestGrid">{best.map(p=><Product p={p} compact addToCart={addToCart} key={p.id}/>)}</div></section>}

function GoalLinks(){
  const goals = [
    ['ganhar','Ganhar dinheiro'],
    ['assistencia','Assistência Técnica'],
    ['barbearia','Barbearia'],
    ['abrir-negocio','Abrir negócio'],
    ['pack','Pack completo'],
    ['organizar','Organização'],
    ['programacao','Programação e IA'],
    ['consultoria','OrganizaPro'],
    ['saude','Saúde'],
    ['estudar','Estudos']
  ];

  return <section id="escolha" className="filters goalChooser compactGoalChooser">
    <p className="red">ESCOLHA SEU MATERIAL</p>
    <h2>Encontre o ebook ideal para você</h2>
    <p className="sub">Selecione uma área de interesse e veja os materiais disponíveis.</p>
    <div className="goalGrid simpleGoalGrid">
      {goals.map(([id,title])=><a className="goalCard simpleGoalCard" href={categoryHref(id)} key={id}>
        <h3>{title}</h3>
      </a>)}
      <a className="goalCard simpleGoalCard allGoalCard" href="/catalogo"><h3>Ver todos</h3></a>
    </div>
  </section>
}

function Catalog({list,addToCart,filter,search}){
  const selected = categoryLabel(filter);
  const title = search ? `Resultado para: ${search}` : filter === 'todos' ? 'Todos os ebooks' : `Ebooks de ${selected}`;

  return <section id="catalogo" className="catalog routeCatalog">
    <p className="red">MATERIAIS DISPONÍVEIS</p>
    <h2>{title}</h2>
    <p className="sub">Veja os ebooks disponíveis nesta categoria e escolha o material ideal para você.</p>
    {list.length === 0 ? <div className="emptyCatalog">Nenhum ebook encontrado nessa busca.</div> : <div className="grid">{list.map(p=><Product p={p} addToCart={addToCart} key={p.id}/>)}</div>}
  </section>
}

function Product({p,compact,addToCart}){
  const limit = compact ? 94 : 118;
  const desc = p.desc && p.desc.length > limit ? `${p.desc.slice(0, limit)}...` : p.desc;

  return <article className={compact?'card compact cleanCard':'card cleanCard'}>
    <div className="imgWrap">
      <img src={p.img} alt={p.title} loading="lazy" decoding="async"/>
      <span>{p.tag}</span>
    </div>
    <div className="body">
      <small className="catLabel">{p.cat}</small>
      <h3>{p.title}</h3>
      <p>{desc}</p>
      <small>De {p.old}</small>
      <strong>Por {p.price}</strong>
      <em>Acesso imediato</em>
      <button className="buy singleBuy" onClick={()=>addToCart(p)}>Comprar agora</button>
    </div>
  </article>
}

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

function FinalCTA(){
  return (
    <section className="final finalHelp finalFixedActions">
      <div className="finalIcon">♛</div>

      <div className="finalCopy">
        <h2>Escolha um ebook e comece hoje</h2>
        <p>Produtos digitais simples, acessíveis e com acesso imediato para você aprender sem complicação.</p>
        <small>Compra segura • Acesso imediato • Garantia 7 dias</small>
      </div>

      <div className="finalActions">
        <a className="finalPrimary" href="#escolha">Escolher material</a>
        <a className="finalWhats" href={wa()} target="_blank" rel="noreferrer">Fale conosco</a>
        <a className="finalSuggest" href="/sugestoes">Enviar sugestão</a>
      </div>
    </section>
  );
}
function Footer({onSecretAdminClick}){return <footer><button type="button" className="footerSecretAdmin" onClick={onSecretAdminClick}>♛ IMPÉRIO DIGITAL</button><b>Compra segura • Acesso imediato • Garantia 7 dias</b></footer>}


function SuggestionPage({search,setSearch,submitSearch,cart,cartOpen,setCartOpen,removeFromCart,onLogoSecretClick,onSecretAdminClick,testMode,setTestMode}){
  const emptyForm = {name:'',whatsapp:'',email:'',theme:'',category:'',description:''};
  const [form,setForm] = useState(emptyForm);
  const [loading,setLoading] = useState(false);
  const [status,setStatus] = useState({type:'',message:''});

  function updateField(field,value){
    setForm(current => ({...current,[field]:value}));
  }

  async function handleSuggestionSubmit(e){
    e.preventDefault();
    setLoading(true);
    setStatus({type:'',message:''});

    try{
      const response = await fetch('/api/create-suggestion', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      });

      if(!response.ok) throw new Error('Falha ao enviar sugestão');

      setForm(emptyForm);
      setStatus({type:'success',message:'Sugestão enviada com sucesso. Nossa equipe irá avaliar o tema sugerido.'});
    }catch(error){
      setStatus({type:'error',message:'Não foi possível enviar a sugestão agora. Tente novamente em alguns minutos.'});
    }finally{
      setLoading(false);
    }
  }

  return <main>
    <TopNotice />
    <Header search={search} setSearch={setSearch} submitSearch={submitSearch} cartCount={cart.length} setCartOpen={setCartOpen} onLogoSecretClick={onLogoSecretClick}/>

    <section className="suggestPage">
      <div className="suggestHero">
        <a className="backLink" href="/">← Voltar para o início</a>
        <p className="red">SUGESTÕES</p>
        <h1>Sugira um novo ebook</h1>
        <p>Não encontrou o material que estava procurando? Envie sua sugestão de tema e nossa equipe irá avaliar a possibilidade de desenvolver ou disponibilizar um conteúdo alinhado ao que você precisa.</p>
      </div>

      <form className="suggestForm" onSubmit={handleSuggestionSubmit}>
        <div className="formRow">
          <label>Seu nome<input required value={form.name} onChange={e=>updateField('name', e.target.value)} placeholder="Digite seu nome"/></label>
          <label>WhatsApp para contato<input required value={form.whatsapp} onChange={e=>updateField('whatsapp', e.target.value)} placeholder="(00) 00000-0000"/></label>
        </div>
        <div className="formRow">
          <label>Email<input type="email" value={form.email} onChange={e=>updateField('email', e.target.value)} placeholder="seuemail@exemplo.com"/></label>
          <label>Categoria<select required value={form.category} onChange={e=>updateField('category', e.target.value)}>
            <option value="">Selecione uma categoria</option>
            <option>Ganhar dinheiro</option>
            <option>Assistência Técnica</option>
            <option>Barbearia</option>
            <option>Abrir negócio</option>
            <option>Organização</option>
            <option>Saúde</option>
            <option>Estudos</option>
            <option>Outro tema</option>
          </select></label>
        </div>
        <label>Tema sugerido<input required value={form.theme} onChange={e=>updateField('theme', e.target.value)} placeholder="Exemplo: Como vender doces pelo WhatsApp"/></label>
        <label>O que você gostaria de aprender?<textarea required value={form.description} onChange={e=>updateField('description', e.target.value)} placeholder="Conte brevemente qual material você gostaria de encontrar no site" rows="5"/></label>

        {status.message && <div className={`suggestStatus ${status.type}`}>{status.message}</div>}

        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar sugestão'}</button>
        <small>Suas informações serão usadas apenas para avaliar a sugestão e, se necessário, entrar em contato sobre o tema enviado.</small>
      </form>
    </section>

    <Footer onSecretAdminClick={onSecretAdminClick}/>
    <CartDrawer cart={cart} open={cartOpen} setOpen={setCartOpen} removeFromCart={removeFromCart}/>
    {testMode && <TestModePanel setTestMode={setTestMode}/>} 
  </main>
}

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
        setMessage(isTest ? 'Modo teste aprovado. Seus acessos estão liberados.' : 'Seu pedido foi registrado.');
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
        if(!res.ok) throw new Error(data.error || 'Não foi possível consultar o pedido.');
        setOrder(data.order || null);
        setToken(data.token?.token || null);
        if(data.order?.status === 'approved' && data.token?.token){
          setMessage('Pagamento aprovado. Seus acessos estão liberados.');
          setLoading(false);
          return true;
        }
        if(data.order?.status === 'approved' && !data.token?.token){
          setMessage('Pagamento aprovado. Preparando seus acessos...');
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
        if(doneNow && intervalId) clearInterval(intervalId);
      }, 4000);
    });
    return () => { if(intervalId) clearInterval(intervalId); };
  },[]);

  const purchased = order?.items || [];

  function getProductInfo(item){
    const product = products.find(p => String(p.id) === String(item.id));
    return {
      ...item,
      title: product?.title || item.title,
      img: product?.img || '/vendas-digitais.png',
      price: product?.price || (item.price ? `R$ ${Number(item.price).toFixed(2).replace('.',',')}` : ''),
      file: product?.file || item.file,
      intent: product?.intent || item.intent
    };
  }

  function downloadLink(item){
    if(token === 'TESTE_R0'){
      const product = products.find(p => String(p.id) === String(item.id));
      return product?.file || item.file || '#';
    }
    return `/api/download?token=${encodeURIComponent(token)}&product_id=${encodeURIComponent(item.id)}`;
  }

  function upsellInfo(){
    const ids = purchased.map(item => Number(item.id));
    const intents = purchased.map(item => getProductInfo(item).intent);
    if(ids.some(id => [401].includes(id))){
      return {title:'Quer ajuda para personalizar e publicar seu projeto?',text:'O Workshop Mini OS IA com Mentoria ajuda você a transformar o template em um projeto próprio de portfólio.',cta:'Conhecer workshop',href:'/categoria/programacao'};
    }
    if(ids.some(id => [301,302].includes(id)) || intents.includes('consultoria')){
      return {title:'Próximo passo: agendar sua análise',text:'Fale conosco no WhatsApp para alinhar informações do negócio, horários e próximos passos do diagnóstico ou projeto.',cta:'Agendar no WhatsApp',href:wa()};
    }
    if(ids.some(id => [11,12,16,17].includes(id)) || intents.includes('organizar') || intents.includes('abrir-negocio') || intents.includes('pack')){
      return {title:'Quer um plano personalizado para aplicar isso no seu negócio?',text:'Conheça o Diagnóstico OrganizaPro e receba um mapa de gargalos com plano de ação prático.',cta:'Conhecer OrganizaPro',href:'/organiza-pro'};
    }
    return {title:'Não sabe qual caminho seguir depois?',text:'Faça o quiz e receba uma recomendação personalizada entre ebooks, Mini OS IA e OrganizaPro.',cta:'Fazer o quiz',href:'/descobrir-negocio'};
  }

  const canAccess = token && purchased.length > 0;
  const upsell = upsellInfo();
  const hasService = purchased.some(item => !isDownloadReady(getProductInfo(item)));

  return <main className="thanksPage">
    <section>
      <div>{canAccess ? '✅' : '⏳'}</div>
      <p className="red">{canAccess ? 'COMPRA APROVADA' : 'AGUARDANDO CONFIRMAÇÃO'}</p>
      <h1>{canAccess ? 'Seu acesso está liberado' : 'Estamos verificando seu pagamento'}</h1>
      <span>{message}</span>
      {hasService && canAccess && <div className="serviceAccessNote">Produtos como diagnóstico, workshop e consultoria não têm download automático. Use o botão de WhatsApp para agendar ou receber as instruções.</div>}
      {loading && <div className="checkoutError" style={{marginTop:'18px'}}>Aguarde, isso pode levar alguns segundos após o pagamento.</div>}
      {error && <div className="checkoutError" style={{marginTop:'18px'}}>{error}</div>}

      <div className="thanksProducts">
        {purchased.length === 0 ? (
          <article><b>Não encontramos produtos neste pedido.</b><p>Se você já pagou, fale com o suporte para receber seu acesso.</p><a href={wa()} target="_blank" rel="noreferrer">Falar com suporte</a></article>
        ) : purchased.map(item => {
          const p = getProductInfo(item);
          return <article key={p.id}>
            <img src={p.img} alt={p.title} loading="lazy" decoding="async"/>
            <b>{p.title}</b>
            {canAccess && isDownloadReady(p) ? <a href={downloadLink(p)} target="_blank" rel="noreferrer">Baixar Ebook Agora</a> : canAccess && !isDownloadReady(p) ? <a href={wa(p)} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a> : <button disabled style={{opacity:.55,cursor:'not-allowed'}}>Aguardando aprovação</button>}
          </article>
        })}
      </div>

      {canAccess && <div className="thanksUpsell"><p className="red">PRÓXIMO PASSO RECOMENDADO</p><h2>{upsell.title}</h2><p>{upsell.text}</p><a className="thanksBtn" href={upsell.href} target={upsell.href.startsWith('http') ? '_blank' : undefined} rel={upsell.href.startsWith('http') ? 'noreferrer' : undefined}>{upsell.cta}</a></div>}
      {canAccess && <div className="thanksLeadBox"><LeadForm source="obrigado" interest="pós-compra" title="Quer ajuda com o próximo passo?" description="Deixe um contato atualizado para suporte, agendamento ou orientação depois da compra." button="Quero receber orientação" compact /></div>}
      {!canAccess && <a className="thanksBtn" href={wa()} target="_blank" rel="noreferrer">💬 Falar com suporte</a>}
      <a className="thanksBtn quizThanksBtn" href="/descobrir-negocio">🤖 Descobrir meu melhor caminho</a>
      <a className="thanksBtn" href="/">Voltar para o site</a>
    </section>
  </main>
}

function QuizProPage(){
  const [step,setStep] = useState(0);
  const [answers,setAnswers] = useState([]);

  const questions = [
    {title:"O que você quer conquistar primeiro?",options:[["💰","Começar uma renda extra com pouco investimento","digital"],["💻","Aprender programação/IA criando um projeto visual","programacao"],["📊","Organizar meu negócio e vender com previsibilidade","consultoria"],["🛠️","Aprender uma habilidade prática para atender clientes","tecnico"],["✂️","Trabalhar com beleza, atendimento ou serviço local","beleza"]]},
    {title:"Qual é seu momento hoje?",options:[["🪙","Estou começando do zero","digital"],["🧠","Quero montar um projeto de portfólio","programacao"],["🏪","Já tenho ou quero estruturar um negócio","consultoria"],["🔧","Gosto de prática, ferramentas e serviço técnico","tecnico"],["👥","Quero lidar com pessoas e atendimento","beleza"]]},
    {title:"Qual produto parece mais útil para você agora?",options:[["📚","Um ebook simples e barato para começar","digital"],["🚀","Um curso/projeto chamativo com IA","programacao"],["📈","Um diagnóstico para meu negócio","consultoria"],["🔩","Guias de assistência técnica","tecnico"],["💈","Guias de barbearia/beleza","beleza"]]},
    {title:"Qual resultado faria você sentir que valeu a pena?",options:[["⚡","Ter uma ideia para começar a ganhar dinheiro","digital"],["🖥️","Publicar um projeto diferente no meu portfólio","programacao"],["🎯","Saber exatamente o que corrigir no meu negócio","consultoria"],["📞","Conseguir clientes para um serviço prático","tecnico"],["⭐","Melhorar atendimento e atrair mais clientes locais","beleza"]]}
  ];

  const data = {
    digital:{title:"RENDA EXTRA E VENDAS DIGITAIS",text:"Você está no momento de começar simples, com materiais acessíveis e práticos para testar caminhos.",products:[15,3,16],interest:'catalogo'},
    programacao:{title:"PROGRAMAÇÃO E IA",text:"Você combina com um projeto visual e chamativo: criar um Mini Sistema Operacional com IA no navegador.",products:[401,402,5],interest:'mini_os'},
    consultoria:{title:"NEGÓCIO ESTRUTURADO",text:"Você precisa de clareza, processo e um plano para organizar captação, atendimento e vendas.",products:[301,302,11],interest:'diagnostico'},
    tecnico:{title:"ASSISTÊNCIA TÉCNICA",text:"Você combina com serviços práticos, consertos e negócios com demanda local.",products:[1,101,102],interest:'catalogo'},
    beleza:{title:"BELEZA E ATENDIMENTO",text:"Você combina com negócios presenciais, barbearia, estética e relacionamento com clientes.",products:[2,201,202],interest:'catalogo'}
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
    const key = resultKey();
    const result = data[key] || data.digital;
    const primaryHref = key === 'programacao' ? '/mini-os' : key === 'consultoria' ? '/organiza-pro' : '/catalogo';
    const primaryLabel = key === 'programacao' ? 'Conhecer Mini OS IA' : key === 'consultoria' ? 'Conhecer OrganizaPro' : 'Ver catálogo';
    const notes = `Resultado do quiz: ${result.title}. Respostas: ${answers.join(', ')}`;

    return <main className="quizPro quizDark">
      <section className="quizResultPro">
        <div className="quizResultTop"><a href="/" className="quizResultLogo">♛ IMPÉRIO <span>DIGITAL</span></a><small>🛡️ Ambiente Seguro</small></div>
        <div className="quizResultHero"><span>♕</span><p>SEU PERFIL COMBINA COM</p><h1>{result.title}</h1><small>{result.text}</small></div>
        <div className="quizResultList"><b>Recomendamos que você comece por:</b>{result.products.map((id)=>{const p = products.find(item => item.id === id); if(!p) return null; return <article key={p.id}><img src={p.img} alt={p.title} loading="lazy" decoding="async"/><div><h3>{p.title}</h3><p>{p.desc}</p></div><strong>{p.price}</strong><button onClick={()=>goCheckout(p.id)}>Comprar</button></article>})}</div>
        <div className="quizLeadBox">
          <LeadForm
            source="quiz"
            interest={result.title}
            title="Quer receber seu caminho recomendado no WhatsApp?"
            description="Salve seu resultado e receba orientação do próximo passo com base no seu perfil."
            button="Salvar meu resultado"
            notes={notes}
            compact
          />
        </div>
        <a className="quizAllBtn" href={primaryHref}>{primaryLabel}</a>
        <a className="quizAllBtn quizSecondaryBtn" href="/catalogo">Ver todos os produtos</a>
        <button className="quizRedo" onClick={()=>{setStep(0);setAnswers([])}}>↻ Refazer teste</button>
      </section>
    </main>
  }

  const q = questions[step];
  return <main className="quizPro"><section className="quizCardPro"><div className="quizTop"><a href="/" className="quizBrand">♛ <b>IMPÉRIO</b><span>DIGITAL</span></a><small>🛡️ Ambiente Seguro</small></div><p className="quizBadge">CONSULTOR DIGITAL</p><h1>Descubra qual caminho combina <span>com você</span></h1><p className="quizSub">Responda algumas perguntas rápidas e receba uma recomendação entre ebooks, Mini OS IA e OrganizaPro.</p><div className="quizProgressLine"><small>{step+1} de {questions.length}</small><div><span style={{width:`${((step+1)/questions.length)*100}%`}}></span></div></div><div className="quizQuestion"><b>{step+1}</b><h2>{q.title}</h2></div><div className="quizOptionsPro">{q.options.map((opt,i)=><button key={i} onClick={()=>choose(opt[2])}><em>{opt[0]}</em><span>{opt[1]}</span><strong>›</strong></button>)}</div><div className="quizFooterProof"><span>📚 <b>Ebooks</b><small>começo acessível</small></span><span>🚀 <b>Mini OS IA</b><small>projeto tech</small></span><span>📊 <b>OrganizaPro</b><small>negócio estruturado</small></span></div></section></main>
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
        <a href="/catalogo" onClick={()=>setOpen(false)}>Ver produtos</a>
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
  const [suggestions,setSuggestions] = useState([]);
  const [leads,setLeads] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [suggestionsError,setSuggestionsError] = useState('');
  const [leadsError,setLeadsError] = useState('');

  async function loadLeads(pass = password){
    setLeadsError('');

    try{
      const res = await fetch(`/api/admin-leads?password=${encodeURIComponent(pass)}`, {
        method:'GET',
        headers:{Accept:'application/json'}
      });

      const data = await res.json();

      if(!res.ok || !data.ok){
        throw new Error(data.error || 'Erro ao carregar leads.');
      }

      setLeads(data.leads || []);
    }catch(err){
      setLeadsError(err.message || 'Erro ao carregar leads.');
      setLeads([]);
    }
  }

  async function loadSuggestions(pass = password){
    setSuggestionsError('');

    try{
      const res = await fetch('/api/admin-suggestions',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({password:pass})
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || 'Erro ao carregar sugestões.');
      }

      setSuggestions(data.suggestions || []);
    }catch(err){
      setSuggestionsError(err.message || 'Erro ao carregar sugestões.');
      setSuggestions([]);
    }
  }

  async function loadOrders(pass = password){
    setLoading(true);
    setError('');
    setSuggestionsError('');
    setLeadsError('');

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
      await Promise.all([loadSuggestions(pass), loadLeads(pass)]);

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
    setSuggestions([]);
    setLeads([]);
    setSuggestionsError('');
    setLeadsError('');
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
  const suggestionCount = suggestions.length;
  const leadCount = leads.length;
  const hotLeadCount = leads.filter(lead => {
    const i = String(lead.interest || '').toLowerCase();
    return /organiza|mini os|workshop|diagn|performance|consultoria|programa/i.test(i);
  }).length;

  if(!logged){
    return <main className="adminPage">
      <section className="adminLogin">
        <a className="checkoutLogo" href="/">♛ IMPÉRIO <span>DIGITAL</span></a>
        <p className="red">PAINEL ADMIN</p>
        <h1>Acesso restrito</h1>
        <span>Digite a senha administrativa para visualizar pedidos, leads, sugestões, status, produtos e tokens.</span>

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
          <h1>Painel do Império Digital</h1>
          <span>Controle rápido de vendas, leads, sugestões, oportunidades e tokens de download.</span>
        </div>

        <div className="adminActions">
          <button onClick={()=>loadOrders()} disabled={loading}>
            {loading ? 'Atualizando...' : 'Atualizar tudo'}
          </button>
          <button onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="adminStats adminStatsV3">
        <article><span>Total aprovado</span><strong>R$ {totalApproved.toFixed(2).replace('.',',')}</strong></article>
        <article><span>Pedidos aprovados</span><strong>{approvedCount}</strong></article>
        <article><span>Pedidos pendentes</span><strong>{pendingCount}</strong></article>
        <article><span>Leads capturados</span><strong>{leadCount}</strong></article>
        <article><span>Leads quentes</span><strong>{hotLeadCount}</strong></article>
        <article><span>Sugestões recebidas</span><strong>{suggestionCount}</strong></article>
      </div>

      {error && <div className="checkoutError">{error}</div>}
      {suggestionsError && <div className="checkoutError">{suggestionsError}</div>}
      {leadsError && <div className="checkoutError">{leadsError}</div>}

      <div className="adminSectionTitle adminLeadsTitle">
        <div>
          <p className="red">LEADS / PISTAS</p>
          <h2>Interessados capturados pelo site</h2>
          <span>Leads vindos da home, Mini OS IA, OrganizaPro, quiz e página de obrigado.</span>
        </div>
        <button onClick={()=>loadLeads()} disabled={loading}>Atualizar leads</button>
      </div>

      <div className="adminLeads">
        {leads.length === 0 ? (
          <div className="adminEmpty">Nenhum lead capturado ainda.</div>
        ) : leads.map(lead => {
          const waUrl = waLeadMeUrl(lead.whatsapp);
          return (
            <article className="adminLeadCard" key={lead.id}>
              <div className="adminLeadGrid">
                <div className="adminLeadCell"><span className="adminLeadLabel">Nome</span><b>{lead.name || '—'}</b></div>
                <div className="adminLeadCell"><span className="adminLeadLabel">WhatsApp</span><span>{lead.whatsapp || '—'}</span></div>
                <div className="adminLeadCell"><span className="adminLeadLabel">Email</span><span>{lead.email || '—'}</span></div>
                <div className="adminLeadCell"><span className="adminLeadLabel">Interesse</span><span>{lead.interest || '—'}</span></div>
                <div className="adminLeadCell"><span className="adminLeadLabel">Origem</span><span>{lead.source || '—'}</span></div>
                <div className="adminLeadCell"><span className="adminLeadLabel">Status</span><span>{lead.status || 'novo'}</span></div>
                <div className="adminLeadCell adminLeadCellWide"><span className="adminLeadLabel">Data</span><span>{formatDate(lead.created_at)}</span></div>
                <div className="adminLeadCell adminLeadCellAction">
                  {waUrl ? (
                    <a className="whatsLeadBtn" href={waUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
                  ) : (
                    <span className="adminLeadNoWa">Sem WhatsApp</span>
                  )}
                </div>
              </div>
              {lead.notes && <p className="adminLeadNotes">{lead.notes}</p>}
            </article>
          );
        })}
      </div>

      <div className="adminSectionTitle">
        <div>
          <p className="red">SUGESTÕES</p>
          <h2>Temas sugeridos pelos clientes</h2>
          <span>Veja ideias de novos ebooks enviadas pelo formulário do site.</span>
        </div>
        <button onClick={()=>loadSuggestions()} disabled={loading}>Atualizar sugestões</button>
      </div>

      <div className="adminSuggestions">
        {suggestions.length === 0 ? (
          <div className="adminEmpty">Nenhuma sugestão recebida ainda.</div>
        ) : suggestions.map(item => (
          <article className="adminSuggestionCard" key={item.id}>
            <div className="adminSuggestionHead">
              <div><b>{item.theme || 'Tema sem título'}</b><span>{item.category || 'Sem categoria'} • {formatDate(item.created_at)}</span></div>
              <strong>{item.status || 'nova'}</strong>
            </div>
            <p>{item.description || 'Sem descrição.'}</p>
            <div className="adminSuggestionMeta">
              <span><b>Nome:</b> {item.name || '-'}</span>
              <span><b>WhatsApp:</b> {item.whatsapp || '-'}</span>
              <span><b>Email:</b> {item.email || '-'}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="adminSectionTitle ordersTitle">
        <div>
          <p className="red">PEDIDOS</p>
          <h2>Pedidos do Império Digital</h2>
          <span>Vendas, pagamentos, produtos comprados e tokens de download.</span>
        </div>
      </div>

      <div className="adminOrders">
        {orders.length === 0 ? (
          <div className="adminEmpty">Nenhum pedido encontrado ainda.</div>
        ) : orders.map(order => (
          <article className="adminOrderCard" key={order.id}>
            <div className="adminOrderHead">
              <div><b>{order.customer_name || 'Cliente sem nome'}</b><span>{order.email || 'Sem email'} • {order.whatsapp || 'Sem WhatsApp'}</span></div>
              <strong className={`adminStatus ${order.status}`}>{statusLabel(order.status)}</strong>
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
              {(order.items || []).length === 0 ? <p>Nenhum produto salvo neste pedido.</p> : (order.items || []).map((item,index)=><div key={`${order.id}-${item.id}-${index}`}><span>{item.title || `Produto ${item.id}`}</span><strong>R$ {Number(item.price || 0).toFixed(2).replace('.',',')}</strong></div>)}
            </div>
            <div className="adminTokenBox">
              <b>Token de download</b>
              {order.token ? <><code>{order.token.token}</code><span>Expira em: {formatDate(order.token.expires_at)}</span><span>Usado em: {order.token.used_at ? formatDate(order.token.used_at) : 'Ainda não usado'}</span><a href={`/obrigado?order_id=${order.id}`} target="_blank" rel="noreferrer">Abrir página de obrigado</a></> : <span>Token ainda não criado.</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<App/>);