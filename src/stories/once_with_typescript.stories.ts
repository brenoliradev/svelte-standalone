import type { Meta, StoryObj } from '@storybook/svelte';
import { defaultConfig } from '@/_standalone/once_with_typescript/config';
import Once_with_typescript from '@/_standalone/once_with_typescript/index.svelte';

export default {
	title: 'Standalone/Once_with_typescript',
	component: Once_with_typescript
} satisfies Meta<Once_with_typescript>;

export const Once_with_typescriptStory: StoryObj<Once_with_typescript> = {
	args: defaultConfig
};
