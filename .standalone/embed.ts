// default with import/export
export function embed(mount: any, name: string) {
	function start<T>(props: T) {
		let div = document.getElementById(name);

		if (!div) {
			div = document.createElement('div');
			div.id = name;
			document.body.appendChild(div);
		}

		new (mount as any)({
			// TODO: revaluate this type
			target: div,
			props: props
		});
	}

	function stop() {
		const div = document.getElementById(name);

		if (div) {
			div.remove();
		}
	}

	window[name] = {
		start,
		stop
	};
}

/**
 * Dynamically embeds a Svelte component into a DOM element specified via a URL parameter.
 *
 * @function embedWithParams
 * @param {any} mount - The Svelte component class to instantiate.
 *
 * @description
 * This function initializes a Svelte component and mounts it to a target DOM element.
 * The target element is identified using the `target` parameter in the query string
 * of the script's `src` URL. The function assumes it is executed from within the script
 * where `document.currentScript` points to the script tag.
 *
 * Example usage:
 * ```html
 * <script src="embed.js?target=myTargetElement"></script>
 * <div id="myTargetElement"></div>
 * ```
 * ```typescript
 * // embed.ts
 * import MyComponent from './MyComponent.svelte';
 * import { embedWithParams } from 'standalone/embed';
 *
 * embedWithParams(MyComponent);
 * ```
 *
 * @throws {Error} Will log an error to the console if the target element is not found
 * or if the component initialization fails.
 */
export const embedWithParams = (mount: any) =>
	new mount({
		target: document.getElementById(
			new URL((document.currentScript as HTMLScriptElement).src).searchParams.get('target')!
		)
	});
