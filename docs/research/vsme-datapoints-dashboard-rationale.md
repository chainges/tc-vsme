# VSME Datapoints & Dashboard Design Rationale

**Date**: 2026-09-01 · **Sources**: EFRAG VSME Standard, final version (17 Dec 2024), extracted from the official XBRL rendering ([xbrl.efrag.org](https://xbrl.efrag.org/e-esrs/2024-12-17-efrag-vsme.xhtml), [EFRAG PDF](https://www.efrag.org/sites/default/files/sites/webpublishing/SiteAssets/VSME%20Standard.pdf)); dashboard rationale consolidates `docs/research/dashboard-metrics-research.md` (plan copy: `.kilo/plans/1788216507205-dashboard-metrics-research-plan.md`) and the prototype `prototypes/dashboard-metrics-prototype.html`.

---

## Part 1 — Complete VSME datapoint list

The standard has two modules. **Basic Module (B1–B11, ~46 leaf datapoints)** is the entry level and minimum requirement; **Comprehensive Module (C1–C9, ~42 additional)** is for SMEs facing bank/investor/large-customer requests (built from SFDR PAI Table 1, EBA Pillar 3, EU Benchmark Regulation). Basic is a prerequisite for Comprehensive. Every item is reported **only when applicable** ("if applicable" principle — no materiality assessment required).

### Basic Module — General information

**B1 – Basis for preparation** (§24–25)
- (a) Reporting option: Option A (Basic only) or Option B (Basic + Comprehensive)
- (b) Which disclosures were omitted as classified/sensitive information [conditional]
- (c) Individual or consolidated basis (includes subsidiaries?)
- (d) List of subsidiaries with registered addresses [if consolidated]
- (e) General info: (i) legal form · (ii) NACE code(s) · (iii) balance sheet size · (iv) turnover · (v) number of employees (headcount or FTE) · (vi) country of primary operations + significant assets · (vii) geolocation of owned/leased/managed sites
- §25 Sustainability-related certifications/labels held: description, issuer, date, rating [if held]

**B2 – Practices, policies and future initiatives** (§26–28)
- (a) Practices in place (energy/GHG reduction, pollution prevention, working conditions, circularity…) + description
- (b) Sustainability policies; publicly available?; separate E/S/G policies?
- (c) Future initiatives / transition plans [if any]
- (d) Targets to monitor policy implementation + progress [if any]

### Basic Module — Environment

**B3 – Energy and greenhouse gas emissions** (§29–31)
- §29 Total energy consumption (MWh) with renewable/non-renewable × electricity/fuels table [breakdown conditional on obtainability]
- §30 (a) Scope 1 gross GHG (tCO₂eq) · (b) location-based Scope 2 (tCO₂eq)
- §31 GHG intensity: gross GHG ÷ turnover (tCO₂eq/EUR)
- (§50–53, voluntary, presented with B3: significant Scope 3 categories per GHG Protocol, tCO₂eq)

**B4 – Pollution of air, water and soil** (§32)
- Pollutants to air/water/soil with amounts [conditional: already legally required to report, or via EMS]; or URL to public disclosure

**B5 – Biodiversity** (§33–34)
- Number and area (ha) of sites in/near biodiversity-sensitive areas
- [Voluntary] land use: total (ha), sealed area, nature-oriented on-site, nature-oriented off-site

**B6 – Water** (§35–36)
- Total water withdrawal + withdrawal in high water-stress areas
- Water consumption (withdrawal − discharge) [conditional: water-significant processes]

**B7 – Resource use, circular economy and waste** (§37–38)
- Circular economy principles applied? (yes/no + how)
- (a) Total annual waste by type (hazardous/non-hazardous) · (b) waste diverted to recycling/reuse · (c) annual mass-flow of significant materials [conditional: manufacturing/construction/packaging sectors]

### Basic Module — Social

**B8 – Workforce: general characteristics** (§39–40)
- Employees (headcount or FTE) by: (a) temporary vs permanent · (b) gender · (c) country [if >1 country]
- Employee turnover rate [conditional: ≥50 employees]

**B9 – Workforce: health and safety** (§41)
- (a) Number and rate of recordable work-related accidents · (b) number of fatalities (injuries + ill health)

**B10 – Workforce: remuneration, collective bargaining, training** (§42)
- (a) Employees paid ≥ national minimum wage? (yes/no)
- (b) Gender pay gap % [may omit if <150 employees; threshold drops to 100 on 7 June 2031]
- (c) % covered by collective bargaining agreements
- (d) Average annual training hours per employee, by gender

### Basic Module — Governance

**B11 – Convictions and fines for corruption and bribery** (§43)
- Number of convictions + total fines [conditional: if convictions/fines occurred]

### Comprehensive Module (all "if applicable"; omission = not applicable)

**C1 – Strategy: business model and initiatives** (§47)
- (a) Significant products/services · (b) significant markets · (c) main business relationships · (d) sustainability strategy elements [if any]

**C2 – Practices, policies and future initiatives (expanded)** (§48–49)
- Description of B2 practices/policies/initiatives; [voluntary] most senior accountable person

**Scope 3 consideration** (§50–53) — voluntary, with B3: significant Scope 3 categories per the GHG Protocol's 15 categories, tCO₂eq

**C3 – GHG reduction targets and climate transition** (§54–56)
- Targets [if set]: (a) target year + value · (b) base year + value · (c) units · (d) share of scopes covered · (e) main decarbonisation actions
- §55 Climate transition plan description [voluntary; conditional for high climate impact sectors — NACE A–H, L]
- §56 Whether/when a transition plan will be adopted [conditional: those sectors without a plan]

**C4 – Climate risks** (§57–58)
- [If hazards/transition events identified]: (a) description · (b) exposure/sensitivity assessment · (c) time horizons · (d) adaptation actions (yes/no + which)
- [Voluntary] potential adverse financial effects, rated high/medium/low

**C5 – Additional workforce characteristics** (§59–60) — [voluntary, ≥50 employees]
- Female-to-male ratio at management level; self-employed/agency workers working exclusively for the undertaking

**C6 – Own workforce: human rights policies and processes** (§61)
- (a) Code of conduct / human rights policy? (b) covers: child labour, forced labour, trafficking, discrimination, accident prevention, other? (c) complaints-handling mechanism?

**C7 – Severe negative human rights incidents** (§62)
- (a) Confirmed incidents: child labour / forced labour / trafficking / discrimination / other · (b) [voluntary] actions taken · (c) value-chain/community/consumer incidents?

**C8 – Revenues from certain sectors / EU benchmark exclusion** (§63–64)
- Revenue in: controversial weapons, tobacco, fossil fuels (coal/oil/gas split), pesticide/agrochemical production [if active]; excluded from Paris-aligned EU benchmarks?

**C9 – Gender diversity ratio in governance body** (§65) [if a governance body exists]

**Key thresholds for the data model**: 50 employees (turnover §40, C5) · 150→100 employees (pay gap B10(b), from 7 June 2031) · NACE A–H + L = high climate impact sectors (C3 §55–56) · B1 module option (A vs B) drives which disclosures apply.

---

## Part 2 — Dashboard design decisions & rationale (brief report)

### What we built and why

The dashboard (`src/routes/_appLayout/app/index.tsx`, prototype `prototypes/dashboard-metrics-prototype.html`) surfaces derived views of data SMEs already enter in forms. Three research streams converged on the choices: (1) what the VSME standard itself optimizes for, (2) dashboard design evidence (Few/Perceptual Edge, IBCS, NN/g), (3) what 16 competitor products show.

**1. KPI cards: Total, Scope 1, Scope 2, Scope 3 (B3 §30) with YoY deltas.**
The standard's principles mandate prior-year comparatives from the second reporting year, so every card carries a signed delta (`▼ −3.7% vs 2024`), green when emissions fall — per Few/IBCS, a bare number without comparison is a design failure. Emissions are "less-is-better", so the good/bad semantics are explicitly inverted and annotated. Scope 2 has both location- and market-based values with a toggle: B3 requires location-based; market-based is what buyers/financial partners often ask for.

**2. Emissions intensity card (B3 §31).**
This datapoint was added to the standard *at banks' explicit request* (EFRAG SRB paper, Nov 2024) because it's how lenders screen SME borrowers. Revenue is already collected in B1/company info, so the ratio is derivable with no new input. The formula is shown in a tooltip — EFAA survey evidence says intensity concepts confuse SMEs, so we never print a naked ratio.

**3. Target-vs-actual trajectory as the hero chart (C3 §54).**
C3's data model — base year + value, target year + value, scope coverage — is exactly the schema of our `targets` table, making this the highest-value view we can build without new collection. It's also the biggest market gap: Workiva, Sweep and Watershed all show actual-vs-target trajectory with status warnings; most products don't. A linear pathway from base to target year gives an "on track / at risk" answer, which matters because only ~11% of measuring SMEs set targets — visible progress encourages target-setting (British Business Bank 2025).

**4. Scope 3 category hotspots (§52).**
The standard asks for *significant* Scope 3 categories; a sorted horizontal bar chart answers "where do I act?" — the near-universal "hotspot" pattern across competitors (Sweep, Greenly, Microsoft's 15-category dashboard, SAP). Sorted bars (not donuts, not 15 lines) follow IBCS/Few evidence on ranking categorical data.

**5. Reporting-completeness meter (B1(a) + the "if applicable" principle).**
The standard's always-vs-if-applicable table is effectively the spec for a coverage tracker: submitted form sections ÷ applicable B1–B11 disclosures. This addresses the single most-cited SME pain point — "uncertainty about what and how to report" (Interreg 2025) — and is still a differentiator (Position Green, CEMAsys) rather than table stakes. It also gracefully handles partial reporting years.

**6. Single-year handling (Solstråle view).**
First-year reporters have no comparatives by definition: deltas become a "First reported year" pill, sparklines collapse to one bar, the trajectory shows a point plus a hint that the pathway unlocks when a target exists. This follows the standard's own logic (comparatives required *from the second year*) and NN/g guidance on explicit empty/partial states — distinguishing "no data", "zero", and "not yet".

**7. Renewable share / waste diversion bullets (B3 §29, B7 §38).**
Table-stakes competitor metrics (Microsoft's renewable-% tile) using our existing energy and waste form data; single-metric-vs-goal displays follow Few's bullet-graph pattern (never gauges).

### What we deliberately did not show

- **Donuts, gauges, treemaps** — poor quantitative encodings (NN/g preattentive-attribute research; IBCS EX 2.1/2.2).
- **All 15 Scope 3 lines / spaghetti charts** — IBCS EX 2.4; ranking bars instead.
- **Peer benchmarks** — the wanted "next step" (EFRAG symposium 2025) and a differentiator (Watershed, Position Green), but blocked on an external cross-company dataset; NACE (B1) is already collected, so the model is benchmark-ready later.
- **Real-time data, Sankey flows, org-tree maps** — annual reporting cycle; complexity without SME user evidence.
- **Social KPIs (gender pay gap B10, sick leave, board diversity C9)** — data exists and Coolset proves the differentiator, but deferred one iteration behind carbon (what buyers most request is carbon + workforce; workforce KPIs are next in the backlog).

### Layout principles applied

Overview first, details on demand (Shneiderman); one screen, glanceable (Few); ≤5–6 KPI cards (working-memory limits, NN/g); semantic color discipline (actual = solid dark, prior year = gray, target = dashed; red reserved for attention — IBCS); time control first-class; fixed chart heights and explicit empty states (Stripe/NN/g).

### Evidence base

Full citations in `docs/research/dashboard-metrics-research.md` and `.kilo/plans/1788216507205-dashboard-metrics-research-plan.md` — EFRAG VSME Standard & Basis for Conclusions (primary), EFAA market-acceptance survey 2025, Interreg NPA 2025, MDPI 2025, British Business Bank 2025, EFRAG/EAA/OIC symposium 2025; Few/Perceptual Edge, IBCS, NN/g, Shneiderman; vendor evidence for Microsoft Sustainability Manager, Workiva Carbon, Coolset, Position Green, CEMAsys, Sweep, Watershed, Greenly, Normative, Plan A, Klimakost (Norwegian), and others.
