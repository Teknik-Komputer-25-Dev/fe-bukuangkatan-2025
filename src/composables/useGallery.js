import { ref } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'

const mapGalleryRecord = (record) => ({
  id: record.id,
  title: record.title ?? '',
  image: record.image_url ?? record.image ?? '',
  description: Array.isArray(record.description)
    ? record.description
    : record.description
    ? [record.description]
    : [],
  aspect: record.aspect ?? record.aspect_ratio ?? 'landscape',
  category: record.category ?? null,
  displayOrder: record.display_order ?? record.displayOrder ?? 0,
})

export function useGallery() {
  const galleryItems = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchGallery = async (category = null) => {
    loading.value = true
    error.value = null

    try {
      let query = supabase.from('gallery').select('*')
      if (category) {
        query = query.eq('category', category)
      }

      const { data, error: supabaseError } = await query
      if (supabaseError) throw supabaseError

      galleryItems.value = (data || []).map(mapGalleryRecord)
      return galleryItems.value
    } catch (err) {
      console.error('Error fetching gallery:', err)
      error.value = err.message || 'Failed to load gallery'
      galleryItems.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    galleryItems,
    loading,
    error,
    fetchGallery,
  }
}
