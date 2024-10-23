import { render, fireEvent } from '@testing-library/svelte';
import Toast from '@/shared/toast/Toast.svelte';

import { describe, expect, test, vi } from 'vitest';

import { dismissToast, toast } from './store.svelte';

vi.mock('./store', () => ({
	dismissToast: vi.fn()
}));

describe('Toast Component', () => {
	test('renders success toast', () => {
		const { getByText, container } = render(Toast);

		toast.success('success message')

		expect(container.querySelector('svg.stroke-green-700')).toBeInTheDocument();
		expect(getByText('success message')).toBeInTheDocument();
	});

	test('renders error toast', () => {
		const { getByText, container } = render(Toast);

		toast.error('error message')

		expect(container.querySelector('svg.fill-red-700')).toBeInTheDocument();
		expect(getByText('error message')).toBeInTheDocument();
	});

	test('renders info toast', () => {
		const { getByText, container } = render(Toast);

		toast.info('info message')

		expect(container.querySelector('svg.fill-yellow-600')).toBeInTheDocument();
		expect(getByText('info message')).toBeInTheDocument();
	});

	test('renders and dismisses toast on button click', async () => {
		const { getByText, getByRole } = render(Toast);

		toast.error('dismiss me')

		expect(getByText('dismiss me')).toBeInTheDocument();

		const dismissButton = getByRole('button');

		await fireEvent.click(dismissButton);

		expect(dismissToast).toHaveBeenCalled();
	});
});
