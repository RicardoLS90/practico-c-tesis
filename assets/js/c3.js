/* ==========================================================================
   Práctico — boceto C v3 · "La Tesis" con columna vertebral de consultora
   Render de los bloques propios de C v3: problemas numerados, cifras con
   contador, etapas, diferenciales con check que se dibuja, tabla comparativa
   y las dos listas del footer.

   No reimplementa el sistema: idioma ES/EN, header, nav, reveals
   (.reveal / --dur-4 / stagger), mailto, año del footer y el puente de
   reveals viven en core2.js + base2.css. Los contadores y el trazo de los
   checks son lo único propio, porque en C v3 las cifras no son la banda
   .proof de A/B.
   ========================================================================== */
(function () {
  "use strict";

  var h = window.Practico.h;

  /* ------------------------------------------------------------- utils */

  function pad2(n) { return String(n).padStart(2, "0"); }

  function reduced() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Check de 24px: el trazo se dibuja con stroke-dashoffset (ver c3.css §6) */
  function checkGlyph(mod) {
    return h("span", {
      class: "c3-check" + (mod ? " " + mod : ""),
      "aria-hidden": "true",
      html: '<svg viewBox="0 0 24 24" fill="none" focusable="false">' +
            '<path class="c3-check__path" d="M4 12.5 9.5 18 20 6" ' +
            'stroke="currentColor" stroke-width="2.4" stroke-linecap="round" ' +
            'stroke-linejoin="round"></path></svg>'
    });
  }

  /* ==================================================== LISTAS NUMERADAS
     Mismo componente para "Lo que resolvemos" (3) y "Por qué Práctico" (5).
     El número va aria-hidden: el orden lo lleva el <ol>.
     ==================================================== */
  function renderNumbered(hostId, sectionKey) {
    var host = document.getElementById(hostId);
    if (!host) return;

    var d = window.Practico.dict()[sectionKey] || {};
    var items = d.items || [];
    window.Practico.clear(host);

    items.forEach(function (it, i) {
      host.appendChild(h("li", { class: "c3-item" }, [
        h("p", { class: "c3-item__n", "aria-hidden": "true", text: it.n || pad2(i + 1) }),
        h("div", { class: "c3-item__body" }, [
          h("h3", { class: "c3-item__title", text: it.title || "" }),
          h("p", { class: "c3-item__text", text: it.text || "" })
        ])
      ]));
    });
  }

  /* ============================================================ CIFRAS
     Cuatro cifras: 15 · +30 · 5 · 0. Cuentan de 0 al valor al entrar en
     viewport, 900ms con la curva del tema. El valor final se escribe siempre
     cuando ya contaron o con movimiento reducido: nunca queda un 0 falso.
     ============================================================ */
  var COUNT_DURATION = 900;
  var countTargets = typeof WeakMap === "function" ? new WeakMap() : null;
  var counted = false;
  var figuresIO = null;

  function countParse(text) {
    var m = /^([^0-9]*)([0-9]+)([\s\S]*)$/.exec(String(text === null || text === undefined ? "" : text));
    if (!m) return null;
    return { pre: m[1], num: parseInt(m[2], 10), post: m[3] };
  }

  function paintValue(el, n) {
    if (!countTargets) return;
    var v = countTargets.get(el);
    if (!v) return;
    el.textContent = v.pre + String(n) + v.post;
  }

  function countPlay(els) {
    var ease = (window.Practico && window.Practico.easeOut) || function (t) { return t; };
    var base = null;

    function frame(now) {
      if (base === null) base = now;
      var p = Math.min(1, (now - base) / COUNT_DURATION);
      var e = ease(p);

      els.forEach(function (el) {
        if (!el.isConnected || !countTargets.has(el)) return;
        paintValue(el, Math.round(countTargets.get(el).num * e));
      });

      if (p < 1) window.requestAnimationFrame(frame);
      else els.forEach(function (el) { paintValue(el, countTargets.get(el).num); });
    }

    window.requestAnimationFrame(frame);
  }

  function renderFigures() {
    var host = document.getElementById("c3Figures");
    if (!host || !countTargets) return;

    var d = window.Practico.dict().s3 || {};
    var items = d.items || [];
    var els = [];

    window.Practico.clear(host);

    items.forEach(function (it) {
      var value = h("p", { class: "c3-figure__value", text: it.value || "" });
      var parsed = countParse(it.value);
      if (parsed) countTargets.set(value, parsed);
      els.push(value);

      host.appendChild(h("li", { class: "c3-figure" }, [
        value,
        h("p", { class: "c3-figure__label", text: it.label || "" })
      ]));
    });

    if (!els.length) return;

    /* Ya contaron (cambio de idioma) o no hay animación posible: valor final */
    if (counted || reduced() || !("IntersectionObserver" in window)) {
      counted = true;
      els.forEach(function (el) {
        if (countTargets.has(el)) paintValue(el, countTargets.get(el).num);
      });
      return;
    }

    els.forEach(function (el) {
      var v = countTargets.get(el);
      if (v) el.textContent = v.pre + "0" + v.post;
    });

    if (figuresIO) figuresIO.disconnect();

    figuresIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        figuresIO.disconnect();
        if (counted) return;
        counted = true;

        var list = Array.prototype.slice.call(host.querySelectorAll(".c3-figure__value"))
          .filter(function (el) { return countTargets.has(el); });
        if (list.length) countPlay(list);
      });
    }, { threshold: 0.35 });

    figuresIO.observe(host);
  }

  /* ============================================================ ETAPAS
     Cuatro etapas con número, frase y entregable. Sin tarjetas.
     ============================================================ */
  function renderPhases() {
    var host = document.getElementById("c3Phases");
    if (!host) return;

    var d = window.Practico.dict().s4 || {};
    var phases = d.phases || [];
    var label = d.deliverableLabel || "";
    window.Practico.clear(host);

    phases.forEach(function (ph, i) {
      host.appendChild(h("li", { class: "c3-phase" }, [
        h("p", { class: "c3-phase__n", "aria-hidden": "true", text: ph.n || pad2(i + 1) }),
        h("div", { class: "c3-phase__body" }, [
          h("h3", { class: "c3-phase__name", text: ph.name || "" }),
          h("p", { class: "c3-phase__text", text: ph.text || "" }),
          h("p", { class: "c3-phase__deliver" }, [
            h("span", { class: "c3-phase__label", text: label }),
            h("span", { class: "c3-phase__value", text: ph.deliverable || "" })
          ])
        ])
      ]));
    });
  }

  /* ====================================================== DIFERENCIALES
     Cuatro frases con check terracota que se dibuja al entrar en viewport.
     ====================================================== */
  function renderDiffs() {
    var host = document.getElementById("c3Diffs");
    if (!host) return;

    var d = window.Practico.dict().s4 || {};
    var diffs = d.diffs || [];
    window.Practico.clear(host);

    diffs.forEach(function (text) {
      host.appendChild(h("li", { class: "c3-diff" }, [
        checkGlyph(""),
        h("p", { class: "c3-diff__text", text: text })
      ]));
    });
  }

  /* ======================================================== COMPARATIVA
     Cinco filas. En móvil cada celda lleva su rótulo en data-label y el
     ::before de c3.css lo muestra ("Otros" / "Práctico").
     ======================================================== */
  function renderTable() {
    var body = document.getElementById("c3TableBody");
    if (!body) return;

    var d = window.Practico.dict().s5 || {};
    var rows = d.rows || [];
    var otherLabel = d.otherShort || "";
    var oursLabel = d.practicoShort || "";
    window.Practico.clear(body);

    rows.forEach(function (row) {
      body.appendChild(h("tr", {}, [
        h("td", { "data-label": otherLabel }, [
          h("span", { class: "c3-cell c3-cell--other" }, [
            h("span", { class: "c3-table__dash", "aria-hidden": "true", text: "\u2014" }),
            h("span", { text: row.other || "" })
          ])
        ]),
        h("td", { "data-label": oursLabel }, [
          h("span", { class: "c3-cell" }, [
            checkGlyph("c3-check--sm"),
            h("span", { text: row.ours || "" })
          ])
        ])
      ]));
    });
  }

  /* ================================================= CHECKS QUE SE DIBUJAN */
  var drawIO = null;

  function initDraws() {
    var paths = document.querySelectorAll(".c3-check__path:not(.is-drawn)");
    if (!paths.length) return;

    if (reduced() || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(paths, function (p) { p.classList.add("is-drawn"); });
      return;
    }

    if (!drawIO) {
      drawIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          drawIO.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
    }

    Array.prototype.forEach.call(paths, function (p, i) {
      p.style.transitionDelay = (Math.min(i, 4) * 60) + "ms";
      drawIO.observe(p);
    });
  }

  /* ============================================================ FOOTER
     Servicios (mailto con asunto propio) y Empresa (anclas internas).
     ============================================================ */
  function fillFooterList(host, items) {
    if (!host) return;
    window.Practico.clear(host);

    (items || []).forEach(function (it) {
      var a = h("a", { class: "footer__link", text: it.label || "" });
      if (it.mailto) a.setAttribute("href", window.Practico.mailtoHref(it.mailto));
      else a.setAttribute("href", it.href || "#");
      host.appendChild(h("li", {}, [a]));
    });
  }

  function renderFooter() {
    var d = window.Practico.dict().footer || {};
    fillFooterList(document.getElementById("footServices"), d.services);
    fillFooterList(document.getElementById("footCompany"), d.company);
  }

  /* ================================================== PUENTE DE REVEALS
     Los bloques de C v3 se enganchan al MISMO motor de base2/core2
     (`Practico.reveal.register`): mismo CSS (36px / 700ms), mismo stagger,
     misma política de movimiento reducido y mismo barrido.
     ================================================== */
  function revealExtras() {
    var hosts = document.querySelectorAll("[data-c3-reveal]");
    if (!hosts.length) return;

    Array.prototype.forEach.call(hosts, function (host) {
      var items = host.hasAttribute("data-c3-reveal-list")
        ? Array.prototype.slice.call(host.children)
        : [host];
      if (window.Practico && window.Practico.reveal) {
        window.Practico.reveal.register(items);
      }
    });
  }

  /* --------------------------------------------------------------- boot */
  window.Practico.onRender(function () {
    renderNumbered("c3Problems", "s2");
    renderFigures();
    renderPhases();
    renderDiffs();
    renderTable();
    renderNumbered("c3Why", "s6");
    renderFooter();
    revealExtras();
    initDraws();
  });
})();
