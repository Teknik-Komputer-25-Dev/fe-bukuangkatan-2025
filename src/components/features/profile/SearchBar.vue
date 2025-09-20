<template>
    <div class="bg-transparent">
      <div class="flex justify-center mt-20">
        <div class="flex items-center bg-[#e8e8e8] rounded-full px-4 py-2 w-90 relative">
          <!-- Search Input -->
          <input 
            ref="searchInput"
            v-model="localQuery"
            type="text" 
            placeholder="Search by name, NIM, city, or class..." 
            class="flex-1 bg-transparent outline-none px-2 placeholder-gray-400 text-gray-700 w-30"
            @keyup.enter="handleSearch"
            @input="handleInput"
          />

          <!-- Clear Button -->
          <button 
            v-if="localQuery"
            @click="clearSearch"
            class="w-6 h-6 flex items-center justify-center mr-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
  
          <!-- Sort Dropdown -->
          <div class="relative">
            <button 
              @click="showSortOptions = !showSortOptions"
              class="text-sm text-black flex items-center px-2 py-2 gap-2 mr-1 cursor-pointer rounded hover:bg-gray-300 transition-colors"
            >
              Sort
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 text-black transition-transform duration-200"
                :class="{ 'rotate-180': showSortOptions }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Sort Options Dropdown -->
            <div 
              v-if="showSortOptions"
              class="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              <div class="py-2">
                <!-- Sort Field Options -->
                <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Sort By
                </div>
                <button
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="handleSort(option.value)"
                  class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center justify-between"
                  :class="{ 'bg-blue-50 text-blue-700 font-medium': currentSort === option.value }"
                >
                  <span>{{ option.label }}</span>
                  <svg v-if="currentSort === option.value" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                
                <!-- Sort Order Toggle -->
                <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-b border-gray-100 mt-2">
                  Order
                </div>
                <button
                  @click="handleToggleSort"
                  class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="currentSortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                    {{ currentSortOrder === 'asc' ? 'Ascending (A-Z)' : 'Descending (Z-A)' }}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
  
          <!-- Search Button -->
          <button 
            @click="handleSearch"
            class="w-8 h-8 bg-[#c1b4b4] rounded-full flex items-center justify-center hover:bg-[#938c8c] transition-colors"
            title="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Heading Section -->
      <div class="text-center mt-10">
        <h1 class="text-4xl font-medium">Profile Teknik Komputer 25</h1>
        <p class="text-xl text-gray-700 mt-5 font-medium">Teman teman yang kece dan keren!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onUnmounted } from "vue";
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    currentSort: {
      type: String,
      default: 'fullName'
    },
    currentSortOrder: {
      type: String,
      default: 'asc'
    }
  })

  const emit = defineEmits(['update:modelValue', 'search', 'sort', 'toggle-sort', 'clear'])
  
  const localQuery = ref(props.modelValue)
  const searchInput = ref(null)
  const showSortOptions = ref(false)
  
  const sortOptions = [
    { value: 'fullName', label: 'Name' },
    { value: 'studentId', label: 'Student ID' },
    { value: 'city', label: 'City' },
    { value: 'class', label: 'Class' },
    { value: 'nickname', label: 'Nickname' }
  ]

  watch(() => props.modelValue, (newValue) => {
    localQuery.value = newValue
  })

  const handleInput = () => {
    emit('update:modelValue', localQuery.value)
  }

  const handleSearch = () => {
    emit('search', localQuery.value)
  }

  const clearSearch = () => {
    localQuery.value = ''
    emit('update:modelValue', '')
    emit('clear')
    searchInput.value?.focus()
  }

  const handleSort = (sortBy) => {
    emit('sort', sortBy)
    showSortOptions.value = false
  }

  const handleToggleSort = () => {
    emit('toggle-sort')
    showSortOptions.value = false
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      showSortOptions.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
  