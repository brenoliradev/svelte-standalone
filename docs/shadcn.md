:::warning
_Is strongly recommended to use **Svelte 4** in this setup._
:::

# Supporting Shadcn

With **Svelte Standalone** is possible to integrate the modern UI kits with ease. For example, to implement [shadcn](https://www.shadcn-svelte.com/) you only to follow **two** steps:

1. [Install Svelte Standalone](/install) - For the sake of simplicity, this tutorial is using only **Tailwind** and **TypeScript**.
2. [Install shadcn-svelte](https://www.shadcn-svelte.com/docs/installation/sveltekit)

:::tip
_You aren't required to setup anything different than what you would do, but to leverage all capabilities of **Svelte Standalone** this is my recommended setup:_

- Move `app.css` to `src/shared/app.css`.
- Include your [kit.alias](https://svelte.dev/docs/kit/configuration#alias) to match `/src/shared/lib`.

_Thil will allow you to: [include your shadcn styles at Runtime](#including-a-runtime)_
:::

After these steps, you can just start creating your embedabbles using the Shadcn CLI.

## Adding A Shadcn Component

To continue explaining how easy is to have an amazing developer experience while using **Svelte Standalone** let's install the [Table component](https://www.shadcn-svelte.com/docs/components/table) from Shadcn.

1. **Create Your Embedabble**: For this embedabble, we can use the following options:
   - Name your component: `table`.
   - Choose an embedding strategy: `Explicit Call (Single Instance)`
2. **Install Table**
3. **Import Table To Your Embedabble**:

```svelte
<script lang="ts">
    import '../../shared/app.css'; // you can remove this if you have a runtime
    import * as Table from "$/ui/table"; // update to your alias
</script>

<Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
     <Table.Row>
      <Table.Head class="w-[100px]">Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Method</Table.Head>
      <Table.Head class="text-right">Amount</Table.Head>
     </Table.Row>
    </Table.Header>
    <Table.Body>
     <Table.Row>
      <Table.Cell class="font-medium">INV001</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell>Credit Card</Table.Cell>
      <Table.Cell class="text-right">$250.00</Table.Cell>
     </Table.Row>
    </Table.Body>
</Table.Root>
```

4. **Transform It**: Just by running `npm run standalone build -ap` you have a minified, production-ready standalone version of `Table`:

```bash
➜  shadcn-standalone bun standalone build -ap
vite v5.4.13 building for production...
✓ 41 modules transformed.
static/dist/standalone/table.min.js  45.37 kB │ gzip: 13.38 kB
✓ built in 815ms
```

## **Including a Runtime**

Turning the code into an embedabble isn't the only feature from **Svelte Standalone** if you're planning to have multipel embedabbles in the same app I would recommend you to [include styles into a runtime](/shared). It seems hard, but isn't. To handle it we just have to do the following:

- **Create Another Embedabble**: For this embedabble, we can use the following options:
  - Name your component: `$runtime`.
  - Choose an embedding strategy: `Auto-Embed on Body`

Initially, your runtime would be just:

```svelte
<script lang="ts">
    import '../../shared/app.css';
</script>
```

By creating an runtime and bundling it all of your styles from `/src/shared` are **only** included at `runtime.min.js`. Which means you'll can use multiple embedabbles in the same page, but download it's CSS only once.

:::tip
_If your target app has Tailwind, you can remove the following styles from app.css_

`@tailwind base;`

`@tailwind components;`

_If your target app doesnt include Tailwind, I would recommend you to create a runtime and include these styles only once_
:::

## Troubleshooting

You can see all the code used for this example [here](https://github.com/brenoliradev/shadcn-and-svelte-standalone/tree/main) but If you encounter any problems [open an issue](https://github.com/brenoliradev/svelte-standalone/issues) on GitHub for assistance.
