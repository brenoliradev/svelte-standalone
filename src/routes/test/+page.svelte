<script lang="ts">
	import { browser } from '$app/environment';

	import { type CustomWindow, defaultConfig } from '@/_widgets/test/types';

	const initScript = () => {
		if (browser) {
			if (window) {
				(window as unknown as CustomWindow).testStart(defaultConfig);
			}
		}
	};

	const stopScript = () => {
		if (browser) {
			if (window) {
				(window as unknown as CustomWindow).testStop();
			}
		}
	};
</script>

<svelte:head>
	<script src="/dist/widgets/test.min.js"></script>
</svelte:head>

<main class="p-2">
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={initScript}>init test script</button
	>
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={stopScript}>stop test script</button
	>
	<p class="pt-2">defaultConfig: {JSON.stringify(defaultConfig)}</p>
</main>
