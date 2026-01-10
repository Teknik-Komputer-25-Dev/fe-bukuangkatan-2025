<template>
  <RouterLink
    :to="to"
    class="px-3 md:px-4 py-3 md:py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-all duration-200 flex items-center gap-1 md:gap-2 relative focus:outline-none focus:ring-2 focus:ring-[#FFE787]/50 focus:ring-offset-2 focus:ring-offset-transparent group"
    :class="linkClasses"
  >
    <!-- Desktop: Show text -->
    <span class="hidden md:inline">{{ label }}</span>
    
    <!-- Mobile: Show icon -->
    <component 
      v-if="icon"
      :is="icon" 
      class="md:hidden w-6 h-6" 
    />
    
    <!-- Active indicator for desktop -->
    <span 
      v-if="isActive"
      class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-[#FFE787] rounded-full animate-slideIn hidden md:block"
    ></span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: [String, Object],
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const linkClasses = computed(() => [

  props.isActive 
    ? 'bg-white/20 text-[#FFE787]' 
    : 'text-white hover:bg-white/20 hover:text-[#FFE787] hover:-translate-y-0.5',
  

  props.to === '/' ? 'font-semibold' : 'font-medium'
])
</script>

<style scoped>
/* Custom animations that Tailwind doesn't provide */
@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 1.25rem;
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}

/* Mobile specific adjustments for very small screens */
@media (max-width: 640px) {
  .RouterLink {
    min-width: 3.5rem;
    min-height: 3.5rem;
    justify-content: center;
  }
}
</style>