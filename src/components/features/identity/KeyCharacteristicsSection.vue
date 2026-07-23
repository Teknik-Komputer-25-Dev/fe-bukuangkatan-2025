<template>
  <section class="relative w-full min-h-screen bg-gradient-to-br pb-16 overflow-hidden">
    <!-- Background Elements -->
    <BackgroundDecorations />

    <!-- Main Container -->
    <div class="relative z-10 w-full min-h-screen flex items-center justify-center py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        
        <!-- Section Title -->
        <SectionTitle title="KEY CHARACTERISTICS:" />

        <!-- Desktop & Tablet Layout -->
        <DesktopLayout 
          v-if="!isMobile"
          :characteristics="characteristics"
          @select-characteristic="showCharacteristicDetails"
        />

        <!-- Mobile Layout -->
        <MobileLayout 
          v-else
          :characteristics="characteristics"
          @select-characteristic="showCharacteristicDetails"
        />

      </div>
    </div>

    <!-- Characteristic Modal -->
    <CharacteristicModal 
      :characteristic="selectedCharacteristic"
      :is-visible="selectedCharacteristic !== null"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useResponsive } from '@/composables/useResponsive.js'
import BackgroundDecorations from './KeyCharacteristics/BackgroundDecorations.vue'
import SectionTitle from './KeyCharacteristics/SectionTitle.vue'
import DesktopLayout from './KeyCharacteristics/DesktopLayout.vue'
import MobileLayout from './KeyCharacteristics/MobileLayout.vue'
import CharacteristicModal from './KeyCharacteristics/CharacteristicModal.vue'
import { keyCharacteristicsData } from '@/data/keyCharacteristics.js'

const { isMobile } = useResponsive()

const characteristics = ref(keyCharacteristicsData)

const selectedCharacteristicIndex = ref(null)

const selectedCharacteristic = computed(() => 
  selectedCharacteristicIndex.value !== null 
    ? characteristics.value[selectedCharacteristicIndex.value]
    : null
)

const showCharacteristicDetails = (index) => {
  selectedCharacteristicIndex.value = index

  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedCharacteristicIndex.value = null

  document.body.style.overflow = 'unset'
}

onUnmounted(() => {
  if (selectedCharacteristicIndex.value !== null) {
    document.body.style.overflow = 'unset'
  }
})
</script>
