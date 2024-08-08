import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import strip from 'rollup-plugin-strip';

import { sveltePreprocess } from 'svelte-preprocess';
import { glob } from 'glob';
import path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.js';
import tailwindcss from 'tailwindcss';

import { visualizer } from 'rollup-plugin-visualizer';

// Get all embed.js files
const embedFiles = glob.sync('src/_widgets/**/embed.ts');

// Common plugins
const commonPlugins = [
	svelte({
		emitCss: false,
		preprocess: sveltePreprocess()
	}),
	typescript(),
	resolve({ browser: true, dedupe: ['svelte'] }),
	terser(),
	strip({
		// Options herea
		functions: ['console.log', 'assert.*']
	})
];

// Generate Rollup configurations
const configs = embedFiles.map((file) => {
	const outputDir = path.dirname(file).replace('src', 'static').replace('_widgets', 'dist/widgets');
	const visualizerDir = path
		.dirname(file)
		.replace('src', 'static')
		.replace('_widgets', 'dist/visualizer');

	const purgeDir = path.dirname(file).replace('embed.ts', '');

	return {
		input: file,
		output: {
			format: 'esm',
			file: `${outputDir}.min.js`,
			sourcemap: false
		},
		plugins: [
			...commonPlugins,
			postcss({
				config: {
					path: 'postcss.config.cjs'
				},
				extensions: ['.css'],
				minimize: true,
				inject: { insertAt: 'top' },
				plugins: [
					autoprefixer(),
					tailwindcss({
						...tailwindConfig,
						content: [`./${purgeDir}/*.{svelte,ts,js}`, `./${purgeDir}/*/*.{svelte,ts,js}`, './src/shared/*/*{svelte,ts,js}']
					})
				]
			}),
			visualizer({
				filename: `${visualizerDir}.status.html`,
				title: `${outputDir} status`
			})
		],
		onwarn: function (warning, warn) {
			// suppress some warnings
			if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
			warn(warning);
		}
	};
});

export default configs;
