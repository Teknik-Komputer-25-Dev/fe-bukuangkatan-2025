<template>
  <!-- Overlay muncul hanya saat show=true -->
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex justify-center items-center p-3 sm:p-0"
    >
      <!-- BACKGROUND BLUR -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-md"
        @click="$emit('close')"
      ></div>

      <!-- MODAL CARD -->
      <div
        class="relative z-50 rounded-2xl sm:rounded-3xl 
               p-5 sm:p-8 max-w-full sm:max-w-4xl w-full sm:w-11/12 
               text-[#FFFADD]
               border-[2px] border-[#dbd7d7]
               shadow-[0_20px_50px_rgba(219,215,215,0.4),0_8px_25px_rgba(219,215,215,0.3)]
               animate-modalAppear flex flex-col sm:flex-row gap-5 sm:gap-7 overflow-hidden
               bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/background.png');"
      >
        <!-- TOMBOL CLOSE -->
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 sm:top-5 sm:right-5
                 bg-[#B47EDE] text-[#3F0368]
                 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center 
                 text-base sm:text-lg font-bold
                 shadow-[0_4px_10px_rgba(180,126,222,0.5)]
                 transition-all duration-300
                 hover:bg-[#E9E1FE]
                 hover:shadow-[0_6px_14px_rgba(233,225,254,0.7)]
                 hover:rotate-90 hover:scale-110"
        >
          ✕
        </button>

        <!-- FOTO -->
        <div class="flex justify-center sm:block">
          <img
            :src="profile?.generalphoto || '/images/default-avatar.svg'"
            alt="Profile photo"
            class="w-40 h-56 sm:w-64 sm:h-[370px] object-cover rounded-2xl border-[2px] border-[#dbd7d7]
                   shadow-[0_8px_25px_rgba(219,215,215,0.35)] hover:scale-105 hover:brightness-110 transition"
          />
        </div>

        <!-- DETAIL -->
        <div class="flex-1 flex flex-col gap-2 mt-4 sm:mt-0">
          <h3 class="font-bold uppercase text-base sm:text-lg text-[#E9E1FE] text-center sm:text-left">
            {{ profile?.nickname }}
          </h3>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#E9E1FE] text-center sm:text-left">
            {{ profile?.fullName }}
          </h2>
          <p class="font-semibold mb-2 text-[#E9E1FE] text-center sm:text-left">
            {{ profile?.studentId }}
          </p>

          <div
            class="max-h-[230px] sm:max-h-[260px] overflow-y-auto pr-1 sm:pr-2 flex flex-col gap-3
                   scrollbar-thin scrollbar-thumb-[#dbd7d7] scrollbar-track-[#311432]"
          >
            <ProfileField label="Asal" :value="profile?.city" />
            <ProfileField label="TTL" :value="`${profile?.birthplace || '-'}, ${profile?.birthdate || '-'}`" />
            <ProfileField label="Alamat saat ini" :value="profile?.address" />
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
  background-color: #dbd7d7;
  border-radius: 10px;
  border: 1px solid #dbd7d7;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #EE7A13;
}
</style>
