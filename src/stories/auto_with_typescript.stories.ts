import type { Meta, StoryObj } from '@storybook/svelte';
import Auto_with_typescript from '@/_standalone/auto_with_typescript/index.svelte';

export default {
	title: 'Standalone/Auto_with_typescript',
	component: Auto_with_typescript
} satisfies Meta<Auto_with_typescript>;

export const Auto_with_typescriptStory: StoryObj<Auto_with_typescript> = {
	args: {} // don't have args since auto-embeddable
};
