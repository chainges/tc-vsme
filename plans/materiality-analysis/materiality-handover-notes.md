# Materiality assessment: notes for whoever builds it

Written 4 September 2026 at the end of the design session. Read this first, then the PRD. It records why things are the way they are, so the next agent working in the codebase does not re-open settled questions or miss the ones that were left open on purpose.

## What was decided, and why

**It runs before reporting and lasts three years.** Not a step in the report wizard. An SME's materiality does not turn over annually, and an annual re-run trains people to click through. One assessment feeds three reports. Reports point at it via `materialityAssessmentId`. It never points at a report.

**It never touches the report's datapoints.** An earlier draft had it switching if-applicable disclosures off. Eivind rejected that: the VS report has a standard set of datapoints and they get reported whatever the assessment says. The assessment connects to the report in two places only. Material topics need a few sentences somewhere (C1, C2, or an "other material topics" slot). Anything the company is already doing goes into B2. The disclosure codes in the handover screen are pointers, never switches. There is a test in the data model doc that pins this.

**The threshold is static, 3.3, not a user setting.** People converge on the centreline, and a user-set threshold invites reverse-engineering after the results. Stamped on the assessment for reproducibility. Whether 3.3 or 3.0 is right is open.

**Pre-fill is a provider behind a contract.** V1 is a pure function: curated seed table keyed by NACE, plus six intake questions, no model. It returns `TopicPrefill[]`. A future agent returns the same shape with `source: "agent"`. The assessment stores which provider ran. This is the seam that lets the simple thing become the sophisticated thing without a migration. Do not build the V1 pre-fill as inline code in a mutation; build it as the provider.

**We have no seed data yet.** The sector profiles are editorial content that has to be authored. The prototype's construction profile is a plausible example, not a source. Whoever authors the real table needs SASB's industry map, whatever ESRS sector guidance exists, and Norwegian sector bodies. A conservative fallback profile is required for NACE codes we have not covered.

**Report data is a year-two input.** On a first run there is no report, so "from your report" signals do not exist. From the second year, figures in the report can argue topics in during the check-in. They never argue a topic out.

**Topics are namespaced strings, not an enum.** `"esrs:climate"`, `"custom:night-closures"`, later `"sdg:13"`. The assessment records its `taxonomy`. The scoring model is written against a topic row and knows nothing about ESRS.

**"Doing something about it" lives on the report side.** In `reportTopicStatus`, keyed by report and topic, because it changes every year and the assessment is signed off. It is shown at the handover step in the prototype for the demo. In the product it may belong entirely to the report and B2. Decide when B2 is designed.

**The stakeholder panel is a note, for now.** Checkboxes and a text box. Small comment in the report. Formal polls and transcript analysis are backlog items 2, with the table rows already shaped to attach them.

## What the prototype is and is not

"Materiality Scoping Flow" (artifact) is the UI and UX description. The five-step structure, the accordion scoring, the ranked list before the matrix, the provenance labels, the 2x2 at handover: keep those.

Its visual theme is a placeholder. Fonts, colours, radii and spacing come from the app's shadcn theme, and nothing in the feature hard-codes any of them. The PRD has a component mapping from each screen element to a shadcn primitive.

The prototype's `prefill()` function is the V1 provider logic. Port it. The `TOPICS` array with its `seed` blocks is the shape of a sector profile row. The `ANCHORS` object is the shape of an anchor set.

## Integration points still to connect

These are the places the assessment meets the rest of the codebase. None is built yet.

- `organizations`: the assessment hangs off it. Consultant multi-client later.
- B1: the NACE code comes from here. Read it, do not duplicate it.
- `reports.materialityAssessmentId`: the pointer.
- `reportTopicStatus`: new table on the report side. `addressed`, `whatWeDo`, `narrativeSlot`, and a pointer into B2 once B2 has a table.
- B2: "doing something" becomes an initiative here. Shape undecided.
- C1 and C2: a narrative slot per material topic with no numbered home.
- The annual check-in: fires when a report year opens against a valid assessment. Needs a hook in report creation.
- Export: PDF and JSON. No renderer chosen.

## Open questions, carried

Listed in the PRD. The ones that block a build: the threshold value (3.3 or 3.0), where the seed data comes from and who owns it, and whether the "doing something" toggle appears in the assessment at all or only in the report.

## Things to not re-litigate

The matrix stays secondary. Composite scores that merge impact and financial into one number are out. Automatic materiality from emissions figures is out. A user-chosen threshold is out. Hiding report fields based on materiality is out.
