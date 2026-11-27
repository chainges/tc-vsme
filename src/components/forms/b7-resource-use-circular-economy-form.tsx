import { useStore } from "@tanstack/react-form"
import { useStore as useYearStore } from "@tanstack/react-store"
import { AlertTriangleIcon, LeafIcon, Plus, RecycleIcon, RefreshCwIcon, Trash2, TrashIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EWC from "@/data/EWC"
import { FormButtons } from "@/hooks/tanstack-form"
import { useFormSubmission } from "@/hooks/use-form-submission"
import { getMaterialTotals } from "@/lib/forms/b7-material-totals"
import {
	type B7ResourceUseCircularEconomyFormValues,
	b7ResourceUseCircularEconomySchema,
	RECYCLED_MATERIAL_UNITS,
	type WasteInformationEntry,
} from "@/lib/forms/schemas/b7-resource-use-circular-economy-schema"
import { yearStore } from "@/lib/year-store"
import { m } from "@/paraglide/messages"
import { getLocale } from "@/paraglide/runtime"
import ConfidentialInfoBox from "../ConfidentialInfoBox"
import SectionHeading from "../SectionHeading"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

const confidentialAreaValues={
	descriptionOfCircularEconomy:"vsme:B7DescriptionOfCircularEconomyPrinciplesMember",
    wasteGenerated:"vsme:B7WasteGeneratedMember",
	annualMassFlowOfRelevantMaterialsUsed:"vsme:B7AnnualMassFlowOfRelevantMaterialsUsedMember",
}

const B7_CONFIDENTIAL = "vsme:B7-ResourceUseCircularEconomyAndWasteManagementMember"

export function B7ResourceUseCircularEconomyForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B7ResourceUseCircularEconomyFormValues>({
			table: "formEnvironmental",
			reportingYear,
			section: "resourceUseCircularEconomy",
			schema: b7ResourceUseCircularEconomySchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				isB7Confidential: false,
				applyCircularEconomyPrinciples: false,
				circularEconomyDescription: "",
				significantMaterialFlows: false,
				annualMassFlows: [],
				totalWaste: 0,
				recyclingRate: 0,
				energyRecovery: 0,
				landfill: 0,
				hazardousWaste: 0,
				recycledMaterials: [],
				onlyHouseholdWaste: true,
				confidentialAreas: [],
				wasteInformation: [
					{
						id: "20 03 01",
						hazardous: false,
						name: "20 03 01 - Non-Hazardous - Mixed municipal waste",
						unit: "kg",
						wasteDivertedToRecycle: 0,
						wasteDirectedToDisposal: 0,
						total: 0,
					},
				],
			} as unknown as B7ResourceUseCircularEconomyFormValues,
		})
	
	const confidentialAreas = useStore(
			form.store,
			(state) => state.values.confidentialAreas ?? [],
	)
	const isB7Confidential = confidentialAreas.includes(B7_CONFIDENTIAL)
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, B7_CONFIDENTIAL])]
			: confidentialAreas.filter((area) => area !== B7_CONFIDENTIAL)
		form.setFieldValue("confidentialAreas", nextAreas)
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
					<form.AppField name='reportingYear'>
						{(field) => (
							<field.TextField label={m["environmental.B7.reportingYearLabel"]()} placeholder='YYYY' hidden />
						)}
					</form.AppField>
					<ConfidentialInfoBox value={isB7Confidential} handleChange={handleConfidentialChange} />

					<form.AppField name='applyCircularEconomyPrinciples'>
						{(field) => <field.SwitchField label={m["environmental.B7.applyCircularEconomyPrinciples"]()} />}
					</form.AppField>

					<form.Subscribe selector={(state) => state.values.applyCircularEconomyPrinciples}>
						{(apply) =>
							apply && (
								<>
									<SectionHeading
										title={m["environmental.B7.circularEconomy"]()}
										description={m["environmental.B7.circularEconomyDescription"]()}
										Icon={RecycleIcon}
										disabled={status === "submitted"}
										confidentialArea={confidentialAreaValues.descriptionOfCircularEconomy}
										confidentialAreas={confidentialAreas}
										onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
									/>

									<form.AppField name='circularEconomyDescription'>
										{(field) => (
											<field.TextareaField
												className='mb-0!'
												label={m["environmental.B7.circularEconomyDescription"]()}
											/>
										)}
									</form.AppField>
								</>
							)
						}
					</form.Subscribe>

					<hr />

					<form.AppField name='significantMaterialFlows'>
						{(field) => <field.SwitchField label={m["environmental.B7.significantMaterialFlows"]()} />}
					</form.AppField>

					<form.Subscribe selector={(state) => state.values.significantMaterialFlows}>
						{(significant) =>
							significant && (
								<>
									<SectionHeading
										title={m["environmental.B7.annualMassFlowOfRelevantMaterialsUsed"]()}
										description={m["environmental.B7.annualMassFlowOfRelevantMaterialsUsedDescription"]()}
										Icon={RefreshCwIcon}
										disabled={status === "submitted"}
										confidentialArea={confidentialAreaValues.annualMassFlowOfRelevantMaterialsUsed}
										confidentialAreas={confidentialAreas}
										onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
									/>

									<form.AppField name='annualMassFlows'>
										{(field) => {
											const entries = field.state.value ?? []
											const totals = getMaterialTotals(entries)
											const formatTotal = (value: number) => value.toLocaleString(getLocale(), { maximumFractionDigits: 8 })
											const hasVolume = entries.some((entry) => entry.unit === 'm³')

											return (
												<Card className='gap-3 border-0 dark:border dark:border-success/35 py-0 shadow-none md:gap-0 md:overflow-hidden md:rounded-md md:border'>
													{/* Mobile summary */}
													<div className='flex justify-center md:hidden'>
														<Badge
															variant='secondary'
															className='h-auto max-w-full flex-wrap justify-center gap-x-2 gap-y-1 whitespace-normal rounded-full px-3 py-1.5 font-normal text-muted-foreground'
														>
															<span>
																{m["environmental.B7.materialCount"]({
																	count: entries.length,
																})}
															</span>

															<span>
																{m["environmental.B7.totalMass"]()}:
																<strong className='ml-1 text-foreground'>{formatTotal(totals.tonnes)} t</strong>
															</span>

															{hasVolume && (
																<span>
																	{m["environmental.B7.totalVolume"]()}:
																	<strong className='ml-1 text-foreground'>{formatTotal(totals.cubicMetres)} m³</strong>
																</span>
															)}
														</Badge>
													</div>

													<CardContent className='p-0'>
														<Table className='block md:table dark:border-success/35'>
															{/* Desktop header */}
															<TableHeader className='hidden bg-gray-100 dark:bg-success/[0.04] dark:border-b dark:border-b-success/35 md:table-header-group'>
																<TableRow className='hover:bg-transparent'>
																	<TableHead className='w-[40%] px-4'>{m["environmental.B7.materialType"]()}</TableHead>

																	<TableHead className='w-[35%] px-4'>
																		{m["environmental.B7.annualMassFlows"]()}
																	</TableHead>

																	<TableHead className='w-[20%] px-4'>{m["environmental.B7.unit"]()}</TableHead>

																	<TableHead className='w-12' />
																</TableRow>
															</TableHeader>

															{/* Material entries */}
															<TableBody className='block space-y-3 dark:border-y dark:border-y-success/35 md:table-row-group md:space-y-0'>
																{entries.map((item, i) => (
																	<TableRow
																		key={item.id}
																		className='relative grid grid-cols-2 gap-3 rounded-md border p-3 hover:bg-transparent md:table-row md:rounded-none md:border-0 md:border-t md:p-0'
																	>
																		{/* Material type */}
																		<TableCell className='col-span-2 min-w-0 whitespace-normal p-0 pr-11 **:data-[slot=field-label]:sr-only md:w-[40%] md:px-4 md:py-3 md:pr-4'>
																			<form.AppField name={`annualMassFlows[${i}].materialType`}>
																				{(f) => (
																					<f.TextField
																						label={m["environmental.B7.materialType"]()}
																						placeholder={m["environmental.B7.materialTypePlaceholder"]()}
																					/>
																				)}
																			</form.AppField>
																		</TableCell>

																		{/* Mass flow */}
																		<TableCell className='min-w-0 whitespace-normal p-0 md:w-[35%] md:px-4 md:py-3 md:**:data-[slot=field-label]:sr-only'>
																			<form.AppField name={`annualMassFlows[${i}].volume`}>
																				{(f) => (
																					<f.NumberField
																						label={m["environmental.B7.massFlowShort"]()}
																						min={0}
																						step='any'
																					/>
																				)}
																			</form.AppField>
																		</TableCell>

																		{/* Unit */}
																		<TableCell className='min-w-0 whitespace-normal p-0 md:w-[20%] md:min-w-25 md:px-4 md:py-3 md:**:data-[slot=field-label]:sr-only'>
																			<form.AppField name={`annualMassFlows[${i}].unit`}>
																				{(f) => (
																					<f.SelectField
																						label={m["environmental.B7.unit"]()}
																						options={RECYCLED_MATERIAL_UNITS.map((unit) => ({
																							value: unit,
																							label:
																								unit === "tonn"
																									? m["environmental.B7.tonnes"]()
																									: unit === "kg"
																										? m["environmental.B7.kilograms"]()
																										: unit,
																						}))}
																					/>
																				)}
																			</form.AppField>
																		</TableCell>

																		{/* Remove material */}
																		<TableCell className='absolute right-3 top-3 p-0 md:static md:w-12 md:px-2 md:py-3'>
																			<Button
																				type='button'
																				variant='delete'
																				size='icon'
																				className='size-9'
																				aria-label={m["environmental.B7.removeMaterial"]()}
																				onClick={() => field.removeValue(i)}
																				disabled={status === "submitted"}
																			>
																				<Trash2 className='size-4' />
																			</Button>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>

															{/* Desktop footer */}
															<TableFooter className='hidden bg-gray-100 dark:bg-success/[0.04] md:table-footer-group'>
																<TableRow className='hover:bg-transparent'>
																	<TableCell colSpan={4} className='p-4'>
																		<div className='flex flex-wrap items-center justify-between gap-3'>
																			<Button
																				type='button'
																				variant='outline'
																				size='sm'
																				onClick={() =>
																					field.pushValue({
																						id: crypto.randomUUID(),
																						materialType: "",
																						volume: 0,
																						unit: "tonn",
																					})
																				}
																				disabled={status === "submitted"}
																			>
																				<Plus className='size-4' />
																				{m["environmental.B7.addMaterialType"]()}
																			</Button>

																			<div className='flex flex-wrap gap-x-4 gap-y-1 text-sm font-normal text-muted-foreground'>
																				<span>
																					{m["environmental.B7.totalMass"]()}:
																					<strong className='ml-1 text-foreground'>
																						{formatTotal(totals.tonnes)} t
																					</strong>
																				</span>

																				{hasVolume && (
																					<span>
																						{m["environmental.B7.totalVolume"]()}:
																						<strong className='ml-1 text-foreground'>
																							{formatTotal(totals.cubicMetres)} m³
																						</strong>
																					</span>
																				)}
																			</div>
																		</div>
																	</TableCell>
																</TableRow>
															</TableFooter>
														</Table>

														{/* Mobile add material button */}
														<Button
															type='button'
															variant='outline'
															size='sm'
															className='mt-3 w-full border-dashed md:hidden'
															onClick={() =>
																field.pushValue({
																	id: crypto.randomUUID(),
																	materialType: "",
																	volume: 0,
																	unit: "tonn",
																})
															}
															disabled={status === "submitted"}
														>
															<Plus className='size-4' />
															{m["environmental.B7.addMaterialType"]()}
														</Button>
													</CardContent>
												</Card>
											)
										}}
									</form.AppField>
								</>
							)
						}
					</form.Subscribe>

					<hr/>

					<SectionHeading
						title={"Waste Generated"}
						description={"Information about the waste generated by the organization, including types and quantities."}
						Icon={TrashIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.wasteGenerated}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>

					<form.AppField name='onlyHouseholdWaste'>
						{(field) => <field.SwitchField label='Do you only generate household waste?' />}
					</form.AppField>

					<form.Subscribe selector={(state) => state.values.onlyHouseholdWaste}>
						{(onlyHouseholdWaste) =>
							onlyHouseholdWaste ? (
								<p className='text-sm text-muted-foreground'>
									Household waste is recorded as 20 03 01 - Non-Hazardous - Mixed municipal waste.
								</p>
							) : (
								<form.AppField name='wasteInformation'>{(field) => <WasteCodeSelector field={field} />}</form.AppField>
							)
						}
					</form.Subscribe>
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

type WasteInformationField = {
	state: { value: WasteInformationEntry[] }
	handleChange: (value: WasteInformationEntry[]) => void
}

const unitOptions = [
	{ value: "kg", label: "Kg" },
	{ value: "tonn", label: "Tons" },
	{ value: "m³", label: "m³" },
]

function WasteCodeSelector({ field }: { field: WasteInformationField }) {
	const [chapterId, setChapterId] = useState("")
	const [subcategoryLabel, setSubcategoryLabel] = useState("")
	const chapter = EWC.find((item) => item.id.toString() === chapterId)
	const subcategories = chapter?.subcategories ?? []
	const subcategory = subcategories.find((item) => item.label === subcategoryLabel)
	const codes = subcategory?.codes ?? []
	const selectedCodes = field.state.value ?? []

	const toggleCode = (codeId: string, checked: boolean) => {
		const code = codes.find((item) => item.code === codeId)
		if (!code) return

		if (!checked) {
			field.handleChange(selectedCodes.filter((item: WasteInformationEntry) => item.id !== codeId))
			return
		}

		if (selectedCodes.some((item: WasteInformationEntry) => item.id === codeId)) {
			return
		}

		field.handleChange([
			...selectedCodes,
			{
				id: code.code,
				hazardous: code.type === "Hazardous",
				name: `${code.description}`,
				unit: "kg",
				//axis: code.axis,
				wasteDivertedToRecycle: 0,
				wasteDirectedToDisposal: 0,
				total: 0,
			},
		])
	}

	const updateCode = (id:string, changes: Partial<WasteInformationEntry>) => {
		field.handleChange(
			selectedCodes.map((item: WasteInformationEntry) =>
				item.id === id
					? {
							...item,
							...changes,
							total:
								(changes.wasteDivertedToRecycle ?? item.wasteDivertedToRecycle) +
								(changes.wasteDirectedToDisposal ?? item.wasteDirectedToDisposal),
						}
					: item,
			),
		)
	}

	return (
		<div className='w-full space-y-6'>
			<div className='w-full space-y-2'>
				<label className='text-sm font-medium' htmlFor='waste-chapter'>
					Select chapter
				</label>
				<div className='mt-2'>
					<Select
						value={chapterId}
						onValueChange={(value) => {
							setChapterId(value)
							setSubcategoryLabel("")
						}}
					>
						<SelectTrigger className='w-full min-w-0' id='waste-chapter'>
							<SelectValue placeholder='Select chapter' />
						</SelectTrigger>
						<SelectContent position='popper' className='w-(--radix-select-trigger-width) max-h-72'>
							{EWC.map((item) => (
								<SelectItem key={item.id} value={item.id.toString()} className='whitespace-normal'>
									{item.id} - {item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='w-full space-y-2'>
				<label className='text-sm font-medium' htmlFor='waste-subcategory'>
					Select subcategory
				</label>
				<div className='mt-2'>
					<Select
						value={subcategoryLabel}
						onValueChange={(value) => {
							setSubcategoryLabel(value)
						}}
						disabled={!chapter}
						// className="w-full border-2 border-red-700"
					>
						<SelectTrigger className='w-full min-w-0' id='waste-subcategory'>
							<SelectValue placeholder='Select subcategory' />
						</SelectTrigger>
						<SelectContent position='popper' className='w-(--radix-select-trigger-width) max-h-72'>
							{subcategories.map((item) => (
								<SelectItem key={item.label} value={item.label}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='w-full space-y-2'>
				<h3 className='text-sm font-medium'>Select codes</h3>
				<div className='min-h-48 w-full overflow-y-auto rounded-md border p-2'>
					<div className='space-y-1'>
						{!subcategory && (
							<div className='min-h-48 flex justify-center items-center'>
								<p className='text-sm text-muted-foreground'>Please select a subcategory first.</p>
							</div>
						)}
						{codes.map((item) => {
							const isSelected = selectedCodes.some((entry: WasteInformationEntry) => entry.id === item.code)
							return (
								<label
									key={item.code}
									className='flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 hover:bg-muted'
								>
									<input
										type='checkbox'
										className='mt-1 h-4 w-4'
										checked={isSelected}
										onChange={(event) => toggleCode(item.code, event.target.checked)}
									/>
									<span className='text-sm'>
										{item.code} - {item.type} - {item.description}
									</span>
								</label>
							)
						})}
					</div>
				</div>
			</div>

			<div>
				<h2 className='text-xl md:text-md font-semibold tracking-tight text-primary'>Waste Inventory</h2>
				<p>Hazardous and non-hazardous waste streams with recycling and disposal totals.</p>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				{selectedCodes.map((item) => {
					const recycledRate = item.total > 0
						? Math.min(100, (item.wasteDivertedToRecycle / item.total) * 100)
						: 0
					const rateColor = recycledRate >= 50
						? 'text-emerald-700 dark:text-emerald-400'
						: 'text-amber-700 dark:text-amber-400'
					const progressColor = recycledRate >= 50 ? 'bg-emerald-600' : 'bg-amber-500'
					const progressTrackColor = recycledRate >= 50 ? 'bg-emerald-100' : 'bg-amber-100'
					const unitSymbol = item.unit === 'tonn' ? 't' : item.unit
					const inputId = item.id.replaceAll(' ', '-')

					return (
						<Card key={item.id} className='gap-0 py-0'>
							<CardContent className='space-y-4 p-4'>
								<div className='flex items-start justify-between gap-3'>
									<div className='flex min-w-0 flex-wrap items-center gap-2'>
										<p className='font-mono text-xs font-medium text-muted-foreground'>
											EWC {item.id}
										</p>
										{item.hazardous ? (
											<Badge variant='destructive' className='gap-1'>
												<AlertTriangleIcon className='h-3 w-3' />
												Hazardous
											</Badge>
										) : (
											<Badge variant='secondary' className='gap-1'>
												<LeafIcon className='h-3 w-3' />
												Non-Hazardous
											</Badge>
										)}
									</div>
									<Button
										type='button'
										variant='delete'
										size='icon'
										className='-mt-1 -mr-2 h-8 w-8'
										aria-label={`Remove ${item.name}`}
										onClick={() =>
											field.handleChange(
												selectedCodes.filter((selected) => selected.id !== item.id),
											)
										}
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>

								<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
									<h3 className='min-w-0 font-semibold'>{item.name}</h3>
									<div className='flex items-center justify-between gap-3 sm:justify-end'>
										<span className='text-sm text-muted-foreground sm:hidden'>Unit:</span>
										<Select
										value={item.unit}
										onValueChange={(value) =>
											updateCode(item.id, { unit: value as 'tonn' | 'kg' | 'm³' })
										}
									>
										<SelectTrigger className='h-9 w-full sm:w-fit'>
											<SelectValue placeholder='Unit' />
										</SelectTrigger>
										<SelectContent>
											{unitOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.value === 'tonn' ? 'Tonnes (t)' : option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-3'>
									<label htmlFor={`${inputId}-recycled`} className='min-w-0 space-y-1.5 text-sm text-muted-foreground'>
										<span className='block'>Recycled</span>
										<span className='relative block'>
											<Input
												id={`${inputId}-recycled`}
												type='number'
												min={0}
												step='any'
												className='pr-8 tabular-nums'
												value={item.wasteDivertedToRecycle}
												onChange={(event) =>
													updateCode(item.id, {
														wasteDivertedToRecycle: Number(event.target.value),
													})
												}
											/>
											<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs'>
												{unitSymbol}
											</span>
										</span>
									</label>
									<label htmlFor={`${inputId}-disposal`} className='min-w-0 space-y-1.5 text-sm text-muted-foreground'>
										<span className='block'>Disposal</span>
										<span className='relative block'>
											<Input
												id={`${inputId}-disposal`}
												type='number'
												min={0}
												step='any'
												className='pr-8 tabular-nums'
												value={item.wasteDirectedToDisposal}
												onChange={(event) =>
													updateCode(item.id, {
														wasteDirectedToDisposal: Number(event.target.value),
													})
												}
											/>
											<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs'>
												{unitSymbol}
											</span>
										</span>
									</label>
								</div>

								<div className='border-t pt-3'>
									<div className='flex items-center justify-between gap-3 md:grid md:grid-cols-[auto_1fr_auto]'>
										<p className='text-sm text-muted-foreground'>
											Total{' '}
											<strong className='font-semibold text-foreground'>
												{item.total.toLocaleString('en-US', {
													minimumFractionDigits: 1,
													maximumFractionDigits: 1,
												})}{' '}
												{unitSymbol}
											</strong>
										</p>
										<div
											className={`hidden h-1.5 overflow-hidden rounded-full md:block ${progressTrackColor}`}
											role='img'
											aria-label={`${recycledRate.toFixed(1)}% recycled`}
										>
											<div
												className={`h-full rounded-full ${progressColor}`}
												style={{ width: `${recycledRate}%` }}
											/>
										</div>
										<p className={`shrink-0 text-sm font-semibold ${rateColor}`}>
											{recycledRate.toFixed(1)}% Recycled
										</p>
									</div>
									<div
										className={`mt-2 h-1.5 overflow-hidden rounded-full md:hidden ${progressTrackColor}`}
										role='img'
										aria-label={`${recycledRate.toFixed(1)}% recycled`}
									>
										<div
											className={`h-full rounded-full ${progressColor}`}
											style={{ width: `${recycledRate}%` }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
