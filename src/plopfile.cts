import { rootDir } from './cli/utils/rootdir';

import path from 'path';

import { NodePlopAPI } from 'node-plop';

const templates = __dirname.replace('/dist/src', '');

module.exports = function (plop: NodePlopAPI) {
	plop.setGenerator('story', {
		description: 'Generate a Storybook story',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/stories/{{componentName}}.stories.ts'),
				templateFile: path.resolve(templates, 'src/plop-templates/story/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('embed files', {
		description: 'Generate a embed.ts default file',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/embed.ts'),
				templateFile: path.resolve(templates, 'src/plop-templates/embed/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('types files', {
		description: 'Generate a types.ts default file',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/types.ts'),
				templateFile: path.resolve(templates, 'src/plop-templates/types/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('routes files', {
		description: 'Generate a default route handler that imports the script',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/routes/{{componentName}}/+page.svelte'),
				templateFile: path.resolve(templates, 'src/plop-templates/route/{{strategy}}.hbs')
			}
		]
	});

	plop.setGenerator('layout files', {
		description: 'Generate a layout handler once',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/routes/+layout.svelte'),
				templateFile: path.resolve(templates, 'src/plop-templates/route/layout.hbs')
			}
		]
	});

	plop.setGenerator('svelte files', {
		description: 'Generate a default svelte component to be embedded',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src/_standalone/{{componentName}}/index.svelte'),
				templateFile: path.resolve(templates, 'src/plop-templates/component.hbs')
			}
		]
	});

	plop.setGenerator('tool files', {
		description: 'Implement a default tooling',
		actions: [
			{
				type: 'add',
				path: path.resolve(rootDir, 'src'),
				templateFile: path.resolve(templates, 'src/plop-templates/tool/{{tool}}.hbs')
			}
		]
	});
};
