<script lang="ts">
	import { onMount } from 'svelte';
	import star from '$lib/assets/star-top-left.svg';
	import spring from '$lib/assets/tilted-spring-below-left.svg';
	import band from '$lib/assets/the-band-crotchet-below-left.svg';
	import amoeba from '$lib/assets/amoeba-below-right.svg';
	import home_bottom from '$lib/assets/home_bottom.svg';
	import bottom_text_marq from '$lib/assets/bottom_marq_text.svg';
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

<div class="relative bg-[#0A061B] h-full">
	<div
		class="backdrop-filter:blur(62px) fixed z-20 flex w-full flex-row justify-between overflow-hidden bg-[#21164E80] px-4 py-4 text-white sm:px-8 md:px-12 lg:px-16 lg:py-6"
	>
		<div
			class="flex items-center text-xl font-extrabold sm:text-2xl"
			style="color: #F9FEEB; text-align: center; text-shadow: 0px 3px 0px #F674A2; font-family: 'Avenir Next'; font-size: 32px; font-style: normal; font-weight: 700; line-height: 21px; letter-spacing: -0.32px;"
		>
			SoundCrowd
		</div>
		<div class="hidden flex-row gap-4 font-semibold md:gap-8 lg:flex">
			<Button.Root on:click={() => goto('/')} class="p-4 transition hover:scale-110"
				>Home</Button.Root
			>
			<Button.Root
				on:click={() => navigateToSection('about')}
				class="p-4 transition hover:scale-110">About</Button.Root
			>
			<Button.Root
				on:click={() => navigateToSection('contact')}
				class="p-4 transition hover:scale-110">Contact Us</Button.Root
			>
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

		<div class="absolute bottom-0 w-full hidden md:block">
			<img src={home_bottom} alt="SoundCrowd" class="h-16 w-full object-contain" />
			<div class="marquee-container">
				<div class="marquee">
					{#each Array(4) as _}
						<div class="flex items-center marquee-set">
							<img src={bottom_text_marq} alt="Marquee Text" class="h-6" />
							<img src={neon_wave} alt="Wave" class="h-8 mx-16" />
						</div>
					{/each}
				</div>
			</div>
		</div>
		<h1
			class="mb-4 text-2xl font-bold leading-tight tracking-tight text-[#FEFEFE] sm:mb-8 sm:text-4xl sm:leading-normal lg:text-6xl"
			style="text-shadow: 3px 3px 1px #cf63fd;"
		>
			<span class="block">create a playlist that's as dynamic as your</span>
			<span class="mt-2 block">event, with everyone's favorite tracks.</span>
		</h1>
		<p
			class="mx-auto mb-8 max-w-3xl text-base font-medium leading-relaxed tracking-tight text-white sm:text-lg"
		>
			Elevate your event with SoundCrowd! Seamlessly create and share collaborative playlists,
			allowing participants to add their favorite tracks in real-time.
		</p>
		<LoginButton>Get Started</LoginButton>
	</div>

	<!-- Section-2 -->
	<div
		id="about"
		class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center text-white sm:px-8 sm:py-20 md:px-16 md:py-28"
	>
		<img
			src={amoeba}
			alt="Amoeba Bottom Right"
			class="absolute right-[1%] top-[-20%] h-[300px] w-[400px] -translate-y-1/2 transform opacity-60 sm:h-[400px] sm:w-[500px] lg:h-[500px] lg:w-[700px]"
		/>
		<img
			src={star1}
			alt="Star Bottom Right"
			class="absolute right-0 z-10 h-[30vh] flex-shrink-0 opacity-70 sm:h-[40vh] lg:h-[50vh]"
			style="top: 70%; transform: translateY(10%); clip-path: inset(0 0 -100% 0);"
		/>

		<div class="mx-auto flex w-full max-w-7xl flex-col items-center">
			<div class="relative mb-12 sm:mb-16 md:mb-20">
				<p
					class="text-xl font-bold leading-none tracking-tight text-[#FEFEFE] sm:text-3xl lg:text-[50px]"
					style="text-shadow: 2px 2px 1px #cf63fd;"
				>
					unlike any playlist maker<br /> you've ever encountered
				</p>
				<img
					src={band2}
					alt="Band Dotted Minim"
					class="absolute -right-16 top-1/2 h-[100px] w-[110px] -translate-y-1/2 transform opacity-60 sm:-right-32 sm:h-[130px] sm:w-[140px] lg:-right-52 lg:h-[155.266px] lg:w-[165.52px]"
				/>
			</div>
			<div
				class="z-10 flex h-[300px] w-full max-w-[1000px] flex-shrink-0 items-center justify-center px-4 sm:h-[400px] sm:px-8 lg:h-[500px]"
			>
				<img
					src={thumb1}
					alt="Thumbnail 1"
					class="h-auto max-h-[300px] w-full object-contain sm:max-h-[400px] lg:max-h-[550px]"
				/>
			</div>
		</div>
	</div>

	<!-- Section-3 -->
	<div
		class="relative -mt-24 flex min-h-[90vh] w-full
			flex-col items-center justify-center px-4
			py-4 text-center
			text-white sm:-mt-16 sm:px-8 sm:py-6 md:-mt-12
			md:px-16 md:py-8
			lg:-mt-8 lg:py-12"
	>
		<img
			src={flower}
			alt="Flower Left"
			class="absolute left-0 z-10 h-[30vh] flex-shrink-0 opacity-70 sm:h-[40vh] lg:h-[50vh]"
			style="top: 30%; transform: translateY(50%); clip-path: inset(0 0 -100% 0);"
		/>

		<div class="mx-auto flex w-full max-w-7xl flex-col items-center">
			<div
				class="z-10 flex h-[300px] w-full max-w-[1000px] flex-shrink-0 items-center justify-center px-4 sm:h-[400px] sm:px-8 lg:h-[500px]"
			>
				<img
					src={thumb2}
					alt="Thumbnail 2"
					class="h-auto max-h-[300px] w-full object-contain sm:max-h-[400px] lg:max-h-[550px]"
				/>
			</div>
		</div>
	</div>

	<!-- Section-4 -->
	<div
		class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 text-center text-white sm:px-8 sm:py-16 md:px-16 md:py-24"
	>
		<img
			src={amoeba}
			alt="Amoeba Bottom Right"
			class="absolute right-[1%] top-[50%] h-[300px] w-[400px] -translate-y-1/2 transform opacity-60 sm:h-[400px] sm:w-[500px] lg:h-[500px] lg:w-[700px]"
		/>
		<img
			src={spring}
			alt="Tilted Spring Below Left"
			class="absolute left-0 z-10 h-[30vh] flex-shrink-0 opacity-70 sm:h-[40vh] lg:h-[50vh]"
			style="top: 60%; transform: translateY(50%); clip-path: inset(0 0 -100% 0);"
		/>

		<div class="flex flex-col items-center">
			<div class="relative mb-8 sm:mb-12 md:mb-16 lg:mb-24">
				<p
					class="font-inter text-center text-2xl font-bold leading-tight tracking-tight text-[#FEFEFE] sm:text-3xl sm:leading-[56px] sm:tracking-[-1.5px] md:text-4xl lg:text-[50px]"
					style="text-shadow: 2px 2px 1px #cf63fd;"
				>
					We are building one with feedback<br /> from the best devs in the world
				</p>
			</div>

			<div class="z-10 flex w-full max-w-[1000px] flex-shrink-0 items-center justify-center">
				<img
					src={thumb3}
					alt="Thumbnail 1"
					class="sm:border-6 h-auto max-h-[400px] w-full rounded-xl border-4
						   border-dashed border-white
						   object-contain p-4 sm:max-h-[600px] sm:rounded-2xl lg:max-h-[800px]
						   lg:border-8"
				/>
			</div>
		</div>
	</div>

	<div
		id="contact"
		class="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0A061B] pt-24 text-center text-white sm:pt-32 md:pt-48 lg:pt-96"
	>
		<div class="relative w-full">
			<div
				class="relative h-[250px] w-full bg-[rgba(52,52,52,0.40)] backdrop-blur-[52px] sm:h-[300px] md:h-[350px]"
			>
				<div
					class="sm:border-t-6 absolute inset-x-0 top-0 h-6 border-t-4 border-dashed border-[rgba(255,255,255,0.60)] sm:h-8 md:border-t-8"
				></div>
				<div
					class="sm:border-b-6 absolute inset-x-0 bottom-0 h-6 border-b-4 border-dashed border-[rgba(255,255,255,0.60)] sm:h-8 md:border-b-8"
				></div>

				<img
					src={star_grey}
					alt="Star Grey"
					class="absolute -right-4 top-[35%] h-[200px] w-[200px] -translate-y-1/3 sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px]"
				/>

				<div class="flex h-full flex-col items-center justify-center gap-4 sm:gap-6">
					<div
						class="inline-flex flex-wrap items-center justify-center gap-4 px-4 sm:gap-6 md:gap-8"
					>
						<a href="https://github.com/GDGVIT" target="_blank" rel="noopener noreferrer">
							<img
								src={git}
								alt="GitHub"
								class="h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-125
										sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[70px]"
							/>
						</a>
						<a
							href="https://instagram.com/gdscvitvellore"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={insta}
								alt="Instagram"
								class="h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-125
										sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[70px]"
							/>
						</a>
						<a href="https://twitter.com/gdscvit" target="_blank" rel="noopener noreferrer">
							<img
								src={x}
								alt="X (Twitter)"
								class="h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-125
										sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[70px]"
							/>
						</a>
						<a href="https://www.youtube.com/@gdscvit" target="_blank" rel="noopener noreferrer">
							<img
								src={yt}
								alt="YouTube"
								class="h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-125
										sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[70px]"
							/>
						</a>
						<a href="https://dscv.it/telegram" target="_blank" rel="noopener noreferrer">
							<img
								src={tele}
								alt="Telegram"
								class="h-[40px] w-[40px] cursor-pointer transition-all duration-300 hover:scale-125
										sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[70px]"
							/>
						</a>
					</div>

					<div class="text-[10px] text-white sm:text-[12px] md:text-[13.652px]">
						Made with 💜 by GDSC-VIT
					</div>

					<!-- Divider -->
					<div class="h-[0.853px] w-[90%] bg-[#FFFBFB] sm:w-[95%] md:w-[1026.473px]"></div>

					<!-- Copyright -->
					<div class="text-[8px] font-light text-white sm:text-[9px] md:text-[10.239px]">
						Copyright ©{new Date().getFullYear()}, All rights reserved.
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
	.marquee-container {
		position: absolute;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		height: 3rem;
	}

	.marquee {
		display: flex;
		white-space: nowrap;
		animation: marquee 20s linear infinite;
		padding: 0 2rem;
	}

	.marquee-set {
		margin-right: 2rem;
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
