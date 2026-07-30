import { useStore as useYearStore } from '@tanstack/react-store'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { POLLUTANTS } from '@/data/pollutants'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	EMISSION_TYPES,
	POLLUTANT_UNITS,
	type PollutionFormValues,
	pollutionSchema,
} from '@/lib/forms/schemas/b4-pollution-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function B4PollutionForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<PollutionFormValues>({
			table: 'formEnvironmental',
			reportingYear,
			section: 'pollution',
			schema: pollutionSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				reportingPollution: false,
				publiclyAvailableDisclosure: false,
				urlOrLinkToPubliclyAvailableDisclosure: '',
				pollutants: [],
			} as PollutionFormValues,
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
								label={m["environmental.B4.reportingYear"]()}
								placeholder="YYYY"
								hidden
							/>
						)}
					</form.AppField>

					<Card>
						<CardContent className="space-y-6">
							<form.AppField name="reportingPollution">
								{(field) => (
									<field.SwitchField label={m["environmental.B4.reportingPollutionLabel"]()} />
								)}
							</form.AppField>

							<form.Subscribe
								selector={(state) => state.values.reportingPollution}
							>
								{(reporting) =>
									reporting && (
										<div className="space-y-6">
											<form.AppField name="publiclyAvailableDisclosure">
												{(field) => (
													<field.SwitchField label={m["environmental.B4.publiclyAvailableDisclosure"]()} />
												)}
											</form.AppField>

											<form.Subscribe
												selector={(state) =>
													state.values.publiclyAvailableDisclosure
												}
											>
												{(isPublic) => (
													<>
														<div className={isPublic ? 'block' : 'hidden'}>
															<form.AppField name="urlOrLinkToPubliclyAvailableDisclosure">
																{(field) => (
																	<field.TextField
																		label={m["environmental.B4.urlOrLinkToPubliclyAvailableDisclosure"]()}
																		placeholder="https://..."
																	/>
																)}
															</form.AppField>
														</div>
														<div className={isPublic ? 'hidden' : 'block'}>
															<form.AppField name="pollutants">
																{(field) => (
																	<div className="space-y-4">
																		{field.state.value?.length === 0 && (
																			<Card className="bg-muted/30">
																				<CardContent className="pt-6 text-center">
																					<div className="text-4xl mb-2">
																						💨
																					</div>
																					<h3 className="font-medium mb-2">
																						{m["environmental.B4.pollutantsHeading"]()}
																					</h3>
																					<p className="text-sm text-muted-foreground mb-4">
																						{m["environmental.B4.pollutantsDescription"]()}
																					</p>
																				</CardContent>
																			</Card>
																		)}

																		{field.state.value?.map((item, i) => (
																			<Card key={item.id} className="relative">
																				<CardHeader className="pb-3 sr-only">
																					<CardTitle className="text-base">
																						{m["environmental.B4.pollution"]()} {i + 1}
																					</CardTitle>
																				</CardHeader>
																				<CardContent className="space-y-6">
																					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
																						<form.AppField
																							name={`pollutants[${i}].pollutionType`}
																						>
																							{(f) => (
																								<f.ComboboxField
																									label={m["environmental.B4.pollutionLabel"]()}
																									options={[...POLLUTANTS]}
																									placeholder={m["environmental.B4.pollutionPlaceholder"]()}
																									helperText={m["environmental.B4.pollutionHelperText"]()}
																								/>
																							)}
																						</form.AppField>

																						<form.AppField
																							name={`pollutants[${i}].emissionType`}
																						>
																							{(f) => (
																								<f.SelectField
																									label={m["environmental.B4.emissionTypeLabel"]()}
																									placeholder={m["environmental.B4.emissionTypePlaceholder"]()}
																									options={EMISSION_TYPES.map(
																										(t) => ({
																											label: t,
																											value: t,
																										}),
																									)}
																								/>
																							)}
																						</form.AppField>
																					</div>

																					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
																						<form.AppField
																							name={`pollutants[${i}].amount`}
																						>
																							{(f) => (
																								<f.NumberField
																									label={m["environmental.B4.Amount"]()}
																									placeholder="0"
																									description={m["environmental.B4.AmountDescription"]()}
																								/>
																							)}
																						</form.AppField>

																						<form.AppField
																							name={`pollutants[${i}].unit`}
																						>
																							{(f) => (
																								<f.SelectField
																									label={m["environmental.B4.unit"]()}
																									placeholder={m["environmental.B4.unitPlaceholder"]()}
																									options={POLLUTANT_UNITS.map(
																										(u) => ({
																											label: u,
																											value: u,
																										}),
																									)}
																								/>
																							)}
																						</form.AppField>
																					</div>

																					<div className="flex justify-end">
																						<Button
																							type="button"
																							variant="outline"
																							size="sm"
																							className="text-destructive border-destructive/20 hover:bg-destructive/10"
																							onClick={() =>
																								field.removeValue(i)
																							}
																							disabled={status === 'submitted'}
																						>
																							<Trash2 className="h-4 w-4" />
																							{m["environmental.B4.Remove"]()}
																						</Button>
																					</div>
																				</CardContent>
																			</Card>
																		))}

																		<Button
																			type="button"
																			variant="outline"
																			className="w-full"
																			onClick={() =>
																				field.pushValue({
																					id: crypto.randomUUID(),
																					pollutionType: '',
																					emissionType: EMISSION_TYPES[0],
																					amount: 0,
																					unit: POLLUTANT_UNITS[0],
																				})
																			}
																			disabled={status === 'submitted'}
																		>
																			<Plus className="h-4 w-4 mr-2" />
																			{m["environmental.B4.addPollution"]()}
																		</Button>
																	</div>
																)}
															</form.AppField>
														</div>
													</>
												)}
											</form.Subscribe>
										</div>
									)
								}
							</form.Subscribe>
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
