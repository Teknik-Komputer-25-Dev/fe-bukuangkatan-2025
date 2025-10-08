import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollNavbar(options = {}) {
  const {
    scrollThreshold = 10,
    topThreshold = 50,
    throttleDelay = 16
  } = options

  // State
  const isNavbarVisible = ref(true)
  const isAtTop = ref(true)
  const isScrollingDown = ref(false)
  const lastScrollY = ref(0)
  const scrollDirection = ref('up')

  // Scroll handler
  const handleScroll = () => {
    const currentScrollY = window.scrollY
    
    // Check if we're at the top of the page
    isAtTop.value = currentScrollY < topThreshold
    
    // If at top, always show navbar
    if (isAtTop.value) {
      isNavbarVisible.value = true
      isScrollingDown.value = false
      scrollDirection.value = 'up'
      lastScrollY.value = currentScrollY
      return
    }
    
    // Calculate scroll direction
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.value)
    
    // Only act if scroll difference is significant enough
    if (scrollDifference > scrollThreshold) {
      const scrollingDown = currentScrollY > lastScrollY.value
      isScrollingDown.value = scrollingDown
      scrollDirection.value = scrollingDown ? 'down' : 'up'
      
      if (scrollingDown) {
        // Scrolling down - hide navbar
        isNavbarVisible.value = false
      } else {
        // Scrolling up - show navbar
        isNavbarVisible.value = true
      }
      
      lastScrollY.value = currentScrollY
    }
  }

  // Throttle scroll events for better performance
  let scrollTimeout = null
  const throttledScrollHandler = () => {
    if (scrollTimeout === null) {
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, throttleDelay)
    }
  }

  // Force show/hide navbar
  const showNavbar = () => {
    isNavbarVisible.value = true
  }

  const hideNavbar = () => {
    isNavbarVisible.value = false
  }

  // Reset navbar state
  const resetNavbar = () => {
    isNavbarVisible.value = true
    isAtTop.value = true
    isScrollingDown.value = false
    lastScrollY.value = 0
    scrollDirection.value = 'up'
  }

  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    // Set initial scroll position
    lastScrollY.value = window.scrollY
    handleScroll() // Initial check
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', throttledScrollHandler)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  return {
    // State
    isNavbarVisible,
    isAtTop,
    
    isScrollingDown,
    scrollDirection,
    lastScrollY,
    
    // Methods
    showNavbar,
    hideNavbar,
    resetNavbar,
    handleScroll
  }
}