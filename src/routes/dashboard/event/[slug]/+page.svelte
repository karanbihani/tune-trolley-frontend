<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'bits-ui';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import toast from 'svelte-hot-french-toast';

	let code = '';
	var songSearch = $state('');
	let songs: Array<spotifySong> = $state([]);

	onMount(async () => {
		let url = window.location.href;
		let urlArr = url.split('/');
		code = urlArr[urlArr.length - 1];

		let token = localStorage.getItem('token');

		if (!token) {
			localStorage.setItem('redirectURL', `dashboard/event/${code}`);
			window.location.href = `${PUBLIC_BACKEND_URL}/auth/spotify/login/web`;
		}
	});

	function addSong(song: string) {
		let url = `${PUBLIC_BACKEND_URL}/songs/add`;

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				playlist_code: code,
				song_uri: song
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				toast.success('Song added');
			})
			.catch((error) => {
				toast.error('Error in adding song');
			});
	}

	function searchSong() {
		let url = 'https://api.spotify.com/v1/search';
		let searchTerm = songSearch.replaceAll(' ', '%20');

		fetch(`${url}?q=${searchTerm}&type=track`, {
			method: 'GET',

			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				songs = data.tracks.items;
			});
	}
</script>

<div class="min-h-screen bg-black">
	<div class="flex w-full flex-col items-center p-4 pt-10">
		<div
			class="text-shadow-md font-gotham mb-10 flex flex-row items-center text-2xl font-bold leading-5 tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl"
			style="text-shadow: 0px 2px 0px #DA84FE;"
		>
			Add your favorite songs
		</div>

		<input
			bind:value={songSearch}
			oninput={searchSong}
			class="m-4 w-4/5 rounded-lg border border-white/40 bg-black p-4 md:w-2/5"
			type="text"
			placeholder="Search song to add"
		/>
	</div>
	<div class="h-[calc(100vh-200px)] overflow-auto">
		{#each songs as song}
			<div
				class="ml-4 mr-4 mt-4 flex flex-row items-center justify-between rounded-lg border border-white/30 p-4"
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
				<Button.Root
					on:click={() => addSong(song.id)}
					class="h-9 rounded-lg bg-[#1DB954] px-8 py-2 text-white transition hover:bg-[#3730a3]"
				>
					Add
				</Button.Root>
			</div>
		{/each}
	</div>
</div>
