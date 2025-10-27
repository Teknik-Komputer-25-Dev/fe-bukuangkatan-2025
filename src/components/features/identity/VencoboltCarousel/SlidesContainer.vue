<template>
  <div 
    ref="slidesContainer" 
    class="flex transition-transform duration-500 ease-in-out w-full slides-container"
    :style="{ transform: `translateX(-${currentSlide * 100}%)` }" 
    @mousedown="$emit('startDrag', $event)" 
    @touchstart="$emit('startDrag', $event)"
  >
    <CarouselSlide
      v-for="(slide, index) in extendedSlides" 
      :key="`slide-${index}`"
      :slide="slide"
      :is-transitioning="isTransitioning"
      :current-slide-index="currentSlideIndex"
      :slide-index="index"
      :get-tag-description="getTagDescription"
      @next-slide="$emit('nextSlide')"
    />
  </div>
</template>

<script setup>
import CarouselSlide from './CarouselSlide.vue'

defineProps({
  extendedSlides: {
    type: Array,
    required: true
  },
  currentSlide: {
    type: Number,
    required: true
  },
  isTransitioning: {
    type: Boolean,
    required: true
  },
  currentSlideIndex: {
    type: Number,
    required: true
  },
  getTagDescription: {
    type: Function,
    required: true
  }
})

defineEmits(['startDrag', 'nextSlide'])
</script>