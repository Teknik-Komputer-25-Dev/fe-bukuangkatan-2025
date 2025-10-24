<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import { useNavigation } from '@/composables/useNavigation';

const { goToProfile } = useNavigation();
</script>

<template>
    <section class="relative w-full h-screen">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>
  
      <!-- Tinted Overlay -->
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to bottom, #EE7A135F 0%, #00000033 20%,  #00000033 45%, #3F036888 100%);"
      ></div>
  
      <!-- Content -->
      <div class="relative flex items-center justify-center h-full">
        <div class="flex flex-col items-center gap-6 text-center">
          <h1
            class="text-4xl max-w-xs sm:max-w-6xl sm:text-5xl lg:text-7xl font-semibold leading-normal mb-20"
            style="text-shadow: 0 0 20px #EE7A1333"
          >
            Welcome To Buku Digital<br>Angkatan ’25
          </h1>
          <BaseButton
            class="px-13 py-4 text-xl scale-90 sm:scale-100 sm:px-18 sm:py-5 sm:text-2xl lg:px-20 lg:py-5 lg:text-3xl font-thin transform transition-all duration-300 hover:scale-105"
            @click.stop="goToProfile"
            variant="gradient"
            rounded="full"
            size="3xl"
            :style="{
              backgroundImage: 'linear-gradient(to left, #EE7A13, #3F0368)',
              boxShadow: '0 0 20px #EE7A1355'
            }"
          >
            Explore Us!
          </BaseButton>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import background from '@/assets/images/foto-angkatan.jpeg';
  
  export default {
    name: 'FullscreenSection',
    data() {
      return {
        backgroundImage: background,
      };
    },
  };
  </script>
  