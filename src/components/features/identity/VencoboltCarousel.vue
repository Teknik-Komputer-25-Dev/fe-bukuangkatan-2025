<template>
  <section class="relative w-full min-h-screen py-8 lg:py-16">
    <!-- Title Header -->
    <CarouselTitle title="VENCOBOLT" />

    <!-- Desktop Preview Images -->
    <DesktopPreviewImages 
      :prev-image="getPrevImage()"
      :next-image="getNextImage()"
      :prev-alt="getPrevImageAlt()"
      :next-alt="getNextImageAlt()"
      @prev-slide="prevSlide"
      @next-slide="nextSlide"
    />

    <!-- Main Carousel Container -->
    <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      <!-- Slides Container -->
      <SlidesContainer
        ref="slidesContainerComponent"
        :extended-slides="extendedSlides"
        :current-slide="currentSlide"
        :is-transitioning="isTransitioning"
        :current-slide-index="getCurrentSlideIndex()"
        :get-tag-description="getTagDescription"
        @start-drag="startDrag"
        @next-slide="nextSlide"
      />

      <!-- Navigation Controls -->
      <CarouselIndicators
        :slides="slides"
        :current-slide-index="getCurrentSlideIndex()"
        @go-to-slide="goToSlide"
      />

      <!-- <MobileNavigationControls
        @prev-slide="prevSlide"
        @next-slide="nextSlide"
      /> -->
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CarouselTitle from './VencoboltCarousel/CarouselTitle.vue'
import DesktopPreviewImages from './VencoboltCarousel/DesktopPreviewImages.vue'
import SlidesContainer from './VencoboltCarousel/SlidesContainer.vue'
import CarouselIndicators from './VencoboltCarousel/CarouselIndicators.vue'
import MobileNavigationControls from './VencoboltCarousel/MobileNavigationControls.vue'
import { vencoboltCarouselData, tagDescriptions } from '@/data/vencoboltCarousel.js'
import { useInfiniteCarousel } from '@/composables/useInfiniteCarousel.js'
import { useCarouselDrag } from '@/composables/useCarouselDrag.js'
import { useKeyboardNavigation } from '@/composables/useKeyboardNavigation.js'

const slides = ref(vencoboltCarouselData)
const slidesContainerComponent = ref(null)

const {
  extendedSlides,
  currentSlide,
  isTransitioning,
  getCurrentSlideIndex,
  nextSlide,
  prevSlide,
  goToSlide,
  initializeExtendedSlides
} = useInfiniteCarousel(slides, slidesContainerComponent)

const {
  startDrag
} = useCarouselDrag(nextSlide, prevSlide)

const getTagDescription = (tag) => tagDescriptions[tag] || ""

const getPrevImage = () => {
  const currentIndex = getCurrentSlideIndex()
  const prevIndex = currentIndex === 0 ? slides.value.length - 1 : currentIndex - 1
  return slides.value[prevIndex]?.image || ''
}

const getPrevImageAlt = () => {
  const currentIndex = getCurrentSlideIndex()
  const prevIndex = currentIndex === 0 ? slides.value.length - 1 : currentIndex - 1
  return slides.value[prevIndex]?.imageAlt || ''
}

const getNextImage = () => {
  const currentIndex = getCurrentSlideIndex()
  const nextIndex = (currentIndex + 1) % slides.value.length
  return slides.value[nextIndex]?.image || ''
}

const getNextImageAlt = () => {
  const currentIndex = getCurrentSlideIndex()
  const nextIndex = (currentIndex + 1) % slides.value.length
  return slides.value[nextIndex]?.imageAlt || ''
}

useKeyboardNavigation(prevSlide, nextSlide)

onMounted(() => {
  initializeExtendedSlides()
})
</script>

