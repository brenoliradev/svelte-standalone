import fs from 'fs';
import path from 'path';
import { rootDir } from './rootdir';

function getPack(): Record<string, { dependencies: unknown; devDependencies: unknown }> | null {
	const packPath = path.join(rootDir, 'package.json');

	try {
		const p = fs.readFileSync(packPath, 'utf-8');
		return JSON.parse(p);
	} catch {
		return null;
	}
}

function includes(dependency: string): boolean {
	const pack = getPack();

	if (!pack) return false;

	const { dependencies = {}, devDependencies = {} } = pack;
	const allDependencies = { ...dependencies, ...devDependencies };
	return dependency in allDependencies;
}

export function includesStorybook(): boolean {
	return includes('@storybook/react') || includes('@storybook/svelte') || includes('storybook');
}

export function includesSvelteKit(): boolean {
	return includes('@sveltejs/kit');
}

export function includesTypeScript(): boolean {
	return includes('typescript');
}

export function includesTailwind(): boolean {
	return includes('tailwindcss');
}
