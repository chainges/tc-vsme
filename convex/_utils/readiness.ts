import { z } from 'zod'
import { b10CompensationSchema } from '../../src/lib/forms/schemas/b10-compensation-schema'
import { b11FinesPenaltiesSchema } from '../../src/lib/forms/schemas/b11-fines-penalties-schema'
import { b1GeneralSchema } from '../../src/lib/forms/schemas/b1-general-schema'
import { sustainabilityInitiativesSchema } from '../../src/lib/forms/schemas/b2-sustainability-initiatives-schema'
import { b3EnergyEmissionsSchema } from '../../src/lib/forms/schemas/b3-energy-emissions-schema'
import { pollutionSchema } from '../../src/lib/forms/schemas/b4-pollution-schema'
import { b5BiodiversitySchema } from '../../src/lib/forms/schemas/b5-biodiversity-schema'
import { b6WaterSchema } from '../../src/lib/forms/schemas/b6-water-schema'
import { b7ResourceUseCircularEconomySchema } from '../../src/lib/forms/schemas/b7-resource-use-circular-economy-schema'
import { b8WorkforceSchema } from '../../src/lib/forms/schemas/b8-workforce-schema'
import { b9HealthSafetySchema } from '../../src/lib/forms/schemas/b9-health-safety-schema'
import { c1BusinessModelSchema } from '../../src/lib/forms/schemas/c1-business-model-schema'
import { c2DescriptionPracticesPoliciesSchema } from '../../src/lib/forms/schemas/c2-description-practices-policies-schema'
import { c4ClimateRiskSchema } from '../../src/lib/forms/schemas/c4-climate-risk-schema'
import { c5AdditionalWorkforceSchema } from '../../src/lib/forms/schemas/c5-additional-workforce-schema'
import { c6HumanRightsPoliciesSchema } from '../../src/lib/forms/schemas/c6-human-rights-policies-schema'
import { c7SeriousHumanRightsSchema } from '../../src/lib/forms/schemas/c7-serious-human-rights-schema'
import { c8SectorInvolvementSchema } from '../../src/lib/forms/schemas/c8-sector-involvement-schema'
import { c9BoardCompositionSchema } from '../../src/lib/forms/schemas/c9-board-composition-schema'

export const OPTION_A = 'vsme:OptionABasicModuleOnlyMember'
export const OPTION_B = 'vsme:OptionBBasicModuleAndComprehensiveModuleMember'

const basicModuleSchema = z.object({ moduleScope: z.enum([OPTION_A, OPTION_B]) })

/** Zod schema per Convex form section; shared by readiness and submit-time validation. */
export const SECTION_SCHEMAS = {
	basicModule: basicModuleSchema,
	companyInfo: b1GeneralSchema,
	sustainabilityInitiatives: sustainabilityInitiativesSchema,
	energyEmissions: b3EnergyEmissionsSchema,
	pollution: pollutionSchema,
	biodiversity: b5BiodiversitySchema,
	waterManagement: b6WaterSchema,
	resourceUseCircularEconomy: b7ResourceUseCircularEconomySchema,
	workforce: b8WorkforceSchema,
	healthSafety: b9HealthSafetySchema,
	compensationCollective: b10CompensationSchema,
	finesPenalties: b11FinesPenaltiesSchema,
	businessModel: c1BusinessModelSchema,
	descriptionOfPracticesPolicies: c2DescriptionPracticesPoliciesSchema,
	climateRiskAnalysis: c4ClimateRiskSchema,
	additionalWorkforce: c5AdditionalWorkforceSchema,
	humanRightsPolicies: c6HumanRightsPoliciesSchema,
	seriousHumanRightsIncidents: c7SeriousHumanRightsSchema,
	sectorInvolvement: c8SectorInvolvementSchema,
	boardComposition: c9BoardCompositionSchema,
} as const

export type SectionName = keyof typeof SECTION_SCHEMAS
export type SectionSchemas = Record<SectionName, z.ZodType>
export type ReadinessArea = 'general' | 'environmental' | 'social' | 'governance'
export type ModuleState = 'complete' | 'missing' | 'invalid' | 'not_required'

export type ReadinessModule = {
	code: string
	area: ReadinessArea
	tier: 'basic' | 'comprehensive'
	sections: readonly SectionName[]
	/** C3 lives in the targets table rather than a form section. */
	targets?: true
}

export const MODULES: readonly ReadinessModule[] = [
	{ code: 'B1', area: 'general', tier: 'basic', sections: ['basicModule', 'companyInfo'] },
	{ code: 'B2', area: 'general', tier: 'basic', sections: ['sustainabilityInitiatives'] },
	{ code: 'C1', area: 'general', tier: 'comprehensive', sections: ['businessModel'] },
	{ code: 'C2', area: 'general', tier: 'comprehensive', sections: ['descriptionOfPracticesPolicies'] },
	{ code: 'B3', area: 'environmental', tier: 'basic', sections: ['energyEmissions'] },
	{ code: 'B4', area: 'environmental', tier: 'basic', sections: ['pollution'] },
	{ code: 'B5', area: 'environmental', tier: 'basic', sections: ['biodiversity'] },
	{ code: 'B6', area: 'environmental', tier: 'basic', sections: ['waterManagement'] },
	{ code: 'B7', area: 'environmental', tier: 'basic', sections: ['resourceUseCircularEconomy'] },
	{ code: 'C3', area: 'environmental', tier: 'comprehensive', sections: [], targets: true },
	{ code: 'C4', area: 'environmental', tier: 'comprehensive', sections: ['climateRiskAnalysis'] },
	{ code: 'B8', area: 'social', tier: 'basic', sections: ['workforce'] },
	{ code: 'B9', area: 'social', tier: 'basic', sections: ['healthSafety'] },
	{ code: 'B10', area: 'social', tier: 'basic', sections: ['compensationCollective'] },
	{ code: 'C5', area: 'social', tier: 'comprehensive', sections: ['additionalWorkforce'] },
	{ code: 'C6', area: 'social', tier: 'comprehensive', sections: ['humanRightsPolicies'] },
	{ code: 'C7', area: 'social', tier: 'comprehensive', sections: ['seriousHumanRightsIncidents'] },
	{ code: 'B11', area: 'governance', tier: 'basic', sections: ['finesPenalties'] },
	{ code: 'C8', area: 'governance', tier: 'comprehensive', sections: ['sectorInvolvement'] },
	{ code: 'C9', area: 'governance', tier: 'comprehensive', sections: ['boardComposition'] },
]

export type ReadinessRow = { section: string; status: string; data?: unknown }
export type ReadinessInput = { rows: ReadinessRow[]; targets: unknown }

export type ModuleReadiness = {
	code: string
	area: ReadinessArea
	state: ModuleState
	issues: string[]
}

export type ReadinessResult = {
	scope: 'A' | 'B' | null
	canGenerate: boolean
	modules: ModuleReadiness[]
	/** Codes of required modules that are not complete. */
	missing: string[]
}

const MAX_ISSUES = 5

const describeIssues = (error: z.ZodError) =>
	error.issues.slice(0, MAX_ISSUES).map((issue) => `${issue.path.join('.') || 'form'}: ${issue.message}`)

const REQUIRED_TARGET_NUMBERS = ['baseYear', 'baseYearEmissions', 'targetYear', 'targetReduction'] as const

function evaluateTargets(targets: unknown): Pick<ModuleReadiness, 'state' | 'issues'> {
	if (!targets || typeof targets !== 'object') return { state: 'missing', issues: [] }
	const record = targets as Record<string, unknown>
	const issues = REQUIRED_TARGET_NUMBERS.filter((key) => typeof record[key] !== 'number').map(
		(key) => `${key}: required`,
	)
	return issues.length ? { state: 'invalid', issues } : { state: 'complete', issues: [] }
}

// C2 text becomes mandatory only for the topics B2 reported as active.
function crossCheckC2(b2: unknown, c2: unknown): string[] {
	const b2Data = (b2 ?? {}) as Record<string, unknown>
	const c2Data = (c2 ?? {}) as Record<string, unknown>
	const blank = (key: string) => typeof c2Data[key] !== 'string' || !c2Data[key].trim()
	const issues: string[] = []
	if (b2Data.hasSustainabilityPractices === true && blank('c2_sustainability_practice_description')) {
		issues.push('c2_sustainability_practice_description: required because B2 reports practices')
	}
	if (b2Data.policiesHaveTargets === true && blank('c2_monitoring_targets_description')) {
		issues.push('c2_monitoring_targets_description: required because B2 reports targets')
	}
	return issues
}

export function evaluateReadiness(
	{ rows, targets }: ReadinessInput,
	schemas: SectionSchemas = SECTION_SCHEMAS,
): ReadinessResult {
	const submitted = new Map(rows.filter((r) => r.status === 'submitted').map((r) => [r.section, r]))

	const scopeValue = basicModuleSchema.safeParse(submitted.get('basicModule')?.data)
	const scope = scopeValue.success ? (scopeValue.data.moduleScope === OPTION_B ? 'B' : 'A') : null

	const modules = MODULES.map((module): ModuleReadiness => {
		const base = { code: module.code, area: module.area }
		if (module.tier === 'comprehensive' && scope !== 'B') return { ...base, state: 'not_required', issues: [] }

		if (module.targets) return { ...base, ...evaluateTargets(targets) }

		const issues: string[] = []
		let missing = false
		for (const section of module.sections) {
			const row = submitted.get(section)
			if (!row) {
				missing = true
				continue
			}
			const parsed = schemas[section].safeParse(row.data)
			if (!parsed.success) issues.push(...describeIssues(parsed.error))
		}
		if (module.code === 'C2' && !missing) {
			issues.push(
				...crossCheckC2(submitted.get('sustainabilityInitiatives')?.data, submitted.get('descriptionOfPracticesPolicies')?.data),
			)
		}
		if (missing) return { ...base, state: 'missing', issues: [] }
		return { ...base, state: issues.length ? 'invalid' : 'complete', issues }
	})

	const missing = modules.filter((m) => m.state === 'missing' || m.state === 'invalid').map((m) => m.code)
	return { scope, canGenerate: scope !== null && missing.length === 0, modules, missing }
}
