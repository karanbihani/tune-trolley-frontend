<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-hot-french-toast';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Toaster />
<div class="relative min-h-screen w-full bg-[#1DB954] text-white">
	{@render children?.()}
</div>
