<template>
  <div class="bg-white p-4 md:p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
    <h2 class="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">🔤 Kata Acak!</h2>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600">Memuat soal...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-500 text-4xl mb-4">⚠️</div>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="loadWordsData"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Coba Lagi
      </button>
    </div>

    <template v-else>
      <!-- Word Display -->
      <div class="text-center mb-4 md:mb-6">
        <div 
          class="bg-gradient-to-r from-orange-100 to-red-100 p-4 md:p-6 rounded-xl border-2 border-dashed border-orange-300 transition-all duration-300 hover:shadow-lg"
          :class="showResult ? (isCorrect ? 'ring-4 ring-green-400 border-green-400' : 'ring-4 ring-red-400 border-red-400') : ''"
        >
          <p class="text-sm text-gray-600 mb-2">Susun kata ini:</p>
          <div class="min-h-[60px] md:min-h-[80px] flex items-center justify-center">
            <p 
              class="text-lg md:text-2xl lg:text-3xl font-bold text-orange-600 tracking-widest transition-all duration-500 break-all text-center leading-tight"
              :class="showResult ? (isCorrect ? 'text-green-600 scale-110' : 'text-red-600') : ''"
            >
              {{ currentWord?.question || '...' }}
            </p>
          </div>
          
          <!-- Result overlay -->
          <div v-if="showResult" class="mt-4 flex items-center justify-center">
            <div 
              class="text-4xl animate-bounce"
              :class="isCorrect ? 'text-green-500' : 'text-red-500'"
            >
              {{ isCorrect ? '✅' : '❌' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Hint Section -->
      <div v-if="currentWord?.hint && showHint" class="mb-4 md:mb-6">
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="text-blue-400 text-xl">💡</span>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-blue-800">Petunjuk:</p>
              <p class="text-sm text-blue-700 mt-1 leading-relaxed">{{ currentWord.hint }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Hint Button -->
      <div v-if="currentWord?.hint && !showHint && !showResult" class="text-center mb-4">
        <button
          @click="showHint = true"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
        >
          🔍 Lihat Petunjuk
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="checkAnswer" class="space-y-4">
        <!-- Answer Input -->
        <div>
          <label for="answer" class="block text-sm font-medium text-gray-700 mb-2">
            Jawaban Kamu
          </label>
          <input
            id="answer"
            v-model="userAnswer"
            type="text"
            class="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-center text-base md:text-lg font-semibold"
            placeholder="Ketik jawaban di sini..."
            :disabled="showResult"
          />
        </div>

        <!-- Submit Button -->
        <button
          v-if="!showResult"
          type="submit"
          class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          :disabled="!userAnswer.trim()"
        >
          Submit Jawaban
        </button>
      </form>

      <!-- Result Display -->
      <div v-if="showResult" class="mt-6 text-center">
        <div 
          class="p-4 rounded-lg mb-4 transition-all duration-500"
          :class="isCorrect 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'"
        >
          <div class="flex items-center justify-center space-x-2">
            <span class="text-2xl">{{ isCorrect ? '✅' : '❌' }}</span>
            <span class="font-semibold text-lg">
              {{ isCorrect ? 'Benar!' : 'Salah!' }}
            </span>
          </div>
          
          <div v-if="!isCorrect && currentWord" class="mt-2 text-sm">
            <p>Jawaban yang benar: <strong class="break-all">{{ currentWord.answer }}</strong></p>
            <p v-if="currentWord.explanation" class="mt-2 text-xs italic">
              {{ currentWord.explanation }}
            </p>
          </div>

          <div v-if="isCorrect && currentWord?.explanation" class="mt-2 text-sm">
            <p class="text-xs italic">{{ currentWord.explanation }}</p>
          </div>
        </div>

        <!-- Next Word Button -->
        <button
          @click="nextWord"
          class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Soal Selanjutnya 🎯
        </button>
      </div>

      <!-- Score Display -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Skor Kata Acak: {{ wordScore.correct }} benar dari {{ wordScore.total }} pertanyaan</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { normalizeString } from '@/utils/gameHelpers.js'
import { useGame } from '@/composables/useGame.js'

const GAME_TYPE = 'scramble'

const {
  questions,
  loading: gameLoading,
  error,
  fetchQuestions,
  submitScore,
} = useGame()

const currentIndex = ref(0)
const currentWord = computed(() => questions.value[currentIndex.value] || null)
const userAnswer = ref('')
const showResult = ref(false)
const isCorrect = ref(false)
const showHint = ref(false)
const wordScore = ref({ correct: 0, total: 0 })
const loading = computed(() => gameLoading.value)

const sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
  ? crypto.randomUUID()
  : `${Date.now()}`

const loadWordsData = async () => {
  const fetched = await fetchQuestions(GAME_TYPE)
  currentIndex.value = 0
  if (!fetched.length) return
  showHint.value = false
}

const selectNextWord = async () => {
  if (questions.value.length === 0) {
    await loadWordsData()
    return
  }

  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value += 1
  } else {
    currentIndex.value = 0
  }

  showHint.value = false
}

const persistScore = async () => {
  try {
    await submitScore(GAME_TYPE, wordScore.value.correct, wordScore.value.total, sessionId)
  } catch (err) {
    console.error('Error submitting score:', err)
  }
}

const checkAnswer = async () => {
  if (!currentWord.value) return

  const correctAnswer = normalizeString(currentWord.value.answer)
  const userAnswerClean = normalizeString(userAnswer.value)

  isCorrect.value = correctAnswer === userAnswerClean
  showResult.value = true
  wordScore.value.total += 1

  if (isCorrect.value) {
    wordScore.value.correct += 1
  }

  await persistScore()
}

const nextWord = async () => {
  userAnswer.value = ''
  showResult.value = false
  isCorrect.value = false
  showHint.value = false
  await selectNextWord()
}

onMounted(() => {
  loadWordsData()
})
</script>