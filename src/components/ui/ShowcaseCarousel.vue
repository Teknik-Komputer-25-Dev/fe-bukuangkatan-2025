<template>
  <section class="relative rounded-xl overflow-hidden my-8">
    <!-- Carousel Navigation -->
    <button 
      @click="prev" 
      :disabled="isTransitioning"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      @click="next" 
      :disabled="isTransitioning"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Carousel Content -->
    <div class="container mx-auto px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Kiri: Teks -->
        <div class="transition-all duration-500 ease-in-out md:pl-16">
          <h2 class="text-4xl md:text-5xl font-bold  mb-4 transition-all duration-500 ease-in-out">
            {{ items[active].title }}
          </h2>
          <p class="text-lg mb-6 text-gray-200 transition-all duration-500 ease-in-out">
            {{ items[active].desc }}
          </p>
        </div>
        <!-- Kanan: Gambar -->
        <div class="flex justify-center">
          <div class="relative w-full  backdrop-blur-md bg-white/10 border border-white/20 max-w-md h-64 md:h-80 overflow-hidden rounded-2xl">
            <img 
              :src="items[active].imgText" 
              :alt="items[active].title"
              class="w-full h-full object-contain transition-all duration-500 ease-in-out"
              :key="`img-${active}`"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Dots Indicator -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="goToSlide(index)"
        :class="[ 
          'w-3 h-3 rounded-full transition-all duration-300',
          active === index 
            ? 'bg-white scale-125 shadow-lg' 
            : 'bg-white/50 hover:bg-white/75 hover:scale-110'
        ]"
        :disabled="isTransitioning"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = [
  {
    title: 'BAUT DI KEPALA',
    desc: 'Melambangkan sebagai pengerat visi angkatan 25',
    imgText: '/images/mascott-explain/baut.png',
  },
  {
    title: 'Kaca Pembesar',
    desc: 'Mengedepankan rasa ingin tahu terhadap dunia pendidikan',
    imgText: '/images/mascott-explain/kaca-pembesar.png',
  },
  {
    title: 'Wajah Layar',
    desc: 'Angkatan yang ekspresif yang penuh kepekaan yang mampu berempati ke siapapun',
    imgText: '/images/mascott-explain/penuh-ekspresi.png',
  },
  {
    title: 'POSE',
    desc: 'Mengangkat tangan kiri ke atas melambangkan semangat pantang menyerah',
    imgText: '/images/mascott-explain/pose.png',
  },
  {
    title: 'Kaki Terbang',
    desc: 'Melambangkan angkatan yang semangat untuk berkembang menjadi lebih baik',
    imgText: '/images/mascott-explain/kaki-robot.png',
  },
  {
    title: 'TANGAN FLEKSIBEL',
    desc: 'Melambangkan fleksibilitas dalam membantu dan menolong sesama angkatan 25',
    imgText: '/images/mascott-explain/tangan-fleksibel.png',
  },
  {
    title: 'WALKIE TALKIE',
    desc: 'Keterbukaan dan kemudahan dalam berkomunikasi sesama TEKKOM 25',
    imgText: '/images/mascott-explain/walkie-talkie.png',
  },
  {
    title: 'JUBAH WEB',
    desc: 'Jejaring yang menghubungkan angkatan 25, dan halaman bagi 25 untuk menemukan motivasi',
    imgText: '/images/mascott-explain/web-jaring.png',
  },
]

const active = ref(0)
const isTransitioning = ref(false)

function prev() {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  active.value = (active.value - 1 + items.length) % items.length
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function next() {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  active.value = (active.value + 1) % items.length
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function goToSlide(index) {
  if (isTransitioning.value || active.value === index) return
  
  isTransitioning.value = true
  active.value = index
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
