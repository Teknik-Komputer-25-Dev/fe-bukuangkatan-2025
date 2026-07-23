<template>
  <div class="block md:hidden">
    <!-- Central VENCOBOLT Logo -->
    <CentralLogo is-mobile />

    <!-- Characteristics Grid -->
    <div class="space-y-6">
      <CharacteristicCard
        v-for="(characteristic, index) in characteristics"
        :key="characteristic.id"
        :characteristic="characteristic"
        :index="index"
        is-mobile
        @click="$emit('selectCharacteristic', index)"
      />
    </div>
  </div>
</template>

<script setup>
import CentralLogo from './CentralLogo.vue'
import CharacteristicCard from './CharacteristicCard.vue'

defineProps({
  characteristics: {
    type: Array,
    required: true
  }
})

defineEmits(['selectCharacteristic'])
</script>