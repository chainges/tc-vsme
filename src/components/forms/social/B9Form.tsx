import { useStore as useYearStore } from '@tanstack/react-store'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type B9HealthSafetyFormValues,
	b9HealthSafetySchema,
} from '@/lib/forms/schemas/b9-health-safety-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function B9HealthSafetyForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B9HealthSafetyFormValues>({
			table: 'formSocial',
			reportingYear,
			section: 'healthSafety',
			schema: b9HealthSafetySchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				anyAdditionalInfo: '',
			} as B9HealthSafetyFormValues,
		})

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

							{/* Arbeidsulykker + Sykefravær */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.AppField name="workAccidents">
									{(field) => (
										<field.NumberField
											label={m["social.B9.workAccidentsLabel"]()}
											description={m["social.B9.workAccidentsDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="sicknessAbsencePercentage">
									{(field) => (
										<field.NumberField
											label={m["social.B9.sickLeaveLabel"]()}
											description={m["social.B9.sickLeaveDescription"]()}
											unit="%"
											step="0.1"
											min="0"
											max="100"
										/>
									)}
								</form.AppField>
							</div>

							{/* HMS-opplæring + Omkomne */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.AppField name="hmsTraining">
									{(field) => (
										<field.NumberField
											label={m["social.B9.hseTrainingLabel"]()}
											description={m["social.B9.hseTrainingDescription"]()}
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

							{/* Eventuell utfyllende info */}
							<form.AppField name="anyAdditionalInfo">
								{(field) => (
									<field.TextareaField
										label={m["social.B9.additionalInfoLabel"]()}
										placeholder={m["social.B9.additionalInfoPlaceholder"]()}
										description={m["social.B9.additionalInfoDescription"]()}
									/>
								)}
							</form.AppField>
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
