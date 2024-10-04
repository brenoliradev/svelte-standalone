import { build } from 'vite';

import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import { visualizer } from 'rollup-plugin-visualizer';

import tailwindConfig from '../tailwind.config.js';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

import resolve from '@rollup/plugin-node-resolve';

const embedFiles = glob.sync('src/_widgets/**/embed.ts');

const configs = embedFiles.map((file) => {
	const outputDir = path.dirname(file).replace('src/', '').replace('_widgets/', '');
	const visualizerDir = path
		.dirname(file)
		.replace('src', 'static')
		.replace('_widgets', 'dist/visualizer');

	const purgeDir = path.dirname(file).replace('embed.ts', '');

	console.log(file);

	return defineConfig({
		plugins: [
			svelte({
				emitCss: 'false',
				preprocess: sveltePreprocess()
			}),
			visualizer({
				filename: `${visualizerDir}.status.html`,
				title: `${outputDir} status`
			}),
		],
		css: {
			postcss: {
				plugins: [
					autoprefixer(),
					tailwindcss({
						...tailwindConfig,
						content: [
							`./${purgeDir}/*.{svelte,ts,js}`,
							`./${purgeDir}/*/*.{svelte,ts,js}`,
							'./src/shared/*/*.{svelte,ts,js}'
						]
					})
				]
			}
		},
		build: {
			minify: true,
			cssMinify: 'lightningcss',
			emptyOutDir: false,
			rollupOptions: {
				input: file,
				output: {
					format: 'esm',
					dir: 'static/dist/widgets',
					entryFileNames: `${outputDir}.min.js`,
					sourcemap: false,
				},
				plugins: [
					resolve({ browser: true, dedupe: ['svelte'] }),
				]
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname.replace('.standalone', ''), 'src')
			}
		}
	});
});

configs.map((config) => build({ ...config, configFile: false }));