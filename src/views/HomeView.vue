<template>
    <div class="home-view bg-[#2d024b] text-white">
        <HeroSection />
        
        <!-- Video Section with proper container and spacing -->
        <section class="w-full py-16 md:py-24 relative overflow-hidden" style="background: linear-gradient(to bottom, #F8B21677 0%, #3F0368 40%, #2d024b 100%);">
            <div class="absolute inset-0 bg-[url('/images/Desktop - 8.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
                <div class="text-center mb-8 sm:mb-12">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">Kenangan <span class="bg-gradient-to-r from-[#F8B216] to-[#EE7A13] bg-clip-text text-transparent">Angkatan</span></h2>
                    <p class="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">Momen-momen tak terlupakan yang terekam dalam satu frame. Mari bernostalgia dan melihat kembali perjalanan kebersamaan kita.</p>
                </div>
                
                <div class="w-full max-w-5xl rounded-[2rem] p-2 sm:p-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl group hover:border-white/20 transition-all duration-500">
                    <div class="rounded-2xl overflow-hidden shadow-inner">
                        <YouTubeEmbed video-id="w1u8W7lK0RY" />
                    </div>
                </div>
            </div>
        </section>

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