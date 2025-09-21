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
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto"
      >
        <!-- Close -->
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-black"
          @click="$emit('close')"
        >
          ✕
        </button>

        <!-- Image -->
        <div
          class="h-56 bg-cover bg-center rounded-lg mb-4"
          :style="{ backgroundImage: `url(${card.image})` }"
        ></div>

        <!-- Category -->
        <p class="text-xs uppercase font-semibold text-gray-500">
          Teknik Komputer 2025
        </p>

        <!-- Title -->
        <h2 class="text-2xl font-bold mb-2">{{ card.title }}</h2>

        <!-- Description -->
        <p class="text-gray-600 mb-4">
          {{
            card.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed tristique massa. Suspendisse potenti."
          }}
        </p>

        <!-- Button -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          More Information
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>
