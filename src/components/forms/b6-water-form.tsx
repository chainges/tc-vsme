import { useStore } from '@tanstack/react-form'
import { useStore as useYearStore } from '@tanstack/react-store'
import { NumberFieldReadOnly } from '@/components/form-fields/NumberFieldReadOnly'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type B6WaterFormValues,
	b6WaterSchema,
} from '@/lib/forms/schemas/b6-water-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function B6WaterManagementForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B6WaterFormValues>({
			table: 'formEnvironmental',
			reportingYear,
			section: 'waterManagement',
			schema: b6WaterSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				waterWithdrawal: 0,
				waterWithdrawalStress: 0,
				waterDischarge: 0,
			} as B6WaterFormValues,
			transformBeforeSave: (values) => ({
				...values,
				waterConsumption:
					(values.waterWithdrawal ?? 0) - (values.waterDischarge ?? 0),
			}),
		})

	const withdrawal = useStore(
		form.store,
		(state) => (state.values as B6WaterFormValues).waterWithdrawal,
	)
	const discharge = useStore(
		form.store,
		(state) => (state.values as B6WaterFormValues).waterDischarge,
	)

	const waterConsumption = (withdrawal ?? 0) - (discharge ?? 0)

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				Loading...
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
								label={m["environmental.B6.reportingYearLabel"]()}
								placeholder="YYYY"
								hidden
							/>
						)}
					</form.AppField>

					<Card>
						<CardContent className="">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<form.AppField name="waterWithdrawal">
									{(field) => (
										<field.NumberField
											label={m["environmental.B6.waterWithdrawal"]()}
											unit={m["environmental.B6.unit"]()}
											description={m["environmental.B6.waterWithdrawalDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="waterWithdrawalStress">
									{(field) => (
										<field.NumberField
											label={m["environmental.B6.waterWithdrawalStress"]()}
											unit={m["environmental.B6.unit"]()}
											description={m["environmental.B6.waterWithdrawalStressDescription"]()}
										/>
									)}
								</form.AppField>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.AppField name="waterDischarge">
									{(field) => (
										<field.NumberField
											label={m["environmental.B6.waterDischarge"]()}
											unit={m["environmental.B6.unit"]()}
											description={m["environmental.B6.waterDischargeDescription"]()}
										/>
									)}
								</form.AppField>

								<NumberFieldReadOnly
									label={m["environmental.B6.waterConsumptionLabel"]()}
									unit={m["environmental.B6.unit"]()}
									value={waterConsumption}
									description={m["environmental.B6.waterConsumptionDescription"]()}
								/>
							</div>
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
