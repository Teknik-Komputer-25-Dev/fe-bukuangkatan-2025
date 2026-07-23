<template>
  <div 
    :class="positionClasses"
    class="absolute top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110"
    :style="{ pointerEvents: disabled ? 'none' : 'auto' }"
    @click="handleClick"
  >
    <div 
      class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 transition-opacity duration-300"
      :class="{ 'opacity-50': disabled }"
    >
      <svg 
        class="w-5 h-5 md:w-6 md:h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          :d="iconPath"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  direction: {
    type: String,
    required: true,
    validator: (value) => ['left', 'right'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['click'])

// Computed properties
const positionClasses = computed(() => ({
  'left-2 md:left-8': props.direction === 'left',
  'right-2 md:right-8': props.direction === 'right'
}))

const iconPath = computed(() => 
  props.direction === 'left' 
    ? 'M15 19l-7-7 7-7' 
    : 'M9 5l7 7-7 7'
)

// Methods
const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>