import { type AnyFormApi, useStore } from '@tanstack/react-form'
import { useStore as useYearStore } from '@tanstack/react-store'
import { api } from 'convex/_generated/api'
import { useMutation } from 'convex/react'
import { AlertTriangle, GlobeIcon, Info, Plus, Save, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import ConfidentialInfoBox from '@/components/ConfidentialInfoBox'
import { NumberFieldReadOnly } from '@/components/form-fields/NumberFieldReadOnly'
import SectionHeading from '@/components/SectionHeading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type B8WorkforceFormValues,
	b8WorkforceSchema,
} from '@/lib/forms/schemas/b8-workforce-schema'
import { yearStore } from '@/lib/year-store'
import { m } from "@/paraglide/messages"

const confidentialAreaValues = {
	typeOfContract: "vsme:B8TypeOfContractMember",
	gender: "vsme:B8GenderMember",
	countryOfEmployment: "vsme:B8CountryOfEmploymentMember",
	turnoverRate: "vsme:B8TurnoverRateMember",
}


interface EmployeeCountAlertProps {
	form: AnyFormApi
	totalEmployees: number
}

const B8_Confidential = "vsme:B8-WorkforceGeneralCharacteristicsMember"

function EmployeeCountAlert({ form, totalEmployees }: EmployeeCountAlertProps) {
	const employeeSum = useStore(form.store, (state) => {
		const perm = state.values.permanentContractEmployees ?? 0
		const temp = state.values.temporaryContractEmployees ?? 0
		return perm + temp
	})
	const matches = employeeSum === totalEmployees

	return (
		<Alert variant={matches ? 'info' : 'destructive'} className="mb-6 border-l-4">
			{matches ? <Info /> : <AlertTriangle />}
			<AlertTitle>{m["social.B8.employeeCountAlertTitle"]()}</AlertTitle>
			<AlertDescription>
				{matches
					? m["social.B8.employeeCountAlertSuccess"]()
					: m["social.B8.employeeCountAlertMismatch"]({
							employeeSum,
							totalEmployees,
						})}
			</AlertDescription>
		</Alert>
	)
}

function GenderCountAlert({ form, totalEmployees }: EmployeeCountAlertProps) {
	const genderSum = useStore(form.store, (state) => {
		const men = state.values.men ?? 0
		const women = state.values.women ?? 0
		const other = state.values.other ?? 0
		const notReported = state.values.notReported ?? 0
		return men + women + other + notReported
	})
	const matches = genderSum === totalEmployees

	return (
		<Alert variant={matches ? 'info' : 'destructive'} className="mb-6 border-l-4">
			{matches ? <Info /> : <AlertTriangle />}
			<AlertTitle>{m["social.B8.genderCountAlertTitle"]()}</AlertTitle>
			<AlertDescription>
				{matches
					? m["social.B8.genderCountAlertSuccess"]()
					: m["social.B8.genderCountAlertMismatch"]({
							genderSum,
							totalEmployees,
						})}
			</AlertDescription>
		</Alert>
	)
}

interface B8WorkforceFormProps {
	totalEmployees: number
	companyCountry: string
	generalFormData?: Record<string, unknown>
}

export function B8WorkforceForm({
	totalEmployees,
	companyCountry,
	generalFormData
}: B8WorkforceFormProps) {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const [isUpdatingCompany, setIsUpdatingCompany] = useState(false)

	const updateGeneralForm = useMutation(api.forms.save.saveForm)

	const defaultEmployeesByCountry = useMemo(() => {
		if (companyCountry && totalEmployees > 0) {
			return [
				{
					id: crypto.randomUUID(),
					country: companyCountry,
					numberOfEmployees: totalEmployees,
				},
			]
		}
		return []
	}, [companyCountry, totalEmployees])

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B8WorkforceFormValues>({
			table: 'formSocial',
			reportingYear,
			section: 'workforce',
			schema: b8WorkforceSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				permanentContractEmployees: totalEmployees,
				temporaryContractEmployees: 0,
				men: 0,
				women: 0,
				other: 0,
				notReported: 0,
				employeesPerCountry: defaultEmployeesByCountry,
				anyAdditionalInfo: '',
				isB8Confidential: false,
				confidentialAreas: [],
			} as B8WorkforceFormValues,
			transformBeforeSave: (values) => {
				const left = values.employeesLeft ?? 0
				const start = values.employeesAtStart ?? 0
				const end = values.employeesAtEnd ?? 0
				const employeeTurnoverRate =
					start > 0 && end > 0
						? Number((left / ((start + end) / 2)).toFixed(4))
						: undefined
				return { ...values, employeeTurnoverRate }
			},
		})

	const employeeSum = useStore(form.store, (state) => {
		const perm = state.values.permanentContractEmployees ?? 0
		const temp = state.values.temporaryContractEmployees ?? 0
		return perm + temp
	})
	const genderSum = useStore(form.store, (state) => {
		const men = state.values.men ?? 0
		const women = state.values.women ?? 0
		const other = state.values.other ?? 0
		const notReported = state.values.notReported ?? 0
		return men + women + other + notReported
	})

	const confidentialAreas = useStore(
					form.store,
					(state) => state.values.confidentialAreas ?? [],
				)
	
	const isB8Confidential = confidentialAreas.includes(B8_Confidential)
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, B8_Confidential])]
			: confidentialAreas.filter((area) => area !== B8_Confidential)
		form.setFieldValue("confidentialAreas", nextAreas)
	}

	const employeesLeft = useStore(
		form.store,
		(state) => state.values.employeesLeft,
	)
	const employeesAtStart = useStore(
		form.store,
		(state) => state.values.employeesAtStart,
	)
	const employeesAtEnd = useStore(
		form.store,
		(state) => state.values.employeesAtEnd,
	)

	const employeeMatches = employeeSum === totalEmployees
	const genderMatches = genderSum === totalEmployees
	const requiresTurnover = totalEmployees >= 50
	const turnoverComplete =
		employeesLeft != null &&
		employeesAtStart != null &&
		employeesAtEnd != null &&
		employeesLeft >= 0 &&
		employeesAtStart > 0 &&
		employeesAtEnd > 0
	const canSubmit =
		employeeMatches && genderMatches && (!requiresTurnover || turnoverComplete)

	const submitDisabledReasons: string[] = []
	if (!employeeMatches) {
		submitDisabledReasons.push(
			`Employee contract types (${employeeSum}) must match total from B1 (${totalEmployees})`,
		)
	}
	if (!genderMatches) {
		submitDisabledReasons.push(
			`Gender distribution (${genderSum}) must match total from B1 (${totalEmployees})`,
		)
	}
	if (requiresTurnover && !turnoverComplete) {
		submitDisabledReasons.push(
			m["social.B8.turnoverRateRequired"](),
		)
	}

	const turnoverRateAbsolute =
		employeesAtStart != null &&
		employeesAtEnd != null &&
		employeesAtStart > 0 &&
		employeesAtEnd > 0 &&
		employeesLeft != null
			? Number(
					(employeesLeft / ((employeesAtStart + employeesAtEnd) / 2)).toFixed(
						4,
					),
				)
			: undefined

	const turnoverRatePercent =
		turnoverRateAbsolute != null
			? Number((turnoverRateAbsolute * 100).toFixed(2))
			: undefined

	const handleUpdateCompanyEmployees = async (newEmployeeCount: number) => {
		if (!generalFormData) return
		try {
			setIsUpdatingCompany(true)
			await updateGeneralForm({
				table: 'formGeneral',
				reportingYear,
				section: 'companyInfo',
				data: {
					...generalFormData,
					employees: newEmployeeCount,
				},
			})
			toast.success(
				m["social.B8.updatedCompanyEmployees"]({ newEmployeeCount }),
			)
		} catch (error) {
			toast.error(m["social.B8.updateCompanyEmployeesError"]())
			console.error(error)
		} finally {
			setIsUpdatingCompany(false)
		}
	}

	if (isLoading) {
		return <LoadingSkeleton />
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
					{/* Hidden reporting year */}
					<form.AppField name='reportingYear'>
						{(field) => <field.TextField label={m["social.B8.reportingYearLabel"]()} placeholder='YYYY' hidden />}
					</form.AppField>
					<ConfidentialInfoBox value={isB8Confidential} handleChange={handleConfidentialChange} />

					{/* Card 1 — Country distribution */}

					<SectionHeading
						title={m["social.B8.countryDistributionTitle"]()}
						description={m["social.B8.countryDistributionDescription"]({
							totalEmployees,
						})}
						Icon={GlobeIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.countryOfEmployment}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>

					<form.AppField name='employeesPerCountry'>
						{(field) => {
							const rows = field.state.value ?? []

							const totalAllocated = rows.reduce((sum, r) => sum + (r.numberOfEmployees ?? 0), 0)

							const allocationProgress =
								totalEmployees > 0 ? Math.min(Math.max((totalAllocated / totalEmployees) * 100, 0), 100) : 0

							return (
								<div className='overflow-hidden rounded-lg border border-border'>
									<Table className='w-full table-fixed'>
										<TableHeader className='bg-muted/50'>
											<TableRow className='hover:bg-transparent'>
												<TableHead className='h-9 whitespace-normal text-[10px] md:text-xs font-bold uppercase'>
													{m["social.B8.countryLabel"]()}
												</TableHead>

												<TableHead className='h-9 w-[32%] whitespace-normal wrap-anywhere text-[10px] md:text-xs font-bold uppercase sm:w-[30%]'>
													{m["social.B8.employeeCountLabel"]()}
												</TableHead>

												<TableHead className='hidden h-9 w-14 text-center text-[10px] md:text-xs font-bold uppercase sm:table-cell'>
													{m["social.B8.shareLabel"]()}
												</TableHead>

												<TableHead className='h-9 w-12 text-right text-[10px] md:text-xs font-bold uppercase sm:w-15'>
													<span className='sr-only sm:not-sr-only'>{m["social.B8.actionLabel"]()}</span>
												</TableHead>
											</TableRow>
										</TableHeader>

										<TableBody>
											{rows.length === 0 && (
												<TableRow className='hover:bg-transparent'>
													<TableCell colSpan={4} className='h-20 text-center text-sm text-muted-foreground'>
														{m["social.B8.noCountriesAdded"]()}
													</TableCell>
												</TableRow>
											)}

											{rows.map((item, i) => {
												const employeeCount = item.numberOfEmployees ?? 0

												const share = totalEmployees > 0 ? Math.round((employeeCount / totalEmployees) * 100) : 0

												return (
													<TableRow key={item.id} className='hover:bg-transparent'>
														<TableCell className='min-w-0 px-2 py-2 sm:px-3'>
															<div className='min-w-0 [&_button]:min-w-0 [&_button]:max-w-full [&_button]:px-2 [&_button>span]:truncate sm:[&_button]:px-3'>
																<form.AppField name={`employeesPerCountry[${i}].country`}>
																	{(f) => <f.CountryField label='' placeholder={m["social.B8.countryPlaceholder"]()} />}
																</form.AppField>
															</div>
														</TableCell>

														<TableCell className='min-w-0 px-2 py-2 sm:px-3'>
															<form.AppField name={`employeesPerCountry[${i}].numberOfEmployees`}>
																{(f) => <f.NumberField label='' placeholder='0' className='h-9 w-full' />}
															</form.AppField>
														</TableCell>

														<TableCell className='hidden text-center sm:table-cell'>
															<span className='inline-flex rounded-full bg-muted px-2 py-1 text-xs tabular-nums text-muted-foreground'>
																{share}%
															</span>
														</TableCell>

														<TableCell className='px-2 py-2 text-right'>
															<Button
																type='button'
																variant='delete'
																size='icon'
																className='size-8'
																aria-label={m["social.B8.removeCountry"]()}
																onClick={() => field.removeValue(i)}
																disabled={status === "submitted"}
															>
																<Trash2 className='size-4' />
															</Button>
														</TableCell>
													</TableRow>
												)
											})}
										</TableBody>
									</Table>

									{/* Footer */}
									<div className='flex flex-col gap-3 border-t border-border bg-background p-3 lg:flex-row lg:items-center lg:justify-between'>
										<div className='flex flex-wrap items-center gap-2'>
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() =>
													field.pushValue({
														id: crypto.randomUUID(),
														country: "",
														numberOfEmployees: 0,
													})
												}
												disabled={status === "submitted"}
											>
												<Plus className='mr-1 size-4' />
												{m["social.B8.addCountry"]()}
											</Button>

											{totalAllocated !== totalEmployees && generalFormData && status !== "submitted" && (
												<Button
													type='button'
													variant='secondary'
													size='sm'
													disabled={isUpdatingCompany}
													onClick={() => handleUpdateCompanyEmployees(totalAllocated)}
												>
													<Save className='mr-1 size-4' />
													{m["social.B8.updateB1"]()}
												</Button>
											)}
										</div>

										<div className='flex min-w-0 flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-3'>
											<span className='order-2 text-center text-muted-foreground sm:order-1 sm:text-left'>
												{m["social.B8.countryCountSummary"]({
													totalAllocated,
													totalEmployees,
												})}
											</span>

											<div
												className='order-1 h-1.5 w-full shrink-0 overflow-hidden rounded-full bg-muted sm:order-2 sm:w-32'
												role='progressbar'
												aria-label={m["social.B8.countryCountSummary"]({
													totalAllocated,
													totalEmployees,
												})}
												aria-valuemin={0}
												aria-valuemax={100}
												aria-valuenow={allocationProgress}
											>
												<div
													className='h-full rounded-full bg-emerald-600 transition-[width]'
													style={{ width: `${allocationProgress}%` }}
												/>
											</div>
										</div>
									</div>
								</div>
							)
						}}
					</form.AppField>

					<SectionHeading
						title={m["social.B8.employeeSectionTitle"]()}
						description={m["social.B8.employeeSectionDescription"]({
							totalEmployees,
						})}
						Icon={GlobeIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.typeOfContract}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<form.AppField name='permanentContractEmployees'>
							{(field) => (
								<field.NumberField
									label={m["social.B8.permanentContractLabel"]()}
									description={m["social.B8.permanentContractDescription"]()}
								/>
							)}
						</form.AppField>

						<form.AppField name='temporaryContractEmployees'>
							{(field) => (
								<field.NumberField
									label={m["social.B8.temporaryContractLabel"]()}
									description={m["social.B8.temporaryContractDescription"]()}
								/>
							)}
						</form.AppField>

						<NumberFieldReadOnly
							label={m["social.B8.totalEmployeesLabel"]()}
							value={employeeSum}
							description={m["social.B8.totalEmployeesDescription"]()}
							placeholder='0'
						/>
					</div>

					{/* Card 3 — Gender */}

					<SectionHeading
						title={m["social.B8.genderSectionTitle"]()}
						description={m["social.B8.genderSectionDescription"]({
							totalEmployees,
						})}
						Icon={GlobeIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.gender}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
						<form.AppField name='men'>
							{(field) => <field.NumberField label={m["social.B8.maleLabel"]()} />}
						</form.AppField>

						<form.AppField name='women'>
							{(field) => <field.NumberField label={m["social.B8.femaleLabel"]()} />}
						</form.AppField>

						<form.AppField name='other'>
							{(field) => <field.NumberField label={m["social.B8.otherLabel"]()} />}
						</form.AppField>

						<form.AppField name='notReported'>
							{(field) => <field.NumberField label={m["social.B8.notReportedLabel"]()} />}
						</form.AppField>

						<NumberFieldReadOnly
							label={m["social.B8.totalEmployeesLabel"]()}
							value={genderSum}
							description={m["social.B8.totalEmployeesDescription"]()}
							placeholder='0'
						/>
					</div>
					{/* Card 4 — Turnover Rate */}

					<SectionHeading
						title={m["social.B8.turnoverSectionTitle"]()}
						description={m["social.B8.turnoverSectionDescription"]({
							totalEmployees,
						})}
						Icon={GlobeIcon}
						isVolunteer={totalEmployees < 50}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.turnoverRate}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<form.AppField name='employeesLeft'>
							{(field) => (
								<field.NumberField
									label={m["social.B8.employeesLeftLabel"]()}
									description={m["social.B8.employeesLeftDescription"]()}
								/>
							)}
						</form.AppField>

						<form.AppField name='employeesAtStart'>
							{(field) => (
								<field.NumberField
									label={m["social.B8.employeesAtStartLabel"]()}
									description={m["social.B8.employeesAtStartDescription"]()}
								/>
							)}
						</form.AppField>

						<form.AppField name='employeesAtEnd'>
							{(field) => (
								<field.NumberField
									label={m["social.B8.employeesAtEndLabel"]()}
									description={m["social.B8.employeesAtEndDescription"]()}
								/>
							)}
						</form.AppField>

						<NumberFieldReadOnly
							label={m["social.B8.turnoverRateLabel"]()}
							unit='%'
							value={turnoverRatePercent ?? ""}
							description={m["social.B8.turnoverRateDescription"]()}
							placeholder='—'
						/>
					</div>

					{/* Eventuell utfyllende info */}
					<form.AppField name='anyAdditionalInfo'>
						{(field) => (
							<field.TextareaField
								label={m["social.B8.additionalInfoLabel"]()}
								placeholder={m["social.B8.additionalInfoPlaceholder"]()}
								description={m["social.B8.additionalInfoDescription"]()}
							/>
						)}
					</form.AppField>
				</fieldset>

				<FormButtons
					status={status as "not_started" | "draft" | "submitted"}
					isSaving={isSaving}
					onSaveDraft={saveDraft}
					onSubmit={submit}
					onReopen={reopen}
					disableSubmit={!canSubmit && status !== "submitted"}
					submitDisabledReasons={submitDisabledReasons}
				/>
			</form>
		</form.AppForm>
	)
}
