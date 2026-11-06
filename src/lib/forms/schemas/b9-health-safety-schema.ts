import { z } from 'zod'

export const b9HealthSafetySchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	confidentialAreas: z.array(z.string()).default([]),
	workAccidents: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	deceased: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	rateOfWorkAccidents: z.number().min(0).optional(),
	knowExactHoursWorked: z.boolean().default(false),
	totalHoursWorked: z
		.number()
		.min(0, 'Må være 0 eller mer')
		.optional(),
})

export type B9HealthSafetyFormValues = z.infer<typeof b9HealthSafetySchema>
