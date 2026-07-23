<template>
  <div class="space-y-4 md:space-y-6">
    <p class="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: true
  }
})
</script>