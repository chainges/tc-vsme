import * as React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GlowingCardProps extends React.ComponentProps<typeof Card> {
	glowColor?: 'sky' | 'teal' | 'rose' | 'amber' | 'pink' | 'copper'
}

const GlowingCard = React.forwardRef<HTMLDivElement, GlowingCardProps>(
	({ className, glowColor = 'sky', style, children, ...props }, ref) => {
		return (
			<Card
				ref={ref}
				style={
					{ ...style, '--glow': `var(--${glowColor})` } as React.CSSProperties
				}
				className={cn(
					'glowing-card h-full border-2 bg-card/90 backdrop-blur-xs',
					className,
				)}
				{...props}
			>
				{children}
			</Card>
		)
	},
)
GlowingCard.displayName = 'GlowingCard'

export {
	GlowingCard,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
}
