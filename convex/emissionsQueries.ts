import { query } from "./_generated/server";
import { v } from "convex/values";

export const getOrgNumberByClerkOrgId = query({
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
