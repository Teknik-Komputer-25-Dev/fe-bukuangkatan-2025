<template>
  <div class="identity-view">
    <HeroSection />
    <AboutUs />
    <VisionMission />
    <ColourPalette />
    <LogoExplain />
    <MascottExplain />
  </div>

</template>

<script setup>
import HeroSection from '@/components/features/identity/HeroSection.vue';
import VisionMission from '@/components/features/identity/VisionMission.vue';
import ColourPalette from '@/components/features/identity/ColourPalette.vue';
import LogoExplain from '@/components/features/identity/LogoExplain.vue';
import MascottExplain from '../components/features/identity/MascottExplain.vue';
import AboutUs from '../components/features/identity/AboutUs.vue';

</script>