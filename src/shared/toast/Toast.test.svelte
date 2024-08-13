<!-- BETTER WRITE A .test.svelte THAN <SLOT> WORKAROUNDS -->
<script lang="ts">
	import { dismissToast, type ToastType } from './store';
	import Toast from './Toast.svelte';

	export let type: ToastType = 'error';
	export let dismissible = true;
    export let message = ""
</script>

<Toast dismissible={dismissible} type={type} on:dismiss={() => dismissToast(0)}>{message}</Toast>