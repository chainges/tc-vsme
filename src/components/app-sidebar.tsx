'use client'
import { OrganizationSwitcher } from '@clerk/react'
import { Link } from '@tanstack/react-router'

import {
	LayoutDashboard,
	ClipboardList,
	Leaf,
	Users,
	Scale,
	Cloud,
	Target,
	FileCode2,
	FileText,
	Settings,
} from "lucide-react"
// import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
// import { TeamSwitcher } from '@/components/team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { YearSelector } from '@/components/year-selector'

// This is sample data.
const data = {
	// teams: [
	// 	{
	// 		name: 'Acme Inc',
	// 		logo: GalleryVerticalEnd,
	// 		plan: 'Enterprise',
	// 	},
	// 	{
	// 		name: 'Acme Corp.',
	// 		logo: AudioWaveform,
	// 		plan: 'Startup',
	// 	},
	// 	{
	// 		name: 'Evil Corp.',
	// 		logo: Command,
	// 		plan: 'Free',
	// 	},
	// ],
	navItems: [
		{
			title: "Dashboard",
			url: "/app",
			icon: LayoutDashboard,
		},
		{
			title: "General Information",
			url: "/app/general",
			icon: ClipboardList,
		},
		{
			title: "Environmental",
			url: "/app/environmental",
			icon: Leaf,
		},
		{
			title: "Social",
			url: "/app/social",
			icon: Users,
		},
		{
			title: "Governance",
			url: "/app/governance",
			icon: Scale,
		},
		{
			title: "Emissions",
			url: "/app/emissions",
			icon: Cloud,
		},
		{
			title: "Targets",
			url: "/app/targets",
			icon: Target,
		},
		{
			title: "Generate XBRL",
			url: "/app/generate",
			icon: FileCode2,
		},
		{
			title: "Reports",
			url: "/app/reports",
			icon: FileText,
		},
		{
			title: "Settings",
			url: "/app/settings",
			icon: Settings,
		},

		// {
		// 	title: 'Documentation',
		// 	url: '#',
		// 	icon: BookOpen,
		// 	items: [
		// 		{
		// 			title: 'Introduction',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Get Started',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Tutorials',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Changelog',
		// 			url: '#',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Settings',
		// 	url: '/app/settings',
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: 'General',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Team',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Billing',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Limits',
		// 			url: '#',
		// 		},
		// 	],
		// },
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<OrganizationSwitcher
					hidePersonal
					skipInvitationScreen
					afterSelectOrganizationUrl="/app"
					appearance={{
						elements: {
							rootBox:
								'flex w-full items-center border-b border-sidebar-border pb-2',
							organizationSwitcherTrigger:
								'flex w-full justify-start items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2 rounded-md transition-colors',
							organizationSwitcherTriggerIcon: 'ml-auto shrink-0 w-5 h-5',
						},
					}}
				/>

				<YearSelector />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navItems} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<Link to="/demo">Demo</Link>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
