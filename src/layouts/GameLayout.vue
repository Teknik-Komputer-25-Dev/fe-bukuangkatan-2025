<template>
  <div class="min-h-screen relative bg-cover bg-center bg-no-repeat animate-fadeIn" style="background-image: url('/images/Ellipse 15.png')">
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-black/10 pointer-events-none"></div>
    
    <!-- Animated pattern overlay -->
    <div class="absolute inset-0 opacity-30 pointer-events-none animate-subtleFloat"></div>

    <!-- Navigation Bar -->
    <nav class="relative z-40 pt-8 pb-4">
      <div class="max-w-lg mx-auto px-4">
        <!-- Home Button -->
        <div class="flex justify-between items-center mb-6">
          <RouterLink to="/"
            class="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-lg">
            <HomeIcon class="w-5 h-5" />
            <span>Home</span>
          </RouterLink>

          <button @click="toggleStats"
            class="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full font-medium hover:bg-white/30 transition-all duration-200">
            <ChartColumn class="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Game Header Component -->
    <GameHeader :showStats="showStats" @showStats="toggleStats" />

    <!-- Floating Icons Component -->
    <FloatingIcons />

    <!-- Game Content -->
    <main class="px-4 pb-8">
      <div class="max-w-lg mx-auto space-y-6">
        <slot />
      </div>
    </main>

    <!-- Game Footer Component -->
    <GameFooter />

    <!-- Back to Top Button Component -->
    <BackToTopButton />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import GameHeader from '@/components/ui/GameHeader.vue'
import FloatingIcons from '@/components/ui/FloatingIcons.vue'
import BackToTopButton from '@/components/ui/BackToTopButton.vue'
import GameFooter from '@/components/ui/GameFooter.vue'
import { HomeIcon } from 'lucide-vue-next'
import { ChartColumn } from 'lucide-vue-next'

const showStats = ref(false)

// Toggle stats (for future implementation)
const toggleStats = () => {
  showStats.value = !showStats.value
  // TODO: Implement stats modal or panel
}
</script>

<style scoped>
/* Custom scrollbar untuk game layout - cannot be replaced with Tailwind */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>