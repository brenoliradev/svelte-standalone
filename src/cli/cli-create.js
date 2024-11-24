import inquirer from 'inquirer';
import fs from 'fs';
import { create } from './methods/create.js';
const rootDir = process.cwd();
const embeddableName = {
    type: 'input',
    name: 'name',
    message: 'Name your embeddable:',
    required: true,
    validate: (input) => {
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
};
const webComponentName = {
    type: 'input',
    name: 'name',
    message: 'Name your web component:',
    required: true,
    validate: (input) => {
        if (!/^[a-z][a-z0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input)) {
            console.error('Invalid web component name. Please use lowercase letters, numbers, and hyphens (starting with a letter).');
            return false;
        }
        if (fs.existsSync(`${rootDir}/src/_standalone/${input}/index.svelte`)) {
            console.error(`Invalid name. ${input} already exists.`);
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
};
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
        }
    ]
};
export async function generate() {
    const a1 = await inquirer.prompt(embeddableStrategy);
    const a2 = await inquirer.prompt(a1.type === 'webcomponent' ? webComponentName : embeddableName);
    const a3 = await inquirer.prompt(shouldInclude);
    create(a2.name, a1.type, a3.support);
}
