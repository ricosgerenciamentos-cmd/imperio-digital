import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const WHATSAPP_NUMBER = "5511919411086";
const BRAND = "Império Digital";

// TROQUE OS LINKS abaixo pelos seus checkouts da Kiwify
const productsBase = [
  {
    id: 1,
    title: "Assistência Técnica de Celular do Zero ao Lucro",
    shortTitle: "Assistência Técnica de Celular",
    category: "Profissões",
    niche: "Renda Extra",
    price: 19.9,
    oldPrice: 47,
    badge: "MAIS LUCRATIVO",
    image: "/assistencia-celular.png",
    checkout: "#",
    description:
      "Aprenda como começar no mercado de conserto de celulares, montar sua bancada, atender clientes e transformar conhecimento em renda.",
    highlights: ["Profissão em alta", "Baixo investimento", "Comece do zero"],
  },
  {
    id: 2,
    title: "10 Passos para Começar uma Barbearia de Destaque",
    shortTitle: "Barbearia de Destaque",
    category: "Profissões",
    niche: "Negócios",
    price: 19.9,
    oldPrice: 47,
    badge: "MAIS VENDIDO",
    image: "/barbearia.png",
    checkout: "#",
    description:
      "Guia prático para abrir uma barbearia com posicionamento forte, visual profissional e estratégia para atrair clientes.",
    highlights: ["Negócio físico", "Alta procura", "Passo a passo"],
  },
  {
    id: 3,
    title: "Vendas Digitais do Zero: Guia Prático Para Lucrar Online",
    shortTitle: "Vendas Digitais do Zero",
    category: "Negócios",
    niche: "Digital",
    price: 19.9,
    oldPrice: 47,
    badge: "HOT",
    image: "/vendas-digitais.png",
    checkout: "#",
    description:
      "Aprenda como escolher nicho, montar estrutura, atrair clientes e fazer suas primeiras vendas pela internet.",
    highlights: ["Mercado digital", "Renda online", "Para iniciantes"],
  },
  {
    id: 4,
    title: "Reeducação Alimentar: 7 Passos Para Uma Vida Saudável",
    shortTitle: "Reeducação Alimentar",
    category: "Saúde",
    niche: "Bem-estar",
    price: 19.9,
    oldPrice: 47,
    badge: "SAÚDE",
    image: "/reeducacao-alimentar.png",
    checkout: "#",
    description:
      "Transforme sua relação com a comida, ganhe mais energia e crie hábitos saudáveis sem dietas malucas.",
    highlights: ["Sem sofrimento", "Vida saudável", "Hábitos reais"],
  },
  {
    id: 5,
    title: "10 Passos para Passar no Vestibular da Faculdade Pública",
    shortTitle: "Passe no Vestibular",
    category: "Educação",
    niche: "Estudos",
    price: 19.9,
    oldPrice: 47,
    badge: "EDUCAÇÃO",
    image: "/vestibular.png",
    checkout: "#",
    description:
      "Organize seus estudos com estratégia, foco, simulados, revisão e preparação emocional para conquistar sua vaga.",
    highlights: ["Plano de estudo", "Foco total", "Aprovação"],
  },
  {
    id: 6,
    title: "Império da Estética: Do Zero ao Sucesso no Mercado da Beleza",
    shortTitle: "Império da Estética",
    category: "Profissões",
    niche: "Beleza",
    price: 19.9,
    oldPrice: 47,
    badge: "BELEZA",
    image: "/estetica.png",
    checkout: "#",
    description:
      "Descubra como começar no ramo da estética, escolher especialidade, atrair clientes e crescer com profissionalismo.",
    highlights: ["Mercado forte", "Clientes locais", "Alta demanda"],
  },
  {
    id: 7,
    title: "Costura Lucrativa do Zero",
    shortTitle: "Costura Lucrativa",
    category: "Profissões",
    niche: "Criativo",
    price: 19.9,
    oldPrice: 47,
    badge: "CRIATIVO",
    image: "/corte-costura.png",
    checkout: "#",
    description:
      "Aprenda corte e costura do básico ao prático e descubra como transformar sua habilidade em renda trabalhando de casa.",
    highlights: ["Trabalhe de casa", "Habilidade prática", "Renda extra"],
  },
  {
    id: 8,
    title: "Império dos Doces: Como Criar uma Confeitaria Lucrativa do Zero",
    shortTitle: "Império dos Doces",
    category: "Profissões",
    niche: "Confeitaria",
    price: 19.9,
    oldPrice: 47,
    badge: "DOCE RENDA",
    image: "/confeitaria.png",
    checkout: "#",
    description:
      "Transforme sua paixão por doces em renda, aprendendo produtos, planejamento, fornecedores, divulgação e vendas.",
    highlights: ["Comece em casa", "Baixo custo", "Venda todos os dias"],
  },
  {
    id: 9,
    title: "Do Zero ao Lucro com Pedras Preciosas",
    shortTitle: "Pedras Preciosas",
    category: "Negócios",
    niche: "Premium",
    price: 19.9,
    oldPrice: 47,
    badge: "PREMIUM",
    image: "/pedras-preciosas.png",
    checkout: "#",
    description:
      "Conheça o mercado de gemas, lapidação, ourivesaria, ferramentas e oportunidades para criar joias e vender melhor.",
    highlights: ["Nicho curioso", "Mercado premium", "Joias e gemas"],
  },
  {
    id: 10,
    title: "Império da Sucata: Como Montar um Ferro Velho Lucrativo do Zero",
    shortTitle: "Império da Sucata",
    category: "Negócios",
    niche: "Reciclagem",
    price: 19.9,
    oldPrice: 47,
    badge: "SUSTENTÁVEL",
    image: "/ferro-velho.png",
    checkout: "#",
    description:
      "Aprenda como estruturar um ferro velho profissional, atender empresas, cuidar de licenças e organizar a operação.",
    highlights: ["B2B", "Reciclagem", "Negócio real"],
  },
  {
    id: 11,
    title: "Negócio Organizado em 30 Minutos",
    shortTitle: "Negócio Organizado",
    category: "Organização",
    niche: "Produtividade",
    price: 13.9,
    oldPrice: 29,
    badge: "ORGANIZAÇÃO",
    image: "/negocio-organizado.png",
    checkout: "#",
    description:
      "Um checklist semanal para organizar tarefas, prioridades, finanças e rotina do seu negócio sem complicação.",
    highlights: ["30 min por semana", "Mais clareza", "Menos estresse"],
  },
  {
    id: 12,
    title: "Como Organizar Suas Tarefas Diárias",
    shortTitle: "Tarefas Diárias",
    category: "Organização",
    niche: "Produtividade",
    price: 13.9,
    oldPrice: 29,
    badge: "FOCO",
    image: "/tarefas-diarias.png",
    checkout: "#",
    description:
      "Pare de apagar incêndios e aprenda um sistema simples para organizar sua rotina, tarefas e compromissos.",
    highlights: ["Mais foco", "Rotina leve", "Sem esquecer tarefas"],
  },
  {
    id: 13,
    title: "10 Passos Para Sair do Alcoolismo: Guia Prático para a Sobriedade",
    shortTitle: "Guia da Sobriedade",
    category: "Saúde",
    niche: "Transformação",
    price: 19.9,
    oldPrice: 47,
    badge: "TRANSFORMAÇÃO",
    image: "/alcoolismo.png",
    checkout: "#",
    description:
      "Um guia de apoio com passos práticos para buscar ajuda, reconstruir hábitos e caminhar rumo a uma vida sóbria.",
    highlights: ["Apoio emocional", "Mudança de vida", "Passos práticos"],
  },
  {
    id: 14,
    title: "Guia Visual: 10 Passos para Começar um Cultivo Saudável de Cannabis",
    shortTitle: "Cultivo Saudável",
    category: "Especial",
    niche: "Cultivo",
    price: 19.9,
    oldPrice: 47,
    badge: "ESPECIAL",
    image: "/cannabis.png",
    checkout: "#",
    description:
      "Conteúdo específico sobre cultivo saudável e responsável, indicado apenas para regiões e situações permitidas por lei.",
    highlights: ["Nicho específico", "Guia visual", "Uso responsável"],
  },
];

const categories = ["Todos", "Profissões", "Negócios", "Saúde", "Educação", "Organização", "Especial"];

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function whatsappLink(product = null) {
  const msg = product
    ? `Olá! Tenho interesse no ebook: ${product.title}. Pode me passar mais informações?`
    : `Olá! Tenho interesse nos ebooks do ${BRAND}. Pode me ajudar?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const featured = productsBase.slice(0, 7);

  const filteredProducts = useMemo(() => {
    return productsBase.filter((product) => {
      const categoryMatch = activeCategory === "Todos" || product.category === activeCategory;
      const searchMatch = `${product.title} ${product.category} ${product.niche}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header search={search} setSearch={setSearch} />
      <Hero />
      <TrustBar />
      <Featured products={featured} />
      <Catalog
        products={filteredProducts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <WhyBuy />
      <Faq />
      <Footer />
      <StickyCta />
    </main>
  );
}

function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <a href="#top" className="flex min-w-fit items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-600 text-2xl shadow-lg shadow-red-600/30">
            🚀
          </div>
          <div>
            <h1 className="text-xl font-black leading-none tracking-tight">{BRAND}</h1>
            <p className="text-xs font-semibold text-slate-400">Loja Digital de Alta Conversão</p>
          </div>
        </a>

        <div className="hidden flex-1 md:block">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
            placeholder="Buscar oportunidades, profissões, saúde, organização..."
          />
        </div>

        <a
          href="#catalogo"
          className="ml-auto hidden rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:scale-105 md:block"
        >
          Ver Catálogo
        </a>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-red-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-red-600/30 transition hover:scale-105"
        >
          Comprar Agora
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,.28),transparent_34%),radial-gradient(circle_at_top_right,rgba(250,204,21,.18),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-200">
            🔥 Ebooks práticos com acesso imediato
          </div>

          <h2 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Aprenda uma habilidade, organize sua vida e comece a evoluir hoje.
          </h2>

          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
            Catálogo completo com ebooks diretos ao ponto sobre profissões, renda extra, saúde, estudos e organização.
            Escolha seu guia, compre com segurança e receba acesso imediato.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="rounded-2xl bg-red-600 px-8 py-4 text-center text-base font-black text-white shadow-xl shadow-red-600/30 transition hover:scale-105"
            >
              Ver Todos os Ebooks
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-center text-base font-black text-white transition hover:bg-white/20"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
            <Metric value="14" label="Ebooks" />
            <Metric value="100%" label="Digital" />
            <Metric value="24h" label="Acesso" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-red-600/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              {productsBase.slice(0, 4).map((product) => (
                <div key={product.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                  <img src={product.image} alt={product.shortTitle} className="h-56 w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-3xl bg-white p-5 text-slate-950">
              <p className="text-sm font-black uppercase text-red-600">Mais vendidos em destaque</p>
              <p className="mt-1 text-2xl font-black">Profissões, negócios, saúde e estudos em um só lugar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
    </div>
  );
}

function TrustBar() {
  const items = ["Compra segura", "Entrega digital", "Acesso imediato", "Conteúdo prático", "Suporte no WhatsApp"];
  return (
    <section className="border-b border-white/10 bg-slate-900/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 md:grid-cols-5">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-black">
            ✅ {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured({ products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-red-400">Produtos campeões</p>
          <h3 className="mt-1 text-3xl font-black md:text-4xl">Comece por estes ebooks</h3>
        </div>
        <a href="#catalogo" className="hidden text-sm font-black text-red-300 hover:text-red-200 md:block">
          Ver catálogo completo →
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} featured />
        ))}
      </div>
    </section>
  );
}

function Catalog({ products, activeCategory, setActiveCategory }) {
  return (
    <section id="catalogo" className="border-t border-white/10 bg-white py-12 text-slate-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-wide text-red-600">Catálogo completo</p>
          <h3 className="mt-1 text-3xl font-black md:text-4xl">Escolha seu próximo passo</h3>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`min-w-fit rounded-full px-5 py-3 text-sm font-black transition ${
                activeCategory === category
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} light />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, light = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.6rem] border shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
        light ? "border-slate-200 bg-white" : "border-white/10 bg-slate-900"
      }`}
    >
      <div className="relative overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-2 text-xs font-black text-white shadow-lg">
          {index < 3 ? `TOP ${index + 1}` : product.badge}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-black ${light ? "bg-slate-100" : "bg-white/10"}`}>
            {product.category}
          </span>
          <span className="text-xs font-black text-red-500">{product.niche}</span>
        </div>

        <h4 className="min-h-[56px] text-xl font-black leading-tight">{product.shortTitle}</h4>
        <p className={`mt-3 min-h-[72px] text-sm font-medium leading-relaxed ${light ? "text-slate-600" : "text-slate-300"}`}>
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.highlights.slice(0, 2).map((highlight) => (
            <span key={highlight} className={`rounded-full px-3 py-1 text-xs font-bold ${light ? "bg-red-50 text-red-700" : "bg-red-500/10 text-red-200"}`}>
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className={`text-xs font-bold line-through ${light ? "text-slate-400" : "text-slate-500"}`}>{money(product.oldPrice)}</p>
            <p className="text-2xl font-black text-red-600">{money(product.price)}</p>
          </div>
          <p className={`text-right text-xs font-bold ${light ? "text-slate-500" : "text-slate-400"}`}>Acesso<br />imediato</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={product.checkout}
            target={product.checkout === "#" ? "_self" : "_blank"}
            rel="noreferrer"
            className="rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:scale-105"
          >
            Comprar
          </a>
          <a
            href={whatsappLink(product)}
            target="_blank"
            rel="noreferrer"
            className={`rounded-2xl px-4 py-3 text-center text-sm font-black transition hover:scale-105 ${
              light ? "bg-slate-100 text-slate-950" : "bg-white/10 text-white"
            }`}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function WhyBuy() {
  const items = [
    ["🎯", "Direto ao ponto", "Guias práticos para aplicar sem enrolação."],
    ["📲", "Compra rápida", "Checkout simples e entrega digital."],
    ["🚀", "Vários nichos", "Escolha entre profissão, saúde, estudos e organização."],
  ];

  return (
    <section className="bg-slate-950 px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-3xl font-black md:text-4xl">Por que comprar no Império Digital?</h3>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {items.map(([icon, title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <div className="text-4xl">{icon}</div>
              <h4 className="mt-4 text-xl font-black">{title}</h4>
              <p className="mt-2 font-medium leading-relaxed text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    ["Como recebo o ebook?", "Após a compra, você recebe o acesso digital pelo checkout da Kiwify."],
    ["Posso acessar pelo celular?", "Sim. Os ebooks são digitais e podem ser acessados pelo celular, tablet ou computador."],
    ["Tenho suporte?", "Sim. Você pode chamar no WhatsApp para tirar dúvidas sobre a compra."],
  ];

  return (
    <section className="bg-white px-4 py-14 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <h3 className="text-center text-3xl font-black md:text-4xl">Dúvidas Frequentes</h3>
        <div className="mt-7 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <summary className="cursor-pointer text-lg font-black">{q}</summary>
              <p className="mt-3 font-medium leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 pb-28 text-center md:pb-10">
      <h3 className="text-2xl font-black">{BRAND}</h3>
      <p className="mt-2 text-sm font-medium text-slate-400">Ebooks práticos para quem quer aprender, evoluir e comprar com facilidade.</p>
      <p className="mt-5 text-xs text-slate-500">© {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.</p>
    </footer>
  );
}

function StickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-950/95 p-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="rounded-2xl bg-green-500 px-4 py-3 text-center text-sm font-black text-white">
          WhatsApp
        </a>
        <a href="#catalogo" className="rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-black text-white">
          Ver Catálogo
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
