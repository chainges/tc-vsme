import { z } from 'zod'

export const b3EnergyEmissionsSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	renewableElectricity: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	nonRenewableElectricity: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	stationaryCombustion: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	mobileCombustion: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	renewableFuels: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	otherEnergySources: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	emissionsIntensity: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	scope1Emissions: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	scope2EmissionsLocationBased: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	scope2EmissionsMarketBased: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	selfGeneratedEnergy: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	totalEnergyConsumption: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	totalScope3Emissions: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category1: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category2: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category3: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category4: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category5: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category6: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category7: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category8: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category9: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category10: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category11: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category12: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category13: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category14: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	category15: z
		.number({ message: 'Dette feltet er påkrevd' })
		.min(0, 'Må være 0 eller mer'),
	climateDataCollectionMethod: z
		.string({ message: 'Dette feltet er påkrevd' })
		.min(10, 'Beskrivelsen må være på minst 10 tegn'),
	dataUncertainty: z
		.string({ message: 'Dette feltet er påkrevd' })
		.min(10, 'Beskrivelsen må være på minst 10 tegn'),
	isB3Confidential: z.boolean(),
	confidentialAreas: z.array(z.string()),
})

export type B3EnergyEmissionsFormValues = z.infer<
	typeof b3EnergyEmissionsSchema
>
