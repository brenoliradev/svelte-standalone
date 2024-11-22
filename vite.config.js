import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [sveltekit(), svelteTesting()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'],
			environment: 'jsdom',
			setupFiles: ['./src/vitestSetup.ts']
		},
		define: {
			process: {
				env
			},
			'import.meta.env': env
		},
		resolve: {
			alias: {
				'@/': '/src',
				standalone: '/.standalone'
			}
		}
	};
});
