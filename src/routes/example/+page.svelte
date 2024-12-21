<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	import { defaultConfig } from '@/_standalone/example/config';

	const initScript = () => {
		if (browser) {
			if (window) {
				window.example.start(defaultConfig);
			}
		}
	};

	const stopScript = () => {
		if (browser) {
			if (window) {
				window.example.stop();
			}
		}
	};

	onDestroy(() => {
		if (browser && window?.example) {
			window.example.stop();
		}
	});

	let config = defaultConfig;

	const handleChange = (config: typeof defaultConfig) => {
		if (browser && window) {
			window?.example?.instance?.$set({
				...config
			});
		}
	};

	$: handleChange(config);
</script>

<svelte:head>
	<script type="module" src="/dist/standalone/example.min.js"></script>
</svelte:head>

<main class="p-2">
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={initScript}>init example script</button
	>
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={stopScript}>stop example script</button
	>
	<p class="pt-2">defaultConfig: {JSON.stringify(defaultConfig)}</p>
</main>

<input bind:value={config.success} placeholder="Update success message" class="border-2" />
<input bind:value={config.error} placeholder="Update error message" class="border-2" />
<input bind:value={config.info} placeholder="Update info message" class="border-2" />
