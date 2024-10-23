# What is "svelte-standalone"?

`svelte-standalone` is a serie of configurations that aims to process any svelte widget to a single standalone javascript file. Currently, as a template, you just create a version of it and starts using it.

It includes minifications for JavasCript and CSS absed on `terser` and `cssnano`.

Unit and e2e testing with `vitest` and `@testing-library/svelte`.

Also, `storybook` and `vite` to ensure that you can check the bundled scripts and the components as it is.

_See "example" component on: https://svelte-standalone.vercel.app/._

# How it works?

It's structure is intended to be simple. Basically you're going to create an folder on `src/_standalone` with the name of your component e.g.: `src/_standalone/<component>`.

- Inside the example folder initially you just need to create an `index.svelte` file and once you run the `dev` / `build` scripts it'll generate some files using plop. These files will be:

  - `src/_standalone/<component>/embed.ts` - A simple file that'll create a new instance of `index.svelte` component. It'll also implements `window.<component>Start` and `window.<component>Stop`.
  - `src/_standalone/<component>/declarations.d.ts` - Exposes `<component>`, `<component>Props` and `defaultConfig`.

    - Using this, you'll be able to import `<component>.svelte` anywhere and have it's props well typed.
    - If you only want the definition for props, it'll also defines `<component>Props`.

  - `src/_standalone/<component>/types.ts` - It'll declares `defaultConfig` which will be typed as `<component>Props` so it'll be used as default props for `<component>stories.ts` and also for `src/routes/<component>/+page.svelte`. _It'll also exposes a simple `CustomWindow` and use it inside the route files._
  - `src/routes/<component>/+page.svelte` - Exposes a route that imports the bundled script from vite so you'll can check how the compiled script is working. It'll also initializes `window.<component>Start` and `window.<component>Stop` using `defaultConfig` from types.ts.
  - `src/stories/<component>.stories.ts` - A simple storybook that imports the `<component>/index.svelte` so you'll be able to see how the svelte component is without bundling it.

If you're going to use your bundled `<component>` into an app that has tailwindcss, consider importing: `/src/css/tailwind-utils.css` instead of `/src/css/tailwind-full.css`.

# How it'll be bundled?

Basically, it'll runs vite on _everything_ from `src/_standalone`. For each `<component>` inside it, it'll run a separatedly build. It'll also swap `tailwind.content` to be _only_ the `src/_standalone/*` and `src/shared` folders so you can have each `<component>` css purged separatedly relying on tailwind jit. It'll also handle minifications, preprocessing for sveltekit and typescript and just returns a single `<component>.min.js` and an `<component>.status.html` at `/static/dist`.
