"use node";
import { action, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./_utils/auth";
import { fetchCompanyEmissions } from "./mongodb/queries";
import { getOrgId } from "./_utils/auth";

/**
 * Sanitize MongoDB data to be Convex-compatible.
 * Converts Date objects to ISO strings and handles nested objects.
 */
function sanitizeMongoData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeMongoData(item));
  }

  if (typeof data === "object") {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeMongoData(value);
    }
    return sanitized;
  }

  return data;
}

/**
 * Internal query: look up orgNumber by clerkOrgId from the organizations table.
 * Used by the getEmissionsByOrgId action as its first step.
 * Not exported → internal by convention.
 */
const _getOrgNumberByClerkOrgId = query({
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

/**
 * Get emissions data for a specific organization.
 *
 * Looks up the organization's `orgNumber` from the Convex organizations table
 * using the Clerk org ID, then fetches CO2 emissions data from MongoDB using
 * that `orgNumber`. Requires authentication and verifies that the user has
 * access to the requested organization. Prevents cross-organization data access
 * by checking user's org context.
 *
 * @param {string} orgIdToUse - The Clerk organization ID (looked up to find orgNumber)
 * @param {number} [year] - Optional year to fetch specific year's data
 * @param {boolean} [testingMode] - Set to true to bypass org verification for testing
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 *
 * @example
 * ```typescript
 * // Fetch all emissions for an org
 * const result = await ctx.runAction(api.emissions.getEmissionsByOrgId, {
 *   orgIdToUse: 'org_abc123'
 * });
 *
 * // Fetch specific year for an org
 * const result2024 = await ctx.runAction(api.emissions.getEmissionsByOrgId, {
 *   orgIdToUse: 'org_abc123',
 *   year: 2024
 * });
 * ```
 */
export const getEmissionsByOrgId = action({
  args: {
    orgIdToUse: v.string(),
    year: v.optional(v.number()),
    testingMode: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // 1. Verify authentication
    await requireUserId(ctx);

    // 2. Get user's org context
    const userOrgId = await getOrgId(ctx);

    // 3. Verify authorization - prevent cross-org access
    // Allow access if user's org matches requested org, or if no org context
    //   (for testing/admin)
    // Bypass check when testingMode is enabled
    if (!args.testingMode && userOrgId && userOrgId !== args.orgIdToUse) {
      throw new Error("Unauthorized: Cannot access other organizations");
    }

    // @ts-expect-error - runQuery accepts FunctionReference but internal-only queries
    //   assigned to a const are typed as RegisteredQuery by the generated Convex types.
    const orgNumber = await ctx.runQuery(_getOrgNumberByClerkOrgId, {
      clerkOrgId: args.orgIdToUse,
    });

    if (!orgNumber) {
      return { success: false, error: "Organization not found or has no orgNumber" };
    }

    // 5. Fetch from MongoDB using orgNumber
    try {
      const data = await fetchCompanyEmissions(orgNumber, args.year);

      // Convert any Date objects to ISO strings for Convex compatibility
      const sanitizedData = data ? sanitizeMongoData(data) : null;

      return { success: true, data: sanitizedData };
    } catch (error) {
      console.error("MongoDB fetch error:", error);
      return { success: false, error: "Failed to fetch emissions data" };
    }
  },
});
