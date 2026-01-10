<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="handleClose"></div>
      <div class="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
        <header class="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Edit</p>
            <h2 class="text-lg font-semibold text-white">{{ title }}</h2>
          </div>
          <button
            type="button"
            class="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200 hover:bg-white/5"
            @click="handleClose"
            :disabled="loading"
          >
            Tutup
          </button>
        </header>

        <form class="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-4" @submit.prevent="handleSubmit">
          <div v-for="field in fields" :key="field.key" class="space-y-2">
            <label class="block text-sm font-medium text-slate-200">
              {{ field.label }}
              <span v-if="field.required" class="text-red-300">*</span>
            </label>

            <template v-if="field.type === 'textarea'">
              <textarea
                v-model="formState[field.key]"
                :placeholder="field.placeholder || ''"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                rows="3"
              ></textarea>
            </template>

            <template v-else-if="field.type === 'select'">
              <select
                v-model="formState[field.key]"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="">Pilih</option>
                <option v-for="opt in field.options || []" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </template>

            <template v-else-if="field.type === 'number'">
              <input
                v-model.number="numberModels[field.key]"
                type="number"
                :placeholder="field.placeholder || ''"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                step="1"
              />
            </template>

            <template v-else>
              <input
                v-model="formState[field.key]"
                :type="field.type || 'text'"
                :placeholder="field.placeholder || ''"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
            </template>
          </div>

          <footer class="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              class="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5 disabled:opacity-60"
              @click="handleClose"
              :disabled="loading"
            >
              Batal
            </button>
            <button
              type="submit"
              class="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-300 disabled:opacity-60"
              :disabled="loading"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </footer>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Edit Data' },
  initialData: { type: Object, default: () => ({}) },
  fields: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'submit'])

const formState = reactive({})
const numberModels = reactive({})

const resetState = (payload = {}) => {
  Object.keys(formState).forEach((key) => delete formState[key])
  Object.keys(numberModels).forEach((key) => delete numberModels[key])

  const source = payload || {}
  props.fields.forEach((field) => {
    const value = source[field.key]
    if (field.type === 'number') {
      numberModels[field.key] = value ?? ''
      formState[field.key] = value ?? null
    } else {
      formState[field.key] = value ?? ''
    }
  })
}

watch(
  () => props.initialData,
  (val) => resetState(val),
  { immediate: true, deep: true },
)

watch(
  () => props.open,
  (open) => {
    if (!open) resetState(props.initialData)
  },
)

const handleClose = () => {
  if (props.loading) return
  emit('close')
  resetState(props.initialData)
}

const handleSubmit = () => {
  if (props.loading) return
  props.fields.forEach((field) => {
    if (field.type === 'number') {
      const parsed = Number(numberModels[field.key])
      formState[field.key] = Number.isNaN(parsed) ? null : parsed
    }
  })
  emit('submit', { ...formState })
}
</script>
