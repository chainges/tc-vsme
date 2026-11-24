import { useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon, TargetIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { m } from '@/paraglide/messages'

// ============================================================================
// Types
// ============================================================================

interface Projection {
	year: number
	scope1: number
	scope2: number
	scope3: number
	total: number
	isBaseYear?: boolean
	isTargetYear?: boolean
	isLongTermTargetYear?: boolean
}

interface TargetsData {
	_id: string
	targetYear: number
	longTermTargetYear?: number
	projections?: Projection[]
	lastModifiedAt?: number
	contributor?: { name: string }
	keyActionsToReachTargets?: string
	climateTransitionPlanStatus?: 'yes' | 'no'
	climateTransitionPlanDescription?: string
	futureClimateTransitionPlanStatus?: 'yes' | 'no'
	plannedClimateTransitionPlanAdoptionYear?: number
}

// ============================================================================
// Data Extraction Utilities
// ============================================================================

function findProjectionByFlag(
	projections: Projection[] | undefined,
	flag: 'isBaseYear' | 'isTargetYear' | 'isLongTermTargetYear',
): Projection | null {
	if (!projections || projections.length === 0) return null
	return projections.find((p) => p[flag] === true) ?? null
}

function calculateEmissionChange(
	baseEmission: number,
	targetEmission: number,
): string {
	if (baseEmission === 0) return '0.0%'
	const change = ((targetEmission - baseEmission) / baseEmission) * 100
	return `${change.toFixed(1)}%`
}

function formatEmission(value: number | undefined): string {
	if (value === undefined || value === null) return '-'
	return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

function getRemainingPercentage(baseEmission: number, targetEmission: number) {
	if (baseEmission <= 0) return 0
	return Math.max(0, Math.min(100, (targetEmission / baseEmission) * 100))
}

// ============================================================================
// Target Reduction Component
// ============================================================================

interface EmissionTargetViewProps {
	targets: { year: number; label: string; projection: Projection }[]
	baseYearProjection: Projection | null
}

function EmissionTargetView({
	targets,
	baseYearProjection,
}: EmissionTargetViewProps) {
	const [selectedTargetLabel, setSelectedTargetLabel] = useState(targets[0].label)
	const selectedTarget =
		targets.find((target) => target.label === selectedTargetLabel) ?? targets[0]
	const baseTotal = baseYearProjection?.total ?? 0
	const targetTotal = selectedTarget.projection.total
	const totalChange = calculateEmissionChange(baseTotal, targetTotal)

	const rows = [
		{ label: 'Scope 1', baseKey: 'scope1' as const, type: 'Direct' },
		{ label: 'Scope 2', baseKey: 'scope2' as const, type: 'Electricity' },
		{ label: 'Scope 3', baseKey: 'scope3' as const, type: 'Value Chain' },
	]

	return (
		<div className="space-y-3">
			<fieldset className="flex rounded-full border-none bg-gray-100 p-0">
				<legend className="sr-only">Emission target year</legend>
				{targets.map((target) => {
					const targetChange = calculateEmissionChange(
						baseTotal,
						target.projection.total,
					)
					const isSelected = target.label === selectedTarget.label

					return (
						<button
							key={target.label}
							type="button"
							aria-pressed={isSelected}
							className={`min-h-10 h-full border-none flex-1 rounded-full px-3 text-sm transition-colors ${isSelected ? 'bg-primary font-semibold text-white' : 'text-muted-foreground hover:bg-primary/[0.20]'}`}
							onClick={() => setSelectedTargetLabel(target.label)}
						>
							{target.year}{' '}
							<span className={isSelected ? 'text-blue-100' : ''}>
								({targetChange})
							</span>
						</button>
					)
				})}
			</fieldset>

			<div className="rounded-lg p-3 text-sm border border-secondary/35 bg-success/[0.04]">
				Base Year: <strong>{baseYearProjection?.year ?? '-'}</strong>
				<span className="mx-1.5">·</span>
				Target: <strong>{totalChange} emissions across all scopes</strong>
			</div>

			<div className="space-y-3">
				{rows.map((row) => {
					const baseEmission = baseYearProjection?.[row.baseKey] ?? 0
					const targetEmission = selectedTarget.projection[row.baseKey]
					const change = calculateEmissionChange(baseEmission, targetEmission)
					const remaining = getRemainingPercentage(baseEmission, targetEmission)

					return (
						<div
							key={row.baseKey}
							className="space-y-3 rounded-lg border border-success/35 bg-card px-4 py-4"
						>
							<div className="flex items-start justify-between gap-3">
								<div className="font-semibold text-primary">
									{row.label}{' '}
									<span className="font-normal text-primary">
										({row.type})
									</span>
								</div>
								<span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
									{change}
								</span>
							</div>
							<div className="flex flex-wrap items-baseline gap-2 text-sm text-muted-foreground">
								<span>{formatEmission(baseEmission)}</span>
								<span aria-hidden="true" className="text-lg">
									→
								</span>
								<strong className="text-xl text-foreground">
									{formatEmission(targetEmission)}
								</strong>
								<span>tCO2e</span>
							</div>
							<div
								className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white"
								role="img"
								aria-label={`${remaining.toFixed(1)}% of base emissions remain`}
							>
								<div
									className="h-full rounded-full bg-primary"
									style={{ width: `${remaining}%` }}
								/>
							</div>
						</div>
					)
				})}
			</div>

			<div className="space-y-3 rounded-lg bg-success/[0.04] border border-success/35 px-4 py-4">
				<div className="flex items-center justify-between gap-3">
					<h4 className="font-semibold text-primary">Total Emissions</h4>
					<span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
						{totalChange}
					</span>
				</div>
				<div className="flex flex-wrap items-baseline gap-2 text-sm text-black dark:text-white">
					<span>{formatEmission(baseTotal)}</span>
					<span aria-hidden="true" className="text-lg">
						→
					</span>
					<strong className="text-3xl text-black dark:text-white">
						{formatEmission(targetTotal)}
					</strong>
					<span>tCO2e</span>
				</div>
				<div
					className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white"
					role="img"
					aria-label={`${getRemainingPercentage(baseTotal, targetTotal).toFixed(1)}% of base emissions remain`}
				>
					<div
						className="h-full rounded-full bg-primary"
						style={{
							width: `${getRemainingPercentage(baseTotal, targetTotal)}%`,
						}}
					/>
				</div>
				<div className="flex justify-between text-xs text-primary">
					<span>Target {formatEmission(targetTotal)}</span>
					<span>Base {formatEmission(baseTotal)}</span>
				</div>
			</div>
		</div>
	)
}

// ============================================================================
// Placeholder Component (No Targets)
// ============================================================================

function TargetsPlaceholder() {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col items-center justify-center py-8 px-4 text-center">
			<div className="rounded-full bg-muted p-4 mb-4">
				<TargetIcon className="h-8 w-8 text-muted-foreground" />
			</div>
			<h4 className="text-lg font-semibold mb-2">No Emission Targets Set</h4>
			<p className="text-sm text-muted-foreground mb-6 max-w-md">
				Define your organization's emission reduction targets to track progress
				towards sustainability goals.
			</p>
			<Button onClick={() => navigate({ to: '/app/targets' })}>
				Set Targets
				<ArrowRightIcon className="ml-2 h-4 w-4" />
			</Button>
		</div>
	)
}

// ============================================================================
// Targets Content Component (Has Targets)
// ============================================================================

interface TargetsContentProps {
	targets: TargetsData
}

function TargetsContent({ targets }: TargetsContentProps) {
	const navigate = useNavigate()

	const baseYearProjection = findProjectionByFlag(
		targets.projections,
		'isBaseYear',
	)
	const targetYearProjection = findProjectionByFlag(
		targets.projections,
		'isTargetYear',
	)
	const longTermProjection = findProjectionByFlag(
		targets.projections,
		'isLongTermTargetYear',
	)

	// Check if we have the minimum required data
	const hasTargetYearData = baseYearProjection && targetYearProjection
	const hasLongTermData = baseYearProjection && longTermProjection
	const availableTargets = [
		targetYearProjection && {
			year: targets.targetYear,
			label: 'target',
			projection: targetYearProjection,
		},
		longTermProjection && {
			year: targets.longTermTargetYear ?? longTermProjection.year,
			label: 'long-term',
			projection: longTermProjection,
		},
	].filter((target) => target !== null && target !== undefined)

	return (
		<div className='space-y-6'>
			{availableTargets.length > 0 && (
				<EmissionTargetView
					targets={availableTargets}
					baseYearProjection={baseYearProjection}
				/>
			)}

			{!hasTargetYearData && !hasLongTermData && (
				<div className='text-center py-4 text-muted-foreground'>
					<p>Incomplete target data. Please update your targets.</p>
				</div>
			)}

			<div className="space-y-4 border-t pt-4">
				{targets.keyActionsToReachTargets && <div><h4 className="text-sm font-semibold">{m["environmental.C3.keyActionsLabel"]()}</h4><p className="text-sm text-muted-foreground whitespace-pre-wrap">{targets.keyActionsToReachTargets}</p></div>}
				{targets.climateTransitionPlanStatus && <div><h4 className="text-sm font-semibold">{m["environmental.C3.summaryTitle"]()}</h4><p className="text-sm text-muted-foreground">{targets.climateTransitionPlanStatus === 'yes' ? m["environmental.C3.adopted"]() : m["environmental.C3.notAdopted"]()}{targets.climateTransitionPlanDescription ? `: ${targets.climateTransitionPlanDescription}` : ''}{targets.climateTransitionPlanStatus === 'no' && targets.futureClimateTransitionPlanStatus ? `; ${m["environmental.C3.futureAdoption"]()}: ${targets.futureClimateTransitionPlanStatus === 'yes' ? m["environmental.C3.yes"]() : m["environmental.C3.no"]()}` : ''}{targets.futureClimateTransitionPlanStatus === 'yes' && targets.plannedClimateTransitionPlanAdoptionYear ? ` (${targets.plannedClimateTransitionPlanAdoptionYear})` : ''}</p></div>}
			</div>

			<div className='flex justify-end pt-2'>
				<Button variant='outline' onClick={() => navigate({ to: "/app/targets" })}>
					Edit Targets
					<ArrowRightIcon className='ml-2 h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}

// ============================================================================
// Main C3 Form Component (for use inside FormCard)
// ============================================================================

interface C3TargetsFormProps {
	targets: TargetsData | null | undefined
	isLoading?: boolean
}

export function C3TargetsForm({ targets, isLoading }: C3TargetsFormProps) {
	const hasTargets = targets !== null && targets !== undefined

	if (isLoading) {
		return <LoadingSkeleton />
	}

	if (!hasTargets) {
		return <TargetsPlaceholder />
	}

	return <TargetsContent targets={targets} />
}

// ============================================================================
// Exports for parent component
// ============================================================================

export type { TargetsData }
