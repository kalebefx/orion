/* ============================================================
   Orion · núcleo compartilhado dos protótipos
   Navbar (dock), relógio, toast, tooltip, dados de exemplo e regras
   Os dados ficam no localStorage do navegador: o que você muda numa tela
   aparece nas outras. "Restaurar exemplo" no Perfil volta ao início.
   ============================================================ */

/* ---------- datas e formatos ---------- */
const STEP = 15;
const DIAS = ['seg','ter','qua','qui','sex','sáb','dom'];
const pad = n => String(n).padStart(2,'0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseIso = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const addDays = (d,n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
// início da semana vem do perfil (RN33: padrão segunda). Trocar só muda a visualização (RN35)
const mondayOf = d => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); return addDays(x, -((x.getDay() - PERFIL.inicioSemana + 7) % 7)); };
const nomeDia = d => DIAS[(d.getDay()+6)%7];
const fmtMin = m => `${pad(Math.floor(m/60))}:${pad(m%60)}`;
const fmtDur = m => { m = Math.round(m); const h = Math.floor(m/60), r = m%60; return r ? `${h}h${pad(r)}` : `${h}h`; };
const startOf = b => new Date(+parseIso(b.data) + b.ini*60000);
const endOf   = b => new Date(+parseIso(b.data) + b.fim*60000);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $ = id => document.getElementById(id);

/* ---------- dados de exemplo ----------
   Paleta dos atributos validada (dataviz/validate_palette.js):
   contraste, croma e separação para daltonismo aprovados. */
const PALETA = ['#2A9468','#3D6DB3','#D9822B','#C2416F','#7B5CC4','#1F8A9E','#8A6D3B','#5B6B7F'];
const ATRIBUTOS = [
  {id:1, nome:'Saúde',        cor:PALETA[0], meta:90}, // meta semanal em minutos (RN11)
  {id:2, nome:'Inteligência', cor:PALETA[1], meta:720},
  {id:3, nome:'Social',       cor:PALETA[2], meta:60},
  {id:4, nome:'Físico',       cor:PALETA[3], meta:240},
  {id:5, nome:'Criatividade', cor:PALETA[4], meta:0},
];
const HOBBIES = [
  {id:1, nome:'Violão',  attrs:[5], ativo:true},
  {id:2, nome:'Corrida', attrs:[4,1], ativo:true},
  {id:3, nome:'Xadrez',  attrs:[2], ativo:false},
];
const HABITOS = [
  {id:1, nome:'Leitura',         attrs:[2],   ativo:true,  hobby:null},
  {id:2, nome:'Academia',        attrs:[4,1], ativo:true,  hobby:null},
  {id:3, nome:'Meditação',       attrs:[1],   ativo:true,  hobby:null},
  {id:4, nome:'Praticar violão', attrs:[5],   ativo:true,  hobby:1},
  {id:5, nome:'Estudar Java',    attrs:[2],   ativo:true,  hobby:null},
  {id:6, nome:'Inglês',          attrs:[2,3], ativo:false, hobby:null},
];
const attrById  = id => ATRIBUTOS.find(a => a.id === id);
const habById   = id => HABITOS.find(h => h.id === id);
const hobbyById = id => HOBBIES.find(h => h.id === id);

/* caderno (RN29: nasce com a divisória "Geral") */
const _agoraMs = Date.now(), _h = 3600e3;
const DIVISORIAS = [
  {id:1, nome:'Geral'}, {id:2, nome:'Java'}, {id:3, nome:'Ideias'}, {id:4, nome:'Inglês'},
];
const NOTAS = [
  {id:1, div:2, titulo:'Anotações do Spring Boot', criada:_agoraMs-50*_h, atualizada:_agoraMs-2*_h,
   html:'<h2>Camadas</h2><p><b>Controller</b> recebe a requisição, <b>Service</b> aplica as regras e <b>Repository</b> fala com o banco.</p><ul><li>@RestController</li><li>@Service</li><li>JpaRepository&lt;Atributo, Long&gt;</li></ul><pre><code>@GetMapping("/api/v1/atributos")\nList&lt;AtributoDTO&gt; listar()</code></pre>'},
  {id:2, div:2, titulo:'Flyway: como versionar o banco', criada:_agoraMs-30*_h, atualizada:_agoraMs-26*_h,
   html:'<p>Cada mudança vira um arquivo <code>V1__cria_atributo.sql</code>. Nunca editar uma migration que já rodou.</p>'},
  {id:3, div:3, titulo:'Tema escuro no Orion', criada:_agoraMs-80*_h, atualizada:_agoraMs-70*_h,
   html:'<p>Usar as cores da logo: fundo <code>#0C1522</code>, cartão <code>#111C2D</code>.</p>'},
  {id:4, div:4, titulo:'Phrasal verbs da semana', criada:_agoraMs-10*_h, atualizada:_agoraMs-9*_h,
   html:'<ul><li><b>figure out</b>: descobrir</li><li><b>set up</b>: configurar</li><li><b>roll back</b>: reverter</li></ul>'},
  {id:5, div:1, titulo:'Lista de mercado', criada:_agoraMs-5*_h, atualizada:_agoraMs-5*_h,
   html:'<ul><li>Café</li><li>Aveia</li><li>Banana</li></ul>'},
];

/* perfil (RN33: valores padrão) */
const PERFIL = {nome:'Kalebe', email:'kalebe@exemplo.com', inicioSemana:1, aparencia:'claro', fuso:'America/Sao_Paulo', lembretes:false};

/* rotina-modelo por dia da semana (0 = seg): [início h, fim h, ação, hábito, atributos] */
const ROTINA = [
  [[6.5,7.5,'Treino de força',2,[4,1]],[8,9,'Ler 30 páginas',1,[2]],[19,21,'API de Atributos',5,[2]]],
  [[7,7.25,'Meditar',3,[1]],[9,12,'Faculdade',null,[2,3]],[20,21,'Praticar acordes',4,[5]]],
  [[6.5,7.5,'Treino de força',2,[4,1]],[18.5,20.5,'Spring Boot + Flyway',5,[2]]],
  [[7,7.25,'Meditar',3,[1]],[12,13,'Almoço com a família',null,[3]],[19,21,'CI no GitHub Actions',5,[2]]],
  [[6.5,7.5,'Treino de força',2,[4,1]],[8,9,'Ler 30 páginas',1,[2]],[19,20.5,'Testes RN21',5,[2]]],
  [[10,12,'Trilha no parque',null,[4,3,1]],[15,16,'Gravar cover',4,[5]]],
  [[9,10,'Planejar a semana',null,[2]],[16,18,'Encontro com amigos',null,[3]]],
];

/* pseudoaleatório determinístico: o mesmo dia gera sempre os mesmos blocos */
function rnd(s){ let h = 2166136261; for (const c of s){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return ((h >>> 0) % 10000) / 10000; }

let _seq = 1;
const _gerados = new Set();
const BLOCOS = [];
/** Garante que os blocos de [de, ate] existem (gera a partir da rotina). */
function garantirPeriodo(de, ate){
  const agora = new Date();
  for (let d = new Date(de); d <= ate; d = addDays(d,1)){
    const k = iso(d);
    if (_gerados.has(k)) continue;
    _gerados.add(k);
    ROTINA[(d.getDay()+6)%7].forEach(([i,f,acao,hab,attrs], n) => {
      if (rnd(k+n+'x') < 0.12) return; // às vezes o bloco não foi planejado
      if (BLOCOS.some(o => o.data === k && i*60 < o.fim && o.ini < f*60)) return; // não gera por cima de um bloco seu (RN21)
      if (hab && !habById(hab)) hab = null; // hábito excluído
      attrs = attrs.filter(attrById);       // atributo excluído
      const b = {id:_seq++, data:k, ini:i*60, fim:f*60, acao, habito:hab, attrs:[...attrs], desc:'', concluido:false};
      if (endOf(b) <= agora && rnd(k+n+'c') < 0.76) b.concluido = true; // RN37: só o que já começou
      BLOCOS.push(b);
    });
  }
}
const blocosEntre = (de, ate) => { garantirPeriodo(de, ate); const a = iso(de), z = iso(ate); return BLOCOS.filter(b => b.data >= a && b.data <= z); };

/* ---------- persistência (só do protótipo; no produto isso é a API) ----------
   Salva tudo ao sair da página e carrega ao abrir. Assim, um hábito criado
   em Hábitos aparece na Minha Semana. */
const CHAVE = 'orion.prototipo.v1';
const _troca = (arr, novo) => { if (Array.isArray(novo)) arr.splice(0, arr.length, ...novo); };
let _naoSalvar = false;
function salvar(){
  if (_naoSalvar) return;
  try { localStorage.setItem(CHAVE, JSON.stringify({ATRIBUTOS, HOBBIES, HABITOS, BLOCOS, DIVISORIAS, NOTAS, PERFIL, seq:_seq, gerados:[..._gerados]})); } catch {}
}
function restaurarExemplo(){ _naoSalvar = true; localStorage.removeItem(CHAVE); location.reload(); } // sem isso, o salvamento ao sair regravaria tudo
(function carregar(){
  try {
    const s = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (!s) return;
    _troca(ATRIBUTOS, s.ATRIBUTOS); _troca(HOBBIES, s.HOBBIES); _troca(HABITOS, s.HABITOS); _troca(BLOCOS, s.BLOCOS);
    _troca(DIVISORIAS, s.DIVISORIAS); _troca(NOTAS, s.NOTAS); Object.assign(PERFIL, s.PERFIL);
    _seq = s.seq || _seq; (s.gerados || []).forEach(k => _gerados.add(k));
  } catch {}
})();
addEventListener('pagehide', salvar);
document.addEventListener('visibilitychange', () => document.hidden && salvar());

/* aparência (RF46 · RN36): aplicada na hora */
const aplicarTema = () => document.documentElement.dataset.theme = PERFIL.aparencia === 'escuro' ? 'dark' : 'light';
aplicarTema();

/* números que "contam" até o valor: dá vida às estatísticas */
function contar(el, alvo, fmt = v => Math.round(v), ms = 650){
  if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = fmt(alvo); return; }
  const de = +(el.dataset.v || 0), t0 = performance.now();
  el.dataset.v = alvo;
  const passo = t => { const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(de + (alvo - de) * e); if (p < 1) requestAnimationFrame(passo); };
  requestAnimationFrame(passo);
}
/* pequeno "estouro" de partículas na cor dada: recompensa visual ao concluir algo */
function estouro(x, y, cor = '#456C9C'){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 10; i++){
    const p = document.createElement('i');
    const a = (Math.PI * 2 * i) / 10, d = 22 + Math.random() * 14;
    p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:5px;height:5px;border-radius:50%;background:${cor};pointer-events:none;z-index:200;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .5s`;
    document.body.appendChild(p);
    requestAnimationFrame(() => { p.style.transform = `translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(.4)`; p.style.opacity = 0; });
    setTimeout(() => p.remove(), 520);
  }
}

/* ---------- estatísticas (RN25, RN26, RN28) ---------- */
function estatisticas(lista, attrId){
  const L = attrId ? lista.filter(b => b.attrs.includes(attrId)) : lista; // RN25: bloco conta inteiro para cada atributo
  const dur = b => b.fim - b.ini;
  const agora = new Date();
  const terminados = L.filter(b => endOf(b) <= agora);
  return {
    planejado: L.reduce((s,b) => s + dur(b), 0),
    feito: L.filter(b => b.concluido).reduce((s,b) => s + dur(b), 0),
    total: L.length,
    concluidos: L.filter(b => b.concluido).length,
    terminados: terminados.length,
    consistencia: terminados.length ? Math.round(terminados.filter(b => b.concluido).length / terminados.length * 100) : null, // RN28: null = "sem dados"
  };
}
const fmtCons = c => c === null ? 'sem dados' : c + '%';

/* ---------- navbar ---------- */
const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity=".25"/><g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".45"><line x1="12" y1="11" x2="36" y2="11"/><line x1="12" y1="11" x2="24" y2="24"/><line x1="36" y1="11" x2="24" y2="24"/><line x1="24" y1="24" x2="14" y2="38"/><line x1="24" y1="24" x2="34" y2="38"/><line x1="14" y1="38" x2="34" y2="38"/></g><g fill="currentColor"><circle cx="12" cy="11" r="3.2"/><circle cx="36" cy="11" r="3.2"/><circle cx="24" cy="24" r="4.2"/><circle cx="14" cy="38" r="3.2"/><circle cx="34" cy="38" r="3.2"/></g><circle cx="24" cy="24" r="7.5" fill="none" stroke="currentColor" stroke-width="1" opacity=".2"/></svg>`;
const I = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const NAV = [
  ['semana','Minha Semana','minha-semana.html',I('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>')],
  ['dashboard','Dashboard','dashboard.html',I('<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>')],
  '|',
  ['atributos','Atributos','atributos.html',I('<path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="m12 7 4.5 2.5v5L12 17l-4.5-2.5v-5z"/>')],
  ['habitos','Hábitos','habitos.html',I('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>')],
  ['hobby','Hobby','hobby.html',I('<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z"/>')],
  '|',
  ['caderno','Caderno','caderno.html',I('<path d="M2 6h4M2 10h4M2 14h4M2 18h4"/><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M16 2v20"/>')],
  ['perfil','Perfil','perfil.html',I('<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>')],
];

function montarTopbar(atual){
  const el = document.querySelector('header.topbar');
  el.innerHTML = `
    <a class="brand" href="minha-semana.html" aria-label="Orion, início">${LOGO}<span>orion</span></a>
    <nav class="dock" id="dock" aria-label="Navegação principal">${NAV.map(n => n === '|' ? '<span class="sep" aria-hidden="true"></span>' :
      `<a href="${n[2] || '#'}" class="${n[0]===atual?'active':''} ${n[2]?'':'soon'}" ${n[0]===atual?'aria-current="page"':''} aria-label="${n[1]}" ${n[2]?'':'data-soon'}>${n[3]}<span class="tip">${n[1]}${n[2]?'':'<small>em breve</small>'}</span></a>`).join('')}</nav>
    <div class="user"><span class="clock" id="clock"></span>
      <button class="avatar" id="avatar" aria-haspopup="menu" aria-expanded="false" aria-label="Conta de ${esc(PERFIL.nome)}">${esc(PERFIL.nome.trim()[0] || '?').toUpperCase()}</button>
      <div class="umenu" id="umenu" role="menu" hidden>
        <div class="who"><b>${esc(PERFIL.nome)}</b><span>${esc(PERFIL.email)}</span></div>
        <a role="menuitem" href="perfil.html">Perfil e preferências</a>
        <button role="menuitem" id="temaRapido">${PERFIL.aparencia === 'escuro' ? 'Tema claro' : 'Tema escuro'}</button>
        <button role="menuitem" class="sair" id="sair">Sair</button>
      </div>
    </div>`;
  el.querySelectorAll('[data-soon]').forEach(a => a.onclick = e => { e.preventDefault(); toast('Protótipo desta tela ainda não foi feito'); });

  // menu da conta: logout (RF03 · RN07) e troca rápida de tema
  const av = $('avatar'), menu = $('umenu');
  const abrir = v => { menu.hidden = !v; av.setAttribute('aria-expanded', v); if (v) menu.querySelector('[role=menuitem]').focus(); };
  av.onclick = e => { e.stopPropagation(); abrir(menu.hidden); };
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) abrir(false); });
  menu.addEventListener('keydown', e => { if (e.key === 'Escape'){ abrir(false); av.focus(); } });
  $('temaRapido').onclick = () => { PERFIL.aparencia = PERFIL.aparencia === 'escuro' ? 'claro' : 'escuro'; aplicarTema(); salvar(); $('temaRapido').textContent = PERFIL.aparencia === 'escuro' ? 'Tema claro' : 'Tema escuro'; document.dispatchEvent(new Event('tema')); };
  $('sair').onclick = () => { localStorage.removeItem('orion.sessao'); salvar(); location.href = 'login.html'; }; // RN07: apaga o token

  // ampliação estilo macOS (respeita reduced motion)
  const dock = $('dock'), items = [...dock.querySelectorAll('a')];
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches){
    dock.addEventListener('mousemove', e => items.forEach(it => {
      const r = it.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width/2));
      it.style.transform = `scale(${1 + Math.max(0, 1 - d/110) * 0.32})`;
    }));
    dock.addEventListener('mouseleave', () => items.forEach(it => it.style.transform = ''));
  }
  const tick = () => { const n = new Date(); $('clock').textContent = n.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'}).replace(/\./g,'') + ' · ' + fmtMin(n.getHours()*60+n.getMinutes()); };
  tick(); setInterval(tick, 30000);

  if (!$('toast')) document.body.insertAdjacentHTML('beforeend', '<div class="toast" id="toast" role="status" aria-live="polite"></div><div class="tt" id="tt" role="tooltip"></div>');
}

/* ---------- toast e tooltip ---------- */
let _tt;
function toast(msg, rn, bad){
  const t = $('toast');
  t.innerHTML = `<span>${msg}</span>${rn?`<span class="rn">${rn}</span>`:''}`;
  t.classList.toggle('bad', !!bad);
  t.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(() => t.classList.remove('show'), 3200);
}
function tooltip(e, html){
  const t = $('tt');
  if (!html){ t.classList.remove('show'); return; }
  t.innerHTML = html;
  t.classList.add('show');
  const w = t.offsetWidth, h = t.offsetHeight;
  let x = e.clientX + 14, y = e.clientY - h - 12;
  if (x + w > innerWidth - 8) x = e.clientX - w - 14;
  if (y < 8) y = e.clientY + 16;
  t.style.left = x + 'px'; t.style.top = y + 'px';
}
