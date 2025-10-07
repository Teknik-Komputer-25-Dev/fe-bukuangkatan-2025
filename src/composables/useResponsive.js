import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ANIMATION_SIZES, getScreenSize } from '@/utils/constants';

/**
 * Composable for responsive window width detection
 * @returns {Object} Object containing windowWidth, screenSize, and animationSize
 */
export function useResponsive() {
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWindowWidth);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateWindowWidth);
    }
  });

  // Screen size category based on current width
  const screenSize = computed(() => getScreenSize(windowWidth.value));

  // Animation size based on screen size
  const animationSize = computed(() => ANIMATION_SIZES[screenSize.value]);

  // Responsive utilities
  const isMobile = computed(() => screenSize.value === 'mobile');
  const isTablet = computed(() => screenSize.value === 'tablet');
  const isDesktop = computed(() => screenSize.value === 'desktop');
  const isLarge = computed(() => screenSize.value === 'large');

  return {
    windowWidth,
    screenSize,
    animationSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge
  };
}