<script lang="ts">
	import { Button } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	function handleClose(): void {
		if (history.length > 1) {
			history.back();
			return;
		}
		goto('/');
	}

	onMount(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 768) {
				handleClose();
			}
		});
	});
</script>

<div class="absolute right-0 top-0 px-8 py-12 sm:px-12" in:fade={{ duration: 300 }}>
	<Button.Root
		on:click={handleClose}
		class="rounded-full px-4 py-4 transition hover:bg-[#DA84FE]/30"><X /></Button.Root
	>
</div>

<div class="flex flex-col" in:fade={{ duration: 300 }}>
	<Button.Root class="mx-2 my-4 rounded-full px-8 py-4 transition hover:bg-[#DA84FE]/30"
		>Home</Button.Root
	>
	<Button.Root class="mx-2 my-4 rounded-full px-8 py-4 transition hover:bg-[#DA84FE]/30"
		>About</Button.Root
	>
	<Button.Root class="mx-2 my-4 rounded-full px-8 py-4 transition hover:bg-[#DA84FE]/30"
		>Contact Us</Button.Root
	>
</div>
