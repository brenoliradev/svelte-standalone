# What is "svelte-standalone"?

`svelte-standalone` is a serie of configurations that aims to process any svelte widget to a single standalone javascript file.

# How it works?

- Currently, as a template, you just create a version of it and starts using it.

It's structure is intended to be simple, basically you're going to create an folder on `src/_widgets` with the name of your component. e.g.: `src/_widgets/<component>`.

- Inside the example folder initially you just need to create an `index.svelte` file and once you run the `dev` or the `build` scripts it'll generate some files using plop.
  - These files will be:
  - `src/_widgets/<component>/embed.ts`
  - `src/_widgets/<component>/types.ts`
