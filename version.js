import fs from 'fs';

import packageJson from './package.json';

const version = packageJson.version;

fs.writeFileSync('dist/v.json', JSON.stringify(version));
