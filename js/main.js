/* =====================================================================
   EVELLYN SANTOS — INTERAÇÕES
   Vanilla JS, sem bibliotecas. Animações por rAF + CSS.
   Os conteúdos vêm de js/projetos.js (window.PORTFOLIO).
   ===================================================================== */
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const catName = (id) => (D.categorias.find((c) => c.id === id) || {}).nome || id;
  const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  /* ---------------- header ---------------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const links = $('#navLinks');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    links.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', links).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && links.classList.contains('is-open')) { setMenu(false); burger.focus(); } });

  const navMap = new Map($$('a', links).map((a) => [a.getAttribute('href').slice(1), a]));
  const secIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navMap.forEach((a) => a.classList.remove('is-active'));
      const a = navMap.get(en.target.id);
      if (a) a.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) secIO.observe(s); });

  /* ---------------- revelação ao rolar ---------------- */
  const revIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revIO.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  function observeReveals(root = document) { $$('.reveal:not(.in), .scard', root).forEach((el) => revIO.observe(el)); }

  /* ---------------- hero: palco 3D ---------------- */
  const stage = $('#stage');
  const rig = $('#rig');
  const layers = $$('.layer', rig).map((el, i) => ({ el, depth: +el.dataset.depth, i, x: 0, y: 0 }));
  const glare = $('#glare');
  const heroPicks = ['moda-praia-lookbook', 'ensaio-casal-praia', 'moda-vestidos-estampados'];
  const reels = $$('.reel', rig);
  const reelCards = reels.map((slot, i) => {
    const p = D.projetos.find((x) => x.id === heroPicks[i]);
    const m = p.midias.find((x) => x.tipo === 'video' && x.formato === 'vertical');
    const fig = document.createElement('figure');
    fig.className = 'reel-card';
    fig.style.margin = '0';
    fig.innerHTML = reduce
      ? `<img src="${m.capa}" alt="">`
      : `<video muted loop playsinline autoplay preload="auto" poster="${m.capa}"><source src="${m.preview}" type="video/mp4"></video>`;
    fig.insertAdjacentHTML('beforeend', `<figcaption>${esc(catName(p.categorias[0]))}</figcaption>`);
    slot.appendChild(fig);
    return fig;
  });
  const heroVideos = $$('video', rig);

  const BASE_RY = -16, BASE_RX = 7, MAX_RY = 13, MAX_RX = 9;
  let tx = 0, ty = 0, cx = 0, cy = 0, idle = 999, heroOn = true, sy = window.scrollY;
  const hero = $('.hero');
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = stage.getBoundingClientRect();
    tx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
    ty = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
    idle = 0;
  });
  hero.addEventListener('pointerleave', () => { idle = 90; });

  new IntersectionObserver(([en]) => {
    heroOn = en.isIntersecting;
    heroVideos.forEach((v) => { if (heroOn) v.play().catch(() => {}); else v.pause(); });
  }).observe(hero);

  // cartão em destaque alterna a cada 2,4 s
  let activeReel = 0;
  if (!reduce) setInterval(() => {
    if (!heroOn) return;
    reels.forEach((r, i) => r.classList.toggle('is-on', i === activeReel));
    activeReel = (activeReel + 1) % reels.length;
  }, 2400);

  function heroFrame(t) {
    idle++;
    if (idle > 90) { tx = Math.sin(t / 2800) * 0.3; ty = Math.cos(t / 3300) * 0.2; }
    cx = lerp(cx, tx, 0.07); cy = lerp(cy, ty, 0.07);
    const s = clamp(sy / window.innerHeight, 0, 1);
    rig.style.transform = `rotateY(${BASE_RY * (1 - s * 0.5) + cx * MAX_RY}deg) rotateX(${BASE_RX - cy * MAX_RX}deg) translateY(${s * -40}px)`;
    layers.forEach((L) => {
      const k = L.depth / 100, e = 0.06 + L.i * 0.025;
      L.x = lerp(L.x, cx, e); L.y = lerp(L.y, cy, e);
      L.el.style.transform = `translate3d(${L.x * k * 40}px, ${L.y * k * 30}px, ${L.depth}px)`;
    });
    const lx = layers[0].x, ly = layers[0].y;
    reelCards.forEach((c, i) => {
      c.style.setProperty('--px', `${lx * (16 + i * 4)}px`);
      c.style.setProperty('--py', `${ly * (12 + i * 3)}px`);
    });
    glare.style.setProperty('--gx', `${50 + cx * 35}%`);
    glare.style.setProperty('--gy', `${40 + cy * 30}%`);
  }

  /* ---------------- showreel ---------------- */
  const player = $('#player');
  const reel = $('#reel');
  const pFill = $('#pFill');
  const pBar = $('#pBar');
  if (D.showreel.provisorio) $('#reelProv').hidden = false;
  player.style.backgroundImage = `url('${D.showreel.capa}')`;
  reel.poster = D.showreel.capa;
  player.classList.add('is-muted', 'is-paused');
  let reelLoaded = false;
  function reelPlay() {
    if (!reelLoaded) { reel.src = D.showreel.src; reelLoaded = true; }
    reel.play().catch(() => {});
  }
  function reelToggle() { reel.paused ? reelPlay() : reel.pause(); }
  $('#playBig').addEventListener('click', () => { reelPlay(); $('#pPlay').focus({ preventScroll: true }); });
  $('#pPlay').addEventListener('click', reelToggle);
  reel.addEventListener('click', reelToggle);
  reel.addEventListener('play', () => { player.classList.add('is-playing'); player.classList.remove('is-paused'); $('#pPlay').setAttribute('aria-label', 'Pausar'); });
  reel.addEventListener('pause', () => { player.classList.remove('is-playing'); player.classList.add('is-paused'); $('#pPlay').setAttribute('aria-label', 'Reproduzir'); });
  reel.addEventListener('timeupdate', () => {
    const p = reel.duration ? (reel.currentTime / reel.duration) * 100 : 0;
    pFill.style.width = p + '%'; pBar.setAttribute('aria-valuenow', Math.round(p));
  });
  reel.addEventListener('error', () => { if (reelLoaded) $('#pErr').hidden = false; });
  $('#pMute').addEventListener('click', () => {
    reel.muted = !reel.muted;
    player.classList.toggle('is-muted', reel.muted);
    $('#pMute').setAttribute('aria-label', reel.muted ? 'Ativar som' : 'Desativar som');
  });
  $('#pFull').addEventListener('click', () => {
    if (!reelLoaded) reelPlay();
    if (document.fullscreenElement) document.exitFullscreen();
    else if (player.requestFullscreen) player.requestFullscreen();
    else if (reel.webkitEnterFullscreen) reel.webkitEnterFullscreen();
  });
  function seek(e) {
    if (!reel.duration) return;
    const r = pBar.getBoundingClientRect();
    reel.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * reel.duration;
  }
  pBar.addEventListener('click', seek);
  pBar.addEventListener('keydown', (e) => {
    if (!reel.duration) return;
    if (e.key === 'ArrowRight') { reel.currentTime = Math.min(reel.duration, reel.currentTime + 5); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { reel.currentTime = Math.max(0, reel.currentTime - 5); e.preventDefault(); }
  });
  new IntersectionObserver(([en]) => { if (!en.isIntersecting && !reel.paused) reel.pause(); }, { threshold: 0.15 }).observe(player);

  /* ---------------- projetos: filtros + cards ---------------- */
  const grid = $('#grid');
  const filters = $('#filters');
  let current = 'todos';

  D.categorias.forEach((c) => {
    const n = c.id === 'todos' ? D.projetos.length : D.projetos.filter((p) => p.categorias.includes(c.id)).length;
    if (!n) return;
    const b = document.createElement('button');
    b.className = 'filter'; b.type = 'button'; b.dataset.f = c.id;
    b.setAttribute('aria-pressed', String(c.id === current));
    b.innerHTML = `${esc(c.nome)}<sup>${n}</sup>`;
    filters.appendChild(b);
  });

  function cardHTML(p) {
    const first = p.midias[0];
    const isVideo = first.tipo === 'video';
    const isH = first.formato === 'horizontal';
    const kind = isVideo ? (isH ? 'Vídeo 16:9' : 'Reel 9:16') : `${p.midias.length} ${p.midias.length > 1 ? 'fotos' : 'foto'}`;
    const badge = p.natureza ? `<span class="badge ${p.natureza}">${p.natureza === 'autoral' ? 'Projeto autoral' : 'Cliente'}</span>` : '';
    return `
      <article class="card" data-id="${p.id}">
        <button class="card-btn" type="button" aria-label="Abrir estudo de caso: ${esc(p.titulo)}">
          <div class="card-media${isH ? ' is-h' : ''}">
            ${isH ? `<span class="bgblur" style="background-image:url('${p.capa}')"></span>` : ''}
            <img src="${p.capa}" alt="${esc(p.titulo)} — capa" loading="lazy" decoding="async">
            ${badge}
            <span class="card-kind">${kind}</span>
            ${first.duracao ? `<span class="card-dur">${first.duracao}</span>` : ''}
            <span class="card-play">${isVideo ? ICON_PLAY : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>'}</span>
          </div>
          <div class="card-info">
            <div class="card-meta">${p.categorias.map(catName).map(esc).join(' · ')} — ${esc(p.producao)}</div>
            <h3 class="card-title">${esc(p.titulo)}</h3>
            <p class="card-sum">${esc(p.resumo)}</p>
            <span class="card-more ul">Ver projeto →</span>
          </div>
        </button>
      </article>`;
  }

  function render(f) {
    const list = D.projetos.filter((p) => f === 'todos' || p.categorias.includes(f));
    grid.innerHTML = list.map(cardHTML).join('');
    const cards = $$('.card', grid);
    if (!reduce) {
      cards.forEach((c) => c.classList.add('is-out'));
      requestAnimationFrame(() => requestAnimationFrame(() => cards.forEach((c, i) => {
        c.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
        c.classList.remove('is-out');
      })));
    }
    cards.forEach(bindCard);
  }

  filters.addEventListener('click', (e) => {
    const b = e.target.closest('.filter');
    if (!b || b.dataset.f === current) return;
    current = b.dataset.f;
    $$('.filter', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const cards = $$('.card', grid);
    if (reduce) return render(current);
    cards.forEach((c) => { c.style.transitionDelay = '0ms'; c.classList.add('is-out'); });
    setTimeout(() => render(current), 320);
  });

  // prévia em vídeo no hover (desktop) ou quando o card está no centro da tela (celular)
  function startPreview(card) {
    const p = D.projetos.find((x) => x.id === card.dataset.id);
    const m = p.midias[0];
    if (m.tipo !== 'video' || reduce) return;
    const media = $('.card-media', card);
    let v = $('video', media);
    if (!v) {
      v = document.createElement('video');
      Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'auto', src: m.preview });
      v.setAttribute('aria-hidden', 'true');
      v.addEventListener('playing', () => v.classList.add('ready'));
      $('img', media).after(v);
    }
    card.classList.add('is-hover');
    v.play().catch(() => {});
  }
  function stopPreview(card) {
    card.classList.remove('is-hover');
    const v = $('video', card);
    if (v) v.pause();
  }
  const mobIO = !canHover ? new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? startPreview(en.target) : stopPreview(en.target)));
  }, { rootMargin: '-35% 0px -35% 0px' }) : null;

  function bindCard(card) {
    const btn = $('.card-btn', card);
    if (canHover) {
      btn.addEventListener('mouseenter', () => startPreview(card));
      btn.addEventListener('mouseleave', () => stopPreview(card));
      btn.addEventListener('focus', () => startPreview(card));
      btn.addEventListener('blur', () => stopPreview(card));
    } else mobIO.observe(card);
    btn.addEventListener('click', () => openCase(card.dataset.id, btn));
  }

  /* ---------------- estudo de caso (modal) ---------------- */
  const dlg = $('#case');
  const caseMedia = $('#caseMedia');
  const caseBody = $('#caseBody');
  let lastTrigger = null;

  function mediaHTML(m, alt) {
    if (m.tipo === 'video') {
      return `<video controls playsinline preload="metadata" poster="${m.capa}" src="${m.src}"></video><span class="cm-loading" hidden>Não foi possível carregar este vídeo.</span>`;
    }
    return `<img src="${m.src}" alt="${esc(alt)}">`;
  }
  function showMedia(p, idx) {
    const m = p.midias[idx];
    const main = $('.cm-main', caseMedia);
    const old = $('video', main); if (old) old.pause();
    main.className = `cm-main ${m.tipo === 'foto' ? 'is-photo' : m.formato === 'horizontal' ? 'is-h' : 'is-v'}`;
    main.innerHTML = mediaHTML(m, `${p.titulo} — mídia ${idx + 1}`);
    const v = $('video', main);
    if (v) v.addEventListener('error', () => { $('.cm-loading', main).hidden = false; });
    $$('.cm-thumb', caseMedia).forEach((t, i) => t.setAttribute('aria-current', String(i === idx)));
  }

  function openCase(id, trigger) {
    const p = D.projetos.find((x) => x.id === id);
    if (!p) return;
    lastTrigger = trigger || null;
    const thumbs = p.midias.length > 1 ? `<div class="cm-thumbs" role="list">${p.midias.map((m, i) => `
      <button class="cm-thumb${m.formato === 'horizontal' ? ' is-h' : ''}" type="button" role="listitem" data-i="${i}" aria-label="Mostrar ${m.tipo === 'video' ? 'vídeo' : 'foto'} ${i + 1}">
        <img src="${m.mini || m.capa}" alt="" loading="lazy">${m.tipo === 'video' ? `<span class="vi">${ICON_PLAY}</span>` : ''}
      </button>`).join('')}</div>` : '';
    caseMedia.innerHTML = `<div class="cm-main"></div>${thumbs}`;
    showMedia(p, 0);
    $$('.cm-thumb', caseMedia).forEach((t) => t.addEventListener('click', () => showMedia(p, +t.dataset.i)));

    const sec = (t, v) => v && (Array.isArray(v) ? v.length : true)
      ? `<div class="case-sec"><h3>${t}</h3>${Array.isArray(v) ? `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : `<p>${esc(v)}</p>`}</div>` : '';
    const nat = p.natureza ? `<span class="${p.natureza}">${p.natureza === 'autoral' ? 'Projeto autoral' : 'Trabalho para cliente'}</span>` : '';
    caseBody.innerHTML = `
      <div class="card-meta">${p.categorias.map(catName).map(esc).join(' · ')}</div>
      <h2 id="caseTitle">${esc(p.titulo)}</h2>
      <div class="case-tags">${nat}<span>${esc(p.cliente)}</span><span>${esc(p.producao)}</span></div>
      ${sec('Sobre a marca', p.sobre)}
      ${sec('Objetivo', p.objetivo)}
      ${sec('Meu papel', p.papel)}
      ${sec('Processo criativo', p.processo)}
      ${sec('Resultado', p.resultado)}`;
    caseBody.scrollTop = 0; caseMedia.scrollTop = 0;
    if (!dlg.open) dlg.showModal();
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', `#projeto=${id}`);
  }
  function closeCase() { dlg.close(); }
  dlg.addEventListener('close', () => {
    $$('video', dlg).forEach((v) => v.pause());
    document.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search);
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
  $('#caseClose').addEventListener('click', closeCase);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeCase(); });

  render(current);

  // link direto para um projeto: index.html#projeto=moda-praia-lookbook
  const deep = location.hash.match(/^#projeto=([\w-]+)/);
  if (deep) setTimeout(() => openCase(deep[1]), 300);

  /* ---------------- fotografia: rolagem horizontal ---------------- */
  const hs = $('#fotografia');
  const hsTrack = $('#hsTrack');
  const hsFill = $('#hsFill');
  hsTrack.innerHTML = D.galeria.map((g) => `
    <figure class="hs-card"><img src="${g.mini}" srcset="${g.mini} 800w, ${g.src} 1200w" sizes="(max-width: 760px) 70vw, 400px" alt="${esc(g.alt)}" loading="lazy" decoding="async"><figcaption>${esc(g.alt)}</figcaption></figure>`).join('');
  let hsDist = 0;
  function hsSize() {
    hsDist = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
    hs.style.height = `${window.innerHeight + hsDist}px`;
  }

  /* ---------------- frase revelada palavra por palavra ---------------- */
  const rl = $('#rlText');
  const rlSec = rl.closest('.revealline');
  (function splitWords(node) {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) splitWords(n);
    });
  })(rl);
  const words = $$('.w', rl);

  /* ---------------- processo: cartões empilhados ---------------- */
  const scards = $$('.scard');
  const shades = scards.map((c) => $('.scard-shade', c));

  /* ---------------- foto do perfil (parallax) ---------------- */
  const fotoBox = $('#fotoPerfil');
  const fotoImg = $('img', fotoBox);

  /* ---------------- contato ---------------- */
  const linkAttrs = (c) => (/^https?:/.test(c.url) ? ' target="_blank" rel="noopener"' : '') + (c.download ? ' download' : '');
  $('#ctaBtns').innerHTML = D.contato.map((c, i) => {
    const url = (c.url || '').trim();
    if (!url) return `<span class="btn btn-ghost" aria-disabled="true">${esc(c.rotulo)} <small>em breve</small></span>`;
    return `<a class="btn ${i === 0 ? 'btn-solid' : 'btn-ghost'}" href="${esc(url)}"${linkAttrs(c)}>${esc(c.rotulo)} <span aria-hidden="true">→</span></a>`;
  }).join('');
  $('#footSocial').innerHTML = D.contato.filter((c) => c.url && !c.download)
    .map((c) => `<a class="ul" href="${esc(c.url)}"${linkAttrs(c)}>${esc(c.rotulo.replace(/^(Conversar no|Enviar) /, ''))}</a>`).join('');

  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------------- laço principal ---------------- */
  function scrollFx() {
    const vh = window.innerHeight;
    nav.classList.toggle('is-scrolled', window.scrollY > 30);

    // galeria horizontal
    const hr = hs.getBoundingClientRect();
    const hp = hsDist ? clamp(-hr.top / hsDist, 0, 1) : 0;
    hsTrack.style.transform = `translate3d(${-hp * hsDist}px,0,0)`;
    hsFill.style.width = `${hp * 100}%`;

    // frase
    const rr = rlSec.getBoundingClientRect();
    const rp = reduce ? 1 : clamp(-rr.top / (rr.height - vh), 0, 1);
    const lit = Math.floor(rp * words.length * 1.15);
    words.forEach((w, i) => w.classList.toggle('lit', i < lit));

    // cartões empilhados
    if (!reduce) {
      const tops = scards.map((c) => c.getBoundingClientRect().top);
      scards.forEach((c, i) => {
        let P = 0;
        for (let j = i + 1; j < scards.length; j++) {
          const stick = vh * 0.13 + j * 20;
          P += clamp((vh - tops[j]) / (vh - stick), 0, 1);
        }
        c.style.transform = `scale(${1 - P * 0.035})`;
        shades[i].style.opacity = String(clamp(P, 0, 1) * 0.55);
      });
    }

    // parallax leve na foto do perfil
    if (fotoImg && !reduce) {
      const r = fotoBox.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      fotoImg.style.transform = `translateY(${(p - 0.5) * -12}%)`;
    }
  }

  function tick(t) {
    sy = lerp(sy, window.scrollY, 0.075);
    if (heroOn) heroFrame(t);
    requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', scrollFx, { passive: true });
  window.addEventListener('resize', () => { hsSize(); scrollFx(); });
  window.addEventListener('load', () => { hsSize(); scrollFx(); });
  hsSize(); scrollFx();
  observeReveals();
  if (!reduce) requestAnimationFrame(tick); else heroFrame(0);
})();
