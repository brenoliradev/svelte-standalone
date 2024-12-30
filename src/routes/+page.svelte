<script lang="ts">
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const script = document.createElement('script');
	  script.src = '/dist/standalone/tipex.min.js?target=tipex';
	  script.async = true;
  
	  document.head.appendChild(script);
  
	  return () => {
		document.head.removeChild(script);
		window.tipex.$destroy();
	  };
	});
</script>

<div id="tipex" class="p-2 w-full h-screen"></div>