<template>
  <!-- Overlay muncul hanya saat show=true -->
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex justify-center items-center"
    >
      <!-- BACKGROUND BLUR -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-md"
        @click="$emit('close')"
      ></div>

      <!-- MODAL CARD -->
      <div
        class="relative z-50 bg-[linear-gradient(135deg,#311432_0%,#B47EDE_55%,#EE7A13_100%)]
               rounded-3xl p-8 max-w-4xl w-11/12 text-[#FFFADD]
               border-[5px] border-[#311432]
               shadow-[0_25px_70px_rgba(49,20,50,0.4),0_10px_30px_rgba(180,126,222,0.5)]
               animate-modalAppear flex flex-col md:flex-row gap-7 overflow-hidden"
      >
        <!-- TOMBOL CLOSE -->
        <button
          @click="$emit('close')"
          class="absolute top-5 right-5 bg-[#C21807] text-[#FFFADD]
                 border-2 border-[#EE7A13] w-9 h-9 rounded-full flex
                 items-center justify-center text-lg font-bold
                 shadow-[0_4px_10px_rgba(194,24,7,0.3)] transition-transform duration-300
                 hover:bg-[#EE7A13] hover:border-[#C21807] hover:rotate-90 hover:scale-110"
        >
          ✕
        </button>

        <!-- FOTO -->
        <div class="flex justify-center md:block">
          <img
            :src="profile?.generalphoto || '/images/default-avatar.svg'"
            alt="Profile photo"
            class="w-64 h-[370px] object-cover rounded-2xl border-[5px] border-[#311432]
                   shadow-[0_10px_30px_rgba(49,20,50,0.35)] hover:scale-105 hover:brightness-105 transition"
          />
        </div>

        <!-- DETAIL -->
        <div class="flex-1 flex flex-col gap-2">
          <h3 class="text-[#EE7A13] font-bold uppercase text-lg">{{ profile?.nickname }}</h3>
          <h2 class="text-3xl font-extrabold text-[#FFFADD]">{{ profile?.fullName }}</h2>
          <p class="text-[#C21807] font-semibold mb-2">{{ profile?.studentId }}</p>

          <div
            class="max-h-[260px] overflow-y-auto pr-2 flex flex-col gap-3
                   scrollbar-thin scrollbar-thumb-[#311432] scrollbar-track-[#B47EDE]"
          >
            <ProfileField label="Asal" :value="profile?.city" />
            <ProfileField label="TTL" :value="`${profile?.birthplace || '-'}, ${profile?.birthdate || '-'}`" />
            <ProfileField label="Alamat" :value="profile?.address" />
            <ProfileField label="Agama" :value="profile?.religion" />
            <ProfileField label="No HP" :value="profile?.phone" />
            <ProfileField label="ID Line" :value="profile?.lineid" />
            <ProfileField label="Instagram" :value="profile?.instagram" />
            <ProfileField label="Motto" :value="profile?.motto" />
            <ProfileField label="Skill Rahasia" :value="profile?.skillRahasia" />
            <ProfileField label="Tinggi Badan" :value="profile?.tinggiBadan" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import ProfileField from "@/components/ui/ProfileField.vue";
defineProps({
  show: Boolean,
  profile: Object,
});
</script>

<style scoped>
@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-modalAppear {
  animation: modalAppear 0.4s ease-out;
}

/* Fade transition untuk overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #311432;
  border-radius: 10px;
  border: 1px solid #EE7A13;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #EE7A13;
}
</style>
