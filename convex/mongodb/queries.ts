"use node";
import { getMongoClient } from "./client";

/**
 * Fetch company emissions data from MongoDB.
 *
 * Retrieves emissions data for a specific organization from the MongoDB
 * co2-intensities-dev database. Can fetch all years or a specific year.
 * Uses field projection to fetch only the Emissions field for better performance.
 *
 * @param {string} orgNumber - The organization number (from Convex organizations table)
 * @param {number} [year] - Optional year to fetch specific year's data (e.g., 2024)
 * @returns {Promise<any>} Emissions data object, or null if not found
 *
 * @example
 * ```typescript
 * // Fetch all emissions data
 * const allEmissions = await fetchCompanyEmissions('123456789');
 *
 * // Fetch specific year
 * const emissions2024 = await fetchCompanyEmissions('123456789', 2024);
 * ```
 */
export async function fetchCompanyEmissions(
  orgNumber: string,
  year?: number
) {
  const client = await getMongoClient();
  const db = client.db("co2-intensities-dev");
  const collection = db.collection("companies");

  const company = await collection.findOne(
    { RegistrationNumber: orgNumber },
    { projection: { Emissions: 1, CompanyName: 1 } }
  );

  if (!company?.Emissions) {
    return null;
  }

  if (year) {
    return company.Emissions[year] || null;
  }

  return company.Emissions;
}

