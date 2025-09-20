<template>
    <div>
      <!-- Search Bar -->
      <SearchBar @search="handleSearch" />
  
      <!-- Cards -->
      <div class="min-h-screen bg-white">
        <div class="flex justify-center mt-3">
          <div class="p-6 grid grid-cols-4 gap-6">
            <div 
              v-for="(item, index) in filteredCards" 
              :key="index" 
              class="border border-[#d9d9d9] rounded-xl shadow-sm p-4 flex flex-col items-start"
            >
              <div class="w-full flex justify-center">
                <img :src="item.img" alt="profile" class="w-40 h-40 object-cover rounded-xl mb-4" />
              </div>
              <h2 class="font-medium text-sm text-left">{{ item.title }}</h2>
              <p class="text-xs text-gray-700 text-left">{{ item.subtitle }}</p>
              <p class="text-xs text-gray-500 text-left">{{ item.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import SearchBar from "./SearchBar.vue";
  import { cards } from "./CardsHard.js"; // <- your array with images/names/ids
  
  const query = ref("");
  
  // Filter cards based on subtitle
  const filteredCards = computed(() => {
    if (!query.value) return cards;
    return cards.filter(c =>
      c.subtitle.toLowerCase().includes(query.value.toLowerCase())
    );
  });
  
  function handleSearch(val) {
    query.value = val;
  }
  </script>
  