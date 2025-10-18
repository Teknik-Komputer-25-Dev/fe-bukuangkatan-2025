<template>
  <button 
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur border border-white/30 rounded-full text-white text-xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center z-50 hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg"
    aria-label="Kembali ke atas"
  >
    ↑
  </button>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'BackToTopButton',
  setup() {
    const isVisible = ref(false)

    const handleScroll = () => {
      isVisible.value = window.scrollY > 300
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isVisible,
      scrollToTop
    }
  }
}
</script>

