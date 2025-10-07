/**
 * Responsive breakpoints configuration
 * Following Tailwind CSS breakpoints
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Animation size configurations for different screen sizes
 */
export const ANIMATION_SIZES = {
  mobile: { width: 250, height: 250 },
  tablet: { width: 300, height: 300 },
  desktop: { width: 350, height: 350 },
  large: { width: 400, height: 400 }
};

/**
 * Helper function to get screen size category
 */
export const getScreenSize = (width) => {
  if (width < BREAKPOINTS.sm) return 'mobile';
  if (width < BREAKPOINTS.md) return 'tablet';
  if (width < BREAKPOINTS.lg) return 'desktop';
  return 'large';
};