import { checkbox } from '@inquirer/prompts';

import { glob } from 'glob';
import { buildStandalone } from './methods/index.js';
import path from 'path';

const rootDir = process.cwd();

const components = glob
	.sync(`${rootDir}/src/_standalone/**/embed.{js,ts}`) // Matches both .js and .ts
	.map((file) => {
		const normalizedPath = path.normalize(file);
		const match = normalizedPath.match(/src[\\/]_standalone[\\/](.*?)[\\/]embed\.(js|ts)/);
		return match ? { match: match[1], file } : null;
	})
	.filter(Boolean)

	.map((c) => ({
		name: c?.match ?? undefined,
		value: c?.file ?? undefined,
		checked: true
	}));

const c = components.filter((c) => c.value && c.name) as {
	name: string;
	value: string;
	checked: boolean;
}[];

export const buildStrategy = {
	name: 'components',
	message: 'Which components should be builded?',
	choices: c
} as const;

export async function build(prod: boolean, all: boolean) {
	if (buildStrategy.choices.length === 0) {
		console.warn(
			"You don't have any standalone component. Create them running: standalone create."
		);

		return;
	}

	if (all) {
		buildStandalone(
			c.map((c) => c.value),
			prod
		);

		return;
	}

	const answers = await checkbox(buildStrategy);

	try {
		buildStandalone(answers, prod);
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error;
		}
	}
}
