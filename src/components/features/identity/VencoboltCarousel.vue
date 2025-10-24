<template>
  <section class="relative w-full min-h-screen  py-16">
    <!-- Preview Images at Screen Edges -->
    <div class="mb-8 mx-auto text-center">
      <div class="inline-flex items-center space-x-4">
        <span class="text-6xl  font-bold">
          VENCOBOLT
        </span>
      </div>
    </div>
    <!-- Left Preview Image (Previous) -->
    <div
      class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-110 hover:opacity-80"
      @click="prevSlide">
      <div
        class="w-16 md:w-20 lg:w-24 h-24 md:h-32 lg:h-40 overflow-hidden rounded-r-2xl opacity-60 hover:opacity-90 shadow-2xl bg-white/10 backdrop-blur-sm">
        <img :src="getPrevImage()" :alt="getPrevImageAlt()" class="w-full h-full object-cover object-right" />
      </div>
    </div>

    <!-- Right Preview Image (Next) -->
    <div
      class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-110 hover:opacity-80"
      @click="nextSlide">
      <div
        class="w-16 md:w-20 lg:w-24 h-24 md:h-32 lg:h-40 overflow-hidden rounded-l-2xl opacity-60 hover:opacity-90 shadow-2xl bg-white/10 backdrop-blur-sm">
        <img :src="getNextImage()" :alt="getNextImageAlt()" class="w-full h-full object-cover object-left" />
      </div>
    </div>

    <!-- Carousel Container -->
    <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      <!-- Slides Container -->
      <div ref="slidesContainer" class="flex transition-transform duration-500 ease-in-out w-full slides-container"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }" @mousedown="startDrag" @touchstart="startDrag">
        <div v-for="(slide, index) in extendedSlides" :key="`slide-${index}`"
          class="w-full flex-shrink-0 px-8 md:px-16 lg:px-24 py-8">
          <div class="max-w-6xl mx-auto text-center space-y-8">

            <!-- Top Logo/Brand -->


            <!-- Main Logo - Center Image Only -->
            <div class="mb-12">
              <div class="flex justify-center">
                <div
                  class="cursor-pointer transition-transform hover:scale-105 backdrop-blur-md bg-[#B47EDE]/20 border border-transparent rounded-2xl p-6 md:p-8 lg:p-10"
                  @click="nextSlide">
                  <img :src="slide.image" :alt="slide.imageAlt"
                    class="h-32 md:h-40 lg:h-52 xl:h-64 w-auto object-contain mx-auto transition-all duration-500" />
                </div>
              </div>
            </div>

            <!-- Slide Title with Transition -->
            <div class="mb-8">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-500"
                :class="isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'">
                {{ slide.title }}
              </h2>
              <!-- Orange underline -->
              <div class="w-32 h-1 bg-orange-500 mx-auto rounded-full transition-all duration-500"
                :class="isTransitioning ? 'opacity-0 transform scale-x-0' : 'opacity-100 transform scale-x-100'"></div>
            </div>

            <!-- Description with Transition -->
            <div class="transition-all duration-500 space-y-8"
              :class="isTransitioning ? 'opacity-0 transform translate-y-6' : 'opacity-100 transform translate-y-0'">
              <p class="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto opacity-90">
                {{ slide.description }}
              </p>

              <!-- Additional Description (if exists) -->
              <p v-if="slide.additionalDescription"
                class="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto opacity-80">
                {{ slide.additionalDescription }}
              </p>

              <!-- Tags/Badges (only for first slide) - Horizontal Row -->
              <div v-if="getCurrentSlideIndex() === 0 && slide.tags && slide.tags.length > 0"
                class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                <div v-for="tag in slide.tags" :key="tag"
                  class="backdrop-blur-md bg-[#B47EDE]/10 border border-transparent rounded-2xl px-4 py-3 min-w-[200px]">
                  <div class="text-left">
                    <h3 class="inline-block border bg-purple-400 border-purple-400 mb-3 rounded-full px-3 py-1 font-semibold text-base sm:text-lg">{{ tag }}</h3>
                  </div>
                  <p class="text-xs sm:text-sm opacity-90 leading-tight text-center">{{ getTagDescription(tag) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide Indicators -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
          class="w-4 h-4 rounded-full transition-all duration-300"
          :class="getCurrentSlideIndex() === index ? 'bg-orange-500' : 'bg-white bg-opacity-30'"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Slide data
const slides = ref([
  {
    title: "Venti Cinco (ven·ti sin·ko)",
    description: "Berasal dari bahasa spanyol Veinticinco, yang artinya 25 yang menandakan kita angkatan 25",
    additionalDescription: "Venco sendiri juga memiliki arti Visionary Engineers in Networking & Computers",
    tags: ["Visionary Engineers", "Networking", "Computing"],
    image: "/images/vencobolt/venco-state.png",
    imageAlt: "VENCOBOLT Full State"
  },
  {
    title: "Bytes Optimized for Learning & Teamwork",
    description: "Bytes melambangkan individu angkatan ‘25 yang dibentuk (Optimized) untuk berkembang (Learning) bersama (Teamwork)",
    additionalDescription: null,
    tags: null,
    image: "/images/vencobolt/bolt-state.png",
    imageAlt: "VENCOBOLT Venco State"
  },
  {
    title: "United By Code, Solid By Bolt",
    description: "Merupakan jargon dari angkatan 25 yang berarti kita dieratkan oleh code, dan dikuatkan oleh baut.",
    additionalDescription: null,
    tags: null,
    image: "/images/vencobolt/mur-baut.png",
    imageAlt: "VENCOBOLT murbaut State"
  }
])

// Infinite carousel setup - duplicate slides for seamless looping
const extendedSlides = ref([])
const realSlideCount = slides.value.length
const duplicateCount = 1 // Number of slides to duplicate on each end

// Initialize extended slides array
const initializeExtendedSlides = () => {
  extendedSlides.value = [
    ...slides.value.slice(-duplicateCount), // Last slide(s) at the beginning
    ...slides.value, // Original slides
    ...slides.value.slice(0, duplicateCount) // First slide(s) at the end
  ]
}

const currentSlide = ref(duplicateCount) // Start at first real slide
const isTransitioning = ref(false)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const slidesContainer = ref(null)

// Get tag descriptions
const getTagDescription = (tag) => {
  const descriptions = {
    "Visionary Engineers": "Visionary Engineers melambangkan mahasiswa Teknik Komputer angkatan '25 yang memiliki keinginan untuk berwawasan yang maju ke depan.",
    "Networking": "berhubungan dengan dunia jaringan komputer dan relasi sosial (kebersamaan).",
    "Computing": "merupakan inti bidang Teknik Komputer."
  }
  return descriptions[tag] || ""
}

// Helper function to get current slide index for indicators
const getCurrentSlideIndex = () => {
  const index = currentSlide.value - duplicateCount
  if (index < 0) return realSlideCount - 1
  if (index >= realSlideCount) return 0
  return index
}

// Helper: Get previous image for preview
const getPrevImage = () => {
  const currentIndex = getCurrentSlideIndex()
  const prevIndex = currentIndex === 0 ? realSlideCount - 1 : currentIndex - 1
  return slides.value[prevIndex]?.image || ''
}

const getPrevImageAlt = () => {
  const currentIndex = getCurrentSlideIndex()
  const prevIndex = currentIndex === 0 ? realSlideCount - 1 : currentIndex - 1
  return slides.value[prevIndex]?.imageAlt || ''
}

// Helper: Get next image for preview
const getNextImage = () => {
  const currentIndex = getCurrentSlideIndex()
  const nextIndex = (currentIndex + 1) % realSlideCount
  return slides.value[nextIndex]?.image || ''
}

const getNextImageAlt = () => {
  const currentIndex = getCurrentSlideIndex()
  const nextIndex = (currentIndex + 1) % realSlideCount
  return slides.value[nextIndex]?.imageAlt || ''
}

// Navigation functions
const nextSlide = () => {
  if (isDragging.value || isTransitioning.value) return

  isTransitioning.value = true

  // Wait for description to fade out, then change slide
  setTimeout(() => {
    currentSlide.value++

    // If we've moved past the last real slide, jump to the first real slide
    setTimeout(() => {
      if (currentSlide.value >= realSlideCount + duplicateCount) {
        isTransitioning.value = false
        // Temporarily disable transition for seamless jump
        if (slidesContainer.value) {
          slidesContainer.value.style.transition = 'none'
          currentSlide.value = duplicateCount
          // Re-enable transition after jump
          setTimeout(() => {
            slidesContainer.value.style.transition = 'transform 500ms ease-in-out'
          }, 50)
        }
      } else {
        isTransitioning.value = false
      }
    }, 200)
  }, 300) // Wait 300ms for description to fade out
}

const prevSlide = () => {
  if (isDragging.value || isTransitioning.value) return

  isTransitioning.value = true

  // Wait for description to fade out, then change slide
  setTimeout(() => {
    currentSlide.value--

    // If we've moved before the first real slide, jump to the last real slide
    setTimeout(() => {
      if (currentSlide.value < duplicateCount) {
        isTransitioning.value = false
        // Temporarily disable transition for seamless jump
        if (slidesContainer.value) {
          slidesContainer.value.style.transition = 'none'
          currentSlide.value = realSlideCount + duplicateCount - 1
          // Re-enable transition after jump
          setTimeout(() => {
            slidesContainer.value.style.transition = 'transform 500ms ease-in-out'
          }, 50)
        }
      } else {
        isTransitioning.value = false
      }
    }, 200)
  }, 300) // Wait 300ms for description to fade out
}

const goToSlide = (index) => {
  if (isDragging.value || isTransitioning.value) return

  isTransitioning.value = true

  // Wait for description to fade out, then change slide
  setTimeout(() => {
    currentSlide.value = index + duplicateCount

    // Description fades back in after slide change
    setTimeout(() => {
      isTransitioning.value = false
    }, 200)
  }, 300) // Wait 300ms for description to fade out
}

// Drag handlers
const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', endDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  currentX.value = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX.value
}

const endDrag = () => {
  if (!isDragging.value) return
  isDragging.value = false

  // Threshold for slide change (50px)
  if (currentX.value > 50) {
    prevSlide()
  } else if (currentX.value < -50) {
    nextSlide()
  }

  currentX.value = 0
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

// Lifecycle
onMounted(() => {
  initializeExtendedSlides()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
})
</script>

<style scoped>
/* Custom font */
* {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Prevent text selection during drag */
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>