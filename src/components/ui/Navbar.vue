<template>
  <!-- Desktop Navbar - Top -->
  <nav
    ref="navbarRef"
    class="hidden md:flex fixed top-6 left-1/2 z-50 items-center px-4 py-2 rounded-full drop-shadow-lg shadow-gray-400 gap-4 transition-all duration-300 ease-in-out"
    :class="navbarClasses"
  >
    <NavLink
      v-for="navItem in navigationItems"
      :key="`desktop-${navItem.path}`"
      :to="navItem.path"
      :label="navItem.label"
      :icon="navItem.icon"
      :is-active="isActive(navItem.path)"
    />
  </nav>

  <!-- Mobile Navbar - Bottom -->
  <nav
    ref="mobileNavbarRef"
    class="flex md:hidden fixed bottom-3 left-1/2 z-50 items-center px-4 py-3 rounded-full drop-shadow-lg shadow-gray-400 gap-3 transition-all duration-300 ease-in-out max-w-[95vw] overflow-x-auto scrollbar-hide pb-safe"
    :class="mobileNavbarClasses"
  >
    <NavLink
      v-for="navItem in navigationItems"
      :key="`mobile-${navItem.path}`"
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
import { 
  Home, 
  Bot , 
  Users, 
  Images, 
  Gamepad2 
} from 'lucide-vue-next'
import NavLink from './NavLink.vue'

const navbarRef = ref(null)
const mobileNavbarRef = ref(null)
const route = useRoute()

const navigationItems = [
  {
    path: '/',
    label: 'Home',
    icon: Home
  },
  {
    path: '/identity',
    label: 'Identity',
    icon: Bot 
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: Users
  },
  {
    path: '/gallery',
    label: 'Gallery',
    icon: Images
  },
  {
    path: '/games',
    label: 'Fun Game',
    icon: Gamepad2
  }
]

const {
  isNavbarVisible,
  isAtTop
} = useScrollNavbar({
  scrollThreshold: 15,
  topThreshold: 80,
  throttleDelay: 16
})

const isActive = (path) => route.path === path

const navbarClasses = computed(() => [

  isNavbarVisible.value 
    ? 'translate-x-[-50%] translate-y-0 opacity-100 scale-100' 
    : 'translate-x-[-50%] -translate-y-20 opacity-0 scale-95',
  

  isAtTop.value 
    ? 'bg-[#C21807]' 
    : 'bg-[#C21807]/95 backdrop-blur-md'
])

const mobileNavbarClasses = computed(() => [

  isNavbarVisible.value 
    ? 'translate-x-[-50%] translate-y-0 opacity-100 scale-100' 
    : 'translate-x-[-50%] translate-y-20 opacity-0 scale-95',
  

  isAtTop.value 
    ? 'bg-[#C21807]' 
    : 'bg-[#C21807]/95 backdrop-blur-md'
])

defineExpose({
  navbarRef,
  mobileNavbarRef
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

/* Mobile navbar at bottom improvements */
@media (max-width: 768px) {
  /* Target only mobile navbar */
  nav[class*="bottom-3"] {
    /* Add safe area for devices with home indicator */
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
    /* Better shadow for bottom navbar */
    box-shadow: 0 -6px 10px -2px rgba(0, 0, 0, 0.1), 0 -4px 6px -1px rgba(0, 0, 0, 0.06);
    /* Minimum height for better touch targets */
    min-height: 4rem;
  }
}
</style>
