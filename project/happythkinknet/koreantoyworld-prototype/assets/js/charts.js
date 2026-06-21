/* ===========================================================================
   KoreanToyWorld — Hand-rolled SVG charts (no external dependency).
   Global: window.KTWChart  (Phase 1 contract)
   =========================================================================== */
(function () {
  const ns = "http://www.w3.org/2000/svg";
  const min = Math.min, max = Math.max;

  // Tiny inline sparkline for ranking rows
  function sparkline(values, color, w, h) {
    w = w || 90; h = h || 28; color = color || "#3D5AFE";
    const lo = min.apply(null, values), hi = max.apply(null, values);
    const rng = hi - lo || 1;
    const step = w / (values.length - 1);
    const pts = values.map((v, i) => [i * step, h - ((v - lo) / rng) * (h - 4) - 2]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const up = values[values.length - 1] >= values[0];
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
      <path d="${d}" fill="none" stroke="${up ? '#18B26B' : '#FF4757'}" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }

  // Multi-line chart with axis labels
  function lineChart(series, labels, opts) {
    opts = opts || {};
    const w = opts.w || 560, h = opts.h || 260, pad = 34;
    const all = series.flatMap(s => s.values);
    const hi = max.apply(null, all) * 1.1, lo = 0;
    const iw = w - pad * 2, ih = h - pad * 2;
    const stepX = iw / (labels.length - 1);
    const y = v => pad + ih - ((v - lo) / (hi - lo)) * ih;
    let grid = "";
    for (let g = 0; g <= 4; g++) {
      const gy = pad + (ih / 4) * g;
      grid += `<line x1="${pad}" y1="${gy}" x2="${w - pad}" y2="${gy}" stroke="#ECEEF3"/>`;
    }
    const xlabels = labels.map((l, i) =>
      `<text x="${pad + i * stepX}" y="${h - 8}" font-size="11" fill="#5A5C72" text-anchor="middle">${l}</text>`).join("");
    const paths = series.map(s => {
      const d = s.values.map((v, i) => (i ? "L" : "M") + (pad + i * stepX).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
      const dots = s.values.map((v, i) => `<circle cx="${pad + i * stepX}" cy="${y(v)}" r="3" fill="${s.color}"/>`).join("");
      return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}`;
    }).join("");
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" role="img">
      ${grid}${paths}${xlabels}</svg>`;
  }

  function barChart(values, labels, color, opts) {
    opts = opts || {}; color = color || "#3D5AFE";
    const w = opts.w || 560, h = opts.h || 220, pad = 30;
    const hi = max.apply(null, values) * 1.15;
    const iw = w - pad * 2, ih = h - pad * 2;
    const bw = iw / values.length * 0.6, gap = iw / values.length;
    const bars = values.map((v, i) => {
      const bh = (v / hi) * ih, x = pad + i * gap + (gap - bw) / 2, yv = pad + ih - bh;
      const lbl = labels && labels[i] ? `<text x="${x + bw / 2}" y="${h - 8}" font-size="11" fill="#5A5C72" text-anchor="middle">${labels[i]}</text>` : "";
      return `<rect x="${x}" y="${yv}" width="${bw}" height="${bh}" rx="6" fill="${color}"/>${lbl}`;
    }).join("");
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img">${bars}</svg>`;
  }

  function donut(segments, opts) {
    opts = opts || {}; const size = opts.size || 200, r = size / 2 - 6, cx = size / 2, cy = size / 2, sw = 26;
    const total = segments.reduce((a, s) => a + s.value, 0);
    let acc = 0; const C = 2 * Math.PI * r;
    const arcs = segments.map(s => {
      const frac = s.value / total, len = frac * C;
      const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}"
        stroke-width="${sw}" stroke-dasharray="${len} ${C - len}"
        stroke-dashoffset="${-acc}" transform="rotate(-90 ${cx} ${cy})"/>`;
      acc += len; return el;
    }).join("");
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">${arcs}
      <text x="${cx}" y="${cy - 2}" font-size="22" font-weight="800" text-anchor="middle" fill="#1A1B2E" font-family="Poppins,sans-serif">${total}%</text>
      <text x="${cx}" y="${cy + 16}" font-size="10" text-anchor="middle" fill="#5A5C72">share</text></svg>`;
  }

  function funnel(stages) {
    const top = stages[0].value;
    return stages.map(s => {
      const pct = Math.round((s.value / top) * 100);
      return `<div class="funnel-row" style="margin-bottom:10px">
        <div class="row spread" style="margin-bottom:4px"><span>${s.stage}</span>
        <b class="num">${s.value.toLocaleString()}</b></div>
        <div style="height:14px;background:var(--ktw-surface-2);border-radius:999px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:var(--ktw-grad);border-radius:999px"></div></div></div>`;
    }).join("");
  }

  window.KTWChart = { sparkline, lineChart, barChart, donut, funnel };
})();
