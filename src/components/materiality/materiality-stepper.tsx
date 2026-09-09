import {
	BarChart3,
	Check,
	ClipboardList,
	FileCheck2,
	Filter,
	type LucideIcon,
	Sliders,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { StepNumber } from './types'

interface MaterialityStepperProps {
	currentStep: StepNumber
	onStepChange: (step: StepNumber) => void
	maxReachedStep: StepNumber
	isSaving?: boolean
}

const STEPS: {
	step: StepNumber
	label: string
	description: string
	icon: LucideIcon
}[] = [
	{
		step: 1,
		label: 'Set up',
		description: 'Profile & Intake',
		icon: ClipboardList,
	},
	{ step: 2, label: 'Screening', description: '10 Topics Scope', icon: Filter },
	{
		step: 3,
		label: 'Scoring',
		description: 'Double Materiality',
		icon: Sliders,
	},
	{
		step: 4,
		label: 'Results',
		description: 'Ranking & Matrix',
		icon: BarChart3,
	},
	{
		step: 5,
		label: 'Handover',
		description: 'VS Report Bridge',
		icon: FileCheck2,
	},
]

export function MaterialityStepper({
	currentStep,
	onStepChange,
	maxReachedStep,
	isSaving = false,
}: MaterialityStepperProps) {
	return (
		<div className="w-full bg-card border rounded-xl p-4 shadow-sm mb-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<nav aria-label="Progress" className="w-full">
					<ol className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
						{STEPS.map((s) => {
							const Icon = s.icon
							const isCurrent = s.step === currentStep
							const isCompleted =
								s.step < currentStep || s.step < maxReachedStep
							const isAccessible = s.step <= maxReachedStep

							return (
								<li key={s.step} className="relative">
									<Button
										type="button"
										variant={
											isCurrent
												? 'default'
												: isCompleted
													? 'secondary'
													: 'ghost'
										}
										disabled={!isAccessible}
										onClick={() => onStepChange(s.step)}
										className={cn(
											'w-full h-auto py-3 px-3.5 flex items-center justify-start gap-3 text-left transition-all duration-150 active:scale-[0.98]',
											isCurrent && 'shadow-sm font-normal',
											!isCurrent && isCompleted && 'text-foreground',
											!isAccessible && 'opacity-50 cursor-not-allowed',
										)}
									>
										<div
											className={cn(
												'flex items-center justify-center w-8 h-8 rounded-full text-sm shrink-0 font-normal',
												isCurrent && 'bg-primary-foreground text-primary',
												!isCurrent &&
													isCompleted &&
													'bg-primary/20 text-primary',
												!isCurrent &&
													!isCompleted &&
													'bg-muted text-muted-foreground',
											)}
										>
											{isCompleted ? (
												<Check className="w-4 h-4" />
											) : (
												<Icon className="w-4 h-4" />
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="text-base font-normal truncate">
												{s.label}
											</div>
											<div className="text-sm font-normal text-muted-foreground truncate hidden md:block">
												{s.description}
											</div>
										</div>
									</Button>
								</li>
							)
						})}
					</ol>
				</nav>
			</div>
			{isSaving && (
				<div className="text-right mt-1.5 text-sm font-normal text-muted-foreground animate-pulse">
					Saving changes...
				</div>
			)}
		</div>
	)
}
