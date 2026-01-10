<template>
  <header class="text-center py-8">
    <!-- Main Title -->
    <div class="mb-4">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
        <Gamepad2 class="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
        Fun Games
        <Sparkles class="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
      </h1>
      <div class="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
    </div>

    <!-- Subtitle -->
    <p class="text-white/80 text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
      Main game bareng venco yuk. <br>
      Kelihatannya gampang, tapi bikin mikir </p>

    <!-- Stats Button -->
    <button
      v-if="showStats"
      @click="openLeaderboard"
      class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent"
      :aria-label="'Lihat statistik permainan'"
    >
      <BarChart3 class="w-4 h-4" />
      Statistik Games
    </button>

    <!-- Leaderboard Modal -->
    <BaseModal :is-open="isLeaderboardOpen" @close="closeLeaderboard">
      <template #title>
        <Trophy class="w-5 h-5 inline mr-2" />
        Leaderboard Games
      </template>

      <!-- Loading State -->
      <div v-if="leaderboardLoading" class="text-center py-8">
        <div class="animate-spin w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Memuat leaderboard...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="leaderboardError" class="text-center py-8">
        <AlertTriangle class="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p class="text-red-600 mb-4">{{ leaderboardError }}</p>
        <button
          @click="fetchLeaderboard"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw class="w-4 h-4" />
          Coba Lagi
        </button>
      </div>

      <!-- Leaderboard Content -->
      <div v-else-if="leaderboardData.length > 0" class="space-y-3">
        <div
          v-for="entry in leaderboardData"
          :key="entry.rank"
          class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 font-bold text-sm">
              {{ entry.rank }}
            </div>
            <span class="font-medium text-gray-900">{{ entry.playerName }}</span>
          </div>
          <div class="text-right">
            <span class="font-bold text-lg text-gray-900">{{ entry.accuracy }}%</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8">
        <Trophy class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">Belum ada data leaderboard</p>
        <p class="text-sm text-gray-400 mt-1">Mainkan game untuk mulai mengumpulkan skor!</p>
      </div>
    </BaseModal>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Gamepad2, Sparkles, BarChart3, Trophy, AlertTriangle, RotateCcw } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import { useLeaderboard } from '@/composables/useLeaderboard.js'

defineProps({
  showStats: {
    type: Boolean,
    default: false
  }
})

defineEmits(['showStats'])

const isLeaderboardOpen = ref(false)
const { leaderboard: leaderboardData, loading: leaderboardLoading, error: leaderboardError, fetchLeaderboard } = useLeaderboard()

const openLeaderboard = async () => {
  isLeaderboardOpen.value = true
  await fetchLeaderboard()
}

const closeLeaderboard = () => {
  isLeaderboardOpen.value = false
}
</script>

