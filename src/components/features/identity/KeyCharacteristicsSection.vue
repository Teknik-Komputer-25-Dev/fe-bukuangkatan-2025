<template>
  <section class="relative w-full min-h-screen bg-gradient-to-br  pb-16 overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-32 right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl"></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full min-h-screen flex items-center justify-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Title -->
        <div class="text-center mb-20">
          <span class="text-3xl md:text-5xl lg:text-6xl font-bold   mb-4">
            KEY CHARACTERISTICS:
          </span>
        </div>

        <!-- Main Layout Container -->
        <div class="relative flex items-center justify-center">
          
          <!-- Central VENCOBOLT Logo -->
          <div class="relative z-20">
            <div class=" ">
              <img 
                src="/images/Logo/full-logo.png" 
                alt="VENCOBOLT Logo" 
                class="h-48 md:h-64 lg:h-80 w-auto object-contain"
              />
            </div>
          </div>

          <!-- Characteristic 1 - Top Left -->
          <div class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              class="group cursor-pointer transition-all duration-300 hover:scale-110"
              @click="showCharacteristicDetails(0)"
            >
              <div class=" backdrop-blur-md rounded-2xl bg-[#B47EDE]/7 border border-transparent  w-80 h-32 shadow-xl flex items-center">
                <div class="flex items-center ml-3 space-x-4 w-full">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center    font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="   font-semibold text-base leading-tight break-words">
                      {{ characteristics[0].title }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Characteristic 2 - Top Right -->
          <div class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            <div 
              class="group cursor-pointer transition-all duration-300 hover:scale-110"
              @click="showCharacteristicDetails(1)"
            >
              <div class="backdrop-blur-md rounded-2xl bg-[#B47EDE]/7 border border-transparent p-6 w-80 h-32 shadow-xl flex items-center">
                <div class="flex items-center space-x-4 w-full">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center    font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="   font-semibold text-base leading-tight break-words">
                      {{ characteristics[1].title }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Characteristic 3 - Bottom Left -->
          <div class="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
            <div 
              class="group cursor-pointer transition-all duration-300 hover:scale-110"
              @click="showCharacteristicDetails(2)"
            >
              <div class="backdrop-blur-md rounded-2xl bg-[#B47EDE]/7 border border-transparent p-6 w-80 h-32 shadow-xl flex items-center">
                <div class="flex items-center space-x-4 w-full">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center    font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class=" font-semibold text-base leading-tight break-words">
                      {{ characteristics[2].title }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Characteristic 4 - Bottom Right -->
          <div class="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
            <div 
              class="group cursor-pointer transition-all duration-300 hover:scale-110"
              @click="showCharacteristicDetails(3)"
            >
              <div class="backdrop-blur-md rounded-2xl bg-[#B47EDE]/7 border border-transparent p-6 w-80 h-32 shadow-xl flex items-center">
                <div class="flex items-center space-x-4 w-full">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center    font-bold text-lg">
                      4
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="   font-semibold text-base leading-tight break-words">
                      {{ characteristics[3].title }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Connection Lines (optional decorative elements) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;">
            <!-- Line from center to top-left -->
            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
            <!-- Line from center to top-right -->
            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
            <!-- Line from center to bottom-left -->
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
            <!-- Line from center to bottom-right -->
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
            </line>
          </svg>
        </div>

      
      </div>
    </div>

    <!-- Modal for Characteristic Details (optional) -->
    <div 
      v-if="selectedCharacteristic !== null"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
        @click.stop
      >
        <div class="text-center  ">
          <h2 class="text-3xl font-bold mb-4">
            {{ characteristics[selectedCharacteristic]?.title }}
          </h2>
          <p class="text-lg leading-relaxed opacity-90 mb-6">
            {{ characteristics[selectedCharacteristic]?.description }}
          </p>
          <button 
            @click="closeModal"
            class="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Characteristics data
const characteristics = ref([
  {
    title: "SALING MENGERATKAN",
    description: "Baut yang melambangkan simbol unik dari angkatan 25 yang bermakna mengeratkan kebersamaan."
  },
  {
    title: "INGIN BERKEMBANG",
    description: "Semangat untuk terus berkembang dan belajar dalam bidang teknologi dan komputer."
  },
  {
    title: "RASA INGIN TAHU TINGGI",
    description: "Curiosity yang tinggi untuk mengeksplorasi teknologi baru dan inovasi."
  },
  {
    title: "WADAH BERCERITA TENTANG MOTIVASI & SOLUSI",
    description: "Platform untuk berbagi motivasi, pengalaman, dan solusi dalam perjalanan akademik."
  }
])

// Modal state
const selectedCharacteristic = ref(null)

// Functions
const showCharacteristicDetails = (index) => {
  selectedCharacteristic.value = index
}

const closeModal = () => {
  selectedCharacteristic.value = null
}
</script>

<style scoped>

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Glassmorphism effect */
.backdrop-blur-md {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Hover effects */
.group:hover {
  transform: scale(1.05);
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

/* Custom scrollbar */
::-webkit-scrollbar {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .absolute {
    position: relative !important;
    transform: none !important;
    margin: 1rem 0;
  }
}
</style>