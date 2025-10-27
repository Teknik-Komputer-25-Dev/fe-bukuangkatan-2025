<template>
  <div class="backdrop-blur-md bg-[#B47EDE]/10 border border-transparent rounded-2xl px-4 py-3 w-full md:min-w-[200px] md:w-auto">
    <div class="text-left">
      <h3 class="inline-block border bg-purple-400 border-purple-400 mb-3 rounded-full px-3 py-1 font-semibold text-sm md:text-base lg:text-lg">
        {{ tag }}
      </h3>
    </div>
    <p class="text-xs md:text-sm opacity-90 leading-tight text-center text-gray-200">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>