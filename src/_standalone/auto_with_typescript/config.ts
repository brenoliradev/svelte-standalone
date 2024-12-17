import Auto_with_typescript from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<Auto_with_typescript, "auto_with_typescript"> {}
}