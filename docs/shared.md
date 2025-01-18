# Shared Components

With **Svelte Standalone**, you can simplify the process of creating new embeddables by sharing common components across your projects. For example, if you're building a Dashboard, you can reuse shared components (i.e. `Tabs` or `Tables`) across multiple Svelte components.

## How to Share Components

You can write plain Svelte components, stores, or utilities and import them into your `index.svelte` file, just as you would in any Svelte app.

To leverage CSS purging and reuse styles across your components, create a `/src/shared` folder. By placing your components in this folder, their styles will automatically be shared across all your Svelte embeddables, ensuring consistency and reducing redundancy.

This approach works great if you plan to use these components independently. For example, you could create a `Tooltip` component and reuse it across multiple embeddables in different apps. [But what if you want to use both in the same app?](#creating-a-runtime-component)

## Runtime Components

**Svelte Standalone** supports a special component called `runtime` (you can also name it `$runtime` or `+runtime`).

A `runtime` component is designed to deduplicate styles from the `/src/shared` folder. For example, if you have a `Card` component, creating a `runtime` ensures that all your cards will include the CSS only once, reducing redundancy and improving performance.

::: tip
_You can also use a `runtime` to run logic that will be reused across your app. For instance, you can handle authentication in your `runtime` and synchronize it across your other embeddables._

_Additionally, you can pass props to your `runtime` to inject environment variables or configuration for your components. For example, by adding an `authUrl` prop to your runtime, you can manage authentication across multiple environments._
:::

## Create a Runtime Component

To create a `runtime` component, run the following command:

```bash
npx standalone create
```

When prompted for the component name, enter `runtime`, `$runtime`, or `+runtime`.

## Ignore Runtime

By default, styles from the `src/shared` folder are included across the runtime component during builds. If you want to bundle styles directly into each component instead, use the `--strip-runtime` flag:

```bash
npx standalone build --strip-runtime
```
