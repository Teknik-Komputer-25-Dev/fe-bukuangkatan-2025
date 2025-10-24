<template>
  <section class="relative w-full min-h-screen py-16 flex items-center justify-center">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 
            class="text-4xl md:text-6xl font-bold text-white mb-4"
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            YEL - YEL
          </h2>
        </div>

        <!-- Yel-yel Card -->
        <div 
          class="backdrop-blur-md bg-gradient-to-br from-purple-400/20 to-pink-400/20 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 1000, delay: 300 } }"
        >
          <!-- Frame Header -->
          <div class="bg-blue-500 text-white px-4 py-2 rounded-t-xl  flex items-center">
            <div class="flex space-x-1 mr-3">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <!-- Content Area -->
          <div class="bg-gradient-to-br from-purple-300/90 to-pink-300/90 rounded-b-xl p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <div class="text-purple-900 leading-relaxed">
                  <p class="mb-4">This is for Venco ( Venco! )</p>
                  <p class="mb-4">We are super ( Super )</p>
                  <p class="mb-4">There are no error ( No Error )</p>
                  <p class="mb-6 font-bold">Louder! Stronger!</p>
                  
                  <p class="mb-4">This is for Venco ( Venco! )</p>
                  <p class="mb-4">We are super ( Super )</p>
                  <p class="mb-4">There are no error ( No Error )</p>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <div class="text-purple-900 leading-relaxed">
                  <p class="mb-4">Kekuatan kita kan beri kita mahkota</p>
                  <p class="mb-4">Tekkom 25 di sini kan merangkulmu</p>
                  <p class="mb-4">Jiwa bergejolak menjalar penuh semangat</p>
                  <p class="mb-6 mt-3">Kami Venco akan terus jaya</p>
                  
                  <p class="mb-4">We go higher! ( Higher! )</p>
                  <p class="mb-4">Higher! Higher! ( Higher! )</p>
                  <p class="mb-4">Still going higher! ( Higher! )</p>
                  <p class="mb-4">Venco! in struggle, still together</p>
                  <p class="mb-4">Venco! United by Code, Solid by Bolt!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed for this component
</script>

<style scoped>

/* Glassmorphism effect enhancement */
.backdrop-blur-md {
  backdrop-filter: blur(16px);
}

/* Animation for floating effect */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>