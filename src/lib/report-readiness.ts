import { SECTIONS } from "./vsme-sections"


function moduleFields(modules: string[]) {
	return modules.map((module) => ({
		id: module,
		label:
			SECTIONS.find((section) => section.module === module)?.title ?? module,
		multiline: true,
	}))
}

export const INFORMATION_AREAS = [
	{
		id: 'general',
		title: 'General information',
		modules: ['B1', 'B2', 'C1', 'C2'],
		fields: [
			{ id: 'company', label: 'Company name' },
			{ id: 'period', label: 'Reporting period' },
			...moduleFields(['B1', 'B2', 'C1', 'C2']),
		],
	},
	{
		id: 'environmental',
		title: 'Environmental information',
		modules: ['B3', 'B4', 'B5', 'B6', 'B7', 'C3', 'C4'],
		fields: moduleFields(['B3', 'B4', 'B5', 'B6', 'B7', 'C3', 'C4']),
	},
	{
		id: 'social',
		title: 'Social information',
		modules: ['B8', 'B9', 'B10', 'C5', 'C6', 'C7'],
		fields: moduleFields(['B8', 'B9', 'B10', 'C5', 'C6', 'C7']),
	},
	{
		id: 'governance',
		title: 'Governance',
		modules: ['B11', 'C8', 'C9'],
		fields: moduleFields(['B11', 'C8', 'C9']),
	},
] as const

export type ReportInformation = Record<string, string>

export function areaIsFilled(
	area: (typeof INFORMATION_AREAS)[number],
	values: ReportInformation,
) {
	return area.fields.every((field) => Boolean(values[field.id]?.trim()))
}

export function canGenerateReport(values: ReportInformation) {
	return INFORMATION_AREAS.every((area) => areaIsFilled(area, values))
}