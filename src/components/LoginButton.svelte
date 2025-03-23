<script lang="ts">
	import { Button } from 'bits-ui';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	function login() {
		window.location.href = `${PUBLIC_BACKEND_URL}/auth/spotify/login/web`;
	}
</script>

<Button.Root
	on:click={login}
	class="flex items-center justify-center 
           rounded-[50px] border-[1.5px]
           border-[#1DB954] bg-[#111111] px-[30px] 
           py-[8px]
           text-[10px] font-medium text-white shadow-md
           backdrop-blur-[112px] transition-all duration-300 hover:scale-105
           hover:shadow-xl sm:rounded-[73.101px] sm:border-2 sm:px-[46.785px]
           sm:py-[11.696px] sm:text-xs
           sm:shadow-lg md:px-[52px]
           md:py-[13px]
           md:text-sm lg:px-[58px]
           lg:py-[15px] lg:text-base"
>
	{@render children?.()}
</Button.Root>
