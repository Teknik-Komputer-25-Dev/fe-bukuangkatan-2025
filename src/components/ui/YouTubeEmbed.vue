<template>
    <div class="w-full aspect-video overflow-hidden rounded-xl bg-black/5 p-5">
        <button
            v-if="!isLoaded"
            type="button"
            class="relative h-full w-full"
            @click="handleLoad"
            aria-label="Play YouTube video"
        >
            <img
                :src="thumbnailSrc"
                :alt="thumbnailAlt"
                class="h-full w-full object-cover"
                loading="lazy"
            />
            <span
                class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 24 24"
                    class="h-8 w-8"
                    fill="currentColor"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </span>
        </button>
        <iframe
            v-else
            class="h-full w-full"
            :src="embedSrc"
            title="YouTube video player"
            frameborder="0"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    videoId: {
        type: String,
        required: true,
    },
    autoplay: {
        type: Boolean,
        default: false,
    },
});

const isLoaded = ref(false);

const thumbnailSrc = computed(
    () => `https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg`
);

const thumbnailAlt = computed(() => `YouTube video thumbnail`);

const embedSrc = computed(() => {
    const autoplayValue = isLoaded.value && props.autoplay ? 1 : 0;
    const params = new URLSearchParams({
        autoplay: autoplayValue.toString(),
        rel: '0',
    });

    return `https://www.youtube-nocookie.com/embed/${props.videoId}?${params.toString()}`;
});

const handleLoad = () => {
    isLoaded.value = true;
};
</script>
