<template>
    <div class="home-view">
        <HeroSection />
        <YouTubeEmbed video-id="w1u8W7lK0RY" />
        <WelcomeSection />
        <AboutUs />
        <MascottPreview />
        <PhotoCarousel />
    </div>
</template>

<script setup>
import HeroSection from '@/components/features/home/HeroSection.vue';
import PhotoCarousel from '@/components/features/home/PhotoCarousel.vue';
import WelcomeSection from '../components/features/home/WelcomeSection.vue';
import AboutUs from '../components/features/home/AboutUs.vue';
import MascottPreview from '../components/features/home/MascottPreview.vue';
import YouTubeEmbed from '@/components/common/YouTubeEmbed.vue';
</script>

<style scoped>
.home-view {
    overflow-x: hidden;
}

/* Memastikan semua section responsive */
@media (max-width: 640px) {
    .home-view {
        padding-top: 0;
    }
}
</style>