# What is Svelte Standalone?

Svelte Standalone is an adaptive CLI that simplifies bundling Svelte components into standalone JavaScript files. It provides on demand support for `Tailwind`, `TypeScript` or `Storybook`, making it easier to integrate into your currently workflow.

[Check out a demo to see it in action!](https://github.com/brenoliradev/svelte-standalone/tree/beyonk-notifications-demo)

# Why use Svelte Standalone?

Svelte Standalone streamlines the process of transforming your Svelte code into standalone scripts. With it, you can:

- **Bundle all of your Svelte components**: It uses `vite` and `@sveltejs/vite-plugin-svelte` to bundle _every component_. It can support Svelte 5 - with the `npm i svelte-standalone@beta` - and Svelte 4 - with `npm i svelte-standalone`.
- **Write code as your standard workflow**: If you want full TypeScript support, Svelte Standalone is ready for that. If TypeScript isn't necessary, it works without it — _it'll just work_.
- **Don't worry about tooling**: Focus on writing your Svelte components, and let `svelte-standalone` handle the tooling - it'll minify/compress your JavaScript, purge your CSS and also provide fully typesafe boilerplate. Leaving to you no need for setup the bundling yourself.
- **Create reactive components**: `svelte-standalone` includes `svelte` reactivity. _For svelte 4 it also leverages [svelte component api](https://v4.svelte.dev/docs/client-side-component-api)_.
- **Use your favorite node package manager**: `svelte-standalone` is fully compatible with any node package manager.
- **Choose your features**: Use what you want. It has **optional** support for **tailwindcss**, **typescript**, **svelte/kit** and **storybook** - if you just want to use plain svelte, you can.
- **Share components**: If you have multiple standalone components, feel free to share them as you would in any Svelte app. `svelte-standalone` can handle it. [Learn more here!](https://github.com/brenoliradev/svelte-standalone/tree/shared-demo)

# How to use it?

Install it with `npm install svelte-standalone` and that's it. Create components with `npx standalone create` and build them with `npx standalone build`.

### For svelte 4: `npm install svelte-standalone` for svelte 5 `npm install svelte-standalone@beta`.

# How to create a new component?

- Run `npx standalone create`, and you'll be prompted with:

**When should your embeddable be triggered? (Use arrow keys)**

1. **On explicit call (can only be mounted once)** – It starts programmatically when you run `window.{{componentName}}.start();`. The `start` function accepts initial props, but only _one_ instance can be mounted.
2. **On explicit call (can be mounted multiple times)** – It starts programmatically when you run `window.{{componentName}}.start();`. The `start` function accepts initial props and allows for mounting multiple instances.
3. **Automatically append to the target `<div>` when downloaded** – This option does _not_ include props. The embeddable starts automatically once downloaded, but it can be stopped programmatically.
4. **Automatically append to the `<body>` when downloaded** – This option does _not_ include props. The embeddable starts automatically once downloaded, but it can be stopped programmatically.

# How to build my components?

- Run `npx standalone build` – The CLI will pop up with your created standalone components.
- You can include the `--production, -p` flag for minification and stripping, and the `--all, -a` flag to build all components.

# How to list my components?

If you're using TypeScript, the `ComponentList` type - exported from `svelte-standalone` - automatically lists every Standalone component in your app.

# Shareable components

[See a demo here!](https://github.com/brenoliradev/svelte-standalone/tree/shared-demo)

- You can create a `src/_standalone/shared` directory to store reusable styles, whether they are Tailwind classes or normal CSS.
- **If you're using tailwind**: You can include a component named `runtime`. Once included, all the `shared` styles will be added to this component. If no such component is present, the styles will be distributed across all builds based on the content configuration. During the build process, you can pass the `--strip-runtime` flag to the `standalone build` command. *This will directly include the shared styles in all the components you are bundling*.
  
# Bundling Process

Grabs all of `src/_standalone/<componentName>/index.svelte` and let you select which one of them you want to build will generate a separate build for each component.

Ouputs:

- Outputs `<component name>.min.js` and `<component name>.status.html` in `/static/dist/standalone`.
