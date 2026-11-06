import { MODULES, type ModuleState, type ReadinessArea } from '../../convex/_utils/readiness'
import { SECTIONS } from './vsme-sections'

export const READINESS_AREAS: readonly {
	id: ReadinessArea
	title: string
	route: '/app/general' | '/app/environmental' | '/app/social' | '/app/governance'
}[] = [
	{ id: 'general', title: 'General information', route: '/app/general' },
	{ id: 'environmental', title: 'Environmental information', route: '/app/environmental' },
	{ id: 'social', title: 'Social information', route: '/app/social' },
	{ id: 'governance', title: 'Governance', route: '/app/governance' },
]

export const modulesInArea = (area: ReadinessArea) => MODULES.filter((m) => m.area === area).map((m) => m.code)

export const moduleTitle = (code: string) => SECTIONS.find((s) => s.module === code)?.title ?? code

export const STATE_LABEL: Record<ModuleState, string> = {
	complete: 'complete',
	missing: 'not submitted',
	invalid: 'needs attention',
	not_required: 'not required',
}
