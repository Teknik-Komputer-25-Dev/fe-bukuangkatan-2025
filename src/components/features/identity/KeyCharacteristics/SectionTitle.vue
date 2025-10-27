<template>
  <div class="text-center mb-12 md:mb-16 lg:mb-20">
    <span class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 block">
      {{ title }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>