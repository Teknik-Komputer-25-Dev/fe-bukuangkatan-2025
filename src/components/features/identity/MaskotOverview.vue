<template>
  <section class="pt-20 md:pt-24 lg:pt-32">
    <div class="text-center px-4 md:px-6 lg:px-8">
      <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold  mb-4 md:mb-6" v-motion
        :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
        MASKOT
      </h2>
    </div>
    <!-- Main Content Area -->
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-center py-8 lg:py-0">

      <!-- Mascot Image Section -->
      <div class="relative h-80 lg:h-screen flex items-center justify-center p-6 lg:p-8 order-1 lg:order-1">
        <img src="/images/mascott.png" alt="Mascot COBO" class="max-w-full max-h-full object-contain animate-float" />
      </div>

      <!-- Content Section -->
      <div class="px-6 lg:px-16 space-y-6 flex flex-col justify-center order-2 lg:order-2">
        <!-- Title COBO -->
        <div class="space-y-4">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight ">
            COBO <span class="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-300">(Ko.bo)</span>
          </h1>

          <!-- Orange rounded rectangle - PRESERVED -->
          <div class="w-20 md:w-24 h-2 bg-gradient-to-r from-[#EE7A13] to-[#FFB370] rounded-full"></div>
        </div>

        <!-- Description -->
        <p class="text-base md:text-lg lg:text-xl font-normal leading-relaxed  lg:max-w-2xl">
          ‘Cobo’ adalah maskot angkatan ‘25 yang mencerminkan kecerdasan, rasa ingin tahu, serta keterbukaan dalam
          berbagai informasi dan solusi. Nama ’Cobo’ diambil dari nama angkatan 25, yaitu VEN(COBO)LT.

          
        </p>
        <p class="text-base md:text-lg lg:text-xl font-normal leading-relaxed  lg:max-w-2xl">
          Nama ‘Cobo’ juga dalam bahasa Jawa berarti mencoba yang selaras dengan visi kami yang ingin tahu dan mencoba
          hal-hal baru yang positif.
        </p>
      </div>
    </div>

    <!-- Showcase Carousel Section -->
    <div class="mt-12 lg:mt-20">
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

/* Remove excessive custom styles - let Tailwind handle responsiveness */
</style>