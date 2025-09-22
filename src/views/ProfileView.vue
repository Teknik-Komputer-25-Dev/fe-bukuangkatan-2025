<template>
  <div class="profile">
    <SearchBar />
    <ProfileCards />
  </div>
</template>

<script setup>
// Profile page logic will go here
import SearchBar from '../components/features/profile/SearchBar.vue';
import ProfileCards from '../components/features/profile/ProfileCards.vue';
</script>

<style scoped>
.profile {
  padding: 2rem;
  text-align: center;
}
</style>
