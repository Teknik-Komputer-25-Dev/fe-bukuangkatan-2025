<template>
  <div class="space-y-4">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Gallery</p>
        <h2 class="text-xl font-semibold text-white">Kelola gallery</h2>
        <p class="text-sm text-slate-400">Edit metadata gambar dan urutannya.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-emerald-300 disabled:opacity-60"
        @click="openCreateModal"
        :disabled="loading"
      >
        <span>
          <PlusIcon class="h-5 w-5" />
        </span> Tambah Gallery
      </button>
    </div>

    <div v-if="loading" class="py-6 text-slate-200">Memuat data...</div>
    <div v-else-if="error" class="py-6 text-red-200">{{ error }}</div>
    <div v-else-if="!items.length" class="py-6 text-slate-200">Tidak ada data gallery.</div>

    <div v-else class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg">
      <table class="w-full text-left text-sm">
        <thead class="bg-white/5 text-slate-200">
          <tr>
            <th class="px-4 py-3">Gambar</th>
            <th class="px-4 py-3">Judul</th>
            <th class="px-4 py-3">Kategori</th>
            <th class="px-4 py-3">Aspect</th>
            <th class="px-4 py-3">Urutan</th>
            <th class="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-t border-white/5">
            <td class="px-4 py-3">
              <img :src="item.image_url" :alt="item.title || 'image'" class="h-14 w-20 rounded-md object-cover" />
            </td>
            <td class="px-4 py-3 align-top text-white">{{ item.title || '—' }}</td>
            <td class="px-4 py-3 align-top text-slate-200">{{ item.category || '—' }}</td>
            <td class="px-4 py-3 align-top text-slate-200">{{ item.aspect_ratio || '—' }}</td>
            <td class="px-4 py-3 align-top text-slate-200">{{ item.display_order ?? '—' }}</td>
            <td class="px-4 py-3 text-right">
              <button
                class="rounded border border-white/30 px-3 py-1 text-sm text-white hover:bg-white/5"
                @click="openModal(item)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="success" class="text-sm text-emerald-300">{{ success }}</p>
    <p v-if="error && !loading" class="text-sm text-red-200">{{ error }}</p>

    <GalleryEditModal
      :open="modalOpen"
      :initialData="selectedItem || {}"
      :loading="saving"
      :mode="modalMode"
      @close="closeModal"
      @submit="handleModalSubmit"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'
import GalleryEditModal from '@/components/GalleryEditModal.vue'
import {  PlusIcon } from 'lucide-vue-next'

const items = ref([])
const loading = ref(true)
const error = ref('')
const success = ref('')
const saving = ref(false)
const modalOpen = ref(false)
const selectedItem = ref(null)
const modalMode = ref('edit') // 'create' | 'edit'

const fetchGallery = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data, error: supabaseError } = await supabase
      .from('gallery')
      .select('id, title, image_url, category, aspect_ratio, display_order, description')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (supabaseError) throw supabaseError

    items.value = data || []
  } catch (err) {
    error.value = err?.message || 'Gagal memuat gallery.'
    items.value = []
  } finally {
    loading.value = false
  }
}

const openModal = (item) => {
  selectedItem.value = { ...item }
  modalMode.value = 'edit'
  success.value = ''
  error.value = ''
  modalOpen.value = true
}

const openCreateModal = () => {
  selectedItem.value = {
    title: '',
    image_url: '',
    category: '',
    aspect_ratio: 'landscape',
    display_order: 0,
  }
  modalMode.value = 'create'
  success.value = ''
  error.value = ''
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedItem.value = null
}

const buildPayload = (payload) => {
  const sanitizeText = (val) => (typeof val === 'string' ? val.trim() : val)
  return {
    title: sanitizeText(payload.title) || null,
    image_url: sanitizeText(payload.image_url) || null,
    category: sanitizeText(payload.category) || null,
    aspect_ratio: sanitizeText(payload.aspect_ratio) || null,
    display_order: payload.display_order === '' || payload.display_order === undefined
      ? null
      : Number.isNaN(Number(payload.display_order)) ? null : Number(payload.display_order),
    description: sanitizeText(payload.description) || null,
  }
}

const handleModalSubmit = async (updatedData) => {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = buildPayload(updatedData)

    if (modalMode.value === 'create') {
      const { error: supabaseError } = await supabase.from('gallery').insert(payload)
      if (supabaseError) {
        if (supabaseError.code === '42501') throw new Error('Permission denied oleh RLS.')
        throw supabaseError
      }
      await fetchGallery()
      success.value = 'Gallery item berhasil dibuat.'
    } else if (modalMode.value === 'edit' && selectedItem.value) {
      const { error: supabaseError } = await supabase
        .from('gallery')
        .update(payload)
        .eq('id', selectedItem.value.id)

      if (supabaseError) {
        if (supabaseError.code === '42501') throw new Error('Permission denied oleh RLS.')
        throw supabaseError
      }

      const idx = items.value.findIndex((i) => i.id === selectedItem.value.id)
      if (idx !== -1) {
        items.value[idx] = { ...items.value[idx], ...payload }
      }
      success.value = 'Gallery item berhasil diperbarui.'
    }

    closeModal()
  } catch (err) {
    error.value = err?.message || 'Gagal menyimpan perubahan.'
  } finally {
    saving.value = false
  }
}

onMounted(fetchGallery)
</script>
