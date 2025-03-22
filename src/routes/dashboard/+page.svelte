<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import flower from '$lib/assets/flower.svg';
	import star1 from '$lib/assets/star1.svg';
	import band_dotted_minim from '$lib/assets/band-dotted-minim.svg';
	import the_band_crotchet_below_left from '$lib/assets/the-band-crotchet-below-left.svg';
	import amoeba_below_right from '$lib/assets/amoeba-below-right.svg';
	import tilted_spring_below_left from '$lib/assets/tilted-spring-below-left.svg';

	let showText = false;

	onMount(async () => {
		let token = localStorage.getItem('token');

		if (!token) {
			goto('/');
		} else {
			setTimeout(() => {
				showText = true;
			}, 1000);

			setTimeout(() => {
				goto('/dashboard/home');
			}, 5000);
		}
	});
</script>

<div
	class="perspective relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black"
>
	<img
		src={tilted_spring_below_left}
		alt="Tilted Spring"
		class="rotate-3d absolute left-0 top-0 h-full w-full opacity-20"
	/>
	<img
		src={amoeba_below_right}
		alt="Amoeba"
		class="rotate-3d absolute bottom-0 right-0 h-full w-full opacity-20"
	/>

	<div class="wave absolute flex space-x-8">
		<img
			src={band_dotted_minim}
			alt="Band Dotted"
			class="dancing h-16 w-16"
			style="animation-delay: 0s;"
		/>
		<img
			src={the_band_crotchet_below_left}
			alt="Band Crotchet"
			class="dancing h-24 w-24"
			style="animation-delay: 0.2s;"
		/>
		<img
			src={band_dotted_minim}
			alt="Band Dotted"
			class="dancing h-32 w-32"
			style="animation-delay: 0.4s;"
		/>
		<img
			src={the_band_crotchet_below_left}
			alt="Band Crotchet"
			class="dancing h-16 w-16"
			style="animation-delay: 0.6s;"
		/>
		<img
			src={band_dotted_minim}
			alt="Band Dotted"
			class="dancing h-24 w-24"
			style="animation-delay: 0.8s;"
		/>
	</div>

	<img
		src={flower}
		alt="Flower"
		class="absolute left-10 top-10 h-1/4 w-1/4 opacity-50"
		in:slide={{ delay: 100, duration: 1500 }}
	/>
	<img
		src={star1}
		alt="Star"
		class="absolute bottom-10 right-10 h-1/4 w-1/4"
		in:fly={{ y: 100, duration: 1500 }}
	/>

	{#if showText}
		<h1
			class="evolving-text-shadow text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
			in:fade={{ duration: 1000 }}
		>
			Welcome to SoundCrowd
		</h1>
	{/if}
</div>

<style>
	@keyframes dance {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.dancing {
		animation: dance 1s infinite;
	}

	@keyframes textShadow {
		0% {
			text-shadow: 1px 1px 0px #da84fe;
		}
		50% {
			text-shadow: 2px 2px 1px #f674a2;
		}
		100% {
			text-shadow: 3px 3px 1px #da84fe;
		}
	}

	.evolving-text-shadow {
		animation: textShadow 5s infinite;
	}
	.perspective {
		perspective: 1000px;
	}

	.rotate-3d {
		transform: rotateY(45deg) rotateX(10deg);
	}

	@keyframes wave {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.wave {
		animation: wave 10s linear infinite;
		top: 45%;
		transform: translateY(-50%);
	}

	.wave img {
		animation: bounce 1s infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
