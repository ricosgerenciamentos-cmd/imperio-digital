import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./style.css";

const BRAND = "Império Supremo";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const filters = ["Todos", "Educação", "Saúde", "Conhecimento", "Negócios", "Profissões", "Beleza", "Cultivo", "Barbearia"];
const money = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function navigate(path){ window.history.pushState({}, "", path); window.dispatchEvent(new Event("routechange")); }

function ProductCard({ product }) {
  return <article className="card product-card">
    <div className="product-cover"><span className="badge">{product.niche || "E-book"}</span><div className="cover-emoji">{product.cover || "📘"}</div></div>
    <p className="category">{product.niche || "Digital"}</p><h3>{product.title}</h3><p className="description">{product.description}</p>
    <div className="rating"><strong>4.9</strong><span>★★★★★</span><small>(novo)</small></div>
    <div className="price-row"><strong>{money(product.price)}</strong>{Number(product.old_price) > 0 && <small>{money(product.old_price)}</small>}</div>
    <button className="primary" onClick={() => window.open(product.url || "#", "_blank", "noopener,noreferrer")}>Comprar agora</button>
  </article>;
}

function StoreFront(){
  const [products,setProducts]=useState([]), [filter,setFilter]=useState("Todos"), [search,setSearch]=useState(""), [loading,setLoading]=useState(true);
  async function load(){ setLoading(true); const {data,error}=await supabase.from("products").select("*").eq("status","Ativo").order("created_at",{ascending:false}); if(!error) setProducts(data||[]); setLoading(false); }
  useEffect(()=>{load()},[]);
  const list=useMemo(()=>{const term=search.toLowerCase().trim(); return products.filter(p=>{const f=filter==="Todos"||p.niche===filter; const s=(p.title||"").toLowerCase().includes(term)||(p.description||"").toLowerCase().includes(term)||(p.niche||"").toLowerCase().includes(term); return f&&s;})},[products,filter,search]);
  return <main><div className="topbar">🔥 OFERTAS ATIVAS • E-BOOKS DIGITAIS • ENTREGA IMEDIATA</div>
    <header className="site-header"><div className="container header-row"><div className="brand" onClick={()=>{const now=Date.now(); window.__adminClicks=(window.__adminClicks||[]).filter(t=>now-t<1800); window.__adminClicks.push(now); if(window.__adminClicks.length>=7){navigate('/login'); window.__adminClicks=[];}}}><div className="logo">🚀</div><div><strong>{BRAND}</strong><small>Loja Digital de Alta Conversão</small></div></div><div className="search"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar e-books e ofertas"/></div><a className="buy-top" href="#catalogo">Comprar</a></div></header>
    <section className="hero"><div className="container hero-grid"><div><p className="pill">Mais vendas • Impacto • Energia</p><h1>Produtos digitais que resolvem problemas e vendem todos os dias.</h1><p className="hero-text">Catálogo profissional conectado ao banco de dados real, pronto para vender e escalar.</p><div className="actions"><a href="#catalogo" className="primary link-btn">Ver catálogo</a><a href="#ofertas" className="secondary link-btn">Ofertas do dia</a></div><div className="stats"><div><strong>{products.length}</strong><small>Produtos</small></div><div><strong>4.9/5</strong><small>Avaliação</small></div><div><strong>24h</strong><small>Online</small></div></div></div><div className="showcase">{products.slice(0,4).map(p=><div key={p.id} className="mini-product"><div>{p.cover||"📘"}</div><strong>{p.title}</strong><span>{money(p.price)}</span></div>)}</div></div></section>
    <section className="container filter-row">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?"active":""}>{f}</button>)}</section>
    <section id="catalogo" className="container catalog"><div className="section-title"><h2>Catálogo Supremo</h2><p>{loading?"Carregando...":`${list.length} produtos disponíveis`}</p></div>{loading?<div className="empty">Carregando produtos...</div>:list.length===0?<div className="empty">Nenhum produto encontrado.</div>:<div className="grid">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>}</section>
    <section id="ofertas" className="container offer"><h2>🎯 Funil de lucro ativado</h2><p>Venda e-books low ticket, destaque ofertas e aumente o ticket médio com combos.</p></section><footer><div className="container footer-row"><p>© 2024 {BRAND}. Todos os direitos reservados.</p><strong>PIX • CARTÃO • BOLETO • CHECKOUT</strong></div></footer></main>;
}

function LoginPage(){
 const [email,setEmail]=useState("admin@imperiodigital.com"),[password,setPassword]=useState(""),[show,setShow]=useState(false),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 async function login(){setError("");setLoading(true);const {error}=await supabase.auth.signInWithPassword({email,password});setLoading(false);if(error){setError("E-mail ou senha inválidos.");return;}navigate("/admin");}
 return <main className="login-page"><div className="login-box"><section className="login-side"><div><div className="login-logo">🚀</div><h1>Painel seguro para administrar sua loja digital.</h1><p>Gerencie produtos, preços, links, status e ofertas em uma área privada.</p></div></section><section className="login-form"><button className="back" onClick={()=>navigate('/')}>← Voltar para loja</button><div className="lock">🔐</div><h2>Entrar no Admin</h2><p>Acesse sua área privada.</p><label>E-mail<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>Senha<div className="password-field"><input value={password} onChange={e=>setPassword(e.target.value)} type={show?"text":"password"}/><button type="button" onClick={()=>setShow(!show)}>{show?"Ocultar":"Mostrar"}</button></div></label>{error&&<div className="error">{error}</div>}<button className="primary full" onClick={login} disabled={loading}>{loading?"Entrando...":"Entrar com segurança"}</button><small>Crie esse usuário no Supabase Auth antes de testar.</small></section></div></main>
}

function AdminPanel(){
 const [session,setSession]=useState(null),[checking,setChecking]=useState(true),[products,setProducts]=useState([]),[form,setForm]=useState({title:"",niche:"",price:"",old_price:"",description:"",cover:"📘",url:"#",status:"Ativo"});
 async function check(){const {data}=await supabase.auth.getSession();setSession(data.session);setChecking(false);if(!data.session)navigate('/login');}
 async function load(){const {data}=await supabase.from('products').select('*').order('created_at',{ascending:false});setProducts(data||[])}
 useEffect(()=>{check();load()},[]);
 async function logout(){await supabase.auth.signOut();navigate('/')}
 async function add(){if(!form.title||!form.price)return alert('Preencha nome e preço.');const {error}=await supabase.from('products').insert({title:form.title,niche:form.niche,price:Number(form.price),old_price:Number(form.old_price||form.price),description:form.description,cover:form.cover,url:form.url,status:form.status});if(error)return alert(error.message);setForm({title:"",niche:"",price:"",old_price:"",description:"",cover:"📘",url:"#",status:"Ativo"});load();}
 async function toggle(p){await supabase.from('products').update({status:p.status==='Ativo'?'Pausado':'Ativo'}).eq('id',p.id);load();}
 async function remove(id){if(!confirm('Excluir produto?'))return;await supabase.from('products').delete().eq('id',id);load();}
 if(checking)return <main className="admin"><div className="container">Verificando acesso...</div></main>; if(!session)return null;
 const revenue=products.reduce((s,p)=>s+Number(p.price||0),0);
 return <main className="admin"><header className="admin-header"><div className="container admin-row"><div><h1>Painel Admin</h1><p>Controle da loja, produtos e links de checkout</p></div><div><button className="secondary-dark" onClick={()=>navigate('/')}>Ver loja</button><button className="logout" onClick={logout}>Sair</button></div></div></header><section className="container admin-stats"><div><strong>{products.length}</strong><small>Produtos</small></div><div><strong>{products.filter(p=>p.status==='Ativo').length}</strong><small>Ativos</small></div><div><strong>{products.filter(p=>p.status!=='Ativo').length}</strong><small>Pausados</small></div><div><strong>{money(revenue)}</strong><small>Soma preços</small></div></section><section className="container admin-grid"><div className="admin-card"><h2>Cadastrar produto</h2><input placeholder="Nome do produto" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><input placeholder="Categoria/Nicho" value={form.niche} onChange={e=>setForm({...form,niche:e.target.value})}/><div className="two"><input placeholder="Preço" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/><input placeholder="Preço antigo" value={form.old_price} onChange={e=>setForm({...form,old_price:e.target.value})}/></div><div className="two"><input placeholder="Emoji/capa" value={form.cover} onChange={e=>setForm({...form,cover:e.target.value})}/><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Ativo</option><option>Pausado</option></select></div><textarea placeholder="Descrição" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><input placeholder="Link checkout" value={form.url} onChange={e=>setForm({...form,url:e.target.value})}/><button className="primary full" onClick={add}>Adicionar produto</button></div><div className="admin-card"><h2>Produtos cadastrados</h2><div className="admin-list">{products.map(p=><div key={p.id} className="admin-item"><div className="admin-emoji">{p.cover||'📘'}</div><div><strong>{p.title}</strong><small>{p.niche} • {money(p.price)} • {p.status}</small></div><div className="admin-actions"><button onClick={()=>toggle(p)}>{p.status==='Ativo'?'Pausar':'Ativar'}</button><button className="danger" onClick={()=>remove(p.id)}>Excluir</button></div></div>)}</div></div></section></main>
}
function App(){const [route,setRoute]=useState(window.location.pathname);useEffect(()=>{const update=()=>setRoute(window.location.pathname);window.addEventListener('routechange',update);window.addEventListener('popstate',update);return()=>{window.removeEventListener('routechange',update);window.removeEventListener('popstate',update)}},[]);if(route==='/login')return <LoginPage/>;if(route==='/admin')return <AdminPanel/>;return <StoreFront/>}
createRoot(document.getElementById('root')).render(<App/>);
