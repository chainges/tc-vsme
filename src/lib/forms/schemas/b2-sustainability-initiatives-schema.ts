import { z } from 'zod'

export const sustainabilityInitiativesSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	hasSustainabilityPractices: z.boolean(),
	arePracticesPubliclyAvailable: z.boolean(),
	policiesHaveTargets: z.boolean(),
	selectedSustainabilityIssueValues: z.array(z.string()),
	isB2Confidential: z.boolean(),
})

export type SustainabilityInitiativesFormValues = z.infer<
	typeof sustainabilityInitiativesSchema
>
