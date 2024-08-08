<script lang="ts">
	import Toast from './Toast.svelte';

	import { dismissToast, toasts } from './store';
</script>

{#if $toasts}
	<section
		class="fixed left-0 right-0 top-0 z-[1000] mt-4 flex w-full flex-col justify-center"
	>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}
