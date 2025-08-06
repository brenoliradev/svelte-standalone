#!/usr/bin/env node

import { Command } from 'commander';

import { generate } from './cli-create.js';
import { build } from './cli-build.js';

const program = new Command();

program
	.name('standalone')
	.description('Transform Svelte components in standalone scripts!')
	.showHelpAfterError('(add --help for additional information)')
	.version('2.1.1', '-v, --version', 'output the current version');

program
	.command('create')
	.description('Generate code for start your standalone components')
	.action(generate);

program
	.command('build')
	.description('Build your standalone components')
	.option('-p, --production', 'Build for production', false) // Default Value
	.option('-a, --all', 'Build all Standalone components', false) // Default Value
	.option(
		'-i, --injectAssets',
		'Combine, minimise and inject all the styles and assets into one JS file',
		undefined
	)
	.option('--no-injectAssets', 'Spread all assets over separate, importable files')
	.option(
		'--strip-runtime',
		'Exclude "runtime" styles sharing and bundle shared styles directly into the selected components',
		false // Default Value
	)
	.option('-m, --mode <mode>', 'Override the Vite mode (production || development)')
	.option(
		'-s, --source <rel_dir>',
		'Change default source directory, to a different directory, relative to project root',
		'src/_standalone' // Default Value
	)
	.option(
		'-t, --target <rel_dir>',
		'Change default output directory, to a different directory, relative to project root',
		'static/dist' // Default Value
	)
	.action((options) => {
		if (options.stripRuntime) {
			console.log('Including shared styles in all components');
		}
		options.injectAssets === undefined
			? options.prod
				? (options.injectAssets = true) // inject when in prod
				: (options.injectAssets = false) // don't inject when in dev
			: null; // respect users setting, when value is set
		build({ ...options });
	});

if (process.argv.length < 3) {
	program.help();
}

program.parse(process.argv);
