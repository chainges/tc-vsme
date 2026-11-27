export function getMaterialTotals(
	entries: ReadonlyArray<{ volume?: number; unit: 'tonn' | 'kg' | 'm³' }>,
) {
	return entries.reduce(
		(totals, entry) => {
			const volume = entry.volume ?? 0
			if (entry.unit === 'm³') {
				totals.cubicMetres += volume
			} else {
				totals.tonnes += entry.unit === 'kg' ? volume / 1000 : volume
			}
			return totals
		},
		{ tonnes: 0, cubicMetres: 0 },
	)
}