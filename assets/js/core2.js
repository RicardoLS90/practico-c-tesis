/* ==========================================================================
   Práctico — core v2 (ronda 3)
   Motor compartido de las tres páginas.
   Motor de idioma ES/EN (localStorage["practico.lang"]), panel móvil,
   acordeón, año del footer, imagen con duotono y reveals.
   Sin dependencias. Funciona con file://
   ========================================================================== */
(function () {
  "use strict";

  var LANG_KEY = "practico.lang";
  var DEFAULT_LANG = "es";
  var ALLOWED = ["es", "en"];

  var state = { lang: DEFAULT_LANG, dict: null };
  var renderers = [];
  var booted = false;

  /* ---------------------------------------------------------------- utils */

  function resolve(obj, path) {
    if (!obj || !path) return undefined;
    var parts = String(path).split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur === null || cur === undefined) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function t(path) {
    var v = resolve(state.dict, path);
    if (v === undefined || v === null) {
      if (window.console && console.warn) console.warn("[i18n] falta:", path, state.lang);
      return "";
    }
    return v;
  }

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") el.className = v;
        else if (k === "text") el.textContent = v;
        else if (k === "html") el.innerHTML = v;
        else if (k.indexOf("on") === 0 && typeof v === "function") el.addEventListener(k.slice(2), v);
        else if (v === true) el.setAttribute(k, "");
        else el.setAttribute(k, v);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c === null || c === undefined) return;
        el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return el;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ------------------------------------------------------------ mailto */

  function mailtoHref(key) {
    var contact = window.CONTACT || {};
    var email = contact.email || "contacto@practico.com";
    var def = key ? t("mailto." + key) : "";
    var subject = typeof def === "object" && def ? def.subject : def || "";
    var body = typeof def === "object" && def ? def.body || "" : "";
    var href = "mailto:" + email;
    var q = [];
    if (subject) q.push("subject=" + encodeURIComponent(subject));
    if (body) q.push("body=" + encodeURIComponent(body));
    return q.length ? href + "?" + q.join("&") : href;
  }

  function applyMailto(root) {
    (root || document).querySelectorAll("[data-mailto]").forEach(function (a) {
      a.setAttribute("href", mailtoHref(a.getAttribute("data-mailto")));
    });
    (root || document).querySelectorAll("[data-contact-plain]").forEach(function (a) {
      var contact = window.CONTACT || {};
      a.setAttribute("href", "mailto:" + (contact.email || "contacto@practico.com"));
      if (!a.textContent.trim()) a.textContent = contact.email || "contacto@practico.com";
    });
  }

  /* ------------------------------------------------- traducción estática */

  function applyStatic(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = v;
    });

    scope.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-aria"));
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });

    scope.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-title"));
      if (typeof v === "string") el.setAttribute("title", v);
    });

    scope.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-alt"));
      if (typeof v === "string") el.setAttribute("alt", v);
    });

    scope.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-ph"));
      if (typeof v === "string") el.setAttribute("placeholder", v);
    });

    scope.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-content"));
      if (typeof v === "string") el.setAttribute("content", v);
    });

    document.title = t("meta.title") || document.title;
  }

  function renderNavLists() {
    var d = window.Practico.dict();
    var links = (d.nav && d.nav.links) || [];

    document.querySelectorAll("[data-nav-list]").forEach(function (host) {
      window.Practico.clear(host);
      links.forEach(function (l) {
        host.appendChild(h("li", {}, [
          h("a", { class: "nav__link", href: l.href, text: l.label })
        ]));
      });
    });

    document.querySelectorAll("[data-footer-list]").forEach(function (host) {
      window.Practico.clear(host);
      links.forEach(function (l) {
        host.appendChild(h("li", {}, [
          h("a", { class: "footer__link", href: l.href, text: l.label })
        ]));
      });
    });
  }

  /* -------------------------------------------------------- navegación */

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.getElementById("navPanel");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.classList.toggle("is-open", open);
      var header = document.querySelector(".site-header");
      if (header) {
        if (open) header.setAttribute("data-menu-open", "1");
        else header.removeAttribute("data-menu-open");
        header.classList.toggle("is-scrolled", open || window.scrollY > 24);
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    function close() { setOpen(false); }

    panel.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        close();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) close();
    });
  }

  /* -------------------------------------------------------- idioma UI */

  function initLangToggle() {
    var btn = document.querySelector("[data-lang-toggle]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      setLang(state.lang === "es" ? "en" : "es");
    });
  }

  function paintLangToggle() {
    var btn = document.querySelector("[data-lang-toggle]");
    if (!btn) return;
    btn.querySelectorAll("[data-lang-opt]").forEach(function (sp) {
      sp.setAttribute("data-active", sp.getAttribute("data-lang-opt") === state.lang ? "true" : "false");
    });
    btn.setAttribute("aria-label", t("a11y.langToggle") || "ES / EN");
    btn.setAttribute("title", t("a11y.langToggle") || "ES / EN");
  }

  /* ------------------------------------------------------------- acordeón */

  function accordion(host, items, opts) {
    if (!host) return;
    var prefix = (opts && opts.idPrefix) || host.id || "acc";
    clear(host);
    host.classList.add("acc");

    items.forEach(function (item, i) {
      var panelId = prefix + "-panel-" + i;
      var btnId = prefix + "-btn-" + i;

      var trigger = h("button", {
        type: "button",
        class: "acc__trigger",
        id: btnId,
        "aria-expanded": "false",
        "aria-controls": panelId
      }, [
        h("span", { class: "acc__q", text: item.q }),
        h("span", { class: "acc__icon", "aria-hidden": "true" })
      ]);

      var panel = h("div", {
        class: "acc__panel",
        id: panelId,
        role: "region",
        "aria-labelledby": btnId,
        hidden: true
      }, [h("p", { text: item.a })]);

      host.appendChild(h("div", { class: "acc__item" }, [
        h("h3", { class: "acc__heading" }, [trigger]),
        panel
      ]));
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".acc__trigger");
    if (!btn) return;
    var expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) panel.hidden = expanded;
  });

  /* ------------------------------------------------------------- año */

  function paintYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------ imagen */
  /* Duotono navy de alto contraste: el filtro y las capas viven en base2.css.
     Si img.src es null vuelve al slot "Imagen pendiente". */

  /* Variantes responsive de las fotos de contenido. Los archivos los genera
     `gen.py` en assets/img/ref con los sufijos -640 / -1024 / -{ancho nativo}.
     Nunca se agranda el original: si el ancho nativo es menor a 1600, la
     variante grande lleva el ancho nativo como descriptor. */
  var REF_VARIANTS = [640, 1024];

  function refVariantSrcset(src, native) {
    if (!src || !native || src.indexOf("assets/img/ref/") !== 0) return null;
    var m = /^(.*)\.jpe?g$/i.exec(src);
    if (!m) return null;
    var base = m[1];
    var widths = REF_VARIANTS.slice();
    if (native > 1024) widths.push(native >= 1600 ? 1600 : native);
    return widths.map(function (w) {
      return base + "-" + w + ".jpg " + w + "w";
    }).join(", ");
  }

  function refFallbackSrc(src, native) {
    if (!src || !native || src.indexOf("assets/img/ref/") !== 0) return src;
    var m = /^(.*)\.jpe?g$/i.exec(src);
    if (!m) return src;
    return native >= 1024 ? m[1] + "-1024.jpg" : src;
  }

  /* Anchos reales medidos (1440 y 1920): cuadrado con la grilla de cada bloque. */
  var MEDIA_SIZES = {
    "media--16-9": "(max-width: 900px) 92vw, (max-width: 1500px) 60vw, 1000px",
    "media--3-2": "(max-width: 900px) 90vw, 57vw",
    "media--4-5": "(max-width: 900px) 60vw, 420px"
  };

  function mediaFigure(img, mod) {
    var fig = h("figure", { class: "media" + (mod ? " " + mod : "") });
    if (!img) return fig;

    if (!img.src) {
      var slotMod = mod === "media--3-2" ? " slot--3-2"
        : mod === "media--4-5" ? " slot--4-5"
        : " slot--16-9";
      var label = img.label || t("common.pendingImage");
      var path = img.path || "";
      var slotChildren = [h("p", { class: "slot__label", text: label })];
      if (path) slotChildren.push(h("p", { class: "slot__path", text: path }));
      fig.appendChild(h("div", { class: "slot" + slotMod }, slotChildren));
      if (img.caption) fig.appendChild(h("p", { class: "slot__caption", text: img.caption }));
      return fig;
    }

    var frame = h("div", { class: "media__frame" });
    var srcset = refVariantSrcset(img.src, img.width);
    var attrs = {
      class: "media__img",
      src: refFallbackSrc(img.src, img.width),
      alt: img.alt || "",
      width: img.width || 1600,
      height: img.height || 900,
      loading: img.eager ? "eager" : "lazy",
      decoding: "async"
    };
    if (srcset) {
      attrs.srcset = srcset;
      attrs.sizes = MEDIA_SIZES[mod] || "100vw";
    }
    frame.appendChild(h("img", attrs));
    frame.appendChild(h("span", { class: "media__tint media__tint--navy", "aria-hidden": "true" }));
    frame.appendChild(h("span", { class: "media__tint media__tint--gray", "aria-hidden": "true" }));
    fig.appendChild(frame);

    // Los créditos NO van en la página: viven en assets/img/ref/CREDITS.md
    var caption = img.caption || "";
    if (caption) fig.appendChild(h("p", { class: "media__cap micro", text: caption }));
    return fig;
  }

  /* ------------------------------------------------------------ reveals */
  /* `.reveal` de base2.css es `opacity: 0` SIN condición (no depende de
     `reveal-on`). Un elemento que recibe la clase y nunca recibe `is-in` queda
     invisible para siempre. Por eso hay tres capas:
       1. IntersectionObserver — entrada normal por scroll.
       2. Barrido (`sweepReveals`) — lo que ya está en la zona visible.
       3. Red de seguridad re-armada — a los 1200ms de cada render y en cada
          cambio de idioma, más scroll/resize/beforeprint.
     Cubre apertura por ancla, impresión, re-render de idioma y pestaña en
     segundo plano (el observer no dispara si el documento no está visible). */
  var revealIO = null;
  var revealExtraIO = null;
  var revealNetTimer = null;
  var revealSweepQueued = false;
  var revealBound = false;

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* --------------------------------------------------- easing del tema */
  /* Lee --ease-out (cubic-bezier) de :root y resuelve x -> y por bisección.
     Si la variable no se puede parsear, cae a un ease-out cúbico estándar. */
  var easeOutFn = null;

  function cubicBez(u, c1, c2) {
    var v = 1 - u;
    return 3 * v * v * u * c1 + 3 * v * u * u * c2 + u * u * u;
  }

  function resolveEaseOut() {
    if (easeOutFn) return easeOutFn;

    var raw = "";
    try {
      raw = (getComputedStyle(document.documentElement).getPropertyValue("--ease-out") || "").trim();
    } catch (err) {}

    var m = /^cubic-bezier\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)$/.exec(raw);
    if (!m) {
      easeOutFn = function (t) { return 1 - Math.pow(1 - t, 3); };
      return easeOutFn;
    }

    var x1 = parseFloat(m[1]), y1 = parseFloat(m[2]);
    var x2 = parseFloat(m[3]), y2 = parseFloat(m[4]);

    easeOutFn = function (t) {
      if (!(t > 0)) return 0;
      if (t >= 1) return 1;
      var lo = 0, hi = 1, u = t, i;
      for (i = 0; i < 20; i++) {
        if (cubicBez(u, x1, x2) < t) lo = u;
        else hi = u;
        u = (lo + hi) / 2;
      }
      return cubicBez(u, y1, y2);
    };
    return easeOutFn;
  }

  /* -------------------------------------------- contadores de la prueba */
  /* Las cifras de la banda (.proof__value) cuentan de 0 al valor al entrar
     en viewport. Se localizan por su contenedor, nunca por texto.
     900ms, easing del tema, progreso por tiempo real (rAF).
     Una sola vez por carga; con reduce, valor final directo. */
  var COUNT_DURATION = 900;
  var countTargets = typeof WeakMap === "function" ? new WeakMap() : null;
  var countIO = null;
  var countDone = false;

  function countParse(text) {
    var m = /^([^0-9]*)([0-9]+)([\s\S]*)$/.exec(String(text).replace(/\s+$/, ""));
    if (!m) return null;
    return { pre: m[1], num: parseInt(m[2], 10), post: m[3] };
  }

  function countPaint(el, n) {
    if (!countTargets) return;
    var v = countTargets.get(el);
    if (!v) return;
    el.textContent = v.pre + String(n) + v.post;
  }

  function countPlay(els) {
    var ease = resolveEaseOut();
    var base = null;

    function frame(now) {
      if (base === null) base = now;
      var p = Math.min(1, (now - base) / COUNT_DURATION);
      var e = ease(p);

      els.forEach(function (el) {
        if (!el.isConnected || !countTargets.has(el)) return;
        var v = countTargets.get(el);
        el.textContent = v.pre + String(Math.round(v.num * e)) + v.post;
      });

      if (p < 1) {
        window.requestAnimationFrame(frame);
      } else {
        els.forEach(function (el) {
          if (!el.isConnected || !countTargets.has(el)) return;
          el.textContent = countTargets.get(el).pre + String(countTargets.get(el).num) + countTargets.get(el).post;
        });
      }
    }

    window.requestAnimationFrame(frame);
  }

  function initCounters() {
    if (countDone || !countTargets) return;

    var host = document.getElementById("proofGrid") || document.querySelector(".proof__grid");
    if (!host) return;

    var els = Array.prototype.slice.call(host.querySelectorAll(".proof__value"));
    if (!els.length) return;

    var todo = [];
    els.forEach(function (el) {
      var v = countParse(el.textContent);
      if (!v) return;
      countTargets.set(el, v);
      el.textContent = v.pre + "0" + v.post;
      todo.push(el);
    });
    if (!todo.length) return;

    if (prefersReducedMotion()) {
      todo.forEach(function (el) { countPaint(el, countTargets.get(el).num); });
      countDone = true;
      return;
    }

    if (!("IntersectionObserver" in window)) {
      todo.forEach(function (el) { countPaint(el, countTargets.get(el).num); });
      countDone = true;
      return;
    }

    if (!countIO) {
      countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countIO.unobserve(entry.target);
          if (countDone) return;
          countDone = true;

          var list = Array.prototype.slice.call(
            entry.target.querySelectorAll(".proof__value")
          ).filter(function (el) { return countTargets.has(el); });

          if (list.length) countPlay(list);
        });
      }, { threshold: 0.35 });
    }

    countIO.observe(host);
  }

  /* ------------------------------------------- declaración (clip-path) */
  /* El texto no se mueve: se descubre con una máscara horizontal.
     La clase en <html> evita que el bloque quede oculto si JS no corre. */
  var statementIO = null;

  function initStatements() {
    var els = document.querySelectorAll(".statement");
    if (!els.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("clip-on");
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    document.documentElement.classList.add("clip-on");

    if (!statementIO) {
      /* Se observa la banda, no el párrafo: con clip-path de ancho 0 el propio
         elemento nunca intersecta y el observer no dispararía. */
      statementIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var host = entry.target;
          host.querySelectorAll(".statement").forEach(function (el) { el.classList.add("is-in"); });
          if (host.classList.contains("statement")) host.classList.add("is-in");
          statementIO.unobserve(host);
        });
      }, { threshold: 0.2 });
    }

    els.forEach(function (el) {
      var host = el.closest(".statement-band") || el.parentElement || el;
      statementIO.observe(host);
    });
  }

  function ensureReveal() {
    if (revealIO) return true;
    if (!("IntersectionObserver" in window)) return false;
    document.documentElement.classList.add("reveal-on");
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    return true;
  }

  /* Mismo recorte que el observer (rootMargin 0 0 -12% 0). */
  function inRevealZone(el) {
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.88 && r.bottom > 0;
  }

  function sweepReveals() {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      if (inRevealZone(el)) el.classList.add("is-in");
    });
  }

  function revealAll() {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  function queueSweep() {
    if (revealSweepQueued) return;
    revealSweepQueued = true;
    window.requestAnimationFrame(function () {
      revealSweepQueued = false;
      sweepReveals();
    });
  }

  /* Red de seguridad: se re-arma en cada render (idioma incluido). Nunca es
     "una sola vez a los 800ms" — eso dejaba invisible todo lo que no estaba
     en pantalla en ese instante (ancla, impresión, re-render, pestaña oculta). */
  function armRevealNet() {
    window.clearTimeout(revealNetTimer);
    revealNetTimer = window.setTimeout(sweepReveals, 1200);
  }

  function bindRevealSafety() {
    if (revealBound) return;
    revealBound = true;
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep);
    window.addEventListener("beforeprint", revealAll);
    /* `emulateMedia('print')` y la vista previa del navegador no siempre emiten
       `beforeprint`: este listener cubre ese caso (y el real, sin daño). */
    if (window.matchMedia) {
      var printMQ = window.matchMedia("print");
      var onPrint = function (e) { if (e.matches) revealAll(); };
      if (printMQ.addEventListener) printMQ.addEventListener("change", onPrint);
      else if (printMQ.addListener) printMQ.addListener(onPrint);
    }
    /* render() emite este evento después de initReveal, así que acá el sistema
       ya está completo: se barre lo visible y se re-arma la red. */
    document.addEventListener("practico:render", function () {
      if (prefersReducedMotion()) { revealAll(); return; }
      sweepReveals();
      armRevealNet();
    });
  }

  /* Bloques que cada página añade fuera del registro fijo (attr propio).
     Una sola implementación: la de acá, con el mismo CSS, stagger y política
     de movimiento reducido. */
  function revealObserverForExtras() {
    if (revealExtraIO) return revealExtraIO;
    if (!("IntersectionObserver" in window)) return null;
    document.documentElement.classList.add("reveal-on");
    revealExtraIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealExtraIO.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    return revealExtraIO;
  }

  function registerReveals(els) {
    if (!els) return;
    var list = Array.prototype.slice.call(els);
    if (!list.length) return;

    if (prefersReducedMotion()) {
      list.forEach(function (el) { el.classList.add("reveal", "is-in"); });
      return;
    }

    var io = revealObserverForExtras();
    if (!io) return; // sin observer no se oculta nada: el elemento queda visible

    list.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (Math.min(i, REVEAL_STAGGER_MAX - 1) * REVEAL_STAGGER_STEP) + "ms";
      io.observe(el);
    });
    armRevealNet();
  }

  var REVEAL_SELECTOR = [
    ".section-head", ".sym-card", ".phase", ".house-row", ".case-card",
    ".dash-card", ".acc__item", ".dx", ".hero__text", ".hero__media",
    ".map-card", ".proof", ".about__media", ".about__text",
    ".approach__quote", ".approach__text", ".close__inner",
    ".shift-card", ".stage", ".stair-row", ".why-card",
    ".shift__row"
  ].join(",");

  var REVEAL_STAGGER_STEP = 70;   // ms entre hermanos
  var REVEAL_STAGGER_MAX = 6;     // tope: del 7º en adelante no suma

  function revealDelayFor(el, counts) {
    var group = el.closest && el.closest("[data-reveal-group]");
    if (!group || !counts) return "";
    var n = counts.get(group) || 0;
    counts.set(group, n + 1);
    return (Math.min(n, REVEAL_STAGGER_MAX - 1) * REVEAL_STAGGER_STEP) + "ms";
  }

  function initReveal() {
    bindRevealSafety();

    // Con movimiento reducido no se oculta nada: is-in inmediato a todos y sin
    // observer. El CSS (`@media reduce`) mantiene el fade, así no hay huecos ni
    // depende del scroll para aparecer.
    if (prefersReducedMotion()) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(function (el) {
        el.classList.add("reveal", "is-in");
        el.style.transitionDelay = "";
      });
      revealAll();
      return;
    }

    // Sin IntersectionObserver no se añade `.reveal`: nada queda oculto.
    if (!ensureReveal()) return;
    revealIO.disconnect();

    var counts = typeof Map === "function" ? new Map() : null;

    document.querySelectorAll(REVEAL_SELECTOR).forEach(function (el) {
      el.classList.add("reveal");
      el.style.transitionDelay = revealDelayFor(el, counts);
      revealIO.observe(el);
    });

    armRevealNet();
  }

  /* ------------------------------------------- header fijo sobre el hero */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function paint() {
      header.classList.toggle(
        "is-scrolled",
        header.hasAttribute("data-menu-open") || window.scrollY > 24
      );
    }

    window.addEventListener("scroll", paint, { passive: true });
    paint();
  }

  /* ------------------------------------------------------------ render */

  function render() {
    applyStatic(document);
    applyMailto(document);
    renderNavLists();
    paintLangToggle();
    paintYear();
    renderers.forEach(function (fn) {
      try { fn(state.lang, state.dict); } catch (err) {
        if (window.console && console.error) console.error("[render]", err);
      }
    });
    try { initReveal(); } catch (err) {
      if (window.console && console.error) console.error("[reveal]", err);
      document.documentElement.classList.remove("reveal-on");
    }
    try { initStatements(); } catch (err) {
      if (window.console && console.error) console.error("[statement]", err);
      document.documentElement.classList.remove("clip-on");
    }
    try { initCounters(); } catch (err) {
      if (window.console && console.error) console.error("[counters]", err);
    }
    document.dispatchEvent(new CustomEvent("practico:render", { detail: { lang: state.lang } }));
  }

  function setLang(lang) {
    if (ALLOWED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    state.lang = lang;
    state.dict = (window.CONTENT && window.CONTENT[lang]) || {};
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
    render();
  }

  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (err) {}
    if (ALLOWED.indexOf(saved) === -1) saved = DEFAULT_LANG;
    return saved;
  }

  function onRender(fn) {
    if (typeof fn === "function") renderers.push(fn);
  }

  /* --------------------------------------------------------------- boot */

  function boot() {
    if (booted) return;
    booted = true;
    initNav();
    initLangToggle();
    initHeaderScroll();
    setLang(getLang());
  }

  window.Practico = {
    t: t,
    h: h,
    clear: clear,
    render: render,
    setLang: function (l) { setLang(l); },
    getLang: function () { return state.lang; },
    dict: function () { return state.dict || {}; },
    onRender: onRender,
    accordion: accordion,
    media: mediaFigure,
    mailtoHref: mailtoHref,
    resolve: resolve,
    easeOut: function (p) { return resolveEaseOut()(p); },
    reducedMotion: prefersReducedMotion,
    reveal: {
      sweep: sweepReveals,
      all: revealAll,
      arm: armRevealNet,
      register: registerReveals
    }
  };

  if (document.readyState === "complete") {
    boot();
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();

/* --------------------------------------------------------------------------
   Entrada de pagina (vive en base2.css, seccion 20)
   Al terminar la animacion se marca .is-entered en <html> para retirar
   will-change y el filter residual (evita un containing block vivo en
   header/main/footer). Con timeout de respaldo por si animationend no llega
   (pestana en segundo plano, animacion cancelada).
   Es compartido por las tres paginas: a-diagnostico, b-recorrido y c-tesis.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var root = document.documentElement;
  if (!root.classList.contains("page-enter")) return;

  var targets = [
    document.querySelector("body > .site-header"),
    document.querySelector("body > main"),
    document.querySelector("body > footer")
  ].filter(Boolean);

  var settled = false;

  function settle() {
    if (settled) return;
    settled = true;
    root.classList.add("is-entered");
    targets.forEach(function (el) { el.removeEventListener("animationend", onEnd); });
  }

  function onEnd(e) {
    if (e.target === e.currentTarget) settle();
  }

  targets.forEach(function (el) { el.addEventListener("animationend", onEnd); });
  window.setTimeout(settle, 1100);
})();
