import { useStore as useYearStore } from '@tanstack/react-store'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type C9BoardCompositionValues,
	c9BoardCompositionSchema,
} from '@/lib/forms/schemas/c9-board-composition-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function C9BoardCompositionForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)

	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<C9BoardCompositionValues>({
			table: 'formGovernance',
			reportingYear,
			section: 'boardComposition',
			schema: c9BoardCompositionSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				totalMembers: 0,
				femaleMembers: 0,
				maleMembers: 0,
				otherMembers: 0,
			} as C9BoardCompositionValues,
		})

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-muted-foreground">
				{m["governance.C9.loading"]()}
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
				<Card>
					<CardContent>
						<fieldset disabled={status === 'submitted'} className="space-y-6">
							{/* Hidden reporting year */}
							<form.AppField name="reportingYear">
								{(field) => (
									<field.TextField
										label={m["governance.C9.reportingYearLabel"]()}
										placeholder="YYYY"
										hidden
									/>
								)}
							</form.AppField>

							<div className="font-semibold">{m["governance.C9.boardGenderBalanceTitle"]()}</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<form.AppField name="totalMembers">
									{(field) => (
										<field.NumberField
											label={m["governance.C9.totalMembersLabel"]()}
											description={m["governance.C9.totalMembersDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="femaleMembers">
									{(field) => (
										<field.NumberField
											label={m["governance.C9.femaleMembersLabel"]()}
											description={m["governance.C9.femaleMembersDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="maleMembers">
									{(field) => (
										<field.NumberField
											label={m["governance.C9.maleMembersLabel"]()}
											description={m["governance.C9.maleMembersDescription"]()}
										/>
									)}
								</form.AppField>

								<form.AppField name="otherMembers">
									{(field) => (
										<field.NumberField
											label={m["governance.C9.otherMembersLabel"]()}
											description={m["governance.C9.otherMembersDescription"]()}
										/>
									)}
								</form.AppField>
							</div>
						</fieldset>
					</CardContent>
				</Card>

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
