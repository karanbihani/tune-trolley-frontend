<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Button, Tabs } from 'bits-ui';
	import { ChevronLeft, Check, X, Users, ListPlus } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import toast from 'svelte-hot-french-toast';
	import { page } from '$app/stores';
	import type { EventModel } from '$lib/event';

	let acceptedSongs: acceptedSong[] = [];
	let submittedSongs: spotifySong[] = [];

	let eventName: string;
	let memberCount: number;
	let playlistCode: string;
	let isOwner: boolean;

	$: {
		const state = $page?.state as { event?: EventModel; isOwner?: boolean };
		eventName = state?.event?.name || '';
		memberCount = state?.event?.member_count || 0;
		playlistCode = state?.event?.playlist_code || '';
		isOwner = state?.isOwner || false;
	}

	async function deleteSong(id: string, isOwner: boolean) {
		if (!isOwner) {
			toast.error('You are not the owner of this playlist');
			return;
		}
		console.log('Deleting song with id:', id);
		console.log('Playlist code:', $page.params.slug);
		let url = `${PUBLIC_BACKEND_URL}/songs`;
		return fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				playlist_uuid: $page.params.slug,
				song_uri: id
			})
		})
			.then((response) => response.json())
			.then(() => {
				const playlistId = $page.params.slug;
				getPlaylistDetails(playlistId);
				toast.success('Song has been deleted');
			})
			.catch((error) => {
				toast.error('Error in deleting song');
			});
	}

	function getPlaylistDetails(id: string) {
		let url = `${PUBLIC_BACKEND_URL}/songs/${id}`;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				submittedSongs = data.data.submitted;
				acceptedSongs = data.data.accepted;
			})
			.catch((error) => {
				console.error('Error:', error);
				toast.error('Error in getting event details,');
			});
	}

	function acceptOrRejectSong(songId: string, option: string, isOwner: boolean) {
		if (!isOwner) {
			toast.error('You are not the owner of this playlist');
			return;
		}
		let url = `${PUBLIC_BACKEND_URL}/songs/${option}`;
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				playlist_uuid: $page.params.slug,
				song_uri: songId
			})
		})
			.then((response) => response.json())
			.then(() => {
				const playlistId = $page.params.slug;
				getPlaylistDetails(playlistId);
				toast.success('song has been ' + option + 'ed');
			})
			.catch((error) => {
				toast.error('Error in accepting/rejecting song');
			});
	}

	onMount(() => {
		const playlistId = $page.params.slug;
		getPlaylistDetails(playlistId);
	});
</script>

<div class="p-4">
	<Button.Root
		on:click={() => {
			goto('/dashboard/home');
		}}
		class="mb-4 flex flex-row gap-2"
	>
		<ChevronLeft /> Dashboard
	</Button.Root>
	<div class="relative mb-4 px-12 py-3">
		<h1 class="text-4xl font-bold text-white" style="text-shadow: 0px 2px 0px #DA84FE;">
			{eventName}
		</h1>
		<h2 class="mt-2 flex text-xl text-white">
			<Users size={24} color="#F8F8F8" class="mr-2" />
			{memberCount} Members
		</h2>
		<Button.Root
			on:click={() => {
				goto('/dashboard/event/' + playlistCode);
			}}
			class="absolute right-20 top-0 mt-4 flex flex-row gap-2"
		>
			<ListPlus /> Add Song
		</Button.Root>
	</div>
	<Tabs.Root>
		<Tabs.List class="flex w-full border-b border-gray-300">
			<Tabs.Trigger
				class="flex-1 p-3 text-center text-gray-600 transition-colors duration-200 data-[state=active]:border-b-2 data-[state=active]:border-[#1DB954] data-[state=active]:text-[#1DB954]"
				value="accepted"
			>
				Playlists
			</Tabs.Trigger>
			{#if isOwner}
				<Tabs.Trigger
					class="flex-1 p-3 text-center text-gray-600 transition-colors duration-200 data-[state=active]:border-b-2 data-[state=active]:border-[#1DB954] data-[state=active]:text-[#1DB954]"
					value="submitted"
				>
					Requests
				</Tabs.Trigger>
			{/if}
		</Tabs.List>
		{#if isOwner}
			<Tabs.Content value="submitted">
				{#each submittedSongs as song}
					<div
						class="my-2 flex flex-row items-center justify-between rounded-lg border border-white/30 p-4"
					>
						<div class="flex flex-row items-center justify-center gap-4">
							<img src={song.album.images[0].url} alt="Album Art" class="h-16 w-16" />
							<div class="flex flex-col">
								<h2 class="text-xl font-bold">{song.name}</h2>
								{#each song.album.artists as artist}
									<p>{artist.name}&nbsp;</p>
								{/each}
							</div>
						</div>
						<div class="flex gap-2">
							<Button.Root
								on:click={() => acceptOrRejectSong(song.id, 'accept', true)}
								class="h-10 w-10 rounded-lg transition hover:scale-110"
							>
								<Check color="#00FF00" />
							</Button.Root>
							<Button.Root
								on:click={() => acceptOrRejectSong(song.id, 'reject', true)}
								class="h-10 w-10 rounded-lg  transition hover:scale-110"
							>
								<X color="#FF0000" />
							</Button.Root>
						</div>
					</div>
				{/each}
			</Tabs.Content>
		{/if}
		<Tabs.Content value="accepted">
			{#each acceptedSongs as song}
				<div
					class="my-2 flex flex-row items-center justify-between rounded-lg border border-white/30 p-4"
				>
					<div class="flex flex-row items-center justify-center gap-4">
						<img src={song.track.Track.album.images[0].url} alt="Album Art" class="h-16 w-16" />
						<div class="flex flex-col">
							<h2 class="text-xl font-bold">{song.track.Track.name}</h2>
							{#each song.track.Track.album.artists as artist}
								<p>{artist.name}&nbsp;</p>
							{/each}
						</div>
					</div>
					{#if isOwner}
						<div class="flex gap-2 px-4">
							<button
								class="trash-container relative flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-none p-0"
								on:click={() => deleteSong(song.track.Track.id, true)}
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
					{/if}
				</div>
			{/each}
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
	.trash-container:hover .lid {
		transform: rotate(-45deg);
	}
</style>
