<template>
  <div :class="logoClasses">
    <img 
      :src="logoSrc" 
      :alt="logoAlt" 
      :class="imageClasses"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { characteristicsConfig } from '@/data/keyCharacteristics.js'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

// Computed classes and properties
const logoClasses = computed(() => 
  props.isMobile 
    ? 'text-center mb-8'
    : 'relative z-10'
)

const imageClasses = computed(() => 
  props.isMobile
    ? `${characteristicsConfig.layout.mobile.logoHeight} w-auto object-contain mx-auto`
    : `${characteristicsConfig.layout.desktop.logoHeight} w-auto object-contain`
)

const logoSrc = characteristicsConfig.centerLogo.src
const logoAlt = characteristicsConfig.centerLogo.alt
</script>