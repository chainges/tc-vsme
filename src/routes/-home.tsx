import { Show, SignUpButton } from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'
import {
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronRight,
	FileText,
	Leaf,
	Lock,
	Users2,
} from 'lucide-react'
import { useState } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { GlowingCard } from '@/components/ui/GlowingCard'
import { ContactForm } from '@/lib/forms/forms/ContactForm'
import { m } from '@/paraglide/messages'

/**
 * Illustrative Hero Graphic
 * Represents the 4 VSME modules flowing into the automated EFRAG verification engine.
 */
function SatelliteCard({
	x,
	y,
	color,
	icon,
	title,
	module,
	progress,
	tag,
}: {
	x: number
	y: number
	color: 'teal' | 'sky' | 'copper' | 'amber'
	icon: React.ReactNode
	title: string
	module: string
	progress: number
	tag: string
}) {
	return (
		<g transform={`translate(${x}, ${y})`}>
			<rect
				width="150"
				height="74"
				rx="12"
				fill="currentColor"
				className="text-card"
				stroke="currentColor"
				strokeWidth="1"
				strokeOpacity="0.3"
			/>
			<rect
				x="8"
				y="8"
				width="28"
				height="28"
				rx="6"
				fill={`var(--${color})`}
				fillOpacity="0.15"
			/>
			{icon}
			<text
				x="44"
				y="20"
				className="text-xs font-bold fill-foreground font-title"
			>
				{title}
			</text>
			<text x="44" y="32" className="text-[10px] fill-muted-foreground">
				{module}
			</text>
			<rect
				x="10"
				y="48"
				width="130"
				height="5"
				rx="2.5"
				fill="currentColor"
				className="text-muted"
			/>
			<rect
				x="10"
				y="48"
				width={progress}
				height="5"
				rx="2.5"
				fill={`var(--${color})`}
			/>
			<text
				x="10"
				y="65"
				className={`text-[9px] fill-(--${color}) font-mono font-semibold`}
			>
				{tag}
			</text>
		</g>
	)
}

function HeroIllustration() {
	return (
		<div className="relative w-full aspect-4/3 max-w-140 mx-auto flex items-center justify-center select-none">
			{/* Ambient Backlight Glow */}
			<div className="absolute inset-0 bg-linear-to-tr from-(--teal)/20 via-(--sky)/20 to-(--copper)/15 rounded-3xl blur-2xl -z-10" />

			{/* Main Vector Diagram Canvas */}
			<svg
				viewBox="0 0 500 380"
				className="w-full h-full drop-shadow-xl"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				{/* Background Grid Pattern */}
				<defs>
					<pattern
						id="hero-grid"
						width="24"
						height="24"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 24 0 L 0 0 0 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
							className="text-border/40"
						/>
					</pattern>
					<linearGradient id="core-glow" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--teal)" stopOpacity="0.8" />
						<stop offset="100%" stopColor="var(--sky)" stopOpacity="0.8" />
					</linearGradient>
					<linearGradient id="card-glow" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="var(--copper)" stopOpacity="0.7" />
						<stop offset="100%" stopColor="var(--amber)" stopOpacity="0.7" />
					</linearGradient>
				</defs>

				<rect
					width="500"
					height="380"
					rx="20"
					fill="currentColor"
					className="text-card/80"
					stroke="currentColor"
					strokeWidth="1"
					strokeOpacity="0.2"
				/>
				<rect width="500" height="380" rx="20" fill="url(#hero-grid)" />

				{/* Connecting Data Flow Lines */}
				<path
					d="M 120 90 Q 250 120 250 190"
					stroke="var(--sky)"
					strokeWidth="2"
					strokeDasharray="4 4"
					strokeOpacity="0.6"
				/>
				<path
					d="M 380 90 Q 250 120 250 190"
					stroke="var(--teal)"
					strokeWidth="2"
					strokeDasharray="4 4"
					strokeOpacity="0.6"
				/>
				<path
					d="M 120 290 Q 250 260 250 190"
					stroke="var(--copper)"
					strokeWidth="2"
					strokeDasharray="4 4"
					strokeOpacity="0.6"
				/>
				<path
					d="M 380 290 Q 250 260 250 190"
					stroke="var(--amber)"
					strokeWidth="2"
					strokeDasharray="4 4"
					strokeOpacity="0.6"
				/>

				{/* Central Core: EFRAG VSME Engine */}
				<circle
					cx="250"
					cy="190"
					r="54"
					fill="currentColor"
					className="text-background"
					stroke="url(#core-glow)"
					strokeWidth="3"
				/>
				<circle
					cx="250"
					cy="190"
					r="44"
					fill="currentColor"
					className="text-muted/40"
				/>

				{/* Core Icon & Badge */}
				<g transform="translate(232, 172)">
					<rect
						width="36"
						height="36"
						rx="8"
						fill="var(--teal)"
						fillOpacity="0.15"
					/>
					<path
						d="M 10 18 L 16 24 L 27 12"
						stroke="var(--teal)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<text
					x="250"
					y="222"
					textAnchor="middle"
					className="text-[11px] font-bold fill-foreground font-mono tracking-wider"
				>
					EFRAG VSME
				</text>
				<text
					x="250"
					y="234"
					textAnchor="middle"
					className="text-[9px] fill-muted-foreground font-mono"
				>
					VERIFISERT
				</text>

				{/* Satellite Card 1: Miljø & Klima (Top-Left) */}
				<SatelliteCard
					x={40}
					y={50}
					color="teal"
					icon={
						<circle
							cx="22"
							cy="22"
							r="6"
							stroke="var(--teal)"
							strokeWidth="2"
						/>
					}
					title="Miljø & Klima (E)"
					module="Scope 1, 2 & 3"
					progress={98}
					tag="-18% tCO₂e oppnådd"
				/>

				{/* Satellite Card 2: Sosiale Forhold (Top-Right) */}
				<SatelliteCard
					x={310}
					y={50}
					color="sky"
					icon={
						<>
							<path
								d="M 16 26 C 16 22, 28 22, 28 26"
								stroke="var(--sky)"
								strokeWidth="1.5"
							/>
							<circle
								cx="22"
								cy="18"
								r="3.5"
								stroke="var(--sky)"
								strokeWidth="1.5"
							/>
						</>
					}
					title="Sosialt (S)"
					module="HMS & Likestilling"
					progress={115}
					tag="50/50 Kjønnsbalanse"
				/>

				{/* Satellite Card 3: Generell Info (Bottom-Left) */}
				<SatelliteCard
					x={40}
					y={250}
					color="copper"
					icon={
						<rect
							x="17"
							y="16"
							width="10"
							height="12"
							rx="1"
							stroke="var(--copper)"
							strokeWidth="1.5"
						/>
					}
					title="Virksomhet (B1)"
					module="Forretningsmodell"
					progress={130}
					tag="100% Fullført mal"
				/>

				{/* Satellite Card 4: Virksomhetsstyring (Bottom-Right) */}
				<SatelliteCard
					x={310}
					y={250}
					color="amber"
					icon={
						<path
							d="M 22 15 L 28 18 L 28 23 C 28 26, 22 29, 22 29 C 22 29, 16 26, 16 23 L 16 18 Z"
							stroke="var(--amber)"
							strokeWidth="1.5"
						/>
					}
					title="Styring & Etikk (G)"
					module="Anti-korrupsjon"
					progress={125}
					tag="Revisjonsklar rapport"
				/>
			</svg>
		</div>
	)
}

export default function Home() {
	const [companyEmployees, setCompanyEmployees] = useState(25)

	// Kalkulasjoner for interaktiv ROI-kalkulator
	const manualHours = Math.round(companyEmployees * 3.2 + 40)
	const vsmeHours = Math.round(manualHours * 0.15)
	const savedHours = manualHours - vsmeHours
	const savedCostKr = Math.round(savedHours * 950)

	return (
		<div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-(--teal)/20 selection:text-(--teal)">
			{/* Ambient Gradient Background */}
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-(--sky)/15 rounded-full blur-[120px] opacity-70" />
				<div className="absolute top-[30%] left-[-10%] w-125 h-125 bg-(--teal)/15 rounded-full blur-[130px] opacity-60" />
				<div className="absolute bottom-[-5%] right-[10%] w-150 h-150 bg-(--copper)/10 rounded-full blur-[140px] opacity-50" />
			</div>

			{/* Hero Section */}
			<section className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden">
				<div className="container mx-auto px-4 md:px-6 relative z-10">
					<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
						{/* Left Content Column */}
						<div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">
							{/* Announcement Badge */}
							<div className="inline-flex items-center gap-2 rounded-full border border-(--teal)/30 bg-(--teal)/10 px-3.5 py-1 text-xs md:text-sm font-medium text-(--teal) mb-6 backdrop-blur-md">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--teal) opacity-75" />
									<span className="relative inline-flex rounded-full h-2 w-2 bg-(--teal)" />
								</span>
								{m.landing_hero_badge()}
								<ChevronRight className="h-3.5 w-3.5 ml-0.5 opacity-80" />
							</div>

							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.12] font-title">
								{m.landing_hero_title_prefix()}{' '}
								<span className="text-transparent bg-clip-text bg-linear-to-r from-(--teal) via-(--sky) to-(--copper)">
									{m.landing_hero_title_highlight()}
								</span>{' '}
								{m.landing_hero_title_suffix()}
							</h1>

							<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
								{m.landing_hero_subtitle()}
							</p>

							{/* Hero CTA Group with Clerk Sign-up Modal & Flow */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
								{/* Signed-out state: Opens Clerk Sign-Up modal */}
								<Show when="signed-out">
									<SignUpButton mode="modal" fallbackRedirectUrl="/app">
										<Button
											size="lg"
											className="btn-tactile bg-linear-to-r from-(--teal) to-(--sky) hover:opacity-95 text-white border-0 shadow-lg shadow-(--teal)/20 text-base font-semibold px-7 h-12"
										>
											{m.landing_cta_start()}
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</SignUpButton>
								</Show>

								{/* Signed-in state: Direct link to /app dashboard */}
								<Show when="signed-in">
									<Button
										asChild
										size="lg"
										className="btn-tactile bg-linear-to-r from-(--teal) to-(--sky) hover:opacity-95 text-white border-0 shadow-lg shadow-(--teal)/20 text-base font-semibold px-7 h-12"
									>
										<Link to="/app">
											{m.landing_cta_dashboard()}
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</Button>
								</Show>

								<Button
									asChild
									size="lg"
									variant="outline"
									className="btn-tactile border-border hover:bg-muted/60 text-foreground font-medium text-base px-6 h-12"
								>
									<a href="#features">{m.landing_cta_features()}</a>
								</Button>
							</div>

							{/* Trust Indicators */}
							<div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs md:text-sm text-muted-foreground">
								<div className="flex items-center gap-1.5">
									<CheckCircle2 className="h-4 w-4 text-(--teal) shrink-0" />
									<span>{m.landing_trust_no_lockin()}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<CheckCircle2 className="h-4 w-4 text-(--teal) shrink-0" />
									<span>{m.landing_trust_compliant()}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<CheckCircle2 className="h-4 w-4 text-(--teal) shrink-0" />
									<span>{m.landing_trust_approved()}</span>
								</div>
							</div>
						</div>

						{/* Right Content: Modern Illustrative Hero Graphic */}
						<div className="flex-1 w-full max-w-155 lg:max-w-none">
							<HeroIllustration />
						</div>
					</div>
				</div>
			</section>

			{/* Trusted Partners Section */}
			<section className="py-12 border-y border-border/50 bg-muted/25">
				<div className="container mx-auto px-4 text-center">
					<p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">
						{m.landing_partners_title()}
					</p>
					<div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75">
						{[
							'Dot Duozink',
							'Solberg Industrier',
							'Fjell Technology Group',
							'NOT Process',
							'Scope321 Partner',
						].map((name) => (
							<span
								key={name}
								className="text-base md:text-lg font-bold font-title text-muted-foreground/70 hover:text-foreground transition-colors duration-160 cursor-default"
							>
								{name}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* The 4 Pillars of VSME Reporting */}
			<section id="features" className="py-20 md:py-28 relative">
				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<Badge
							variant="outline"
							className="mb-4 border-(--teal)/40 text-(--teal) bg-(--teal)/5"
						>
							{m.landing_pillars_badge()}
						</Badge>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-title">
							{m.landing_pillars_title()}
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{m.landing_pillars_subtitle()}
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								color: 'sky' as const,
								icon: FileText,
								title: m.landing_pillar_b1_title,
								module: m.landing_pillar_b1_module,
								desc: m.landing_pillar_b1_desc,
								tag: m.landing_pillar_b1_tag,
							},
							{
								color: 'teal' as const,
								icon: Leaf,
								title: m.landing_pillar_b3_title,
								module: m.landing_pillar_b3_module,
								desc: m.landing_pillar_b3_desc,
								tag: m.landing_pillar_b3_tag,
							},
							{
								color: 'copper' as const,
								icon: Users2,
								title: m.landing_pillar_b8_title,
								module: m.landing_pillar_b8_module,
								desc: m.landing_pillar_b8_desc,
								tag: m.landing_pillar_b8_tag,
							},
							{
								color: 'amber' as const,
								icon: Lock,
								title: m.landing_pillar_b12_title,
								module: m.landing_pillar_b12_module,
								desc: m.landing_pillar_b12_desc,
								tag: m.landing_pillar_b12_tag,
							},
						].map((pillar) => (
							<GlowingCard
								key={pillar.color}
								glowColor={pillar.color}
								className="flex flex-col justify-between"
							>
								<CardHeader>
									<div
										className={`w-12 h-12 rounded-xl bg-(--${pillar.color})/10 text-(--${pillar.color}) flex items-center justify-center mb-3`}
									>
										<pillar.icon className="h-6 w-6" />
									</div>
									<CardTitle className="text-xl">{pillar.title()}</CardTitle>
									<CardDescription className="text-sm">
										{pillar.module()}
									</CardDescription>
								</CardHeader>
								<CardContent className="text-sm text-muted-foreground space-y-2">
									<p>{pillar.desc()}</p>
								</CardContent>
								<CardFooter
									className={`pt-0 text-xs font-semibold text-(--${pillar.color}) flex items-center gap-1`}
								>
									<span>{pillar.tag()}</span>
								</CardFooter>
							</GlowingCard>
						))}
					</div>
				</div>
			</section>

			{/* Interactive ROI & Savings Calculator */}
			<section
				className="py-20 bg-muted/40 border-y border-border/60 relative"
				id="roi-calculator"
			>
				<div className="container mx-auto px-4 md:px-6 max-w-5xl">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<Badge
							variant="outline"
							className="mb-3 border-(--copper)/50 text-(--copper) bg-(--copper)/5"
						>
							{m.landing_roi_badge()}
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">
							{m.landing_roi_title()}
						</h2>
						<p className="text-muted-foreground">{m.landing_roi_subtitle()}</p>
					</div>

					<div className="grid md:grid-cols-12 gap-8 items-center bg-card p-6 md:p-10 rounded-2xl border shadow-md">
						{/* Slider Control */}
						<div className="md:col-span-7 space-y-6">
							<div>
								<div className="flex justify-between items-center mb-2">
									<label
										htmlFor="employees-slider"
										className="text-sm font-semibold text-foreground"
									>
										{m.landing_roi_employees_label()}
									</label>
									<span className="text-2xl font-bold font-mono text-(--teal)">
										{companyEmployees}
									</span>
								</div>
								<input
									id="employees-slider"
									type="range"
									min="5"
									max="150"
									step="5"
									value={companyEmployees}
									onChange={(e) => setCompanyEmployees(Number(e.target.value))}
									className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-(--teal)"
								/>
								<div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
									<span>5</span>
									<span>50</span>
									<span>150</span>
								</div>
							</div>

							<div className="space-y-3 pt-2 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500" />
									<span>{m.landing_roi_benefit_1()}</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500" />
									<span>{m.landing_roi_benefit_2()}</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-green-500" />
									<span>{m.landing_roi_benefit_3()}</span>
								</div>
							</div>
						</div>

						{/* Results Card */}
						<div className="md:col-span-5 bg-muted/40 p-6 rounded-xl border border-border/80 flex flex-col justify-between space-y-6">
							<div>
								<span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
									{m.landing_roi_annual_savings()}
								</span>
								<p className="text-3xl lg:text-4xl font-extrabold text-(--teal) mt-2 font-mono">
									ca. {savedCostKr.toLocaleString('no-NO')} kr
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									{m.landing_roi_savings_disclaimer()}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
								<div>
									<span className="text-xs text-muted-foreground block">
										{m.landing_roi_time_saved()}
									</span>
									<span className="text-xl font-bold font-mono text-foreground">
										{savedHours} t
									</span>
								</div>
								<div>
									<span className="text-xs text-muted-foreground block">
										{m.landing_roi_time_with_platform()}
									</span>
									<span className="text-xl font-bold font-mono text-foreground">
										{vsmeHours} t
									</span>
								</div>
							</div>

							<Show when="signed-out">
								<SignUpButton mode="modal" fallbackRedirectUrl="/app">
									<Button className="btn-tactile w-full bg-(--teal) hover:bg-(--teal)/90 text-white font-semibold">
										{m.landing_roi_cta()}
									</Button>
								</SignUpButton>
							</Show>

							<Show when="signed-in">
								<Button
									asChild
									className="btn-tactile w-full bg-(--teal) hover:bg-(--teal)/90 text-white font-semibold"
								>
									<Link to="/app">{m.landing_cta_dashboard()}</Link>
								</Button>
							</Show>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-20 md:py-28" id="pricing">
				<div className="container px-4 text-center max-w-5xl mx-auto">
					<Badge
						variant="outline"
						className="mb-4 border-(--teal)/50 text-(--teal) bg-(--teal)/5"
					>
						{m.landing_pricing_badge()}
					</Badge>
					<h2 className="text-3xl md:text-5xl font-bold mb-4 font-title">
						{m.landing_pricing_title()}
					</h2>
					<p className="text-muted-foreground mb-14 max-w-2xl mx-auto">
						{m.landing_pricing_subtitle()}
					</p>

					<div className="grid md:grid-cols-3 gap-8 items-stretch text-left">
						{/* Starter */}
						<Card className="card-interactive bg-card flex flex-col justify-between border-border/80">
							<CardHeader>
								<CardTitle className="text-2xl">
									{m.landing_pricing_starter_title()}
								</CardTitle>
								<CardDescription>
									{m.landing_pricing_starter_desc()}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="text-4xl font-bold font-mono">
									{m.landing_pricing_starter_price()}{' '}
									<span className="text-sm font-normal text-muted-foreground">
										{m.landing_pricing_starter_period()}
									</span>
								</div>
								<ul className="space-y-3 text-sm">
									{[
										'1 Brukerlisens',
										'Standard VSME-rapport (B1-B12)',
										'Scope 1 & 2 beregninger',
										'E-post support',
										'Årlig oppdatering',
									].map((feat) => (
										<li key={feat} className="flex items-center gap-2.5">
											<Check className="h-4 w-4 text-green-600 shrink-0" />
											<span className="text-muted-foreground">{feat}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Show when="signed-out">
									<SignUpButton mode="modal" fallbackRedirectUrl="/app">
										<Button variant="outline" className="btn-tactile w-full">
											{m.landing_pricing_starter_cta()}
										</Button>
									</SignUpButton>
								</Show>
								<Show when="signed-in">
									<Button
										asChild
										variant="outline"
										className="btn-tactile w-full"
									>
										<Link to="/app">{m.landing_cta_dashboard()}</Link>
									</Button>
								</Show>
							</CardFooter>
						</Card>

						{/* Growth (Highlighted) */}
						<GlowingCard
							glowColor="teal"
							className="flex flex-col justify-between relative scale-102 z-10"
						>
							<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-(--teal) text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
								{m.landing_pricing_growth_badge()}
							</div>
							<CardHeader>
								<CardTitle className="text-2xl text-(--teal)">
									{m.landing_pricing_growth_title()}
								</CardTitle>
								<CardDescription>
									{m.landing_pricing_growth_desc()}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="text-4xl font-bold font-mono">
									{m.landing_pricing_growth_price()}{' '}
									<span className="text-sm font-normal text-muted-foreground">
										{m.landing_pricing_growth_period()}
									</span>
								</div>
								<ul className="space-y-3 text-sm">
									{[
										'5 Brukerlisenser',
										'Komplett Scope 1, 2 og vesentlig Scope 3',
										'Automatisk integrasjon mot Brønnøysund',
										'Eksport til revisjonsklar PDF & Excel',
										'Prioritert support og rådgivning',
									].map((feat) => (
										<li key={feat} className="flex items-center gap-2.5">
											<Check className="h-4 w-4 text-(--teal) shrink-0" />
											<span className="font-medium text-foreground">
												{feat}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Show when="signed-out">
									<SignUpButton mode="modal" fallbackRedirectUrl="/app">
										<Button className="btn-tactile w-full bg-(--teal) hover:bg-(--teal)/90 text-white font-semibold shadow-md shadow-(--teal)/20">
											{m.landing_pricing_growth_cta()}
										</Button>
									</SignUpButton>
								</Show>
								<Show when="signed-in">
									<Button
										asChild
										className="btn-tactile w-full bg-(--teal) hover:bg-(--teal)/90 text-white font-semibold shadow-md shadow-(--teal)/20"
									>
										<Link to="/app">{m.landing_cta_dashboard()}</Link>
									</Button>
								</Show>
							</CardFooter>
						</GlowingCard>

						{/* Enterprise */}
						<Card className="card-interactive bg-card flex flex-col justify-between border-border/80">
							<CardHeader>
								<CardTitle className="text-2xl">
									{m.landing_pricing_enterprise_title()}
								</CardTitle>
								<CardDescription>
									{m.landing_pricing_enterprise_desc()}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="text-4xl font-bold font-mono">
									{m.landing_pricing_enterprise_price()}
								</div>
								<ul className="space-y-3 text-sm">
									{[
										'Ubegrenset antall brukere',
										'Flere juridiske enheter / selskaper',
										'Dedikert bærekraftsrådgiver',
										'Skreddersydde API- og ERP-integrasjoner',
										'Revisjonsbistand og SLA',
									].map((feat) => (
										<li key={feat} className="flex items-center gap-2.5">
											<Check className="h-4 w-4 text-(--copper) shrink-0" />
											<span className="text-muted-foreground">{feat}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button
									asChild
									variant="outline"
									className="btn-tactile w-full"
								>
									<Link to="/" hash="contact">
										{m.landing_pricing_enterprise_cta()}
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20 bg-muted/20 border-t border-border/60">
				<div className="container px-4 md:px-6 max-w-3xl mx-auto">
					<div className="text-center mb-12">
						<Badge
							variant="outline"
							className="mb-3 border-(--teal)/40 text-(--teal)"
						>
							{m.landing_faq_badge()}
						</Badge>
						<h2 className="text-3xl font-bold mb-3 font-title">
							{m.landing_faq_title()}
						</h2>
						<p className="text-muted-foreground text-sm">
							{m.landing_faq_subtitle()}
						</p>
					</div>

					<Accordion type="single" collapsible className="w-full space-y-3">
						<AccordionItem
							value="item-1"
							className="border last:border-b rounded-xl px-5 bg-card shadow-xs overflow-hidden"
						>
							<AccordionTrigger className="text-base font-medium hover:no-underline hover:text-(--teal) py-4">
								{m.landing_faq_q1()}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
								{m.landing_faq_a1()}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-2"
							className="border last:border-b rounded-xl px-5 bg-card shadow-xs overflow-hidden"
						>
							<AccordionTrigger className="text-base font-medium hover:no-underline hover:text-(--teal) py-4">
								{m.landing_faq_q2()}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
								{m.landing_faq_a2()}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-3"
							className="border last:border-b rounded-xl px-5 bg-card shadow-xs overflow-hidden"
						>
							<AccordionTrigger className="text-base font-medium hover:no-underline hover:text-(--teal) py-4">
								{m.landing_faq_q3()}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
								{m.landing_faq_a3()}
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-4"
							className="border last:border-b rounded-xl px-5 bg-card shadow-xs overflow-hidden"
						>
							<AccordionTrigger className="text-base font-medium hover:no-underline hover:text-(--teal) py-4">
								{m.landing_faq_q4()}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
								{m.landing_faq_a4()}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>

			{/* Contact / Onboarding Section */}
			<section id="contact" className="py-20 md:py-28 relative">
				<div className="container px-4 text-center max-w-3xl mx-auto">
					<div className="mb-12">
						<Badge
							variant="outline"
							className="mb-3 border-(--teal)/40 text-(--teal) bg-(--teal)/5"
						>
							{m.landing_contact_badge()}
						</Badge>
						<h2 className="text-3xl md:text-5xl font-bold mb-4 font-title">
							{m.landing_contact_title()}
						</h2>
						<p className="text-lg text-muted-foreground">
							{m.landing_contact_subtitle()}
						</p>
					</div>

					<div className="text-left bg-card p-6 md:p-10 rounded-2xl border shadow-lg border-border/80">
						<ContactForm />
					</div>
				</div>
			</section>

			{/* Clean Footer */}
			<footer className="border-t border-border/60 py-12 bg-muted/30 text-xs text-muted-foreground">
				<div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2 font-mono">
						<span className="font-bold text-foreground font-title text-sm">
							Scope321 TC-VSME
						</span>
						<span>
							© {new Date().getFullYear()} {m.landing_footer_rights()}
						</span>
					</div>
					<div className="flex gap-6">
						<a
							href="#features"
							className="hover:text-foreground transition-colors"
						>
							{m.landing_cta_features()}
						</a>
						<a
							href="#pricing"
							className="hover:text-foreground transition-colors"
						>
							{m.landing_pricing_badge()}
						</a>
						<a
							href="#contact"
							className="hover:text-foreground transition-colors"
						>
							{m.landing_contact_badge()}
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}
