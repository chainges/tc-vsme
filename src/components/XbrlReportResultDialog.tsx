import { Bug, CheckCircle2, Download, TriangleAlert } from 'lucide-react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import { useState } from 'react'
import { reportXbrlBug } from '@/lib/report/report-xbrl-bug'

type TerminalReportStatus = 'completed' | 'failed'

export default function XbrlReportResultDialog({
	status,
	reportId,
	downloadUrl,
	open,
	onOpenChange,
}: {
	status: TerminalReportStatus
	reportId: string
	downloadUrl?: string
	open: boolean
	onOpenChange: (open: boolean) => void
}) {
	const isCompleted = status === 'completed'
	const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

	const handleReportBug = async () => {
		setSendStatus('sending')

		try {
			const result = await reportXbrlBug({ data: { reportId } })
			if (result.status !== 'ok') {
				setSendStatus('error')
				return
			}
			const form = new FormData()
			form.append('access_key', result.accessKey)
			form.append('subject', 'XBRL report generation issue')
			form.append('message', result.message)

			const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: form })
			const responseData: { success?: boolean } = await response.json()

			setSendStatus(response.ok && responseData.success === true ? 'sent' : 'error')
		} catch {
			setSendStatus('error')
		}
	}

	return (
		<AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
			<AlertDialogPrimitive.Portal>
				<AlertDialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
				<AlertDialogPrimitive.Content className='fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'>
					<div className='flex flex-col gap-2 text-center '>
						<div
							className={`mb-1 flex size-11 items-center justify-center rounded-full ${isCompleted ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}
						>
							{isCompleted ? (
								<CheckCircle2 aria-hidden='true' className='size-4' />
							) : (
								<TriangleAlert aria-hidden='true' className='size-4' />
							)}
						</div>

						<AlertDialogPrimitive.Title className=' text-sm font-semibold'>
							{isCompleted ? "Your report is ready" : "Report generation failed"}
						</AlertDialogPrimitive.Title>

						<AlertDialogPrimitive.Description className='text-sm text-muted-foreground'>
							{isCompleted
								? downloadUrl
									? "Your XBRL report was generated successfully and is ready to download."
									: "Your report completed, but its download link is not available. Please try again later."
								: "We couldn't generate your XBRL report. You can dismiss this message or report the issue to the team."}
						</AlertDialogPrimitive.Description>
						{sendStatus === "sent" ? (
							<output className='text-sm text-success'>Issue reported to the team.</output>
						) : sendStatus === "error" ? (
							<p role='alert' className='text-sm text-destructive'>
								Could not send the report. Please try again.
							</p>
						) : null}
					</div>
					<div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
						<AlertDialogPrimitive.Cancel className='inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
							Close
						</AlertDialogPrimitive.Cancel>
						{isCompleted && downloadUrl ? (
							<AlertDialogPrimitive.Action
								asChild
								className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
							>
								<a href={downloadUrl} target='_blank' rel='noopener noreferrer' aria-label='Download report'>
									<Download aria-hidden='true' className='size-4' />
									Download Report
								</a>
							</AlertDialogPrimitive.Action>
						) : null}
						{!isCompleted ? (
							<button
								type='button'
								onClick={handleReportBug}
								disabled={sendStatus === "sending" || sendStatus === "sent"}
								aria-label='Report bug'
								className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
							>
								<Bug aria-hidden='true' className='size-4' />
								{sendStatus === "sending" ? "Sending..." : "Report Bug"}
							</button>
						) : null}
					</div>
				</AlertDialogPrimitive.Content>
			</AlertDialogPrimitive.Portal>
		</AlertDialogPrimitive.Root>
	)
}
