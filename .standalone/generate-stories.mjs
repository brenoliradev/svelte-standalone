import fs from 'fs';
import nodePlop from 'node-plop';
import path from 'path';


const routesDir = 'src/routes';

// Initialize Plop
const plop = await nodePlop('.standalone/plopfile.cjs');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateFiles(componentName, fileType, embedType, strategy) {
	const storyGenerator = plop.getGenerator('story');
	const embedGenerator = plop.getGenerator('embed files');
	const typesGenerator = plop.getGenerator('types files');
	const routesGenerator = plop.getGenerator('routes files');
	const svelteGenerator = plop.getGenerator('svelte files');

	console.log(embedType, strategy)

	try {
		if (fileType === 'story') {
			await storyGenerator.runActions({
				componentName,
				capitalizeName: capitalizeFirstLetter(componentName)
			});
			console.log(`Story for ${componentName} generated successfully.`);
		}

		if (fileType === 'embed') {
			await embedGenerator.runActions({
				componentName,
				capitalizeName: capitalizeFirstLetter(componentName),
				embedType,
				strategy
			});
			console.log(`Embed file for ${componentName} generated successfully.`);
		}

		if (fileType === 'types') {
			await typesGenerator.runActions({
				componentName,
				capitalizeName: capitalizeFirstLetter(componentName)
			});
			console.log(`Types file for ${componentName} generated successfully.`);
		}

		if (fileType === 'routes') {
			await routesGenerator.runActions({
				componentName,
				capitalizeName: capitalizeFirstLetter(componentName)
			});
			// Append to the /src/routes/+page.svelte
			const pageFilePath = path.join(routesDir, '+page.svelte');
			const newLink = `<a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/${componentName}">Redirect to ${componentName} script</a>\n`;

			fs.readFile(pageFilePath, 'utf8', (err, data) => {
				if (err) {
					console.error(`Error reading ${pageFilePath}:`, err);
					return;
				}

				// Insert before the closing </div> tag
				const updatedData = data.replace(/(<\/div>)/g, `${newLink}$1`);

				fs.writeFile(pageFilePath, updatedData, 'utf8', (err) => {
					if (err) {
						console.error(`Error writing ${pageFilePath}:`, err);
					} else {
						console.log(`Link added for ${componentName} successfully.`);
					}
				});
			});
			console.log(`Route file for ${componentName} generated successfully.`);
		}

		if (fileType === 'svelte') {
			await svelteGenerator.runActions({
				componentName,
				capitalizeName: capitalizeFirstLetter(componentName)
			});
			console.log(`Types file for ${componentName} generated successfully.`);
		}
	} catch (err) {
		console.error(`Error generating files for ${componentName}:`, err);
	}
}