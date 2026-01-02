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
              <label for="password" class="block text-sm font-medium text-white">Password</label>
              <input id="password" v-model="password" type="password" required autocomplete="current-password"
                class="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white placeholder-white/70 focus:border-white focus:ring-2 focus:ring-white/70 outline-none transition"
                placeholder="Masukkan password" />
            </div>
            <p v-if="error" class="text-sm text-red-100">{{ error }}</p>
            <button type="submit"
              class="w-full rounded-xl bg-[#EE7A13] text-primary-700 font-semibold py-3.5 transition hover:bg-primary-50 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99]">
              Masuk
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
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const error = ref('')

const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD

const handleSubmit = () => {
  if (!SITE_PASSWORD) {
    error.value = 'Konfigurasi password belum disetel.'
    return
  }

  if (password.value === SITE_PASSWORD) {
    localStorage.setItem('auth', 'true')
    error.value = ''
    router.replace({ name: 'Home' })
    return
  }

  error.value = 'Password salah. Coba lagi.'
}
</script>
