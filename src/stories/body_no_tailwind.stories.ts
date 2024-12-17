import type { Meta, StoryObj } from '@storybook/svelte';
import Body_no_tailwind from '@/_standalone/body_no_tailwind/index.svelte';

export default {
	title: 'Standalone/Body_no_tailwind',
	component: Body_no_tailwind
} satisfies Meta<Body_no_tailwind>;

export const Body_no_tailwindStory: StoryObj<Body_no_tailwind> = {
	args: {} // don't have args since auto-embeddable
};
