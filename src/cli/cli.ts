#!/usr/bin/env bun
import { Command } from 'commander';

import { generate } from './cli-create.js';
import { build } from './cli-build.js';

const packageJson = require('../../package.json');

const program = new Command();

program
	.name('standalone')
	.description('Generate standalone components with delightful developer experience')
	.version(packageJson.version, '-v, --version', 'output the current version');

program
	.command('generate')
	.description('Generate code for start your standalone components')
	.action(generate);

program.command('build').description('Build your standalone components').action(build);

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);
