<template>
  <div class="flex justify-center space-x-2 md:space-x-3 mt-6 md:mt-8">
    <button
      v-for="(_, index) in totalItems"
      :key="index"
      @click="$emit('go-to', index)"
      class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-110"
      :class="dotClasses(index)"
      :aria-label="`Go to slide ${index + 1}`"
    />
  </div>
</template>

<script setup>

// Props
const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  }
})

// Emits
defineEmits(['go-to'])

// Methods
const dotClasses = (index) => ({
  'bg-orange-500': props.currentIndex === index,
  'bg-white bg-opacity-30 hover:bg-opacity-50': props.currentIndex !== index
})
</script>