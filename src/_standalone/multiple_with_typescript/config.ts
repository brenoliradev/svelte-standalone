import type { ComponentProps } from 'svelte';
import type { MultipleEmbedWindow } from 'svelte-standalone';

import Multiple_with_typescript from './index.svelte';

export type Multiple_with_typescriptProps = ComponentProps<Multiple_with_typescript>;

export const defaultConfig: Multiple_with_typescriptProps = {};

declare global {
	interface Window extends MultipleEmbedWindow<Multiple_with_typescript, 'multiple_with_typescript'> {}
}