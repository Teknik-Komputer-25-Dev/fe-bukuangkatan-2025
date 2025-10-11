import { ref, computed, watch } from 'vue'
import { env, validateEnv, generateCloudinaryUrl } from '@/utils/env.js'

// Constants
const DEFAULT_AVATAR = "/images/default-avatar.svg"
const SEARCH_DEBOUNCE_MS = 300

export function useProfileData() {
  // Validate environment on initialization
  try {
    validateEnv()
  } catch (error) {
    console.error('Environment validation failed:', error.message)
  }

  // State management
  const allProfiles = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const sortBy = ref('nameLength') // Default sorting
  const sortOrder = ref('asc')

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(20)

  // 🧩 Normalize profile data so all fields are safe and consistent
  const normalizeProfile = (profile) => ({
    fullName: profile.fullName?.trim() || 'Unknown',
    nickname: profile.nickname?.trim() || '',
    studentId: profile.studentId?.trim() || '',
    city: profile.city?.trim() || '-',
    birthplace: profile.birthplace?.trim() || '-',
    birthdate: profile.birthdate?.trim() || '-',
    address: profile.address?.trim() || '-',
    religion: profile.religion?.trim() || '-',
    phone: profile.phone?.trim() || '-',
    lineid: profile.lineid?.trim() || '-',
    instagram: profile.instagram?.trim() || '-',
    motto: profile.motto?.trim() || '-',
    skillRahasia: profile.skillRahasia?.trim() || '-',
    tinggiBadan: profile.tinggiBadan?.trim() || '165',
    class: profile.class?.trim() || '',
    reason: profile.reason || '',
    organization: profile.organization || '',
    formalphoto: profile.formalphoto || DEFAULT_AVATAR,
    signature: profile.signature || '',
    generalphoto: profile.generalphoto || '',
    imageUrl: profile.formalphoto || DEFAULT_AVATAR,
    imageLoaded: false
  })

  // ✅ Validation function
  const isValidProfile = (profile) => {
    return profile &&
      typeof profile === 'object' &&
      profile.studentId &&
      profile.fullName
  }

  // 🚀 Load data from JSON
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

  // 🔎 Debounced search logic
  const debouncedSearchQuery = ref('')
  let searchTimeout = null

  watch(searchQuery, (newQuery) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery
      currentPage.value = 1
    }, SEARCH_DEBOUNCE_MS)
  })

  // 🔍 Helper for searching
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

  // 🧮 Filtered profiles
  const filteredProfiles = computed(() => {
    if (!debouncedSearchQuery.value.trim()) {
      return allProfiles.value
    }

    const query = debouncedSearchQuery.value.toLowerCase().trim()
    return allProfiles.value.filter(profile =>
      matchesSearchQuery(profile, query)
    )
  })

  // 📏 Sorting helpers
  const getNameLength = (profile) => {
    const name = profile.fullName || profile.nickname || ''
    return name.replace(/\s/g, '').length
  }

  const getHeight = (profile) => {
    return parseInt(profile.tinggiBadan) || 165
  }

  const customSort = (profiles, sortField, order) => {
    return profiles.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'nameLength':
          const aLength = getNameLength(a)
          const bLength = getNameLength(b)
          if (aLength === bLength) {
            const aHeight = getHeight(a)
            const bHeight = getHeight(b)
            comparison = aHeight - bHeight
          } else {
            comparison = aLength - bLength
          }
          break

        case 'height':
          comparison = getHeight(a) - getHeight(b)
          break

        default:
          const aValue = a[sortField]?.toString().toLowerCase() || ''
          const bValue = b[sortField]?.toString().toLowerCase() || ''
          comparison = aValue.localeCompare(bValue)
          break
      }

      return order === 'desc' ? -comparison : comparison
    })
  }

  // 🔢 Sorted + paginated profiles
  const sortedProfiles = computed(() => {
    const profiles = [...filteredProfiles.value]
    return customSort(profiles, sortBy.value, sortOrder.value)
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

  // 📄 Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  // 🔧 Search/sort utils
  const setSearchQuery = (query) => { searchQuery.value = query }
  const clearSearch = () => {
    searchQuery.value = ''
    debouncedSearchQuery.value = ''
  }

  const setSorting = (field, order = 'asc') => {
    sortBy.value = field
    sortOrder.value = order
    currentPage.value = 1
  }

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    currentPage.value = 1
  }

  // Quick sorting presets
  const sortByNameLength = (order = 'asc') => setSorting('nameLength', order)
  const sortByHeight = (order = 'asc') => setSorting('height', order)
  const sortByName = (order = 'asc') => setSorting('fullName', order)
  const sortByNickname = (order = 'asc') => setSorting('nickname', order)
  const sortByStudentId = (order = 'asc') => setSorting('studentId', order)
  const sortByClass = (order = 'asc') => setSorting('class', order)

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
    prevPage,

    // Custom sorting
    sortByNameLength,
    sortByHeight,
    sortByName,
    sortByNickname,
    sortByStudentId,
    sortByClass,

    // Helpers
    getNameLength,
    getHeight
  }
}
