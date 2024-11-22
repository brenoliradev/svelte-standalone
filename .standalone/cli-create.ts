import inquirer from 'inquirer';

import { create } from './create';

const embeddableName = {
  type: 'input',
  name: 'name',
  message: 'Please name your embeddable',
  required: true
} as const

const embeddableStrategy =   {
  type: 'list',
  name: 'type',
  message: 'When should your embeddable be triggered?',
  choices: [
    {
      name: 'On explicit call (window.<componentName>.start)',
      value: 'embed',
      short: 'Explicit Call',
    },
    {
      name: 'When downloaded (with Target Element specified)',
      value: 'autoEmbedWithTarget',
      short: 'Auto-Embed with Target',
    },
    {
      name: 'When downloaded (automatically appended to the body)',
      value: 'autoEmbedOnBody',
      short: 'Auto-Embed on Body',
    },
  ],
} as const

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