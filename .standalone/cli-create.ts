import inquirer from 'inquirer';
import fs from 'fs'

import { create } from './create';

const embeddableName = {
  type: 'input',
  name: 'name',
  message: 'Name your embeddable:',
  required: true,
  validate: (input) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
      console.error("Invalid component name. Please use only alphanumeric characters.");
      return false;
    }
    if (fs.existsSync(`src/_standalone/${input}/index.svelte`)) {
      console.error(`Invalid component name. ${input} already exists.`);
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
      name: 'On explicit call will contain types.ts',
      value: 'embed',
      short: 'Explicit Call',
    },
    {
      name: 'When downloaded append it to target <div>',
      value: 'autoEmbedWithTarget',
      short: 'Auto-Embed with Target',
    },
    {
      name: 'When downloaded automatically append to the <body>',
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