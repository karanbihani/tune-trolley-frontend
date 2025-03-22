<script lang="ts">
	import AddSong from '../../../components/AddSong.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import Avatar from '../../../components/Avatar.svelte';
	import { Button } from 'bits-ui';
	import ShowCode from '../../../components/ShowCode.svelte';
	import { goto } from '$app/navigation';
	import toast from 'svelte-hot-french-toast';
	import type { EventModel, EventsResponse } from '$lib/event';
	import { ListPlus, Users } from 'lucide-svelte';

	let events: EventsResponse = { owner: [], member: [] };
	let name = '';
	let imageFile: File | null = null;

	async function deleteYourPlaylists(playlist_id: string) {
		try {
			let token = localStorage.getItem('token');
			let url = `${PUBLIC_BACKEND_URL}/playlists/${playlist_id}`;
			const res = await fetch(url, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) {
				throw new Error('Failed to delete event');
			}

			if (res.ok) {
				await fetchEvents();
				toast.success('Event deleted');
			}
		} catch (error) {
			console.error('Failed to delete event:', error);
			toast.error('Failed to delete event');
		}
	}

	async function fetchEvents() {
		try {
			let token = localStorage.getItem('token');
			let url = `${PUBLIC_BACKEND_URL}/playlists`;
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const data = await res.json();
			events = data['data'] || { owner: [], member: [] };
			if (res.status == 404 && data.error.message == 'No Playlists exist!') {
				if (events.member == null) {
					toast.success('No Events Joined');
				} else if (events.owner == null) {
					toast.success('No Events Created');
				} else if (events.member == null && events.owner == null) {
					toast.success('No Events Found');
				} else {
					toast.success('No Playlists exist!');
				}
			} else if (!res.ok || !data.success) {
				throw new Error('Failed to fetch events');
			}
		} catch (error) {
			console.error('Failed to fetch events:', error);
			toast.error('Failed to fetch events');
		}
	}

	async function createEvent() {
		let url = `${PUBLIC_BACKEND_URL}/playlists`;
		let token = localStorage.getItem('token');

		const formData = new FormData();
		formData.append('name', name);
		if (imageFile) {
			formData.append('image', imageFile);
		}
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		});

		if (res.ok) {
			await fetchEvents();
			toast.success('Event created');
		} else {
			toast.error('Failed to create event');
		}
	}

	function gotoEventPage(event: EventModel, isOwner: boolean) {
		goto(`/dashboard/home/${event.playlist_uuid}`, {
			state: {
				event: event,
				isOwner: isOwner
			}
		});
	}

	function gotoAddPage(playlistCode: string) {
		goto(`/dashboard/event/${playlistCode}`);
	}

	onMount(async () => {
		await fetchEvents();
	});
</script>

<div class="m-8 flex flex-col md:m-24">
	<div class="flex flex-row justify-between">
		<h1 class="text-2xl font-extrabold md:text-4xl" style="text-shadow: 2px 2px 0px #5822EE;">
			Home
		</h1>
		<AddSong {createEvent} bind:name />
	</div>

	<div class="mt-8">
		<h2 class="font-gotham mb-4 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-2xl">
			Your Events
		</h2>
		{#if events.owner == null}
			<p class="text-white">No events found. Create a new event to get started!</p>
		{:else}
			{#each events.owner as event (event.playlist_id)}
				<div
					class="event-container mb-4 flex flex-col justify-between rounded-lg border border-white/10 bg-[#5822EE] p-4 md:flex-row md:items-center"
				>
					<div class="mb-4 flex flex-row gap-4 md:mb-0">
						<Avatar name={event.name} imageUrl={event.image_url} />
						<div>
							<h2 class="font-gotham text-xl font-bold text-white">{event.name}</h2>
							<div class="flex items-center gap-2">
								<Users size={19} color="#F8F8F8" />
								<h3 class="font-gotham text-[#F8F8F8]">{event.member_count}</h3>
							</div>
						</div>
					</div>
					<div class="flex w-full flex-col items-center gap-4 md:ml-auto md:w-auto md:flex-row">
						<ShowCode {event} isOwner={true} />
						<Button.Root
							on:click={() => gotoEventPage(event, true)}
							class="h-full w-full items-center rounded-lg bg-white p-2 px-4 font-semibold text-[#5822EE] transition hover:bg-gray-300 md:w-auto"
						>
							Manage Songs
						</Button.Root>
						<button
							class="trash-container relative flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-none p-0"
							on:click={() => deleteYourPlaylists(event.playlist_uuid)}
							aria-label="Delete Playlist"
						>
							<div
								class="trash-body relative flex h-4 w-4 flex-col items-center justify-around rounded-b-md bg-red-600 p-0.5"
							>
								<div class="line h-0.5 w-3 rounded-sm bg-white/55"></div>
								<div class="line h-0.5 w-3 rounded-sm bg-white/55"></div>
								<div class="line h-0.5 w-3 rounded-sm bg-white/55"></div>
							</div>
							<div
								class="lid transform-origin-top absolute top-[-4px] h-1 w-4 rounded-sm bg-red-600 transition-transform duration-300 ease-in-out"
							></div>
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<div class="mt-8">
		<h2 class="font-gotham mb-4 text-xl font-bold text-white sm:text-2xl md:text-2xl lg:text-2xl">
			Joined Events
		</h2>
		{#if events.member == null}
			<p class="text-white">No joined events found. Join an event to see it here!</p>
		{:else}
			{#each events.member as event}
				<div
					class="event-container mb-4 flex flex-col justify-between rounded-lg border border-[#5822EE] bg-white p-4 md:flex-row md:items-center"
				>
					<div class="mb-4 flex flex-row items-center gap-4 md:mb-0">
						<Avatar name={event.name} imageUrl={event.image_url} />
						<div>
							<h2 class="font-gotham text-xl font-bold text-black">{event.name}</h2>
							<div class="flex items-center gap-2">
								<Users size={19} color="#000000" />
								<h3 class="font-gotham text-[rgba(0,0,0,0.70)]">{event.member_count}</h3>
							</div>
						</div>
					</div>
					<div class="flex w-full flex-col items-center gap-4 md:ml-auto md:w-auto md:flex-row">
						<ShowCode {event} isOwner={false} />
						<Button.Root
							on:click={() => gotoEventPage(event, false)}
							class="h-full w-full items-center rounded-lg bg-[#5822EE] p-2 px-4 font-semibold text-white transition hover:bg-[#3730a3] md:w-auto"
						>
							View Songs
						</Button.Root>
						<button
							class="add-song-button relative flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-none p-0"
							on:click={() => gotoAddPage(event.playlist_code)}
							aria-label="Add Playlist"
						>
							<ListPlus size={20} color="#5822EE" />
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.trash-container:hover .lid {
		transform: rotate(-45deg);
	}
	@media (max-width: 850px) {
		.event-container {
			position: relative;
			flex-direction: column;
		}
		.trash-container {
			position: absolute;
			top: 30px;
			right: 30px;
		}
		.add-song-button {
			position: absolute;
			top: 30px;
			right: 30px;
		}
	}
</style>
