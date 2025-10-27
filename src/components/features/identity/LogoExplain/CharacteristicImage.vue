<template>
  <div class="mb-6 md:mb-8">
    <div class="flex justify-center">
      <img 
        :src="image" 
        :alt="alt" 
        class="h-32 md:h-40 lg:h-48 xl:h-56 w-auto object-contain transition-all duration-500 hover:scale-105"
        loading="lazy"
        @error="handleImageError"
      />
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

const handleImageError = (event) => {
  console.warn(`Failed to load image: ${event.target.src}`)
  // event.target.src = '/images/default-logo.png'
}
</script>