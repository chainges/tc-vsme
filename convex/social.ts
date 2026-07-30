import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

const createEnvoirmentForm = (Data:any[])=>{
    if(Data.length === 0) return {}
    //  loop through the data and create a object where key will be section and value will be the data for that section
    //  data is object inside Data and formData will be object where key will be section and value will be the data for that section

    const formData:any = {}
    Data.forEach((data)=>{
        formData[data.section] = data.data
    })

    return formData;

}

export const getSocialFormByOrgIdInternal = internalQuery({
  args: { orgId: v.string(), reportingYear: v.number() },
  handler: async (ctx, { orgId, reportingYear }) => {
    const org = await ctx.db
      .query("formSocial")
      .filter(q => q.eq(q.field("orgId"), orgId))
      .filter(q => q.eq(q.field("reportingYear"), reportingYear))
      .collect();
    return createEnvoirmentForm(org);
    
  },
});

// Public action — this is what your Python backend will call
export const getSocialFormDataForXbrl = action({
  args: { orgId: v.string(), reportingYear: v.number() },
  returns: v.any(),
  handler: async (ctx, { orgId, reportingYear }): Promise<any> => {
    // Calls the internal query safely from within Convex
    return await ctx.runQuery(
      internal.social.getSocialFormByOrgIdInternal,
      { orgId, reportingYear }
    );
  },
});