<template>
  <div class="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/Desktop - 8.png');">
    
    <!-- Header Actions -->
    <div class="sticky top-0 z-40 flex items-center justify-end gap-3 bg-black/20 backdrop-blur-sm px-4 md:px-6 py-4 shadow-md">
      <router-link 
        v-if="isAdmin" 
        to="/admin"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:bg-emerald-400 transition duration-200"
      >
        Admin Dashboard
      </router-link>
      <button 
        type="button" 
        @click="logout"
        class="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red-400 transition duration-200"
      >
        Logout
      </button>
    </div>

    <!-- Komponen pencarian & grid kartu -->
    <CardsSearch />
  </div>
</template>

<script setup>
import CardsSearch from "@/components/features/profile/CardsSearch.vue";
import { useAuth } from "@/composables/useAuth.js";
const { isAdmin, logout } = useAuth();

</script>
