import { findUpSync } from 'find-up';

const root = findUpSync('package.json')?.replace('/package.json', '');

export const rootDir = root ?? process.cwd();
