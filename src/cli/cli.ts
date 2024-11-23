#!/usr/bin/env bun
import { Command } from 'commander';

import { generate } from './cli-create';
import { build } from './cli-build';

import packageJson from '../../package.json';
import { configurate } from './cli-config';

const program = new Command();

program
  .name('standalone')
  .description('Generate standalone components with delightful developer experience')
  .version(packageJson.version, '-v, --version', 'output the current version');

program
  .command('generate')
  .description('Generate code for start your standalone components')
  .action(generate);

program
  .command('config')
  .description('Configure standalone support')
  .action(configurate)

program
  .command('build')
  .description('Build your standalone components')
  .action(build);

if (process.argv.length < 3) {
  program.help();
}

program.parse(process.argv);
