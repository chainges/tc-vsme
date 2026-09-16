import { useStore as useYearStore } from '@tanstack/react-store'
import { Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { FormButtons } from '@/hooks/tanstack-form'
import { useFormSubmission } from '@/hooks/use-form-submission'
import {
	type C8SectorInvolvementValues,
	c8SectorInvolvementSchema,
} from '@/lib/forms/schemas/c8-sector-involvement-schema'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'

export function C8SectorInvolvementForm() {
	const reportingYear = useYearStore(yearStore, (state) => state.selectedYear)
	const { form, status, isSaving, isLoading, saveDraft, submit, reopen } =
		useFormSubmission<C8SectorInvolvementValues>({
			table: 'formGovernance',
			reportingYear,
			section: 'sectorInvolvement',
			schema: c8SectorInvolvementSchema,
			defaultValues: {
				reportingYear: reportingYear.toString(),
				controversialWeaponsRevenue: undefined,
				tobaccoRevenue: undefined,
				coalRevenue: undefined,
				gasRevenue: undefined,
				oilRevenue: undefined,
				chemicalProductionRevenue: undefined,
				pabCoalThreshold: false,
				pabOilThreshold: false,
				pabGasThreshold: false,
				pabElectricityThreshold: false,
				euBenchmarksExclusion: false,
			} as C8SectorInvolvementValues,
		})

	if (isLoading) {
		return <div className="flex items-center justify-center p-8 text-muted-foreground">{m['governance.C8.loading']()}</div>
	}

const syncExclusion = (value: boolean, currentField: keyof C8SectorInvolvementValues) => {
	const values = form.state.values

	const thresholdFields: Array<keyof C8SectorInvolvementValues> = [
		"pabCoalThreshold",
		"pabOilThreshold",
		"pabGasThreshold",
		"pabElectricityThreshold",
	]

	form.setFieldValue(
		"euBenchmarksExclusion",
		value || thresholdFields.some((field) => field !== currentField && values[field] === true),
	)
}

	return (
		<form.AppForm>
			<form onSubmit={(event) => { event.preventDefault(); event.stopPropagation(); form.handleSubmit() }}>
				<Card>
					<CardContent>
						<fieldset disabled={status === 'submitted'} className="space-y-6">
							<form.AppField name="reportingYear">{(field) => <field.TextField label={m['governance.C8.reportingYearLabel']()} placeholder="YYYY" hidden />}</form.AppField>
							<Alert variant="info"><Info /><AlertDescription>{m['governance.C8.revenueInfo']()}</AlertDescription></Alert>
							<div className="font-semibold">{m['governance.C8.sectorRevenueTitle']()}</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<form.AppField name="controversialWeaponsRevenue">{(field) => <field.NumberField label={m['governance.C8.controversialWeaponsRevenueLabel']()} unit="NOK" />}</form.AppField>
								<form.AppField name="tobaccoRevenue">{(field) => <field.NumberField label={m['governance.C8.tobaccoRevenueLabel']()} unit="NOK" />}</form.AppField>
								<form.AppField name="coalRevenue">{(field) => <field.NumberField label={m['governance.C8.coalRevenueLabel']()} unit="NOK" />}</form.AppField>
								<form.AppField name="gasRevenue">{(field) => <field.NumberField label={m['governance.C8.gasRevenueLabel']()} unit="NOK" />}</form.AppField>
								<form.AppField name="oilRevenue">{(field) => <field.NumberField label={m['governance.C8.oilRevenueLabel']()} unit="NOK" />}</form.AppField>
								<form.AppField name="chemicalProductionRevenue">{(field) => <field.NumberField label={m['governance.C8.chemicalProductionRevenueLabel']()} unit="NOK" />}</form.AppField>
							</div>
						</fieldset>
					</CardContent>
				</Card>

				<Card className="mt-6"><CardContent className="space-y-6">
					<Alert variant="info"><Info /><AlertTitle>{m['governance.C8.pabTitle']()}</AlertTitle><AlertDescription>{m['governance.C8.pabDescription']()}</AlertDescription></Alert>
					<div className="space-y-4">
						<form.AppField name="pabCoalThreshold" listeners={{ onChange: ({ value }) => syncExclusion( value, 'pabCoalThreshold') }}>{(field) => <field.SwitchField label={m['governance.C8.pabCoalThresholdLabel']()} />}</form.AppField>
						<form.AppField name="pabOilThreshold" listeners={{ onChange: ({ value }) => syncExclusion( value, 'pabOilThreshold') }}>{(field) => <field.SwitchField label={m['governance.C8.pabOilThresholdLabel']()} />}</form.AppField>
						<form.AppField name="pabGasThreshold" listeners={{ onChange: ({ value }) => syncExclusion( value, 'pabGasThreshold') }}>{(field) => <field.SwitchField label={m['governance.C8.pabGasThresholdLabel']()} />}</form.AppField>
						<form.AppField name="pabElectricityThreshold" listeners={{ onChange: ({ value }) => syncExclusion( value, 'pabElectricityThreshold') }}>{(field) => <field.SwitchField label={m['governance.C8.pabElectricityThresholdLabel']()} />}</form.AppField>
					</div>
					<form.AppField name="euBenchmarksExclusion">{(field) => <field.CheckboxField label={m['governance.C8.euBenchmarksExclusionLabel']()} disabled />}</form.AppField>
				</CardContent></Card>

				<FormButtons status={status as 'not_started' | 'draft' | 'submitted'} isSaving={isSaving} onSaveDraft={saveDraft} onSubmit={submit} onReopen={reopen} />
			</form>
		</form.AppForm>
	)
}