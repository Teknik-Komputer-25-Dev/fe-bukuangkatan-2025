import { ref } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'

const shuffle = (array) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const mapQuestion = (record) => ({
  id: record.id,
  gameType: record.game_type ?? record.gameType ?? '',
  question: record.question_text ?? record.prompt ?? '',
  answer: record.answer_text ?? '',
  hint: record.hint ?? '',
  explanation: record.explanation ?? '',
  metadata: record.metadata ?? null,
  options: record.options ?? null,
  imageUrl: record.image_url ?? record.imageUrl ?? null,
})

const mapAttempt = (record) => ({
  id: record.id,
  gameType: record.game_type ?? record.gameType ?? '',
  score: record.score ?? 0,
  totalQuestions: record.total_questions ?? record.totalQuestions ?? 0,
  accuracy: record.accuracy ?? 0,
  sessionId: record.session_id ?? record.sessionId ?? null,
  createdAt: record.created_at ?? record.createdAt ?? null,
})

export function useGame() {
  const questions = ref([])
  const leaderboard = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchQuestions = async (gameType) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('game_questions')
        .select('*')
        .eq('game_type', gameType)

      if (supabaseError) throw supabaseError
      const mapped = (data || []).map(mapQuestion)
      questions.value = shuffle(mapped)
      return questions.value
    } catch (err) {
      console.error('Error fetching game questions:', err)
      error.value = err.message || 'Failed to load questions'
      questions.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  const submitScore = async (gameType, score, totalQuestions, sessionId) => {
    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
    const payload = {
      game_type: gameType,
      score,
      total_questions: totalQuestions,
      accuracy,
      session_id: sessionId,
    }

    const { error: supabaseError } = await supabase.from('game_attempts').insert(payload)
    if (supabaseError) {
      console.error('Error submitting score:', supabaseError)
      throw supabaseError
    }

    return { ...payload, accuracy }
  }

  const fetchLeaderboard = async (limit = 10) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('game_attempts')
        .select('*')
        .order('accuracy', { ascending: false })
        .order('score', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit)

      if (supabaseError) throw supabaseError
      leaderboard.value = (data || []).map(mapAttempt)
      return leaderboard.value
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      error.value = err.message || 'Failed to load leaderboard'
      leaderboard.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    questions,
    leaderboard,
    loading,
    error,
    fetchQuestions,
    submitScore,
    fetchLeaderboard,
  }
}
