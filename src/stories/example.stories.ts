import type { SvelteComponent } from 'svelte';

import type { Meta, StoryObj } from '@storybook/svelte';

import { defaultConfig, type ConfigProps } from '@/_widgets/example/types';

import Example from '@/_widgets/example/index.svelte';

export default {
	title: 'Widgets/Example',
	component: Example
} satisfies Meta<SvelteComponent<ConfigProps>>;

export const exampleStory: StoryObj<SvelteComponent<ConfigProps>> = {
	args: defaultConfig
};
