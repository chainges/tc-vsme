"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId, getOrgId } from "./_utils/auth";

export const getEmissionsByOrgId = action({
  args: {
    //orgIdToUse: v.string(),
    //clerkToken: v.optional(v.string()),
    year: v.optional(v.number()),
    RegistrationNumber: v.optional(v.string()),
    testingMode: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireUserId(ctx);

    const userOrgId = await getOrgId(ctx);

    // if (!args.testingMode && userOrgId && userOrgId !== args.orgIdToUse) {
    //   throw new Error("Unauthorized: Cannot access other organizations");
    // }

    const configuredApiUrl = process.env.SCOPE321_API_URL?.trim();
    if (!configuredApiUrl) {
      throw new Error(
        "SCOPE321_API_URL is not configured for Convex. Set it with `npx convex env set SCOPE321_API_URL https://dev-testapp-mcqi.encr.app`.",
      );
    }

    let url: URL;
    try {
      const parsedApiUrl = new URL(configuredApiUrl);
      const normalizedPath = parsedApiUrl.pathname.replace(/\/+$/, "");

      if (normalizedPath === "/getEmissions") {
        url = parsedApiUrl;
      } else {
        const baseUrl = parsedApiUrl.toString().endsWith("/")
          ? parsedApiUrl.toString()
          : `${parsedApiUrl.toString()}/`;
        url = new URL("getEmissions", baseUrl);
      }
    } catch {
      throw new Error(`Invalid SCOPE321_API_URL: ${configuredApiUrl}`);
    }

    if (args.year) url.searchParams.set("year", String(args.year));
    if (args.RegistrationNumber) url.searchParams.set("RegistrationNumber", args.RegistrationNumber);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url.toString(), {
      headers,
    });

    console.log("scope321 API response status:", response)

    if (!response.ok) {
      console.error("scope321 API error:", url.toString(), response.status, response.statusText);
      console.error("scope321 API error:", await response.text());
      return { success: false, error: "Failed to fetch emissions data" };
    }

    const data = await response.json();

    console.log("scope321 API response data:", data);
    return data;
  },
});