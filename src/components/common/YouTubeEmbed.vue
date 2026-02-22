<template>
    <div class="w-full aspect-video overflow-hidden rounded-2xl bg-black/5 shadow-lg">
        <button
            v-if="!isLoaded"
            type="button"
            class="group relative h-full w-full"
            @click="handleLoad"
            aria-label="Play YouTube video"
        >
            <img
                :src="thumbnailSrc"
                :alt="thumbnailAlt"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="handleThumbnailError"
            />
            <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent"
                aria-hidden="true"
            ></div>
            <span
                class="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md"
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
            class="h-full w-full transition-opacity duration-500"
            :class="iframeLoaded ? 'opacity-100' : 'opacity-0'"
            :src="embedSrc"
            title="YouTube video player"
            frameborder="0"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            @load="handleIframeLoad"
        ></iframe>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    videoId: {
        type: String,
        required: true,
    },
});

const isLoaded = ref(false);
const iframeLoaded = ref(false);
const useFallback = ref(false);

const maxResSrc = computed(
    () => `https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`
);
const fallbackSrc = computed(
    () => `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
);

const thumbnailSrc = computed(() =>
    useFallback.value ? fallbackSrc.value : maxResSrc.value
);

const thumbnailAlt = computed(() => 'YouTube video thumbnail');

const embedSrc = computed(() => {
    const params = new URLSearchParams({
        autoplay: isLoaded.value ? '1' : '0',
        rel: '0',
        modestbranding: '1',
    });

    return `https://www.youtube-nocookie.com/embed/${props.videoId}?${params.toString()}`;
});

const handleThumbnailError = () => {
    useFallback.value = true;
};

const handleLoad = () => {
    isLoaded.value = true;
};

const handleIframeLoad = () => {
    iframeLoaded.value = true;
};

watch(
    () => props.videoId,
    () => {
        useFallback.value = false;
        isLoaded.value = false;
        iframeLoaded.value = false;
    }
);
</script>
