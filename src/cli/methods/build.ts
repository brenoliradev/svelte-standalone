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

import { testWebComponent } from '../utils/isWebComponent';

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

const getConfig = (isWebComponent: boolean) => {
	return isWebComponent
		? {
				compilerOptions: {
					customElement: true
				}
			}
		: undefined;
};

const commonPlugins = (componentName: string, visualizerDir: string, isWebComponent: boolean) => [
	svelte({ ...getConfig(isWebComponent), configFile: false }),
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
		await Promise.all(
			configs.map(async (config) => {
				try {
					const result = await build({ ...config, configFile: false });

					if (Array.isArray(result)) {
						result.forEach((output) => {
							if (output.output && output.output[0]?.fileName) {
								const filePath = path.resolve(
									rootDir,
									`static/dist/standalone/${output.output[0].fileName}`
								);
								const fileName = output.output[0].fileName.replace('.min.js', '');

								console.log(fileName);

								if (testWebComponent(fileName)) injectCSSWebComponent(filePath, fileName);
							}
						});
					} else if ('output' in result) {
						if (result.output && result.output[0]?.fileName) {
							const filePath = path.resolve(
								rootDir,
								`static/dist/standalone/${result.output[0].fileName}`
							);
							const fileName = result.output[0].fileName.replace('.min.js', '');

							console.log(fileName);

							if (testWebComponent(fileName)) await injectCSSWebComponent(filePath, fileName);
						}
					}
				} catch (buildError) {
					console.error('Error during build:', buildError);
				}
			})
		);
	} catch (handleBuildError) {
		console.error('Error during handleBuild:', handleBuildError);
	}
};

function injectCSSWebComponent(file: string, n: string): Promise<void> {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				console.error('Error reading file:', err);
				return reject(err);
			}

			const modifiedContent = data.replace(
				/document\.head\.appendChild\(([^)]+)\)/g,
				`Array.from(document.getElementsByTagName(${n})).forEach((el) => el.shadowRoot.appendChild($1))`
			);

			fs.writeFile(file, modifiedContent, 'utf8', (err) => {
				if (err) {
					console.error('Error writing file:', err);
					return reject(err);
				} else {
					console.log('File modified successfully.');
					resolve();
				}
			});
		});
	});
}
