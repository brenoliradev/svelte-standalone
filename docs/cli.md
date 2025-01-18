# CLI Commands

**Svelte Standalone** provides a set of CLI commands to simplify the creation, building, and management of standalone Svelte components. Below is a detailed breakdown of the available commands and their usage.

## `create`

Generates boilerplate code for a new standalone component.

### Usage:

```bash
npx standalone create
```

### Steps:

1. **Name your component**: Enter a name for your component (e.g., `payments`).
2. **Choose an embedding strategy**:
   - **Explicit Call (Single Instance)**: Start with `window.payments.start()`.
   - **Explicit Call (Multiple Instances)**: Start with `window.payments.start()` and mount multiple instances.
   - **Auto-Embed with Target**: Automatically append to a target element, identified by its `id`.
   - **Auto-Embed on Body**: Automatically append to the `<body>`.

### Generated Files:

- `index.svelte`: The main Svelte component.
- `embed.ts` (or `embed.js`): Embedding logic based on your chosen strategy.
- `config.ts` (or `config.js`): Default configuration for the component.

## `build`

Builds your standalone components into production-ready scripts.

### Usage:

```bash
npx standalone build
```

### Options:

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

### Output:

The output will be saved in `static/dist/standalone/`:

- `payments.min.js`: The standalone JavaScript file.
- `payments.status.html`: A visualization of the bundle.

## `help`

Displays help information for the CLI commands.

### Usage:

```bash
npx standalone --help
```

## `version`

Displays the current version of **Svelte Standalone**.

### Usage:

```bash
npx standalone --version
```
