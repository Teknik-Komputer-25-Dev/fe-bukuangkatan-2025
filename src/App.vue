<template>
  <!-- Conditional Layout Based on Route -->
  <DefaultLayout v-if="!isStandaloneRoute">
    <RouterView />
  </DefaultLayout>
  
  <RouterView v-else />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const { initAuth } = useAuth()

onMounted(() => {
  initAuth()
})

const isStandaloneRoute = computed(() => {
  const path = route.path
  return path === '/games' || path === '/login' || path === '/admin'
})
</script>