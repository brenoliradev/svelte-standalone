import Body_no_tailwind from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<Body_no_tailwind, "body_no_tailwind"> {}
}