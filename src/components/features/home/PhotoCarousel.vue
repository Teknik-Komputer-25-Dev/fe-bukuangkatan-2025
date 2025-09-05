<script setup lang="ts">
import { ref } from 'vue';
import router from '../../../router';
import BaseCarousel from '../../ui/BaseCarousel.vue';
import LazyImage from '../../ui/LazyImage.vue';
import BaseButton from '@/components/ui/BaseButton.vue'
import { Camera } from 'lucide-vue-next';


const classPhotos = ref([
    {
        image: 'src/assets/images/orientation.JPG',
        title: 'Orientasi Mahasiswa Baru',
        description: 'Hari pertama kami bertemu dan memulai perjalanan bersama',
        date: 'Agustus 2025'
    },
    {
        image: 'src/assets/images/study-group.JPG',
        title: 'Belajar Bersama',
        description: 'Saling membantu dalam menghadapi tantangan akademik',
        date: 'Agustus 2025'
    },
    {
        image: 'src/assets/images/project-demo.JPG',
        title: 'Demo Proyek',
        description: 'Menampilkan hasil karya dan inovasi terbaru',
        date: 'Agustus 2025'
    }
])

</script>

<template>
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h3 class="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
                    Momen Berharga
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        Bersama
                    </span>
                </h3>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Koleksi foto-foto terbaik dari berbagai kegiatan dan acara yang telah kita lalui bersama.
                </p>
            </div>

            <!-- Custom Carousel dengan Swiper -->
            <BaseCarousel :items="classPhotos" :slides-per-view="1" :space-between="30" :loop="true"
                :autoplay="{ delay: 4000 }" class="max-w-6xl mx-auto">
                <template #default="{ item }">
                    <div class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
                        <LazyImage :src="item.image" :alt="item.title"
                            class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" />

                        <!-- Overlay Content -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h4 class="text-2xl font-bold mb-2">{{ item.title }}</h4>
                                <p class="text-gray-200 mb-2">{{ item.description }}</p>
                                <span class="text-sm text-blue-300">{{ item.date }}</span>

                                <!-- Button di dalam carousel -->
                                <div class="mt-4 text-center">
                                    <BaseButton rounded="full" variant="light" size="xl"
                                        @click.stop="router.push('/profile')" style="box-shadow: 0 0 20px #56CCF280;">
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