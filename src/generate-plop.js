import fs from 'fs';
import nodePlop from 'node-plop';
import path from 'path';
import { rootDir } from './cli/utils/rootdir';

const routesDir = `${rootDir}/src/routes`;

const initialContent = `<div class="flex flex-col items-start gap-2 p-2"></div>`;
const newLink = (componentName) =>
	`<a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/${componentName}">Redirect to ${componentName} script</a>\n`;

// Initialize Plop
const plop = await nodePlop(`${__dirname}/plopfile.cjs`);

function isWebComponent(componentName) {
	return componentName.includes('-');
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseToPascalCase(componentName) {
	return componentName
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}

/**
 * Generates a Storybook story file for a given component.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} strategy - The strategy for generating the file.
 */
export async function generateStoryFile(componentName, strategy) {
	const storyGenerator = plop.getGenerator('story');

	try {
		await storyGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent(componentName)
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
 *
 * @param {string} componentName - The name of the component.
 * @param {string} embedType - The type of embed (e.g., inline, script).
 * @param {string | undefined} strategy - The strategy for generating the file.
 */
export async function generateEmbedFiles(componentName, embedType, strategy) {
	const embedGenerator = plop.getGenerator('embed files');

	try {
		await embedGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent(componentName)
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
 *
 * @param {string} componentName - The name of the component.
 * @param {string | undefined} strategy - The type of embed (e.g., inline, script).
 */
export async function generateTypesFile(componentName, strategy) {
	const typesGenerator = plop.getGenerator('types files');

	try {
		await typesGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent(componentName)
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
 *
 * @param {string} componentName - The name of the component.
 * @param {string} strategy - The strategy for generating the file.
 */
export async function generateRoutesFile(componentName, strategy) {
	const routesGenerator = plop.getGenerator('routes files');

	try {
		await routesGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			strategy
		});

		// Append link to routes page
		const pageFilePath = path.join(routesDir, '+page.svelte');

		fs.readFile(pageFilePath, 'utf8', (err, data) => {
			if (err.code !== 'ENOENT') {
				console.error(`Error reading ${pageFilePath}:`, err);
				return;
			}

			// Insert before the closing </div> tag
			const updatedData = (data ? data : initialContent).replace(
				/(<\/div>)/g,
				`${newLink(componentName)}$1`
			);

			fs.appendFile(pageFilePath, updatedData, 'utf8', (err) => {
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
 *
 * @param {string} componentName - The name of the component.
 */
export async function generateSvelteFile(componentName) {
	const svelteGenerator = plop.getGenerator('svelte files');

	try {
		await svelteGenerator.runActions({
			componentName,
			capitalizeName: isWebComponent(componentName)
				? parseToPascalCase(componentName)
				: capitalizeFirstLetter(componentName),
			svelteType: isWebComponent ? 'web-component' : 'component'
		});
		console.log(`Svelte file for ${componentName} generated successfully.`);
	} catch (err) {
		console.error(`Error generating Svelte file for ${componentName}:`, err);
	}
}
