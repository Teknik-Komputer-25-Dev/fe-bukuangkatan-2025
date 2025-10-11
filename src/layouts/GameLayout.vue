<template>
  <div class="min-h-screen game-layout"
       style="background: linear-gradient(135deg, #FFFADD 0%, #B47EDE 25%, #311432 50%, #EE7A13 75%, #C21807 100%);">
    
    <!-- Game Header -->
    <header class="relative z-40 pt-8 pb-4">
      <div class="max-w-lg mx-auto px-4">
        <!-- Home Button -->
        <div class="flex justify-between items-center mb-6">
          <RouterLink 
            to="/"
            class="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <span>🏠</span>
            <span>Home</span>
          </RouterLink>
          
          <!-- Game Title -->
          <h1 class="text-2xl font-bold text-white drop-shadow-lg">
            🎮 Games Zone
          </h1>
          
          <!-- Game Stats Button -->
          <button 
            @click="toggleStats"
            class="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full font-medium hover:bg-white/30 transition-all duration-200"
          >
            <span>📊</span>
          </button>
        </div>
        
        <!-- Game Description -->
        <p class="text-center text-white/90 text-sm drop-shadow">
          Uji pengetahuan kamu tentang teman-teman angkatan!
        </p>
      </div>
    </header>

    <!-- Game Content -->
    <main class="px-4 pb-8">
      <div class="max-w-lg mx-auto space-y-6">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-40 py-6">
      <div class="max-w-lg mx-auto px-4 text-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p class="text-white/80 text-sm">
            Made with ❤️ for Angkatan 2025
          </p>
          <p class="text-white/60 text-xs mt-1">
            Teknik Komputer - Universitas Diponegoro
          </p>
        </div>
      </div>
    </footer>

    <!-- Floating Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 shadow-lg floating-btn"
    >
      ⬆️
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const showBackToTop = ref(false)
const showStats = ref(false)

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll for back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Toggle stats (for future implementation)
const toggleStats = () => {
  showStats.value = !showStats.value
  // TODO: Implement stats modal or panel
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Custom scrollbar untuk game layout */
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

/* Smooth fade-in animation for layout */
.game-layout {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating button pulse animation */
.floating-btn:hover {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>