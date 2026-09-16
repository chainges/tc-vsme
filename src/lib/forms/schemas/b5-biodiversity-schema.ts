import { z } from 'zod'

export const b5BiodiversitySchema = z
	.object({
		reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
		hasSensitiveBiodiversityAreas: z.boolean(),
		sites: z.array(
			z.object({
				propertyId: z.string(),
				siteLocation: z.string(),
				areaSquareMeters: z.number().min(0, 'Må være 0 eller mer').optional(),
				isInSensitiveBiodiversityArea: z.boolean(),
				isNearSensitiveBiodiversityArea: z.boolean(),
			}),
		),
		totalSealedAreaSquareMeters: z
			.number()
			.min(0, 'Må være 0 eller mer')
			.optional(),
		totalNatureOrientedAreaOnSiteSquareMeters: z
			.number()
			.min(0, 'Må være 0 eller mer')
			.optional(),
		totalNatureOrientedAreaOffSiteSquareMeters: z
			.number()
			.min(0, 'Må være 0 eller mer')
			.optional(),
		totalLandUsedSquareMeters: z
			.number()
			.min(0, 'Må være 0 eller mer')
			.optional(),
		protectedSpeciesCount: z.string().optional(),
		redListedSpeciesCount: z.string().optional(),
	})

export type B5BiodiversityFormValues = z.infer<typeof b5BiodiversitySchema>
