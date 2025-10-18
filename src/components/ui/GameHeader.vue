<template>
  <div class="text-center relative">
    <!-- Fun Games Title with glow effect -->
    <h1 class="text-5xl font-extrabold uppercase tracking-wider drop-shadow-lg mb-2 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent animate-bounce">
      Fun Games
    </h1>
    
    <!-- Description text -->
    <p class="text-center text-white/90 text-sm drop-shadow mb-6 animate-pulse">
      Hai Teman-teman! Yuk main games seru bareng kita! 🎮✨
    </p>
    
    <!-- Stats Button -->
    <button 
      v-if="showStats" 
      @click="$emit('showStats')"
      class="inline-flex items-center gap-1 bg-white/20 backdrop-blur text-white px-3 py-2 rounded-full font-medium transition-all duration-200 border-0 cursor-pointer hover:bg-white/30"
    >
      📊 Stats Games
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameHeader',
  props: {
    showStats: {
      type: Boolean,
      default: false
    }
  },
  emits: ['showStats']
}
</script>

