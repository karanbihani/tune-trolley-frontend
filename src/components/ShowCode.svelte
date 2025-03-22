<script lang="ts">
	import { Dialog, Separator } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import QRCode from '@castlenine/svelte-qrcode';
	import { PUBLIC_FRONTEND_URL } from '$env/static/public';
	import type { EventModel } from '$lib/event';

	interface Props {
		event: EventModel;
		isOwner: boolean;
	}

	let { event, isOwner }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class={`flex w-full flex-col items-center gap-4 rounded-lg p-2 font-semibold transition md:ml-auto md:w-auto md:flex-row ${
			isOwner ? 'bg-white text-[#5822EE] hover:bg-gray-300' : 'bg-[#5822EE] text-white px-4 hover:bg-[#3730a3]'
		}`}
	>
		Show Code
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="shadow-popover fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-white/15 bg-black p-5 text-white outline-none sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
				>{event.name}</Dialog.Title
			>
			<Separator.Root class="-mx-5  mb-6 mt-5 block h-px bg-white/15" />
			<Dialog.Description>
				Enter the code or scan the QR below to join the event and start adding songs to the
				playlist.
			</Dialog.Description>
			<div class="my-8 flex w-full flex-col items-center justify-center">
				<h1 class="mb-4 text-center text-6xl font-extrabold">{event.playlist_code}</h1>
				<QRCode data={`${PUBLIC_FRONTEND_URL}dashboard/event/${event.playlist_code}`}></QRCode>
			</div>

			<Dialog.Close
				class="focus-visible:ring-foreground focus-visible:ring-offset-background active:scale-98 absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
			>
				<div>
					<X />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
