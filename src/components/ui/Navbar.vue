<template>
  <nav
    class="fixed top-2 md:top-6 left-1/2 z-50 flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full drop-shadow-lg shadow-gray-400 gap-1 md:gap-4 transition-all duration-300 ease-in-out max-w-[95vw] md:max-w-none overflow-x-auto"
    :class="[
      isNavbarVisible ? 'translate-x-[-50%] translate-y-0 opacity-100' : 'translate-x-[-50%] -translate-y-20 opacity-0',
      isAtTop ? 'translate-y-0 opacity-100' : '',
      isAtTop ? 'bg-[#C21807]' : 'bg-[#C21807]/95 backdrop-blur-md',
      isNavbarVisible ? 'scale-100' : 'scale-95'
    ]">
    <RouterLink to="/"
      class="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full transition font-semibold text-white text-sm md:text-base whitespace-nowrap hover:bg-white/20 hover:text-[#FFE787]"
      :class="isActive('/') ? 'text-[rgb(255,231,135)]' : ''">
      <span class="hidden sm:inline">Home</span>
      <span class="sm:hidden">🏠</span>
    </RouterLink>
    <RouterLink to="/identity"
      class="px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition text-white text-sm md:text-base whitespace-nowrap hover:bg-white/20 hover:text-[#FFE787]"
      :class="isActive('/identity') ? 'text-[#FFE787]' : ''">
      <span class="hidden sm:inline">Identity</span>
      <span class="sm:hidden">🆔</span>
    </RouterLink>
    <RouterLink to="/profile"
      class="px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition text-white text-sm md:text-base whitespace-nowrap hover:bg-white/20 hover:text-[#FFE787]"
      :class="isActive('/profile') ? 'text-[#FFE787]' : ''">
      <span class="hidden sm:inline">Profile</span>
      <span class="sm:hidden">👤</span>
    </RouterLink>
    <RouterLink to="/gallery"
      class="px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition text-white text-sm md:text-base whitespace-nowrap hover:bg-white/20 hover:text-[#FFE787]"
      :class="isActive('/gallery') ? 'text-[#FFE787]' : ''">
      <span class="hidden sm:inline">Gallery</span>
      <span class="sm:hidden">🖼️</span>
    </RouterLink>
    <RouterLink to="/games"
      class="px-2 md:px-4 py-1 md:py-2 rounded-full font-medium transition text-white text-sm md:text-base whitespace-nowrap hover:bg-white/20 hover:text-[#FFE787]"
      :class="isActive('/games') ? 'text-[#FFE787]' : ''">
      <span class="hidden sm:inline">Fun Game</span>
      <span class="sm:hidden">🎮</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useScrollNavbar } from '@/composables/useScrollNavbar.js'

const route = useRoute()
const isActive = (path) => route.path === path

const {
  isNavbarVisible,
  isAtTop
} = useScrollNavbar({
  scrollThreshold: 15,
  topThreshold: 80,
  throttleDelay: 16
})
</script>
