import inquirer from 'inquirer';

const config = {
	type: 'checkbox',
	name: 'type',
	message: 'What your generate ?',
	choices: [
		{
			name: 'Storybook',
			value: 'storybook',
			short: 'Storybook'
		},
		{
			name: 'Routes',
			value: 'routes',
			short: 'Routes'
		}
	]
} as const satisfies Parameters<typeof inquirer.prompt>[0];

export async function configurate() {
	const answers = await inquirer.prompt(config);

	console.log(answers.type);
}
