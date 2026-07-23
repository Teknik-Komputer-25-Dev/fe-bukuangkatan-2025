<template>
  <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 max-w-5xl mx-auto pt-4 mb-16 md:mb-20">
    <TagCard
      v-for="tag in tags" 
      :key="tag"
      :tag="tag"
      :description="getTagDescription(tag)"
    />
  </div>
</template>

<script setup>
import TagCard from './TagCard.vue'

defineProps({
  tags: {
    type: Array,
    required: true
  },
  getTagDescription: {
    type: Function,
    required: true
  }
})
</script>