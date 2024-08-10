import type { Meta, StoryObj } from '@storybook/svelte';

import Example from '@/_widgets/example/index.svelte';
import { defaultConfig } from '@/_widgets/example/types';

export default {
	title: 'Widgets/Example',
	component: Example
} satisfies Meta<Example>;

export const exampleStory: StoryObj<Example> = {
	args: defaultConfig
};
