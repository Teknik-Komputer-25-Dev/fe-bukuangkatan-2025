<script setup lang="ts">
import LottieAnimation from '../../ui/LottieAnimation.vue';
import { useResponsive } from '@/composables/useResponsive';

// Use responsive composable for clean window width management
const { animationSize } = useResponsive();
</script>

<template>
    <section id="logo-intro" class="relative flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6 md:px-8">
        <div class="relative">
            <LottieAnimation :animation-data="mascotAnimation" 
                :height="animationSize.height" 
                :width="animationSize.width" 
                class="mx-auto" />
        </div>
        <div class="text-center flex my-6 sm:my-8 md:my-10 font-medium">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                Welcome to the Digital Book of<br class="hidden sm:block" />
                <span class="block sm:inline">Computer Engineering '25</span>
            </h2>
        </div>
    </section>
</template>