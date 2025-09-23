<script setup>
import { X } from "lucide-vue-next";

defineProps({
  card: {
    type: Object,
    required: true,
  },
});
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
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full relative flex flex-col overflow-hidden"
        :class="card.aspect === 'portrait' ? 'max-w-sm max-h-[85vh]' : 'max-w-4xl max-h-[90vh]'"
      >
        <!-- Tombol Close -->
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-transform transform hover:scale-110 z-10"
          @click="$emit('close')"
        >
          <X class="w-6 h-6" />
        </button>

        <!-- Konten Scroll -->
        <div class="overflow-y-auto p-6 space-y-4 custom-scroll">
          <!-- Gambar -->
          <div
            class="w-full bg-cover bg-center rounded-lg"
            :class="card.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${card.image})` }"
          ></div>

          <!-- Kategori -->
          <p class="text-xs uppercase font-semibold text-gray-500">
            Teknik Komputer 2025
          </p>

          <!-- Judul -->
          <h2 class="text-2xl font-bold">{{ card.title }}</h2>

          <!-- Deskripsi Multi-Paragraf -->
          <div class="text-gray-600 space-y-2">
            <template v-if="Array.isArray(card.description)">
              <p v-for="(para, index) in card.description" :key="index">{{ para }}</p>
            </template>
            <template v-else>
              <p>
                {{
                  card.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed tristique massa. Suspendisse potenti."
                }}
              </p>
            </template>
          </div>

          <!-- Tombol -->
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            More Information
          </button>
        </div>
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
</style>
