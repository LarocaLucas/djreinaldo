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

  /* Galeria: só as fotos publicadas pela Central (galeria.json no R2). Grade 3x3; as demais entram na troca e no visor */
  const secao = $('#galeria'), grade = $('.grade'), visor = $('.visor'), visorImg = $('img', visor), contador = $('.visor-n');
  const R2 = 'https://arquivos.djreinaldo.com.br';
  const LUGARES = 9, TROCA_MIN = 5000, TROCA_VAR = 5000;
  let itens = [];
  /* os 9 lugares nascem vazios (mesma altura de sempre, o link #galeria cai no lugar certo) e recebem as fotos quando o JSON chega */
  const fotos = Array.from({ length: LUGARES }, (_, i) => {
    const b = document.createElement('button');
    b.className = 'foto'; b.type = 'button'; b.style.setProperty('--k', i % 3);
    b.setAttribute('aria-label', 'Ampliar foto');
    const img = document.createElement('img');
    img.alt = ''; img.width = 600; img.height = 750; img.decoding = 'async';
    b.append(img); grade.append(b);
    return b;
  });
  const entraFoto = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); entraFoto.unobserve(e.target); }
  }, { threshold: .1, rootMargin: '0px 0px -5% 0px' });
  fotos.forEach(f => entraFoto.observe(f));

  /* sem JSON (domínio fora do ar, inválido ou sem fotos): a seção e o link do menu somem, sem erro visível */
  const esconde = () => { secao.hidden = true; $$('a[href="#galeria"]').forEach(a => { a.hidden = true; }); };
  fetch(`${R2}/site/galeria.json`, { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()).then(j => {
    /* pasta DD-MM-AAAA ou AAAA-MM-DD, com sufixo -N quando o álbum foi substituído */
    const data = f => { let m = /^(\d{2})-(\d{2})-(\d{4})(?:-\d+)?$/.exec(f); if (m) return `${m[3]}-${m[2]}-${m[1]}`; m = /^(\d{4}-\d{2}-\d{2})(?:-\d+)?$/.exec(f); return m ? m[1] : ''; };
    const evs = (j.eventos || []).filter(e => /^[\w.-]+$/.test(e.folder) && e.total > 0).map((e, k) => ({ e, k }))
      .sort((x, y) => data(y.e.folder).localeCompare(data(x.e.folder)) || x.k - y.k);
    for (const { e } of evs) {
      /* ordem escolhida na Central primeiro; o que falta segue crescente; ocultas nunca aparecem */
      const ocultas = new Set(Array.isArray(e.ocultas) ? e.ocultas : []);
      const vale = n => Number.isInteger(n) && n >= 1 && n <= e.total && !ocultas.has(n);
      const nums = [...new Set((Array.isArray(e.ordem) ? e.ordem : []).filter(vale))];
      for (let n = 1; n <= e.total; n++) if (vale(n) && !nums.includes(n)) nums.push(n);
      for (const n of nums.slice(0, 500)) {
        const nn = String(n).padStart(2, '0');
        itens.push({ src: `${R2}/${e.folder}/${nn}.jpg`, thumb: e.miniaturas === true ? `${R2}/${e.folder}/mini/${nn}.webp` : `${R2}/${e.folder}/${nn}.jpg` });
      }
    }
    if (!itens.length) return esconde();
    fotos.splice(itens.length).forEach(f => f.remove());
    fotos.forEach((f, i) => { const img = $('img', f); img.src = itens[i].thumb; img.alt = `DJ Reinaldo em evento, foto ${i + 1}`; f.dataset.i = i; });
    comecaTroca();
  }).catch(esconde);

  let atual = 0, origem = null;
  const mostra = i => {
    atual = (i + itens.length) % itens.length;
    visorImg.src = itens[atual].src; visorImg.alt = `DJ Reinaldo em evento, foto ${atual + 1} de ${itens.length}`;
    contador.textContent = `${atual + 1} / ${itens.length}`;
    for (const d of [1, -1]) new Image().src = itens[(atual + d + itens.length) % itens.length].src;
  };
  grade.addEventListener('click', e => {
    const f = e.target.closest('.foto'); if (!f || f.dataset.i === undefined) return;
    origem = f; mostra(+f.dataset.i); visor.showModal();
  });
  /* troca sozinha: cada lugar da grade tem o seu relógio (5 a 10 s, sorteado a cada vez), então várias fotos
     trocam ao mesmo tempo e em ritmos diferentes; as fotos fora da grade entram em ciclo, sem nunca parar */
  const naTela = () => { const r = grade.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  let cursor = 0;
  const proxima = () => {
    const usados = new Set(fotos.flatMap(f => [+f.dataset.i, +f.dataset.vem]));
    for (let n = 0; n < itens.length; n++) {
      const k = (cursor + n) % itens.length;
      if (!usados.has(k)) { cursor = k + 1; return k; }
    }
    return -1;
  };
  const troca = f => {
    const k = naTela() && !document.hidden && !visor.open && itens.length > fotos.length ? proxima() : -1;
    if (k >= 0) {
      const img = $('img', f), pre = new Image();
      f.dataset.vem = k;
      pre.onerror = () => { delete f.dataset.vem; };
      pre.onload = () => {
        img.classList.add('troca');
        setTimeout(() => { img.src = itens[k].thumb; f.dataset.i = k; delete f.dataset.vem; img.classList.remove('troca'); }, 500);
      };
      pre.src = itens[k].thumb;
    }
    setTimeout(() => troca(f), TROCA_MIN + Math.random() * TROCA_VAR);
  };
  const comecaTroca = () => {
    if (semMovimento) return;
    cursor = fotos.length;
    fotos.forEach(f => setTimeout(() => troca(f), 1500 + Math.random() * TROCA_MIN));
  };
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
