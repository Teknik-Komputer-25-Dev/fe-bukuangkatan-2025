<template>

    <!-- konten utama -->
    <div class="relative p-4 md:p-10">
      <!-- Header -->
      <div class="mb-10 text-center md:text-left text-white">
        <h1 class="text-3xl md:text-4xl font-bold">TEKKOM 25</h1>
        <p class="text-gray-300 mt-2">OUR GALLERY</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-white text-center py-10">
        Loading gallery...
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-10 text-white">
        <p class="text-red-300 mb-4">{{ error }}</p>
        <button
          @click="loadGallery"
          class="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Layout -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <!-- Kiri -->
        <div class="flex flex-col gap-6 md:gap-12">
          <!-- Card Besar Kiri (index 0)-->
          <div
            v-if="gallery[0]"
            class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
            :class="gallery[0].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${gallery[0].image})` }"
            @click="openCard(gallery[0])"
          >
            <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <p class="text-xs uppercase">{{ gallery[0].category }}</p>
              <h2 class="text-xl font-bold">{{ gallery[0].title }}</h2>
            </div>
          </div>

          <!-- 2 Card Kecil (index 1-2)-->
          <div class="grid grid-cols-2 gap-6 md:gap-12">
            <div
              v-for="(item, i) in gallery.slice(1, 3)"
              :key="i"
              class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
              :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
              :style="{ backgroundImage: `url(${item.image})` }"
              @click="openCard(item)"
            >
              <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div class="absolute bottom-3 left-3 text-white">
                <p class="text-xs uppercase">{{ item.category }}</p>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Kanan -->
        <div class="flex flex-col gap-6 md:gap-12">
          <!-- 2 Card Kecil (index 3-4)-->
          <div class="grid grid-cols-2 gap-6 md:gap-12">
            <div
              v-for="(item, i) in gallery.slice(3, 5)"
              :key="i"
              class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
              :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
              :style="{ backgroundImage: `url(${item.image})` }"
              @click="openCard(item)"
            >
              <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div class="absolute bottom-3 left-3 text-white">
                <p class="text-xs uppercase">{{ item.category }}</p>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              </div>
            </div>
          </div>

          <!-- Card Besar (index 5)-->
          <div
            v-if="gallery[5]"
            class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
            :class="gallery[5].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${gallery[5].image})` }"
            @click="openCard(gallery[5])"
          >
            <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <p class="text-xs uppercase">{{ gallery[5].category }}</p>
              <h2 class="text-xl font-bold">{{ gallery[5].title }}</h2>
            </div>
          </div>
        </div>

        <!-- Card 6-12 -->
        <div class="flex flex-col gap-6 md:gap-12">
          <!-- Card Besar Kiri (index 6)-->
          <div
            v-if="gallery[6]"
            class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
            :class="gallery[6].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${gallery[6].image})` }"
            @click="openCard(gallery[6])"
          >
            <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <p class="text-xs uppercase">{{ gallery[6].category }}</p>
              <h2 class="text-xl font-bold">{{ gallery[6].title }}</h2>
            </div>
          </div>

          <!-- 2 Card Kecil (index 7-8)-->
          <div class="grid grid-cols-2 gap-6 md:gap-12">
            <div
              v-for="(item, i) in gallery.slice(7, 9)"
              :key="i"
              class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
              :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
              :style="{ backgroundImage: `url(${item.image})` }"
              @click="openCard(item)"
            >
              <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div class="absolute bottom-3 left-3 text-white">
                <p class="text-xs uppercase">{{ item.category }}</p>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Kanan -->
        <div class="flex flex-col gap-6 md:gap-12">
          <!-- 2 Card Kecil (index 9-10)-->
          <div class="grid grid-cols-2 gap-6 md:gap-12">
            <div
              v-for="(item, i) in gallery.slice(9, 11)"
              :key="i"
              class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
              :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
              :style="{ backgroundImage: `url(${item.image})` }"
              @click="openCard(item)"
            >
              <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div class="absolute bottom-3 left-3 text-white">
                <p class="text-xs uppercase">{{ item.category }}</p>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              </div>
            </div>
          </div>

          <!-- Card Besar (index 11)-->
          <div
            v-if="gallery[11]"
            class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
            :class="gallery[11].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${gallery[11].image})` }"
            @click="openCard(gallery[11])"
          >
            <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <p class="text-xs uppercase">{{ gallery[11].category }}</p>
              <h2 class="text-xl font-bold">{{ gallery[11].title }}</h2>
            </div>
          </div>
        </div>
      </div>

      <Card
        v-if="selectedCard"
        :card="selectedCard"
        @close="selectedCard = null"
      />
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Card from "./Card.vue";
import { useGallery } from "@/composables/useGallery.js";

const { galleryItems, loading, error, fetchGallery } = useGallery();

const selectedCard = ref(null);

/**
 * PROSES PENENTUAN LAYOUT BERDASARKAN ASPECT RATIO:
 * 1. Pisah images menjadi landscape dan portrait
 * 2. Interleave mereka sehingga landscape di posisi besar (0,5,6,11)
 * 3. Portrait di posisi kecil (1-4, 7-10)
 */
const gallery = computed(() => {
  const items = galleryItems.value || [];
  
  // Pisah berdasarkan aspect ratio
  const landscapes = items.filter(item => item.aspect === 'landscape');
  const portraits = items.filter(item => item.aspect === 'portrait');
  
  // Pattern positions: [0=LARGE, 1-2=small, 3-4=small, 5=LARGE, 6=LARGE, 7-8=small, 9-10=small, 11=LARGE]
  const largePositions = [0, 5, 6, 11];
  const smallPositions = [1, 2, 3, 4, 7, 8, 9, 10];
  
  const result = new Array(12);
  let landscapeIdx = 0;
  let portraitIdx = 0;
  
  // Masukkan ke posisi besar (landscape priority)
  for (let pos of largePositions) {
    if (landscapes[landscapeIdx]) {
      result[pos] = landscapes[landscapeIdx++];
    }
  }
  
  // Masukkan ke posisi kecil (portrait priority, tapi landscape juga boleh)
  for (let pos of smallPositions) {
    if (portraits[portraitIdx]) {
      result[pos] = portraits[portraitIdx++];
    } else if (landscapes[landscapeIdx]) {
      result[pos] = landscapes[landscapeIdx++];
    }
  }
  
  // Return hanya yang ada (filter undefined)
  return result.filter(item => item !== undefined);
});

const loadGallery = async () => {
  await fetchGallery();
};

function openCard(item) {
  selectedCard.value = item;
}

onMounted(() => {
  loadGallery();
});
</script>
