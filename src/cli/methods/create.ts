import { EmbeddableStrageies } from '../cli-create';
import { generateFiles } from '../../generate-stories.mjs';

const TYPE_TO_ROUTE: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'route-auto-start',
	autoEmbedWithTarget: 'route-with-target',
	embed: 'route-callable',
	embedMultiple: 'route-multiple',
	webcomponent: 'route-web-component'
};

const TYPE_TO_STORY: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'story-no-config',
	autoEmbedWithTarget: 'story-no-config',
	embed: 'story-with-config',
	embedMultiple: 'story-with-config',
	webcomponent: 'story-with-config'
};

const TYPE_TO_TYPESCRIPT: { [key in EmbeddableStrageies]?: string } = {
	autoEmbedOnBody: undefined,
	autoEmbedWithTarget: undefined,
	embed: 'types',
	embedMultiple: 'types-multiple',
	webcomponent: 'types-web-component'
};

const TYPE_TO_EMBED: { [key in EmbeddableStrageies]?: string } = {
	autoEmbedOnBody: 'embed',
	autoEmbedWithTarget: 'embed-with-target',
	embed: 'embed',
	embedMultiple: 'embed',
	webcomponent: 'embed-web-component'
};

export const create = (componentName: string, type: EmbeddableStrageies) => {
	generateFiles(componentName, 'story', undefined, TYPE_TO_STORY[type], type === 'webcomponent');

	generateFiles(componentName, 'embed', type, TYPE_TO_EMBED[type], type === 'webcomponent');

	generateFiles(
		componentName,
		'types',
		undefined,
		TYPE_TO_TYPESCRIPT[type],
		type === 'webcomponent'
	);

	generateFiles(componentName, 'routes', undefined, TYPE_TO_ROUTE[type], type === 'webcomponent');

	generateFiles(componentName, 'svelte', undefined, undefined, type === 'webcomponent');
};
