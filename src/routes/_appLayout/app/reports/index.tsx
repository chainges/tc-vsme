import { createFileRoute } from '@tanstack/react-router'

import { api } from 'convex/_generated/api'
import { useConvexAuth, useQuery } from 'convex/react'
import { ArrowDownToLine, Bug, CheckCircle2, FileCode2, FileText, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
import { downloadReport } from '@/lib/report/download-report'

export const Route = createFileRoute('/_appLayout/app/reports/')({
	component: RouteComponent,
})

function formatReportDate(timestamp: number) {
	return new Date(timestamp).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

function RouteComponent() {
	const [downloadingReports, setDownloadingReports] = useState<Set<string>>(() => new Set())
	const { isAuthenticated } = useConvexAuth()
	const reports = useQuery(
		api.reportMutations.getReportsByOrgId,
		isAuthenticated ? {} : 'skip',
	)
	const sortedReports = reports ? [...reports].filter(report => (report.status ?? 'completed') !== 'failed').sort((a, b) => b.createdAt - a.createdAt) : []

	const handleDownload = async (rowId: string, objectKey: string) => {
		setDownloadingReports((current) => new Set(current).add(rowId))
		try {
			const { downloadUrl } = await downloadReport({ data: { objectKey } })

			console.log('Download URL:', downloadUrl)

			window.open(downloadUrl, '_blank')
		} catch {
			toast.error('Could not download report')
		} finally {
			setDownloadingReports((current) => {
				const next = new Set(current)
				next.delete(rowId)
				return next
			})
		}
	}

	return (
		<main className='min-w-0 flex-1'>
			<div className='mx-auto px-4 pb-8 pt-7 md:px-6 lg:px-8'>
				<div className='mb-6 flex flex-wrap items-end justify-between gap-3'>
					<div>
						<h1 className='flex items-center gap-2.5 text-xl font-semibold'>
							<FileText className='size-5 text-primary' />
							Reports
						</h1>
						<p className='mt-1 text-sm text-muted-foreground'>Your generated sustainability reports</p>
					</div>
					{reports !== undefined && <span className='flex items-center gap-2 text-xs font-medium text-primary'>
						<CheckCircle2 className='size-4' />
						{sortedReports?.length ?? 0} available
					</span>}
				</div>

				<section aria-label='Available reports' className='border-y border-border'>
					<div className='hidden grid-cols-[minmax(0,1fr)_120px_150px_210px] items-center gap-4 border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground lg:grid'>
						<span>Report</span>
						<span>Format</span>
						<span>Last updated</span>
						<span className='text-right'>Actions</span>
					</div>
					{reports === undefined ? (
						<LoadingSkeleton variant='reports' count={6} />
					) : sortedReports.length === 0 ? (
						<p className='px-4 py-6 text-sm text-muted-foreground'>No reports have been generated yet.</p>
					) : (
						<ul>
							{sortedReports.map((report) => {
								const lastUpdated = report.completedAt ?? report.startedAt ?? report.createdAt
								const reportStatus = report.status ?? "completed"

								if (reportStatus !== "completed") {
									return null
								}

								return (
									<li
										key={report._id}
										className='grid gap-3 border-b border-border px-2 py-4 last:border-b-0 sm:px-4 lg:grid-cols-[minmax(0,1fr)_120px_150px_210px] lg:items-center lg:gap-4'
									>
										<div className='flex min-w-0 items-start gap-3'>
											<span className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
												<FileCode2 className='size-4.5' />
											</span>
											<div className='min-w-0'>
												<h2 className='wrap-break-word text-sm font-semibold'>
													{report.storage?.fileName ?? "Annual Sustainability Report"}
												</h2>
												<p className='mt-1 text-xs text-muted-foreground'>
													{report.reportingYear} | {report.status}
												</p>
											</div>
										</div>
										<span className='pl-12 text-xs text-muted-foreground lg:pl-0'>XBRL</span>
										<span className='pl-12 text-xs text-muted-foreground lg:pl-0'>{formatReportDate(lastUpdated)}</span>
										<div className='flex items-center gap-2 pl-12 lg:justify-end lg:pl-0'>
											<Button type='button' variant='outline' size='sm' className='h-9 gap-2' disabled={downloadingReports.has(report._id)} onClick={() => handleDownload(report._id, report.storage?.objectKey ?? '')}>
												{downloadingReports.has(report._id) ? <Loader2 className='size-4 animate-spin' /> : <ArrowDownToLine className='size-4' />}
												{downloadingReports.has(report._id) ? 'Downloading...' : 'Download'}
											</Button>
											{/* <Button
												type='button'
												variant='ghost'
												size='icon'
												className='size-9'
												aria-label={`Report bug for ${report.reportingYear}`}
												title='Report a bug'
												disabled
											>
												<Bug className='size-4' />
											</Button> */}
										</div>
									</li>
								)
							})}
						</ul>
					)}
				</section>
			</div>
		</main>
	)
}
