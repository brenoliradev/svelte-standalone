import type { ComponentProps, SvelteComponent } from 'svelte';
import Test from './index.svelte';

export type TestProps = ComponentProps<Test>;

declare class TestComponent extends SvelteComponent<Test> {}
