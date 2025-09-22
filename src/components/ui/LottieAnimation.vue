<template>
  <div 
    ref="lottieContainer" 
    class="lottie-animation"
    :style="containerStyle"
  >
    <!-- Fallback jika animation tidak tersedia -->
    <div 
      v-if="!animationData" 
      class="flex items-center justify-center bg-gray-100 rounded-lg"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <div class="text-center text-gray-500">
        <div class="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-sm">Animation</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  animationData: {
    type: [Object, String],
    default: null
  },
  
  width: {
    type: Number,
    default: 200
  },
  
  height: {
    type: Number,
    default: 200
  },
  
  loop: {
    type: Boolean,
    default: true
  },
  
  autoplay: {
    type: Boolean,
    default: true
  },
  
  speed: {
    type: Number,
    default: 1
  },
  
  direction: {
    type: Number,
    default: 1, // 1 = forward, -1 = reverse
    validator: (value) => [1, -1].includes(value)
  },
  
  hover: {
    type: Boolean,
    default: false
  },
  
  renderer: {
    type: String,
    default: 'svg',
    validator: (value) => ['svg', 'canvas', 'html'].includes(value)
  }
})

const emit = defineEmits(['ready', 'play', 'pause', 'complete', 'error'])

const lottieContainer = ref(null)
const lottieInstance = ref(null)
const isPlaying = ref(false)
const isLoaded = ref(false)

const containerStyle = computed(() => ({
  width: props.width + 'px',
  height: props.height + 'px',
  display: 'inline-block'
}))

// Load Lottie library dynamically
const loadLottie = async () => {
  try {
    // Try to load lottie-web
    const lottie = await import('lottie-web')
    return lottie.default
  } catch (error) {
    console.warn('Lottie library not found. Using fallback.')
    return null
  }
}

const initLottie = async () => {
  if (!props.animationData || !lottieContainer.value) return
  
  const lottie = await loadLottie()
  if (!lottie) return
  
  try {
    // Destroy previous instance
    if (lottieInstance.value) {
      lottieInstance.value.destroy()
    }
    
    // Create new instance
    lottieInstance.value = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: props.renderer,
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })
    
    // Set speed and direction
    lottieInstance.value.setSpeed(props.speed)
    lottieInstance.value.setDirection(props.direction)
    
    // Event listeners
    lottieInstance.value.addEventListener('data_ready', () => {
      isLoaded.value = true
      emit('ready', lottieInstance.value)
    })
    
    lottieInstance.value.addEventListener('enterFrame', () => {
      isPlaying.value = true
    })
    
    lottieInstance.value.addEventListener('complete', () => {
      isPlaying.value = false
      emit('complete', lottieInstance.value)
    })
    
    lottieInstance.value.addEventListener('data_failed', (error) => {
      emit('error', error)
    })
    
  } catch (error) {
    console.error('Error initializing Lottie animation:', error)
    emit('error', error)
  }
}

// Public methods
const play = () => {
  if (lottieInstance.value) {
    lottieInstance.value.play()
    isPlaying.value = true
    emit('play')
  }
}

const pause = () => {
  if (lottieInstance.value) {
    lottieInstance.value.pause()
    isPlaying.value = false
    emit('pause')
  }
}

const stop = () => {
  if (lottieInstance.value) {
    lottieInstance.value.stop()
    isPlaying.value = false
  }
}

const goToAndStop = (frame) => {
  if (lottieInstance.value) {
    lottieInstance.value.goToAndStop(frame, true)
  }
}

const goToAndPlay = (frame) => {
  if (lottieInstance.value) {
    lottieInstance.value.goToAndPlay(frame, true)
  }
}

const setSpeed = (speed) => {
  if (lottieInstance.value) {
    lottieInstance.value.setSpeed(speed)
  }
}

const setDirection = (direction) => {
  if (lottieInstance.value) {
    lottieInstance.value.setDirection(direction)
  }
}

// Hover handlers
const handleMouseEnter = () => {
  if (props.hover && !isPlaying.value) {
    play()
  }
}

const handleMouseLeave = () => {
  if (props.hover && isPlaying.value) {
    pause()
  }
}

// Expose methods
defineExpose({
  play,
  pause,
  stop,
  goToAndStop,
  goToAndPlay,
  setSpeed,
  setDirection,
  lottieInstance: computed(() => lottieInstance.value),
  isPlaying: computed(() => isPlaying.value),
  isLoaded: computed(() => isLoaded.value)
})

// Watch for prop changes
watch(() => props.animationData, () => {
  initLottie()
}, { immediate: false })

watch(() => props.speed, (newSpeed) => {
  setSpeed(newSpeed)
})

watch(() => props.direction, (newDirection) => {
  setDirection(newDirection)
})

onMounted(() => {
  initLottie()
  
  if (props.hover && lottieContainer.value) {
    lottieContainer.value.addEventListener('mouseenter', handleMouseEnter)
    lottieContainer.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  if (lottieInstance.value) {
    lottieInstance.value.destroy()
  }
  
  if (props.hover && lottieContainer.value) {
    lottieContainer.value.removeEventListener('mouseenter', handleMouseEnter)
    lottieContainer.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style scoped>
.lottie-animation {
  display: inline-block;
  max-width: 100%;
  height: auto;
}

/* Smooth loading state */
.lottie-animation[data-loading="true"] {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.lottie-animation[data-loaded="true"] {
  opacity: 1;
}
</style>
