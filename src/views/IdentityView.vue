<template>
  <div class="identity-view">
    <HeroSection />
    <!-- <AboutUs /> -->
    <VisionMission />
    <ColourPalette />
    <VencoboltCarousel />
    <LogoExplain />
    <KeyCharacteristicsSection />
    <MaskotOverview />
    <!-- <MascottExplain /> -->
  </div>

</template>

<script setup>
import HeroSection from '@/components/features/identity/HeroSection.vue';
import VisionMission from '@/components/features/identity/VisionMission.vue';
import ColourPalette from '@/components/features/identity/ColourPalette.vue';
import MascottExplain from '../components/features/identity/MascottExplain.vue';
import MaskotOverview from '../components/features/identity/MaskotOverview.vue';
import VencoboltCarousel from '../components/features/identity/VencoboltCarousel.vue';
import KeyCharacteristicsSection from '../components/features/identity/KeyCharacteristicsSection.vue';
import LogoExplain from '../components/features/identity/LogoExplain.vue';

</script>