<template>
  <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;">
    <!-- Line from center to top-left -->
    <line 
      x1="50%" y1="50%" 
      x2="25%" y2="25%" 
      stroke="rgba(255,255,255,0.1)" 
      stroke-width="2" 
      stroke-dasharray="5,5"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="0;10" 
        dur="2s" 
        repeatCount="indefinite"
      />
    </line>
    
    <!-- Line from center to top-right -->
    <line 
      x1="50%" y1="50%" 
      x2="75%" y2="25%" 
      stroke="rgba(255,255,255,0.1)" 
      stroke-width="2" 
      stroke-dasharray="5,5"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="0;10" 
        dur="2s" 
        repeatCount="indefinite"
      />
    </line>
    
    <!-- Line from center to bottom-left -->
    <line 
      x1="50%" y1="50%" 
      x2="25%" y2="75%" 
      stroke="rgba(255,255,255,0.1)" 
      stroke-width="2" 
      stroke-dasharray="5,5"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="0;10" 
        dur="2s" 
        repeatCount="indefinite"
      />
    </line>
    
    <!-- Line from center to bottom-right -->
    <line 
      x1="50%" y1="50%" 
      x2="75%" y2="75%" 
      stroke="rgba(255,255,255,0.1)" 
      stroke-width="2" 
      stroke-dasharray="5,5"
    >
      <animate 
        attributeName="stroke-dashoffset" 
        values="0;10" 
        dur="2s" 
        repeatCount="indefinite"
      />
    </line>
  </svg>
</template>

<script setup>
// Pure decorative component - no logic needed
</script>