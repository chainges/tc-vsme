import { useStore as useYearStore } from '@tanstack/react-store'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type B5BiodiversityFormValues,
	b5BiodiversitySchema,
} from '@/lib/forms/schemas/b5-biodiversity-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function B5BiodiversityForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B5BiodiversityFormValues>({
			table: 'formEnvironmental',
			reportingYear,
			section: 'biodiversity',
			schema: b5BiodiversitySchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				hasSensitiveBiodiversityAreas: false,
				totalAreaHectares: undefined,
				protectedAreaHectares: undefined,
				nonProtectedAreaHectares: undefined,
				protectedSpeciesCount: '',
				redListedSpeciesCount: '',
			} as B5BiodiversityFormValues,
		})

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
								label={m["environmental.B5.reportingYearLabel"]()}
								placeholder="YYYY"
								hidden
							/>
						)}
					</form.AppField>

					<Card>
						<CardContent className="space-y-6">
							<form.AppField
								name="hasSensitiveBiodiversityAreas"
								listeners={{
									onChange: ({ value, fieldApi }) => {
										if (!value) {
											fieldApi.form.setFieldValue(
												'totalAreaHectares',
												undefined,
											)
											fieldApi.form.setFieldValue(
												'protectedAreaHectares',
												undefined,
											)
											fieldApi.form.setFieldValue(
												'nonProtectedAreaHectares',
												undefined,
											)
										}
									},
								}}
							>
								{(field) => (
									<field.SwitchField label={m["environmental.B5.label"]()} />
								)}
							</form.AppField>

							<form.Subscribe
								selector={(state) => state.values.hasSensitiveBiodiversityAreas}
							>
								{(hasSensitiveBiodiversityAreas) =>
									hasSensitiveBiodiversityAreas ? (
										<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
											<form.AppField name="totalAreaHectares">
												{(field) => (
													<field.NumberField
														label={m["environmental.B5.totalAreaHectaresLabel"]()}
														unit={m["environmental.B5.unit"]()}
													/>
												)}
											</form.AppField>

											<form.AppField name="protectedAreaHectares">
												{(field) => (
													<field.NumberField
														label={m["environmental.B5.protectedAreaHectares"]()}
														unit={m["environmental.B5.unit"]()}
													/>
												)}
											</form.AppField>

											<form.AppField name="nonProtectedAreaHectares">
												{(field) => (
													<field.NumberField
														label={m["environmental.B5.nonProtectedAreaHectares"]()}
														unit={m["environmental.B5.unit"]()}
													/>
												)}
											</form.AppField>
										</div>
									) : null
								}
							</form.Subscribe>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<form.AppField name="protectedSpeciesCount">
									{(field) => (
										<field.TextField
											label={m["environmental.B5.protectedSpeciesCountLabel"]()}
											description={m["environmental.B5.protectedSpeciesCountDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="redListedSpeciesCount">
									{(field) => (
										<field.TextField
											label={m["environmental.B5.redListedSpeciesCountLabel"]()}
											description={m["environmental.B5.redListedSpeciesCountDescription"]()}
										/>
									)}
								</form.AppField>
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
