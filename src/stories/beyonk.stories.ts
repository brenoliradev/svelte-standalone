import type { Meta, StoryObj } from '@storybook/svelte';

import Beyonk from '@/_standalone/beyonk/index.svelte';
import { defaultConfig } from '@/_standalone/beyonk/types';

export default {
	title: 'Standalone/Beyonk',
	component: Beyonk
} satisfies Meta<Beyonk>;

export const beyonkStory: StoryObj<Beyonk> = {
	args: defaultConfig
};
