# What is "svelte-standalone"?

Svelte Standalone is a complete end-to-end service to transform `Svelte` components into standalone scripts. Supporting `tailwindcss` and `TypeScript` and unit/e2e tests with `vitest` and `@testing-library/svelte`.

Svelte Standalone features codegen using `bun generate`. Components created with Svelte Standalone CLI will have an dedicated route using `sveltejs/kit` and a `storybook` story.

_See "example" component on: https://svelte-standalone.vercel.app/._

# How to create a new componet?

It's designed to be simple, with the CLI you'll have all the structure handled and will only need to write the Svelte Component itself.

- Inside the root directory of your Svelte Standalone instance, you'll run: `bun generate`.
- After inserting a `component name` you'll be able to choice how your Standalone Component will be bundled:
  - On explicit call - component props would be parsed as types.ts => This would generate theses files: #TODO explict.md
  - When downloaded automatically append it to target <div> => This would generate theses files: #TODO target.md
  - When downloaded automatically append to the <body> => This would generate theses files: #TODO body.md

And that's it! You'll see the following file: `/src/_standalone/<component name/index.svelte`. You will just need code your desired Svelte Component on it, import your desired code/npm packages and Svelte Standalone will transform it into an script.min.js for you.

# How to build my components?

Just run `bun run build` and select which components you want to build - by default all of them will be bundled.  

# Shared folder

Svelte Standalone can have a `/src/shared` folder. Everything added to `/src/shared` will have their `tailwindcss` included to all components i.e.:

- [shared example](https://github.com/brenoliradev/svelte-standalone/tree/main/src/shared/toast) - css will be included in `all` Standalone Components but the toast javascript will only be bundled when imported because of tree-shaking.

# Bundling Process

Programatically runs `vite` for building each component included in `src/_standalone/<component name>/index.svelte`. Generates a separate build for each component.

- Dynamically adjusts `tailwind.content` to focus on `src/_standalone/<component name>` and `src/shared`. Ensures CSS purging for each component separatedly.

Ouputs:

- Outputs `<component name>.min.js` and `<component name>.status.html` in `/static/dist/standalone`. Handles minification, Svelte preprocessing, parses TypeScript to JavaScript, and includes `tailwindcss` used utils on `<component name>.min.js`.
