<template>
  <section class="relative min-h-screen w-full flex items-center justify-center ">
    <div class="w-full max-w-6xl mx-auto px-4">
      
      <!-- Title Section -->
      <div class="text-center mb-12">
        <h2 
          class="text-4xl md:text-6xl font-bold  mb-4"
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          COLOR PALETTE
        </h2>
        <p 
          class="text-lg max-w-2xl mx-auto"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        >
          Setiap warna memiliki makna dan filosofi yang melambangkan nilai-nilai Angkatan 2025
        </p>
      </div>

      <!-- Interactive Color Boxes -->
      <div class="flex justify-center items-stretch h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div
          v-for="(color, index) in colors"
          :key="color.hex"
          class="relative cursor-pointer transition-all duration-500 ease-out overflow-hidden group hover:scale-y-105"
          :style="{ 
            backgroundColor: color.hex,
            flex: activeColor === index ? '2.5' : '1'
          }"
          @click="setActiveColor(index)"
          v-motion
          :initial="{ opacity: 0, scaleY: 0.3 }"
          :enter="{ 
            opacity: 1, 
            scaleY: 1, 
            transition: { 
              duration: 800, 
              delay: index * 150,
              type: 'spring',
              stiffness: 100
            } 
          }"
        >
          
          <!-- Color Hex Text -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span
              class="font-mono font-bold text-sm md:text-lg lg:text-xl transition-all duration-500 select-none drop-shadow-lg"
              :class="[
                getTextColor(color.hex),
                activeColor === index ? 'transform rotate-0 scale-110' : 'transform -rotate-90'
              ]"
            >
              {{ color.hex }}
            </span>
          </div>

          <!-- Color Description (Only visible when active) -->
          <div 
            v-if="activeColor === index"
            class="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm"
            v-motion
            :initial="{ opacity: 0, y: 50, scale: 0.9 }"
            :enter="{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 600, 
                delay: 300,
                type: 'spring',
                stiffness: 150
              } 
            }"
          >
            <h3 
              class="font-bold text-sm md:text-lg mb-1"
              :class="getTextColor(color.hex)"
            >
              {{ color.name }}
            </h3>
            <p 
              class="text-xs md:text-sm leading-relaxed"
              :class="getTextColor(color.hex, true)"
            >
              {{ color.description }}
            </p>
          </div>

          <!-- Active Indicator -->
          <div 
            v-if="activeColor === index"
            class="absolute top-3 right-3 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-lg"
            v-motion
            :initial="{ scale: 0, opacity: 0 }"
            :enter="{ 
              scale: 1, 
              opacity: 0.8,
              transition: { 
                duration: 400, 
                delay: 500,
                type: 'spring',
                stiffness: 200
              } 
            }"
          ></div>

          <!-- Hover Effect Ring -->
          <div 
            class="absolute inset-0 border-2 border-white border-opacity-0 group-hover:border-opacity-30 transition-all duration-300"
            :class="{ 'border-opacity-50': activeColor === index }"
          ></div>

        </div>
      </div>

      <!-- Instructions -->
      <div 
        class="text-center mt-8 space-y-4"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 1200 } }"
      >
        <p class=" text-sm">
          Klik pada setiap warna untuk melihat makna dan filosofinya
        </p>
        
        <!-- Color Navigation Dots -->
        <div class="flex justify-center items-center space-x-4 mt-4">
          
          <!-- Auto-play Control -->
          <button
            @click="autoPlay = !autoPlay; autoPlay ? startAutoPlay() : stopAutoPlay()"
            class="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-xs text-gray-700"
          >
            <span>{{ autoPlay ? '⏸️' : '▶️' }}</span>
            <span>{{ autoPlay ? 'Pause' : 'Play' }}</span>
          </button>
          
          <!-- Color Dots -->
          <div class="flex space-x-2">
            <button
              v-for="(color, index) in colors"
              :key="`dot-${index}`"
              @click="setActiveColor(index)"
              class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
              :style="{ backgroundColor: color.hex }"
              :class="{ 
                'ring-2 ring-gray-400 ring-offset-2 scale-125': activeColor === index,
                'opacity-60 hover:opacity-80': activeColor !== index
              }"
              :title="color.name"
            ></button>
          </div>
          
          <!-- Keyboard Hint -->
          <span class="text-xs text-gray-400 hidden md:block">
            ← → Space
          </span>
          
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Color data with meanings
const colors = ref([
  {
    hex: '#FFFADD',
    name: 'Putih Kejinggaan',
    description: 'Melambangkan kebersamaan dan persatuan dalam keberagaman yang menjadi fondasi kuat Angkatan 2025.'
  },
  {
    hex: '#B47EDE', 
    name: 'Ungu Muda',
    description: 'Melambangkan kreativitas dan rasa ingin tahu yang mendorong inovasi dan pembelajaran berkelanjutan.'
  },
  {
    hex: '#311432',
    name: 'Ungu Tua', 
    description: 'Melambangkan kegigihan dan pantang menyerah dalam menghadapi segala tantangan akademik dan kehidupan.'
  },
  {
    hex: '#EE7A13',
    name: 'Jingga',
    description: 'Melambangkan semangat dan energi positif yang menjadi ciri khas Angkatan 25 dalam setiap aktivitas.'
  },
  {
    hex: '#C21807',
    name: 'Merah',
    description: 'Melambangkan keberanian dan determinasi untuk menjadi pemimpin masa depan yang berintegritas.'
  }
])

// Active color state
const activeColor = ref(0) // Default to first color
const autoPlay = ref(true)
const autoPlayInterval = ref(null)

// Set active color
const setActiveColor = (index) => {
  activeColor.value = index
  // Restart auto-play timer when manually selecting
  if (autoPlay.value) {
    startAutoPlay()
  }
}

// Auto-play functionality
const startAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  
  autoPlayInterval.value = setInterval(() => {
    if (autoPlay.value) {
      activeColor.value = (activeColor.value + 1) % colors.value.length
    }
  }, 4000) // Change every 4 seconds
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Keyboard navigation
const handleKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      activeColor.value = activeColor.value > 0 ? activeColor.value - 1 : colors.value.length - 1
      break
    case 'ArrowRight':
      event.preventDefault()
      activeColor.value = (activeColor.value + 1) % colors.value.length
      break
    case ' ':
      event.preventDefault()
      autoPlay.value = !autoPlay.value
      if (autoPlay.value) {
        startAutoPlay()
      } else {
        stopAutoPlay()
      }
      break
  }
}

// Get text color based on background
const getTextColor = (bgColor, isSecondary = false) => {
  const darkColors = ['#311432', '#C21807']
  const isDark = darkColors.includes(bgColor)
  
  if (isSecondary) {
    return isDark ? 'text-white text-opacity-80' : 'text-black text-opacity-70'
  }
  
  return isDark ? 'text-white' : 'text-black'
}

// Lifecycle hooks
onMounted(() => {
  // Start auto-play after initial animation
  setTimeout(() => {
    startAutoPlay()
  }, 2000)
  
  // Add keyboard event listener
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Custom animation for smooth transitions */
.color-box {
  transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure text rotation is smooth */
.color-hex {
  transition: transform 0.5s ease-out, writing-mode 0.5s ease-out;
}

/* Smooth backdrop blur transition */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
