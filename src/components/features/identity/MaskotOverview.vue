<template>
  <section class="pt-32  ">
    <div class="text-center">
      <h2 class="text-4xl md:text-6xl font-bold  mb-4" v-motion :initial="{ opacity: 0, y: -50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
        MASKOT
      </h2>

    </div>
    <!-- Kolom Kiri - Maskot (Center) -->
    <div class="h-screen grid lg:grid-cols-2 overflow-hidden items-center">

      <div class="relative h-screen flex items-center justify-center p-8">
        <img src="/images/mascott.png" alt="Mascot COBO" class="max-w-full max-h-full object-contain animate-float" />
      </div>

      <!-- Kolom Kanan - Content -->
      <div class="px-8 lg:px-16 space-y-6 flex flex-col justify-center">
        <!-- Title COBO -->
        <div class="space-y-4">
          <h1 class="text-6xl font-semibold leading-tight">
            COBO <span class="text-4xl font-normal">(Ko.bo)</span>
          </h1>

          <!-- Orange rounded underline -->
          <div class="w-24 h-2 bg-gradient-to-r from-[#EE7A13] to-[#FFB370] rounded-full"></div>
        </div>

        <!-- Description -->
        <p class="text-xl font-normal leading-relaxed">
          Inilah identitas kami, Venco. Kami bukan cuma sekadar angkatan, tapi teman, partner, dan keluarga dalam satu
          perjalanan penuh tawa dan pengalaman.
          Yuk, kenalan dengan identitas kami lebih dekat✨
        </p>
      </div>
    </div>

    <div>
      <ShowcaseCarousel />
    </div>

  </section>
</template>

<script setup>
import ShowcaseCarousel from '../../ui/ShowcaseCarousel.vue';

</script>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>