<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <div
      v-if="loading"
      class="inline-flex items-center"
    >
      <svg 
        class="animate-spin -ml-1 mr-2 h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {{ loadingText }}
    </div>
    
    <!-- Normal Content -->
    <div v-else class="inline-flex items-center justify-center">
      <!-- Icon Left -->
      <span v-if="$slots.iconLeft" class="mr-2">
        <slot name="iconLeft" />
      </span>
      
      <!-- Default Content -->
      <slot />
      
      <!-- Icon Right -->
      <span v-if="$slots.iconRight" class="ml-2">
        <slot name="iconRight" />
      </span>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Props definition
const props = defineProps({
  // Variant styling
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 
      'secondary', 
      'success', 
      'danger', 
      'warning', 
      'info', 
      'light', 
      'dark', 
      'outline', 
      'ghost',
      'gradient'
    ].includes(value)
  },
  
  // Size variants
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  // Button behavior
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  
  // Navigation props
  to: {
    type: [String, Object],
    default: null
  },
  
  href: {
    type: String,
    default: null
  },
  
  // State props
  disabled: {
    type: Boolean,
    default: false
  },
  
  loading: {
    type: Boolean,
    default: false
  },
  
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  
  // Style props
  rounded: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  
  shadow: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  
  block: {
    type: Boolean,
    default: false
  },
  
  // Custom classes
  customClass: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['click'])

// Computed properties
const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => {
  const classes = [
    // Base styles
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    
    // Size variants
    sizeClasses.value,
    
    // Variant styles
    variantClasses.value,
    
    // Rounded corners
    roundedClasses.value,
    
    // Shadow
    shadowClasses.value,
    
    // Block width
    props.block ? 'w-full' : '',
    
    // Custom classes
    props.customClass
  ]
  
  return classes.filter(Boolean).join(' ')
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 active:bg-cyan-800',
    light: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300 active:bg-gray-300',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700 active:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500'
  }
  return variants[props.variant]
})

const roundedClasses = computed(() => {
  const rounded = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }
  return rounded[props.rounded]
})

const shadowClasses = computed(() => {
  if (props.shadow === 'none') return ''
  
  const shadows = {
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl',
    '2xl': 'shadow-2xl hover:shadow-3xl'
  }
  return shadows[props.shadow]
})

// Methods
const handleClick = (event) => {
  if (props.disabled || props.loading) return
  
  emit('click', event)
  
  // Handle router navigation if 'to' prop is provided
  if (props.to && !event.defaultPrevented) {
    router.push(props.to)
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Ripple effect on click */
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.button-ripple {
  position: relative;
  overflow: hidden;
}

.button-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button-ripple:active::before {
  width: 300px;
  height: 300px;
}
</style>
