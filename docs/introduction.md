# What is Svelte Standalone?

**Svelte Standalone** is a CLI tool for effortlessly bundling Svelte components into standalone JavaScript files.

Featuring _opt-in_ support for **Tailwind**, **TypeScript** or **Storybook**, it seamlessly integrates into your existing workflow, allowing you to focus on building great user experiences without the tooling hassle.

**Svelte Standalone** is designed to simplify the process of writing embedabbles to **just writing Svelte**.

[Just want to try it out? Let's install it.](/install)

## Why Use Svelte Standalone?

- **Reactive Components**: Leverages Svelte’s reactivity to create lightweight yet powerful embeddables.
- **Optional Features**: Tailor your workflow with optional support for Tailwind, TypeScript, or Storybook.
- **No Tooling Hassle**: Automatically handles minification, CSS purging, and boilerplate generation, so you can focus on building.
- **Cross-Platform Support**: Works seamlessly across your favorite operating systems and Node package managers.

## "Can I Use It With?"

**Svelte Standalone** is designed to seamlessly integrate into your existing Svelte workflow. It generates boilerplate code tailored to your specific needs, saving you time and effort.

It includes _opt-in_ support for:

- **Tailwind**
- **TypeScript**
- **Storybook**
- **Sveltejs/Kit**

But **Svelte Standalone** isn't limited to include either of them. You can just use it with plain Svelte, plain CSS and vanilla JavaScript.

:::tip
_You can also use Tailwind plugins — just configure them as you normally would in your `tailwind.config.js` file._
:::

## Boilerplate Generation

**Svelte Standalone** automatically inspects your `package.json` and generates boilerplate code tailored to your project's specifications.

- If you have **Storybook** installed, it will generate stories boilerplate.
- If you have **Sveltejs/Kit** installed, the boilerplate code will generate routes boilerplate.
- If you have **TypeScript** or **Tailwind** installed, the boilerplate code will be generated using them.

:::tip
_You should include **Sveltejs/Kit** to generate routing with your **bundled** standalone embedabbles_

_You should include **Storybook** to generate storyes with your svelte components **before** the bundling_
:::

## Is It Type-Safe?

It depends! If you're using **Svelte Standalone** with TypeScript, it will generate a `config.ts` file to ensure a fully type-safe developer experience.

## Testing

Test your components as you would test any Svelte app.

## Deployment

For **deployment**, standalone components are JavaScript files that can be hosted on any static hosting platform or CDN, such as **Netlify**, **Vercel**, or **AWS S3**.

::: tip
_If your target app has a file server, you can include your embedabble at your `/public` or `/static` folder._
:::
