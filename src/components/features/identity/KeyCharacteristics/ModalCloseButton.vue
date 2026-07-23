<template>
  <button 
    class="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition-colors duration-300 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Tutup'
  }
})

defineEmits(['click'])
</script>