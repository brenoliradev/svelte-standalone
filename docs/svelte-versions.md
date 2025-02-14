# Why Are There Two Supported Versions?

I started **Svelte Standalone** to streamline Svelte 4 for powering a fully customizable dashboard. Since I'm still actively developing this dashboard, my focus hasn't shifted to fully supporting Svelte 5. However, you can still use **Svelte Standalone** with Svelte 5 by installing the beta version:

```bash
npm install -D svelte-standalone@beta
```

## Key Differences

At the developer experience level, there shouldn't be any noticeable differences between using **Svelte Standalone** with Svelte 4 or Svelte 5. However, there are a few key points to keep in mind:

- **Runtime Size**:
  - **Svelte 4**: The embedabbles size increases with usage, making it better suited for **small** standalone apps.
  - **Svelte 5**: The embedabbles size increases by approximately **~10kb**, regardless of usage, making it better suited for **bigger** standalone apps.
- **Component API**:
  - Svelte 4 and Svelte 5 use different component APIs. [Why this is important?](/component-api)
