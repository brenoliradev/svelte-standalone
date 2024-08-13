import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Toasts from './Toasts.svelte';
import { toasts, toast, type Toast } from './store';

import userEvent from '@testing-library/user-event';

describe('Toasts', () => {
	it('renders toast messages from the store', async () => {
		const mockToasts = [
			{ id: 1, type: 'info', dismissible: true, message: 'Toast message 1' },
			{ id: 2, type: 'error', dismissible: false, message: 'Toast message 2' },
			{ id: 3, type: 'info', dismissible: false, message: 'Toast message 3' }
		] satisfies Toast[];

		toasts.set(mockToasts);

		render(Toasts);

		mockToasts.map(({ message }) => expect(screen.getByText(message)).toBeInTheDocument());
	});

	it('handles toast dismissal', async () => {
		const user = userEvent.setup();

		const toastId = 1;
		const mockToasts = [{ id: toastId, type: 'info', message: 'toast message' }] satisfies Toast[];

		toasts.set(mockToasts);

		const { getByText, queryByText, getByRole } = render(Toasts);

		expect(getByText('toast message')).toBeInTheDocument();

		const toastDismissButton = getByRole('button');

		await user.click(toastDismissButton);

		expect(queryByText('toast message')).not.toBeInTheDocument();
	});

	it('does not render when there are no toasts', () => {
		toasts.set([]);

		const { container } = render(Toasts);

		expect(container.querySelector('section')).not.toBeInTheDocument();
	});

	it('should auto-dismiss a toast after the timeout period', async () => {
		toast.info('Auto-dismiss toast', { timeout: 100 }); // Short timeout for test

		render(Toasts);

		// Wait for the timeout period
		await new Promise((resolve) => setTimeout(resolve, 150));

		// Check if the toast has been removed
		expect(screen.queryByText('Auto-dismiss toast')).not.toBeInTheDocument();
	});
});
