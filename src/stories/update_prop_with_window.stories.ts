import type { Meta, StoryObj } from '@storybook/svelte';
import { defaultConfig } from '@/_standalone/update_prop_with_window/config';
import Update_prop_with_window from '@/_standalone/update_prop_with_window/index.svelte';

export default {
	title: 'Standalone/Update_prop_with_window',
	component: Update_prop_with_window
} satisfies Meta<Update_prop_with_window>;

export const Update_prop_with_windowStory: StoryObj<Update_prop_with_window> = {
	args: defaultConfig
};
