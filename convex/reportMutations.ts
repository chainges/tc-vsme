
import { v } from "convex/values";
//import { internal } from "./_generated/api";
import {
  internalMutation,
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import { requireOrgId, requireUserId } from "./_utils/auth";

// --------------------------------------------------
// Shared validators
// --------------------------------------------------

const reportStage = v.union(
  v.literal("processing"),
  v.literal("uploading"),
  v.literal("completed"),
  v.literal("failed")
);

const storageValidator = v.object({
  provider: v.literal("gcs"),
  bucket: v.string(),
  objectKey: v.string(),
  fileName: v.string(),
  contentType: v.string(),
  size: v.number(),
});

async function getActiveOrganizationMembership(ctx: MutationCtx | QueryCtx) {
  const [clerkId, orgId] = await Promise.all([
    requireUserId(ctx),
    requireOrgId(ctx),
  ]);
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();

  if (!user || !user.organizationIds.includes(orgId)) {
    throw new Error("Unauthorized: User is not a member of this organization");
  }

  return { user, orgId };
}

// --------------------------------------------------
// 1. Create report
// Automatically generates the next version.
// --------------------------------------------------

export const createReport = mutation({
  args: {
    reportingYear: v.number(),
  },

  handler: async (ctx, args) => {
    const {orgId} = await getActiveOrganizationMembership(ctx);

    // const organization = await ctx.db
    //   .query("organizations")
    //   .withIndex("by_clerkOrgId", (q) => q.eq("clerkOrgId", args.orgId))
    //   .unique();

    // if (!organization || organization.hasVsme === false) {
    //   throw new Error("Unauthorized: VSME reporting is not enabled for this organization");
    // }

    const latestReport = await ctx.db
      .query("reports")
      .withIndex("by_org_year_version", (q) =>
        q
          .eq("orgId", orgId)
          .eq("reportingYear", args.reportingYear)
      )
      .order("desc")
      .first();

    const nextVersion = (latestReport?.version ?? 0) + 1;

    const reportId = crypto.randomUUID();
    const now = Date.now();

    const id = await ctx.db.insert("reports", {
      orgId: orgId,
      reportingYear: args.reportingYear,
      reportId,

      version: nextVersion,
      status: "queued",
      createdAt: now,
    });

    return {
      id,
      reportId,
      version: nextVersion,
    };
  },
});

// --------------------------------------------------
// 2. Update report progress
// Invoked through the authenticated Python-backend HTTP webhook.
// --------------------------------------------------

export const updateProgress = mutation({
  args: {
    reportId: v.string(),
    status: reportStage,
  },

  handler: async (ctx, args) => {
    const report = await ctx.db
      .query("reports")
      .withIndex("by_report_id", (q) =>
        q.eq("reportId", args.reportId)
      )
      .unique();

    if (!report) {
      throw new Error("Report not found");
    }

    if (
      report.status === "completed" ||
      report.status === "failed"
    ) {
      throw new Error("Report generation has already finished");
    }

    const now = Date.now();

    await ctx.db.patch(report._id, {
      status: args.status,
      startedAt: report.startedAt ?? now,
    });

    return { success: true };
  },
});

// --------------------------------------------------
// 3. Complete report
// Invoked after successful GCS upload through the authenticated webhook.
// --------------------------------------------------

export const completeReport = mutation({
  args: {
    reportId: v.string(),
    storage: storageValidator,
  },

  handler: async (ctx, args) => {
    if (!Number.isSafeInteger(args.storage.size) || args.storage.size < 0) {
      throw new Error("Storage size must be a non-negative integer");
    }

    const report = await ctx.db
      .query("reports")
      .withIndex("by_report_id", (q) =>
        q.eq("reportId", args.reportId)
      )
      .unique();

    if (!report) {
      throw new Error("Report not found");
    }

    if (
      report.status === "completed" ||
      report.status === "failed"
    ) {
      throw new Error("Report generation has already finished");
    }

    const now = Date.now();

    await ctx.db.patch(report._id, {
      status: "completed",
      storage: args.storage,
      startedAt: report.startedAt ?? now,
      completedAt: now,
      error: undefined,
    });

    return { success: true };
  },
});


// --------------------------------------------------
// 5. Get report by ID
// Frontend subscribes to this query.
// --------------------------------------------------

export const getReportById = query({
  args: {
    reportId: v.string(),
  },

  handler: async (ctx, args) => {
    const { orgId } = await getActiveOrganizationMembership(ctx);
    const report = await ctx.db
      .query("reports")
      .withIndex("by_report_id", (q) =>
        q.eq("reportId", args.reportId)
      )
      .unique();

    if (!report || report.orgId !== orgId) {
      return null;
    }

    return report;
  },
});