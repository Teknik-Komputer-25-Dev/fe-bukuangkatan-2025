<template>
  <!-- Left Navigation Arrow -->
  <NavigationArrow
    direction="left"
    :disabled="disabled"
    @click="$emit('prev')"
  />

  <!-- Right Navigation Arrow -->
  <NavigationArrow
    direction="right"
    :disabled="disabled"
    @click="$emit('next')"
  />
</template>

<script setup>
import NavigationArrow from './NavigationArrow.vue'

// Props
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['prev', 'next'])
</script>