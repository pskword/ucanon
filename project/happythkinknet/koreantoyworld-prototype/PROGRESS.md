# KoreanToyWorld 프로토타입 — 진행내역 (세션 핸드오프)

> **최종 업데이트** 2026-06-22
> **목적** 다음 세션에서 이 문서만 읽고 작업을 즉시 이어갈 수 있도록 현재 상태·구조·계약·다음 할 일을 기록.
> **작업 디렉터리** `C:\Github_Personal\ucanon-ai\workspace\happythkinknet\koreantoyworld-prototype1`

---

## 1. 한 줄 요약

koreantoyshop.com 분석 + KoreanToyWorld 제안서-분석-보고서를 근거로, **K-Toy 미디어/데이터 플랫폼 프로토타입**을 순수 HTML/CSS/Vanilla JS로 구축 완료(11페이지). 빌드·서버 없이 `index.html` 더블클릭 실행. 헤드리스 JS 스모크 테스트 통과.

---

## 2. 지금까지 한 일 (완료)

### 2-1. 문서
- `koreantoyworld-prototype-prompt.md` — 개발 프롬프트/사양서. (1차 작성 → 2차로 **§6 체계적 개발계획 + §7 멀티에이전트 실행전략** 보완. 섹션 번호: 6 개발계획 / 7 멀티에이전트 / 8 산출물 / 9 가드레일 / 10 TL;DR)
- `README.md` — 실행법·페이지목록·구조·전략 매핑.
- `PROGRESS.md` — (이 문서)

### 2-2. 프로토타입 빌드 (프롬프트의 멀티에이전트 계획대로 실행)
- **Phase 0/1 (직렬, 직접 수행)**: 공통 기반 = 디자인 토큰·공용 CSS·mock 데이터·SVG 차트·공용 컴포넌트 API + 레퍼런스 Home(index.html).
- **Phase 2 (병렬, 에이전트 6개 동시)**: 나머지 10개 페이지. 각 에이전트가 자기 파일만 소유 → 충돌 0.
- **Phase 3/4 (직렬, 직접 수행)**: 링크·스크립트 배선 검증, 헤드리스 스모크 테스트, README.

### 2-3. 검증 결과 (모두 통과)
- 11개 페이지 전부 foundation 3종 스크립트 + CSS + 헤더/푸터 placeholder 올바르게 연결.
- 내부 `.html` 링크 11개 전부 실제 파일로 resolve(끊긴 링크 0).
- **Node 헤드리스 스모크 테스트**: 페이지별 fresh 컨텍스트로 foundation+인라인스크립트 실행 → **런타임 에러 0**.
- 페이지당 인라인 `<script>` 1개 + src 3개, `const` 충돌 없음.
- ⚠️ **시각(브라우저) 검증은 미완료** — Claude-in-Chrome 확장 미연결로 자동 스크린샷/클릭 검증 못 함. `Start-Process index.html`로 기본 브라우저에 띄우기만 함. **다음 세션 첫 할 일 후보: 각 페이지 육안/스크린샷 검증.**

---

## 3. 현재 파일 구조

```
koreantoyworld-prototype1/
├─ index.html              P1 Discover/Home  (레퍼런스 패턴, 직접 작성)
├─ rankings.html           P2 Rankings
├─ characters.html         P3 캐릭터 리스트
├─ character.html          P3 캐릭터 상세 (?slug=)
├─ brands.html             P4 브랜드 리스트
├─ brand.html              P4 브랜드 상세 (?slug=)
├─ trends.html             P5 Trend Intelligence  ★주력 (데이터 구독)
├─ news.html               P6 News/Exhibition
├─ item.html               P7 상품 상세 (?sku=) + JSON-LD
├─ advertise.html          P8 광고 상품 안내
├─ dashboard.html          P9 광고주 대시보드  ★핵심 차별점 (closed-loop)
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css        디자인 토큰(색·radius·shadow·폰트·layout 변수)
│  │  └─ styles.css        base + 전 컴포넌트 클래스
│  └─ js/
│     ├─ data.js           window.KTW_DATA (모든 mock 데이터)
│     ├─ charts.js         window.KTWChart (직접 그린 SVG 차트)
│     └─ components.js      window.KTW (공용 UI API)
├─ koreantoyworld-prototype-prompt.md
├─ README.md
└─ PROGRESS.md  (이 문서)
```

---

## 4. 아키텍처 계약 (수정 시 반드시 지킬 것)

> 페이지들은 아래 공용 API를 **읽기 전용으로 소비**한다. 시그니처를 바꾸면 11개 페이지가 깨지므로, 변경 시 전 페이지 동반 수정 필요.

### `window.KTW` (components.js)
- `mountChrome(activeNavId)` — `#ktw-header`/`#ktw-footer`에 헤더·푸터 주입. activeNavId: `home|rankings|characters|brands|trends|news` 또는 `''`.
- `productCard(p)`, `characterCard(c)`, `brandCard(b)`, `rankRow(r)`, `trustStrip()`
- `ph(label,color,sub,height)` — 저작권-free 컬러 플레이스홀더 블록(이미지 대체)
- `shopUrl(sku,campaign)` — koreantoyshop.com UTM 송출 링크
- `money(n)`, `save(was,now)`, `stars(n)`, `charColor(slug)`, `charName(slug)`, `brandName(slug)`, `esc(s)`, `qs(key)`(URL 쿼리), `toast(msg)`
- 네비 정의: `NAV` 배열.

### `window.KTWChart` (charts.js) — 외부 라이브러리 의존성 0, 전부 SVG 문자열 반환
- `sparkline(values,color,w,h)`
- `lineChart(series,labels,{w,h})` — series=`[{label,color,values[]}]`
- `barChart(values,labels,color,{w,h})`
- `donut(segments,{size})` — segments=`[{label,value,color}]`
- `funnel(stages)` — stages=`[{stage,value}]` (HTML 막대 반환)

### `window.KTW_DATA` (data.js)
- `characters[12]` `{slug,name,ko,color,brand,tagline,series[]}`
- `brands[7]` `{slug,name,color,founded,ips[],desc}`
- `products[25]` `{id(KTW-####),name,character,brand,msrp,now,was,age,battery,kc,condition,rating,reviews,new?}`
- `rankings[50]` `{rank,delta,sku,name,brand,character,now,msrp,spark[8]}`
- `trends` `{months[6],series[],rising[],share[],plans[]}`
- `news[6]`, `adProducts[8]`, `dashboard{kpis,daily,revenue,funnel,campaigns}`, `reviews[3]`
- 룩업: `charBySlug`, `brandBySlug`

### 디자인 토큰 (tokens.css)
- 색: primary `#FF4D8D`(핑크) / secondary `#3D5AFE`(코발트) / accent `#FFC400`(옐로) / mint `#00C8B4` / gold·silver·bronze
- radius: card 20px / img 16px / pill / sm 10px. shadow: soft·hover·sm. 폰트: Poppins(head)·Inter(body). maxw 1200.

### 페이지 표준 골격 (새 페이지 추가 시 복제)
```html
<head> ... fonts + tokens.css + styles.css ... </head>
<body>
  <div id="ktw-header"></div>
  <main> ... </main>
  <div id="ktw-footer"></div>
  <script src="assets/js/data.js"></script>
  <script src="assets/js/charts.js"></script>
  <script src="assets/js/components.js"></script>
  <script> KTW.mountChrome('home'); /* page logic */ </script>
</body>
```

---

## 5. 제안서 전략의 UI 반영 (유지해야 할 의도)

- **데이터 구독 주력** → P5(trends.html)가 1급 메뉴·주력 상품.
- **closed-loop 측정 = 차별점** → P9(dashboard.html) 광고→커머스 기여매출 추적.
- **노출보장·미달보상·CPM/CPC** → P8(advertise.html) 광고를 정액 호가 아닌 성과형으로.
- **본몰 SEO 권위 승계** → 헤더 배지·breadcrumb `KoreanToyShop › World`·"part of koreantoyshop".
- **커머스 전환 추적** → 상품 CTA는 koreantoyshop.com UTM 송출(P7 item.html).
- 가드레일: 커머스 진열몰 클론 금지 / 저작권 캐릭터 이미지 금지(플레이스홀더) / 실결제·로그인·백엔드 없음(스텁).

---

## 6. 알려진 한계 / 스텁 (미구현 — 의도된 범위)

- 로그인·결제·구독 결제·검색·언어 토글·소셜 = 토스트/모달 스텁.
- 외부 송출 링크는 새 탭으로 koreantoyshop.com(실제 페이지 존재 여부 무관, UTM 데모용).
- 이미지 전부 컬러 플레이스홀더(`KTW.ph`).
- 차트는 정적 mock 데이터 기반(인터랙션 최소).
- Google Fonts는 온라인 시 적용, 오프라인 시 시스템 폰트 폴백.
- `advertise.html`의 flagship 광고카드에 styles.css에 없는 클래스명 1개를 쓰되 inline border로 폴백 처리(렌더 정상).

---

## 7. 다음 세션 할 일 (우선순위 제안)

1. **[검증] 브라우저 육안/스크린샷 검증** — 11페이지 레이아웃·차트·반응형·네비게이션 왕복 확인. (Claude-in-Chrome 확장 연결 또는 수동 캡처)
2. **[폴리시] 시각 디테일 보정** — 발견되는 정렬·여백·컬러 이슈 수정.
3. **[기능] 인터랙션 실제화** — P2 카테고리 필터·P9 기간/캠페인 필터를 실제 동작으로(현재 일부 toast 스텁).
4. **[자산] 이미지 전략** — 플레이스홀더 → 실제 사용 가능한(저작권 free) 일러스트/아이콘 가이드.
5. **[옵션] React+Vite 재구성** — 컴포넌트 재사용·라우팅 강화가 필요하면. (현재는 무빌드 정적이 강점)
6. **[옵션] 다국어(hreflang)·접근성 점검** — 제안서 처방 중 미반영분.

---

## 8. 빠른 재시작 명령 (참고)

```bash
# 프로토타입 열기 (Windows)
Start-Process "C:\Github_Personal\ucanon-ai\workspace\happythkinknet\koreantoyworld-prototype1\index.html"

# 헤드리스 JS 스모크 테스트 (Node) — /tmp/smoke2.js 를 다시 만들거나 아래 골자 재사용
#   페이지별 fresh vm 컨텍스트에 data.js→charts.js→components.js 로드 후 인라인 스크립트 실행, 에러 수집
```

> 스모크 테스트 스크립트(`/tmp/smoke2.js`)는 임시 경로라 다음 세션에 없을 수 있음 — 필요 시 재작성(핵심: 페이지마다 새 컨텍스트로 foundation 재로딩 + permissive DOM 프록시 shim).

---

## 9. 근거 자료 (참고)

- 커머스 레퍼런스: `..\koreantoyshop-site-analysis\koreantoyshop-site-analysis.md`
- 사업 컨셉/전략: `..\제안서-분석-보고서.md`
- 사양서: `.\koreantoyworld-prototype-prompt.md`
