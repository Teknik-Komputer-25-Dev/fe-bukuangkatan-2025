<template>
  <section class="flex flex-col md:flex-row items-center justify-between px-8 py-16 min-h-screen"
           style="background: linear-gradient(to bottom, #008B7788 0%, #008B7788 15%, #F8B216 100%);"
  >
    <!-- Left Text Content -->
    <div class="md:ml-8 lg:ml-10 xl:ml-20 max-w-6xl space-y-3 ">
      <div class="inline-flex items-center rounded-md px-3 py-2 font-semibold text-sm sm:text-l md:text-xl lg:text-2xl text-white"
        style="background: linear-gradient(to right, #6ABE4C, #F8B216);"
      >
        👋 Hello All
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-extrabold leading-tight">
        DIGITAL BOOK <span class="bg-gradient-to-r from-[#0B756B] to-[#05413B] bg-clip-text text-transparent">COMPUTER </span>
        <span class="bg-gradient-to-r from-[#F8B216] to-[#f5CA6C] bg-clip-text text-transparent">ENGINEERING</span> ’25
      </h1>

      <p class="max-w-3xl text-sm sm:text-l md:text-xl lg:text-2xl text-white font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <!-- Placeholder Image -->
    <div class="sm:mr-0 md:mr-10">
      <img
        src="@/assets/images/mascott_dummy.png"
        alt="Mascot Placeholder"
        class="w-90 max-w-xl lg:w-100 xl:w-150 2xl:w-200"
      />
    </div>
    
    <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-black animate-bounce cursor-pointer"
        @click="scrollToSection('logo-intro')">
        <ChevronDown class="w-6 h-6 sm:w-8 sm:h-8" />
    </div>
  </section>
</template>
  
<script setup>
import { ChevronDown } from 'lucide-vue-next';
import { scrollToSection } from '@/composables/useScrollAnimations';
</script>
  