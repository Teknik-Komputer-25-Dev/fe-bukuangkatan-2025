<template>
    <section class="flex flex-col md:flex-row items-center justify-center p-10 min-h-screen"
            style="background: linear-gradient(to bottom, #3F036888 0%, #3F036888 15%, #F8B21655 80%, #F8B21677 100%);"
    >
      <!-- Left Text Content -->
      <div class="mt-13 sm:mt-0 md:ml-8 lg:ml-10 xl:ml-20 2xl:ml-30 max-w-6xl space-y-3 ">
        <div class="inline-flex items-center rounded-md px-3 py-2 font-semibold text-sm sm:text-l md:text-xl lg:text-2xl text-white"
          style="background: linear-gradient(to left, #EE7A13, #3F0368);"
        >
          👋 Hello All
        </div>
  
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-extrabold leading-tight">
          BUKU DIGITAL <span class="bg-gradient-to-r from-[#B47EDE] to-[#8e65ad] bg-clip-text text-transparent">TEKNIK </span>
          <span class="bg-gradient-to-r from-[#EE7A13] to-[#de7212] bg-clip-text text-transparent">KOMPUTER</span> ’25<br></br>
        </h1>
  
        <p class="max-w-3xl text-sm sm:text-l md:text-xl lg:text-2xl text-white font-medium mt-5">
            ✨ Welcome to VencoBolt page ✨<br>
            Satu nama, ribuan cerita. VencoBolt adalah cerminan semangat, kebersamaan, persatuan dan perjalanan kami sebagai satu angkatan bahkan keluarga.
            Stay tune untuk identitas, kenangan, dan keseruan yang membentuk siapa kami hari ini.
        </p>
      </div>
  
      <!-- Placeholder Image -->
      <div class="ml-0 2xl:ml-60">
        <img
          src="@/assets/images/mascott_new.png"
          alt="Mascot Placeholder"
          class="w-70 max-w-xl lg:w-80 xl:w-100 2xl:w-120"
        />
      </div>
    </section>
  </template>

<script setup>
import { ChevronDown } from 'lucide-vue-next';
import { scrollToSection } from '@/composables/useScrollAnimations';
</script>