<script lang="ts">
	const {
		error,
		info,
		success
	}: {
		success: string;
		error: string;
		info: string;
	} = $props();
</script>

<div>
	{ success }
	{ error }
	{ info }
</div>