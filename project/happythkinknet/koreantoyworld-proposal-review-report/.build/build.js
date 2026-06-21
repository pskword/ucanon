// 빌드 스크립트: 디렉터리의 모든 자료를 단일 자체완결형 index.html 로 변환
const fs = require('fs');
const path = require('path');
const { marked } = require('./marked.min.js');

const ROOT = path.resolve(__dirname, '..');

marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });

// ---- 문서 정의 (표시 순서대로) ----
const GROUPS = [
  {
    id: 'proposal',
    label: '원본 제안서',
    icon: '📄',
    docs: [
      { file: 'happythinknet-proposal-summary.md', title: '제안서 정리', sub: '해피씽크넷 글로벌 사업 후원 제안서', type: 'md' },
      { file: 'happythinknet-proposal.pdf', title: '제안서 원본 (PDF)', sub: '1.4 MB · 원본 슬라이드', type: 'pdf' },
      { file: 'proposal.txt', title: '제안서 추출 텍스트', sub: 'pdftotext 추출 (참고)', type: 'txt' },
    ],
  },
  {
    id: 'analysis',
    label: '분석 · 평가',
    icon: '🔬',
    docs: [
      { file: '제안서-분석-보고서.md', title: '제안서 분석 보고서', sub: '멀티에이전트(A1~A8) 통합 분석 · 핵심 산출물', type: 'md', star: true },
      { file: '제안서-분석-프롬프트.md', title: '분석 프롬프트', sub: '그로스 디렉터 관점 분석 설계', type: 'md' },
      { file: '에이전트-K토이-그로스-디렉터.md', title: 'K-Toy 그로스 디렉터', sub: '에이전트 역할 정의', type: 'md' },
    ],
  },
  {
    id: 'execution',
    label: '실행 · 영업',
    icon: '🚀',
    docs: [
      { file: '90일-실행안.md', title: '90일 실행안', sub: 'De-risking Sprint · 검증 스프린트', type: 'md' },
      { file: '광고주-LOI-영업자료-템플릿.md', title: '광고주 LOI · 영업 키트', sub: 'Founding Advertiser Program', type: 'md' },
    ],
  },
  {
    id: 'office',
    label: '산출 문서',
    icon: '📑',
    docs: [
      { file: 'KoreanToyWorld_제안서평가보고서.docx', title: '제안서 평가 보고서', sub: 'Word 문서 (.docx)', type: 'office' },
      { file: 'KoreanToyWorld_임원브리핑.pptx', title: '임원 브리핑', sub: 'PowerPoint (.pptx)', type: 'office' },
    ],
  },
  {
    id: 'meta',
    label: '작업 기록',
    icon: '🗂️',
    docs: [
      { file: '진행-내역.md', title: '작업 진행 내역', sub: 'Handoff Note', type: 'md' },
      { file: '세션-권한-승인-내역.md', title: '세션 권한 승인 내역', sub: 'Permission Grants', type: 'md' },
    ],
  },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fileSize(p) {
  try { return fs.statSync(p).size; } catch { return 0; }
}
function humanSize(n) {
  if (n > 1024 * 1024) return (n / 1024 / 1024).toFixed(1) + ' MB';
  if (n > 1024) return (n / 1024).toFixed(0) + ' KB';
  return n + ' B';
}

let slugCount = 0;
function docId(file) { return 'doc-' + (++slugCount) + '-' + file.replace(/[^a-zA-Z0-9]/g, ''); }

// 각 문서 콘텐츠 HTML 생성
function renderDoc(doc, id) {
  const abs = path.join(ROOT, doc.file);
  if (doc.type === 'md') {
    const raw = fs.readFileSync(abs, 'utf8');
    // YAML frontmatter 제거 후 표로 표시
    let body = raw;
    let fmHtml = '';
    const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (fm) {
      body = raw.slice(fm[0].length);
    }
    return `<div class="md-body">${marked.parse(body)}</div>`;
  }
  if (doc.type === 'txt') {
    const raw = fs.readFileSync(abs, 'utf8');
    return `<div class="banner banner-info">📃 PDF에서 추출한 원시 텍스트입니다. 한글 일부는 폰트 인코딩 문제로 누락될 수 있습니다.</div>
      <pre class="txt-view">${esc(raw)}</pre>`;
  }
  if (doc.type === 'pdf') {
    const size = humanSize(fileSize(abs));
    return `<div class="banner banner-info">아래에 PDF가 표시되지 않으면 <a href="${encodeURI(doc.file)}" target="_blank" rel="noopener">새 탭에서 열기</a> 또는 <a href="${encodeURI(doc.file)}" download>다운로드</a>를 이용하세요.</div>
      <div class="pdf-wrap"><iframe class="pdf-frame" src="${encodeURI(doc.file)}#view=FitH" title="${esc(doc.title)}"></iframe></div>
      <p class="muted">파일: <code>${esc(doc.file)}</code> · ${size}</p>`;
  }
  // office
  const size = humanSize(fileSize(abs));
  const isDoc = doc.file.endsWith('.docx');
  return `<div class="office-card">
      <div class="office-ico">${isDoc ? '📝' : '📊'}</div>
      <div class="office-meta">
        <h3>${esc(doc.title)}</h3>
        <p class="muted">${esc(doc.file)} · ${size}</p>
        <p>이 문서는 브라우저에서 직접 렌더링되지 않습니다. 아래 버튼으로 열거나 내려받으세요.</p>
        <div class="office-actions">
          <a class="btn btn-primary" href="${encodeURI(doc.file)}" download>⬇ 다운로드</a>
          <a class="btn" href="${encodeURI(doc.file)}" target="_blank" rel="noopener">↗ 연결 앱으로 열기</a>
        </div>
      </div>
    </div>`;
}

// 사이드바 + 섹션 조립
let navHtml = '';
let sectionsHtml = '';
let firstId = null;
const typeBadge = { md: 'MD', pdf: 'PDF', txt: 'TXT', office: 'DOC', };

for (const g of GROUPS) {
  navHtml += `<div class="nav-group"><div class="nav-group-label">${g.icon} ${esc(g.label)}</div><ul>`;
  for (const doc of g.docs) {
    const id = docId(doc.file);
    doc._id = id;
    if (!firstId) firstId = id;
    const star = doc.star ? '<span class="star" title="핵심 문서">★</span>' : '';
    navHtml += `<li><a href="#${id}" data-id="${id}" class="nav-item">
        <span class="nav-title">${esc(doc.title)}${star}</span>
        <span class="nav-sub">${esc(doc.sub)}</span>
      </a></li>`;
    sectionsHtml += `<section id="${id}" class="doc" data-title="${esc(doc.title)}" data-search="${esc((doc.title + ' ' + doc.sub).toLowerCase())}">
        <div class="doc-head">
          <span class="badge badge-${doc.type}">${typeBadge[doc.type] || 'FILE'}</span>
          <div>
            <h1 class="doc-title">${esc(doc.title)}</h1>
            <p class="doc-sub">${esc(doc.sub)} · <code>${esc(doc.file)}</code></p>
          </div>
        </div>
        ${renderDoc(doc, id)}
      </section>`;
  }
  navHtml += `</ul></div>`;
}

const CSS = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const JS = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>KoreanToyWorld 제안서 검토 리포트</title>
<style>${CSS}</style>
</head>
<body>
<button id="menuToggle" class="menu-toggle" aria-label="메뉴">☰</button>
<div class="app">
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <div class="brand-logo">🧸</div>
      <div>
        <div class="brand-title">KoreanToyWorld</div>
        <div class="brand-sub">제안서 검토 리포트</div>
      </div>
    </div>
    <div class="search-box">
      <input type="text" id="search" placeholder="문서 검색…" autocomplete="off">
    </div>
    <nav class="nav">${navHtml}</nav>
    <div class="sidebar-foot">생성일 2026-06-22 · 자료 ${GROUPS.reduce((a, g) => a + g.docs.length, 0)}건</div>
  </aside>
  <main class="main" id="main">
    <div class="content">${sectionsHtml}</div>
    <footer class="page-foot">HappyThinkNet · KoreanToyWorld.com 제안서 분석 자료 모음 — 단일 페이지 뷰어</footer>
  </main>
</div>
<div class="backdrop" id="backdrop"></div>
<script>const FIRST_ID=${JSON.stringify(firstId)};</script>
<script>${JS}</script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('index.html 생성 완료:', Buffer.byteLength(html), 'bytes,', slugCount, 'docs');
