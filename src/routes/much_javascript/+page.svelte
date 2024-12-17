<script>
	import { onDestroy } from 'svelte';
	
	import { defaultConfig } from '@/_standalone/much_javascript/config.js';

	let validInstances = new Map();

	const generateInstance = () => {
		const i = window.much_javascript.start(defaultConfig);

		validInstances = validInstances.set(Math.random() * 100, () => i.$destroy());
	};

	const removeInstance = (instance) => {
		instance();

		validInstances.delete(i);
		validInstances = validInstances;
	};

	onDestroy(() => {
		validInstances.forEach((v) => {
			v();
		})
		validInstances.clear();
	})
</script>

<svelte:head>
	<script type="module" src="/dist/standalone/much_javascript.min.js"></script>
</svelte:head>

<main class="p-2">
	<button
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		on:click={generateInstance}>init instance of much_javascript</button
	>
	<p class="pt-2">defaultConfig: {JSON.stringify(defaultConfig)}</p>
	{#each validInstances as [i, instance]}
		<div class="d-flex flex-col gap-2">
			<button
				class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={() => removeInstance(instance, i)}>stop {i}</button
			>
		</div>
	{/each}
</main>
