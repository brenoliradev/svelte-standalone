import fs from 'fs';
import nodePlop from 'node-plop';
import path from 'path';

const componentsDir = 'src/_widgets'; // Your components directory
const storybookDir = 'src/stories'; // Your stories directory
const routesDir = 'src/routes';

// Initialize Plop
const plop = await nodePlop('.standalone/plopfile.cjs');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

async function generateFiles(componentName, fileType) {
	const storyGenerator = plop.getGenerator('story');
	const embedGenerator = plop.getGenerator('embed files');
	const typesGenerator = plop.getGenerator('types files');
	const routesGenerator = plop.getGenerator('routes files');

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
				capitalizeName: capitalizeFirstLetter(componentName)
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
	} catch (err) {
		console.error(`Error generating files for ${componentName}:`, err);
	}
}

fs.readdir(componentsDir, (err, files) => {
	if (err) {
		console.error('Could not list the directory.', err);
		process.exit(1);
	}

	files.forEach((file) => {
		const componentName = path.parse(file).name;

		const storyFilePath = path.join(storybookDir, `${componentName}.stories.ts`);
		const embedFilePath = path.join(componentsDir, componentName, 'embed.ts');
		const typesFilePath = path.join(componentsDir, componentName, 'types.ts');
		const routesFilePath = path.join(routesDir, componentName, '+page.svelte');

		if (!fs.existsSync(storyFilePath)) {
			console.log(`Story file for ${componentName} is missing, generating.`);
			generateFiles(componentName, 'story');
		}

		if (!fs.existsSync(embedFilePath)) {
			console.log(`Embed file for ${componentName} is missing, generating.`);
			generateFiles(componentName, 'embed');
		}

		if (!fs.existsSync(typesFilePath)) {
			console.log(`Types file for ${componentName} is missing, generating.`);
			generateFiles(componentName, 'types');
		}

		if (!fs.existsSync(routesFilePath)) {
			console.log(`Route file for ${componentName} is missing, generating.`);
			generateFiles(componentName, 'routes');
		}
	});
});
