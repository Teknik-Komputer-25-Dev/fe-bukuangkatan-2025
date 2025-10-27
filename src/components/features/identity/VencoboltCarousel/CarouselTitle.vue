<template>
  <div class="mb-8 lg:mb-12 mx-auto text-center px-4">
    <div class="inline-flex items-center space-x-4">
      <span class="text-4xl md:text-5xl lg:text-6xl font-bold">
        {{ title }}
      </span>
    </div>
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