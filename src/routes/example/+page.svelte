<script>
	import { browser } from '$app/environment';

	import { defaultConfig } from '@/_widgets/example/types';

	const initScript = () => {
		if (browser) {
			if (window.exampleStart) {
				window.exampleStart(defaultConfig);
			}
		}
	};
</script>

<svelte:head>
	<script src="/dist/widgets/example.min.js"></script>
</svelte:head>

<main>
	<button on:click={initScript}>init example script</button>
</main>
