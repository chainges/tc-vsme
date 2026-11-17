import { createFileRoute } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"
import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { Landmark } from "lucide-react"
import { B11FinesPenaltiesForm } from "@/components/forms/governance/B11FinesPenaltiesForm"
import { C8SectorInvolvementForm } from "@/components/forms/governance/C8SectorInvolvementForm"
import { C9BoardCompositionForm } from "@/components/forms/governance/C9BoardCompositionForm"
import { FormCard, type FormStatus } from "@/components/ui/expandable-card-simple"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { useOrgGuard } from "@/hooks/use-org-guard"
import { yearStore } from "@/lib/year-store"

export const Route = createFileRoute("/_appLayout/app/governance/")({
	component: GovernancePage,
})

/**
 * Format a timestamp to a human-readable date string
 */
function formatDate(timestamp: number | undefined): string {
	if (!timestamp) return "Never"
	return new Date(timestamp).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})
}

function GovernancePage() {
	const reportingYear = useStore(yearStore, (state) => state.selectedYear)

	// Guard against race conditions during org switching
	const { skipQuery, isLoading: isOrgLoading } = useOrgGuard()

	// Fetch all form sections with contributor names resolved
	const formSections = useQuery(
		api.forms.get.getFormAllSectionsWithContributors,
		skipQuery || {
			table: "formGovernance",
			reportingYear,
		},
	)

	const generalCompanyInfo = useQuery(
		api.forms.get.getForm,
		skipQuery
			? "skip"
			: {
					table: "formGeneral",
					reportingYear,
					section: "companyInfo",
				},
	)

	const basicInformation = useQuery(
		api.forms.get.getForm,
		skipQuery
			? "skip"
			: {
					table: "formGeneral",
					reportingYear,
					section: "basicModule",
				},
	)

	const showComprehensiveModule = !(
		basicInformation?.data && basicInformation.data.moduleScope === "vsme:OptionABasicModuleOnlyMember"
	)

	const numberOfEmployees =
		generalCompanyInfo?.data && "employees" in generalCompanyInfo.data ? (generalCompanyInfo?.data.employees ?? 0) : 0

	const isMicroUnderTaking = numberOfEmployees <= 10

	// Extract section-specific data
	const finesPenalties = formSections?.finesPenalties
	const sectorInvolvement = formSections?.sectorInvolvement
	const boardComposition = formSections?.boardComposition

	// Show loading state
	if (isOrgLoading || formSections === undefined) {
		return <LoadingSkeleton variant='cards' count={showComprehensiveModule ? 3 : 1} />
	}

	return (
		<div className='flex flex-col gap-4 px-4 pb-8 pt-7 md:px-6 lg:px-8 w-full mx-auto'>
			<div>
				<h1 className='flex items-center gap-2.5 text-xl font-semibold'>
					<Landmark className='size-5 text-primary' />
					Governance
				</h1>
				<p className='mt-1 text-sm text-muted-foreground'>Report your governance metrics for the organization.</p>
			</div>

			{isOrgLoading || formSections === undefined ? (
				<LoadingSkeleton variant='cards' count={showComprehensiveModule ? 3 : 1} />
			) : (
				<>
					<FormCard
						title='Fines and Penalties'
						updatedDate={formatDate(finesPenalties?.lastModifiedAt)}
						toolTip='Report fines or penalties related to violations of anti-corruption or anti-bribery laws.'
						status={(finesPenalties?.status ?? "not_started") as FormStatus}
						contributor={finesPenalties?.contributor || { name: "Unknown" }}
						code='B11'
						module='Basic Module'
						version={
							finesPenalties?.versions?.length
								? finesPenalties.versions[finesPenalties.versions.length - 1]?.version
								: undefined
						}
					>
						<B11FinesPenaltiesForm />
					</FormCard>

					{showComprehensiveModule && (
						<>
							<FormCard
								title='Sector Involvement'
								updatedDate={formatDate(sectorInvolvement?.lastModifiedAt)}
								toolTip='Report revenue from specific sectors like controversial weapons, fossil fuels, and agricultural chemicals.'
								status={(sectorInvolvement?.status ?? "not_started") as FormStatus}
								contributor={sectorInvolvement?.contributor || { name: "Unknown" }}
								code='C8'
								module='Comprehensive Module'
								isVolunteer={isMicroUnderTaking}
								version={
									sectorInvolvement?.versions?.length
										? sectorInvolvement.versions[sectorInvolvement.versions.length - 1]?.version
										: undefined
								}
							>
								<C8SectorInvolvementForm />
							</FormCard>

							<FormCard
								title='Board Composition'
								updatedDate={formatDate(boardComposition?.lastModifiedAt)}
								toolTip='Report the gender balance and total composition of the board.'
								status={(boardComposition?.status ?? "not_started") as FormStatus}
								contributor={boardComposition?.contributor || { name: "Unknown" }}
								code='C9'
								isVolunteer={isMicroUnderTaking}
								module='Comprehensive Module'
								version={
									boardComposition?.versions?.length
										? boardComposition.versions[boardComposition.versions.length - 1]?.version
										: undefined
								}
							>
								<C9BoardCompositionForm />
							</FormCard>
						</>
					)}
				</>
			)}
		</div>
	)
}
