/**
 * Carousel Drag Composable
 * Handles mouse and touch drag interactions
 */

import { ref, onUnmounted } from 'vue'
import { carouselConfig } from '@/data/vencoboltCarousel.js'

export function useCarouselDrag(nextSlide, prevSlide) {
  const isDragging = ref(false)
  const startX = ref(0)
  const currentX = ref(0)

  const startDrag = (e) => {
    isDragging.value = true
    startX.value = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
    
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', endDrag)
    document.addEventListener('touchmove', onDrag)
    document.addEventListener('touchend', endDrag)
  }

  const onDrag = (e) => {
    if (!isDragging.value) return
    e.preventDefault()
    currentX.value = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX.value
  }

  const endDrag = () => {
    if (!isDragging.value) return
    isDragging.value = false

    if (currentX.value > carouselConfig.dragThreshold) {
      prevSlide()
    } else if (currentX.value < -carouselConfig.dragThreshold) {
      nextSlide()
    }

    currentX.value = 0
    cleanupListeners()
  }

  const cleanupListeners = () => {
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', endDrag)
    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('touchend', endDrag)
  }

  // Cleanup on unmount
  onUnmounted(() => {
    cleanupListeners()
  })

  return {
    isDragging,
    startDrag
  }
}