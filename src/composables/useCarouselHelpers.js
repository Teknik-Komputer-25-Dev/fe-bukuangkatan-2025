export function useCarouselHelpers() {
  // Helper untuk generate key pada v-for
  const getSlideKey = (item, index, keyField = null) => {
    if (keyField && item[keyField]) {
      return item[keyField]
    }
    return index
  }

  // Helper untuk responsive breakpoints
  const generateResponsiveBreakpoints = (slidesPerView, spaceBetween, customBreakpoints = {}) => {
    const defaultBreakpoints = {
      320: {
        slidesPerView: typeof slidesPerView === 'number' ? Math.max(1, slidesPerView - 2) : 1,
        spaceBetween: Math.max(10, spaceBetween - 20)
      },
      640: {
        slidesPerView: typeof slidesPerView === 'number' ? Math.max(1, slidesPerView - 1) : 1,
        spaceBetween: Math.max(15, spaceBetween - 15)
      },
      768: {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween
      }
    }
    
    return { ...defaultBreakpoints, ...customBreakpoints }
  }

  // Helper untuk effect configurations
  const getEffectConfig = (effectType) => {
    const configs = {
      fade: { crossFade: true },
      cube: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
      },
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    }
    
    return configs[effectType] || undefined
  }

  // Helper untuk autoplay configuration
  const getAutoplayConfig = (autoplayProp) => {
    if (!autoplayProp) return false
    
    const defaultConfig = {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }
    
    if (typeof autoplayProp === 'boolean') {
      return defaultConfig
    }
    
    return { ...defaultConfig, ...autoplayProp }
  }

  // Helper untuk pagination configuration
  const getPaginationConfig = (paginationProp, customPagination = false) => {
    if (!paginationProp || customPagination) return false
    
    const defaultConfig = {
      clickable: true,
      dynamicBullets: true
    }
    
    if (typeof paginationProp === 'boolean') {
      return defaultConfig
    }
    
    return { ...defaultConfig, ...paginationProp }
  }

  return {
    getSlideKey,
    generateResponsiveBreakpoints,
    getEffectConfig,
    getAutoplayConfig,
    getPaginationConfig
  }
}
