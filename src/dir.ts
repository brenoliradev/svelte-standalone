import { findUpSync } from 'find-up';
import path from 'path';

const p = findUpSync('package.json');

const root = p ? path.dirname(p) : null;

export const rootDir = root ?? process.cwd();
export const moduleDir = path.dirname(__filename).replace(path.sep + "dist", "")