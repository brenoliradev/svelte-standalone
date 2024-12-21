import type { ComponentProps } from 'svelte';
import type { EmbedWindow } from 'svelte-standalone';

import Example from './index.svelte';

export type ExampleProps = ComponentProps<Example>;

export const defaultConfig: ExampleProps = {
	error: 'error!',
	info: 'info!',
	success: 'success!'
};

declare global {
	interface Window extends EmbedWindow<Example, 'example'> {}
}
