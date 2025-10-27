<template>
  <div class="identity-view">
    <HeroSection />
    <VisionMission />
    <ColourPalette />
    <VencoboltCarousel />
    <LogoExplain />
    <KeyCharacteristicsSection />
    <MaskotOverview />
    <YelYelSection />
  </div>

</template>

<script setup>
import HeroSection from '@/components/features/identity/HeroSection.vue';
import VisionMission from '@/components/features/identity/VisionMission.vue';
import ColourPalette from '@/components/features/identity/ColourPalette.vue';
import MaskotOverview from '../components/features/identity/MaskotOverview.vue';
import VencoboltCarousel from '../components/features/identity/VencoboltCarousel.vue';
import KeyCharacteristicsSection from '../components/features/identity/KeyCharacteristicsSection.vue';
import LogoExplain from '../components/features/identity/LogoExplain.vue';
import YelYelSection from '../components/features/identity/YelYelSection.vue';

</script>