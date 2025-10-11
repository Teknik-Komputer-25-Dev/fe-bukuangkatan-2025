<template>
  <GameLayout>
    <!-- Game 1: Friend Guess -->
    <FriendGuessGame />
    
    <!-- Game 2: Scramble Word -->
    <ScrambleWordGame />
  </GameLayout>
</template>

<script setup>
import GameLayout from '@/layouts/GameLayout.vue'
import FriendGuessGame from '@/components/features/games/FriendGuessGame.vue'
import ScrambleWordGame from '@/components/features/games/ScrambleWordGame.vue'
</script>