import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

const getTargetsData = (Data:any[])=>{
    if(Data.length === 0) return {}
    //  loop through the data and create a object where key will be section and value will be the data for that section
    //  data is object inside Data and formData will be object where key will be section and value will be the data for that section

   return {
    baseYear : Data[0].baseYear,
    baseYearEmissions : Data[0].baseYearEmissions,
    hasScopeSpecificTargets: Data[0].hasScopeSpecificTargets,
    longTermTargetReduction: Data[0].longTermTargetReduction,
    longTermTargetYear: Data[0].longTermTargetYear,
    projections: Data[0].projections,
    targetReduction: Data[0].targetReduction,
    targetYear: Data[0].targetYear
   }

}

export const getTargetsInternal = internalQuery({
  args: { orgId: v.string(), reportingYear: v.number() },
  handler: async (ctx, { orgId }) => {
    const target = await ctx.db
      .query("targets")
      .withIndex("by_organizationId", (q) => q.eq("organizationId", orgId))
      .first();

    return getTargetsData(target ? [target] : []);
  },
});

// Public action — this is what your Python backend will call
export const getTargetsFormDataForXbrl = action({
  args: { orgId: v.string(), reportingYear: v.number() },
  returns: v.any(),
  handler: async (ctx, { orgId, reportingYear }): Promise<any> => {
    // Calls the internal query safely from within Convex
    return await ctx.runQuery(
      internal.getTargets.getTargetsInternal,
      { orgId, reportingYear }
    );
  },
});