/**
 * Composable for carousel configurations
 * Provides reusable carousel settings for different components
 */
export function useCarousel() {
  
  /**
   * Default carousel configuration for photo galleries
   */
  const photoCarouselConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { 
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    navigation: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  };

  /**
   * Simple carousel config for single slide displays
   */
  const singleSlideConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { 
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    }
  };

  /**
   * Multi-slide carousel for content grids
   */
  const multiSlideConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    pagination: {
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  };

  return {
    photoCarouselConfig,
    singleSlideConfig,
    multiSlideConfig
  };
}