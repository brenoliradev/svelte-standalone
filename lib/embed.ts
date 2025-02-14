import { unmount, type ComponentProps, type Component, mount } from 'svelte';

/**
 * Provides definition for `window[id].start` and `window[id].stop` works while embedding with {@link embed}.
 *
 * @template T - The Svelte component type being embedded.
 */
export type EmbedWindow<T extends Component, R extends string> = {
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
	};
};

/**
 *  * Provides definition for `window[id].start` works while embedding with {@link embedMultiple}.
 *
 * @template T - The Svelte component type being embedded.
 */
export type MultipleEmbedWindow<T extends Component, R extends string> = {
	[id in R]: {
		/**
		 * Starts a new instance of the Svelte component with the given props and target.
		 *
		 * @param {ComponentProps<T>} props - Props to initialize the component with.
		 * @param {string} [target] - Optional target element ID to embed the component into.
		 * @returns {Object} An object containing a `stop` method to destroy the component.
		 */
		start: (props: ComponentProps<T>, target?: string) => { stop: () => void };
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
		stop: () => void;
	};
};

/**
 * Embeds a Svelte component as a singleton.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} component - The Svelte component to embed.
 * @param {string} id - The id of the embedding instance. Will define `window[id].start` to programmatically start the embeddable and `window[id].stop` to programmatically stop it.
 */
export function embed<T extends Component, R extends string>(component: Component, id: R) {
	let c: Record<string, unknown> | undefined = undefined;

	(window as unknown as EmbedWindow<T, R>)[id] = {
		start: (props) => {
			if (!c) {
				c = mount(component, {
					target: document.body,
					props: {
						...props
					}
				});
			}
		},
		stop: () => c && (unmount(c), (c = undefined))
	};
}

/**
 * Embeds multiple instances of a Svelte component.
 *
 * @template T - The Svelte component type.
 * @param {ComponentType<T>} component - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].start` to programmatically start the embeddable.
 */
export function embedMultiple<T extends Component, R extends string>(component: Component, id: R) {
	(window as unknown as MultipleEmbedWindow<T, R>)[id] = {
		start: (props, target) => {
			const c = mount(component, {
				target: document.getElementById(target!) ?? document.body,
				props: props
			});

			return {
				stop: () => unmount(c)
			};
		}
	};
}

/**
 * Automatically embeds a Svelte component in a specific DOM target based on the URL query string.
 *
 * * Should provide a `target` search param to URL. Will define `window[target].stop to programmatically stop the embeddable`.
 *
 * @template T - The Svelte component type.
 * @param {T} component - The Svelte component to embed.
 */
export const autoEmbedWithTarget = <T extends Component, R extends string>(component: T, id: R) => {
	const t = (document.currentScript as HTMLScriptElement).src
		.split('target=')[1]
		.split('&')[0] as R;

	const c = mount(component, {
		target: document.getElementById(t ?? id) ?? document.body
	});

	(window as unknown as TargetEmbeddedWindow<R>)[t] = {
		stop: () => unmount(c)
	};
};

/**
 * Automatically embeds a Svelte component into the document body.
 *
 * @template T - The Svelte component type.
 * @param {Component<T>} component - The Svelte component to embed.
 * @param {string} id - The name of the embedding instance. Will define `window[id].stop`.
 */
export const autoEmbedOnBody = <T extends Component, R extends string>(component: T, id: R) => {
	const c = mount(component, {
		target: document.body
	});

	(window as unknown as TargetEmbeddedWindow<R>)[id] = {
		stop: () => unmount(c)
	};
};
