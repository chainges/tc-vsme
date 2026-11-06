import { useStore } from '@tanstack/react-form'
import { useStore as useYearStore } from '@tanstack/react-store'
import { LandPlotIcon, MapPinIcon } from 'lucide-react'
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
import ConfidentialInfoBox from '../ConfidentialInfoBox'
import SectionHeading from '../SectionHeading'

type B5BiodiversityFormProps = {
	properties: PropertyLocation[]
}

const B5_CONFIDENTIAL = "vsme:B5-BiodiversityMember"

const confidentialAreaValues = {
	sitesInBiodiversitySensitiveAreas: "vsme:B5SitesInBiodiversitySensitiveAreasMember",
	biodiversityLandUse: "vsme:B5BiodiversityLandUseMember",
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

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } = useFormSubmission<B5BiodiversityFormValues>({
		table: "formEnvironmental",
		reportingYear,
		section: "biodiversity",
		schema: b5BiodiversitySchema,
		defaultValues: {
			reportingYear: reportingYear.toString(),
			isB5Confidential: false,
			hasSensitiveBiodiversityAreas: false,
			sites: siteDefaults,
			totalSealedAreaSquareMeters: undefined,
			totalNatureOrientedAreaOnSiteSquareMeters: undefined,
			totalNatureOrientedAreaOffSiteSquareMeters: undefined,
			totalLandUsedSquareMeters: undefined,
			protectedSpeciesCount: "",
			redListedSpeciesCount: "",
			confidentialAreas:[],
		} as B5BiodiversityFormValues,
	})
	const sites = useStore(form.store, (state) => state.values.sites) ?? []

	const confidentialAreas = useStore(form.store, (state) => state.values.confidentialAreas ?? [])

	
	const isB5Confidential = confidentialAreas.includes(B5_CONFIDENTIAL)
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, B5_CONFIDENTIAL])]
			: confidentialAreas.filter((area) => area !== B5_CONFIDENTIAL)
		form.setFieldValue("confidentialAreas", nextAreas)
	}

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
				<fieldset disabled={status === "submitted"} className='space-y-6'>
					<form.AppField name='reportingYear'>
						{(field) => (
							<field.TextField label={m["environmental.B5.reportingYearLabel"]()} placeholder='YYYY' hidden />
						)}
					</form.AppField>
					<ConfidentialInfoBox value={isB5Confidential} handleChange={handleConfidentialChange} />

					<SectionHeading
						title={"Sites in Biodiversity-Sensitive Areas"}
						description={"Information about sites in biodiversity-sensitive areas."}
						Icon={MapPinIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.sitesInBiodiversitySensitiveAreas}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
					/>

					<form.AppField name='hasSensitiveBiodiversityAreas'>
						{(field) => <field.SwitchField label={m["environmental.B5.label"]()} />}
					</form.AppField>

					<form.Subscribe selector={(state) => state.values.hasSensitiveBiodiversityAreas}>
						{(hasSensitiveBiodiversityAreas) =>
							hasSensitiveBiodiversityAreas ? (
								<form.Subscribe selector={(state) => state.values.sites}>
									{(sites) => (
										<div className='space-y-6'>
											{sites?.map((site, index) => (
												<Card key={site.propertyId}>
													<CardContent className='space-y-6'>
														<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
															<form.AppField name={`sites[${index}].siteLocation`}>
																{(field) => <field.TextField label={m["environmental.B5.siteLocation"]()} />}
															</form.AppField>
															<form.AppField name={`sites[${index}].areaSquareMeters`}>
																{(field) => (
																	<field.NumberField label={m["environmental.B5.areaSquareMeters"]()} unit='m²' />
																)}
															</form.AppField>
														</div>
														<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
															<form.AppField name={`sites[${index}].isInSensitiveBiodiversityArea`}>
																{(field) => (
																	<field.SwitchField label={m["environmental.B5.isInSensitiveBiodiversityArea"]()} />
																)}
															</form.AppField>
															<form.AppField name={`sites[${index}].isNearSensitiveBiodiversityArea`}>
																{(field) => (
																	<field.SwitchField label={m["environmental.B5.isNearSensitiveBiodiversityArea"]()} />
																)}
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

					<SectionHeading
						title={"Biodiversity Land Use"}
						description={"Land use related to biodiversity."}
						Icon={LandPlotIcon}
						disabled={status === "submitted"}
						confidentialArea={confidentialAreaValues.biodiversityLandUse}
						confidentialAreas={confidentialAreas}
						onConfidentialChange={(areas) => form.setFieldValue("confidentialAreas", areas)}
						isVolunteer={true}
					/>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
						<form.AppField name='totalSealedAreaSquareMeters'>
							{(field) => <field.NumberField label={m["environmental.B5.totalSealedArea"]()} unit='m²' />}
						</form.AppField>
						<form.AppField name='totalNatureOrientedAreaOnSiteSquareMeters'>
							{(field) => <field.NumberField label={m["environmental.B5.totalNatureOrientedAreaOnSite"]()} unit='m²' />}
						</form.AppField>
						<form.AppField name='totalNatureOrientedAreaOffSiteSquareMeters'>
							{(field) => (
								<field.NumberField label={m["environmental.B5.totalNatureOrientedAreaOffSite"]()} unit='m²' />
							)}
						</form.AppField>
						<form.AppField name='totalLandUsedSquareMeters'>
							{(field) => <field.NumberField label={m["environmental.B5.totalLandUsed"]()} unit='m²' />}
						</form.AppField>
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
	)
}
