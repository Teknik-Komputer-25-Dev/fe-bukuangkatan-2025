<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isVisible" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Blur Background -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div 
          class="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Photo Section -->
          <div class="relative">
            <div class="relative overflow-hidden">
              <img 
                :src="profile?.imageUrl" 
                :alt="`${profile?.fullName} profile photo`"
                class="w-full h-64 sm:h-80 object-cover transition-transform duration-300 hover:scale-105"
                @error="handleImageError"
                @load="imageLoaded = true"
              />
              
              <!-- Image Loading Placeholder -->
              <div 
                v-if="!imageLoaded" 
                class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <!-- Name Overlay on Photo -->
            <div class="absolute bottom-4 left-4 text-white">
              <h2 class="text-2xl font-bold">{{ profile?.nickname || profile?.fullName }}</h2>
              <p class="text-white/80">{{ profile?.fullName }}</p>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="p-6 space-y-4 max-h-64 overflow-y-auto">
            <!-- Basic Info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0V4a2 2 0 014 0v2" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Student ID</p>
                  <p class="font-medium">{{ profile?.studentId }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m-4 0H5m14 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Class</p>
                  <p class="font-medium">{{ profile?.class }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">City</p>
                  <p class="font-medium">{{ profile?.city || 'Not specified' }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Height</p>
                  <p class="font-medium">{{ profile?.height || '165' }} cm</p>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="border-t pt-4">
              <h3 class="font-medium text-gray-900 mb-2">Additional Information</h3>
              <div class="text-sm text-gray-600 space-y-1">
                <p><span class="font-medium">Name Length:</span> {{ getNameLength(profile) }} characters</p>
                <p><span class="font-medium">Nickname:</span> {{ profile?.nickname || 'Not set' }}</p>
                <p><span class="font-medium">Birthplace:</span> {{ profile?.birthplace || 'Not specified' }}</p>
                <p><span class="font-medium">Address:</span> {{ profile?.address || 'Not specified' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  profile: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const imageLoaded = ref(false)

watch(() => props.profile, () => {
  imageLoaded.value = false
})

const closeModal = () => {
  emit('close')
}

const handleImageError = (event) => {
  event.target.src = '/images/default-avatar.svg'
}

const getNameLength = (profile) => {
  if (!profile?.fullName) return 0
  return profile.fullName.replace(/\s/g, '').length
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>