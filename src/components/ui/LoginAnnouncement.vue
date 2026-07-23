<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden p-6 sm:p-8 transform transition-all">
        <!-- Decoration bubbles -->
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/30 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        
        <div class="relative z-10 flex flex-col items-center text-center space-y-4">
          <div class="flex items-center justify-center mb-1">
            <img src="/images/Logo/full-logo.png" alt="Venco Logo" class="h-16 w-auto object-contain drop-shadow-lg" />
          </div>
          
          <h2 class="text-2xl font-bold text-white tracking-wide">Info Update Login!</h2>
          
          <p class="text-white/90 text-sm sm:text-base leading-relaxed">
            Halo Venco! Buat yang ngerasa nunggu Magic Link kelamaan, sekarang login buku angkatan udah pindah pake <strong>Google Login</strong> biar lebih sat-set. <br><br>
            Tinggal klik tombol login Google di belakang, masukin kode keamanan angkatan kalau baru pertama kali, and <em>you're in!</em>
          </p>
          
          <div class="w-full pt-4 space-y-4">
            <label class="flex items-center justify-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="dontShowAgain" class="rounded border-white/40 bg-white/10 text-[#EE7A13] focus:ring-0 w-4 h-4 cursor-pointer accent-[#EE7A13]">
              <span class="text-sm text-white/80 group-hover:text-white transition select-none">Oke paham, jangan munculin lagi ya</span>
            </label>
            
            <button @click="closeAnnouncement" class="w-full rounded-xl bg-[#EE7A13] text-white font-bold py-3 transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.99] shadow-lg">
              Siapp, Ngerti!
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const dontShowAgain = ref(false)

const LOCAL_STORAGE_KEY = 'venco_hide_login_announcement'

onMounted(() => {
  const isHidden = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true'
  if (!isHidden) {
    // Kasih sedikit delay biar smooth munculnya setelah page render
    setTimeout(() => {
      isVisible.value = true
    }, 400)
  }
})

const closeAnnouncement = () => {
  if (dontShowAgain.value) {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
  }
  isVisible.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
