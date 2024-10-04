import { build, defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';
import resolve from '@rollup/plugin-node-resolve';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cssnanoPlugin from 'cssnano';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import strip from 'rollup-plugin-strip';

import tailwindConfig from '../tailwind.config.js';

const embedFiles = glob.sync('src/_widgets/**/embed.ts');

const getPostCSSPlugins = (purgeDir) => [
	autoprefixer(),
	tailwindcss({
		...tailwindConfig,
		content: [
			`./${purgeDir}/*.{svelte,ts,js}`,
			`./${purgeDir}/*/*.{svelte,ts,js}`,
			'./src/shared/*/*.{svelte,ts,js}'
		]
	}),
	cssnanoPlugin()
];

const commonPlugins = (outputDir, visualizerDir) => [
	svelte(),
	visualizer({
		filename: `${visualizerDir}.status.html`,
		title: `${outputDir} status`
	}),
	libInjectCss()
];

const configs = embedFiles.map((file) => {
	const outputDir = path.dirname(file).replace('src/', '').replace('_widgets/', '');
	const visualizerDir = path
		.dirname(file)
		.replace('src', 'static')
		.replace('_widgets', 'dist/visualizer');
	const purgeDir = path.dirname(file).replace('embed.ts', '');

	return defineConfig({
		css: {
			postcss: {
				plugins: getPostCSSPlugins(purgeDir),
			},
		},
		build: {
			minify: 'terser',
			emptyOutDir: false,
			lib: {
				formats: ['umd'],
				entry: file,
				name: outputDir,
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
					strip({
						functions: ['console.log', 'assert.*']
					})
				],
			},
		},
		plugins: commonPlugins(outputDir, visualizerDir),
		resolve: {
			alias: {
				'@': path.resolve(__dirname.replace('.standalone', ''), 'src'),
			},
		},
	});
});

configs.map((config) => build({ ...config, configFile: false }));
