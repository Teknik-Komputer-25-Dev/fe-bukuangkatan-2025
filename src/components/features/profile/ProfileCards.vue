<template>
    <div class="min-h-screen bg-white">
        <div class="flex justify-center mt-3">
            <div class="p-6 grid grid-cols-4 gap-6">
                <div
                  v-for="(card, index) in cards"
                  :key="index"
                  class="border border-[#d9d9d9] rounded-xl shadow-sm p-4 flex flex-col items-start"
                >
                   <!-- Image placeholder -->
                   <div class="w-full flex justify-center">
                     <div class="w-40 h-40 bg-[#d9d9d9] rounded-xl mb-4"></div>
                   </div>
                   
                   <!-- Content -->
                   <h2 class="font-medium text-sm text-left">Qolbi</h2>
                   <p class="text-xs text-gray-700 text-left">Muhammad Salimul Qolbi</p>
                   <p class="text-xs text-gray-500 text-left">21038336553</p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardGrid",
    data() {
      return {
        cards: Array(8).fill({})
      };
    }
  };
  </script>
  