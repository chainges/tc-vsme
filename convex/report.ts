import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const getCompleteReportData = action({
  args: { orgId: v.string(), reportingYear: v.number() },
  returns: v.any(),
  handler: async (ctx, { orgId, reportingYear }): Promise<any> => {
    
    // All 4 queries fire at the SAME TIME
    // log the orgId and reportingYear for debugging
    console.log(`Fetching report data for orgId: ${orgId}, reportingYear: ${reportingYear}`);
    const [general, environmental, social, governance,organization] = await Promise.all([
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
        )
    ]);

    // Single combined payload
    return {
  formGeneral: general,
  formEnvironmental: environmental,
  formSocial: social,
  formGovernance: governance,
  organization: organization
};
  },
});