import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Composable untuk scroll animations dan scroll-related functionality
 * @param {Object} options - Configuration options
 * @returns {Object} Scroll utilities and reactive values
 */
export function useScrollAnimations(options = {}) {
  const {
    throttle = 16, // ~60fps
    offset = 0,
    smooth = true
  } = options

  // Reactive values
  const scrollY = ref(0)
  const scrollX = ref(0)
  const isScrolling = ref(false)
  const scrollDirection = ref('down') // 'up' | 'down' | 'left' | 'right'
  const previousScrollY = ref(0)
  const previousScrollX = ref(0)

  // Scroll state
  const isAtTop = computed(() => scrollY.value <= offset)
  const isAtBottom = computed(() => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    return scrollY.value + windowHeight >= documentHeight - offset
  })

  // Throttling
  let ticking = false
  let scrollTimeout = null

  /**
   * Update scroll values
   */
  const updateScrollValues = () => {
    const newScrollY = window.pageYOffset || document.documentElement.scrollTop
    const newScrollX = window.pageXOffset || document.documentElement.scrollLeft

    // Determine scroll direction
    if (newScrollY > previousScrollY.value) {
      scrollDirection.value = 'down'
    } else if (newScrollY < previousScrollY.value) {
      scrollDirection.value = 'up'
    }

    if (newScrollX > previousScrollX.value) {
      scrollDirection.value = 'right'
    } else if (newScrollX < previousScrollX.value) {
      scrollDirection.value = 'left'
    }

    // Update values
    previousScrollY.value = scrollY.value
    previousScrollX.value = scrollX.value
    scrollY.value = newScrollY
    scrollX.value = newScrollX

    // Set scrolling state
    isScrolling.value = true
    
    // Clear previous timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    // Set scroll end detection
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 150)

    ticking = false
  }

  /**
   * Throttled scroll handler
   */
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollValues)
      ticking = true
    }
  }

  /**
   * Scroll to specific position
   * @param {number} top - Y position
   * @param {number} left - X position (optional)
   * @param {Object} options - Scroll options
   */
  const scrollTo = (top, left = 0, scrollOptions = {}) => {
    const defaultOptions = {
      behavior: smooth ? 'smooth' : 'auto',
      top,
      left
    }

    window.scrollTo({ ...defaultOptions, ...scrollOptions })
  }

  /**
   * Scroll to element
   * @param {string|Element} target - Element selector or element
   * @param {Object} options - Scroll options
   */
  const scrollToElement = (target, scrollOptions = {}) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    
    if (!element) {
      console.warn(`Element not found: ${target}`)
      return
    }

    const elementTop = element.offsetTop - offset
    scrollTo(elementTop, 0, scrollOptions)
  }

  /**
   * Scroll to top of page
   */
  const scrollToTop = (scrollOptions = {}) => {
    scrollTo(0, 0, scrollOptions)
  }

  /**
   * Scroll by amount
   * @param {number} deltaY - Y scroll amount
   * @param {number} deltaX - X scroll amount (optional)
   */
  const scrollBy = (deltaY, deltaX = 0) => {
    window.scrollBy({
      top: deltaY,
      left: deltaX,
      behavior: smooth ? 'smooth' : 'auto'
    })
  }

  /**
   * Get scroll progress (0-1)
   */
  const getScrollProgress = computed(() => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const maxScroll = documentHeight - windowHeight
    
    if (maxScroll <= 0) return 0
    
    return Math.min(scrollY.value / maxScroll, 1)
  })

  /**
   * Get element scroll progress
   * @param {Element} element - Target element
   */
  const getElementScrollProgress = (element) => {
    if (!element) return 0

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // Element completely above viewport
    if (rect.bottom < 0) return 1

    // Element completely below viewport
    if (rect.top > windowHeight) return 0

    // Element in viewport
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    return visibleHeight / Math.min(elementHeight, windowHeight)
  }

  /**
   * Parallax effect calculator
   * @param {number} speed - Parallax speed multiplier (0-1)
   */
  const getParallaxOffset = (speed = 0.5) => {
    return scrollY.value * speed
  }

  /**
   * Check if element is in viewport
   * @param {Element} element - Target element
   * @param {number} threshold - Intersection threshold (0-1)
   */
  const isElementInViewport = (element, threshold = 0.1) => {
    if (!element) return false

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const verticalInView = rect.top < windowHeight * (1 - threshold) && 
                          rect.bottom > windowHeight * threshold
    const horizontalInView = rect.left < windowWidth * (1 - threshold) && 
                            rect.right > windowWidth * threshold

    return verticalInView && horizontalInView
  }

  /**
   * Debounced resize handler
   */
  const handleResize = () => {
    // Update scroll values on resize
    updateScrollValues()
  }

  // Lifecycle
  onMounted(() => {
    // Initial values
    updateScrollValues()

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
  })

  onUnmounted(() => {
    // Cleanup
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  return {
    // Reactive values
    scrollY,
    scrollX,
    isScrolling,
    scrollDirection,
    isAtTop,
    isAtBottom,
    getScrollProgress,

    // Methods
    scrollTo,
    scrollToElement,
    scrollToTop,
    scrollBy,
    getElementScrollProgress,
    getParallaxOffset,
    isElementInViewport,

    // Utils
    updateScrollValues
  }
}

/**
 * Simple scroll to section utility
 * @param {string} sectionId - Section ID to scroll to
 * @param {number} offset - Offset from top (optional)
 */
export function scrollToSection(sectionId, offset = 0) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementTop = element.offsetTop - offset
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })
  }
}

/**
 * Intersection Observer composable for scroll animations
 * @param {Object} options - Observer options
 */
export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true
  } = options

  const isIntersecting = ref(false)
  const observer = ref(null)

  const observe = (element) => {
    if (!element) return

    observer.value = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isIntersecting.value = entry.isIntersecting

        if (entry.isIntersecting && once) {
          observer.value?.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.value.observe(element)
  }

  const disconnect = () => {
    observer.value?.disconnect()
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    isIntersecting,
    observe,
    disconnect
  }
}

/**
 * Window size composable
 */
export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const updateSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  const isMobile = computed(() => width.value < 768)
  const isTablet = computed(() => width.value >= 768 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  }
}
