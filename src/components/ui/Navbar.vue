<template>
  <nav
    ref="navbarRef"
    class="fixed top-2 md:top-6 left-1/2 z-50 flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full drop-shadow-lg shadow-gray-400 gap-1 md:gap-4 transition-all duration-300 ease-in-out max-w-[95vw] md:max-w-none overflow-x-auto scrollbar-hide"
    :class="navbarClasses"
  >
    <NavLink
      v-for="navItem in navigationItems"
      :key="navItem.path"
      :to="navItem.path"
      :label="navItem.label"
      :icon="navItem.icon"
      :is-active="isActive(navItem.path)"
    />
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollNavbar } from '@/composables/useScrollNavbar.js'
import NavLink from './NavLink.vue'

// Refs
const navbarRef = ref(null)
const route = useRoute()

// Navigation items configuration
const navigationItems = [
  {
    path: '/',
    label: 'Home',
    icon: '🏠'
  },
  {
    path: '/identity',
    label: 'Identity',
    icon: '🆔'
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: '👤'
  },
  {
    path: '/gallery',
    label: 'Gallery',
    icon: '🖼️'
  },
  {
    path: '/games',
    label: 'Fun Game',
    icon: '🎮'
  }
]

// Composables
const {
  isNavbarVisible,
  isAtTop
} = useScrollNavbar({
  scrollThreshold: 15,
  topThreshold: 80,
  throttleDelay: 16
})

// Computed properties
const isActive = (path) => route.path === path

const navbarClasses = computed(() => [
  // Transform and visibility
  isNavbarVisible.value 
    ? 'translate-x-[-50%] translate-y-0 opacity-100 scale-100' 
    : 'translate-x-[-50%] -translate-y-20 opacity-0 scale-95',
  
  // Background based on scroll position
  isAtTop.value 
    ? 'bg-[#C21807]' 
    : 'bg-[#C21807]/95 backdrop-blur-md'
])

// Expose navbar ref for external access (e.g., modal scrollbar compensation)
defineExpose({
  navbarRef
})
</script>

<style scoped>
/* Hide scrollbar utility */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
