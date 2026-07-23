<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/Desktop - 8.png');"
  >
    <!-- Checking verification loading state -->
    <div v-if="isCheckingVerification" class="flex items-center justify-center min-h-screen pb-20">
       <div class="p-6 bg-white/20 backdrop-blur-md rounded-xl text-white font-medium">
         Memeriksa akses...
       </div>
    </div>
    
    <!-- Verification Form -->
    <div v-else-if="!isVerified" class="flex items-center justify-center min-h-screen px-4 pb-20">
      <div class="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl shadow-xl backdrop-blur-lg p-8">
        <h2 class="text-2xl font-bold text-white mb-2 text-center">Verifikasi Keamanan</h2>
        <p class="text-white/80 text-center mb-6 text-sm">Silakan masukkan kode keamanan angkatan untuk mengakses data.</p>
        
        <form @submit.prevent="submitSecurityCode" class="space-y-4">
          <div>
            <input 
              v-model="securityCode" 
              type="password" 
              placeholder="Masukkan kode rahasia" 
              class="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/70 outline-none transition"
              required
            />
          </div>
          
          <p v-if="verifyError" class="text-sm text-red-300 text-center">{{ verifyError }}</p>
          
          <button 
            type="submit" 
            :disabled="verifyLoading"
            class="w-full rounded-xl bg-[#EE7A13] text-white font-semibold py-3 transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="verifyLoading">Memverifikasi...</span>
            <span v-else>Verifikasi Akses</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
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
    <div v-if="isLoading" class="pb-6 md:pb-10">
      <div class="flex justify-center mt-3">
        <div
          class="p-3 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6"
        >
          <ProfileCardSkeleton v-for="n in itemsPerPage" :key="n" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center py-12 md:py-20 px-4"
    >
      <div class="text-center p-6 md:p-8 bg-white/80 rounded-xl shadow-lg max-w-md w-full">
        <div class="text-red-500 text-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4"
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
        <h3 class="text-base md:text-lg font-medium text-gray-900 mb-2">
          Error Loading Profiles
        </h3>
        <p class="text-sm md:text-base text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="fetchProfiles"
          class="px-4 py-2 bg-blue-600     rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="totalResults === 0 && !isLoading"
      class="flex items-center justify-center py-12 md:py-20 px-4"
    >
      <div class="text-center p-6 md:p-8 bg-white/80 rounded-xl shadow-lg max-w-md w-full">
        <div class="text-gray-400 text-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4"
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
        <h3 class="text-base md:text-lg font-medium text-gray-900 mb-2">
          No profiles found
        </h3>
        <p class="text-sm md:text-base text-gray-600 mb-4">
          {{
            debouncedSearchQuery
              ? `No results for "${debouncedSearchQuery}"`
              : "No profiles available"
          }}
        </p>
        <button
          v-if="debouncedSearchQuery"
          @click="clearSearch"
          class="px-4 py-2 bg-gray-600     rounded-md hover:bg-gray-700 transition-colors text-sm md:text-base"
        >
          Clear Search
        </button>
      </div>
    </div>

    <!-- Profiles Grid -->
    <div v-else class="pb-6 md:pb-10">
      <div v-if="debouncedSearchQuery" class="flex justify-center mt-4 md:mt-6 px-4">
        <div
          class="text-xs md:text-sm text-gray-100 bg-purple-500/60 px-3 md:px-4 py-2 rounded-full shadow-sm border border-white/30 max-w-md text-center"
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
          class="p-3 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6"
        >
          <div
            v-for="(profile, index) in paginatedProfiles"
            :key="profile.studentId || index"
            @click="openProfileModal(profile)"
            class="border border-white/30 bg-white/10 backdrop-blur-md rounded-xl shadow-md p-3 md:p-4 flex flex-col items-start hover:shadow-lg transition-all duration-200 group cursor-pointer"
          >
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  :src="profile.imageUrl"
                  :alt="`${profile.fullName} profile photo`"
                  class="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  @load="handleImageLoad(profile)"
                  @error="handleImageError(profile, $event)"
                />

                <!-- Hover Overlay -->
                <div
                  class="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-black/0 group-hover:bg-black/20 rounded-xl mb-3 md:mb-4 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 md:h-8 md:w-8    "
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
                class="font-medium text-xs md:text-sm text-left mb-1    /90"
              >
                {{ profile.nickname || profile.fullName }}
              </h2>
              <p
                class="text-xs     text-left mb-1 font-medium"
              >
                {{ profile.fullName }}
              </p>
              <p class="text-xs     text-left mb-1">
                {{ profile.studentId }}
              </p>
              <div class="flex items-center justify-between gap-2 text-xs">
                <span class="    font-medium truncate flex-1">
                  {{ profile.city }}
                </span>
                <span
                  class="px-2 py-1 rounded-full border border-white     font-semibold bg-transparent text-xs flex-shrink-0"
                >
                  {{ profile.class }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-6 md:mt-10 mb-6 md:mb-10 px-4">
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
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import ProfileCardSkeleton from "@/components/ui/ProfileCardSkeleton.vue";
import PaginationControls from "@/components/ui/PaginationControls.vue";
import ProfileModal from "@/components/ui/ProfileModal.vue";
import { useProfiles } from "@/composables/useProfiles.js";
import { supabase } from "@/utils/supabaseClient.js";

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
  fetchProfiles,
  setSearchQuery,
  clearSearch,
  setSorting,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useProfiles();

const isModalVisible = ref(false);
const selectedProfile = ref(null);

const isVerified = ref(false);
const isCheckingVerification = ref(true);
const securityCode = ref("");
const verifyError = ref("");
const verifyLoading = ref(false);

const checkVerification = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  
  if (!user) {
    isCheckingVerification.value = false;
    return;
  }
  
  try {
    // Mengecek status is_verified langsung dari metadata user bawaan Supabase
    if (user.user_metadata?.is_verified === true) {
      isVerified.value = true;
      fetchProfiles();
    }
  } catch (err) {
    console.error("Error checking verification:", err);
  } finally {
    isCheckingVerification.value = false;
  }
};

const submitSecurityCode = async () => {
  verifyError.value = "";
  if (!securityCode.value) return;
  
  verifyLoading.value = true;
  
  try {
    // Memanggil fungsi RPC di Supabase yang akan mengecek kode
    // sekaligus melakukan update 'is_verified = true' jika kode benar.
    const { data: isValid, error } = await supabase.rpc('verify_security_code', {
      input_code: securityCode.value
    });


    if (error) throw error;
    
    if (isValid === true) {
      // Perbarui session di client agar metadata terbaru (is_verified: true) tersinkronisasi
      await supabase.auth.refreshSession();
      isVerified.value = true;
      fetchProfiles();
    } else {
    console.log("RPC Result:", { isValid, error });

      verifyError.value = "Kode keamanan salah.";
    }
  } catch (err) {
    console.error("Detailed Verification Error:", err);
    verifyError.value = "Gagal verifikasi: " + (err.message || err.details || JSON.stringify(err));
  } finally {
    verifyLoading.value = false;
  }
};

const openProfileModal = (profile) => {
  selectedProfile.value = profile;
  isModalVisible.value = true;
  // Get scrollbar width to prevent layout shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  
  // Also apply to any fixed positioned elements that might shift
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.style.paddingRight = `${scrollbarWidth}px`;
  }
};

const closeProfileModal = () => {
  isModalVisible.value = false;
  selectedProfile.value = null;
  document.body.style.overflow = "unset";
  document.body.style.paddingRight = "0px";
  
  // Reset navbar padding
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.style.paddingRight = "0px";
  }
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
  checkVerification();
});
</script>
