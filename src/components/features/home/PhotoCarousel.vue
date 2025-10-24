<script setup lang="ts">
import BaseCarousel from '../../ui/BaseCarousel.vue';
import LazyImage from '../../ui/LazyImage.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useNavigation } from '@/composables/useNavigation';
import { useCarousel } from '@/composables/useCarousel';
import { classPhotosData } from '@/data/classPhotos';

// Use navigation composable for clean routing
const { goToGallery } = useNavigation();

// Use carousel configuration composable
const { singleSlideConfig } = useCarousel();

// Use centralized data instead of inline definition
const classPhotos = classPhotosData;
</script>

<template>
    <section class="py-10 sm:py-16 md:py-20 bg-[#3F0368] from-gray-50 to-blue-50">
        <div class="container mx-auto px-4 sm:px-6 md:px-8">
            <div class="text-center mb-8 sm:mb-12 md:mb-16">
                <h1 class="text-[#FFFFFF] text-3xl max-w-xs sm:max-w-5xl sm:text-5xl lg:text-5xl font-semibold leading-normal mb-6 mx-auto">
                    Looking Back at <span class="bg-gradient-to-r from-[#EE7A13] to-[#B47EDE] bg-clip-text text-transparent">Tekkom ’25</span>
                </h1>
                <p class="text-base sm:text-lg text-white max-w-2xl mx-auto px-4">
                    Koleksi foto-foto terbaik dari berbagai kegiatan dan acara yang telah kita lalui bersama.
                </p>
            </div>

            <!-- Custom Carousel dengan Swiper -->
            <BaseCarousel :items="classPhotos" 
                v-bind="singleSlideConfig"
                class="max-w-9xl mx-auto">
                <template #default="{ item }">
                    <div class="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl mx-2 sm:mx-0">
                        <LazyImage :src="item.image" :alt="item.title"
                            class="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[1000px] object-cover transition-transform duration-700 group-hover:scale-110" />

                        <!-- Overlay Content -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                                <h4 class="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{{ item.title }}</h4>
                                <p class="text-sm sm:text-base text-gray-200 mb-1 sm:mb-2">{{ item.description }}</p>
                                <span class="text-xs sm:text-sm text-blue-300">{{ item.date }}</span>

                                <!-- Button di dalam carousel -->
                                <div class="mt-3 sm:mt-4 text-center">
                                    <BaseButton rounded="full" size="xl"
                                        @click.stop="goToGallery"
                                        class="text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                                        variant="gradient"
                                        :style="{
                                          backgroundImage: 'linear-gradient(to left, #EE7A13, #3F0368)',
                                          boxShadow: '0 0 20px #EE7A1355'
                                        }">
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