<template>
  <Navbar />
  <main class="pt-24">
    <slot />
  </main>
  <slot name="footer" />
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue'
</script>
