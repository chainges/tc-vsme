import { useStore as useYearStore } from '@tanstack/react-store'
import { useQuery } from 'convex/react'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { useOrgGuard } from '@/hooks/use-org-guard'
import {
	type C2DescriptionPracticesPoliciesFormValues,
	c2DescriptionPracticesPoliciesSchema,
} from '@/lib/forms/schemas/c2-description-practices-policies-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'
import { api } from '../../../convex/_generated/api'
import ConfidentialInfoBox from '../ConfidentialInfoBox'

const C2_CONFIDENTIAL_AREA =
	'vsme:C2-DescriptionOfPracticesPoliciesAndFutureInitiativesForTransitioningTowardsAMoreSustainableEconomyMember'

type B2FormData = {
	hasSustainabilityPractices?: boolean
	policiesHaveTargets?: boolean
}

export function C2DescriptionPracticesPoliciesForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const { skipQuery } = useOrgGuard()
	const b2Data = useQuery(
		api.forms.get.getForm,
		skipQuery || {
			table: 'formGeneral',
			reportingYear,
			section: 'sustainabilityInitiatives',
		},
	)

	const b2Values = (b2Data?.draftData ?? b2Data?.data) as B2FormData | undefined
	const hasSustainabilityPractices = b2Values?.hasSustainabilityPractices === true
	const policiesHaveTargets = b2Values?.policiesHaveTargets === true
	const c2Schema = c2DescriptionPracticesPoliciesSchema.superRefine((values, context) => {
		if (hasSustainabilityPractices && !values.c2_sustainability_practice_description?.trim()) {
			context.addIssue({
				code: 'custom',
				path: ['c2_sustainability_practice_description'],
				message: 'Please describe the practices and policies.',
			})
		}
		if (policiesHaveTargets && !values.c2_monitoring_targets_description?.trim()) {
			context.addIssue({
				code: 'custom',
				path: ['c2_monitoring_targets_description'],
				message: 'Please describe the monitoring targets.',
			})
		}
	})

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<C2DescriptionPracticesPoliciesFormValues>({
			table: 'formGeneral',
			reportingYear,
			section: 'descriptionOfPracticesPolicies',
			schema: c2Schema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				c2_sustainability_practice_description: '',
				c2_monitoring_targets_description: '',
				c2_accountable_role_or_person: '',
				confidentialAreas: [],
			},
		})
	const confidentialAreas = useYearStore(form.store, (state) => state.values.confidentialAreas ?? [])
	const isC2Confidential = confidentialAreas.includes(C2_CONFIDENTIAL_AREA)
	const handleConfidentialChange = (checked: boolean) => {
		const nextAreas = checked
			? [...new Set([...confidentialAreas, C2_CONFIDENTIAL_AREA])]
			: confidentialAreas.filter((area) => area !== C2_CONFIDENTIAL_AREA)
		form.setFieldValue('confidentialAreas', nextAreas)
	}

	if (isLoading || b2Data === undefined) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				Loading...
			</div>
		)
	}

	return (
		<form.AppForm>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					event.stopPropagation()
					form.handleSubmit()
				}}
			>
				<fieldset disabled={status === "submitted"} className='space-y-6'>
					<form.AppField name='reportingYear'>
						{(field) => (
							<field.TextField label={m["environmental.C2.reportingYearLabel"]()} placeholder='YYYY' hidden />
						)}
					</form.AppField>

					<ConfidentialInfoBox value={isC2Confidential} handleChange={handleConfidentialChange} />

					{/* <h3 className="text-lg font-medium">{m["environmental.C2.title"]()}</h3> */}
					{hasSustainabilityPractices ? (
						<form.AppField name='c2_sustainability_practice_description'>
							{(field) => <field.TextareaField label={m["environmental.C2.practiceDescription"]()} rows={5} />}
						</form.AppField>
					) : (
						<p className='text-muted-foreground'>{m["environmental.C2.noPractices"]()}</p>
					)}

					{policiesHaveTargets && (
						<form.AppField name='c2_monitoring_targets_description'>
							{(field) => <field.TextareaField label={m["environmental.C2.monitoringTargets"]()} rows={5} />}
						</form.AppField>
					)}

					<form.AppField name='c2_accountable_role_or_person'>
						{(field) => <field.TextareaField label={m["environmental.C2.accountableRole"]()} rows={4} showVolunteerBadge={true} />}
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
	)
}
