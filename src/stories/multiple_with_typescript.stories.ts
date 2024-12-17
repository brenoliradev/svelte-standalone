import type { Meta, StoryObj } from '@storybook/svelte';
import { defaultConfig } from '@/_standalone/multiple_with_typescript/config';
import Multiple_with_typescript from '@/_standalone/multiple_with_typescript/index.svelte';

export default {
	title: 'Standalone/Multiple_with_typescript',
	component: Multiple_with_typescript
} satisfies Meta<Multiple_with_typescript>;

export const Multiple_with_typescriptStory: StoryObj<Multiple_with_typescript> = {
	args: defaultConfig
};
