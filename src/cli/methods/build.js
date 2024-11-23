import { build, defineConfig } from 'vite';
import path from 'path';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from 'rollup-plugin-strip';

import { terser } from 'rollup-plugin-terser';


const getPostCSSPlugins = (purgeDir) => [
	autoprefixer(),
	tailwindcss({
		content: [
			`./${purgeDir}/*.{svelte,ts,js}`,
			`./${purgeDir}/*/*.{svelte,ts,js}`,
			'./src/shared/*/*.{svelte,ts,js}'
		]
	}),
	cssnanoPlugin()
];

const commonPlugins = (componentName, visualizerDir) => [
	svelte(),
	visualizer({
		filename: `${visualizerDir}.status.html`,
		title: `${componentName} status`
	}),
	libInjectCss()
];

const handleBuild = (files) =>
	files.map((file) => {
		const componentName = path.dirname(file).replace('src/', '').replace('_standalone/', '');
		const visualizerDir = path
			.dirname(file)
			.replace('src', 'static')
			.replace('_standalone', 'dist/visualizer');
		const purgeDir = path.dirname(file).replace('embed.ts', '');

		return defineConfig({
			css: {
				postcss: {
					plugins: getPostCSSPlugins(purgeDir)
				}
			},
			build: {
				emptyOutDir: false,
				lib: {
					formats: ['umd'],
					entry: file,
					name: componentName
				},
				outDir: 'static/dist/standalone',
				rollupOptions: {
					output: {
						chunkFileNames: 'chunks/[name].[hash].js',
						assetFileNames: 'assets/[name][extname]',
						entryFileNames: `${componentName}.min.js`
					},
					plugins: [
						resolve({ browser: true, dedupe: ['svelte'] }),
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
				}
			},
			plugins: commonPlugins(componentName, visualizerDir),
			resolve: {
				alias: {
					'@': path.resolve(__dirname.replace('.standalone', ''), 'src'),
					standalone: path.resolve(__dirname)
				}
			}
		});
	});

export const buildStandalone = (files) =>
	handleBuild(files).map((config) => build({ ...config, configFile: false }));
