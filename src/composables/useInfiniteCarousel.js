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


  const getSlidesContainerElement = () => {
    if (slidesContainerRef?.value?.$refs?.slidesContainer) {
      return slidesContainerRef.value.$refs.slidesContainer
    }
    return null
  }

  const initializeExtendedSlides = () => {
    extendedSlides.value = [
      ...slides.value.slice(-duplicateCount),
      ...slides.value,
      ...slides.value.slice(0, duplicateCount)
    ]
  }


  const getCurrentSlideIndex = () => {
    const index = currentSlide.value - duplicateCount
    if (index < 0) return realSlideCount.value - 1
    if (index >= realSlideCount.value) return 0
    return index
  }


  const nextSlide = () => {
    if (isTransitioning.value) return

    isTransitioning.value = true

  
    setTimeout(() => {
      currentSlide.value++

    
      setTimeout(() => {
        if (currentSlide.value >= realSlideCount.value + duplicateCount) {
        
          const containerElement = getSlidesContainerElement()
          if (containerElement) {
            containerElement.style.transition = 'none'
            currentSlide.value = duplicateCount
          
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

  
    setTimeout(() => {
      currentSlide.value--

    
      setTimeout(() => {
        if (currentSlide.value < duplicateCount) {
        
          const containerElement = getSlidesContainerElement()
          if (containerElement) {
            containerElement.style.transition = 'none'
            currentSlide.value = realSlideCount.value + duplicateCount - 1
          
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

  
    setTimeout(() => {
      currentSlide.value = index + duplicateCount

    
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