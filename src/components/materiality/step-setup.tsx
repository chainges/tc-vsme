import { ArrowRight, Building2, HelpCircle, Info, Users } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { INTAKE_QUESTIONS, STAKEHOLDER_GROUPS } from './constants'
import type { IntakeAnswer, StakeholderItem } from './types'

interface StepSetupProps {
	organizationName?: string
	naceCode?: string
	initialIntake?: IntakeAnswer[]
	initialStakeholders?: StakeholderItem[]
	onProceed: (intake: IntakeAnswer[], stakeholders: StakeholderItem[]) => void
	isSubmitting?: boolean
}

export function StepSetup({
	organizationName = 'Your Organization',
	naceCode = '41.20',
	initialIntake = [],
	initialStakeholders = [],
	onProceed,
	isSubmitting = false,
}: StepSetupProps) {
	const [intakeMap, setIntakeMap] = useState<
		Record<string, 'yes' | 'no' | 'unsure'>
	>(() => {
		const map: Record<string, 'yes' | 'no' | 'unsure'> = {}
		for (const q of INTAKE_QUESTIONS) {
			const existing = initialIntake.find((item) => item.key === q.key)
			map[q.key] = existing?.answer || 'no'
		}
		return map
	})

	const [stakeholders, setStakeholders] = useState<
		Record<string, { engaged: boolean; whatTheySaid: string }>
	>(() => {
		const map: Record<string, { engaged: boolean; whatTheySaid: string }> = {}
		for (const group of STAKEHOLDER_GROUPS) {
			const existing = initialStakeholders.find((s) => s.group === group.key)
			map[group.key] = {
				engaged: existing?.engaged || false,
				whatTheySaid: existing?.whatTheySaid || '',
			}
		}
		return map
	})

	const handleAnswerChange = (key: string, answer: 'yes' | 'no' | 'unsure') => {
		setIntakeMap((prev) => ({
			...prev,
			[key]: answer,
		}))
	}

	const handleStakeholderToggle = (key: string, checked: boolean) => {
		setStakeholders((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				engaged: checked,
			},
		}))
	}

	const handleStakeholderNoteChange = (key: string, note: string) => {
		setStakeholders((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				whatTheySaid: note,
			},
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const intakeArray: IntakeAnswer[] = Object.entries(intakeMap).map(
			([key, answer]) => ({
				key,
				answer,
			}),
		)

		const stakeholderArray: StakeholderItem[] = Object.entries(
			stakeholders,
		).map(([group, val]) => ({
			group,
			engaged: val.engaged,
			whatTheySaid: val.whatTheySaid,
			customLabel: STAKEHOLDER_GROUPS.find((g) => g.key === group)?.label,
		}))

		onProceed(intakeArray, stakeholderArray)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Sector & Company Overview Card */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between flex-wrap gap-2">
						<div className="flex items-center gap-2.5">
							<Building2 className="w-5 h-5 text-primary" />
							<CardTitle className="text-xl font-bold text-foreground">
								1. Company Baseline & Sector Classification
							</CardTitle>
						</div>
						<Badge variant="outline" className="text-sm font-normal px-2.5 py-1 font-mono text-muted-foreground">
							NACE: {naceCode}
						</Badge>
					</div>
					<CardDescription className="text-base text-muted-foreground mt-1 leading-relaxed font-normal">
						Confirming your sector classification pulled from General
						Information (B1). This drives the initial seed profile.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base bg-muted/40 p-3.5 rounded-lg border">
						<div>
							<span className="text-muted-foreground text-sm font-normal block">
								Reporting Entity
							</span>
							<span className="font-normal text-foreground text-base">
								{organizationName}
							</span>
						</div>
						<div>
							<span className="text-muted-foreground text-sm font-normal block">
								Active NACE Division
							</span>
							<span className="font-normal text-foreground text-base">
								{naceCode} – General Business & Contracting
							</span>
						</div>
					</div>
					<p className="text-base text-muted-foreground leading-relaxed font-normal">
						The assessment will run on the European Voluntary Standard (VS)
						baseline, valid for roughly 3 reporting years.
					</p>
				</CardContent>
			</Card>

			{/* Six Intake Questions */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2.5">
						<HelpCircle className="w-5 h-5 text-primary" />
						<CardTitle className="text-xl font-bold text-foreground">
							2. Business Profile Intake (6 Questions)
						</CardTitle>
					</div>
					<CardDescription className="text-base text-muted-foreground mt-1 leading-relaxed font-normal">
						Six simple questions that calibrate topic relevance. Your answers
						override generic sector defaults with accurate suggestions.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4 divide-y">
						{INTAKE_QUESTIONS.map((q) => {
							const currentVal = intakeMap[q.key]
							return (
								<div
									key={q.key}
									className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
								>
									<div className="space-y-1 flex-1 pr-4">
										<div className="text-base font-normal text-foreground leading-snug">
											{q.question}
										</div>
										<div className="text-base text-muted-foreground leading-relaxed font-normal">
											{q.description}
										</div>
									</div>
									<div className="flex items-center gap-1.5 shrink-0 bg-muted/60 p-1.5 rounded-lg border">
										<Button
											type="button"
											size="sm"
											variant={currentVal === 'yes' ? 'default' : 'ghost'}
											onClick={() => handleAnswerChange(q.key, 'yes')}
											className="h-10 px-4 text-base font-normal transition-all duration-150 active:scale-[0.97]"
										>
											Yes
										</Button>
										<Button
											type="button"
											size="sm"
											variant={currentVal === 'no' ? 'default' : 'ghost'}
											onClick={() => handleAnswerChange(q.key, 'no')}
											className="h-10 px-4 text-base font-normal transition-all duration-150 active:scale-[0.97]"
										>
											No
										</Button>
										<Button
											type="button"
											size="sm"
											variant={currentVal === 'unsure' ? 'secondary' : 'ghost'}
											onClick={() => handleAnswerChange(q.key, 'unsure')}
											className="h-10 px-4 text-base font-normal transition-all duration-150 active:scale-[0.97]"
										>
											Not sure
										</Button>
									</div>
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			{/* Stakeholder Engagement Card */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2.5">
						<Users className="w-5 h-5 text-primary" />
						<CardTitle className="text-xl font-bold text-foreground">3. Stakeholder Engagement</CardTitle>
					</div>
					<CardDescription className="text-base text-muted-foreground mt-1 leading-relaxed font-normal">
						Record which stakeholder perspectives were considered. In V1, this
						is an honest written note for your report audit trail.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert className="bg-muted/40 border-muted">
						<Info className="w-4 h-4 text-muted-foreground" />
						<AlertTitle className="text-base font-semibold text-foreground">
							Proportionate to SME Scale
						</AlertTitle>
						<AlertDescription className="text-base text-muted-foreground leading-relaxed mt-1 font-normal">
							Under the VS Standard, full scientific surveys are not required.
							Checking who you have spoken with and noting key feedback provides
							valid evidence.
						</AlertDescription>
					</Alert>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
						{STAKEHOLDER_GROUPS.map((g) => {
							const item = stakeholders[g.key]
							return (
								<div
									key={g.key}
									className={`p-3.5 rounded-lg border transition-colors ${
										item?.engaged
											? 'bg-primary/5 border-primary/40'
											: 'bg-card hover:bg-muted/30'
									}`}
								>
									<div className="flex items-start gap-3">
										<Checkbox
											id={`st-${g.key}`}
											checked={item?.engaged || false}
											onCheckedChange={(checked) =>
												handleStakeholderToggle(g.key, Boolean(checked))
											}
											className="mt-1 size-4.5"
										/>
										<div className="space-y-1 flex-1">
											<label
												htmlFor={`st-${g.key}`}
												className="text-base font-normal leading-snug cursor-pointer select-none text-foreground block"
											>
												{g.label}
											</label>
											<p className="text-base text-muted-foreground leading-relaxed font-normal">
												{g.description}
											</p>
										</div>
									</div>

									{item?.engaged && (
										<div className="mt-3 pl-7">
											<Textarea
												placeholder="What did this group emphasise? (optional short note)"
												value={item.whatTheySaid || ''}
												onChange={(e) =>
													handleStakeholderNoteChange(g.key, e.target.value)
												}
												className="text-base min-h-[75px] resize-none leading-relaxed font-normal"
											/>
										</div>
									)}
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			{/* Action Footer */}
			<div className="flex items-center justify-end gap-3 pt-3">
				<Button type="submit" disabled={isSubmitting} className="h-11 gap-2.5 px-6 text-base font-normal transition-all duration-150 active:scale-[0.98]">
					{isSubmitting
						? 'Generating Pre-fill...'
						: 'Save & Proceed to Topic Screening'}
					<ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</form>
	)
}
