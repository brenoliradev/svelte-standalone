<script lang="ts">
	import { browser } from '$app/environment';

	import { defaultConfig } from '@/_standalone/beyonk/types';

	const initScript = () => {
		if (browser) {
			if (window) {
				window.beyonk.start(defaultConfig);
			}
		}
	};

	const stopScript = () => {
		if (browser) {
			if (window) {
				window.beyonk.stop();
			}
		}
	};
</script>

<svelte:head>
	<script type="module" src="/dist/standalone/beyonk.min.js"></script>
</svelte:head>

<main class="p-2">
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={initScript}>init beyonk script</button
	>
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={stopScript}>stop beyonk script</button
	>
	<p class="pt-2">defaultConfig: {JSON.stringify(defaultConfig)}</p>
</main>
