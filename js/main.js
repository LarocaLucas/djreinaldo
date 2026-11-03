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
  $$('[data-rev], [data-split]').forEach(el => entra.observe(el));
  $$('.faixas, .passos, .bloco ul').forEach(pai => $$(':scope > *', pai).forEach((el, k) => { el.style.setProperty('--k', k); if (pai.matches('.faixas')) entra.observe(el); }));

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

  /* Galeria: fotos entram ao rolar (cascata curta por linha) e abrem num visor com setas, teclado e arrastar */
  const grade = $('.grade'), visor = $('.visor'), visorImg = $('img', visor), contador = $('.visor-n');
  const lista = grade.dataset.fotos.split(',').map(Number), caminho = n => `assets/images/galeria/foto-${String(n).padStart(3, '0')}.jpg`;
  const fotos = $$('.foto', grade);
  fotos.forEach((f, i) => f.style.setProperty('--k', i % 3));
  const entraFoto = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); entraFoto.unobserve(e.target); }
  }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });
  fotos.forEach(f => entraFoto.observe(f));

  let atual = 0, origem = null;
  const mostra = i => {
    atual = (i + lista.length) % lista.length;
    visorImg.src = caminho(lista[atual]); visorImg.alt = `DJ Reinaldo em evento, foto ${atual + 1} de ${lista.length}`;
    contador.textContent = `${atual + 1} / ${lista.length}`;
    for (const d of [1, -1]) new Image().src = caminho(lista[(atual + d + lista.length) % lista.length]);
  };
  grade.addEventListener('click', e => {
    const f = e.target.closest('.foto'); if (!f) return;
    origem = f; mostra(lista.indexOf(+f.dataset.n)); visor.showModal();
  });
  visor.addEventListener('close', () => origem && origem.focus({ preventScroll: true }));
  $('.visor-x').addEventListener('click', () => visor.close());
  $('.visor-ant').addEventListener('click', () => mostra(atual - 1));
  $('.visor-prox').addEventListener('click', () => mostra(atual + 1));
  visor.addEventListener('click', e => { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostra(atual - 1); if (e.key === 'ArrowRight') mostra(atual + 1); });
  /* arrastar no celular: gesto horizontal > 50 px troca a foto */
  visor.addEventListener('touchstart', e => { origemX = e.touches[0].clientX; origemY = e.touches[0].clientY; }, { passive: true });
  visor.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - origemX, dy = e.changedTouches[0].clientY - origemY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) mostra(atual + (dx < 0 ? 1 : -1));
  }, { passive: true });
  let origemX = 0, origemY = 0;
})();
