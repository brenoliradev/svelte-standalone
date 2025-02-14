import { rootDir } from '../../dir.js';

import path from 'path';
import { existsSync } from 'fs';

export const getPath = (p: string) =>
	['.js', '.ts'].map((ext) => path.resolve(rootDir, `${p}${ext}`)).find(existsSync) || undefined;
