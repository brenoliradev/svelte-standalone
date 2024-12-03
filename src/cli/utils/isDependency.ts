import fs from 'fs';
import path from 'path';

import { rootDir } from './rootdir';

function checkDependency(dependency: string): boolean {
	const packageJsonPath = path.join(rootDir, 'package.json');

	try {
		const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
		const packageJson = JSON.parse(packageJsonContent) as {
			dependencies?: Record<string, string>;
			devDependencies?: Record<string, string>;
		};

		const allDependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

		return dependency in allDependencies;
	} catch {
		return false;
	}
}

export function includesStorybook(): boolean {
	return checkDependency('@storybook/react') || checkDependency('@storybook/svelte');
}

export function includesSvelteKit(): boolean {
	return checkDependency('@sveltejs/kit');
}

export function includesTypeScript(): boolean {
	return checkDependency('typescript');
}

export function includesTailwind(): boolean {
	return checkDependency('tailwindcss');
}
