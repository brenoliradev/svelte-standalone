<!-- BETTER WRITE A .test.svelte THAN <SLOT> WORKAROUNDS -->
<script lang="ts">
	import { useToast, type ToastType } from './store.svelte';
	import Toast from './Toast.svelte';

	const { dismissToast } = useToast();

	const { type = 'error', dismissible = true, message = '' }: {
		type: ToastType,
		dismissible: boolean,
		message: string
	} = $props()
</script>

<Toast {dismissible} {type} on:dismiss={() => dismissToast(0)}>{message}</Toast>
