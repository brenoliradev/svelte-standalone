import { embed, autoEmbedOnBody, autoEmbedWithTarget, embedMultiple } from './embed';
import type { EmbedWindow, MultipleEmbedWindow, TargetEmbeddedWindow } from './embed';

export type ComponentList = keyof Omit<Window, keyof typeof globalThis | number | 'name'>;

export {
	embed,
	autoEmbedOnBody,
	autoEmbedWithTarget,
	embedMultiple,
	type EmbedWindow,
	type MultipleEmbedWindow,
	type TargetEmbeddedWindow
};
