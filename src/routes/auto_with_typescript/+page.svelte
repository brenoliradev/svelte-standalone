<script lang="ts">
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const script = document.createElement('script');
	  script.src = '/dist/standalone/auto_with_typescript.min.js?target=auto_with_typescript';
	  script.async = true;
  
	  document.head.appendChild(script);
  
	  return () => {
		document.head.removeChild(script);
		window.auto_with_typescript.$destroy();
	  };
	});
</script>

<div id="auto_with_typescript" class="p-2 w-full h-screen"></div>