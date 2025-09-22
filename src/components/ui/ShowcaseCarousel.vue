<template>
  <section class="relative bg-gray-400 rounded-xl overflow-hidden my-8">
    <!-- Carousel Navigation -->
    <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
    </button>
    <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 active:scale-95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </button>
    <!-- Carousel Content -->
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Kiri: Teks -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ items[active].title }}</h2>
          <p class="text-lg text-gray-200 mb-6">{{ items[active].desc }}</p>
        </div>
        <!-- Kanan: Gambar/Placeholder -->
        <div class="flex justify-center">
          <div class="bg-gray-200 rounded-2xl flex items-center justify-center w-full max-w-md h-64 md:h-80 text-gray-600 text-center text-lg">
            {{ items[active].imgText }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const items = [
  {
    title: 'Komponen 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.',
    imgText: 'Gambar Maskot yang di highlight',
  },
  {
    title: 'Komponen 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.',
    imgText: 'Gambar Maskot yang di hehe',
  },
  // Tambah item lain jika ingin multi-slide
]

const active = ref(0)

function prev() {
  active.value = (active.value - 1 + items.length) % items.length
}
function next() {
  active.value = (active.value + 1) % items.length
}
</script>
