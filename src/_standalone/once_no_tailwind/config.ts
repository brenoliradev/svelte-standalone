import type { ComponentProps } from 'svelte';
import type { EmbedWindow } from 'svelte-standalone';

import Once_no_tailwind from './index.svelte';

export type Once_no_tailwindProps = ComponentProps<Once_no_tailwind>;

export const defaultConfig: Once_no_tailwindProps = {};

declare global {
	interface Window extends EmbedWindow<Once_no_tailwind, 'once_no_tailwind'> {}
}