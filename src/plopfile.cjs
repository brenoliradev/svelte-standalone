const rootDir = process.cwd()

module.exports = function (plop) {
	plop.setGenerator('story', {
		description: 'Generate a Storybook story',
		actions: [
			{
				type: 'add',
				path: rootDir + '/src/stories/{{componentName}}.stories.ts',
				templateFile: 'src/plop-templates/story/{{strategy}}.hbs'
			}
		]
	});
	plop.setGenerator('embed files', {
		description: 'Generate a embed.ts default file',
		actions: [
			{
				type: 'add',
				path: rootDir + '/src/_standalone/{{componentName}}/embed.ts',
				templateFile: 'src/plop-templates/embed/{{strategy}}.hbs'
			}
		]
	});
	plop.setGenerator('types files', {
		description: 'Generate a types.ts default file',
		actions: [
			{
				type: 'add',
				path: rootDir + '/src/_standalone/{{componentName}}/types.ts',
				templateFile: 'src/plop-templates/types/{{strategy}}.hbs'
			}
		]
	});
	plop.setGenerator('routes files', {
		description: 'Generate a default route handler that imports the script',
		actions: [
			{
				type: 'add',
				path: rootDir + '/src/routes/{{componentName}}/+page.svelte',
				templateFile: 'src/plop-templates/route/{{strategy}}.hbs'
			}
		]
	});
	plop.setGenerator('svelte files', {
		description: 'Generate a default svelte component to be embedded',
		actions: [
			{
				type: 'add',
				path: rootDir + '/src/_standalone/{{componentName}}/index.svelte',
				templateFile: 'src/plop-templates/{{svelteType}}.hbs'
			}
		]
	});
};
