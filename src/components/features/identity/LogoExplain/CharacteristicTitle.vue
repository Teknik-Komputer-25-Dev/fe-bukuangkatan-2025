<template>
  <div class="mb-4 md:mb-6">
    <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
      {{ title }}
    </h2>
    <!-- Orange underline -->
    <div class="w-24 md:w-32 h-1 bg-orange-500 mx-auto rounded-full mt-3 md:mt-4"></div>
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