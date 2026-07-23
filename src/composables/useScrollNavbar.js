import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollNavbar(options = {}) {
  const {
    scrollThreshold = 10,
    topThreshold = 50,
    throttleDelay = 16
  } = options


  const isNavbarVisible = ref(true)
  const isAtTop = ref(true)
  const isScrollingDown = ref(false)
  const lastScrollY = ref(0)
  const scrollDirection = ref('up')


  const handleScroll = () => {
    const currentScrollY = window.scrollY
    
  
    isAtTop.value = currentScrollY < topThreshold
    
  
    if (isAtTop.value) {
      isNavbarVisible.value = true
      isScrollingDown.value = false
      scrollDirection.value = 'up'
      lastScrollY.value = currentScrollY
      return
    }
    
  
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.value)
    
  
    if (scrollDifference > scrollThreshold) {
      const scrollingDown = currentScrollY > lastScrollY.value
      isScrollingDown.value = scrollingDown
      scrollDirection.value = scrollingDown ? 'down' : 'up'
      
      if (scrollingDown) {
      
        isNavbarVisible.value = false
      } else {
      
        isNavbarVisible.value = true
      }
      
      lastScrollY.value = currentScrollY
    }
  }


  let scrollTimeout = null
  const throttledScrollHandler = () => {
    if (scrollTimeout === null) {
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, throttleDelay)
    }
  }


  const showNavbar = () => {
    isNavbarVisible.value = true
  }

  const hideNavbar = () => {
    isNavbarVisible.value = false
  }


  const resetNavbar = () => {
    isNavbarVisible.value = true
    isAtTop.value = true
    isScrollingDown.value = false
    lastScrollY.value = 0
    scrollDirection.value = 'up'
  }


  onMounted(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
  
    lastScrollY.value = window.scrollY
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', throttledScrollHandler)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  return {
  
    isNavbarVisible,
    isAtTop,
    
    isScrollingDown,
    scrollDirection,
    lastScrollY,
    
  
    showNavbar,
    hideNavbar,
    resetNavbar,
    handleScroll
  }
}