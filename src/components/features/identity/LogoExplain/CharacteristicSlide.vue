<template>
  <div class="w-full flex-shrink-0 px-4 md:px-16 lg:px-24">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Main Content Card -->
      <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl">
        <!-- Title Section -->
        <CharacteristicTitle 
          :title="characteristic.title"
        />

        <!-- Image Section -->
        <CharacteristicImage 
          :image="characteristic.image"
          :alt="characteristic.imageAlt"
        />

        <!-- Description Section -->
        <CharacteristicDescription 
          :description="characteristic.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CharacteristicTitle from './CharacteristicTitle.vue'
import CharacteristicImage from './CharacteristicImage.vue'
import CharacteristicDescription from './CharacteristicDescription.vue'

// Props
defineProps({
  characteristic: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && 
             typeof value.title === 'string' && 
             typeof value.description === 'string' && 
             typeof value.image === 'string' && 
             typeof value.imageAlt === 'string'
    }
  }
})
</script>