<template>
  <div class="hidden md:block">
    <div class="relative flex items-center justify-center min-h-[600px] lg:min-h-[600px]">
      
      <!-- Central VENCOBOLT Logo -->
      <CentralLogo />

      <!-- Positioned Characteristic Cards -->
      <CharacteristicCard
        v-for="(characteristic, index) in characteristics"
        :key="characteristic.id"
        :characteristic="characteristic"
        :index="index"
        :position="getCardPosition(characteristic.position)"
        @click="$emit('selectCharacteristic', index)"
      />

      <!-- Connection Lines -->
      <ConnectionLines />
      
    </div>
  </div>
</template>

<script setup>
import CentralLogo from './CentralLogo.vue'
import CharacteristicCard from './CharacteristicCard.vue'
import ConnectionLines from './ConnectionLines.vue'

defineProps({
  characteristics: {
    type: Array,
    required: true
  }
})

defineEmits(['selectCharacteristic'])

// Position mapping for desktop layout
const getCardPosition = (position) => {
  const positions = {
    'top-left': 'absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
    'top-right': 'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2'
  }
  
  return positions[position] || ''
}
</script>