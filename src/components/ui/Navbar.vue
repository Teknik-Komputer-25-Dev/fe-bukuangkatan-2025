<template>
  <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center px-4 py-2 rounded-full bg-[#E4E4E4] drop-shadow-lg shadow-gray-400 gap-2 md:gap-4">
    <!-- Logo Button -->
    <RouterLink
      to="/"
      class="flex items-center gap-2 px-4 py-2 rounded-full transition font-semibold  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/') ? 'text-[#26B0F0] ' : ''"
    >
      <LaptopIcon class="w-6 h-6" />
      <span>Home</span>
    </RouterLink>
    <!-- Home -->
    <!-- <RouterLink
      to="/"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/') ? 'text-[#26B0F0] ' : ''"
    >
      Home
    </RouterLink> -->
    <!-- Identity -->
    <RouterLink
      to="/identity"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/identity') ? 'text-[#26B0F0] ' : ''"
    >
      Identity
    </RouterLink>
    <!-- Profile -->
    <RouterLink
      to="/profile"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/profile') ? 'text-[#26B0F0] ' : ''"
    >
      Profile
    </RouterLink>
    <!-- Gallery -->
    <RouterLink
      to="/gallery"
      class="px-4 py-2 rounded-full font-medium transition  hover:bg-[#d1f3ff] hover:text-[#26B0F0]"
      :class="isActive('/gallery') ? 'text-[#26B0F0] ' : ''"
    >
      Gallery
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Laptop as LaptopIcon } from 'lucide-vue-next'

const route = useRoute()
const isActive = (path) => route.path === path
</script>
