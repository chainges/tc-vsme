import {
	type HighchartsOptionsType,
	Chart as HighchartsReact,
} from '@highcharts/react'
import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Grid,
	ListOrdered,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ESRS_TOPICS_METADATA, STATIC_THRESHOLD } from './constants'
import type { MaterialityTopicItem } from './types'

interface StepResultsProps {
	topics: MaterialityTopicItem[]
	threshold?: number
	onProceed: () => void
	onBack: () => void
}

export function StepResults({
	topics,
	threshold = STATIC_THRESHOLD,
	onProceed,
	onBack,
}: StepResultsProps) {
	const [activeTab, setActiveTab] = useState<string>('ranking')

	const scoredTopics = topics.filter(
		(t) => t.screening === 'relevant' || t.screening === 'notSure',
	)

	const screenedOutTopics = topics.filter((t) => t.screening === 'notRelevant')

	// Sort scored topics descending by max effective score
	const sortedTopics = [...scoredTopics].sort((a, b) => {
		const maxA = Math.max(
			a.impactScore?.effective ?? 0,
			a.financialScore?.effective ?? 0,
		)
		const maxB = Math.max(
			b.impactScore?.effective ?? 0,
			b.financialScore?.effective ?? 0,
		)
		return maxB - maxA
	})

	const materialTopics = sortedTopics.filter((t) => t.isMaterial)
	const nonMaterialTopics = sortedTopics.filter((t) => !t.isMaterial)

	// Configure Highcharts scatter matrix options
	const scatterData = scoredTopics.map((topic) => {
		const meta = ESRS_TOPICS_METADATA[topic.topicKey]
		const title = topic.customLabel || meta?.shortName || topic.topicKey
		const impact = topic.impactScore?.effective ?? 3
		const financial = topic.financialScore?.effective ?? 2.5
		const isMat = topic.isMaterial

		return {
			x: impact,
			y: financial,
			name: title,
			color: isMat
				? 'var(--highcharts-color-0, #0284c7)'
				: 'var(--highcharts-neutral-color-40, #94a3b8)',
			marker: {
				radius: isMat ? 7 : 5,
				symbol: 'circle',
			},
		}
	})

	const chartOptions: HighchartsOptionsType = {
		chart: {
			type: 'scatter',
			backgroundColor: 'transparent',
			height: 500,
			spacing: [24, 24, 24, 24],
			style: {
				fontFamily: 'inherit',
			},
		},
		title: {
			text: 'Double Materiality Matrix',
			style: { fontSize: '20px', fontWeight: '700' },
		},
		subtitle: {
			text: `Static Threshold: ${threshold} (Impact and Financial dimensions)`,
			style: { fontSize: '16px', fontWeight: '400' },
		},
		xAxis: {
			title: {
				text: 'Impact Materiality (Inside-Out) →',
				style: { fontSize: '16px', fontWeight: '500' },
			},
			labels: {
				style: { fontSize: '14px', fontWeight: '400' },
			},
			min: 1,
			max: 5,
			tickInterval: 1,
			gridLineWidth: 1,
			plotLines: [
				{
					value: threshold,
					color: '#f59e0b',
					width: 2,
					dashStyle: 'Dash',
					label: {
						text: `Threshold (${threshold})`,
						style: { color: '#f59e0b', fontSize: '14px', fontWeight: '500' },
						align: 'right',
						y: -10,
					},
					zIndex: 4,
				},
			],
		},
		yAxis: {
			title: {
				text: 'Financial Materiality (Outside-In) →',
				style: { fontSize: '16px', fontWeight: '500' },
			},
			labels: {
				style: { fontSize: '14px', fontWeight: '400' },
			},
			min: 1,
			max: 5,
			tickInterval: 1,
			gridLineWidth: 1,
			plotLines: [
				{
					value: threshold,
					color: '#f59e0b',
					width: 2,
					dashStyle: 'Dash',
					label: {
						text: `Threshold (${threshold})`,
						style: { color: '#f59e0b', fontSize: '14px', fontWeight: '500' },
						align: 'left',
						x: 10,
					},
					zIndex: 4,
				},
			],
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			useHTML: true,
			formatter: function () {
				const p = this.point as unknown as {
					x?: number
					y?: number
					name?: string
				}
				const x = p.x ?? 0
				const y = p.y ?? 0
				const isMat = x >= threshold || y >= threshold
				return `<div style="font-size: 16px; line-height: 1.5; padding: 4px 6px;"><b>${p.name ?? ''}</b><br/>Impact Score: <b>${x}</b><br/>Financial Score: <b>${y}</b><br/>Status: <b>${
					isMat ? 'Material' : 'Below threshold'
				}</b></div>`
			},
		},
		plotOptions: {
			scatter: {
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					style: {
						fontSize: '14px',
						fontWeight: '500',
						textOutline: 'none',
					},
				},
			},
		},
		series: [
			{
				name: 'Topics',
				type: 'scatter',
				data: scatterData,
			},
		],
		credits: {
			enabled: false,
		},
	}

	return (
		<div className="space-y-6">
			{/* Overview Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Card className="bg-primary/5 border-primary/20">
					<CardContent className="p-5">
						<div className="text-base font-normal text-muted-foreground">
							Material Topics
						</div>
						<div className="text-3xl sm:text-4xl font-extrabold text-primary mt-1">
							{materialTopics.length}
						</div>
						<div className="text-base text-muted-foreground mt-1 font-normal">
							Require disclosures in your VS report
						</div>
					</CardContent>
				</Card>

				<Card className="bg-muted/30">
					<CardContent className="p-5">
						<div className="text-base font-normal text-muted-foreground">
							Monitored / Below Threshold
						</div>
						<div className="text-3xl sm:text-4xl font-extrabold text-foreground mt-1">
							{nonMaterialTopics.length}
						</div>
						<div className="text-base text-muted-foreground mt-1 font-normal">
							Scored below {threshold}; no mandatory narrative
						</div>
					</CardContent>
				</Card>

				<Card className="bg-muted/30">
					<CardContent className="p-5">
						<div className="text-base font-normal text-muted-foreground">
							Ruled Out at Screening
						</div>
						<div className="text-3xl sm:text-4xl font-extrabold text-muted-foreground mt-1">
							{screenedOutTopics.length}
						</div>
						<div className="text-base text-muted-foreground mt-1 font-normal">
							Excluded with written justifications
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tabs: Ranked List vs Scatter Matrix */}
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList className="grid w-full sm:w-[380px] h-11 p-1 grid-cols-2">
					<TabsTrigger
						value="ranking"
						className="gap-2 h-9 text-base font-normal active:scale-[0.98] transition-all"
					>
						<ListOrdered className="w-4 h-4" />
						Ranked Priority List
					</TabsTrigger>
					<TabsTrigger
						value="matrix"
						className="gap-2 h-9 text-base font-normal active:scale-[0.98] transition-all"
					>
						<Grid className="w-4 h-4" />
						Materiality Matrix
					</TabsTrigger>
				</TabsList>

				{/* Tab 1: Ranked Priority List */}
				<TabsContent value="ranking" className="space-y-4">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-xl font-bold">
								Priority Ranking
							</CardTitle>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								Topics are ordered by highest materiality score. The threshold
								line clearly separates material topics from monitored ones.
							</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<div className="border-t">
								<Table>
									<TableHeader>
										<TableRow className="bg-muted/40 text-base font-normal">
											<TableHead className="w-[45%] text-base font-normal text-foreground">
												Topic
											</TableHead>
											<TableHead className="text-center text-base font-normal text-foreground">
												Impact Score
											</TableHead>
											<TableHead className="text-center text-base font-normal text-foreground">
												Financial Score
											</TableHead>
											<TableHead className="text-center text-base font-normal text-foreground">
												Material Dimension
											</TableHead>
											<TableHead className="text-right pr-4 text-base font-normal text-foreground">
												Determination
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{/* Material Topics Group */}
										{materialTopics.map((topic, i) => {
											const meta = ESRS_TOPICS_METADATA[topic.topicKey]
											const title =
												topic.customLabel || meta?.name || topic.topicKey
											const impact = topic.impactScore?.effective ?? 3
											const financial = topic.financialScore?.effective ?? 2.5

											let dimLabel = 'Both'
											if (topic.materialOn.length === 1) {
												dimLabel =
													topic.materialOn[0] === 'impact'
														? 'Impact'
														: 'Financial'
											} else if (topic.materialOn.length === 0) {
												dimLabel = topic.severeHumanRightsFlag
													? 'Human Rights'
													: 'Legal'
											}

											return (
												<TableRow
													key={topic.topicKey}
													className="text-base hover:bg-muted/30"
												>
													<TableCell className="font-normal py-3.5">
														<div className="flex items-center gap-2.5">
															<span className="text-sm text-muted-foreground font-mono font-normal">
																#{i + 1}
															</span>
															<span className="text-base font-normal text-foreground">
																{title}
															</span>
														</div>
													</TableCell>
													<TableCell className="text-center font-mono text-base font-normal">
														{impact}
													</TableCell>
													<TableCell className="text-center font-mono text-base font-normal">
														{financial}
													</TableCell>
													<TableCell className="text-center">
														<Badge
															variant="outline"
															className="text-sm font-normal px-2.5 py-0.5"
														>
															{dimLabel}
														</Badge>
													</TableCell>
													<TableCell className="text-right pr-4">
														<Badge className="bg-primary text-primary-foreground text-sm font-normal px-2.5 py-0.5">
															Material
														</Badge>
													</TableCell>
												</TableRow>
											)
										})}

										{/* Static Threshold Line Row */}
										<TableRow className="bg-amber-500/10 border-y-2 border-amber-500/40 text-base font-normal">
											<TableCell
												colSpan={5}
												className="py-3.5 text-center text-amber-800 dark:text-amber-300 tracking-wide text-base font-normal"
											>
												── Threshold Line ({threshold}): Topics above this line
												require narrative disclosures in your report ──
											</TableCell>
										</TableRow>

										{/* Non-Material Scored Topics */}
										{nonMaterialTopics.map((topic, i) => {
											const meta = ESRS_TOPICS_METADATA[topic.topicKey]
											const title =
												topic.customLabel || meta?.name || topic.topicKey
											const impact = topic.impactScore?.effective ?? 3
											const financial = topic.financialScore?.effective ?? 2.5

											return (
												<TableRow
													key={topic.topicKey}
													className="text-base hover:bg-muted/20 text-muted-foreground"
												>
													<TableCell className="py-3.5">
														<div className="flex items-center gap-2.5">
															<span className="text-sm text-muted-foreground font-mono font-normal">
																#{materialTopics.length + i + 1}
															</span>
															<span className="text-base font-normal text-foreground/80">
																{title}
															</span>
														</div>
													</TableCell>
													<TableCell className="text-center font-mono text-base font-normal text-muted-foreground">
														{impact}
													</TableCell>
													<TableCell className="text-center font-mono text-base font-normal text-muted-foreground">
														{financial}
													</TableCell>
													<TableCell className="text-center">
														<span className="text-sm text-muted-foreground font-normal">
															—
														</span>
													</TableCell>
													<TableCell className="text-right pr-4">
														<Badge
															variant="outline"
															className="text-muted-foreground text-sm font-normal px-2.5 py-0.5"
														>
															Monitored
														</Badge>
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>

					{/* Ruled-out Topics Log */}
					{screenedOutTopics.length > 0 && (
						<Card className="border-muted bg-muted/20">
							<CardHeader className="pb-2">
								<div className="flex items-center gap-2">
									<AlertCircle className="w-5 h-5 text-muted-foreground" />
									<CardTitle className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
										Exclusion Register (Topics Ruled Out at Screening)
									</CardTitle>
								</div>
								<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
									Auditors and buyers check these justifications to confirm no
									material topics were casually omitted.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="divide-y divide-border/60">
									{screenedOutTopics.map((topic) => {
										const meta = ESRS_TOPICS_METADATA[topic.topicKey]
										const title =
											topic.customLabel || meta?.name || topic.topicKey
										return (
											<div
												key={topic.topicKey}
												className="py-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-base leading-relaxed"
											>
												<span className="font-normal text-base text-foreground shrink-0">
													{title}:
												</span>
												<span className="text-base leading-relaxed text-muted-foreground italic flex-1 text-right sm:text-left sm:pl-4 font-normal">
													"{topic.skipReason || 'No specific reason provided.'}"
												</span>
											</div>
										)
									})}
								</div>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				{/* Tab 2: Highcharts Scatter Matrix */}
				<TabsContent value="matrix" className="space-y-4">
					<Card>
						<CardHeader className="pb-1">
							<CardTitle className="text-xl font-bold">
								Interactive 2D Matrix
							</CardTitle>
							<CardDescription className="text-base leading-relaxed text-muted-foreground font-normal">
								Visual display of topics across Impact (x-axis) and Financial
								(y-axis) dimensions.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="w-full">
								<HighchartsReact options={chartOptions} />
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t text-base text-muted-foreground">
								<div className="p-3.5 rounded-lg bg-muted/40 border">
									<strong className="text-foreground text-base font-semibold block mb-1">
										Top-Right (Both)
									</strong>
									<span className="text-base leading-relaxed block font-normal text-muted-foreground">
										High impact & high financial materiality.
									</span>
								</div>
								<div className="p-3.5 rounded-lg bg-muted/40 border">
									<strong className="text-foreground text-base font-semibold block mb-1">
										Bottom-Right (Impact)
									</strong>
									<span className="text-base leading-relaxed block font-normal text-muted-foreground">
										Severe impact on society or planet.
									</span>
								</div>
								<div className="p-3.5 rounded-lg bg-muted/40 border">
									<strong className="text-foreground text-base font-semibold block mb-1">
										Top-Left (Financial)
									</strong>
									<span className="text-base leading-relaxed block font-normal text-muted-foreground">
										External sustainability risk to finances.
									</span>
								</div>
								<div className="p-3.5 rounded-lg bg-muted/40 border">
									<strong className="text-foreground text-base font-semibold block mb-1">
										Bottom-Left
									</strong>
									<span className="text-base leading-relaxed block font-normal text-muted-foreground">
										Below reporting threshold (&lt;{threshold}).
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Navigation Footer */}
			<div className="flex items-center justify-between pt-4 border-t">
				<Button
					type="button"
					variant="outline"
					onClick={onBack}
					className="gap-2 h-11 px-5 text-base font-normal active:scale-[0.98] transition-all"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Scoring
				</Button>
				<Button
					type="button"
					onClick={onProceed}
					className="gap-2 h-11 px-6 text-base font-normal active:scale-[0.98] transition-all shadow-sm"
				>
					Proceed to Report Handover
					<ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	)
}
