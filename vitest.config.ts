import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'

const alias = {
	'@': fileURLToPath(new URL('./src', import.meta.url)),
}

const tsconfigPaths = viteTsConfigPaths({
	projects: ['./tsconfig.json'],
})

// Vitest sub-projects don't inherit the root `test.exclude` - each project
// must list its own, or globs like `**/*.test.ts` will match test files
// shipped inside node_modules and other nested worktrees.
const commonExclude = ['**/node_modules/**', '**/.output/**', '**/dist/**', '**/.kilo/**', '**/.kilocode/**']

export default defineConfig({
	plugins: [tsconfigPaths],
	test: {
		globals: true,
		setupFiles: [],
		exclude: commonExclude,
		projects: [
			{
				name: 'edge-runtime',
				plugins: [tsconfigPaths],
				resolve: { alias },
				test: {
					environment: 'edge-runtime',
					include: ['convex/**/*.test.{ts,tsx}'],
					exclude: commonExclude,
				},
			},
			{
				name: 'jsdom',
				plugins: [tsconfigPaths],
				resolve: { alias },
				test: {
					globals: true,
					environment: 'jsdom',
					include: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],
					exclude: [...commonExclude, 'convex/**'],
				},
			},
		],
		server: {
			deps: {
				inline: ['convex-test'],
			},
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'.output/',
				'dist/',
				'**/*.config.{ts,js}',
				'**/*.d.ts',
				'**/routeTree.gen.ts',
			],
		},
	},
	resolve: { alias },
})

