import type { ComponentProps, SvelteComponent } from 'svelte';

// default with import/export
export function embed<T>(m: T, n: string) {
	var c;

	window[n] = {
		start: (props: ComponentProps<T extends SvelteComponent ? T : never>) => {
			if (!c) {
				// @ts-expect-error
				c = new m({
					target: document.body,
					props: {
						...props,
						id: n
					}
				});
			}
		},
		stop: () => (c.$destroy(), (c = false))
	};
}

export function embedMultiple(m: any, n: string) {
	window[n] = {
		start: <T>(props: T, target?: string) => {
			const c = new m({
				target: !target ? document.body : document.getElementById(target),
				props: props
			});

			return {
				stop: () => c.$destroy()
			};
		}
	};
}

export const autoEmbedWithTarget = (mount: any) => {
	const t = new URL((document.currentScript as HTMLScriptElement).src).searchParams.get('target');

	const c = new mount({
		target: document.getElementById(t)
	});

	window[t] = {
		stop: () => c.$destroy()
	};
};

export const autoEmbedOnBody = (m: any, n: string) => {
	const c = new m({
		target: document.body
	});

	window[n] = {
		stop: () => c.$destroy()
	};
};
