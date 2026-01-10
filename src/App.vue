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

onMounted(async () => {
  try {
    await initAuth()
  } catch (error) {
    console.error('Failed to initialize authentication in App.vue:', error)
  }
})

const isStandaloneRoute = computed(() => {
  const path = route.path
  return path === '/games' || path === '/login' || path.startsWith('/admin')
})
</script>