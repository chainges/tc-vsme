import { describe, expect, it } from "vitest"
import { applyIntakePrefill, TOPIC_DISCLOSURE_POINTERS, ESRS_TOPICS } from "../materialityConstants"

describe("Materiality Constants & Prefill Provider", () => {
  it("defines the 10 ESRS sustainability matters from ESRS 1 AR 16", () => {
    expect(ESRS_TOPICS).toHaveLength(10)
    const keys = ESRS_TOPICS.map((t) => t.topicKey)
    expect(keys).toContain("esrs:climate")
    expect(keys).toContain("esrs:pollution")
    expect(keys).toContain("esrs:water")
    expect(keys).toContain("esrs:biodiversity")
    expect(keys).toContain("esrs:circular")
    expect(keys).toContain("esrs:ownWorkforce")
    expect(keys).toContain("esrs:valueChainWorkers")
    expect(keys).toContain("esrs:communities")
    expect(keys).toContain("esrs:consumers")
    expect(keys).toContain("esrs:businessConduct")
  })

  it("provides disclosure pointers for all 10 topics", () => {
    for (const topic of ESRS_TOPICS) {
      expect(TOPIC_DISCLOSURE_POINTERS[topic.topicKey]).toBeDefined()
      expect(TOPIC_DISCLOSURE_POINTERS[topic.topicKey].length).toBeGreaterThan(0)
    }
  })

  it("applies default sector prefill where climate, workforce and governance are relevant", () => {
    const prefills = applyIntakePrefill([])
    expect(prefills).toHaveLength(10)

    const climate = prefills.find((p) => p.topicKey === "esrs:climate")
    const workforce = prefills.find((p) => p.topicKey === "esrs:ownWorkforce")
    const conduct = prefills.find((p) => p.topicKey === "esrs:businessConduct")

    expect(climate?.screening).toBe("relevant")
    expect(workforce?.screening).toBe("relevant")
    expect(conduct?.screening).toBe("relevant")
  })

  it("screens out pollution and water for non-physical office firms", () => {
    const prefills = applyIntakePrefill([
      { key: "sites", answer: "no" },
      { key: "build", answer: "no" },
    ])

    const pollution = prefills.find((p) => p.topicKey === "esrs:pollution")
    const water = prefills.find((p) => p.topicKey === "esrs:water")
    const bio = prefills.find((p) => p.topicKey === "esrs:biodiversity")

    expect(pollution?.screening).toBe("notRelevant")
    expect(water?.screening).toBe("notRelevant")
    expect(bio?.screening).toBe("notRelevant")
  })

  it("flags pollution relevant when hazards are confirmed", () => {
    const prefills = applyIntakePrefill([
      { key: "sites", answer: "no" },
      { key: "build", answer: "no" },
      { key: "hazards", answer: "yes" },
    ])

    const pollution = prefills.find((p) => p.topicKey === "esrs:pollution")
    expect(pollution?.screening).toBe("relevant")
    expect(pollution?.source).toBe("answers")
  })

  it("marks consumers and value chain workers relevant based on intake answers", () => {
    const prefills = applyIntakePrefill([
      { key: "consumers", answer: "yes" },
      { key: "subcontract", answer: "yes" },
    ])

    const consumers = prefills.find((p) => p.topicKey === "esrs:consumers")
    const contractors = prefills.find((p) => p.topicKey === "esrs:valueChainWorkers")

    expect(consumers?.screening).toBe("relevant")
    expect(contractors?.screening).toBe("relevant")
  })

  it("elevates severity and magnitude for construction NACE codes", () => {
    const prefills = applyIntakePrefill([], "41.20")
    const circular = prefills.find((p) => p.topicKey === "esrs:circular")
    const climate = prefills.find((p) => p.topicKey === "esrs:climate")

    expect(circular?.impactSeverity).toBeGreaterThanOrEqual(4)
    expect(climate?.impactSeverity).toBeGreaterThanOrEqual(4)
  })
})
