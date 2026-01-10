<template>
  <section
    class="min-h-screen bg-gradient-to-br from-primary-500 via-primary-400 to-orange-200 text-white flex items-center justify-center px-6 py-12"
    style="background-image: url('/images/Desktop - 8.png')">
    <div
      class="w-full max-w-6xl bg-white/10 border border-white/20 rounded-3xl shadow-brand-lg backdrop-blur-lg overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div class="px-6 sm:px-10 lg:px-14 py-10 lg:py-16 flex flex-col justify-center space-y-8">
          <div class="space-y-3">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Akses Buku Angkatan</p>
            <h1 class="text-3xl sm:text-4xl font-semibold leading-tight text-white">
              Hai Venco, login dulu yuk untuk akses buku angkatan kita
            </h1>
            <p class="text-base sm:text-lg text-white/80 leading-relaxed">
              Lesgo </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5" aria-label="Form login buku angkatan">
            <div class="space-y-2">
              <label for="accessCode" class="block text-sm font-medium text-white">Access Code</label>
              <input id="accessCode" v-model="accessCode" type="password" required autocomplete="off"
                class="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/70 outline-none transition"
                placeholder="Masukkan access code" />
            </div>

            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-white">Email </label>
              <input id="email" v-model="email" type="email" required autocomplete="email"
                class="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/70 outline-none transition"
                placeholder="nama@students.undip.ac.id" />
            </div>

            <p v-if="error" class="text-sm text-red-100">{{ error }}</p>
            <p v-if="success" class="text-sm text-emerald-100">{{ success }}</p>

            <button type="submit" :disabled="loading"
              class="w-full rounded-xl bg-[#EE7A13] text-primary-700 font-semibold py-3.5 transition hover:bg-primary-50 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed">
              <span v-if="loading">Mengirim magic link...</span>
              <span v-else>Kirim Magic Link</span>
            </button>
          </form>
        </div>

        <div class="relative hidden lg:block bg-white/5">
          <div class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5"></div>
          <div class="h-full flex items-center justify-center p-12">
            <img src="/images/mascott.png" alt="Maskot Venco menyambut untuk login"
              class="max-h-[480px] w-auto object-contain drop-shadow-2xl" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const accessCode = ref('')
const email = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  const emailValue = email.value.trim().toLowerCase()
  const codeValue = accessCode.value.trim()

  if (!emailValue || !codeValue) {
    error.value = 'Email dan access code wajib diisi.'
    return
  }

  loading.value = true

  try {
    const { data, error: supabaseError } = await supabase.functions.invoke('request-magic-link', {
      body: { email: emailValue, accessCode: codeValue },
    })

    if (supabaseError) {
      let errorMessage = 'Gagal mengirim magic link.'

      if (supabaseError instanceof FunctionsHttpError) {

        try {
          const errorDetails = await supabaseError.context.json()
          errorMessage = errorDetails.message || 'Error dari server.'
        } catch {
          errorMessage = 'Error server tidak valid.'
        }
      } else if (supabaseError instanceof FunctionsRelayError) {

        errorMessage = `Relay error: ${supabaseError.message}`
      } else if (supabaseError instanceof FunctionsFetchError) {

        errorMessage = `Network error: ${supabaseError.message}`
      } else {

        errorMessage = supabaseError.message || errorMessage
      }

      throw new Error(errorMessage)
    }
    success.value = data?.message || 'Magic link sudah dikirim ke email kamu. Cek inbox/spam.'
    accessCode.value = ''
  } catch (err) {
    error.value = err?.message || 'Gagal mengirim magic link.'
  } finally {
    loading.value = false
  }
}
</script>
