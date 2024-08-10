<script lang="ts">
	import '../../css/tailwind-utils.css';

	export let success: string;
	export let error: string;
	export let info: string;

	import { Toaster, toast } from '@/shared/toast';
</script>

<div class="d-flex gap-3 p-2">
	<button
		on:click|preventDefault={() => toast.success(success)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate success toast</button
	>
	<button
		on:click|preventDefault={() => toast.error(error)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate error toast</button
	>
	<button
		on:click|preventDefault={() => toast.info(info)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate info toast</button
	>
</div>

<Toaster />
