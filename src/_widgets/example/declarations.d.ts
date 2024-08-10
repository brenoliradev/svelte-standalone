import type { ComponentProps, SvelteComponent } from 'svelte';
import Example from './index.svelte';

export type ExampleProps = ComponentProps<Example>;

declare class ExampleComponent extends SvelteComponent<Example> {}
