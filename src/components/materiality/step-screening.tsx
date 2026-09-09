import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Check,
	HelpCircle,
	Plus,
	Sparkles,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ESRS_TOPICS_METADATA } from './constants'
import type { MaterialityTopicItem, ScreeningStatus } from './types'

interface StepScreeningProps {
	topics: MaterialityTopicItem[]
	onUpdateTopic: (
		topicId: string,
		screening: ScreeningStatus,
		skipReason?: string,
		skipReasonSource?: 'suggested' | 'custom',
	) => void
	onAddCustomTopic: (label: string) => Promise<unknown>
	onProceed: () => void
	onBack: () => void
	isSubmitting?: boolean
}

export function StepScreening({
	topics,
	onUpdateTopic,
	onAddCustomTopic,
	onProceed,
	onBack,
	isSubmitting = false,
}: StepScreeningProps) {
	const [newTopicLabel, setNewTopicLabel] = useState('')
	const [isAddingTopic, setIsAddingTopic] = useState(false)
	const [customError, setCustomError] = useState<string | null>(null)

	const relevantCount = topics.filter(
		(t) => t.screening === 'relevant' || t.screening === 'notSure',
	).length
	const screenedOutCount = topics.filter(
		(t) => t.screening === 'notRelevant',
	).length

	const handleStatusSelect = (
		topic: MaterialityTopicItem,
		status: ScreeningStatus,
	) => {
		if (!topic._id) return

		let skipReason = topic.skipReason
		let skipSource = topic.skipReasonSource

		if (status === 'notRelevant' && !skipReason) {
			const meta = ESRS_TOPICS_METADATA[topic.topicKey]
			skipReason =
				meta?.defaultSkipReasons?.[0] ||
				'Screened out during proportionality review.'
			skipSource = 'suggested'
		}

		onUpdateTopic(topic._id, status, skipReason, skipSource)
	}

	const handleReasonSelect = (topic: MaterialityTopicItem, reason: string) => {
		if (!topic._id) return
		onUpdateTopic(topic._id, 'notRelevant', reason, 'suggested')
	}

	const handleCustomReasonChange = (
		topic: MaterialityTopicItem,
		reason: string,
	) => {
		if (!topic._id) return
		onUpdateTopic(topic._id, 'notRelevant', reason, 'custom')
	}

	const handleCreateCustomTopic = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!newTopicLabel.trim()) {
			setCustomError('Please provide a topic title.')
			return
		}
		setCustomError(null)
		try {
			await onAddCustomTopic(newTopicLabel.trim())
			setNewTopicLabel('')
			setIsAddingTopic(false)
		} catch (err) {
			const msg = err instanceof Error ? err.message : 'Failed to add topic'
			setCustomError(msg)
		}
	}

	const getSourceBadge = (source?: string) => {
		switch (source) {
			case 'answers':
				return (
					<Badge
						variant="secondary"
						className="text-sm font-normal px-2.5 py-0.5 bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20"
					>
						From your answers
					</Badge>
				)
			case 'check':
				return (
					<Badge
						variant="secondary"
						className="text-sm font-normal px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
					>
						Needs a look
					</Badge>
				)
			case 'sector':
				return (
					<Badge
						variant="outline"
						className="text-sm font-normal px-2.5 py-0.5 text-muted-foreground"
					>
						From your sector
					</Badge>
				)
			case 'none':
				return (
					<Badge variant="secondary" className="text-sm font-normal px-2.5 py-0.5">
						Company-specific
					</Badge>
				)
			default:
				return null
		}
	}

	return (
		<div className="space-y-6">
			{/* Step Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30 border rounded-xl p-4 sm:p-5">
				<div>
					<h2 className="text-xl font-bold text-foreground">
						Step 2: Topic Relevance Screening
					</h2>
					<p className="text-base text-muted-foreground mt-1 leading-relaxed font-normal">
						Screen the 10 sustainability matters. Relevant and unverified topics
						will proceed to scoring.
					</p>
				</div>
				<div className="flex items-center gap-3 shrink-0">
					<div className="text-right">
						<div className="text-base font-normal text-foreground">
							{relevantCount} for scoring &bull; {screenedOutCount} excluded
						</div>
						<div className="text-sm text-muted-foreground font-normal">
							Typical SME range: 4 to 7 active topics
						</div>
					</div>
				</div>
			</div>

			{/* Topics List */}
			<div className="space-y-3.5">
				{topics.map((topic, index) => {
					const meta = ESRS_TOPICS_METADATA[topic.topicKey]
					const title = topic.customLabel || meta?.name || topic.topicKey
					const description =
						meta?.description || 'Entity-specific sustainability matter.'
					const isNotRelevant = topic.screening === 'notRelevant'
					const isRelevant = topic.screening === 'relevant'
					const isNotSure = topic.screening === 'notSure'

					return (
						<Card
							key={topic.topicKey}
							className={`transition-all ${
								isNotRelevant
									? 'opacity-75 bg-muted/20 border-muted'
									: isRelevant
										? 'border-primary/30 shadow-xs'
										: 'border-amber-500/30 bg-amber-500/5'
							}`}
						>
							<CardContent className="p-4 sm:p-5">
								<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
									{/* Topic Info */}
									<div className="space-y-1.5 flex-1 pr-2">
										<div className="flex items-center gap-2.5 flex-wrap">
											<span className="text-sm font-normal text-muted-foreground font-mono">
												#{index + 1}
											</span>
											<h3 className="text-xl font-semibold text-foreground">
												{title}
											</h3>
											{getSourceBadge(topic.prefillSource)}
										</div>
										<p className="text-base text-muted-foreground leading-relaxed font-normal">
											{description}
										</p>
										{topic.prefillNote && (
											<div className="flex items-center gap-1.5 text-base font-normal text-muted-foreground mt-1.5 italic">
												<Sparkles className="w-4 h-4 text-primary shrink-0" />
												<span>{topic.prefillNote}</span>
											</div>
										)}
									</div>

									{/* 3-Way Screening Control */}
									<div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-lg border shrink-0 self-start">
										<Button
											type="button"
											size="sm"
											variant={isRelevant ? 'default' : 'ghost'}
											onClick={() => handleStatusSelect(topic, 'relevant')}
											className={`h-10 px-4 text-base gap-2 transition-all duration-150 active:scale-[0.97] ${isRelevant ? 'font-normal shadow-xs' : 'font-normal'}`}
										>
											<Check className="w-4 h-4" />
											Relevant
										</Button>
										<Button
											type="button"
											size="sm"
											variant={isNotSure ? 'secondary' : 'ghost'}
											onClick={() => handleStatusSelect(topic, 'notSure')}
											className={`h-10 px-4 text-base gap-2 transition-all duration-150 active:scale-[0.97] ${isNotSure ? 'font-normal text-amber-700 dark:text-amber-300 border-amber-500/30' : 'font-normal'}`}
										>
											<HelpCircle className="w-4 h-4" />
											Not sure
										</Button>
										<Button
											type="button"
											size="sm"
											variant={isNotRelevant ? 'destructive' : 'ghost'}
											onClick={() => handleStatusSelect(topic, 'notRelevant')}
											className={`h-10 px-4 text-base gap-2 transition-all duration-150 active:scale-[0.97] ${isNotRelevant ? 'font-normal' : 'font-normal text-muted-foreground'}`}
										>
											<X className="w-4 h-4" />
											Not relevant
										</Button>
									</div>
								</div>

								{/* Skip Reason Section for Not Relevant Topics */}
								{isNotRelevant && (
									<div className="mt-4 pt-3.5 border-t border-dashed space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-base font-normal text-foreground flex items-center gap-2">
												<AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
												Recorded exclusion justification (required for audit
												trail):
											</span>
										</div>

										{meta?.defaultSkipReasons &&
											meta.defaultSkipReasons.length > 0 && (
												<div className="flex flex-wrap gap-2">
													{meta.defaultSkipReasons.map((reason) => {
														const isSelected = topic.skipReason === reason
														return (
															<button
																key={reason}
																type="button"
																onClick={() =>
																	handleReasonSelect(topic, reason)
																}
																className={`text-base font-normal text-left px-3.5 py-2 rounded-md border transition-all duration-150 cursor-pointer active:scale-[0.97] leading-snug ${
																	isSelected
																		? 'bg-primary text-primary-foreground border-primary font-normal'
																		: 'bg-background text-muted-foreground hover:bg-muted/70 hover:text-foreground'
																}`}
															>
																{reason}
															</button>
														)
													})}
												</div>
											)}

										<Textarea
											placeholder="Or write custom reason why this does not apply to your operations..."
											value={topic.skipReason || ''}
											onChange={(e) =>
												handleCustomReasonChange(topic, e.target.value)
											}
											className="text-base min-h-[75px] resize-none leading-relaxed font-normal"
										/>
									</div>
								)}
							</CardContent>
						</Card>
					)
				})}
			</div>

			{/* Add Custom Topic */}
			{!isAddingTopic ? (
				<Button
					type="button"
					variant="outline"
					onClick={() => setIsAddingTopic(true)}
					className="w-full h-12 border-dashed py-3 text-base font-normal text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-[0.99]"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Entity-Specific Topic (e.g., Night Shift Flight Noise, Offshore
					Logistics)
				</Button>
			) : (
				<Card className="border-dashed border-primary/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-xl font-bold text-foreground">
							Add Custom Sustainability Topic
						</CardTitle>
						<CardDescription className="text-base text-muted-foreground leading-relaxed mt-1 font-normal">
							Entity-specific topics screen and score identical to standard ESRS
							matters and populate the narrative C1/C2 sections.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleCreateCustomTopic} className="space-y-3">
							<Input
								placeholder="Topic Title (e.g. Hazardous Marine Spills, Specialised Drone Noise)"
								value={newTopicLabel}
								onChange={(e) => setNewTopicLabel(e.target.value)}
								className="text-base h-11 font-normal"
							/>
							{customError && (
								<p className="text-base text-destructive font-normal">{customError}</p>
							)}
							<div className="flex items-center justify-end gap-2.5">
								<Button
									type="button"
									variant="ghost"
									onClick={() => {
										setIsAddingTopic(false)
										setCustomError(null)
									}}
									className="text-base h-10 px-4 font-normal"
								>
									Cancel
								</Button>
								<Button type="submit" className="text-base h-10 px-4 font-normal">
									Add Topic
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			)}

			{/* Step Navigation Bar */}
			<div className="flex items-center justify-between pt-4 border-t">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="h-11 gap-2 px-5 text-base font-normal transition-all duration-150 active:scale-[0.98]"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Setup
				</Button>
				<Button
					type="button"
					onClick={onProceed}
					disabled={isSubmitting}
					className="h-11 gap-2.5 px-6 text-base font-normal transition-all duration-150 active:scale-[0.98]"
				>
					Continue to Scoring ({relevantCount} Topics)
					<ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	)
}
