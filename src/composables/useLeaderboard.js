import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'

export function useLeaderboard() {
  const leaderboard = ref([])
  const loading = ref(false)
  const error = ref(null)


  const fetchLeaderboard = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('game_attempts')
        .select('player_name, accuracy')
        .order('created_at', { ascending: false })
        .limit(1000)

      if (supabaseError) throw supabaseError

      const playerBestAccuracy = new Map()

      data.forEach(attempt => {
        const current = playerBestAccuracy.get(attempt.player_name) || 0
        if (attempt.accuracy > current) {
          playerBestAccuracy.set(attempt.player_name, attempt.accuracy)
        }
      })

      const sortedLeaderboard = Array.from(playerBestAccuracy.entries())
        .map(([playerName, accuracy]) => ({
          playerName: maskPlayerName(playerName),
          accuracy: Math.round(accuracy)
        }))
        .sort((a, b) => b.accuracy - a.accuracy)
        .slice(0, 10)
        .map((entry, index) => ({
          rank: index + 1,
          ...entry
        }))

      leaderboard.value = sortedLeaderboard
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      error.value = err.message || 'Failed to load leaderboard'
      leaderboard.value = []
    } finally {
      loading.value = false
    }
  }

  const maskPlayerName = (name) => {
    if (!name || name.length <= 3) return name
    const visiblePart = name.slice(0, -4)
    const maskedPart = '*'.repeat(4)
    return `${visiblePart}${maskedPart}`
  }

  return {
    leaderboard: computed(() => leaderboard.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchLeaderboard
  }
}