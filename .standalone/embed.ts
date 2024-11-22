import type { ComponentProps, SvelteComponent } from 'svelte';

// default with import/export
export function embed<T>(mount: T, name: string) {
	var component;

	function start(props: ComponentProps<T extends SvelteComponent ? T : never>) {
		if (!component) {
			// @ts-expect-error
			component = new mount({
				target: document.body,
				props: {
					...props,
					id: name
				}
			});
		}
	}

	const stop = () => (component.$destroy(), (component = false));

	window[name] = {
		start,stop
		
	};
}

export function embedMultiple(mount: any, componentName: string, target?: string) {
	function start<T>(props: T) {
		const c = new mount({
			target: !target ? document.body : document.getElementById(target),
			props: props
		});

		return {
			stop: () => c.$destroy()
		};
	}

	window[componentName] = {
		start
	};
}

export const autoEmbedWithTarget = (mount: any) =>
	new mount({
		target: document.getElementById(
			new URL((document.currentScript as HTMLScriptElement).src).searchParams.get('target')!
		)
	});

export const autoEmbedOnBody = (mount: any, name: string) =>
	new mount({
		target: document.body
	});
