# Materiality assessment: PRD

Feature owner: Eivind
Status: draft, reviewed once, ready to build against
Date: 4 September 2026
Part of: the VS reporting app (React, TanStack Start, Convex, shadcn/ui, Highcharts)
Companions: `claude/materiality-data-model.md`, `claude/materiality-backlog.md`, `claude/materiality-handover-notes.md`, and the clickable prototype "Materiality Scoping Flow" published as an artifact

## What this is

A double materiality assessment, done once before a company starts reporting, valid for about three years, that tells the reports which sustainability topics need words. It is a feature inside the reporting app, not a product of its own.

The VS Standard does not require one. Where ESRS makes reporters run an assessment, VS uses the "if applicable" principle and asks companies to report a disclosure when their circumstances trigger it. We build the assessment anyway, for three reasons. An SME cannot answer "if applicable" on a blank form, and a guided pass leaves a written reason behind every skip. Customers under CSRD will ask a supplier which topics matter to them regardless of what VS requires. And without a materiality view the company has no idea where to spend effort, so targets and initiatives land on whatever is easiest to measure.

The assessment also surfaces things. A company that scores its topics honestly usually finds one it was not tracking, and that discovery has value whether or not it ever reaches a report.

## Where it sits and how often it runs

Before reporting, on its own clock. One assessment, valid for roughly three years, feeding three annual reports. Reports point at the assessment. The assessment knows nothing about reports.

Between runs, two lighter things. An annual check-in when a company opens a new reporting year: show the material topic list, ask "still right?", record the answer and the date. Two minutes, and "we reviewed it and nothing changed" is itself a disclosure. And trigger events that force an early re-run: a new business line, a site somewhere materially different, a serious incident, a sector code change, a change in the standard. The app can spot some of these from data it already holds, and should prompt rather than wait.

Validity is a date range on the assessment, not a reporting period. The report shows the age of the assessment it runs on. Eighteen months old should look fine. Four years old should look stale on every screen that depends on it.

## The boundary with the report

Loose, and deliberately so.

The report has a standard set of datapoints. B1 to B11, and whichever Comprehensive disclosures apply. Those get reported whatever the assessment says, following the standard's own "if applicable" rules. The assessment never switches a datapoint on or off, never hides a field, never greys anything out. That was in an earlier draft and it was wrong.

The assessment connects to the report in exactly two places.

Every material topic needs words somewhere. Where a numbered disclosure already collects numbers on the topic, the disclosure code is a pointer to it. Where none does, the topic gets a few sentences in C1 or C2, and a few sentences are enough. The report opens a text box with the topic name on it rather than leaving the user to find a home for it.

Anything the company is already doing about a topic goes into B2, practices, policies and future initiatives. Whether the topic came out material or not. The "doing something" flag lives on the report side, keyed by report year, because it changes annually while the assessment does not. How this looks in the interface is decided later.

That is the whole contract. The topic taxonomy is not shared with the report either, since the assessment may one day run on SDGs or a custom list and the report should not care.

## Users

The SME. A finance lead or owner at a company of 15 to 300 people. One or two hours of patience for the whole report. Does not know what irremediability means and is never asked. Wants to be told what probably applies to a company like theirs and then argue with it.

The consultant. Runs assessments for a portfolio of SMEs. Wants defaults they can trust, reuse across clients, and an audit trail. V1 designs for the SME and leaves seams for the consultant in the data model and the export.

## The model in one page

Topics are screened first, scored second.

Each surviving topic gets two scores on a 1 to 5 scale. Impact materiality asks how much the company affects people and the environment. Financial materiality asks how much the topic could affect the company's money. Material if either score is above the line. The two never net against each other, and a positive impact never cancels a negative one.

Each score comes from two anchored questions rather than one number, because a bare slider produces a figure nobody can defend six months later.

Impact: severity and likelihood. Severity is one question with written anchors that fold together what EFRAG separates into scale, scope and irremediability. Splitting them is correct under IG 1 and wrong for this audience. Likelihood only appears for impacts that have not happened yet. For an impact the company confirms is already happening, likelihood is certain and the question disappears.

Financial: magnitude and likelihood. Magnitude anchors to a share of annual revenue so the number means something. Likelihood covers the next three years.

The arithmetic is boring and shown on screen. Actual impact: score equals severity. Potential impact: (severity + likelihood) / 2. Financial: (magnitude + likelihood) / 2. Round to the nearest half. Overrides are allowed, cost a sentence, and both numbers are stored.

The line is static at 3.3 and the user never sees a threshold control. People converge on the centreline anyway, so asking them to pick one adds a decision without adding information, and a threshold chosen after seeing results is one reverse-engineered for a convenient answer. At 3.3, "moderate" on its own never qualifies. A topic needs to be above moderate on at least one side. That is a deliberate lean against over-reporting. The value is config, stamped onto the assessment for reproducibility, not a setting.

Two hard rules sit above the arithmetic. A severe human rights impact is material regardless of score, which is how EFRAG treats it. A legal obligation to report makes a topic material.

### Anchors

Defaults. A consultant can retune them per client and the assessment records which set it used.

Impact severity: 1 barely noticeable, a handful of people or a small local effect, easily put right. 2 limited, a defined group or small area, fixable within a year. 3 moderate, a real effect on a meaningful group or area, fixing it takes effort and money. 4 serious, widespread or hard to reverse or touching people's health, rights or livelihood. 5 severe, permanent damage or a serious breach of human rights.

Likelihood, both sides, next three years: 1 very unlikely. 2 possible but we'd be surprised. 3 even odds. 4 likely, we'd plan for it. 5 near certain or already starting.

Financial magnitude, share of revenue: 1 under 0.5%, noise. 2 0.5% to 2%, noticeable. 3 2% to 5%, a line item the board asks about. 4 5% to 15%, or it costs a major customer or access to credit. 5 over 15%, or it threatens the business.

### Value chain placement

Each topic carries own operations, upstream, downstream. Multi-select, seeded. Cheap to build and the detail buyers ask about most.

## Pre-fill: how we know what is relevant

This is the part that makes the first pass fast, and the part most likely to evolve. So it is built behind an interface from day one.

A pre-fill provider takes what we know about the company and returns, for each topic, a suggested screening answer, suggested scores, sub-topics, value chain placement, a one-line reason, a source label, and a confidence. That output shape is the contract. Providers change. The shape does not.

V1 provider: a curated seed table plus a six-question intake. Pure function, no model, no network.

The seed table is keyed by NACE division, which B1 already collects. It is editorial content we author, informed by SASB's industry materiality logic, the ESRS sector work that exists, and national sector guidance. Coverage plan: the 12 to 15 NACE divisions that cover most Norwegian SMEs, with a conservative fallback profile for everything else that marks own workforce, business conduct and climate relevant and the rest "not sure". We do not have this data today. Authoring it is a task with a named owner, a review cadence, and a version number stamped on every assessment that used it.

The intake is six yes/no/not-sure questions about the business: physical sites beyond an office, building or making anything physical, subcontracted labour, selling to consumers, hazardous substances, sites near protected nature or homes. Answers override the seed where they speak. "Not sure" on a question flags the affected topic for a proper look rather than guessing.

Every suggestion carries a source label the user can see. From your sector, from your answers, or needs a look. That labelling matters. A user treats a suggestion derived from their own answer differently from a guess about their industry, and correctly so.

Later providers, in rough order:

Report data, from year two. Once a report exists, its figures can argue a topic in during the annual check-in or a re-run. Diesel volumes under B3 make climate hard to screen out. A signal from report data only ever argues a topic in, never out, because an empty field means "not filled in", not "doesn't apply".

An agent. Fills the intake from public sources given the organisation number, asks follow-up questions where the seed and the intake disagree, drafts specific impacts, risks and opportunities. It returns the same output shape as the V1 function, with confidence set honestly and every suggestion unaccepted until the user accepts it. Control comes from the contract: the agent cannot do anything the V1 function could not, it just fills the inputs better. The export must say which provider produced each pre-fill.

Two rules for whoever builds any provider. Never pre-accept. And when the honest answer is "it depends on facts we don't have", say "needs a look" rather than guessing.

## Topics

V1 uses the ten ESRS sustainability matters from ESRS 1 AR 16: climate change, pollution, water and marine resources, biodiversity and ecosystems, circular economy, own workforce, workers in the value chain, affected communities, consumers and end users, business conduct. It is the list EFRAG IG 1 tells you to start from, a CSRD-bound customer thinks in these terms, and ten is a number an SME will finish. The revised ESRS demoted the list to illustrative, so nothing in the interface calls it required.

Sub-topics, roughly 35, come from the same source and appear only inside a topic card after the topic survives screening.

The taxonomy is pluggable. An assessment records which taxonomy it runs on. The SDGs are the obvious second one, for a company that wants to show how it contributes rather than what it affects. GRI is another. A consultant may bring their own. The scoring model is the same for all of them.

The user can add entity-specific topics. They screen and score like the others, get no pre-fill and say so, and land in the C1 and C2 narrative because no numbered disclosure covers them. Rare, and essential for the companies that need it.

## The flow

Five steps. Target 30 minutes for a first assessment.

1. Set up. Confirm the sector code pulled from B1. Answer the six intake questions. Tick who you have talked to and write a line on what they said. The stakeholder panel is a small note in the report for now, not an engagement programme, and the interface says so.

2. Screening. The ten topics in one list, each pre-answered with its source label showing. Three buttons: relevant, not sure, not relevant. Every "not relevant" needs one line of reason, with suggested reasons as clickable chips. "Not sure" carries the topic forward. An "add your own topic" row at the bottom. Typically four to seven topics survive.

3. Scoring. One card per survivor, as an accordion so one is open at a time. Sub-topic chips, value chain chips, the actual-or-potential toggle, then the two anchored questions per side. Computed scores update live with the arithmetic visible. A quiet "add specific impacts, risks and opportunities" link opens free text now and structured IRO scoring later.

4. Results. A ranked list first, with the material topics above a visible line and the rest below it, and the matrix behind a tab. The matrix is what people expect and what the standards never required. Topics ruled out at screening stay visible with their reasons, because those reasons are the most scrutinised part of the assessment.

5. Handover. Validity dates. The material topic list. A per-topic "doing something / not yet" toggle, which belongs to the report but is shown here so the two lists sit side by side. Then the 2x2: material and on it, material and nothing running, not material but doing it anyway, not material and nothing running. The second box is where the value is and the copy there has to be matter-of-fact, because if it reads as an accusation people will score topics down to keep it empty. One button sends the result to the current report.

## Export

A PDF and a JSON. The PDF is what a buyer or bank receives, so it reads as a document: method, who was consulted, the topic-by-topic result with scores and reasoning, the reasons for every topic ruled out, the matrix, and the version stamps. Method version, seed version, anchor set, provider, date, sign-off. The stamps are what turn a chart into evidence.

## UI and design system

The prototype is the starting point for the UI and UX description. Its structure holds. Its colours, fonts and spacing do not carry over. They are a placeholder theme for the prototype only.

The feature follows the app's design system and is built from shadcn/ui, so every visual decision must come from the app's theme tokens and nothing in this feature may hard-code a colour, a font or a radius. If the app's theme changes, the feature changes with it, without edits.

Component mapping, so the build starts from the right primitives:

The stepper is a vertical list of Button variants with an active state, or the app's existing stepper if one exists. Cards are Card. The three-way relevance control and the yes/no/not-sure intake are ToggleGroup, single select. Sub-topic and value chain chips are ToggleGroup, multi select, or Toggle. The anchored scales are RadioGroup with the anchor text as the label, never a Slider. Skip reasons and notes are Textarea, suggested reasons are Badge-styled Toggles. The score readout is plain text in the app's display numeral style. Results tabs are Tabs. The ranked list is Table, the 2x2 is four Cards in a grid, the matrix is a Highcharts scatter with the threshold lines drawn, themed from the same tokens. The expand-for-detail affordance is Collapsible. Provenance labels are Badge with a variant per source.

Semantic colour for "needs a look" and for the "material, nothing running" box comes from the app's warning token, not a colour of this feature's own.

## Not in V1

Full IRO decomposition with per-IRO scoring. Stakeholder surveys and transcript analysis. Time horizons beyond the three-year default. Separate positive-impact scoring. Agent-driven pre-fill. SDG or other taxonomies. Peer benchmarking. Consultant multi-client workspace. Draft prose for the narrative slots. Each has a backlog entry with the V1 seam that keeps it cheap.

## How we will know it worked

More than 70% of companies who start screening finish it. Median time to a first complete assessment under 35 minutes. More than half of completed assessments get sent to a report. Companies change at least three seeded suggestions on average, since zero means rubber-stamping and ten means our seeds are wrong. Fewer than 5% of assessments produce zero material topics. At least one topic per assessment lands in "material, nothing running yet", because an assessment where every material topic is already handled is either a very good company or one that scored around the awkward box. The annual check-in takes under three minutes.

## Open questions

Left open on purpose. Pick up when the build starts.

1. Is 3.3 the right static line, or 3.0? At 3.3 an actual impact scored "moderate" is not material. That is a lean against over-reporting and it may be too strong for social topics.
2. Three years of validity as the default. Should it vary by company size?
3. A mid-cycle revision of a valid assessment: a version, or a new assessment? Leaning version, with reports that cited the old one keeping their citation.
4. How much do we say about the fact that VS does not require this? One honest sentence on the intro screen, probably.
5. Norwegian and English from day one, or English first? The anchor wording is the hard part to translate and bad anchors break the model.
6. Who owns the seed library, and where does the first draft of it come from? We have no such data today.
7. The "doing something" toggle is shown at the handover for the demo. In the product it may belong entirely on the report side. Decide when B2 is designed.
8. Whether the intake questions are fixed or vary by sector. Six fixed questions ship first.

## Sources

- [EFRAG IG 1: Materiality Assessment Implementation Guidance](https://www.efrag.org/sites/default/files/sites/webpublishing/SiteAssets/IG%201%20Materiality%20Assessment_final.pdf)
- [Understanding the New European Voluntary Standard (VS) for SMEs, ExecutESG](https://executesg.com/resources/blog/vsme-renamed-voluntary-standard-vs)
- [VSME standard explained, Karomia](https://www.karomia.eu/vsme-guide)
- [The ESRS adjustments to the double materiality assessment, CSR Tools](https://csr-tools.com/en/blog-en/csrd-en/the-esrs-adjustments-to-the-double-materiality-assessment/)
- [Materiality analysis, CSR Tools](https://csr-tools.com/en/materiality-analysis/)
- [Q&A on the Recommendation on a voluntary sustainability reporting standard for SMEs, European Commission](https://finance.ec.europa.eu/publications/questions-and-answers-recommendation-voluntary-sustainability-reporting-standard-small-and-medium_en)
