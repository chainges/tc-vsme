import { useStore, useStore as useYearStore } from '@tanstack/react-store'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type C4ClimateRiskFormValues,
	c4ClimateRiskSchema,
} from '@/lib/forms/schemas/c4-climate-risk-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'
import ConfidentialInfoBox from '../ConfidentialInfoBox'

export function C4ClimateRiskForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } = useFormSubmission<C4ClimateRiskFormValues>({
		table: "formEnvironmental",
		reportingYear,
		section: "climateRiskAnalysis",
		schema: c4ClimateRiskSchema,
		defaultValues: {
			reportingYear: reportingYear.toString(),
			climateRiskDescription: "",
			hasIdentifiedClimateRelatedHazardious: false,
			confidentialAreas: [],
			exposureAndSensitivityAssessment: "",
			timeHorizonsIdentified: "",
			climateAdaptationActions: false,
			potentialAdverseEffectsAndRiskRating: "",
		} as C4ClimateRiskFormValues,
	})

	const confidentialAreas = useStore(
		form.store,
		(state) => state.values.confidentialAreas ?? [],
	)
	const isC4Confidential = confidentialAreas.includes("vsme:C4-ClimateRiskAnalysis")
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, "vsme:C4-ClimateRiskAnalysis"])]
			: confidentialAreas.filter((area) => area !== "vsme:C4-ClimateRiskAnalysis")
		form.setFieldValue("confidentialAreas", nextAreas)
	}

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
				<fieldset disabled={status === "submitted"} className='space-y-6'>
					<form.AppField name='reportingYear'>
						{(field) => (
							<field.TextField label={m["environmental.C4.reportingYearLabel"]()} placeholder='YYYY' hidden />
						)}
					</form.AppField>
					<ConfidentialInfoBox value={isC4Confidential} handleChange={handleConfidentialChange} />

					<Card>
						<CardContent className='space-y-6'>
							<form.AppField name='hasIdentifiedClimateRelatedHazardious'>
								{(field) => (
									<field.SwitchField label={m["environmental.C4.hasIdentifiedClimateRelatedHazardiousLabel"]()} />
								)}
							</form.AppField>

							<form.Subscribe selector={(state) => state.values.hasIdentifiedClimateRelatedHazardious}>
								{(status) =>
									status && (
										<>
											<form.AppField name='climateRiskDescription'>
												{(field) => (
													<field.TextareaField
														label={m["environmental.C4.climateRiskDescriptionLabel"]()}
														placeholder={m["environmental.C4.climateRiskDescriptionPlaceholder"]()}
														rows={8}
														description={m["environmental.C4.climateRiskDescriptionDescription"]()}
													/>
												)}
											</form.AppField>

											<form.AppField name='exposureAndSensitivityAssessment'>
												{(field) => (
													<field.TextareaField
														label={m["environmental.C4.exposureAndSensitivityAssessmentLabel"]()}
														placeholder={m["environmental.C4.exposureAndSensitivityAssessmentPlaceholder"]()}
														rows={8}
													/>
												)}
											</form.AppField>

											<form.AppField name='timeHorizonsIdentified'>
												{(field) => (
													<field.TextareaField
														label={m["environmental.C4.timeHorizonsIdentifiedLabel"]()}
														placeholder={m["environmental.C4.timeHorizonsIdentifiedPlaceholder"]()}
														rows={8}
													/>
												)}
											</form.AppField>

											<form.AppField name='climateAdaptationActions'>
												{(field) => (
													<field.SwitchField label={m["environmental.C4.climateAdaptationActionsLabel"]()} />
												)}
											</form.AppField>

											<form.AppField name='potentialAdverseEffectsAndRiskRating'>
												{(field) => (
													<field.TextareaField
														label={m["environmental.C4.potentialAdverseEffectsAndRiskRatingLabel"]()}
														placeholder={m["environmental.C4.potentialAdverseEffectsAndRiskRatingPlaceholder"]()}
														rows={8}
													/>
												)}
											</form.AppField>
										</>
									)
								}
							</form.Subscribe>

							

							
						</CardContent>
					</Card>
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
	)
}
