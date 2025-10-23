<template>
  <div class="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style="background-image: url('/images/Desktop - 8.png')">
    <!-- Optional overlay for better text readability -->
    <div class="min-h-screen bg-black/10">
      <Navbar />
      <main class="relative z-10">
        <slot />
      </main>
      <footer class="w-full py-6 text-center text-gray-500 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        &copy; 2025 Teknik Komputer 25. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue'
</script>
