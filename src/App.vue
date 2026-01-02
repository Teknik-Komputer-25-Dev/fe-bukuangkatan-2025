<template>
  <!-- Conditional Layout Based on Route -->
  <DefaultLayout v-if="!isStandaloneRoute">
    <RouterView />
  </DefaultLayout>
  
  <RouterView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

const isStandaloneRoute = computed(() => {
  const path = route.path
  return path === '/games' || path === '/login'
})
</script>