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
            ← →
          </span>
          
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const colors = ref([
  {
    hex: '#B47EDE',
    name: 'Lavender (floral)',
    description: 'melambangkan ketahanan angkatan 25 dalam menghadapi berbagai tantangan'
  },
  {
    hex: '#E9E1FE', 
    name: 'Lavender (web)',
    description: 'melambangkan fleksibilitas angkatan 25'
  },
  {
    hex: '#3F0368',
    name: 'Indigo', 
    description: 'menumbuhkan kedalaman kreativitas dan inspirasi dengan suasana tenang'
  },
  {
    hex: '#EE7A13',
    name: 'Safety Orange',
    description: 'melambangkan semangat solidaritas angkatan 25 yang andal dan saling menjaga'
  },
  {
    hex: '#C21807',
    name: 'Engineering Orange',
    description: 'melambangkan keberanian angkatan 25 untuk berinovasi dan menciptakan solusi'
  }
])

const activeColor = ref(0)

const setActiveColor = (index) => {
  activeColor.value = index
}

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
  }
}

const getTextColor = (bgColor, isSecondary = false) => {
  const darkColors = ['#3F0368', '#C21807']
  const isDark = darkColors.includes(bgColor)
  
  if (isSecondary) {
    return isDark ? 'text-white text-opacity-80' : 'text-black text-opacity-70'
  }
  
  return isDark ? 'text-white' : 'text-black'
}

onMounted(() => {

  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
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
