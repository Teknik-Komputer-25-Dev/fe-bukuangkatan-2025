<template>
     <div class="bg-white">
      <!-- Search Bar -->
      <div class="flex justify-center pt-6 mt-[60px]">
        <div class="flex items-center bg-[#e8e8e8] rounded-full px-4 py-2 w-[350px]">
          <!-- Search Input -->
          <input 
            type="text" 
            placeholder="Search" 
            class="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-700 w-[200px]"
          />

          <!-- Filter Option -->
          <span class="text-sm text-black flex items-center gap-1 mr-3 cursor-pointer">
            Sort
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10m-5 6h0" />
            </svg>
          </span>

          <!-- Search Button -->
          <button class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Heading Section -->
      <div class="text-center mt-10">
        <h1 class="text-4xl font-medium">Profile Teknik Komputer 25</h1>
        <p class="text-xl text-gray-700 mt-5 font-medium">Teman teman yang kece dan keren!</p>
      </div>
    </div>

</template>