# Bundling `svelte-notifications`

This example demonstrates how to integrate the [svelte-notifications](https://github.com/beyonk-group/svelte-notifications) repository, which includes a "lib" structure and JavaScript, bundled with **Svelte Standalone**.

You can also check how the component works: [Live Demo](https://svelte-standalone-beyonk.vercel.app/beyonk)

As you can see, even though `svelte-notifications` uses `"svelte": "^3.47.0"`, it still works.

## How Does This Work?

1. **Download the Code**:
   I downloaded the `svelte-notifications` code from its repository.

2. **Create a Standalone Component**:
   I created a standalone component using:

   ```bash
   npx standalone create
   ```

   Named it `beyonk` and chose an embedding strategy.

3. **Paste the Code**:
   I pasted the code from `svelte-notifications` into the `beyonk` component I created.

4. **Update Folder Structure**:
   I swapped `$lib` to `lib` since it was the new folder structure.

5. **Build the Component**:
   I built the component using:
   ```bash
   npx standalone build
   ```

## Key Takeaways

- **Seamless Integration**: Even though `svelte-notifications` was built for Svelte 3, it works flawlessly with **Svelte Standalone**.
- **Flexible Folder Structure**: You can adapt existing projects by updating the folder structure (e.g., `$lib` to `lib`).
- **Quick Setup**: The entire process is straightforward and requires minimal setup.

## Try It Yourself

Follow the steps above to integrate your own Svelte components or third-party libraries with **Svelte Standalone**. If you run into any issues, feel free to [open an issue](https://github.com/brenoliradev/svelte-standalone/issues) or [join the discussion](https://github.com/brenoliradev/svelte-standalone/discussions).
