<template>
    <section class="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-center">
        <!-- Kolom Kiri - Content -->
        <div class="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-0 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <!-- Title -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-center lg:text-left">
                Digital Book<br>
                <span class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Computer Engineering '25</span>
            </h1>

            <!-- Description -->
            <p class="text-base sm:text-lg md:text-xl font-normal text-gray-600 leading-relaxed text-center lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>

        <!-- Kolom Kanan -->
        <div class="relative h-64 sm:h-80 md:h-96 lg:h-screen order-1 lg:order-2">
            <img src="@/assets/images/hero-bg.png" alt="Hero Image" class="w-full h-full object-cover" />
            <!-- Overlay untuk mobile -->
            <div class="absolute inset-0 bg-black/20 lg:bg-transparent"></div>
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