<script lang="ts">
	import '../../css/tailwind-full.css';

	export let props: ConfigProps;

	import { Toaster, toast } from '@/shared/toast';
	import type { ConfigProps } from './types';

	console.log(props);
</script>

<div class="d-flex gap-3">
	<button
		on:click|preventDefault={() => toast.success(props.success)}
		class="rounded-md border-2 border-black bg-gray-400 px-3 py-2 text-black shadow-md"
		>generate success toast</button
	>
	<button
		on:click|preventDefault={() => toast.error(props.error)}
		class="rounded-md border-2 border-black bg-gray-400 px-3 py-2 text-black shadow-md"
		>generate error toast</button
	>
	<button
		on:click|preventDefault={() => toast.info(props.info)}
		class="rounded-md border-2 border-black bg-gray-400 px-3 py-2 text-black shadow-md"
		>generate info toast</button
	>
</div>

<Toaster />
