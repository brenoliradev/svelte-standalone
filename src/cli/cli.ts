#!/usr/bin/env bun

import { Command } from 'commander';

import v from '../../v.json';

import { generate } from './cli-create';

import { build } from './cli-build';

import { setup } from './cli-setup';

const program = new Command();

program
	.name('standalone')
	.description('Generate standalone components with delightful developer experience')
	.version(v, '-v, --version', 'output the current version');

program
	.command('create')
	.description('Generate code for start your standalone components')
	.action(generate);

program.command('add').description('Setup your components').action(setup);

program
	.command('build')
	.description('Build your standalone components')
	.option('--production, -p', 'Build for production')
	.option('--all, -a', 'Build all Standalone components')
	.action((cmd) => {
		build(cmd.production, cmd.all);
	});

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);
