<template>
  <div class="w-full flex-shrink-0 px-4 md:px-8 lg:px-16 xl:px-24 py-8">
    <div class="max-w-6xl mx-auto text-center space-y-6 lg:space-y-8">

      <!-- Main Logo -->
      <SlideImage 
        :image="slide.image"
        :alt="slide.imageAlt"
        @click="$emit('nextSlide')"
      />

      <!-- Slide Content -->
      <SlideContent 
        :title="slide.title"
        :description="slide.description"
        :additional-description="slide.additionalDescription"
        :is-transitioning="isTransitioning"
      />

      <!-- Tags (only for first slide) -->
      <SlideTags
        v-if="shouldShowTags"
        :tags="slide.tags"
        :get-tag-description="getTagDescription"
      />

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SlideImage from './SlideImage.vue'
import SlideContent from './SlideContent.vue'
import SlideTags from './SlideTags.vue'

const props = defineProps({
  slide: {
    type: Object,
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
  slideIndex: {
    type: Number,
    required: true
  },
  getTagDescription: {
    type: Function,
    required: true
  }
})

defineEmits(['nextSlide'])

// Show tags only for the first slide
const shouldShowTags = computed(() => 
  props.currentSlideIndex === 0 && 
  props.slide.tags && 
  props.slide.tags.length > 0
)
</script>