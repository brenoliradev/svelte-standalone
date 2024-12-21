import type { ComponentProps } from 'svelte';
import type { EmbedWindow } from 'svelte-standalone';

import Update_prop_with_window from './index.svelte';

export type Update_prop_with_windowProps = ComponentProps<Update_prop_with_window>;

export const defaultConfig: Update_prop_with_windowProps = {
	greet: "thank you for using svelte-standalone!"
};

declare global {
	interface Window extends EmbedWindow<Update_prop_with_window, 'update_prop_with_window'> {}
}