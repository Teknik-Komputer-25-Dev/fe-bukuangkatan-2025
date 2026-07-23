<template>
  <div class="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
    <IndicatorButton
      v-for="(slide, index) in slides" 
      :key="index"
      :is-active="currentSlideIndex === index"
      @click="$emit('goToSlide', index)"
    />
  </div>
</template>

<script setup>
import IndicatorButton from './IndicatorButton.vue'

defineProps({
  slides: {
    type: Array,
    required: true
  },
  currentSlideIndex: {
    type: Number,
    required: true
  }
})

defineEmits(['goToSlide'])
</script>