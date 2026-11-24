'use client'

import { is } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { BadgeQuestionMarkIcon, Check, ChevronRightIcon, CircleDashed, InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useExpandable } from '@/hooks/use-expandable'
import { cn } from '@/lib/utils'
import { m } from "@/paraglide/messages"
export type FormStatus = 'not_started' | 'draft' | 'submitted'

interface FormCardProps {
	title: string
	status: FormStatus
	updatedDate: string
	contributor: { name: string; image?: string }
	onClick?: () => void
	toolTip: string
	buttonText?: string
	children?: ReactNode
	module?: 'Basic Module' | 'Comprehensive Module'
	isVolunteer?: boolean
	code: string
	version?: number
}

const STATUS_CONFIG: Record<FormStatus, { label: string; className: string }> =
	{
		not_started: {
			label: 'Not Started',
			className:
				'bg-gray-100 border-gray-400 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
		},
		draft: {
			label: 'In Progress',
			className:
				'bg-amber-100 border-amber-600 text-amber-600 dark:bg-amber-800 dark:text-amber-300',
		},
		submitted: {
			label: 'Completed',
			className:
				'bg-emerald-100 border-emerald-600 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300',
		},
	}

export function FormCard({
	title,
	status,
	updatedDate,
	contributor,
	onClick = () => {},
	toolTip,
	buttonText,
	children,
	module,
	code,
	version,
	isVolunteer=false,
}: FormCardProps) {
	const { isExpanded, toggleExpand } = useExpandable()
	const contentRef = useRef<HTMLDivElement>(null)
	const hasHelpButton = Boolean(buttonText)

	const getModuleLabel = (type: 'Basic Module' | 'Comprehensive Module') => {
		switch (type) {
			case 'Basic Module':
				return m["general.basicModule"]()
			case 'Comprehensive Module':
				return m["general.comprehensiveModule"]()
			default:
				return ''
		}
	}

	return (
		<Card
			className={cn(
				"mx-auto w-full transition-all duration-300 hover:shadow-lg gap-2",
				module === "Comprehensive Module" && "",
			)}
		>
			<CardHeader role='button' tabIndex={0}>
				<div className='flex w-full gap-3 flex-row items-center justify-between'>
					{/* Left section */}
					<div className='flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center'>
						{/* Badges */}
						<div className='flex shrink-0 flex-wrap items-center gap-2'>
							<Badge variant={module === "Comprehensive Module" ? "secondary" : "default"}>{code}</Badge>

							{module && (
								<Badge variant={module === "Comprehensive Module" ? "comprehensive" : "basic"}>
									{getModuleLabel(module)}
								</Badge>
							)}
						</div>

						{/* Title and Chevron */}
						<div
							role='button'
							tabIndex={0}
							onClick={toggleExpand}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault()
									toggleExpand()
								}
							}}
							className=' hidden lg:flex min-w-0 cursor-pointer items-center justify-between gap-2'
						>
							<h3 className='min-w-0 wrap-break-word text-lg font-semibold text-secondary md:text-xl'>{title}</h3>

							<ChevronRightIcon
								className={cn("size-5 shrink-0 transition-transform duration-200 md:size-6", isExpanded && "rotate-90")}
							/>
						</div>
					</div>

					{/* Right section */}
					<div className='flex shrink-0 flex-wrap items-center justify-end gap-2'>
						{isVolunteer && <Badge variant='volunteer'>Volunteer</Badge>}

						{hasHelpButton && (
							<Button
								type='button'
								className='hidden h-auto min-h-9 gap-2 whitespace-normal md:inline-flex'
								variant='outline'
								size='default'
								onClick={(e) => {
									e.stopPropagation()
									onClick()
								}}
								onPointerDown={(e) => e.stopPropagation()}
							>
								<BadgeQuestionMarkIcon className='size-5 shrink-0' />
								<span>{buttonText}</span>
							</Button>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div className='space-y-0'>
					<div role='button' tabIndex={0} onClick={toggleExpand} onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault()
									toggleExpand()
								}
							}} className='flex items-center lg:hidden justify-between'>
						<h3 className='min-w-0 wrap-break-word cursor-pointer text-lg font-semibold text-secondary md:text-xl'>{title}</h3>
						<ChevronRightIcon
							className={cn(
								"h-4 w-4 md:h-6 md:w-6 shrink-0 transition-transform duration-200",
								isExpanded && "rotate-90",
							)}
						/>
					</div>

					<motion.div
						initial={false}
						animate={{
							height: isExpanded ? "auto" : 0,
							opacity: isExpanded ? 1 : 0,
						}}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className='overflow-hidden'
					>
						<div ref={contentRef} className='pb-4'>
							{/* Children kept mounted to preserve Convex subscriptions */}
							<div className='space-y-4 pt-2'>
								<div className='space-y-2'>{children}</div>
							</div>
						</div>
					</motion.div>
				</div>
			</CardContent>

			<CardFooter className='flex items-center gap-2'>
				<Badge variant='secondary' className={STATUS_CONFIG[status].className}>
					{status === "draft" ? <CircleDashed /> : <Check className='font-extrabold! shrink-0 mr-1' />}

					{STATUS_CONFIG[status].label}
				</Badge>
				<div className='ml-auto lg:ml-4 text-right wrap-break-word text-xs md:text-sm text-muted-foreground'>
					Updated: {updatedDate}
				</div>
			</CardFooter>
		</Card>
	)
}
