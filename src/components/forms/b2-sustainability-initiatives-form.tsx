import { useStore as useYearStore } from "@tanstack/react-store"
import { ChevronDown, ChevronRight, Info } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { sustainabilityIssues } from "@/data/initiatives"
import { FormButtons } from "@/hooks/tanstack-form"
import { useFormSubmission } from "@/hooks/use-form-submission"
import {
	type SustainabilityInitiativesFormValues,
	sustainabilityInitiativesSchema,
} from "@/lib/forms/schemas/b2-sustainability-initiatives-schema"
import { yearStore } from "@/lib/year-store"
import { m } from "@/paraglide/messages"
import ConfidentialInfoBox from "../ConfidentialInfoBox"

type SustainabilityTopic = {
	label: string
	subtopics?: Array<string | SustainabilityTopic>
}

type MainSustainabilityTopic = {
	id: string
	label: string
	value: string
	subtopics: Array<string | SustainabilityTopic>
}

function TopicChildren({
	topics,
	path,
	depth,
	expandedTopics,
	onToggle,
}: {
	topics: Array<string | SustainabilityTopic>
	path: string
	depth: number
	expandedTopics: Set<string>
	onToggle: (topicPath: string) => void
}) {
	return (
		<div className='space-y-2' style={{ marginLeft: `${depth * 1.25}rem` }}>
			{topics.map((topic, index) => {
				const item = typeof topic === "string" ? { label: topic } : topic
				const topicPath = `${path}-${index}`
				const hasChildren = (item.subtopics?.length ?? 0) > 0
				const isExpanded = expandedTopics.has(topicPath)

				return (
					<div key={topicPath}>
						<div className='flex items-start gap-1.5'>
							{hasChildren ? (
								<Button
									type='button'
									variant='ghost'
									size='icon-sm'
									onClick={() => onToggle(topicPath)}
									aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
									aria-expanded={isExpanded}
								>
									{isExpanded ? <ChevronDown /> : <ChevronRight />}
								</Button>
							) : (
								<div className='size-8 shrink-0' aria-hidden='true' />
							)}
							<span className='pt-1.5 text-sm leading-5'>{item.label}</span>
						</div>
						{hasChildren && isExpanded && item.subtopics && (
							<TopicChildren
								topics={item.subtopics}
								path={topicPath}
								depth={1}
								expandedTopics={expandedTopics}
								onToggle={onToggle}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}

export function B2SustainabilityInitiativesForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
	const toggleTopic = (topicPath: string) => {
		setExpandedTopics((current) => {
			const next = new Set(current)
			if (next.has(topicPath)) next.delete(topicPath)
			else next.add(topicPath)
			return next
		})
	}

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<SustainabilityInitiativesFormValues>({
			table: "formGeneral",
			reportingYear,
			section: "sustainabilityInitiatives",
			schema: sustainabilityInitiativesSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				hasSustainabilityPractices: false,
				arePracticesPubliclyAvailable: false,
				policiesHaveTargets: false,
				selectedSustainabilityIssueValues: [],
				isB2Confidential: false,
			} as SustainabilityInitiativesFormValues,
		})

	if (isLoading) {
		return <div className='flex items-center justify-center p-8 text-muted-foreground'>Loading...</div>
	}

	return (
		<>
			<Alert variant='info' className='mb-6'>
				<Info />
				<AlertTitle>{m["general.B2.sustainabilityTitle"]()}</AlertTitle>
				<AlertDescription>
					{m["general.B2.sustainabilityDescription"]()}{" "}
					<a
						className='underline'
						rel='noopener noreferrer'
						target='_blank'
						href='https://www.efrag.org/en/vsme-supporting-guide-on-disclosure-c2-comprehensive-module-practices-policies-and-future'
					>
						{m["general.B2.readMore"]()}
					</a>
				</AlertDescription>
			</Alert>
			<form.AppForm>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<fieldset disabled={status === "submitted"} className='space-y-6'>
						{/* Hidden reporting year field */}
						<form.AppField name='reportingYear'>
							{(field) => <field.TextField label={m["general.reportingYear"]()} placeholder={"YYYY"} hidden />}
						</form.AppField>

						<form.AppField name='isB2Confidential'>
							{(field) => {
								return (
									<ConfidentialInfoBox
										value={field.state.value || false}
										handleChange={(value) => {
											// set value of isB1Confidential based on the switch
											field.handleChange(value)
										}}
									/>
								)
							}}
						</form.AppField>

						<Card>
							<CardContent className='space-y-6'>
								<form.AppField name='hasSustainabilityPractices'>
									{(field) => <field.SwitchField label={m["general.B2.hasSustainabilityPractices"]()} />}
								</form.AppField>
								<form.Subscribe selector={(state) => state.values.hasSustainabilityPractices}>
									{(hasSustainabilityPractices) =>
										hasSustainabilityPractices && (
											<form.AppField name='arePracticesPubliclyAvailable'>
												{(field) => <field.SwitchField label={m["general.B2.arePracticesPubliclyAvailable"]()} />}
											</form.AppField>
										)
									}
								</form.Subscribe>
								<form.AppField name='policiesHaveTargets'>
									{(field) => <field.SwitchField label={m["general.B2.policiesHaveTargets"]()} />}
								</form.AppField>
							</CardContent>
						</Card>

						<form.Subscribe>
							{
								<form.AppField name='selectedSustainabilityIssueValues'>
									{(field) => (
										<div className='space-y-4'>
											{sustainabilityIssues.map((topic) => {
												const mainTopic = topic as MainSustainabilityTopic
												const isSelected = field.state.value?.includes(mainTopic.value)
												const isExpanded = expandedTopics?.has(mainTopic.id) ?? false
												const subtopics = mainTopic?.subtopics
												const hasChildren = subtopics?.length > 0

												return (
													<Card key={mainTopic.id}>
														<CardContent className='space-y-3'>
															<div className='flex items-center gap-2'>
																<Checkbox
																	id={mainTopic.id}
																	checked={isSelected}
																	onCheckedChange={(checked) => {
																		const selectedValues = field.state.value ?? []

																		if (selectedValues === undefined) {
																			//selectedValues = []
																			return
																		}

																		field.handleChange(
																			checked === true
																				? [...selectedValues, mainTopic.value]
																				: selectedValues.filter((value) => value !== mainTopic.value),
																		)
																	}}
																/>
																<label htmlFor={mainTopic.id} className='flex-1 cursor-pointer font-medium leading-5'>
																	{mainTopic.label}
																</label>
																{hasChildren && (
																	<Button
																		type='button'
																		variant='ghost'
																		size='icon-sm'
																		onClick={() => toggleTopic(mainTopic.id)}
																		aria-label={`${isExpanded ? "Collapse" : "Expand"} ${mainTopic.label}`}
																		aria-expanded={isExpanded}
																	>
																		{isExpanded ? <ChevronDown /> : <ChevronRight />}
																	</Button>
																)}
															</div>
															{hasChildren && isExpanded && (
																<TopicChildren
																	topics={subtopics}
																	path={mainTopic.id}
																	depth={1}
																	expandedTopics={expandedTopics}
																	onToggle={toggleTopic}
																/>
															)}
														</CardContent>
													</Card>
												)
											})}
										</div>
									)}
								</form.AppField>
							}
						</form.Subscribe>
					</fieldset>

					<FormButtons
						status={status as "not_started" | "draft" | "submitted"}
						isSaving={isSaving}
						onSaveDraft={saveDraft}
						onSubmit={submit}
						onReopen={reopen}
					/>
				</form>
			</form.AppForm>
		</>
	)
}
