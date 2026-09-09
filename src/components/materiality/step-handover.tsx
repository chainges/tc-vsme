import {
	AlertTriangle,
	ArrowLeft,
	BadgeCheck,
	Calendar,
	CheckCircle2,
	FileText,
	Layers,
	Send,
} from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
	DISCLOSURE_LABELS,
	ESRS_TOPICS_METADATA,
	TOPIC_DISCLOSURE_POINTERS,
} from './constants'
import type { MaterialityTopicItem, ReportTopicStatusItem } from './types'

interface StepHandoverProps {
	topics: MaterialityTopicItem[]
	reportTopicStatuses?: ReportTopicStatusItem[]
	reportingYear?: number
	validUntilDate?: string
	onUpdateTopicStatus: (
		topicKey: string,
		addressed: boolean,
		whatWeDo?: string,
		narrativeSlot?: string,
	) => void
	onSignOff: () => Promise<void>
	onBack: () => void
	isSubmitting?: boolean
	isCompleted?: boolean
}

export function StepHandover({
	topics,
	reportTopicStatuses = [],
	reportingYear = 2026,
	validUntilDate = '2029-09-04',
	onUpdateTopicStatus,
	onSignOff,
	onBack,
	isSubmitting = false,
	isCompleted = false,
}: StepHandoverProps) {
	const [topicStatusMap, setTopicStatusMap] = useState<
		Record<
			string,
			{ addressed: boolean; whatWeDo: string; narrativeSlot: string }
		>
	>(() => {
		const map: Record<
			string,
			{ addressed: boolean; whatWeDo: string; narrativeSlot: string }
		> = {}
		for (const t of topics) {
			const match = reportTopicStatuses.find((r) => r.topicKey === t.topicKey)
			map[t.topicKey] = {
				addressed: match?.addressed ?? false,
				whatWeDo: match?.whatWeDo ?? '',
				narrativeSlot: match?.narrativeSlot ?? 'C1',
			}
		}
		return map
	})

	const [hasSignedOff, setHasSignedOff] = useState(isCompleted)

	const materialTopics = topics.filter((t) => t.isMaterial)
	const nonMaterialTopics = topics.filter(
		(t) => !t.isMaterial && t.screening !== 'notRelevant',
	)

	const handleToggleAddressed = (topicKey: string, addressed: boolean) => {
		setTopicStatusMap((prev) => ({
			...prev,
			[topicKey]: {
				...prev[topicKey],
				addressed,
			},
		}))
		onUpdateTopicStatus(
			topicKey,
			addressed,
			topicStatusMap[topicKey]?.whatWeDo,
			topicStatusMap[topicKey]?.narrativeSlot,
		)
	}

	const handleWhatWeDoChange = (topicKey: string, whatWeDo: string) => {
		setTopicStatusMap((prev) => ({
			...prev,
			[topicKey]: {
				...prev[topicKey],
				whatWeDo,
			},
		}))
		onUpdateTopicStatus(
			topicKey,
			topicStatusMap[topicKey]?.addressed ?? false,
			whatWeDo,
			topicStatusMap[topicKey]?.narrativeSlot,
		)
	}

	const handleComplete = async () => {
		await onSignOff()
		setHasSignedOff(true)
	}

	// 2x2 categorisation:
	// Q1: Material & Addressed
	const q1Topics = materialTopics.filter(
		(t) => topicStatusMap[t.topicKey]?.addressed,
	)
	// Q2: Material & Not Addressed Yet (High value discovery!)
	const q2Topics = materialTopics.filter(
		(t) => !topicStatusMap[t.topicKey]?.addressed,
	)
	// Q3: Non-Material & Addressed
	const q3Topics = nonMaterialTopics.filter(
		(t) => topicStatusMap[t.topicKey]?.addressed,
	)
	// Q4: Non-Material & Not Addressed
	const q4Topics = nonMaterialTopics.filter(
		(t) => !topicStatusMap[t.topicKey]?.addressed,
	)

	return (
		<div className="space-y-6">
			{/* 3-Year Validity Banner */}
			<Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30">
				<CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<Calendar className="w-5 h-5 text-primary shrink-0" />
							<h3 className="text-xl font-bold text-foreground">
								3-Year Materiality Cycle
							</h3>
							{hasSignedOff && (
								<Badge className="bg-emerald-600 text-white text-sm font-normal px-2.5 py-0.5">
									<BadgeCheck className="w-3.5 h-3.5 mr-1 inline" /> Signed Off
									& Valid
								</Badge>
							)}
						</div>
						<p className="text-base leading-relaxed text-muted-foreground mt-1 font-normal">
							This double materiality assessment feeds your annual VS reporting
							for 3 years (e.g. {reportingYear} – {reportingYear + 3}). Annual
							light check-ins verify that no material triggers have occurred.
						</p>
					</div>
					<div className="shrink-0 text-right">
						<span className="text-sm font-normal text-muted-foreground block">
							Validity Target
						</span>
						<span className="text-base font-mono font-normal text-foreground">
							Until {validUntilDate}
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Contract & Boundary Note */}
			<Alert className="bg-muted/40 border-border">
				<Layers className="w-5 h-5 text-primary shrink-0" />
				<AlertTitle className="text-base font-semibold tracking-wide">
					Report Contract & Boundary
				</AlertTitle>
				<AlertDescription className="text-base leading-relaxed text-muted-foreground mt-1 font-normal">
					The assessment never switches off or hides standard report
					disclosures. Numbered indicators (B1–B11) remain standard. Material
					topics with no dedicated disclosure code are satisfied by a few clear
					sentences in C1/C2, while your active initiatives connect to B2.
				</AlertDescription>
			</Alert>

			{/* Material Topics Actioning List */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-xl font-bold">
						Material Disclosures & Action Status
					</CardTitle>
					<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
						Review the {materialTopics.length} material topics identified.
						Specify whether your company already has an active policy or
						initiative running.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-3 divide-y">
						{materialTopics.map((topic) => {
							const meta = ESRS_TOPICS_METADATA[topic.topicKey]
							const title = topic.customLabel || meta?.name || topic.topicKey
							const pointers = TOPIC_DISCLOSURE_POINTERS[topic.topicKey] || []
							const status = topicStatusMap[topic.topicKey] || {
								addressed: false,
								whatWeDo: '',
							}

							return (
								<div key={topic.topicKey} className="pt-3 first:pt-0 space-y-3">
									<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
										<div className="space-y-1 flex-1">
											<div className="flex items-center gap-2 flex-wrap">
												<span className="text-base font-normal text-foreground">
													{title}
												</span>
												<Badge className="bg-primary text-primary-foreground text-sm font-normal px-2.5 py-0.5">
													Material
												</Badge>
											</div>

											{/* Disclosure Pointers */}
											<div className="flex items-center gap-1.5 flex-wrap pt-0.5">
												<span className="text-base font-normal text-muted-foreground">
													Linked Disclosures:
												</span>
												{pointers.length > 0 ? (
													pointers.map((code) => (
														<Badge
															key={code}
															variant="secondary"
															className="text-sm py-0.5 px-2 font-mono font-normal"
														>
															{DISCLOSURE_LABELS[code] || code}
														</Badge>
													))
												) : (
													<Badge
														variant="outline"
														className="text-sm py-0.5 px-2 font-normal"
													>
														C1/C2 Narrative Description
													</Badge>
												)}
											</div>
										</div>

										{/* Addressed Toggle Switch */}
										<div className="flex items-center gap-3 bg-muted/40 px-3.5 py-2 rounded-lg border shrink-0">
											<span className="text-base font-normal text-foreground">
												{status.addressed
													? 'Actively addressed'
													: 'No active programme yet'}
											</span>
											<Switch
												checked={status.addressed}
												onCheckedChange={(checked) =>
													handleToggleAddressed(topic.topicKey, checked)
												}
											/>
										</div>
									</div>

									{/* Free text for What We Do if addressed */}
									{status.addressed ? (
										<div className="pl-0 sm:pl-2">
											<Textarea
												placeholder="Briefly describe what your company does or is planning (feeds into B2 sustainability initiatives)..."
												value={status.whatWeDo || ''}
												onChange={(e) =>
													handleWhatWeDoChange(topic.topicKey, e.target.value)
												}
												className="text-base min-h-[75px] resize-none leading-relaxed font-normal"
											/>
										</div>
									) : (
										<p className="text-base leading-relaxed text-amber-700 dark:text-amber-400 italic pl-0 sm:pl-2 font-normal">
											No current initiative running. This is a valuable finding
											— flagged in your report as an opportunity area for next
											year's planning.
										</p>
									)}
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			{/* The 2x2 Handover Grid */}
			<div className="space-y-3">
				<div>
					<h3 className="text-xl font-bold text-foreground">
						Handover 2x2 Matrix
					</h3>
					<p className="text-base leading-relaxed text-muted-foreground font-normal">
						Clear overview of your operational alignment against the double
						materiality findings.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{/* Q1: Material & Addressed */}
					<Card className="border-emerald-500/30 bg-emerald-500/5">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
									Material & Handled ({q1Topics.length})
								</CardTitle>
								<CheckCircle2 className="w-5 h-5 text-emerald-600" />
							</div>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								Key priorities with ongoing actions. Mapped to B2 initiatives.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{q1Topics.length === 0 ? (
								<p className="text-base text-muted-foreground italic font-normal">
									No topics in this quadrant.
								</p>
							) : (
								<ul className="text-base space-y-2 font-normal">
									{q1Topics.map((t) => (
										<li
											key={t.topicKey}
											className="flex items-center gap-2 text-foreground font-normal text-base"
										>
											<span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
											{t.customLabel ||
												ESRS_TOPICS_METADATA[t.topicKey]?.shortName ||
												t.topicKey}
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>

					{/* Q2: Material & Nothing Running Yet */}
					<Card className="border-amber-500/30 bg-amber-500/5">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
									Material & Nothing Running Yet ({q2Topics.length})
								</CardTitle>
								<AlertTriangle className="w-5 h-5 text-amber-600" />
							</div>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								High-value strategic discoveries. Prime candidates for target
								setting.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{q2Topics.length === 0 ? (
								<p className="text-base text-muted-foreground italic font-normal">
									None (all material topics handled).
								</p>
							) : (
								<ul className="text-base space-y-2 font-normal">
									{q2Topics.map((t) => (
										<li
											key={t.topicKey}
											className="flex items-center gap-2 text-foreground font-normal text-base"
										>
											<span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
											{t.customLabel ||
												ESRS_TOPICS_METADATA[t.topicKey]?.shortName ||
												t.topicKey}
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>

					{/* Q3: Not Material & Addressed */}
					<Card className="border-border bg-card">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
									Non-Material & Addressed ({q3Topics.length})
								</CardTitle>
								<FileText className="w-5 h-5 text-muted-foreground" />
							</div>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								Existing activities in areas below threshold. Kept in B2 for
								completeness.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{q3Topics.length === 0 ? (
								<p className="text-base text-muted-foreground italic font-normal">None.</p>
							) : (
								<ul className="text-base space-y-2 font-normal">
									{q3Topics.map((t) => (
										<li
											key={t.topicKey}
											className="flex items-center gap-2 text-muted-foreground font-normal text-base"
										>
											<span className="w-2 h-2 rounded-full bg-muted-foreground shrink-0" />
											{t.customLabel ||
												ESRS_TOPICS_METADATA[t.topicKey]?.shortName ||
												t.topicKey}
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>

					{/* Q4: Not Material & Nothing Running */}
					<Card className="border-border bg-card opacity-80">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
									Non-Material & Not Running ({q4Topics.length})
								</CardTitle>
							</div>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								Properly scoped out or scored below threshold.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{q4Topics.length === 0 ? (
								<p className="text-base text-muted-foreground italic font-normal">None.</p>
							) : (
								<p className="text-base text-muted-foreground leading-relaxed font-normal">
									{q4Topics.length} topics require no action and no reporting.
								</p>
							)}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Completion & Sign-off Footer */}
			<div className="flex items-center justify-between pt-4 border-t">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="gap-2 h-11 px-5 text-base font-normal active:scale-[0.98] transition-all"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Results
				</Button>

				<Button
					type="button"
					onClick={handleComplete}
					disabled={isSubmitting || hasSignedOff}
					className="gap-2 h-11 px-7 text-base font-normal bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-[0.98] transition-all"
				>
					<Send className="w-4 h-4" />
					{hasSignedOff
						? 'Assessment Signed Off'
						: 'Send to Report & Sign Off Assessment'}
				</Button>
			</div>
		</div>
	)
}
