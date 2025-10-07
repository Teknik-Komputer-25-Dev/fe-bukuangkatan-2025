<script setup lang="ts">
import BaseCarousel from '../../ui/BaseCarousel.vue';
import LazyImage from '../../ui/LazyImage.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useNavigation } from '@/composables/useNavigation';
import { useCarousel } from '@/composables/useCarousel';
import { classPhotosData } from '@/data/classPhotos';

// Use navigation composable for clean routing
const { goToProfile } = useNavigation();

// Use carousel configuration composable
const { singleSlideConfig } = useCarousel();

// Use centralized data instead of inline definition
const classPhotos = classPhotosData;
</script>

<template>
    <section class="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto px-4 sm:px-6 md:px-8">
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Momen Berharga
                    <span class="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        Bersama
                    </span>
                </h3>
                <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                    Koleksi foto-foto terbaik dari berbagai kegiatan dan acara yang telah kita lalui bersama.
                </p>
            </div>

            <!-- Custom Carousel dengan Swiper -->
            <BaseCarousel :items="classPhotos" 
                v-bind="singleSlideConfig"
                class="max-w-6xl mx-auto">
                <template #default="{ item }">
                    <div class="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl mx-2 sm:mx-0">
                        <LazyImage :src="item.image" :alt="item.title"
                            class="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" />

                        <!-- Overlay Content -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                                <h4 class="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{{ item.title }}</h4>
                                <p class="text-sm sm:text-base text-gray-200 mb-1 sm:mb-2">{{ item.description }}</p>
                                <span class="text-xs sm:text-sm text-blue-300">{{ item.date }}</span>

                                <!-- Button di dalam carousel -->
                                <div class="mt-3 sm:mt-4 text-center">
                                    <BaseButton rounded="full" variant="light" size="xl"
                                        @click.stop="goToProfile"
                                        class="text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                                        style="box-shadow: 0 0 20px #56CCF280;">
                                        Explore Us!
                                    </BaseButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </BaseCarousel>
        </div>
    </section>
</template>