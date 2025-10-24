<template>
  <section class="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row pl-4 sm:pl-6 lg:pl-2 py-8 sm:py-12">
    <!-- Main content area -->
    <div class="flex-1 flex flex-col items-center justify-center">
      <!-- Visi -->
      <div class="max-w-6xl w-full mx-auto mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">Visi</h2>
        <p class="text-base sm:text-lg md:text-xl text-left max-w-3xl leading-relaxed">
          Menjadi angkatan yang saling mengeratkan dan berkembang bersama, baik di bidang akademik maupun non-akademik. Sekaligus menjadi wadah yang memuaskan rasa ingin tahu serta tempat menemukan informasi, aspirasi, dan solusi.
        </p>
      </div>
      <!-- Misi -->
      <div class="max-w-6xl w-full mx-auto pb-16 sm:pb-24 lg:pb-32">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 lg:mb-10">Misi</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        <!-- Misi 1 -->
        <div class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 sm:p-6 flex gap-3 sm:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg  bg-[#FFFADD] flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #B47EDE, #311432);">
            <span class=" font-bold text-base sm:text-lg">1</span>
          </div>
          <div>
            <div class="font-bold text-base sm:text-lg mb-2">Kekeluargaan & Pengembangan</div>
            <div class="text-sm sm:text-base leading-relaxed">
              Melaksanakan kegiatan dengan penuh kekeluargaan dalam bidang pembelajaran, dan juga dalam bidang pengembangan minat dan bakat.
            </div>
          </div>
        </div>

        <!-- Misi 2 -->
        <div class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 sm:p-6 flex gap-3 sm:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg  bg-[#FFFADD] flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #B47EDE, #311432);">
            <span class=" font-bold text-base sm:text-lg">2</span>
          </div>
          <div>
            <div class="font-bold text-base sm:text-lg mb-2">Transformasi Kegagalan</div>
            <div class="text-sm sm:text-base leading-relaxed">
              Menggunakan setiap kegagalan sebagai motivasi untuk berkembang menjadi lebih baik kedepannya.
            </div>
          </div>
        </div>

        <!-- Misi 3 -->
        <div class="backdrop-blur-md bg-[#B47EDE]/4 border border-transparent hover:border-[#FFFADD] rounded-xl p-4 sm:p-6 flex gap-3 sm:gap-4 items-start shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
          <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, #311432, #B47EDE);">
            <span class=" font-bold text-base sm:text-lg">3</span>
          </div>
          <div>
            <div class="font-bold text-base sm:text-lg mb-2">Semangat Saling Mendukung</div>
            <div class="text-sm sm:text-base leading-relaxed">
              Membangun semangat saling mendukung serta membantu, baik dalam hal akademik maupun non akademik.
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
    
    <!-- Decorative sidebar - Hidden on mobile, visible on lg and up -->
    <div class="hidden lg:block w-[102px] h-full backdrop-blur-md bg-[#B47EDE]/24 border border-transparent"></div>
  </section>
</template>