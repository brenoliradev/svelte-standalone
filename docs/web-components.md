:::warning
*This is currently a workaround. It only works in this specific setup.*
:::

# Bundling Web Components

You can bundle Web Components using **Svelte Standalone** as a tool. To setup it, you need to:

1. **Setup your `svelte.config.js`**: Set `compilerOptions.customElement` to `true`.
2. **Generate a Standalone Component**: Run `standalone create` and create a component. The `embed method` isn't important.
3. **Setup your Web Component**: Add the following options to your svelte component.

```javascript
<svelte:options 
    customElement={{
        tag: "standalone-button",
        shadow: 'none'
    }}
/>
```

4. **Update Your Embed File**: This is the correct `embed method` for Web Components.

```javascript
import Once from './index.svelte'

customElements.define('my-element', Once as any);
```

5. **Bundle it**: Once you run `standalone build` you have your Web Component fully setup.

## Troubleshooting

If you encounter any issues during installation, [open an issue](https://github.com/brenoliradev/svelte-standalone/issues) on GitHub for assistance.
