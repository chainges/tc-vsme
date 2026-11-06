import { useStore as useYearStore } from "@tanstack/react-store"
import { useQuery } from "convex/react"
import { FormButtons } from "@/hooks/tanstack-form"
import { useFormSubmission } from "@/hooks/use-form-submission"
import { useOrgGuard } from "@/hooks/use-org-guard"
import { type C1BusinessModelFormValues, c1BusinessModelSchema } from "@/lib/forms/schemas/c1-business-model-schema"
import { yearStore } from "@/lib/year-store"
import { m } from "@/paraglide/messages"
import { api } from "../../../convex/_generated/api"
import ConfidentialInfoBox from "../ConfidentialInfoBox"

const C1_CONFIDENTIAL_AREA = "vsme:C1-StrategyBusinessModelAndSustainabilityRelatedInitiativesMember"

export function C1BusinessModelForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	// Guard against race conditions during org switching
	const { organization, skipQuery } = useOrgGuard()
	const orgData = useQuery(api.organizations.getByClerkOrgId, skipQuery || { clerkOrgId: organization?.id ?? "" })

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } = useFormSubmission<C1BusinessModelFormValues>(
		{
			table: "formGeneral",
			reportingYear,
			section: "businessModel",
			schema: c1BusinessModelSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				productsAndServices: orgData?.productsAndServices || "",
				markets: orgData?.markets || "",
				businessRelationships: orgData?.businessRelationships || "",
				sustainabilityStrategy: orgData?.sustainabilityStrategy || "",
				confidentialAreas: [],
			} as C1BusinessModelFormValues,
		},
	)
	const confidentialAreas = useYearStore(form.store, (state) => state.values.confidentialAreas ?? [])
	const isC1Confidential = confidentialAreas.includes(C1_CONFIDENTIAL_AREA)
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, C1_CONFIDENTIAL_AREA])]
			: confidentialAreas.filter((area) => area !== C1_CONFIDENTIAL_AREA)
		form.setFieldValue("confidentialAreas", nextAreas)
	}

	if (isLoading || !orgData) {
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
					{/* Hidden reporting year field */}
					<form.AppField name='reportingYear'>
						{(field) => <field.TextField label={m["general.C1.reportingYear"]()} placeholder='YYYY' hidden />}
					</form.AppField>

					<ConfidentialInfoBox value={isC1Confidential} handleChange={handleConfidentialChange} />

					{/* Products and Services */}
					<form.AppField name='productsAndServices'>
						{(field) => (
							<field.TextareaField
								label={m["general.C1.productsAndServices"]()}
								placeholder={m["general.C1.productsAndServicesPlaceholder"]()}
								rows={4}
								description={m["general.C1.productsAndServicesDescription"]()}
							/>
						)}
					</form.AppField>

					{/* Markets */}
					<form.AppField name='markets'>
						{(field) => (
							<field.TextareaField
								label={m["general.C1.markets"]()}
								placeholder={m["general.C1.marketsPlaceholder"]()}
								rows={4}
								description={m["general.C1.marketsDescription"]()}
							/>
						)}
					</form.AppField>

					{/* Business Relationships */}
					<form.AppField name='businessRelationships'>
						{(field) => (
							<field.TextareaField
								label={m["general.C1.businessRelationships"]()}
								placeholder={m["general.C1.businessRelationshipsPlaceholder"]()}
								rows={4}
								description={m["general.C1.businessRelationshipsDescription"]()}
							/>
						)}
					</form.AppField>

					{/* Sustainability Strategy */}
					<form.AppField name='sustainabilityStrategy'>
						{(field) => (
							<field.TextareaField
								label={m["general.C1.sustainabilityStrategy"]()}
								placeholder={m["general.C1.sustainabilityStrategyPlaceholder"]()}
								rows={4}
								description={m["general.C1.sustainabilityStrategyDescription"]()}
							/>
						)}
					</form.AppField>
				</fieldset>

				<FormButtons status={status} isSaving={isSaving} onSaveDraft={saveDraft} onSubmit={submit} onReopen={reopen} />
			</form>
		</form.AppForm>
	)
}
