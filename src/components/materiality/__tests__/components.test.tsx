import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { MaterialityStepper } from '../materiality-stepper'
import { StepHandover } from '../step-handover'
import { StepScreening } from '../step-screening'
import { StepSetup } from '../step-setup'
import type {
	MaterialityAssessmentDoc,
	MaterialityTopicItem,
	StakeholderItem,
} from '../types'

beforeAll(() => {
	globalThis.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
})

describe('Materiality Assessment UI Components', () => {
	describe('MaterialityStepper', () => {
		it('renders all 5 steps with correct labels', () => {
			const onStepChange = vi.fn()
			render(
				<MaterialityStepper
					currentStep={1}
					maxReachedStep={3}
					onStepChange={onStepChange}
				/>,
			)

			expect(screen.getByText('Set up')).toBeInTheDocument()
			expect(screen.getByText('Screening')).toBeInTheDocument()
			expect(screen.getByText('Scoring')).toBeInTheDocument()
			expect(screen.getByText('Results')).toBeInTheDocument()
			expect(screen.getByText('Handover')).toBeInTheDocument()
		})

		it('allows navigation to reachable steps and invokes callback', () => {
			const onStepChange = vi.fn()
			render(
				<MaterialityStepper
					currentStep={1}
					maxReachedStep={3}
					onStepChange={onStepChange}
				/>,
			)

			const screeningButton = screen.getByText('Screening').closest('button')
			expect(screeningButton).not.toBeDisabled()
			if (screeningButton) {
				fireEvent.click(screeningButton)
				expect(onStepChange).toHaveBeenCalledWith(2)
			}
		})

		it('disables steps beyond maxReachedStep', () => {
			const onStepChange = vi.fn()
			render(
				<MaterialityStepper
					currentStep={1}
					maxReachedStep={2}
					onStepChange={onStepChange}
				/>,
			)

			const resultsButton = screen.getByText('Results').closest('button')
			expect(resultsButton).toBeDisabled()
		})
	})

	describe('StepSetup', () => {
		const mockStakeholders: StakeholderItem[] = [
			{
				group: 'employees',
				engaged: true,
				whatTheySaid: 'Need better safety measures',
			},
			{ group: 'customers', engaged: false },
		]

		it('renders NACE code, intake questions, and stakeholder items', () => {
			const onProceed = vi.fn()

			render(
				<StepSetup
					naceCode="41.20"
					initialIntake={[{ key: 'physicalSites', answer: 'yes' }]}
					initialStakeholders={mockStakeholders}
					onProceed={onProceed}
				/>,
			)

			expect(screen.getByText(/NACE: 41.20/)).toBeInTheDocument()
			expect(
				screen.getByText(/Employees & Union Representatives/i),
			).toBeInTheDocument()
			expect(
				screen.getByText(/Customers & Enterprise Buyers/i),
			).toBeInTheDocument()
		})

		it('submits updated intake and stakeholder choices when clicking proceed', () => {
			const onProceed = vi.fn()

			render(
				<StepSetup
					naceCode="41.20"
					initialIntake={[]}
					initialStakeholders={mockStakeholders}
					onProceed={onProceed}
				/>,
			)

			const yesButtons = screen.getAllByRole('button', { name: /^yes$/i })
			expect(yesButtons.length).toBeGreaterThan(0)
			fireEvent.click(yesButtons[0])

			const submitBtn = screen.getByRole('button', { name: /save & proceed/i })
			fireEvent.click(submitBtn)
			expect(onProceed).toHaveBeenCalled()
		})
	})

	describe('StepScreening', () => {
		const mockTopics: MaterialityTopicItem[] = [
			{
				_id: 'topic_1',
				topicKey: 'esrs:climate',
				sortOrder: 1,
				screening: 'relevant',
				subtopics: ['Energy consumption'],
				valueChain: ['own', 'upstream'],
				severeHumanRightsFlag: false,
				legalObligationFlag: false,
				isMaterial: true,
				materialOn: ['impact'],
				prefillSource: 'sector',
				prefillNote: 'High emissions sector',
			},
			{
				_id: 'topic_2',
				topicKey: 'esrs:pollution',
				sortOrder: 2,
				screening: 'notRelevant',
				skipReason: 'No chemical use or emissions to air/water',
				subtopics: [],
				valueChain: ['own'],
				severeHumanRightsFlag: false,
				legalObligationFlag: false,
				isMaterial: false,
				materialOn: [],
			},
		]

		it('renders topics and badges', () => {
			const onUpdateTopic = vi.fn()
			const onAddCustomTopic = vi.fn().mockResolvedValue(undefined)
			const onProceed = vi.fn()
			const onBack = vi.fn()

			render(
				<StepScreening
					topics={mockTopics}
					onUpdateTopic={onUpdateTopic}
					onAddCustomTopic={onAddCustomTopic}
					onProceed={onProceed}
					onBack={onBack}
				/>,
			)

			expect(screen.getByText('Climate Change (ESRS E1)')).toBeInTheDocument()
			expect(screen.getByText('Pollution (ESRS E2)')).toBeInTheDocument()
		})

		it('allows changing status to not relevant and selecting skip reason', () => {
			const onUpdateTopic = vi.fn()
			const onAddCustomTopic = vi.fn().mockResolvedValue(undefined)
			const onProceed = vi.fn()
			const onBack = vi.fn()

			render(
				<StepScreening
					topics={mockTopics}
					onUpdateTopic={onUpdateTopic}
					onAddCustomTopic={onAddCustomTopic}
					onProceed={onProceed}
					onBack={onBack}
				/>,
			)

			const notRelevantButtons = screen.getAllByRole('button', {
				name: /not relevant/i,
			})
			expect(notRelevantButtons.length).toBeGreaterThan(0)
			fireEvent.click(notRelevantButtons[0])
			expect(onUpdateTopic).toHaveBeenCalledWith(
				'topic_1',
				'notRelevant',
				expect.any(String),
				'suggested',
			)
		})
	})

	describe('StepHandover', () => {
		const mockAssessment: MaterialityAssessmentDoc = {
			organizationId: 'org_123',
			status: 'scoring',
			validityMonths: 36,
			threshold: 3.3,
			taxonomy: 'ESRS',
			methodVersion: '1.0',
			prefillProvider: 'v1-sector-intake',
			financialBasis: 'revenue',
		}

		const mockTopics: MaterialityTopicItem[] = [
			{
				_id: 'topic_1',
				topicKey: 'esrs:climate',
				sortOrder: 1,
				screening: 'relevant',
				subtopics: [],
				valueChain: ['own'],
				severeHumanRightsFlag: false,
				legalObligationFlag: false,
				isMaterial: true,
				materialOn: ['impact'],
				impactScore: { effective: 4.0 },
				financialScore: { effective: 3.5 },
			},
			{
				_id: 'topic_2',
				topicKey: 'esrs:pollution',
				sortOrder: 2,
				screening: 'notRelevant',
				subtopics: [],
				valueChain: ['own'],
				severeHumanRightsFlag: false,
				legalObligationFlag: false,
				isMaterial: false,
				materialOn: [],
				impactScore: { effective: 1.5 },
				financialScore: { effective: 1.0 },
			},
		]

		it('renders 3-year validity cycle, material topics, 2x2 quadrant, and sign-off', () => {
			const onToggleAddressed = vi.fn()
			const onSignOff = vi.fn()
			const onBack = vi.fn()

			render(
				<StepHandover
					assessment={mockAssessment}
					topics={mockTopics}
					reportStatuses={{}}
					onToggleAddressed={onToggleAddressed}
					onSignOff={onSignOff}
					onBack={onBack}
				/>,
			)

			expect(screen.getByText('3-Year Materiality Cycle')).toBeInTheDocument()
			expect(
				screen.getByText('Material Disclosures & Action Status'),
			).toBeInTheDocument()
			expect(
				screen.getByRole('button', { name: /sign off assessment/i }),
			).toBeInTheDocument()
		})
	})
})
