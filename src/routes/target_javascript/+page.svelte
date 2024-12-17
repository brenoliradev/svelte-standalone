<script>
	import { onMount } from 'svelte';
  
	onMount(() => {
	  const script = document.createElement('script');
	  script.src = '/dist/standalone/target_javascript.min.js?target=target_javascript';
	  script.async = true;
  
	  document.head.appendChild(script);
  
	  return () => {
		document.head.removeChild(script);
		window.target_javascript.$destroy();
	  };
	});
</script>

<div id="target_javascript" class="p-2 w-full h-screen"></div>