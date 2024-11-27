/* eslint-disable */
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type EmbedWindow<T extends SvelteComponent> = Window & {
	[key: string]: {
		start: (props: ComponentProps<T>) => void;
		stop: () => void;
	};
};

export type MultipleEmbedWindow<T extends SvelteComponent> = Window & {
	[key: string]: {
		start: (
			props: ComponentProps<T>,
			target?: string
		) => {
			stop: () => void;
		};
	};
};

export type TargetEmbeddedWindow<R extends string> = Window & {
	[key in R]: {
		stop: () => void;
	};
};

export function embed<T extends SvelteComponent>(m: ComponentType<T>, n: string) {
	var c: InstanceType<ComponentType> | null;

	(window as unknown as EmbedWindow<T>)[n] = {
		start: (props) => {
			if (!c) {
				c = new m({
					target: document.body,
					props: {
						...props,
						id: n
					}
				});
			}
		},
		stop: () => (c?.$destroy(), (c = null))
	};
}

export function embedMultiple<T extends SvelteComponent>(m: ComponentType<T>, n: string) {
	(window as unknown as MultipleEmbedWindow<T>)[n] = {
		start: (props, target) => ({
			stop: () =>
				new m({
					target: document.getElementById(target!) ?? document.body,
					props: props
				}).$destroy()
		})
	};
}

export const autoEmbedWithTarget = <T extends SvelteComponent>(m: ComponentType<T>) => {
	const t = window.location.search.split('target=')[1].split('&')[0]!;

	(window as unknown as TargetEmbeddedWindow<typeof t>)[t] = {
		stop: () =>
			new m({
				target: document.getElementById(t) ?? document.body
			}).$destroy()
	};
};

export const autoEmbedOnBody = <T extends SvelteComponent>(m: ComponentType<T>, n: string) =>
	((window as unknown as TargetEmbeddedWindow<typeof n>)[n] = {
		stop: () =>
			new m({
				target: document.body
			}).$destroy()
	});
