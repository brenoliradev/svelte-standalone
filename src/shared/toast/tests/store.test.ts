import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';

import { toasts, dismissToast, toast } from '@/shared/toast';

describe('Toast Store', () => {
	beforeEach(() => {
		// Reset the toasts store before each test
		toasts.set([]);
		vi.useRealTimers(); // Ensure real timers are used initially
	});

	it('should add a toast of type "success"', () => {
		toast.success('Success message');

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(1);
		expect(allToasts[0].message).toBe('Success message');
		expect(allToasts[0].type).toBe('success');
	});

	it('should add a toast with a default timeout', () => {
		vi.useFakeTimers();

		toast.info('Info message');

		vi.advanceTimersByTime(3000);

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(0);
	});

	it('should add a toast with a custom timeout', () => {
		toast.info('Info message', { timeout: 5000 });

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(1);
		expect(allToasts[0].timeout).toBe(5000);
	});

	it('should dismiss a toast after the specified timeout', () => {
		vi.useFakeTimers();

		toast.error('Error message', { timeout: 1000 });

		vi.advanceTimersByTime(1000);

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(0);

		vi.useRealTimers();
	});

	it('should manually dismiss a toast', () => {
		toast.success('Dismissable toast');

		let allToasts = get(toasts);
		const toastId = allToasts[0].id;

		dismissToast(toastId);

		allToasts = get(toasts);
		expect(allToasts.length).toBe(0);
	});

	it('should dismiss correct toast', () => {
		toast.success('First');
		toast.success('Second');

		let allToasts = get(toasts);

		const toastId = allToasts[0].id;
		const correctId = allToasts[1].id;

		dismissToast(toastId);

		allToasts = get(toasts);

		expect(allToasts[0].id).toBe(correctId);
	});

	it('should not dismiss a non-dismissible toast', () => {
		vi.useFakeTimers();

		toast.info('Non-dismissible toast', { dismissible: false });

		vi.advanceTimersByTime(3000);

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(1);

		vi.useRealTimers();
	});

	it('timer should dismiss correct timed out toast', () => {
		vi.useFakeTimers();

		toast.info('first-dismissible toast');
		toast.info('second-dismissible toast', { timeout: 6000 });

		vi.advanceTimersByTime(3000);

		const allToasts = get(toasts); // Synchronously get the latest state

		expect(allToasts.length).toBe(1);

		vi.useRealTimers();
	});
});
