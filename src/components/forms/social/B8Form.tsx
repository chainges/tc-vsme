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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
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
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				{m["social.B8.loading"]()}
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
							const remaining = totalEmployees - totalAllocated

							return (
								<div className='space-y-3'>
									<div className='rounded-md border border-border'>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className='w-[50%]'>{m["social.B8.countryLabel"]()}</TableHead>
													<TableHead className='w-[35%]'>{m["social.B8.employeeCountLabel"]()}</TableHead>
													<TableHead className='w-[15%] text-right'>&nbsp;</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{rows.length === 0 && (
													<TableRow>
														<TableCell colSpan={3} className='h-16 text-center text-muted-foreground'>
															{m["social.B8.noCountriesAdded"]()}
														</TableCell>
													</TableRow>
												)}
												{rows.map((item, i) => (
													<TableRow key={item.id}>
														<TableCell>
															<form.AppField name={`employeesPerCountry[${i}].country`}>
																{(f) => <f.CountryField label='' placeholder={m["social.B8.countryPlaceholder"]()} />}
															</form.AppField>
														</TableCell>
														<TableCell>
															<form.AppField name={`employeesPerCountry[${i}].numberOfEmployees`}>
																{(f) => <f.NumberField label='' placeholder='0' />}
															</form.AppField>
														</TableCell>
														<TableCell className='text-center'>
															<Button
																type='button'
																variant='ghost'
																size='icon'
																className='h-8 w-8 text-destructive hover:bg-destructive/10'
																onClick={() => field.removeValue(i)}
																disabled={status === "submitted"}
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>

									{/* Summary row */}
									{rows.length > 0 && (
										<div className='flex items-center justify-between text-sm px-1'>
											<span className='text-muted-foreground'>
												{m["social.B8.countryCountSummary"]({
													totalAllocated,
													totalEmployees,
												})}
											</span>
											{remaining !== 0 && (
												<span className={remaining < 0 ? "text-destructive font-medium" : "text-amber-600 font-medium"}>
													{remaining > 0
														? m["social.B8.countryCountRemaining"]({ remaining })
														: m["social.B8.countryCountOver"]({ remaining: Math.abs(remaining) })}
												</span>
											)}
											{remaining === 0 && (
												<span className='text-emerald-600 font-medium'>{m["social.B8.allEmployeesAllocated"]()}</span>
											)}
										</div>
									)}
									<div className='flex items-center justify-between text-sm px-1'>
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
											<Plus className='h-4 w-4 mr-1' />
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
												<Save className='h-4 w-4 mr-1' />
												{m["social.B8.updateB1"]()}
											</Button>
										)}
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
