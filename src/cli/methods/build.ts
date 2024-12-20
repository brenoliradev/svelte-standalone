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
import { rootDir } from '../../dir';
import { AcceptedPlugin } from 'postcss';

const tailwindPath = path.resolve(rootDir, 'tailwind.config.js');

const tailwindConfig = fs.existsSync(tailwindPath)
	? (fs.readFileSync(tailwindPath) as unknown as Config)
	: undefined;

const getPostCSSPlugins = (purgeDir: string) =>
	tailwindConfig
		? ([
				tailwindcss({
					...tailwindConfig,
					content: [
						path.resolve(rootDir, `${purgeDir}/*.{svelte,ts,js}`),
						path.resolve(rootDir, `${purgeDir}/*/*.{svelte,ts,js}`),
						path.resolve(rootDir, 'src/shared/*/*.{svelte,ts,js}')
					]
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
		svelte({ configFile: false }),
		visualizer({
			filename: `${visualizerDir}.status.html`,
			title: `${componentName} status`
		}),
		libInjectCss()
	] as PluginOption[];

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
		const configs = handleBuild(files, prod);

		configs.forEach((c) => build({ ...c, configFile: false }));
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};
