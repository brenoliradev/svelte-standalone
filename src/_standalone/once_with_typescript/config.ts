import type { ComponentProps } from 'svelte';
import type { EmbedWindow } from 'svelte-standalone';

import Once_with_typescript from './index.svelte';

export type Once_with_typescriptProps = ComponentProps<Once_with_typescript>;

export const defaultConfig: Once_with_typescriptProps = {};

declare global {
	interface Window extends EmbedWindow<Once_with_typescript, 'once_with_typescript'> {}
}