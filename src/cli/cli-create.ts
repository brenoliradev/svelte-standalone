import fs from 'fs';

import { rootDir } from '../dir';
import inquirer from 'inquirer';

import { create } from './methods/create';

const embeddableName = {
	type: 'input',
	name: 'name',
	message: 'Name your embeddable:',
	required: true,
	validate: (input: string) => {
		if (!/^[a-zA-Z0-9_]+$/.test(input)) {
			console.error('Invalid component name. Please use only alphanumeric characters.');
			return false;
		}
		if (fs.existsSync(`${rootDir}/src/_standalone/${input}/index.svelte`)) {
			console.error(`Invalid name. ${input} already exists.`);
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
} as const;

export type EmbeddableStrageies = (typeof embeddableStrategy.choices)[number]['value'];

export async function generate() {
	const a1 = await inquirer.prompt(embeddableStrategy);
	const a2 = await inquirer.prompt(embeddableName);

	create(a2.name, a1.type);
}
