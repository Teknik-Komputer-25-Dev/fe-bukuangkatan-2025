<template>
  <div class="p-4 md:p-10">
    <!-- Header -->
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold">TEKKOM 25.</h1>
      <p class="text-gray-500 mt-2">
        OUR GALLERY.
      </p>
    </div>

    <!-- Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      <!-- Kiri -->
      <div class="flex flex-col gap-6 md:gap-12">
        <!-- Card Besar (Landscape) -->
        <div
          v-if="gallery[0]"
          class="relative bg-gray-300 rounded-lg aspect-[16/9] bg-cover bg-center cursor-pointer"
          :style="{ backgroundImage: `url(${gallery[0].image})` }"
          @click="openCard(gallery[0])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[0].title }}</h2>
            <button class="mt-2 bg-white text-black px-3 py-1 text-sm rounded">
              More Information
            </button>
          </div>
        </div>

        <!-- 2 Card Kecil (Portrait) -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(1, 3)"
            :key="i"
            class="relative bg-gray-200 rounded-lg aspect-[3/4] bg-cover bg-center cursor-pointer"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              <button class="mt-1 bg-white text-black px-2 py-1 text-xs rounded">
                More Information
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanan -->
      <div class="flex flex-col gap-6 md:gap-12">
        <!-- 2 Card Kecil (Portrait) -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(3, 5)"
            :key="i"
            class="relative bg-gray-200 rounded-lg aspect-[3/4] bg-cover bg-center cursor-pointer"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              <button class="mt-1 bg-white text-black px-2 py-1 text-xs rounded">
                More Information
              </button>
            </div>
          </div>
        </div>

        <!-- Card Besar (Landscape) -->
        <div
          v-if="gallery[5]"
          class="relative bg-gray-300 rounded-lg aspect-[16/9] bg-cover bg-center cursor-pointer"
          :style="{ backgroundImage: `url(${gallery[5].image})` }"
          @click="openCard(gallery[5])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[5].title }}</h2>
            <button class="mt-2 bg-white text-black px-3 py-1 text-sm rounded">
              More Information
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <CardModal
      v-if="selectedCard"
      :card="selectedCard"
      @close="selectedCard = null"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardModal from "./Card.vue";

const selectedCard = ref(null);

const gallery = ref([
  { title: "TEKKOM 25", image: "https://www.hindustantimes.com/ht-img/img/2024/06/24/550x309/jujutsu-0_1706698004936_1719216182186.jpg", description: "Compile Sukses, No error, Running" },
  { title: "TEKKOM 25", image: "https://i0.wp.com/gkids.com/wp-content/uploads/2025/05/JJK_Poster_WEB_2025-04-30_scaled.jpg?fit=1000%2C1463&ssl=1", description: "Compile Sukses, No error, Running" },
  { title: "TEKKOM 25", image: "https://i0.wp.com/gkids.com/wp-content/uploads/2025/05/JJK_Poster_WEB_2025-04-30_scaled.jpg?fit=1000%2C1463&ssl=1", description: "Compile Sukses, No error, Running" },
  { title: "TEKKOM 25", image: "https://i0.wp.com/gkids.com/wp-content/uploads/2025/05/JJK_Poster_WEB_2025-04-30_scaled.jpg?fit=1000%2C1463&ssl=1", description: "Compile Sukses, No error, Running" },
  { title: "TEKKOM 25", image: "https://i0.wp.com/gkids.com/wp-content/uploads/2025/05/JJK_Poster_WEB_2025-04-30_scaled.jpg?fit=1000%2C1463&ssl=1", description: "Compile Sukses, No error, Running" },
  { title: "TEKKOM 25", image: "https://www.hindustantimes.com/ht-img/img/2024/06/24/550x309/jujutsu-0_1706698004936_1719216182186.jpg", description: "Compile Sukses, No error, Running" },
]);

function openCard(item) {
  selectedCard.value = item;
}
</script>
