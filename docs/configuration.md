# Path Aliases

**Svelte Standalone** supports [path aliases](https://vite.dev/config/shared-options.html#resolve-alias).

:::tip
_Configure path aliases as you normally would in your `vite.config.js` or `svelte.config.js`, and **Svelte Standalone** will handle the bundling process for you._
:::

## Environment Variables

**Svelte Standalone** aims to include **Svelte/Kit** as an **opt-in** dependency. To manage environment variables, you should configure using [Vite methods](https://vite.dev/guide/env-and-mode.html#env-files).

- **Environment Files**: Use `.env` files to define environment variables. - `.env.[mode]` is also supported.
- **Vite Options**: Customize the behavior of environment variables using Vite's `define`, `envDir`, and `envPrefix` options.
