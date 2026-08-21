import { query, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { requireOrgId } from "./_utils/auth";

export const getOrgNumberByClerkOrgId = internalQuery({
  args: { clerkOrgId: v.string() },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    const org = await ctx.db
      .query("organizations")
      .withIndex("by_clerkOrgId", (q) => q.eq("clerkOrgId", args.clerkOrgId))
      .unique();

    return org?.orgNumber ?? null;
  },
});

export const getEmissionsDashboard = query({
  args: {},
  handler: async (ctx) => {
    const orgId = await requireOrgId(ctx);

    const records = await ctx.db
      .query("formEnvironmental")
      .withIndex("by_orgId", (q) => q.eq("orgId", orgId))
      .collect();

    const byYear: Record<
      string,
      {
        TotalCo2?: number;
        Scope1?: number;
        Scope2?: number;
        Scope3?: number;
        locationBased?: number;
        [key: string]: string | number | boolean | null | undefined;
      }
    > = {};

    for (const record of records) {
      if (record.status !== "submitted" || !record.data) continue;
      const year = String(record.reportingYear);
      if (!byYear[year]) byYear[year] = {};

      if (record.section === "energyEmissions") {
        const d = record.data as typeof record.data & {
          scope1Emissions?: number;
          scope2EmissionsLocationBased?: number;
          scope2EmissionsMarketBased?: number;
        };
        byYear[year].Scope1 = d.scope1Emissions;
        byYear[year].Scope2 = d.scope2EmissionsMarketBased;
        byYear[year].locationBased = d.scope2EmissionsLocationBased;
      }

      if (record.section === "scope3Emissions") {
        const d = record.data as typeof record.data & {
          totalScope3Emissions?: number;
        };
        byYear[year].Scope3 = d.totalScope3Emissions;
      }
    }

    for (const year of Object.keys(byYear)) {
      const d = byYear[year];
      d.TotalCo2 =
        (d.Scope1 ?? 0) + (d.Scope2 ?? 0) + (d.Scope3 ?? 0);
    }

    return byYear;
  },
});
