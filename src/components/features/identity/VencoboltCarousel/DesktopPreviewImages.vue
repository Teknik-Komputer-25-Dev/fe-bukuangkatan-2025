<template>
  <!-- Desktop Preview Images -->
  <template v-if="prevImage && nextImage">
    <!-- Left Preview Image (Previous) - Hidden on mobile -->
    <div
      class="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-110 hover:opacity-80"
      @click="$emit('prevSlide')"
    >
      <div class="w-20 lg:w-24 h-32 lg:h-40 overflow-hidden rounded-r-2xl opacity-60 hover:opacity-90 shadow-2xl bg-white/10 backdrop-blur-sm">
        <img 
          :src="prevImage" 
          :alt="prevAlt" 
          class="w-full h-full object-cover object-right" 
        />
      </div>
    </div>

    <!-- Right Preview Image (Next) - Hidden on mobile -->
    <div
      class="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-110 hover:opacity-80"
      @click="$emit('nextSlide')"
    >
      <div class="w-20 lg:w-24 h-32 lg:h-40 overflow-hidden rounded-l-2xl opacity-60 hover:opacity-90 shadow-2xl bg-white/10 backdrop-blur-sm">
        <img 
          :src="nextImage" 
          :alt="nextAlt" 
          class="w-full h-full object-cover object-left" 
        />
      </div>
    </div>
  </template>
</template>

<script setup>
defineProps({
  prevImage: {
    type: String,
    required: true
  },
  nextImage: {
    type: String,
    required: true
  },
  prevAlt: {
    type: String,
    required: true
  },
  nextAlt: {
    type: String,
    required: true
  }
})

defineEmits(['prevSlide', 'nextSlide'])
</script>