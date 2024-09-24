import { build } from 'vite';

import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';

import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { visualizer } from 'rollup-plugin-visualizer';

import tailwindConfig from '../tailwind.config.js';

const embedFiles = glob.sync('src/_widgets/**/embed.ts');

const configs = embedFiles.map((file) => {
  const outputDir = path.dirname(file).replace('src', 'static').replace('_widgets', 'dist/widgets');
  const visualizerDir = path.dirname(file).replace('src', 'static').replace('_widgets', 'dist/visualizer');

  const purgeDir = path.dirname(file).replace('embed.ts', '');

  return defineConfig({
    build: {
      minify: true,
      rollupOptions: {
        input: file,
        output: {
          format: 'esm',
          dir: 'static/dist/widgets',
          entryFileNames: `${outputDir}.min.js`,
          sourcemap: false
        },
        plugins: [
          svelte({
            emitCss: false,
            preprocess: sveltePreprocess({
              postcss: {
                
              }
            }),
          }),
          visualizer({
            filename: `${visualizerDir}.status.html`,
            title: `${outputDir} status`
          }),
        ]
      }
    },
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
    resolve: {
        alias: {
          '@/': '/src'
        }
    }
  });
});

configs.map((config) => build({ ...config, configFile: false }));