# KoreanToyWorld.com 프로토타입 개발 프롬프트

> **작성일** 2026-06-22
> **목적** K-Toy 미디어/콘텐츠 플랫폼 `KoreanToyWorld` 프로토타입(시안+동작 데모) 구축용 프롬프트
> **근거 자료**
> - 운영 레퍼런스: `koreantoyshop-site-analysis/koreantoyshop-site-analysis.md` (커머스 본진 분석)
> - 사업 컨셉/전략: `제안서-분석-보고서.md` (KoreanToyWorld 제안서 통합 분석)
> **중요** 이 프롬프트는 **커머스몰 복제가 아니라, 한국 캐릭터 완구를 다루는 '미디어 플랫폼 + 제조사 광고 인벤토리'** 를 만드는 작업이다. 커머스(koreantoyshop.com)는 전환 목적지이고, 본 사이트는 콘텐츠·발견·광고가 주역이다.

---

## 0. 이 프롬프트 사용법 (AI 에이전트에게)

아래 내용을 그대로 컨텍스트로 받아, **동작하는 프론트엔드 프로토타입**을 만든다. 디자인 시안 캡처가 아니라 클릭 가능한 데모를 목표로 한다. 데이터는 하드코딩 mock JSON으로 채우고, 실제 결제·로그인·서버는 구현하지 않는다(스텁 처리). 모든 화면은 반응형(모바일 우선)으로 작성한다.

---

## 1. 제품 개요 (What we are building)

| 항목 | 내용 |
|------|------|
| 제품명 | **KoreanToyWorld** (이하 KTW) |
| 한 줄 정의 | 한국 캐릭터 완구(K-Toy)를 **발견·소개·랭킹·트렌드**로 다루는 글로벌 미디어 플랫폼 |
| 1차 사용자(수요측) | 해외 K-Toy 팬·컬렉터·키즈 보호자 — "어떤 한국 완구가 핫한지" 탐색·구독 |
| 2차 사용자(공급측, 과금 대상) | 한국 완구 제조사·브랜드 — **노출·랭킹·트렌드 데이터 광고주(갑)** |
| 수익 모델 | ① 성과형/노출보장 광고 ② **K-Toy 트렌드 인텔리전스 데이터 구독(주력)** ③ 어필리에이트(커머스 송출) |
| 커머스 연계 | 모든 상품 카드/콘텐츠는 `koreantoyshop.com`(또는 `/world` 서브폴더 본몰)로 송출, **클릭→전환을 추적** |
| 도메인 전략(시각화) | 보고서 처방대로 **서브폴더 승계** 컨셉을 UI에 반영(예: 헤더에 "Part of KoreanToyShop" 신뢰 배지, breadcrumb `KoreanToyShop › World`) |

### 1.1 보고서가 못박은 설계 원칙 (프로토타입에 반드시 반영)

제안서-분석-보고서의 "How to Win"을 UI/IA로 구현한다:

1. **closed-loop 측정이 핵심 차별점** → **광고주 셀프서브 대시보드**(노출·CTR·커머스 기여매출)를 핵심 화면으로 포함. 단순 배너몰처럼 보이면 실패.
2. **데이터 구독을 주력 상품으로** → "K-Toy Trend Intelligence" 페이지를 1급 메뉴로 배치(87K SKU 데이터의 트렌드 리포트 컨셉).
3. **노출보장·미달보상** → 광고 상품 소개 페이지(Advertise)에 "보장 노출 + 미달 시 크레딧" 약관 카피 노출.
4. **정액 호가 지양, 성과형 강조** → 광고 단가표는 "CPM 보장형 / CPC 옵션 / 데이터 구독" 중심으로 표현.
5. **SEO 권위 승계 신호** → 본몰과의 연결성(배지·링크·breadcrumb)을 시각적으로 강조.

> 즉, koreantoyshop.com의 **신뢰 메시지(정품·KC인증·서울발송·실고객 리뷰)** 톤은 계승하되, **상품 진열몰이 아니라 콘텐츠/랭킹/데이터 미디어**로 재구성한다.

---

## 2. 디자인 디렉션 (제안 컨셉에 맞춘 스타일)

### 2.1 컨셉 키워드

**"K-Pop 무드의 토이 매거진"** — 한국 캐릭터 완구의 컬러풀·플레이풀함 + 미디어/매거진의 편집형 레이아웃 + B2B 데이터 플랫폼의 신뢰감. 셋의 균형.

- 키즈 쇼핑몰처럼 유치하지 않게, **편집형(editorial) 매거진 그리드** 채택.
- 캐릭터 IP가 주인공 → 큰 히어로 비주얼·컬러 블록·카드.
- 광고주(B2B)도 보는 사이트 → 데이터 위젯·랭킹 차트는 **깔끔한 대시보드 톤**.

### 2.2 컬러 시스템

K-Toy의 발랄함을 담되 과채도를 피하고 화이트 베이스 + 포인트 컬러로.

```
--ktw-bg:        #FFFFFF      /* 베이스 */
--ktw-surface:   #F7F8FB      /* 카드/섹션 배경 */
--ktw-ink:       #1A1B2E      /* 본문 텍스트(딥 네이비) */
--ktw-ink-soft:  #5A5C72      /* 보조 텍스트 */

--ktw-primary:   #FF4D8D      /* K-Toy 핑크(메인 포인트, 티니핑/핑크퐁 무드) */
--ktw-secondary: #3D5AFE      /* 코발트 블루(타요/폴리 무드, 링크·CTA) */
--ktw-accent:    #FFC400      /* 옐로(랭킹·하이라이트·뽀로로 무드) */
--ktw-mint:      #00C8B4      /* 민트(데이터/트렌드 위젯) */

--ktw-rank-gold:   #F5B301
--ktw-rank-silver: #B8C0CC
--ktw-rank-bronze: #CD7F4E

--ktw-success:   #18B26B      /* In Stock / 상승 트렌드 */
--ktw-danger:    #FF4757      /* 하락 트렌드 / 마감임박 */
```

- 그라데이션 1종 허용: `linear-gradient(135deg, #FF4D8D, #3D5AFE)` (히어로·구독 CTA).
- 다크 모드는 프로토타입 범위 외(라이트만).

### 2.3 타이포그래피

- 영문 헤드라인: **Poppins** 또는 **Montserrat**(둥글고 친근한 지오메트릭 산세리프, 토이 무드).
- 본문/UI: **Inter** 또는 **Roboto**(레퍼런스가 Roboto 사용 — 가독성).
- 한글 병기 시: **Pretendard**.
- 스케일: H1 클램프 `clamp(2rem, 5vw, 3.5rem)`, 굵은 700~800 헤드라인 + 400~500 본문. 숫자(랭킹·가격·CPM)는 tabular-nums.

### 2.4 형태 언어 (Shape & motion)

- 큰 라운드: 카드 `border-radius: 20px`, 버튼 `pill(999px)`, 이미지 `16px`.
- 부드러운 그림자(`0 8px 30px rgba(26,27,46,.08)`), 보더는 `1px #ECEEF3`.
- 호버 시 카드 살짝 떠오름(`translateY(-4px)`) + 그림자 강조.
- 마이크로 인터랙션: 랭킹 변동 화살표(▲▼), 트렌드 스파크라인, 구독 CTA 펄스. 과하지 않게.
- 아이콘: 라인 스타일 통일(Lucide/Feather 류).

### 2.5 신뢰 배지(레퍼런스 계승)

koreantoyshop 히어로의 신뢰 배지 4종 톤을 **미디어 버전**으로 변주:
`100% Authentic K-Toys` · `KC Certified Brands` · `Ships from Seoul` · `Real Collector Reviews`
+ KTW 고유: `Part of KoreanToyShop · since 2011`.

---

## 3. 정보 구조 (IA) / 페이지 맵

제안서 광고 상품(14종)을 **콘텐츠 영역**으로 환원해 메뉴를 설계한다.

### 3.1 글로벌 내비게이션

```
[로고 KTW] | Discover | Rankings | Characters | Brands | Trends(Data) | News | [Advertise] | [구독🔔] [검색] [언어 ▾]
```

- **Discover** — 큐레이션 홈/피드(Featured Collection, Monthly Promotion, New Season/Global Launch).
- **Rankings** — 주간 K-Toy 랭킹(Top Ranking Bronze/Silver/Gold 자리 = 광고 인벤토리 시각화).
- **Characters** — 캐릭터 IP 허브(Character Spotlight). 레퍼런스의 IP 중심 분류 계승.
- **Brands** — 제조사/브랜드 디렉터리(Manufacturer Directory + Brand Page + Manufacturer Page).
- **Trends (Data)** — **K-Toy Trend Intelligence** 구독(주력 상품). 데이터 대시보드 프리뷰 + 구독 paywall.
- **News** — K-Toy 뉴스/신제품/박람회(News + Toy Exhibition Showcase).
- **Advertise** — 광고주(제조사) 대상 상품 안내 + 셀프서브 대시보드 진입.

### 3.2 캐릭터/브랜드 데이터(레퍼런스에서 추출, mock에 사용)

캐릭터 IP: Tayo Little Bus(타요), Pororo(뽀로로), Catch Teenieping(캐치! 티니핑), Robocar Poli(로보카 폴리), Miniforce(미니특공대), Robot Trains(로봇트레인), Titipo(꼬마기차 티티포), Pinkfong/Baby Shark(핑크퐁), Bread Barbershop(브레드 이발소), Metal Cardbot, Super Wings, Tobot, BabyBus Panda.

제조사/브랜드: ICONIX, SAMG Entertainment, MimiWorld, Academy, Toytron, Oxford, Young Toys.

가격 패턴(레퍼런스): `MSRP / Now / Was` 3단(할인 강조), USD, 예시 $39.98~$62.98, SKU `KTW-####`. 신뢰 문구: "100% Original & Authentic", "KC Marked", "Ship from Seoul".

### 3.3 페이지 목록 (프로토타입 구현 대상)

| # | 페이지 | 핵심 콘텐츠 | 광고/수익 연결 |
|---|--------|------------|---------------|
| P1 | **Home / Discover** | 히어로, Featured Collection, Weekly Top 10, Character Spotlight, Trending Now, News, Newsletter 구독 | Homepage Featured·Featured Product·Monthly Promotion 슬롯 |
| P2 | **Rankings** | 주간 K-Toy Top 50 랭킹 표(변동·스파크라인), 카테고리 탭 | Top Ranking Gold/Silver/Bronze = 상단 고정 광고자리(라벨링) |
| P3 | **Character Spotlight (상세)** | 캐릭터 히어로, 스토리, 관련 완구 그리드, 신제품 | Character Spotlight 광고 |
| P4 | **Brand / Manufacturer Page** | 제조사 소개, 카탈로그, New Season/Global Launch 배너 | Brand Page·Manufacturer Page·Global Launch |
| P5 | **Trends (Data) — Trend Intelligence** | 무료 프리뷰 차트 + 구독 paywall + 샘플 리포트 | **데이터 구독(주력)**, 월 플랜 |
| P6 | **News / Exhibition** | 기사 리스트, 박람회 쇼케이스 | News·Toy Exhibition Showcase |
| P7 | **Product/Item 상세** | 갤러리, 정보(정품·KC·연령·배터리), Yotpo형 리뷰, 관련상품, **"Buy on KoreanToyShop" CTA** | 어필리에이트 전환(추적 UTM) |
| P8 | **Advertise (광고주 랜딩)** | 광고 상품 카드(보장노출·CPM·CPC·데이터 구독), 약관(미달보상) | 광고 인벤토리 영업 |
| P9 | **Advertiser Dashboard (closed-loop)** | 노출·CTR·클릭·**커머스 기여매출**·캠페인별 표/차트 | **핵심 차별점 화면** |

> 최소 구현 우선순위: **P1 → P2 → P5 → P9 → P3/P4 → P6/P7/P8**. P5(데이터 구독)와 P9(대시보드)는 보고서 처방의 핵심이므로 반드시 포함.

---

## 4. 화면별 상세 스펙

### P1. Home / Discover
- **히어로**: 그라데이션 배경 + 카피 "Bringing Korean Toys to the World" + 부카피(트렌드/랭킹 발견) + CTA 2개(`Explore Rankings`, `Subscribe to Trends`). 우측 캐릭터 콜라주.
- 신뢰 배지 4종(2.5 참고) 가로 스트립.
- **Weekly Top 10** 가로 스크롤 카드(랭크 뱃지·변동 화살표·스파크라인).
- **Character Spotlight** 대형 피처 블록(이번 주 캐릭터).
- **Featured Collection / Monthly Promotion** 매거진 그리드(2~3열).
- **Trending Now**: 트렌드 상승 완구(▲%) mint 위젯.
- **From the News** 3카드.
- **Newsletter 구독** 풀폭 CTA(보고서의 채널믹스=뉴스레터 반영, 이메일 입력 스텁).
- 광고 슬롯은 `data-ad-slot` 라벨과 옅은 "Sponsored" 태그로 시각 구분.

### P2. Rankings
- 카테고리 탭(All / Tayo / Pororo / Teenieping / Poli / ...).
- 상단 **Top 3 = Gold/Silver/Bronze 시상대(podium)** UI — 이 자리가 곧 광고 인벤토리임을 라벨로 표현(예: "Gold Slot · Sponsored").
- 4위~50위 랭킹 표: 순위·변동(▲▼ n)·썸네일·상품명·브랜드·가격(MSRP/Now)·주간 스파크라인·`View` 버튼.
- 정렬·필터(주간/월간 토글).

### P3. Character Spotlight
- 캐릭터 풀폭 히어로(IP 컬러 테마 적용 — 캐릭터별 컬러 변수).
- 캐릭터 소개·시리즈(레퍼런스의 Mini/Basic/Metal/Plush 시리즈 구조 차용).
- 관련 완구 그리드 + "신제품" 리본.
- 하단 관련 캐릭터 추천.

### P4. Brand / Manufacturer Page
- 브랜드 헤더(로고·소개·설립·대표 IP).
- **New Season Launch / Global Launch** 배너(광고 상품 시각화).
- 카탈로그 그리드 + 필터.
- "이 브랜드 광고하기" → Advertise 연결(공급측 동선).

### P5. Trends (Data) — Trend Intelligence  ★주력
- 헤더: "K-Toy Trend Intelligence — powered by 87,000+ SKU data".
- **무료 프리뷰**: 카테고리별 검색·가격·인기 추이 차트(라인/바), 급상승 키워드, 인기 캐릭터 점유율 도넛.
- **Paywall 블록**: 상세 리포트·CSV 다운로드·경쟁사 비교는 잠금 → 구독 플랜 카드(Basic/Pro/Enterprise, 월 ₩50만/100만/150만 컨셉).
- 샘플 PDF 리포트 미리보기 카드.
- 타깃 카피: 제조사 Pain("내 신제품이 어디서·얼마에 팔리나") 직격.

### P6. News / Exhibition
- 매거진형 기사 리스트(카테고리: New Launch / Exhibition / Brand News).
- **Toy Exhibition Showcase** 피처 배너(서울/해외 박람회).
- 기사 상세는 단순 템플릿 1종.

### P7. Product / Item 상세
- 좌: 이미지 갤러리(썸네일+메인). 우: 상품명·브랜드·가격(MSRP/Now/Was)·연령(3+)·배터리·KC 배지·정품 배지.
- **주 CTA: `Buy on KoreanToyShop ↗`**(외부 송출, UTM·전환추적 스텁). 카트 기능은 만들지 않음(미디어이므로).
- Description 탭 + 사양표 + Yotpo형 별점 리뷰 카드(실고객 톤) + 관련상품.
- JSON-LD(Product/BreadcrumbList) `<script>` 삽입(레퍼런스 강점 계승, SEO).

### P8. Advertise (광고주 랜딩)
- 히어로: "Put your K-Toy in front of the world's collectors".
- **광고 상품 카드**(보고서 단가표를 성과형으로 재구성):
  - `Homepage Featured` — 보장노출 기반 CPM형.
  - `Top Ranking (Gold/Silver/Bronze)` — 자리 + 보장노출.
  - `Character/Brand Spotlight` — 콘텐츠형.
  - `Trend Intelligence 구독` — 데이터 상품.
  - 각 카드에 **"보장 노출 + 미달 시 크레딧 보상"** 배지.
- closed-loop 가치 설명 섹션: "We prove ad → real KoreanToyShop sales."
- CTA: `Request Media Kit` / `Go to Dashboard`.

### P9. Advertiser Dashboard (closed-loop) ★핵심 차별점
- KPI 카드 4종: **Impressions · CTR · Clicks · Attributed Sales(기여매출 USD)**.
- 캠페인별 표: 캠페인명·상품(슬롯)·기간·노출·클릭·CTR·전환·기여매출·ROAS·상태.
- 차트: 일자별 노출/클릭 라인, 기여매출 바, 유입→커머스 전환 퍼널.
- 보장노출 대비 실적 게이지(미달 시 크레딧 안내 토스트).
- 데이터는 mock JSON, 필터(기간·캠페인) 동작.

---

## 5. 기술 스택 / 구현 가이드

### 5.1 권장 스택 (프로토타입)
- **선택지 A(권장):** Vite + React + TypeScript + Tailwind CSS + Recharts(차트) + React Router. 컴포넌트 단위로 빠르게.
- **선택지 B(경량):** 순수 HTML/CSS/Vanilla JS 멀티 파일(빌드 없이 더블클릭 실행). 차트는 Chart.js CDN.
- 둘 중 하나로 **일관**되게. 결과물은 로컬에서 바로 열람 가능해야 함(README에 실행법).
- 폰트는 Google Fonts CDN, 아이콘은 Lucide CDN/패키지.
- 이미지는 플레이스홀더(캐릭터별 컬러 블록 + 이름 텍스트, 또는 무료 토이 일러스트 placeholder). **실제 캐릭터 저작권 이미지 사용 금지** — placeholder/도형으로 대체하고 캡션만 캐릭터명.

### 5.2 데이터 (mock)
`/data` 폴더에 JSON으로 분리:
- `characters.json`, `brands.json`, `products.json`(가격 MSRP/Now/Was, SKU KTW-####, age, battery, KC, reviews),
- `rankings.json`(주간 순위·변동·스파크라인 배열),
- `trends.json`(카테고리별 시계열·키워드·점유율),
- `news.json`, `adProducts.json`(광고 상품·단가·보장노출),
- `campaigns.json`(대시보드용 노출/클릭/기여매출).
- 3.2의 실제 캐릭터/브랜드명으로 현실감 있게 채울 것(최소 캐릭터 10, 브랜드 6, 상품 24, 랭킹 50, 뉴스 6, 캠페인 5).

### 5.3 공통 컴포넌트
`Header(메가내비)`, `Footer(정보·연락처·결제배지·SNS·사업자정보)`, `ProductCard`, `RankRow`, `CharacterCard`, `BrandCard`, `AdSlot(Sponsored 라벨)`, `TrendChart`, `KpiCard`, `PricingCard`, `Badge`, `NewsletterCTA`, `Breadcrumb(KoreanToyShop › World › …)`.
- 푸터에 레퍼런스 사업자정보 톤 반영: 서울 은평구 주소·`+82-10-7378-7115`·SNS·`Part of KoreanToyShop.com (since 2011)` + 결제 배지(PayPal/Klarna/Afterpay 아이콘은 송출 본몰 기준 표기만).

### 5.4 동작 범위(스텁/미구현)
- 로그인·결제·실제 구독 결제 = 모달/토스트 스텁("프로토타입에서는 비활성").
- 외부 송출 링크 = `https://koreantoyshop.com/...?utm_source=ktw...` 형태로 새 탭(실제 이동 X 또는 안내).
- 검색 = 클라이언트 필터로 동작.
- 언어 토글(EN/KO) = UI만(전체 i18n은 범위 외, 라벨 일부 토글).

### 5.5 품질 기준
- 모바일·태블릿·데스크톱 반응형, 키보드 접근성·alt 텍스트·시맨틱 마크업.
- Lighthouse 기준 의식(이미지 lazy, 폰트 display swap).
- 코드 주석은 핵심만, 컴포넌트 분리 명확.

---

## 6. 체계적 개발 계획 (Systematic Build Plan)

개발은 **"공통 기반을 먼저 굳히고(직렬) → 페이지를 병렬로 찍어내고 → 통합·검수(직렬)"** 의 3국면으로 진행한다. 이 순서가 멀티 에이전트 병렬화의 전제다(기반이 흔들리면 병렬 작업이 충돌한다).

### 6.1 개발 국면 (Phases)

| 국면 | 이름 | 목표 | 산출 게이트(다음 단계 진입 조건) |
|------|------|------|------------------------------|
| **Phase 0** | 스캐폴드 & 계약 | 빌드 환경·라우팅·디자인 토큰·데이터 스키마·컴포넌트 인터페이스 확정 | 빈 라우트 9개가 뜨고, `/data/*.json` 스키마와 공통 컴포넌트 prop 타입이 **고정(frozen)**됨 |
| **Phase 1** | 디자인 시스템 & 공통 컴포넌트 | 토큰·레이아웃·재사용 컴포넌트(5.3) 완성 | Header/Footer/Card류/Chart/Badge가 Storybook 격 데모 페이지에서 렌더됨 |
| **Phase 2** | 페이지 병렬 구현 | P1~P9 각 페이지를 독립 트랙으로 구현 | 각 페이지가 mock 데이터로 단독 렌더·반응형 동작 |
| **Phase 3** | 통합 & 데이터 배선 | 라우팅 연결, 송출 링크/UTM, 검색·필터, 언어 토글 | 전 페이지 네비게이션 왕복, 콘솔 에러 0 |
| **Phase 4** | 검수 & 폴리시 | 반응형/접근성/카피 톤/가드레일 위반 점검, README | 체크리스트(6.3) 전 항목 통과 |

### 6.2 의존성 규칙 (병렬화의 핵심)

- **Phase 0/1은 직렬·단일 소유자**가 수행한다. 여기서 만든 **"계약(contract)"** — 데이터 스키마(5.2), 컴포넌트 prop 시그니처(5.3), 디자인 토큰(2.2~2.4) — 은 Phase 2 동안 **변경 금지**. 변경이 필요하면 통합 담당에게 에스컬레이션.
- **Phase 2의 각 페이지 트랙은 서로의 파일을 건드리지 않는다.** 페이지는 `src/pages/<Page>/`(또는 `pages/<page>.html`) 안에서만 작업하고, 공통 컴포넌트·토큰·데이터는 **읽기 전용으로 소비**만 한다.
- 공통 컴포넌트에 부족한 게 있으면 **직접 수정하지 말고** "필요 prop/컴포넌트 요청 목록"을 남긴다(통합 담당이 일괄 반영).

### 6.3 완료 정의 (Definition of Done — 페이지 공통)
- [ ] mock 데이터만으로 단독 렌더, 하드코딩 문자열 최소화(데이터는 `/data`에서).
- [ ] 모바일(360)·태블릿(768)·데스크톱(1280) 3종 브레이크포인트 정상.
- [ ] 공통 컴포넌트·디자인 토큰만 사용(임의 색/폰트 금지).
- [ ] 광고 슬롯은 `Sponsored` 라벨, 단가는 보장노출/CPM·CPC·미달보상 프레이밍(가드레일 §8 준수).
- [ ] 콘솔 에러/경고 0, 이미지 alt·시맨틱 마크업.
- [ ] 외부 송출은 UTM 부착 새 탭 스텁.

---

## 7. 멀티 에이전트 실행 전략 (Multi-Agent Orchestration)

개발 속도를 위해 **여러 에이전트를 병렬로 가동**한다. 단, §6.2의 의존성 규칙을 지켜 **파일 충돌 없는 병렬**을 보장한다. 핵심은 *"기반은 1명이 직렬로, 페이지는 N명이 병렬로, 통합·검수는 다시 1명이 직렬로"*.

### 7.1 에이전트 역할 분담 (Agent Roster)

| 에이전트 | 역할 | 담당 범위(소유 파일) | 국면 |
|---------|------|--------------------|------|
| **A0 · Architect/Foundation** | 스캐폴드·라우팅·디자인 토큰·데이터 스키마·컴포넌트 계약 정의 | `src/app`, `tailwind.config`, `src/styles/tokens`, `src/components/*`(시그니처), `/data/*.json` 스키마 | Phase 0–1 (직렬, 선행) |
| **A1 · Data/Content** | mock JSON 데이터 전부 생성(3.2 실제 캐릭터/브랜드명) | `/data/*.json` | Phase 1 (A0 스키마 확정 직후 병렬) |
| **A2 · Home/Discover (P1)** | P1 구현 | `src/pages/Home/*` | Phase 2 (병렬) |
| **A3 · Rankings (P2)** | P2 구현 | `src/pages/Rankings/*` | Phase 2 (병렬) |
| **A4 · Trend Intelligence (P5)** | P5 구현(주력) | `src/pages/Trends/*` | Phase 2 (병렬) |
| **A5 · Advertiser Dashboard (P9)** | P9 구현(핵심 차별점) | `src/pages/Dashboard/*` | Phase 2 (병렬) |
| **A6 · Character/Brand (P3·P4)** | P3·P4 구현 | `src/pages/Character/*`, `src/pages/Brand/*` | Phase 2 (병렬) |
| **A7 · News/Item/Advertise (P6·P7·P8)** | P6·P7·P8 구현 | `src/pages/News/*`, `src/pages/Item/*`, `src/pages/Advertise/*` | Phase 2 (병렬) |
| **A8 · Integrator/QA** | 라우팅 통합·송출 배선·검수·README·가드레일 감사 | `src/app`(라우팅), `README.md`, 교차 수정 | Phase 3–4 (직렬, 후행) |

> 페이지 트랙은 **6개(A2~A7)를 동시 가동**할 수 있다. CPU/동시성 한도에 따라 자동 큐잉되므로 한 번에 다 던져도 된다.

### 7.2 실행 순서 (직렬 게이트 + 병렬 팬아웃)

```
[Phase 0–1]  A0 단독 실행 → (스캐폴드+토큰+컴포넌트 계약 확정)  ── 게이트 1 ──┐
                                                                          │
[Phase 1.5]  A1(데이터) 단독/선행 실행 (스키마 확정 후)                     │
                                                                          ▼
[Phase 2]    A2 ∥ A3 ∥ A4 ∥ A5 ∥ A6 ∥ A7  ← 6트랙 병렬 (서로 파일 비충돌)
                                                                          │
                                              ── 게이트 2: 전 페이지 단독 렌더 ──┐
                                                                                ▼
[Phase 3–4]  A8 단독 실행 → 통합·송출 배선·검수·README → 최종 산출
```

- **게이트 1 통과 전 Phase 2 시작 금지**: 계약(스키마·prop·토큰)이 굳기 전 병렬 시작하면 재작업·충돌 발생.
- **A1(데이터)은 A0 스키마 확정 직후** 즉시 병렬 가능(페이지 트랙과 동시 진행 OK).
- A2~A7은 **단 하나의 메시지에서 동시 디스패치**(한 번에 보내야 실제 병렬 실행).

### 7.3 에이전트 공통 브리핑(각 페이지 에이전트에게 반드시 전달할 것)

각 페이지 에이전트에게는 다음을 컨텍스트로 준다:
1. 이 프롬프트 문서 전체(특히 해당 페이지 §4 스펙, 디자인 토큰 §2, 가드레일 §8).
2. **A0가 확정한 계약**: 컴포넌트 목록·prop 시그니처, `/data` 스키마, 라우트 경로.
3. **소유 경계**: "너는 `src/pages/<X>/` 안에서만 쓰고, 공통 컴포넌트/토큰/데이터는 import만 한다. 공통 파일 수정 금지. 부족하면 `INTEGRATION-NOTES.md`에 요청을 남겨라."
4. **완료 정의**(§6.3) 체크리스트.
5. 반환물: 구현 파일 + 사용한 컴포넌트/데이터 키 목록 + 미해결 요청.

### 7.4 충돌 방지 규약 (Conflict Avoidance)
- **1 페이지 = 1 디렉터리 = 1 에이전트.** 페이지 간 공유가 필요한 건 전부 공통 컴포넌트로 승격(A0/A8 소관).
- 공통 파일(`App`, 라우터, 토큰, `tailwind.config`, `/data`)은 **A0와 A8만 쓰기 가능**. 페이지 에이전트는 읽기 전용.
- 모든 교차 요청은 코드 직접 수정이 아니라 `INTEGRATION-NOTES.md` 한 파일에 누적 → A8이 Phase 3에서 일괄 처리.
- 파일 병렬 충돌이 우려되는 동시 편집 작업은 **git worktree 격리** 옵션으로 실행(에이전트별 독립 작업본).

### 7.5 (선택) Workflow 오케스트레이션으로 자동화

본 저장소에서 멀티 에이전트를 코드로 파이프라인화하려면 아래 골격을 따른다(개념 예시):

```
Phase 0–1:  A0 = agent("스캐폴드+토큰+컴포넌트 계약 확정", {schema: CONTRACT})   // 직렬, 선행
Phase 1.5:  A1 = agent("CONTRACT 스키마대로 /data mock 생성")                    // 스키마 확정 후
Phase 2:    parallel([                                                          // 6트랙 병렬 팬아웃
              () => agent("P1 Home 구현", {isolation:'worktree'}),
              () => agent("P2 Rankings 구현", {isolation:'worktree'}),
              () => agent("P5 Trends 구현", {isolation:'worktree'}),
              () => agent("P9 Dashboard 구현", {isolation:'worktree'}),
              () => agent("P3·P4 구현", {isolation:'worktree'}),
              () => agent("P6·P7·P8 구현", {isolation:'worktree'}),
            ])
Phase 3–4:  A8 = agent("통합·송출 배선·검수·README·가드레일 감사")               // 직렬, 후행
```

- 각 `agent()`에는 §7.3의 브리핑(계약·소유경계·완료정의)을 프롬프트로 주입한다.
- Phase 2는 **반드시 `parallel`(또는 한 메시지 내 다중 디스패치)** 로 동시에 — 직렬로 돌리면 속도 이점이 사라진다.
- 통합 충돌이 잦으면 페이지 트랙에 `isolation: 'worktree'`를 부여해 독립 작업본에서 작업 후 A8가 병합.

> **요약**: 사용자가 이 프롬프트로 작업 지시 시, 에이전트는 **(1) 먼저 A0로 기반·계약을 직렬로 확정**하고, **(2) 게이트 통과 후 P1~P9를 6개 트랙으로 한 번에 병렬 디스패치**, **(3) 마지막에 A8로 통합·검수**하는 순서를 지킨다.

---

## 8. 산출물 (Deliverables)

1. 실행 가능한 프로토타입 소스(위 선택 스택).
2. 최소 페이지: **P1, P2, P5, P9** 완성 + P3/P4/P6/P7/P8 템플릿 수준.
3. `/data/*.json` mock 데이터.
4. `README.md`: 실행 방법, 페이지 목록, 컨셉 요약, mock 데이터 설명.
5. 디자인 토큰(2.2~2.4)을 CSS 변수/Tailwind config로 구현.

---

## 9. 하지 말 것 (Out of scope / Guardrails)

- ❌ koreantoyshop.com을 그대로 클론한 **커머스 진열몰** 만들기 — 본 사이트는 **미디어/데이터 플랫폼**이다.
- ❌ 실제 캐릭터 저작권 이미지·로고 무단 사용 — placeholder로 대체.
- ❌ 실결제·실로그인·서버 백엔드 구현.
- ❌ 보고서가 비판한 **"노출수 없는 정액 호가" 단가표** 그대로 노출 — 반드시 **보장노출·CPM/CPC·미달보상** 프레이밍으로.
- ❌ 별도 도메인 단절 컨셉 — UI는 **본몰 승계(서브폴더·배지·breadcrumb)** 신호를 보여줄 것.

---

## 10. 한 줄 요약 (에이전트용 TL;DR)

> "koreantoyshop.com의 신뢰·캐릭터 IP 자산과 비주얼 톤을 계승하되, **상품몰이 아니라 K-Toy 랭킹·트렌드 데이터·광고 인벤토리를 파는 매거진형 미디어 플랫폼**을 만든다. 핵심 화면은 **Discover(P1)·Rankings(P2)·Trend Intelligence 구독(P5)·closed-loop 광고주 대시보드(P9)** 네 개이며, 보고서 처방(데이터 구독 주력·성과형 보장광고·커머스 전환 추적·본몰 승계)을 UI로 증명한다."
