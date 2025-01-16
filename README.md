# Svelte Standalone

**Svelte Standalone** is a CLI tool that simplifies bundling Svelte components into standalone JavaScript files. It has *opt-in* support for **Tailwind**, **TypeScript**, and **Storybook**, making it simple to integrate to your workflow.

---

## Why Use Svelte Standalone?

- **Bundle Svelte Components**: Uses Vite and `@sveltejs/vite-plugin-svelte` to bundle components into standalone scripts.
- **Optional Features**: Choose what you need—Tailwind, TypeScript, or Storybook.
- **Reactive Components**: Leverages Svelte's reactivity to create light but powerfull embedabbles.
- **No Tooling Hassle**: Handles minification, CSS purging, and boilerplate generation.
- **Shareable Components**: Reuse styles and logic with a special `runtime` component.
- **Cross Plataform Support**: Supports your favorite OS or npm package.

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
   - **Auto-Embed with Target**: Automatically append to a target element - It'll be searched by it's `id`.
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
- `payments.status.html`: A visualization of the bundle.

---

### 3. Use the Component

Include the generated script in your HTML:

```html
<script src="/path/to/payments.min.js"></script>
```

#### Example Usage:

- For **Explicit Call**:
  ```javascript
  window.payments.start({
  	/* props */
  });
  ```
- For **Auto-Embed**:
  ```html
  <div id="payments"></div>
  <script src="/path/to/payments.min.js?target=payments"></script>
  ```

---

### Runtime Component

The **runtime** is a special component (`runtime`, `$runtime`, or `+runtime`) used to encapsulate styles or logic across multiple standalone components.

#### Why should I include a runtime? 

- **Include styles once**: You can include your styles from `src/shared` once within your `runtime` component. 
- **Setup your embedabbles**: You can run methods required to your cards just at your runtime. *i.e. authenticate once and retrieve at other embedabbles.*

#### Create a Runtime Component:

```bash
npx standalone create
```

When prompted for the component name, enter `runtime`, `$runtime`, or `+runtime`.

#### Ignore runtime:

By default, the styles from `src/shared` folder are included across the runtime component during builds. Use the `--strip-runtime` flag to bundle styles from the `src/styles` folder directly into each component:

```bash
npx standalone build --strip-runtime
```

## Demo

Check out the [demo](https://github.com/brenoliradev/svelte-standalone/tree/beyonk-notifications-demo) to see it in action!

---

## License

MIT © 2024 Breno Lira
