import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

/**
 * Provides definition for `window[id].start` and `window[id].stop` works while embedding with {@link embed}. 
 * 
 * @template T - The Svelte component type being embedded.
 */
export type EmbedWindow<T extends SvelteComponent> = {
	[id: string]: {
		/**
		 * Starts the Svelte component with the given props.
		 *
		 * @param {ComponentProps<T>} props - Props to initialize the component with.
		 */
		start: (props: ComponentProps<T>) => void;

		/**
		 * Stops the component and destroys it.
		 */
		stop: () => void;
	};
};

/**
 *  * Provides definition for `window[id].start` works while embedding with {@link embedMultiple}. 
 *
 * @template T - The Svelte component type being embedded.
 */
export type MultipleEmbedWindow<T extends SvelteComponent> = {
	[id: string]: {
		/**
		 * Starts a new instance of the Svelte component with the given props and target.
		 *
		 * @param {ComponentProps<T>} props - Props to initialize the component with.
		 * @param {string} [target] - Optional target element ID to embed the component into.
		 * @returns {Object} An object containing a `stop` method to destroy the component.
		 */
		start: (
			props: ComponentProps<T>,
			target?: string
		) => {
			stop: () => void;
		};
	};
};

/**
 * Provides definition for `window[id].stop` works while embedding with {@link autoEmbedOnBody} or {@link autoEmbedWithTarget}.
 * 
 * * For {@link autoEmbedOnBody} `id` will be the embeddable name. 
 * * For {@link autoEmbedWithTarget} `id` will be the target.
 * 
 * @template R - A string type used as embeddable `id`. 
 */
export type TargetEmbeddedWindow<R extends string> = {
	[id in R]: {
		/**
		 * Stops and destroys the embedded component.
		 */
		stop: () => void;
	};
};

/**
 * Embeds a Svelte component as a singleton.
 * 
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The id of the embedding instance. Will define `window[id].start` to programmatically start the embeddable and `window[id].stop` to programmatically stop it.
 */
export function embed<T extends SvelteComponent>(mount: ComponentType<T>, id: string) {
	let c: InstanceType<ComponentType> | null;

	(window as unknown as EmbedWindow<T>)[id] = {
		start: (props) => {
			if (!c) {
				c = new mount({
					target: document.body,
					props: {
						...props
					}
				});
			}
		},
		stop: () => (c?.$destroy(), (c = null))
	};
}

/**
 * Embeds multiple instances of a Svelte component.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].start` to programmatically start the embeddable.
 */
export function embedMultiple<T extends SvelteComponent>(mount: ComponentType<T>, id: string) {
	(window as unknown as MultipleEmbedWindow<T>)[id] = {
		start: (props, target) => ({
			stop: () =>
				new mount({
					target: document.getElementById(target!) ?? document.body,
					props: props
				}).$destroy()
		})
	};
}

/**
 * Automatically embeds a Svelte component in a specific DOM target based on the URL query string.
 *
 * * Should provide a `target` search param to URL. Will define `window[target].stop to programmatically stop the embeddable`. 
 * 
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 */
export const autoEmbedWithTarget = <T extends SvelteComponent>(mount: ComponentType<T>) => {
	const t = window.location.search.split('target=')[1].split('&')[0]!;

	(window as unknown as TargetEmbeddedWindow<typeof t>)[t] = {
		stop: () =>
			new mount({
				target: document.getElementById(t) ?? document.body
			}).$destroy()
	};
};

/**
 * Automatically embeds a Svelte component into the document body.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].stop`.
 */
export const autoEmbedOnBody = <T extends SvelteComponent>(mount: ComponentType<T>, id: string) =>
	((window as unknown as TargetEmbeddedWindow<typeof id>)[id] = {
		stop: () =>
			new mount({
				target: document.body
			}).$destroy()
	});
