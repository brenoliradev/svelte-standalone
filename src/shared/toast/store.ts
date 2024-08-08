import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id: number;
	message: string;
	type: ToastType;
	dismissible?: boolean;
	timeout?: number;
};

export const toasts = writable<Toast[]>([]);

const timeoutIds = new Map<number, ReturnType<typeof setTimeout>>();

const addToast = (toast: Omit<Toast, 'id'>) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000);

	// Setup some sensible defaults for a toast.
	const innerToast = {
		id,
		dismissible: true,
		timeout: 3000,
		...toast
	} satisfies Toast & { id: number };

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [innerToast, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (innerToast.timeout && innerToast.dismissible) {
		const timeoutId = setTimeout(() => {
			dismissToast(id);
			timeoutIds.delete(id);
		}, innerToast.timeout);
		timeoutIds.set(id, timeoutId);
	}
};

// Function to dismiss a toast and clear the timeout if it exists
export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((toast) => toast.id !== id));
	if (timeoutIds.has(id)) {
		clearTimeout(timeoutIds.get(id));
		timeoutIds.delete(id);
	}
};

export const toast: {
	[type in ToastType]: (m: string, config?: Omit<Toast, 'type' | 'message' | 'id'>) => void;
} = {
	error: (m, t) =>
		addToast({
			...t,
			type: 'error',
			message: m
		}),
	info: (m, t) =>
		addToast({
			...t,
			type: 'info',
			message: m
		}),
	success: (m, t) =>
		addToast({
			...t,
			type: 'success',
			message: m
		})
};
