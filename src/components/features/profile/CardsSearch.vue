<template>
  <div>
    <!-- Search Bar -->
    <SearchBar v-model="searchQuery" :current-sort="sortBy" :current-sort-order="sortOrder" @search="handleSearch"
      @sort="handleSort" @toggle-sort="handleToggleSort" @clear="handleClear" />

    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-white">
      <div class="flex justify-center mt-3">
        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProfileCardSkeleton v-for="n in itemsPerPage" :key="n" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen bg-white flex items-center justify-center">
      <div class="text-center p-8">
        <div class="text-red-500 text-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Profiles</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="loadProfiles"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    </div>

    <!-- No Results State -->
    <div v-else-if="totalResults === 0 && !isLoading" class="min-h-screen bg-white flex items-center justify-center">
      <div class="text-center p-8">
        <div class="text-gray-400 text-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
        <p class="text-gray-600 mb-4">
          {{ debouncedSearchQuery ? `No results for "${debouncedSearchQuery}"` : 'No profiles available' }}
        </p>
        <button v-if="debouncedSearchQuery" @click="clearSearch"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          Clear Search
        </button>
      </div>
    </div>

    <!-- Profile Cards -->
    <div v-else class="min-h-screen bg-white">
      <!-- Search Results Info -->
      <div v-if="debouncedSearchQuery" class="flex justify-center mt-6">
        <div class="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
          Found {{ totalResults }} result{{ totalResults !== 1 ? 's' : '' }} for "{{ debouncedSearchQuery }}"
          <button @click="clearSearch" class="ml-2 text-blue-600 hover:text-blue-800 underline">
            Clear
          </button>
        </div>
      </div>

      <div class="flex justify-center mt-3">
        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(profile, index) in paginatedProfiles" :key="profile.studentId || index"
            class="border border-[#d9d9d9] rounded-xl shadow-sm p-4 flex flex-col items-start hover:shadow-md transition-shadow duration-200 group">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img :src="profile.imageUrl" :alt="`${profile.fullName} profile photo`"
                  class="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200"
                  loading="lazy" 
                  @load="handleImageLoad(profile)" 
                  @error="handleImageError(profile, $event)" />
                <!-- Loading placeholder for images -->
                <div v-if="!profile.imageLoaded"
                  class="absolute inset-0 w-40 h-40 bg-gray-200 rounded-xl mb-4 animate-pulse flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full">
              <h2 class="font-medium text-sm text-left mb-1">
                {{ profile.nickname || profile.fullName }}
              </h2>
              <p class="text-xs text-gray-700 text-left mb-1">
                {{ profile.fullName }}
              </p>
              <p class="text-xs text-gray-500 text-left mb-1">
                {{ profile.studentId }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ profile.city }}</span>
                <span class="bg-gray-100 px-2 py-1 rounded-full">{{ profile.class }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <PaginationControls :current-page="currentPage" :total-pages="totalPages" :pagination-info="paginationInfo"
        :items-per-page="itemsPerPage" @go-to-page="goToPage" @next-page="nextPage" @prev-page="prevPage"
        @update-items-per-page="updateItemsPerPage" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import SearchBar from "./SearchBar.vue";
import ProfileCardSkeleton from "@/components/ui/ProfileCardSkeleton.vue";
import PaginationControls from "@/components/ui/PaginationControls.vue";
import { useProfileData } from "@/composables/useProfileData.js";

// Use the profile data composable
const {
  // State
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
  sortBy,
  sortOrder,
  currentPage,
  itemsPerPage,

  // Computed
  paginatedProfiles,
  totalPages,
  totalResults,
  paginationInfo,

  // Methods
  loadProfiles,
  setSearchQuery,
  clearSearch,
  setSorting,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage
} = useProfileData();

// Handle search from SearchBar
const handleSearch = (query) => {
  setSearchQuery(query);
};

// Handle sorting from SearchBar
const handleSort = (sortField) => {
  setSorting(sortField);
};

// Handle sort order toggle from SearchBar
const handleToggleSort = () => {
  toggleSortOrder();
};

// Handle clear search
const handleClear = () => {
  clearSearch();
};

// Handle items per page change
const updateItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1; // Reset to first page
};

// Handle image loading success
const handleImageLoad = (profile) => {
  // Set image as loaded for this profile
  profile.imageLoaded = true;
};

// Handle image loading errors
const handleImageError = (profile, event) => {
  // Set fallback image
  event.target.src = '/images/default-avatar.svg';
  // Mark as loaded even for error case to hide loading state
  profile.imageLoaded = true;
};

// Load profiles on component mount
onMounted(() => {
  loadProfiles();
});
</script>