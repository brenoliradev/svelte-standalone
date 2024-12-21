import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

/**
 * Limits instance to only public props from `SvelteComponent`
 */
type StandaloneInstance<T extends SvelteComponent> = Pick<T, '$destroy' | '$on' | '$set'>;

/**
 * Provides definition for `window[id].start` and `window[id].stop` works while embedding with {@link embed}.
 *
 * @template T - The Svelte component type being embedded.
 */
export type EmbedWindow<T extends SvelteComponent, R extends string> = {
	[id in R]: {
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

		instance: StandaloneInstance<T> | null;
	};
};

/**
 *  * Provides definition for `window[id].start` works while embedding with {@link embedMultiple}.
 *
 * @template T - The Svelte component type being embedded.
 */
export type MultipleEmbedWindow<T extends SvelteComponent, R extends string> = {
	[id in R]: {
		/**
		 * Starts a new instance of the Svelte component with the given props and target.
		 *
		 * @param {ComponentProps<T>} props - Props to initialize the component with.
		 * @param {string} [target] - Optional target element ID to embed the component into.
		 * @returns {Object} An object containing a `stop` method to destroy the component.
		 */
		start: (props: ComponentProps<T>, target?: string) => StandaloneInstance<T>;
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
export type TargetEmbeddedWindow<T extends SvelteComponent, R extends string> = {
	[id in R]: StandaloneInstance<T>;
};

/**
 * Embeds a Svelte component as a singleton.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The id of the embedding instance. Will define `window[id].start` to programmatically start the embeddable and `window[id].stop` to programmatically stop it.
 */
export function embed<T extends SvelteComponent, R extends string>(mount: ComponentType<T>, id: R) {
	let c: StandaloneInstance<T> | null;

	(window as unknown as EmbedWindow<T, R>)[id] = {
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
		stop: () => (c?.$destroy(), (c = null)),

		get instance() {
			return c;
		}
	};
}

/**
 * Embeds multiple instances of a Svelte component.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].start` to programmatically start the embeddable.
 */
export function embedMultiple<T extends SvelteComponent, R extends string>(
	mount: ComponentType<T>,
	id: R
) {
	(window as unknown as MultipleEmbedWindow<T, R>)[id] = {
		start: (props, target) =>
			new mount({
				target: document.getElementById(target!) ?? document.body,
				props: props
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
export const autoEmbedWithTarget = <T extends SvelteComponent, R extends string>(
	mount: ComponentType<T>
) => {
	const t = (document.currentScript as HTMLScriptElement).src
		.split('target=')[1]
		.split('&')[0] as R;

	const c = new mount({
		target: document.getElementById(t) ?? document.body
	});

	(window as unknown as TargetEmbeddedWindow<T, R>)[t] = c;
};

/**
 * Automatically embeds a Svelte component into the document body.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} mount - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].stop`.
 */
export const autoEmbedOnBody = <T extends SvelteComponent, R extends string>(
	mount: ComponentType<T>,
	id: R
) =>
	((window as unknown as TargetEmbeddedWindow<T, R>)[id] = new mount({
		target: document.body
	}));
