<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/Desktop - 8.png');"
  >
    <SearchBar
      v-model="searchQuery"
      :current-sort="sortBy"
      :current-sort-order="sortOrder"
      @search="handleSearch"
      @sort="handleSort"
      @toggle-sort="handleToggleSort"
      @clear="handleClear"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="pb-10">
      <div class="flex justify-center mt-3">
        <div
          class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ProfileCardSkeleton v-for="n in itemsPerPage" :key="n" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center py-20"
    >
      <div class="text-center p-8 bg-white/80 rounded-xl shadow-lg">
        <div class="text-red-500 text-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Error Loading Profiles
        </h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="loadProfiles"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="totalResults === 0 && !isLoading"
      class="flex items-center justify-center py-20"
    >
      <div class="text-center p-8 bg-white/80 rounded-xl shadow-lg">
        <div class="text-gray-400 text-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No profiles found
        </h3>
        <p class="text-gray-600 mb-4">
          {{
            debouncedSearchQuery
              ? `No results for "${debouncedSearchQuery}"`
              : "No profiles available"
          }}
        </p>
        <button
          v-if="debouncedSearchQuery"
          @click="clearSearch"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Clear Search
        </button>
      </div>
    </div>

    <!-- Profiles Grid -->
    <div v-else class="pb-10">
      <div v-if="debouncedSearchQuery" class="flex justify-center mt-6">
        <div
          class="text-sm text-gray-100 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-white/30"
        >
          Found {{ totalResults }} result{{
            totalResults !== 1 ? "s" : ""
          }}
          for "{{ debouncedSearchQuery }}"
          <button
            @click="clearSearch"
            class="ml-2 text-blue-300 hover:text-blue-100 underline"
          >
            Clear
          </button>
        </div>
      </div>

      <div class="flex justify-center mt-3">
        <div
          class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="(profile, index) in paginatedProfiles"
            :key="profile.studentId || index"
            @click="openProfileModal(profile)"
            class="border border-white/30 bg-white/10 backdrop-blur-md rounded-xl shadow-md p-4 flex flex-col items-start hover:shadow-lg transition-all duration-200 group cursor-pointer"
          >
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  :src="profile.imageUrl"
                  :alt="`${profile.fullName} profile photo`"
                  class="w-40 h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  @load="handleImageLoad(profile)"
                  @error="handleImageError(profile, $event)"
                />

                <!-- Hover Overlay -->
                <div
                  class="absolute inset-0 w-40 h-40 bg-black/0 group-hover:bg-black/20 rounded-xl mb-4 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Text Section -->
            <div class="w-full">
              <h2
                class="font-medium text-sm text-left mb-1 text-white/90"
              >
                {{ profile.nickname || profile.fullName }}
              </h2>
              <p
                class="text-xs text-white text-left mb-1 font-medium"
              >
                {{ profile.fullName }}
              </p>
              <p class="text-xs text-white text-left mb-1">
                {{ profile.studentId }}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-white font-medium">
                  {{ profile.city }}
                </span>
                <span
                  class="px-2 py-1 rounded-full border border-white text-white font-semibold bg-transparent"
                >
                  {{ profile.class }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-10 mb-10">
        <PaginationControls
          :current-page="currentPage"
          :total-pages="totalPages"
          :pagination-info="paginationInfo"
          :items-per-page="itemsPerPage"
          @go-to-page="goToPage"
          @next-page="nextPage"
          @prev-page="prevPage"
          @update-items-per-page="updateItemsPerPage"
        />
      </div>
    </div>

    <!-- Profile Modal -->
    <ProfileModal
      :show="isModalVisible"
      :profile="selectedProfile"
      @close="closeProfileModal"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import ProfileCardSkeleton from "@/components/ui/ProfileCardSkeleton.vue";
import PaginationControls from "@/components/ui/PaginationControls.vue";
import ProfileModal from "@/components/ui/ProfileModal.vue";
import { useProfileData } from "@/composables/useProfileData.js";

const {
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
  sortBy,
  sortOrder,
  currentPage,
  itemsPerPage,
  paginatedProfiles,
  totalPages,
  totalResults,
  paginationInfo,
  loadProfiles,
  setSearchQuery,
  clearSearch,
  setSorting,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useProfileData();

const isModalVisible = ref(false);
const selectedProfile = ref(null);

const openProfileModal = (profile) => {
  selectedProfile.value = profile;
  isModalVisible.value = true;
  document.body.style.overflow = "hidden";
};

const closeProfileModal = () => {
  isModalVisible.value = false;
  selectedProfile.value = null;
  document.body.style.overflow = "unset";
};

const handleSearch = (query) => setSearchQuery(query);
const handleSort = (sortField) => setSorting(sortField);
const handleToggleSort = () => toggleSortOrder();
const handleClear = () => clearSearch();

const updateItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1;
};

const handleImageLoad = (profile) => (profile.imageLoaded = true);
const handleImageError = (profile, event) => {
  event.target.src = "/images/default-avatar.svg";
  profile.imageLoaded = true;
};

onMounted(() => {
  loadProfiles();
});
</script>
