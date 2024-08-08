module.exports = function (plop) {
	plop.setGenerator('story', {
		description: 'Generate a Storybook story',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'Component name?',
				when: () => false // We won't prompt for the component name since we'll pass it as an argument
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/stories/{{componentName}}.stories.ts',
				templateFile: 'plop-templates/story.hbs'
			}
		]
	});
	plop.setGenerator('embed files', {
		description: 'Generate a embed.ts default file',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'Component name?',
				when: () => false // We won't prompt for the component name since we'll pass it as an argument
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/_widgets/{{componentName}}/embed.ts',
				templateFile: 'plop-templates/embed.hbs'
			}
		]
	});
	plop.setGenerator('types files', {
		description: 'Generate a types.ts default file',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'Component name?',
				when: () => false // We won't prompt for the component name since we'll pass it as an argument
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/_widgets/{{componentName}}/types.ts',
				templateFile: 'plop-templates/types.hbs'
			}
		]
	});
};
