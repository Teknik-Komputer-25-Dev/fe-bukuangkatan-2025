<template>
  <div class="relative overflow-hidden" :class="containerClass">
    <!-- Swiper Container -->
    <Swiper
      :modules="swiperModules"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :loop="loop"
      :autoplay="autoplayConfig"
      :pagination="paginationConfig"
      :navigation="navigation"
      :effect="effect"
      :grab-cursor="grabCursor"
      :centered-slides="centeredSlides"
      :breakpoints="breakpointsConfig"
      :lazy="lazy"
      :fade-effect="fadeConfig"
      :cube-effect="cubeConfig"
      :coverflow-effect="coverflowConfig"
      :touch-start-prevent-default="false"
      :touch-move-stop-propagation="true"
      :prevent-clicks="false"
      :prevent-clicks-propagation="false"
      :allow-touch-move="true"
      :nested="false"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
      @reach-end="onReachEnd"
      @reach-beginning="onReachBeginning"
      class=""
      :class="swiperClass"
    >
      <!-- Slides -->
      <SwiperSlide 
        v-for="(item, index) in items" 
        :key="getSlideKey(item, index, props.keyField)"
        class="!h-auto"
        :class="slideClass"
      >
        <!-- Default slot with item and index -->
        <slot 
          :item="item" 
          :index="index" 
          :isActive="index === activeIndex"
          :isPrev="index === activeIndex - 1"
          :isNext="index === activeIndex + 1"
        >
          <!-- Fallback content jika slot tidak diisi -->
          <div class="p-4 bg-gray-100 rounded-lg text-center">
            <p class="text-gray-600">Item {{ index + 1 }}</p>
          </div>
        </slot>
      </SwiperSlide>
    </Swiper>

    <!-- Custom Navigation (jika enabled) -->
    <div v-if="customNavigation" class="absolute inset-0 flex items-center justify-between pointer-events-none z-10">
      <button
        ref="prevButton"
        class="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 pointer-events-auto border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed -translate-x-6 hover:-translate-x-8"
        :class="navButtonClass"
        @click="slidePrev"
        :disabled="!canSlidePrev"
      >
        <slot name="prevIcon">
          <ChevronLeft class="w-6 h-6" />
        </slot>
      </button>
      
      <button
        ref="nextButton"
        class="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 pointer-events-auto border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed translate-x-6 hover:translate-x-8"
        :class="navButtonClass"
        @click="slideNext"
        :disabled="!canSlideNext"
      >
        <slot name="nextIcon">
          <ChevronRight class="w-6 h-6" />
        </slot>
      </button>
    </div>

    <!-- Custom Pagination (jika enabled) -->
    <div 
      v-if="customPagination" 
      class="flex justify-center items-center gap-2 mt-6"
      :class="paginationClass"
    >
      <button
        v-for="(item, index) in items"
        :key="`pagination-${index}`"
        class="w-3 h-3 bg-gray-300 rounded-full transition-all duration-200 cursor-pointer border-none hover:bg-gray-400"
        :class="[
          paginationBulletClass,
          index === activeIndex ? 'bg-blue-600 w-8' : ''
        ]"
        @click="slideTo(index)"
      >
        <span class="sr-only">Go to slide {{ index + 1 }}</span>
      </button>
    </div>

    <!-- Loading State -->
    <div 
      v-if="loading" 
      class="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg"
      :class="loadingClass"
    >
      <slot name="loading">
        <div class="flex items-center justify-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-2 text-gray-600">Loading...</span>
        </div>
      </slot>
    </div>

    <!-- Empty State -->
    <div 
      v-if="!loading && (!items || items.length === 0)" 
      class="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg"
      :class="emptyClass"
    >
      <slot name="empty">
        <div class="text-center p-8 text-gray-500">
          <p>No items to display</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Composables
import { useSwiper } from '@/composables/useSwiper'
import { useCarouselHelpers } from '@/composables/useCarouselHelpers'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-coverflow'

// Props
const props = defineProps({
  // Data
  items: {
    type: Array,
    default: () => []
  },

  // Swiper Configuration
  slidesPerView: {
    type: [Number, String],
    default: 1
  },

  spaceBetween: {
    type: Number,
    default: 30
  },

  loop: {
    type: Boolean,
    default: true
  },

  centeredSlides: {
    type: Boolean,
    default: false
  },

  grabCursor: {
    type: Boolean,
    default: true
  },

  lazy: {
    type: Boolean,
    default: true
  },

  // Autoplay
  autoplay: {
    type: [Boolean, Object],
    default: false
  },

  // Navigation
  navigation: {
    type: Boolean,
    default: true
  },

  customNavigation: {
    type: Boolean,
    default: false
  },

  // Pagination
  pagination: {
    type: [Boolean, Object],
    default: true
  },

  customPagination: {
    type: Boolean,
    default: false
  },

  // Effects
  effect: {
    type: String,
    default: 'slide',
    validator: (value) => ['slide', 'fade', 'cube', 'coverflow'].includes(value)
  },

  // Responsive breakpoints
  breakpoints: {
    type: Object,
    default: () => ({})
  },

  // Styling
  height: {
    type: [String, Number],
    default: 'auto'
  },

  // Classes
  containerClass: {
    type: String,
    default: ''
  },

  swiperClass: {
    type: String,
    default: ''
  },

  slideClass: {
    type: String,
    default: ''
  },

  navButtonClass: {
    type: String,
    default: ''
  },

  paginationClass: {
    type: String,
    default: ''
  },

  paginationBulletClass: {
    type: String,
    default: ''
  },

  loadingClass: {
    type: String,
    default: ''
  },

  emptyClass: {
    type: String,
    default: ''
  },

  // States
  loading: {
    type: Boolean,
    default: false
  },

  // Key function untuk v-for optimization
  keyField: {
    type: String,
    default: null
  }
})

// Emits
const emit = defineEmits([
  'swiper',
  'slide-change',
  'reach-end',
  'reach-beginning',
  'prev-click',
  'next-click',
  'bullet-click'
])

// Composables
const { getSlideKey } = useCarouselHelpers()

const {
  swiperInstance,
  activeIndex,
  canSlidePrev,
  canSlideNext,
  swiperModules,
  autoplayConfig,
  paginationConfig,
  breakpointsConfig,
  fadeConfig,
  cubeConfig,
  coverflowConfig,
  onSwiper,
  onSlideChange,
  onReachEnd,
  onReachBeginning,
  slidePrev,
  slideNext,
  slideTo,
  goToSlide,
  nextSlide,
  prevSlide,
  getCurrentSlide,
  getSwiperInstance
} = useSwiper(props, emit)

defineExpose({
  goToSlide,
  nextSlide,
  prevSlide,
  getCurrentSlide,
  getSwiperInstance,
  activeIndex: computed(() => activeIndex.value)
})

// Watch for items changes sudah ada di useSwiper composable
</script>

<style scoped>
/* Touch action untuk mencegah page scroll */
.swiper-no-page-scroll {
  touch-action: pan-y pinch-zoom;
}

/* Override default Swiper styles */
:deep(.swiper) {
  overflow: visible;
  touch-action: pan-y pinch-zoom;
}

:deep(.swiper-wrapper) {
  touch-action: pan-y pinch-zoom;
}

:deep(.swiper-slide) {
  touch-action: pan-y pinch-zoom;
}

:deep(.swiper-pagination) {
  bottom: 0;
}

:deep(.swiper-pagination-bullet) {
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #2563eb;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background-color: rgba(255, 255, 255, 1);
}

:deep(.swiper-button-next) {
  right: 1rem;
}

:deep(.swiper-button-prev) {
  left: 1rem;
}

:deep(.swiper-button-disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  :deep(.swiper-button-next:after),
  :deep(.swiper-button-prev:after) {
    font-size: 1.125rem;
  }
}
</style>
