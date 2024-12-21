import type { Meta, StoryObj } from '@storybook/svelte';

import Example from '@/_standalone/example/index.svelte';
import { defaultConfig } from '@/_standalone/example/config';

export default {
	title: 'Standalone/Example',
	component: Example
} satisfies Meta<Example>;

export const exampleStory: StoryObj<Example> = {
	args: defaultConfig
};
