import findUp from 'find-up';

const root = findUp.sync('package.json')?.replace('/package.json', '')

export const rootDir = root ?? process.cwd();