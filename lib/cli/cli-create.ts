import fs from 'fs';
import { rootDir } from '../dir.js';
import { input, select } from '@inquirer/prompts';
import { create } from './methods/create.js';

const dynamicPaths = [`runtime`, `+runtime`, `$runtime`].map(
	(suffix) => `${rootDir}/src/_standalone/${suffix}/index.svelte`
);

const embeddableName = {
	type: 'input',
	name: 'name',
	message: 'Name your embeddable:',
	validate: (input: string) => {
		const runtimePattern = /^[+$](?!runtime)/;
		const isRuntime = input.startsWith('$') || input.startsWith('+');

		if (runtimePattern.test(input)) {
			console.error(
				`Invalid name. "${input}" cannot start with "$" or "+", unless it's a runtime component.`
			);
			return false;
		}

		if (!isRuntime && !/^[a-zA-Z0-9_]+$/.test(input)) {
			console.error('Invalid component name. Please use only alphanumeric characters.');
			return false;
		}

		if (isRuntime && dynamicPaths.some((path) => fs.existsSync(path))) {
			console.error(`Invalid name. You can define only one runtime.`);
			return false;
		}

		const componentPath = `${rootDir}/src/_standalone/${input}/index.svelte`;
		if (fs.existsSync(componentPath)) {
			console.error(`Invalid name. "${input}" already exists.`);
			return false;
		}

		return true;
	}
};

const embeddableStrategy = {
	type: 'list',
	name: 'type',
	message: 'When should your embeddable be triggered?',
	choices: [
		{
			name: 'On explicit call (can only be mounted once)',
			value: 'embed',
			short: 'Explicit call'
		},
		{
			name: 'On explicit call (can be mounted multiple times)',
			value: 'embedMultiple',
			short: 'Explicit call w/ instances'
		},
		{
			name: 'Automatically append to the target <div> when downloaded',
			value: 'autoEmbedWithTarget',
			short: 'Auto-embed with target'
		},
		{
			name: 'Automatically append to the <body> when downloaded',
			value: 'autoEmbedOnBody',
			short: 'Auto-embed on body'
		}
	]
} as const;

export type EmbeddableStrategies = (typeof embeddableStrategy.choices)[number]['value'];

export async function generate() {
	try {
		const a1 = await select(embeddableStrategy);
		const a2 = await input(embeddableName);

		create(a2, a1);
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error;
		}
	}
}
