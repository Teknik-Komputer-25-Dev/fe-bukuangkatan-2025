<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Profil Mahasiswa</p>
        <h2 class="text-xl font-semibold text-white">Kelola profil</h2>
      </div>
      <form class="flex w-full max-w-md items-center gap-2" @submit.prevent="handleSearch">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Cari nama, student ID, atau nickname"
          class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
        />
        <button
          type="submit"
          class="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5"
          :disabled="loading"
        >
          Cari
        </button>
      </form>
    </div>

    <div v-if="loading" class="py-6 text-slate-200">Memuat data...</div>
    <div v-else-if="error" class="py-6 text-red-200">{{ error }}</div>
    <div v-else-if="!profiles.length" class="py-6 text-slate-200">Tidak ada data profil.</div>

    <div v-else class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg">
      <table class="w-full text-left text-sm">
        <thead class="bg-white/5 text-slate-200">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Student ID</th>
            <th class="px-4 py-3">Kelas</th>
            <th class="px-4 py-3">Instagram</th>
            <th class="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profile in profiles" :key="profile.id" class="border-t border-white/5">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  :src="profile.formal_photo_url || '/images/default-avatar.svg'"
                  :alt="profile.full_name"
                  class="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <p class="font-semibold">{{ profile.full_name }}</p>
                  <p class="text-xs text-slate-400 line-clamp-1">{{ profile.nickname || '—' }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 align-top text-slate-100">{{ profile.student_id }}</td>
            <td class="px-4 py-3 align-top text-slate-100">{{ profile.class || '—' }}</td>
            <td class="px-4 py-3 align-top text-slate-100">{{ profile.instagram || '—' }}</td>
            <td class="px-4 py-3 text-right">
              <button
                class="rounded border border-white/30 px-3 py-1 text-sm text-white hover:bg-white/5"
                @click="openModal(profile)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex flex-col gap-3 border-t border-white/10 bg-slate-900/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-300">
          Menampilkan {{ pageStart }}-{{ pageEnd }} dari {{ totalCount }} entri
        </p>
        <div class="flex items-center gap-2">
          <button
            class="rounded-lg border border-white/20 px-3 py-1 text-sm text-white hover:bg-white/5 disabled:opacity-60"
            @click="goToPreviousPage"
            :disabled="!hasPreviousPage || loading"
          >
            ← Sebelumnya
          </button>
          <span class="text-sm text-slate-200">Halaman {{ currentPage }} / {{ totalPages }}</span>
          <button
            class="rounded-lg border border-white/20 px-3 py-1 text-sm text-white hover:bg-white/5 disabled:opacity-60"
            @click="goToNextPage"
            :disabled="!hasNextPage || loading"
          >
            Berikutnya →
          </button>
        </div>
      </div>
    </div>

    <p v-if="success" class="text-sm text-emerald-300">{{ success }}</p>
    <p v-if="error && !loading" class="text-sm text-red-200">{{ error }}</p>

    <BaseEditModal
      :open="modalOpen"
      title="Edit Profil"
      :initialData="selectedProfile || {}"
      :fields="profileFields"
      :loading="saving"
      @close="closeModal"
      @submit="handleModalSubmit"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'
import { useAuth } from '@/composables/useAuth.js'
import BaseEditModal from '@/components/BaseEditModal.vue'

const { isAdmin } = useAuth()

const profiles = ref([])
const loading = ref(true)
const error = ref('')
const success = ref('')
const saving = ref(false)
const searchTerm = ref('')
const modalOpen = ref(false)
const selectedProfile = ref(null)
const currentPage = ref(1)
const pageSize = ref(12)
const totalCount = ref(0)

const profileFields = [
  { key: 'student_id', label: 'Student ID', type: 'text', required: true },
  { key: 'full_name', label: 'Nama Lengkap', type: 'text', required: true },
  { key: 'nickname', label: 'Nama Panggilan', type: 'text' },
  { key: 'class', label: 'Kelas', type: 'select', options: [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ] },
  { key: 'city', label: 'Kota', type: 'text' },
  { key: 'birthplace', label: 'Tempat Lahir', type: 'text' },
  { key: 'birthdate', label: 'Tanggal Lahir', type: 'date' },
  { key: 'address', label: 'Alamat', type: 'textarea' },
  { key: 'religion', label: 'Agama', type: 'text' },
  { key: 'phone', label: 'No. HP', type: 'text' },
  { key: 'line_id', label: 'Line ID', type: 'text' },
  { key: 'instagram', label: 'Instagram', type: 'text' },
  { key: 'motto', label: 'Motto', type: 'textarea' },
  { key: 'reason', label: 'Alasan', type: 'textarea' },
  { key: 'organization', label: 'Organisasi', type: 'text' },
  { key: 'skill_rahasia', label: 'Skill Rahasia', type: 'textarea' },
  { key: 'tinggi_badan', label: 'Tinggi Badan (cm)', type: 'number' },
  { key: 'formal_photo_url', label: 'Foto Formal URL', type: 'text' },
  { key: 'general_photo_url', label: 'Foto Umum URL', type: 'text' },
]

const totalPages = computed(() => Math.max(1, Math.ceil((totalCount.value || 0) / pageSize.value)))
const hasPreviousPage = computed(() => currentPage.value > 1)
const hasNextPage = computed(() => currentPage.value < totalPages.value)
const pageStart = computed(() => totalCount.value === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1)
const pageEnd = computed(() => Math.min(totalCount.value, pageStart.value + profiles.value.length - 1))

const fetchProfiles = async () => {
  loading.value = true
  error.value = ''
  const from = (currentPage.value - 1) * pageSize.value
  const to = from + pageSize.value - 1
  try {
    let query = supabase
      .from('profiles')
      .select('id, student_id, full_name, nickname, class, city, birthplace, birthdate, address, religion, phone, line_id, instagram, motto, reason, organization, skill_rahasia, tinggi_badan, formal_photo_url, general_photo_url', { count: 'exact' })
      .order('full_name', { ascending: true })
      .range(from, to)

    const term = searchTerm.value.trim()
    if (term) {
      query = query.or(`full_name.ilike.%${term}%,student_id.ilike.%${term}%,nickname.ilike.%${term}%`)
    }

    const { data, count, error: supabaseError } = await query
    if (supabaseError) throw supabaseError

    profiles.value = data || []
    totalCount.value = count || 0
  } catch (err) {
    error.value = err?.message || 'Gagal memuat profil.'
    profiles.value = []
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchProfiles()
}

const goToPreviousPage = () => {
  if (!hasPreviousPage.value) return
  currentPage.value -= 1
  fetchProfiles()
}

const goToNextPage = () => {
  if (!hasNextPage.value) return
  currentPage.value += 1
  fetchProfiles()
}

const openModal = (profile) => {
  selectedProfile.value = { ...profile }
  modalOpen.value = true
  success.value = ''
  error.value = ''
}

const closeModal = () => {
  modalOpen.value = false
  selectedProfile.value = null
}

const buildUpdatePayload = (payload) => {
  const result = {}
  profileFields.forEach((field) => {
    const value = payload[field.key]
    if (value === undefined || value === '') {
      result[field.key] = null
      return
    }
    if (field.type === 'text' || field.type === 'textarea') {
      result[field.key] = typeof value === 'string' ? value.trim() : value
    } else if (field.type === 'number') {
      const parsed = Number(value)
      result[field.key] = Number.isNaN(parsed) ? null : parsed
    } else {
      result[field.key] = value
    }
  })
  return result
}

const handleModalSubmit = async (updatedData) => {
  if (!selectedProfile.value) return
  if (!isAdmin.value) {
    error.value = 'Tidak memiliki izin.'
    return
  }

  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const updatePayload = buildUpdatePayload(updatedData)
    const { error: supabaseError } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', selectedProfile.value.id)

    if (supabaseError) {
      if (supabaseError.code === '42501') {
        throw new Error('Permission denied oleh RLS.')
      }
      throw supabaseError
    }

    const idx = profiles.value.findIndex((p) => p.id === selectedProfile.value.id)
    if (idx !== -1) {
      profiles.value[idx] = { ...profiles.value[idx], ...updatePayload }
    }

    success.value = 'Profil berhasil diperbarui.'
    closeModal()
  } catch (err) {
    error.value = err?.message || 'Gagal menyimpan perubahan.'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  if (isAdmin.value) {
    fetchProfiles()
  } else {
    loading.value = false
  }
})

watch(
  () => isAdmin.value,
  (val, prev) => {
    if (val && !prev) fetchProfiles()
    if (!val) loading.value = false
  },
)
</script>
