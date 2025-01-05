import { build, defineConfig, type PluginOption } from 'vite';
import path from 'path';
import tailwindcss, { Config } from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import { rootDir } from '../../dir.js';
import { type AcceptedPlugin } from 'postcss';

import { pathToFileURL } from 'url';

const tailwindPath = path.resolve(rootDir, 'tailwind.config.js');
const sveltePath = path.resolve(rootDir, 'svelte.config.js');

const tailwindConfig = fs.existsSync(tailwindPath)
	? ((await import(pathToFileURL(tailwindPath).href)) as { default: Config }).default
	: undefined;

const svelteConfig = fs.existsSync(sveltePath) ? sveltePath : undefined;

const normalizeComponentName = (componentName: string) => componentName.replace(/^[+$]/, '');

const isRuntime = (componentName: string) =>
	componentName === 'runtime' || componentName === '$runtime' || componentName === '+runtime';

const getContent = (purgeDir: string, componentName: string, hasRuntime: boolean) => {
	const content = [path.resolve(rootDir, `${purgeDir}/**/*.{svelte,ts,js,css}`)];

	if (!hasRuntime || isRuntime(componentName)) {
		content.push(path.resolve(rootDir, './src/shared/**/*.{svelte,ts,js,css}'));
	}

	return content;
};

const getPostCSSPlugins = (purgeDir: string, componentName: string, hasRuntime: boolean) => {
	const content = getContent(purgeDir, componentName, hasRuntime);

	const s = new RegExp(`s-${componentName}`);

	return [
		tailwindConfig
			? (tailwindcss({
					...tailwindConfig,
					content
				}) as AcceptedPlugin)
			: purgeCSSPlugin({
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
				alias: {
					'@': path.resolve(rootDir, 'src')
				}
			}
		});
	});
};

export const buildStandalone = async (files: string[], prod: boolean, hasRuntime: boolean) => {
	try {
		const configs = handleBuild(files, prod, hasRuntime);
		configs.forEach((c) => build({ ...c, configFile: false }));
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};
