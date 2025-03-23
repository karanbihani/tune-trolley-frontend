<script lang="ts">
	import { onMount } from 'svelte';
	import star from '$lib/assets/star-top-left.svg';
	import spring from '$lib/assets/tilted-spring-below-left.svg';
	import band from '$lib/assets/the-band-crotchet-below-left.svg';
	import amoeba from '$lib/assets/amoeba-below-right.svg';
	import home_bottom from '$lib/assets/home_bottom.svg';
	import logo from '$lib/assets/logo.svg';
	import neon_wave from '$lib/assets/neon_wave.svg';
	import band2 from '$lib/assets/band-dotted-minim.svg';
	import thumb1 from '$lib/assets/thumb1.svg';
	import star1 from '$lib/assets/star1.svg';
	import thumb2 from '$lib/assets/thumb2.svg';
	import flower from '$lib/assets/flower.svg';
	import thumb3 from '$lib/assets/thumb3.svg';
	import star_grey from '$lib/assets/star-grey.svg';
	import git from '$lib/assets/git.svg';
	import insta from '$lib/assets/social.svg';
	import x from '$lib/assets/x.svg';
	import yt from '$lib/assets/yt.svg';
	import tele from '$lib/assets/tele.svg';

	import LoginButton from '../components/LoginButton.svelte';
	import { goto } from '$app/navigation';
	import { Button } from 'bits-ui';

	function navigateToSection(id: string): void {
		const element = document.getElementById(id);

		if (element) {
			const targetY = element.getBoundingClientRect().top + window.scrollY;
			const startY = window.scrollY;
			const distance = targetY - startY;
			const startTime = performance.now();

			function scrollStep(currentTime: number) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / 1000, 1);
				const easeInOutQuad =
					progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

				window.scrollTo(0, startY + distance * easeInOutQuad);

				if (progress < 1) {
					requestAnimationFrame(scrollStep);
				}
			}
			requestAnimationFrame(scrollStep);
		}
	}

	onMount(async () => {
		let token = localStorage.getItem('token');

		if (token) {
			goto('/dashboard/home');
		}
	});

	function openUrl(url: string) {
		window.open(url, '_blank');
	}
</script>

<div class="relative h-full bg-[#111111]">
	<div
		class="backdrop-filter:blur(62px) fixed z-20 flex w-full flex-row justify-between overflow-hidden bg-[#1DB954] px-4 py-4 text-white sm:px-8 md:px-12 lg:px-16 lg:py-6"
	>
		<div
			class="flex items-center text-xl font-extrabold sm:text-2xl"
			style="color: #ffffff; text-align: center; text-shadow: 0px 6px 2px #111111; font-family: 'Avenir Next'; font-size: 3rem; font-style: normal; font-weight: 700; line-height: 21px; letter-spacing: -0.32px;"
		>
			TuneTrolley
			<!-- <img style="color: #ffffff; align: center; align-item:center" src={logo} alt="Logo" /> -->
		</div>
		<div class="hidden flex-row gap-4 font-semibold md:gap-8 lg:flex">
			<LoginButton>Login</LoginButton>
		</div>
	</div>
	<div
		class="section relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-24 text-center text-white sm:px-8 md:px-16"
	>
		<img
			src={star}
			alt="Star Top Left"
			class="absolute left-0 top-0 z-10 flex h-[50vh] max-h-[256px] w-[20vw] max-w-[263px] flex-shrink-0 items-center justify-center opacity-70"
			style="clip-path: inset(100px 0 0 0);"
		/>
		<img
			src={spring}
			alt="Tilted Spring Below Left"
			class="absolute z-0 hidden h-[25vh] w-[15vw] flex-shrink-0 transform opacity-50 md:block md:h-[35vh] md:w-[18vw] lg:h-[400px] lg:w-[200px]"
			style="top: 65%; left: 30%; md:left-20%; lg:left-25%; transform: translate(-50%, -50%);"
		/>

		<img
			src={band}
			alt="Band Bottom Left"
			class="absolute bottom-[5%] left-[8%] hidden h-[15vh] w-[15vw] opacity-60 md:left-[12%] md:block md:h-[20vh] md:w-[18vw] lg:left-[15%] lg:h-[155.266px] lg:w-[165.52px]"
		/>

		<h1
			class="mb-4 text-2xl font-bold leading-tight tracking-tight text-[#FFFFFF] sm:mb-8 sm:text-4xl sm:leading-normal lg:text-6xl"
			style="text-shadow: 3px 3px 1px #1DB954;"
		>
			<span class="block">create a playlist that's as dynamic as your</span>
			<span class="mt-2 block">event, with everyone's favorite tracks.</span>
		</h1>
		<p
			class="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed tracking-tight text-white sm:text-lg"
		>
			Elevate your event with TuneTrolley! Seamlessly create and share collaborative playlists,
			allowing participants to add their favorite tracks in real-time.
		</p>
		<LoginButton>Get Started</LoginButton>
	</div>

	<div
		id="contact"
		class="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#111111] pt-24 text-center text-white sm:pt-32 md:pt-48 lg:pt-96"
	>
		<div class="relative w-full">
			<div
				class="relative h-[250px] w-full bg-[#111111] backdrop-blur-[52px] sm:h-[300px] md:h-[350px]"
			>
				<div
					class="sm:border-t-6 border-[#111111)] absolute inset-x-0 top-0 h-6 border-t-4 border-dashed sm:h-8 md:border-t-8"
				></div>
				<div
					class="sm:border-b-6 absolute inset-x-0 bottom-0 h-6 border-b-4 border-dashed border-[#111111] sm:h-8 md:border-b-8"
				></div>

				<img
					src={star_grey}
					alt="Star Grey"
					class="absolute -right-4 top-[35%] h-[200px] w-[200px] -translate-y-1/3 sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px]"
				/>

				<div class="flex h-full flex-col items-center justify-center gap-4 sm:gap-6">
					<div class="text-[10px] text-white sm:text-[12px] md:text-[13.652px]">Made with 💚</div>

					<!-- Divider -->
					<div class="h-[0.853px] w-[90%] bg-[#1DB954] sm:w-[95%] md:w-[1026.473px]"></div>

					<div class="text-[8px] font-light text-white sm:text-[9px] md:text-[10.239px]">
						Aanchal Shah | Karan Bihani
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.section {
		transition: background-color 0.5s ease-in-out;
	}

	@keyframes marquee {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
