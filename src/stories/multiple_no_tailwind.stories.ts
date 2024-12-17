import type { Meta, StoryObj } from '@storybook/svelte';
import { defaultConfig } from '@/_standalone/multiple_no_tailwind/config';
import Multiple_no_tailwind from '@/_standalone/multiple_no_tailwind/index.svelte';

export default {
	title: 'Standalone/Multiple_no_tailwind',
	component: Multiple_no_tailwind
} satisfies Meta<Multiple_no_tailwind>;

export const Multiple_no_tailwindStory: StoryObj<Multiple_no_tailwind> = {
	args: defaultConfig
};
