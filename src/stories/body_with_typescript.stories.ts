import type { Meta, StoryObj } from '@storybook/svelte';
import Body_with_typescript from '@/_standalone/body_with_typescript/index.svelte';

export default {
	title: 'Standalone/Body_with_typescript',
	component: Body_with_typescript
} satisfies Meta<Body_with_typescript>;

export const Body_with_typescriptStory: StoryObj<Body_with_typescript> = {
	args: {} // don't have args since auto-embeddable
};
