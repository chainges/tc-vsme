import { z } from 'zod'

export const b9HealthSafetySchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	workAccidents: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	sicknessAbsencePercentage: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer')
		.max(100, 'Kan ikke overstige 100 %'),
	hmsTraining: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	deceased: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	anyAdditionalInfo: z.string().optional(),
})

export type B9HealthSafetyFormValues = z.infer<typeof b9HealthSafetySchema>
