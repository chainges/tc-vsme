import { z } from 'zod'

export const EMISSION_TYPES = ['Air', 'Water', 'Soil'] as const
export const POLLUTANT_UNITS = [{ label: 'kilograms (kg)', value: 'kg' }, { label: 'metric tonnes (t)', value: 't' }] as const

export const pollutionEntrySchema = z.object({
	id: z.string(),
	pollutantCode: z.string().min(1, 'Pollution type is required'),
	amountOfEmissionToAir: z.number().min(0, 'Amount of emission to air must be a non-negative number'),
	amountOfEmissionToWater: z.number().min(0, 'Amount of emission to water must be a non-negative number'),
	amountOfEmissionToSoil: z.number().min(0, 'Amount of emission to soil must be a non-negative number'),
	unitCode: z.enum(POLLUTANT_UNITS.map(u => u.value) as [string, ...string[]]),
})

export const pollutionSchema = z
	.object({
		reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
		isB4Confidential: z.boolean(),
		reportingPollution: z.boolean(),
		publiclyAvailableDisclosure: z.boolean().optional(),
		urlOrLinkToPubliclyAvailableDisclosure: z.string().optional(),
		pollutants: z.array(pollutionEntrySchema),
	})
	.refine(
		(data) =>
			!data.publiclyAvailableDisclosure ||
			(data.urlOrLinkToPubliclyAvailableDisclosure &&
				/\.+./.test(data.urlOrLinkToPubliclyAvailableDisclosure)),
		{
			message: 'A valid URL is required when disclosure is publicly available',
			path: ['urlOrLinkToPubliclyAvailableDisclosure'],
		},
	)
	.refine(
		(data) =>
			!data.reportingPollution ||
			data.publiclyAvailableDisclosure ||
			data.pollutants.length > 0,
		{
			message: 'At least one pollutant is required',
			path: ['pollutants'],
		},
	)

export type EmissionType = (typeof EMISSION_TYPES)[number]
export type PollutionEntry = z.infer<typeof pollutionEntrySchema>
export type PollutionFormValues = z.infer<typeof pollutionSchema>
