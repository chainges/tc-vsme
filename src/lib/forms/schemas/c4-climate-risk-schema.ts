import { z } from 'zod'

export const c4ClimateRiskSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	isC4Confidential: z.boolean(),
	climateRiskDescription: z
		.string()
		.trim()
		.min(1, 'Climate risk description is required'),
	hasIdentifiedClimateRelatedHazardious: z.boolean(),
	exposureAndSensitivityAssessment: z
		.string()
		.trim()
		.min(1, 'Exposure and sensitivity assessment is required'),
	timeHorizonsIdentified: z
		.string()
		.trim()
		.min(1, 'Time horizons identified is required'),

	climateAdaptationActions: z
		.boolean(),
	potentialAdverseEffectsAndRiskRating: z
		.string()
		.trim()
		.optional(),
})

export type C4ClimateRiskFormValues = z.infer<typeof c4ClimateRiskSchema>
