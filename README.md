# What is this?

This is a simple code-sample repository, which includes a "shared" structure bundled with `svelte-standalone`.

You can also check how the component works: https://svelte-standalone-shared.vercel.app/shared

# How does this work?

1. Svelte standalone supports svelte code so It isn't a problem to have "/shared/toast" structure - it even includes a store.
2. The css will be purged correctly - if tailwind is used - and bundled using svelte-preprocessor if not.
3. It can also explicitly shows that the reactivity wouldn't break because of it and you can even update your component with the Svelte Component API without worrying about it breaking.
