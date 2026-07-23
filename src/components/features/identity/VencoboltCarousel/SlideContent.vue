<template>
  <div>
    <!-- Slide Title with Transition -->
    <div class="mb-6 lg:mb-8">
      <h2 
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 transition-all duration-500"
        :class="titleClasses"
      >
        {{ title }}
      </h2>
      <!-- Orange underline -->
      <div 
        class="w-24 md:w-32 h-1 bg-orange-500 mx-auto rounded-full transition-all duration-500"
        :class="underlineClasses"
      ></div>
    </div>

    <!-- Description with Transition -->
    <div 
      class="transition-all duration-500 space-y-6 lg:space-y-8"
      :class="contentClasses"
    >
      <p class="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-4xl mx-auto opacity-90 text-gray-200">
        {{ description }}
      </p>

      <!-- Additional Description (if exists) -->
      <p 
        v-if="additionalDescription"
        class="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-3xl mx-auto opacity-80 text-gray-300"
      >
        {{ additionalDescription }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  additionalDescription: {
    type: String,
    default: null
  },
  isTransitioning: {
    type: Boolean,
    required: true
  }
})

// Computed classes for transitions
const titleClasses = computed(() => 
  props.isTransitioning 
    ? 'opacity-0 transform translate-y-4' 
    : 'opacity-100 transform translate-y-0'
)

const underlineClasses = computed(() => 
  props.isTransitioning 
    ? 'opacity-0 transform scale-x-0' 
    : 'opacity-100 transform scale-x-100'
)

const contentClasses = computed(() => 
  props.isTransitioning 
    ? 'opacity-0 transform translate-y-6' 
    : 'opacity-100 transform translate-y-0'
)
</script>