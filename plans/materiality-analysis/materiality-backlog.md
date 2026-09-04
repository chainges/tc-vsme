# Materiality assessment: deferred features

Companion to the materiality assessment PRD. Everything we deliberately left out of V1, ranked by what I would build next, with the seam that keeps each one cheap.

A seam is the small thing V1 must get right so the later feature is an addition rather than a rewrite. Most of them cost nothing now and a fortnight later.

## 1. IRO-level assessment

The company breaks a material topic into named impacts, risks and opportunities and scores each one separately, with scale, scope and irremediability split apart the way EFRAG splits them.

Why it's deferred: it is the single biggest source of drop-off in every DMA tool I looked at. An SME asked to name six impacts under climate change will name zero and close the tab.

Why it comes back: any customer heading towards CSRD needs it, consultants expect it, and topic-level scoring stops being defensible the moment a company has more than one business line.

Seam in V1: the `materialityIros` table exists and holds the free text a user writes behind the "Add specific impacts, risks and opportunities" link. Scoring fields are optional columns already declared. Nothing moves when V2 starts writing them.

Surfaced in V1 as: that link on every topic card, with a panel that explains the idea and takes free text.

## 2. Stakeholder input beyond a note

V1 records who was consulted and a line of free text. Two upgrades, in order. A formal poll: email a short questionnaire to employees, customers or suppliers, collect their topic ratings, show them alongside the company's own scores. Then transcript analysis: the company uploads or pastes notes from a board meeting or a customer review and the app pulls out what people said mattered and matches it against topics.

Why it's deferred: it turns a 30 minute task into a three week one, and V1 needs to be finishable in a sitting.

Why it comes back: it is the most common reviewer challenge to any assessment. "You say your workforce topics are low severity. Did you ask them?"

Seam in V1: `materialityStakeholders` rows already exist per group with a `method` field and an unused `surveyId`. The V1 checkbox and note become the record that a survey or a transcript later attaches to.

The interesting design question for V2 is what to do when stakeholders disagree with management. Averaging the two is the cowardly answer and it hides the finding. Showing both scores side by side, with the gap highlighted, is the useful one.

## 3. Trigger detection, and cycle-over-cycle comparison

Two related things. Spotting when something changed enough to invalidate a still-valid assessment, and, when the next one runs three years later, showing what moved.

Why it's deferred: trigger detection needs a year or two of report data before the signals mean anything, and comparison needs a second assessment, which by definition is three years out.

Why it comes back: the three-year cycle is only defensible if something is watching in between. An assessment that quietly goes wrong in month eight and nobody notices until month thirty-six is worse than an annual one.

Seam in V1: `copiedFromId` on the assessment, the `materialityReviews` table with its `triggers` array, and the full `materialityEvents` log. The annual check-in ships in V1 with `triggers: ["scheduled"]` on every row. V2 fills the other trigger values in from data the app already has: a NACE code change, a headcount that doubled, a first entry in a datapoint that sat empty for two years, a new site address.

Cheap partial version worth doing early: fire the check-in prompt when the sector code changes, since that one is a single field comparison and it invalidates the entire seed basis of the assessment.

## 4. Time horizons

Score each topic separately for short, medium and long term instead of assuming three years.

Why it's deferred: it triples the number of questions for a distinction most SMEs will answer identically across all three.

Why it comes back: climate transition risk is the case where it genuinely differs, and C4 climate risks is exactly where a reviewer will ask.

Seam in V1: `timeHorizon` declared on the IRO row, and the three-year assumption written into the anchor text rather than hard-coded in the scoring function.

Cheap partial version worth considering earlier: one extra question on climate only. "Does this look different in ten years?" Yes or no, with a note.

## 5. Positive and negative impacts scored separately

EFRAG is clear that positive impacts do not net against negative ones, and that positive impacts skip the irremediability criterion.

Why it's deferred: V1's severity anchors implicitly assume a negative impact, which covers the large majority of what an SME will record.

Why it comes back: companies with a genuine sustainability proposition, and there are more of them among SMEs than among large caps, currently have nowhere to put it and will feel misread by the tool.

Seam in V1: `direction` declared on the IRO row. The topic row's single impact score becomes the negative score, and a positive score gets added beside it rather than replacing it.

## 5b. Agent-driven pre-fill

Replace the curated seed plus six questions with a provider that looks the company up by organisation number, fills the intake from public sources, asks follow-up questions where the seed and the answers disagree, and drafts the reasons.

Why it's deferred: a curated table plus six questions gets most of the value for most SMEs, and we have no seed data yet. The table has to exist before an agent can improve on it.

Why it comes back: the intake is six questions because a human has to answer them. An agent can handle sixty, and can read the company's website, the Brønnøysund register and a tender portal before asking any.

How we control it: the provider contract in the data model. The agent returns the same `TopicPrefill[]` shape as the V1 function, with `source: "agent"` and an honest confidence. It cannot pre-accept anything, it cannot touch scores directly, and any question it asks goes into the stored intake array so the export shows it. The interface treats an agent suggestion exactly like a sector suggestion, with a different label. If the agent is wrong, the user overturns it the same way.

Seam in V1: `prefillProvider` and `prefillVersion` on the assessment, `prefillSource` and `prefillConfidence` per topic, the intake stored as an open-ended key/answer array rather than six fixed columns.

## 5c. Other taxonomies

Run the same assessment on the SDGs, GRI topics, or a consultant's own list.

Why it's deferred: ESRS AR 16 is the list a CSRD-bound customer thinks in, and one taxonomy is enough to learn whether the flow works.

Why it comes back: some companies want to show what they contribute to, not what they affect, and the SDGs are how they think about that. A consultant may have a house list.

Seam in V1: `taxonomy` on the assessment, topic keys as namespaced strings, and the scoring model written against a topic row rather than an enum. Sector profiles need a taxonomy field when this lands, since a seed for "esrs:climate" says nothing about "sdg:13".

## 6. Suggested IROs from a company description

The company writes two paragraphs about what it does. The app proposes specific impacts, risks and opportunities to accept, edit or reject.

Why it's deferred: it depends on IRO-level assessment existing first, and the failure mode is bad. A confident wrong suggestion that a busy user accepts is worse than no suggestion.

Why it comes back: this is what CSR Tools charges for, and it is the difference between the seed library knowing your sector and the tool knowing your company.

Seam in V1: `source: "suggested"` already declared on the IRO row, so proposals are distinguishable from what the user wrote. The export must be able to say which is which, and the acceptance rate is the metric that tells us whether the suggestions are any good.

Build guardrail for whenever this lands: never pre-accept a suggestion. Proposals arrive unticked.

## 7. Consultant workspace

One login, many client companies, shared templates, a portfolio view of where each assessment stands.

Why it's deferred: V1 is SME-first and a consultant can already run several client accounts, awkwardly.

Why it comes back: consultants bring five to fifty companies each. The unit economics are better than direct SME acquisition and they are the ones who will find our seed library wrong, loudly, which we want.

Seam in V1: every assessment hangs off an `organizationId`, `sectorProfiles` carries an optional `organizationId` and a `forkedFromId`, and `materialityAnchorSets` is a table rather than a constant. A consultant can already fork a sector profile and retune the anchor wording without any schema change.

## 8. Peer benchmarking

Show how a company's topic scores compare with others in the same NACE division.

Why it's deferred: needs volume. Below a few hundred assessments per sector the comparison is noise dressed as insight.

Why it comes back: it is the most requested feature in every ESG tool and it makes the seed library self-improving. Real distributions beat our editorial guesses.

Seam in V1: `seedNaceCode` and `seedSuggestion` stored on every assessment and topic row, which is what a benchmark aggregation needs. Also decide the data-sharing consent question before launch, not after, because retrofitting consent to existing data means you cannot use it.

## 9. Draft prose for the narrative slots

Every material topic with no numbered disclosure needs a few sentences. Turn the assessment into a first draft of them, so the company edits rather than stares.

Why it's deferred: narrative generation is its own project with its own review problems, and a wrong draft that gets accepted is worse than an empty box.

Why it comes back: the gap between "I finished the assessment" and "I wrote the report" is where SMEs stall, and the narrative slot is exactly where they stall. This is the highest-value item on this list after IRO scoring.

Seam in V1: value chain placement, sub-topic selection, the notes field on each topic row, and `whatWeDo` on the report side. Together they carry enough structure to draft from. Collecting them in V1 costs three clicks.

The awkward case to design for: a topic in the "material, nothing running yet" box. The draft there has to say so plainly rather than dressing up an absence, and that is a harder writing problem than the easy quadrant.

## 10. Materiality of individual datapoints

ESRS calls this information materiality: deciding not just which topics matter but which specific disclosures within them are worth reporting.

Why it's deferred: VS handles it already through the necessary, if applicable and voluntary tagging. Adding our own layer on top would confuse the report.

Why it comes back: only if we move upmarket into full ESRS reporting. Park it properly. It is not a natural extension of this feature.

## Things I would not build

Named so they stop coming up.

**A materiality matrix as the primary output.** It ships as a secondary view and an export asset, which is the right amount. Making it the main screen encourages people to move dots until the picture looks tidy.

**Weighted composite scores that combine impact and financial into one number.** They look sophisticated and they destroy the whole point of double materiality, which is that the two dimensions answer different questions and a topic material on either one is material.

**Automatic materiality from emissions data.** Tempting, because the app already has the numbers. But a company with low measured emissions can still have severe upstream impacts, and letting a number the app happens to hold decide materiality would produce confidently wrong assessments at scale.
