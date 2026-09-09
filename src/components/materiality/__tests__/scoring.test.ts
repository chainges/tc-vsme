import { describe, expect, it } from 'vitest'
import {
	computeFinancialScore,
	computeImpactScore,
	evaluateTopicMateriality,
} from '../scoring'

describe('Materiality Scoring Logic', () => {
	it('calculates actual impact score directly from severity', () => {
		expect(computeImpactScore('actual', 4, 1)).toBe(4)
		expect(computeImpactScore('actual', 5, 2)).toBe(5)
		expect(computeImpactScore('actual', 2, 5)).toBe(2)
	})

	it('calculates potential impact score as the average of severity and likelihood', () => {
		// (4 + 3) / 2 = 3.5
		expect(computeImpactScore('potential', 4, 3)).toBe(3.5)
		// (3 + 2) / 2 = 2.5
		expect(computeImpactScore('potential', 3, 2)).toBe(2.5)
		// (5 + 4) / 2 = 4.5
		expect(computeImpactScore('potential', 5, 4)).toBe(4.5)
	})

	it('calculates financial score as the average of magnitude and likelihood', () => {
		// (3 + 3) / 2 = 3.0
		expect(computeFinancialScore(3, 3)).toBe(3.0)
		// (4 + 3) / 2 = 3.5
		expect(computeFinancialScore(4, 3)).toBe(3.5)
		// (2 + 1) / 2 = 1.5
		expect(computeFinancialScore(2, 1)).toBe(1.5)
	})

	it('identifies a topic as material when either impact or financial score meets or exceeds 3.3', () => {
		// Impact 3.5 >= 3.3 -> Material on impact
		const res1 = evaluateTopicMateriality(3.5, 2.0, false, false, 3.3)
		expect(res1.isMaterial).toBe(true)
		expect(res1.materialOn).toContain('impact')
		expect(res1.basis).toBe('threshold')

		// Financial 4.0 >= 3.3 -> Material on financial
		const res2 = evaluateTopicMateriality(2.0, 4.0, false, false, 3.3)
		expect(res2.isMaterial).toBe(true)
		expect(res2.materialOn).toContain('financial')
		expect(res2.basis).toBe('threshold')

		// Both >= 3.3 -> Double material
		const res3 = evaluateTopicMateriality(3.5, 3.5, false, false, 3.3)
		expect(res3.isMaterial).toBe(true)
		expect(res3.materialOn).toEqual(['impact', 'financial'])
		expect(res3.basis).toBe('threshold')
	})

	it('leaves topic as non-material when both scores are below 3.3', () => {
		const res = evaluateTopicMateriality(3.0, 3.0, false, false, 3.3)
		expect(res.isMaterial).toBe(false)
		expect(res.materialOn).toHaveLength(0)
		expect(res.basis).toBe('none')
	})

	it('forces materiality regardless of score when severe human rights flag is checked', () => {
		const res = evaluateTopicMateriality(1.0, 1.0, true, false, 3.3)
		expect(res.isMaterial).toBe(true)
		expect(res.basis).toBe('severeHumanRights')
	})

	it('forces materiality regardless of score when legal obligation flag is checked', () => {
		const res = evaluateTopicMateriality(1.5, 1.5, false, true, 3.3)
		expect(res.isMaterial).toBe(true)
		expect(res.basis).toBe('legalObligation')
	})
})
