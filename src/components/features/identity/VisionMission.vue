<template>
  <section class="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
    <!-- Visi -->
    <div class="max-w-4xl w-full mx-auto mb-20">
      <h2 class="text-5xl md:text-6xl font-bold text-gray-700 mb-8">Visi</h2>
      <p class="text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
    <!-- Misi -->
    <div class="max-w-4xl w-full mx-auto pb-32">
      <h2 class="text-5xl md:text-6xl font-bold text-gray-700 mb-10">Misi</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="i in 4" :key="i" class="bg-white rounded-xl p-6 flex gap-4 items-start min-h-[120px]">
          <div class="w-24 h-12 rounded-lg bg-white shadow-md shadow-blue-200"></div>
          <div>
            <div class="font-bold text-lg text-gray-700 mb-1">FIRST PROCESS</div>
            <div class="text-gray-400 text-base">Lorem ipsum dolor sit amet incididunt do labore eiusmod tempor magna.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>