<template>
    <div class="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">🧑‍🤝‍🧑 Tebak Teman!</h2>

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
                    <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Lahir
                    </label>
                    <input id="birthdate" v-model="userBirthdate" type="date"
                        class="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        :disabled="showResult" />
                </div>

                <!-- Submit Button -->
                <button v-if="!showResult" type="submit"
                    class="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    :disabled="!userNickname || !userBirthdate">
                    Submit Jawaban
                </button>
            </form>

            <!-- Result Display -->
            <div v-if="showResult" class="mt-6 text-center">
                <div class="p-4 rounded-lg mb-4 transition-all duration-500" :class="isCorrect
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'">
                    <div class="flex items-center justify-center space-x-2">
                        <span class="text-2xl">{{ isCorrect ? '✅' : '❌' }}</span>
                        <span class="font-semibold text-lg">
                            {{ isCorrect ? 'Benar!' : 'Salah!' }}
                        </span>
                    </div>

                    <div v-if="!isCorrect && currentPerson" class="mt-2 text-sm">
                        <p>Jawaban yang benar:</p>
                        <p><strong>Nama:</strong> {{ currentPerson.nickname }}</p>
                        <p><strong>Tanggal Lahir:</strong> {{ formatDate(currentPerson.birthdate) }}</p>
                    </div>
                </div>

                <!-- Next Friend Button -->
                <button @click="nextFriend"
                    class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Teman Selanjutnya 🎯
                </button>
            </div>

            <!-- Score Display -->
            <div class="mt-6 text-center text-sm text-gray-600">
                <p>Skor: {{ score.correct }} benar dari {{ score.total }} pertanyaan</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
    handleImageError,
    formatDisplayDate,
    convertToInputDate,
    normalizeString,
    getRandomElement
} from '@/utils/gameHelpers.js'

// Data
const peopleData = ref([])
const currentPerson = ref(null)
const userNickname = ref('')
const userBirthdate = ref('')
const showResult = ref(false)
const isCorrect = ref(false)
const score = ref({ correct: 0, total: 0 })
const loading = ref(true)
const error = ref('')

// Load people data
const loadPeopleData = async () => {
    try {
        loading.value = true
        error.value = ''
        const response = await fetch('/data/people.json')

        if (!response.ok) {
            throw new Error('Failed to load people data')
        }

        const data = await response.json()
        peopleData.value = data.filter(person =>
            person.formalphoto &&
            person.nickname &&
            person.birthdate &&
            person.formalphoto.includes('cloudinary') // Pastikan link cloudinary valid
        )

        if (peopleData.value.length === 0) {
            throw new Error('No valid people data found')
        }

        selectRandomPerson()
    } catch (err) {
        console.error('Error loading people data:', err)
        error.value = 'Gagal memuat data teman-teman. Silakan refresh halaman.'
    } finally {
        loading.value = false
    }
}

// Select random person
const selectRandomPerson = () => {
    if (peopleData.value.length > 0) {
        currentPerson.value = getRandomElement(peopleData.value)
    }
}

// Check answer
const checkAnswer = () => {
    if (!currentPerson.value) return

    const correctNickname = normalizeString(currentPerson.value.nickname)
    const correctBirthdate = convertToInputDate(currentPerson.value.birthdate)

    const userNicknameClean = normalizeString(userNickname.value)
    const userBirthdateClean = userBirthdate.value.trim()

    isCorrect.value = (
        correctNickname === userNicknameClean &&
        correctBirthdate === userBirthdateClean
    )

    showResult.value = true
    score.value.total++

    if (isCorrect.value) {
        score.value.correct++
    }
}

// Next friend
const nextFriend = () => {
    userNickname.value = ''
    userBirthdate.value = ''
    showResult.value = false
    isCorrect.value = false
    selectRandomPerson()
}

// Handle image error with helper
const onImageError = (event) => {
    handleImageError(event, '/images/profiles/placeholder.jpg')
}

// Format date for display with helper
const formatDate = (dateString) => {
    return formatDisplayDate(dateString)
}

// Initialize
onMounted(() => {
    loadPeopleData()
})
</script>