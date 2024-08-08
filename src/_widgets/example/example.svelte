<script lang="ts">
	import '../../app.css';

	import { Toaster, toast } from '@/shared/toast';
</script>

<div class="d-flex gap-3">
	<button
		on:click|preventDefault={() => toast.success('success!')}
		class="rounded-md border-2 border-black bg-gray-400 text-black shadow-md px-3 py-2"
		>generate success toast</button
	>
	<button
		on:click|preventDefault={() => toast.error('error!')}
		class="rounded-md border-2 border-black bg-gray-400 text-black shadow-md px-3 py-2"
		>generate error toast</button
	>
	<button
		on:click|preventDefault={() => toast.info('info!')}
		class="rounded-md border-2 border-black bg-gray-400 text-black shadow-md px-3 py-2"
		>generate info toast</button
	>
</div>

<Toaster />
