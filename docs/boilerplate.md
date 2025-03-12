# Boilerplate Code

All these files will be generated at your `src/_standalone/<component>` folder when you use the [standalone create](/cli#create) command.

## **index.svelte**

The component written here will be transformed into a embedabble - you can treat it as **any** Svelte component and Svelte Standalone will bundle it for you.

:::warning
This is the `entry` for your vite build. You **MUST** explicitly import the global CSS files here.
:::

## **embed.ts (or embed.js)**

Embedding logic that controls how and where the component is inserted. It follows the chosen embedding strategy (e.g., auto-embed by `id`, explicit call to `start()`).

This is a example of a `embed file` using the [embed on body method](/embed.html#auto-embed-on-body)

```ts
import { autoEmbedWithTarget } from 'svelte-standalone';
import Example from './index.svelte'; // your embedabble
autoEmbedWithTarget(Example, 'example');
```

:::tip
You can deep dive about [embed methods here](/embed.html)
:::

## **config.ts (or config.js)**

Default configuration for your component, including settings like styles or initialization options.

```ts
// example
import type { ComponentProps } from 'svelte';
import type { MultipleEmbedWindow } from 'svelte-standalone';
import Example from './index.svelte'; // your embedabble

export type ExampleProps = ComponentProps<Example>; // props from your components
export const defaultConfig: ExampleProps = {}; // this will be used - when aplicable - as a config to start your embedabble (it'll also be used at your story when using storybook)

declare global {
	interface Window extends MultipleEmbedWindow<typeof Example, 'example'> {} // typesafe wrapper for window.example
}
```
