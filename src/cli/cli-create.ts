import path from 'path';
import fs from 'fs';

import { rootDir } from './utils/rootdir.js';
import inquirer from 'inquirer';

import { create } from './methods/create.js';

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

const webComponentName = {
	type: 'input',
	name: 'name',
	message: 'Name your web component:',
	required: true,
	validate: (input: string) => {
		if (!/^[a-z][a-z0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input)) {
			console.error(
				'Invalid web component name. Please use lowercase letters, numbers, and hyphens (starting with a letter).'
			);
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
			name: 'Should bundle as a Web Component',
			value: 'webcomponent',
			short: 'Web component'
		},
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
	const a2 = await inquirer.prompt(
		(a1.type as EmbeddableStrageies) === 'webcomponent' ? webComponentName : embeddableName
	);

	create(a2.name, a1.type);
}
