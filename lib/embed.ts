import { type Component, type ComponentProps, mount, unmount } from 'svelte';

type UnmountOptions = Parameters<typeof unmount>['1'];

/**
 * Global singleton component controller interface
 * @template T - Svelte component class
 * @template R - Window property key
 */
export type EmbedWindow<T extends Component, R extends string> = {
	[id in R]: {
		/** Initializes singleton instance with props */
		start: (props: ComponentProps<T>) => void;
		/** Destroys instance and cleans up DOM */
		stop: (options?: UnmountOptions) => void;
	};
};

/**
 * Multi-instance component factory interface
 * @template T - Component constructor type
 * @template R - Window namespace key
 */
export type MultipleEmbedWindow<T extends Component, R extends string> = {
	[id in R]: {
		/** Creates new instance with optional target */
		start: (
			props: ComponentProps<T>,
			target?: string
		) => { stop: (options?: UnmountOptions) => void };
	};
};

/**
 * Contextual auto-embedding controller interface
 * @template R - DOM identifier (ID or class)
 */
export type TargetEmbeddedWindow<T extends Component, R extends string> = {
	[id in R]: {
		/** Destroys all instances in context */
		stop: (options?: UnmountOptions) => void;
	};
};

/**
 * Singleton component manager
 * @param component - Svelte component to manage
 * @param id - Global window property key
 *
 * @example
 * embed(Modal, 'authDialog');
 * window.authDialog.start({ title: 'Login' });
 * window.authDialog.stop();
 */
export function embed<T extends Component, R extends string>(component: T, id: R): void {
	let instance: ReturnType<typeof mount> | undefined;

	(window as unknown as EmbedWindow<T, R>)[id] = {
		start: (props) => {
			if (!instance) {
				instance = mount(component, {
					target: document.body,
					props
				});
			}
		},
		stop: (options) => {
			if (instance) {
				unmount(instance, options);
				instance = undefined;
			}
		}
	};
}

/**
 * Multi-instance component factory
 * @param component - Component to instantiate
 * @param id - Window namespace key
 *
 * @example
 * embedMultiple(Toast, 'notifications');
 * const toast = window.notifications.start({ message: 'Saved!' }, 'status-area');
 * toast.stop();
 */
export function embedMultiple<T extends Component, R extends string>(component: T, id: R): void {
	(window as unknown as MultipleEmbedWindow<T, R>)[id] = {
		start: (props, target) => {
			const instance = mount(component, {
				target: document.getElementById(target!) ?? document.body,
				props
			});

			return {
				stop: () => unmount(instance)
			};
		}
	};
}

/**
 * Auto-mount to elements by URL parameter target
 * @param component - Component to auto-install
 * @param targetId - Target css id to mount your Component - can be provided dynamically by adding a `target` at your widget search params.
 *
 * @example
 * // Load script with ?target=chart-container
 * autoEmbedWithTarget(DataChart, 'chart');
 * window['chart-container'].stop();
 */
export function autoEmbedWithTarget<T extends Component, R extends string>(
	component: T,
	targetId: R
): void {
	const target =
		(new URLSearchParams(window.location.search).get('target') as string as R) ?? targetId;
	const instance = mount(component, {
		target: document.getElementById(target) ?? document.body
	});

	(window as unknown as TargetEmbeddedWindow<T, R>)[target] = {
		stop: () => unmount(instance)
	};
}

/**
 * Full-page component auto-mounter
 * @param component - Component to render
 * @param id - Window property key
 *
 * @example
 * autoEmbedOnBody(Loader, 'pageLoader');
 * window.pageLoader.stop();
 */
export function autoEmbedOnBody<T extends Component, R extends string>(component: T, id: R): void {
	const instance = mount(component, { target: document.body });

	(window as unknown as TargetEmbeddedWindow<T, R>)[id] = {
		stop: () => unmount(instance)
	};
}

/**
 * Batch mount by CSS class selector
 * @param component - Component to replicate
 * @param targetClass - Target css class to mount your Component - can be provided dynamically by adding a `target` at your widget search params.
 *
 * @example
 * autoEmbedMultiple(Tooltip, 'hint');
 * window.hint.stop(); // Removes all tooltips
 */
export function autoEmbedMultiple<T extends Component, R extends string>(
	component: T,
	targetClass: R
): void {
	const target =
		(new URLSearchParams(window.location.search).get('target') as string as R) ?? targetClass;

	const e = Array.from(document.getElementsByClassName(target)).map((el) =>
		mount(component, { target: el })
	);

	(window as unknown as TargetEmbeddedWindow<T, R>)[target] = {
		stop: (options) => e.forEach((instance) => unmount(instance, options))
	};
}
