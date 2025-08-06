import { build, defineConfig, loadConfigFromFile, UserConfig, type PluginOption } from 'vite';

import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import { rootDir } from '../../dir.js';

import { getPath } from '../utils/getPath.js';

import { pathToFileURL } from 'url';
import { includesTailwind } from '../utils/isDependency.js';

const tailwind = includesTailwind();

const svelteConfig = path.resolve(rootDir, 'svelte.config.js');
const svelteAliases = fs.existsSync(svelteConfig)
	? (
			(await import(pathToFileURL(svelteConfig).href)) as {
				default: { kit: { alias: Record<string, string> } };
			}
		).default?.kit?.alias
	: undefined;

const parseAlias = (alias: Record<string, string> | undefined) => {
	if (!alias) return undefined;

	return Object.fromEntries(
		Object.entries(alias).map(([key, value]) => {
			const newKey = key.replace('/*', ''); // Remove '/*' from the key
			const newValue = path.resolve(rootDir, value.replace('/*', '')); // Resolve the path
			return [newKey, newValue];
		})
	);
};

const normalizeComponentName = (componentName: string) => componentName.replace(/^[+$]/, '');

const isRuntime = (componentName: string) =>
	componentName === 'runtime' || componentName === '$runtime' || componentName === '+runtime';

const getContent = (sourceDir: string, componentName: string, hasRuntime: boolean) => {
	const content = [path.resolve(rootDir, `${sourceDir}/**/*.{svelte,ts,js,css}`)];

	if (!hasRuntime || isRuntime(componentName)) {
		content.push(path.resolve(rootDir, './src/shared/**/*.{svelte,ts,js,css}'));
	}

	return content;
};

const getPostCSSPlugins = (purgeDir: string, componentName: string, hasRuntime: boolean) => {
	const content = getContent(purgeDir, componentName, hasRuntime);

	const s = new RegExp(`s-${componentName}`);

	return tailwind
		? undefined
		: [
				purgeCSSPlugin({
					content,
					extractors: [
						{
							extractor: (c) => c.match(/[A-Za-z0-9-_:/\.]+/g) || [],
							extensions: ['svelte', 'js', 'ts', 'css']
						}
					],
					safelist: {
						standard: [s]
					}
				}),
				cssnanoPlugin()
			];
};

const getProdConfig = (prod: boolean) => {
	return prod
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
};

const commonPlugins = (componentName: string, injectAssets: boolean, visualizerDir?: string) =>
	[
		svelte({
			configFile: svelteConfig,
			compilerOptions: {
				cssHash: ({ name }) => `s-${componentName.toLowerCase()}-${name?.toLowerCase()}`
			}
		}),
		visualizerDir // If visualizerDir is not set. Disable it!
			? visualizer({
					filename: `${visualizerDir}.status.html`,
					title: `${componentName} status`
				})
			: undefined,
		injectAssets ? libInjectCss() : undefined,
		tailwind && tailwindcss()
	] as PluginOption[];

const prepareConfigForBuild = (
	componentNames: string[],
	prod: boolean,
	injectAssets: boolean,
	hasRuntime: boolean,
	inputDir: string,
	outputDir: string,
	viteConfig?: UserConfig
) => {
	return componentNames.map((file) => {
		const rawComponentName = path.dirname(file).split(path.sep).at(-1) || '';
		const componentName = normalizeComponentName(rawComponentName);
		const visualizerDir = prod // If we are in production. Don't output the visualizer
			? path.dirname(file).replace(inputDir, path.join(outputDir, 'visualizer'))
			: undefined;
		const purgeDir = path.dirname(file); // This was here before. Shouldn't be necessary `.replace('embed.ts', '')`

		if (!componentName) {
			console.error('Invalid fileName: ', file);
			return;
		}

		return defineConfig({
			css: prod
				? {
						// Wipe unused css in production builds
						postcss: {
							plugins: getPostCSSPlugins(purgeDir, rawComponentName, hasRuntime)
						}
					}
				: undefined,
			plugins: commonPlugins(componentName, injectAssets, visualizerDir),
			build: {
				minify: prod,
				emptyOutDir: false,
				lib: {
					formats: ['umd'],
					entry: file,
					name: componentName,
					fileName: componentName
				},
				outDir: path.resolve(rootDir, outputDir),
				rollupOptions: {
					output: {
						chunkFileNames: 'chunks/[name].[hash].js',
						assetFileNames: 'assets/[name][extname]',
						entryFileNames: `${componentName}.min.js`
					},
					plugins: [resolve({ browser: true, dedupe: ['svelte'] }), ...getProdConfig(prod)]
				},
				cssCodeSplit: false // This is explicitly set with default value.
				// We are handling style injection with a injectCSS plugin anyway.
			},
			resolve: {
				alias: {
					...parseAlias(svelteAliases),
					...parseAlias(viteConfig?.resolve?.alias as Record<string, string>)
				}
			},
			mode: viteConfig?.mode,
			envPrefix: viteConfig?.envPrefix,
			define: viteConfig?.define,
			envDir: viteConfig?.envDir
		});
	});
};

export const buildStandalone = async ({
	componentsPaths,
	prod,
	injectAssets,
	hasRuntime,
	mode,
	inputDir,
	outputDir
}: {
	componentsPaths: string[];
	prod: boolean;
	injectAssets: boolean;
	hasRuntime: boolean;
	mode: string;
	inputDir: string;
	outputDir: string;
}) => {
	const viteConfig = await loadConfigFromFile(
		{ command: 'build', mode },
		getPath('vite.config'),
		rootDir
	).then((result) => result?.config);

	try {
		const configs = prepareConfigForBuild(
			componentsPaths,
			prod,
			hasRuntime,
			injectAssets,
			inputDir,
			outputDir,
			viteConfig
		);
		await Promise.all(configs.map((c) => build({ ...c, configFile: false, mode })));
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};
