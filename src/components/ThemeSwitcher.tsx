import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeSwitcher() {
	const { theme, setTheme, isDark } = useTheme()

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
			title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
			className="min-h-10 min-w-10 md:min-h-8 md:min-w-0"
		>
			{isDark ? (
				<Sun className="size-4" />
			) : (
				<Moon className="size-4" />
			)}
		</Button>
	)
}

