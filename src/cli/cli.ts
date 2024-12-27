#!/usr/bin/env node

import { Command } from 'commander';

import { generate } from './cli-create.js';
import { build } from './cli-build.js';

const program = new Command();

program
	.name('standalone')
	.description('Transform Svelte components in standalone scripts!')
	.showHelpAfterError('(add --help for additional information)')
	.version('1.3.3', '-v, --version', 'output the current version');

program
	.command('create')
	.description('Generate code for start your standalone components')
	.action(generate);

program
	.command('build')
	.description('Build your standalone components')
	.option('-p, --production', 'Build for production')
	.option('-a, --all', 'Build all Standalone components')
	.option(
		'--strip-runtime',
		'Exclude "runtime" styles sharing and bundle shared styles directly into the selected components'
	)
	.action((cmd) => {
		if (cmd.stripRuntime) {
			console.log('Including shared styles in all components');
		}
		build(cmd.production, cmd.all, cmd.stripRuntime);
	});

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);
