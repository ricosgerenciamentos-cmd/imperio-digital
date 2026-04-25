import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const WHATSAPP_NUMBER = "5511919411086";
const BRAND = "Império Digital";

const productsBase = [
  { id: 1, title: "10 Passos para Começar uma Barbearia de Destaque", niche: "Negócios", price: 13, oldPrice: 27, badge: "Mais vendido", rating: 4.9, reviews: 128, cover: "/capas/barbearia.png", desc: "Guia completo para abrir sua barbearia do jeito certo.", status: "Ativo", url: "#" },
  { id: 2, title: "Plano Devocional Transformador", niche: "Desenvolvimento Pessoal", price: 13, oldPrice: 27, badge: "Fé", rating: 4.9, reviews: 82, cover: "/capas/devocional.png", desc: "30 dias para renovar sua fé, encontrar paz e se aproximar de Deus.", status: "Ativo", url: "#" },
  { id: 3, title: "10 Passos para Passar no Vestibular da Faculdade Pública", niche: "Educação", price: 13, oldPrice: 27, badge: "Hot", rating: 4.9, reviews: 74, cover: "/capas/vestibular.png", desc: "Estratégias, plano de estudos e foco para conquistar sua vaga.", status: "Ativo", url: "#" },
  { id: 4, title: "Os 7 Passos para a Reeducação Alimentar", niche: "Emagrecimento", price: 9, oldPrice: 19, badge: "Saúde", rating: 4.7, reviews: 63, cover: "/capas/reeducacao-alimentar.png", desc: "Guia prático para comer melhor, ter mais energia e mudar hábitos.", status: "Ativo", url: "#" },
  { id: 5, title: "Como Começar a Trabalhar com Pedras Preciosas", niche: "Negócios", price: 9, oldPrice: 19, badge: "Premium", rating: 4.6, reviews: 41, cover: "/capas/pedras-preciosas.png", desc: "Aprenda sobre gemas, lapidação, joias e oportunidades no mercado.", status: "Ativo", url: "#" },
  { id: 6, title: "Como Começar a Trabalhar com Vendas Digitais", niche: "Marketing Digital", price: 13, oldPrice: 29, badge: "Hot", rating: 5.0, reviews: 110, cover: "/capas/vendas-digitais.png", desc: "Guia para criar seu negócio digital e vender todos os dias.", status: "Ativo", url: "#" },
  { id: 7, title: "10 Passos para Iniciar no Ramo de Assistência Técnica de Celular", niche: "Negócios", price: 13, oldPrice: 29, badge: "Renda", rating: 4.8, reviews: 78, cover: "/capas/assistencia-celular.png", desc: "Aprenda a começar uma profissão técnica com demanda constante.", status: "Ativo", url: "#" },
  { id: 8, title: "10 Passos para Iniciar no Ramo de Corte e Costura", niche: "Negócios", price: 13, oldPrice: 29, badge: "Criativo", rating: 4.8, reviews: 39, cover: "/capas/corte-costura.png", desc: "Transforme habilidade em renda com corte, costura e criação.", status: "Ativo", url: "#" },
  { id: 9, title: "Como Começar um Ferro Velho de Destaque", niche: "Negócios", price: 9, oldPrice: 19, badge: "B2B", rating: 4.7, reviews: 22, cover: "/capas/ferro-velho.png", desc: "Guia para transformar sucata em negócio lucrativo e sustentável.", status: "Ativo", url: "#" },
  { id: 10, title: "10 Passos para Iniciar no Ramo da Confeitaria", niche: "Negócios", price: 13, oldPrice: 29, badge: "Doce", rating: 4.9, reviews: 58, cover: "/capas/confeitaria.png", desc: "Transforme doces em lucro com um passo a passo simples.", status: "Ativo", url: "#" }
];

const categories = [
  ["Todos", "▦"],
  ["Marketing Digital", "🚀"],
  ["Educação", "🎓"],
  ["Emagrecimento", "🍎"],
  ["Desenvolvimento Pessoal", "🧠"],
  ["Negócios", "💼"]
];

const money = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function openUrl(url, productTitle = "") {
  if (url && url !== "#") {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const text = encodeURIComponent(
    productTitle
      ? `Olá! Vim pela loja Império Digital e quero comprar este e-book: ${productTitle}`
      : "Olá! Vim pela loja Império Digital e quero saber mais sobre os e-books."
  );

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
}

function ProductCard({ p }) {
  const badgeColors = {
    "Mais vendido": "bg-red-600",
    "Novo": "bg-green-500",
    "Hot": "bg-orange-500",
  };

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-zinc-200 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.16)]">
      <div className="relative h-80 overflow-hidden bg-zinc-950">
        {p.badge && (
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-black uppercase text-white ${badgeColors[p.badge] || "bg-zinc-900"}`}>
            {p.badge}
          </span>
        )}
        <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>

      <div className="p-5">
        <h3 className="min-h-[52px] text-lg font-black leading-tight text-zinc-950">{p.title}</h3>
        <p className="mt-2 text-sm text-zinc-500">{p.desc}</p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-amber-400">★</span>
          <strong>{p.rating}</strong>
          <span className="text-zinc-500">({p.reviews})</span>
        </div>

        <div className="mt-4 flex items-end gap-4">
          <strong className="text-2xl font-black text-[#d60000]">{money(p.price)}</strong>
          <span className="pb-1 text-sm font-semibold text-zinc-400 line-through">{money(p.oldPrice)}</span>
        </div>

        <button onClick={() => openUrl(p.url, p.title)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d60000] px-4 py-4 text-sm font-black uppercase text-white shadow-lg shadow-red-200 transition hover:bg-[#b80000]">
          🛒 Comprar agora
        </button>
      </div>
    </article>
  );
}

function StoreFront({ openAdmin }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const activeProducts = productsBase.filter((p) => p.status === "Ativo");
  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    return activeProducts.filter((p) => {
      const matchesCategory = category === "Todos" || p.niche === category;
      const matchesSearch = p.title.toLowerCase().includes(term) || p.niche.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [query, category]);

  const whatsappText = encodeURIComponent("Olá! Vim pela loja Império Digital e quero saber mais sobre os e-books.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-zinc-950">
      <div className="bg-[#d60000] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-3 text-center text-sm font-black uppercase tracking-wide lg:justify-between">
          <span className="mx-auto">🔥 Ofertas ativas • E-books + Produtos afiliados • Entrega imediata</span>
          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-semibold normal-case">Oferta expira em:</span>
            {["02 Horas", "18 Min", "47 Seg"].map((item) => (
              <span key={item} className="rounded-lg bg-[#7a0000] px-3 py-1 text-xs leading-tight">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-5">
          <div
            className="flex min-w-fit cursor-pointer select-none items-center gap-3"
            onClick={() => {
              const now = Date.now();
              window.__adminClicks = (window.__adminClicks || []).filter((t) => now - t < 1800);
              window.__adminClicks.push(now);
              if (window.__adminClicks.length >= 7) {
                openAdmin();
                window.__adminClicks = [];
              }
            }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#d60000] text-3xl text-white shadow-xl shadow-red-200">🚀</div>
            <div>
              <p className="text-2xl font-black leading-none">Império Digital</p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">Loja Digital de Alta Conversão</p>
            </div>
          </div>

          <div className="relative hidden flex-1 md:block">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-zinc-400">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar oportunidades, e-books e ofertas..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-14 py-4 text-sm font-medium outline-none transition focus:border-[#d60000] focus:bg-white"
            />
          </div>

          <button className="hidden h-14 w-14 place-items-center rounded-full border border-zinc-200 bg-white text-2xl shadow-sm lg:grid">🛒</button>
          <a href="#catalogo" className="rounded-xl bg-[#d60000] px-8 py-4 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:bg-[#b80000]">
            Comprar Agora
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#060606]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(220,0,0,.50)_0%,rgba(122,0,0,.22)_24%,rgba(0,0,0,.88)_58%,#050505_100%)]" />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(115deg, transparent 0%, transparent 47%, rgba(255,0,0,.25) 47.2%, transparent 49%), radial-gradient(circle at 72% 42%, rgba(255,0,0,.45), transparent 24%)" }} />

        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-red-400 ring-1 ring-white/10">
              Mais vendas • Impacto • Energia
            </p>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white md:text-7xl">
              Produtos digitais que resolvem problemas e <span className="text-[#ff1f1f]">vendem todos os dias.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-white/80">
              Catálogo profissional com os melhores produtos próprios e ofertas afiliadas em uma única estrutura.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#catalogo" className="flex items-center justify-center gap-3 rounded-xl bg-[#d60000] px-10 py-5 text-sm font-black uppercase text-white shadow-[0_18px_45px_rgba(214,0,0,.35)] transition hover:bg-[#ff1111]">
                🛒 Ver catálogo
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 rounded-xl border border-white/40 bg-black/20 px-10 py-5 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black">
                ☎ Falar no WhatsApp
              </a>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["🛡️", "Compra 100% Segura", "Seus dados protegidos"],
                ["⚡", "Entrega Imediata", "Acesso após confirmação"],
                ["🏅", "Satisfação Garantida", "7 dias de garantia"],
                ["🎧", "Suporte Especializado", "Atendimento rápido"],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl">{icon}</div>
                  <div>
                    <p className="text-sm font-black text-white">{title}</p>
                    <p className="text-xs text-white/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[500px] lg:block">
            <div className="absolute left-10 top-24 rotate-[-12deg] rounded-3xl border border-red-500/30 bg-red-950/40 p-5 text-center text-white shadow-[0_0_40px_rgba(255,0,0,.25)]">
              <div className="text-4xl">📚</div>
              <p className="mt-2 text-xs font-black uppercase">E-books</p>
            </div>
            <div className="absolute right-4 top-36 rotate-[14deg] rounded-3xl border border-red-500/30 bg-red-950/40 p-5 text-center text-white shadow-[0_0_40px_rgba(255,0,0,.25)]">
              <div className="text-4xl">▶️</div>
              <p className="mt-2 text-xs font-black uppercase">Cursos</p>
            </div>
            <div className="absolute left-0 bottom-24 rotate-[-10deg] rounded-3xl border border-red-500/30 bg-red-950/40 p-5 text-center text-white shadow-[0_0_40px_rgba(255,0,0,.25)]">
              <div className="text-4xl">▦</div>
              <p className="mt-2 text-xs font-black uppercase">Planilhas</p>
            </div>

            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/25 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] text-[15rem] drop-shadow-[0_40px_80px_rgba(255,0,0,.35)]">
              🚀
            </div>
            <div className="absolute bottom-2 left-1/2 h-32 w-[500px] -translate-x-1/2 rounded-[100%] bg-white/25 blur-3xl" />
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-7 px-4">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto rounded-2xl bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,.12)] ring-1 ring-zinc-200">
          {categories.map(([name, icon]) => (
            <button
              key={name}
              onClick={() => setCategory(name)}
              className={`flex min-w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition ${
                category === name ? "bg-red-50 text-[#d60000]" : "text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
          <button className="ml-auto hidden min-w-fit items-center gap-2 rounded-xl bg-zinc-50 px-5 py-3 text-sm font-black text-zinc-800 lg:flex">▦ Mais Categorias</button>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-10 pb-28">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-lg font-black uppercase text-zinc-900">🚀 Produtos em destaque</p>
          </div>
          <a href="#catalogo" className="hidden text-sm font-semibold text-zinc-600 hover:text-[#d60000] md:block">Ver todos os produtos →</a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:grid-cols-4">
          {[
            ["🛡️", "Compra 100% Segura", "Seus dados protegidos"],
            ["☁️", "Acesso Imediato", "Após a confirmação"],
            ["🏅", "Satisfação Garantida", "7 dias de garantia"],
            ["🎧", "Suporte Especializado", "Atendimento rápido"],
          ].map(([icon, title, text]) => (
            <div key={title} className="flex items-center gap-4">
              <div className="text-3xl">{icon}</div>
              <div>
                <p className="font-black">{title}</p>
                <p className="text-sm text-zinc-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-28 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-green-500 text-3xl text-white shadow-2xl transition hover:scale-105">
        ☎
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 overflow-hidden rounded-t-xl bg-white shadow-[0_-15px_50px_rgba(15,23,42,.16)]">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-4 py-4 text-sm font-black text-zinc-950">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-green-500 text-xl text-white">☎</span>
          <span className="hidden sm:block">Falar no WhatsApp<br /><small className="font-semibold text-zinc-500">Atendimento rápido</small></span>
        </a>
        <a href="#catalogo" className="flex items-center justify-center gap-3 bg-[#d60000] px-4 py-4 text-sm font-black uppercase text-white">
          🛒 Ver catálogo
          <span className="hidden normal-case opacity-90 sm:inline">Ver todos os produtos</span>
        </a>
      </div>
    </main>
  );
}

function LoginPage({ onLogin, goStore }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin() {
    if (email.trim().toLowerCase() === "admin@imperiodigital.com" && password === "admin123") onLogin();
    else alert("E-mail ou senha incorretos.");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f7fb] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button onClick={goStore} className="mb-6 text-sm font-black text-[#d60000]">← Voltar para loja</button>
        <div className="text-4xl">🔐</div>
        <h1 className="mt-4 text-3xl font-black">Entrar no Admin</h1>
        <p className="mt-2 text-sm text-zinc-500">Área privada do catálogo.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@imperiodigital.com" className="mt-6 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 outline-none" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" className="mt-3 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 outline-none" />
        <button onClick={submitLogin} className="mt-5 w-full rounded-2xl bg-[#d60000] px-4 py-4 font-black text-white">Entrar</button>
        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600">
          <p><b>E-mail:</b> admin@imperiodigital.com</p>
          <p><b>Senha:</b> admin123</p>
        </div>
      </div>
    </main>
  );
}

function AdminPanel({ products, setProducts, openStore, onLogout }) {
  return (
    <main className="min-h-screen bg-[#0f1115] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">Painel Admin</h1>
            <p className="text-zinc-400">Controle privado da loja.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={openStore} className="rounded-xl bg-white px-4 py-3 font-black text-zinc-950">Ver loja</button>
            <button onClick={onLogout} className="rounded-xl border border-white/20 px-4 py-3 font-black">Sair</button>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xl font-black">Produtos cadastrados: {products.length}</p>
          <p className="mt-2 text-zinc-400">Versão premium visual publicada. Próximo passo: conectar CRUD real no Supabase.</p>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.pathname === "/admin" ? "/login" : window.location.pathname || "/");
  const [isLogged, setIsLogged] = useState(false);
  const [products, setProducts] = useState(productsBase);

  function navigate(path) {
    window.history.pushState({}, "", path);
    setRoute(path);
  }

  function openAdmin() {
    navigate(isLogged ? "/admin" : "/login");
  }

  function logout() {
    setIsLogged(false);
    navigate("/");
  }

  if (route === "/login") return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />;

  if (route === "/admin") {
    if (!isLogged) return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />;
    return <AdminPanel products={products} setProducts={setProducts} openStore={() => navigate("/")} onLogout={logout} />;
  }

  return <StoreFront products={products} openAdmin={openAdmin} />;
}

createRoot(document.getElementById("root")).render(<App />);
