<template>
  <div
    class="flex items-center gap-4 px-5 py-3 rounded-xl 
           bg-[linear-gradient(135deg,rgba(180,126,222,0.9),rgba(255,250,221,0.9))]
           border-l-[5px] border-[#311432] 
           shadow-[0_2px_8px_rgba(49,20,50,0.2)] 
           transition-all duration-300 hover:bg-[linear-gradient(135deg,#FFFADD,rgba(238,122,19,0.15))] hover:border-[#EE7A13] hover:translate-x-1"
  >
    <span class="font-bold text-[#311432] w-24 text-sm">{{ label }}</span>
    <span class="text-[#311432] text-sm font-medium flex-1">{{ value || '-' }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
});
</script>
