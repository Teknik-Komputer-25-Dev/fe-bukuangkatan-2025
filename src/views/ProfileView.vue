<template>
  <div class="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/Desktop - 8.png');">
    <!-- Komponen pencarian & grid kartu -->
     <div>
       <router-link v-if="isAdmin" to="/admin"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg hover:bg-emerald-400 transition">
        Admin Dashboard
      </router-link>
     </div>
    <CardsSearch />
  </div>
</template>

<script setup>
import CardsSearch from "@/components/features/profile/CardsSearch.vue";
import { useAuth } from "@/composables/useAuth.js";
const { isAdmin } = useAuth();

</script>
