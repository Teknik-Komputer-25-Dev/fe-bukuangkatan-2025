<template>
  <div class="relative min-h-screen bg-white">
    <!-- Komponen pencarian & grid kartu -->
    <CardsSearch @open-profile="openProfile" />

    <!-- Pop-up modal -->
    <ProfileModal 
      :show="showModal" 
      :profile="selectedProfile" 
      @close="showModal = false" 
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardsSearch from "@/components/features/profile/CardsSearch.vue";
import ProfileModal from "@/components/ui/ProfileModal.vue";

const showModal = ref(false);
const selectedProfile = ref(null);

function openProfile(profile) {
  selectedProfile.value = profile;
  showModal.value = true;
}
</script>