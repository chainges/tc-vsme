import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { api } from 'convex/_generated/api'
import { useQuery } from 'convex/react'
import { useState } from 'react'
import { B1GeneralForm } from '@/components/forms/b1-general-form'
import { B2SustainabilityInitiativesForm } from '@/components/forms/b2-sustainability-initiatives-form'

import { C1BusinessModelForm } from '@/components/forms/c1-business-model-form'
import { HelpSheet } from '@/components/sheet'
import {
	FormCard,
	type FormStatus,
} from '@/components/ui/expandable-card-simple'
import { useOrgGuard } from '@/hooks/use-org-guard'
import { yearStore } from '@/lib/year-store'
import { m } from "@/paraglide/messages"
import { GeneralHelp } from './-initiatives-help'

export const Route = createFileRoute('/_appLayout/app/general/')({
	component: GeneralPage,
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

function GeneralPage() {
	const reportingYear = useStore(yearStore, (state) => state.selectedYear)
	const [isInitiativesHelpOpen, setInitiativesHelpOpen] = useState(false)

	// Guard against race conditions during org switching
	const { skipQuery, isLoading: isOrgLoading } = useOrgGuard()

	// Fetch all form sections with contributor names resolved
	const formSections = useQuery(
		api.forms.get.getFormAllSectionsWithContributors,
		skipQuery || {
			table: 'formGeneral',
			reportingYear,
		},
	)

	// Extract section-specific data
	const companyInfo = formSections?.companyInfo
	const sustainability = formSections?.sustainabilityInitiatives
	const businessModel = formSections?.businessModel

	// Show loading state
	if (isOrgLoading || formSections === undefined) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex flex-col gap-4 md:grid-cols-1 mt-4 max-w-6xl w-full mx-auto'>
			<h1 className='text-2xl font-bold'>{m["general.generalInformation"]()}</h1>
			<h3 className='text-lg text-muted-foreground'>{m["general.generalInformationDescription"]()}</h3>
			<FormCard
				title={m["general.B1.title"]()}
				updatedDate={formatDate(companyInfo?.lastModifiedAt)}
				status={(companyInfo?.status ?? "not_started") as FormStatus}
				toolTip={m["general.B1.tooltip"]()}
				contributor={companyInfo?.contributor || { name: "Unknown" }}
				code='B1'
				module='Basic Module'
				version={
					companyInfo?.versions?.length ? companyInfo.versions[companyInfo.versions.length - 1].version : undefined
				}
			>
				<B1GeneralForm />
			</FormCard>
			<FormCard
				title={m["general.B2.title"]()}
				updatedDate={formatDate(sustainability?.lastModifiedAt)}
				toolTip={m["general.B2.tooltip"]()}
				status={(sustainability?.status ?? "not_started") as FormStatus}
				contributor={sustainability?.contributor || { name: "Unknown" }}
				code='B2'
				buttonText={m["general.B2.buttonText"]()}
				onClick={() => setInitiativesHelpOpen(true)}
				module='Basic Module'
				version={
					sustainability?.versions?.length
						? sustainability.versions[sustainability.versions.length - 1].version
						: undefined
				}
			>
				<B2SustainabilityInitiativesForm />
			</FormCard>
			<HelpSheet
				open={isInitiativesHelpOpen}
				onOpenChange={setInitiativesHelpOpen}
				title={m["general.help.title"]()}
				description={m["general.help.description"]()}
			>
				<GeneralHelp />
			</HelpSheet>

			<hr />
			<FormCard
				title={m["general.C1.title"]()}
				updatedDate={formatDate(businessModel?.lastModifiedAt)}
				toolTip={m["general.C1.tooltip"]()}
				status={(businessModel?.status ?? "not_started") as FormStatus}
				contributor={businessModel?.contributor || { name: "Unknown" }}
				code='C1'
				module='Comprehensive Module'
				version={
					businessModel?.versions?.length
						? businessModel.versions[businessModel.versions.length - 1].version
						: undefined
				}
			>
				<C1BusinessModelForm />
			</FormCard>
		</div>
	)
}
