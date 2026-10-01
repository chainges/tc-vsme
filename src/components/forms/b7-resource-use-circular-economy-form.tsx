import { useStore } from "@tanstack/react-form"
import { useStore as useYearStore } from "@tanstack/react-store"
import { AlertTriangleIcon, LeafIcon, Plus, RecycleIcon, RefreshCwIcon, Trash2, TrashIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EWC from "@/data/EWC"
import { FormButtons } from "@/hooks/tanstack-form"
import { useFormSubmission } from "@/hooks/use-form-submission"
import {
	type B7ResourceUseCircularEconomyFormValues,
	b7ResourceUseCircularEconomySchema,
	RECYCLED_MATERIAL_UNITS,
	type WasteInformationEntry,
} from "@/lib/forms/schemas/b7-resource-use-circular-economy-schema"
import { yearStore } from "@/lib/year-store"
import { m } from "@/paraglide/messages"
import ConfidentialInfoBox from "../ConfidentialInfoBox"
import SectionHeading from "../SectionHeading"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const confidentialAreaValues={
	descriptionOfCircularEconomy:"vsme:B7DescriptionOfCircularEconomyPrinciplesMember",
    wasteGenerated:"vsme:B7WasteGeneratedMember",
	annualMassFlowOfRelevantMaterialsUsed:"vsme:B7AnnualMassFlowOfRelevantMaterialsUsedMember",
}

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

	if (isLoading) {
		return <div className='flex items-center justify-center p-8 text-muted-foreground'>Loading...</div>
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
					<form.AppField name='isB7Confidential'>
						{(field) => <ConfidentialInfoBox value={field.state.value} handleChange={field.handleChange} />}
					</form.AppField>

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
										{(field) => (
											<div className='space-y-4'>
												<div className='flex items-center justify-between'>
													<h3 className='text-base font-medium'>{m["environmental.B7.annualMassFlows"]()}</h3>
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
														<Plus className='h-4 w-4 mr-2' />
														{m["environmental.B7.addMaterialType"]()}
													</Button>
												</div>

												{field.state.value?.map((item, i) => (
													<Card key={item.id} className='relative'>
														<CardContent className='space-y-4'>
															<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
																<form.AppField name={`annualMassFlows[${i}].materialType`}>
																	{(f) => (
																		<f.TextField
																			label={m["environmental.B7.materialType"]()}
																			placeholder={m["environmental.B7.materialTypePlaceholder"]()}
																		/>
																	)}
																</form.AppField>
																<form.AppField name={`annualMassFlows[${i}].volume`}>
																	{(f) => <f.NumberField label={m["environmental.B7.annualMassFlows"]()} />}
																</form.AppField>
																<form.AppField name={`annualMassFlows[${i}].unit`}>
																	{(f) => (
																		<f.SelectField
																			label={m["environmental.B7.unit"]()}
																			options={RECYCLED_MATERIAL_UNITS.map((unit) => ({
																				label: unit,
																				value: unit,
																			}))}
																		/>
																	)}
																</form.AppField>
															</div>
															<div className='flex justify-end'>
																<Button
																	type='button'
																	variant='ghost'
																	size='sm'
																	className='text-destructive'
																	onClick={() => field.removeValue(i)}
																	disabled={status === "submitted"}
																>
																	<Trash2 className='h-4 w-4' />
																</Button>
															</div>
														</CardContent>
													</Card>
												))}
											</div>
										)}
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

			{/* Table */}

			{selectedCodes.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl font-semibold tracking-tight'>Waste Inventory</CardTitle>
						<CardDescription>
							Hazardous and non-hazardous waste streams with recycling and disposal totals.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableCaption>A list of registered waste streams and their current totals.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='w-30'>Code</TableHead>
									<TableHead>Waste Stream</TableHead>
									<TableHead className='w-27.5'>Hazardous</TableHead>
									<TableHead className='w-20'>Unit</TableHead>
									<TableHead className='text-right'>Recycled</TableHead>
									<TableHead className='text-right'>Disposal</TableHead>
									<TableHead className='text-right'>Total</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{selectedCodes.map((item) => (
									<TableRow key={item.id}>
										<TableCell className='font-mono text-sm font-medium text-muted-foreground'>{item.id}</TableCell>
										<TableCell className='font-medium'>{item.name}</TableCell>
										<TableCell>
											{item.hazardous ? (
												<Badge variant='destructive' className='gap-1'>
													<AlertTriangleIcon className='h-3 w-3' />
													Yes
												</Badge>
											) : (
												<Badge variant='secondary' className='gap-1'>
													<LeafIcon className='h-3 w-3' />
													No
												</Badge>
											)}
										</TableCell>
										<TableCell>
											<Select
												value={item.unit}
												onValueChange={(value) => updateCode(item.id, { unit: value as "tonn" | "kg" | "m³" })}
											>
												<SelectTrigger className='h-8 text-xs uppercase'>
													<SelectValue placeholder='Unit' />
												</SelectTrigger>
												<SelectContent>
													{unitOptions.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</TableCell>
										<TableCell className='text-right tabular-nums'>
											<Input
												type='number'
												min={0}
												step='any'
												className='w-full text-right tabular-nums'
												value={item.wasteDivertedToRecycle}
												onChange={(e) => updateCode(item.id, { wasteDivertedToRecycle: Number(e.target.value) })}
											/>
										</TableCell>
										<TableCell className='text-right tabular-nums'>
											<Input
												type='number'
												min={0}
												step='any'
												className='w-full text-right tabular-nums'
												value={item.wasteDirectedToDisposal}
												onChange={(e) => updateCode(item.id, { wasteDirectedToDisposal: Number(e.target.value) })}
											/>
										</TableCell>
										<TableCell className='text-right tabular-nums font-medium'>{item.total}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
