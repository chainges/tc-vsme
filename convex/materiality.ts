import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { requireUserId, requireOrgId, getOrgId } from "./_utils/auth"
import {
  ESRS_TOPICS,
  STAKEHOLDER_GROUPS,
  applyIntakePrefill,
} from "./materialityConstants"

const STATIC_THRESHOLD = 3.3

function roundScore(value: number): number {
  return Math.round(value * 10) / 10
}

function calculateMateriality(
  impactEffective: number,
  financialEffective: number,
  severeHumanRights: boolean,
  legalObligation: boolean,
  threshold: number = STATIC_THRESHOLD,
) {
  const materialOn: ("impact" | "financial")[] = []
  if (impactEffective >= threshold) {
    materialOn.push("impact")
  }
  if (financialEffective >= threshold) {
    materialOn.push("financial")
  }

  let isMaterial = materialOn.length > 0 || severeHumanRights || legalObligation
  let materialityBasis: "threshold" | "severeHumanRights" | "legalObligation" | "manual" | undefined

  if (severeHumanRights) {
    materialityBasis = "severeHumanRights"
  } else if (legalObligation) {
    materialityBasis = "legalObligation"
  } else if (materialOn.length > 0) {
    materialityBasis = "threshold"
  }

  return { isMaterial, materialOn, materialityBasis }
}

export const getAssessment = query({
  args: {
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const authOrgId = await getOrgId(ctx)
    const orgId = args.orgId || authOrgId
    if (!orgId) {
      return null
    }

    const assessment = await ctx.db
      .query("materialityAssessments")
      .withIndex("by_org", (q) => q.eq("organizationId", orgId))
      .order("desc")
      .first()

    if (!assessment) {
      return null
    }

    const topics = await ctx.db
      .query("materialityTopics")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", assessment._id))
      .collect()

    topics.sort((a, b) => a.sortOrder - b.sortOrder)

    const stakeholders = await ctx.db
      .query("materialityStakeholders")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", assessment._id))
      .collect()

    const events = await ctx.db
      .query("materialityEvents")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", assessment._id))
      .order("desc")
      .take(50)

    return {
      assessment,
      topics,
      stakeholders,
      events,
    }
  },
})

export const getReportTopicStatuses = query({
  args: {
    reportingYear: v.number(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const authOrgId = await getOrgId(ctx)
    const orgId = args.orgId || authOrgId
    if (!orgId) {
      return []
    }

    return await ctx.db
      .query("reportTopicStatus")
      .withIndex("by_org_year", (q) =>
        q.eq("orgId", orgId).eq("reportingYear", args.reportingYear),
      )
      .collect()
  },
})

export const createOrGetAssessment = mutation({
  args: {
    naceCode: v.optional(v.string()),
    financialBasis: v.optional(
      v.union(
        v.literal("revenue"),
        v.literal("operatingProfit"),
        v.literal("totalAssets"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const orgId = await requireOrgId(ctx)

    const existing = await ctx.db
      .query("materialityAssessments")
      .withIndex("by_org", (q) => q.eq("organizationId", orgId))
      .order("desc")
      .first()

    if (existing) {
      return existing._id
    }

    let naceCode = args.naceCode
    if (!naceCode) {
      const org = await ctx.db
        .query("organizations")
        .withIndex("by_clerkOrgId", (q) => q.eq("clerkOrgId", orgId))
        .first()
      if (org?.naceCode) {
        naceCode = org.naceCode
      }
    }

    const assessmentId = await ctx.db.insert("materialityAssessments", {
      organizationId: orgId,
      validityMonths: 36,
      status: "draft",
      threshold: STATIC_THRESHOLD,
      taxonomy: "esrs-ar16-2026",
      methodVersion: "topic-level-v1",
      prefillProvider: "seed+intake-v1",
      seedNaceCode: naceCode,
      financialBasis: args.financialBasis || "revenue",
    })

    const initialPrefills = applyIntakePrefill([], naceCode)

    for (let i = 0; i < initialPrefills.length; i++) {
      const p = initialPrefills[i]
      const occurrence: "actual" | "potential" = "potential"
      const impactSeverity = p.impactSeverity ?? 3
      const impactLikelihood = 3
      const impactComputed = roundScore((impactSeverity + impactLikelihood) / 2)

      const financialMagnitude = p.financialMagnitude ?? 2
      const financialLikelihood = 3
      const financialComputed = roundScore((financialMagnitude + financialLikelihood) / 2)

      const { isMaterial, materialOn, materialityBasis } = calculateMateriality(
        impactComputed,
        financialComputed,
        false,
        false,
        STATIC_THRESHOLD,
      )

      await ctx.db.insert("materialityTopics", {
        assessmentId,
        topicKey: p.topicKey,
        sortOrder: i,
        screening: p.screening,
        subtopics: p.subtopics,
        valueChain: p.valueChain,
        impactOccurrence: occurrence,
        impactSeverity,
        impactLikelihood,
        impactScore: {
          computed: impactComputed,
          effective: impactComputed,
        },
        financialMagnitude,
        financialLikelihood,
        financialScore: {
          computed: financialComputed,
          effective: financialComputed,
        },
        severeHumanRightsFlag: false,
        legalObligationFlag: false,
        isMaterial,
        materialOn,
        materialityBasis,
        prefillSource: p.source,
        prefillNote: p.note,
        prefillConfidence: p.confidence,
        seedSuggestion: {
          screening: p.screening,
          impactSeverity: p.impactSeverity,
          financialMagnitude: p.financialMagnitude,
          subtopics: p.subtopics,
          valueChain: p.valueChain,
        },
      })
    }

    for (const group of STAKEHOLDER_GROUPS) {
      await ctx.db.insert("materialityStakeholders", {
        assessmentId,
        group: group.key,
        customLabel: group.label,
        engaged: false,
      })
    }

    await ctx.db.insert("materialityEvents", {
      assessmentId,
      at: Date.now(),
      userId,
      kind: "created",
      reason: "Initial assessment created with default ESRS 1 AR 16 seed pre-fill",
    })

    return assessmentId
  },
})

export const saveIntakeAndStakeholders = mutation({
  args: {
    assessmentId: v.id("materialityAssessments"),
    intake: v.array(
      v.object({
        key: v.string(),
        answer: v.union(v.literal("yes"), v.literal("no"), v.literal("unsure")),
      }),
    ),
    stakeholders: v.array(
      v.object({
        group: v.string(),
        customLabel: v.optional(v.string()),
        engaged: v.boolean(),
        whatTheySaid: v.optional(v.string()),
      }),
    ),
    applyPrefillToTopics: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const assessment = await ctx.db.get(args.assessmentId)
    if (!assessment) {
      throw new Error("Assessment not found")
    }

    await ctx.db.patch(args.assessmentId, {
      intake: args.intake,
      status: assessment.status === "draft" ? "screening" : assessment.status,
    })

    const existingStakeholders = await ctx.db
      .query("materialityStakeholders")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", args.assessmentId))
      .collect()

    for (const st of args.stakeholders) {
      const match = existingStakeholders.find((s) => s.group === st.group)
      if (match) {
        await ctx.db.patch(match._id, {
          engaged: st.engaged,
          whatTheySaid: st.whatTheySaid,
          customLabel: st.customLabel,
        })
      } else {
        await ctx.db.insert("materialityStakeholders", {
          assessmentId: args.assessmentId,
          group: st.group,
          customLabel: st.customLabel,
          engaged: st.engaged,
          whatTheySaid: st.whatTheySaid,
        })
      }
    }

    if (args.applyPrefillToTopics) {
      const prefills = applyIntakePrefill(args.intake, assessment.seedNaceCode)
      const existingTopics = await ctx.db
        .query("materialityTopics")
        .withIndex("by_assessment", (q) => q.eq("assessmentId", args.assessmentId))
        .collect()

      for (const p of prefills) {
        const topic = existingTopics.find((t) => t.topicKey === p.topicKey)
        if (topic) {
          await ctx.db.patch(topic._id, {
            screening: p.screening,
            prefillSource: p.source,
            prefillNote: p.note,
            prefillConfidence: p.confidence,
          })
        }
      }
    }

    await ctx.db.insert("materialityEvents", {
      assessmentId: args.assessmentId,
      at: Date.now(),
      userId,
      kind: "intakeAnswered",
      reason: "Updated setup intake questions and stakeholder engagement details",
    })
  },
})

export const updateTopicScreening = mutation({
  args: {
    topicId: v.id("materialityTopics"),
    screening: v.union(
      v.literal("relevant"),
      v.literal("notRelevant"),
      v.literal("notSure"),
    ),
    skipReason: v.optional(v.string()),
    skipReasonSource: v.optional(
      v.union(v.literal("suggested"), v.literal("custom")),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const topic = await ctx.db.get(args.topicId)
    if (!topic) {
      throw new Error("Topic not found")
    }

    let isMaterial = topic.isMaterial
    if (args.screening === "notRelevant") {
      isMaterial = false
    } else {
      const impactScore = topic.impactScore?.effective ?? 3
      const financialScore = topic.financialScore?.effective ?? 2.5
      isMaterial =
        impactScore >= STATIC_THRESHOLD ||
        financialScore >= STATIC_THRESHOLD ||
        topic.severeHumanRightsFlag ||
        topic.legalObligationFlag
    }

    await ctx.db.patch(args.topicId, {
      screening: args.screening,
      skipReason: args.skipReason,
      skipReasonSource: args.skipReasonSource,
      isMaterial,
    })

    await ctx.db.insert("materialityEvents", {
      assessmentId: topic.assessmentId,
      at: Date.now(),
      userId,
      kind: "screeningAnswered",
      topicRowId: topic._id,
      before: { screening: topic.screening, skipReason: topic.skipReason },
      after: { screening: args.screening, skipReason: args.skipReason },
    })
  },
})

export const addCustomTopic = mutation({
  args: {
    assessmentId: v.id("materialityAssessments"),
    customLabel: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const labelTrimmed = args.customLabel.trim()
    if (!labelTrimmed) {
      throw new Error("Label is required")
    }

    const slug = labelTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const topicKey = `custom:${slug}`

    const existing = await ctx.db
      .query("materialityTopics")
      .withIndex("by_assessment", (q) => q.eq("assessmentId", args.assessmentId))
      .collect()

    const impactSeverity = 3
    const impactLikelihood = 3
    const impactComputed = 3
    const financialMagnitude = 3
    const financialLikelihood = 3
    const financialComputed = 3

    const topicId = await ctx.db.insert("materialityTopics", {
      assessmentId: args.assessmentId,
      topicKey,
      customLabel: labelTrimmed,
      sortOrder: existing.length,
      screening: "relevant",
      subtopics: [],
      valueChain: ["own"],
      impactOccurrence: "potential",
      impactSeverity,
      impactLikelihood,
      impactScore: {
        computed: impactComputed,
        effective: impactComputed,
      },
      financialMagnitude,
      financialLikelihood,
      financialScore: {
        computed: financialComputed,
        effective: financialComputed,
      },
      severeHumanRightsFlag: false,
      legalObligationFlag: false,
      isMaterial: false,
      materialOn: [],
      prefillSource: "none",
      prefillNote: "Entity-specific topic added by company.",
      prefillConfidence: 1,
    })

    await ctx.db.insert("materialityEvents", {
      assessmentId: args.assessmentId,
      at: Date.now(),
      userId,
      kind: "topicAdded",
      topicRowId: topicId,
      after: { topicKey, customLabel: labelTrimmed },
    })

    return topicId
  },
})

export const updateTopicScoring = mutation({
  args: {
    topicId: v.id("materialityTopics"),
    subtopics: v.optional(v.array(v.string())),
    valueChain: v.optional(
      v.array(
        v.union(v.literal("own"), v.literal("upstream"), v.literal("downstream")),
      ),
    ),
    impactOccurrence: v.optional(
      v.union(v.literal("actual"), v.literal("potential")),
    ),
    impactSeverity: v.optional(v.number()),
    impactLikelihood: v.optional(v.number()),
    impactOverride: v.optional(v.number()),
    impactOverrideReason: v.optional(v.string()),
    financialMagnitude: v.optional(v.number()),
    financialLikelihood: v.optional(v.number()),
    financialOverride: v.optional(v.number()),
    financialOverrideReason: v.optional(v.string()),
    severeHumanRightsFlag: v.optional(v.boolean()),
    legalObligationFlag: v.optional(v.boolean()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const topic = await ctx.db.get(args.topicId)
    if (!topic) {
      throw new Error("Topic not found")
    }

    const occurrence = args.impactOccurrence ?? topic.impactOccurrence ?? "potential"
    const severity = args.impactSeverity ?? topic.impactSeverity ?? 3
    const likelihood = occurrence === "actual" ? 5 : (args.impactLikelihood ?? topic.impactLikelihood ?? 3)

    const impactComputed = roundScore(
      occurrence === "actual" ? severity : (severity + likelihood) / 2,
    )
    const impactEffective = args.impactOverride !== undefined ? args.impactOverride : impactComputed

    const magnitude = args.financialMagnitude ?? topic.financialMagnitude ?? 2
    const finLikelihood = args.financialLikelihood ?? topic.financialLikelihood ?? 3
    const finComputed = roundScore((magnitude + finLikelihood) / 2)
    const finEffective = args.financialOverride !== undefined ? args.financialOverride : finComputed

    const severeRights = args.severeHumanRightsFlag ?? topic.severeHumanRightsFlag ?? false
    const legalObligation = args.legalObligationFlag ?? topic.legalObligationFlag ?? false

    const { isMaterial, materialOn, materialityBasis } = calculateMateriality(
      impactEffective,
      finEffective,
      severeRights,
      legalObligation,
      STATIC_THRESHOLD,
    )

    await ctx.db.patch(args.topicId, {
      subtopics: args.subtopics ?? topic.subtopics,
      valueChain: args.valueChain ?? topic.valueChain,
      impactOccurrence: occurrence,
      impactSeverity: severity,
      impactLikelihood: likelihood,
      impactScore: {
        computed: impactComputed,
        override: args.impactOverride,
        overrideReason: args.impactOverrideReason,
        effective: impactEffective,
      },
      financialMagnitude: magnitude,
      financialLikelihood: finLikelihood,
      financialScore: {
        computed: finComputed,
        override: args.financialOverride,
        overrideReason: args.financialOverrideReason,
        effective: finEffective,
      },
      severeHumanRightsFlag: severeRights,
      legalObligationFlag: legalObligation,
      isMaterial: topic.screening === "notRelevant" ? false : isMaterial,
      materialOn,
      materialityBasis,
      notes: args.notes ?? topic.notes,
    })

    if (args.impactOverride !== undefined || args.financialOverride !== undefined) {
      await ctx.db.insert("materialityEvents", {
        assessmentId: topic.assessmentId,
        at: Date.now(),
        userId,
        kind: "scoreOverridden",
        topicRowId: topic._id,
        after: {
          impactOverride: args.impactOverride,
          financialOverride: args.financialOverride,
        },
      })
    }
  },
})

export const updateReportTopicStatus = mutation({
  args: {
    reportingYear: v.number(),
    topicKey: v.string(),
    addressed: v.boolean(),
    whatWeDo: v.optional(v.string()),
    narrativeSlot: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const orgId = await requireOrgId(ctx)

    const existing = await ctx.db
      .query("reportTopicStatus")
      .withIndex("by_org_year_topic", (q) =>
        q
          .eq("orgId", orgId)
          .eq("reportingYear", args.reportingYear)
          .eq("topicKey", args.topicKey),
      )
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        addressed: args.addressed,
        whatWeDo: args.whatWeDo ?? existing.whatWeDo,
        narrativeSlot: args.narrativeSlot ?? existing.narrativeSlot,
      })
      return existing._id
    }

    return await ctx.db.insert("reportTopicStatus", {
      orgId,
      reportingYear: args.reportingYear,
      topicKey: args.topicKey,
      addressed: args.addressed,
      whatWeDo: args.whatWeDo,
      narrativeSlot: args.narrativeSlot,
    })
  },
})

export const signOffAssessment = mutation({
  args: {
    assessmentId: v.id("materialityAssessments"),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx)
    const now = new Date()
    const assessedAt = now.toISOString().split("T")[0]

    const validUntilDate = new Date(now)
    validUntilDate.setFullYear(validUntilDate.getFullYear() + 3)
    const validUntil = validUntilDate.toISOString().split("T")[0]

    await ctx.db.patch(args.assessmentId, {
      status: "valid",
      assessedAt,
      validUntil,
      completedAt: Date.now(),
      signedOffBy: userId,
      signedOffRole: args.role ?? "Sustainability Lead",
    })

    await ctx.db.insert("materialityEvents", {
      assessmentId: args.assessmentId,
      at: Date.now(),
      userId,
      kind: "completed",
      reason: "Assessment completed and signed off with 3-year validity.",
    })
  },
})
