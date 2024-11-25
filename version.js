import fs from 'fs';

import packageJson from './package.json';

const version = packageJson.version;

fs.writeFileSync('v.json', JSON.stringify(version));
