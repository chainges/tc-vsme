# Dashboard Metrics & Data Research — Consolidated Report + Plan

**Question**: Which data, metrics, and visualizations should we add next to the dashboard (`src/routes/_appLayout/app/index.tsx`)?

**Date**: 2026-09-01 · **Method**: Three parallel research subagents — (1) user needs grounded in the EFRAG VSME standard, (2) dashboard design best practices (Few/Perceptual Edge, IBCS, NN/g), (3) competitor analysis (16 carbon accounting / ESG platforms). All claims cite sources; primary sources preferred.

**Note**: This file is the deliverable because plan mode restricts writes to plan directories. When implementing, consider moving the research sections below to `docs/research/dashboard-metrics-research.md` (repo convention for research writeups).

---

## Part 1 — Consolidated findings

### Current state

Dashboard shows 4 KPI cards (Total CO₂e, Scope 1/2/3) with mini column sparklines + one "Location based scope 2" yearly column chart, fed by external emissions data (`api.emissionsQueries.getEmissionsDashboard`). Available but unsurfaced data: energy (renewable/non-renewable), water, waste/circularity, biodiversity, pollution, scope 3 categories 1–15, climate risk, workforce/HSE/pay-gap/training/parental-leave, governance (board, fines, sector), and a `targets` table (base year, base emissions, target year + %, long-term target, per-year `projections` with scope split and scope-3 categories).

### TL;DR — Recommended additions, prioritized

| # | Addition | Why (converges across all 3 streams) | Data status |
|---|----------|--------------------------------------|-------------|
| P0 | **YoY deltas on existing KPI cards** (`▼ −12% vs 2024`, green = down, "lower is better" annotation) | VSME principles mandate comparatives; IBCS: every number needs a comparison; MS Sustainability Manager ships comparison bars on every tile | Exists (multi-year emissions) |
| P0 | **Target-vs-actual trajectory hero chart** (line: actuals + dashed target path + base-year marker + "on track / at risk" status) | Biggest market gap; Workiva shows yearly emissions vs 2025/final targets with "progress at risk" warning; VSME C3 is exactly this data model; our `targets` table stores it | Exists |
| P0 | **Scope 3 category hotspots** (sorted horizontal bars, top 8 + "other") | Table stakes everywhere (Sweep, Greenly, MS 15-category view, SAP, Normative); VSME B3 requires significant categories; answers "where do I act?" | Exists (`scope3Emissions` c1–c15) |
| P0 | **Emissions intensity KPI card** (5th card: tCO₂e per M€ revenue; formula in tooltip) | VSME B3 intensity datapoint was added *at banks' request* (EFRAG SRB paper); headline tile at Microsoft; revenue in `companyInfo` | Derivable, no new forms |
| P1 | **Reporting-completeness indicator** (submitted sections ÷ applicable VSME B1–B11) | Top SME pain point is "uncertainty about what to report" (Interreg 2025); market differentiator (Position Green "Reporting progress", CEMAsys progress dashboard); derivable from form `status` field | Derivable |
| P1 | **Scope composition** (stacked columns S1/S2/S3 per year) + **scope 2 location/market toggle**; demote the current location-based-scope-2 chart | Table stakes; single-scope chart is not a headline metric (IBCS) | Exists |
| P1 | **Energy / renewable share view** (100% stacked by year or progress bar) | Competitor table stakes (MS renewable-% tile, Coolset energy KPI); renewable/non-renewable collected | Exists |
| P2 | **Social KPI row** (gender pay gap, sick leave, board diversity) | Coolset is the only product doing this — differentiator; EFAA: workforce data is what buyers most request | Exists |
| P2 | **Sector benchmarking** vs NACE peers | Wanted "next step" (EFRAG symposium 2025); differentiator (Watershed, Position Green); blocked on external dataset; NACE already collected so model is benchmark-ready | Blocked on data |
| P2 | **VSME/CSRD framework toggle** | Coolset pattern; matches market; large scope — defer | — |

**Deprioritized** (evidence against): donuts/gauges/treemaps (poor encodings — NN/g, IBCS EX 2.1/2.2), 15-line charts / spaghetti (IBCS EX 2.4), Sankey diagrams, real-time/daily refresh (annual reporting cycle), org-tree maps, peer benchmarks before a dataset exists.

### Stream 1 — User needs (VSME-grounded)

VSME ¶1 defines three objectives the dashboard should serve ([VSME Standard](https://www.efrag.org/sites/default/files/sites/webpublishing/SiteAssets/VSME%20Standard.pdf)):

1. **Answer value-chain data requests** — the standard's primary purpose; CO₂ and workforce data are what buyers request most ([MDPI 2025, n=431 SMEs](https://www.mdpi.com/2071-1050/17/17/8029); [EFAA 2025](https://efaa.com/wp-content/uploads/2025/11/Survey-on-VSME-Market-Acceptance.pdf)).
2. **Access to finance** — Comprehensive Module C1–C9 built from SFDR PAI / EBA Pillar 3 datapoints as "proxies to manage the sustainability profile of SMEs clients (banks/investors)" ([VSME Basis for Conclusions BC44, BC59](https://www.efrag.org/sites/default/files/sites/webpublishing/SiteAssets/VSME%20Basis%20for%20Conclusions.pdf)). The **GHG intensity datapoint in B3 was added specifically because banks requested it** ([EFRAG SRB approval paper, Nov 2024](https://www.efrag.org/system/files/sites/webpublishing/Meeting%20Documents/2311061432020162/04-01%20Revised%20VSME%20%E2%80%93%20Approval%20%E2%80%93%20EFRAG%20SRB%2024-11-13.pdf)).
3. **Internal management** — EFRAG positions online tools as "additional management insight" and the standard as a way to "monitor sustainability performance" ([EFRAG news, Dec 2024](https://www.efrag.org/en/news-and-calendar/news/efrag-releases-the-voluntary-sustainability-reporting-standard-for-nonlisted-smes)).

Key derived facts:

- **Year-over-year comparatives are mandated** by the standard's principles from the second reporting year.
- **C3 (targets) is a ready-made progress model** (base year + value, target year + value, per-scope coverage) — our `targets` table mirrors it.
- **Pain points to design for** ([Interreg 2025](https://www.interreg-npa.eu/media/i51iis03/report-interview-analysis-of-sustainability-reporting-2025_final.pdf); [EFAA 2025](https://efaa.com/wp-content/uploads/2025/11/Survey-on-VSME-Market-Acceptance.pdf); [EFRAG symposium 2025](https://www.efrag.org/sites/default/files/media/document/2025-10/EFRAG%20OIC%202025%20EAA%20Symposium%20summary%20report.pdf)): "uncertainty about what and how to report" (→ completeness view); GHG intensity confuses SMEs (→ show the formula, don't just print a ratio); only ~11% of measuring SMEs set targets ([BBB 2025](https://www.british-business-bank.co.uk/sites/g/files/sovrnj166/files/2025-10/smes-net-zero-report-2025.pdf)) (→ visible target progress encourages target-setting); benchmarking is the wanted next step (→ later; NACE makes us ready).

### Stream 2 — Design best practices

Sources: [Few — Why Most Dashboards Fail](http://www.perceptualedge.com/articles/misc/WhyMostDashboardsFail.pdf), [Few — Common Pitfalls](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf), [Few — Bullet Graph Spec](http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf), [IBCS SUCCESS](https://www.ibcs.com/standards/page/3/), [NN/g — dashboards & preattentive attributes](https://www.nngroup.com/articles/dashboards-preattentive/), [Shneiderman — The Eyes Have It](http://www.cs.umd.edu/hcil/members/bshneiderman/ivwp.html), [Stripe chart layout](https://docs.stripe.com/stripe-apps/patterns/chart-layout), [Plausible](https://plausible.io/docs/guided-tour).

Rules that constrain what we add:

1. Overview first, zoom/filter, details on demand — dashboard is a monitoring surface, drill via clicking the data.
2. One screen, glanceable in seconds; exceeding one screen is Few's pitfall #1.
3. Max ~5–6 KPI cards (working-memory limits, [NN/g](https://www.nngroup.com/articles/short-term-memory-and-web-usability/)) — current 4 cards + intensity = sweet spot.
4. No bare numbers: signed, colored deltas (`▲ +4.2% vs 2024`); for emissions **invert semantics — down is good**, annotate explicitly (Few's less-is-better rule).
5. Keep sparklines (Few's snapshot+trend pairing); line sparklines read marginally better than columns.
6. Target-vs-actual = bullet-style/trajectory displays, never gauges; add a projection segment to answer "on track?" ([Few on projections](https://www.perceptualedge.com/blog/?p=217)).
7. Chart semantics: lines for shape-over-time; columns for few discrete periods; stacked columns (≤5–6 series) for composition; **sorted horizontal bars for ranked categories** (scope 3 = bar ranking, never 15 lines or a donut).
8. IBCS semantic color: actual = solid dark, prior year = light gray, target = dashed/outlined; red reserved for needs-attention.
9. Explicit empty/partial states: distinguish no-data vs zero vs in-progress (dotted line for in-progress year); fixed chart heights ([NN/g empty states](https://www.nngroup.com/articles/empty-state-interface-design/)).
10. Time control first-class: the existing `yearStore` selector drives everything; add a comparison toggle (vs prior year / vs base year).
11. Layout: most important top-left; group by topic with whitespace; uniform equal-weight grids are a named anti-pattern.

**Recommended layout (top → bottom)**: (1) control bar — year selector + comparison toggle + scope-2 basis toggle + coverage badge; (2) KPI row ≤5 cards with deltas + sparklines; (3) hero trajectory chart with target pathway; (4) composition band — stacked scope columns + scope-3 ranking bars; (5) targets row — bullet-style progress bars; (6) secondary domains via drill-down/tabs; (7) completeness checklist.

### Stream 3 — Competitor analysis

16 products surveyed (vendor docs prioritized; full list in Sources):

- **Table stakes** (universal): scope 1/2/3 headline KPIs; scope/category breakdown with drill-down; YoY/multi-year trends; hotspot identification; target setting + progress; energy/renewable share.
- **Pattern-setters**: [Microsoft Sustainability Manager](https://learn.microsoft.com/en-us/industry/sustainability/report-dashboard) — emissions + **revenue intensity** + renewable-% tiles with comparison bars, 15-category scope 3 dashboard, location/market toggle. [Workiva Carbon](https://www.workiva.com/solutions/carbon-management) — yearly emissions bar chart **vs 2025/final targets with "progress at risk" warning**.
- **Differentiators within our reach**: reporting-progress on the home screen (Position Green, CEMAsys — not yet table stakes); intensity-per-revenue (Microsoft only among carbon-first tools); social KPIs next to carbon (Coolset only — gender pay gap, board diversity, temp contracts); VSME/CSRD framework toggle (Coolset, Position Green).
- **Our gaps vs market**: no scope 3 breakdown, no scope composition, no trends beyond scope 2, **no target-progress view (biggest gap — data already stored)**, no completeness indicator, no intensity, no energy view, no hotspots. Evidence caveats: Carbon Limits has no SME product; Sustamize pivoted; Celsia evidence is one secondary source.

---

## Part 2 — Implementation plan

### Goal

Turn the dashboard from static emissions snapshot into a monitoring surface, adding the four P0 items computed from existing data, following the design guardrails.

### Guardrails (apply to all tasks)

- ≤6 KPI cards; one hero chart; no donuts/gauges; ≤5 lines per chart; sorted horizontal bars for categories.
- Deltas: signed %, green = decrease for emissions, tooltip "lower is better".
- Semantic colors: actual solid, prior year light gray, target dashed/outlined.
- Explicit empty/partial states (existing "No data available" Alert pattern in `app/index.tsx:90`); in-progress year marked.
- Everything driven by the existing `yearStore` year selector.
- Highcharts via `@highcharts/react` (already in use); respect existing shadcn Card/Alert components.

### Tasks (ordered)

1. **KPI deltas** — extend the stats cards in `src/routes/_appLayout/app/index.tsx`: compute YoY delta from `allEmissions` (selected year vs prior reported year); render signed % with green/red semantics + "vs {year}" caption. → Verify: unit test for delta computation (missing prior year → no delta, not 0%); visual check both directions.
2. **Intensity KPI card (5th)** — new Convex query or extension of `getEmissionsDashboard` joining selected-year emissions with `formGeneral` `companyInfo.data.revenue` for the same org+year; compute tCO₂e per M€ revenue; tooltip shows formula (VSME B3). Handle missing revenue (show "—", not 0). → Verify: unit test computation incl. missing-revenue case.
3. **Target-vs-actual trajectory hero chart** — query `targets` (`by_organizationId`) + `emissionsQueries` multi-year actuals; line chart: actual total CO₂e solid, linear pathway base-year→target-year dashed, long-term target optional second dashed line, base-year marker; status chip "on track / at risk" (actual ≤ linear pathway at current year → on track). Handle: no target set (show chart without pathway + hint linking to Targets page), no actuals (empty state). → Verify: unit test status computation (on-track, at-risk, no-target, no-actuals); org scoping test (no cross-org leakage).
4. **Scope 3 hotspot chart** — query `formEnvironmental` `scope3Emissions` for selected year; sorted horizontal bars, top 8 + "other"; direct value labels; category names in a shared constant (1 = purchased goods…15). Zero-category data → section hidden or empty state with link to the environmental form. → Verify: unit test sorting/top-N/"other" aggregation.
5. **Demote the location-based scope-2 chart** — remove it from the main view (its data remains available in the environmental form); it is superseded by the hero chart and scope composition. → Verify: dashboard still renders with only emissions data; no unused imports.
6. **Tests first (TDD)**: each task above starts with a failing test in `src/routes/__tests__/` or co-located tests per repo conventions; Convex computation logic in `convex/__tests__/` (edge-runtime project).

### Out of scope (P1/P2 backlog, do not build now)

Completeness meter; scope composition stacked columns + scope-2 location/market toggle; energy/renewable view; social KPI row; benchmarks; VSME/CSRD toggle. The current scope-2 chart removal (task 5) is included because P0 items replace it; if the team prefers to keep it until composition ships, defer task 5.

### Risks

- Emissions data comes from external MongoDB via `emissionsQueries` — confirm multi-year shape (`allEmissions[year][key]`) is stable before building deltas/trajectory (it is already used this way in `app/index.tsx`).
- Revenue lives in submitted `formGeneral` `companyInfo` data — orgs that never submitted it will lack intensity; design must tolerate that (show "—").
- `targets.projections` is optional and form-entered; trajectory chart must work from base/target year + % alone (linear pathway) without projections.

### Validation

- `bun run test` (two-project Vitest split) green.
- `tsc` / typecheck clean.
- Manual: with seeded org (submitted env form + target set) — delta chips, intensity card, trajectory with pathway + status, scope 3 bars all render; with bare org — no crashes, sensible empty states.

### Open questions

None blocking. If desired before implementation: confirm whether "Total CO₂" card label should become "Total GHG (tCO₂e)" for VSME terminology accuracy — cosmetic, either way.
