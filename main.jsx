import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const WHATSAPP_NUMBER = "5599999999999";
const BRAND = "Império Supremo";

const initialProducts = [
  { id: 1, title: "10 Passos para Começar uma Barbearia de Destaque", type: "E-book Próprio", niche: "Barbearia", price: 13, oldPrice: 29.9, badge: "Mais vendido", rating: 4.9, sales: 127, cover: "💈", description: "Guia prático para montar, destacar e lucrar com sua própria barbearia.", url: "#", status: "Ativo" },
  { id: 2, title: "Guia para Sair do Alcoolismo", type: "E-book Próprio", niche: "Saúde", price: 7, oldPrice: 19.9, badge: "Novo", rating: 4.8, sales: 84, cover: "🕯️", description: "Um guia direto para reconstruir sua vida e vencer a dependência.", url: "#", status: "Ativo" },
  { id: 3, title: "Vestibular de Destaque", type: "E-book Próprio", niche: "Educação", price: 13, oldPrice: 29, badge: "Alta procura", rating: 4.9, sales: 40, cover: "🎓", description: "Estratégias para estudar melhor, organizar sua rotina e aumentar suas chances.", url: "#", status: "Ativo" },
  { id: 4, title: "Reeducação Alimentar", type: "E-book Próprio", niche: "Saúde", price: 9, oldPrice: 19, badge: "Fit", rating: 4.7, sales: 32, cover: "🥗", description: "Hábitos simples para transformar sua alimentação sem sofrimento.", url: "#", status: "Ativo" },
  { id: 5, title: "Guia de Pedras Preciosas", type: "E-book Próprio", niche: "Conhecimento", price: 9, oldPrice: 19, badge: "Curioso", rating: 4.6, sales: 18, cover: "💎", description: "Aprenda sobre pedras, valor, mercado e oportunidades de conhecimento.", url: "#", status: "Ativo" },
  { id: 6, title: "Vendas Digitais", type: "E-book Próprio", niche: "Negócios", price: 13, oldPrice: 29, badge: "Hot", rating: 5.0, sales: 76, cover: "📈", description: "Comece no digital com uma visão prática para vender todos os dias.", url: "#", status: "Ativo" },
  { id: 7, title: "Assistência Técnica Celular", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Renda", rating: 4.8, sales: 54, cover: "📱", description: "Entre no mercado de manutenção de celulares e aprenda os primeiros passos.", url: "#", status: "Ativo" },
  { id: 8, title: "Corte e Costura", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Criativo", rating: 4.8, sales: 21, cover: "🧵", description: "Aprenda costura e transforme habilidade manual em uma nova fonte de renda.", url: "#", status: "Ativo" },
  { id: 9, title: "Ferro Velho de Destaque", type: "E-book Próprio", niche: "Negócios", price: 9, oldPrice: 19, badge: "B2B", rating: 4.7, sales: 12, cover: "♻️", description: "Guia introdutório para começar no ramo de reciclagem e reaproveitamento.", url: "#", status: "Ativo" },
  { id: 10, title: "Confeitaria de Sucesso", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Doce", rating: 4.9, sales: 33, cover: "🧁", description: "Transforme doces em negócio lucrativo com passos simples e práticos.", url: "#", status: "Ativo" },
  { id: 11, title: "Começar no Ramo da Estética", type: "E-book Próprio", niche: "Beleza", price: 9, oldPrice: 19, badge: "Beauty", rating: 4.8, sales: 29, cover: "✨", description: "Entre no mercado da beleza com mais segurança e visão de oportunidade.", url: "#", status: "Ativo" },
  { id: 12, title: "Cultivo de Cannabis", type: "E-book Próprio", niche: "Cultivo", price: 9, oldPrice: 19, badge: "Guia", rating: 4.5, sales: 10, cover: "🌿", description: "Guia visual introdutório sobre cultivo saudável e responsável.", url: "#", status: "Ativo" }
];

const filters = ["Todos", "Barbearia", "Saúde", "Educação", "Negócios", "Profissões", "Beleza", "Conhecimento", "Cultivo"];
const money = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const go = (u) => window.open(u || "#", "_blank", "noopener,noreferrer");

function ProductCard({ p }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute right-4 top-4 z-10 rounded-full bg-zinc-950 px-3 py-1 text-[11px] font-black uppercase text-white">{p.badge}</div>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-zinc-50 via-white to-red-50 p-6 text-center">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-100 blur-2xl" />
        <div className="relative grid h-36 place-items-center text-7xl transition duration-300 group-hover:scale-110">{p.cover}</div>
      </div>
      <div className="px-1 pt-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#d60000]">{p.niche} • {p.type}</p>
        <h3 className="mt-2 min-h-[56px] text-xl font-black leading-tight text-zinc-950">{p.title}</h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-600">{p.description}</p>
        <div className="mt-4 flex items-center gap-2 text-sm"><span className="font-black text-amber-500">{p.rating}</span><span className="tracking-tight text-amber-400">★★★★★</span><span className="text-zinc-400">({p.sales})</span></div>
        <div className="mt-4 flex items-end gap-3"><p className="text-3xl font-black text-[#d60000]">{money(p.price)}</p><p className="pb-1 text-sm text-zinc-400 line-through">{money(p.oldPrice)}</p></div>
        <button onClick={() => go(p.url)} className="mt-5 w-full rounded-2xl bg-[#d60000] px-4 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#b80000]">Comprar agora</button>
      </div>
    </article>
  );
}

function StoreFront({ products, openAdmin }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const activeProducts = products.filter((p) => p.status === "Ativo");

  const list = useMemo(() => activeProducts.filter((p) => {
    const term = q.toLowerCase();
    const bySearch = p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.niche.toLowerCase().includes(term);
    const byFilter = filter === "Todos" || p.niche === filter || p.type === filter;
    return bySearch && byFilter;
  }), [q, filter, products]);

  const whatsappText = encodeURIComponent("Olá! Vim pela loja Império Supremo e quero saber mais sobre os e-books.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-zinc-950">
      <div className="bg-[#d60000] px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white">🔥 Ofertas ativas • E-books + Produtos afiliados • Entrega imediata</div>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <div className="flex cursor-pointer select-none items-center gap-3" onClick={() => { const now = Date.now(); window.__adminClicks = (window.__adminClicks || []).filter((t) => now - t < 1800); window.__adminClicks.push(now); if (window.__adminClicks.length >= 7) { openAdmin(); window.__adminClicks = []; } }}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d60000] text-xl text-white shadow-lg shadow-red-200">🚀</div>
            <div><p className="text-xl font-black leading-none">{BRAND}</p><p className="mt-1 text-xs font-semibold text-zinc-500">Loja Digital de Alta Conversão</p></div>
          </div>
          <div className="relative hidden flex-1 md:block"><span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar oportunidades, e-books e ofertas" className="w-full rounded-full border border-zinc-200 bg-[#f6f7fb] px-12 py-4 text-sm outline-none transition focus:border-[#d60000] focus:bg-white" /></div>
          <a href="#catalogo" className="rounded-2xl bg-[#d60000] px-6 py-4 text-sm font-black text-white transition hover:bg-[#b80000]">Comprar</a>
        </div>
      </header>
      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.2rem] bg-white p-6 shadow-sm md:grid-cols-[1.08fr_.92fr] md:p-10">
          <div className="relative z-10">
            <p className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#d60000]">Mais vendas • Impacto • Energia</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-zinc-950 md:text-7xl">Produtos digitais que resolvem problemas e vendem todos os dias.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">Um catálogo premium com seus produtos próprios e ofertas estratégicas para vender no automático com aparência de marca grande.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#catalogo" className="rounded-2xl bg-[#d60000] px-8 py-4 text-center font-black text-white shadow-lg shadow-red-100 transition hover:bg-[#b80000]">Ver catálogo</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-zinc-200 bg-white px-8 py-4 text-center font-black text-zinc-950 transition hover:border-[#d60000] hover:text-[#d60000]">Falar no WhatsApp</a></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">{[[activeProducts.length, "Produtos ativos"], ["4.9/5", "Avaliação média"], ["Imediato", "Acesso após compra"]].map(([num, label]) => (<div key={label} className="rounded-3xl bg-[#f6f7fb] p-5 text-center"><p className="text-2xl font-black text-[#d60000]">{num}</p><p className="mt-1 text-sm font-semibold text-zinc-500">{label}</p></div>))}</div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-zinc-600"><span className="rounded-full bg-zinc-100 px-4 py-2">🔒 Compra segura</span><span className="rounded-full bg-zinc-100 px-4 py-2">⚡ Entrega imediata</span><span className="rounded-full bg-zinc-100 px-4 py-2">📲 Suporte humanizado</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">{activeProducts.slice(0, 4).map((p) => (<div key={p.id} className="group rounded-[2rem] border border-zinc-100 bg-gradient-to-br from-zinc-50 to-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="text-6xl transition group-hover:scale-110">{p.cover}</div><p className="mt-4 text-sm font-black leading-tight">{p.title}</p><p className="mt-2 text-lg font-black text-[#d60000]">{money(p.price)}</p></div>))}</div>
        </div>
      </section>
      <section className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 pb-5">{filters.map((f) => (<button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${filter === f ? "bg-[#d60000] text-white" : "border border-zinc-200 bg-white text-zinc-700 hover:border-[#d60000] hover:text-[#d60000]"}`}>{f}</button>))}</section>
      <section id="catalogo" className="mx-auto max-w-7xl px-4 pb-24"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-wide text-[#d60000]">Catálogo de oportunidades</p><h2 className="mt-2 text-4xl font-black tracking-tight">Escolha seu e-book</h2><p className="mt-2 text-zinc-500">{list.length} produtos encontrados</p></div><div className="rounded-2xl bg-white px-5 py-4 text-sm font-bold text-zinc-600 shadow-sm">⭐ Produtos digitais de acesso imediato</div></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div></section>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-2xl text-white shadow-2xl transition hover:scale-105">☎</a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur-xl md:hidden"><a href="#catalogo" className="block rounded-2xl bg-[#d60000] px-4 py-4 text-center text-sm font-black uppercase text-white">Ver ofertas agora</a></div>
      <footer className="border-t border-zinc-200 bg-white px-4 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between"><p className="text-sm font-semibold text-zinc-500">© 2026 {BRAND}. Todos os direitos reservados.</p><p className="text-sm font-black">PIX • CARTÃO • BOLETO • CHECKOUT • AFILIADOS</p></div></footer>
    </main>
  );
}

function LoginPage({ onLogin, goStore }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  function submitLogin() { if (email.trim().toLowerCase() === "admin@imperiodigital.com" && password === "admin123") { onLogin(); return; } setError("E-mail ou senha incorretos."); }
  return (<main className="grid min-h-screen place-items-center bg-[#f6f7fb] px-4 py-8 text-zinc-950"><div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1fr_.9fr]"><section className="hidden bg-[#d60000] p-10 text-white md:flex md:flex-col md:justify-between"><div><div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-[#d60000]">🚀</div><h1 className="mt-8 max-w-md text-5xl font-black leading-tight">Painel seguro para administrar sua loja digital.</h1><p className="mt-5 max-w-md text-lg leading-7 text-white/85">Gerencie produtos, afiliados, preços, links e ofertas em uma área privada.</p></div></section><section className="p-6 md:p-10"><button onClick={goStore} className="mb-8 text-sm font-black text-[#d60000]">← Voltar para loja</button><div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl text-[#d60000]">🔐</div><h2 className="mt-5 text-4xl font-black">Entrar no Admin</h2><p className="mt-2 text-sm leading-6 text-zinc-500">Acesse sua área privada.</p><label className="mt-7 block"><span className="mb-2 block text-sm font-black">E-mail</span><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@imperiodigital.com" className="w-full rounded-2xl border border-zinc-200 bg-[#f6f7fb] px-4 py-4 outline-none focus:border-[#d60000]" /></label><label className="mt-4 block"><span className="mb-2 block text-sm font-black">Senha</span><div className="relative"><input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Digite sua senha" className="w-full rounded-2xl border border-zinc-200 bg-[#f6f7fb] px-4 py-4 pr-24 outline-none focus:border-[#d60000]" /><button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#d60000]" type="button">{showPassword ? "Ocultar" : "Mostrar"}</button></div></label>{error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-[#d60000]">{error}</p>}<button onClick={submitLogin} className="mt-5 w-full rounded-2xl bg-[#d60000] px-4 py-4 font-black text-white transition hover:bg-[#b80000]">Entrar com segurança</button><div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600"><p className="font-black text-zinc-900">Dados de teste:</p><p>E-mail: <span className="font-black">admin@imperiodigital.com</span></p><p>Senha: <span className="font-black">admin123</span></p></div></section></div></main>);
}

function AdminPanel({ products, setProducts, openStore, onLogout }) {
  const [form, setForm] = useState({ title: "", type: "E-book Próprio", niche: "", price: "", oldPrice: "", cover: "📘", badge: "Novo", description: "", url: "", status: "Ativo" });
  function addProduct() { if (!form.title || !form.price) return; setProducts((prev) => [{ ...form, id: Date.now(), price: Number(form.price), oldPrice: Number(form.oldPrice || form.price), rating: 4.9, sales: 0 }, ...prev]); setForm({ title: "", type: "E-book Próprio", niche: "", price: "", oldPrice: "", cover: "📘", badge: "Novo", description: "", url: "", status: "Ativo" }); }
  function toggleStatus(id) { setProducts((prev) => prev.map((p) => p.id === id ? { ...p, status: p.status === "Ativo" ? "Pausado" : "Ativo" } : p)); }
  function removeProduct(id) { setProducts((prev) => prev.filter((p) => p.id !== id)); }
  return (<main className="min-h-screen bg-[#0f1115] text-white"><header className="border-b border-white/10 bg-[#151821] px-4 py-4"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div><p className="text-2xl font-black">Painel Admin</p><p className="text-sm text-zinc-400">Controle da loja, produtos e afiliados</p></div><div className="flex gap-2"><button onClick={openStore} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-zinc-950">Ver loja</button><button onClick={onLogout} className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-black text-white">Sair</button></div></div></header><section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[420px_1fr]"><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><h2 className="text-xl font-black">Cadastrar produto</h2><div className="mt-5 space-y-3"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nome do produto" className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><div className="grid grid-cols-2 gap-3"><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none"><option>E-book Próprio</option><option>Afiliado</option></select><input value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} placeholder="Nicho" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /></div><div className="grid grid-cols-2 gap-3"><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Preço" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><input value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} placeholder="Preço antigo" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /></div><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição curta" rows={3} className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} placeholder="Emoji/capa" className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="Link checkout ou afiliado" className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><button onClick={addProduct} className="w-full rounded-2xl bg-[#d60000] px-4 py-4 font-black text-white">Adicionar produto</button></div></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black">Produtos cadastrados</h2><span className="rounded-full bg-white/10 px-3 py-1 text-sm">{products.length} itens</span></div><div className="space-y-3">{products.map((p) => (<div key={p.id} className="grid gap-3 rounded-2xl border border-white/10 bg-[#0f1115] p-4 md:grid-cols-[auto_1fr_auto] md:items-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-4xl">{p.cover}</div><div><p className="font-black">{p.title}</p><p className="text-sm text-zinc-400">{p.type} • {p.niche} • {money(p.price)} • {p.status}</p></div><div className="flex gap-2"><button onClick={() => toggleStatus(p.id)} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-bold">{p.status === "Ativo" ? "Pausar" : "Ativar"}</button><button onClick={() => removeProduct(p.id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm font-bold">Excluir</button></div></div>))}</div></div></section></main>);
}

function App() {
  const [route, setRoute] = useState(window.location.pathname === "/admin" ? "/login" : window.location.pathname || "/");
  const [isLogged, setIsLogged] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  function navigate(path) { window.history.pushState({}, "", path); setRoute(path); }
  function openAdmin() { navigate(isLogged ? "/admin" : "/login"); }
  function logout() { setIsLogged(false); navigate("/"); }
  if (route === "/login") return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />;
  if (route === "/admin") { if (!isLogged) return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />; return <AdminPanel products={products} setProducts={setProducts} openStore={() => navigate("/")} onLogout={logout} />; }
  return <StoreFront products={products} openAdmin={openAdmin} />;
}

createRoot(document.getElementById("root")).render(<App />);
