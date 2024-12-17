import type { Meta, StoryObj } from '@storybook/svelte';
import Target_no_tailwind from '@/_standalone/target_no_tailwind/index.svelte';

export default {
	title: 'Standalone/Target_no_tailwind',
	component: Target_no_tailwind
} satisfies Meta<Target_no_tailwind>;

export const Target_no_tailwindStory: StoryObj<Target_no_tailwind> = {
	args: {} // don't have args since auto-embeddable
};
