import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MaterialityStepper } from '@/components/materiality/materiality-stepper'
import { StepHandover } from '@/components/materiality/step-handover'
import { StepResults } from '@/components/materiality/step-results'
import { StepScoring } from '@/components/materiality/step-scoring'
import { StepScreening } from '@/components/materiality/step-screening'
import { StepSetup } from '@/components/materiality/step-setup'
import type {
	IntakeAnswer,
	MaterialityTopicItem,
	ScreeningStatus,
	StakeholderItem,
	StepNumber,
} from '@/components/materiality/types'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { yearStore } from '@/lib/year-store'
import { api } from '../../../../convex/_generated/api'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_appLayout/app/materiality')({
	component: MaterialityPage,
})

function MaterialityPage() {
	const { isAuthenticated } = useConvexAuth()
	const { authContext } = Route.useRouteContext()
	const selectedYear = useStore(yearStore, (s) => s.selectedYear)
	const currentYear = Number(selectedYear) || new Date().getFullYear()

	const [currentStep, setCurrentStep] = useState<StepNumber>(1)
	const [maxReachedStep, setMaxReachedStep] = useState<StepNumber>(1)
	const [isSaving, setIsSaving] = useState(false)

	// Convex Queries
	const assessmentData = useQuery(
		api.materiality.getAssessment,
		isAuthenticated ? {} : 'skip',
	)

	const reportStatuses = useQuery(
		api.materiality.getReportTopicStatuses,
		isAuthenticated ? { reportingYear: currentYear } : 'skip',
	)

	// Convex Mutations
	const createOrGetAssessment = useMutation(
		api.materiality.createOrGetAssessment,
	)
	const saveIntakeAndStakeholders = useMutation(
		api.materiality.saveIntakeAndStakeholders,
	)
	const updateTopicScreening = useMutation(api.materiality.updateTopicScreening)
	const addCustomTopic = useMutation(api.materiality.addCustomTopic)
	const updateTopicScoring = useMutation(api.materiality.updateTopicScoring)
	const updateReportTopicStatus = useMutation(
		api.materiality.updateReportTopicStatus,
	)
	const signOffAssessment = useMutation(api.materiality.signOffAssessment)

	// Ensure assessment exists
	useEffect(() => {
		if (isAuthenticated && assessmentData === null) {
			createOrGetAssessment({
				financialBasis: 'revenue',
			}).catch((err) => {
				console.error('Failed to initialize assessment:', err)
			})
		}
	}, [isAuthenticated, assessmentData, createOrGetAssessment])

	const assessment = assessmentData?.assessment
	const topics: MaterialityTopicItem[] =
		(assessmentData?.topics as unknown as MaterialityTopicItem[]) || []
	const stakeholders: StakeholderItem[] =
		(assessmentData?.stakeholders as unknown as StakeholderItem[]) || []

	// Update max reached step based on status
	useEffect(() => {
		if (assessment) {
			if (assessment.status === 'valid') {
				setMaxReachedStep(5)
			} else if (assessment.status === 'scoring') {
				setMaxReachedStep((prev) => Math.max(prev, 3) as StepNumber)
			} else if (assessment.status === 'screening') {
				setMaxReachedStep((prev) => Math.max(prev, 2) as StepNumber)
			}
		}
	}, [assessment])

	const handleStepChange = (step: StepNumber) => {
		setCurrentStep(step)
	}

	// Step 1: Proceed from Setup to Screening
	const handleProceedFromSetup = async (
		intake: IntakeAnswer[],
		stakeholderList: StakeholderItem[],
	) => {
		if (!assessment?._id) return
		setIsSaving(true)
		try {
			await saveIntakeAndStakeholders({
				assessmentId: assessment._id,
				intake,
				stakeholders: stakeholderList.map((s) => ({
					group: s.group,
					customLabel: s.customLabel,
					engaged: s.engaged,
					whatTheySaid: s.whatTheySaid,
				})),
				applyPrefillToTopics: true,
			})
			setMaxReachedStep((prev) => Math.max(prev, 2) as StepNumber)
			setCurrentStep(2)
		} catch (err) {
			console.error('Failed to save intake:', err)
		} finally {
			setIsSaving(false)
		}
	}

	// Step 2: Update Screening
	const handleUpdateTopicScreening = async (
		topicId: string,
		screening: ScreeningStatus,
		skipReason?: string,
		skipReasonSource?: 'suggested' | 'custom',
	) => {
		if (screening === 'unanswered') return
		setIsSaving(true)
		try {
			await updateTopicScreening({
				topicId: topicId as Id<'materialityTopics'>,
				screening,
				skipReason,
				skipReasonSource,
			})
		} catch (err) {
			console.error('Failed to update topic screening:', err)
		} finally {
			setIsSaving(false)
		}
	}

	const handleAddCustomTopic = async (label: string) => {
		if (!assessment?._id) return
		setIsSaving(true)
		try {
			await addCustomTopic({
				assessmentId: assessment._id,
				customLabel: label,
			})
		} finally {
			setIsSaving(false)
		}
	}

	const handleProceedFromScreening = () => {
		setMaxReachedStep((prev) => Math.max(prev, 3) as StepNumber)
		setCurrentStep(3)
	}

	// Step 3: Update Scoring
	const handleUpdateTopicScoring = async (
		topicId: string,
		updates: Partial<MaterialityTopicItem>,
	) => {
		setIsSaving(true)
		try {
			await updateTopicScoring({
				topicId: topicId as Id<'materialityTopics'>,
				subtopics: updates.subtopics,
				valueChain: updates.valueChain,
				impactOccurrence: updates.impactOccurrence,
				impactSeverity: updates.impactSeverity,
				impactLikelihood: updates.impactLikelihood,
				financialMagnitude: updates.financialMagnitude,
				financialLikelihood: updates.financialLikelihood,
				severeHumanRightsFlag: updates.severeHumanRightsFlag,
				legalObligationFlag: updates.legalObligationFlag,
				notes: updates.notes,
			})
		} catch (err) {
			console.error('Failed to update topic scoring:', err)
		} finally {
			setIsSaving(false)
		}
	}

	const handleProceedFromScoring = () => {
		setMaxReachedStep((prev) => Math.max(prev, 4) as StepNumber)
		setCurrentStep(4)
	}

	// Step 4: Proceed to Handover
	const handleProceedFromResults = () => {
		setMaxReachedStep((prev) => Math.max(prev, 5) as StepNumber)
		setCurrentStep(5)
	}

	// Step 5: Update Report Topic Status & Sign Off
	const handleUpdateReportTopicStatus = async (
		topicKey: string,
		addressed: boolean,
		whatWeDo?: string,
		narrativeSlot?: string,
	) => {
		try {
			await updateReportTopicStatus({
				reportingYear: currentYear,
				topicKey,
				addressed,
				whatWeDo,
				narrativeSlot,
			})
		} catch (err) {
			console.error('Failed to update report topic status:', err)
		}
	}

	const handleSignOff = async () => {
		if (!assessment?._id) return
		setIsSaving(true)
		try {
			await signOffAssessment({
				assessmentId: assessment._id,
				role: 'Sustainability Director',
			})
		} catch (err) {
			console.error('Failed to sign off assessment:', err)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
			{/* Page Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
							Double Materiality Assessment
						</h1>
						<Badge variant="outline" className="text-sm font-normal font-mono px-2.5 py-0.5 text-muted-foreground">
							VSME • ESRS 1 AR 16
						</Badge>
					</div>
					<p className="text-base text-muted-foreground mt-1.5 leading-relaxed font-normal">
						Proportionate 3-year scoping flow for European SMEs. Identifies
						which sustainability topics require words in your reports.
					</p>
				</div>

				{assessment && (
					<div className="flex items-center gap-2">
						<Badge
							variant={assessment.status === 'valid' ? 'default' : 'secondary'}
							className="text-sm px-3 py-1 font-normal capitalize"
						>
							{assessment.status === 'valid'
								? 'Signed Off & Active'
								: `${assessment.status} status`}
						</Badge>
					</div>
				)}
			</div>

			{/* Stepper Navigation */}
			<MaterialityStepper
				currentStep={currentStep}
				onStepChange={handleStepChange}
				maxReachedStep={maxReachedStep}
				isSaving={isSaving}
			/>

			{/* Loading state if query is pending */}
			{!assessmentData && (
				<Card className="p-12 text-center flex flex-col items-center justify-center gap-3">
					<Loader2 className="w-8 h-8 animate-spin text-primary" />
					<p className="text-base text-muted-foreground font-normal">
						Loading materiality assessment profile...
					</p>
				</Card>
			)}

			{/* Step Content */}
			{assessmentData && (
				<>
					{currentStep === 1 && (
						<StepSetup
							organizationName={authContext?.orgName || 'Your Organization'}
							naceCode={assessment?.seedNaceCode || '41.20'}
							initialIntake={assessment?.intake}
							initialStakeholders={stakeholders}
							onProceed={handleProceedFromSetup}
							isSubmitting={isSaving}
						/>
					)}

					{currentStep === 2 && (
						<StepScreening
							topics={topics}
							onUpdateTopic={handleUpdateTopicScreening}
							onAddCustomTopic={handleAddCustomTopic}
							onProceed={handleProceedFromScreening}
							onBack={() => setCurrentStep(1)}
							isSubmitting={isSaving}
						/>
					)}

					{currentStep === 3 && (
						<StepScoring
							topics={topics}
							onUpdateScoring={handleUpdateTopicScoring}
							onProceed={handleProceedFromScoring}
							onBack={() => setCurrentStep(2)}
							isSubmitting={isSaving}
						/>
					)}

					{currentStep === 4 && (
						<StepResults
							topics={topics}
							threshold={assessment?.threshold || 3.3}
							onProceed={handleProceedFromResults}
							onBack={() => setCurrentStep(3)}
						/>
					)}

					{currentStep === 5 && (
						<StepHandover
							topics={topics}
							reportTopicStatuses={reportStatuses || []}
							reportingYear={currentYear}
							validUntilDate={assessment?.validUntil || '2029-09-04'}
							onUpdateTopicStatus={handleUpdateReportTopicStatus}
							onSignOff={handleSignOff}
							onBack={() => setCurrentStep(4)}
							isSubmitting={isSaving}
							isCompleted={assessment?.status === 'valid'}
						/>
					)}
				</>
			)}
		</div>
	)
}
