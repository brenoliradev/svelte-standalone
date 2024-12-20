import { findUpSync } from 'find-up';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = findUpSync('package.json');

const root = p ? path.dirname(p) : null;

export const rootDir = root ?? process.cwd();
export const distDir = __dirname;
export const moduleDir = __dirname.replace(path.sep + 'dist', '');