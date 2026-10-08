(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#ano').textContent = new Date().getFullYear();
  addEventListener('scroll', () => document.documentElement.classList.toggle('rolou', scrollY > 40), { passive: true });

  /* Texto que entra palavra a palavra */
  for (const el of $$('[data-split]')) {
    const palavras = el.textContent.trim().split(' ');
    el.setAttribute('aria-label', el.textContent.trim());
    el.style.setProperty('--n', palavras.length);
    el.textContent = '';
    palavras.forEach((p, i) => {
      const s = document.createElement('span');
      s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', i); s.textContent = p;
      el.append(s, ' ');
    });
  }

  /* Entradas ao rolar */
  const entra = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); entra.unobserve(e.target); }
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.cab, .hero-sub, .hero-acoes, .stats, .hero-foto, .tag:not(.cab .tag)').forEach(el => { el.dataset.rev = ''; });
  $$('[data-rev], [data-split], .mesa').forEach(el => entra.observe(el));
  $$('.faixas, .passos, .bloco ul').forEach(pai => $$(':scope > *', pai).forEach((el, k) => { el.style.setProperty('--k', k); if (pai.matches('.faixas')) entra.observe(el); }));
  $$('.slot').forEach((el, k) => el.style.setProperty('--k', k));

  /* Efeitos presos à rolagem: --s = 0 quando o elemento entra por baixo, 1 quando sai por cima */
  const presos = $$('[data-scrub]');
  let aguardando = false;
  const mede = () => {
    aguardando = false;
    for (const el of presos) {
      const r = el.getBoundingClientRect();
      if (r.bottom > -200 && r.top < innerHeight + 200) el.style.setProperty('--s', Math.min(Math.max((innerHeight - r.top) / (innerHeight + r.height), 0), 1).toFixed(3));
    }
  };
  const pede = () => { if (!aguardando) { aguardando = true; requestAnimationFrame(mede); } };
  addEventListener('scroll', pede, { passive: true });
  addEventListener('resize', pede);
  mede();

  /* Números contam até o valor quando aparecem ("2.000+" mantém o ponto de milhar) */
  const conta = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) {
      conta.unobserve(e.target);
      const [, num, depois] = e.target.textContent.match(/^([\d.]+)(.*)$/), alvo = +num.replace(/\./g, ''), t0 = performance.now();
      const passo = t => { const p = Math.min((t - t0) / 1600, 1); e.target.textContent = Math.round(alvo * (1 - (1 - p) ** 3)).toLocaleString('pt-BR') + depois; if (p < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    }
  }, { threshold: 1 });
  if (!semMovimento) $$('.stats dd').forEach(el => conta.observe(el));

  /* Galeria: fotos espalhadas como sobre uma mesa; de tempos em tempos uma nova é "jogada" por cima */
  const mesa = $('.mesa'), visor = $('.visor'), visorImg = $('img', visor);
  const lista = mesa.dataset.fotos.split(',').map(Number), caminho = n => `assets/images/galeria/foto-${String(n).padStart(3, '0')}.jpg`;
  const slots = $$('.slot', mesa), naMesa = () => $$('.foto:not(.sai)', mesa).map(f => +f.dataset.n);
  let fila = [], ultimoSlot = -1, topo = 10, mesaVisivel = false;
  const proxima = () => {
    if (!fila.length) fila = [...lista].sort(() => Math.random() - .5);
    const n = fila.pop();
    return naMesa().includes(n) ? proxima() : n;
  };
  const joga = () => {
    if (!mesaVisivel || document.hidden || visor.open) return;
    const livres = slots.filter((sl, i) => i !== ultimoSlot && sl.offsetParent && !sl.matches(':hover, :focus-within'));
    const slot = livres[Math.random() * livres.length | 0]; if (!slot) return;
    const n = proxima(), img = new Image();
    img.alt = 'DJ Reinaldo em evento';
    img.onload = () => {
      const velha = $('.foto:not(.sai)', slot), nova = document.createElement('button');
      nova.className = 'foto entra'; nova.type = 'button'; nova.dataset.n = n;
      nova.setAttribute('aria-label', 'Ampliar foto');
      nova.style.rotate = `${(Math.random() * 5 - 2.5).toFixed(1)}deg`;
      nova.append(img);
      slot.style.zIndex = ++topo;
      slot.append(nova);
      if (velha) { velha.classList.add('sai'); setTimeout(() => velha.remove(), 900); }
      ultimoSlot = slots.indexOf(slot);
    };
    img.src = caminho(n);
  };
  new IntersectionObserver(([e]) => { mesaVisivel = e.isIntersecting; }, { threshold: .15 }).observe(mesa);
  if (!semMovimento) setInterval(joga, 2400);

  let atual = 0;
  const mostra = i => { atual = (i + lista.length) % lista.length; visorImg.src = caminho(lista[atual]); visorImg.alt = `Foto ${atual + 1} de ${lista.length}`; };
  mesa.addEventListener('click', e => {
    const f = e.target.closest('.foto'); if (!f) return;
    mostra(lista.indexOf(+f.dataset.n)); visor.showModal();
  });
  $('.visor-x').addEventListener('click', () => visor.close());
  $('.visor-ant').addEventListener('click', () => mostra(atual - 1));
  $('.visor-prox').addEventListener('click', () => mostra(atual + 1));
  visor.addEventListener('click', e => { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1); });
})();
