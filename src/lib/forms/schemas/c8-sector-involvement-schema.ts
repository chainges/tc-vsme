import { z } from 'zod'

export const c8SectorInvolvementSchema = z
	.object({
		reportingYear: z.string().regex(/^\d{4}$/, 'År må være 4 siffer'),
		isC8Confidential: z.boolean(),
		controversialWeaponsRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		tobaccoRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		coalRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		gasRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		oilRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		chemicalProductionRevenue: z.number().min(0, 'Må være 0 eller mer').optional(),
		pabCoalThreshold: z.boolean().default(false),
		pabOilThreshold: z.boolean().default(false),
		pabGasThreshold: z.boolean().default(false),
		pabElectricityThreshold: z.boolean().default(false),
		euBenchmarksExclusion: z.boolean().default(false),
	})

export type C8SectorInvolvementValues = z.infer<typeof c8SectorInvolvementSchema>
