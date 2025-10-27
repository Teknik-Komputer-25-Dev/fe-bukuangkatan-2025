<template>
  <button 
    class="w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 hover:scale-110"
    :class="buttonClasses"
    @click="$emit('click')"
  >
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => 
  props.isActive 
    ? 'bg-orange-500 shadow-lg' 
    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
)
</script>