import { moduleDir, rootDir } from './cli/utils/rootdir';
import path from 'path';
import { NodePlopAPI } from 'node-plop';

module.exports = function (plop: NodePlopAPI) {
	plop.setGenerator('story', {
		description: 'Generate a Storybook story',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/stories/{{componentName}}.stories.ts'),
				templateFile: path.join(moduleDir, 'plop-templates/story/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('embed files', {
		description: 'Generate an embed.ts default file',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/_standalone/{{componentName}}/embed.ts'),
				templateFile: path.join(moduleDir, 'plop-templates/embed/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('config files', {
		description: 'Generate a config.ts default file',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/_standalone/{{componentName}}/config.ts'),
				templateFile: path.join(moduleDir, 'plop-templates/config/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('routes files', {
		description: 'Generate a default route handler that imports the script',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/routes/{{componentName}}/+page.svelte'),
				templateFile: path.join(moduleDir, 'plop-templates/route/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('layout files', {
		description: 'Generate a layout handler once',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/routes/+layout.svelte'),
				templateFile: path.join(moduleDir, 'plop-templates/route/layout.hbs')
			}
		]
	});

	plop.setGenerator('svelte files', {
		description: 'Generate a default Svelte component to be embedded',
		actions: [
			{
				type: 'add',
				path: path.join(rootDir, 'src/_standalone/{{componentName}}/index.svelte'),
				templateFile: path.join(moduleDir, 'plop-templates/structure/component.hbs')
			}
		]
	});
};
