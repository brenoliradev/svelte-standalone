# Supporting Tailwind

**Svelte Standalone** includes **opt-in** support for Tailwind. You don't have to do any setup to use it. All you have to do is add Tailwind to your project using the [svelte CLI](https://svelte.dev/docs/cli/sv-add).

The only caveat is: you **MUST** to import the [tailwind directives](https://tailwindcss.com/docs/functions-and-directives) directly into your embedabbles. Since **Svelte Standalone** bundles them separatedly each `index.svelte` should include their own directives.

## **Include Tailwind Directives**

Since **Svelte Standalone** bundles each component separately, you **must** include the [Tailwind directives](https://tailwindcss.com/docs/functions-and-directives) directly in your embeddables. Each `index.svelte` file should include its own directives.

## **Using Tailwind in Your App**

- **If your app already includes Tailwind**, you only need to include `@tailwind utilities`.
- **If your app doesn't include Tailwind**, you may need to include additional directives (e.g., `@tailwind base`, `@tailwind components`). Be aware that this will increase the size of your embeddables.

::: tip
_If you're using multiple embeddables, consider including the base Tailwind directives in a [runtime component](/shared) to avoid duplication and reduce bundle size._
:::
