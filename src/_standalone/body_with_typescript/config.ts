import Body_with_typescript from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<Body_with_typescript, "body_with_typescript"> {}
}