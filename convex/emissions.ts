"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId, requireOrgId } from "./_utils/auth";
import { fetchCompanyEmissions } from "./mongodb/queries";
import { internal } from "./_generated/api";

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
 * Get emissions data for the authenticated user's organization.
 *
 * Looks up the organization's `orgNumber` from the Convex organizations table
 * using the Clerk org ID derived from the caller's JWT, then fetches CO2
 * emissions data from MongoDB using that `orgNumber`.
 *
 * @param {number} [year] - Optional year to fetch specific year's data
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 *
 * @example
 * ```typescript
 * const result = await ctx.runAction(api.emissions.getEmissionsByOrgId, {});
 *
 * // Fetch specific year
 * const result2024 = await ctx.runAction(api.emissions.getEmissionsByOrgId, {
 *   year: 2024
 * });
 * ```
 */
export const getEmissionsByOrgId = action({
  args: {
    year: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // 1. Verify authentication
    await requireUserId(ctx);

    // 2. Org is derived from the JWT, never from a client-supplied arg
    const orgId = await requireOrgId(ctx);

    const orgNumber = await ctx.runQuery(internal.emissionsQueries.getOrgNumberByClerkOrgId, {
      clerkOrgId: orgId,
    });

    if (!orgNumber) {
      console.error(`[emissions] No organization found for clerkOrgId: ${orgId}`);
      return { success: false, error: "Organization not found" };
    }

    // 3. Fetch from MongoDB using orgNumber
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
