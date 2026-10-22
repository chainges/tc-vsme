import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

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