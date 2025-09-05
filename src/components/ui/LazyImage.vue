<template>
  <div 
    ref="imageContainer"
    class="lazy-image-container"
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- Loading State -->
    <div 
      v-if="isLoading && !hasError" 
      class="lazy-image-loading"
      :class="loadingClass"
      :style="imageStyle"
    >
      <slot name="loading">
        <div class="flex items-center justify-center h-full bg-gray-100">
          <div class="animate-pulse">
            <div class="bg-gray-300 rounded w-12 h-12 mb-2"></div>
            <div class="bg-gray-300 rounded h-2 w-16"></div>
          </div>
        </div>
      </slot>
    </div>
    
    <!-- Error State -->
    <div 
      v-if="hasError" 
      class="lazy-image-error"
      :class="errorClass"
      :style="imageStyle"
    >
      <slot name="error">
        <div class="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-500">
          <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm">Failed to load</span>
        </div>
      </slot>
    </div>
    
    <!-- Main Image -->
    <img
      v-if="!hasError"
      ref="imageElement"
      :src="currentSrc"
      :alt="alt"
      :class="[imageClass, { 'opacity-0': isLoading, 'opacity-100': !isLoading }]"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
      @click="handleClick"
    />
    
    <!-- Overlay slot -->
    <div v-if="$slots.overlay" class="absolute inset-0">
      <slot name="overlay" :loaded="!isLoading" :error="hasError" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  // Image props
  src: {
    type: String,
    required: true
  },
  
  alt: {
    type: String,
    default: ''
  },
  
  // Lazy loading
  lazy: {
    type: Boolean,
    default: true
  },
  
  // Placeholder/fallback
  placeholder: {
    type: String,
    default: ''
  },
  
  fallback: {
    type: String,
    default: ''
  },
  
  // Dimensions
  width: {
    type: [String, Number],
    default: 'auto'
  },
  
  height: {
    type: [String, Number],
    default: 'auto'
  },
  
  // Object fit
  objectFit: {
    type: String,
    default: 'cover',
    validator: (value) => ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(value)
  },
  
  objectPosition: {
    type: String,
    default: 'center'
  },
  
  // Styling
  rounded: {
    type: [String, Boolean],
    default: false
  },
  
  shadow: {
    type: [String, Boolean],
    default: false
  },
  
  // Classes
  containerClass: {
    type: String,
    default: ''
  },
  
  imageClass: {
    type: String,
    default: ''
  },
  
  loadingClass: {
    type: String,
    default: ''
  },
  
  errorClass: {
    type: String,
    default: ''
  },
  
  // Intersection Observer options
  rootMargin: {
    type: String,
    default: '50px'
  },
  
  threshold: {
    type: Number,
    default: 0.1
  },
  
  // Transition
  transition: {
    type: Boolean,
    default: true
  },
  
  // Click handler
  clickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load', 'error', 'click', 'intersect'])

// Refs
const imageContainer = ref(null)
const imageElement = ref(null)
const observer = ref(null)

// State
const isLoading = ref(true)
const hasError = ref(false)
const isIntersecting = ref(false)
const currentSrc = ref('')

// Computed
const containerStyle = computed(() => {
  const style = {}
  
  if (props.width !== 'auto') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height !== 'auto') {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})

const imageStyle = computed(() => {
  const style = {
    width: '100%',
    height: '100%',
    objectFit: props.objectFit,
    objectPosition: props.objectPosition
  }
  
  if (props.transition) {
    style.transition = 'opacity 0.3s ease-in-out'
  }
  
  if (props.rounded) {
    if (typeof props.rounded === 'string') {
      style.borderRadius = props.rounded
    } else {
      style.borderRadius = '0.5rem'
    }
  }
  
  if (props.shadow) {
    if (typeof props.shadow === 'string') {
      style.boxShadow = props.shadow
    } else {
      style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  }
  
  if (props.clickable) {
    style.cursor = 'pointer'
  }
  
  return style
})

// Methods
const loadImage = () => {
  if (!props.src) return
  
  isLoading.value = true
  hasError.value = false
  
  // Use placeholder initially if provided
  if (props.placeholder && !currentSrc.value) {
    currentSrc.value = props.placeholder
  } else {
    currentSrc.value = props.src
  }
}

const handleLoad = (event) => {
  isLoading.value = false
  emit('load', event)
}

const handleError = (event) => {
  isLoading.value = false
  hasError.value = true
  
  // Try fallback image
  if (props.fallback && currentSrc.value !== props.fallback) {
    currentSrc.value = props.fallback
    hasError.value = false
    return
  }
  
  emit('error', event)
}

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleIntersection = (entries) => {
  const entry = entries[0]
  isIntersecting.value = entry.isIntersecting
  
  if (entry.isIntersecting) {
    loadImage()
    observer.value?.disconnect()
    emit('intersect', entry)
  }
}

const setupIntersectionObserver = () => {
  if (!props.lazy || !imageContainer.value) return
  
  observer.value = new IntersectionObserver(handleIntersection, {
    rootMargin: props.rootMargin,
    threshold: props.threshold
  })
  
  observer.value.observe(imageContainer.value)
}

const retry = () => {
  hasError.value = false
  loadImage()
}

// Public methods
defineExpose({
  retry,
  isLoading: computed(() => isLoading.value),
  hasError: computed(() => hasError.value),
  isIntersecting: computed(() => isIntersecting.value)
})

// Watch src changes
watch(() => props.src, () => {
  if (!props.lazy || isIntersecting.value) {
    loadImage()
  }
})

// Lifecycle
onMounted(async () => {
  await nextTick()
  
  if (props.lazy) {
    setupIntersectionObserver()
  } else {
    loadImage()
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.lazy-image-loading,
.lazy-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.lazy-image-container:hover img {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 640px) {
  .lazy-image-container {
    width: 100% !important;
  }
}
</style>
