import fs from 'fs';
import path from 'path';
import { EmbeddableStrageies } from '../cli-create';
import {
	generateEmbedFiles,
	generateRoutesFile,
	generateStoryFile,
	generateSvelteFile,
	generateTypesFile
} from '../../generate-plop.js';

import { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_STORY, TYPE_TO_TYPESCRIPT } from '../utils/hashmaps';

import { rootDir } from '../utils/rootdir';

const storybookPath = path.resolve(rootDir, '.storybook');
const tailwindPath = path.resolve(rootDir, 'tailwind.config.js');
const svelteKitPath = path.resolve(rootDir, 'node_modules/@sveltejs/kit');

const includesKit = fs.existsSync(svelteKitPath);
const includesStorybook = fs.existsSync(storybookPath);
const includesTailwind = fs.existsSync(tailwindPath);

export const create = (componentName: string, type: EmbeddableStrageies) => {
	if (includesStorybook) {
		generateStoryFile(componentName, TYPE_TO_STORY[type]);
	}

	if (includesKit) {
		generateRoutesFile(componentName, TYPE_TO_ROUTE[type]);
	}

	generateEmbedFiles(componentName, type, TYPE_TO_EMBED[type]);
	
	generateTypesFile(componentName, TYPE_TO_TYPESCRIPT[type]);

	generateSvelteFile(componentName, includesTailwind);
};
