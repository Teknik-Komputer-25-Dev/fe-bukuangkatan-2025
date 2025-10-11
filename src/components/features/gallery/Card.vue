<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { X } from "lucide-vue-next";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

// ESC key handler
const handleEsc = (e) => {
  if (e.key === "Escape") handleClose();
};

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) handleClose();
};

onMounted(() => window.addEventListener("keydown", handleEsc));
onBeforeUnmount(() => window.removeEventListener("keydown", handleEsc));
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-90"
  >
    <div
      v-if="card"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4"
      @click="handleBackdropClick"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full relative overflow-hidden"
        :class="card.aspect === 'portrait' 
          ? 'max-w-5xl max-h-[95vh] flex' 
          : 'max-w-4xl max-h-[90vh] flex flex-col'"
      >
        <!-- Tombol Close -->
        <button
          class="close-button absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 transition-colors duration-200 z-10 bg-white/90 rounded-full p-1.5 shadow-lg"
          @click="handleClose"
        >
          <X class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <!-- Layout Portrait -->
        <template v-if="card.aspect === 'portrait'">
          <div class="w-5/12 sm:w-2/5 flex-shrink-0 bg-gray-100 flex items-center justify-center p-2 sm:p-4 md:p-6">
            <img 
              :src="card.image" 
              :alt="card.title"
              class="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div class="w-7/12 sm:w-3/5 overflow-y-auto p-3 sm:p-6 md:p-8 space-y-2 sm:space-y-4 custom-scroll">
            <p class="text-[10px] sm:text-xs md:text-sm uppercase font-semibold text-gray-500">
              Teknik Komputer 2025
            </p>
            <h2 class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">{{ card.title }}</h2>

            <div class="text-gray-600 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
              <template v-if="Array.isArray(card.description)">
                <p v-for="(para, index) in card.description" :key="index">{{ para }}</p>
              </template>
              <template v-else>
                <p>{{ card.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }}</p>
              </template>
            </div>
          </div>
        </template>

        <!-- Layout Landscape -->
        <template v-else>
          <div class="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 custom-scroll">
            <div
              class="w-full bg-cover bg-center rounded-lg aspect-[16/9]"
              :style="{ backgroundImage: `url(${card.image})` }"
            ></div>
            <p class="text-[10px] sm:text-xs md:text-sm uppercase font-semibold text-gray-500">
              Teknik Komputer 2025
            </p>
            <h2 class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold">{{ card.title }}</h2>

            <div class="text-gray-600 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
              <template v-if="Array.isArray(card.description)">
                <p v-for="(para, index) in card.description" :key="index">{{ para }}</p>
              </template>
              <template v-else>
                <p>{{ card.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }}</p>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.close-button:hover {
  transform: scale(1.1);
}
</style>