<template>
  <div 
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 lg:p-8"
    @click="$emit('close')"
  >
    <div 
      class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-lg lg:max-w-2xl w-full shadow-2xl"
      @click.stop
    >
      <div class="text-center">
        <!-- Modal Title -->
        <h2 class="text-2xl lg:text-3xl font-bold mb-4">
          {{ characteristic?.title || '' }}
        </h2>
        
        <!-- Modal Description -->
        <p class="text-base lg:text-lg leading-relaxed opacity-90 mb-6">
          {{ characteristic?.description || '' }}
        </p>
        
        <!-- Close Button -->
        <ModalCloseButton @click="$emit('close')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from './ModalCloseButton.vue'

defineProps({
  characteristic: {
    type: Object,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>