<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	import { defaultConfig } from '@/_standalone/update_prop_with_window/config';

	const initScript = () => {
		if (browser) {
			if (window) {
				window.update_prop_with_window.start(defaultConfig);
			}
		}
	};

	const stopScript = () => {
		if (browser) {
			if (window) {
				window.update_prop_with_window.stop();
			}
		}
	};

	let greeting = defaultConfig.greet;

	const handleChange = (greet: string) => {
        if (browser) {
			if (window) {
				window?.update_prop_with_window?.instance?.$set({
					greet,
				})
			}
		}
    }

	$: handleChange(greeting);

	onDestroy(() => {
		if (window) {
			window.update_prop_with_window.stop();
		}
	})
</script>

<svelte:head>
	<script type="module" src="/dist/standalone/update_prop_with_window.min.js"></script>
</svelte:head>

<main class="p-2">
<button
	class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	on:click={initScript}>init update_prop_with_window script</button
>
<button
	class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={stopScript}>stop update_prop_with_window script</button
		>
		<p class="pt-2">defaultConfig: {JSON.stringify(defaultConfig)}</p>
		<form>change greeting <input bind:value={greeting}></form>
</main>

