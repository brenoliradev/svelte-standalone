import { moduleDir, rootDir } from './cli/utils/rootdir';
import path from 'path';
import { NodePlopAPI } from 'node-plop';

module.exports = function (plop: NodePlopAPI) {
	plop.setGenerator('story', {
		description: 'Generate a Storybook story',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/stories/{{componentName}}.stories.js'),
				templateFile: path.resolve(moduleDir, 'plop-templates/story/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('embed files', {
		description: 'Generate an embed.js default file',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/embed.js'),
				templateFile: path.resolve(moduleDir, 'plop-templates/embed/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('config files', {
		description: 'Generate a config.js default file',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/config.js'),
				templateFile: path.resolve(moduleDir, 'plop-templates/config/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('routes files', {
		description: 'Generate a default route handler that imports the script',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/routes/{{componentName}}/+page.svelte'),
				templateFile: path.resolve(moduleDir, 'plop-templates/route/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('layout files', {
		description: 'Generate a layout handler once',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/routes/+layout.svelte'),
				templateFile: path.resolve(moduleDir, 'plop-templates/route/layout.hbs')
			}
		]
	});

	plop.setGenerator('svelte files', {
		description: 'Generate a default Svelte component to be embedded',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/index.svelte'),
				templateFile: path.resolve(moduleDir, 'plop-templates/structure/component.hbs')
			}
		]
	});
};
