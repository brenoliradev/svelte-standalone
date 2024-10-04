import { build } from 'vite';

import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import { visualizer } from 'rollup-plugin-visualizer';

import tailwindConfig from '../tailwind.config.js';

import { libInjectCss } from 'vite-plugin-lib-inject-css';

import resolve from '@rollup/plugin-node-resolve';

import { svelte } from '@sveltejs/vite-plugin-svelte';

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
			emptyOutDir: false,
			lib: {
				formats: ['iife'],
				entry: file,
				name: outputDir
			},
			outDir: 'static/dist/widgets',
			rollupOptions: {
				output: {
					chunkFileNames: 'chunks/[name].[hash].js',
					assetFileNames: 'assets/[name][extname]',
					entryFileNames: `${outputDir}.min.js`,
				},
				plugins: [
					resolve({ browser: true, dedupe: ['svelte'] }),
				]
			}
		},
		plugins: [
			svelte(),
			visualizer({
				filename: `${visualizerDir}.status.html`,
				title: `${outputDir} status`
			}),
			libInjectCss()
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname.replace('.standalone', ''), 'src')
			}
		}
	});
});

configs.map((config) => build({ ...config, configFile: false }));
