import Target_no_tailwind from './index.svelte';

import type { TargetEmbeddedWindow } from 'svelte-standalone';

declare global {
	interface Window extends TargetEmbeddedWindow<Target_no_tailwind, "target_no_tailwind"> {}
}