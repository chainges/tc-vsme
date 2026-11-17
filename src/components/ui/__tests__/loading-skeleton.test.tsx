import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LoadingSkeleton } from '../loading-skeleton'

afterEach(cleanup)

describe('LoadingSkeleton', () => {
	it.each([1, 3, 5, 6, 7])('renders %i form card placeholders', (count) => {
		render(<LoadingSkeleton count={count} variant='cards' />)
		expect(screen.getByRole('status').querySelectorAll('[data-loading-item]')).toHaveLength(count)
	})

	it('renders four readiness area placeholders', () => {
		render(<LoadingSkeleton count={4} variant='readiness' />)
		expect(screen.getByRole('status').querySelectorAll('[data-loading-item]')).toHaveLength(4)
	})

	it('renders six report row placeholders', () => {
		render(<LoadingSkeleton count={6} variant='reports' />)
		expect(screen.getByRole('status').querySelectorAll('[data-loading-item]')).toHaveLength(6)
	})

	it('renders one form placeholder by default', () => {
		render(<LoadingSkeleton />)
		expect(screen.getByRole('status').querySelectorAll('[data-loading-item]')).toHaveLength(1)
	})
})