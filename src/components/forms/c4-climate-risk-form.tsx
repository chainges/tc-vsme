import { useStore as useYearStore } from '@tanstack/react-store'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type C4ClimateRiskFormValues,
	c4ClimateRiskSchema,
} from '@/lib/forms/schemas/c4-climate-risk-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function C4ClimateRiskForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<C4ClimateRiskFormValues>({
			table: 'formEnvironmental',
			reportingYear,
			section: 'climateRiskAnalysis',
			schema: c4ClimateRiskSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				climateRiskDescription: '',
			} as C4ClimateRiskFormValues,
		})

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				{m["environmental.C4.loading"]()}
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
				<fieldset disabled={status === 'submitted'} className="space-y-6">
					<form.AppField name="reportingYear">
						{(field) => (
							<field.TextField
								label={m["environmental.C4.reportingYearLabel"]()}
								placeholder="YYYY"
								hidden
							/>
						)}
					</form.AppField>

					<Card>
						<CardContent className="space-y-6">
							<form.AppField name="climateRiskDescription">
								{(field) => (
									<field.TextareaField
										label={m["environmental.C4.climateRiskDescriptionLabel"]()}
										placeholder={m["environmental.C4.climateRiskDescriptionPlaceholder"]()}
										rows={8}
										description={m["environmental.C4.climateRiskDescriptionDescription"]()}
									/>
								)}
							</form.AppField>
						</CardContent>
					</Card>
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
