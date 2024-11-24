import inquirer from 'inquirer';
import fs from 'fs';

import { handleSetup } from './methods/setup.js';

const shouldInclude = {
	type: 'checkbox',
	name: 'support',
	message: 'What do you want for your embedabble?',
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
		},
        {
            name: 'Tailwind',
            value: 'tailwind',
            short: 'Tailwind'
        },
        {
            name: 'Vitest',
            value: 'vitest',
            short: 'Vitest'
        }
	]
} as const;

export type Support = (typeof shouldInclude.choices)[number]['value'];

export async function setup() {
	const answers = await inquirer.prompt(shouldInclude);

	handleSetup(answers.support);
}