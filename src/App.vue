<template>
  <!-- Conditional Layout Based on Route -->
  <DefaultLayout v-if="!isGameRoute">
    <RouterView />
  </DefaultLayout>
  
  <!-- Games use their own layout -->
  <RouterView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

// Check if current route is games
const isGameRoute = computed(() => {
  return route.path === '/games'
})
</script>