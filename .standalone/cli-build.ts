import inquirer from 'inquirer';

import { glob } from 'glob';
import { buildStandalone } from './build';

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

const buildStrategy = {
	type: 'checkbox',
	name: 'components',
	message: 'Which components should be builded?',
	choices: [...components]
} as const satisfies Parameters<typeof inquirer.prompt>[0];

const questions = [buildStrategy] satisfies readonly Parameters<typeof inquirer.prompt>[0][];

export type BuildStrageies = (typeof buildStrategy.choices)[number]['value'];

async function cli() {
	const answers = await inquirer.prompt(questions);

	buildStandalone(answers.components);
}

if (components.length) cli();
