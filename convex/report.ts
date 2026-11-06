import { ConvexError, v } from "convex/values";
import { action, internalQuery, query, type QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireOrgId } from "./_utils/auth";
import { evaluateReadiness, type ReadinessRow } from "./_utils/readiness";

const FORM_TABLES = ["formGeneral", "formEnvironmental", "formSocial", "formGovernance"] as const;

async function computeReadiness(ctx: QueryCtx, orgId: string, reportingYear: number) {
  const tables = await Promise.all(
    FORM_TABLES.map((table) =>
      ctx.db
        .query(table)
        .withIndex("by_org_year", (q) => q.eq("orgId", orgId).eq("reportingYear", reportingYear))
        .collect(),
    ),
  );
  const targets = await ctx.db
    .query("targets")
    .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
    .first();

  const rows: ReadinessRow[] = tables
    .flat()
    .map((r) => ({ section: r.section, status: r.status, data: r.data }));
  return evaluateReadiness({ rows, targets });
}

export const getReadiness = query({
  args: { reportingYear: v.number() },
  handler: async (ctx, { reportingYear }) => {
    const orgId = await requireOrgId(ctx);
    return await computeReadiness(ctx, orgId, reportingYear);
  },
});

export const getReadinessInternal = internalQuery({
  args: { orgId: v.string(), reportingYear: v.number() },
  handler: async (ctx, { orgId, reportingYear }) => computeReadiness(ctx, orgId, reportingYear),
});

export interface ConfidentialAreaEntry {
  path: string;     // e.g. "formEnvironmental.energyEmissions.confidentialAreas"
  areas: string[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function getConfidentialAreas(data: unknown): ConfidentialAreaEntry[] {
  const results: ConfidentialAreaEntry[] = [];

  const walk = (node: unknown, path: string): void => {
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, `${path}[${i}]`));
      return;
    }
    if (!isRecord(node)) return;

    for (const [key, value] of Object.entries(node)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (key === "confidentialAreas" && Array.isArray(value)) {
        results.push({
          path: currentPath,
          areas: value.filter((v): v is string => typeof v === "string"),
        });
      } else {
        walk(value, currentPath);
      }
    }
  };

  walk(data, "");
  return results;
}

const getConfidentialAreasFlat = (data: unknown): string[] => [
  ...new Set(getConfidentialAreas(data).flatMap((entry) => entry.areas)),
];

export const getCompleteReportData = action({
  args: { orgId: v.string(), reportingYear: v.number() },
  returns: v.any(),
  handler: async (ctx, { orgId, reportingYear }): Promise<any> => {
    const readiness = await ctx.runQuery(internal.report.getReadinessInternal, { orgId, reportingYear });
    if (!readiness.canGenerate) {
      throw new ConvexError({ code: "REPORT_NOT_READY", missing: readiness.missing });
    }

    // All 4 queries fire at the SAME TIME
    // log the orgId and reportingYear for debugging
    console.log(`Fetching report data for orgId: ${orgId}, reportingYear: ${reportingYear}`);
    const [general, environmental, social, governance, organization, targets] = await Promise.all([
      ctx.runQuery(
        internal.general.getGeneralFormByOrgIdInternal,
        { orgId, reportingYear }
      ),
      ctx.runQuery(
        internal.enviroment.getEnvironmentalFormByOrgIdInternal,
        { orgId, reportingYear }
      ),
      ctx.runQuery(
        internal.social.getSocialFormByOrgIdInternal,
        { orgId, reportingYear }
      ),
      ctx.runQuery(
        internal.governance.getGovernanceFormByOrgIdInternal,
        { orgId, reportingYear }
      ),
      ctx.runQuery(
            internal.organizations.getByClerkOrgIdInternal,
            { orgId }
        ),
      ctx.runQuery(
        internal.getTargets.getTargetsInternal,
        { orgId, reportingYear }
      )
    ]);

    const confidentialAreas = getConfidentialAreasFlat({
      formGeneral: general,
      formEnvironmental: environmental,
      formSocial: social,
      formGovernance: governance,
      organization: organization,
      targets: targets
    });

    // Single combined payload
    return {
      formGeneral: general,
      formEnvironmental: environmental,
      formSocial: social,
      formGovernance: governance,
      organization: organization,
      targets: targets,
      confidentialAreas: confidentialAreas
    };
  },
});