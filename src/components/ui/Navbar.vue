<template>
  <nav
    class="fixed top-6 left-1/2 z-50 flex items-center px-4 py-2 rounded-full drop-shadow-lg shadow-gray-400 gap-2 md:gap-4 transition-all duration-300 ease-in-out"
    :class="[
      isNavbarVisible ? 'translate-x-[-50%] translate-y-0 opacity-100' : 'translate-x-[-50%] -translate-y-20 opacity-0',
      isAtTop ? 'translate-y-0 opacity-100' : '',
      isAtTop ? 'bg-[#E4E4E4]' : 'bg-[#E4E4E4]/95 backdrop-blur-md',
      isNavbarVisible ? 'scale-100' : 'scale-95'
    ]">
    <RouterLink to="/"
      class="flex items-center gap-2 px-4 py-2 rounded-full transition font-semibold  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/') ? 'text-[#26B0F0] ' : ''">
      <LaptopIcon class="w-6 h-6" />
      <span>Home</span>
    </RouterLink>
    <RouterLink to="/identity"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/identity') ? 'text-[#26B0F0] ' : ''">
      Identity
    </RouterLink>
    <RouterLink to="/profile"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/profile') ? 'text-[#26B0F0] ' : ''">
      Profile
    </RouterLink>
    <RouterLink to="/gallery"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/gallery') ? 'text-[#26B0F0] ' : ''">
      Gallery
    </RouterLink>
    <RouterLink to="/games"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/games') ? 'text-[#26B0F0] ' : ''">
      Fun Game
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Laptop as LaptopIcon } from 'lucide-vue-next'
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
