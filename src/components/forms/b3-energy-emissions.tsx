import { useStore as useYearStore } from '@tanstack/react-store'
import { useAction } from 'convex/react'
import { History, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { useOrgGuard } from '@/hooks/use-org-guard'
import {
	type B3EnergyEmissionsFormValues,
	b3EnergyEmissionsSchema,
} from '@/lib/forms/schemas/b3-energy-emissions-schema'
import { SCOPE_3_CATEGORIES } from '@/lib/forms/schemas/c2-scope3-emissions-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'
import { api } from '../../../convex/_generated/api'
import type { FieldChange, FormVersion } from '../../../convex/forms/_utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'

type MongoEmissionsData = {
	renewable?: number
	'non-renewable'?: number
	co2Intensity?: number
	stationaryCombustion?: number
	mobileCombustion?: number
	otherEnergy?: number
	selfGeneratedEnergy?: number
	totalEnergy?: number
	Scope1?: number
	locationBased?: number
	marketBased?: number
	Scope3?: number
	scope3Categories?: {
		cat1?: number
		cat2?: number
		cat3?: number
		cat4?: number
		cat5?: number
		cat6?: number
		cat7?: number
		cat8?: number
		cat9?: number
		cat10?: number
		cat11?: number
		cat12?: number
		cat13?: number
		cat14?: number
		cat15?: number
		[key: string]: unknown
	}
	[key: string]: unknown
}

export function B3EnergyEmissionsForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const { organization } = useOrgGuard()
	const getEmissions = useAction(api.emissions.getEmissionsByOrgId)
	const [mongoDefaults, setMongoDefaults] = useState<
		Partial<B3EnergyEmissionsFormValues>
	>({})
	const [isFetchingMongo, setIsFetchingMongo] = useState(true)
	const [mongoFetched, setMongoFetched] = useState(false)

	// Fetch emissions data from MongoDB on mount
	useEffect(() => {
		const fetchMongoData = async () => {
			if (!organization?.id) {
				setIsFetchingMongo(false)
				setMongoFetched(true)
				return
			}

			setIsFetchingMongo(true)
			try {
				const result = await getEmissions({
					orgIdToUse: organization.id,
					year: reportingYear,
				})

				if (result.success && result.data) {
					// Map MongoDB fields to form fields
					const emissionsData = result.data as MongoEmissionsData
					const scope3Categories = emissionsData.scope3Categories || {}
					setMongoDefaults({
						renewableElectricity: emissionsData.renewable || 0,
						nonRenewableElectricity: emissionsData['non-renewable'] || 0,
						emissionsIntensity: emissionsData.co2Intensity || 0,
						stationaryCombustion: emissionsData.stationaryCombustion || 0,
						mobileCombustion: emissionsData.mobileCombustion || 0,
						otherEnergySources: emissionsData.otherEnergy || 0,
						selfGeneratedEnergy: emissionsData.selfGeneratedEnergy || 0,
						totalEnergyConsumption: emissionsData.totalEnergy || 0,
						scope1Emissions: emissionsData.Scope1 || 0,
						scope2EmissionsLocationBased: emissionsData.locationBased || 0,
						scope2EmissionsMarketBased: emissionsData.marketBased || 0,
						totalScope3Emissions: emissionsData.Scope3 || 0,
						category1: scope3Categories.cat1 || 0,
						category2: scope3Categories.cat2 || 0,
						category3: scope3Categories.cat3 || 0,
						category4: scope3Categories.cat4 || 0,
						category5: scope3Categories.cat5 || 0,
						category6: scope3Categories.cat6 || 0,
						category7: scope3Categories.cat7 || 0,
						category8: scope3Categories.cat8 || 0,
						category9: scope3Categories.cat9 || 0,
						category10: scope3Categories.cat10 || 0,
						category11: scope3Categories.cat11 || 0,
						category12: scope3Categories.cat12 || 0,
						category13: scope3Categories.cat13 || 0,
						category14: scope3Categories.cat14 || 0,
						category15: scope3Categories.cat15 || 0,
					})
				}
			} catch (error) {
				console.error('Failed to fetch MongoDB emissions data:', error)
			} finally {
				setIsFetchingMongo(false)
				setMongoFetched(true)
			}
		}

		fetchMongoData()
	}, [organization?.id, reportingYear, getEmissions])

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
	} = useFormSubmission<B3EnergyEmissionsFormValues>({
		table: 'formEnvironmental',
		reportingYear,
		section: 'energyEmissions',
		schema: b3EnergyEmissionsSchema,
		defaultValues: {
			reportingYear: reportingYear.toString(),
			renewableElectricity: mongoDefaults.renewableElectricity || 0,
			nonRenewableElectricity: mongoDefaults.nonRenewableElectricity || 0,
			stationaryCombustion: mongoDefaults.stationaryCombustion || 0,
			mobileCombustion: mongoDefaults.mobileCombustion || 0,
			renewableFuels: 0,
			otherEnergySources: mongoDefaults.otherEnergySources || 0,
			selfGeneratedEnergy: mongoDefaults.selfGeneratedEnergy || 0,
			totalEnergyConsumption: mongoDefaults.totalEnergyConsumption || 0,
			emissionsIntensity: mongoDefaults.emissionsIntensity || 0,
			scope1Emissions: mongoDefaults.scope1Emissions || 0,
			scope2EmissionsLocationBased:
				mongoDefaults.scope2EmissionsLocationBased || 0,
			scope2EmissionsMarketBased: mongoDefaults.scope2EmissionsMarketBased || 0,
			totalScope3Emissions: mongoDefaults.totalScope3Emissions || 0,
			category1: mongoDefaults.category1 || 0,
			category2: mongoDefaults.category2 || 0,
			category3: mongoDefaults.category3 || 0,
			category4: mongoDefaults.category4 || 0,
			category5: mongoDefaults.category5 || 0,
			category6: mongoDefaults.category6 || 0,
			category7: mongoDefaults.category7 || 0,
			category8: mongoDefaults.category8 || 0,
			category9: mongoDefaults.category9 || 0,
			category10: mongoDefaults.category10 || 0,
			category11: mongoDefaults.category11 || 0,
			category12: mongoDefaults.category12 || 0,
			category13: mongoDefaults.category13 || 0,
			category14: mongoDefaults.category14 || 0,
			category15: mongoDefaults.category15 || 0,
			climateDataCollectionMethod: '',
			dataUncertainty: '',
		} as B3EnergyEmissionsFormValues,
	})

	// Update form values when MongoDB defaults are fetched and there's no existing data
	useEffect(() => {
		if (mongoFetched && !existingData?.data && !existingData?.draftData) {
			// Only set defaults if form hasn't been saved yet
			if (mongoDefaults.renewableElectricity !== undefined)
				form.setFieldValue(
					'renewableElectricity',
					mongoDefaults.renewableElectricity,
				)
			if (mongoDefaults.nonRenewableElectricity !== undefined)
				form.setFieldValue(
					'nonRenewableElectricity',
					mongoDefaults.nonRenewableElectricity,
				)
			if (mongoDefaults.emissionsIntensity !== undefined)
				form.setFieldValue(
					'emissionsIntensity',
					mongoDefaults.emissionsIntensity,
				)
			if (mongoDefaults.stationaryCombustion !== undefined)
				form.setFieldValue(
					'stationaryCombustion',
					mongoDefaults.stationaryCombustion,
				)
			if (mongoDefaults.mobileCombustion !== undefined)
				form.setFieldValue('mobileCombustion', mongoDefaults.mobileCombustion)
			if (mongoDefaults.otherEnergySources !== undefined)
				form.setFieldValue(
					'otherEnergySources',
					mongoDefaults.otherEnergySources,
				)
			if (mongoDefaults.selfGeneratedEnergy !== undefined)
				form.setFieldValue(
					'selfGeneratedEnergy',
					mongoDefaults.selfGeneratedEnergy,
				)
			if (mongoDefaults.totalEnergyConsumption !== undefined)
				form.setFieldValue(
					'totalEnergyConsumption',
					mongoDefaults.totalEnergyConsumption,
				)
			if (mongoDefaults.scope1Emissions !== undefined)
				form.setFieldValue('scope1Emissions', mongoDefaults.scope1Emissions)
			if (mongoDefaults.scope2EmissionsLocationBased !== undefined)
				form.setFieldValue(
					'scope2EmissionsLocationBased',
					mongoDefaults.scope2EmissionsLocationBased,
				)
			if (mongoDefaults.scope2EmissionsMarketBased !== undefined)
				form.setFieldValue(
					'scope2EmissionsMarketBased',
					mongoDefaults.scope2EmissionsMarketBased,
				)
			if (mongoDefaults.totalScope3Emissions !== undefined)
				form.setFieldValue('totalScope3Emissions', mongoDefaults.totalScope3Emissions)
			for (const category of SCOPE_3_CATEGORIES) {
				const fieldName = `category${category.number}` as const
				const value = mongoDefaults[fieldName]
				if (value !== undefined) {
					form.setFieldValue(fieldName, value)
				}
			}
		}
	}, [mongoFetched, mongoDefaults, existingData, form])

	// Handle missing fields for legacy submissions
	useEffect(() => {
		if (existingData?.data || existingData?.draftData) {
			const data = existingData.draftData || existingData.data
			if (data) {
				const typedData = data as Record<string, unknown>
				if (typedData.selfGeneratedEnergy === undefined) {
					form.setFieldValue(
						'selfGeneratedEnergy',
						mongoDefaults.selfGeneratedEnergy ?? 0,
					)
				}
				if (typedData.totalEnergyConsumption === undefined) {
					form.setFieldValue(
						'totalEnergyConsumption',
						mongoDefaults.totalEnergyConsumption ?? 0,
					)
				}
				if (typedData.totalScope3Emissions === undefined) {
					form.setFieldValue(
						'totalScope3Emissions',
						mongoDefaults.totalScope3Emissions ?? 0,
					)
				}
				for (const category of SCOPE_3_CATEGORIES) {
					const fieldName = `category${category.number}` as const
					if (typedData[fieldName] === undefined) {
						form.setFieldValue(fieldName, mongoDefaults[fieldName] ?? 0)
					}
				}
			}
		}
	}, [existingData, mongoDefaults, form])

	if (isLoading || isFetchingMongo) {
		return (
			<div className="p-8 text-center text-muted-foreground">
				{m["environmental.B3.loadingFormData"]()}
			</div>
		)
	}

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
					<fieldset disabled={status === 'submitted'} className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>{m["environmental.B3.energyConsumptionTitle"]()}</CardTitle>
								<CardDescription>
									{m["environmental.B3.energyConsumptionDescription"]()}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<form.AppField name="reportingYear">
									{(field) => (
										<field.TextField
											label={m["environmental.B3.reportingYearLabel"]()}
											placeholder="YYYY"
											hidden
										/>
									)}
								</form.AppField>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<form.AppField name="renewableElectricity">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.renewableElectricityLabel"]()}
												unit="kWh"
												description={m["environmental.B3.renewableElectricityDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="nonRenewableElectricity">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.nonRenewableElectricityLabel"]()}
												unit="kWh"
												description={m["environmental.B3.nonRenewableElectricityDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="stationaryCombustion">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.stationaryCombustionLabel"]()}
												unit="kWh"
												description={m["environmental.B3.stationaryCombustionDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="mobileCombustion">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.mobileCombustionLabel"]()}
												unit="kWh"
												description={m["environmental.B3.mobileCombustionDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="renewableFuels">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.renewableFuelsLabel"]()}
												unit="kWh"
												description={m["environmental.B3.renewableFuelsDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="otherEnergySources">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.otherEnergySourcesLabel"]()}
												unit="kWh"
												description={m["environmental.B3.otherEnergySourcesDescription"]()}
											/>
										)}
									</form.AppField>
									<form.AppField name="selfGeneratedEnergy">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.selfGeneratedElectricityLabel"]()}
												unit="kWh"
												description={m["environmental.B3.selfGeneratedElectricityDescription"]()}
											/>
										)}
									</form.AppField>
									<form.AppField name="totalEnergyConsumption">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.totalEnergyConsumptionLabel"]()}
												unit="kWh"
												description={m["environmental.B3.totalEnergyConsumptionDescription"]()}
											/>
										)}
									</form.AppField>
								</div>

								<Alert variant="info" className="mb-6 border-l-4">
									<Info />
									<AlertTitle>{m["environmental.B3.energyCalculationsTitle"]()}</AlertTitle>
									<AlertDescription className="text-sm text-white!">
										{m["environmental.B3.energyCalculationsDescription"]()} {" "}
										<a
											className="underline"
											rel="noopener noreferrer"
											target="_blank"
											href="https://www.efrag.org/en/vsme-supporting-guide-on-disclosure-c2-comprehensive-module-practices-policies-and-future"
										>
											{m["environmental.B3.energyCalculationsLinkText"]()}
										</a>
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<form.AppField name="emissionsIntensity">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.emissionsIntensityLabel"]()}
												unit="kgCO₂e/tNOK"
												step="0.01"
												description={m["environmental.B3.emissionsIntensityDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="scope1Emissions">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.scope1EmissionsLabel"]()}
												unit="tCO₂e"
												step="0.001"
												description={m["environmental.B3.scope1EmissionsDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="scope2EmissionsLocationBased">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.scope2EmissionsLocationBasedLabel"]()}
												unit="tCO₂e"
												step="0.001"
												description={m["environmental.B3.scope2EmissionsLocationBasedDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="scope2EmissionsMarketBased">
										{(field) => (
											<field.NumberField
												label={m["environmental.B3.scope2EmissionsMarketBasedLabel"]()}
												unit="tCO₂e"
												step="0.001"
												description={m["environmental.B3.scope2EmissionsMarketBasedDescription"]()}
											/>
										)}
									</form.AppField>
								</div>

								<div className="grid grid-cols-1 gap-6">
<div className="space-y-6">
											<div>
												<h3 className="text-lg font-medium">Scope 3 categories breakdown</h3>
											</div>

											<form.AppField name="totalScope3Emissions">
												{(field) => (
													<field.NumberField
														label="Total Scope 3 emissions"
														unit="tCO₂e"
														description="Total indirect emissions in the value chain."
													/>
												)}
											</form.AppField>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{SCOPE_3_CATEGORIES.map((category) => (
													<form.AppField key={category.number} name={`category${category.number}`}>
														{(field) => (
															<field.NumberField
																label={`${category.name} (Cat. ${category.number})`}
																unit="tCO₂e"
																description={`Emissions from ${category.name.toLowerCase()}`}
															/>
														)}
													</form.AppField>
												))}
											</div>
										</div>

										<form.AppField name="climateDataCollectionMethod">
										{(field) => (
											<field.TextareaField
												label={m["environmental.B3.climateDataCollectionMethodLabel"]()}
												placeholder={m["environmental.B3.climateDataCollectionMethodPlaceholder"]()}
												description={m["environmental.B3.climateDataCollectionMethodDescription"]()}
											/>
										)}
									</form.AppField>

									<form.AppField name="dataUncertainty">
										{(field) => (
											<field.TextareaField
												label={m["environmental.B3.dataUncertaintyLabel"]()}
												placeholder={m["environmental.B3.dataUncertaintyPlaceholder"]()}
												description={m["environmental.B3.dataUncertaintyDescription"]()}
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

			{/* Version History Panel */}
			{existingData?.versions && existingData.versions.length > 0 && (
				<div className="mt-8 pt-8 border-t border-border">
					<Accordion type="single" collapsible>
						<AccordionItem value="history" className="border-none">
							<AccordionTrigger className="hover:no-underline py-0">
								<h3 className="text-lg font-medium flex items-center gap-2">
									<History className="h-5 w-5" />
									{m["environmental.B3.versionHistoryTitle"]()}
								</h3>
							</AccordionTrigger>
							<AccordionContent className="pt-4">
								<div className="space-y-4">
									{[...existingData.versions]
										.reverse()
										.map((version: FormVersion) => (
											<div
												key={version.version}
												className="bg-muted/30 p-4 rounded-md text-sm"
											>
												<div className="flex justify-between items-start mb-2">
													<div className="font-medium">
														{m["environmental.B3.versionLabel"]({ version: version.version })}
													</div>
													<div className="flex gap-3 items-center ml-auto">
														<div className="text-muted-foreground text-xs font-mono">
															{new Date(version.changedAt).toLocaleString()}
														</div>
														<Button
															variant="secondary"
															size="sm"
															className="h-7 px-3 text-xs font-semibold"
															onClick={() => rollback(version.version)}
															disabled={isSaving || status === 'submitted'}
														>
															{m["environmental.B3.rollbackButton"]()}
														</Button>
													</div>
												</div>
												<div className="text-muted-foreground">
													{version.changes.length > 0 ? (
														<ul className="list-disc list-inside">
															{version.changes.map(
																(change: FieldChange, i: number) => (
																	<li key={`${change.field}-${i}`}>
																		{change.field === '_rollback'
																			? m["environmental.B3.rolledBackToVersion"]({ version: String(change.newValue) })
																			: m["environmental.B3.changedField"]({ field: change.field })}
																	</li>
																),
															)}
														</ul>
													) : (
														<span className="italic">{m["environmental.B3.noChangesRecorded"]()}</span>
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
