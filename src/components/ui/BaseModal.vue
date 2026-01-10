<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('close')"
        ></div>

        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              <slot name="title">Leaderboard</slot>
            </h3>
            <button
              @click="$emit('close')"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors"
              :aria-label="'Close modal'"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > .fixed > .relative,
.modal-leave-active > .fixed > .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from > .fixed > .relative,
.modal-leave-to > .fixed > .relative {
  transform: scale(0.95);
}
</style>