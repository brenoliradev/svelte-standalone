import inquirer from 'inquirer';

import { glob } from 'glob';
import { buildStandalone } from './methods';
import { testWebComponent } from './utils/isWebComponent';

const rootDir = process.cwd();

const components = glob
	.sync(`${rootDir}/src/_standalone/**/embed.{js,ts}`) // Matches both .js and .ts
	.map((path) => {
		const match = path.match(/src\/_standalone\/(.*?)\/embed\.(js|ts)/);
		return match ? { match: match[1], path } : null;
	})
	.filter(Boolean)

	.map((c) => ({
		name: c?.match ?? undefined,
		value: c?.path ?? undefined,
		checked: true
	}));

const webComponents = glob
	.sync(`${rootDir}/src/_standalone/**/index.svelte`)
	.map((path) => {
		const match = path.match(/src\/_standalone\/(.*?)\/index\.svelte/);
		return match ? { match: match[1], path } : null;
	})
	.filter((w) => w && testWebComponent(w.match))
	.map((c) => ({
		name: c?.match ?? undefined,
		value: c?.path ?? undefined,
		checked: true
	}));

const c = [...webComponents, ...components].filter((c) => c.value && c.name) as {
	name: string;
	value: string;
	checked: boolean;
}[];

export const buildStrategy = {
	type: 'checkbox',
	name: 'components',
	message: 'Which components should be builded?',
	choices: c
} as const satisfies Parameters<typeof inquirer.prompt>[0];

export type BuildStrageies = (typeof buildStrategy.choices)[number]['value'];

export async function build(prod: boolean, all: boolean) {
	if (buildStrategy.choices.length === 0) {
		console.warn(
			"You don't have any standalone component. Generate them using bun standalone generate."
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

	const answers = await inquirer.prompt(buildStrategy);

	buildStandalone(answers.components, prod);
}
