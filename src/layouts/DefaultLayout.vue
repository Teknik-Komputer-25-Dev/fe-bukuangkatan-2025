<template>
  <Navbar />
  <main class="">
    <slot />
  </main>
  <footer class="w-full py-6 text-center text-gray-500 bg-[#F5F5F5] border-t border-gray-200 ">
    &copy; 2025 Teknik Komputer 25. All rights reserved.
  </footer>
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue'
</script>
