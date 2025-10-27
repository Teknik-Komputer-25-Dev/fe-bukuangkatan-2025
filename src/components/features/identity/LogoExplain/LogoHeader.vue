<template>
  <div class="text-center">
    <h2 
      class="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4"
      v-motion
      :initial="motionConfig.initial"
      :enter="motionConfig.enter"
    >
      LOGO
    </h2>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Motion configuration
const motionConfig = computed(() => ({
  initial: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0, transition: { duration: 800 } }
}))
</script>