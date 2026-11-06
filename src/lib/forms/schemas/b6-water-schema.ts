import { z } from 'zod'

export const b6WaterSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	waterWithdrawal: z
		.number({ message: 'Feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	waterWithdrawalStress: z
		.number({ message: 'Feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	waterDischarge: z
		.number({ message: 'Feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	confidentialAreas: z.array(z.string()).optional()
})

export type B6WaterFormValues = z.infer<typeof b6WaterSchema>
