/* ===========================================================================
   KoreanToyWorld — Shared UI components & helpers. Global: window.KTW
   (Phase 1 contract — pages CONSUME these, do not redefine.)
   Usage in a page:
     <div id="ktw-header"></div> ... <div id="ktw-footer"></div>
     <script src="assets/js/data.js"></script>
     <script src="assets/js/charts.js"></script>
     <script src="assets/js/components.js"></script>
     <script>KTW.mountChrome('rankings');</script>
   =========================================================================== */
(function () {
  const D = window.KTW_DATA;

  const NAV = [
    { id: "home",      label: "Discover",   href: "index.html" },
    { id: "rankings",  label: "Rankings",   href: "rankings.html" },
    { id: "characters",label: "Characters", href: "characters.html" },
    { id: "brands",    label: "Brands",     href: "brands.html" },
    { id: "trends",    label: "Trends · Data", href: "trends.html" },
    { id: "news",      label: "News",       href: "news.html" }
  ];

  // ---- helpers ----
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = (n) => "$" + Number(n).toFixed(2);
  const save = (was, now) => Math.round((1 - now / was) * 100);
  const stars = (n) => "★★★★★☆☆☆☆☆".slice(5 - Math.round(n), 10 - Math.round(n));
  const charColor = (slug) => (D.charBySlug[slug] || {}).color || "#3D5AFE";
  const charName = (slug) => (D.charBySlug[slug] || {}).name || slug;
  const brandName = (slug) => (D.brandBySlug[slug] || {}).name || slug;

  // External shop link with UTM (closed-loop attribution stub) — ref §5.4
  function shopUrl(sku, campaign) {
    return "https://koreantoyshop.com/product/" + (sku || "") +
      "?utm_source=koreantoyworld&utm_medium=referral&utm_campaign=" + (campaign || "ktw_prototype");
  }

  // Placeholder image block (no copyrighted art) — colored, labelled
  function ph(label, color, sub, h) {
    return `<div class="ph" style="background:${color || '#3D5AFE'};${h ? 'height:' + h + ';' : 'aspect-ratio:1/1;'}">
      <div>${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ""}</div></div>`;
  }

  // ---- Product card ----
  function productCard(p, opts) {
    opts = opts || {};
    const col = charColor(p.character);
    const ribbon = p.new ? `<span class="ribbon badge badge-pink">NEW</span>` : "";
    return `<article class="card pcard">
      <div class="thumb">${ph(charName(p.character), col, p.id)}${ribbon}</div>
      <div class="body">
        <div class="brand">${esc(brandName(p.brand))}</div>
        <div class="name">${esc(p.name)}</div>
        <div class="price">
          <span class="now num">${money(p.now)}</span>
          <span class="was num">${money(p.was)}</span>
          <span class="save">-${save(p.was, p.now)}%</span>
        </div>
        <div class="row" style="margin-top:8px;font-size:.78rem;color:var(--ktw-ink-soft)">
          <span class="stars">${stars(p.rating)}</span><span class="num">${p.rating} (${p.reviews})</span>
        </div>
        <a class="btn btn-ghost btn-sm btn-block" style="margin-top:12px"
           href="item.html?sku=${p.id}">View ↗</a>
      </div></article>`;
  }

  // ---- Character card ----
  function characterCard(c) {
    return `<a class="ccard" href="character.html?slug=${c.slug}"
      style="background:linear-gradient(160deg,${c.color},${c.color}cc)">
      <div><div class="meta">${esc(brandName(c.brand))}</div><h3>${esc(c.name)}</h3></div></a>`;
  }

  // ---- Brand card ----
  function brandCard(b) {
    return `<a class="card bcard" href="brand.html?slug=${b.slug}">
      <div class="logo" style="background:${b.color}">${esc(b.name[0])}</div>
      <h3 style="margin:.2em 0">${esc(b.name)}</h3>
      <div class="muted" style="font-size:.82rem">since ${b.founded}</div></a>`;
  }

  // ---- Ranking row ----
  function rankRow(r) {
    const d = r.delta, cls = d > 0 ? "delta-up" : d < 0 ? "delta-down" : "delta-same";
    const arrow = d > 0 ? "▲" + d : d < 0 ? "▼" + Math.abs(d) : "–";
    return `<tr>
      <td><span class="rank-no">${r.rank}</span></td>
      <td><span class="${cls}">${arrow}</span></td>
      <td style="width:54px">${ph(charName(r.character).split(" ")[0], charColor(r.character), "", "44px")}</td>
      <td><b>${esc(r.name)}</b><div class="muted" style="font-size:.75rem">${esc(brandName(r.brand))} · ${r.sku}</div></td>
      <td class="num">${money(r.now)}</td>
      <td>${KTWChart.sparkline(r.spark, charColor(r.character))}</td>
      <td><a class="btn btn-ghost btn-sm" href="item.html?sku=${r.sku}">View</a></td>
    </tr>`;
  }

  // ---- Trust strip ----
  function trustStrip() {
    const items = ["100% Authentic K-Toys", "KC Certified Brands", "Ships from Seoul", "Real Collector Reviews"];
    return `<div class="trust-strip">${items.map(t => `<span class="badge dot">${t}</span>`).join("")}
      <span class="badge" style="background:rgba(255,77,141,.12);color:var(--ktw-primary-ink)">Part of KoreanToyShop · since 2011</span></div>`;
  }

  // ---- Header / Footer ----
  function header(active) {
    const links = NAV.map(n => `<a href="${n.href}" class="${n.id === active ? "is-active" : ""}">${n.label}</a>`).join("");
    return `<header class="site-header"><div class="container bar">
      <a class="logo" href="index.html">Korean<span class="w">Toy</span>World
        <span class="small">part of koreantoyshop</span></a>
      <nav class="main-nav" id="mainNav">${links}</nav>
      <div class="header-tools">
        <button class="icon-btn hide-sm" title="Search" onclick="KTW.toast('Search is stubbed in the prototype')">🔍</button>
        <button class="icon-btn hide-sm" title="Language" onclick="KTW.toast('EN / KO toggle — UI only in prototype')">🌐</button>
        <a class="btn btn-grad btn-sm hide-sm" href="trends.html">🔔 Subscribe</a>
        <a class="btn btn-primary btn-sm" href="advertise.html">Advertise</a>
        <button class="icon-btn nav-toggle" title="Menu" onclick="document.getElementById('mainNav').classList.toggle('open')">☰</button>
      </div></div></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container">
      <div class="cols">
        <div>
          <a class="logo" href="index.html" style="color:#fff">Korean<span class="w">Toy</span>World</a>
          <p style="margin-top:12px;font-size:.88rem;max-width:280px">A K-Toy media & data platform. Discover, rank and trend Korean character toys — and buy them at KoreanToyShop.com.</p>
          <div class="pay-badges"><span>PayPal</span><span>Klarna</span><span>Afterpay</span></div>
        </div>
        <div><h4>Explore</h4><ul>
          <li><a href="rankings.html">Weekly Rankings</a></li>
          <li><a href="characters.html">Characters</a></li>
          <li><a href="brands.html">Brands</a></li>
          <li><a href="news.html">News</a></li></ul></div>
        <div><h4>For Brands</h4><ul>
          <li><a href="advertise.html">Advertise</a></li>
          <li><a href="trends.html">Trend Intelligence</a></li>
          <li><a href="dashboard.html">Advertiser Dashboard</a></li></ul></div>
        <div><h4>Contact</h4><ul>
          <li>2F, 32-3, Jinheung-ro 1-gil,</li><li>Eunpyeong-gu, Seoul 03405, Korea</li>
          <li>+82-10-7378-7115</li>
          <li><a href="#" onclick="KTW.toast('Stubbed');return false">Facebook · Instagram · YouTube</a></li></ul></div>
      </div>
      <div class="foot-bottom"><span>© 2026 KoreanToyWorld — Part of KoreanToyShop.com (since 2011). Prototype.</span>
      <span>USD · English · Ships from Seoul 🇰🇷</span></div>
    </div></footer>`;
  }

  function mountChrome(active) {
    const h = document.getElementById("ktw-header"); if (h) h.innerHTML = header(active);
    const f = document.getElementById("ktw-footer"); if (f) f.innerHTML = footer();
  }

  // ---- Toast (stub feedback) ----
  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  // query string helper
  function qs(key) { return new URLSearchParams(location.search).get(key); }

  window.KTW = {
    NAV, esc, money, save, stars, charColor, charName, brandName, shopUrl, ph,
    productCard, characterCard, brandCard, rankRow, trustStrip,
    header, footer, mountChrome, toast, qs
  };
})();
