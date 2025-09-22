<template>
    <section class=" h-screen grid lg:grid-cols-2 overflow-hidden items-center">
        <!-- Kolom Kiri - Content -->
        <div class="px-8 lg:px-16 space-y-6">
            <!-- Title -->
            <h1 class="text-6xl font-semibold leading-tight">
                Digital Book<br>
                Computer Engineering '25
            </h1>

            <!-- Description -->
            <p class="text-xl font-normal text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>

        <!-- Kolom Kanan -->
        <div class="relative h-screen">
            <img src="@/assets/images/hero-bg.png" alt="Hero Image" class="w-full h-full object-cover" />
        </div>

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black animate-bounce cursor-pointer"
            @click="scrollToSection('logo-intro')">
            <ChevronDown class="w-8 h-8" />
        </div>
    </section>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next';
import { scrollToSection } from '@/composables/useScrollAnimations';
</script>