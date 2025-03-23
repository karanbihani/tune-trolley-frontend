<script lang="ts">
	import { page } from '$app/stores';
	import side_pane_doodle from '$lib/assets/side_pane_doodle.svg';
	import logo from '$lib/assets/logo.svg';
	import { Button } from 'bits-ui';
	import { LogOut, Home, Ticket } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	function gotoJoinEvents() {
		goto('/dashboard/join');
	}

	function gotoHome() {
		goto('/dashboard/home');
	}

	function logout() {
		localStorage.removeItem('token');
		goto('/');
	}

	$: isHome = $page.url.pathname === '/dashboard/home';
	$: isJoinEvents = $page.url.pathname === '/dashboard/join';
</script>

<div class="flex h-screen flex-col md:flex-row">
	<!-- Sidebar -->
	<div
		class="fixed hidden h-screen w-full flex-col items-center justify-between p-4 md:flex md:w-72 lg:w-96"
		style="background-image: url('{side_pane_doodle}');"
	>
		<div class="flex w-full flex-col items-center">
			<img class="mb-8" src={logo} alt="Logo" />
			<Button.Root
				on:click={gotoHome}
				class="flex w-full flex-row rounded-lg p-4 transition 
                       {isHome ? 'bg-white/20' : 'hover:bg-white/20'}"
			>
				<Home class="mr-4"></Home> Home
			</Button.Root>
			<Button.Root
				on:click={gotoJoinEvents}
				class="flex w-full flex-row rounded-lg p-4 transition 
                       {isJoinEvents ? 'bg-white/20' : 'hover:bg-white/20'}"
			>
				<Ticket class="mr-4"></Ticket>Join Events
			</Button.Root>
		</div>
		<div class="w-full">
			<Button.Root
				on:click={logout}
				class="flex w-full flex-row rounded-lg p-4 transition hover:bg-white/20"
			>
				<LogOut class="mr-4"></LogOut> Logout
			</Button.Root>
		</div>
	</div>

	<!-- Main Content -->
	<div class="flex-1 overflow-auto bg-black md:ml-72 lg:ml-96">
		<slot />
	</div>

	<!-- Mobile Navigation -->
	<div class="flex h-16 w-full flex-row bg-[#1DB954] md:hidden lg:hidden">
		<Button.Root
			on:click={gotoHome}
			class="flex w-full flex-row items-center justify-center rounded-lg p-4 transition hover:bg-white/20"
		>
			<Home class="mr-4"></Home> Home
		</Button.Root>
		<Button.Root
			on:click={gotoJoinEvents}
			class="flex w-full flex-row items-center justify-center rounded-lg p-4 transition hover:bg-white/20"
		>
			<Ticket class="mr-4"></Ticket> Events
		</Button.Root>
	</div>
</div>
