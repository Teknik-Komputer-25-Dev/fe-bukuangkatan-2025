import { ref, computed, watch } from 'vue'

// Constants
const DEFAULT_AVATAR = "/images/default-avatar.svg"
const SEARCH_DEBOUNCE_MS = 300

export function useProfileData() {
  // State management
  const allProfiles = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const sortBy = ref('fullName')
  const sortOrder = ref('asc')
  
  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(20)

  // Helper function to normalize profile data
  const normalizeProfile = (profile) => ({
    ...profile,
    imageUrl: profile.formalphoto || DEFAULT_AVATAR,
    imageLoaded: false
  })

  // Helper function to validate profile data
  const isValidProfile = (profile) => {
    return profile && 
           typeof profile === 'object' && 
           profile.studentId && 
           profile.fullName
  }
  
  // Load data from JSON
  const loadProfiles = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/data/people.json')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array')
      }

      // Transform and validate profile data
      allProfiles.value = data
        .filter(isValidProfile)
        .map(normalizeProfile)

      
    } catch (err) {
      error.value = `Failed to load profiles: ${err.message}`
      console.error('Error loading profiles:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  const debouncedSearchQuery = ref('')
  let searchTimeout = null
  
  watch(searchQuery, (newQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery
      currentPage.value = 1 
    }, SEARCH_DEBOUNCE_MS) 
  })
  
  // Helper function for search matching
  const matchesSearchQuery = (profile, query) => {
    const searchFields = [
      profile.fullName,
      profile.nickname,
      profile.studentId,
      profile.city,
      profile.class,
      profile.birthplace
    ]
    
    return searchFields.some(field => 
      field?.toLowerCase().includes(query)
    )
  }

  const filteredProfiles = computed(() => {
    if (!debouncedSearchQuery.value.trim()) {
      return allProfiles.value
    }
    
    const query = debouncedSearchQuery.value.toLowerCase().trim()
    
    return allProfiles.value.filter(profile => 
      matchesSearchQuery(profile, query)
    )
  })
  
  const sortedProfiles = computed(() => {
    const profiles = [...filteredProfiles.value]
    
    return profiles.sort((a, b) => {
      const aValue = a[sortBy.value]?.toString().toLowerCase() || ''
      const bValue = b[sortBy.value]?.toString().toLowerCase() || ''
      
      if (sortOrder.value === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  })
  
  const paginatedProfiles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return sortedProfiles.value.slice(start, end)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(sortedProfiles.value.length / itemsPerPage.value)
  })
  
  const totalResults = computed(() => sortedProfiles.value.length)
  
  const paginationInfo = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1
    const end = Math.min(currentPage.value * itemsPerPage.value, totalResults.value)
    
    return {
      start,
      end,
      total: totalResults.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value
    }
  })
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const setSearchQuery = (query) => {
    searchQuery.value = query
  }
  
  const clearSearch = () => {
    searchQuery.value = ''
    debouncedSearchQuery.value = ''
  }
  
  const setSorting = (field, order = 'asc') => {
    sortBy.value = field
    sortOrder.value = order
  }
  
  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
  
  return {
    // State
    allProfiles,
    isLoading,
    error,
    searchQuery,
    debouncedSearchQuery,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    
    // Computed
    filteredProfiles,
    sortedProfiles,
    paginatedProfiles,
    totalPages,
    totalResults,
    paginationInfo,
    
    // Methods
    loadProfiles,
    setSearchQuery,
    clearSearch,
    setSorting,
    toggleSortOrder,
    goToPage,
    nextPage,
    prevPage
  }
}