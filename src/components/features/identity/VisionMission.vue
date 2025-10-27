<template>
  <section class="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row pl-6 lg:pl-2 py-8 lg:py-12">
    <!-- Main content area -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 lg:px-8">
      <!-- Visi -->
      <div class="max-w-6xl w-full mx-auto mb-12 lg:mb-20">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-8 text-center lg:text-left text-white">Visi</h2>
        <p class="text-base md:text-lg lg:text-xl text-left lg:max-w-4xl leading-relaxed text-gray-200">
          Menjadi angkatan yang saling mengeratkan dan berkembang bersama, baik di
          bidang akademik maupun non-akademik sekaligus menjadi wadah untuk
          meningkatkan rasa ingin tahu serta tempat menemukan informasi, dan solusi.
          Nilai - nilai ini membangun rasa gigih dan pantang menyerah di angkatan 25.
        </p>
      </div>
      <!-- Misi -->
      <div class="max-w-6xl w-full mx-auto pb-16 lg:pb-32">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-10 text-center lg:text-left text-white">Misi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

          <!-- Misi 1 -->
          <div
            class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 lg:p-6 flex gap-3 lg:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              class="w-10 lg:w-12 h-10 lg:h-12 rounded-lg bg-[#FFFADD] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style="background: linear-gradient(135deg, #B47EDE, #311432);">
              <span class="text-white font-bold text-base lg:text-lg">1</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-base lg:text-xl mb-2 text-white">Kekeluargaan & Pengembangan</div>
              <div class="text-sm lg:text-base leading-relaxed text-gray-300">
                Membangun budaya kolaboratif melalui setiap kegiatan untuk menumbuhkan
                semangat kekeluargaan, dukungan, dan sinergi antar anggota.
              </div>
            </div>
          </div>

          <!-- Misi 2 -->
          <div
            class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 lg:p-6 flex gap-3 lg:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div
              class="w-10 lg:w-12 h-10 lg:h-12 rounded-lg bg-[#FFFADD] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style="background: linear-gradient(135deg, #B47EDE, #311432);">
              <span class="text-white font-bold text-base lg:text-lg">2</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-base lg:text-xl mb-2 text-white">Motivasi Untuk Berkembang</div>
              <div class="text-sm lg:text-base leading-relaxed text-gray-300">
                Menggunakan setiap langkah sebagai motivasi untuk berkembang menjadi
                lebih baik kedepannya</div>
            </div>
          </div>

          <!-- Misi 3 -->
          <div
            class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 lg:p-6 flex gap-3 lg:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 group">
            <div
              class="w-10 lg:w-12 h-10 lg:h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style="background: linear-gradient(135deg, #311432, #B47EDE);">
              <span class="text-white font-bold text-base lg:text-lg">3</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-base lg:text-xl mb-2 text-white">Ruang untuk Berbagi Pengetahuan dan Informasi</div>
              <div class="text-sm lg:text-base leading-relaxed text-gray-300">
                Menyediakan ruang diskusi untuk berbagi pengetahuan, informasi, dan solusi
                terhadap tantangan yang sedang dihadapi.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Decorative sidebar - Hidden on mobile, visible on lg and up -->
    <div class="hidden lg:block w-24 h-full backdrop-blur-md bg-[#B47EDE]/24 border border-transparent"></div>
  </section>
</template>

<style scoped>
/* Keep only essential styles - let Tailwind handle responsiveness */
.transition-all {
  transition: all 0.3s ease;
}

.backdrop-blur-md {
  backdrop-filter: blur(16px);
}

/* Hover effects for mission cards */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Focus states for accessibility */
.group:focus-within {
  outline: 2px solid #B47EDE;
  outline-offset: 2px;
}
</style>