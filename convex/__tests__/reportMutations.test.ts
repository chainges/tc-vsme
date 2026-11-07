import { convexTest } from 'convex-test'
import { makeFunctionReference } from 'convex/server'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Id } from '../_generated/dataModel'
import schema from '../schema'
import { modules } from '../test.setup'

const USER_ID = 'user_reports_test'
const ORG_ID = 'org_reports_test'
const OTHER_ORG_ID = 'org_other_reports_test'

const createReport = makeFunctionReference<
	'mutation',
	{ orgId: string; reportingYear: number }
>('reportMutations:createReport')

const getReportById = makeFunctionReference<
	'query',
	{ reportId: string }
>('reportMutations:getReportById')

const getReportsByOrganization = makeFunctionReference<
	'query',
	{ orgId: string; reportingYear?: number }
>('reportMutations:getReportsByOrganization')

describe('report mutations authorization', () => {
	let t: ReturnType<typeof convexTest>
	let userRecordId: Id<'users'>

	async function seedUser() {
		return await t.run(async (ctx) => {
			const userId = await ctx.db.insert('users', {
				clerkId: USER_ID,
				email: 'reports@example.com',
				organizationIds: [ORG_ID, OTHER_ORG_ID],
				updatedAt: Date.now(),
			})

			for (const [clerkOrgId, slug] of [
				[ORG_ID, 'reports-test'],
				[OTHER_ORG_ID, 'other-reports-test'],
			] as const) {
				await ctx.db.insert('organizations', {
					clerkOrgId,
					name: slug,
					slug,
				})
			}

			return userId
		})
	}

	beforeEach(async () => {
		t = convexTest(schema, modules)
		userRecordId = await seedUser()
	})

	it('requires authentication to create a report', async () => {
		await expect(
			t.mutation(createReport, { orgId: ORG_ID, reportingYear: 2025 }),
		).rejects.toThrow('Unauthorized')
	})

	it('rejects report creation for an organization other than the active org', async () => {
		await expect(
			t.withIdentity({ subject: USER_ID, org_id: OTHER_ORG_ID }).mutation(
				createReport,
				{ orgId: ORG_ID, reportingYear: 2025 },
			),
		).rejects.toThrow('Unauthorized')
	})

	it('allocates increasing versions within the active organization and year', async () => {
		const asOrg = t.withIdentity({ subject: USER_ID, org_id: ORG_ID })
		const first = await asOrg.mutation(createReport, {
			orgId: ORG_ID,
			reportingYear: 2025,
		})
		const second = await asOrg.mutation(createReport, {
			orgId: ORG_ID,
			reportingYear: 2025,
		})

		expect(first.version).toBe(1)
		expect(second.version).toBe(2)
	})

	it('does not return a report from another active organization', async () => {
		const reportId = await t.run(async (ctx) =>
			ctx.db.insert('reports', {
				orgId: ORG_ID,
				reportingYear: 2025,
				reportId: 'report_private',
				version: 1,
				status: 'queued',
				requestedBy: userRecordId,
				createdAt: Date.now(),
			}),
		)

		const result = await t
			.withIdentity({ subject: USER_ID, org_id: OTHER_ORG_ID })
			.query(getReportById, { reportId: 'report_private' })

		expect(reportId).toBeDefined()
		expect(result).toBeNull()
	})

	it('rejects listing reports for an organization other than the active org', async () => {
		await expect(
			t.withIdentity({ subject: USER_ID, org_id: OTHER_ORG_ID }).query(
				getReportsByOrganization,
				{ orgId: ORG_ID },
			),
		).rejects.toThrow('Unauthorized')
	})

	it('rejects webhook requests when the shared secret is missing', async () => {
		const previousSecret = process.env.REPORT_WEBHOOK_SECRET
		delete process.env.REPORT_WEBHOOK_SECRET

		try {
			const response = await t.fetch('/reports/progress', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ reportId: 'report_private', stage: 'mapping_data' }),
			})

			expect(response.status).toBe(503)
		} finally {
			if (previousSecret === undefined) {
				delete process.env.REPORT_WEBHOOK_SECRET
			} else {
				process.env.REPORT_WEBHOOK_SECRET = previousSecret
			}
		}
	})

	it('rejects webhook requests with an invalid shared secret', async () => {
		const previousSecret = process.env.REPORT_WEBHOOK_SECRET
		process.env.REPORT_WEBHOOK_SECRET = 'configured-secret'
		let response: Response

		try {
			response = await t.fetch('/reports/progress', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer invalid-secret',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ reportId: 'report_private', stage: 'mapping_data' }),
			})
		} finally {
			if (previousSecret === undefined) {
				delete process.env.REPORT_WEBHOOK_SECRET
			} else {
				process.env.REPORT_WEBHOOK_SECRET = previousSecret
			}
		}

		expect(response.status).toBe(401)
	})

	it('updates report progress through the authenticated webhook', async () => {
		const secret = 'test-report-webhook-secret'
		const previousSecret = process.env.REPORT_WEBHOOK_SECRET
		process.env.REPORT_WEBHOOK_SECRET = secret
		const report = await t
			.withIdentity({ subject: USER_ID, org_id: ORG_ID })
			.mutation(createReport, { orgId: ORG_ID, reportingYear: 2025 })

		try {
			const response = await t.fetch('/reports/progress', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${secret}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ reportId: report.reportId, stage: 'mapping_data' }),
			})
			expect(response.status).toBe(200)
		} finally {
			if (previousSecret === undefined) {
				delete process.env.REPORT_WEBHOOK_SECRET
			} else {
				process.env.REPORT_WEBHOOK_SECRET = previousSecret
			}
		}

		const savedReport = await t
			.withIdentity({ subject: USER_ID, org_id: ORG_ID })
			.query(getReportById, { reportId: report.reportId })
		expect(savedReport).toMatchObject({ status: 'processing', stage: 'mapping_data' })
	})
})