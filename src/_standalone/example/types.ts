import type { ComponentProps } from 'svelte';
import Example from './index.svelte';

export type ExampleProps = ComponentProps<Example>;

export const defaultConfig: ExampleProps = {
	error: 'error!',
	info: 'info!',
	success: 'success!'
};

export interface CustomWindow extends Window {
	example: {
		start(config: ExampleProps): void;
		stop(): void;
	}
}