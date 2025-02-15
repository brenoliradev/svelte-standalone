import fs from 'fs/promises';
import nodePlop, { NodePlopAPI, PlopGenerator } from 'node-plop';
import path from 'path';

import { distDir, rootDir } from './dir.js';
import { EmbeddableStrategies } from './cli/cli-create.js';
import { TYPE_TO_ROUTE, TYPE_TO_STORY, TYPE_TO_TYPESCRIPT } from './cli/utils/hashmaps.js';

import { includesTailwind, includesTypeScript } from './cli/utils/isDependency.js';

const routesDir = path.resolve(rootDir, 'src', 'routes');

const initialContent = `<div class="layout"></div>

<style>
	.layout {
		display: flex;
		padding: 0.25rem;
	}

	.button {
		padding: 8px 12px;
		border-radius: 0.5rem;
		font-weight: 500;
		color: #ffffff; 
		background-color: #1D4ED8; 
	}

	.button:hover {
		background-color: #1E40AF; 
	}
</style>`;

const newLink = (componentName: string) =>
	`<a class="button" href="/${componentName}">Redirect to ${componentName} script</a>\n`;

const typescript = includesTypeScript();
const tailwind = includesTailwind();

const plop: NodePlopAPI = await nodePlop(
	path.resolve(distDir, typescript ? 'plopfile.js' : 'plopfile-with-js.js')
);

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

async function generateFile<T extends Record<EmbeddableStrategies, string>>(
	generatorName: string,
	componentName: string,
	additionalArgs: {
		embedType?: EmbeddableStrategies;
		strategy?: T[EmbeddableStrategies];
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
	strategy: (typeof TYPE_TO_STORY)[EmbeddableStrategies]
): Promise<void> {
	await generateFile('story', componentName, { strategy });
}

/**
 * Generates embed files for a given component.
 */
export async function generateEmbedFiles(
	componentName: string,
	embedType: EmbeddableStrategies
): Promise<void> {
	await generateFile('embed files', componentName, { embedType });
}

/**
 * Generates type declaration files for a given component.
 */
export async function generateTypesFile(
	componentName: string,
	strategy?: (typeof TYPE_TO_TYPESCRIPT)[EmbeddableStrategies]
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
	strategy: (typeof TYPE_TO_ROUTE)[EmbeddableStrategies]
): Promise<void> {
	const layoutGenerator: PlopGenerator = plop.getGenerator('layout files');

	await layoutGenerator.runActions({});
	await generateFile('routes files', componentName, { strategy });

	const pageFilePath = path.join(routesDir, '+page.svelte');

	await fs
		.readFile(pageFilePath, 'utf8')
		.then(async (data) => {
			await fs
				.writeFile(pageFilePath, data.replace(/(<\/div>)/g, `${newLink(componentName)}$1`), 'utf8')
				.then(() => {
					console.log(`Link added for ${componentName} successfully.`);
				})
				.catch((err) => {
					console.error(`Error updating ${pageFilePath}:`, err);
				});
		})
		.catch(async (err) => {
			if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
				await fs
					.writeFile(
						pageFilePath,
						initialContent.replace(/(<\/div>)/g, `${newLink(componentName)}$1`),
						'utf8'
					)
					.then(() => {
						console.log(`Created ${pageFilePath} with initial content.`);
					});
				return;
			}

			throw err;
		});
}

/**
 * Generates a Svelte file for a given component.
 */
export async function generateSvelteFile(componentName: string): Promise<void> {
	await generateFile('svelte files', componentName, { tailwind });
}
