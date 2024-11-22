import type { ComponentProps } from 'svelte';
import Beyonk from './index.svelte';

export type BeyonkProps = ComponentProps<Beyonk>;

export const defaultConfig: BeyonkProps = {};

declare global {
	interface Window {
		beyonk: {
			start(config: BeyonkProps): void;
			stop(): void;
		};
	}
}
