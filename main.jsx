import React, { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "5599999999999";
const BRAND = "Império Supremo";

const initialProducts = [
  { id: 1, title: "10 Passos para Começar uma Barbearia de Destaque", type: "E-book Próprio", niche: "Barbearia", price: 13, oldPrice: 29.9, badge: "Destaque", rating: 4.9, sales: 127, cover: "💈", description: "Guia prático para montar e lucrar com sua barbearia.", url: "#", status: "Ativo" },
  { id: 2, title: "Guia para Sair do Alcoolismo", type: "E-book Próprio", niche: "Saúde", price: 7, oldPrice: 19.9, badge: "Novo", rating: 4.8, sales: 84, cover: "🕯️", description: "Reconstrua sua vida e vença a dependência.", url: "#", status: "Ativo" },
  { id: 3, title: "Vestibular de Destaque", type: "E-book Próprio", niche: "Educação", price: 13, oldPrice: 29, badge: "Alta procura", rating: 4.9, sales: 40, cover: "🎓", description: "Estratégias para estudar melhor e passar.", url: "#", status: "Ativo" },
  { id: 4, title: "Reeducação Alimentar", type: "E-book Próprio", niche: "Saúde", price: 9, oldPrice: 19, badge: "Fit", rating: 4.7, sales: 32, cover: "🥗", description: "Hábitos saudáveis para transformar seu corpo.", url: "#", status: "Ativo" },
  { id: 5, title: "Guia de Pedras Preciosas", type: "E-book Próprio", niche: "Conhecimento", price: 9, oldPrice: 19, badge: "Curioso", rating: 4.6, sales: 18, cover: "💎", description: "Aprenda sobre pedras e oportunidades do mercado.", url: "#", status: "Ativo" },
  { id: 6, title: "Vendas Digitais", type: "E-book Próprio", niche: "Negócios", price: 13, oldPrice: 29, badge: "Hot", rating: 5.0, sales: 76, cover: "📈", description: "Venda online e escale no digital.", url: "#", status: "Ativo" },
  { id: 7, title: "Assistência Técnica Celular", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Renda", rating: 4.8, sales: 54, cover: "📱", description: "Entre no mercado de manutenção de celulares.", url: "#", status: "Ativo" },
  { id: 8, title: "Corte e Costura", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Criativo", rating: 4.8, sales: 21, cover: "🧵", description: "Aprenda costura e transforme em renda.", url: "#", status: "Ativo" },
  { id: 9, title: "Ferro Velho de Destaque", type: "E-book Próprio", niche: "Negócios", price: 9, oldPrice: 19, badge: "B2B", rating: 4.7, sales: 12, cover: "♻️", description: "Como iniciar no ramo de reciclagem lucrativa.", url: "#", status: "Ativo" },
  { id: 10, title: "Confeitaria de Sucesso", type: "E-book Próprio", niche: "Profissões", price: 13, oldPrice: 29, badge: "Doce", rating: 4.9, sales: 33, cover: "🧁", description: "Transforme doces em negócio lucrativo.", url: "#", status: "Ativo" },
  { id: 11, title: "Começar no Ramo da Estética", type: "E-book Próprio", niche: "Beleza", price: 9, oldPrice: 19, badge: "Beauty", rating: 4.8, sales: 29, cover: "✨", description: "Entre no mercado da beleza e estética.", url: "#", status: "Ativo" },
  { id: 12, title: "Cultivo de Cannabis", type: "E-book Próprio", niche: "Cultivo", price: 9, oldPrice: 19, badge: "Guia", rating: 4.5, sales: 10, cover: "🌿", description: "Guia visual introdutório de cultivo.", url: "#", status: "Ativo" }
];

const filters = ["Todos", "E-book Próprio", "Afiliado", "Saúde", "Negócios", "Barbearia"];
const money = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const go = (u) => window.open(u, "_blank", "noopener,noreferrer");

function ProductCard({ p }) {
  return (
    <article className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 text-center">
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black text-white ${p.type === "Afiliado" ? "bg-zinc-900" : "bg-[#d60000]"}`}>{p.badge}</span>
        <div className="grid h-40 place-items-center text-7xl">{p.cover}</div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-black uppercase text-[#d60000]">{p.niche} • {p.type}</p>
        <h3 className="mt-1 text-xl font-black leading-tight">{p.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{p.description}</p>
        <div className="mt-3 flex items-center gap-2 text-sm"><span className="font-black text-amber-600">{p.rating}</span><span>★★★★★</span><span className="text-zinc-400">({p.sales})</span></div>
        <div className="mt-4 flex items-end gap-3"><p className="text-3xl font-black">{money(p.price)}</p><p className="text-sm text-zinc-400 line-through">{money(p.oldPrice)}</p></div>
        <button onClick={() => go(p.url)} className="mt-4 w-full rounded-2xl bg-[#d60000] px-4 py-4 text-sm font-black text-white">Comprar agora</button>
      </div>
    </article>
  );
}

function StoreFront({ products, openAdmin }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Todos");
  const activeProducts = products.filter((p) => p.status === "Ativo");

  const list = useMemo(() => activeProducts.filter(p => {
    const term = q.toLowerCase();
    const bySearch = p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.niche.toLowerCase().includes(term);
    const byFilter = filter === "Todos" || p.type === filter || p.niche === filter;
    return bySearch && byFilter;
  }), [q, filter, products]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-zinc-900">
      <div className="bg-[#d60000] px-4 py-3 text-center text-sm font-black text-white">🔥 OFERTAS ATIVAS • E-BOOKS + PRODUTOS AFILIADOS • ENTREGA IMEDIATA</div>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => {
            const now = Date.now();
            window.__adminClicks = (window.__adminClicks || []).filter(t => now - t < 1800);
            window.__adminClicks.push(now);
            if (window.__adminClicks.length >= 7) {
              openAdmin();
              window.__adminClicks = [];
            }
          }}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d60000] text-xl text-white">🚀</div>
            <div><p className="text-xl font-black">{BRAND}</p><p className="text-xs text-zinc-500">Loja Digital de Alta Conversão</p></div>
          </div>
          <div className="relative hidden flex-1 md:block"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar oportunidades, e-books e ofertas" className="w-full rounded-full border border-zinc-200 bg-[#f6f7fb] px-11 py-3 text-sm outline-none focus:border-[#d60000]" /></div>
          <button className="rounded-2xl bg-[#d60000] px-5 py-3 text-sm font-black text-white">Comprar</button>
        </div>
      </header>

      <section className="px-4 py-8 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[28px] bg-white p-6 shadow-sm md:grid-cols-[1.1fr_.9fr] md:p-10">
          <div>
            <p className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase text-[#d60000]">Mais vendas • Impacto • Energia</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Produtos digitais que resolvem problemas e vendem todos os dias.</h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600">Catálogo profissional com seus produtos próprios e ofertas afiliadas em uma única estrutura.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="#catalogo"><button className="rounded-2xl bg-[#d60000] px-7 py-4 font-black text-white">Ver catálogo</button></a><button className="rounded-2xl border border-zinc-200 px-7 py-4 font-black">Ofertas do dia</button></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">{[[activeProducts.length,"Produtos"],["4.9/5","Avaliação"],["24h","Vendendo"]].map(i => <div key={i[1]} className="rounded-2xl bg-[#f6f7fb] p-4 text-center"><p className="text-xl font-black text-[#d60000]">{i[0]}</p><p className="text-sm text-zinc-500">{i[1]}</p></div>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">{activeProducts.slice(0,4).map(p => <div key={p.id} className="rounded-3xl border border-zinc-100 bg-[#fafafa] p-4 text-center"><div className="text-6xl">{p.cover}</div><p className="mt-3 text-sm font-bold leading-tight">{p.title}</p><p className="mt-1 font-black text-[#d60000]">{money(p.price)}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 pb-4">{filters.map(f => <button key={f} onClick={()=>setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${filter===f ? "bg-[#d60000] text-white" : "bg-white border border-zinc-200"}`}>{f}</button>)}</section>
      <section id="catalogo" className="mx-auto max-w-7xl px-4 pb-12"><div className="mb-6"><h2 className="text-3xl font-black">Catálogo Supremo</h2><p className="text-zinc-500">{list.length} oportunidades disponíveis</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map(p => <ProductCard key={p.id} p={p} />)}</div></section>
      <footer className="border-t border-zinc-200 bg-white px-4 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between"><p className="text-sm font-semibold text-zinc-500">© 2024 {BRAND}. Todos os direitos reservados.</p><p className="text-sm font-black">PIX • CARTÃO • BOLETO • CHECKOUT • AFILIADOS</p></div></footer>
    </main>
  );
}

function AdminPanel({ products, setProducts, openStore, onLogout }) {
  const [form, setForm] = useState({ title: "", type: "E-book Próprio", niche: "", price: "", oldPrice: "", cover: "📘", badge: "Novo", description: "", url: "", status: "Ativo" });
  const revenue = products.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.sales || 0), 0);
  const affiliates = products.filter(p => p.type === "Afiliado").length;
  const owned = products.filter(p => p.type === "E-book Próprio").length;

  function addProduct() {
    if (!form.title || !form.price) return;
    setProducts(prev => [{ ...form, id: Date.now(), price: Number(form.price), oldPrice: Number(form.oldPrice || form.price), rating: 4.9, sales: 0 }, ...prev]);
    setForm({ title: "", type: "E-book Próprio", niche: "", price: "", oldPrice: "", cover: "📘", badge: "Novo", description: "", url: "", status: "Ativo" });
  }

  function toggleStatus(id) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "Ativo" ? "Pausado" : "Ativo" } : p));
  }

  function removeProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      <header className="border-b border-white/10 bg-[#151821] px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div><p className="text-2xl font-black">Painel Admin</p><p className="text-sm text-zinc-400">Controle da loja, produtos próprios e afiliados</p></div>
          <div className="flex gap-2">
            <button onClick={openStore} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-zinc-950">Ver loja</button>
            <button onClick={onLogout} className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-black text-white">Sair</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[[products.length,"Produtos cadastrados"],[owned,"E-books próprios"],[affiliates,"Afiliados"],[money(revenue),"Potencial bruto"]].map(([num,label]) => <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-3xl font-black text-red-400">{num}</p><p className="mt-1 text-sm text-zinc-400">{label}</p></div>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 lg:grid-cols-[420px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-black">Cadastrar produto</h2>
          <div className="mt-5 space-y-3">
            <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Nome do produto" className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" />
            <div className="grid grid-cols-2 gap-3"><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none"><option>E-book Próprio</option><option>Afiliado</option></select><input value={form.niche} onChange={e=>setForm({...form,niche:e.target.value})} placeholder="Nicho" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /></div>
            <div className="grid grid-cols-2 gap-3"><input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Preço" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><input value={form.oldPrice} onChange={e=>setForm({...form,oldPrice:e.target.value})} placeholder="Preço antigo" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /></div>
            <div className="grid grid-cols-2 gap-3"><input value={form.cover} onChange={e=>setForm({...form,cover:e.target.value})} placeholder="Emoji/capa" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /><input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} placeholder="Selo" className="rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" /></div>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Descrição curta" rows={3} className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" />
            <input value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="Link checkout ou afiliado" className="w-full rounded-2xl border border-white/10 bg-[#0f1115] px-4 py-3 outline-none" />
            <button onClick={addProduct} className="w-full rounded-2xl bg-[#d60000] px-4 py-4 font-black text-white">Adicionar produto</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black">Produtos cadastrados</h2><span className="rounded-full bg-white/10 px-3 py-1 text-sm">{products.length} itens</span></div>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="grid gap-3 rounded-2xl border border-white/10 bg-[#0f1115] p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-4xl">{p.cover}</div>
                <div><p className="font-black">{p.title}</p><p className="text-sm text-zinc-400">{p.type} • {p.niche} • {money(p.price)} • {p.status}</p></div>
                <div className="flex gap-2"><button onClick={()=>toggleStatus(p.id)} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-bold">{p.status === "Ativo" ? "Pausar" : "Ativar"}</button><button onClick={()=>removeProduct(p.id)} className="rounded-xl bg-red-600 px-3 py-2 text-sm font-bold">Excluir</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function LoginPage({ onLogin, goStore }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function submitLogin() {
    const validEmail = email.trim().toLowerCase() === "admin@imperiodigital.com";
    const validPassword = password === "admin123";

    if (validEmail && validPassword) {
      onLogin({ email, remember });
      return;
    }

    setError("E-mail ou senha incorretos. Use os dados de teste abaixo.");
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-8 text-zinc-900">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl md:grid-cols-[1fr_.9fr]">
        <section className="hidden bg-[#d60000] p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl text-[#d60000]">🚀</div>
            <h1 className="mt-8 max-w-md text-5xl font-black leading-tight">Painel seguro para administrar sua loja digital.</h1>
            <p className="mt-5 max-w-md text-lg leading-7 text-white/85">Gerencie produtos próprios, afiliados, preços, links, status e ofertas em uma área privada.</p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/10 p-4"><p className="font-black">🔒 Acesso protegido</p><p className="text-sm text-white/75">Admin separado da loja pública.</p></div>
            <div className="rounded-2xl bg-white/10 p-4"><p className="font-black">📦 Gestão de catálogo</p><p className="text-sm text-white/75">Controle seus e-books e afiliados.</p></div>
          </div>
        </section>

        <section className="flex items-center p-6 md:p-10">
          <div className="w-full">
            <button onClick={goStore} className="mb-8 text-sm font-black text-[#d60000]">← Voltar para loja</button>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-2xl text-[#d60000]">🔐</div>
            <h2 className="mt-5 text-4xl font-black">Entrar no Admin</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Acesse sua área privada para controlar produtos, afiliados e configurações da loja.</p>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-black">E-mail</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@imperiodigital.com" className="w-full rounded-2xl border border-zinc-200 bg-[#f6f7fb] px-4 py-4 outline-none focus:border-[#d60000]" />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black">Senha</span>
                <div className="relative">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Digite sua senha" className="w-full rounded-2xl border border-zinc-200 bg-[#f6f7fb] px-4 py-4 pr-24 outline-none focus:border-[#d60000]" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#d60000]" type="button">{showPassword ? "Ocultar" : "Mostrar"}</button>
                </div>
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 font-semibold text-zinc-600"><input checked={remember} onChange={(e) => setRemember(e.target.checked)} type="checkbox" /> Lembrar acesso</label>
              <button className="font-black text-[#d60000]" type="button">Esqueci a senha</button>
            </div>

            {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-[#d60000]">{error}</p>}
            <button onClick={submitLogin} className="mt-5 w-full rounded-2xl bg-[#d60000] px-4 py-4 font-black text-white transition hover:bg-[#b80000]">Entrar com segurança</button>

            <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600">
              <p className="font-black text-zinc-900">Dados de teste da prévia:</p>
              <p>E-mail: <span className="font-black">admin@imperiodigital.com</span></p>
              <p>Senha: <span className="font-black">admin123</span></p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname === "/admin" ? "/login" : window.location.pathname || "/");
  const [isLogged, setIsLogged] = useState(false);
  const [products, setProducts] = useState(initialProducts);

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

  if (route === "/login") {
    return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />;
  }

  if (route === "/admin") {
    if (!isLogged) return <LoginPage onLogin={() => { setIsLogged(true); navigate("/admin"); }} goStore={() => navigate("/")} />;
    return <AdminPanel products={products} setProducts={setProducts} openStore={() => navigate("/")} onLogout={logout} />;
  }

  return <StoreFront products={products} openAdmin={openAdmin} />;
}
