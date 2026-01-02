import { ref, computed, watch } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'

const DEFAULT_AVATAR = '/images/default-avatar.svg'
const SEARCH_DEBOUNCE_MS = 300

const mapProfileRecord = (record) => ({
  studentId: record.student_id ?? record.studentId ?? '',
  fullName: record.full_name ?? record.fullName ?? '',
  nickname: record.nickname ?? '',
  city: record.city ?? '-',
  birthplace: record.birthplace ?? '-',
  birthdate: record.birthdate ?? '-',
  address: record.address ?? '-',
  religion: record.religion ?? '-',
  phone: record.phone ?? '-',
  lineid: record.lineid ?? '-',
  instagram: record.instagram ?? '-',
  motto: record.motto ?? '-',
  skillRahasia: record.skill_rahasia ?? record.skillRahasia ?? '-',
  tinggiBadan: record.tinggi_badan ?? record.tinggiBadan ?? '165',
  class: record.class ?? record.class_name ?? '',
  reason: record.reason ?? '',
  organization: record.organization ?? '',
  formalphoto: record.formal_photo_url ?? record.formalphoto ?? DEFAULT_AVATAR,
  generalphoto: record.general_photo_url ?? record.generalphoto ?? '',
  signature: record.signature ?? '',
})

const normalizeProfile = (profile) => ({
  fullName: profile.fullName?.trim() || 'Unknown',
  nickname: profile.nickname?.trim() || '',
  studentId: profile.studentId?.toString().trim() || '',
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
  tinggiBadan: profile.tinggiBadan?.toString().trim() || '165',
  class: profile.class?.trim() || '',
  reason: profile.reason || '',
  organization: profile.organization || '',
  formalphoto: profile.formalphoto || DEFAULT_AVATAR,
  signature: profile.signature || '',
  generalphoto: profile.generalphoto || '',
  imageUrl: profile.formalphoto || DEFAULT_AVATAR,
  imageLoaded: false,
})

const isValidProfile = (profile) => profile && typeof profile === 'object' && profile.studentId && profile.fullName

export function useProfiles() {
  const allProfiles = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const sortBy = ref('nameLength')
  const sortOrder = ref('asc')

  const currentPage = ref(1)
  const itemsPerPage = ref(20)

  const fetchProfiles = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name', { ascending: true })

      if (supabaseError) throw supabaseError
      if (!Array.isArray(data)) throw new Error('Invalid data format: expected an array')

      allProfiles.value = data
        .map(mapProfileRecord)
        .filter(isValidProfile)
        .map(normalizeProfile)
    } catch (err) {
      console.error('Error fetching profiles:', err)
      error.value = err.message || 'Failed to load profiles'
    } finally {
      isLoading.value = false
    }
  }

  const debouncedSearchQuery = ref('')
  let searchTimeout = null

  watch(searchQuery, (newQuery) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery
      currentPage.value = 1
    }, SEARCH_DEBOUNCE_MS)
  })

  const matchesSearchQuery = (profile, query) => {
    const searchFields = [
      profile.fullName,
      profile.nickname,
      profile.studentId,
      profile.city,
      profile.class,
      profile.birthplace,
    ]
    return searchFields.some((field) => field?.toLowerCase().includes(query))
  }

  const filteredProfiles = computed(() => {
    if (!debouncedSearchQuery.value.trim()) return allProfiles.value
    const query = debouncedSearchQuery.value.toLowerCase().trim()
    return allProfiles.value.filter((profile) => matchesSearchQuery(profile, query))
  })

  const getNameLength = (profile) => {
    const name = profile.fullName || profile.nickname || ''
    return name.replace(/\s/g, '').length
  }

  const getHeight = (profile) => parseInt(profile.tinggiBadan, 10) || 165

  const customSort = (profiles, sortField, order) => {
    return profiles.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'nameLength': {
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
        }
        case 'height':
          comparison = getHeight(a) - getHeight(b)
          break
        default: {
          const aValue = a[sortField]?.toString().toLowerCase() || ''
          const bValue = b[sortField]?.toString().toLowerCase() || ''
          comparison = aValue.localeCompare(bValue)
          break
        }
      }

      return order === 'desc' ? -comparison : comparison
    })
  }

  const sortedProfiles = computed(() => {
    const profiles = [...filteredProfiles.value]
    return customSort(profiles, sortBy.value, sortOrder.value)
  })

  const paginatedProfiles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return sortedProfiles.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(sortedProfiles.value.length / itemsPerPage.value))
  const totalResults = computed(() => sortedProfiles.value.length)

  const paginationInfo = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1
    const end = Math.min(currentPage.value * itemsPerPage.value, totalResults.value)

    return {
      start,
      end,
      total: totalResults.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
    }
  })

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
  }

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

  const sortByNameLength = (order = 'asc') => setSorting('nameLength', order)
  const sortByHeight = (order = 'asc') => setSorting('height', order)
  const sortByName = (order = 'asc') => setSorting('fullName', order)
  const sortByNickname = (order = 'asc') => setSorting('nickname', order)
  const sortByStudentId = (order = 'asc') => setSorting('studentId', order)
  const sortByClass = (order = 'asc') => setSorting('class', order)

  return {
    allProfiles,
    isLoading,
    error,
    searchQuery,
    debouncedSearchQuery,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    filteredProfiles,
    sortedProfiles,
    paginatedProfiles,
    totalPages,
    totalResults,
    paginationInfo,
    fetchProfiles,
    setSearchQuery,
    clearSearch,
    setSorting,
    toggleSortOrder,
    goToPage,
    nextPage,
    prevPage,
    sortByNameLength,
    sortByHeight,
    sortByName,
    sortByNickname,
    sortByStudentId,
    sortByClass,
    getNameLength,
    getHeight,
  }
}
