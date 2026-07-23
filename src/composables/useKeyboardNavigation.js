import { onMounted, onUnmounted } from 'vue'

export function useKeyboardNavigation(config = {}) {
  const {
    onLeft = () => {},
    onRight = () => {},
    onUp = () => {},
    onDown = () => {},
    onEnter = () => {},
    onEscape = () => {},
    preventDefault = true,
    stopPropagation = true
  } = config

  const handleKeydown = (event) => {
    let handled = false

    switch (event.key) {
      case 'ArrowLeft':
        onLeft(event)
        handled = true
        break
      case 'ArrowRight':
        onRight(event)
        handled = true
        break
      case 'ArrowUp':
        onUp(event)
        handled = true
        break
      case 'ArrowDown':
        onDown(event)
        handled = true
        break
      case 'Enter':
        onEnter(event)
        handled = true
        break
      case 'Escape':
        onEscape(event)
        handled = true
        break
    }

    if (handled) {
      if (preventDefault) event.preventDefault()
      if (stopPropagation) event.stopPropagation()
    }
  }

  const setupKeyboardNavigation = () => {
    document.addEventListener('keydown', handleKeydown)
  }

  const cleanupKeyboardNavigation = () => {
    document.removeEventListener('keydown', handleKeydown)
  }

  return {
    setupKeyboardNavigation,
    cleanupKeyboardNavigation
  }
}