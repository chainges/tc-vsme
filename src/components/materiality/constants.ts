export const STATIC_THRESHOLD = 3.3

export const TOPIC_DISCLOSURE_POINTERS: Record<string, string[]> = {
	'esrs:climate': ['B3', 'C3', 'C4'],
	'esrs:pollution': ['B4'],
	'esrs:water': ['B6'],
	'esrs:biodiversity': ['B5'],
	'esrs:circular': ['B7'],
	'esrs:ownWorkforce': ['B8', 'B9', 'B10', 'C5', 'C6'],
	'esrs:valueChainWorkers': ['C6', 'C7'],
	'esrs:communities': ['C7'],
	'esrs:consumers': ['C7'],
	'esrs:businessConduct': ['B11', 'C8', 'C9'],
}

export const DISCLOSURE_LABELS: Record<string, string> = {
	B3: 'B3 (Energy & GHG Emissions)',
	B4: 'B4 (Pollution of Air, Water & Soil)',
	B5: 'B5 (Biodiversity & Land Use)',
	B6: 'B6 (Water Consumption & Withdrawals)',
	B7: 'B7 (Resource Use & Circular Economy)',
	B8: 'B8 (Workforce Demographics & Turnover)',
	B9: 'B9 (Health & Safety)',
	B10: 'B10 (Fair Remuneration & Training)',
	B11: 'B11 (Governance & Fines)',
	C3: 'C3 (Scope 3 Emissions)',
	C4: 'C4 (Climate Transition Risks)',
	C5: 'C5 (Human Rights & Code of Conduct)',
	C6: 'C6 (Value Chain Worker Policies)',
	C7: 'C7 (Communities & End Consumers)',
	C8: 'C8 (Anti-Corruption & Whistleblowing)',
	C9: 'C9 (Payment Practices)',
}

export const ESRS_TOPICS_METADATA: Record<
	string,
	{
		name: string
		shortName: string
		description: string
		subtopics: string[]
		defaultSkipReasons: string[]
	}
> = {
	'esrs:climate': {
		name: 'Climate Change (ESRS E1)',
		shortName: 'Climate Change',
		description:
			'Direct & indirect greenhouse gas emissions, energy transition, climate adaptation and physical resilience.',
		subtopics: [
			'Climate change mitigation (Scope 1, 2 & 3 reductions)',
			'Climate change adaptation & physical risk resilience',
			'Energy efficiency, renewable energy & electrification',
		],
		defaultSkipReasons: [
			'Extremely low direct energy consumption and standard office leasing',
			'Operations have zero fossil fuel combustion or fleet footprint',
		],
	},
	'esrs:pollution': {
		name: 'Pollution (ESRS E2)',
		shortName: 'Pollution',
		description:
			'Emissions of harmful air pollutants, discharges to waterways/soil, microplastics and hazardous chemical handling.',
		subtopics: [
			'Air pollution & dust emissions',
			'Water effluent & runoff pollution',
			'Soil & groundwater contamination',
			'Handling of chemical substances of high concern',
		],
		defaultSkipReasons: [
			'Office-based service firm with no industrial discharges',
			'No significant chemical use or emissions beyond standard municipal waste',
		],
	},
	'esrs:water': {
		name: 'Water & Marine Resources (ESRS E3)',
		shortName: 'Water Resources',
		description:
			'Freshwater extraction, consumption intensity, water stress vulnerability and ocean/marine impact.',
		subtopics: [
			'Freshwater consumption & intensity',
			'Water withdrawal in water-stressed regions',
			'Discharges to municipal or natural water bodies',
			'Marine and coastal ecosystem impacts',
		],
		defaultSkipReasons: [
			'Low domestic municipal water use only',
			'Operations not in water-stressed areas and zero industrial effluents',
		],
	},
	'esrs:biodiversity': {
		name: 'Biodiversity & Ecosystems (ESRS E4)',
		shortName: 'Biodiversity',
		description:
			'Land sealing, habitat alteration, ecological degradation and direct supply chain impact on vulnerable species.',
		subtopics: [
			'Direct land-use conversion and physical footprint',
			'Impacts on red-listed or protected flora/fauna',
			'Sustainable sourcing of bio-based materials & timber',
		],
		defaultSkipReasons: [
			'Urban/leased office facilities with no physical footprint expansion',
			'Supply chain does not source raw forestry or agricultural commodities',
		],
	},
	'esrs:circular': {
		name: 'Resource Use & Circular Economy (ESRS E5)',
		shortName: 'Circular Economy',
		description:
			'Inflow of raw and secondary materials, scrap reduction, product durability and waste stream management.',
		subtopics: [
			'Raw material inflows & resource consumption',
			'Total waste generation & hazardous waste handling',
			'Product longevity, reuse, modularity & recycling rate',
		],
		defaultSkipReasons: [
			'Digital or intangible service provider with negligible physical material flows',
			'Packaging and electronic equipment managed by standard municipal recovery',
		],
	},
	'esrs:ownWorkforce': {
		name: 'Own Workforce (ESRS S1)',
		shortName: 'Own Workforce',
		description:
			'Fair working conditions, worker health and safety, non-discrimination, collective bargaining and fair wages.',
		subtopics: [
			'Working conditions, hours & work-life balance',
			'Workplace health, safety & incident prevention',
			'Equal opportunities, gender balance & equal pay',
			'Living wage commitments & collective dialogue',
		],
		defaultSkipReasons: [
			'Strictly regulated national jurisdiction with complete union agreements and low physical hazards',
		],
	},
	'esrs:valueChainWorkers': {
		name: 'Workers in Value Chain (ESRS S2)',
		shortName: 'Value Chain Workers',
		description:
			'Working conditions, human rights, child labour risk and health/safety across suppliers and contractor sites.',
		subtopics: [
			'Subcontractor site working conditions & oversight',
			'Child labour & forced labour risk screening in supply chains',
			'Supplier worker wage levels & fair commercial deadlines',
		],
		defaultSkipReasons: [
			'Pure local procurement with unionized Nordic vendors',
			'No high-risk international supply chain tiers',
		],
	},
	'esrs:communities': {
		name: 'Affected Communities (ESRS S3)',
		shortName: 'Affected Communities',
		description:
			'Relations with neighbours, noise/vibration/traffic disruption, indigenous rights and local civic impact.',
		subtopics: [
			'Community safety, health & nuisance prevention (noise, traffic)',
			"Indigenous peoples' rights & cultural preservation",
			'Local economic opportunities and stakeholder dialogue',
		],
		defaultSkipReasons: [
			'Operations strictly within designated commercial zones with no nearby residents',
			'No disruption or physical displacement to local population',
		],
	},
	'esrs:consumers': {
		name: 'Consumers & End Users (ESRS S4)',
		shortName: 'Consumers',
		description:
			'Product safety, cybersecurity, customer privacy protection, transparent marketing and fair pricing.',
		subtopics: [
			'Product quality, health & physical safety',
			'Data privacy protection & consumer cybersecurity',
			'Transparent product claims & ethical advertising',
		],
		defaultSkipReasons: [
			'Strictly B2B operations with enterprise commercial counterparties',
			'No direct consumer touchpoints or sensitive consumer personal data',
		],
	},
	'esrs:businessConduct': {
		name: 'Business Conduct (ESRS G1)',
		shortName: 'Business Conduct',
		description:
			'Corporate culture, anti-bribery, anti-corruption, whistleblower channels and ethical supplier payment terms.',
		subtopics: [
			'Anti-corruption, anti-bribery & conflict of interest rules',
			'Whistleblowing mechanisms & retaliation prevention',
			'Fair payment terms & ethical supplier relationships',
		],
		defaultSkipReasons: [
			'Transparent governance with strictly non-complex domestic operations',
		],
	},
}

export const INTAKE_QUESTIONS = [
	{
		key: 'sites',
		question: 'Physical operating sites',
		description:
			'Do you operate physical production plants, workshops, storage yards, or warehouses beyond standard offices?',
	},
	{
		key: 'build',
		question: 'Physical production or construction',
		description:
			'Do you manufacture, assemble, or build physical products, materials, or infrastructure?',
	},
	{
		key: 'subcontract',
		question: 'Subcontracted or agency labour',
		description:
			'Do you substantially rely on hired agency workers, site contractors, or third-party physical labour?',
	},
	{
		key: 'consumers',
		question: 'Direct-to-consumer sales (B2C)',
		description:
			'Do you sell goods, digital apps, or services directly to private individual consumers?',
	},
	{
		key: 'hazards',
		question: 'Hazardous or chemical materials',
		description:
			'Do your operational processes handle, store, or emit hazardous, flammable, or polluting chemical substances?',
	},
	{
		key: 'sensitiveSites',
		question: 'Proximity to nature or communities',
		description:
			'Are any operational sites located in or adjacent to protected nature reserves, wetlands, or residential communities?',
	},
]

export const STAKEHOLDER_GROUPS = [
	{
		key: 'employees',
		label: 'Employees & Union Representatives',
		description: 'Internal staff, shop stewards, safety delegates',
	},
	{
		key: 'customers',
		label: 'Customers & Enterprise Buyers',
		description: 'Key commercial clients, framework purchasers',
	},
	{
		key: 'suppliers',
		label: 'Key Suppliers & Subcontractors',
		description: 'Critical material vendors, logistics, specialist contractors',
	},
	{
		key: 'owners',
		label: 'Owners & Board of Directors',
		description: 'Shareholders, family owners, board members',
	},
	{
		key: 'lenders',
		label: 'Banks, Insurers & Lenders',
		description: 'Credit providers, financial guarantors, underwriters',
	},
	{
		key: 'community',
		label: 'Local Community & Neighbours',
		description: 'Neighbourhood councils, local civic groups',
	},
	{
		key: 'regulators',
		label: 'Public Authorities & Regulators',
		description: 'Labour inspectorate, environmental protection agencies',
	},
	{
		key: 'other',
		label: 'Other Key Stakeholders',
		description: 'Industry associations, certification bodies',
	},
]

export const IMPACT_SEVERITY_BANDS = [
	{
		value: 1,
		title: '1 – Negligible / Barely noticeable',
		description:
			'Handful of individuals or minor localised effect; easily and immediately put right.',
	},
	{
		value: 2,
		title: '2 – Limited',
		description:
			'Restricted group or small area affected; fully remediable within standard operational cycles (<1 yr).',
	},
	{
		value: 3,
		title: '3 – Moderate',
		description:
			'Noticeable impact on a meaningful group or environment; correction requires deliberate budget and effort.',
	},
	{
		value: 4,
		title: '4 – Serious',
		description:
			"Widespread, lasting, or touching people's health, rights, or livelihood; difficult to fully reverse.",
	},
	{
		value: 5,
		title: '5 – Severe',
		description:
			'Permanent or catastrophic environmental damage, or grave breach of fundamental human rights.',
	},
]

export const IMPACT_LIKELIHOOD_BANDS = [
	{
		value: 1,
		title: '1 – Very unlikely',
		description: '<10% probability over the next 3-year horizon.',
	},
	{
		value: 2,
		title: '2 – Possible',
		description: '10% to 30% chance; would be an unexpected event.',
	},
	{
		value: 3,
		title: '3 – Even odds',
		description: '30% to 60% probability; roughly as likely to happen as not.',
	},
	{
		value: 4,
		title: '4 – Likely',
		description:
			'60% to 85% probability; should reasonably be budgeted or planned for.',
	},
	{
		value: 5,
		title: '5 – Near certain',
		description: '>85% probability or already showing clear early indications.',
	},
]

export const FINANCIAL_MAGNITUDE_BANDS = [
	{
		value: 1,
		title: '1 – Minimal (<0.5% revenue)',
		description:
			'Noise level within ordinary cash flow variance; negligible bottom-line impact.',
	},
	{
		value: 2,
		title: '2 – Noticeable (0.5% – 2% revenue)',
		description:
			'Visible in quarterly department margins; manageable within existing contingency.',
	},
	{
		value: 3,
		title: '3 – Moderate (2% – 5% revenue)',
		description:
			'Material line item discussed at board level; influences capital allocation.',
	},
	{
		value: 4,
		title: '4 – Major (5% – 15% revenue)',
		description:
			'Threatens key customer contract, credit lines, or significant project viability.',
	},
	{
		value: 5,
		title: '5 – Critical (>15% revenue)',
		description:
			'Severe threat to overall business continuity, solvency, or operational licence.',
	},
]

export const FINANCIAL_LIKELIHOOD_BANDS = [
	{
		value: 1,
		title: '1 – Very unlikely',
		description: '<10% chance of financial materialisation in 3 years.',
	},
	{
		value: 2,
		title: '2 – Possible',
		description: '10% to 30% chance; foreseeable under adverse conditions.',
	},
	{
		value: 3,
		title: '3 – Even odds',
		description: '30% to 60% chance; reasonably balanced possibility.',
	},
	{
		value: 4,
		title: '4 – Likely',
		description:
			'60% to 85% probability; realistic financial headwind or cost.',
	},
	{
		value: 5,
		title: '5 – Near certain',
		description: '>85% probability of financial impact occurring.',
	},
]
