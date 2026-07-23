<template>
  <div class="mb-8 lg:mb-12">
    <div class="flex justify-center">
      <div
        class="cursor-pointer transition-transform hover:scale-105 backdrop-blur-md bg-[#B47EDE]/20 border border-transparent rounded-2xl p-4 md:p-6 lg:p-8 xl:p-10"
        @click="$emit('click')"
      >
        <img 
          :src="image" 
          :alt="alt"
          class="h-24 md:h-32 lg:h-40 xl:h-52 w-auto object-contain mx-auto transition-all duration-500" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>