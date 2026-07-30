import { useStore as useYearStore } from '@tanstack/react-store'
import { Info, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	PREDEFINED_TITLES,
	type SustainabilityInitiativesFormValues,
	sustainabilityInitiativesSchema,
} from '@/lib/forms/schemas/b2-sustainability-initiatives-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function B2SustainabilityInitiativesForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<SustainabilityInitiativesFormValues>({
			table: 'formGeneral',
			reportingYear,
			section: 'sustainabilityInitiatives',
			schema: sustainabilityInitiativesSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				initiatives: [],
			} as SustainabilityInitiativesFormValues,
		})

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				Loading...
			</div>
		)
	}

	return (
		<>
			<Alert variant='info' className='mb-6'>
				<Info />
				<AlertTitle>{m["general.B2.sustainabilityTitle"]()}</AlertTitle>
				<AlertDescription>
					{m["general.B2.sustainabilityDescription"]()}{' '}
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

						{/* Publicly available switch */}

						{/* Initiatives array */}
						<form.AppField name='initiatives'>
							{(field) => (
								<div className='space-y-4'>
									{field.state.value?.length === 0 && (
										<Card className='bg-muted/30'>
											<CardContent className='pt-6 text-center'>
												<div className='text-4xl mb-2'>📋</div>
												<h3 className='font-medium mb-2'>{m["general.B2.noInitiativesAdded"]()}</h3>
												<p className='text-sm text-muted-foreground mb-4'>
													{m["general.B2.noInitiativesAddedDescription"]()}
												</p>
											</CardContent>
										</Card>
									)}

									{field.state.value?.map((item, i) => (
										<Card key={item.id} className='relative'>
											<CardContent className='space-y-4'>
												<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-end'>
													<form.AppField name={`initiatives[${i}].title`}>
														{(f) => (
															<f.ComboboxField
																label={m["general.B2.initiativeTitle"]()}
																options={PREDEFINED_TITLES}
																placeholder={m["general.B2.initiativePlaceholder"]()}
																helperText={m["general.B2.initiativeHelperText"]()}
															/>
														)}
													</form.AppField>
													<form.AppField name={`initiatives[${i}].publiclyAvailable`}>
														{(field) => <field.SwitchField label={m["general.B2.availablity"]()} />}
													</form.AppField>
												</div>

												<form.AppField name={`initiatives[${i}].description`}>
													{(f) => (
														<f.TextareaField label={m["general.B2.initiativeDescriptionLabel"]()} placeholder={m["general.B2.initiativeDescriptionPlaceholder"]()} rows={3} />
													)}
												</form.AppField>

												<form.AppField name={`initiatives[${i}].goals`}>
													{(f) => (
														<f.TextareaField
															label={m["general.B2.initiativeGoalsLabel"]()}
															placeholder={m["general.B2.initiativeGoalsPlaceholder"]()}
															rows={3}
														/>
													)}
												</form.AppField>

												<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
													<form.AppField name={`initiatives[${i}].responsiblePerson`}>
														{(f) => (
															<f.TextField
																label={m["general.B2.initiativeResponsibleLabel"]()}
																placeholder={m["general.B2.initiativeResponsiblePlaceholder"]()}
															/>
														)}
													</form.AppField>

													<form.AppField name={`initiatives[${i}].status`}>
														{(f) => (
															<f.SelectField
																label={m["general.B2.initiativeStatusLabel"]()}
																options={[
																	{
																		label: `${m["general.B2.initiativeStatusNotStarted"]()}`,
																		value: "not_started",
																	},
																	{
																		label: `${m["general.B2.initiativeStatusInProgress"]()}`,
																		value: "in_progress",
																	},
																	{ label: `${m["general.B2.initiativeStatusCompleted"]()}`, value: "completed" },
																]}
															/>
														)}
													</form.AppField>
												</div>
												<div className='flex justify-end'>
													<Button
														type='button'
														variant='outline'
														size='sm'
														className='text-destructive border-destructive/20 hover:bg-destructive/10'
														onClick={() => field.removeValue(i)}
														disabled={status === "submitted"}
													>
														<Trash2 className='h-4 w-4' />
														{m["general.B2.Remove"]()}
													</Button>
												</div>
											</CardContent>
										</Card>
									))}

									<Button
										type='button'
										variant='outline'
										className='w-full'
										onClick={() =>
											field.pushValue({
												id: crypto.randomUUID(),
												title: "",
												description: "",
												goals: "",
												responsiblePerson: "",
												status: "not_started",
												publiclyAvailable: false,
											})
										}
										disabled={status === "submitted"}
									>
										<Plus className='h-4 w-4 mr-2' />
										{m["general.B2.addInitiative"]()}
									</Button>
								</div>
							)}
						</form.AppField>
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
