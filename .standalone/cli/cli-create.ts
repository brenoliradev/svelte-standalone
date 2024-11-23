import inquirer from 'inquirer';
import fs from 'fs';

import { create } from './methods/create';

const embeddableName = {
	type: 'input',
	name: 'name',
	message: 'Name your embeddable:',
	required: true,
	validate: (input) => {
		if (!/^[a-zA-Z0-9_]+$/.test(input)) {
			console.error('Invalid component name. Please use only alphanumeric characters.');
			return false;
		}
		if (fs.existsSync(`src/_standalone/${input}/index.svelte`)) {
			console.error(`Invalid component name. ${input} already exists.`);
			return false;
		}
		return true;
	}
} as const satisfies Parameters<typeof inquirer.prompt>[0];

const embeddableStrategy = {
	type: 'list',
	name: 'type',
	message: 'When should your embeddable be triggered?',
	choices: [
		{
			name: 'On explicit call can be mounted only once',
			value: 'embed',
			short: 'Explicit call'
		},
		{
			name: 'On explicit call can be mounted as much time as needed',
			value: 'embedMultiple',
			short: 'Explicit call w/ instances'
		},
		{
			name: 'When downloaded automatically append it to target <div>',
			value: 'autoEmbedWithTarget',
			short: 'Auto-embed with target'
		},
		{
			name: 'When downloaded automatically append to the <body>',
			value: 'autoEmbedOnBody',
			short: 'Auto-embed on body'
		}
	]
} as const satisfies Parameters<typeof inquirer.prompt>[0];

const questions = [embeddableName, embeddableStrategy] satisfies readonly Parameters<
	typeof inquirer.prompt
>[0][];

export type EmbeddableStrageies = (typeof embeddableStrategy.choices)[number]['value'];

export async function generate() {
	const answers = await inquirer.prompt(questions);

	create(answers.name, answers.type);
}