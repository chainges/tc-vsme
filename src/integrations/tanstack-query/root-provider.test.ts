import { convexQuery } from '@convex-dev/react-query'
import { makeFunctionReference } from 'convex/server'
import { describe, expect, it, vi } from 'vitest'
import { getContext } from './root-provider'

describe('query client integration', () => {
	it('uses the connected Convex client for Convex queries', async () => {
		const { queryClient, convexQueryClient } = getContext()
		const result = { name: 'Report' }
		const query = vi.spyOn(convexQueryClient.convexClient, 'query').mockResolvedValue(result)
		const reportQuery = makeFunctionReference<'query'>('reportMutations:getReportById')
		const args = { reportId: 'report-id' }

		expect(convexQueryClient.queryClient).toBe(queryClient)
		await expect(queryClient.fetchQuery(convexQuery(reportQuery, args))).resolves.toEqual(result)
		expect(query).toHaveBeenCalledWith('reportMutations:getReportById', args)
		queryClient.clear()
	})
})