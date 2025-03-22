<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { PUBLIC_FRONTEND_URL } from '$env/static/public';

	onMount(async () => {
		const url = new URL(window.location.href);
		const token = url.searchParams.get('token');
		if (token) {
			localStorage.setItem('token', token);
		}

		const redirectValue = localStorage.getItem('redirectURL') || '';

		if (redirectValue === '') {
			goto('/dashboard/');
		} else {
			goto(`${PUBLIC_FRONTEND_URL}${redirectValue}`);
		}

		localStorage.removeItem('redirectURL');
	});
</script>

<div class="flex h-screen items-center justify-center text-xl">
	Hold tight! We're tuning your Spotify vibes. 🎧🎶
</div>
