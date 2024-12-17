import type { Meta, StoryObj } from '@storybook/svelte';
import { defaultConfig } from '@/_standalone/once_no_tailwind/config';
import Once_no_tailwind from '@/_standalone/once_no_tailwind/index.svelte';

export default {
	title: 'Standalone/Once_no_tailwind',
	component: Once_no_tailwind
} satisfies Meta<Once_no_tailwind>;

export const Once_no_tailwindStory: StoryObj<Once_no_tailwind> = {
	args: defaultConfig
};
