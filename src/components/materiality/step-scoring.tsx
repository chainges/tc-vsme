import {
	ArrowLeft,
	ArrowRight,
	ChevronDown,
	ChevronUp,
	DollarSign,
	FileText,
	Scale,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
	ESRS_TOPICS_METADATA,
	FINANCIAL_LIKELIHOOD_BANDS,
	FINANCIAL_MAGNITUDE_BANDS,
	IMPACT_LIKELIHOOD_BANDS,
	IMPACT_SEVERITY_BANDS,
	STATIC_THRESHOLD,
} from './constants'
import {
	computeFinancialScore,
	computeImpactScore,
	evaluateTopicMateriality,
} from './scoring'
import type { MaterialityTopicItem, ValueChainSegment } from './types'

interface StepScoringProps {
	topics: MaterialityTopicItem[]
	onUpdateScoring: (
		topicId: string,
		updates: Partial<MaterialityTopicItem>,
	) => void
	onProceed: () => void
	onBack: () => void
	isSubmitting?: boolean
}

export function StepScoring({
	topics,
	onUpdateScoring,
	onProceed,
	onBack,
	isSubmitting = false,
}: StepScoringProps) {
	const scoringTopics = topics.filter(
		(t) => t.screening === 'relevant' || t.screening === 'notSure',
	)

	const [openTopicId, setOpenTopicId] = useState<string | null>(
		() => scoringTopics[0]?._id || null,
	)

	const toggleTopicAccordion = (id: string) => {
		setOpenTopicId((prev) => (prev === id ? null : id))
	}

	const handleSubtopicToggle = (
		topic: MaterialityTopicItem,
		subtopic: string,
	) => {
		if (!topic._id) return
		const current = topic.subtopics || []
		const next = current.includes(subtopic)
			? current.filter((s) => s !== subtopic)
			: [...current, subtopic]
		onUpdateScoring(topic._id, { subtopics: next })
	}

	const handleValueChainToggle = (
		topic: MaterialityTopicItem,
		segment: ValueChainSegment,
	) => {
		if (!topic._id) return
		const current = topic.valueChain || []
		const next = current.includes(segment)
			? current.filter((s) => s !== segment)
			: [...current, segment]
		onUpdateScoring(topic._id, { valueChain: next })
	}

	const handleOccurrenceChange = (
		topic: MaterialityTopicItem,
		occurrence: 'actual' | 'potential',
	) => {
		if (!topic._id) return
		const severity = topic.impactSeverity ?? 3
		const likelihood =
			occurrence === 'actual' ? 5 : (topic.impactLikelihood ?? 3)
		const computedImpact = computeImpactScore(occurrence, severity, likelihood)
		const computedFin = computeFinancialScore(
			topic.financialMagnitude ?? 2,
			topic.financialLikelihood ?? 3,
		)

		const mat = evaluateTopicMateriality(
			computedImpact,
			computedFin,
			topic.severeHumanRightsFlag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			impactOccurrence: occurrence,
			impactLikelihood: likelihood,
			impactScore: {
				computed: computedImpact,
				effective: computedImpact,
			},
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleImpactSeverityChange = (
		topic: MaterialityTopicItem,
		severity: number,
	) => {
		if (!topic._id) return
		const occurrence = topic.impactOccurrence || 'potential'
		const likelihood =
			occurrence === 'actual' ? 5 : (topic.impactLikelihood ?? 3)
		const computedImpact = computeImpactScore(occurrence, severity, likelihood)
		const effectiveImpact = topic.impactScore?.override ?? computedImpact
		const effectiveFin = topic.financialScore?.effective ?? 2.5

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			topic.severeHumanRightsFlag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			impactSeverity: severity,
			impactScore: {
				...topic.impactScore,
				computed: computedImpact,
				effective: effectiveImpact,
			},
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleImpactLikelihoodChange = (
		topic: MaterialityTopicItem,
		likelihood: number,
	) => {
		if (!topic._id) return
		const occurrence = topic.impactOccurrence || 'potential'
		const severity = topic.impactSeverity ?? 3
		const computedImpact = computeImpactScore(occurrence, severity, likelihood)
		const effectiveImpact = topic.impactScore?.override ?? computedImpact
		const effectiveFin = topic.financialScore?.effective ?? 2.5

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			topic.severeHumanRightsFlag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			impactLikelihood: likelihood,
			impactScore: {
				...topic.impactScore,
				computed: computedImpact,
				effective: effectiveImpact,
			},
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleFinancialMagnitudeChange = (
		topic: MaterialityTopicItem,
		magnitude: number,
	) => {
		if (!topic._id) return
		const likelihood = topic.financialLikelihood ?? 3
		const computedFin = computeFinancialScore(magnitude, likelihood)
		const effectiveFin = topic.financialScore?.override ?? computedFin
		const effectiveImpact = topic.impactScore?.effective ?? 3

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			topic.severeHumanRightsFlag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			financialMagnitude: magnitude,
			financialScore: {
				...topic.financialScore,
				computed: computedFin,
				effective: effectiveFin,
			},
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleFinancialLikelihoodChange = (
		topic: MaterialityTopicItem,
		likelihood: number,
	) => {
		if (!topic._id) return
		const magnitude = topic.financialMagnitude ?? 2
		const computedFin = computeFinancialScore(magnitude, likelihood)
		const effectiveFin = topic.financialScore?.override ?? computedFin
		const effectiveImpact = topic.impactScore?.effective ?? 3

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			topic.severeHumanRightsFlag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			financialLikelihood: likelihood,
			financialScore: {
				...topic.financialScore,
				computed: computedFin,
				effective: effectiveFin,
			},
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleSevereRightsToggle = (
		topic: MaterialityTopicItem,
		flag: boolean,
	) => {
		if (!topic._id) return
		const effectiveImpact = topic.impactScore?.effective ?? 3
		const effectiveFin = topic.financialScore?.effective ?? 2.5

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			flag,
			topic.legalObligationFlag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			severeHumanRightsFlag: flag,
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleLegalObligationToggle = (
		topic: MaterialityTopicItem,
		flag: boolean,
	) => {
		if (!topic._id) return
		const effectiveImpact = topic.impactScore?.effective ?? 3
		const effectiveFin = topic.financialScore?.effective ?? 2.5

		const mat = evaluateTopicMateriality(
			effectiveImpact,
			effectiveFin,
			topic.severeHumanRightsFlag,
			flag,
			STATIC_THRESHOLD,
		)

		onUpdateScoring(topic._id, {
			legalObligationFlag: flag,
			isMaterial: mat.isMaterial,
			materialOn: mat.materialOn,
			materialityBasis: mat.basis,
		})
	}

	const handleNotesChange = (topic: MaterialityTopicItem, note: string) => {
		if (!topic._id) return
		onUpdateScoring(topic._id, { notes: note })
	}

	return (
		<div className="space-y-6">
			{/* Step Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30 border rounded-xl p-4 sm:p-5">
				<div>
					<h2 className="text-xl font-bold text-foreground">
						Step 3: Double Materiality Scoring
					</h2>
					<p className="text-base text-muted-foreground mt-1 leading-relaxed font-normal">
						Evaluate both Impact and Financial dimensions on anchored 1–5
						scales. Static threshold is set at {STATIC_THRESHOLD}.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Badge variant="outline" className="text-sm font-normal font-mono py-1 px-2.5 text-muted-foreground">
						Static Threshold: {STATIC_THRESHOLD}
					</Badge>
				</div>
			</div>

			{/* Accordion Topics List */}
			<div className="space-y-4">
				{scoringTopics.map((topic, index) => {
					const meta = ESRS_TOPICS_METADATA[topic.topicKey]
					const title = topic.customLabel || meta?.name || topic.topicKey
					const isOpen = openTopicId === topic._id
					const occurrence = topic.impactOccurrence || 'potential'
					const impactEffective = topic.impactScore?.effective ?? 3
					const financialEffective = topic.financialScore?.effective ?? 2.5
					const isMaterial = topic.isMaterial

					return (
						<Card
							key={topic.topicKey}
							className={`border transition-all ${
								isOpen
									? 'border-primary/40 shadow-sm ring-1 ring-primary/20'
									: 'border-border hover:border-muted-foreground/30'
							}`}
						>
							{/* Accordion Header Bar */}
							<button
								type="button"
								onClick={() => topic._id && toggleTopicAccordion(topic._id)}
								className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-card rounded-xl transition-all duration-150 active:scale-[0.99]"
							>
								<div className="flex items-center gap-3.5 flex-1 min-w-0">
									<span className="text-sm font-normal text-muted-foreground/80 shrink-0 font-mono">
										#{index + 1}
									</span>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2.5 flex-wrap">
											<h3 className="text-xl font-semibold text-foreground truncate">
												{title}
											</h3>
											{isMaterial ? (
												<Badge className="bg-primary text-primary-foreground text-sm px-2.5 py-0.5 font-normal">
													Material
												</Badge>
											) : (
												<Badge
													variant="outline"
													className="text-muted-foreground text-sm px-2.5 py-0.5 font-normal"
												>
													Non-material
												</Badge>
											)}
										</div>
										<div className="flex items-center gap-3 text-base text-muted-foreground mt-1 font-normal">
											<span>
												Impact:{' '}
												<strong className="text-foreground font-mono font-normal">
													{impactEffective}
												</strong>
											</span>
											<span>&bull;</span>
											<span>
												Financial:{' '}
												<strong className="text-foreground font-mono font-normal">
													{financialEffective}
												</strong>
											</span>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 shrink-0">
									<div className="h-8 w-8 flex items-center justify-center text-muted-foreground">
										{isOpen ? (
											<ChevronUp className="w-5 h-5" />
										) : (
											<ChevronDown className="w-5 h-5" />
										)}
									</div>
								</div>
							</button>

							{/* Accordion Expanded Content */}
							{isOpen && (
								<CardContent className="px-4 sm:px-6 pb-6 pt-2 border-t space-y-6">
									{/* Section A: Subtopics & Value Chain */}
									<div className="space-y-3.5 pt-2">
										{meta?.subtopics && meta.subtopics.length > 0 && (
											<div>
												<span className="text-base font-normal text-foreground block mb-2">
													Applicable Sub-topics (select what touches your
													operations):
												</span>
												<div className="flex flex-wrap gap-2">
													{meta.subtopics.map((sub) => {
														const isSelected = (topic.subtopics || []).includes(
															sub,
														)
														return (
															<button
																key={sub}
																type="button"
																onClick={() => handleSubtopicToggle(topic, sub)}
																className={`text-base font-normal px-3.5 py-2 rounded-md border transition-all duration-150 cursor-pointer active:scale-[0.97] ${
																	isSelected
																		? 'bg-primary text-primary-foreground border-primary font-normal'
																		: 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted'
																}`}
															>
																{sub}
															</button>
														)
													})}
												</div>
											</div>
										)}

										<div>
											<span className="text-base font-normal text-foreground block mb-2">
												Value Chain Placement:
											</span>
											<div className="flex flex-wrap gap-2">
												{(
													[
														'own',
														'upstream',
														'downstream',
													] as ValueChainSegment[]
												).map((seg) => {
													const label =
														seg === 'own'
															? 'Own Operations'
															: seg === 'upstream'
																? 'Upstream (Suppliers / Procurement)'
																: 'Downstream (Clients / Distribution)'
													const isSelected = (topic.valueChain || []).includes(
														seg,
													)
													return (
														<button
															key={seg}
															type="button"
															onClick={() => handleValueChainToggle(topic, seg)}
															className={`text-base font-normal px-3.5 py-2 rounded-md border transition-all duration-150 cursor-pointer active:scale-[0.97] ${
																isSelected
																	? 'bg-primary text-primary-foreground border-primary font-normal'
																	: 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted'
															}`}
														>
															{label}
														</button>
													)
												})}
											</div>
										</div>
									</div>

									{/* Section B: Impact Materiality (Inside-Out) */}
									<div className="bg-muted/20 border rounded-xl p-4 sm:p-5 space-y-4">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b pb-3.5">
											<div className="flex items-center gap-2">
												<Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
												<h4 className="text-base font-semibold uppercase tracking-wider text-foreground">
													Impact Materiality (Effect on People & Environment)
												</h4>
											</div>
											<div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
												<button
													type="button"
													onClick={() =>
														handleOccurrenceChange(topic, 'actual')
													}
													className={`px-4 py-2 rounded-md text-base transition-all duration-150 active:scale-[0.97] ${
														occurrence === 'actual'
															? 'bg-background text-foreground shadow-xs font-normal'
															: 'text-muted-foreground hover:text-foreground font-normal'
													}`}
												>
													Actual (Ongoing)
												</button>
												<button
													type="button"
													onClick={() =>
														handleOccurrenceChange(topic, 'potential')
													}
													className={`px-4 py-2 rounded-md text-base transition-all duration-150 active:scale-[0.97] ${
														occurrence === 'potential'
															? 'bg-background text-foreground shadow-xs font-normal'
															: 'text-muted-foreground hover:text-foreground font-normal'
													}`}
												>
													Potential (Future Risk)
												</button>
											</div>
										</div>

										{/* Severity Scale */}
										<div className="space-y-2.5">
											<div className="flex justify-between items-center text-base">
												<span className="font-semibold text-foreground text-base">
													Severity of Negative Impact:
												</span>
												<span className="text-muted-foreground text-base font-normal">
													Folds scale, scope, and irremediability together
												</span>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
												{IMPACT_SEVERITY_BANDS.map((band) => {
													const isSelected =
														(topic.impactSeverity ?? 3) === band.value
													return (
														<button
															type="button"
															key={band.value}
															onClick={() =>
																handleImpactSeverityChange(topic, band.value)
															}
															className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 active:scale-[0.97] ${
																isSelected
																	? 'bg-primary text-primary-foreground border-primary shadow-xs font-normal'
																	: 'bg-background hover:bg-muted/50 text-muted-foreground border-border'
															}`}
														>
															<div className="font-semibold text-base mb-1">
																{band.title}
															</div>
															<div
																className={`text-sm leading-snug font-normal ${isSelected ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
															>
																{band.description}
															</div>
														</button>
													)
												})}
											</div>
										</div>

										{/* Likelihood Scale (Only for potential) */}
										{occurrence === 'potential' && (
											<div className="space-y-2.5 pt-2">
												<div className="flex justify-between items-center text-base">
													<span className="font-semibold text-foreground text-base">
														Likelihood (Next 3 Years):
													</span>
													<span className="text-muted-foreground text-base font-normal">
														Probability of occurrence
													</span>
												</div>
												<div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
													{IMPACT_LIKELIHOOD_BANDS.map((band) => {
														const isSelected =
															(topic.impactLikelihood ?? 3) === band.value
														return (
															<button
																type="button"
																key={band.value}
																onClick={() =>
																	handleImpactLikelihoodChange(
																		topic,
																		band.value,
																	)
																}
																className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 active:scale-[0.97] ${
																	isSelected
																		? 'bg-primary text-primary-foreground border-primary shadow-xs font-normal'
																		: 'bg-background hover:bg-muted/50 text-muted-foreground border-border'
																	}`}
															>
																<div className="font-semibold text-base mb-1">
																	{band.title}
																</div>
																<div
																	className={`text-sm leading-snug font-normal ${isSelected ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
																>
																	{band.description}
																</div>
															</button>
														)
													})}
												</div>
											</div>
										)}

										{/* Impact Formula Readout */}
										<div className="flex items-center justify-between text-base bg-background/80 p-3.5 rounded-lg border font-normal">
											<span className="text-muted-foreground text-base font-normal">
												{occurrence === 'actual'
													? `Formula: Score = Severity (${topic.impactSeverity ?? 3})`
													: `Formula: (Severity (${topic.impactSeverity ?? 3}) + Likelihood (${topic.impactLikelihood ?? 3})) / 2`}
											</span>
											<span className="font-mono font-normal text-base text-foreground">
												Impact Score: {impactEffective}
											</span>
										</div>
									</div>

									{/* Section C: Financial Materiality (Outside-In) */}
									<div className="bg-muted/20 border rounded-xl p-4 sm:p-5 space-y-4">
										<div className="flex items-center gap-2 border-b pb-3.5">
											<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
											<h4 className="text-base font-semibold uppercase tracking-wider text-foreground">
												Financial Materiality (Financial Risk / Opportunity)
											</h4>
										</div>

										{/* Magnitude Scale */}
										<div className="space-y-2.5">
											<div className="flex justify-between items-center text-base">
												<span className="font-semibold text-foreground text-base">
													Financial Magnitude:
												</span>
												<span className="text-muted-foreground text-base font-normal">
													Anchored to share of annual revenue
												</span>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
												{FINANCIAL_MAGNITUDE_BANDS.map((band) => {
													const isSelected =
														(topic.financialMagnitude ?? 2) === band.value
													return (
														<button
															type="button"
															key={band.value}
															onClick={() =>
																handleFinancialMagnitudeChange(
																	topic,
																	band.value,
																)
															}
															className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 active:scale-[0.97] ${
																isSelected
																	? 'bg-primary text-primary-foreground border-primary shadow-xs font-normal'
																	: 'bg-background hover:bg-muted/50 text-muted-foreground border-border'
															}`}
														>
															<div className="font-semibold text-base mb-1">
																{band.title}
															</div>
															<div
																className={`text-sm leading-snug font-normal ${isSelected ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
															>
																{band.description}
															</div>
														</button>
													)
												})}
											</div>
										</div>

										{/* Financial Likelihood Scale */}
										<div className="space-y-2.5 pt-2">
											<div className="flex justify-between items-center text-base">
												<span className="font-semibold text-foreground text-base">
													Financial Likelihood (Next 3 Years):
												</span>
												<span className="text-muted-foreground text-base font-normal">
													Probability of financial manifestation
												</span>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
												{FINANCIAL_LIKELIHOOD_BANDS.map((band) => {
													const isSelected =
														(topic.financialLikelihood ?? 3) === band.value
													return (
														<button
															type="button"
															key={band.value}
															onClick={() =>
																handleFinancialLikelihoodChange(
																	topic,
																	band.value,
																)
															}
															className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 active:scale-[0.97] ${
																isSelected
																	? 'bg-primary text-primary-foreground border-primary shadow-xs font-normal'
																	: 'bg-background hover:bg-muted/50 text-muted-foreground border-border'
															}`}
														>
															<div className="font-semibold text-base mb-1">
																{band.title}
															</div>
															<div
																className={`text-sm leading-snug font-normal ${isSelected ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
															>
																{band.description}
															</div>
														</button>
													)
												})}
											</div>
										</div>

										{/* Financial Formula Readout */}
										<div className="flex items-center justify-between text-base bg-background/80 p-3.5 rounded-lg border font-normal">
											<span className="text-muted-foreground text-base font-normal">
												Formula: (Magnitude ({topic.financialMagnitude ?? 2}) +
												Likelihood ({topic.financialLikelihood ?? 3})) / 2
											</span>
											<span className="font-mono font-normal text-base text-foreground">
												Financial Score: {financialEffective}
											</span>
										</div>
									</div>

									{/* Section D: Hard Rules & Overrides */}
									<div className="space-y-3.5 pt-1">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
											<div className="flex items-start gap-3 p-3.5 rounded-lg border bg-card">
												<Checkbox
													id={`shr-${topic._id}`}
													checked={topic.severeHumanRightsFlag || false}
													onCheckedChange={(checked) =>
														handleSevereRightsToggle(topic, Boolean(checked))
													}
													className="mt-1 size-4.5"
												/>
												<div className="space-y-1">
													<label
														htmlFor={`shr-${topic._id}`}
														className="text-base font-normal text-foreground cursor-pointer block leading-snug"
													>
														Severe Human Rights Impact
													</label>
													<p className="text-base text-muted-foreground leading-relaxed font-normal">
														Under EFRAG rules, severe human rights issues
														qualify as material regardless of score.
													</p>
												</div>
											</div>

											<div className="flex items-start gap-3 p-3.5 rounded-lg border bg-card">
												<Checkbox
													id={`leg-${topic._id}`}
													checked={topic.legalObligationFlag || false}
													onCheckedChange={(checked) =>
														handleLegalObligationToggle(topic, Boolean(checked))
													}
													className="mt-1 size-4.5"
												/>
												<div className="space-y-1">
													<label
														htmlFor={`leg-${topic._id}`}
														className="text-base font-normal text-foreground cursor-pointer block leading-snug"
													>
														Legal or Contractual Obligation
													</label>
													<p className="text-base text-muted-foreground leading-relaxed font-normal">
														Specific statutory mandate, bank condition, or buyer
														covenant requires reporting.
													</p>
												</div>
											</div>
										</div>

										{/* Free Text Note / IRO Field */}
										<div className="space-y-2 pt-1">
											<div className="flex items-center gap-2 text-base font-normal text-foreground">
												<FileText className="w-4 h-4 text-muted-foreground" />
												Specific Impacts, Risks & Opportunities Note:
											</div>
											<Textarea
												placeholder="Briefly describe the context, key risks, or specific initiatives relevant to this topic..."
												value={topic.notes || ''}
												onChange={(e) =>
													handleNotesChange(topic, e.target.value)
												}
												className="text-base min-h-[80px] resize-none leading-relaxed font-normal"
											/>
										</div>
									</div>
								</CardContent>
							)}
						</Card>
					)
				})}
			</div>

			{/* Navigation Footer */}
			<div className="flex items-center justify-between pt-4 border-t">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="h-11 gap-2 px-5 text-base font-normal transition-all duration-150 active:scale-[0.98]"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Screening
				</Button>
				<Button
					type="button"
					onClick={onProceed}
					disabled={isSubmitting}
					className="h-11 gap-2.5 px-6 text-base font-normal transition-all duration-150 active:scale-[0.98]"
				>
					View Results & Priority Ranking
					<ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	)
}
