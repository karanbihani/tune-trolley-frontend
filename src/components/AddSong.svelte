<script lang="ts">
	import { Dialog, Separator } from 'bits-ui';
	import { Plus, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		createEvent: any;
		name: string;
	}

	let { createEvent, name = $bindable() }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="flex flex-row items-center rounded-lg bg-white px-4 font-bold text-[#1DB954] transition hover:bg-gray-300"
		><Plus class="mr-2 font-bold" />Add an Event</Dialog.Trigger
	>
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
				>Add a new event</Dialog.Title
			>
			<Separator.Root class="-mx-5  mb-6 mt-5 block h-px bg-white/15" />
			<Dialog.Description>
				Create a new event to start collaborating on a playlist with your friends.
			</Dialog.Description>
			<div class="relative w-full">
				<input
					bind:value={name}
					class="my-4 w-full rounded-lg border border-white/15 bg-black p-4 text-white"
					id="eventname"
					placeholder="Homecoming Party"
				/>
			</div>
			<div class="flex w-full justify-end">
				<Dialog.Close
					on:click={createEvent}
					class="flex flex-row items-center rounded-lg bg-white p-2 text-black transition hover:bg-white/80"
					>Create
				</Dialog.Close>
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
