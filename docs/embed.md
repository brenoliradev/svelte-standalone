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
  instance.stop();
  ```

#### Key Points:

- **Multiple Instances**: Allows multiple instances of the same component.
- **Component Props**: When calling `start`, you can include custom initial props.
- **Control Over Instances**: You can programmatically stop a specific instance.

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

- Include the script in your HTML: (It'll be mounted at the provided `id`)
  ```html
  <div id="data-widget"></div>
  <script src="/path/to/myComponent.min.js"></script>
  ```

#### Key Points:

- **Simple Setup**: No need to specify a target element.
- **Automatic Embedding**: Automatically mounts the component to the `<body>`.

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

- Include the script in your HTML: (It'll be mounted at the provided `id`)
  ```html
  <!-- Auto-mount to element with matching id -->
  <!-- By default, it'll match to the widget `id` -->
  <div id="targetElementId"></div>
  <script src="/path/to/myComponent.min.js"></script>
  ```

#### Dynamic target:

- Include the script in your HTML with a `target` selector:
  ```html
  <div id="{{desiredId}}"></div>
  <script src="/path/to/myComponent.min.js?target={{desiredId}}"></script>
  ```

#### Key Points:

- **Automatic Embedding**: Automatically mounts the component to a target element.
- **Dynamic Targeting**: Uses URL query strings to determine the target element.

## Auto-Embed Multiple Element

Batch mount components to multiple elements using CSS class selector.

###Embed Method:
```javascript
import { autoEmbedMultiple } from 'svelte-standalone';
```

### Params:

- `mount`: The Svelte component to embed.
- `id`: A unique identifier for the component.

#### Usage:
```html
<!-- Auto-mount to elements with matching class -->
<!-- By default, it'll match to the widget `id` -->
<div class="data-widget"></div>
<div class="data-widget"></div>
<script src="/component.js?target=data-widget"></script>
```

#### Dynamic target:

- Include the script in your HTML with a `target` selector:
  ```html
  <div class="{{desiredClass}}"></div>
  <div class="{{desiredClass}}"></div>
  <script src="/path/to/myComponent.min.js?target={{desiredClass}}"></script>
  ```

#### Key Points:
- **CSS Class Targeting** - Batch element selection.
- **Bulk Initialization** - Create multiple instances at once.
- **Unified Control** - Remove all instances at once.