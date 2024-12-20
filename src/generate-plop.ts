import fs from 'fs/promises';
import nodePlop, { NodePlopAPI, PlopGenerator } from 'node-plop';
import path from 'path';

import { distDir, rootDir } from './dir.js';
import { EmbeddableStrageies } from './cli/cli-create.js';
import { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_STORY, TYPE_TO_TYPESCRIPT } from './cli/utils/hashmaps.js';

import { includesTailwind, includesTypeScript } from './cli/utils/isDependency.js';

const routesDir = path.resolve(rootDir, 'src', 'routes');
const initialContent = `<div></div>`;
const newLink = (componentName: string) =>
	`<a class="home-button" href="/${componentName}">Redirect to ${componentName} script</a>\n`;

const typescript = includesTypeScript();
const tailwind = includesTailwind();

const plop: NodePlopAPI = await nodePlop(
	path.resolve(distDir, typescript ? 'plopfile.cjs' : 'plopfile-with-js.cjs')
);

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

async function generateFile<T extends Record<EmbeddableStrageies, string>>(
	generatorName: string,
	componentName: string,
	additionalArgs: {
		embedType?: EmbeddableStrageies;
		strategy?: T[EmbeddableStrageies];
		tailwind?: boolean;
	}
): Promise<void> {
	const generator: PlopGenerator = plop.getGenerator(generatorName);

	try {
		await generator.runActions({
			componentName,
			capitalizeName: capitalizeFirstLetter(componentName),
			typescript,
			...additionalArgs
		});
		console.log(
			`${generatorName.charAt(0).toUpperCase() + generatorName.slice(1)} for ${componentName} generated successfully.`
		);
	} catch (err) {
		console.error(`Error generating ${generatorName} for ${componentName}:`, err);
	}
}

/**
 * Generates a Storybook story file for a given component.
 */
export async function generateStoryFile(
	componentName: string,
	strategy: (typeof TYPE_TO_STORY)[EmbeddableStrageies]
): Promise<void> {
	await generateFile('story', componentName, { strategy });
}

/**
 * Generates embed files for a given component.
 */
export async function generateEmbedFiles(
	componentName: string,
	embedType: EmbeddableStrageies,
	strategy?: (typeof TYPE_TO_EMBED)[EmbeddableStrageies]
): Promise<void> {
	await generateFile('embed files', componentName, { embedType, strategy });
}

/**
 * Generates type declaration files for a given component.
 */
export async function generateTypesFile(
	componentName: string,
	strategy?: (typeof TYPE_TO_TYPESCRIPT)[EmbeddableStrageies]
): Promise<void> {
	await generateFile('config files', componentName, {
		strategy: typescript ? strategy : 'no-typescript'
	});
}

/**
 * Generates route files for a given component and appends a link to the routes page.
 */
export async function generateRoutesFile(
	componentName: string,
	strategy: (typeof TYPE_TO_ROUTE)[EmbeddableStrageies]
): Promise<void> {
	const layoutGenerator: PlopGenerator = plop.getGenerator('layout files');

	await layoutGenerator.runActions({});
	await generateFile('routes files', componentName, { strategy });

	const pageFilePath = path.join(routesDir, '+page.svelte');
	try {
		let data = await fs.readFile(pageFilePath, 'utf8');
		data = (data || initialContent).replace(/(<\/div>)/g, `${newLink(componentName)}$1`);

		await fs.writeFile(pageFilePath, data, 'utf8');
		console.log(`Link added for ${componentName} successfully.`);
	} catch (err) {
		console.error(`Error updating ${pageFilePath}:`, err);
	}
}

/**
 * Generates a Svelte file for a given component.
 */
export async function generateSvelteFile(componentName: string): Promise<void> {
	await generateFile('svelte files', componentName, { tailwind });
}
