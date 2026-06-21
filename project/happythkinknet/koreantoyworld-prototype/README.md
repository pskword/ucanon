# KoreanToyWorld — Prototype

K-Toy **미디어/데이터 플랫폼** 프로토타입. 한국 캐릭터 완구를 **발견·랭킹·트렌드 데이터·제조사 광고**로 다루는 사이트로,
커머스(koreantoyshop.com)는 전환 목적지로만 연결한다. 빌드한 사양은 `koreantoyworld-prototype-prompt.md`를 따른다.

> 정적 HTML/CSS/Vanilla JS. 빌드 단계·서버 없음 — **`index.html`을 더블클릭**하면 바로 열린다.

## 실행 방법

1. `index.html`을 브라우저로 연다(더블클릭 또는 우클릭 → 열기).
2. 데이터는 `assets/js/data.js`에 JS 전역(`window.KTW_DATA`)으로 내장되어 있어 `file://`에서도 동작한다(JSON fetch/CORS 문제 없음).
3. 인터넷이 있으면 Google Fonts(Poppins/Inter)가 적용되고, 없으면 시스템 폰트로 폴백된다(레이아웃 영향 없음).

빠른 점검(선택, Node 필요):
```bash
node /tmp/smoke2.js   # 전 페이지 인라인 스크립트 런타임 에러 점검 (개발 중 사용)
```

## 페이지 (11개)

| 파일 | 페이지 | 역할 |
|------|--------|------|
| `index.html` | P1 Discover/Home | 히어로·Weekly Top 10·Character Spotlight·Featured·Trending·News·Newsletter |
| `rankings.html` | P2 Rankings | 주간 Top 50, Gold/Silver/Bronze 시상대(=광고 인벤토리 라벨), 카테고리 필터 |
| `characters.html` / `character.html` | P3 Characters | 캐릭터 IP 허브 + 캐릭터별 컬러 테마 상세 |
| `brands.html` / `brand.html` | P4 Brands | 제조사 디렉터리 + 브랜드 페이지(Global Launch 배너) |
| `trends.html` | **P5 Trend Intelligence** | ★주력. 무료 프리뷰 차트 + Paywall + 데이터 구독 플랜 |
| `news.html` | P6 News | 뉴스/박람회(Exhibition Showcase) |
| `item.html` | P7 Item | 상품 상세 + **Buy on KoreanToyShop ↗**(UTM 송출) + JSON-LD |
| `advertise.html` | P8 Advertise | 광고 상품(보장노출·CPM/CPC·데이터 구독·미달보상) |
| `dashboard.html` | **P9 Advertiser Dashboard** | ★핵심 차별점. closed-loop(노출·CTR·클릭·기여매출) |

## 구조

```
koreantoyworld-prototype1/
├─ index.html, rankings.html, ... (11 pages)
├─ assets/
│  ├─ css/  tokens.css(디자인 토큰)  styles.css(base+components)
│  └─ js/   data.js(mock 전역)  charts.js(SVG 차트)  components.js(공용 UI API)
├─ koreantoyworld-prototype-prompt.md (개발 프롬프트/사양)
└─ README.md
```

- **공용 컴포넌트 API** `window.KTW` — `mountChrome(active)`(헤더/푸터 주입), `productCard`, `characterCard`, `brandCard`,
  `rankRow`, `trustStrip`, `ph`(저작권-free 컬러 플레이스홀더), `shopUrl`(UTM 송출), `money/save/stars/charColor/...`.
- **차트 API** `window.KTWChart` — `sparkline / lineChart / barChart / donut / funnel` (전부 직접 그린 SVG, 외부 의존성 0).
- **디자인 토큰** — K-Toy 핑크(#FF4D8D)·코발트(#3D5AFE)·옐로(#FFC400)·민트(#00C8B4), 라운드 카드, 매거진형 그리드.

## Mock 데이터 (`assets/js/data.js`)

캐릭터 12 · 브랜드 7 · 상품 25(SKU `KTW-####`, MSRP/Now/Was USD) · 랭킹 50 · 트렌드 시계열/키워드/점유율 ·
뉴스 6 · 광고상품 8 · 캠페인 5 · 리뷰 3. 실제 IP/브랜드명을 쓰되 **이미지는 전부 컬러 플레이스홀더**(저작권 자산 미사용).

## 제안서 전략의 UI 반영 (보고서 "How to Win")

- **데이터 구독 주력** → P5 Trend Intelligence를 1급 메뉴/주력 상품으로.
- **closed-loop 측정 = 차별점** → P9 광고주 대시보드(광고→커머스 기여매출 추적).
- **노출보장·미달보상·CPM/CPC** → P8 광고 상품을 "정액 호가"가 아닌 성과형으로 프레이밍.
- **본몰 SEO 권위 승계** → 헤더 배지·breadcrumb(`KoreanToyShop › World`)·"part of koreantoyshop".
- **커머스 전환 추적** → 모든 상품 CTA는 `koreantoyshop.com`으로 UTM 부착 송출(P7).

## 범위/스텁 (프로토타입)

로그인·결제·실제 구독 결제·검색·언어 토글·소셜·외부 송출은 **토스트/모달 스텁**으로 처리(미구현). 백엔드 없음.

---
*Generated via the prompt's multi-agent build plan: Phase 0/1 공통 기반(직렬) → Phase 2 페이지 6트랙 병렬 → Phase 3/4 통합·검수.*
