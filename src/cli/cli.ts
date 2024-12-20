#!/usr/bin/env node

import { Command } from 'commander';

import { generate } from './cli-create.js';
import { build } from './cli-build.js';

const program = new Command();

program
	.name('standalone')
	.description('Generate standalone components with delightful developer experience')
	.version("0.6.17-rc", '-v, --version', 'output the current version');

program
	.command('create')
	.description('Generate code for start your standalone components')
	.action(generate);

program
	.command('build')
	.description('Build your standalone components')
	.option('-p, --production', 'Build for production')
	.option('-a, --all', 'Build all Standalone components')
	.action((cmd) => {
		build(cmd.production, cmd.all);
	});

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);