export type ScreeningStatus =
	| 'relevant'
	| 'notRelevant'
	| 'notSure'
	| 'unanswered'

export type PrefillSource =
	| 'sector'
	| 'answers'
	| 'report'
	| 'agent'
	| 'check'
	| 'none'

export type ValueChainSegment = 'own' | 'upstream' | 'downstream'

export type MaterialityBasis =
	| 'threshold'
	| 'severeHumanRights'
	| 'legalObligation'
	| 'manual'

export interface TopicPrefill {
	topicKey: string
	name: string
	description: string
	screening: 'relevant' | 'notRelevant' | 'notSure'
	source: PrefillSource
	confidence: number
	note: string
	impactSeverity?: number
	financialMagnitude?: number
	subtopics: string[]
	valueChain: ValueChainSegment[]
	skipReasons: string[]
	disclosurePointers: string[]
}

export interface MaterialityTopicItem {
	_id?: string
	topicKey: string
	customLabel?: string
	sortOrder: number
	screening: ScreeningStatus
	skipReason?: string
	skipReasonSource?: 'suggested' | 'custom'
	subtopics: string[]
	valueChain: ValueChainSegment[]
	impactOccurrence?: 'actual' | 'potential'
	impactSeverity?: number
	impactLikelihood?: number
	impactScore?: {
		computed?: number
		override?: number
		overrideReason?: string
		effective: number
	}
	financialMagnitude?: number
	financialLikelihood?: number
	financialScore?: {
		computed?: number
		override?: number
		overrideReason?: string
		effective: number
	}
	severeHumanRightsFlag: boolean
	legalObligationFlag: boolean
	isMaterial: boolean
	materialOn: ('impact' | 'financial')[]
	materialityBasis?: MaterialityBasis
	notes?: string
	prefillSource?: PrefillSource
	prefillNote?: string
	prefillConfidence?: number
	seedSuggestion?: Record<string, unknown>
}

export interface StakeholderItem {
	_id?: string
	group: string
	customLabel?: string
	engaged: boolean
	method?: string
	whatTheySaid?: string
	engagedAt?: string
}

export interface IntakeAnswer {
	key: string
	answer: 'yes' | 'no' | 'unsure'
}

export interface AssessmentData {
	_id?: string
	organizationId: string
	assessedAt?: string
	validUntil?: string
	validityMonths: number
	status: 'draft' | 'screening' | 'scoring' | 'valid' | 'expired' | 'superseded'
	threshold: number
	taxonomy: string
	methodVersion: string
	prefillProvider: string
	seedNaceCode?: string
	intake?: IntakeAnswer[]
	financialBasis: 'revenue' | 'operatingProfit' | 'totalAssets'
	completedAt?: number
	signedOffBy?: string
	signedOffRole?: string
}

export interface ReportTopicStatusItem {
	_id?: string
	orgId: string
	reportingYear: number
	topicKey: string
	addressed: boolean
	whatWeDo?: string
	narrativeSlot?: string
}

export type StepNumber = 1 | 2 | 3 | 4 | 5
