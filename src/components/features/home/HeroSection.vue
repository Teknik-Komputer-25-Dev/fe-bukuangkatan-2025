<template>
    <section class="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 lg:px-16 py-20 md:py-24 overflow-hidden"
             style="background: linear-gradient(to bottom, #3F0368 0%, #3F0368 25%, #F8B21655 80%, #F8B21677 100%);"
    >
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full bg-[url('/images/Desktop - 8.png')] opacity-[0.03] bg-cover bg-center pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full relative z-10 gap-12 md:gap-8">
        
        <!-- Left Text Content -->
        <div class="w-full md:w-3/5 space-y-6 md:space-y-8 text-center md:text-left flex flex-col items-center md:items-start pt-12 md:pt-0">
          <div class="inline-flex items-center rounded-full px-5 py-2 font-medium text-sm md:text-base shadow-xl border border-white/10"
            style="background: linear-gradient(135deg, #EE7A13, #8e65ad);"
          >
            <span class="mr-2">👋</span> Welcome to VencoBolt
          </div>
    
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg">
            BUKU DIGITAL <br class="hidden sm:block" />
            <span class="bg-gradient-to-r from-[#B47EDE] to-[#e4baff] bg-clip-text text-transparent">TEKNIK </span>
            <span class="bg-gradient-to-r from-[#EE7A13] to-[#ffb673] bg-clip-text text-transparent">KOMPUTER</span> ’25
          </h1>
    
          <p class="max-w-xl text-white/80 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              Satu nama, ribuan cerita. VencoBolt adalah cerminan semangat, kebersamaan, persatuan dan perjalanan kami sebagai satu angkatan bahkan keluarga.
              Stay tune untuk identitas, kenangan, dan keseruan yang membentuk siapa kami hari ini.
          </p>
        </div>
    
        <!-- Mascot Image -->
        <div class="w-full md:w-2/5 flex justify-center md:justify-end relative">
          <!-- Glow effect behind mascot -->
          <div class="absolute inset-0 bg-gradient-to-tr from-[#EE7A13] to-[#B47EDE] blur-[80px] opacity-20 rounded-full w-full h-full transform scale-75"></div>
          
          <img
            src="@/assets/images/mascott_new.png"
            alt="Mascot VencoBolt"
            class="relative w-64 sm:w-80 md:w-full max-w-[480px] object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out"
            loading="eager"
          />
        </div>
        
      </div>
    </section>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next';
import { scrollToSection } from '@/composables/useScrollAnimations';
</script>