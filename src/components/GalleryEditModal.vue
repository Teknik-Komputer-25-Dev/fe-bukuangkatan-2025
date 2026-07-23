<template>
  <BaseEditModal
    :open="open"
    :title="mode === 'create' ? 'Tambah Gallery' : 'Edit Gallery Item'"
    :initialData="initialData"
    :fields="fields"
    :loading="loading"
    @close="$emit('close')"
    @submit="$emit('submit', $event)"
  >
    <template #footer-actions>
      <button
        type="button"
        class="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 disabled:opacity-60"
        @click="$emit('close')"
        :disabled="loading"
      >
        Batal
      </button>
      <button
        type="submit"
        class="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-300 disabled:opacity-60"
        :disabled="loading"
      >
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </button>
    </template>
  </BaseEditModal>
</template>

<script setup>
import BaseEditModal from '@/components/BaseEditModal.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  initialData: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  mode: { type: String, default: 'edit' }, // 'create' | 'edit'
})

defineEmits(['close', 'submit'])

const fields = [
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'image_url', label: 'Image URL', type: 'text' },
  { key: 'category', label: 'Kategori', type: 'text' },
  { key: 'aspect_ratio', label: 'Aspect Ratio', type: 'select', options: [
    { value: 'landscape', label: 'Landscape' },
    { value: 'portrait', label: 'Portrait' },
  ] },
  { key: 'display_order', label: 'Urutan Tampil', type: 'number' },
  { key: 'description', label: 'Deskripsi', type: 'text' },
]
</script>
