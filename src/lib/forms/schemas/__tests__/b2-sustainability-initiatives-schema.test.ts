import { describe, expect, it } from 'vitest'
import { sustainabilityInitiativesSchema } from '../b2-sustainability-initiatives-schema'

describe('sustainabilityInitiativesSchema', () => {
	it('accepts selected sustainability issue values and policy flags', () => {
		const result = sustainabilityInitiativesSchema.safeParse({
			reportingYear: '2025',
			hasSustainabilityPractices: true,
			arePracticesPubliclyAvailable: true,
			policiesHaveTargets: false,
			selectedSustainabilityIssueValues: [
				'vsme:ClimateChangeMember',
			],
		})

		expect(result.success).toBe(true)
	})

	it('rejects non-boolean policy flags', () => {
		const result = sustainabilityInitiativesSchema.safeParse({
			reportingYear: '2025',
			hasSustainabilityPractices: 'yes',
			arePracticesPubliclyAvailable: false,
			policiesHaveTargets: false,
			selectedSustainabilityIssueValues: [],
		})

		expect(result.success).toBe(false)
	})
})