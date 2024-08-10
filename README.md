# What is "svelte-standalone"?

`svelte-standalone` is a serie of configurations that aims to process any svelte widget to a single standalone javascript file. Currently, as a template, you just create a version of it and starts using it.

It'll also includes minifications like `terser` and `cssnano`, testing like `playwright` and `vitest` and implements `vite` and `storybook` so you can validate how you standalone widgets are as svelte component and as bundled script.

# How it works?

It's structure is intended to be simple. Basically you're going to create an folder on `src/_widgets` with the name of your component e.g.: `src/_widgets/<component>`. 
- Inside the example folder initially you just need to create an `index.svelte` file and once you run the `dev` / `build` scripts it'll generate some files using plop. These files will be:
  - `src/_widgets/<component>/embed.ts` - A simple file that'll create a new instance of `index.svelte` component. It'll also implements `window.<component>Start` and `window.<component>Stop`.  
  - `src/_widgets/<component>/types.ts` - Exposes `ConfigProps` and `defaultConfig` and it'll rely on it to implement `src/routes/<component>/+page.svelte` and `src/stories/<component>.stories.ts`. 
   
    _Make sure to implement "props" on `index.svelte` as ConfigProps_ (refer to: [src/_widgets/example/index.svelte](https://github.com/brenoliradev/svelte-standalone/blob/main/src/_widgets/example/index.svelte#L4)).
  - `src/routes/<component>/+page.svelte` -  Exposes a route that imports the bundled script from rollup so you'll can check how the compiled script is working. It'll also initializes `window.<component>Start` and `window.<component>Stop` using `defaultConfig` from types.ts.
  - `src/stories/<component>.stories.ts` -  A simple storybook that imports the `<component>/index.svelte` so you'll be able to see how the svelte component is without bundling it. 

If you're going to use your bundled `<component>` into an app that has tailwindcss, consider importing: `/src/css/tailwind-utils.css` instead of `/src/css/tailwind-full.css`.

# How it'll be bundled?

Basically, it'll runs rollup on *everything* from `src/_widgets`. For each `<component>` inside it, it'll run a separatedly build. It'll also swap `tailwind.content` to be *only* the `src/_widgets/*` and `src/shared` folders so you can have each `<component>` css purged separatedly relying on tailwind jit. It'll also handle minifications, preprocessing for sveltekit and typescript and just returns a single "`<component>.min.js` and an `<component>.status.html` at `/static/dist`. 
