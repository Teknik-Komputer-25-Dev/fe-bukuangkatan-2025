<template>
    <div class="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
            <Cake class="w-6 h-6 text-purple-500" />
            Tebak Ulang Tahun Teman
        </h2>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <div
                class="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4">
            </div>
            <p class="text-gray-600">Memuat data teman-teman...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
            <div class="text-red-500 text-4xl mb-4">⚠️</div>
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button @click="loadPeopleData"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                Coba Lagi
            </button>
        </div>

        <!-- Game Content -->
        <div v-else>
            <!-- Photo Display -->
            <div class="text-center mb-6">
                <div class="mb-4">
                    <p class="text-lg font-semibold text-gray-700 mb-2 flex items-center justify-center gap-2">
                        <Cake class="w-5 h-5 text-purple-500" />
                        Kapan ulang tahun orang ini?
                    </p>
                    <p class="text-sm text-gray-500">Coba tebak nama dan ulang tahunnya! Tau ga?</p>
                </div>
                <div
                    class="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                    <img v-if="currentPerson" :src="currentPerson.formalphoto" :alt="currentPerson.fullName"
                        class="w-full h-full object-cover transition-all duration-500"
                        :class="showResult && !isCorrect ? 'filter grayscale' : ''" @error="onImageError" />
                    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center animate-pulse">
                        <span class="text-gray-500">Loading...</span>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="checkAnswer" class="space-y-4">
                <!-- Nickname Input -->
                <div>
                    <label for="nickname" class="block text-sm font-medium text-gray-700 mb-2">
                        Nama Panggilan
                    </label>
                    <input id="nickname" v-model="userNickname" type="text"
                        class="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Masukkan nama panggilan..." :disabled="showResult" />
                </div>

                <!-- Birthdate Input -->
                <div>
                    <label for="birthday" class="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Ulang Tahun (DD/MM)
                    </label>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Day Input -->
                        <div>
                            <label for="day" class="block text-xs text-gray-500 mb-1">Tanggal</label>
                            <select id="day" v-model="userDay" 
                                class="w-full px-3 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                :disabled="showResult">
                                <option value="">DD</option>
                                <option v-for="day in 31" :key="day" :value="day.toString().padStart(2, '0')">
                                    {{ day.toString().padStart(2, '0') }}
                                </option>
                            </select>
                        </div>
                        <!-- Month Input -->
                        <div>
                            <label for="month" class="block text-xs text-gray-500 mb-1">Bulan</label>
                            <select id="month" v-model="userMonth" 
                                class="w-full px-3 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                :disabled="showResult">
                                <option value="">MM</option>
                                <option v-for="(month, index) in months" :key="index" :value="(index + 1).toString().padStart(2, '0')">
                                    {{ (index + 1).toString().padStart(2, '0') }} - {{ month }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button v-if="!showResult" type="submit"
                    class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    :disabled="!userNickname || !userDay || !userMonth">
                    Submit Jawaban
                </button>
            </form>

            <!-- Result Display -->
            <div v-if="showResult" class="mt-6 text-center">
                <div class="p-4 rounded-lg mb-4 transition-all duration-500" :class="isCorrect
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'">
                    <div class="flex items-center justify-center space-x-2">
                        <CheckCircle v-if="isCorrect" class="w-6 h-6 text-green-500" />
                        <XCircle v-else class="w-6 h-6 text-red-500" />
                        <span class="font-semibold text-lg">
                            {{ isCorrect ? 'Horaayy!' : 'Tetoott!' }}
                        </span>
                    </div>

                    <div v-if="isCorrect && currentPerson" class="mt-2 text-sm">
                        <p class="text-green-600 font-medium flex items-center gap-2">
                            <PartyPopper class="w-4 h-4" />
                            Wuih bener! Crush mu atau bukan tuu?
                        </p>
                        <p class="text-xs mt-1">{{ currentPerson.nickname }} ulang tahun {{ formatBirthday(currentPerson.birthdate) }}</p>
                    </div>

                    <div v-if="!isCorrect && currentPerson" class="mt-2 text-sm">
                        <p>Jawaban yang benar:</p>
                        <p><strong>Nama:</strong> {{ currentPerson.nickname }}</p>
                        <p><strong>Ulang Tahun:</strong> {{ formatBirthday(currentPerson.birthdate) }}</p>
                        <p class="text-xs mt-2 italic flex items-center gap-1">
                            <Lightbulb class="w-3 h-3" />
                            Ingat tanggal ini untuk ucapan ulang tahun!
                        </p>
                    </div>
                </div>

                <!-- Next Friend Button -->
                <button @click="nextFriend"
                    class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                    <Cake class="w-4 h-4" />
                    Teman Selanjutnya
                </button>
            </div>

            <!-- Score Display -->
            <div class="mt-6 text-center text-sm text-gray-600">
                <div class="flex items-center justify-center gap-2 mb-1">
                    <Trophy class="w-4 h-4" />
                    <span>Skor Ulang Tahun: {{ score.correct }} benar dari {{ score.total }} pertanyaan</span>
                </div>
                <p v-if="score.total > 0" class="text-xs mt-1">
                    Akurasi: {{ Math.round((score.correct / score.total) * 100) }}%
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { handleImageError, normalizeString, getRandomElement } from '@/utils/gameHelpers.js'
import { useProfiles } from '@/composables/useProfiles.js'
import { useGame } from '@/composables/useGame.js'
import { Cake, CheckCircle, XCircle, PartyPopper, Lightbulb, Trophy } from 'lucide-vue-next'

const GAME_TYPE = 'friend_birthday'

const { allProfiles, isLoading, error, fetchProfiles } = useProfiles()
const { submitScore } = useGame()

const peopleData = ref([])
const currentPerson = ref(null)
const userNickname = ref('')
const userDay = ref('')
const userMonth = ref('')
const showResult = ref(false)
const isCorrect = ref(false)
const score = ref({ correct: 0, total: 0 })
const loading = computed(() => isLoading.value)

const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}`

const loadPeopleData = async () => {
    try {
        error.value = ''
        await fetchProfiles()
        peopleData.value = allProfiles.value.filter((person) =>
            person.formalphoto &&
            person.nickname &&
            person.birthdate
        )

        if (!peopleData.value.length) {
            throw new Error('No valid people data found')
        }

        selectRandomPerson()
    } catch (err) {
        console.error('Error loading people data:', err)
        error.value = err.message || 'Gagal memuat data teman-teman. Silakan refresh halaman.'
    }
}

const selectRandomPerson = () => {
    if (peopleData.value.length > 0) {
        currentPerson.value = getRandomElement(peopleData.value)
    }
}

const extractDayMonth = (birthdateString) => {
    if (!birthdateString) return { day: '', month: '' }

    let date
    if (birthdateString.includes('-')) {
        const parts = birthdateString.split('-')
        if (parts[0].length === 4) {
            date = new Date(birthdateString)
        } else {
            date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
        }
    } else if (birthdateString.includes('/')) {
        const parts = birthdateString.split('/')
        date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
    } else {
        date = new Date(birthdateString)
    }

    if (isNaN(date.getTime())) {
        return { day: '', month: '' }
    }

    return {
        day: date.getDate().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
    }
}

const formatBirthday = (birthdateString) => {
    const { day, month } = extractDayMonth(birthdateString)
    if (!day || !month) return 'Format tanggal tidak valid'

    const monthName = months[parseInt(month, 10) - 1] || month
    return `${day} ${monthName}`
}

const persistScore = async () => {
    try {
        await submitScore(GAME_TYPE, score.value.correct, score.value.total, sessionId)
    } catch (err) {
        console.error('Error submitting score:', err)
    }
}

const checkAnswer = async () => {
    if (!currentPerson.value) return

    const correctNickname = normalizeString(currentPerson.value.nickname)
    const { day: correctDay, month: correctMonth } = extractDayMonth(currentPerson.value.birthdate)

    const userNicknameClean = normalizeString(userNickname.value)
    const userDayClean = userDay.value.trim()
    const userMonthClean = userMonth.value.trim()

    isCorrect.value = (
        correctNickname === userNicknameClean &&
        correctDay === userDayClean &&
        correctMonth === userMonthClean
    )

    showResult.value = true
    score.value.total++

    if (isCorrect.value) {
        score.value.correct++
    }

    await persistScore()
}

const nextFriend = () => {
    userNickname.value = ''
    userDay.value = ''
    userMonth.value = ''
    showResult.value = false
    isCorrect.value = false
    selectRandomPerson()
}

const onImageError = (event) => {
    handleImageError(event, '/images/profiles/placeholder.jpg')
}

onMounted(() => {
    loadPeopleData()
})
</script>