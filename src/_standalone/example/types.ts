import type { ComponentProps } from 'svelte';
import Example from './index.svelte';

export type ExampleProps = ComponentProps<Example>;

export const defaultConfig: ExampleProps = {
	error: 'error!',
	info: 'info!',
	success: 'success!'
};

declare global {
	interface Window {
		example: {
			start(config: ExampleProps): void;
			stop(): void;
		};
	}
}
