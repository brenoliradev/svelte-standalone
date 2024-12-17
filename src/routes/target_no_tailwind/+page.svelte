<script lang="ts">
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const script = document.createElement('script');
	  script.src = '/dist/standalone/target_no_tailwind.min.js?target=target_no_tailwind';
	  script.async = true;
  
	  document.head.appendChild(script);
  
	  return () => {
		document.head.removeChild(script);
		window.target_no_tailwind.$destroy();
	  };
	});
</script>

<div id="target_no_tailwind" class="p-2 w-full h-screen"></div>