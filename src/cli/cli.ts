#!/usr/bin/env bun
import { Command } from 'commander';

import packageJson from '../../package.json';

import { generate } from './cli-create.js';
import { build } from './cli-build.js';
import { setup } from './cli-setup.js';

const program = new Command();

program
	.name('standalone')
	.description('Generate standalone components with delightful developer experience')
	.version(packageJson.version, '-v, --version', 'output the current version');

program
	.command('create')
	.description('Generate code for start your standalone components')
	.action(generate);

program.command('add').description('Setup your components').action(setup);

program.command('build').description('Build your standalone components').action(build);

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);
