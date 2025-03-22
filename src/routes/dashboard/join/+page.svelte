<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import amoebaBelowRight from '$lib/assets/amoeba-below-right.svg';
	import dashSpring from '$lib/assets/dash_spring.svg';
	import toast from 'svelte-hot-french-toast';

	let code = '';

	onMount(async () => {
		let token = localStorage.getItem('token');

		if (!token) {
			localStorage.setItem('redirectURL', 'dashboard/join');
			window.location.href = `${PUBLIC_BACKEND_URL}/auth/spotify/login/web`;
		}
	});

	async function joinEvent() {
		let url = `${PUBLIC_BACKEND_URL}/playlists/join`;
		let token = localStorage.getItem('token');

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				playlist_code: code
			})
		});

		if (res.ok) {
			toast.success('Event joined');
			goto(`/dashboard/event/${code}`);
		} else {
			toast.error('Failed to join event');
		}
	}
</script>

<div
	class="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black px-8 pt-16"
>
	<img
		src={amoebaBelowRight}
		alt="Amoeba Below Right"
		class="absolute bottom-0 right-0 w-1/3 opacity-50 lg:hidden"
	/>
	<img
		src={dashSpring}
		alt="Dash Spring"
		class="absolute left-0 top-0 w-1/3 opacity-50 lg:hidden"
	/>
	<div
		class="text-shadow-md font-gotham mb-10 text-2xl font-bold leading-5 tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl"
		style="text-shadow: 0px 2px 0px #DA84FE;"
	>
		Join an event by entering the event code below.
	</div>
	<input
		bind:value={code}
		class="m-4 mb-10 w-4/5 rounded-lg border border-white/40 bg-black p-4 md:w-2/5"
		type="text"
		placeholder="Enter event code"
	/>
	<button
		onclick={() => joinEvent()}
		class="mb-8 rounded-lg bg-[#5822EE] px-8 py-2 text-white transition hover:bg-[#3730a3]"
	>
		Join
	</button>
</div>
