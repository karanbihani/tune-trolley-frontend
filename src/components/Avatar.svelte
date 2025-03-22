<script lang="ts">
    interface Props {
        name?: string;
        imageUrl?: string;
    }

    let { name = '', imageUrl = '' }: Props = $props();

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const backgroundColor = getRandomColor();
    const firstLetter = name.charAt(0).toUpperCase();
</script>

{#if imageUrl}
    <img src={imageUrl} alt={name} class="h-12 w-12 rounded-full" />
{:else}
    <div
        class="flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold text-white"
        style="background-color: {backgroundColor}"
    >
        {firstLetter}
    </div>
{/if}
