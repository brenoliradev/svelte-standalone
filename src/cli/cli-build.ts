import inquirer from 'inquirer';

import { glob } from 'glob';
import { buildStandalone } from './methods/build';

const components = glob
	.sync('src/_standalone/**/embed.{js,ts}') // Matches both .js and .ts
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
	.sync('src/_standalone/**/index.svelte')
	.map((path) => {
		const match = path.match(/src\/_standalone\/(.*?)\/index\.svelte/);
		return match ? { match: match[1], path } : null;
	})
	.filter((w) => components.filter((c) => c.name !== w?.match).length)
	.map((c) => ({
		name: c?.match ?? undefined,
		value: c?.path ?? undefined,
		checked: true
	}));

const buildStrategy = {
	type: 'checkbox',
	name: 'components',
	message: 'Which components should be builded?',
	choices: [...webComponents, ...components]
} as const satisfies Parameters<typeof inquirer.prompt>[0];

const questions = [buildStrategy] satisfies readonly Parameters<typeof inquirer.prompt>[0][];

export type BuildStrageies = (typeof buildStrategy.choices)[number]['value'];

export async function build() {
	const answers = await inquirer.prompt(questions);

	if (!components.length) {
		console.warn("You don't have any standalone component. Generate them using bun standalone generate.")
		return
	}

	buildStandalone(answers.components);
}