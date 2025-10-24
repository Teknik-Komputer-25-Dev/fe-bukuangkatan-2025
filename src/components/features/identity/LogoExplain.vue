<template>
  <section class="relative w-full min-h-screen pt-16">
    <!-- Main Container -->
    <div class="text-center">
        <h2 
          class="text-4xl md:text-6xl font-bold  mb-4"
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          LOGO
        </h2>
        
      </div>
    <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      <!-- Left Navigation Arrow -->
      <div 
        class="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110"
        @click="prevCharacteristic"
      >
        <div class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>
      </div>

      <!-- Right Navigation Arrow -->
      <div 
        class="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110"
        @click="nextCharacteristic"
      >
        <div class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>

      <!-- Characteristics Container -->
      <div 
        ref="characteristicsContainer"
        class="flex transition-transform duration-500 ease-in-out w-full"
        :style="{ transform: `translateX(-${currentCharacteristic * 100}%)` }"
      >
        <div 
          v-for="(characteristic, index) in extendedCharacteristics" 
          :key="`characteristic-${index}`"
          class="w-full flex-shrink-0 px-8 md:px-16 lg:px-24"
        >
          <div class="max-w-4xl mx-auto text-center  ">
            
            <!-- Main Content Card -->
            <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              
              <!-- Title -->
              <div class="mb-6">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold  ">
                  {{ characteristic.title }}
                </h2>
                <!-- Orange underline -->
                <div class="w-32 h-1 bg-orange-500 mx-auto rounded-full mt-4"></div>
              </div>

              <!-- Logo/Image -->
              <div class="mb-8">
                <div class="flex justify-center">
                  <img 
                    :src="characteristic.image" 
                    :alt="characteristic.imageAlt" 
                    class="h-40 md:h-48 lg:h-56 w-auto object-contain transition-all duration-500"
                  />
                </div>
              </div>

              <!-- Description -->
              <div class="space-y-6">
                <p class="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90  ">
                  {{ characteristic.description }}
                </p>
              </div>
            </div>

            <!-- Bottom Navigation Dots -->
            <div class="flex justify-center space-x-3 mt-8">
              <button
                v-for="(characteristic, index) in characteristics"
                :key="index"
                @click="goToCharacteristic(index)"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="getCurrentCharacteristicIndex() === index ? 'bg-orange-500' : 'bg-white bg-opacity-30'"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Characteristics data
const characteristics = ref([
  {
    title: "4 Key Characteristics",
    description: "4 putaran baut melambangkan 4 key characteristics dari angkatan 25.",
    image: "/images/Logo/4-key-char.png",
    imageAlt: "4 Key Characteristics"
  },
  {
    title: "Angkatan 25",
    description: "Circuit node yang membentuk 25 yang menandakan angkatan 25 Teknik Komputer.",
    image: "/images/Logo/25.png",
    imageAlt: "Angkatan 25"
  },
  {
    title: "Teknik Komputer",
    description: "Monitor melambangkan komputer yang merepresentasikan Program Studi Teknik Komputer.",
    image: "/images/Logo/computer.png",
    imageAlt: "Program Studi Teknik Komputer"
  },
  {
    title: "Embedded Systems",
    description: "8 circuit node yang berarti 8 byte serta melambangkan penjurusan Embedded di Teknik Komputer.",
    image: "/images/Logo/embedded.png",
    imageAlt: "Penjurusan Embedded Systems"
  },
  {
    title: "Simbol Kebersamaan",
    description: "Baut yang melambangkan simbol unik dari angkatan 25 yang bermakna mengeratkan angkatan 25.",
    image: "/images/Logo/mengeratkan.png",
    imageAlt: "Mengeratkan Angkatan 25"
  },
  {
    title: "Multimedia",
    description: "Gamepad melambangkan penjurusan Multimedia di Teknik Komputer.",
    image: "/images/Logo/multimedia.png",
    imageAlt: "Penjurusan Multimedia"
  },
  {
    title: "Networking",
    description: "Antena melambangkan penjurusan Networking di Teknik Komputer.",
    image: "/images/Logo/networking.png",
    imageAlt: "Penjurusan Networking"
  },
  {
    title: "Perkembangan Positif",
    description: "Simbol penjumlahan melambangkan perkembangan angkatan yang terus meningkat ke arah yang positif.",
    image: "/images/Logo/positif.png",
    imageAlt: "Perkembangan Positif"
  },
  {
    title: "Software Engineering",
    description: "Closing tag element dari HTML yang melambangkan penjurusan Software di Teknik Komputer.",
    image: "/images/Logo/software.png",
    imageAlt: "Penjurusan Software"
  }
])

// Infinite carousel setup
const extendedCharacteristics = ref([])
const realCharacteristicCount = characteristics.value.length
const duplicateCount = 1

// Initialize extended characteristics array
const initializeExtendedCharacteristics = () => {
  extendedCharacteristics.value = [
    ...characteristics.value.slice(-duplicateCount),
    ...characteristics.value,
    ...characteristics.value.slice(0, duplicateCount)
  ]
}

const currentCharacteristic = ref(duplicateCount)
const isTransitioning = ref(false)
const characteristicsContainer = ref(null)

// Helper function to get current characteristic index
const getCurrentCharacteristicIndex = () => {
  const index = currentCharacteristic.value - duplicateCount
  if (index < 0) return realCharacteristicCount - 1
  if (index >= realCharacteristicCount) return 0
  return index
}

// Navigation functions
const nextCharacteristic = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentCharacteristic.value++
  
  setTimeout(() => {
    if (currentCharacteristic.value >= realCharacteristicCount + duplicateCount) {
      // Temporarily disable transition for seamless jump
      if (characteristicsContainer.value) {
        characteristicsContainer.value.style.transition = 'none'
        currentCharacteristic.value = duplicateCount
        // Re-enable transition after jump
        setTimeout(() => {
          characteristicsContainer.value.style.transition = 'transform 500ms ease-in-out'
        }, 50)
      }
    }
    isTransitioning.value = false
  }, 500)
}

const prevCharacteristic = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentCharacteristic.value--
  
  setTimeout(() => {
    if (currentCharacteristic.value < duplicateCount) {
      // Temporarily disable transition for seamless jump
      if (characteristicsContainer.value) {
        characteristicsContainer.value.style.transition = 'none'
        currentCharacteristic.value = realCharacteristicCount + duplicateCount - 1
        // Re-enable transition after jump
        setTimeout(() => {
          characteristicsContainer.value.style.transition = 'transform 500ms ease-in-out'
        }, 50)
      }
    }
    isTransitioning.value = false
  }, 500)
}

const goToCharacteristic = (index) => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentCharacteristic.value = index + duplicateCount
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevCharacteristic()
  } else if (e.key === 'ArrowRight') {
    nextCharacteristic()
  }
}

// Auto-play functionality (optional)
const autoPlayInterval = ref(null)

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextCharacteristic()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Lifecycle
onMounted(() => {
  initializeExtendedCharacteristics()
  document.addEventListener('keydown', handleKeydown)
  // Uncomment to enable auto-play
  // startAutoPlay()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  stopAutoPlay()
})
</script>

<style scoped>
/* Custom font */


/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Glassmorphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  display: none;
}

/* Animation for floating effect */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>