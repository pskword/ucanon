// 새가족부 교재 모바일 페이지 생성기
// 사용법: node build.js  (같은 폴더의 data_timothy.js, data_joshua.js 를 읽어 ../html/ 에 HTML 생성)
const fs = require('fs');
const path = require('path');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// 본문 속 (12절) / (15절, 참조 요한복음 5:39) / (참고. 신명기 11:29) 같은 괄호 참조를 강조
const fmt = s => esc(s)
  .replace(/\n/g, '<br>')
  .replace(/\((?:[^()]*?(?:절|참조|참고|창세기|시편|로마서|호세아|요한복음|고후)[^()]*)\)/g, m => `<span class="vref">${m}</span>`);

// ---------- 성경 구절 조회 (여호수아 교재) ----------
function resolveVerses(ref, verses) {
  if (!verses) return null;
  const m = ref.match(/^(\S+)\s+(\d+):([\d,\-\s]+)$/);
  if (!m) return null;
  const [, book, ch, spec] = m;
  const nums = [];
  spec.split(',').forEach(part => {
    const r = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!r) return;
    const a = +r[1], b = r[2] ? +r[2] : a;
    for (let v = a; v <= b; v++) nums.push(v);
  });
  const out = nums.map(v => ({ v, text: verses[`${book} ${ch}:${v}`] })).filter(x => x.text);
  return out.length ? { book, ch, list: out } : null;
}

function refChip(ref, verses) {
  const found = resolveVerses(ref, verses);
  if (!found) return `<span class="ref">${esc(ref)}</span>`;
  return `<details class="ref-d"><summary class="ref ref-btn">${esc(ref)}</summary><div class="verse-box">` +
    found.list.map(x => `<p><b class="vn">${x.v}</b>${esc(x.text)}</p>`).join('') +
    `</div></details>`;
}

// ---------- 블록 렌더러 ----------
function memo(key, ph = '메모를 적어 보세요', rows = 2) {
  return `<textarea class="memo" data-key="${key}" rows="${rows}" placeholder="${ph}"></textarea>`;
}

function renderBlock(b, ctx) {
  const { book, lesson, verses } = ctx;
  const key = (suffix) => `${book.id}:l${lesson.n}:${suffix}`;
  switch (b.t) {
    case 'intro':
      return `<div class="intro">${b.text.split('\n\n').map(p => `<p>${fmt(p)}</p>`).join('')}${b.by ? `<div class="by">${esc(b.by)}</div>` : ''}</div>`;
    case 'p':
      return `<p class="plain">${fmt(b.text)}</p>`;
    case 'passage':
      return `<div class="passage"><span class="lbl">본문말씀</span> ${esc(b.text)}</div>`;
    case 'phrase':
      return `<h4 class="phrase">“${esc(b.text)}”</h4>`;
    case 'q': {
      ctx.qi = (ctx.qi || 0) + 1;
      const id = b.id || `${ctx.partKey || 'q'}${ctx.qi}`;
      const num = b.n == null ? '<span class="num bullet">✦</span>' : `<span class="num">${esc(b.n)}</span>`;
      let html = `<article class="q${b.n == null ? ' q-bullet' : ''}" id="${lesson.id}-${id}">`;
      html += `<div class="q-head">${num}<div class="q-body">`;
      if (b.lead) html += `<p class="q-lead">${fmt(b.lead)}</p>`;
      html += `<p class="q-text">${fmt(b.text)}</p>`;
      if (b.refs && b.refs.length) html += `<div class="refs">${b.refs.map(r => refChip(r, verses)).join('')}</div>`;
      if (b.note) html += `<p class="q-note">${fmt(b.note)}</p>`;
      html += `</div></div>`;
      if (b.subs && b.subs.length) {
        html += `<div class="subs">` + b.subs.map((s, i) => {
          const label = typeof s === 'string' ? s : s.label;
          const isRef = typeof s !== 'string' && s.ref;
          const stext = typeof s === 'string' ? null : s.text;
          return `<div class="sub">` +
            (label ? `<div class="sub-label">${isRef ? refChip(label, verses) : `<span class="sub-mark">✦</span>${fmt(label)}`}</div>` : '') +
            (stext ? `<p class="sub-text">${fmt(stext)}</p>` : '') +
            memo(key(`${id}-s${i + 1}`), '답을 적어 보세요', 1) + `</div>`;
        }).join('') + `</div>`;
      } else if (b.lines && b.lines.length) {
        html += `<div class="subs">` + b.lines.map((l, i) =>
          `<div class="sub"><p class="sub-text">${fmt(l)}</p>${memo(key(`${id}-s${i + 1}`), '답을 적어 보세요', 1)}</div>`).join('') + `</div>`;
      } else if (b.labels && b.labels.length) {
        html += `<div class="subs row">` + b.labels.map((l, i) =>
          `<div class="sub"><div class="sub-label"><span class="sub-mark">✦</span>${esc(l)}</div>${memo(key(`${id}-s${i + 1}`), '', 1)}</div>`).join('') + `</div>`;
      } else if (!b.nomemo) {
        html += memo(key(id));
      }
      if (b.check) {
        html += `<div class="check-list">` + b.check.map((c, i) =>
          `<label class="chk"><input type="checkbox" data-key="${key(`${id}-c${i + 1}`)}"><span>${esc(c)}</span></label>`).join('') + `</div>`;
      }
      if (b.after) html += `<p class="q-after">${fmt(b.after)}</p>`;
      html += `</article>`;
      return html;
    }
    case 'box': {
      const kind = b.kind || 'info';
      const title = b.title != null ? b.title : ({ 묵상: '묵상', 나눔: '나눔', info: '' }[kind] || '');
      const bid = b.id || `box${ctx.bi = (ctx.bi || 0) + 1}`;
      let html = `<aside class="box box-${kind}">`;
      if (title) html += `<div class="box-title">${esc(title)}</div>`;
      if (b.text) html += b.text.split('\n\n').map(p => `<p>${fmt(p)}</p>`).join('');
      if (b.items) html += `<ul class="box-items">${b.items.map(i => `<li>${fmt(i)}</li>`).join('')}</ul>`;
      if (b.subs) html += `<div class="subs">` + b.subs.map((s, i) =>
        `<div class="sub"><div class="sub-label"><span class="sub-mark">✦</span>${esc(s)}</div>${memo(key(`${bid}-s${i + 1}`), '답을 적어 보세요', 1)}</div>`).join('') + `</div>`;
      if (b.qs) html += `<div class="box-qs">` + b.qs.map((q, i) =>
        `<div class="sub"><p class="sub-text">${fmt(q)}</p>${memo(key(`${bid}-q${i + 1}`), '생각을 적어 보세요', 1)}</div>`).join('') + `</div>`;
      if (b.by) html += `<div class="by">${esc(b.by)}</div>`;
      html += `</aside>`;
      return html;
    }
    case 'quote':
      return `<blockquote class="quote">${b.text.split('\n\n').map(p => `<p>${fmt(p)}</p>`).join('')}${b.by ? `<cite>${esc(b.by)}</cite>` : ''}</blockquote>`;
    case 'verse':
      return `<blockquote class="verse"><p>${fmt(b.text)}</p><cite>${esc(b.ref)}</cite></blockquote>`;
    case 'memory': {
      const found = resolveVerses(b.ref, verses);
      return `<div class="memory"><div class="memory-lbl">${esc(b.label || '암송 구절')}</div><div class="memory-ref">${esc(b.ref)}</div>` +
        (found ? found.list.map(x => `<p class="memory-text"><b class="vn">${x.v}</b>${esc(x.text)}</p>`).join('') : '') +
        (b.text ? `<p class="plain">${fmt(b.text)}</p>` : '') + `</div>`;
    }
    case 'review':
      return `<div class="review"><p class="plain">${fmt(b.text)}</p><div class="check-list">` +
        b.items.map((r, i) => `<label class="chk"><input type="checkbox" data-key="${key(`review-${i + 1}`)}"><span>${esc(r)}</span></label>`).join('') + `</div></div>`;
    case 'write':
      return `<div class="write"><div class="write-head"><span class="lbl">외워 쓰기</span> ${esc(b.ref)}</div>${memo(key('write'), `${b.ref} 말씀을 외워서 적어 보세요`, b.rows || 4)}</div>`;
    default:
      return '';
  }
}

const PART_SUB = { 생각나눔: '자신의 생각을 함께 나누어 주세요', 말씀감동: '하나님의 말씀을 들어보세요', 적용: '', 은혜공감: '그 은혜는 넓고 깊은 바다와 같습니다' };
const PART_KIND = { 생각나눔: 'share', 말씀감동: 'word', 적용: 'apply', 은혜공감: 'grace', 묵상: 'meditate', 질문: 'word', 암송: 'memory' };
const PART_KEY = { 생각나눔: 'share', 말씀감동: 'word', 적용: 'apply', 은혜공감: 'grace', 묵상: 'med', 질문: 'q', 암송: 'mem' };

function renderLesson(book, lesson, idx, all) {
  const ctx = { book, lesson, verses: book.verses, qi: 0, bi: 0 };
  let html = `<section class="lesson" id="${lesson.id}" data-n="${lesson.n}">`;
  html += `<header class="lesson-hero"><div class="hero-kicker">${esc(book.kicker)}</div><div class="hero-row"><span class="hero-n">${esc(lesson.badge || lesson.n + '과')}</span><h2>${esc(lesson.title)}</h2></div>` +
    (lesson.passage ? `<div class="hero-passage"><span class="lbl">본문</span> ${esc(lesson.passage)}</div>` : '') + `</header>`;
  let open = false;
  for (const b of lesson.blocks) {
    if (b.t === 'part') {
      if (open) html += `</section>`;
      const sub = b.sub != null ? b.sub : (PART_SUB[b.name] || '');
      const kind = b.kind || PART_KIND[b.name] || 'info';
      html += `<section class="part part-${kind}"><h3 class="part-title"><span class="part-name">${esc(b.name)}</span>${sub ? `<span class="part-sub">${esc(sub)}</span>` : ''}${b.ref ? `<span class="part-ref">${esc(b.ref)}</span>` : ''}</h3>`;
      open = true;
      ctx.qi = 0;
      ctx.partKey = b.key || PART_KEY[b.name] || 'q';
      continue;
    }
    html += renderBlock(b, ctx);
  }
  if (open) html += `</section>`;
  const prev = all[idx - 1], next = all[idx + 1];
  html += `<nav class="pager">` +
    (prev ? `<a class="pg prev" href="#${prev.id}"><small>이전</small>${esc(prev.n + '과 ' + prev.title)}</a>` : `<span class="pg empty"></span>`) +
    (next ? `<a class="pg next" href="#${next.id}"><small>다음</small>${esc(next.n + '과 ' + next.title)}</a>` : `<span class="pg empty"></span>`) +
    `</nav><div class="lesson-tools">` +
    `<label class="sender"><span>보내는 사람</span><input type="text" class="sender-name" placeholder="이름 (선택)" autocomplete="name"></label>` +
    `<div class="tool-btns">` +
    `<button type="button" class="send-btn send-one" data-lesson="${lesson.id}">📤 이 과의 메모 저장 및 전송</button>` +
    `<button type="button" class="send-btn send-all">📚 모든 과의 메모 저장 및 전송</button>` +
    `<button type="button" class="clear-btn" data-lesson="${lesson.id}">🗑 이 과의 내 메모 지우기</button>` +
    `</div><p class="tools-hint">전송을 누르면 메모가 담긴 교재 HTML 파일이 만들어지고 공유 창이 열립니다. 카카오톡을 선택해 보낼 대화방을 고르세요.</p></div>`;
  html += `</section>`;
  return html;
}

function renderBook(book) {
  const lessons = book.lessons.map(l => ({ ...l, id: `l${l.n}` }));
  const tabs = lessons.map(l => `<a class="tab" href="#${l.id}" data-target="${l.id}"><b>${esc(l.n)}과</b><span>${esc(l.short)}</span></a>`).join('');
  const body = lessons.map((l, i) => renderLesson(book, l, i, lessons)).join('\n');
  const icon = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='${book.accent}'/><text x='32' y='43' font-size='30' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>${book.iconText}</text></svg>`;
  return `<!doctype html>
<html lang="ko" data-book="${book.id}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="${book.accent}">
<meta name="color-scheme" content="light dark">
<title>${esc(book.title)} · ${esc(book.subtitle)}</title>
<meta name="description" content="${esc(book.description)}">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}">
<style>
${css(book)}
</style>
</head>
<body>
<header class="top">
  <div class="top-inner">
    <div class="top-row">
      <div class="brand"><span class="brand-kicker">${esc(book.brand)}</span><span class="brand-title">${esc(book.title)}</span></div>
      <div class="top-tools">
        <button type="button" class="font-btn" id="fontBtn" aria-label="글자 크기 조절" title="글자 크기">가<small>A</small></button>
        ${book.otherHref ? `<a class="other" href="${book.otherHref}">${esc(book.otherLabel)}</a>` : ''}
      </div>
    </div>
    <nav class="tabs" id="tabs">${tabs}</nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <p>${esc(book.footer)}</p>
  <p class="foot-note">메모와 체크 표시는 이 기기의 브라우저에만 저장됩니다.</p>
</footer>
<script>
${js()}
</script>
</body>
</html>`;
}

function css(book) {
  return fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8')
    .replace(/__ACCENT__/g, book.accent)
    .replace(/__ACCENT_SOFT__/g, book.accentSoft)
    .replace(/__ACCENT_SOFT_DARK__/g, book.accentSoftDark);
}

function js() {
  return fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
}

// ---------- 실행 ----------
// 출력 폴더: 인자로 주면 그 폴더, 없으면 ../html (GitHub Pages 저장소에서는 node src/build.js docs)
const outDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(__dirname, '..', 'html');
fs.mkdirSync(outDir, { recursive: true });
for (const name of ['data_timothy.js', 'data_joshua.js']) {
  const book = require(path.join(__dirname, name));
  const html = renderBook(book);
  const out = path.join(outDir, book.file);
  fs.writeFileSync(out, html, 'utf8');
  console.log('wrote', out, (html.length / 1024).toFixed(1) + 'KB');
}
