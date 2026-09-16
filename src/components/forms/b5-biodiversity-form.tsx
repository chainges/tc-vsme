import { useStore } from '@tanstack/react-form'
import { useStore as useYearStore } from '@tanstack/react-store'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import type { PropertyLocation } from '@/lib/forms/schemas/b1-general-schema'
import {
	type B5BiodiversityFormValues,
	b5BiodiversitySchema,
} from '@/lib/forms/schemas/b5-biodiversity-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

type B5BiodiversityFormProps = {
	properties: PropertyLocation[]
}

export function B5BiodiversityForm({ properties }: B5BiodiversityFormProps) {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const siteDefaults = properties.map((property) => ({
		propertyId: property.id,
		siteLocation: [property.country, property.city, property.streetAddress]
			.filter(Boolean)
			.join(' '),
		areaSquareMeters: undefined,
		isInSensitiveBiodiversityArea: false,
		isNearSensitiveBiodiversityArea: false,
	}))

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<B5BiodiversityFormValues>({
			table: 'formEnvironmental',
			reportingYear,
			section: 'biodiversity',
			schema: b5BiodiversitySchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				hasSensitiveBiodiversityAreas: false,
				sites: siteDefaults,
				totalSealedAreaSquareMeters: undefined,
				totalNatureOrientedAreaOnSiteSquareMeters: undefined,
				totalNatureOrientedAreaOffSiteSquareMeters: undefined,
				totalLandUsedSquareMeters: undefined,
				protectedSpeciesCount: '',
				redListedSpeciesCount: '',
			} as B5BiodiversityFormValues,
		})
	const sites = useStore(form.store, (state) => state.values.sites) ?? []

	useEffect(() => {
		const sitesByPropertyId = new Map(
			sites.map((site) => [site.propertyId, site]),
		)
		const synchronizedSites = siteDefaults.map((site) => ({
			...site,
			...sitesByPropertyId.get(site.propertyId),
		}))

		const alreadySynchronized =
			sites.length === synchronizedSites.length &&
			sites.every(
				(site, index) => site.propertyId === synchronizedSites[index]?.propertyId,
			)

		if (!alreadySynchronized) {
			form.setFieldValue('sites', synchronizedSites)
		}
	}, [form, siteDefaults, sites])

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
							<form.AppField name="hasSensitiveBiodiversityAreas">
								{(field) => (
									<field.SwitchField label={m["environmental.B5.label"]()} />
								)}
							</form.AppField>

							<form.Subscribe
								selector={(state) => state.values.hasSensitiveBiodiversityAreas}
							>
								{(hasSensitiveBiodiversityAreas) =>
									hasSensitiveBiodiversityAreas ? (
										<form.Subscribe selector={(state) => state.values.sites}>
											{(sites) => (
												<div className="space-y-6">
													{sites?.map((site, index) => (
														<Card key={site.propertyId}>
															<CardContent className="space-y-6">
																<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
																	<form.AppField name={`sites[${index}].siteLocation`}>
																		{(field) => <field.TextField label={m["environmental.B5.siteLocation"]()} />}
																	</form.AppField>
																	<form.AppField name={`sites[${index}].areaSquareMeters`}>
																		{(field) => <field.NumberField label={m["environmental.B5.areaSquareMeters"]()} unit="m²" />}
																	</form.AppField>
																</div>
																<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
																	<form.AppField name={`sites[${index}].isInSensitiveBiodiversityArea`}>
																		{(field) => <field.SwitchField label={m["environmental.B5.isInSensitiveBiodiversityArea"]()} />}
																	</form.AppField>
																	<form.AppField name={`sites[${index}].isNearSensitiveBiodiversityArea`}>
																		{(field) => <field.SwitchField label={m["environmental.B5.isNearSensitiveBiodiversityArea"]()} />}
																	</form.AppField>
																</div>
															</CardContent>
														</Card>
													))}
												</div>
											)}
										</form.Subscribe>
									) : null
								}
							</form.Subscribe>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="space-y-6">
							<h3 className="text-base font-medium">
								{m["environmental.B5.landInformation"]()}
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<form.AppField name="totalSealedAreaSquareMeters">
									{(field) => (
										<field.NumberField
											label={m["environmental.B5.totalSealedArea"]()}
											unit="m²"
										/>
									)}
								</form.AppField>
								<form.AppField name="totalNatureOrientedAreaOnSiteSquareMeters">
									{(field) => (
										<field.NumberField
											label={m["environmental.B5.totalNatureOrientedAreaOnSite"]()}
											unit="m²"
										/>
									)}
								</form.AppField>
								<form.AppField name="totalNatureOrientedAreaOffSiteSquareMeters">
									{(field) => (
										<field.NumberField
											label={m["environmental.B5.totalNatureOrientedAreaOffSite"]()}
											unit="m²"
										/>
									)}
								</form.AppField>
								<form.AppField name="totalLandUsedSquareMeters">
									{(field) => (
										<field.NumberField
											label={m["environmental.B5.totalLandUsed"]()}
											unit="m²"
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
