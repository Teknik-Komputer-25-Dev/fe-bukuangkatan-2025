/**
 * Infinite Carousel Composable
 * Handles infinite carousel logic with seamless looping
 */

import { ref, computed } from 'vue'
import { carouselConfig } from '@/data/vencoboltCarousel.js'

export function useInfiniteCarousel(slides, slidesContainerRef = null) {
  const extendedSlides = ref([])
  const currentSlide = ref(carouselConfig.duplicateCount)
  const isTransitioning = ref(false)
  
  const realSlideCount = computed(() => slides.value.length)
  const { duplicateCount } = carouselConfig

  // Get the actual DOM element for seamless transitions
  const getSlidesContainerElement = () => {
    if (slidesContainerRef?.value?.$refs?.slidesContainer) {
      return slidesContainerRef.value.$refs.slidesContainer
    }
    return null
  }

  // Initialize extended slides array for infinite loop
  const initializeExtendedSlides = () => {
    extendedSlides.value = [
      ...slides.value.slice(-duplicateCount), // Last slide(s) at the beginning
      ...slides.value, // Original slides
      ...slides.value.slice(0, duplicateCount) // First slide(s) at the end
    ]
  }

  // Get current slide index for indicators
  const getCurrentSlideIndex = () => {
    const index = currentSlide.value - duplicateCount
    if (index < 0) return realSlideCount.value - 1
    if (index >= realSlideCount.value) return 0
    return index
  }

  // Navigation functions
  const nextSlide = () => {
    if (isTransitioning.value) return

    isTransitioning.value = true

    // Wait for description to fade out, then change slide
    setTimeout(() => {
      currentSlide.value++

      // If we've moved past the last real slide, jump to the first real slide
      setTimeout(() => {
        if (currentSlide.value >= realSlideCount.value + duplicateCount) {
          // Temporarily disable transition for seamless jump
          const containerElement = getSlidesContainerElement()
          if (containerElement) {
            containerElement.style.transition = 'none'
            currentSlide.value = duplicateCount
            // Re-enable transition after jump
            setTimeout(() => {
              containerElement.style.transition = `transform ${carouselConfig.transitionDuration}ms ease-in-out`
              isTransitioning.value = false
            }, 50)
          } else {
            currentSlide.value = duplicateCount
            isTransitioning.value = false
          }
        } else {
          isTransitioning.value = false
        }
      }, 200)
    }, carouselConfig.fadeOutDelay)
  }

  const prevSlide = () => {
    if (isTransitioning.value) return

    isTransitioning.value = true

    // Wait for description to fade out, then change slide
    setTimeout(() => {
      currentSlide.value--

      // If we've moved before the first real slide, jump to the last real slide
      setTimeout(() => {
        if (currentSlide.value < duplicateCount) {
          // Temporarily disable transition for seamless jump
          const containerElement = getSlidesContainerElement()
          if (containerElement) {
            containerElement.style.transition = 'none'
            currentSlide.value = realSlideCount.value + duplicateCount - 1
            // Re-enable transition after jump
            setTimeout(() => {
              containerElement.style.transition = `transform ${carouselConfig.transitionDuration}ms ease-in-out`
              isTransitioning.value = false
            }, 50)
          } else {
            currentSlide.value = realSlideCount.value + duplicateCount - 1
            isTransitioning.value = false
          }
        } else {
          isTransitioning.value = false
        }
      }, 200)
    }, carouselConfig.fadeOutDelay)
  }

  const goToSlide = (index) => {
    if (isTransitioning.value) return

    isTransitioning.value = true

    // Wait for description to fade out, then change slide
    setTimeout(() => {
      currentSlide.value = index + duplicateCount

      // Description fades back in after slide change
      setTimeout(() => {
        isTransitioning.value = false
      }, 200)
    }, carouselConfig.fadeOutDelay)
  }

  return {
    extendedSlides,
    currentSlide,
    isTransitioning,
    getCurrentSlideIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    initializeExtendedSlides
  }
}