import { useStore } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { useStore as useYearStore } from '@tanstack/react-store'
import { useAction, useQuery as useConvexQuery } from 'convex/react'
import {
	Award,
	Building2,
	History,
	Plus,
	RefreshCw,
	Trash2,
} from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { useOrgGuard } from '@/hooks/use-org-guard'
import {
	type B1GeneralFormValues,
	b1GeneralSchema,
	EMPLOYEE_COUNTING_METHODOLOGIES,
	TYPE_OF_NUMBER_OF_EMPLOYEES,
} from '@/lib/forms/schemas/b1-general-schema'
import { yearStore } from '@/lib/year-store'
import { m } from "@/paraglide/messages"
import { api } from '../../../convex/_generated/api'
import type { FieldChange, FormVersion } from '../../../convex/forms/_utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FieldGroup } from '../ui/field'

type MongoEmissionsData = {
	Revenue?: number
	[key: string]: unknown
}

/**
 * Maps MongoDB emissions data to form default values.
 * Extracts revenue from MongoDB for form pre-population.
 */
function mapMongoToFormDefaults(data: MongoEmissionsData | null | undefined): {
	revenue?: number
} {
	if (!data || data.Revenue === undefined) return {}
	return { revenue: data.Revenue }
}

export function B1GeneralForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	// Guard against race conditions during org switching
	const { organization, skipQuery } = useOrgGuard()
	const orgData = useConvexQuery(
		api.organizations.getByClerkOrgId,
		skipQuery || { clerkOrgId: organization?.id ?? '' },
	)

	// Fetch MongoDB emissions data with TanStack Query for caching
	const getEmissions = useAction(api.emissions.getEmissionsByOrgId)
	const {
		data: mongoDefaults,
		isLoading: isMongoLoading,
		isError,
		refetch: refetchMongoData,
		isFetching: isRefetching,
	} = useQuery({
		queryKey: ['emissions', organization?.id, reportingYear],
		queryFn: async () => {
			const result = await getEmissions({
				orgIdToUse: organization!.id,
				year: reportingYear,
			})

			if (result.success && result.data) {
				return mapMongoToFormDefaults(result.data as MongoEmissionsData)
			}

			return {}
		},
		enabled: !!organization?.id,
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
		retry: 1, // Only retry once on failure
	})

	// Merge base defaults with org data and MongoDB defaults
	const defaultValues = useMemo<B1GeneralFormValues>(() => {
		const baseDefaults: B1GeneralFormValues = {
			reportingYear: reportingYear.toString(),
			organizationName: orgData?.name || '',
			organizationNumber: orgData?.orgNumber || '',
			naceCode: orgData?.naceCode || '',
			revenue: 0,
			balanceSheetTotal: 0,
			employees: 0,
			EmployeeCountingMethodology: 'vsme:AtTheEndOfTheReportingPeriodMember',
			TypeOfNumberOfEmployees: 'vsme:HeadcountMember',
			country: 'NOR',
			reportType: false,
			subsidiaries: [],
			contactPersonName: '',
			contactPersonEmail: '',
			properties: [],
			certifications: [],
		}

		return {
			...baseDefaults,
			...mongoDefaults,
		} as B1GeneralFormValues
	}, [reportingYear, orgData, mongoDefaults])

	const {
		form,
		status,
		isSaving,
		isLoading,
		existingData,
		saveDraft,
		submit,
		reopen,
		rollback,
	} = useFormSubmission<B1GeneralFormValues>({
		table: 'formGeneral',
		reportingYear,
		section: 'companyInfo',
		schema: b1GeneralSchema,
		defaultValues,
	})

	// Ensure org-sourced fields are always populated from live data,
	// overriding any stale empty values that may have been saved in a draft.
	// useEffect(() => {
	// 	if (orgData?.orgNumber) {
	// 		form.setFieldValue('organizationNumber', orgData.orgNumber)
	// 	}
	// 	if (orgData?.name) {
	// 		form.setFieldValue('organizationName', orgData.name)
	// 	}
	// }, [orgData?.orgNumber, orgData?.name, form])

	const reportType2 = useStore(form.store, (state) => state.values.reportType)

	// Combined loading state (only for initial load, not refetch)
	const isFormLoading = isLoading || isMongoLoading

	if (isFormLoading) {
		return (
			<div className="p-8 text-center text-muted-foreground">
				Loading form data...
			</div>
		)
	}
	//console.log(orgData)

	return (
		<>
			<form.AppForm>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<fieldset disabled={status === "submitted"} className='space-y-6'>
						{/* Row 1: Reporting Year & Org Number is hidden */}
						<p>ReportType: {reportType2 ? "True" : "False"}</p>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<form.AppField name='reportingYear'>
								{(field) => <field.TextField label={m["general.reportingYear"]()} placeholder='YYYY' disabled hidden />}
							</form.AppField>

							<form.AppField name='organizationNumber'>
								{(field) => <field.TextField label={m["general.B1.organizationNumber"]()} hidden />}
							</form.AppField>
						</div>

						{/* Row 2: Org Name & NACE */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<form.AppField name='organizationName'>
								{(field) => <field.TextField label={m["general.B1.organizationName"]()} />}
							</form.AppField>

							<form.AppField name='naceCode'>
								{(field) => <field.TextField label={m["general.B1.naceCode"]()} description={m["general.B1.naceCodeDescription"]()} />}
							</form.AppField>
						</div>

						{/* Row 3: Revenue & Balance */}
						{/* TODO: Add button to fetch data from Brønnøysundregistrene */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<form.AppField name='revenue'>
									{(field) => <field.NumberField label={m["general.B1.revenue"]()} unit='NOK' placeholder='0' />}
								</form.AppField>
								{/* Show retry button only on fetch error */}
								{isError && (
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='text-destructive hover:text-destructive hover:bg-destructive/10'
										onClick={() => refetchMongoData()}
										disabled={isRefetching}
									>
										<RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
										{isRefetching ? "Retrying..." : "Retry fetching revenue data"}
									</Button>
								)}
							</div>

							<form.AppField name='balanceSheetTotal'>
								{(field) => <field.NumberField label={m["general.B1.balanceSheetTotal"]()} unit='NOK' />}
							</form.AppField>
						</div>

						{/* Row 4: Employees & Country */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<form.AppField name='employees'>
								{(field) => <field.NumberField label={m["general.B1.employees"]()} />}
							</form.AppField>

							<form.AppField name='country'>{(field) => <field.CountryField label={m["general.B1.country"]()} />}</form.AppField>
							<form.AppField name='EmployeeCountingMethodology'>
								{(field) => (
									<field.SelectField
										label={m["general.B1.EmployeeCountingMethodology"]()}
										placeholder={m["general.B1.atEndOfTheReportingPeriod"]()}
										options={EMPLOYEE_COUNTING_METHODOLOGIES.map((t) => ({
											label:
												t === "vsme:AtTheEndOfTheReportingPeriodMember"
													? m["general.B1.atEndOfTheReportingPeriod"]()
													: m["general.B1.averageDuringTheReportingPeriod"](),
											value: t,
										}))}
									/>
								)}
							</form.AppField>
							<form.AppField name='TypeOfNumberOfEmployees'>
								{(field) => (
									<field.SelectField
										label={m["general.B1.TypeOfNumberOfEmployees"]()}
										placeholder={m["general.B1.TypeOfNumberOfEmployeesDescription"]()}
										options={TYPE_OF_NUMBER_OF_EMPLOYEES.map((e) => ({
											label: e === "vsme:HeadcountMember" ? m["general.B1.headcount"]() : m["general.B1.FTE"](),
											value: e,
										}))}
									/>
								)}
							</form.AppField>
						</div>

						{/* Row 5: Contact Person */}
						<FieldGroup>
							<div className='pt-4 pb-4 border-t border-b border-border'>
								<h2 className='text-lg font-medium mb-4'>{m["general.B1.contactPerson"]()}</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<form.AppField name='contactPersonName'>
										{(field) => <field.TextField label={m["general.B1.contactPersonName"]()} />}
									</form.AppField>

									<form.AppField name='contactPersonEmail'>
										{(field) => <field.TextField label={m["general.B1.contactPersonEmail"]()} />}
									</form.AppField>
								</div>
							</div>
						</FieldGroup>

						{/* Row 6: Report Type */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<form.AppField
								name='reportType'
								listeners={{
									onChange: ({ value, fieldApi }) => {
										if (!value) {
											fieldApi.form.setFieldValue("subsidiaries", [])
										}
									},
								}}
							>
								{(field) => <field.SwitchField label={m["general.B1.reportType"]()} description={m["general.B1.reportTypeDescription"]()} />}
							</form.AppField>
							{/* Empty column to match image layout if needed, or just full width */}

							<div></div>
						</div>

						<form.Subscribe selector={(state) => state.values.reportType}>
							{(reportType) => (
								<FieldGroup>
									{reportType && (
										<div className='pt-4'>
											<h2 className='text-lg font-medium mb-4'>{m["general.B1.subsidiaries"]()}</h2>
											<form.AppField name='subsidiaries'>
												{(field) => (
													<div className='space-y-4'>
														{field.state.value?.map((item, i) => (
															<div key={item.id} className='grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-x-6'>
																<form.AppField name={`subsidiaries[${i}].name`}>
																	{(f) => <f.TextField label={m["general.B1.nameOfSubsidiary"]()} />}
																</form.AppField>
																<form.AppField name={`subsidiaries[${i}].address`}>
																	{(f) => <f.TextField label={m["general.B1.address"]()} />}
																</form.AppField>
																<Button
																	type='button'
																	variant='ghost'
																	size='icon'
																	className='text-destructive hover:text-destructive hover:bg-destructive/10 self-end'
																	onClick={() => field.removeValue(i)}
																	disabled={status === "submitted"}
																>
																	<Trash2 className='h-6 w-6' />
																</Button>
															</div>
														))}
														<Button
															type='button'
															variant='outline'
															className='w-full md:w-auto'
															onClick={() =>
																field.pushValue({
																	id: crypto.randomUUID(),
																	name: "",
																	address: "",
																})
															}
															disabled={status === "submitted"}
														>
															<Plus className='h-4 w-4 mr-2' />
															{m["general.B1.addSubsidiary"]()}
														</Button>
													</div>
												)}
											</form.AppField>
										</div>
									)}
								</FieldGroup>
							)}
						</form.Subscribe>
						{/* Row 7: Certifications & Properties in a grid for lg screens */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-border'>
							{/* Certifications Section */}
							<FieldGroup>
								<div className='flex items-center gap-2 mb-1'>
									<Award className='h-5 w-5 text-muted-foreground' />
									<h2 className='text-lg font-medium'>{m["general.B1.certificationsAndLabels"]()}</h2>
								</div>
								<p className='text-sm text-muted-foreground mb-4'>{m["general.B1.certificationsAndLabelsDescription"]()}</p>

								<form.AppField name='certifications'>
									{(field) => (
										<div className='space-y-4'>
											{field.state.value?.map((item, i) => (
												<div key={item.id} className='relative rounded-lg border border-border bg-card p-4 space-y-4'>
													<div className='flex items-center justify-between'>
														<span className='text-sm font-medium text-muted-foreground'>{m["general.B1.certification"]()} {i + 1}</span>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															className='h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10'
															onClick={() => field.removeValue(i)}
															disabled={status === "submitted"}
															aria-label={`Fjern sertifisering ${i + 1}`}
														>
															<Trash2 className='h-4 w-4' />
														</Button>
													</div>

													<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
														<form.AppField name={`certifications[${i}].name`}>
															{(f) => (
																<f.TextField
																	label={m["general.B1.certificationOrLabel"]()}
																	placeholder={m["general.B1.certificationOrLabelDescription"]()}
																/>
															)}
														</form.AppField>
														<form.AppField name={`certifications[${i}].issuer`}>
															{(f) => <f.TextField label={m["general.B1.issuer"]()} placeholder={m["general.B1.issuer"]()} />}
														</form.AppField>
														<form.AppField name={`certifications[${i}].date`}>
															{(f) => <f.DateField label={m["general.B1.date"]()} placeholder={m["general.B1.datePlaceholder"]()} />}
														</form.AppField>
														<form.AppField name={`certifications[${i}].assessment`}>
															{(f) => <f.TextField label={m["general.B1.ratingOrScore"]()} placeholder={m["general.B1.ratingOrScoreDescription"]()} />}
														</form.AppField>
													</div>
												</div>
											))}

											<Button
												type='button'
												variant='outline'
												className='w-full'
												onClick={() =>
													field.pushValue({
														id: crypto.randomUUID(),
														name: "",
														issuer: "",
														date: "",
														assessment: "",
													})
												}
												disabled={status === "submitted"}
											>
												<Plus className='h-4 w-4 mr-2' />
												{m["general.B1.addCertification"]()}
											</Button>
										</div>
									)}
								</form.AppField>
							</FieldGroup>

							{/* Properties Section */}
							<FieldGroup>
								<div className='flex items-center gap-2 mb-1'>
									<Building2 className='h-5 w-5 text-muted-foreground' />
									<h2 className='text-lg font-medium'>{m["general.B1.properties"]()}</h2>
								</div>
								<p className='text-sm text-muted-foreground mb-4'>
									{m["general.B1.propertiesDescription"]()}
								</p>

								<form.AppField name='properties'>
									{(field) => (
										<div className='space-y-4'>
											{field.state.value?.map((item, i) => (
												<div key={item.id} className='relative rounded-lg border border-border bg-card p-4'>
													<div className='flex items-center justify-between mb-3'>
														<span className='text-sm font-medium text-muted-foreground'>{m["general.B1.property"]()} {i + 1}</span>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															className='h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10'
															onClick={() => field.removeValue(i)}
															disabled={status === "submitted"}
															aria-label={`Fjern eiendom ${i + 1}`}
														>
															<Trash2 className='h-4 w-4' />
														</Button>
													</div>

													<form.AppField name={`properties[${i}]`}>
														{(f) => (
															<f.PropertyLocationField
																label={m["general.B1.address"]()}
																description={m["general.B1.addressDescription"]()}
																disabled={status === "submitted"}
															/>
														)}
													</form.AppField>
												</div>
											))}

											<Button
												type='button'
												variant='outline'
												className='w-full'
												onClick={() =>
													field.pushValue({
														id: crypto.randomUUID(),
														formattedAddress: "",
														streetAddress: "",
														city: "",
														postalCode: "",
														country: "",
														countryCode: "",
														placeId: "",
														lat: 0,
														lng: 0,
													})
												}
												disabled={status === "submitted"}
											>
												<Plus className='h-4 w-4 mr-2' />
												{m["general.B1.addProperty"]()}
											</Button>
										</div>
									)}
								</form.AppField>
							</FieldGroup>
						</div>
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

			{/* Version History Panel */}
			{existingData?.versions && existingData.versions.length > 0 && (
				<div className='mt-8 pt-8 border-t border-border'>
					<Accordion type='single' collapsible>
						<AccordionItem value='history' className='border-none'>
							<AccordionTrigger className='hover:no-underline py-0'>
								<h3 className='text-lg font-medium flex items-center gap-2'>
									<History className='h-5 w-5' />
									{m["general.B1.versionHistory"]()}
								</h3>
							</AccordionTrigger>
							<AccordionContent className='pt-4'>
								<div className='space-y-4'>
									{[...existingData.versions].reverse().map((version: FormVersion) => (
										<div key={version.version} className='bg-muted/30 p-4 rounded-md text-sm'>
											<div className='flex justify-between items-start mb-2'>
												<div className='font-medium'>Version {version.version}</div>
												<div className='flex gap-3 items-center ml-auto'>
													<div className='text-muted-foreground text-xs font-mono'>
														{new Date(version.changedAt).toLocaleString()}
													</div>
													<Button
														variant='secondary'
														size='sm'
														className='h-7 px-3 text-xs font-semibold'
														onClick={() => rollback(version.version)}
														disabled={isSaving || status === "submitted"}
													>
														{m["general.B1.rollback"]()}
													</Button>
												</div>
											</div>
											<div className='text-muted-foreground'>
												{version.changes.length > 0 ? (
													<ul className='list-disc list-inside'>
														{version.changes.map((change: FieldChange, i: number) => (
															<li key={`${change.field}-${i}`}>
																{change.field === "_rollback"
																	? m["general.B1.rolledBackToVersion"]({ version: change.newValue })
																	: `${m["general.B1.changed"]()} ${change.field}`
																}
															</li>
														))}
													</ul>
												) : (
													<span className='italic'>{m["general.B1.noChangesRecorded"]()}</span>
												)}
											</div>
										</div>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			)}
		</>
	)
}
