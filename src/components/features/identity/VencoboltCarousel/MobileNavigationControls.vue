<template>
  <div class="md:hidden absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between z-30">
    <NavigationButton 
      direction="prev"
      @click="$emit('prevSlide')"
    />
    <NavigationButton 
      direction="next"
      @click="$emit('nextSlide')"
    />
  </div>
</template>

<script setup>
import NavigationButton from './NavigationButton.vue'

defineEmits(['prevSlide', 'nextSlide'])
</script>