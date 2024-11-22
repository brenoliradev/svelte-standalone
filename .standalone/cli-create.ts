import inquirer from 'inquirer';

import { create } from './create';

const componentNameRegex = /^[a-zA-Z0-9]+$/;

const embeddableName = {
  type: 'input',
  name: 'name',
  message: 'Name your embeddable:',
  required: true,
  validate: (input) => {
    if (!componentNameRegex.test(input)) {
      console.error("Invalid component name. Please use only alphanumeric characters.");
      return false;
    }
    return true;
  },
} as const satisfies Parameters<typeof inquirer.prompt>[0]
 
const embeddableStrategy =   {
  type: 'list',
  name: 'type',
  message: 'When should your embeddable be triggered?',
  choices: [
    {
      name: 'On explicit call - has types.ts',
      value: 'embed',
      short: 'Explicit Call',
    },
    {
      name: 'When downloaded - appended to target div',
      value: 'autoEmbedWithTarget',
      short: 'Auto-Embed with Target',
    },
    {
      name: 'When downloaded - automatically appended to the body',
      value: 'autoEmbedOnBody',
      short: 'Auto-Embed on Body',
    },
  ],
} as const satisfies Parameters<typeof inquirer.prompt>[0]

const questions = [
  embeddableName,
  embeddableStrategy
] satisfies readonly Parameters<typeof inquirer.prompt>[0][];

export type EmbeddableStrageies = typeof embeddableStrategy.choices[number]['value']

async function cli() {
  const answers = await inquirer.prompt(questions);
  
  create(answers.name, answers.type);
}

cli();