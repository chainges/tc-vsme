export type TopicPrefill = {
  topicKey: string
  name: string
  description: string
  screening: "relevant" | "notRelevant" | "notSure"
  source: "sector" | "answers" | "report" | "agent" | "check" | "none"
  confidence: number
  note: string
  impactSeverity?: number
  financialMagnitude?: number
  subtopics: string[]
  valueChain: ("own" | "upstream" | "downstream")[]
  skipReasons: string[]
  disclosurePointers: string[]
}

export const TOPIC_DISCLOSURE_POINTERS: Record<string, string[]> = {
  "esrs:climate": ["B3", "C3", "C4"],
  "esrs:pollution": ["B4"],
  "esrs:water": ["B6"],
  "esrs:biodiversity": ["B5"],
  "esrs:circular": ["B7"],
  "esrs:ownWorkforce": ["B8", "B9", "B10", "C5", "C6"],
  "esrs:valueChainWorkers": ["C6", "C7"],
  "esrs:communities": ["C7"],
  "esrs:consumers": ["C7"],
  "esrs:businessConduct": ["B11", "C8", "C9"],
}

export const ESRS_TOPICS = [
  {
    topicKey: "esrs:climate",
    name: "Climate Change",
    description: "Greenhouse gas emissions, climate risks (physical and transition), adaptation and decarbonisation targets.",
    subtopics: [
      "Climate change mitigation",
      "Climate change adaptation",
      "Energy efficiency and renewable energy",
    ],
    valueChain: ["own", "upstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 3,
    defaultMagnitude: 3,
    skipReasons: [
      "Extremely low direct energy consumption and standard office leasing",
      "Operations have zero fossil fuel combustion or fleet footprint",
    ],
  },
  {
    topicKey: "esrs:pollution",
    name: "Pollution",
    description: "Emissions of pollutants to air, water and soil, plus handling of substances of concern.",
    subtopics: [
      "Air pollution",
      "Water pollution",
      "Soil pollution",
      "Substances of concern and chemicals",
    ],
    valueChain: ["own", "upstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 2,
    defaultMagnitude: 2,
    skipReasons: [
      "Office-based service firm with no industrial discharges",
      "No significant chemical use or emissions beyond standard municipal waste",
    ],
  },
  {
    topicKey: "esrs:water",
    name: "Water and Marine Resources",
    description: "Freshwater extraction, industrial water consumption and ocean/marine impact.",
    subtopics: [
      "Water consumption",
      "Water withdrawal and stress",
      "Discharges to water bodies",
      "Protection of coastal and marine ecosystems",
    ],
    valueChain: ["own"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 2,
    defaultMagnitude: 1,
    skipReasons: [
      "Low domestic municipal water use only",
      "Operations not in water-stressed areas and zero industrial effluents",
    ],
  },
  {
    topicKey: "esrs:biodiversity",
    name: "Biodiversity and Ecosystems",
    description: "Direct land use, habitat fragmentation and supply chain pressure on species.",
    subtopics: [
      "Direct land-use change and footprint",
      "Impact on threatened or protected species",
      "Sustainable sourcing of bio-based materials",
    ],
    valueChain: ["own", "upstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 2,
    defaultMagnitude: 1,
    skipReasons: [
      "Urban/leased office facilities with no physical footprint expansion",
      "Supply chain does not source raw forestry or agricultural commodities",
    ],
  },
  {
    topicKey: "esrs:circular",
    name: "Resource Use and Circular Economy",
    description: "Material flows, secondary raw materials, product longevity and waste generation.",
    subtopics: [
      "Resource inflows and raw materials",
      "Waste generation and hazardous fractions",
      "Product lifespan, repairability and recycling",
    ],
    valueChain: ["own", "upstream", "downstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 3,
    defaultMagnitude: 2,
    skipReasons: [
      "Digital or intangible service provider with negligible physical material flows",
      "Packaging and electronic equipment managed by standard municipal recovery",
    ],
  },
  {
    topicKey: "esrs:ownWorkforce",
    name: "Own Workforce",
    description: "Working conditions, health and safety, equal opportunities, wage adequacy and collective bargaining.",
    subtopics: [
      "Working conditions and job quality",
      "Occupational health and safety",
      "Equal treatment, diversity and gender pay equity",
      "Fair wages and social dialogue",
    ],
    valueChain: ["own"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 4,
    defaultMagnitude: 3,
    skipReasons: [
      "Regulated national jurisdiction with comprehensive union agreements and zero physical hazards",
    ],
  },
  {
    topicKey: "esrs:valueChainWorkers",
    name: "Workers in the Value Chain",
    description: "Human rights, health and safety, and labour conditions of supplier and contractor workers.",
    subtopics: [
      "Subcontractor working conditions",
      "Child labour and forced labour risks in tier 1/2",
      "Fair remuneration and hours across suppliers",
    ],
    valueChain: ["upstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 3,
    defaultMagnitude: 2,
    skipReasons: [
      "Pure local procurement with unionized Nordic vendors",
      "No high-risk international supply chain tiers",
    ],
  },
  {
    topicKey: "esrs:communities",
    name: "Affected Communities",
    description: "Community relations, indigenous rights, nuisance (traffic, noise) and local impacts.",
    subtopics: [
      "Community health and security",
      "Indigenous peoples' rights and consultation",
      "Local economic impact and operational nuisance",
    ],
    valueChain: ["own", "downstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 2,
    defaultMagnitude: 1,
    skipReasons: [
      "Operations strictly within designated commercial zones with no nearby residents",
      "No disruption or physical displacement to local population",
    ],
  },
  {
    topicKey: "esrs:consumers",
    name: "Consumers and End Users",
    description: "Consumer health, product safety, data privacy and fair commercial practices.",
    subtopics: [
      "Product safety and health impact",
      "Data privacy and cybersecurity",
      "Transparent marketing and fair contractual terms",
    ],
    valueChain: ["downstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 2,
    defaultMagnitude: 2,
    skipReasons: [
      "Strictly B2B operations with enterprise commercial counterparties",
      "No direct consumer touchpoints or sensitive consumer personal data",
    ],
  },
  {
    topicKey: "esrs:businessConduct",
    name: "Business Conduct",
    description: "Corporate culture, anti-corruption, bribery, whistleblowing and ethical supplier relationships.",
    subtopics: [
      "Anti-corruption, anti-bribery and fraud prevention",
      "Whistleblower protection and incident response",
      "Ethical procurement and fair supplier payment terms",
    ],
    valueChain: ["own", "upstream"] as ("own" | "upstream" | "downstream")[],
    defaultSeverity: 3,
    defaultMagnitude: 3,
    skipReasons: [
      "Transparent governance with strictly non-complex domestic operations",
    ],
  },
]

export const INTAKE_QUESTIONS = [
  {
    key: "sites",
    question: "Physical operating sites",
    description: "Do you operate physical sites (workshops, yards, warehouses, plants) beyond an ordinary office?",
  },
  {
    key: "build",
    question: "Physical production or construction",
    description: "Do you manufacture, assemble, or build physical products, structures, or equipment?",
  },
  {
    key: "subcontract",
    question: "Subcontracted or agency labour",
    description: "Do you substantially rely on hired agency workers, site contractors, or outsourced labour?",
  },
  {
    key: "consumers",
    question: "Direct-to-consumer sales (B2C)",
    description: "Do you sell goods, digital services, or products directly to private consumers?",
  },
  {
    key: "hazards",
    question: "Hazardous or chemical materials",
    description: "Do your processes handle, store, or produce toxic, flammable, or environmentally sensitive chemicals?",
  },
  {
    key: "sensitiveSites",
    question: "Proximity to nature or communities",
    description: "Are any active operations located close to protected nature reserves, coastlines, or residential areas?",
  },
]

export const STAKEHOLDER_GROUPS = [
  { key: "employees", label: "Employees & Worker Representatives" },
  { key: "customers", label: "Customers & Commercial Buyers" },
  { key: "suppliers", label: "Key Suppliers & Subcontractors" },
  { key: "owners", label: "Owners & Board of Directors" },
  { key: "lenders", label: "Banks, Insurers & Lenders" },
  { key: "community", label: "Local Community & Neighbours" },
  { key: "regulators", label: "Public Authorities & Regulators" },
  { key: "other", label: "Other Key Stakeholders" },
]

export function applyIntakePrefill(
  intake: { key: string; answer: "yes" | "no" | "unsure" }[] = [],
  naceCode?: string,
): TopicPrefill[] {
  const answers: Record<string, "yes" | "no" | "unsure"> = {}
  for (const item of intake) {
    answers[item.key] = item.answer
  }

  const isConstruction = naceCode ? ["41", "42", "43"].some((prefix) => naceCode.startsWith(prefix)) : false

  return ESRS_TOPICS.map((topic) => {
    let screening: "relevant" | "notRelevant" | "notSure" = "relevant"
    let source: "sector" | "answers" | "report" | "agent" | "check" | "none" = "sector"
    let confidence = 0.8
    let note = "Standard sustainability matter for European SMEs."
    let severity = topic.defaultSeverity
    let magnitude = topic.defaultMagnitude

    if (isConstruction) {
      if (topic.topicKey === "esrs:circular" || topic.topicKey === "esrs:climate") {
        severity = Math.max(severity, 4)
        magnitude = Math.max(magnitude, 4)
        note = "High material relevance typical for the construction and contracting sector."
      }
    }

    if (topic.topicKey === "esrs:climate") {
      screening = "relevant"
      source = "sector"
      confidence = 0.95
      note = "Climate impacts apply to virtually all operating companies under European standards."
    } else if (topic.topicKey === "esrs:ownWorkforce") {
      screening = "relevant"
      source = "sector"
      confidence = 0.95
      note = "Workforce welfare and health & safety are core responsibilities for all employers."
    } else if (topic.topicKey === "esrs:businessConduct") {
      screening = "relevant"
      source = "sector"
      confidence = 0.9
      note = "Fundamental governance baseline for all commercial enterprises."
    } else if (topic.topicKey === "esrs:pollution") {
      if (answers.hazards === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.95
        severity = 4
        note = "Flagged relevant due to hazardous substances or chemical handling indicated in intake."
      } else if (answers.sites === "no" && answers.build === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.9
        note = "Office-based service profile indicates negligible pollutant releases."
      } else if (answers.sites === "yes" || answers.build === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.85
        note = "Physical operating facilities indicate potential airborne or local emissions."
      } else if (answers.hazards === "unsure" || answers.sites === "unsure") {
        screening = "notSure"
        source = "check"
        confidence = 0.4
        note = "Uncertainty in intake answers regarding sites or hazards; needs specific review."
      }
    } else if (topic.topicKey === "esrs:water") {
      if (answers.sites === "no" && answers.build === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.9
        note = "Office facilities consume domestic municipal water with zero process wastewater."
      } else if (answers.sensitiveSites === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.85
        note = "Proximity to sensitive waterways or coastal zones requires evaluation."
      } else if (answers.build === "yes") {
        screening = "notSure"
        source = "check"
        confidence = 0.6
        note = "Physical production indicated; verify whether industrial water intake is material."
      }
    } else if (topic.topicKey === "esrs:biodiversity") {
      if (answers.sensitiveSites === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.95
        severity = 4
        note = "Operations located in or near sensitive habitats or protected natural land."
      } else if (answers.sites === "no" && answers.build === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.9
        note = "No physical land development or direct biological habitat disturbance."
      } else if (answers.sensitiveSites === "unsure") {
        screening = "notSure"
        source = "check"
        confidence = 0.5
        note = "Intake indicated uncertainty regarding site proximity to protected areas."
      }
    } else if (topic.topicKey === "esrs:circular") {
      if (answers.build === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.95
        severity = 4
        magnitude = 3
        note = "Material extraction, product manufacturing, or physical building generate direct material flows."
      } else if (answers.build === "no" && answers.sites === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.85
        note = "Digital or service business with negligible physical raw material volume."
      }
    } else if (topic.topicKey === "esrs:valueChainWorkers") {
      if (answers.subcontract === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.95
        severity = 4
        note = "Contractor and subcontractor oversight is vital when utilizing external site labour."
      } else if (answers.subcontract === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.8
        note = "No substantial reliance on external contractor or temporary workforce."
      } else if (answers.subcontract === "unsure") {
        screening = "notSure"
        source = "check"
        confidence = 0.5
        note = "Need to clarify depth of subcontracted labour in operations."
      }
    } else if (topic.topicKey === "esrs:communities") {
      if (answers.sensitiveSites === "yes" || answers.sites === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.85
        note = "Operational physical sites or vehicle movements affect neighbouring communities."
      } else if (answers.sites === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.85
        note = "No industrial facilities or heavy transport impacting local residents."
      }
    } else if (topic.topicKey === "esrs:consumers") {
      if (answers.consumers === "yes") {
        screening = "relevant"
        source = "answers"
        confidence = 0.95
        note = "Direct retail or consumer relationships involve consumer protection and data privacy."
      } else if (answers.consumers === "no") {
        screening = "notRelevant"
        source = "answers"
        confidence = 0.9
        note = "Purely business-to-business (B2B) model with no direct end-consumer interaction."
      }
    }

    return {
      topicKey: topic.topicKey,
      name: topic.name,
      description: topic.description,
      screening,
      source,
      confidence,
      note,
      impactSeverity: severity,
      financialMagnitude: magnitude,
      subtopics: topic.subtopics,
      valueChain: topic.valueChain,
      skipReasons: topic.skipReasons,
      disclosurePointers: TOPIC_DISCLOSURE_POINTERS[topic.topicKey] || [],
    }
  })
}
