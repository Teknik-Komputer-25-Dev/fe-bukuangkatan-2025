<template>
  <div class="border border-[#d9d9d9] rounded-xl shadow-sm p-4 flex flex-col items-start animate-pulse">
    <!-- Image Skeleton -->
    <div class="w-full flex justify-center">
      <div class="w-40 h-40 bg-gray-300 rounded-xl mb-4"></div>
    </div>
    
    <!-- Name Skeleton -->
    <div class="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
    
    <!-- Subtitle Skeleton -->
    <div class="w-full h-3 bg-gray-200 rounded mb-1"></div>
    
    <!-- ID Skeleton -->
    <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
  </div>
</template>

<script setup>
// No props needed for skeleton
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>