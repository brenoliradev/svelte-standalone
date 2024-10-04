import type { Meta, StoryObj } from '@storybook/svelte';

import Test from '@/_widgets/test/index.svelte';
import { defaultConfig } from '@/_widgets/test/types';

export default {
	title: 'Widgets/Test',
	component: Test
} satisfies Meta<Test>;

export const testStory: StoryObj<Test> = {
	args: defaultConfig
};
