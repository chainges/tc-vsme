import { describe, expect, it } from 'vitest'
import { getMaterialTotals } from '../b7-material-totals'

describe('getMaterialTotals', () => {
	it('converts kilograms to tonnes and keeps cubic metres separate', () => {
		expect(getMaterialTotals([
			{ volume: 1233, unit: 'tonn' },
			{ volume: 333, unit: 'kg' },
			{ volume: 12, unit: 'm³' },
		])).toEqual({ tonnes: 1233.333, cubicMetres: 12 })
	})

	it('handles empty and incomplete entries', () => {
		expect(getMaterialTotals([{ volume: undefined, unit: 'kg' }])).toEqual({
			tonnes: 0,
			cubicMetres: 0,
		})
	})
})