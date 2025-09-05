import { ref, computed, watch, nextTick } from 'vue'
import { 
  Navigation, 
  Pagination, 
  Autoplay, 
  EffectFade, 
  EffectCube, 
  EffectCoverflow,
  Thumbs
} from 'swiper/modules'

export function useSwiper(props, emit) {
  // Refs
  const swiperInstance = ref(null)
  const activeIndex = ref(0)
  const canSlidePrev = ref(true)
  const canSlideNext = ref(true)

  // Computed configurations
  const swiperModules = computed(() => {
    const modules = []
    if (props.navigation && !props.customNavigation) modules.push(Navigation)
    if (props.pagination && !props.customPagination) modules.push(Pagination)
    if (props.autoplay) modules.push(Autoplay)
    if (props.effect === 'fade') modules.push(EffectFade)
    if (props.effect === 'cube') modules.push(EffectCube)
    if (props.effect === 'coverflow') modules.push(EffectCoverflow)
    return modules
  })

  const autoplayConfig = computed(() => {
    if (!props.autoplay) return false
    
    if (typeof props.autoplay === 'boolean') {
      return {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    }
    
    return {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      ...props.autoplay
    }
  })

  const paginationConfig = computed(() => {
    if (!props.pagination || props.customPagination) return false
    
    if (typeof props.pagination === 'boolean') {
      return {
        clickable: true,
        dynamicBullets: true
      }
    }
    
    return {
      clickable: true,
      dynamicBullets: true,
      ...props.pagination
    }
  })

  const breakpointsConfig = computed(() => {
    const defaultBreakpoints = {
      320: {
        slidesPerView: typeof props.slidesPerView === 'number' ? Math.max(1, props.slidesPerView - 2) : 1,
        spaceBetween: Math.max(10, props.spaceBetween - 20)
      },
      640: {
        slidesPerView: typeof props.slidesPerView === 'number' ? Math.max(1, props.slidesPerView - 1) : 1,
        spaceBetween: Math.max(15, props.spaceBetween - 15)
      },
      768: {
        slidesPerView: props.slidesPerView,
        spaceBetween: props.spaceBetween
      }
    }
    
    return { ...defaultBreakpoints, ...props.breakpoints }
  })

  const fadeConfig = computed(() => {
    if (props.effect !== 'fade') return undefined
    return { crossFade: true }
  })

  const cubeConfig = computed(() => {
    if (props.effect !== 'cube') return undefined
    return {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  })

  const coverflowConfig = computed(() => {
    if (props.effect !== 'coverflow') return undefined
    return {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  })

  // Methods
  const updateNavigationState = () => {
    if (!swiperInstance.value) return
    
    canSlidePrev.value = !swiperInstance.value.isBeginning || props.loop
    canSlideNext.value = !swiperInstance.value.isEnd || props.loop
  }

  const onSwiper = (swiper) => {
    swiperInstance.value = swiper
    updateNavigationState()
    emit('swiper', swiper)
  }

  const onSlideChange = (swiper) => {
    activeIndex.value = swiper.realIndex || swiper.activeIndex
    updateNavigationState()
    emit('slide-change', {
      swiper,
      activeIndex: activeIndex.value,
      activeItem: props.items[activeIndex.value]
    })
  }

  const onReachEnd = (swiper) => {
    updateNavigationState()
    emit('reach-end', swiper)
  }

  const onReachBeginning = (swiper) => {
    updateNavigationState()
    emit('reach-beginning', swiper)
  }

  const slidePrev = () => {
    if (swiperInstance.value && canSlidePrev.value) {
      swiperInstance.value.slidePrev()
      emit('prev-click')
    }
  }

  const slideNext = () => {
    if (swiperInstance.value && canSlideNext.value) {
      swiperInstance.value.slideNext()
      emit('next-click')
    }
  }

  const slideTo = (index) => {
    if (swiperInstance.value) {
      swiperInstance.value.slideTo(index)
      emit('bullet-click', { index, item: props.items[index] })
    }
  }

  // Public methods
  const goToSlide = (index) => slideTo(index)
  const nextSlide = () => slideNext()
  const prevSlide = () => slidePrev()
  const getCurrentSlide = () => activeIndex.value
  const getSwiperInstance = () => swiperInstance.value

  // Watch for items changes
  watch(() => props.items, () => {
    nextTick(() => {
      if (swiperInstance.value) {
        swiperInstance.value.update()
      }
    })
  }, { deep: true })

  return {
    // Refs
    swiperInstance,
    activeIndex,
    canSlidePrev,
    canSlideNext,
    
    // Computed
    swiperModules,
    autoplayConfig,
    paginationConfig,
    breakpointsConfig,
    fadeConfig,
    cubeConfig,
    coverflowConfig,
    
    // Methods
    onSwiper,
    onSlideChange,
    onReachEnd,
    onReachBeginning,
    slidePrev,
    slideNext,
    slideTo,
    
    // Public methods
    goToSlide,
    nextSlide,
    prevSlide,
    getCurrentSlide,
    getSwiperInstance
  }
}
