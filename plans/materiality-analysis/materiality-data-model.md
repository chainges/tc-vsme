# Materiality assessment: data model sketch

Companion to the materiality assessment PRD. Convex schema, written so the topic-level V1 grows into IRO-level scoring, stakeholder surveys and consultant workspaces without a migration.

## The boundary this schema draws

The assessment owns which topics matter and why. The report owns what the company does about them.

So there is no `addressed` field anywhere below, and there should not be. Whether a company has a waste programme running belongs to the report year, changes annually, and must never tempt anyone into editing a signed-off assessment to record it. The report side carries it, keyed by report and topic:

```ts
reportTopicStatus: defineTable({
  reportId: v.id("reports"),
  topicKey: v.string(),                      // same namespaced string as the assessment
  addressed: v.boolean(),                    // is anything running
  whatWeDo: v.optional(v.string()),          // the free text that satisfies a material topic
  narrativeSlot: v.optional(v.string()),     // "C1" | "C2" | "otherMaterialTopics"
  b2InitiativeId: v.optional(v.id("b2Initiatives")),  // "doing something" lands in B2. Table TBD when B2 is designed.
  targetId: v.optional(v.id("targets")),
}).index("by_report", ["reportId"]),
```

`whatWeDo` is the field that carries most of the value. A material topic with no numbered disclosure is satisfied by a few honest sentences, and this is where they live.

Reports point at an assessment, not the other way round, because one assessment feeds three annual reports:

```ts
// on the reports table
materialityAssessmentId: v.optional(v.id("materialityAssessments")),
```

## The four decisions that make it extensible

**Topic rows are their own table, not a field on the assessment.** Tempting to store ten topics as an array on the assessment document. Don't. IROs, stakeholder input and per-topic history all need something to point at, and a Convex document ID is that thing. An array element has no ID.

**The IRO table ships in V1, holding free text.** V1 writes one optional row per topic with a `note` and nothing else. V2 writes many rows per topic with `kind`, `severity`, `likelihood` and the rest. Same table, same parent, no data movement. The free text a user wrote in 2026 still sits under the right topic in 2027.

**Every score is stored twice: computed and effective.** The arithmetic produces `computed`, the user may set `override` with a `reason`, and `effective` is what the result uses. Storing only the final number destroys the audit trail, which is the whole point of the export.

**Validity dates, not a reporting period.** The assessment is good for about three years and feeds several annual reports. Storing a reporting period on it would force one assessment per year, which is the busywork the three-year cycle exists to avoid.

**Version stamps on the assessment, not global config.** `seedVersion`, `anchorSetId` and `methodVersion` are copied onto the assessment when it starts. Change the seed library tomorrow and last year's assessment still reproduces exactly. This is boring and it is the difference between evidence and a picture.

## Schema

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const score = v.union(v.literal(1), v.literal(2), v.literal(3), v.literal(4), v.literal(5));

// One score with its provenance. Used for every number in the model.
const scoredValue = v.object({
  computed: v.optional(v.number()),      // from the anchors
  override: v.optional(v.number()),      // user disagreed
  overrideReason: v.optional(v.string()), // required when override is set
  effective: v.number(),                  // what the result uses
});

// Topic keys are strings, namespaced by taxonomy, so the assessment can run
// on ESRS today and SDGs or a consultant's own list later without a migration.
// V1 ships one taxonomy. Its keys, as a TypeScript type for the seed code:
//   "esrs:climate" | "esrs:pollution" | "esrs:water" | "esrs:biodiversity" |
//   "esrs:circular" | "esrs:ownWorkforce" | "esrs:valueChainWorkers" |
//   "esrs:communities" | "esrs:consumers" | "esrs:businessConduct"
// Entity-specific topics use "custom:<slug>".
const topicKey = v.string();

const prefillSource = v.union(
  v.literal("sector"),    // the curated seed table
  v.literal("answers"),   // the intake questions
  v.literal("report"),    // figures already in a VS report (year two onward)
  v.literal("agent"),     // a model-driven provider, later
  v.literal("check"),     // nothing settles it, go and look
  v.literal("none"),      // entity-specific topic, no pre-fill
);

const valueChainSegment = v.union(
  v.literal("own"),
  v.literal("upstream"),
  v.literal("downstream"),
);

export default defineSchema({
  // ---------------------------------------------------------------
  // The assessment
  // ---------------------------------------------------------------
  materialityAssessments: defineTable({
    organizationId: v.id("organizations"),

    // Validity, not a reporting period. One assessment feeds several annual
    // reports, so reports point at the assessment, never the reverse.
    assessedAt: v.optional(v.string()),      // ISO date, set on sign-off
    validUntil: v.optional(v.string()),      // assessedAt + 3 years by default
    validityMonths: v.number(),              // default 36, editable per client

    status: v.union(
      v.literal("draft"),
      v.literal("screening"),
      v.literal("scoring"),
      v.literal("valid"),                    // signed off, inside validUntil
      v.literal("expired"),                  // past validUntil, reports show it as stale
      v.literal("superseded"),               // a newer assessment replaced it early
    ),

    // The line. Static config (3.3 in V1), stamped here so the assessment
    // reproduces if the constant ever changes. Not a user setting.
    threshold: v.number(),

    // Which taxonomy the topics come from. "esrs-ar16-2026" in V1.
    taxonomy: v.string(),

    // Version stamps. Copied in at creation, never updated in place.
    methodVersion: v.string(),               // e.g. "topic-level-v1"
    anchorSetId: v.id("materialityAnchorSets"),

    // Which pre-fill provider ran, and with what. The provider is the seam
    // that lets a curated table become an agent without a schema change.
    prefillProvider: v.string(),             // "seed+intake-v1", later "agent-v1"
    prefillVersion: v.optional(v.string()),  // seed table version, e.g. "2026.1"
    seedNaceCode: v.optional(v.string()),

    // The intake answers. Six fixed questions in V1. Stored here, not in a
    // table, because they are inputs to the pre-fill and belong with it.
    intake: v.optional(v.array(v.object({
      key: v.string(),                       // "sites" | "build" | "subcontract" | ...
      answer: v.union(v.literal("yes"), v.literal("no"), v.literal("unsure")),
    }))),
    financialBasis: v.union(                 // what magnitude anchors compare against
      v.literal("revenue"),
      v.literal("operatingProfit"),
      v.literal("totalAssets"),
    ),

    // Sign-off, for the PDF.
    completedAt: v.optional(v.number()),
    signedOffBy: v.optional(v.id("users")),
    signedOffRole: v.optional(v.string()),

    // Annual refresh: points at the assessment this was copied from.
    copiedFromId: v.optional(v.id("materialityAssessments")),
  })
    .index("by_org", ["organizationId"])
    .index("by_org_status", ["organizationId", "status"]),

  // ---------------------------------------------------------------
  // The annual check-in. Two minutes: "still right?" A recorded "we
  // reviewed it and nothing changed" is itself a disclosure.
  // ---------------------------------------------------------------
  materialityReviews: defineTable({
    assessmentId: v.id("materialityAssessments"),
    reportId: v.id("reports"),               // the report year that prompted it
    reviewedAt: v.number(),
    reviewedBy: v.optional(v.id("users")),
    outcome: v.union(
      v.literal("unchanged"),                // carries on, no new assessment
      v.literal("revised"),                  // a version was cut
      v.literal("rerun"),                    // a fresh assessment was started
    ),
    triggers: v.array(v.union(               // what prompted the prompt
      v.literal("scheduled"),
      v.literal("sectorCodeChanged"),
      v.literal("headcountJumped"),
      v.literal("newSite"),
      v.literal("newBusinessLine"),
      v.literal("seriousIncident"),
      v.literal("standardChanged"),
      v.literal("userInitiated"),
    )),
    note: v.optional(v.string()),
    newAssessmentId: v.optional(v.id("materialityAssessments")),
  })
    .index("by_assessment", ["assessmentId"])
    .index("by_report", ["reportId"]),

  // ---------------------------------------------------------------
  // One row per topic per assessment
  // ---------------------------------------------------------------
  materialityTopics: defineTable({
    assessmentId: v.id("materialityAssessments"),
    topicKey,
    customLabel: v.optional(v.string()),     // only for "custom:*" topics
    sortOrder: v.number(),

    // Screening
    screening: v.union(
      v.literal("relevant"),
      v.literal("notRelevant"),
      v.literal("notSure"),
      v.literal("unanswered"),
    ),
    skipReason: v.optional(v.string()),      // required when notRelevant
    skipReasonSource: v.optional(v.union(    // did they pick a suggestion or write it
      v.literal("suggested"),
      v.literal("custom"),
    )),

    subtopics: v.array(v.string()),          // ESRS sub-topic keys
    valueChain: v.array(valueChainSegment),

    // Impact side
    impactOccurrence: v.optional(v.union(v.literal("actual"), v.literal("potential"))),
    impactSeverity: v.optional(score),
    impactLikelihood: v.optional(score),     // null when occurrence is actual
    impactScore: v.optional(scoredValue),

    // Financial side
    financialMagnitude: v.optional(score),
    financialLikelihood: v.optional(score),
    financialScore: v.optional(scoredValue),

    // Hard rules that bypass the arithmetic
    severeHumanRightsFlag: v.boolean(),
    legalObligationFlag: v.boolean(),

    // Outcome
    isMaterial: v.boolean(),
    materialOn: v.array(v.union(             // empty, or one or both
      v.literal("impact"),
      v.literal("financial"),
    )),
    materialityBasis: v.optional(v.union(    // what actually decided it
      v.literal("threshold"),
      v.literal("severeHumanRights"),
      v.literal("legalObligation"),
      v.literal("manual"),
    )),

    notes: v.optional(v.string()),

    // Where the pre-answer the user saw came from. Answers beat sector,
    // report beats both, and "check" means nothing settled it. Recorded so the
    // export can say which suggestions came from the company's own input.
    prefillSource: v.optional(prefillSource),
    prefillNote: v.optional(v.string()),        // the line shown under the topic
    prefillConfidence: v.optional(v.number()),  // 0 to 1. V1 writes 1 for answers, 0.6 for sector, 0 for check

    // What the seed suggested, kept for the "how much did they change" metric
    seedSuggestion: v.optional(v.object({
      screening: v.optional(v.string()),
      impactSeverity: v.optional(v.number()),
      financialMagnitude: v.optional(v.number()),
      subtopics: v.optional(v.array(v.string())),
      valueChain: v.optional(v.array(valueChainSegment)),
    })),
  })
    .index("by_assessment", ["assessmentId"])
    .index("by_assessment_topic", ["assessmentId", "topicKey"]),

  // ---------------------------------------------------------------
  // Impacts, risks and opportunities.
  // V1 writes at most one row per topic, with only `note` filled.
  // V2 writes many, with the scoring fields.
  // ---------------------------------------------------------------
  materialityIros: defineTable({
    topicRowId: v.id("materialityTopics"),
    assessmentId: v.id("materialityAssessments"),   // denormalised for cheap export queries

    kind: v.optional(v.union(
      v.literal("impact"),
      v.literal("risk"),
      v.literal("opportunity"),
    )),
    direction: v.optional(v.union(v.literal("negative"), v.literal("positive"))),
    occurrence: v.optional(v.union(v.literal("actual"), v.literal("potential"))),

    title: v.optional(v.string()),
    note: v.optional(v.string()),            // the V1 free-text field

    valueChain: v.optional(v.array(valueChainSegment)),
    timeHorizon: v.optional(v.union(         // V2
      v.literal("short"),
      v.literal("medium"),
      v.literal("long"),
    )),

    // V2 scoring, split the way EFRAG splits it
    scale: v.optional(score),
    scope: v.optional(score),
    irremediability: v.optional(score),
    likelihood: v.optional(score),
    financialMagnitude: v.optional(score),

    computedScore: v.optional(v.number()),
    source: v.union(                         // where it came from
      v.literal("user"),
      v.literal("seed"),
      v.literal("suggested"),                // V2, model-generated
    ),
  })
    .index("by_topic", ["topicRowId"])
    .index("by_assessment", ["assessmentId"]),

  // ---------------------------------------------------------------
  // Stakeholder engagement.
  // V1 writes one row per checked group with an optional note.
  // V2 attaches survey responses to the same rows.
  // ---------------------------------------------------------------
  materialityStakeholders: defineTable({
    assessmentId: v.id("materialityAssessments"),
    group: v.union(
      v.literal("employees"),
      v.literal("customers"),
      v.literal("suppliers"),
      v.literal("owners"),
      v.literal("lenders"),
      v.literal("community"),
      v.literal("regulators"),
      v.literal("other"),
    ),
    customLabel: v.optional(v.string()),
    engaged: v.boolean(),
    method: v.optional(v.union(              // V2 fills this properly
      v.literal("existingDialogue"),
      v.literal("meeting"),
      v.literal("survey"),
      v.literal("workshop"),
      v.literal("proxy"),                    // expert or NGO stood in
    )),
    whatTheySaid: v.optional(v.string()),
    engagedAt: v.optional(v.string()),

    surveyId: v.optional(v.id("materialitySurveys")),   // V2
  }).index("by_assessment", ["assessmentId"]),

  // ---------------------------------------------------------------
  // Audit log. Append only. Feeds the export and the "you changed the
  // threshold on 12 March" line.
  // ---------------------------------------------------------------
  materialityEvents: defineTable({
    assessmentId: v.id("materialityAssessments"),
    at: v.number(),
    userId: v.optional(v.id("users")),
    kind: v.union(
      v.literal("created"),
      v.literal("intakeAnswered"),
      v.literal("screeningAnswered"),
      v.literal("scoreOverridden"),
      v.literal("topicAdded"),
      v.literal("completed"),
      v.literal("sentToReport"),
      v.literal("reviewed"),
      v.literal("copiedForward"),
    ),
    topicRowId: v.optional(v.id("materialityTopics")),
    before: v.optional(v.any()),
    after: v.optional(v.any()),
    reason: v.optional(v.string()),
  })
    .index("by_assessment", ["assessmentId", "at"]),

  // ---------------------------------------------------------------
  // Seed library. A table rather than bundled JSON, so we can ship
  // corrections without a deploy and consultants can fork a profile.
  // ---------------------------------------------------------------
  sectorProfiles: defineTable({
    naceCode: v.string(),                    // "41.2", or "*" for the fallback
    label: v.string(),
    version: v.string(),                     // "2026.1"
    isActive: v.boolean(),
    ownerNote: v.optional(v.string()),       // provenance shown in the UI
    reviewedAt: v.optional(v.number()),

    // Consultant fork. Null means it is ours.
    organizationId: v.optional(v.id("organizations")),
    forkedFromId: v.optional(v.id("sectorProfiles")),

    topics: v.array(v.object({
      topicKey,
      relevant: v.union(v.boolean(), v.null()),   // null means "look at this properly"
      impactSeverity: v.optional(score),
      financialMagnitude: v.optional(score),
      subtopics: v.optional(v.array(v.string())),
      valueChain: v.optional(v.array(valueChainSegment)),
      rationale: v.optional(v.string()),          // the "common for companies like yours" line
      skipReasons: v.optional(v.array(v.string())),
    })),
  })
    .index("by_nace_active", ["naceCode", "isActive"])
    .index("by_org", ["organizationId"]),

  // ---------------------------------------------------------------
  // Anchor wording. Separate table so a consultant can tune the bands
  // per client and the assessment still records which set it used.
  // ---------------------------------------------------------------
  materialityAnchorSets: defineTable({
    key: v.string(),                         // "default-2026", or a client key
    locale: v.string(),                      // "en", "nb"
    organizationId: v.optional(v.id("organizations")),
    dimensions: v.array(v.object({
      dimension: v.union(
        v.literal("impactSeverity"),
        v.literal("impactLikelihood"),
        v.literal("financialMagnitude"),
        v.literal("financialLikelihood"),
      ),
      bands: v.array(v.object({
        value: score,
        label: v.string(),
        description: v.string(),
      })),
    })),
  }).index("by_key_locale", ["key", "locale"]),

  // ---------------------------------------------------------------
  // V2 only. Declared here so the shape is agreed, not built yet.
  // ---------------------------------------------------------------
  materialitySurveys: defineTable({
    assessmentId: v.id("materialityAssessments"),
    audience: v.string(),
    token: v.string(),
    openedAt: v.optional(v.number()),
    closedAt: v.optional(v.number()),
    responseCount: v.number(),
  }).index("by_assessment", ["assessmentId"]),
});
```

## The pre-fill provider contract

The seam that matters most. A provider takes what we know about a company and returns a suggestion per topic. The V1 provider is a pure function over a curated table and six intake answers. A later one is an agent. Both return this shape, and the assessment stores which one ran.

```ts
export type PrefillInput = {
  taxonomy: string;                 // "esrs-ar16-2026"
  naceCode?: string;
  intake: { key: string; answer: "yes" | "no" | "unsure" }[];
  report?: ReportData;              // year two onward, optional
  orgNumber?: string;               // for an agent that looks things up
};

export type TopicPrefill = {
  topicKey: string;
  screening: "relevant" | "notRelevant" | "notSure";
  source: "sector" | "answers" | "report" | "agent" | "check";
  confidence: number;               // 0 to 1, honest
  note: string;                     // the one line shown under the topic
  impactSeverity?: 1|2|3|4|5;
  financialMagnitude?: 1|2|3|4|5;
  subtopics?: string[];
  valueChain?: ("own"|"upstream"|"downstream")[];
  skipReasons?: string[];           // suggested, when screening is notRelevant
};

export interface PrefillProvider {
  id: string;                       // "seed+intake-v1"
  run(input: PrefillInput): Promise<TopicPrefill[]>;
}
```

Rules every provider follows. Never pre-accept; the user confirms each suggestion. A signal from report data argues a topic in, never out. When nothing settles it, return `source: "check"` with `screening: "notSure"` rather than guessing. An agent provider can ask follow-up questions, but it does so through the intake array, adding keys, so the answers are stored the same way and the export can show them.

V1 implementation sketch, the whole thing:

```ts
export const seedIntakeProvider: PrefillProvider = {
  id: "seed+intake-v1",
  async run({ naceCode, intake }) {
    const profile = await loadSectorProfile(naceCode ?? "*");   // sectorProfiles table
    return profile.topics.map(t => applyIntake(t, intake));      // pure, ~60 lines
  }
};
```

`applyIntake` is the function in the prototype's `prefill()`. Port it, don't redesign it.

## Disclosure pointers

Not a control surface. The assessment never switches a datapoint on or off. This map only tells the handover screen which part of the report already collects numbers on a topic, so it can say "related: B3" next to climate change.

```ts
export const TOPIC_DISCLOSURE_POINTERS: Record<string, string[]> = {
  "esrs:climate":            ["B3", "C3", "C4"],
  "esrs:pollution":          ["B4"],
  "esrs:water":              ["B6"],
  "esrs:biodiversity":       ["B5"],
  "esrs:circular":           ["B7"],
  "esrs:ownWorkforce":       ["B8", "B9", "B10", "C5", "C6"],
  "esrs:valueChainWorkers":  ["C6", "C7"],
  "esrs:communities":        ["C7"],
  "esrs:consumers":          ["C7"],
  "esrs:businessConduct":    ["B11", "C8", "C9"],
};
```

Every topic, material or not, that the company marks "doing something" on points at B2 as well. That is the one hard connection to the report and it lives on the report side, in `reportTopicStatus`.

Verify the codes against the adopted VS text before building. They come from published summaries.

## The one test that must exist

```ts
test("an assessment changes nothing about what the report collects", async () => {
  const before = await requiredDatapoints(report);
  const assessment = await completeAssessment({ everyTopic: "notRelevant" });
  await sendToReport(assessment, report);
  expect(await requiredDatapoints(report)).toEqual(before);
});
```

If this goes red the assessment has reached into the report's datapoint logic, which it must never do.

## Derived values, not stored

Computed in a query, not written to the database, so a threshold change recalculates everything without a backfill:

- whether a topic is material
- the material topic count
- the matrix coordinates
- the "how many seed suggestions did the user change" metric, from `seedSuggestion` against the current values
- the report-derived screening signals, read live from the report's own datapoints
- the pre-fill itself, from the provider, so a changed intake answer re-runs it
- the assessment's staleness, from `validUntil` against today, so no cron job has to flip a status
- the 2x2, from the assessment's material verdicts joined against `reportTopicStatus.addressed` for the report year in question
- the disclosure scoping decisions
