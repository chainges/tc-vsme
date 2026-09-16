import { describe, expect, it } from 'vitest'
import { b5BiodiversitySchema } from '../b5-biodiversity-schema'

const validSite = {
	propertyId: 'property-1',
	siteLocation: 'Norway Oslo Karl Johans gate 1',
	areaSquareMeters: 1250,
	isInSensitiveBiodiversityArea: true,
	isNearSensitiveBiodiversityArea: false,
}

describe('b5BiodiversitySchema', () => {
	it('accepts biodiversity data for each site', () => {
		const result = b5BiodiversitySchema.safeParse({
			reportingYear: '2025',
			hasSensitiveBiodiversityAreas: true,
			sites: [validSite],
			totalSealedAreaSquareMeters: 125,
			totalNatureOrientedAreaOnSiteSquareMeters: 250,
			totalNatureOrientedAreaOffSiteSquareMeters: 375,
			totalLandUsedSquareMeters: 500,
			protectedSpeciesCount: '',
			redListedSpeciesCount: '',
		})

		expect(result.success).toBe(true)
	})

	it('rejects a negative site area', () => {
		const result = b5BiodiversitySchema.safeParse({
			reportingYear: '2025',
			hasSensitiveBiodiversityAreas: true,
			sites: [{ ...validSite, areaSquareMeters: -1 }],
		})

		expect(result.success).toBe(false)
	})

	it('rejects a negative land information value', () => {
		const result = b5BiodiversitySchema.safeParse({
			reportingYear: '2025',
			hasSensitiveBiodiversityAreas: false,
			sites: [],
			totalLandUsedSquareMeters: -1,
		})

		expect(result.success).toBe(false)
	})
})