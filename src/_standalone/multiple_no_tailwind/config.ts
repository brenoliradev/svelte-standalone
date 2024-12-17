import type { ComponentProps } from 'svelte';
import type { MultipleEmbedWindow } from 'svelte-standalone';

import Multiple_no_tailwind from './index.svelte';

export type Multiple_no_tailwindProps = ComponentProps<Multiple_no_tailwind>;

export const defaultConfig: Multiple_no_tailwindProps = {};

declare global {
	interface Window extends MultipleEmbedWindow<Multiple_no_tailwind, 'multiple_no_tailwind'> {}
}