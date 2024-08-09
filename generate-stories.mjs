import fs from 'fs';
import nodePlop from 'node-plop';
import path from 'path';

const componentsDir = './src/_widgets'; // Your components directory
const storybookDir = './src/stories'; // Your stories directory
const routesDir = './src/routes'

// Initialize Plop
const plop = await nodePlop('./plopfile.cjs');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

async function generateFiles(componentName) {
	const storyGenerator = plop.getGenerator('story');
	const embedGenerator = plop.getGenerator('embed files');
	const typesGenerator = plop.getGenerator('types files');
	const routesGenerator = plop.getGenerator('routes files');

	try {
		await storyGenerator.runActions({
			componentName,
			capitalizeName: capitalizeFirstLetter(componentName)
		});
		console.log(`Story for ${componentName} generated successfully.`);
		await embedGenerator.runActions({
			componentName,
			capitalizeName: capitalizeFirstLetter(componentName)
		});
		console.log(`Embed file for ${componentName} generated successfully.`);
		await typesGenerator.runActions({
			componentName,
			capitalizeName: capitalizeFirstLetter(componentName)
		});
		console.log(`Types file for ${componentName} generated successfully.`);
		await routesGenerator.runActions({
			componentName,
			capitalizeName: capitalizeFirstLetter(componentName)
		});
		console.log(`Route file for ${componentName} generated successfully.`);
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

		// Check if the story, embed, and types files already exist
		if (
			!fs.existsSync(storyFilePath) ||
			!fs.existsSync(embedFilePath) ||
			!fs.existsSync(typesFilePath) || 
			!fs.existsSync(routesFilePath)
		) {
			console.log(`Generating files for ${componentName}`);
			generateFiles(componentName);
		} else {
			console.log(`Files for ${componentName} already exist, skipping.`);
		}
	});
});
