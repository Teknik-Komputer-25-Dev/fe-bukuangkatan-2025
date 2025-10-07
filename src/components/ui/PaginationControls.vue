<template>
  <div class="flex flex-col items-center space-y-4 mt-8 mb-8">
    <!-- Results Info -->
    <div class="text-sm text-gray-600">
      Showing {{ paginationInfo.start }}-{{ paginationInfo.end }} of {{ paginationInfo.total }} results
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center border border-gray-300 rounded-xl gap-12 space-x-1">
      <!-- Previous Button -->
      <button
        @click="$emit('prev-page')"
        :disabled="currentPage === 1"
        class="pl-5  text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md flex items-center"
        :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1 py-3">
        <!-- First page -->
        <button
          v-if="startPage > 1"
          @click="$emit('go-to-page', 1)"
          class="w-8 h-8 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center"
        >
          1
        </button>

        <!-- Ellipsis before -->
        <span v-if="startPage > 2" class="px-2 text-sm text-gray-400">...</span>

        <!-- Page range -->
        <button
          v-for="page in pageRange"
          :key="page"
          @click="$emit('go-to-page', page)"
          class="w-8 h-8 text-sm font-medium transition-colors rounded-full flex items-center justify-center"
          :class="page === currentPage 
            ? 'text-gray-800 bg-gray-200' 
            : 'text-gray-600 hover:bg-gray-100'"
        >
          {{ page }}
        </button>

        <!-- Ellipsis after -->
        <span v-if="endPage < totalPages - 1" class="px-2 text-sm text-gray-400">...</span>

        <!-- Last page -->
        <button
          v-if="endPage < totalPages"
          @click="$emit('go-to-page', totalPages)"
          class="w-8 h-8 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="$emit('next-page')"
        :disabled="currentPage === totalPages"
        class="pr-5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md flex items-center"
        :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Items per page selector -->
    <div class="flex items-center space-x-2 text-sm">
      <span class="text-gray-600">Items per page:</span>
      <select
        :value="itemsPerPage"
        @change="$emit('update-items-per-page', parseInt($event.target.value))"
        class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  paginationInfo: {
    type: Object,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 20
  }
})

defineEmits(['go-to-page', 'next-page', 'prev-page', 'update-items-per-page'])

// Calculate page range to show
const maxVisiblePages = 5

const startPage = computed(() => {
  const start = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2))
  return Math.min(start, Math.max(1, props.totalPages - maxVisiblePages + 1))
})

const endPage = computed(() => {
  return Math.min(props.totalPages, startPage.value + maxVisiblePages - 1)
})

const pageRange = computed(() => {
  const range = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push(i)
  }
  return range
})
</script>