# CLI Commands

**Svelte Standalone** provides CLI commands to handle the creation and bundling process of your embedabbles.

## `create`

Generates [boilerplate code](/boilerplate) for a new standalone component.

### Usage:

```bash
npx standalone create
```

### Steps:

1. **Name your component**: Enter a name for your component (e.g., `payments`).
2. **Choose an embedding strategy**:
  - **Explicit Call (Single Instance)**: Mounts the component **once** using `window.payments.start()`.
  - **Explicit Call (Multiple Instances)**: Allows mounting **multiple** instances with `window.payments.start()`.
  - **Auto-Embed with Target ID**: **Automatically** appends to an element with a specified `id`.
  - **Auto-Embed with Target Class**: **Automatically** appends to elements with a specified `class`.
  - **Auto-Embed on Body**: **Automatically** appends to the `<body>` when downloaded.



## `build`

Builds your standalone components into production-ready scripts.

### Usage:

```bash
npx standalone build
```

### Options:

- **Production Build**: Minifies and optimizes for production.
```bash
npx standalone build --production
```
- **Build All Components**: Builds all standalone components at once.
```bash
npx standalone build --all
  ```
- **Strip Runtime**: Bundles shared styles directly into components (excludes the runtime).
  ```bash
  npx standalone build --strip-runtime
  ```
- **Mode**: Implements [modes](https://vite.dev/guide/env-and-mode.html#modes) from Vite.
  ```bash
  npx standalone build --mode dev
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
