import { EmbeddableStrageies } from '../cli-create.js';

const TYPE_TO_ROUTE: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'route-auto-start',
	autoEmbedWithTarget: 'route-with-target',
	embed: 'route-callable',
	embedMultiple: 'route-multiple',
	webcomponent: 'route-web-component'
} as const;

const TYPE_TO_STORY: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'story-no-config',
	autoEmbedWithTarget: 'story-no-config',
	embed: 'story-with-config',
	embedMultiple: 'story-with-config',
	webcomponent: 'story-with-config'
} as const;

const TYPE_TO_TYPESCRIPT: { [key in EmbeddableStrageies]?: string } = {
	autoEmbedOnBody: undefined,
	autoEmbedWithTarget: undefined,
	embed: 'types',
	embedMultiple: 'types-multiple',
	webcomponent: 'types-web-component'
} as const;

const TYPE_TO_EMBED: { [key in EmbeddableStrageies]?: string } = {
	autoEmbedOnBody: 'embed',
	autoEmbedWithTarget: 'embed-with-target',
	embed: 'embed',
	embedMultiple: 'embed',
	webcomponent: 'embed-web-component'
} as const;

export { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_TYPESCRIPT, TYPE_TO_STORY };
