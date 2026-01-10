<template>
  <div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
    <div v-for="(icon, index) in floatingIcons" :key="index" class="absolute text-4xl opacity-60 animate-bounce" :style="{
      top: icon.top,
      left: icon.left,
      right: icon.right,
      animationDelay: icon.delay,
      animationDuration: '6s'
    }">
      <component :is="icon.component" />
    </div>
  </div>
</template>

<script setup>

import {
  Gamepad2,
  Target,
  Dice6,
  Star,
  PartyPopper,
  Trophy,
  MoonStar,
  FerrisWheel
} from 'lucide-vue-next'

const floatingIcons = [
  {
    component: Gamepad2,
    top: '15%',
    left: '10%',
    delay: '0s'
  },
  {
    component: Target,
    top: '25%',
    right: '15%',
    delay: '1s'
  },
  {
    component: MoonStar,
    bottom: '30%',
    left: '8%',
    delay: '2s'
  },
  {
    component: Star,
    bottom: '20%',
    right: '12%',
    delay: '3s'
  },
  {
    component: PartyPopper,
    top: '40%',
    left: '20%',
    delay: '4s'
  }
  ,
  {
    component: Trophy,
    top: '60%',
    right: '25%',
    delay: '5s'
  }
  ,
  {
    component: Dice6,
    top: '90%',
    left: '5%',
    delay: '5s'
  }
  ,
  {
    component: FerrisWheel,
    top: '70%',
    left: '25%',
    delay: '5s'
  }
  ,
  {
    component: Trophy,
    top: '80%',
    right: '15%',
    delay: '5s'
  }
  ,
  {
    component: Trophy,
    top: '60%',
    left: '15%',
    delay: '5s'
  }
]
</script>
