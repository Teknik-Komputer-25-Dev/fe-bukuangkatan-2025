import { useRouter } from 'vue-router';

/**
 * Composable for navigation utilities
 */
export function useNavigation() {
  const router = useRouter();

  /**
   * Navigate to profile page
   */
  const goToProfile = () => {
    router.push('/profile');
  };

  /**
   * Navigate to gallery page
   */
  const goToGallery = () => {
    router.push('/gallery');
  };

  /**
   * Navigate to identity page
   */
  const goToIdentity = () => {
    router.push('/identity');
  };

  /**
   * Navigate to home page
   */
  const goToHome = () => {
    router.push('/');
  };

  /**
   * Navigate with custom route
   * @param {string} path - Route path
   * @param {Object} options - Additional router options
   */
  const navigateTo = (path, options = {}) => {
    router.push({ path, ...options });
  };

  return {
    goToProfile,
    goToGallery,
    goToIdentity,
    goToHome,
    navigateTo
  };
}