# What is Svelte Standalone?

**Svelte Standalone** is your go-to CLI tool for effortlessly bundling Svelte components into standalone JavaScript files. Whether you're building lightweight embeddables or reusable components, Svelte Standalone streamlines the process with minimal setup.

With _opt-in_ support for **Tailwind**, **TypeScript**, and **Storybook**, it seamlessly integrates into your existing workflow, allowing you to focus on building great user experiences without the tooling hassle. Perfect for developers who want to create shareable, reactive components with ease.

[Just want to try it out? Get started.](/install)

## Why Use Svelte Standalone?

- **Bundle Svelte Components**: Effortlessly bundle Svelte components into standalone scripts using Vite and `@sveltejs/vite-plugin-svelte`.
- **Optional Features**: Tailor your workflow with optional support for Tailwind, TypeScript, or Storybook.
- **Reactive Components**: Harness Svelte’s reactivity to create lightweight yet powerful embeddables.
- **No Tooling Hassle**: Automatically handles minification, CSS purging, and boilerplate generation, so you can focus on building.
- **Shareable Components**: Reuse styles and logic across projects with the special `runtime` component.
- **Cross-Platform Support**: Works seamlessly across your favorite operating systems and Node package managers.

## Can I Use It With?

**Svelte Standalone** is designed to seamlessly integrate into your existing workflow. It generates boilerplate code tailored to your specific needs, saving you time and effort.

It includes opt-in support for:

- **Tailwind**
- **TypeScript**
- **Storybook**

::: tip
_You can also use Tailwind plugins — just configure them as you normally would in your `tailwind.config.js` file._
:::

## Code Generation

**Svelte Standalone** automatically inspects your `package.json` and generates boilerplate code tailored to your project's specifications.

- If you have **Storybook** installed, it will generate a story boilerplate, ensuring seamless integration with your existing tools and workflows.
- If you have **TypeScript** or **Tailwind** installed, the boilerplate code will be generated using them, providing a fully customized setup.

## Is It Type-Safe?

It depends! If you're using **Svelte Standalone** with TypeScript, it will generate a `config.ts` file to ensure a fully type-safe developer experience. This allows you to create and test standalone components with confidence, leveraging TypeScript's robust type-checking capabilities.

## Testing

**Testing** your standalone components is as straightforward as testing plain Svelte components. You can use tools like **Vitest**, **Cypress**, or **Playwright** for unit, end-to-end, and integration testing.

## Deployment

For **deployment**, standalone components are lightweight JavaScript files that can be hosted on any static hosting platform or CDN, such as **Netlify**, **Vercel**, or **AWS S3**, making them easy to distribute and integrate into any project.

::: tip
_You can also include the JavaScript file at your app static files._
:::
