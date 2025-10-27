<template>
  <section class="relative w-full min-h-screen pt-8 md:pt-16">
    <!-- Header Section -->
    <LogoHeader />
    
    <!-- Carousel Section -->
    <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Navigation Arrows -->
      <CarouselNavigation 
        @prev="prevCharacteristic"
        @next="nextCharacteristic"
        :disabled="isTransitioning"
      />

      <!-- Characteristics Carousel -->
      <div 
        ref="carouselContainer"
        class="flex transition-transform duration-500 ease-in-out w-full"
        :style="carouselTransform"
      >
        <CharacteristicSlide 
          v-for="(characteristic, index) in extendedCharacteristics" 
          :key="`characteristic-${index}`"
          :characteristic="characteristic"
        />
      </div>
    </div>

    <!-- Pagination Dots -->
    <CarouselPagination 
      :total-items="characteristics.length"
      :current-index="getCurrentCharacteristicIndex()"
      @go-to="goToCharacteristic"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation.js'
import LogoHeader from './LogoExplain/LogoHeader.vue'
import CharacteristicSlide from './LogoExplain/CharacteristicSlide.vue'
import CarouselNavigation from './LogoExplain/CarouselNavigation.vue'
import CarouselPagination from './LogoExplain/CarouselPagination.vue'
import { logoCharacteristics } from '@/data/logoCharacteristics.js'

// Data
const characteristics = ref(logoCharacteristics)

// Carousel state
const currentCharacteristic = ref(1) // Start at 1 due to duplicate
const isTransitioning = ref(false)
const carouselContainer = ref(null)
const duplicateCount = 1

// Computed properties
const extendedCharacteristics = computed(() => [
  ...characteristics.value.slice(-duplicateCount),
  ...characteristics.value,
  ...characteristics.value.slice(0, duplicateCount)
])

const carouselTransform = computed(() => ({
  transform: `translateX(-${currentCharacteristic.value * 100}%)`
}))

// Helper function to get current characteristic index
const getCurrentCharacteristicIndex = () => {
  const index = currentCharacteristic.value - duplicateCount
  if (index < 0) return characteristics.value.length - 1
  if (index >= characteristics.value.length) return 0
  return index
}

// Navigation functions
const nextCharacteristic = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentCharacteristic.value++
  
  setTimeout(() => {
    if (currentCharacteristic.value >= characteristics.value.length + duplicateCount) {
      // Seamless loop to beginning
      if (carouselContainer.value) {
        carouselContainer.value.style.transition = 'none'
        currentCharacteristic.value = duplicateCount
        
        setTimeout(() => {
          if (carouselContainer.value) {
            carouselContainer.value.style.transition = 'transform 500ms ease-in-out'
          }
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
      // Seamless loop to end
      if (carouselContainer.value) {
        carouselContainer.value.style.transition = 'none'
        currentCharacteristic.value = characteristics.value.length + duplicateCount - 1
        
        setTimeout(() => {
          if (carouselContainer.value) {
            carouselContainer.value.style.transition = 'transform 500ms ease-in-out'
          }
        }, 50)
      }
    }
    isTransitioning.value = false
  }, 500)
}

const goToCharacteristic = (index) => {
  if (isTransitioning.value || index < 0 || index >= characteristics.value.length) return
  
  isTransitioning.value = true
  currentCharacteristic.value = index + duplicateCount
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// Keyboard navigation
const { setupKeyboardNavigation, cleanupKeyboardNavigation } = useKeyboardNavigation({
  onLeft: prevCharacteristic,
  onRight: nextCharacteristic
})

// Lifecycle
onMounted(() => {
  setupKeyboardNavigation()
})

onUnmounted(() => {
  cleanupKeyboardNavigation()
})
</script>
