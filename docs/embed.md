# Embed Methods

While [creating a standalone component](/cli#create), you can specify how your embeddable should be inserted after bundling it.

By default, all embed methods include a way to programmatically stop them. Additionally, after selecting your embed type, **Svelte Standalone** will automatically generate the necessary boilerplate for it.

::: tip
_You can change an existing embeddable's embed type by updating its embed method._
:::

## Explicit Call (Single Instance)

Embeds a Svelte component as a singleton. This method allows you to programmatically start and stop the component.

### Embed Method:

```javascript
import { embed } from 'svelte-standalone';
```

### Params:

- `mount`: The Svelte component to embed.
- `id`: A unique identifier for the component.

#### Usage:

- Start the component:
  ```javascript
  window.myComponent.start({
  	/* props */
  });
  ```
- Stop the component:
  ```javascript
  window.myComponent.stop();
  ```

#### Key Points:

- **Single Instance**: Ensures only one instance of the component is active at a time.
- **Component Props**: When calling `start`, you can include custom initial props.

## Explicit Call (Multiple Instances)

Embeds multiple instances of a Svelte component. This method allows you to create and manage multiple instances of the same component.

### Embed Method:

```javascript
import { embedMultiple } from 'svelte-standalone';
```

### Params:

- `mount`: The Svelte component to embed.
- `id`: A unique identifier for the component.

#### Usage:

- Start a new instance:
  ```javascript
  const instance = window.myComponent.start(
  	{
  		/* props */
  	},
  	'targetElementId'
  );
  ```
- Stop an instance:
  ```javascript
  instance.$destroy(); // For Svelte 4
  ```
  ```javascript
  instance.stop(); // For Svelte 5
  ```

#### Key Points:

- **Multiple Instances**: Allows multiple instances of the same component.
- **Component Props**: When calling `start`, you can include custom initial props.
- **Control Over Instances**: You can programmatically stop a specific instance.

## Auto-Embed with Target

Automatically embeds a Svelte component into a target element based on the URL query string.

### Embed Method:

```javascript
import { autoEmbedWithTarget } from 'svelte-standalone';
```

### Params:

- `mount`: The Svelte component to embed.
- `id`: A unique identifier for the component.

#### Usage:

- Include the script in your HTML:
  ```html
  <div id="targetElementId"></div>
  <script src="/path/to/myComponent.min.js?target=targetElementId"></script>
  ```

#### Key Points:

- **Automatic Embedding**: Automatically mounts the component to a target element.
- **Dynamic Targeting**: Uses URL query strings to determine the target element.

## Auto-Embed on Body

Automatically embeds a Svelte component into the document body.

### Embed Method:

```javascript
import { autoEmbedOnBody } from 'svelte-standalone';
```

### Params:

- `mount`: The Svelte component to embed.
- `id`: A unique identifier for the component.

#### Usage:

- Include the script in your HTML:
  ```html
  <script src="/path/to/myComponent.min.js"></script>
  ```

#### Key Points:

- **Simple Setup**: No need to specify a target element.
- **Automatic Embedding**: Automatically mounts the component to the `<body>`.
