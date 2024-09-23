<script lang="ts">
	import '../../css/tailwind-utils.css';

	const {error, info, success} :{
	 success: string,
	 error: string,
	info: string,
	} = $props()

	import { Toaster, useToast } from '@/shared/toast';

	const { createToast } = useToast();
</script>

<div class="d-flex gap-3 p-2">
	<button
		onclick={() => createToast.success(success)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate success toast</button
	>
	<button
		onclick={() => createToast.error(error)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate error toast</button
	>
	<button
		onclick={() => createToast.info(info)}
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>generate info toast</button
	>
</div>

<Toaster />
