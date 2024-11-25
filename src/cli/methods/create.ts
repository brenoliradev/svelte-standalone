import { EmbeddableStrageies } from '../cli-create.js';
import {
	generateEmbedFiles,
	generateRoutesFile,
	generateStoryFile,
	generateSvelteFile,
	generateTypesFile
} from '../../generate-plop.js';

import {
	TYPE_TO_EMBED,
	TYPE_TO_ROUTE,
	TYPE_TO_STORY,
	TYPE_TO_TYPESCRIPT
} from '../utils/hashmaps.js';

export const create = (componentName: string, type: EmbeddableStrageies) => {
	// if ([support].includes('storybook')) {
	// 	generateStoryFile(componentName, TYPE_TO_STORY[type]);
	// }

	generateEmbedFiles(componentName, type, TYPE_TO_EMBED[type]);

	generateTypesFile(componentName, TYPE_TO_TYPESCRIPT[type]);

	// if ([support].includes('routes')) {
	// 	generateRoutesFile(componentName, TYPE_TO_ROUTE[type]);
	// }

	generateSvelteFile(componentName);
};
