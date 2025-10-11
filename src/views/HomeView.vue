<template>
    <div class="home-view">
        <HeroSection />
        <LogoIntro />
        <PhotoCarousel />
    </div>
</template>

<script setup>
import LogoIntro from '../components/features/home/LogoIntro.vue';
import HeroSection from '@/components/features/home/HeroSection.vue';
import PhotoCarousel from '@/components/features/home/PhotoCarousel.vue';
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