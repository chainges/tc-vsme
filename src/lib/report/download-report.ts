import { createServerFn } from '@tanstack/react-start'

export const downloadReport = createServerFn({ method: 'POST' })
	.inputValidator((data: { objectKey: string }) => {
		if (typeof data?.objectKey !== 'string' || !data.objectKey.trim()) {
			throw new Error('Invalid object key')
		}
		return data
	})
	.handler(async ({ data }): Promise<{ downloadUrl: string }> => {

		const apiUrl = process.env.XBRL_API_URL

        console.log('Requesting download URL for object key:', data.objectKey, 'API URL:', apiUrl)

		if (!apiUrl) throw new Error('XBRL service is not configured')

		const params = new URLSearchParams({ objectKey: data.objectKey })
		const response = await fetch(`${apiUrl.replace(/\/$/, '')}/reports/download?${params}`)

        console.log(response)

		if (!response.ok) throw new Error('Unable to generate download URL')
		const { downloadUrl } = await response.json()
		if (typeof downloadUrl !== 'string' || !downloadUrl) throw new Error('Invalid download URL')
		return { downloadUrl }
	})