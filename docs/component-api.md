::: warning
_This feature is currently only supported in Svelte 4 and `svelte-standalone@1` (version should be 1.X.X)._
:::

# Leveraging Component API

**Svelte Standalone** exposes the `$set` and `$on` methods from the [Svelte Component API](https://svelte.dev/docs/svelte/legacy-component-api) at `window.<componentId>`. These methods allow you to interact with your standalone components programmatically.

## Available Methods

### `$set(props)`

Updates the component's props dynamically. This method is useful for modifying the component's state after it has been mounted.

#### Example:

```javascript
window.myComponent.$set({
	title: 'Updated Title',
	description: 'This is an updated description.'
});
```

### `$on(event, callback)`

Listens for custom events emitted by the component. This method allows you to handle events such as user interactions or state changes.

#### Example:

```javascript
window.myComponent.$on('click', (event) => {
	console.log('Component clicked!', event.detail);
});
```

## Example Usage

Here’s a complete example of how to use these methods with a standalone component:

1. **Create a Component**:

   ```bash
   npx standalone create
   ```

   Name your component (e.g., `myComponent`) and choose an embedding strategy.

2. **Build the Component**:

   ```bash
   npx standalone build
   ```

3. **Include the Component in Your HTML**:

   ```html
   <script src="/path/to/myComponent.min.js"></script>
   ```

4. **Interact with the Component**:

   ```javascript
   // Start the component
   window.myComponent.start({
   	title: 'Initial Title',
   	description: 'This is the initial description.'
   });

   // Update the component's props
   window.myComponent.$set({
   	title: 'Updated Title',
   	description: 'This is an updated description.'
   });

   // Listen for a custom event
   window.myComponent.$on('click', (event) => {
   	console.log('Component clicked!', event.detail);
   });
```
