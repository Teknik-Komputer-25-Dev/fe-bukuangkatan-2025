<template>
  <button 
    class="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-all duration-300"
    @click="$emit('click')"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        :d="iconPath"
      ></path>
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    required: true,
    validator: (value) => ['prev', 'next'].includes(value)
  }
})

defineEmits(['click'])

const iconPath = computed(() => 
  props.direction === 'prev' 
    ? 'M15 19l-7-7 7-7' 
    : 'M9 5l7 7-7 7'
)
</script>