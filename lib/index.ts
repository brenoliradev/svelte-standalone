import {
	embed,
	autoEmbedOnBody,
	autoEmbedWithTarget,
	embedMultiple,
	autoEmbedMultiple
} from './embed.js';
import type { EmbedWindow, MultipleEmbedWindow, TargetEmbeddedWindow } from './embed.js';

export type ComponentList = keyof Omit<Window, keyof typeof globalThis | number | 'name'>;

export {
	embed,
	autoEmbedOnBody,
	autoEmbedWithTarget,
	embedMultiple,
	autoEmbedMultiple,
	type EmbedWindow,
	type MultipleEmbedWindow,
	type TargetEmbeddedWindow
};
