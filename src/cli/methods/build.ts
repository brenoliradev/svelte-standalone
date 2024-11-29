import { build, defineConfig, type PluginOption } from 'vite';
import path from 'path';

import tailwindcss, { Config } from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import strip from 'rollup-plugin-strip';

import { terser } from 'rollup-plugin-terser';

import fs from 'fs';
import { rootDir } from '../utils/rootdir';

import postcss from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';

const tailwindConfig = fs.readFileSync(
	path.resolve(rootDir, 'tailwind.config.js')
) as unknown as Config;

const getPostCSSPlugins = (purgeDir: string) =>
	[
		tailwindConfig &&
			tailwindcss({
				...tailwindConfig,
				content: [
					path.resolve(rootDir, `${purgeDir}/*.{svelte,ts,js}`),
					path.resolve(rootDir, `${purgeDir}/*/*.{svelte,ts,js}`),
					path.resolve(rootDir, 'src/shared/*/*.{svelte,ts,js}')
				]
			}),
		!tailwindConfig &&
			purgecss({
				content: [
					path.resolve(rootDir, `${purgeDir}/*.{svelte,ts,js}`),
					path.resolve(rootDir, `${purgeDir}/*/*.{svelte,ts,js}`),
					path.resolve(rootDir, 'src/shared/*/*.{svelte,ts,js}')
				]
			}),
		cssnanoPlugin()
	] as unknown as postcss.AcceptedPlugin[];

const getProd = (prod: boolean) =>
	prod
		? ([
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
			] as unknown as PluginOption[])
		: [];

const commonPlugins = (componentName: string, visualizerDir: string) => [
	svelte({ configFile: false }),
	visualizer({
		filename: `${visualizerDir}.status.html`,
		title: `${componentName} status`
	}),
	libInjectCss()
];

const handleBuild = (files: string[], prod: boolean) =>
	files.map((file) => {
		const componentName = path.dirname(file).split('/').at(-1);
		const visualizerDir = path
			.dirname(file)
			.replace('src', 'static')
			.replace('_standalone', 'dist/visualizer');
		const purgeDir = path.dirname(file).replace('embed.ts', '');

		if (!componentName) {
			console.error('Invalid fileName: ', file);

			return;
		}

		return defineConfig({
			css: {
				postcss: {
					plugins: getPostCSSPlugins(purgeDir)
				}
			},
			plugins: commonPlugins(componentName, visualizerDir),
			build: {
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

export const buildStandalone = async (files: string[], prod: boolean) => {
	try {
		handleBuild(files, prod);
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};
