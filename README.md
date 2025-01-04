# Svelte Standalone

**Svelte Standalone** is a CLI tool that simplifies bundling Svelte components into standalone JavaScript files. It supports optional features like **Tailwind**, **TypeScript**, and **Storybook**, making it easy to integrate into your workflow.

---

## Why Use Svelte Standalone?

- **Bundle Svelte Components**: Uses Vite and `@sveltejs/vite-plugin-svelte` to bundle components into standalone scripts.
- **Optional Features**: Choose what you need—Tailwind, TypeScript, or Storybook.
- **Reactive Components**: Leverages Svelte's reactivity and provides a component API for Svelte 4.
- **Shareable Components**: Create reusable styles and logic with a special `runtime` component.
- **No Tooling Hassle**: Handles minification, CSS purging, and boilerplate generation.

---

## Installation

Install the CLI globally or locally:

```bash
npm install svelte-standalone
```

For **Svelte 5** (beta):

```bash
npm install svelte-standalone@beta
```

---

## Workflow

### 1. Create a Component

Run the `create` command to generate a new standalone component:

```bash
npx standalone create
```

You'll be prompted to:
1. **Name your component** (e.g., `payments`).
2. **Choose an embedding strategy**:
   - **Explicit Call (Single Instance)**: Start with `window.payments.start()`.
   - **Explicit Call (Multiple Instances)**: Start with `window.payments.start()` and mount multiple instances.
   - **Auto-Embed with Target**: Automatically append to a target `<div>`.
   - **Auto-Embed on Body**: Automatically append to the `<body>`.

This will generate the following files in `src/_standalone/payments/`:
- `index.svelte`: The main Svelte component.
- `embed.ts` (or `embed.js`): Embedding logic based on your chosen strategy.
- `config.ts` (or `config.js`): Default configuration for the component.

---

### 2. Build the Component

Once your component is created, build it into a standalone script:

```bash
npx standalone build
```

#### Build Options:
- **Production Build**: Minify and optimize for production.
  ```bash
  npx standalone build --production
  ```
- **Build All Components**: Build all standalone components at once.
  ```bash
  npx standalone build --all
  ```
- **Strip Runtime**: Bundle shared styles directly into components (excludes the runtime component).
  ```bash
  npx standalone build --strip-runtime
  ```

The output will be saved in `static/dist/standalone/`:
- `payments.min.js`: The standalone JavaScript file.
- `payments.status.html`: A visualization of the bundle (optional).

---

### 3. Use the Component

Include the generated script in your HTML:

```html
<script src="/path/to/payments.min.js"></script>
```

#### Example Usage:
- For **Explicit Call**:
  ```javascript
  window.payments.start({ /* props */ });
  ```
- For **Auto-Embed**:
  ```html
  <div id="payments"></div>
  <script src="/path/to/payments.min.js?target=payments"></script>
  ```

---

### Runtime Component

The **runtime** is a special component (`runtime`, `$runtime`, or `+runtime`) used to share styles or logic across multiple standalone components. It ensures consistency and reduces duplication.

#### Create a Runtime Component:
```bash
npx standalone create
```
When prompted for the component name, enter `runtime`, `$runtime`, or `+runtime`.

#### Ignore runtime:
By default, the runtime styles are included in all builds. Use the `--strip-runtime` flag to bundle shared styles directly into each component:
```bash
npx standalone build --strip-runtime
```

## Demo

Check out the [demo](https://github.com/brenoliradev/svelte-standalone/tree/beyonk-notifications-demo) to see it in action!

---

## License

MIT © 2024 Breno Lira
