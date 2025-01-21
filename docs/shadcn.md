# Supporting Shadcn

**Svelte Standalone** makes possible to integrate even the modern UI kits with easy. You just need to follow the **two** steps bellow.

1. [Install Svelte Standalone](/install) - For the sake of simplicity, this tutorial is using only **Tailwind** and **TypeScript**.
2. [Install shadcn-svelte](https://www.shadcn-svelte.com/docs/installation/sveltekit) - You don't have to follow any workarounds, but to extract the best of **Svelte Standalone** do the following:
    - Move `app.css` to `src/shared/app.css`. 
    - Include your [kit.alias](https://svelte.dev/docs/kit/configuration#alias) to match `/src/shared/lib`.

After these two steps, you can just start creating your embedabbles using `Shadcn`.

## Installing A Shadcn Component

To continue explaining how easy is to have an amazing developer experience while using **Svelte Standalone** let's install the [Table component](https://www.shadcn-svelte.com/docs/components/table) from Shadcn.

1. **Create Your Embedabble**: For this, we can use the following options:
    - Name your component: `table`.
    - Choose an embedding strategy: `Explicit Call (Single Instance)`
2. **Install Table**
3. **Import Table To Your Embedabble**:

```svelte
<script lang="ts">
    import '../../shared/app.css';
    import * as Table from "$/ui/table";
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

4. **Transform It**: Just by running `npm run standalone build -ap` you're going to have a minified, production-ready standalone version of `Table`. This is my output for bundling the entire table:

```bash
➜  shadcn-standalone bun standalone build -ap
vite v5.4.13 building for production...
✓ 41 modules transformed.
static/dist/standalone/table.min.js  45.37 kB │ gzip: 13.38 kB
✓ built in 815ms
```

## **Including Shadcn at a Runtime**

Bundling code isn't the only feature from **Svelte Standalone** we can also [share the styles between multiple tables](/shared). To make it, we just have to:

- **Create Another Embedabble**: For this, we can use the following options:
    - Name your component: `$runtime`.
    - Choose an embedding strategy: `Auto-Embed on Body`

By creating an runtime and bundling all your embedabbles all of your styles from `/src/shared` are **only** included at `runtime.min.js`. This would be particularly usefull if you aim to use multiple Shadcn components in multiple embedabbles.