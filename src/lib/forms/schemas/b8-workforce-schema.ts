import { z } from 'zod'

export const employeePerCountrySchema = z.object({
	id: z.string(),
	country: z.string().min(1, 'Land er påkrevd'),
	numberOfEmployees: z
		.number({ message: 'Antall ansatte er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
})

export const b8WorkforceSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
	fullTimeEmployees: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	partTimeEmployees: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	temporaryEmployees: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	men: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	women: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	other: z
		.number({ message: 'Dette feltet er påkrevd' })
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer'),
	employeesPerCountry: z.array(employeePerCountrySchema),
	employeesLeft: z
		.number()
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer')
		.optional(),
	employeesAtStart: z
		.number()
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer')
		.optional(),
	employeesAtEnd: z
		.number()
		.int('Må være et heltall')
		.min(0, 'Må være 0 eller mer')
		.optional(),
	anyAdditionalInfo: z.string().optional(),
})

export type EmployeePerCountry = z.infer<typeof employeePerCountrySchema>
export type B8WorkforceFormValues = z.infer<typeof b8WorkforceSchema>
