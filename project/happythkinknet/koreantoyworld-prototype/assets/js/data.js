/* ===========================================================================
   KoreanToyWorld — Mock data (Phase 1 contract). Global: window.KTW_DATA
   Embedded as JS (not fetched JSON) so the prototype runs from file:// with
   no CORS/build step. Ref prompt §3.2, §5.2. Names are real IPs/brands but
   ALL imagery is placeholder color-blocks (no copyrighted art).
   =========================================================================== */
(function () {
  // ---- Characters (color drives placeholder + theme) ----
  const characters = [
    { slug: "tayo",       name: "Tayo Little Bus",      ko: "꼬마버스 타요",   color: "#3D8BFF", brand: "ICONIX",  tagline: "The little blue bus everyone loves", series: ["Mini", "Basic", "Metal", "Plush"] },
    { slug: "pororo",     name: "Pororo",                ko: "뽀로로",          color: "#2EA8E0", brand: "ICONIX",  tagline: "The little penguin, a global preschool icon", series: ["Figure", "Playset", "Plush"] },
    { slug: "teenieping", name: "Catch! Teenieping",     ko: "캐치! 티니핑",   color: "#FF5FA2", brand: "SAMG",    tagline: "Catch the feeling-creatures of the heart world", series: ["Heartization", "Doll", "Mini"] },
    { slug: "poli",       name: "Robocar Poli",          ko: "로보카 폴리",     color: "#E23B3B", brand: "ROI Visual", tagline: "Rescue heroes that transform", series: ["Transformer", "Diecast", "Playset"] },
    { slug: "miniforce",  name: "Miniforce",             ko: "미니특공대",      color: "#7B45E0", brand: "SAMG",    tagline: "Tiny rangers, huge action", series: ["Ranger", "Weapon", "Zord"] },
    { slug: "robottrains",name: "Robot Trains",          ko: "로봇트레인",      color: "#00A88E", brand: "CJ ENM",  tagline: "Trains that become robots", series: ["Transformer", "Track"] },
    { slug: "titipo",     name: "Titipo & Friends",      ko: "꼬마기차 티티포", color: "#37C0E8", brand: "ICONIX",  tagline: "The cheerful little train", series: ["Diecast", "Track", "Plush"] },
    { slug: "pinkfong",   name: "Pinkfong & Baby Shark", ko: "핑크퐁/베이비샤크", color: "#FF8AB3", brand: "SmartStudy", tagline: "Doo doo doo — the global sing-along", series: ["Plush", "Music", "Figure"] },
    { slug: "breadbarber",name: "Bread Barbershop",      ko: "브레드 이발소",   color: "#F0A93B", brand: "Monster Studio", tagline: "Sweet makeovers from the bakery", series: ["Figure", "Playset"] },
    { slug: "metalcardbot",name: "Metal Cardbot",        ko: "메탈 카드봇",     color: "#5B6BFF", brand: "SonoKong", tagline: "Card-summoned battle robots", series: ["Robot", "Card"] },
    { slug: "superwings", name: "Super Wings",           ko: "슈퍼윙스",        color: "#FF6B2C", brand: "Alpha",   tagline: "Delivery planes to the rescue", series: ["Transformer", "Playset"] },
    { slug: "tobot",      name: "Tobot",                 ko: "또봇",            color: "#2B3A8F", brand: "Young Toys", tagline: "Cars that become guardian robots", series: ["Transformer", "Diecast"] }
  ];

  // ---- Brands / manufacturers ----
  const brands = [
    { slug: "iconix",  name: "ICONIX",              color: "#3D8BFF", founded: 2001, ips: ["tayo","pororo","titipo"], desc: "Korea's flagship preschool IP studio behind Pororo, Tayo and Titipo." },
    { slug: "samg",    name: "SAMG Entertainment",  color: "#FF5FA2", founded: 2000, ips: ["teenieping","miniforce"], desc: "KOSDAQ-listed animation powerhouse, maker of Catch! Teenieping & Miniforce." },
    { slug: "mimiworld",name:"MimiWorld",           color: "#FFB02E", founded: 2003, ips: [], desc: "Role-play & character playset specialist for the global preschool market." },
    { slug: "academy", name: "Academy",             color: "#1E9E6A", founded: 1969, ips: [], desc: "Veteran Korean model & hobby kit manufacturer, exporting worldwide." },
    { slug: "toytron", name: "Toytron",             color: "#8A5BE0", founded: 1998, ips: [], desc: "Light & sound interactive toys, strong on diecast and rescue lines." },
    { slug: "oxford",  name: "Oxford",              color: "#E23B3B", founded: 1996, ips: [], desc: "Korean building-block brand, the 'K-brick' challenger." },
    { slug: "youngtoys",name:"Young Toys",          color: "#2B3A8F", founded: 1986, ips: ["tobot"], desc: "Home of Tobot — transforming robot pioneer in Korea." }
  ];

  // ---- Products (SKU KTW-#### ; price MSRP/Now/Was USD) ----
  const P = (id, name, ch, br, msrp, now, was, opt) => Object.assign(
    { id: "KTW-" + id, name, character: ch, brand: br, msrp, now, was, age: "3+",
      battery: "Not required", kc: true, condition: "New", rating: 4.6, reviews: 24 }, opt || {});
  const products = [
    P(2601, "Tayo Convertible Strong Rescue Truck", "tayo", "iconix", 62.98, 49.98, 62.98, {rating:4.8, reviews:212, new:true}),
    P(2602, "Tayo Mini Bus 4-Pack (ICONIX Mini Series)", "tayo", "iconix", 45.98, 39.98, 45.98, {rating:4.7, reviews:188}),
    P(2603, "Tayo Garage Center Playset", "tayo", "iconix", 58.00, 52.00, 58.00, {rating:4.6, reviews:96}),
    P(2604, "Tayo Metal Series Rogi Diecast", "tayo", "iconix", 18.98, 15.98, 18.98, {rating:4.5, reviews:74}),
    P(2611, "Pororo Talking Plush Doll 30cm", "pororo", "iconix", 34.98, 29.98, 34.98, {rating:4.9, reviews:301, new:true}),
    P(2612, "Pororo & Friends Figure 8-Set", "pororo", "iconix", 41.98, 35.98, 41.98, {rating:4.6, reviews:140}),
    P(2621, "Teenieping Heartization Compact", "teenieping", "samg", 48.98, 44.98, 48.98, {rating:4.8, reviews:265, new:true}),
    P(2622, "Teenieping Romance Doll", "teenieping", "samg", 27.98, 23.98, 27.98, {rating:4.7, reviews:159}),
    P(2623, "Teenieping Heart Jewel Mini 6-Pack", "teenieping", "samg", 36.98, 31.98, 36.98, {rating:4.5, reviews:88}),
    P(2631, "Robocar Poli Transforming Poli", "poli", "toytron", 32.98, 27.98, 32.98, {rating:4.8, reviews:233}),
    P(2632, "Robocar Poli Rescue HQ Playset", "poli", "toytron", 79.98, 69.98, 79.98, {rating:4.7, reviews:121, new:true}),
    P(2633, "Robocar Poli Amber Diecast", "poli", "toytron", 16.98, 13.98, 16.98, {rating:4.6, reviews:64}),
    P(2641, "Miniforce X Ranger Volt", "miniforce", "samg", 29.98, 25.98, 29.98, {rating:4.6, reviews:97}),
    P(2642, "Miniforce Penta X-Bot Zord", "miniforce", "samg", 69.98, 59.98, 69.98, {rating:4.7, reviews:142, new:true}),
    P(2651, "Robot Trains Kay Transformer", "robottrains", "iconix", 24.98, 20.98, 24.98, {rating:4.4, reviews:58}),
    P(2661, "Titipo Diecast Train 5-Pack", "titipo", "iconix", 39.98, 33.98, 39.98, {rating:4.5, reviews:80}),
    P(2662, "Titipo Round Railway Track Set", "titipo", "iconix", 54.98, 47.98, 54.98, {rating:4.6, reviews:69}),
    P(2671, "Baby Shark Singing Plush", "pinkfong", "mimiworld", 22.98, 18.98, 22.98, {rating:4.8, reviews:410, new:true}),
    P(2672, "Pinkfong Phone-Fong Music Toy", "pinkfong", "mimiworld", 26.98, 22.98, 26.98, {rating:4.5, reviews:133}),
    P(2681, "Bread Barbershop Salon Playset", "breadbarber", "mimiworld", 44.98, 38.98, 44.98, {rating:4.6, reviews:71}),
    P(2691, "Metal Cardbot Sword King", "metalcardbot", "youngtoys", 49.98, 42.98, 49.98, {rating:4.5, reviews:90, new:true}),
    P(2701, "Super Wings Jett Transformer", "superwings", "toytron", 28.98, 23.98, 28.98, {rating:4.7, reviews:176}),
    P(2702, "Super Wings World Airport Playset", "superwings", "toytron", 84.98, 72.98, 84.98, {rating:4.6, reviews:64}),
    P(2711, "Tobot Athlon Vulcan", "tobot", "youngtoys", 39.98, 34.98, 39.98, {rating:4.7, reviews:128}),
    P(2712, "Tobot Mini Tritan Diecast", "tobot", "youngtoys", 17.98, 14.98, 17.98, {rating:4.4, reviews:52})
  ];

  // ---- Rankings: Top 50 (built from products, deterministic) ----
  const seed = [3,7,1,9,4,2,8,5,6,0,4,7,2,9,1,3,8,5,0,6];
  const spark = (i) => Array.from({length: 8}, (_, k) => 40 + ((seed[(i+k) % seed.length] * 7 + k * 3) % 55));
  const deltas = [2,-1,0,5,-3,1,0,4,-2,3,-5,0,2,-1,6,0,-4,1,3,-2];
  const rankings = Array.from({ length: 50 }, (_, i) => {
    const p = products[i % products.length];
    const d = deltas[i % deltas.length];
    return { rank: i + 1, delta: d, sku: p.id, name: p.name, brand: p.brand,
      character: p.character, now: p.now, msrp: p.msrp, spark: spark(i) };
  });

  // ---- Trend Intelligence (free preview series + locked detail) ----
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const trends = {
    months,
    series: [
      { key: "tayo",       label: "Tayo",        color: "#3D8BFF", values: [62,65,70,68,74,81] },
      { key: "teenieping", label: "Teenieping",  color: "#FF5FA2", values: [40,48,55,67,79,92] },
      { key: "poli",       label: "Robocar Poli",color: "#E23B3B", values: [58,57,60,59,63,66] },
      { key: "pinkfong",   label: "Pinkfong",    color: "#FF8AB3", values: [70,66,64,61,60,58] }
    ],
    rising: [
      { kw: "teenieping heartization", change: +186 },
      { kw: "miniforce penta zord",    change: +94 },
      { kw: "tayo metal series",       change: +63 },
      { kw: "baby shark plush",        change: +41 },
      { kw: "robocar poli rescue hq",  change: +29 }
    ],
    share: [
      { label: "Teenieping", value: 28, color: "#FF5FA2" },
      { label: "Tayo",       value: 22, color: "#3D8BFF" },
      { label: "Poli",       value: 16, color: "#E23B3B" },
      { label: "Pinkfong",   value: 12, color: "#FF8AB3" },
      { label: "Others",     value: 22, color: "#B8C0CC" }
    ],
    plans: [
      { plan: "Basic",     price: "₩500,000", per: "/mo", featured: false, items: ["Weekly Top 50 export", "1 category dashboard", "Email digest"] },
      { plan: "Pro",       price: "₩1,000,000", per: "/mo", featured: true,  items: ["All categories + keywords", "Price & demand trends", "CSV / API access", "Competitor compare"] },
      { plan: "Enterprise",price: "₩1,500,000", per: "/mo", featured: false, items: ["Everything in Pro", "Custom SKU reports", "Quarterly briefing", "Dedicated analyst"] }
    ]
  };

  // ---- News / Exhibition ----
  const news = [
    { slug: "teenieping-s5", cat: "New Launch",  title: "Catch! Teenieping Season 5 toy line hits global retail", date: "2026-06-18", color: "#FF5FA2", excerpt: "SAMG expands the Heartization range with 12 new Pings for overseas fans." },
    { slug: "seoul-toy-fair", cat: "Exhibition", title: "Seoul Character & Licensing Fair 2026 — K-Toy showcase recap", date: "2026-06-12", color: "#3D5AFE", excerpt: "Highlights from Korea's biggest character fair, hall by hall." },
    { slug: "tayo-15yrs",    cat: "Brand News",  title: "Tayo turns 15: ICONIX unveils anniversary Metal Series", date: "2026-06-05", color: "#3D8BFF", excerpt: "A premium diecast lineup celebrates the little blue bus." },
    { slug: "poli-rescue",   cat: "New Launch",  title: "Robocar Poli Rescue HQ playset ships from Seoul", date: "2026-05-28", color: "#E23B3B", excerpt: "Toytron's biggest Poli playset yet, now KC-certified for export." },
    { slug: "miniforce-zord",cat: "New Launch",  title: "Miniforce Penta X-Bot Zord pre-orders open", date: "2026-05-20", color: "#7B45E0", excerpt: "The combining mega-zord arrives for collectors worldwide." },
    { slug: "k-toy-export",  cat: "Brand News",  title: "K-Toy exports climb as K-Culture drives collector demand", date: "2026-05-11", color: "#00C8B4", excerpt: "Why Korean character toys are trending with global buyers." }
  ];

  // ---- Advertise: products reframed as guaranteed-impression / CPM·CPC / data ----
  const adProducts = [
    { name: "Homepage Featured",       model: "CPM (guaranteed)", impressions: "120,000 / mo", price: "from ₩1,000,000", makegood: true, desc: "Top-of-home feature slot with guaranteed monthly impressions." },
    { name: "Top Ranking — Gold",      model: "CPM (guaranteed)", impressions: "90,000 / mo",  price: "from ₩1,000,000", makegood: true, desc: "Podium #1 sponsored placement on the Weekly Rankings." },
    { name: "Top Ranking — Silver",    model: "CPM (guaranteed)", impressions: "60,000 / mo",  price: "from ₩600,000",   makegood: true, desc: "Podium #2 sponsored placement." },
    { name: "Top Ranking — Bronze",    model: "CPM (guaranteed)", impressions: "40,000 / mo",  price: "from ₩300,000",   makegood: true, desc: "Podium #3 sponsored placement." },
    { name: "Character Spotlight",     model: "Content + CPC",    impressions: "Editorial feature", price: "from ₩500,000", makegood: false, desc: "Sponsored character story with product carousel & click-out." },
    { name: "Brand / Manufacturer Page",model: "CPC option",      impressions: "Hosted brand hub", price: "from ₩500,000", makegood: false, desc: "Always-on brand hub with catalog and launch banners." },
    { name: "Global Launch Banner",    model: "CPM (guaranteed)", impressions: "70,000 / mo",  price: "from ₩1,700,000", makegood: true, desc: "New-season launch banner across Discover & Brand pages." },
    { name: "Trend Intelligence Data", model: "Data subscription",impressions: "87K-SKU dataset", price: "₩500,000~1,500,000 / mo", makegood: false, desc: "★ Flagship: monthly K-Toy trend & pricing intelligence." }
  ];

  // ---- Advertiser dashboard (closed-loop) ----
  const dashboard = {
    kpis: [
      { label: "Impressions", value: "318,420", trend: "+12.4%", up: true },
      { label: "CTR",         value: "1.84%",   trend: "+0.3pt", up: true },
      { label: "Clicks",      value: "5,859",   trend: "+18.1%", up: true },
      { label: "Attributed Sales", value: "$24,710", trend: "+22.6%", up: true }
    ],
    daily: [42,55,48,63,71,66,82,90,76,95,88,103,98,112], // clicks/day
    revenue: [820,1040,960,1280,1510,1390,1820], // weekly attributed $
    funnel: [
      { stage: "Ad impressions", value: 318420 },
      { stage: "Ad clicks",      value: 5859 },
      { stage: "Visited shop",   value: 4120 },
      { stage: "Added to cart",  value: 1180 },
      { stage: "Purchased",      value: 642 }
    ],
    campaigns: [
      { name: "Teenieping S5 Launch", slot: "Homepage Featured", period: "Jun 1–30", imp: 118200, clicks: 2480, ctr: "2.10%", conv: 312, sales: 11240, roas: "4.1x", status: "Live" },
      { name: "Tayo 15th Metal",      slot: "Top Ranking Gold",  period: "Jun 1–30", imp: 86400,  clicks: 1510, ctr: "1.75%", conv: 168, sales: 6320,  roas: "3.4x", status: "Live" },
      { name: "Poli Rescue HQ",       slot: "Character Spotlight",period:"May 15–Jun 15", imp: 52300, clicks: 980, ctr: "1.87%", conv: 92, sales: 4180, roas: "3.0x", status: "Live" },
      { name: "Miniforce Zord Tease", slot: "Global Launch",     period: "May 20–Jun 20", imp: 41200, clicks: 612, ctr: "1.49%", conv: 48, sales: 1980, roas: "2.6x", status: "Ending" },
      { name: "Super Wings Airport",  slot: "Brand Page",        period: "Apr 1–30",  imp: 20320,  clicks: 277, ctr: "1.36%", conv: 22, sales: 990,   roas: "2.1x", status: "Ended" }
    ]
  };

  const reviews = [
    { name: "Emily R. · Australia", stars: 5, text: "Arrived from Seoul in 4 days, 100% authentic. My daughter loves the Tayo set!" },
    { name: "Marco D. · Italy",     stars: 5, text: "Best place to find Teenieping toys outside Korea. KC certified and well packaged." },
    { name: "Sophie L. · Canada",   stars: 4, text: "Great selection of Korean character toys. The rankings helped me pick the hot ones." }
  ];

  window.KTW_DATA = { characters, brands, products, rankings, trends, news, adProducts, dashboard, reviews };
  // convenience lookups
  window.KTW_DATA.charBySlug  = Object.fromEntries(characters.map(c => [c.slug, c]));
  window.KTW_DATA.brandBySlug = Object.fromEntries(brands.map(b => [b.slug, b]));
})();
