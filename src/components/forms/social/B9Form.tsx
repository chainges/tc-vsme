import { useStore } from '@tanstack/react-form'
import { useStore as useYearStore } from '@tanstack/react-store'
import { useMemo } from 'react'
import { NumberFieldReadOnly } from '@/components/form-fields/NumberFieldReadOnly'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type B9HealthSafetyFormValues,
	b9HealthSafetySchema,
} from '@/lib/forms/schemas/b9-health-safety-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

interface B9HealthSafetyFormProps {
	totalEmployees?: number
}

export function B9HealthSafetyForm({ totalEmployees = 0 }: B9HealthSafetyFormProps) {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B9HealthSafetyFormValues>({
			table: 'formSocial',
			reportingYear,
			section: 'healthSafety',
			schema: b9HealthSafetySchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				workAccidents: 0,
				deceased: 0,
				rateOfWorkAccidents: 0,
				knowExactHoursWorked: false,
				totalHoursWorked: 0,
			} as B9HealthSafetyFormValues,
			transformBeforeSave: (values) => {
				const hours = values.knowExactHoursWorked
					? (values.totalHoursWorked ?? 0)
					: (totalEmployees ?? 0) * 2000
				const rateOfWorkAccidents =
					hours > 0
						? Number((((values.workAccidents ?? 0) / hours) * 200000).toFixed(2))
						: 0
				return {
					...values,
					rateOfWorkAccidents,
				}
			},
		})

	const workAccidents = useStore(
		form.store,
		(state) => state.values.workAccidents ?? 0,
	)
	const knowExactHoursWorked = useStore(
		form.store,
		(state) => state.values.knowExactHoursWorked ?? false,
	)
	const totalHoursWorked = useStore(
		form.store,
		(state) => state.values.totalHoursWorked,
	)

	const calculatedRate = useMemo(() => {
		const hours = knowExactHoursWorked
			? (totalHoursWorked ?? 0)
			: (totalEmployees ?? 0) * 2000
		if (hours <= 0) return 0
		return Number(((workAccidents / hours) * 200000).toFixed(2))
	}, [workAccidents, knowExactHoursWorked, totalHoursWorked, totalEmployees])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				{m["social.B9.loading"]()}
			</div>
		)
	}

	return (
		<form.AppForm>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<Card>
					<CardContent>
						<fieldset disabled={status === 'submitted'} className="space-y-6">
							{/* Hidden reporting year */}
							<form.AppField name="reportingYear">
								{(field) => (
									<field.TextField
										label={m["social.B9.reportingYearLabel"]()}
										placeholder="YYYY"
										hidden
									/>
								)}
							</form.AppField>

							{/* Work accidents + Fatalities */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.AppField name="workAccidents">
									{(field) => (
										<field.NumberField
											label={m["social.B9.workAccidentsLabel"]()}
											description={m["social.B9.workAccidentsDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="deceased">
									{(field) => (
										<field.NumberField
											label={m["social.B9.fatalitiesLabel"]()}
											description={m["social.B9.fatalitiesDescription"]()}
										/>
									)}
								</form.AppField>
							</div>

							{/* Toggle for exact hours worked */}
							<div className="space-y-4 pt-2">
								<form.AppField name="knowExactHoursWorked">
									{(field) => (
										<field.SwitchField
											label={m["social.B9.knowExactHoursWorkedLabel"]()}
										/>
									)}
								</form.AppField>

								<form.Subscribe selector={(state) => state.values.knowExactHoursWorked}>
									{(knowExact) =>
										knowExact ? (
											<div className="max-w-md">
												<form.AppField name="totalHoursWorked">
													{(field) => (
														<field.NumberField
															label={m["social.B9.totalHoursWorkedLabel"]()}
															description={m["social.B9.totalHoursWorkedDescription"]()}
															min="0"
														/>
													)}
												</form.AppField>
											</div>
										) : null
									}
								</form.Subscribe>
							</div>

							{/* Rate of work-related accidents */}
							<div className="max-w-md">
								<NumberFieldReadOnly
									label={m["social.B9.rateOfWorkAccidentsLabel"]()}
									value={calculatedRate}
									description={m["social.B9.rateOfWorkAccidentsDescription"]()}
									placeholder="0"
								/>
							</div>
						</fieldset>
					</CardContent>
				</Card>

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
