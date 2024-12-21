# What is Svelte Standalone?

Svelte Standalone is an adaptive CLI that simplifies bundling Svelte components into standalone JavaScript files. It provides comprehensive support for `Tailwind`, `TypeScript`, and `Storybook`, making it easier to integrate them into your projects.

[Check out a demo to see it in action!](https://github.com/brenoliradev/svelte-standalone/tree/beyonk-notifications-demo)

# Why use Svelte Standalone?

Svelte Standalone streamlines the process of transforming your Svelte code into standalone scripts. With it, you can:

- **Bundle all of your Svelte components**: It uses `Vite` and `@sveltejs/vite-plugin-svelte` to bundle *every component*, compatible with both Svelte 4 and earlier versions.
- **Fully type-safe (or not)**: If you want full TypeScript support, Svelte Standalone is ready for that. If TypeScript isn't necessary, it works without it — *it'll just work*.
- **No complicated tweaks**: Focus on writing your Svelte components, and let `svelte-standalone` handle the bundling. No need for complex setup or tweaks.
- **Create reactive components**: `svelte-standalone` includes Svelte reactive and also leverages [svelte component api](https://v4.svelte.dev/docs/client-side-component-api).
- **Broad support**: Works seamlessly with any node package manager.
- **Adaptive features**: If `svelte/kit` is included, `svelte-standalone` will generate a route for your bundled components. If `storybook` is included, `svelte-standalone` will generate stories for you. Use it however you like.

# How to use it?

Install it with `npm install svelte-standalone` and that's it. Create components with `npx standalone create` and build them with `npx standalone build`.

# How to create a new component?

- Run `npx standalone create`, and you'll be prompted with:

**When should your embeddable be triggered? (Use arrow keys)**
1. **On explicit call (can only be mounted once)** – It starts programmatically when you run `window.{{componentName}}.start();`. The `start` function accepts initial props, but only *one* instance can be mounted.
2. **On explicit call (can be mounted multiple times)** – It starts programmatically when you run `window.{{componentName}}.start();`. The `start` function accepts initial props and allows for mounting multiple instances.
3. **Automatically append to the target `<div>` when downloaded** – This option does *not* include props. The embeddable starts automatically once downloaded, but it can be stopped programmatically.
4. **Automatically append to the `<body>` when downloaded** – This option does *not* include props. The embeddable starts automatically once downloaded, but it can be stopped programmatically.

# How to build my components?

- Run `npx standalone build` – The CLI will pop up with your created standalone components.
- You can include the `--production, -p` flag for minification and stripping, and the `--all, -a` flag to build all components.

# Bundling Process

Grabs all of `src/_standalone/<componentName>/index.svelte` and let you select which one of them you want to build will generate a separate build for each component.

 - If you're using Tailwind, it dynamically adjusts `tailwind.content` to focus on `src/_standalone/<component name>` and `src/shared`, ensuring CSS purging for each component separately. If you're not using Tailwind, it'll rely on Svelte to handle your css files.

Ouputs:

- Outputs `<component name>.min.js` and `<component name>.status.html` in `/static/dist/standalone`. 
