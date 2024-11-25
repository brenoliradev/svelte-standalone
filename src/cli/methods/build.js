import { build, defineConfig } from 'vite';
import path from 'path';

import tailwindcss from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from 'rollup-plugin-strip';

import { terser } from 'rollup-plugin-terser';

import fs from 'fs';
import { rootDir } from '../utils/rootdir';

const testWebComponent = (c) => /^[a-z][a-z0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c);

const getPostCSSPlugins = (purgeDir) => [
	tailwindcss({
		content: [
			path.resolve(rootDir, `${purgeDir}/*.{svelte,ts,js}`),
			path.resolve(rootDir, `${purgeDir}/*/*.{svelte,ts,js}`),
			path.resolve(rootDir, 'src/shared/*/*.{svelte,ts,js}')
		]
	}),
	cssnanoPlugin()
];

const getConfig = (isWebComponent) => {
	return isWebComponent
		? {
				compilerOptions: {
					customElement: true
				}
			}
		: undefined;
};

const commonPlugins = (componentName, visualizerDir, isWebComponent) => [
	svelte({ ...getConfig(isWebComponent), configFile: false }),
	visualizer({
		filename: `${visualizerDir}.status.html`,
		title: `${componentName} status`
	}),
	libInjectCss()
];

const handleBuild = (files) =>
	files.map((file) => {
		const componentName = path.dirname(file).split('/').at(-1);
		console.log(componentName, path.dirname(file));
		const visualizerDir = path
			.dirname(file)
			.replace('src', 'static')
			.replace('_standalone', 'dist/visualizer');
		const purgeDir = path.dirname(file).replace('embed.ts', '');

		const isWebComponent = testWebComponent(componentName);

		return defineConfig({
			css: {
				postcss: {
					plugins: getPostCSSPlugins(purgeDir)
				}
			},
			plugins: commonPlugins(componentName, visualizerDir, isWebComponent),
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
			resolve: {
				alias: {
					'@': path.resolve(rootDir, 'src')
				}
			}
		});
	});

export const buildStandalone = (files) =>
	handleBuild(files).map((config) => {
		build({ ...config, configFile: false }).then(
			(f) =>
				testWebComponent(config.build.lib.name) &&
				injectCSSWebComponent(
					path.resolve(rootDir, `static/dist/standalone/${f[0].output[0].fileName}`)
				)
		);
	});

function injectCSSWebComponent(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return;
		}

		const modifiedContent = data.replace(
			/document\.head\.appendChild\(([^)]+)\)/g,
			"Array.from(document.getElementsByTagName('my-component')).forEach((el) => el.shadowRoot.appendChild($1))"
		);

		fs.writeFile(file, modifiedContent, 'utf8', (err) => {
			if (err) {
				console.error('Error writing file:', err);
			} else {
				console.log('File modified successfully.');
			}
		});
	});
}
