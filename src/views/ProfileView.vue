<template>
  <div class="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/Desktop - 8.png');">
    <!-- Komponen pencarian & grid kartu -->
     <div>
       <router-link v-if="isAdmin" to="/admin"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:bg-emerald-400 transition">
        Admin Dashboard
      </router-link>
      <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red-400 transition" @click="logout">Logout</button>

     </div>
    <CardsSearch />
  </div>
</template>

<script setup>
import CardsSearch from "@/components/features/profile/CardsSearch.vue";
import { useAuth } from "@/composables/useAuth.js";
const { isAdmin, logout } = useAuth();

</script>
