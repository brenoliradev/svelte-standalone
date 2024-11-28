import fs from 'fs';
import nodePlop, { NodePlopAPI, PlopGenerator } from 'node-plop';
import path from 'path';

import { rootDir } from './cli/utils/rootdir';
import { testWebComponent } from './cli/utils/isWebComponent';
import { EmbeddableStrageies } from './cli/cli-create';
import { TYPE_TO_EMBED, TYPE_TO_ROUTE, TYPE_TO_STORY, TYPE_TO_TYPESCRIPT } from './cli/utils';

const routesDir = path.resolve(rootDir, 'src/routes');

const initialContent = `<div class="flex flex-col items-start gap-2 p-2"></div>`;
const newLink = (componentName: string) =>
	`<a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/${componentName}">Redirect to ${componentName} script</a>\n`;

// Initialize Plop
const plop: NodePlopAPI = await nodePlop(`${__dirname}/plopfile.cjs`);

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseToPascalCase(componentName: string): string {
	return componentName
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}

/**
 * Generates a Storybook story file for a given component.
 */
export async function generateStoryFile(
	componentName: string,
	strategy: (typeof TYPE_TO_STORY)[EmbeddableStrageies]
): Promise<void> {
	const storyGenerator: PlopGenerator = plop.getGenerator('story');

	try {
		await storyGenerator.runActions({
			componentName,
			capitalizeName: testWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			strategy
		});
		console.log(`Story for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating story file for ${componentName}:`, err);
	}
}

/**
 * Generates embed files for a given component.
 */
export async function generateEmbedFiles(
	componentName: string,
	embedType: EmbeddableStrageies,
	strategy?: (typeof TYPE_TO_EMBED)[EmbeddableStrageies]
): Promise<void> {
	const embedGenerator: PlopGenerator = plop.getGenerator('embed files');

	try {
		await embedGenerator.runActions({
			componentName,
			capitalizeName: testWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			embedType,
			strategy
		});
		console.log(`Embed file for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating embed file for ${componentName}:`, err);
	}
}

/**
 * Generates type declaration files for a given component.
 */
export async function generateTypesFile(
	componentName: string,
	strategy?: (typeof TYPE_TO_TYPESCRIPT)[EmbeddableStrageies]
): Promise<void> {
	const typesGenerator: PlopGenerator = plop.getGenerator('types files');

	try {
		await typesGenerator.runActions({
			componentName,
			capitalizeName: testWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			strategy
		});
		console.log(`Types file for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating types file for ${componentName}:`, err);
	}
}

/**
 * Generates route files for a given component and appends a link to the routes page.
 */
export async function generateRoutesFile(
	componentName: string,
	strategy: (typeof TYPE_TO_ROUTE)[EmbeddableStrageies]
): Promise<void> {
	const routesGenerator: PlopGenerator = plop.getGenerator('routes files');
	const layoutGenerator: PlopGenerator = plop.getGenerator('layout files');

	await layoutGenerator.runActions({});

	try {
		await routesGenerator.runActions({
			componentName,
			capitalizeName: testWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			strategy
		});

		// Append link to routes page
		const pageFilePath = path.join(routesDir, '+page.svelte');

		fs.readFile(pageFilePath, 'utf8', (err, data) => {
			if (err && err.code !== 'ENOENT') {
				console.error(`Error reading ${pageFilePath}:`, err);
				return;
			}

			// Insert before the closing </div> tag
			const updatedData = (data || initialContent).replace(
				/(<\/div>)/g,
				`${newLink(componentName)}$1`
			);

			fs.writeFile(pageFilePath, updatedData, 'utf8', (err) => {
				if (err) {
					console.error(`Error writing ${pageFilePath}:`, err);
				} else {
					console.log(`Link added for ${componentName} successfully.`);
				}
			});
		});
		console.log(`Route file for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating route file for ${componentName}:`, err);
	}
}

/**
 * Generates a Svelte file for a given component.
 */
export async function generateSvelteFile(componentName: string, tailwind: boolean): Promise<void> {
	const svelteGenerator: PlopGenerator = plop.getGenerator('svelte files');

	const isWebComponent = testWebComponent(componentName);

	try {
		await svelteGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			svelteType: isWebComponent ? 'web-component' : 'component',
			tailwind
		});
		console.log(`Svelte file for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating Svelte file for ${componentName}:`, err);
	}
}
