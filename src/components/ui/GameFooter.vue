<template>
  <footer class="py-8 px-4">
    <div class="max-w-md mx-auto text-center">
      <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <!-- Main message -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <Heart class="w-4 h-4 text-red-400" />
          <span class="text-white/90 text-sm font-medium">
            Dibuat untuk Angkatan 2025
          </span>
        </div>

        <!-- University info -->
        <p class="text-white/70 text-xs mb-4">
          Teknik Komputer - Universitas Diponegoro
        </p>

        <!-- Inspirational message -->
        <div class="flex items-start gap-2 text-white/60 text-xs leading-relaxed">
          <Quote class="w-3 h-3 mt-0.5 flex-shrink-0 opacity-60" />
          <p class="text-left">
            Barang siapa punya teman banyak, nanti loker jadi lebih gampang. Jadi, mari kita jaga silaturahmi ini dengan baik.
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <p class="text-white/50 text-xs mt-4">
        © {{ currentYear }} Angkatan 2025
      </p>
    </div>
  </footer>
</template>

<script setup>
import { Heart, Quote } from 'lucide-vue-next'
import { computed } from 'vue'


const currentYear = computed(() => new Date().getFullYear())
</script>

