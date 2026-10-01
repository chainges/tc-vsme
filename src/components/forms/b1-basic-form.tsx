import { useStore } from '@tanstack/react-store'
import { Info } from 'lucide-react'
import { z } from 'zod'
import { PreviousPeriodDisclosureFields } from '@/components/forms/previous-period-disclosure-fields'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { yearStore } from '@/lib/year-store'

const b1BasicSchema = z.object({
	reportingYear: z.string().regex(/^\d{4}$/),
	moduleScope: z.enum([
		'vsme:OptionABasicModuleOnlyMember',
		'vsme:OptionBBasicModuleAndComprehensiveModuleMember',
	]),
	containsPreviousPeriodDisclosures: z.boolean(),
	sectionsThatHasNotChanged: z.array(z.string()),
	linkOfPreviousReport: z.string(),
})

type B1BasicFormValues = z.infer<typeof b1BasicSchema>

function ScopeOption({
	value,
	label,
	title,
	whoFor,
	covers,
}: {
	value: B1BasicFormValues['moduleScope']
	label: string
	title: string
	whoFor: string
	covers: string
}) {
	return (
		<label
			htmlFor={value}
			className="flex cursor-pointer gap-3 rounded-xl border p-4 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
		>
			<RadioGroupItem id={value} value={value} />
			<span className="space-y-1">
				<span className="block text-xs font-semibold text-primary">
					{label}
				</span>
				<span className="block font-semibold">{title}</span>
				<span className="block text-sm text-muted-foreground">{whoFor}</span>
				<span className="block text-sm text-muted-foreground">{covers}</span>
			</span>
		</label>
	)
}

function ModuleInfoBox() {
	return (
		<Card className="border-blue-300! bg-info-background! text-card-foreground shadow-xs dark:border-blue-900/60 dark:bg-blue-950/20">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900! dark:text-slate-100">
					<Info className="size-5 shrink-0 text-blue-600! dark:text-blue-400!" />
					General Guidelines &amp; Compliance Rules
				</CardTitle>
				<CardDescription className="text-sm leading-relaxed text-slate-600! dark:text-slate-400!">
					Four core rules govern how EFRAG expects this report to be completed.
					Get these right and every downstream disclosure stays compliant.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-3.5 sm:grid-cols-2">
				{[
					[
						'Rule 1',
						'Module Completeness',
						'A module you select must be completed in its entirety — no picking and choosing.',
					],
					[
						'Rule 2',
						'“If Applicable” Principle',
						"If a disclosure doesn't apply to your operations, leaving it blank signals it's not applicable to readers and XBRL parsers.",
					],
					[
						'Rule 3',
						'Voluntary Data Points',
						'Fields marked voluntary — or bracketed for undertakings with ≤10 employees — may stay blank without affecting compliance.',
					],
					[
						'Rule 4',
						'Confidentiality',
						'Omit a disclosure only in exceptional cases — commercial prejudice, trade secrets, classified info, or legal privacy obligations',
					],
				].map(([rule, title, description]) => (
					<div
						key={rule}
						className="rounded-xl bg-white p-4 shadow-xs transition-all duration-150 hover:border-blue-300 hover:shadow-sm dark:border-blue-950 dark:bg-card dark:hover:border-blue-800"
					>
						<p className="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
							{rule}
						</p>
						<h3 className="mt-1 text-sm font-semibold tracking-tight text-slate-900! dark:text-slate-100">
							{title}
						</h3>
						<p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
							{description}
						</p>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export function B1BasicForm() {
	const reportingYear = useStore(yearStore, (state) => state.selectedYear)
	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B1BasicFormValues>({
			table: 'formGeneral',
			reportingYear,
			section: 'basicModule',
			defaultValues: {
				reportingYear: reportingYear.toString(),
				moduleScope: 'vsme:OptionABasicModuleOnlyMember',
				containsPreviousPeriodDisclosures: false,
				sectionsThatHasNotChanged: [],
				linkOfPreviousReport: '',
			},
			schema: b1BasicSchema,
			transformBeforeSave: (values) => ({
				...values,
				containsPreviousPeriodDisclosures:
					values.containsPreviousPeriodDisclosures ?? false,
				sectionsThatHasNotChanged: values.sectionsThatHasNotChanged ?? [],
				linkOfPreviousReport: values.linkOfPreviousReport ?? '',
			}),
		})

	const containsPreviousPeriodDisclosures = useStore(
		form.store,
		(state) => state.values.containsPreviousPeriodDisclosures ?? false,
	)
	const sectionsThatHasNotChanged = useStore(
		form.store,
		(state) => state.values.sectionsThatHasNotChanged ?? [],
	)
	const linkOfPreviousReport = useStore(
		form.store,
		(state) => state.values.linkOfPreviousReport ?? '',
	)

	if (isLoading)
		return (
			<div className="p-8 text-center text-muted-foreground">Loading...</div>
		)

	return (
		<form.AppForm>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					event.stopPropagation()
					form.handleSubmit()
				}}
			>
				<fieldset disabled={status === 'submitted'} className="space-y-6">
					<ModuleInfoBox />
					<Card>
						<CardHeader>
							<CardTitle>Module Scope Selection</CardTitle>
							<CardDescription>
								Define your reporting ambition. Choose one path — the Basic
								Module is a mandatory prerequisite for the Comprehensive Module.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form.AppField name="moduleScope">
								{(field) => (
									<RadioGroup
										value={field.state.value}
										onValueChange={(value) => {
											field.handleChange(
												value as
													| 'vsme:OptionABasicModuleOnlyMember'
													| 'vsme:OptionBBasicModuleAndComprehensiveModuleMember',
											)
										}}
										className="grid gap-4 md:grid-cols-2"
									>
										<ScopeOption
											value="vsme:OptionABasicModuleOnlyMember"
											label="OPTION A"
											title="Basic Module (Only)"
											whoFor="Micro-undertakings & small businesses seeking a minimal, streamlined disclosure."
											covers="General info (B1), transition policies (B2), basic ESG metrics (B3–B11)."
										/>
										<ScopeOption
											value="vsme:OptionBBasicModuleAndComprehensiveModuleMember"
											label="OPTION B"
											title="Basic + Comprehensive Module"
											whoFor="SMEs facing detailed requests from banks, investors, or large supply-chain clients."
											covers="All of B1–B11 plus climate targets (C3), climate risks (C4), workforce (C5), human rights (C6–C7), sector exclusions (C8)."
										/>
									</RadioGroup>
								)}
							</form.AppField>
							<p className="mt-4 text-xs text-muted-foreground">
								<span className="font-semibold text-foreground">Note:</span>{' '}
								Applying the Basic Module is a mandatory prerequisite before
								adding Comprehensive Module disclosures.
							</p>
						</CardContent>
					</Card>

					<PreviousPeriodDisclosureFields
						containsPreviousPeriodDisclosures={
							containsPreviousPeriodDisclosures
						}
						sectionsThatHasNotChanged={sectionsThatHasNotChanged}
						linkOfPreviousReport={linkOfPreviousReport}
						disabled={status === 'submitted'}
						onContainsPreviousPeriodDisclosuresChange={(value) =>
							form.setFieldValue('containsPreviousPeriodDisclosures', value)
						}
						onSectionsChange={(values) =>
							form.setFieldValue('sectionsThatHasNotChanged', values)
						}
						onLinkChange={(value) =>
							form.setFieldValue('linkOfPreviousReport', value)
						}
					/>

					<form.AppField name="reportingYear">
						{(field) => <field.TextField label="Reporting year" hidden />}
					</form.AppField>
				</fieldset>
				<FormButtons
					status={status as 'not_started' | 'draft' | 'submitted'}
					isSaving={isSaving}
					onSaveDraft={saveDraft}
					onSubmit={submit}
					onReopen={reopen}
				/>
			</form>
		</form.AppForm>
	)
}
