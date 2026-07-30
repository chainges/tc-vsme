import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { api } from 'convex/_generated/api'
import { useQuery } from 'convex/react'
import { B8WorkforceForm } from '@/components/forms/social/B8Form'
import { B9HealthSafetyForm } from '@/components/forms/social/B9Form'
import { B10CompensationForm } from '@/components/forms/social/B10Form'
// import { B11WorkLifeBalanceForm } from '@/components/forms/social/B11Form'
import { C5AdditionalWorkforceForm } from '@/components/forms/social/C5Form'
import { C6HumanRightsPoliciesForm } from '@/components/forms/social/C6Form'
import { C7SeriousHumanRightsForm } from '@/components/forms/social/C7Form'
import {
	FormCard,
	type FormStatus,
} from '@/components/ui/expandable-card-simple'
import { useOrgGuard } from '@/hooks/use-org-guard'
import { yearStore } from '@/lib/year-store'
import { m } from '@/paraglide/messages'


export const Route = createFileRoute('/_appLayout/app/social/')({
	component: SocialPage,
})

/**
 * Format a timestamp to a human-readable date string
 */
function formatDate(timestamp: number | undefined): string {
	if (!timestamp) return 'Never'
	return new Date(timestamp).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

function SocialPage() {
	const reportingYear = useStore(yearStore, (state) => state.selectedYear)

	// Guard against race conditions during org switching
	const { skipQuery, isLoading: isOrgLoading } = useOrgGuard()

	// Fetch all form sections with contributor names resolved
	const formSections = useQuery(
		api.forms.get.getFormAllSectionsWithContributors,
		skipQuery || {
			table: 'formSocial',
			reportingYear,
		},
	)

	// Fetch general form company info to get total employees (shared by B10 & C5)
	const generalCompanyInfo = useQuery(
		api.forms.get.getForm,
		skipQuery
			? 'skip'
			: {
					table: 'formGeneral',
					reportingYear,
					section: 'companyInfo',
				},
	)
	const generalData = generalCompanyInfo?.draftData ?? generalCompanyInfo?.data
	const totalEmployees = generalData?.employees ?? 0
	const companyCountry = generalData?.country ?? ''

	// Extract section-specific data with contributor already resolved
	const workforce = formSections?.workforce
	const healthSafety = formSections?.healthSafety
	const compensationCollective = formSections?.compensationCollective
	const workLifeBalance = formSections?.workLifeBalance
	const additionalWorkforce = formSections?.additionalWorkforce
	const humanRightsPolicies = formSections?.humanRightsPolicies
	const seriousHumanRightsIncidents = formSections?.seriousHumanRightsIncidents

	// Show loading state
	if (isOrgLoading || formSections === undefined) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex flex-col gap-4 md:grid-cols-1 mt-4 max-w-6xl w-full mx-auto">
			<h1 className="text-2xl font-bold">Social Reporting</h1>
			<h3 className="text-lg text-muted-foreground">
				Workforce and social impact metrics
			</h3>

			<FormCard
				title={m["social.B8.title"]()}
				updatedDate={formatDate(workforce?.lastModifiedAt)}
				toolTip={m["social.B8.tooltip"]()}
				status={(workforce?.status ?? 'not_started') as FormStatus}
				contributor={workforce?.contributor || { name: 'Unknown' }}
				code="B8"
				module="Basic Module"
				version={
					workforce?.versions?.length
						? workforce.versions[workforce.versions.length - 1]?.version
						: undefined
				}
			>
				<B8WorkforceForm
					totalEmployees={totalEmployees}
					companyCountry={companyCountry}
					generalFormData={generalData}
				/>
			</FormCard>

			<FormCard
				title={m["social.B9.title"]()}
				updatedDate={formatDate(healthSafety?.lastModifiedAt)}
				toolTip={m["social.B9.tooltip"]()}
				status={(healthSafety?.status ?? 'not_started') as FormStatus}
				contributor={healthSafety?.contributor || { name: 'Unknown' }}
				code="B9"
				module="Basic Module"
				version={
					healthSafety?.versions?.length
						? healthSafety.versions[healthSafety.versions.length - 1]?.version
						: undefined
				}
			>
				<B9HealthSafetyForm />
			</FormCard>

			<FormCard
				title={m["social.B10.title"]()}
				updatedDate={formatDate(compensationCollective?.lastModifiedAt)}
				toolTip={m["social.B10.tooltip"]()}
				status={(compensationCollective?.status ?? 'not_started') as FormStatus}
				contributor={compensationCollective?.contributor || { name: 'Unknown' }}
				code="B10"
				module="Basic Module"
				version={
					compensationCollective?.versions?.length
						? compensationCollective.versions[
								compensationCollective.versions.length - 1
							]?.version
						: undefined
				}
			>
				<B10CompensationForm totalEmployees={totalEmployees} />
			</FormCard>

			{/* <FormCard
				title="Arbeid-privatliv-balanse"
				updatedDate={formatDate(workLifeBalance?.lastModifiedAt)}
				toolTip="Rapporter foreldrepermisjon og relaterte ordninger."
				status={workLifeBalance?.status ?? 'not_started'}
				contributor={workLifeBalance?.contributor || { name: 'Unknown' }}
				code="B11"
				module="Basic Module"
				version={
					workLifeBalance?.versions?.length
						? workLifeBalance.versions[workLifeBalance.versions.length - 1]
								?.version
						: undefined
				}
			>
				<B11WorkLifeBalanceForm />
			</FormCard> */}

			<FormCard
				title={m["social.C5.title"]()}
				updatedDate={formatDate(additionalWorkforce?.lastModifiedAt)}
				toolTip={m["social.C5.tooltip"]()}
				status={(additionalWorkforce?.status ?? 'not_started') as FormStatus}
				contributor={additionalWorkforce?.contributor || { name: 'Unknown' }}
				code="C5"
				module="Comprehensive Module"
				version={
					additionalWorkforce?.versions?.length
						? additionalWorkforce.versions[
								additionalWorkforce.versions.length - 1
							]?.version
						: undefined
				}
			>
				<C5AdditionalWorkforceForm totalEmployees={totalEmployees} />
			</FormCard>

			<FormCard
				title={m["social.C6.title"]()}
				updatedDate={formatDate(humanRightsPolicies?.lastModifiedAt)}
				toolTip={m["social.C6.tooltip"]()}
				status={(humanRightsPolicies?.status ?? 'not_started') as FormStatus}
				contributor={humanRightsPolicies?.contributor || { name: 'Unknown' }}
				code="C6"
				module="Comprehensive Module"
				version={
					humanRightsPolicies?.versions?.length
						? humanRightsPolicies.versions[
								humanRightsPolicies.versions.length - 1
							]?.version
						: undefined
				}
			>
				<C6HumanRightsPoliciesForm />
			</FormCard>

			<FormCard
				title={m["social.C7.title"]()}
				updatedDate={formatDate(seriousHumanRightsIncidents?.lastModifiedAt)}
				toolTip={m["social.C7.tooltip"]()}
				status={
					(seriousHumanRightsIncidents?.status ?? 'not_started') as FormStatus
				}
				contributor={
					seriousHumanRightsIncidents?.contributor || { name: 'Unknown' }
				}
				code="C7"
				module="Comprehensive Module"
				version={
					seriousHumanRightsIncidents?.versions?.length
						? seriousHumanRightsIncidents.versions[
								seriousHumanRightsIncidents.versions.length - 1
							]?.version
						: undefined
				}
			>
				<C7SeriousHumanRightsForm />
			</FormCard>
		</div>
	)
}
