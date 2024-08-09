import type { SvelteComponent } from 'svelte';

import type { Meta, StoryObj } from '@storybook/svelte';
import type { StorybookProps } from './types';

import { defaultConfig, type ConfigProps } from '@/_widgets/example/types';

import Example from '@/_widgets/example/index.svelte';

export default {
	title: 'Widgets/Example',
	component: Example
} satisfies Meta<SvelteComponent<StorybookProps<ConfigProps>>>;

export const exampleStory: StoryObj<SvelteComponent<StorybookProps<ConfigProps>>> = {
	args: {
		config: defaultConfig
	}
};
