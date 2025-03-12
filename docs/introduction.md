# What is Svelte Standalone?

**Svelte Standalone** is a CLI tool designed to simplify the process of creating embedabbles to **just writing Svelte**.

Featuring _opt-in_ support for **Tailwind**, **TypeScript** or **Storybook**, it seamlessly integrates into your existing workflow, allowing you to focus on building great user experiences without the tooling hassle.

[Just want to try it out? Let's install it.](/install)

## What Are Embedabbles?  

Simply put, *embedabbles* are Svelte components designed to work in **any JavaScript environment**. Unlike regular Svelte components, an embedabble **must** be fully self-contained since it should be able to **mount itself** and function independently without relying on a specific framework or setup.  

## When to Use Embedabbles?  

Embedabbles are great when you need to **embed a Svelte component anywhere**, regardless of the tech stack i.e. **third-party integrations**, **no-framework environments** or even as **microfrontends**.  

## Why Use Svelte Standalone?  

- **Reactive & Lightweight** – Build fast, self-contained embeddables with Svelte’s reactivity.  
- **Flexible** – Opt-in support for Tailwind, TypeScript, and Storybook.  
- **Zero Setup** – Handles minification, CSS purging, and boilerplate generation for you.  
- **Universal Compatibility** – Works across all OS and node package managers.  

## Can I Use It With?  

Yes you can! **Svelte Standalone** is made to integrate with any Svelte workflow. It offers **_opt-in_** support for:  

- **Tailwind**  
- **TypeScript**  
- **Storybook**  
- **SvelteKit**  

## Boilerplate Generation

**Svelte Standalone** automatically scans your `package.json` and generates boilerplate code based on your setup:  

- **Storybook detected?** → Generates story files.  
- **SvelteKit detected?** → Generates route files.  
- **TypeScript/Tailwind detected?** → Applies them to the boilerplate.  
- **SvelteKit** → Generate routes for bundled embedabbles.  
- **Storybook** → Create component stories.  

## Is It Type-Safe?

It depends! If you're using **Svelte Standalone** with TypeScript, it will generate a `config.ts` file to ensure a fully type-safe developer experience.

## Testing

Test your components as you would test any Svelte app.

## Deployment

For **deployment**, standalone components are JavaScript files that can be hosted on any static hosting platform or CDN, such as **Netlify**, **Vercel**, or **AWS S3**.

::: tip
_If your target app has a file server, you can even include your embedabbles at your `/public` or `/static` folder._
:::
