# Supporting Tailwind

The `build` methods includes **opt-in** support for Tailwind. You don't have to do any complex setup to include it. You should only add Tailwind using the [svelte CLI](https://svelte.dev/docs/cli/sv-add) to your **Svelte Standalone** app.

You **MUST** to import the [tailwind directives](https://tailwindcss.com/docs/functions-and-directives) directly into your embedabbles. Since **Svelte Standalone** bundles them separatedly each `index.svelte` should include their own directives.

:::tip
_If your app **includes** tailwind, you can only import `@tailwind utilities;` to your embedabble_

_If your app **doesn't include** tailwind be aware that you'll may have to include other directives. This will increase the size of your embedabbles. You should include the base directives [in a runtime component](/shared) if you're using multiple embedabbles_
:::
