<template>
    <div class="bg-transparent">
      <div class="flex justify-center mt-20">
        <div class="flex items-center bg-[#e8e8e8] rounded-full px-4 py-2 w-90">
          <!-- Search Input -->
          <input 
            v-model="query"
            type="text" 
            placeholder="Search" 
            class="flex-1 bg-transparent outline-none px-2 placeholder-gray-400 text-gray-700 w-30"
          />
  
          <!-- Filter Option -->
          <span class="text-sm text-black flex items-center px-2 py-2 gap-2 mr-1 cursor-pointer rounded hover:bg-gray-300">
            Sort
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
  
          <!-- Search Button -->
          <button 
            class="w-8 h-8 bg-[#c1b4b4] rounded-full flex items-center justify-center hover:bg-[#938c8c]"
            @click="$emit('search', query)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const query = ref("");
  </script>
  