import inquirer from 'inquirer';

const config = {
	type: 'checkbox',
	name: 'type',
	message: 'What your standalone components support?',
	choices: [
		{
			name: 'Storybook',
			value: 'storybook',
			short: 'Storybook'
		},
		{
			name: 'Tailwind',
			value: 'tailwind',
			short: 'Tailwind'
		},
		{
			name: 'Vitest',
			value: 'vitest',
			short: 'vitest'
		}
	]
} as const satisfies Parameters<typeof inquirer.prompt>[0];

export async function configurate() {
	const answers = await inquirer.prompt(config);

	console.log(answers.type);
}
