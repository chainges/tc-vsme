import { STATIC_THRESHOLD } from './constants'

export function roundToOneDecimal(num: number): number {
	return Math.round(num * 10) / 10
}

export function computeImpactScore(
	occurrence: 'actual' | 'potential' = 'potential',
	severity: number = 3,
	likelihood: number = 3,
): number {
	if (occurrence === 'actual') {
		return severity
	}
	return roundToOneDecimal((severity + likelihood) / 2)
}

export function computeFinancialScore(
	magnitude: number = 2,
	likelihood: number = 3,
): number {
	return roundToOneDecimal((magnitude + likelihood) / 2)
}

export function evaluateTopicMateriality(
	impactEffective: number,
	financialEffective: number,
	severeHumanRights: boolean,
	legalObligation: boolean,
	threshold: number = STATIC_THRESHOLD,
): {
	isMaterial: boolean
	materialOn: ('impact' | 'financial')[]
	basis: 'threshold' | 'severeHumanRights' | 'legalObligation' | 'none'
} {
	const materialOn: ('impact' | 'financial')[] = []
	if (impactEffective >= threshold) {
		materialOn.push('impact')
	}
	if (financialEffective >= threshold) {
		materialOn.push('financial')
	}

	if (severeHumanRights) {
		return { isMaterial: true, materialOn, basis: 'severeHumanRights' }
	}
	if (legalObligation) {
		return { isMaterial: true, materialOn, basis: 'legalObligation' }
	}
	if (materialOn.length > 0) {
		return { isMaterial: true, materialOn, basis: 'threshold' }
	}

	return { isMaterial: false, materialOn, basis: 'none' }
}
