<template>
  <div 
    :class="containerClasses"
    @click="$emit('click')"
  >
    <div :class="cardClasses">
      <div class="flex items-center space-x-3 lg:space-x-4 w-full">
        <!-- Number Badge -->
        <div class="flex-shrink-0">
          <div :class="badgeClasses">
            {{ index + 1 }}
          </div>
        </div>
        
        <!-- Title -->
        <div class="flex-1 min-w-0">
          <h3 :class="titleClasses">
            {{ characteristic.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { characteristicsConfig } from '@/data/keyCharacteristics.js'

const props = defineProps({
  characteristic: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    default: ''
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

// Computed classes
const containerClasses = computed(() => {
  const baseClasses = 'group cursor-pointer transition-all duration-300'
  const hoverScale = props.isMobile 
    ? characteristicsConfig.styling.mobileHoverScale 
    : characteristicsConfig.styling.hoverScale
  
  return `${baseClasses} ${hoverScale} ${props.position}`
})

const cardClasses = computed(() => {
  const { cardBackground, cardBlur, borderStyle } = characteristicsConfig.styling
  const { cardWidth, cardHeight } = characteristicsConfig.layout.desktop
  
  const sizeClasses = props.isMobile ? '' : `${cardWidth} ${cardHeight}`
  
  return `${cardBlur} rounded-2xl ${cardBackground} ${borderStyle} p-4 lg:p-6 ${sizeClasses} shadow-xl flex items-center`
})

const badgeClasses = computed(() => {
  const { numberBackground } = characteristicsConfig.styling
  const sizeClasses = props.isMobile 
    ? 'w-12 h-12 text-xl' 
    : 'w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg'
  
  return `${sizeClasses} ${numberBackground} rounded-full flex items-center justify-center font-bold`
})

const titleClasses = computed(() => 
  props.isMobile 
    ? 'font-semibold text-base leading-tight break-words'
    : 'font-semibold text-sm md:text-base leading-tight break-words'
)
</script>