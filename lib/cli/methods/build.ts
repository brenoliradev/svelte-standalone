import { build, defineConfig, type PluginOption } from 'vite';
import path from 'path';
import tailwindcss, { Config } from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import { rootDir } from '../../dir.js';
import { AcceptedPlugin } from 'postcss';

import { pathToFileURL } from 'url';

const svelteConfig = path.resolve(rootDir, 'svelte.config.js');
const svelteAliases = fs.existsSync(svelteConfig)
	? ((await import(pathToFileURL(svelteConfig).href)) as { default: { kit: { alias: Record<string, string> } } }).default?.kit?.alias
	: undefined;

const viteConfig = path.resolve(rootDir, 'vite.config.js');
const viteAliases = fs.existsSync(viteConfig)
	? ((await import(pathToFileURL(viteConfig).href)) as { default: { resolve: { alias: Record<string, string> } } }).default?.resolve?.alias
	: undefined;

const tailwindPath = path.resolve(rootDir, 'tailwind.config.js');
const tailwindConfig = fs.existsSync(tailwindPath)
	? ((await import(pathToFileURL(tailwindPath).href)) as { default: Config }).default
	: undefined;

const parseAlias = (alias: Record<string, string> | undefined) => {
	if (!alias) return undefined

	return Object.fromEntries(
		Object.entries(alias).map(([key, value]) => {
			const newKey = key.replace('/*', ''); // Remove '/*' from the key
			const newValue = path.resolve(rootDir, value.replace('/*', '')); // Resolve the path
			return [newKey, newValue];
		})
	);
}

const normalizeComponentName = (componentName: string) => componentName.replace(/^[+$]/, '');

const isRuntime = (componentName: string) =>
	componentName === 'runtime' || componentName === '$runtime' || componentName === '+runtime';

const getContent = (purgeDir: string, componentName: string, hasRuntime: boolean) => {
	if (hasRuntime && isRuntime(componentName)) {
		return [`./${purgeDir}/**/*.{svelte,ts,js}`, './src/shared/**/*.{svelte,ts,js}'];
	}

	const sharedContent = hasRuntime ? [] : ['./src/shared/**/*.{svelte,ts,js}'];

	return [`./${purgeDir}/**/*.{svelte,ts,js}`, ...sharedContent];
};

const getPostCSSPlugins = (purgeDir: string, componentName: string, hasRuntime: boolean) =>
	tailwindConfig
		? ([
				tailwindcss({
					...tailwindConfig,
					content: getContent(purgeDir, componentName, hasRuntime)
				}),
				cssnanoPlugin()
			] as AcceptedPlugin[])
		: ([cssnanoPlugin()] as AcceptedPlugin[]);

const getProd = (prod: boolean) =>
	prod
		? [
				strip({
					functions: ['console.log', 'console.warn', 'console.error', 'assert.*']
				}),
				terser({
					compress: {
						drop_console: true,
						unused: true,
						reduce_vars: true,
						pure_funcs: ['console.debug', 'debug']
					},
					output: {
						comments: false
					}
				})
			]
		: [];

const commonPlugins = (componentName: string, visualizerDir: string) =>
	[
		svelte({ configFile: svelteConfig }),
		visualizer({
			filename: `${visualizerDir}.status.html`,
			title: `${componentName} status`
		}),
		libInjectCss()
	] as PluginOption[];

const handleBuild = (files: string[], prod: boolean, hasRuntime: boolean) => {
	return files.map((file) => {
		const rawComponentName = path.dirname(file).split(path.sep).at(-1) || '';
		const componentName = normalizeComponentName(rawComponentName);
		const visualizerDir = path
			.dirname(file)
			.replace('src', 'static')
			.replace('_standalone', `dist${path.sep}visualizer`);
		const purgeDir = path.dirname(file).replace('embed.ts', '');

		if (!componentName) {
			console.error('Invalid fileName: ', file);
			return;
		}

		return defineConfig({
			css: {
				postcss: {
					plugins: getPostCSSPlugins(purgeDir, rawComponentName, hasRuntime)
				}
			},
			plugins: commonPlugins(componentName, visualizerDir),
			build: {
				minify: prod,
				emptyOutDir: false,
				lib: {
					formats: ['umd'],
					entry: file,
					name: componentName,
					fileName: componentName
				},
				outDir: path.resolve(rootDir, 'static/dist/standalone'),
				rollupOptions: {
					output: {
						chunkFileNames: 'chunks/[name].[hash].js',
						assetFileNames: 'assets/[name][extname]',
						entryFileNames: `${componentName}.min.js`
					},
					plugins: [resolve({ browser: true, dedupe: ['svelte'] }), ...getProd(prod)]
				}
			},
			resolve: {
				alias: parseAlias(viteAliases || svelteAliases)
			}
		});
	});
};

export const buildStandalone = async (files: string[], prod: boolean, hasRuntime: boolean) => {
	try {
		const configs = handleBuild(files, prod, hasRuntime);
		await Promise.all(configs.map((c) => build({ ...c, configFile: false })));
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};