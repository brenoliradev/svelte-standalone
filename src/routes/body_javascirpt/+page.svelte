<script>
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const script = document.createElement('script');
	  script.src = '/dist/standalone/body_javascirpt.min.js';
	  script.async = true;
  
	  document.head.appendChild(script);
  
	  return () => {
		document.head.removeChild(script);
		window.body_javascirpt.$destroy();
	  };
	});
</script>