<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { ToastType } from './store';

	const dispatch = createEventDispatcher();

	export let type: ToastType = 'error';
	export let dismissible = true;
</script>

<article
	class="mb-2 flex w-96 items-center justify-between rounded-md bg-white px-4 py-3 text-black shadow-md"
	role="alert"
	transition:fade
>
	{#if type === 'success'}
		<svg
			class="stroke-green-700"
			fill="currentColor"
			stroke-width="0"
			viewBox="0 0 512 512"
			width="1.3em"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill="none"
				stroke-miterlimit="10"
				stroke-width="32"
				d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
			></path><path
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="32"
				d="M352 176 217.6 336 160 272"
			></path></svg
		>
	{:else if type === 'error'}
		<svg
			class="fill-red-700"
			stroke="currentColor"
			stroke-width="0"
			viewBox="0 0 24 24"
			width="1.3em"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
			></path></svg
		>
	{:else}
		<svg
			class="fill-yellow-600"
			stroke="currentColor"
			stroke-width="0"
			viewBox="0 0 24 24"
			width="1.3em"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
			></path></svg
		>
	{/if}

	<div class="ml-4 mr-auto max-w-72">
		<slot />
	</div>

	{#if dismissible}
		<button
			class="m-0 border-none bg-transparent p-0 text-gray-600 hover:opacity-80"
			on:click={() => dispatch('dismiss')}
		>
			{@html '&#10005;'}
		</button>
	{/if}
</article>
