<template>
  <div
    class="flex items-center gap-4 px-5 py-3 rounded-xl 
           bg-[linear-gradient(135deg,rgba(180,126,222,0.9),rgba(255,250,221,0.9))]
           border-l-[3px] border-[#3F0368] 
           shadow-[0_4px_10px_rgba(63,3,104,0.45)] 
           backdrop-blur-sm
           transition-all duration-300 
           hover:shadow-[0_6px_14px_rgba(63,3,104,0.6)] 
           hover:translate-x-1"
  >
    <span class="font-bold text-[#3F0368] w-24 text-sm">{{ label }}</span>
    <span class="text-[#3F0368] text-sm font-medium flex-1">{{ value || '-' }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
});
</script>
