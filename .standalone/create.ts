import { EmbeddableStrageies } from './cli-create';
import { generateFiles } from './generate-stories.mjs';

const TYPE_TO_ROUTE: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'route-auto-start',
	autoEmbedWithTarget: 'route-with-target',
	embed: 'route-callable',
	embedMultiple: 'route-multiple'
};

const TYPE_TO_STORY: { [key in EmbeddableStrageies]: string } = {
	autoEmbedOnBody: 'story-no-config',
	autoEmbedWithTarget: 'story-no-config',
	embed: 'story-with-config',
	embedMultiple: 'story-with-config'
};

export const create = (componentName: string, type: EmbeddableStrageies) => {
	generateFiles(componentName, 'story', undefined, TYPE_TO_STORY[type]);

	generateFiles(
		componentName,
		'embed',
		type,
		type === 'autoEmbedWithTarget' ? 'embed-with-target' : 'embed'
	);

	if (type === 'embed' || type === 'embedMultiple') {
		generateFiles(
			componentName,
			'types',
			undefined,
			type === 'embed' ? 'types' : 'types-multiples'
		);
	}

	generateFiles(componentName, 'routes', undefined, TYPE_TO_ROUTE[type]);

	generateFiles(componentName, 'svelte');
};
